import { NextResponse, type NextRequest } from "next/server";

import { contactSchema } from "@/lib/contact-schema";
import { isDatabaseConfigured, markDelivered, saveContactMessage } from "@/lib/db";
import { isEmailConfigured, sendContactEmail } from "@/lib/mailer";
import { isRateLimited } from "@/lib/rate-limit";
import { isWhatsAppConfigured, sendWhatsAppNotification } from "@/lib/whatsapp";

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

  const channels = { db: isDatabaseConfigured(), whatsapp: isWhatsAppConfigured(), email: isEmailConfigured() };
  if (!channels.db && !channels.whatsapp && !channels.email) {
    console.error("[contato] Nenhum canal configurado (DATABASE_URL, Evolution ou Resend).");
    return NextResponse.json(
      { error: "O envio de mensagens ainda não está disponível. Escreva diretamente para o e-mail ao lado." },
      { status: 503 },
    );
  }

  // 1. Guarda a mensagem (assim ela nunca se perde, mesmo se os avisos falharem).
  let id: string | null = null;
  if (channels.db) {
    try {
      id = await saveContactMessage(parsed.data);
    } catch (error) {
      console.error("[contato] Falha ao salvar no banco:", error);
    }
  }

  // 2. Avisa no WhatsApp e/ou por e-mail.
  let delivered = false;
  if (channels.whatsapp) {
    try {
      await sendWhatsAppNotification(parsed.data);
      delivered = true;
      if (id) await markDelivered(id, "whatsapp").catch(() => {});
    } catch (error) {
      console.error("[contato] Falha no aviso por WhatsApp:", error);
    }
  }
  if (channels.email) {
    try {
      await sendContactEmail(parsed.data);
      delivered = true;
      if (id) await markDelivered(id, "email").catch(() => {});
    } catch (error) {
      console.error("[contato] Falha no envio por e-mail:", error);
    }
  }

  if (id || delivered) {
    return NextResponse.json({ ok: true });
  }

  return NextResponse.json(
    { error: "Não foi possível enviar agora. Tente novamente ou escreva para o e-mail ao lado." },
    { status: 502 },
  );
}
