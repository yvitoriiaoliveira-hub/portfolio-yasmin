import { z } from "zod";

/** Validação compartilhada entre o formulário (navegador) e a API (servidor). */
export const contactSchema = z.object({
  name: z.string().trim().min(2, "Informe seu nome.").max(80, "Use no máximo 80 caracteres."),
  email: z.string().trim().pipe(z.email("Informe um e-mail válido.")).pipe(z.string().max(120, "E-mail muito longo.")),
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
