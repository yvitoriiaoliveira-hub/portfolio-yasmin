import {
  ArrowUpRight,
  Bot,
  Building2,
  CalendarDays,
  CircleCheck,
  Factory,
  FingerprintPattern,
  Rocket,
  Users,
} from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";

import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";
import { SectionHeading } from "@/components/shared/section-heading";
import { TechIcon } from "@/components/stack/tech-icon";
import { experience, experienceIntro, ownProducts } from "@/content/experience";
import { projects } from "@/content/projects";

const systemIcons = { fingerprint: FingerprintPattern, users: Users, factory: Factory, bot: Bot } as const;

type ExperienceHeaderProps = {
  icon: ReactNode;
  title: string;
  role: string;
  period: string;
  periodDateTime: string;
  summary: string;
  stack: readonly string[];
};

function ExperienceHeader({ icon, title, role, period, periodDateTime, summary, stack }: ExperienceHeaderProps) {
  return (
    <header className="relative border-b border-border p-5 sm:p-9 lg:border-r lg:border-b-0">
      <div aria-hidden="true" className="absolute inset-0 -z-0 bg-grid opacity-60 mask-fade-y" />
      <div className="relative">
        <span className="inline-flex size-12 items-center justify-center rounded-2xl bg-gradient-to-br from-deep to-primary text-white">
          {icon}
        </span>
        <h3 className="mt-6 text-2xl font-semibold tracking-tight">{title}</h3>
        <p className="mt-2 text-muted">{role}</p>
        <p className="mt-5 inline-flex items-center gap-2 rounded-full border border-border bg-background px-3 py-1.5 font-mono text-xs text-foreground">
          <CalendarDays className="size-3.5 text-primary" aria-hidden="true" />
          <time dateTime={periodDateTime}>{period}</time>
        </p>
        <p className="mt-6 text-sm leading-relaxed text-muted">{summary}</p>

        <div className="mt-8">
          <p className="font-mono text-[0.7rem] tracking-[0.16em] text-subtle uppercase">Tecnologias</p>
          <ul className="mt-3 flex flex-wrap gap-2">
            {stack.map((tech) => (
              <li
                key={tech}
                className="group inline-flex items-center gap-1.5 rounded-lg border border-border bg-background px-2.5 py-1.5 text-xs text-muted transition-colors hover:text-foreground"
              >
                <TechIcon name={tech} className="size-3.5 transition-colors group-hover:text-(--tech-color)" />
                {tech}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </header>
  );
}

function Label({ children }: { children: string }) {
  return <p className="font-mono text-[0.7rem] tracking-[0.16em] text-subtle uppercase">{children}</p>;
}

export function Experience() {
  return (
    <section id="experiencia" aria-labelledby="experiencia-titulo" className="relative border-y border-border bg-surface/40 py-16 sm:py-24 lg:py-32">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading
          id="experiencia-titulo"
          index="02"
          eyebrow="Experiência"
          title="Experiência profissional"
          description={experienceIntro}
        />

        <div className="mt-10 space-y-6 sm:mt-14 sm:space-y-8">
          {/* Empresa */}
          <Reveal>
            <article className="overflow-hidden rounded-3xl card-surface">
              <div className="grid lg:grid-cols-[0.72fr_1.28fr]">
                <ExperienceHeader
                  icon={<Building2 className="size-6" aria-hidden="true" />}
                  title={experience.company}
                  role={experience.role}
                  period={experience.period}
                  periodDateTime={experience.periodDateTime}
                  summary={experience.summary}
                  stack={experience.stack}
                />

                <div className="p-5 sm:p-9">
                  <Label>Sistemas em que atuo</Label>
                  <Stagger className="mt-4 grid gap-3 sm:grid-cols-2">
                    {experience.systems.map((system) => {
                      const Icon = systemIcons[system.icon];
                      return (
                        <StaggerItem key={system.title}>
                          <div className="group h-full rounded-2xl border border-border bg-background/70 p-5 transition-[border-color,background-color] duration-300 hover:border-primary/40 hover:bg-background">
                            <Icon className="size-5 text-primary transition-transform duration-300 group-hover:-rotate-6" aria-hidden="true" />
                            <h4 className="mt-3 text-[0.95rem] font-semibold tracking-tight">{system.title}</h4>
                            <p className="mt-1.5 text-sm leading-relaxed text-muted">{system.text}</p>
                          </div>
                        </StaggerItem>
                      );
                    })}
                  </Stagger>

                  <div className="mt-9">
                    <Label>Atividades</Label>
                  </div>
                  <ul className="mt-4 grid gap-x-6 gap-y-3 sm:grid-cols-2">
                    {experience.activities.map((activity) => (
                      <li key={activity} className="flex items-start gap-2.5 text-sm leading-relaxed text-foreground/90">
                        <CircleCheck className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
                        {activity}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </article>
          </Reveal>

          {/* Projetos próprios */}
          <Reveal>
            <article className="overflow-hidden rounded-3xl card-surface">
              <div className="grid lg:grid-cols-[0.72fr_1.28fr]">
                <ExperienceHeader
                  icon={<Rocket className="size-6" aria-hidden="true" />}
                  title={ownProducts.title}
                  role={ownProducts.role}
                  period={ownProducts.period}
                  periodDateTime={ownProducts.periodDateTime}
                  summary={ownProducts.summary}
                  stack={ownProducts.stack}
                />

                <div className="p-5 sm:p-9">
                  <Label>Produtos que criei</Label>
                  <Stagger className="mt-4 grid gap-3 sm:grid-cols-2">
                    {projects.map((project) => (
                      <StaggerItem key={project.slug}>
                        <Link
                          href={`/projetos/${project.slug}`}
                          className="group flex h-full flex-col rounded-2xl border border-border bg-background/70 p-5 transition-[border-color,background-color] duration-300 hover:border-primary/40 hover:bg-background"
                        >
                          <span className="flex items-start justify-between gap-3">
                            <span className="text-[0.95rem] font-semibold tracking-tight">{project.name}</span>
                            <ArrowUpRight className="size-4 shrink-0 text-subtle transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-primary" />
                          </span>
                          <span className="mt-1 font-mono text-[0.7rem] tracking-wide text-primary uppercase">{project.category}</span>
                          <span className="mt-2 hidden text-sm leading-relaxed text-muted sm:block">{project.summary}</span>
                        </Link>
                      </StaggerItem>
                    ))}
                  </Stagger>
                </div>
              </div>
            </article>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
