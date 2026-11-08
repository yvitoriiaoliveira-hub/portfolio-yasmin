"use client";

import { ArrowUpRight, ExternalLink as ExternalIcon } from "lucide-react";
import Link from "next/link";
import { useRef, type PointerEvent, type ReactNode } from "react";
import { SiGithub } from "react-icons/si";

import { ExternalLink } from "@/components/shared/external-link";
import { TechIcon } from "@/components/stack/tech-icon";
import type { Project } from "@/content/types";
import { cn } from "@/lib/utils";

import { StatusBadge } from "./status-badge";

type ProjectCardProps = {
  project: Project;
  index: number;
  variant?: "featured" | "compact";
  reverse?: boolean;
  /** Ilustração renderizada no servidor e passada pronta. */
  visual: ReactNode;
};

export function ProjectCard({ project, index, variant = "compact", reverse = false, visual }: ProjectCardProps) {
  const ref = useRef<HTMLElement>(null);

  function handlePointerMove(event: PointerEvent<HTMLElement>) {
    const element = ref.current;
    if (!element) return;
    const rect = element.getBoundingClientRect();
    element.style.setProperty("--spot-x", `${event.clientX - rect.left}px`);
    element.style.setProperty("--spot-y", `${event.clientY - rect.top}px`);
  }

  const featured = variant === "featured";
  const number = String(index + 1).padStart(2, "0");

  return (
    <article
      ref={ref}
      onPointerMove={handlePointerMove}
      className={cn(
        "group relative isolate overflow-hidden rounded-3xl card-surface transition-[transform,border-color,box-shadow] duration-500 ease-out",
        "hover:-translate-y-1 hover:border-primary/35 focus-within:border-primary/50",
        featured ? "grid lg:grid-cols-2" : "flex flex-col",
      )}
    >
      {/* Brilho que segue o mouse */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{ background: "radial-gradient(420px circle at var(--spot-x, 50%) var(--spot-y, 50%), var(--glow), transparent 65%)" }}
      />

      <div
        className={cn(
          "relative overflow-hidden border-border bg-surface-2/60",
          featured
            ? cn("p-6 sm:p-10 lg:border-b-0", reverse ? "lg:order-2 lg:border-l" : "lg:border-r", "border-b")
            : "flex h-64 items-center border-b px-6 sm:px-7",
        )}
      >
        <div aria-hidden="true" className="absolute inset-0 bg-grid opacity-70 mask-radial" />
        <div className="relative w-full transition-transform duration-700 ease-out group-hover:scale-[1.025]">{visual}</div>
      </div>

      <div className={cn("flex flex-1 flex-col", featured ? "p-7 sm:p-10" : "p-6 sm:p-7")}>
        <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
          <span className="font-mono text-xs text-primary">{number}</span>
          <span className="font-mono text-xs tracking-wide text-subtle uppercase">{project.category}</span>
        </div>

        <h3 className={cn("mt-3 font-semibold tracking-tight", featured ? "text-2xl sm:text-3xl" : "text-xl")}>
          {project.name}
        </h3>
        <div className="mt-3">
          <StatusBadge status={project.status} />
        </div>
        <p className="mt-4 leading-relaxed text-muted">{project.summary}</p>

        {featured && project.segments?.length ? (
          <div className="mt-5">
            <p className="font-mono text-[0.7rem] tracking-[0.16em] text-subtle uppercase">Adaptável para</p>
            <ul className="mt-2 flex flex-wrap gap-1.5">
              {project.segments.map((segment) => (
                <li key={segment} className="rounded-full border border-primary/25 bg-primary-soft/60 px-2.5 py-1 text-xs text-primary">
                  {segment}
                </li>
              ))}
            </ul>
          </div>
        ) : null}

        {featured ? (
          <ul className="mt-6 grid gap-x-5 gap-y-2 text-sm text-foreground/90 sm:grid-cols-2">
            {project.features.slice(0, 6).map((feature) => (
              <li key={feature} className="flex items-start gap-2">
                <span aria-hidden="true" className="mt-2 size-1.5 shrink-0 rounded-full bg-primary" />
                {feature}
              </li>
            ))}
          </ul>
        ) : null}

        <ul className="mt-6 flex flex-wrap gap-1.5" aria-label="Tecnologias">
          {project.stack.slice(0, featured ? 8 : 5).map((tech) => (
            <li
              key={tech}
              className="inline-flex items-center gap-1.5 rounded-md border border-border bg-background/70 px-2 py-1 text-xs text-muted"
            >
              <TechIcon name={tech} className="size-3" colored />
              {tech}
            </li>
          ))}
        </ul>

        <div className="mt-auto flex flex-wrap items-center gap-3 pt-8">
          <Link
            href={`/projetos/${project.slug}`}
            className="inline-flex items-center gap-1.5 text-sm font-medium text-foreground after:absolute after:inset-0 after:content-[''] hover:text-primary"
          >
            Ver detalhes do projeto
            <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
          {project.links.demo ? (
            <ExternalLink
              href={project.links.demo}
              className="relative z-10 inline-flex items-center gap-1.5 rounded-lg border border-border px-2.5 py-1.5 text-xs text-muted hover:border-primary hover:text-primary"
            >
              <ExternalIcon className="size-3.5" /> Demonstração
            </ExternalLink>
          ) : null}
          {project.links.github ? (
            <ExternalLink
              href={project.links.github}
              className="relative z-10 inline-flex items-center gap-1.5 rounded-lg border border-border px-2.5 py-1.5 text-xs text-muted hover:border-primary hover:text-primary"
            >
              <SiGithub className="size-3.5" /> GitHub
            </ExternalLink>
          ) : null}
        </div>
      </div>
    </article>
  );
}
