import { NextResponse } from "next/server";

// Placeholder for the real signup destination. When the integration is
// chosen (Resend, Mailchimp, n8n webhook, Supabase…), replace the
// console.log with the actual outbound call. The contract on the wire
// stays the same, so the client form doesn't need to change.

type Payload = {
  nome?: string;
  email?: string;
  telefone?: string;
  programa?: string;
};

const PROGRAMS = new Set([
  "formacao-avancada",
  "imersoes-handson",
  "educacao-continuada",
  "conteudo-cientifico",
  "indeciso",
]);

function isEmail(s: string) {
  // Pragmatic check — full RFC 5322 isn't worth the bytes for a marketing form.
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s);
}

export async function POST(request: Request) {
  let body: Payload;
  try {
    body = (await request.json()) as Payload;
  } catch {
    return NextResponse.json(
      { ok: false, error: "Corpo da requisição inválido." },
      { status: 400 }
    );
  }

  const nome = body.nome?.trim() ?? "";
  const email = body.email?.trim().toLowerCase() ?? "";
  const telefone = body.telefone?.trim() ?? "";
  const programa = body.programa?.trim() ?? "";

  const errors: Record<string, string> = {};
  if (nome.length < 2) errors.nome = "Informe seu nome completo.";
  if (!isEmail(email)) errors.email = "Email inválido.";
  // Telefone é opcional; quando preenchido, exige ao menos 8 dígitos.
  if (telefone && telefone.replace(/\D/g, "").length < 8) {
    errors.telefone = "Telefone incompleto.";
  }
  if (programa && !PROGRAMS.has(programa)) {
    errors.programa = "Programa não reconhecido.";
  }

  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ ok: false, errors }, { status: 422 });
  }

  // TODO: replace with the real destination (Resend / Mailchimp / webhook).
  console.log("[inscricao] novo lead", { nome, email, telefone, programa });

  return NextResponse.json({ ok: true });
}
