import type { MetadataRoute } from "next";

import { projects } from "@/content/projects";
import { siteConfig } from "@/content/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return [
    { url: siteConfig.url, lastModified, changeFrequency: "monthly", priority: 1 },
    ...projects.map((project) => ({
      url: `${siteConfig.url}/projetos/${project.slug}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
