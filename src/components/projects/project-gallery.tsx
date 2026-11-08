"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { ChevronLeft, ChevronRight, Maximize2, X } from "lucide-react";
import Image from "next/image";
import { useState, type KeyboardEvent } from "react";

import type { ProjectImage } from "@/content/types";

export function ProjectGallery({ images }: { images: ProjectImage[] }) {
  const [index, setIndex] = useState<number | null>(null);
  const current = index === null ? null : images[index];

  function go(step: number) {
    setIndex((value) => (value === null ? value : (value + step + images.length) % images.length));
  }

  function handleKey(event: KeyboardEvent) {
    if (event.key === "ArrowRight") go(1);
    if (event.key === "ArrowLeft") go(-1);
  }

  return (
    <>
      <ul className="grid gap-5 sm:grid-cols-2">
        {images.map((image, imageIndex) => (
          <li key={image.src}>
            <button
              type="button"
              onClick={() => setIndex(imageIndex)}
              className="group block w-full overflow-hidden rounded-2xl border border-border bg-surface text-left shadow-card transition-[border-color,transform] duration-300 hover:-translate-y-1 hover:border-primary/40"
              aria-label={`Ampliar: ${image.caption}`}
            >
              <span className="relative block overflow-hidden">
                <Image
                  src={image.src}
                  alt={image.alt}
                  width={image.width}
                  height={image.height}
                  sizes="(min-width: 1024px) 540px, 100vw"
                  className="h-auto w-full transition-transform duration-700 group-hover:scale-[1.03]"
                />
                <span className="absolute top-3 right-3 inline-flex size-8 items-center justify-center rounded-lg bg-background/80 text-foreground opacity-0 backdrop-blur transition-opacity group-hover:opacity-100">
                  <Maximize2 className="size-4" />
                </span>
              </span>
              <span className="block border-t border-border px-4 py-3 text-sm text-muted">{image.caption}</span>
            </button>
          </li>
        ))}
      </ul>

      <Dialog.Root open={current !== null} onOpenChange={(open) => !open && setIndex(null)}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 z-[80] bg-background/85 backdrop-blur-md" />
          <Dialog.Content
            onKeyDown={handleKey}
            className="fixed inset-0 z-[90] flex flex-col items-center justify-center gap-4 p-4 outline-none sm:p-10"
          >
            {current ? (
              <>
                <Dialog.Title className="sr-only">{current.caption}</Dialog.Title>
                <Dialog.Description className="sr-only">{current.alt}</Dialog.Description>
                <div className="relative w-full max-w-6xl overflow-hidden rounded-2xl border border-border bg-surface shadow-2xl">
                  <Image
                    src={current.src}
                    alt={current.alt}
                    width={current.width}
                    height={current.height}
                    sizes="100vw"
                    className="h-auto max-h-[78svh] w-full object-contain"
                  />
                </div>
                <div className="flex w-full max-w-6xl items-center justify-between gap-4">
                  <p className="text-sm text-muted">
                    <span className="mr-2 font-mono text-xs text-primary">
                      {(index ?? 0) + 1}/{images.length}
                    </span>
                    {current.caption}
                  </p>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => go(-1)}
                      aria-label="Imagem anterior"
                      className="inline-flex size-10 items-center justify-center rounded-xl border border-border bg-surface hover:border-primary hover:text-primary"
                    >
                      <ChevronLeft className="size-5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => go(1)}
                      aria-label="Próxima imagem"
                      className="inline-flex size-10 items-center justify-center rounded-xl border border-border bg-surface hover:border-primary hover:text-primary"
                    >
                      <ChevronRight className="size-5" />
                    </button>
                    <Dialog.Close
                      aria-label="Fechar"
                      className="inline-flex size-10 items-center justify-center rounded-xl border border-border bg-surface hover:border-primary hover:text-primary"
                    >
                      <X className="size-5" />
                    </Dialog.Close>
                  </div>
                </div>
              </>
            ) : null}
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </>
  );
}
