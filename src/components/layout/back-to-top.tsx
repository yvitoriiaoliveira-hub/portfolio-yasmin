"use client";

import { ArrowUp } from "lucide-react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { useState } from "react";

export function BackToTop() {
  const { scrollY } = useScroll();
  const [visible, setVisible] = useState(false);
  useMotionValueEvent(scrollY, "change", (value) => setVisible(value > 720));

  return (
    <AnimatePresence>
      {visible ? (
        <motion.button
          type="button"
          onClick={() => window.scrollTo({ top: 0 })}
          aria-label="Voltar ao topo"
          title="Voltar ao topo"
          initial={{ opacity: 0, y: 16, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 16, scale: 0.9 }}
          whileHover={{ y: -3 }}
          whileTap={{ scale: 0.92 }}
          className="fixed right-5 bottom-5 z-40 inline-flex size-12 items-center justify-center rounded-2xl border border-border bg-surface/90 text-foreground shadow-card backdrop-blur transition-colors hover:border-primary hover:text-primary sm:right-8 sm:bottom-8"
        >
          <ArrowUp className="size-5" />
        </motion.button>
      ) : null}
    </AnimatePresence>
  );
}
