import "server-only";

import nodemailer, { type Transporter } from "nodemailer";

import type { ContactData } from "./contact-schema";
import { autoReply, ownerNotification } from "./email-templates";

/**
 * E-mails do formulário de contato por SMTP (ex.: caixa contato@ do domínio na Hostinger).
 * Variáveis: SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASSWORD, CONTACT_FROM_EMAIL, CONTACT_TO_EMAIL.
 */

let transporter: Transporter | null = null;

function config() {
  const host = process.env.SMTP_HOST;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASSWORD;
  const from = process.env.CONTACT_FROM_EMAIL;
  if (!host || !user || !pass || !from) return null;
  const port = Number(process.env.SMTP_PORT ?? 465);
  return { host, port, secure: port === 465, user, pass, from, to: process.env.CONTACT_TO_EMAIL };
}

export function isEmailConfigured() {
  return config() !== null;
}

function getTransporter() {
  const settings = config();
  if (!settings) throw new Error("E-mail não configurado.");
  transporter ??= nodemailer.createTransport({
    host: settings.host,
    port: settings.port,
    secure: settings.secure,
    auth: { user: settings.user, pass: settings.pass },
    connectionTimeout: 10_000,
    greetingTimeout: 10_000,
    socketTimeout: 15_000,
  });
  return { transporter, settings };
}

/** Avisa a dona do portfólio, com a mensagem completa (responder vai direto para o visitante). */
export async function sendOwnerNotification(data: ContactData, receivedAt = new Date()) {
  const { transporter: mailer, settings } = getTransporter();
  if (!settings.to) throw new Error("CONTACT_TO_EMAIL não configurado.");
  const mail = ownerNotification(data, receivedAt);
  await mailer.sendMail({ from: settings.from, to: settings.to, replyTo: data.email, ...mail });
}

/** Confirma o recebimento para quem escreveu. */
export async function sendAutoReply(data: ContactData) {
  const { transporter: mailer, settings } = getTransporter();
  const mail = autoReply(data);
  await mailer.sendMail({
    from: settings.from,
    to: data.email,
    replyTo: settings.to ?? settings.from,
    headers: { "Auto-Submitted": "auto-replied", "X-Auto-Response-Suppress": "All" },
    ...mail,
  });
}
