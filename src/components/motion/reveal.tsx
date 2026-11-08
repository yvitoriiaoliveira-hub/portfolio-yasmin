"use client";

import { motion, type HTMLMotionProps } from "motion/react";

type RevealProps = HTMLMotionProps<"div"> & {
  delay?: number;
  y?: number;
};

/** Revela o conteúdo quando ele entra na tela (respeita a redução de movimento pelo MotionConfig). */
export function Reveal({ delay = 0, y = 24, children, ...props }: RevealProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      {...props}
    >
      {children}
    </motion.div>
  );
}

/** Igual ao Reveal, mas como item de lista (para usar dentro de <ul>/<ol>). */
export function RevealItem({ delay = 0, y = 24, children, ...props }: HTMLMotionProps<"li"> & { delay?: number; y?: number }) {
  return (
    <motion.li
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      {...props}
    >
      {children}
    </motion.li>
  );
}

type StaggerProps = HTMLMotionProps<"div"> & { stagger?: number; delay?: number };

export function Stagger({ stagger = 0.08, delay = 0, children, ...props }: StaggerProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      variants={{ hidden: {}, show: { transition: { staggerChildren: stagger, delayChildren: delay } } }}
      {...props}
    >
      {children}
    </motion.div>
  );
}

export const staggerItem = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const } },
};

export function StaggerItem({ children, ...props }: HTMLMotionProps<"div">) {
  return (
    <motion.div variants={staggerItem} {...props}>
      {children}
    </motion.div>
  );
}
