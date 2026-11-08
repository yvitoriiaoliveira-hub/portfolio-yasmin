import type { MetadataRoute } from "next";

import { siteConfig } from "@/content/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `Portfólio · ${siteConfig.shortName}`,
    short_name: siteConfig.shortName,
    description: siteConfig.description,
    start_url: "/",
    display: "standalone",
    background_color: "#06080f",
    theme_color: "#2a4fe0",
    lang: "pt-BR",
    icons: [
      { src: "/brand/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/brand/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
  };
}
