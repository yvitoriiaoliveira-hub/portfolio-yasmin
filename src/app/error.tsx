"use client";

import { RotateCcw } from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";

import { Button } from "@/components/ui/button";

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <section className="flex min-h-[70svh] items-center pt-24 pb-16">
      <div className="mx-auto max-w-xl px-5 text-center sm:px-8">
        <p className="font-mono text-sm text-danger">algo deu errado</p>
        <h1 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">Não foi possível carregar esta parte.</h1>
        <p className="mt-3 text-muted">Tente de novo. Se continuar, volte ao início.</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button onClick={reset} size="lg">
            <RotateCcw />
            Tentar de novo
          </Button>
          <Button asChild variant="secondary" size="lg">
            <Link href="/">Voltar ao início</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
