import Image from "next/image";

import { cn } from "@/lib/utils";

/** Símbolo "YV" da logo YV Tech, sempre sobre um ladrilho escuro (as letras são claras). */
export function LogoMark({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "relative inline-flex size-9 shrink-0 items-center justify-center overflow-hidden rounded-[11px] bg-gradient-to-br from-[#0b1b52] to-[#06080f] ring-1 ring-white/10",
        className,
      )}
    >
      <Image src="/brand/yv-mark.png" alt="" width={293} height={160} className="h-auto w-[82%]" />
    </span>
  );
}

export function Logo({ className }: { className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <LogoMark />
      <span className="font-display text-[0.95rem] leading-none font-bold tracking-tight">
        YV<span className="ml-1.5 font-medium tracking-[0.22em] text-primary">TECH</span>
      </span>
    </span>
  );
}
