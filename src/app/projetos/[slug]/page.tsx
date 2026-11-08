import { ArrowLeft, ArrowRight, ArrowUpRight, CircleCheck, Lightbulb, MessageSquare, Target } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SiGithub } from "react-icons/si";

import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";
import { ArchitectureDiagram } from "@/components/projects/architecture-diagram";
import { ProjectGallery } from "@/components/projects/project-gallery";
import { ProjectMockup } from "@/components/projects/project-mockup";
import { ShareButtons } from "@/components/projects/share-buttons";
import { StatusBadge } from "@/components/projects/status-badge";
import { ExternalLink } from "@/components/shared/external-link";
import { TechIcon } from "@/components/stack/tech-icon";
import { Button } from "@/components/ui/button";
import { getAdjacentProjects, getProject, projects } from "@/content/projects";
import { siteConfig } from "@/content/site";

type PageProps = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};

  const path = `/projetos/${project.slug}`;
  return {
    title: project.name,
    description: project.summary,
    alternates: { canonical: path },
    openGraph: {
      type: "article",
      url: path,
      title: `${project.name} · ${siteConfig.shortName}`,
      description: project.summary,
    },
    twitter: { card: "summary_large_image", title: project.name, description: project.summary },
  };
}

function SectionLabel({ children }: { children: string }) {
  return <h2 className="font-mono text-xs tracking-[0.18em] text-subtle uppercase">{children}</h2>;
}

export default async function ProjectPage({ params }: PageProps) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const { previous, next } = getAdjacentProjects(project.slug);
  const url = `${siteConfig.url}/projetos/${project.slug}`;
  const hasLinks = Boolean(project.links.demo || project.links.github);

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Início", item: siteConfig.url },
      { "@type": "ListItem", position: 2, name: "Projetos", item: `${siteConfig.url}/#projetos` },
      { "@type": "ListItem", position: 3, name: project.name, item: url },
    ],
  };

  return (
    <article className="relative isolate overflow-hidden pt-28 pb-24 sm:pt-36">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd).replace(/</g, "\\u003c") }}
      />
      <div aria-hidden="true" className="absolute inset-x-0 top-0 -z-10 h-[46rem] bg-grid mask-radial opacity-80" />

      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        {/* Navegação estrutural */}
        <nav aria-label="Você está em" className="text-sm">
          <ol className="flex flex-wrap items-center gap-2 text-subtle">
            <li>
              <Link href="/" className="hover:text-foreground">
                Início
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li>
              <Link href="/#projetos" className="hover:text-foreground">
                Projetos
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li aria-current="page" className="text-foreground">
              {project.name}
            </li>
          </ol>
        </nav>

        {/* Cabeçalho */}
        <header className="mt-10 grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
          <Reveal>
            <p className="font-mono text-xs tracking-[0.18em] text-primary uppercase">{project.category}</p>
            <h1 className="mt-4 text-4xl leading-[1.05] font-semibold tracking-tight sm:text-5xl lg:text-6xl">{project.name}</h1>
            <div className="mt-5 flex flex-wrap items-center gap-3">
              <StatusBadge status={project.status} />
              {project.year ? <span className="font-mono text-xs text-subtle">{project.year}</span> : null}
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="text-lg leading-relaxed text-muted sm:text-xl">{project.summary}</p>
            {hasLinks ? (
              <div className="mt-6 flex flex-wrap gap-3">
                {project.links.demo ? (
                  <Button asChild>
                    <ExternalLink href={project.links.demo}>
                      Ver demonstração <ArrowUpRight />
                    </ExternalLink>
                  </Button>
                ) : null}
                {project.links.github ? (
                  <Button asChild variant="secondary">
                    <ExternalLink href={project.links.github}>
                      <SiGithub /> Código no GitHub
                    </ExternalLink>
                  </Button>
                ) : null}
              </div>
            ) : null}
          </Reveal>
        </header>

        {/* Visual principal */}
        <Reveal className="mt-14">
          <div className="relative overflow-hidden rounded-3xl border border-border bg-surface-2/60 p-5 sm:p-10 lg:p-14">
            <div aria-hidden="true" className="absolute inset-0 bg-grid opacity-70 mask-radial" />
            <div className="relative mx-auto max-w-4xl">
              <ProjectMockup project={project} showCaption sizes="(min-width: 1024px) 900px, 100vw" />
            </div>
          </div>
        </Reveal>

        <div className="mt-8">
          <ShareButtons url={url} title={project.name} text={project.summary} />
        </div>

        {/* Problema e objetivo */}
        <div className="mt-20 grid gap-5 md:grid-cols-2">
          <Reveal className="h-full">
            <div className="h-full rounded-3xl card-surface p-7 sm:p-8">
              <span className="inline-flex size-10 items-center justify-center rounded-xl bg-primary-soft text-primary">
                <Lightbulb className="size-5" aria-hidden="true" />
              </span>
              <h2 className="mt-5 text-xl font-semibold tracking-tight">O problema</h2>
              <p className="mt-3 leading-relaxed text-muted">{project.problem}</p>
            </div>
          </Reveal>
          <Reveal delay={0.08} className="h-full">
            <div className="h-full rounded-3xl card-surface p-7 sm:p-8">
              <span className="inline-flex size-10 items-center justify-center rounded-xl bg-primary-soft text-primary">
                <Target className="size-5" aria-hidden="true" />
              </span>
              <h2 className="mt-5 text-xl font-semibold tracking-tight">O objetivo</h2>
              <p className="mt-3 leading-relaxed text-muted">{project.objective}</p>
            </div>
          </Reveal>
        </div>

        {/* Tipos de negócio */}
        {project.segments?.length ? (
          <section className="mt-20" aria-label="Adaptável para">
            <Reveal>
              <SectionLabel>Adaptável para</SectionLabel>
              <p className="mt-2 text-sm text-muted">Cadastros, etapas e mensagens ajustados à rotina de cada tipo de negócio.</p>
            </Reveal>
            <ul className="mt-6 flex flex-wrap gap-2.5">
              {project.segments.map((segment) => (
                <li
                  key={segment}
                  className="rounded-full border border-primary/25 bg-primary-soft/60 px-4 py-2 text-sm font-medium text-primary"
                >
                  {segment}
                </li>
              ))}
            </ul>
          </section>
        ) : null}

        {/* Funcionalidades */}
        <section className="mt-20" aria-label="Principais funcionalidades">
          <Reveal>
            <SectionLabel>{project.featuresLabel ?? "Principais funcionalidades"}</SectionLabel>
          </Reveal>
          <Stagger className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3" stagger={0.05}>
            {project.features.map((feature) => (
              <StaggerItem key={feature}>
                <div className="flex h-full items-start gap-3 rounded-2xl border border-border bg-surface p-4 transition-colors hover:border-primary/40">
                  <CircleCheck className="mt-0.5 size-5 shrink-0 text-primary" aria-hidden="true" />
                  <span className="text-[0.95rem]">{feature}</span>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </section>

        {/* Telas reais */}
        {project.images.length > 0 ? (
          <section className="mt-20" aria-label="Telas do sistema">
            <Reveal>
              <SectionLabel>Telas do sistema</SectionLabel>
              <p className="mt-2 text-sm text-muted">Capturas reais, com dados fictícios. Clique para ampliar.</p>
            </Reveal>
            <div className="mt-6">
              <ProjectGallery images={project.images} />
            </div>
          </section>
        ) : null}

        {/* Arquitetura */}
        <section className="mt-20" aria-label="Arquitetura">
          <Reveal>
            <SectionLabel>Arquitetura</SectionLabel>
            <p className="mt-3 max-w-3xl text-lg leading-relaxed text-muted">{project.architecture.intro}</p>
          </Reveal>
          <div className="mt-8">
            <ArchitectureDiagram layers={project.architecture.layers} />
          </div>
        </section>

        {/* Tecnologias */}
        <section className="mt-20" aria-label="Tecnologias">
          <Reveal>
            <SectionLabel>Tecnologias</SectionLabel>
          </Reveal>
          <ul className="mt-6 flex flex-wrap gap-2.5">
            {project.stack.map((tech) => (
              <li
                key={tech}
                className="group inline-flex items-center gap-2 rounded-xl border border-border bg-surface px-3.5 py-2.5 text-sm transition-[border-color,transform] duration-300 hover:-translate-y-0.5 hover:border-border-strong"
              >
                <TechIcon name={tech} className="size-4 text-muted transition-colors group-hover:text-(--tech-color)" />
                {tech}
              </li>
            ))}
          </ul>
        </section>

        {/* Chamada */}
        {!hasLinks ? (
          <Reveal className="mt-20">
            <div className="flex flex-col items-start justify-between gap-6 rounded-3xl border border-border bg-gradient-to-br from-primary-soft to-surface p-7 sm:flex-row sm:items-center sm:p-9">
              <div>
                <p className="text-xl font-semibold tracking-tight">Quer conhecer este projeto mais de perto?</p>
                <p className="mt-1 text-muted">Posso apresentar o funcionamento e conversar sobre as decisões técnicas.</p>
              </div>
              <Button asChild size="lg">
                <Link href="/#contato">
                  <MessageSquare /> Falar comigo
                </Link>
              </Button>
            </div>
          </Reveal>
        ) : null}

        {/* Anterior / próximo */}
        <nav aria-label="Outros projetos" className="mt-20 grid gap-4 border-t border-border pt-10 sm:grid-cols-2">
          {previous ? (
            <Link
              href={`/projetos/${previous.slug}`}
              className="group rounded-2xl border border-border bg-surface p-5 transition-colors hover:border-primary/40"
            >
              <span className="flex items-center gap-1.5 font-mono text-xs text-subtle">
                <ArrowLeft className="size-3.5 transition-transform group-hover:-translate-x-0.5" /> Projeto anterior
              </span>
              <span className="mt-2 block font-display text-lg font-semibold tracking-tight">{previous.name}</span>
            </Link>
          ) : null}
          {next ? (
            <Link
              href={`/projetos/${next.slug}`}
              className="group rounded-2xl border border-border bg-surface p-5 text-right transition-colors hover:border-primary/40"
            >
              <span className="flex items-center justify-end gap-1.5 font-mono text-xs text-subtle">
                Próximo projeto <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
              </span>
              <span className="mt-2 block font-display text-lg font-semibold tracking-tight">{next.name}</span>
            </Link>
          ) : null}
        </nav>
      </div>
    </article>
  );
}
