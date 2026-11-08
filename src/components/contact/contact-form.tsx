"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { CircleCheck, LoaderCircle, Send } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { useForm, useWatch, type FieldError } from "react-hook-form";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { contactSchema, maskPhone, type ContactData, type ContactInput } from "@/lib/contact-schema";
import { cn } from "@/lib/utils";

const fieldClass =
  "w-full rounded-xl border bg-background px-4 py-3 text-[0.95rem] text-foreground placeholder:text-subtle transition-[border-color,box-shadow] duration-200 outline-none focus:border-primary focus:ring-4 focus:ring-primary/15";

function FieldMessage({ id, error }: { id: string; error?: FieldError }) {
  return (
    <AnimatePresence initial={false}>
      {error?.message ? (
        <motion.p
          id={id}
          role="alert"
          initial={{ opacity: 0, y: -4, height: 0 }}
          animate={{ opacity: 1, y: 0, height: "auto" }}
          exit={{ opacity: 0, y: -4, height: 0 }}
          className="mt-1.5 text-sm text-danger"
        >
          {error.message}
        </motion.p>
      ) : null}
    </AnimatePresence>
  );
}

export function ContactForm() {
  const [sent, setSent] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors, isSubmitting },
  } = useForm<ContactInput, unknown, ContactData>({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: "", email: "", phone: "", subject: "", message: "", website: "" },
    mode: "onTouched",
  });
  const phoneField = register("phone");

  const message = useWatch({ control, name: "message" });
  const messageLength = message?.length ?? 0;

  async function onSubmit(data: ContactData) {
    try {
      const response = await fetch("/api/contato", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = (await response.json().catch(() => ({}))) as { error?: string };

      if (!response.ok) {
        toast.error(result.error ?? "Não foi possível enviar sua mensagem. Tente novamente.");
        return;
      }

      toast.success("Mensagem enviada! Vou responder assim que possível.");
      (window as Window & { umami?: { track: (event: string) => void } }).umami?.track("mensagem-enviada");
      reset();
      setSent(true);
    } catch {
      toast.error("Sem conexão com o servidor. Verifique sua internet e tente de novo.");
    }
  }

  if (sent) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex h-full min-h-[26rem] flex-col items-center justify-center rounded-3xl card-surface p-8 text-center"
        role="status"
      >
        <motion.span
          initial={{ scale: 0, rotate: -30 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 260, damping: 16, delay: 0.1 }}
          className="inline-flex size-16 items-center justify-center rounded-full bg-success/12 text-success"
        >
          <CircleCheck className="size-8" />
        </motion.span>
        <h3 className="mt-6 text-2xl font-semibold tracking-tight">Mensagem enviada</h3>
        <p className="mt-2 max-w-sm text-muted">
          Obrigada pelo contato! Vou ler com atenção e responder pelo e-mail ou pelo telefone informado.
        </p>
        <Button variant="secondary" className="mt-8" onClick={() => setSent(false)}>
          Enviar outra mensagem
        </Button>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="relative rounded-3xl card-surface p-6 sm:p-8" aria-label="Formulário de contato">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="contato-nome" className="text-sm font-medium">
            Nome
          </label>
          <input
            id="contato-nome"
            autoComplete="name"
            placeholder="Como posso te chamar?"
            aria-invalid={errors.name ? "true" : undefined}
            aria-describedby={errors.name ? "contato-nome-erro" : undefined}
            className={cn(fieldClass, "mt-2", errors.name ? "border-danger" : "border-border")}
            {...register("name")}
          />
          <FieldMessage id="contato-nome-erro" error={errors.name} />
        </div>
        <div>
          <label htmlFor="contato-email" className="text-sm font-medium">
            E-mail
          </label>
          <input
            id="contato-email"
            type="email"
            inputMode="email"
            autoComplete="email"
            placeholder="voce@empresa.com"
            aria-invalid={errors.email ? "true" : undefined}
            aria-describedby={errors.email ? "contato-email-erro" : undefined}
            className={cn(fieldClass, "mt-2", errors.email ? "border-danger" : "border-border")}
            {...register("email")}
          />
          <FieldMessage id="contato-email-erro" error={errors.email} />
        </div>
      </div>

      <div className="mt-5 grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="contato-telefone" className="text-sm font-medium">
            Telefone / WhatsApp
          </label>
          <input
            id="contato-telefone"
            type="tel"
            inputMode="tel"
            autoComplete="tel-national"
            placeholder="(31) 99999-9999"
            aria-invalid={errors.phone ? "true" : undefined}
            aria-describedby={errors.phone ? "contato-telefone-erro" : undefined}
            className={cn(fieldClass, "mt-2", errors.phone ? "border-danger" : "border-border")}
            {...phoneField}
            onChange={(event) => {
              event.target.value = maskPhone(event.target.value);
              return phoneField.onChange(event);
            }}
          />
          <FieldMessage id="contato-telefone-erro" error={errors.phone} />
        </div>
        <div>
          <label htmlFor="contato-assunto" className="text-sm font-medium">
            Assunto
          </label>
          <input
            id="contato-assunto"
            placeholder="Oportunidade, projeto, parceria…"
            aria-invalid={errors.subject ? "true" : undefined}
            aria-describedby={errors.subject ? "contato-assunto-erro" : undefined}
            className={cn(fieldClass, "mt-2", errors.subject ? "border-danger" : "border-border")}
            {...register("subject")}
          />
          <FieldMessage id="contato-assunto-erro" error={errors.subject} />
        </div>
      </div>

      <div className="mt-5">
        <div className="flex items-baseline justify-between">
          <label htmlFor="contato-mensagem" className="text-sm font-medium">
            Mensagem
          </label>
          <span className={cn("font-mono text-xs", messageLength > 4000 ? "text-danger" : "text-subtle")} aria-live="polite">
            {messageLength}/4000
          </span>
        </div>
        <textarea
          id="contato-mensagem"
          rows={5}
          placeholder="Conte um pouco sobre a oportunidade ou a ideia."
          aria-invalid={errors.message ? "true" : undefined}
          aria-describedby={errors.message ? "contato-mensagem-erro" : undefined}
          className={cn(fieldClass, "mt-2 resize-y", errors.message ? "border-danger" : "border-border")}
          {...register("message")}
        />
        <FieldMessage id="contato-mensagem-erro" error={errors.message} />
      </div>

      {/* Campo invisível contra robôs */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="contato-site">Não preencha</label>
        <input id="contato-site" tabIndex={-1} autoComplete="off" {...register("website")} />
      </div>

      <div className="mt-7 flex flex-col-reverse gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs text-subtle">Seus dados são usados só para responder a esta mensagem.</p>
        <Button type="submit" size="lg" disabled={isSubmitting} className="min-w-44">
          {isSubmitting ? (
            <>
              <LoaderCircle className="animate-spin" />
              Enviando…
            </>
          ) : (
            <>
              Enviar mensagem
              <Send className="transition-transform duration-200 group-hover/button:translate-x-0.5 group-hover/button:-translate-y-0.5" />
            </>
          )}
        </Button>
      </div>
    </form>
  );
}
