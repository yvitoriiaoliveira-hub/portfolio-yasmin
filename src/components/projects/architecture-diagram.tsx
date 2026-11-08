import { ArrowDown, ArrowRight } from "lucide-react";
import { Fragment } from "react";

import { Stagger, StaggerItem } from "@/components/motion/reveal";
import type { ArchitectureLayer } from "@/content/types";
import { cn } from "@/lib/utils";

const columns: Record<number, string> = {
  3: "lg:grid-cols-[1fr_auto_1fr_auto_1fr]",
  4: "lg:grid-cols-[1fr_auto_1fr_auto_1fr_auto_1fr]",
  5: "lg:grid-cols-[1fr_auto_1fr_auto_1fr_auto_1fr_auto_1fr]",
};

export function ArchitectureDiagram({ layers }: { layers: ArchitectureLayer[] }) {
  return (
    <Stagger className={cn("grid items-stretch gap-3", columns[layers.length] ?? "lg:grid-cols-3")} stagger={0.1}>
      {layers.map((layer, index) => (
        <Fragment key={layer.title}>
          <StaggerItem className="h-full">
            <div className="relative h-full overflow-hidden rounded-2xl border border-border bg-surface p-5">
              <span aria-hidden="true" className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-deep via-primary to-transparent" />
              <p className="font-mono text-[0.7rem] text-primary">{String(index + 1).padStart(2, "0")}</p>
              <h3 className="mt-2 text-base font-semibold tracking-tight">{layer.title}</h3>
              <p className="mt-1 text-sm text-muted">{layer.description}</p>
              <ul className="mt-4 space-y-1.5">
                {layer.items.map((item) => (
                  <li key={item} className="rounded-lg bg-surface-2 px-2.5 py-1.5 font-mono text-[0.72rem] text-foreground/85">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </StaggerItem>
          {index < layers.length - 1 ? (
            <div aria-hidden="true" className="flex items-center justify-center text-subtle">
              <ArrowDown className="size-4 lg:hidden" />
              <ArrowRight className="hidden size-4 lg:block" />
            </div>
          ) : null}
        </Fragment>
      ))}
    </Stagger>
  );
}
