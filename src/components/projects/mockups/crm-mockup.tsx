import { Check, Headset, Search, Sparkles } from "lucide-react";

import { cn } from "@/lib/utils";

import { BrowserFrame } from "./mockup-frame";

const clients = [
  { initials: "AR", name: "Ana R.", note: "Comprou há 2 dias", tag: "VIP", tone: "bg-primary/12 text-primary" },
  { initials: "BM", name: "Bruno M.", note: "Retorno amanhã", tag: "Retorno", tone: "bg-emerald-500/12 text-emerald-600 dark:text-emerald-400" },
  { initials: "CS", name: "Carla S.", note: "Aniversário hoje", tag: "Lembrete", tone: "bg-amber-500/12 text-amber-600 dark:text-amber-400" },
  { initials: "DP", name: "Diego P.", note: "Sem compras há 60 dias", tag: "Reativar", tone: "bg-violet-500/12 text-violet-600 dark:text-violet-400" },
];

const incoming = "max-w-[85%] self-end rounded-lg rounded-br-sm bg-[#d9fdd3] px-2 py-1 text-[#0b1020] dark:bg-[#144d37] dark:text-[#e9edf7]";
const outgoing = "max-w-[85%] rounded-lg rounded-bl-sm bg-surface px-2 py-1 shadow-sm";

export function CrmMockup() {
  return (
    <BrowserFrame url="painel · crm" className="text-[10px]">
      <div className="grid grid-cols-[1.25fr_1fr]">
        {/* Clientes */}
        <div className="border-r border-border p-3">
          <div className="flex items-center justify-between">
            <p className="font-display text-[11px] font-semibold">Clientes</p>
            <span className="rounded-md bg-primary-soft px-1.5 py-0.5 font-mono text-[8px] text-primary">4 ações hoje</span>
          </div>
          <div className="mt-2 flex items-center gap-1.5 rounded-md border border-border bg-surface-2/50 px-2 py-1 text-subtle">
            <Search className="size-3" /> Buscar cliente
          </div>
          <ul className="mt-2 space-y-1.5">
            {clients.map((client) => (
              <li key={client.name} className="flex items-center gap-2 rounded-md border border-border bg-surface-2/40 px-2 py-1.5">
                <span className="inline-flex size-5 shrink-0 items-center justify-center rounded-full bg-surface-3 text-[8px] font-semibold">
                  {client.initials}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate font-medium">{client.name}</span>
                  <span className="block truncate text-[8.5px] text-subtle">{client.note}</span>
                </span>
                <span className={cn("rounded px-1.5 py-0.5 text-[8px] font-medium", client.tone)}>{client.tag}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* WhatsApp com IA */}
        <div className="flex flex-col bg-surface-2/50 p-3">
          <div className="flex items-center gap-1.5">
            <span className="inline-flex size-5 items-center justify-center rounded-full bg-[#25d366]/15 text-[#1aa851]">
              <Sparkles className="size-3" />
            </span>
            <p className="font-medium">Assistente · WhatsApp</p>
          </div>
          <div className="mt-2.5 flex flex-1 flex-col gap-1.5">
            <p className={incoming}>Oi! Ainda tem esse modelo no M?</p>
            <p className={outgoing}>Tenho sim! Quer que eu separe para você?</p>
            <p className={incoming}>Quero!</p>
            <p className={cn(outgoing, "flex items-center gap-1")}>
              Separado <Check className="size-3 text-emerald-500" /> Fica reservado até sábado.
            </p>
          </div>
          <p className="mt-2 inline-flex items-center gap-1 self-start rounded-md border border-border bg-surface px-1.5 py-0.5 text-[8.5px] text-muted">
            <Headset className="size-2.5" /> Equipe pode assumir
          </p>
        </div>
      </div>
    </BrowserFrame>
  );
}
