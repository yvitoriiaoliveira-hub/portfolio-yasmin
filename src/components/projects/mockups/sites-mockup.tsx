import { Moon, Search, Smartphone } from "lucide-react";

import { BrowserFrame, PhoneFrame } from "./mockup-frame";

export function SitesMockup() {
  return (
    <div className="relative pr-10 pb-6 text-[10px]">
      <BrowserFrame url="seusite.com.br">
        <div className="space-y-3 p-4">
          <div className="flex items-center justify-between">
            <span className="h-2 w-10 rounded-full bg-foreground/80" />
            <span className="flex gap-1.5">
              <span className="h-1.5 w-6 rounded-full bg-border-strong" />
              <span className="h-1.5 w-6 rounded-full bg-border-strong" />
              <span className="h-1.5 w-6 rounded-full bg-border-strong" />
            </span>
          </div>
          <div className="space-y-1.5 pt-2">
            <span className="block h-3.5 w-3/4 rounded-md bg-gradient-to-r from-foreground/85 to-primary/80" />
            <span className="block h-3.5 w-1/2 rounded-md bg-foreground/80" />
            <span className="block h-1.5 w-2/3 rounded-full bg-border-strong" />
          </div>
          <div className="flex gap-1.5">
            <span className="h-4 w-14 rounded-md bg-primary" />
            <span className="h-4 w-12 rounded-md border border-border-strong" />
          </div>
          <div className="grid grid-cols-3 gap-1.5 pt-1">
            {[0, 1, 2].map((item) => (
              <span key={item} className="h-10 rounded-lg border border-border bg-surface-2" />
            ))}
          </div>
        </div>
      </BrowserFrame>

      <PhoneFrame className="absolute right-0 bottom-0 w-[30%]">
        <div className="space-y-1.5 px-2 pt-5 pb-3">
          <span className="block h-2 w-3/4 rounded bg-gradient-to-r from-foreground/85 to-primary/80" />
          <span className="block h-2 w-1/2 rounded bg-foreground/80" />
          <span className="block h-1 w-full rounded-full bg-border-strong" />
          <span className="block h-3 w-1/2 rounded bg-primary" />
          <span className="block h-8 rounded-md border border-border bg-surface-2" />
          <span className="block h-8 rounded-md border border-border bg-surface-2" />
        </div>
      </PhoneFrame>

      <div className="absolute -top-2 left-3 flex gap-1">
        {[
          { icon: Smartphone, label: "Responsivo" },
          { icon: Search, label: "SEO" },
          { icon: Moon, label: "Tema escuro" },
        ].map(({ icon: Icon, label }) => (
          <span
            key={label}
            className="inline-flex items-center gap-1 rounded-md border border-border bg-surface px-1.5 py-0.5 text-[8.5px] text-muted shadow-sm"
          >
            <Icon className="size-2.5 text-primary" /> {label}
          </span>
        ))}
      </div>
    </div>
  );
}
