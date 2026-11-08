import { z } from "zod";

/** Só os dígitos do telefone, sem o código do país (aceita quem digita ou cola +55). */
function phoneDigits(value: string) {
  const digits = value.replace(/\D/g, "");
  return digits.length > 11 && digits.startsWith("55") ? digits.slice(2) : digits;
}

/** Máscara enquanto a pessoa digita: (31) 99999-9999 ou (31) 9999-9999. */
export function maskPhone(value: string) {
  const digits = phoneDigits(value).slice(0, 11);
  if (digits.length <= 2) return digits ? `(${digits}` : "";
  const ddd = digits.slice(0, 2);
  const rest = digits.slice(2);
  if (rest.length <= 4) return `(${ddd}) ${rest}`;
  const split = rest.length === 9 ? 5 : 4;
  return `(${ddd}) ${rest.slice(0, split)}-${rest.slice(split)}`;
}

/** Telefone guardado (só dígitos, com DDD) no formato de leitura. */
export function formatPhone(digits: string) {
  return maskPhone(digits);
}

/** Link para abrir conversa no WhatsApp com o número informado. */
export function whatsappLink(digits: string) {
  return `https://wa.me/55${digits}`;
}

/** Validação compartilhada entre o formulário (navegador) e a API (servidor). */
export const contactSchema = z.object({
  name: z.string().trim().min(2, "Informe seu nome.").max(80, "Use no máximo 80 caracteres."),
  email: z.string().trim().pipe(z.email("Informe um e-mail válido.")).pipe(z.string().max(120, "E-mail muito longo.")),
  /** Telefone com DDD, obrigatório; guardado só com os dígitos. */
  phone: z
    .string()
    .trim()
    .min(1, "Informe seu telefone com DDD.")
    .transform(phoneDigits)
    .pipe(z.string().regex(/^[1-9]{2}\d{8,9}$/, "Informe um telefone com DDD, como (31) 99999-9999.")),
  subject: z.string().trim().min(3, "Informe o assunto.").max(120, "Use no máximo 120 caracteres."),
  message: z
    .string()
    .trim()
    .min(10, "Escreva uma mensagem com pelo menos 10 caracteres.")
    .max(4000, "Use no máximo 4000 caracteres."),
  /** Campo invisível contra robôs: pessoas reais deixam vazio. */
  website: z.string().max(300).optional(),
});

export type ContactInput = z.input<typeof contactSchema>;
export type ContactData = z.output<typeof contactSchema>;
