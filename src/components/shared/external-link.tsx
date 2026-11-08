import type { ComponentProps } from "react";

/** Link externo com abertura segura em nova aba. */
export function ExternalLink({ children, ...props }: ComponentProps<"a">) {
  return (
    <a target="_blank" rel="noopener noreferrer" {...props}>
      {children}
      <span className="sr-only"> (abre em nova aba)</span>
    </a>
  );
}
