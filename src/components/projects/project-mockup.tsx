import Image from "next/image";

import type { Project } from "@/content/types";
import { cn } from "@/lib/utils";

import { FitToWidth } from "./fit-to-width";
import { AutomationsMockup } from "./mockups/automations-mockup";
import { BotsMockup } from "./mockups/bots-mockup";
import { CrmMockup } from "./mockups/crm-mockup";
import { FleetMockup } from "./mockups/fleet-mockup";
import { LifeMockup } from "./mockups/life-mockup";
import { BrowserFrame } from "./mockups/mockup-frame";
import { SitesMockup } from "./mockups/sites-mockup";
import { StoreMockup } from "./mockups/store-mockup";

type ProjectMockupProps = {
  project: Project;
  className?: string;
  /** Mostra a legenda que diferencia tela real de ilustração. */
  showCaption?: boolean;
  sizes?: string;
};

export function ProjectMockup({ project, className, showCaption = false, sizes = "(min-width: 1024px) 560px, 100vw" }: ProjectMockupProps) {
  const cover = project.images[0];

  const visual = cover ? (
    <BrowserFrame url={project.name.toLowerCase()}>
      <Image src={cover.src} alt={cover.alt} width={cover.width} height={cover.height} sizes={sizes} className="h-auto w-full" />
    </BrowserFrame>
  ) : (
    <div aria-hidden="true">
      {/* Ilustrações de duas colunas: desenhadas em 470 px e escaladas para caber */}
      {project.mockup === "crm" && (
        <FitToWidth designWidth={470}>
          <CrmMockup />
        </FitToWidth>
      )}
      {project.mockup === "store" && (
        <FitToWidth designWidth={470}>
          <StoreMockup />
        </FitToWidth>
      )}
      {project.mockup === "fleet" && (
        <FitToWidth designWidth={470}>
          <FleetMockup />
        </FitToWidth>
      )}
      {project.mockup === "life" && (
        <FitToWidth designWidth={470}>
          <LifeMockup />
        </FitToWidth>
      )}
      {project.mockup === "sites" && <SitesMockup />}
      {project.mockup === "bots" && (
        <FitToWidth designWidth={400} maxScale={1.2}>
          <BotsMockup />
        </FitToWidth>
      )}
      {project.mockup === "automations" && <AutomationsMockup />}
    </div>
  );

  return (
    <figure className={cn("relative", className)}>
      {visual}
      {showCaption ? (
        <figcaption className="mt-3 font-mono text-[0.7rem] tracking-wide text-subtle">
          {cover ? "Tela real do sistema, com dados fictícios." : "Representação ilustrativa da interface, com dados fictícios."}
        </figcaption>
      ) : null}
    </figure>
  );
}
