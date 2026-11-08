export const experienceIntro =
  "Na empresa e nos meus próprios produtos, participo de todas as etapas: do levantamento de requisitos à publicação e às melhorias contínuas.";

export const experience = {
  company: "GMX Soluções Industriais",
  role: "Estagiária em Desenvolvimento de Sistemas",
  period: "ago/2025 — atual",
  periodDateTime: "2025-08",
  summary:
    "Participação no desenvolvimento dos sistemas internos da empresa, desde a criação até a implantação e as melhorias contínuas.",
  systems: [
    {
      icon: "fingerprint",
      title: "Ponto eletrônico",
      text: "Sistema completo de registro de ponto: os colaboradores batem o ponto pelo aplicativo, mesmo sem internet, e o RH acompanha tudo em um painel administrativo, com banco de horas, fechamento de período e espelho de ponto em PDF.",
    },
    {
      icon: "users",
      title: "Recrutamento e gestão de pessoas",
      text: "Plataforma web que organiza o processo seletivo, de vagas e candidatos às etapas de cada seleção, e apoia a gestão de pessoas com painéis de indicadores de RH.",
    },
    {
      icon: "factory",
      title: "CRM e gestão empresarial",
      text: "Sistema de gestão integrado para acompanhar a produção e a rotina de setores como suprimentos, marketing e atendimento, com agendas, reuniões com ata gerada por IA, gestão de redes sociais e central de chamados.",
    },
    {
      icon: "bot",
      title: "Assistente virtual e agente de IA",
      text: "Assistente no WhatsApp que conversa com candidatos e indica vagas compatíveis, e agente de IA interno no Telegram que consulta os dados da empresa com acesso somente leitura.",
    },
  ],
  activities: [
    "Desenvolvimento Full Stack de aplicações web e mobile",
    "Integrações com APIs externas",
    "Desenvolvimento de bots e funcionalidades com IA",
    "Automação de processos",
    "Levantamento de requisitos e regras de negócio",
    "Testes, documentação e publicação de sistemas",
  ],
  stack: ["Node.js", "NestJS", "React", "Next.js", "React Native", "PostgreSQL", "Docker", "n8n", "OpenAI API"],
} as const;

/** Segunda experiência: os produtos próprios (os detalhes de cada um ficam na seção Projetos). */
export const ownProducts = {
  title: "Projetos próprios",
  role: "Desenvolvedora Full Stack",
  period: "2026 — atual",
  periodDateTime: "2026",
  summary:
    "Criação de produtos completos por iniciativa própria, da ideia à publicação: levantamento de requisitos, modelagem de dados, back-end, interfaces, integrações e implantação.",
  stack: ["Next.js", "React", "Prisma", "PostgreSQL", "OpenAI API", "Docker", "n8n"],
} as const;
