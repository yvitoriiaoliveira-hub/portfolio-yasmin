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
  id?: string;
};

export function SectionHeading({ index, eyebrow, title, description, align = "left", className, id }: SectionHeadingProps) {
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
      <h2 id={id} className="mt-4 text-3xl leading-[1.12] font-semibold tracking-tight sm:text-4xl lg:text-[2.75rem]">
        {title}
      </h2>
      {description ? <p className="mt-4 text-base leading-relaxed text-muted sm:text-lg">{description}</p> : null}
    </Reveal>
  );
}
