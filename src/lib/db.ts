import "server-only";

import { Pool } from "pg";

import type { ContactData } from "./contact-schema";

/**
 * Banco do portfólio (PostgreSQL). Guarda as mensagens do formulário de contato.
 * Variável: DATABASE_URL (veja .env.example). Sem ela, o formulário segue só com WhatsApp/e-mail.
 */

let pool: Pool | null = null;
let schemaReady: Promise<unknown> | null = null;

const SCHEMA = `
  create table if not exists mensagens_contato (
    id bigserial primary key,
    nome text not null,
    email text not null,
    assunto text not null,
    mensagem text not null,
    criada_em timestamptz not null default now(),
    whatsapp_enviado boolean not null default false,
    email_enviado boolean not null default false,
    lida boolean not null default false
  );
  create index if not exists mensagens_contato_criada_em_idx on mensagens_contato (criada_em desc);
`;

export function isDatabaseConfigured() {
  return Boolean(process.env.DATABASE_URL);
}

function getPool() {
  if (!process.env.DATABASE_URL) return null;
  pool ??= new Pool({ connectionString: process.env.DATABASE_URL, max: 3, idleTimeoutMillis: 30_000 });
  return pool;
}

async function ensureSchema(db: Pool) {
  schemaReady ??= db.query(SCHEMA);
  try {
    await schemaReady;
  } catch (error) {
    schemaReady = null;
    throw error;
  }
}

/** Salva a mensagem e devolve o id criado. */
export async function saveContactMessage(data: ContactData) {
  const db = getPool();
  if (!db) return null;
  await ensureSchema(db);
  const result = await db.query<{ id: string }>(
    "insert into mensagens_contato (nome, email, assunto, mensagem) values ($1, $2, $3, $4) returning id",
    [data.name, data.email, data.subject, data.message],
  );
  return result.rows[0]?.id ?? null;
}

/** Marca por onde a mensagem também foi avisada. */
export async function markDelivered(id: string, channel: "whatsapp" | "email") {
  const db = getPool();
  if (!db) return;
  const column = channel === "whatsapp" ? "whatsapp_enviado" : "email_enviado";
  await db.query(`update mensagens_contato set ${column} = true where id = $1`, [id]);
}
