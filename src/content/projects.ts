import type { Project } from "./types";

/**
 * Projetos exibidos no portfólio.
 * - `links.demo` e `links.github`: preencha quando existirem (campo vazio não gera botão).
 * - `images`: telas reais; quando vazio, a página usa a ilustração em código (`mockup`).
 */
export const projects: Project[] = [
  {
    slug: "crm-sob-medida",
    name: "CRMs sob Medida",
    category: "CRM · Atendimento com IA",
    status: "Publicado em servidor próprio",
    year: "2026",
    summary:
      "CRMs completos e adaptáveis a diferentes tipos de negócio: clientes, agenda, retornos, financeiro e atendimento no WhatsApp com Inteligência Artificial.",
    problem:
      "Em muitos negócios, cadastro de clientes, agenda, vendas e retornos ficam espalhados entre planilhas e conversas soltas no WhatsApp, e a equipe gasta boa parte do dia respondendo às mesmas perguntas.",
    objective:
      "Reunir o relacionamento com o cliente em um só lugar, automatizar o primeiro atendimento e ajustar o sistema à rotina de cada negócio, sem tirar da equipe o controle das conversas.",
    segments: [
      "Lojas de roupas e calçados",
      "Salões e barbearias",
      "Academias e estúdios",
      "Imobiliárias",
      "Prestadores de serviço",
    ],
    features: [
      "Cadastro e histórico de clientes",
      "Agenda de atendimentos",
      "Agendamento online",
      "Lembretes automáticos",
      "Controle de retornos",
      "Avaliação pós-atendimento",
      "Atendimento via WhatsApp com IA",
      "Transferência da conversa para a equipe",
      "Controle financeiro e de despesas",
    ],
    stack: ["Next.js", "TypeScript", "Prisma", "PostgreSQL", "OpenAI API", "Tailwind CSS", "Docker", "Nginx"],
    architecture: {
      intro:
        "Uma aplicação Next.js reúne o site público, o painel do negócio e a API. O atendimento no WhatsApp passa por um serviço de IA com regras de assunto antes de responder.",
      layers: [
        {
          title: "Interface",
          description: "Site público e painel do negócio",
          items: ["Agendamento online", "Painel administrativo", "Next.js · React · Tailwind CSS"],
        },
        {
          title: "API e regras",
          description: "Rotas do Next.js com autenticação",
          items: ["Agenda e disponibilidade", "Clientes e retornos", "Financeiro"],
        },
        {
          title: "Atendimento com IA",
          description: "WhatsApp integrado ao sistema",
          items: ["Webhook de mensagens", "Respostas com OpenAI", "Transferência para a equipe"],
        },
        {
          title: "Dados e rotinas",
          description: "Persistência e tarefas agendadas",
          items: ["PostgreSQL com Prisma", "Lembretes automáticos", "Pedidos de avaliação"],
        },
        {
          title: "Infraestrutura",
          description: "Publicação em servidor próprio",
          items: ["Docker", "Nginx", "VPS Linux"],
        },
      ],
    },
    mockup: "crm",
    images: [],
    links: {},
    featured: true,
  },
  {
    slug: "sites-e-aplicacoes-web",
    name: "Sites e Aplicações Web",
    category: "Web · Sites institucionais",
    status: "Projetos contínuos",
    summary:
      "Sites institucionais, páginas profissionais e aplicações web responsivas, com identidade própria, do layout à publicação.",
    problem:
      "Um site precisa apresentar bem uma empresa ou uma pessoa, carregar rápido em qualquer aparelho e continuar fácil de manter depois de publicado.",
    objective:
      "Criar sites com identidade visual própria, boa performance e estrutura pronta para crescer — como este portfólio.",
    features: [
      "Layout responsivo para celular, tablet e desktop",
      "Animações e microinterações",
      "SEO e metadados para compartilhamento",
      "Otimização de imagens e fontes",
      "Modo claro e escuro",
      "Publicação e configuração de domínio",
    ],
    stack: ["Next.js", "Astro", "Tailwind CSS", "TypeScript"],
    architecture: {
      intro:
        "A tecnologia muda conforme o objetivo do site: Next.js quando há partes dinâmicas e formulários, Astro quando o foco é conteúdo e velocidade.",
      layers: [
        {
          title: "Conteúdo",
          description: "Textos e dados centralizados",
          items: ["Fácil de atualizar", "Sem informação presa nos componentes"],
        },
        {
          title: "Interface",
          description: "Componentes reutilizáveis",
          items: ["Next.js ou Astro", "Tailwind CSS", "Modo claro e escuro"],
        },
        {
          title: "Qualidade",
          description: "Performance e acessibilidade",
          items: ["SEO e Open Graph", "Imagens otimizadas", "Navegação por teclado"],
        },
      ],
    },
    mockup: "sites",
    images: [],
    links: {},
    featured: false,
  },
  {
    slug: "bots-e-agentes-de-ia",
    name: "Bots e Agentes de IA",
    category: "Inteligência Artificial",
    status: "Projetos contínuos",
    summary:
      "Bots para WhatsApp e Telegram e agentes de IA que atendem, agendam, avisam — e sabem a hora de chamar uma pessoa.",
    problem:
      "Muitas conversas se repetem: dúvidas, horários, confirmações e avisos. Responder tudo manualmente toma o tempo da equipe e atrasa quem está do outro lado.",
    objective:
      "Automatizar o atendimento repetitivo com IA, com regras claras do que o bot pode fazer e a possibilidade de uma pessoa assumir a conversa a qualquer momento.",
    features: [
      "Bots para WhatsApp e Telegram",
      "Agentes autônomos de IA",
      "Atendimento automatizado",
      "Agendamentos",
      "Avisos e notificações",
      "Integração com APIs",
      "Transferência do atendimento para uma pessoa da equipe",
    ],
    stack: ["Python", "Node.js", "OpenAI API", "WhatsApp", "Telegram"],
    architecture: {
      intro:
        "Cada mensagem passa por um fluxo previsível: chega pelo canal, ganha contexto, é respondida pela IA dentro de regras definidas e, quando necessário, vai para uma pessoa.",
      layers: [
        {
          title: "Canal",
          description: "Onde a conversa acontece",
          items: ["WhatsApp", "Telegram", "Webhooks"],
        },
        {
          title: "Agente",
          description: "Contexto e regras",
          items: ["Instruções do negócio", "Limites do que pode fazer", "OpenAI API"],
        },
        {
          title: "Ferramentas",
          description: "Ações no mundo real",
          items: ["Consultas a sistemas", "Agendamentos", "Avisos e notificações"],
        },
        {
          title: "Equipe",
          description: "Pessoas no controle",
          items: ["Transferência da conversa", "Retorno ao bot", "Histórico"],
        },
      ],
    },
    mockup: "bots",
    images: [],
    links: {},
    featured: false,
  },
  {
    slug: "automacoes-e-integracoes",
    name: "Automações e Integrações",
    category: "Automação de processos",
    status: "Projetos contínuos",
    summary:
      "Fluxos que conectam sistemas, APIs e mensageria para eliminar tarefas manuais e repetitivas.",
    problem:
      "Copiar dados entre sistemas, enviar o mesmo aviso todos os dias, conferir informações à mão: tarefas que tomam tempo e abrem espaço para erros.",
    objective:
      "Conectar as ferramentas para que a informação circule sozinha e as pessoas foquem no que realmente exige decisão.",
    features: [
      "Fluxos automatizados com n8n",
      "Integração entre sistemas por APIs",
      "Envio automático de mensagens e avisos",
      "Rotinas agendadas",
      "Gatilhos por eventos e webhooks",
    ],
    stack: ["n8n", "Node.js", "APIs REST", "PostgreSQL", "WhatsApp", "Telegram"],
    architecture: {
      intro:
        "Toda automação segue a mesma ideia: um gatilho dispara um fluxo, que executa ações em outros sistemas e avisa quem precisa saber.",
      layers: [
        {
          title: "Gatilho",
          description: "O que inicia o fluxo",
          items: ["Horário agendado", "Webhook", "Evento em um sistema"],
        },
        {
          title: "Fluxo",
          description: "Onde a lógica acontece",
          items: ["n8n", "Rotinas em Node.js", "Tratamento de erros"],
        },
        {
          title: "Ações",
          description: "O resultado",
          items: ["Chamadas a APIs", "Registros no banco", "Mensagens e avisos"],
        },
      ],
    },
    mockup: "automations",
    images: [],
    links: {},
    featured: false,
  },
];

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}

export function getAdjacentProjects(slug: string) {
  const index = projects.findIndex((project) => project.slug === slug);
  const total = projects.length;
  return {
    previous: projects[(index - 1 + total) % total],
    next: projects[(index + 1) % total],
  };
}
