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
    slug: "gestao-para-lojas",
    name: "Sistema de Gestão para Lojas",
    category: "SaaS · Gestão comercial",
    status: "Em desenvolvimento",
    year: "2026",
    summary:
      "Plataforma de gestão para lojas de roupas, calçados e acessórios, com PDV, estoque por filial, crediário e relatórios gerenciais.",
    problem:
      "Lojas de moda lidam com o mesmo produto em vários tamanhos e cores, estoque dividido entre filiais e vendas no crediário — muitas vezes em ferramentas que não conversam entre si.",
    objective:
      "Concentrar vendas, estoque, compras e financeiro em uma plataforma multiempresa, em que cada pessoa enxerga apenas as filiais a que tem acesso.",
    features: [
      "Gestão de produtos e variações",
      "Controle de estoque por filial",
      "Múltiplas empresas e filiais",
      "PDV e caixa",
      "Compras e fornecedores",
      "Transferências entre filiais",
      "Crediário",
      "Financeiro",
      "Metas de venda",
      "Relatórios gerenciais",
    ],
    stack: ["React", "TypeScript", "Vite", "Tailwind CSS", "Fastify", "PostgreSQL", "Docker"],
    architecture: {
      intro:
        "Monorepo em TypeScript com a interface, a API e um pacote compartilhado de tipos e validações, para que front-end e back-end falem exatamente a mesma língua.",
      layers: [
        {
          title: "Interface",
          description: "Aplicação web responsiva",
          items: ["React · Vite", "Tailwind CSS", "Telas para balcão e gestão"],
        },
        {
          title: "Pacote compartilhado",
          description: "Uma só fonte de regras",
          items: ["Tipos", "Validações", "Contratos da API"],
        },
        {
          title: "API",
          description: "Regras de negócio e permissões",
          items: ["Fastify", "Acesso por empresa e filial", "Registro de auditoria"],
        },
        {
          title: "Dados",
          description: "Banco relacional",
          items: ["PostgreSQL", "Migrações versionadas", "Docker"],
        },
      ],
    },
    mockup: "store",
    images: [],
    links: {},
    featured: true,
  },
  {
    slug: "gestao-de-frota",
    name: "Gestão de Frota",
    category: "Operações · Gestão de veículos",
    status: "Versão funcional",
    year: "2026",
    summary:
      "Controle de veículos com check-out e check-in, relatório de condição, multas, manutenções e o histórico completo de cada veículo.",
    problem:
      "Sem um sistema, fica difícil saber quem saiu com cada veículo, em que estado ele voltou, quais multas chegaram e quando foi a última manutenção.",
    objective:
      "Registrar cada saída e retorno com relatório de condição e manter o histórico completo da frota, com permissões diferentes para administradores e operadores.",
    features: [
      "Cadastro de veículos",
      "Check-out e check-in com relatório de condição",
      "Registro de multas",
      "Registro de manutenções",
      "Histórico por veículo e geral, com filtros",
      "Perfis de administrador e operador",
      "Login com renovação automática de sessão (JWT)",
      "Avisos pelo Telegram",
    ],
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "Prisma", "PostgreSQL", "Docker", "Telegram", "JWT"],
    architecture: {
      intro:
        "Interface e API na mesma aplicação Next.js, banco PostgreSQL acessado pelo Prisma e tudo empacotado com Docker Compose para subir com um comando.",
      layers: [
        {
          title: "Interface",
          description: "Telas para operadores e administradores",
          items: ["Next.js · App Router", "Tailwind CSS", "Check-out e check-in guiados"],
        },
        {
          title: "API",
          description: "Rotas REST com regras de acesso",
          items: ["Autenticação JWT com renovação", "Permissões por perfil", "Validações"],
        },
        {
          title: "Dados",
          description: "Histórico completo da frota",
          items: ["PostgreSQL", "Prisma com migrações", "Dados iniciais (seed)"],
        },
        {
          title: "Integrações e infraestrutura",
          description: "Avisos e implantação",
          items: ["Notificações no Telegram", "Docker Compose"],
        },
      ],
    },
    mockup: "fleet",
    images: [],
    links: {},
    featured: false,
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
  {
    slug: "meu-mundo",
    name: "Meu Mundo",
    category: "Produtividade pessoal",
    status: "Em desenvolvimento",
    year: "2026",
    summary:
      "Plataforma pessoal que reúne agenda, tarefas, estudos, treinos e objetivos em um único aplicativo responsivo, com privacidade por padrão.",
    problem:
      "Agenda, tarefas, estudos e metas costumam ficar espalhados em vários aplicativos que não conversam entre si, e fica difícil enxergar a própria evolução.",
    objective:
      "Concentrar a organização da rotina em um só lugar, com os dados de cada pessoa protegidos direto no banco e espaço para recursos de Inteligência Artificial.",
    featuresLabel: "Escopo planejado",
    features: [
      "Agenda semanal",
      "Tarefas e prioridades",
      "Estudos e treinos",
      "Hábitos e objetivos",
      "Anotações",
      "Recursos com Inteligência Artificial",
    ],
    stack: ["Next.js", "React", "TypeScript", "PostgreSQL", "Tailwind CSS", "Better Auth", "Docker"],
    architecture: {
      intro:
        "A fundação técnica foi pensada para privacidade: cada pessoa só enxerga os próprios dados, com a regra garantida pelo próprio banco de dados.",
      layers: [
        {
          title: "Interface",
          description: "Aplicativo web responsivo",
          items: ["Next.js · React 19", "Tailwind CSS e Radix UI", "Tema claro e escuro"],
        },
        {
          title: "Autenticação",
          description: "Contas e sessões",
          items: ["Better Auth", "E-mail e senha", "Sessões no banco"],
        },
        {
          title: "Dados",
          description: "Privacidade por padrão",
          items: ["PostgreSQL", "Row Level Security", "Migrações SQL versionadas"],
        },
      ],
    },
    mockup: "life",
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
