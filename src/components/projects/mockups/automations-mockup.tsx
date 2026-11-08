import { Clock, Database, Filter, Globe, MessageSquare } from "lucide-react";
import type { ComponentType, SVGProps } from "react";

type FlowNode = {
  id: string;
  label: string;
  detail: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  /** Posição em % (x = borda esquerda, y = centro). */
  x: number;
  y: number;
};

const nodes: FlowNode[] = [
  { id: "gatilho", label: "Agenda", detail: "8h", icon: Clock, x: 3, y: 50 },
  { id: "api", label: "API", detail: "REST", icon: Globe, x: 27, y: 50 },
  { id: "filtro", label: "Filtro", detail: "regras", icon: Filter, x: 51, y: 50 },
  { id: "msg", label: "Aviso", detail: "WhatsApp", icon: MessageSquare, x: 77, y: 24 },
  { id: "db", label: "Banco", detail: "Postgres", icon: Database, x: 77, y: 76 },
];

const connections = [
  "M 21 50 L 27 50",
  "M 45 50 L 51 50",
  "M 69 50 C 73 50, 73 24, 77 24",
  "M 69 50 C 73 50, 73 76, 77 76",
];

export function AutomationsMockup() {
  return (
    <div className="relative aspect-[16/10] overflow-hidden rounded-xl border border-border bg-surface shadow-card">
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(var(--border-strong)_1px,transparent_1px)] [background-size:14px_14px] opacity-70"
      />

      <svg className="absolute inset-0 size-full" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
        {connections.map((d) => (
          <path
            key={d}
            d={d}
            fill="none"
            stroke="var(--primary)"
            strokeWidth="0.6"
            strokeDasharray="1.6 1.6"
            vectorEffect="non-scaling-stroke"
            className="animate-dash"
          />
        ))}
      </svg>

      {nodes.map(({ id, label, detail, icon: Icon, x, y }) => (
        <div
          key={id}
          className="absolute flex w-[18%] -translate-y-1/2 flex-col items-center gap-1 rounded-lg border border-border bg-surface px-1 py-1.5 text-center shadow-sm"
          style={{ left: `${x}%`, top: `${y}%` }}
        >
          <span className="inline-flex size-5 items-center justify-center rounded-md bg-primary-soft text-primary">
            <Icon className="size-3" />
          </span>
          <span className="text-[9px] leading-none font-medium">{label}</span>
          <span className="font-mono text-[7px] leading-none text-subtle">{detail}</span>
        </div>
      ))}

      <span className="absolute bottom-2 left-2 inline-flex items-center gap-1 rounded-md border border-border bg-surface px-1.5 py-0.5 font-mono text-[8px] text-success">
        ● fluxo ativo
      </span>
    </div>
  );
}
