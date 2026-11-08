import { CreditCard, Footprints, QrCode, ScanBarcode, Shirt, Store, Tag, Target, Wallet } from "lucide-react";

import { cn } from "@/lib/utils";

import { BrowserFrame } from "./mockup-frame";

const items = [
  { icon: Shirt, name: "Camiseta Básica", variant: "M · Preto", price: "R$ 59,90" },
  { icon: Tag, name: "Calça Jeans Slim", variant: "40 · Azul", price: "R$ 149,90" },
  { icon: Footprints, name: "Tênis Casual", variant: "37 · Branco", price: "R$ 199,90" },
];

const payments = [
  { icon: QrCode, label: "Pix", active: true },
  { icon: CreditCard, label: "Crédito", active: false },
  { icon: Wallet, label: "Crediário", active: false },
];

const branches = [
  { name: "LJ01 · Centro", units: 18, width: "w-[78%]" },
  { name: "LJ02 · Shopping", units: 7, width: "w-[34%]" },
];

export function StoreMockup() {
  return (
    <BrowserFrame url="pdv · loja centro" className="text-[10px]">
      <div className="grid grid-cols-[1.35fr_1fr]">
        {/* Venda no PDV */}
        <div className="border-r border-border p-3">
          <div className="flex items-center justify-between">
            <p className="font-display text-[11px] font-semibold">Nova venda</p>
            <span className="inline-flex items-center gap-1 rounded-md bg-success/10 px-1.5 py-0.5 text-[8px] text-success">
              <span className="size-1.5 rounded-full bg-success" /> Caixa aberto
            </span>
          </div>

          <div className="mt-2.5 flex items-center gap-1.5 rounded-md border border-primary/40 bg-primary-soft/40 px-2 py-1.5 text-subtle">
            <ScanBarcode className="size-3 text-primary" />
            Leia o código de barras
          </div>

          <ul className="mt-2.5 space-y-1.5">
            {items.map(({ icon: Icon, name, variant, price }) => (
              <li key={name} className="flex items-center gap-2 rounded-md border border-border bg-surface-2/50 px-2 py-1.5">
                <span className="inline-flex size-6 shrink-0 items-center justify-center rounded-md bg-surface text-primary shadow-sm">
                  <Icon className="size-3.5" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate font-medium">{name}</span>
                  <span className="block text-[8.5px] text-subtle">{variant}</span>
                </span>
                <span className="font-mono text-[9px]">{price}</span>
              </li>
            ))}
          </ul>

          <div className="mt-2.5 flex items-end justify-between border-t border-dashed border-border-strong pt-2">
            <span className="text-muted">3 itens</span>
            <span className="text-right">
              <span className="block text-[8px] text-subtle">Total</span>
              <span className="block font-display text-[15px] leading-none font-semibold">R$ 409,70</span>
            </span>
          </div>
        </div>

        {/* Pagamento, estoque e meta */}
        <div className="flex flex-col gap-2 bg-surface-2/50 p-3">
          <div className="rounded-lg border border-border bg-surface p-2">
            <p className="font-medium">Pagamento</p>
            <div className="mt-1.5 grid grid-cols-3 gap-1">
              {payments.map(({ icon: Icon, label, active }) => (
                <span
                  key={label}
                  className={cn(
                    "flex flex-col items-center gap-0.5 rounded-md border px-1 py-1 text-[8px]",
                    active ? "border-primary bg-primary text-primary-foreground" : "border-border text-muted",
                  )}
                >
                  <Icon className="size-3" />
                  {label}
                </span>
              ))}
            </div>
          </div>

          <div className="rounded-lg border border-border bg-surface p-2">
            <p className="flex items-center gap-1 font-medium">
              <Store className="size-3 text-primary" /> Estoque por filial
            </p>
            <ul className="mt-1.5 space-y-1.5">
              {branches.map((branch) => (
                <li key={branch.name}>
                  <span className="flex justify-between text-[8.5px] text-muted">
                    {branch.name}
                    <span className="font-mono text-foreground">{branch.units} un</span>
                  </span>
                  <span className="mt-0.5 block h-1 rounded-full bg-surface-3">
                    <span className={cn("block h-1 rounded-full bg-primary", branch.width)} />
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-lg border border-border bg-surface p-2">
            <p className="flex items-center justify-between font-medium">
              <span className="flex items-center gap-1">
                <Target className="size-3 text-primary" /> Meta do mês
              </span>
              <span className="font-mono text-[8.5px] text-success">72%</span>
            </p>
            <span className="mt-1.5 block h-1.5 rounded-full bg-surface-3">
              <span className="block h-1.5 w-[72%] rounded-full bg-gradient-to-r from-primary to-success" />
            </span>
          </div>
        </div>
      </div>
    </BrowserFrame>
  );
}
