import type { StackGroup } from "./types";

export const stackGroups: StackGroup[] = [
  {
    title: "Linguagens",
    description: "A base de tudo o que construo.",
    items: ["TypeScript", "JavaScript", "Python", "SQL"],
  },
  {
    title: "Front-end",
    description: "Interfaces web e mobile responsivas.",
    items: ["React", "Next.js", "React Native", "Expo", "Astro", "Tailwind CSS", "HTML", "CSS"],
  },
  {
    title: "Back-end",
    description: "APIs, regras de negócio e processamento em fila.",
    items: ["Node.js", "NestJS", "Fastify", "APIs REST", "Prisma", "Redis", "BullMQ"],
  },
  {
    title: "Banco de dados",
    description: "Dados bem modelados desde o início.",
    items: ["PostgreSQL", "Supabase", "Modelagem de dados"],
  },
  {
    title: "IA e automação",
    description: "Inteligência Artificial aplicada a processos reais.",
    items: ["OpenAI API", "Agentes de IA", "Bots", "Engenharia de prompts", "n8n"],
  },
  {
    title: "Infraestrutura e ferramentas",
    description: "Do repositório à produção.",
    items: ["Docker", "Docker Compose", "Nginx", "Linux", "Git", "GitHub", "Claude Code"],
  },
];

/** Faixa animada com as ferramentas mais usadas. */
export const marqueeTools = [
  "TypeScript",
  "React",
  "Next.js",
  "Node.js",
  "NestJS",
  "PostgreSQL",
  "Python",
  "React Native",
  "Docker",
  "OpenAI API",
  "n8n",
  "Tailwind CSS",
  "Prisma",
  "Supabase",
];
