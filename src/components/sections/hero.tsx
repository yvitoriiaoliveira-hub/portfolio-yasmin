"use client";

import { ArrowDown, ArrowRight, Download } from "lucide-react";
import { motion, useMotionTemplate, useMotionValue } from "motion/react";
import Image from "next/image";
import type { PointerEvent, ReactNode } from "react";
import { FaLinkedinIn } from "react-icons/fa6";
import { SiGithub } from "react-icons/si";

import { HeroVisual } from "@/components/hero/hero-visual";
import { ExternalLink } from "@/components/shared/external-link";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/content/site";
import { cn } from "@/lib/utils";

const ease = [0.22, 1, 0.36, 1] as const;

function AnimatedWord({ word, delay, className }: { word: string; delay: number; className?: string }) {
  return (
    <span className={cn("inline-block overflow-hidden pb-[0.08em] align-bottom", className)} aria-hidden="true">
      {Array.from(word).map((letter, index) => (
        <motion.span
          key={`${letter}-${index}`}
          className="inline-block"
          initial={{ y: "105%" }}
          animate={{ y: 0 }}
          transition={{ duration: 0.75, delay: delay + index * 0.035, ease }}
        >
          {letter}
        </motion.span>
      ))}
    </span>
  );
}

function FadeUp({ delay, className, children }: { delay: number; className?: string; children: ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay, ease }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function Hero() {
  const [firstName, ...rest] = siteConfig.shortName.split(" ");
  const lastName = rest.join(" ");

  // Posição do ponteiro (px para o brilho; -0.5 a 0.5 para a profundidade).
  const glowX = useMotionValue(-1000);
  const glowY = useMotionValue(-1000);
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const glow = useMotionTemplate`radial-gradient(520px circle at ${glowX}px ${glowY}px, var(--glow), transparent 65%)`;

  function handlePointerMove(event: PointerEvent<HTMLElement>) {
    if (event.pointerType !== "mouse") return;
    const rect = event.currentTarget.getBoundingClientRect();
    glowX.set(event.clientX - rect.left);
    glowY.set(event.clientY - rect.top);
    pointerX.set((event.clientX - rect.left) / rect.width - 0.5);
    pointerY.set((event.clientY - rect.top) / rect.height - 0.5);
  }

  function handlePointerLeave() {
    pointerX.set(0);
    pointerY.set(0);
  }

  const availability = siteConfig.availability;

  return (
    <section
      id="inicio"
      aria-labelledby="hero-title"
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className="relative isolate overflow-hidden pt-24 pb-16 sm:pt-36 sm:pb-24 lg:min-h-[100svh] lg:pt-40"
    >
      <div aria-hidden="true" className="absolute inset-0 -z-20 bg-grid mask-radial opacity-80" />
      <motion.div aria-hidden="true" className="absolute inset-0 -z-10" style={{ background: glow }} />
      <div
        aria-hidden="true"
        className="absolute -top-40 right-[-10%] -z-10 h-[32rem] w-[32rem] rounded-full bg-[radial-gradient(closest-side,var(--glow),transparent)] blur-3xl"
      />

      <div className="mx-auto grid max-w-6xl items-center gap-16 px-5 sm:px-8 lg:grid-cols-[1.12fr_0.88fr] lg:gap-10">
        <div>
          <FadeUp delay={0.05} className="flex items-center gap-4">
            {/* Foto no celular e no tablet: logo no topo, antes do nome */}
            <span className="relative block size-[5.5rem] shrink-0 rounded-full bg-gradient-to-br from-primary via-border-strong to-deep p-[2px] lg:hidden">
              <Image
                src={siteConfig.photo.src}
                alt={siteConfig.photo.alt}
                width={176}
                height={176}
                loading="eager"
                className="size-full rounded-full bg-surface-2 object-cover object-[50%_18%]"
              />
            </span>
            <p className="inline-flex items-center gap-2.5 rounded-full border border-border bg-surface/80 py-1.5 pr-4 pl-3 text-xs font-medium text-muted backdrop-blur">
              <span className="relative inline-flex size-2 shrink-0">
                {availability.open ? (
                  <span className="absolute inline-flex size-full animate-pulse-ring rounded-full bg-success" />
                ) : null}
                <span className={cn("relative inline-flex size-2 rounded-full", availability.open ? "bg-success" : "bg-subtle")} />
              </span>
              {availability.open ? availability.label : availability.closedLabel}
            </p>
          </FadeUp>

          <FadeUp delay={0.12}>
            <p className="mt-7 font-mono text-xs tracking-[0.2em] text-primary uppercase sm:mt-8">
              {siteConfig.role} <span className="hidden text-subtle sm:inline">— {siteConfig.location}</span>
            </p>
          </FadeUp>

          <h1
            id="hero-title"
            aria-label={siteConfig.shortName}
            className="mt-4 text-[3.6rem] leading-[0.95] font-semibold tracking-[-0.045em] sm:text-7xl lg:text-[6.4rem]"
          >
            <AnimatedWord word={firstName ?? ""} delay={0.2} />{" "}
            <AnimatedWord word={lastName} delay={0.4} className="text-gradient" />
          </h1>

          <FadeUp delay={0.65}>
            <p className="mt-7 max-w-xl font-display text-xl leading-snug font-medium tracking-tight text-foreground sm:text-2xl">
              {siteConfig.headline}
            </p>
          </FadeUp>

          <FadeUp delay={0.75}>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-muted sm:text-[1.05rem]">{siteConfig.intro}</p>
          </FadeUp>

          <FadeUp delay={0.85} className="mt-9 grid gap-3 sm:flex sm:flex-wrap sm:items-center">
            <Button asChild size="lg">
              <a href="#projetos">
                Conhecer projetos
                <ArrowRight className="transition-transform duration-200 group-hover/button:translate-x-0.5" />
              </a>
            </Button>
            <Button asChild size="lg" variant="secondary">
              <a href="#contato">Entrar em contato</a>
            </Button>
          </FadeUp>

          <FadeUp delay={0.95} className="mt-6 -ml-3 flex flex-wrap items-center gap-1 text-sm sm:mt-8 sm:gap-2">
            <Button asChild variant="ghost" size="sm">
              <ExternalLink href={siteConfig.links.github}>
                <SiGithub />
                GitHub
              </ExternalLink>
            </Button>
            <Button asChild variant="ghost" size="sm">
              <ExternalLink href={siteConfig.links.linkedin}>
                <FaLinkedinIn />
                LinkedIn
              </ExternalLink>
            </Button>
            <Button asChild variant="ghost" size="sm">
              <a href={siteConfig.resume.href} download={siteConfig.resume.fileName}>
                <Download />
                Currículo
              </a>
            </Button>
          </FadeUp>
        </div>

        {/* Composição com foto e terminal: só no computador (no celular a foto já aparece no topo) */}
        <div className="hidden lg:block">
          <HeroVisual pointerX={pointerX} pointerY={pointerY} />
        </div>
      </div>

      <motion.a
        href="#sobre"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6 }}
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 font-mono text-[0.65rem] tracking-[0.2em] text-subtle uppercase transition-colors hover:text-foreground lg:flex"
      >
        Role para explorar
        <ArrowDown className="size-4 animate-float" />
      </motion.a>
    </section>
  );
}
