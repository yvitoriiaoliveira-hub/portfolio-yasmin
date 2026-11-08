"use client";

import { useEffect, useRef, useState } from "react";

import { TechIcon } from "@/components/stack/tech-icon";
import { cn } from "@/lib/utils";

export type GlobeItem = { name: string; group: string };

const AUTO_SPEED = 0.0032; // giro sozinho (radianos por quadro)
const DRAG_SPEED = 0.008;

/**
 * Globo 3D de tecnologias: gira sozinho, gira ao arrastar e mostra o nome ao tocar.
 * Sem biblioteca: pontos numa esfera (espiral de Fibonacci) projetados com CSS.
 * Pausa fora da tela e respeita "reduzir movimento".
 */
export function TechGlobe({ items }: { items: GlobeItem[] }) {
  const stageRef = useRef<HTMLDivElement>(null);
  const nodesRef = useRef<(HTMLButtonElement | null)[]>([]);
  const dragDistanceRef = useRef(0);
  const [selected, setSelected] = useState<GlobeItem | null>(null);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;

    const total = items.length;
    const golden = Math.PI * (3 - Math.sqrt(5));
    const points = items.map((_, i) => {
      const y = 1 - (i / Math.max(total - 1, 1)) * 2;
      const r = Math.sqrt(1 - y * y);
      const t = golden * i;
      return { x: Math.cos(t) * r, y, z: Math.sin(t) * r };
    });

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const auto = reduceMotion ? 0 : AUTO_SPEED;
    let radius = stage.clientWidth * 0.4;
    let rotX = -0.3;
    let rotY = 0;
    let velX = 0;
    let velY = auto;
    let dragging = false;
    let lastX = 0;
    let lastY = 0;
    let visible = true;
    let frame = 0;

    function render() {
      const cosX = Math.cos(rotX);
      const sinX = Math.sin(rotX);
      const cosY = Math.cos(rotY);
      const sinY = Math.sin(rotY);
      points.forEach((p, i) => {
        const el = nodesRef.current[i];
        if (!el) return;
        const x1 = p.x * cosY + p.z * sinY;
        const z1 = -p.x * sinY + p.z * cosY;
        const y2 = p.y * cosX - z1 * sinX;
        const z2 = p.y * sinX + z1 * cosX; // -1 (fundo) a 1 (frente)
        const depth = (z2 + 1) / 2;
        el.style.transform = `translate(-50%, -50%) translate3d(${(x1 * radius).toFixed(1)}px, ${(y2 * radius).toFixed(1)}px, 0) scale(${(0.55 + depth * 0.65).toFixed(3)})`;
        el.style.opacity = (0.2 + depth * 0.8).toFixed(3);
        el.style.zIndex = String(Math.round(depth * 100));
        el.style.filter = depth < 0.3 ? "blur(0.7px) grayscale(0.6)" : "none";
      });
    }

    function tick() {
      frame = 0;
      if (!dragging) {
        rotY += velY;
        rotX += velX;
        velY += (auto - velY) * 0.03;
        velX *= 0.94;
      }
      render();
      if (visible) frame = requestAnimationFrame(tick);
    }

    function start() {
      if (!frame) frame = requestAnimationFrame(tick);
    }

    const resize = new ResizeObserver(() => {
      radius = stage.clientWidth * 0.4;
      render();
    });
    resize.observe(stage);

    const viewport = new IntersectionObserver(([entry]) => {
      visible = Boolean(entry?.isIntersecting);
      if (visible) start();
    });
    viewport.observe(stage);

    function onDown(event: PointerEvent) {
      dragging = true;
      dragDistanceRef.current = 0;
      lastX = event.clientX;
      lastY = event.clientY;
      stage?.setPointerCapture(event.pointerId);
    }
    function onMove(event: PointerEvent) {
      if (!dragging) return;
      const dx = event.clientX - lastX;
      const dy = event.clientY - lastY;
      lastX = event.clientX;
      lastY = event.clientY;
      dragDistanceRef.current += Math.abs(dx) + Math.abs(dy);
      rotY += dx * DRAG_SPEED;
      rotX -= dy * DRAG_SPEED;
      velY = dx * DRAG_SPEED;
      velX = -dy * DRAG_SPEED;
      render();
    }
    function onUp() {
      dragging = false;
      start();
    }

    stage.addEventListener("pointerdown", onDown);
    stage.addEventListener("pointermove", onMove);
    stage.addEventListener("pointerup", onUp);
    stage.addEventListener("pointercancel", onUp);

    render();
    start();

    return () => {
      cancelAnimationFrame(frame);
      resize.disconnect();
      viewport.disconnect();
      stage.removeEventListener("pointerdown", onDown);
      stage.removeEventListener("pointermove", onMove);
      stage.removeEventListener("pointerup", onUp);
      stage.removeEventListener("pointercancel", onUp);
    };
  }, [items]);

  return (
    <figure className="mx-auto w-full max-w-[24rem] select-none sm:max-w-[32rem] lg:max-w-[38rem]">
      <div
        ref={stageRef}
        role="img"
        aria-label="Globo interativo com as tecnologias que eu uso. A lista completa está na tabela abaixo."
        className="relative aspect-square cursor-grab touch-pan-y active:cursor-grabbing"
      >
        <div
          aria-hidden="true"
          className="absolute inset-[12%] rounded-full bg-[radial-gradient(closest-side,var(--glow),transparent)]"
        />
        <div aria-hidden="true" className="absolute inset-[9%] rounded-full border border-dashed border-border-strong/60" />
        {items.map((item, index) => (
          <button
            key={item.name}
            ref={(element) => {
              nodesRef.current[index] = element;
            }}
            type="button"
            tabIndex={-1}
            aria-hidden="true"
            onClick={() => {
              if (dragDistanceRef.current > 6) return;
              setSelected((current) => (current?.name === item.name ? null : item));
            }}
            className={cn(
              "absolute top-1/2 left-1/2 inline-flex size-12 items-center justify-center rounded-2xl sm:size-14 lg:size-16 transition-[background-color,box-shadow] duration-200 will-change-transform",
              selected?.name === item.name ? "bg-surface shadow-card ring-2 ring-primary" : "hover:bg-surface/80",
            )}
          >
            <TechIcon name={item.name} colored className="size-8 drop-shadow-sm sm:size-9 lg:size-11" />
          </button>
        ))}
      </div>
      <figcaption className="mt-4 flex min-h-9 items-center justify-center" aria-live="polite">
        {selected ? (
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3.5 py-1.5 text-sm shadow-card">
            <TechIcon name={selected.name} colored className="size-4" />
            <strong className="font-semibold">{selected.name}</strong>
            <span className="text-subtle">·</span>
            <span className="text-muted">{selected.group}</span>
          </span>
        ) : (
          <span className="font-mono text-[0.7rem] tracking-[0.2em] text-subtle uppercase">Arraste para girar · Toque num ícone</span>
        )}
      </figcaption>
    </figure>
  );
}
