"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { Children, useEffect, useRef, useState, type ReactNode } from "react";

import { cn } from "@/lib/utils";

const GAP = 24;

/** Carrossel horizontal com botões de avançar e voltar (também rola com o dedo, o mouse ou as setas do teclado). */
export function ProjectCarousel({ children, label }: { children: ReactNode; label: string }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);
  const slides = Children.toArray(children);

  function updateEdges() {
    const track = trackRef.current;
    if (!track) return;
    setAtStart(track.scrollLeft <= 4);
    setAtEnd(track.scrollLeft + track.clientWidth >= track.scrollWidth - 4);
  }

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const observer = new ResizeObserver(() => updateEdges());
    observer.observe(track);
    return () => observer.disconnect();
  }, []);

  function go(direction: 1 | -1) {
    const track = trackRef.current;
    if (!track) return;
    const slide = track.querySelector<HTMLElement>("[data-slide]");
    const step = slide ? slide.getBoundingClientRect().width + GAP : track.clientWidth * 0.8;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    track.scrollBy({ left: direction * step, behavior: reduceMotion ? "auto" : "smooth" });
  }

  const buttonClass =
    "absolute top-1/2 z-10 inline-flex size-12 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-surface/95 text-foreground shadow-card backdrop-blur transition-[border-color,color,opacity,transform] duration-300 hover:border-primary hover:text-primary active:scale-95 disabled:pointer-events-none disabled:opacity-0";

  return (
    <div role="region" aria-roledescription="carrossel" aria-label={label}>
      <p className="font-mono text-xs tracking-wider text-subtle uppercase">
        {String(slides.length).padStart(2, "0")} projetos <span className="hidden sm:inline">· use as setas ou arraste</span>
      </p>

      <div className="relative mt-6">
        {/* Voltar: à esquerda do primeiro card */}
        <button
          type="button"
          onClick={() => go(-1)}
          disabled={atStart}
          aria-label="Projetos anteriores"
          className={cn(buttonClass, "-left-2 sm:-left-5 xl:-left-16")}
        >
          <ChevronLeft className="size-5" />
        </button>

        <div
          ref={trackRef}
          onScroll={updateEdges}
          tabIndex={0}
          className={cn(
            "-mx-1 flex snap-x snap-mandatory gap-6 overflow-x-auto px-1 pt-2 pb-8 outline-none",
            "[scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
            "focus-visible:ring-2 focus-visible:ring-primary/40",
          )}
        >
          {slides.map((slide, index) => (
            <div
              key={index}
              data-slide
              role="group"
              aria-roledescription="slide"
              aria-label={`${index + 1} de ${slides.length}`}
              className="w-[86%] shrink-0 snap-start sm:w-[calc((100%-24px)/2)] lg:w-[calc((100%-48px)/3)] [&>article]:h-full"
            >
              {slide}
            </div>
          ))}
        </div>

        {/* Avançar: à direita do último card visível */}
        <button
          type="button"
          onClick={() => go(1)}
          disabled={atEnd}
          aria-label="Próximos projetos"
          className={cn(buttonClass, "-right-2 sm:-right-5 xl:-right-16")}
        >
          <ChevronRight className="size-5" />
        </button>
      </div>
    </div>
  );
}
