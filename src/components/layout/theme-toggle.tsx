"use client";

import { Moon, Sun } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useTheme } from "next-themes";
import type { MouseEvent } from "react";
import { flushSync } from "react-dom";

import { Button } from "@/components/ui/button";
import { useMounted } from "@/hooks/use-mounted";

type ViewTransitionDocument = Document & {
  startViewTransition?: (callback: () => void) => { ready: Promise<void> };
};

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const mounted = useMounted();
  const isDark = mounted && resolvedTheme === "dark";
  const label = isDark ? "Ativar modo claro" : "Ativar modo escuro";

  function toggle(event: MouseEvent<HTMLButtonElement>) {
    const next = isDark ? "light" : "dark";
    const doc = document as ViewTransitionDocument;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!doc.startViewTransition || reduceMotion) {
      setTheme(next);
      return;
    }

    // Transição circular a partir do botão.
    const x = event.clientX || window.innerWidth - 40;
    const y = event.clientY || 32;
    const radius = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y));

    const transition = doc.startViewTransition(() => {
      flushSync(() => setTheme(next));
      document.documentElement.classList.toggle("dark", next === "dark");
    });

    transition.ready
      .then(() => {
        document.documentElement.animate(
          { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`] },
          { duration: 520, easing: "cubic-bezier(0.22, 1, 0.36, 1)", pseudoElement: "::view-transition-new(root)" },
        );
      })
      .catch(() => {});
  }

  return (
    <Button variant="ghost" size="icon" onClick={toggle} aria-label={label} title={label} className="relative overflow-hidden">
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={isDark ? "moon" : "sun"}
          initial={{ y: 14, opacity: 0, rotate: -40 }}
          animate={{ y: 0, opacity: 1, rotate: 0 }}
          exit={{ y: -14, opacity: 0, rotate: 40 }}
          transition={{ duration: 0.25 }}
          className="inline-flex"
        >
          {isDark ? <Moon className="size-[1.1rem]" /> : <Sun className="size-[1.1rem]" />}
        </motion.span>
      </AnimatePresence>
    </Button>
  );
}
