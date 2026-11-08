import { ArrowUpRight, Mail, MapPin } from "lucide-react";
import { FaLinkedinIn } from "react-icons/fa6";
import { SiGithub } from "react-icons/si";

import { ContactForm } from "@/components/contact/contact-form";
import { CopyEmail } from "@/components/contact/copy-email";
import { Reveal } from "@/components/motion/reveal";
import { ExternalLink } from "@/components/shared/external-link";
import { siteConfig } from "@/content/site";

const linkClass =
  "group flex items-center gap-4 rounded-2xl border border-border bg-surface/70 p-4 transition-[border-color,background-color] duration-300 hover:border-primary/40 hover:bg-surface";

export function Contact() {
  return (
    <section id="contato" aria-labelledby="contato-titulo" className="relative isolate overflow-hidden py-16 sm:py-24 lg:py-32">
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-grid mask-radial opacity-60" />
      <div
        aria-hidden="true"
        className="absolute bottom-0 left-1/2 -z-10 h-[28rem] w-[56rem] -translate-x-1/2 translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,var(--glow),transparent)] blur-3xl"
      />

      <div className="mx-auto grid max-w-6xl gap-12 px-5 sm:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        <Reveal>
          <p className="flex items-center gap-3 font-mono text-xs tracking-[0.18em] text-primary uppercase">
            <span className="text-subtle">06</span>
            <span aria-hidden="true" className="h-px w-8 bg-primary/50" />
            Contato
          </p>
          <h2 id="contato-titulo" className="mt-4 text-3xl leading-[1.1] font-semibold tracking-tight sm:text-4xl lg:text-5xl">
            Tem uma ideia, um projeto ou uma oportunidade interessante?{" "}
            <span className="text-gradient">Vamos conversar.</span>
          </h2>
          <p className="mt-5 max-w-md text-lg leading-relaxed text-muted">
            Escreva pelo formulário ou pelos canais abaixo. Respondo recrutadores, empresas e outros desenvolvedores.
          </p>

          <ul className="mt-10 space-y-3">
            <li className={linkClass}>
              <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary-soft text-primary">
                <Mail className="size-5" aria-hidden="true" />
              </span>
              <a href={`mailto:${siteConfig.email}`} className="min-w-0 flex-1">
                <span className="block text-xs text-subtle">E-mail</span>
                <span className="block truncate font-medium transition-colors group-hover:text-primary">{siteConfig.email}</span>
              </a>
              <CopyEmail email={siteConfig.email} />
            </li>
            <li>
              <ExternalLink href={siteConfig.links.linkedin} className={linkClass}>
                <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-xl bg-[#0a66c2]/10 text-[#0a66c2] dark:text-[#5aa9ff]">
                  <FaLinkedinIn className="size-5" aria-hidden="true" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-xs text-subtle">LinkedIn</span>
                  <span className="block truncate font-medium">in/yasmin-vitoria-23b6a5328</span>
                </span>
                <ArrowUpRight className="size-4 text-subtle transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-primary" />
              </ExternalLink>
            </li>
            <li>
              <ExternalLink href={siteConfig.links.github} className={linkClass}>
                <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-xl bg-foreground/8 text-foreground">
                  <SiGithub className="size-5" aria-hidden="true" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-xs text-subtle">GitHub</span>
                  <span className="block truncate font-medium">yvitoriiaoliveira-hub</span>
                </span>
                <ArrowUpRight className="size-4 text-subtle transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-primary" />
              </ExternalLink>
            </li>
          </ul>

          <p className="mt-8 flex items-center gap-2 text-sm text-muted">
            <MapPin className="size-4 text-primary" aria-hidden="true" />
            {siteConfig.location}
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <ContactForm />
        </Reveal>
      </div>
    </section>
  );
}
