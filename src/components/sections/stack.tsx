import { Reveal } from "@/components/motion/reveal";
import { SectionHeading } from "@/components/shared/section-heading";
import { TechIcon } from "@/components/stack/tech-icon";
import { marqueeTools, stackGroups } from "@/content/stack";

export function Stack() {
  return (
    <section id="stack" aria-labelledby="stack-titulo" className="relative overflow-hidden border-y border-border bg-surface/40 py-16 sm:py-24 lg:py-32">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading
          id="stack-titulo"
          index="04"
          eyebrow="Stack tecnológica"
          title="Ferramentas que uso para tirar ideias do papel."
          description="Organizadas pelo papel que cumprem em um projeto — da interface ao servidor, passando pelos dados e pela Inteligência Artificial."
        />
      </div>

      {/* Faixa de ferramentas */}
      <div className="group/marquee relative mt-14 mask-fade-x" aria-hidden="true">
        <div className="flex w-max animate-marquee gap-3 group-hover/marquee:[animation-play-state:paused]">
          {[...marqueeTools, ...marqueeTools].map((tool, index) => (
            <span
              key={`${tool}-${index}`}
              className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-4 py-2 text-sm text-muted"
            >
              <TechIcon name={tool} className="size-4" colored />
              {tool}
            </span>
          ))}
        </div>
      </div>

      {/* Tabela por categoria */}
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal className="mt-10 sm:mt-14">
          <ul className="divide-y divide-border overflow-hidden rounded-3xl card-surface">
            {stackGroups.map((group, index) => (
              <li
                key={group.title}
                className="grid gap-4 px-6 py-6 transition-colors duration-300 hover:bg-surface-2/50 sm:px-8 lg:grid-cols-[17rem_1fr] lg:items-center lg:gap-10"
              >
                <div className="flex items-start gap-4">
                  <span className="pt-0.5 font-mono text-xs text-primary">{String(index + 1).padStart(2, "0")}</span>
                  <div>
                    <h3 className="text-base font-semibold tracking-tight">{group.title}</h3>
                    <p className="mt-0.5 text-sm text-muted">{group.description}</p>
                  </div>
                </div>

                <ul className="flex flex-wrap gap-2" aria-label={`Tecnologias de ${group.title}`}>
                  {group.items.map((item) => (
                    <li
                      key={item}
                      className="group inline-flex h-9 items-center gap-2 rounded-full border border-border bg-background/60 pr-3.5 pl-2.5 text-sm transition-[border-color,background-color] duration-300 hover:border-border-strong hover:bg-background"
                    >
                      <TechIcon
                        name={item}
                        className="size-4 shrink-0 text-muted transition-colors duration-300 group-hover:text-(--tech-color)"
                      />
                      <span className="whitespace-nowrap">{item}</span>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
