import { BellRing, Bot, UserRound } from "lucide-react";
import { SiTelegram } from "react-icons/si";

import { PhoneFrame } from "./mockup-frame";

export function BotsMockup() {
  return (
    <div className="relative flex justify-center py-2 text-[10px]">
      <PhoneFrame className="w-[56%]">
        <div className="flex items-center gap-1.5 border-b border-border bg-surface-2/70 px-3 pt-5 pb-2">
          <span className="inline-flex size-5 items-center justify-center rounded-full bg-primary text-primary-foreground">
            <Bot className="size-3" />
          </span>
          <span>
            <span className="block font-medium">Assistente virtual</span>
            <span className="block text-[8px] text-success">online</span>
          </span>
        </div>
        <div className="flex flex-col gap-1.5 bg-surface-2/30 p-2.5">
          <p className="max-w-[85%] rounded-lg rounded-bl-sm bg-surface px-2 py-1 shadow-sm">Olá! Como posso ajudar?</p>
          <p className="max-w-[85%] self-end rounded-lg rounded-br-sm bg-primary px-2 py-1 text-primary-foreground">
            Quero remarcar meu horário
          </p>
          <p className="max-w-[85%] rounded-lg rounded-bl-sm bg-surface px-2 py-1 shadow-sm">
            Claro! Tenho quinta às 10h ou sexta às 15h.
          </p>
          <p className="max-w-[85%] self-end rounded-lg rounded-br-sm bg-primary px-2 py-1 text-primary-foreground">
            Prefiro falar com alguém
          </p>
          <p className="mx-auto mt-0.5 inline-flex items-center gap-1 rounded-full border border-border bg-surface px-2 py-0.5 text-[8px] text-muted">
            <UserRound className="size-2.5" /> Conversa transferida para a equipe
          </p>
          <span className="inline-flex w-10 items-center justify-center gap-0.5 rounded-lg bg-surface py-1.5 shadow-sm">
            <span className="size-1 animate-bounce rounded-full bg-subtle" />
            <span className="size-1 animate-bounce rounded-full bg-subtle [animation-delay:120ms]" />
            <span className="size-1 animate-bounce rounded-full bg-subtle [animation-delay:240ms]" />
          </span>
        </div>
      </PhoneFrame>

      <div className="absolute top-6 right-0 w-[40%] rounded-xl card-surface p-2">
        <p className="flex items-center gap-1 font-medium">
          <SiTelegram className="size-3 text-[#26a5e4]" /> Telegram
        </p>
        <p className="mt-1 flex items-start gap-1 text-[8.5px] leading-snug text-muted">
          <BellRing className="mt-px size-2.5 shrink-0 text-primary" />
          Aviso: nova solicitação recebida
        </p>
      </div>
    </div>
  );
}
