import { About } from "@/components/sections/about";
import { Contact } from "@/components/sections/contact";
import { Education } from "@/components/sections/education";
import { Experience } from "@/components/sections/experience";
import { Hero } from "@/components/sections/hero";
import { Projects } from "@/components/sections/projects";
import { Stack } from "@/components/sections/stack";
import { education } from "@/content/education";
import { experience } from "@/content/experience";
import { siteConfig } from "@/content/site";

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: siteConfig.name,
  alternateName: siteConfig.shortName,
  jobTitle: siteConfig.role,
  description: siteConfig.description,
  url: siteConfig.url,
  image: `${siteConfig.url}${siteConfig.photo.src}`,
  email: `mailto:${siteConfig.email}`,
  address: { "@type": "PostalAddress", addressLocality: "São Joaquim de Bicas", addressRegion: "MG", addressCountry: "BR" },
  sameAs: [siteConfig.links.linkedin, siteConfig.links.github],
  worksFor: { "@type": "Organization", name: experience.company },
  alumniOf: { "@type": "CollegeOrUniversity", name: education.institution },
  knowsAbout: ["TypeScript", "Node.js", "React", "Next.js", "PostgreSQL", "Python", "Inteligência Artificial", "Automação"],
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd).replace(/</g, "\\u003c") }}
      />
      <Hero />
      <About />
      <Experience />
      <Projects />
      <Stack />
      <Education />
      <Contact />
    </>
  );
}
