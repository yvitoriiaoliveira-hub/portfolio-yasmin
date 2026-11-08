import { Slot } from "@radix-ui/react-slot";
import type { ComponentProps } from "react";

import { cn } from "@/lib/utils";

const variants = {
  primary:
    "bg-primary text-primary-foreground shadow-[0_10px_30px_-12px_var(--primary)] hover:bg-primary-strong hover:shadow-[0_14px_34px_-12px_var(--primary)]",
  secondary: "bg-surface text-foreground border border-border hover:border-border-strong hover:bg-surface-2",
  ghost: "text-muted hover:text-foreground hover:bg-surface-2",
  outline: "border border-border-strong text-foreground hover:border-primary hover:text-primary",
} as const;

const sizes = {
  sm: "h-9 px-3.5 text-sm gap-1.5 rounded-lg",
  md: "h-11 px-5 text-sm gap-2 rounded-xl",
  lg: "h-12 px-6 text-[0.95rem] gap-2 rounded-xl",
  icon: "size-10 rounded-xl",
} as const;

type ButtonProps = ComponentProps<"button"> & {
  variant?: keyof typeof variants;
  size?: keyof typeof sizes;
  asChild?: boolean;
};

export function Button({ className, variant = "primary", size = "md", asChild = false, ...props }: ButtonProps) {
  const Component = asChild ? Slot : "button";
  return (
    <Component
      className={cn(
        "group/button inline-flex shrink-0 items-center justify-center font-medium whitespace-nowrap select-none",
        "transition-[background-color,border-color,color,box-shadow,transform] duration-200 ease-out",
        "active:scale-[0.97] disabled:pointer-events-none disabled:opacity-60",
        "[&_svg]:size-4 [&_svg]:shrink-0",
        variants[variant],
        sizes[size],
        className,
      )}
      {...props}
    />
  );
}
