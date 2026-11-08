import "server-only";

import { siteConfig } from "@/content/site";

import type { ContactData } from "./contact-schema";

/** Modelos dos e-mails do formulário de contato (HTML compatível com clientes de e-mail + texto puro). */

const BRAND = { deep: "#0b1b52", primary: "#2a4fe0", text: "#0b1020", muted: "#566078", border: "#dfe4ef", bg: "#f5f7fb" };

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/** Primeiro nome, só com letras (a resposta automática não repete texto livre do visitante). */
export function safeFirstName(name: string) {
  const first = name.trim().split(/\s+/)[0] ?? "";
  const clean = first.replace(/[^\p{L}'-]/gu, "").slice(0, 30);
  return clean.length >= 2 ? clean : "";
}

function layout(title: string, content: string) {
  const logo = `${siteConfig.url}/brand/icon-192.png`;
  return `<!doctype html>
<html lang="pt-BR">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${escapeHtml(title)}</title></head>
<body style="margin:0;padding:0;background:${BRAND.bg};font-family:Arial,Helvetica,sans-serif;color:${BRAND.text}">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${BRAND.bg};padding:32px 12px">
    <tr><td align="center">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background:#ffffff;border:1px solid ${BRAND.border};border-radius:16px;overflow:hidden">
        <tr><td style="background:${BRAND.deep};padding:22px 28px">
          <table role="presentation" cellpadding="0" cellspacing="0"><tr>
            <td style="padding-right:12px"><img src="${logo}" width="40" height="40" alt="YV Tech" style="display:block;border-radius:10px"></td>
            <td style="color:#ffffff;font-size:16px;font-weight:bold;letter-spacing:.5px">YV <span style="color:#9fb3ff;letter-spacing:3px;font-weight:normal">TECH</span></td>
          </tr></table>
        </td></tr>
        <tr><td style="padding:28px">${content}</td></tr>
        <tr><td style="padding:18px 28px;border-top:1px solid ${BRAND.border};font-size:12px;color:${BRAND.muted};line-height:1.6">
          ${escapeHtml(siteConfig.shortName)} · ${escapeHtml(siteConfig.role)}<br>
          <a href="${siteConfig.url}" style="color:${BRAND.primary};text-decoration:none">${siteConfig.url.replace(/^https?:\/\//, "")}</a>
          &nbsp;·&nbsp; <a href="${siteConfig.links.linkedin}" style="color:${BRAND.primary};text-decoration:none">LinkedIn</a>
          &nbsp;·&nbsp; <a href="${siteConfig.links.github}" style="color:${BRAND.primary};text-decoration:none">GitHub</a>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

function button(href: string, label: string) {
  return `<a href="${href}" style="display:inline-block;background:${BRAND.primary};color:#ffffff;text-decoration:none;font-weight:bold;font-size:14px;padding:12px 20px;border-radius:10px">${escapeHtml(label)}</a>`;
}

/** E-mail para a dona do portfólio: a mensagem completa. */
export function ownerNotification(data: ContactData, receivedAt: Date) {
  const when = receivedAt.toLocaleString("pt-BR", { timeZone: "America/Sao_Paulo", dateStyle: "short", timeStyle: "short" });
  const replyHref = `mailto:${encodeURIComponent(data.email)}?subject=${encodeURIComponent(`Re: ${data.subject}`)}`;
  const subject = `[Portfólio] ${data.subject}`;

  const html = layout(
    subject,
    `<p style="margin:0 0 4px;font-size:12px;letter-spacing:2px;color:${BRAND.primary};text-transform:uppercase">Nova mensagem pelo portfólio</p>
     <h1 style="margin:0 0 20px;font-size:20px;line-height:1.3">${escapeHtml(data.subject)}</h1>
     <table role="presentation" cellpadding="0" cellspacing="0" style="font-size:14px;line-height:1.7;margin-bottom:18px">
       <tr><td style="color:${BRAND.muted};padding-right:14px">Nome</td><td><strong>${escapeHtml(data.name)}</strong></td></tr>
       <tr><td style="color:${BRAND.muted};padding-right:14px">E-mail</td><td><a href="mailto:${escapeHtml(data.email)}" style="color:${BRAND.primary}">${escapeHtml(data.email)}</a></td></tr>
       <tr><td style="color:${BRAND.muted};padding-right:14px">Recebida em</td><td>${escapeHtml(when)}</td></tr>
     </table>
     <div style="background:${BRAND.bg};border:1px solid ${BRAND.border};border-radius:12px;padding:16px 18px;font-size:15px;line-height:1.6;white-space:pre-wrap">${escapeHtml(data.message)}</div>
     <p style="margin:24px 0 0">${button(replyHref, "Responder")}</p>`,
  );

  const text = [`Nova mensagem pelo portfólio`, ``, `Nome: ${data.name}`, `E-mail: ${data.email}`, `Assunto: ${data.subject}`, `Recebida em: ${when}`, ``, data.message].join("\n");

  return { subject, html, text };
}

/** Resposta automática para quem escreveu (sem repetir o texto enviado, por segurança). */
export function autoReply(data: ContactData) {
  const firstName = safeFirstName(data.name);
  const greeting = firstName ? `Olá, ${firstName}!` : "Olá!";
  const subject = `Recebemos sua mensagem · ${siteConfig.shortName}`;

  const html = layout(
    subject,
    `<h1 style="margin:0 0 16px;font-size:22px;line-height:1.3">${escapeHtml(greeting)}</h1>
     <p style="margin:0 0 14px;font-size:15px;line-height:1.7">Obrigada pelo contato! <strong>Recebemos sua mensagem</strong> e vamos analisar com atenção.</p>
     <p style="margin:0 0 22px;font-size:15px;line-height:1.7">Em breve você recebe um retorno por este e-mail.</p>
     <p style="margin:0 0 26px">${button(`${siteConfig.url}/#projetos`, "Conhecer os projetos")}</p>
     <p style="margin:0;font-size:15px;line-height:1.7">Até logo,<br><strong>${escapeHtml(siteConfig.shortName)}</strong><br><span style="color:${BRAND.muted}">${escapeHtml(siteConfig.role)}</span></p>
     <p style="margin:26px 0 0;font-size:12px;line-height:1.6;color:${BRAND.muted}">Esta é uma resposta automática. Se não foi você que preencheu o formulário em ${siteConfig.url.replace(/^https?:\/\//, "")}, pode ignorar este e-mail.</p>`,
  );

  const text = [
    greeting,
    "",
    "Obrigada pelo contato! Recebemos sua mensagem e vamos analisar com atenção.",
    "Em breve você recebe um retorno por este e-mail.",
    "",
    `Conheça os projetos: ${siteConfig.url}/#projetos`,
    "",
    `Até logo,`,
    `${siteConfig.shortName} · ${siteConfig.role}`,
    "",
    `Esta é uma resposta automática. Se não foi você que preencheu o formulário em ${siteConfig.url}, pode ignorar este e-mail.`,
  ].join("\n");

  return { subject, html, text };
}
