import type { ReactNode } from "react";

import { Reveal } from "@/components/motion/reveal";
import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  index: string;
  eyebrow: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  className?: string;
  /** Tamanho do título: "lg" (padrão das seções) ou "md" (menor). */
  size?: "md" | "lg";
  id?: string;
};

const titleSizes = {
  lg: "text-3xl sm:text-4xl lg:text-[2.75rem]",
  md: "text-2xl sm:text-[1.75rem] lg:text-[2rem]",
} as const;

export function SectionHeading({ index, eyebrow, title, description, align = "left", className, size = "lg", id }: SectionHeadingProps) {
  return (
    <Reveal className={cn("max-w-3xl", align === "center" && "mx-auto text-center", className)}>
      <p
        className={cn(
          "flex items-center gap-3 font-mono text-xs tracking-[0.18em] text-primary uppercase",
          align === "center" && "justify-center",
        )}
      >
        <span className="text-subtle">{index}</span>
        <span aria-hidden="true" className="h-px w-8 bg-primary/50" />
        {eyebrow}
      </p>
      <h2 id={id} className={cn("mt-4 leading-[1.12] font-semibold tracking-tight", titleSizes[size])}>
        {title}
      </h2>
      {description ? (
        <p className={cn("mt-4 leading-relaxed text-muted", size === "md" ? "text-base" : "text-base sm:text-lg")}>{description}</p>
      ) : null}
    </Reveal>
  );
}
