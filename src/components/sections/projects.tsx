import { Reveal } from "@/components/motion/reveal";
import { ProjectCard } from "@/components/projects/project-card";
import { ProjectCarousel } from "@/components/projects/project-carousel";
import { ProjectMockup } from "@/components/projects/project-mockup";
import { SectionHeading } from "@/components/shared/section-heading";
import { projects } from "@/content/projects";

export function Projects() {
  return (
    <section id="projetos" aria-labelledby="projetos-titulo" className="relative overflow-hidden py-16 sm:py-24 lg:py-32">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading
          id="projetos-titulo"
          index="03"
          eyebrow="Projetos próprios"
          title="Produtos que eu criei, da ideia à publicação."
          description="Também fazem parte da minha experiência: cada produto passou por levantamento de requisitos, arquitetura, desenvolvimento e publicação. Veja o problema, as funcionalidades e as tecnologias de cada um."
        />

        <Reveal className="mt-12">
          <ProjectCarousel label="Projetos próprios">
            {projects.map((project, index) => (
              <ProjectCard
                key={project.slug}
                project={project}
                index={index}
                visual={<ProjectMockup project={project} sizes="(min-width: 1024px) 340px, 86vw" />}
              />
            ))}
          </ProjectCarousel>
        </Reveal>
      </div>
    </section>
  );
}
