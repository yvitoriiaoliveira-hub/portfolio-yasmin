import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

/** Moldura de navegador usada nas ilustrações e nas telas reais. */
export function BrowserFrame({ url, children, className }: { url: string; children: ReactNode; className?: string }) {
  return (
    <div className={cn("overflow-hidden rounded-xl border border-border bg-surface shadow-card", className)}>
      <div className="flex items-center gap-3 border-b border-border bg-surface-2/70 px-3 py-2">
        <span className="flex gap-1">
          <span className="size-2 rounded-full bg-[#ff5f57]" />
          <span className="size-2 rounded-full bg-[#febc2e]" />
          <span className="size-2 rounded-full bg-[#28c840]" />
        </span>
        <span className="flex-1 truncate rounded-md bg-background px-2 py-0.5 text-center font-mono text-[9px] text-subtle">
          {url}
        </span>
      </div>
      {children}
    </div>
  );
}

export function PhoneFrame({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn("rounded-[1.6rem] border border-border-strong bg-surface-3 p-1.5 shadow-card", className)}>
      <div className="relative overflow-hidden rounded-[1.25rem] bg-surface">
        <div className="absolute top-1.5 left-1/2 z-10 h-1 w-10 -translate-x-1/2 rounded-full bg-border-strong" />
        {children}
      </div>
    </div>
  );
}
