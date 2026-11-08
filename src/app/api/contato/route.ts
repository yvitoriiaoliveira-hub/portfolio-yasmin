import { NextResponse, type NextRequest } from "next/server";

import { contactSchema } from "@/lib/contact-schema";
import { MailerNotConfiguredError, sendContactEmail } from "@/lib/mailer";
import { isRateLimited } from "@/lib/rate-limit";

export const runtime = "nodejs";

function clientIp(request: NextRequest) {
  return request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || request.headers.get("x-real-ip") || "local";
}

function sameOrigin(request: NextRequest) {
  const origin = request.headers.get("origin");
  if (!origin) return true;
  try {
    return new URL(origin).host === request.headers.get("host");
  } catch {
    return false;
  }
}

export async function POST(request: NextRequest) {
  if (!sameOrigin(request)) {
    return NextResponse.json({ error: "Origem não permitida." }, { status: 403 });
  }

  if (isRateLimited(clientIp(request))) {
    return NextResponse.json(
      { error: "Muitas mensagens em pouco tempo. Tente de novo em alguns minutos." },
      { status: 429 },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Não foi possível ler os dados enviados." }, { status: 400 });
  }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Confira os campos do formulário.", fields: parsed.error.flatten().fieldErrors },
      { status: 422 },
    );
  }

  // Robôs preenchem o campo invisível: respondemos como sucesso sem enviar nada.
  if (parsed.data.website) {
    return NextResponse.json({ ok: true });
  }

  try {
    await sendContactEmail(parsed.data);
    return NextResponse.json({ ok: true });
  } catch (error) {
    if (error instanceof MailerNotConfiguredError) {
      console.error("[contato] RESEND_API_KEY, CONTACT_FROM_EMAIL ou CONTACT_TO_EMAIL não configurados.");
      return NextResponse.json(
        { error: "O envio de mensagens ainda não está disponível. Escreva diretamente para o e-mail ao lado." },
        { status: 503 },
      );
    }
    console.error("[contato] Falha ao enviar:", error);
    return NextResponse.json(
      { error: "Não foi possível enviar agora. Tente novamente ou escreva para o e-mail ao lado." },
      { status: 502 },
    );
  }
}
