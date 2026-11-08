export default function Loading() {
  return (
    <div className="mx-auto max-w-6xl px-5 pt-36 pb-24 sm:px-8" role="status" aria-live="polite">
      <span className="sr-only">Carregando projeto…</span>
      <div className="h-4 w-48 animate-pulse rounded-full bg-surface-3" />
      <div className="mt-10 h-14 w-3/4 animate-pulse rounded-2xl bg-surface-3" />
      <div className="mt-4 h-6 w-1/2 animate-pulse rounded-full bg-surface-2" />
      <div className="mt-14 aspect-[16/9] w-full animate-pulse rounded-3xl bg-surface-2" />
    </div>
  );
}
