"use client";

import { Check, Copy } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export function CopyEmail({ email }: { email: string }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      toast.success("E-mail copiado.");
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("Não foi possível copiar. Selecione o e-mail e copie manualmente.");
    }
  }

  return (
    <button
      type="button"
      onClick={copy}
      aria-label={copied ? "E-mail copiado" : "Copiar e-mail"}
      title={copied ? "Copiado" : "Copiar e-mail"}
      className="relative z-10 inline-flex size-9 shrink-0 items-center justify-center rounded-lg border border-border text-muted transition-colors hover:border-primary hover:text-primary active:scale-95"
    >
      {copied ? <Check className="size-4 text-success" /> : <Copy className="size-4" />}
    </button>
  );
}
