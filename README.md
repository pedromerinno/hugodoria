# Hugo Dória — Neurosurgic

Site institucional do **Instituto Neurosurgic** — formação clínica em alto nível em Neurocirurgia e Neurociências, idealizado por Dr. Hugo Dória.

A aplicação é um **Next.js 15 / React 19** com Tailwind, GSAP ScrollTrigger, e player de vídeo Mux. UI/UX inspirada em Apple, Nubank e Linear: minimalismo funcional, micro-interações sutis, tipografia editorial.

## Stack

- **Framework** — Next.js 15 (App Router) + React 19
- **Styling** — Tailwind CSS 3.4 + `font-display` / `font-roboto` custom
- **Motion** — GSAP + ScrollTrigger (pin/scrub do bloco institucional)
- **Vídeo** — `@mux/mux-player-react/lazy`
- **Tipografia** — Custom display font + Roboto

## Estrutura

```
neurovasc/
└── nextjs/                    # ← raiz da app (o root no deploy)
    ├── public/assets/         # imagens, ícones, vídeos
    ├── src/
    │   ├── app/               # App Router + globals.css
    │   └── components/        # Hero, Pillars, Challenges, etc.
    ├── tailwind.config.ts
    └── package.json
```

## Local dev

```bash
cd nextjs
cp .env.example .env.local      # preencha NEXT_PUBLIC_MUX_PLAYBACK_ID
npm install
npm run dev                     # http://localhost:3000
```

## Variáveis de ambiente

| Variável                       | Descrição                               | Onde usar             |
| ------------------------------ | --------------------------------------- | --------------------- |
| `NEXT_PUBLIC_MUX_PLAYBACK_ID`  | Playback ID do vídeo institucional Mux. | Local + produção      |

`.env.local` é git-ignored. Em produção (Vercel/Render), configure como **Environment Variable**.

## Deploy

A aplicação fica em `nextjs/` — configure o **Root Directory** do projeto na Vercel/Render como `nextjs`. Build padrão Next.js (`next build`).

## Scripts

```bash
npm run dev      # dev server
npm run build    # build de produção
npm run start    # servidor de produção
npm run lint     # ESLint
```
