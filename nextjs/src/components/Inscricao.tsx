"use client";

import { useState } from "react";

type Status = "idle" | "loading" | "success" | "error";

type FieldErrors = Partial<Record<"nome" | "email" | "telefone" | "programa", string>>;

const PROGRAMS = [
  { value: "formacao-avancada", label: "Formação Avançada em Neurocirurgia" },
  { value: "imersoes-handson", label: "Imersões e Hands-on" },
  { value: "educacao-continuada", label: "Educação Continuada" },
  { value: "conteudo-cientifico", label: "Conteúdo Científico e Atualizações" },
  { value: "indeciso", label: "Quero conhecer todos os programas" },
];

// Brazilian phone mask — accepts 10 or 11 digits, formats progressively
// while the user types. Strips non-digits before reformatting so paste
// from clipboards keeps working.
function maskPhone(raw: string) {
  const d = raw.replace(/\D/g, "").slice(0, 11);
  if (d.length <= 2) return d.length ? `(${d}` : "";
  if (d.length <= 6) return `(${d.slice(0, 2)}) ${d.slice(2)}`;
  if (d.length <= 10)
    return `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}`;
  return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
}

export default function Inscricao() {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<FieldErrors>({});
  const [serverMsg, setServerMsg] = useState<string | null>(null);

  // Controlled state for the masked phone field; the rest is read straight
  // from the FormData on submit.
  const [telefone, setTelefone] = useState("");

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    setErrors({});
    setServerMsg(null);

    const form = event.currentTarget;
    const data = new FormData(form);
    const payload = {
      nome: String(data.get("nome") ?? "").trim(),
      email: String(data.get("email") ?? "").trim(),
      telefone: String(data.get("telefone") ?? "").trim(),
      programa: String(data.get("programa") ?? "").trim(),
    };

    try {
      const res = await fetch("/api/inscricao", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = await res.json().catch(() => null);

      if (!res.ok) {
        if (json?.errors) setErrors(json.errors as FieldErrors);
        setServerMsg(
          json?.error ?? "Não foi possível enviar agora. Tente novamente."
        );
        setStatus("error");
        return;
      }

      setStatus("success");
      form.reset();
      setTelefone("");
    } catch {
      setServerMsg("Erro de conexão. Verifique sua internet e tente de novo.");
      setStatus("error");
    }
  }

  return (
    <section
      id="inscricao"
      aria-labelledby="inscricao-titulo"
      className="relative w-full bg-sand pt-[80px] pb-[100px] sm:pt-[120px] sm:pb-[140px] lg:pt-[160px] lg:pb-[180px]"
    >
      <div className="mx-auto w-full max-w-[1280px] px-4 sm:px-6 lg:px-[60px]">
        <div className="grid gap-12 lg:grid-cols-[1.05fr_1fr] lg:gap-20 lg:items-start">
          {/* ── Left column — pitch ───────────────────────────── */}
          <div className="flex flex-col gap-6 lg:gap-8">
            <span className="inline-flex h-[38px] w-fit items-center rounded-full bg-chip px-5 text-[14px] font-normal text-primary">
              Inscrições abertas
            </span>

            <h2
              id="inscricao-titulo"
              className="m-0 max-w-[640px] font-display text-[36px] font-normal leading-[1.08] tracking-tightDisplay text-primary sm:text-[48px] lg:text-[64px] lg:tracking-tighterDisplay"
            >
              Comece sua{" "}
              <span className="bg-legado-grad bg-clip-text text-transparent">
                jornada
              </span>{" "}
              com a Neurosurgic.
            </h2>

            <p className="max-w-[520px] font-display text-[15px] leading-[1.6] text-primary/85 sm:text-[17px]">
              Deixe seus dados para receber as próximas datas de turma,
              detalhes de cada programa e a oportunidade de conversar com
              nosso time antes do início.
            </p>

            <ul className="mt-2 flex flex-col gap-3 text-primary/85">
              {[
                "Currículo desenhado com Dr. Hugo Dória",
                "Turmas reduzidas com mentoria individual",
                "Material e biblioteca disponíveis ao longo do programa",
              ].map((line) => (
                <li
                  key={line}
                  className="flex items-start gap-3 font-display text-[14px] sm:text-[15px]"
                >
                  <span
                    aria-hidden
                    className="mt-[7px] inline-block h-[6px] w-[6px] flex-shrink-0 rounded-full bg-primary"
                  />
                  <span>{line}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Right column — form card ───────────────────────── */}
          <form
            onSubmit={onSubmit}
            noValidate
            className="relative flex flex-col gap-5 rounded-[28px] bg-white p-6 shadow-[0_24px_60px_-20px_rgba(0,21,255,0.18)] ring-1 ring-primary/[0.06] sm:p-8 lg:p-10"
          >
            <Field
              label="Nome completo"
              name="nome"
              type="text"
              autoComplete="name"
              required
              error={errors.nome}
            />
            <Field
              label="Email"
              name="email"
              type="email"
              autoComplete="email"
              required
              error={errors.email}
            />
            <Field
              label="Telefone"
              name="telefone"
              type="tel"
              autoComplete="tel"
              inputMode="numeric"
              placeholder="(00) 00000-0000"
              value={telefone}
              onChange={(e) => setTelefone(maskPhone(e.target.value))}
              error={errors.telefone}
            />

            <div className="flex flex-col gap-2">
              <label
                htmlFor="programa"
                className="font-display text-[13px] font-medium text-primary/80"
              >
                Programa de interesse
              </label>
              <div className="relative">
                <select
                  id="programa"
                  name="programa"
                  defaultValue="indeciso"
                  className="h-[52px] w-full appearance-none rounded-[14px] border border-primary/15 bg-white px-4 pr-10 font-display text-[15px] text-primary outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20"
                >
                  {PROGRAMS.map((p) => (
                    <option key={p.value} value={p.value}>
                      {p.label}
                    </option>
                  ))}
                </select>
                <svg
                  width="12"
                  height="8"
                  viewBox="0 0 12 8"
                  fill="none"
                  className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-primary/60"
                  aria-hidden
                >
                  <path
                    d="M1 1l5 5 5-5"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              {errors.programa && (
                <span className="font-display text-[12px] text-red-600">
                  {errors.programa}
                </span>
              )}
            </div>

            <button
              type="submit"
              disabled={status === "loading"}
              className="mt-2 inline-flex h-[52px] items-center justify-center gap-2 rounded-full bg-primary px-6 font-display text-[15px] font-semibold text-white transition-all duration-200 hover:bg-primaryDeep hover:scale-[1.01] active:scale-[0.99] disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {status === "loading" ? (
                <>
                  <Spinner />
                  <span>Enviando…</span>
                </>
              ) : (
                <>
                  <span>Quero me inscrever</span>
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    aria-hidden
                  >
                    <path
                      d="M3.5 8h9M9 4.5L12.5 8 9 11.5"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </>
              )}
            </button>

            <p className="font-display text-[12px] leading-[1.5] text-primary/60">
              Ao enviar, você concorda em receber comunicações sobre os
              programas. Seus dados não são compartilhados.
            </p>

            {/* Status banner */}
            {status === "success" && (
              <div
                role="status"
                aria-live="polite"
                className="rounded-[14px] bg-primary/5 px-4 py-3 font-display text-[14px] text-primary"
              >
                ✓ Recebemos sua inscrição. Em breve nosso time entra em
                contato.
              </div>
            )}
            {status === "error" && serverMsg && (
              <div
                role="alert"
                className="rounded-[14px] bg-red-50 px-4 py-3 font-display text-[14px] text-red-700"
              >
                {serverMsg}
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}

// ── Helpers ──────────────────────────────────────────────────────

type FieldProps = {
  label: string;
  name: string;
  type: string;
  autoComplete?: string;
  inputMode?: React.HTMLAttributes<HTMLInputElement>["inputMode"];
  required?: boolean;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
};

function Field({
  label,
  name,
  type,
  autoComplete,
  inputMode,
  required,
  placeholder,
  value,
  onChange,
  error,
}: FieldProps) {
  const id = `f-${name}`;
  return (
    <div className="flex flex-col gap-2">
      <label
        htmlFor={id}
        className="font-display text-[13px] font-medium text-primary/80"
      >
        {label}
        {required && <span className="ml-0.5 text-primary">*</span>}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        autoComplete={autoComplete}
        inputMode={inputMode}
        required={required}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
        className={[
          "h-[52px] w-full rounded-[14px] border bg-white px-4 font-display text-[15px] text-primary outline-none transition-colors",
          error
            ? "border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-500/20"
            : "border-primary/15 focus:border-primary focus:ring-2 focus:ring-primary/20",
        ].join(" ")}
      />
      {error && (
        <span
          id={`${id}-error`}
          className="font-display text-[12px] text-red-600"
        >
          {error}
        </span>
      )}
    </div>
  );
}

function Spinner() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      className="animate-spin"
      aria-hidden
    >
      <circle
        cx="12"
        cy="12"
        r="9"
        stroke="currentColor"
        strokeOpacity="0.25"
        strokeWidth="3"
      />
      <path
        d="M21 12a9 9 0 0 0-9-9"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
}
