import { CalendarDays, GraduationCap } from "lucide-react";

import { Reveal } from "@/components/motion/reveal";
import { SectionHeading } from "@/components/shared/section-heading";
import { education } from "@/content/education";

export function Education() {
  return (
    <section id="formacao" aria-labelledby="formacao-titulo" className="relative py-16 sm:py-24 lg:py-32">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading id="formacao-titulo" index="05" eyebrow="Formação" title="Teoria e prática, lado a lado." />

        <Reveal className="mt-10 sm:mt-14">
          <article className="relative isolate overflow-hidden rounded-3xl card-surface p-5 sm:p-10">
            <span
              aria-hidden="true"
              className="pointer-events-none absolute -right-4 -bottom-10 -z-10 hidden font-display sm:block text-[9rem] leading-none font-bold tracking-tighter text-transparent [-webkit-text-stroke:1px_var(--border-strong)] sm:text-[13rem]"
            >
              2027
            </span>
            <div
              aria-hidden="true"
              className="absolute -top-24 -left-24 -z-10 size-72 rounded-full bg-[radial-gradient(closest-side,var(--glow),transparent)] blur-2xl"
            />

            <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
              <div className="max-w-2xl">
                <span className="inline-flex size-12 items-center justify-center rounded-2xl bg-gradient-to-br from-deep to-primary text-white">
                  <GraduationCap className="size-6" aria-hidden="true" />
                </span>
                <h3 className="mt-6 text-2xl font-semibold tracking-tight sm:text-3xl">{education.course}</h3>
                <p className="mt-2 text-lg text-muted">
                  {education.institution}
                  {education.institution.includes(education.institutionShort) ? null : (
                    <span className="text-subtle"> ({education.institutionShort})</span>
                  )}
                </p>
                <p className="mt-6 max-w-xl leading-relaxed text-muted">{education.note}</p>
              </div>

              <dl className="grid shrink-0 gap-3 sm:grid-cols-2 md:grid-cols-1">
                <div className="rounded-2xl border border-border bg-background/70 px-5 py-4">
                  <dt className="font-mono text-[0.7rem] tracking-[0.16em] text-subtle uppercase">Situação</dt>
                  <dd className="mt-1.5 flex items-center gap-2 font-medium">
                    <span className="relative inline-flex size-2">
                      <span className="absolute inline-flex size-full animate-pulse-ring rounded-full bg-primary" />
                      <span className="relative inline-flex size-2 rounded-full bg-primary" />
                    </span>
                    {education.status}
                  </dd>
                </div>
                <div className="rounded-2xl border border-border bg-background/70 px-5 py-4">
                  <dt className="font-mono text-[0.7rem] tracking-[0.16em] text-subtle uppercase">Previsão de conclusão</dt>
                  <dd className="mt-1.5 flex items-center gap-2 font-medium">
                    <CalendarDays className="size-4 text-primary" aria-hidden="true" />
                    <time dateTime={education.expectedEndDateTime}>{education.expectedEnd}</time>
                  </dd>
                </div>
              </dl>
            </div>
          </article>
        </Reveal>
      </div>
    </section>
  );
}
