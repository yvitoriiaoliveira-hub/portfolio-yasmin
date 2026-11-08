import { Reveal } from "@/components/motion/reveal";
import { SectionHeading } from "@/components/shared/section-heading";
import { TechGlobe, type GlobeItem } from "@/components/stack/tech-globe";
import { TechIcon } from "@/components/stack/tech-icon";
import { stackGroups } from "@/content/stack";

/** Itens do globo: todas as tecnologias, sem repetir ícone igual (ex.: Docker e Docker Compose). */
const HIDDEN_IN_GLOBE = new Set(["Docker Compose", "React Native"]);
const globeItems: GlobeItem[] = stackGroups.flatMap((group) =>
  group.items.filter((item) => !HIDDEN_IN_GLOBE.has(item)).map((item) => ({ name: item, group: group.title })),
);

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
          align="center"
          size="md"
          className="max-w-2xl"
        />
        {/* Globo interativo, grande e centralizado abaixo do título */}
        <Reveal delay={0.1} className="mt-6 sm:mt-10">
          <TechGlobe items={globeItems} />
        </Reveal>
      </div>

      {/* Cartões por categoria */}
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="mt-12 space-y-10 sm:mt-16 sm:space-y-12">
          {stackGroups.map((group, index) => (
            <Reveal key={group.title}>
              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <span className="font-mono text-xs text-primary">{String(index + 1).padStart(2, "0")}</span>
                <h3 className="text-lg font-semibold tracking-tight">{group.title}</h3>
                <p className="w-full text-sm text-muted sm:w-auto">
                  <span className="hidden sm:inline">— </span>
                  {group.description}
                </p>
              </div>

              <ul
                className="mt-4 grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8"
                aria-label={`Tecnologias de ${group.title}`}
              >
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="group flex aspect-square flex-col items-center justify-center gap-2.5 rounded-2xl border border-border bg-surface p-3 text-center shadow-[0_1px_0_rgba(0,0,0,0.02)] transition-[transform,border-color,box-shadow] duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-card"
                  >
                    <TechIcon
                      name={item}
                      colored
                      className="size-8 transition-transform duration-300 group-hover:scale-110 sm:size-9"
                    />
                    <span className="text-xs leading-tight font-medium sm:text-[0.8rem]">{item}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
