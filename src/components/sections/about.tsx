import { Download, GraduationCap, Layers, MapPin, Rocket, Route, Sparkles } from "lucide-react";

import { LogoMark } from "@/components/brand/logo";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";
import { SectionHeading } from "@/components/shared/section-heading";
import { Button } from "@/components/ui/button";
import { about } from "@/content/about";
import { education } from "@/content/education";
import { siteConfig } from "@/content/site";
import { cn } from "@/lib/utils";

const highlightIcons = { route: Route, layers: Layers, sparkles: Sparkles, rocket: Rocket } as const;

export function About() {
  return (
    <section id="sobre" aria-labelledby="sobre-titulo" className="relative py-16 sm:py-24 lg:py-32">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading id="sobre-titulo" index="01" eyebrow="Sobre mim" title={about.title} />

        <div className="mt-10 grid gap-8 sm:mt-14 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          {/* Cartão de perfil (sem foto: a foto já aparece no topo) */}
          <Reveal className="lg:sticky lg:top-28 lg:self-start">
            <div className="rounded-3xl card-surface p-6">
              <div className="flex items-center gap-3.5">
                <LogoMark className="size-12 rounded-2xl" />
                <div className="min-w-0">
                  <p className="font-display text-base leading-snug font-semibold tracking-tight">{siteConfig.name}</p>
                  <p className="mt-0.5 text-sm text-muted">{siteConfig.role}</p>
                </div>
              </div>
              <ul className="mt-5 space-y-2.5 border-t border-border pt-5 text-sm text-muted">
                <li className="flex items-center gap-2.5">
                  <GraduationCap className="size-4 shrink-0 text-primary" aria-hidden="true" />
                  {education.course} · {education.institutionShort}
                </li>
                <li className="flex items-center gap-2.5">
                  <MapPin className="size-4 shrink-0 text-primary" aria-hidden="true" />
                  {siteConfig.location}
                </li>
                <li className="flex items-center gap-2.5">
                  <span className="relative inline-flex size-4 shrink-0 items-center justify-center">
                    <span className={cn("size-2 rounded-full", siteConfig.availability.open ? "bg-success" : "bg-subtle")} />
                  </span>
                  {siteConfig.availability.open ? siteConfig.availability.label : siteConfig.availability.closedLabel}
                </li>
              </ul>
              <Button asChild variant="secondary" className="mt-6 w-full">
                <a href={siteConfig.resume.href} download={siteConfig.resume.fileName}>
                  <Download />
                  Baixar currículo
                </a>
              </Button>
            </div>
          </Reveal>

          <div>
            <div className="space-y-5 text-[1.05rem] leading-relaxed text-muted">
              {about.paragraphs.map((paragraph, index) => (
                <Reveal key={paragraph} delay={index * 0.08}>
                  <p className={cn(index === 0 && "text-lg text-foreground sm:text-xl")}>{paragraph}</p>
                </Reveal>
              ))}
            </div>

            <Stagger className="mt-10 grid gap-3 sm:grid-cols-2 sm:gap-4">
              {about.highlights.map((item) => {
                const Icon = highlightIcons[item.icon];
                return (
                  <StaggerItem key={item.title}>
                    <div className="group flex h-full gap-4 rounded-2xl border border-border bg-surface p-4 transition-[border-color,transform] duration-300 hover:-translate-y-1 hover:border-primary/40 sm:block sm:p-5">
                      <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary-soft text-primary transition-transform duration-300 group-hover:scale-110">
                        <Icon className="size-5" aria-hidden="true" />
                      </span>
                      <div>
                        <h3 className="text-base font-semibold tracking-tight sm:mt-4">{item.title}</h3>
                        <p className="mt-1 text-sm leading-relaxed text-muted sm:mt-1.5">{item.text}</p>
                      </div>
                    </div>
                  </StaggerItem>
                );
              })}
            </Stagger>
          </div>
        </div>

        {/* Como eu trabalho */}
        <Reveal className="mt-16 sm:mt-24">
          <h3 className="font-mono text-xs tracking-[0.18em] text-subtle uppercase">Como eu trabalho</h3>
        </Reveal>
        <Stagger className="relative mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-5" stagger={0.07}>
          <div
            aria-hidden="true"
            className="absolute top-7 right-8 left-8 hidden h-px bg-gradient-to-r from-transparent via-border-strong to-transparent lg:block"
          />
          {about.process.map((step) => (
            <StaggerItem key={step.step}>
              <div className="relative flex h-full items-start gap-4 rounded-2xl border border-border bg-background/60 p-4 backdrop-blur lg:block lg:p-5">
                <span className="relative z-10 inline-flex size-9 shrink-0 items-center justify-center rounded-full border border-border-strong bg-surface font-mono text-xs text-primary">
                  {step.step}
                </span>
                <div>
                  <p className="font-display text-base font-semibold tracking-tight lg:mt-4 lg:text-lg">{step.title}</p>
                  <p className="mt-0.5 text-sm leading-relaxed text-muted lg:mt-1">{step.text}</p>
                </div>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
