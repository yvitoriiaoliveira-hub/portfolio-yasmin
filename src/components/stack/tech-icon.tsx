import type { ComponentType, CSSProperties, SVGProps } from "react";
import {
  Bot,
  Braces,
  Database,
  ListOrdered,
  MessageSquare,
  Network,
  Sparkles,
  Webhook,
  Workflow,
  BrainCircuit,
  KeyRound,
  ShieldCheck,
  Terminal,
} from "lucide-react";
import {
  SiAstro,
  SiClaude,
  SiCss,
  SiDocker,
  SiExpo,
  SiFastify,
  SiGit,
  SiGithub,
  SiHtml5,
  SiJavascript,
  SiLinux,
  SiNestjs,
  SiNextdotjs,
  SiNginx,
  SiNodedotjs,
  SiPostgresql,
  SiPrisma,
  SiPython,
  SiReact,
  SiRedis,
  SiSupabase,
  SiTailwindcss,
  SiTelegram,
  SiTypescript,
  SiVite,
  SiWhatsapp,
} from "react-icons/si";

type IconComponent = ComponentType<SVGProps<SVGSVGElement> & { size?: number | string }>;

/** Ícone e cor oficial de cada tecnologia. Sem ícone oficial disponível, usa um ícone representativo. */
const techIcons: Record<string, { icon: IconComponent; color: string }> = {
  TypeScript: { icon: SiTypescript, color: "#3178C6" },
  JavaScript: { icon: SiJavascript, color: "#E8C900" },
  Python: { icon: SiPython, color: "#3776AB" },
  SQL: { icon: Database, color: "#2a4fe0" },
  React: { icon: SiReact, color: "#08A6CC" },
  "Next.js": { icon: SiNextdotjs, color: "currentColor" },
  "React Native": { icon: SiReact, color: "#08A6CC" },
  Expo: { icon: SiExpo, color: "currentColor" },
  Astro: { icon: SiAstro, color: "#BC52EE" },
  "Tailwind CSS": { icon: SiTailwindcss, color: "#06B6D4" },
  HTML: { icon: SiHtml5, color: "#E34F26" },
  CSS: { icon: SiCss, color: "#663399" },
  "Node.js": { icon: SiNodedotjs, color: "#5FA04E" },
  NestJS: { icon: SiNestjs, color: "#E0234E" },
  Fastify: { icon: SiFastify, color: "currentColor" },
  "APIs REST": { icon: Braces, color: "#2a4fe0" },
  Prisma: { icon: SiPrisma, color: "currentColor" },
  Redis: { icon: SiRedis, color: "#FF4438" },
  BullMQ: { icon: ListOrdered, color: "#E0234E" },
  PostgreSQL: { icon: SiPostgresql, color: "#4169E1" },
  Supabase: { icon: SiSupabase, color: "#3FCF8E" },
  "Modelagem de dados": { icon: Network, color: "#2a4fe0" },
  "OpenAI API": { icon: BrainCircuit, color: "#10A37F" },
  "Agentes de IA": { icon: Sparkles, color: "#7C5CFF" },
  Bots: { icon: Bot, color: "#2a4fe0" },
  "Engenharia de prompts": { icon: Terminal, color: "#7C5CFF" },
  n8n: { icon: Workflow, color: "#EA4B71" },
  Docker: { icon: SiDocker, color: "#2496ED" },
  "Docker Compose": { icon: SiDocker, color: "#2496ED" },
  Nginx: { icon: SiNginx, color: "#009639" },
  Linux: { icon: SiLinux, color: "currentColor" },
  Git: { icon: SiGit, color: "#F05032" },
  GitHub: { icon: SiGithub, color: "currentColor" },
  "Claude Code": { icon: SiClaude, color: "#D97757" },
  Vite: { icon: SiVite, color: "#8E5CFF" },
  WhatsApp: { icon: SiWhatsapp, color: "#25D366" },
  Telegram: { icon: SiTelegram, color: "#26A5E4" },
  Webhooks: { icon: Webhook, color: "#2a4fe0" },
  JWT: { icon: KeyRound, color: "#D63AFF" },
  "Better Auth": { icon: ShieldCheck, color: "currentColor" },
  Mensageria: { icon: MessageSquare, color: "#2a4fe0" },
};

export function getTechIcon(name: string) {
  return techIcons[name] ?? { icon: Braces, color: "currentColor" };
}

type TechIconProps = {
  name: string;
  className?: string;
  /** Mostra a cor oficial sempre (true) ou só ao passar o mouse no elemento pai com a classe "group". */
  colored?: boolean;
};

export function TechIcon({ name, className, colored = false }: TechIconProps) {
  const { icon: Icon, color } = getTechIcon(name);
  return (
    <Icon
      aria-hidden="true"
      className={className}
      style={colored ? { color } : ({ "--tech-color": color } as CSSProperties)}
    />
  );
}
