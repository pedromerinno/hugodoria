# Deploy — Hugo Doria monorepo

Este monorepo abriga **dois apps independentes** que fazem deploy como **dois projects Vercel separados**, ambos apontando para o mesmo repositório `pedromerinno/hugodoria`.

## Apps

| App | Path | Stack | Vercel Project (sugestão) | Domínio |
|---|---|---|---|---|
| Neurovasc landing | `apps/neurovasc/` | Next.js 15 + React 19 RC | `hugodoria-neurovasc` | (a definir) |
| Site Hugo Doria | `apps/website/` | Vite 6 + React 18 | `hugodoria-website` | (a definir) |

## Como conectar cada app no Vercel

Para **cada um dos dois apps**, criar um project Vercel:

1. **New Project** → importar o repo `pedromerinno/hugodoria`
2. **Framework Preset**: detecta automático via `vercel.json` em cada app (`nextjs` ou `vite`)
3. **Root Directory**: clicar em **Edit** e selecionar:
   - `apps/neurovasc` → para o project do landing Neurovasc
   - `apps/website` → para o project do site institucional
4. **Build & Output Settings**: deixar tudo no padrão. As configs vivem no `vercel.json` de cada app:
   - `buildCommand`: `cd ../.. && pnpm turbo run build --filter=@hugodoria/<app>`
   - `ignoreCommand`: `npx turbo-ignore @hugodoria/<app>` (skip de build se o app não mudou)
   - `outputDirectory`: `.next` (Next) ou `dist` (Vite)
5. **Install Command**: deixar padrão. O Vercel detecta `pnpm-workspace.yaml` na raiz e roda `pnpm install --frozen-lockfile` lá automaticamente.
6. **Environment Variables**: copiar de `.env.local` (não commitado) para o painel da Vercel:
   - `apps/neurovasc/.env.example` lista as variáveis esperadas
   - `apps/website` ainda não tem `.env`

## Por que esta config

### `cd ../.. && pnpm turbo run build --filter=...`

O Vercel executa o `buildCommand` a partir do **Root Directory** (`apps/<app>/`). Subimos para a raiz do monorepo (`cd ../..`) para que o `turbo` enxergue todo o workspace e use o cache compartilhado. O `--filter` garante que apenas o app daquele project seja buildado (e suas dependências internas, se houver).

### `npx turbo-ignore @hugodoria/<app>`

Roda antes de cada build. Se nenhuma mudança afetou aquele app desde o último deploy, retorna exit 1 → Vercel **skipa o build**. Economiza minutos de build e custo. Se o app mudou (ou um `packages/*` que ele consome), retorna 0 → build prossegue.

### `rewrites` no `apps/website/vercel.json`

O website é uma SPA com `react-router` 7. Sem o rewrite, qualquer URL que não seja `/` retorna 404 no Vercel. O rewrite manda tudo para `index.html` e o router resolve client-side. Necessário até a migração para Next, onde rotas viram páginas reais.

## Turborepo Remote Cache (opcional, recomendado)

Para aproveitar o cache do Turbo entre builds locais e da Vercel:

```bash
# Local — uma vez, autenticando com sua conta Vercel
pnpm dlx turbo login
pnpm dlx turbo link
```

A Vercel automaticamente injeta `TURBO_TOKEN` e `TURBO_TEAM` nas builds dos projects ligados, então não precisa configurar nada no painel.

## Quando o `apps/website` for migrado para Next.js

- Trocar `framework: "vite"` → `"nextjs"` no `apps/website/vercel.json`
- Trocar `outputDirectory: "dist"` → `".next"`
- Remover o bloco `rewrites` (rotas viram pages do Next)

## Troubleshooting

**Build falha com "Cannot find module"** — provavelmente o pnpm não está sendo rodado da raiz. Verifique se `pnpm-workspace.yaml` está na raiz (`/pnpm-workspace.yaml`) e se o Vercel detectou o workspace.

**`turbo-ignore` skipou um build que deveria ter rodado** — alguma mudança em `packages/*` que o app consome não está sendo detectada. Verifique o `dependsOn` em `turbo.json` e se o `package.json` do app declara o `packages/*` como dep workspace.

**Imagens grandes no `apps/website`** — pré-existente. A Vercel tem limite de 100MB por arquivo de output, e algumas imagens estão em 10MB. Considerar otimização antes de subir.
