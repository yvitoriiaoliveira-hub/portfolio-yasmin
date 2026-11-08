import { ImageResponse } from "next/og";

import { siteConfig } from "@/content/site";
import { OgCard, loadLogo, ogSize } from "@/lib/og-card";

export const alt = `${siteConfig.shortName} — ${siteConfig.role}`;
export const size = ogSize;
export const contentType = "image/png";

export default async function OpengraphImage() {
  const logoSrc = await loadLogo();
  return new ImageResponse(
    <OgCard eyebrow={siteConfig.role} title={siteConfig.shortName} subtitle={siteConfig.headline} logoSrc={logoSrc} />,
    size,
  );
}
