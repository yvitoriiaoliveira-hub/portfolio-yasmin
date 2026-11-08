import { CarFront, Check, Fuel, Gauge, Wrench } from "lucide-react";

import { cn } from "@/lib/utils";

import { BrowserFrame } from "./mockup-frame";

const vehicles = [
  { plate: "ABC-1D23", model: "Utilitário", status: "Disponível", tone: "bg-success/12 text-success" },
  { plate: "QRS-4E56", model: "Caminhonete", status: "Em uso", tone: "bg-primary/12 text-primary" },
  { plate: "XYZ-7F89", model: "Van", status: "Manutenção", tone: "bg-amber-500/12 text-amber-600 dark:text-amber-400" },
];

export function FleetMockup() {
  return (
    <BrowserFrame url="frota · veículos" className="text-[10px]">
      <div className="grid grid-cols-[1.3fr_1fr]">
        <div className="border-r border-border p-3">
          <p className="font-display text-[11px] font-semibold">Veículos</p>
          <ul className="mt-2 space-y-1.5">
            {vehicles.map((vehicle) => (
              <li key={vehicle.plate} className="flex items-center gap-2 rounded-md border border-border bg-surface-2/40 px-2 py-1.5">
                <span className="inline-flex size-6 shrink-0 items-center justify-center rounded-md bg-surface text-primary shadow-sm">
                  <CarFront className="size-3.5" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block font-mono text-[9px] font-medium">{vehicle.plate}</span>
                  <span className="block text-[8.5px] text-subtle">{vehicle.model}</span>
                </span>
                <span className={cn("rounded px-1.5 py-0.5 text-[8px] font-medium", vehicle.tone)}>{vehicle.status}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col gap-2 bg-surface-2/50 p-3">
          <div className="rounded-lg border border-border bg-surface p-2">
            <p className="flex items-center gap-1 font-medium">
              <Check className="size-3 text-success" /> Check-out registrado
            </p>
            <div className="mt-1.5 grid grid-cols-2 gap-1 text-[8.5px] text-muted">
              <span className="flex items-center gap-1 rounded bg-surface-2 px-1.5 py-1">
                <Gauge className="size-2.5 text-primary" /> 48.210 km
              </span>
              <span className="flex items-center gap-1 rounded bg-surface-2 px-1.5 py-1">
                <Fuel className="size-2.5 text-primary" /> ¾ tanque
              </span>
            </div>
          </div>
          <div className="rounded-lg border border-amber-500/30 bg-amber-500/8 p-2">
            <p className="flex items-center gap-1 font-medium text-amber-700 dark:text-amber-300">
              <Wrench className="size-3" /> Manutenção
            </p>
            <p className="mt-1 text-[8.5px] text-muted">Revisão da van agendada para sexta.</p>
          </div>
        </div>
      </div>
    </BrowserFrame>
  );
}
