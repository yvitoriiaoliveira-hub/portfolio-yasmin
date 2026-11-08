import { ArrowLeft, FolderGit2 } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Página não encontrada",
  robots: { index: false },
};

export default function NotFound() {
  return (
    <section className="relative isolate flex min-h-[80svh] items-center overflow-hidden pt-24 pb-16">
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-grid mask-radial" />
      <div className="mx-auto max-w-2xl px-5 text-center sm:px-8">
        <p className="font-mono text-sm text-primary">erro 404</p>
        <h1 className="mt-4 font-display text-[6rem] leading-none font-semibold tracking-tighter text-gradient sm:text-[9rem]">404</h1>
        <p className="mt-6 text-xl font-medium tracking-tight sm:text-2xl">Esta rota não existe — ainda.</p>
        <p className="mt-3 text-muted">O endereço pode ter mudado ou sido digitado errado. Que tal voltar e explorar os projetos?</p>
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <Button asChild size="lg">
            <Link href="/">
              <ArrowLeft />
              Voltar ao início
            </Link>
          </Button>
          <Button asChild size="lg" variant="secondary">
            <Link href="/#projetos">
              <FolderGit2 />
              Ver projetos
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
