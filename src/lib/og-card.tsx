import { readFile } from "node:fs/promises";
import { join } from "node:path";

/** Layout das imagens de compartilhamento (Open Graph), usado pela página inicial e pelos projetos. */
export const ogSize = { width: 1200, height: 630 };

/** Logo YV Tech em data URI (o gerador de imagens não lê arquivos da pasta public sozinho). */
export async function loadLogo() {
  const file = await readFile(join(process.cwd(), "public/brand/yv-tech-logo.png"));
  return `data:image/png;base64,${file.toString("base64")}`;
}

type OgCardProps = { eyebrow: string; title: string; subtitle: string; logoSrc: string };

export function OgCard({ eyebrow, title, subtitle, logoSrc }: OgCardProps) {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "64px 80px",
        background: "linear-gradient(135deg, #06080f 0%, #0b1b52 55%, #2a4fe0 130%)",
        color: "#e9edf7",
        fontFamily: "sans-serif",
      }}
    >
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
        <div style={{ display: "flex", fontSize: 26, color: "#9fb3ff", letterSpacing: 4, textTransform: "uppercase", marginTop: 12 }}>
          {eyebrow}
        </div>
        {/* eslint-disable-next-line @next/next/no-img-element -- imagem dentro do gerador de Open Graph */}
        <img src={logoSrc} alt="" width={200} height={169} />
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
        <div style={{ fontSize: 76, fontWeight: 700, letterSpacing: -2, lineHeight: 1.05 }}>{title}</div>
        <div style={{ fontSize: 32, color: "#b8c3dc", lineHeight: 1.35, maxWidth: 980 }}>{subtitle}</div>
      </div>

      <div style={{ display: "flex", gap: 14, fontSize: 22, color: "#9aa5bd" }}>
        <span>TypeScript</span>
        <span>·</span>
        <span>Node.js</span>
        <span>·</span>
        <span>React</span>
        <span>·</span>
        <span>PostgreSQL</span>
        <span>·</span>
        <span>IA</span>
      </div>
    </div>
  );
}
