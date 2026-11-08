"use client";

import { Sparkles } from "lucide-react";
import { motion, useSpring, useTransform, type MotionValue } from "motion/react";
import Image from "next/image";
import { SiNodedotjs, SiReact } from "react-icons/si";

import { siteConfig } from "@/content/site";

const terminalLines = [
  { prefix: "~/projetos", text: "$ deploy --producao", tone: "command" },
  { prefix: "✓", text: "api      Node.js · PostgreSQL", tone: "ok" },
  { prefix: "✓", text: "web      Next.js · React", tone: "ok" },
  { prefix: "✓", text: "mobile   React Native", tone: "ok" },
  { prefix: "✓", text: "bot      WhatsApp · IA", tone: "ok" },
] as const;

type HeroVisualProps = {
  /** Posição do ponteiro na seção, de -0.5 a 0.5. */
  pointerX: MotionValue<number>;
  pointerY: MotionValue<number>;
};

function useDepth(value: MotionValue<number>, depth: number) {
  const spring = useSpring(value, { stiffness: 90, damping: 20, mass: 0.6 });
  return useTransform(spring, (v) => v * depth);
}

export function HeroVisual({ pointerX, pointerY }: HeroVisualProps) {
  const photoX = useDepth(pointerX, -10);
  const photoY = useDepth(pointerY, -10);
  const cardX = useDepth(pointerX, 22);
  const cardY = useDepth(pointerY, 22);
  const chipX = useDepth(pointerX, 34);
  const chipY = useDepth(pointerY, 34);

  return (
    <div className="relative mx-auto w-full max-w-[22rem] sm:max-w-[25rem] lg:max-w-none">
      {/* Halo */}
      <div
        aria-hidden="true"
        className="absolute -inset-10 -z-10 rounded-full bg-[radial-gradient(closest-side,var(--glow),transparent)] blur-2xl"
      />

      {/* Foto */}
      <motion.div
        style={{ x: photoX, y: photoY }}
        initial={{ opacity: 0, scale: 0.94, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
        className="relative ml-auto w-[82%] rounded-[2rem] bg-gradient-to-br from-primary/60 via-border-strong to-deep/60 p-[1.5px]"
      >
        <div className="relative aspect-[4/5] overflow-hidden rounded-[calc(2rem-1.5px)] bg-surface-2">
          <Image
            src={siteConfig.photo.src}
            alt={siteConfig.photo.alt}
            fill
            preload
            sizes="(min-width: 1024px) 380px, 80vw"
            className="object-cover object-[50%_18%]"
          />
          <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[#06080f]/70 to-transparent" />
          <p className="absolute right-5 bottom-4 hidden font-mono text-[0.7rem] tracking-[0.16em] text-white/85 uppercase lg:block">
            {siteConfig.shortName} · Full Stack
          </p>
        </div>
      </motion.div>

      {/* Terminal */}
      <motion.div
        style={{ x: cardX, y: cardY }}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
        className="absolute -bottom-8 -left-2 w-[78%] sm:-left-6"
        aria-hidden="true"
      >
        <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#0a0f1c]/95 text-[0.7rem] text-slate-300 shadow-[0_30px_60px_-30px_rgba(5,10,30,0.9)] backdrop-blur sm:text-xs">
          <div className="flex items-center gap-1.5 border-b border-white/5 px-4 py-2.5">
            <span className="size-2.5 rounded-full bg-[#ff5f57]" />
            <span className="size-2.5 rounded-full bg-[#febc2e]" />
            <span className="size-2.5 rounded-full bg-[#28c840]" />
            <span className="ml-3 font-mono text-[0.65rem] text-slate-500">terminal — zsh</span>
          </div>
          <div className="space-y-1.5 px-4 py-3.5 font-mono">
            {terminalLines.map((line, index) => (
              <motion.p
                key={line.text}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.9 + index * 0.28, duration: 0.3 }}
                className="flex gap-2 whitespace-nowrap"
              >
                <span className={line.tone === "ok" ? "text-emerald-400" : "text-sky-400"}>{line.prefix}</span>
                <span className={line.tone === "command" ? "text-slate-100" : "text-slate-400"}>{line.text}</span>
              </motion.p>
            ))}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 + terminalLines.length * 0.28 }}
              className="flex items-center gap-2 pt-1"
            >
              <span className="relative inline-flex size-2">
                <span className="absolute inline-flex size-full animate-pulse-ring rounded-full bg-emerald-400" />
                <span className="relative inline-flex size-2 rounded-full bg-emerald-400" />
              </span>
              <span className="text-slate-200">pronto para produção</span>
              <span className="inline-block h-3.5 w-1.5 animate-caret bg-slate-300" />
            </motion.p>
          </div>
        </div>
      </motion.div>

      {/* Etiquetas flutuantes */}
      <motion.div
        style={{ x: chipX, y: chipY }}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.75 }}
        className="absolute top-6 -left-1 sm:left-0"
        aria-hidden="true"
      >
        <div className="flex animate-float items-center gap-2 rounded-2xl card-surface px-3.5 py-2.5 text-xs font-medium">
          <span className="flex -space-x-1">
            <span className="inline-flex size-6 items-center justify-center rounded-full bg-[#08a6cc]/12 text-[#08a6cc] ring-2 ring-surface">
              <SiReact className="size-3.5" />
            </span>
            <span className="inline-flex size-6 items-center justify-center rounded-full bg-[#5fa04e]/12 text-[#5fa04e] ring-2 ring-surface">
              <SiNodedotjs className="size-3.5" />
            </span>
          </span>
          Front + Back
        </div>
      </motion.div>

      <motion.div
        style={{ x: chipX, y: chipY }}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.95 }}
        className="absolute top-[42%] -right-2 sm:-right-6"
        aria-hidden="true"
      >
        <div className="flex animate-float items-center gap-2 rounded-2xl card-surface px-3.5 py-2.5 text-xs font-medium [animation-delay:1.4s]">
          <span className="inline-flex size-6 items-center justify-center rounded-full bg-primary-soft text-primary">
            <Sparkles className="size-3.5" />
          </span>
          IA aplicada
        </div>
      </motion.div>
    </div>
  );
}
