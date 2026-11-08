/**
 * Configurações pessoais do portfólio.
 * Para mudar textos, links ou a disponibilidade, edite só este arquivo.
 */

const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000").replace(/\/$/, "");

export const siteConfig = {
  url: siteUrl,
  name: "Yasmin Vitória de Oliveira Munhoz",
  shortName: "Yasmin Vitória",
  firstName: "Yasmin",
  role: "Desenvolvedora Full Stack",
  location: "São Joaquim de Bicas, MG",
  locale: "pt_BR",

  headline: "Transformo ideias em sistemas, produtos digitais e soluções inteligentes.",
  intro:
    "Desenvolvedora Full Stack que transforma problemas reais em soluções digitais. Desenvolvo aplicações completas, integro tecnologias e construo sistemas que vão da ideia à produção.",
  description:
    "Portfólio de Yasmin Vitória, desenvolvedora Full Stack. Aplicações web e mobile, APIs, bancos de dados, integrações, automações e soluções com Inteligência Artificial — da ideia à produção.",
  keywords: [
    "Yasmin Vitória",
    "desenvolvedora Full Stack",
    "desenvolvedora júnior",
    "Next.js",
    "React",
    "Node.js",
    "TypeScript",
    "PostgreSQL",
    "Inteligência Artificial",
    "bots WhatsApp",
    "automações n8n",
    "portfólio",
  ],

  email: "yvitoriia.oliveira@gmail.com",
  links: {
    github: "https://github.com/yvitoriiaoliveira-hub",
    linkedin: "https://www.linkedin.com/in/yasmin-vitoria-23b6a5328/",
  },

  /** Indicador de disponibilidade exibido no topo do site. */
  availability: {
    open: true,
    label: "Disponível para novas oportunidades",
    closedLabel: "No momento, sem disponibilidade",
  },

  resume: {
    href: "/curriculo-yasmin-vitoria.pdf",
    fileName: "Curriculo-Yasmin-Vitoria.pdf",
  },

  /** Estatísticas de visitas (Umami, na própria VPS). */
  analytics: {
    scriptUrl: "https://analytics.yvtech.com.br/script.js",
    websiteId: "d0eb9967-ca96-4337-b88e-7b3a7ee8233e",
    domain: "portfolio.yvtech.com.br",
  },

  photo: {
    src: "/images/yasmin.jpg",
    alt: "Yasmin Vitória, desenvolvedora Full Stack, sorrindo, com fundo claro",
    width: 577,
    height: 800,
  },
} as const;

export type SiteConfig = typeof siteConfig;
