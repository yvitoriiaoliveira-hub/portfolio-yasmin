import { Mail } from "lucide-react";
import Link from "next/link";
import { FaLinkedinIn } from "react-icons/fa6";
import { SiGithub } from "react-icons/si";

import { Logo } from "@/components/brand/logo";
import { ExternalLink } from "@/components/shared/external-link";
import { sections } from "@/content/navigation";
import { projects } from "@/content/projects";
import { siteConfig } from "@/content/site";

const year = new Date().getFullYear();

export function Footer() {
  return (
    <footer className="relative border-t border-border bg-surface">
      <div className="mx-auto grid max-w-6xl gap-12 px-5 py-14 sm:px-8 md:grid-cols-[1.4fr_1fr_1fr]">
        <div className="max-w-sm">
          <Logo />
          <p className="mt-4 text-sm leading-relaxed text-muted">
            {siteConfig.role}. Aplicações web e mobile, APIs, integrações, automações e soluções com Inteligência
            Artificial.
          </p>
          <div className="mt-5 flex gap-2">
            <ExternalLink
              href={siteConfig.links.github}
              aria-label="GitHub"
              className="inline-flex size-10 items-center justify-center rounded-xl border border-border text-muted transition-colors hover:border-primary hover:text-primary"
            >
              <SiGithub className="size-4" />
            </ExternalLink>
            <ExternalLink
              href={siteConfig.links.linkedin}
              aria-label="LinkedIn"
              className="inline-flex size-10 items-center justify-center rounded-xl border border-border text-muted transition-colors hover:border-primary hover:text-primary"
            >
              <FaLinkedinIn className="size-4" />
            </ExternalLink>
            <a
              href={`mailto:${siteConfig.email}`}
              aria-label="Enviar e-mail"
              className="inline-flex size-10 items-center justify-center rounded-xl border border-border text-muted transition-colors hover:border-primary hover:text-primary"
            >
              <Mail className="size-4" />
            </a>
          </div>
        </div>

        <nav aria-label="Rodapé — seções">
          <p className="font-mono text-xs tracking-[0.16em] text-subtle uppercase">Navegação</p>
          <ul className="mt-4 space-y-2.5 text-sm">
            {sections.map((section) => (
              <li key={section.id}>
                <Link href={`/#${section.id}`} className="text-muted transition-colors hover:text-foreground">
                  {section.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Rodapé — projetos">
          <p className="font-mono text-xs tracking-[0.16em] text-subtle uppercase">Projetos</p>
          <ul className="mt-4 space-y-2.5 text-sm">
            {projects.map((project) => (
              <li key={project.slug}>
                <Link href={`/projetos/${project.slug}`} className="text-muted transition-colors hover:text-foreground">
                  {project.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="border-t border-border">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-5 py-6 text-xs text-subtle sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <p>
            © {year} {siteConfig.name}
          </p>
          <p className="font-mono">Feito com Next.js, TypeScript e Tailwind CSS</p>
        </div>
      </div>
    </footer>
  );
}
