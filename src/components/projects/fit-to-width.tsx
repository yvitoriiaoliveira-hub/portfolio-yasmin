"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

type Box = { scale: number; height: number; left: number };

/**
 * Desenha o conteúdo numa largura fixa e o escala para caber no espaço disponível,
 * como uma miniatura (evita ilustrações espremidas em cards estreitos).
 */
export function FitToWidth({ designWidth, maxScale = 1.6, children }: { designWidth: number; maxScale?: number; children: ReactNode }) {
  const outerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const [box, setBox] = useState<Box | null>(null);

  useEffect(() => {
    const outer = outerRef.current;
    const inner = innerRef.current;
    if (!outer || !inner) return;
    const observer = new ResizeObserver(() => {
      const available = outer.clientWidth;
      const scale = Math.min(maxScale, available / designWidth);
      setBox({ scale, height: inner.offsetHeight * scale, left: (available - designWidth * scale) / 2 });
    });
    observer.observe(outer);
    observer.observe(inner);
    return () => observer.disconnect();
  }, [designWidth, maxScale]);

  return (
    <div ref={outerRef} className="relative w-full" style={box ? { height: box.height } : undefined}>
      <div
        ref={innerRef}
        style={
          box
            ? { position: "absolute", top: 0, left: box.left, width: designWidth, transform: `scale(${box.scale})`, transformOrigin: "top left" }
            : undefined
        }
      >
        {children}
      </div>
    </div>
  );
}
