"use client";

import { Download } from "lucide-react";
import { motion, useMotionValueEvent, useScroll } from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

import { Logo } from "@/components/brand/logo";
import { Button } from "@/components/ui/button";
import { sections } from "@/content/navigation";
import { siteConfig } from "@/content/site";
import { useActiveSection } from "@/hooks/use-active-section";
import { cn } from "@/lib/utils";

import { MobileMenu } from "./mobile-menu";
import { sectionHref } from "./nav-link";
import { ThemeToggle } from "./theme-toggle";

const sectionIds = sections.map((section) => section.id);

export function Header() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const activeOnHome = useActiveSection(sectionIds);
  const active = isHome ? activeOnHome : pathname.startsWith("/projetos") ? "projetos" : null;

  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  useMotionValueEvent(scrollY, "change", (value) => setScrolled(value > 24));

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-300",
        scrolled ? "border-b border-border bg-background/75 backdrop-blur-xl" : "border-b border-transparent",
      )}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-5 sm:px-8">
        <Link href="/" className="rounded-xl" aria-label={`${siteConfig.shortName} — página inicial`}>
          <Logo />
        </Link>

        <nav aria-label="Seções" className="hidden lg:block">
          <ul className="flex items-center gap-1 rounded-full border border-border bg-surface/70 p-1 backdrop-blur">
            {sections.map((section) => {
              const isActive = active === section.id;
              return (
                <li key={section.id}>
                  <Link
                    href={sectionHref(section.id, pathname)}
                    aria-current={isActive ? "true" : undefined}
                    className={cn(
                      "relative block rounded-full px-3.5 py-1.5 text-sm transition-colors duration-200",
                      isActive ? "text-foreground" : "text-muted hover:text-foreground",
                    )}
                  >
                    {isActive ? (
                      <motion.span
                        layoutId="nav-active"
                        className="absolute inset-0 -z-10 rounded-full bg-surface-3"
                        transition={{ type: "spring", stiffness: 380, damping: 32 }}
                      />
                    ) : null}
                    {section.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-1.5">
          <ThemeToggle />
          <Button asChild variant="secondary" size="sm" className="hidden sm:inline-flex">
            <a href={siteConfig.resume.href} download={siteConfig.resume.fileName} data-umami-event="baixar-curriculo">
              <Download />
              Currículo
            </a>
          </Button>
          <MobileMenu active={active} pathname={pathname} />
        </div>
      </div>
    </header>
  );
}
