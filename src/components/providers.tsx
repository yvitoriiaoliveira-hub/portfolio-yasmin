"use client";

import { MotionConfig } from "motion/react";
import { ThemeProvider, useTheme } from "next-themes";
import type { ReactNode } from "react";
import { Toaster } from "sonner";

function ThemedToaster() {
  const { resolvedTheme } = useTheme();
  return (
    <Toaster
      theme={resolvedTheme === "dark" ? "dark" : "light"}
      position="bottom-center"
      richColors
      closeButton
      toastOptions={{ className: "font-sans" }}
    />
  );
}

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem storageKey="tema">
      <MotionConfig reducedMotion="user">
        {children}
        <ThemedToaster />
      </MotionConfig>
    </ThemeProvider>
  );
}
