import "server-only";

import type { ContactData } from "./contact-schema";

/**
 * Envio das mensagens do formulário pelo Resend (API HTTP, sem dependência extra).
 * Documentação: https://resend.com/docs/api-reference/emails/send-email
 * Variáveis: RESEND_API_KEY, CONTACT_FROM_EMAIL, CONTACT_TO_EMAIL (veja .env.example).
 */

export class MailerNotConfiguredError extends Error {
  constructor() {
    super("Envio de e-mail não configurado.");
  }
}

export class MailerSendError extends Error {}

export function isEmailConfigured() {
  return Boolean(process.env.RESEND_API_KEY && process.env.CONTACT_FROM_EMAIL && process.env.CONTACT_TO_EMAIL);
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export async function sendContactEmail(data: ContactData) {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.CONTACT_FROM_EMAIL;
  const to = process.env.CONTACT_TO_EMAIL;

  if (!apiKey || !from || !to) {
    throw new MailerNotConfiguredError();
  }

  const text = [
    `Nome: ${data.name}`,
    `E-mail: ${data.email}`,
    `Assunto: ${data.subject}`,
    "",
    data.message,
  ].join("\n");

  const html = `
    <div style="font-family:Arial,Helvetica,sans-serif;font-size:15px;line-height:1.6;color:#0b1020">
      <p style="margin:0 0 16px;font-size:13px;color:#5a6478">Nova mensagem pelo portfólio</p>
      <p style="margin:0"><strong>Nome:</strong> ${escapeHtml(data.name)}</p>
      <p style="margin:0"><strong>E-mail:</strong> ${escapeHtml(data.email)}</p>
      <p style="margin:0 0 16px"><strong>Assunto:</strong> ${escapeHtml(data.subject)}</p>
      <p style="margin:0;white-space:pre-wrap">${escapeHtml(data.message)}</p>
    </div>`;

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [to],
      reply_to: data.email,
      subject: `[Portfólio] ${data.subject}`,
      text,
      html,
    }),
    signal: AbortSignal.timeout(10_000),
  });

  if (!response.ok) {
    const detail = await response.text().catch(() => "");
    throw new MailerSendError(`Resend respondeu ${response.status}: ${detail.slice(0, 300)}`);
  }
}
