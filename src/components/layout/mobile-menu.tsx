"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { Download, Menu, X } from "lucide-react";
import { motion } from "motion/react";
import Link from "next/link";
import { FaLinkedinIn } from "react-icons/fa6";
import { SiGithub } from "react-icons/si";

import { Logo } from "@/components/brand/logo";
import { ExternalLink } from "@/components/shared/external-link";
import { Button } from "@/components/ui/button";
import { sections } from "@/content/navigation";
import { siteConfig } from "@/content/site";
import { cn } from "@/lib/utils";

import { sectionHref } from "./nav-link";

type MobileMenuProps = { active: string | null; pathname: string };

export function MobileMenu({ active, pathname }: MobileMenuProps) {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <Button variant="ghost" size="icon" className="lg:hidden" aria-label="Abrir menu">
          <Menu className="size-5" />
        </Button>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-[60] bg-background/60 backdrop-blur-sm" />
        <Dialog.Content className="fixed inset-y-0 right-0 z-[70] flex w-full max-w-sm flex-col border-l border-border bg-surface px-6 pt-4 pb-8 shadow-2xl outline-none">
          <div className="flex h-12 items-center justify-between">
            <Logo />
            <Dialog.Close asChild>
              <Button variant="ghost" size="icon" aria-label="Fechar menu">
                <X className="size-5" />
              </Button>
            </Dialog.Close>
          </div>
          <Dialog.Title className="sr-only">Menu de navegação</Dialog.Title>
          <Dialog.Description className="sr-only">Links para as seções do portfólio.</Dialog.Description>

          <nav aria-label="Seções" className="mt-8">
            <ul className="space-y-1">
              {sections.map((section, index) => (
                <motion.li
                  key={section.id}
                  initial={{ opacity: 0, x: 24 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.04 * index, duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                >
                  <Dialog.Close asChild>
                    <Link
                      href={sectionHref(section.id, pathname)}
                      aria-current={active === section.id ? "true" : undefined}
                      className={cn(
                        "flex items-baseline gap-4 rounded-xl px-3 py-3 font-display text-2xl font-semibold tracking-tight transition-colors",
                        active === section.id ? "bg-surface-2 text-foreground" : "text-muted hover:text-foreground",
                      )}
                    >
                      <span className="font-mono text-xs font-normal text-primary">0{index + 1}</span>
                      {section.label}
                    </Link>
                  </Dialog.Close>
                </motion.li>
              ))}
            </ul>
          </nav>

          <div className="mt-auto space-y-4">
            <Button asChild className="w-full" size="lg">
              <a href={siteConfig.resume.href} download={siteConfig.resume.fileName} data-umami-event="baixar-curriculo">
                <Download />
                Baixar currículo
              </a>
            </Button>
            <div className="flex gap-2">
              <Button asChild variant="secondary" className="flex-1">
                <ExternalLink href={siteConfig.links.github}>
                  <SiGithub />
                  GitHub
                </ExternalLink>
              </Button>
              <Button asChild variant="secondary" className="flex-1">
                <ExternalLink href={siteConfig.links.linkedin}>
                  <FaLinkedinIn />
                  LinkedIn
                </ExternalLink>
              </Button>
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
