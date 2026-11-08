import "server-only";

import { formatPhone, whatsappLink, type ContactData } from "./contact-schema";

/**
 * Aviso de nova mensagem no WhatsApp, pela Evolution API (v2).
 * Variáveis: EVOLUTION_API_URL, EVOLUTION_API_KEY, EVOLUTION_INSTANCE, CONTACT_WHATSAPP_NUMBER.
 */

function config() {
  const url = process.env.EVOLUTION_API_URL;
  const apiKey = process.env.EVOLUTION_API_KEY;
  const instance = process.env.EVOLUTION_INSTANCE;
  const number = process.env.CONTACT_WHATSAPP_NUMBER;
  if (!url || !apiKey || !instance || !number) return null;
  return { url: url.replace(/\/$/, ""), apiKey, instance, number };
}

export function isWhatsAppConfigured() {
  return config() !== null;
}

export async function sendWhatsAppNotification(data: ContactData) {
  const settings = config();
  if (!settings) throw new Error("WhatsApp não configurado.");

  const text = [
    "*Nova mensagem pelo portfólio*",
    "",
    `*Nome:* ${data.name}`,
    `*E-mail:* ${data.email}`,
    `*Telefone:* ${formatPhone(data.phone)}`,
    `*Assunto:* ${data.subject}`,
    "",
    data.message,
    "",
    `Chamar no WhatsApp: ${whatsappLink(data.phone)}`,
  ].join("\n");

  const response = await fetch(`${settings.url}/message/sendText/${encodeURIComponent(settings.instance)}`, {
    method: "POST",
    headers: { apikey: settings.apiKey, "Content-Type": "application/json" },
    body: JSON.stringify({ number: settings.number, text }),
    signal: AbortSignal.timeout(12_000),
  });

  if (!response.ok) {
    const detail = await response.text().catch(() => "");
    throw new Error(`Evolution respondeu ${response.status}: ${detail.slice(0, 300)}`);
  }
}
