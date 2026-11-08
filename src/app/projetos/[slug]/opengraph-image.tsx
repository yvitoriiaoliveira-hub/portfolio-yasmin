import { ImageResponse } from "next/og";

import { getProject, projects } from "@/content/projects";
import { siteConfig } from "@/content/site";
import { OgCard, loadLogo, ogSize } from "@/lib/og-card";

export const alt = "Projeto do portfólio de Yasmin Vitória";
export const size = ogSize;
export const contentType = "image/png";

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export default async function ProjectOpengraphImage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProject(slug);
  const logoSrc = await loadLogo();
  return new ImageResponse(
    <OgCard
      eyebrow={project?.category ?? siteConfig.role}
      title={project?.name ?? siteConfig.shortName}
      subtitle={project?.summary ?? siteConfig.headline}
      logoSrc={logoSrc}
    />,
    size,
  );
}
