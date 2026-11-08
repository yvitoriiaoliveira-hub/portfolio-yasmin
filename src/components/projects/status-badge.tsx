import { cn } from "@/lib/utils";

export function StatusBadge({ status, className }: { status: string; className?: string }) {
  const live = /publicado|produção/i.test(status);
  const building = /desenvolvimento/i.test(status);

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium",
        live && "border-success/30 bg-success/10 text-success",
        building && "border-amber-500/30 bg-amber-500/10 text-amber-700 dark:text-amber-300",
        !live && !building && "border-border bg-surface-2 text-muted",
        className,
      )}
    >
      <span
        aria-hidden="true"
        className={cn("size-1.5 rounded-full", live ? "bg-success" : building ? "bg-amber-500" : "bg-subtle")}
      />
      {status}
    </span>
  );
}
