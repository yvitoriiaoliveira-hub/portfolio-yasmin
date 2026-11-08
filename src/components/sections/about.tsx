import { GraduationCap, Layers, MapPin, Rocket, Route, Sparkles } from "lucide-react";
import Image from "next/image";

import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";
import { SectionHeading } from "@/components/shared/section-heading";
import { about } from "@/content/about";
import { education } from "@/content/education";
import { siteConfig } from "@/content/site";
import { cn } from "@/lib/utils";

const highlightIcons = { route: Route, layers: Layers, sparkles: Sparkles, rocket: Rocket } as const;

export function About() {
  return (
    <section id="sobre" aria-labelledby="sobre-titulo" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading id="sobre-titulo" index="01" eyebrow="Sobre mim" title={about.title} />

        <div className="mt-14 grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          {/* Cartão com foto */}
          <Reveal className="lg:sticky lg:top-28 lg:self-start">
            <figure className="overflow-hidden rounded-3xl card-surface">
              <div className="relative aspect-[5/4] bg-surface-2">
                <Image
                  src={siteConfig.photo.src}
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 400px, 100vw"
                  className="object-cover object-[50%_20%]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-deep/50 via-transparent to-transparent mix-blend-multiply" />
              </div>
              <figcaption className="space-y-3 p-6">
                <p className="font-display text-lg font-semibold tracking-tight">{siteConfig.name}</p>
                <ul className="space-y-2 text-sm text-muted">
                  <li className="flex items-center gap-2.5">
                    <Layers className="size-4 text-primary" aria-hidden="true" />
                    {siteConfig.role}
                  </li>
                  <li className="flex items-center gap-2.5">
                    <GraduationCap className="size-4 text-primary" aria-hidden="true" />
                    {education.course} · {education.institutionShort}
                  </li>
                  <li className="flex items-center gap-2.5">
                    <MapPin className="size-4 text-primary" aria-hidden="true" />
                    {siteConfig.location}
                  </li>
                </ul>
              </figcaption>
            </figure>
          </Reveal>

          <div>
            <div className="space-y-5 text-[1.05rem] leading-relaxed text-muted">
              {about.paragraphs.map((paragraph, index) => (
                <Reveal key={paragraph} delay={index * 0.08}>
                  <p className={cn(index === 0 && "text-lg text-foreground sm:text-xl")}>{paragraph}</p>
                </Reveal>
              ))}
            </div>

            <Stagger className="mt-10 grid gap-4 sm:grid-cols-2">
              {about.highlights.map((item) => {
                const Icon = highlightIcons[item.icon];
                return (
                  <StaggerItem key={item.title}>
                    <div className="group h-full rounded-2xl border border-border bg-surface p-5 transition-[border-color,transform] duration-300 hover:-translate-y-1 hover:border-primary/40">
                      <span className="inline-flex size-10 items-center justify-center rounded-xl bg-primary-soft text-primary transition-transform duration-300 group-hover:scale-110">
                        <Icon className="size-5" aria-hidden="true" />
                      </span>
                      <h3 className="mt-4 text-base font-semibold tracking-tight">{item.title}</h3>
                      <p className="mt-1.5 text-sm leading-relaxed text-muted">{item.text}</p>
                    </div>
                  </StaggerItem>
                );
              })}
            </Stagger>
          </div>
        </div>

        {/* Como eu trabalho */}
        <Reveal className="mt-24">
          <h3 className="font-mono text-xs tracking-[0.18em] text-subtle uppercase">Como eu trabalho</h3>
        </Reveal>
        <Stagger className="relative mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-5" stagger={0.07}>
          <div
            aria-hidden="true"
            className="absolute top-7 right-8 left-8 hidden h-px bg-gradient-to-r from-transparent via-border-strong to-transparent lg:block"
          />
          {about.process.map((step) => (
            <StaggerItem key={step.step}>
              <div className="relative h-full rounded-2xl border border-border bg-background/60 p-5 backdrop-blur">
                <span className="relative z-10 inline-flex size-9 items-center justify-center rounded-full border border-border-strong bg-surface font-mono text-xs text-primary">
                  {step.step}
                </span>
                <p className="mt-4 font-display text-lg font-semibold tracking-tight">{step.title}</p>
                <p className="mt-1 text-sm leading-relaxed text-muted">{step.text}</p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
