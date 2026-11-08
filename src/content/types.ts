export type ProjectMockup = "crm" | "sites" | "bots" | "automations";

export type ProjectImage = {
  src: string;
  alt: string;
  caption: string;
  width: number;
  height: number;
};

export type ArchitectureLayer = {
  title: string;
  description: string;
  items: string[];
};

export type Project = {
  slug: string;
  name: string;
  category: string;
  /** Situação real do projeto (ex.: "Publicado em servidor próprio", "Em desenvolvimento"). */
  status: string;
  year?: string;
  summary: string;
  problem: string;
  objective: string;
  /** Tipos de negócio para os quais a solução pode ser adaptada (exibido como "Adaptável para"). */
  segments?: string[];
  features: string[];
  /** Título da lista de funcionalidades (ex.: "Escopo planejado" para projetos em construção). */
  featuresLabel?: string;
  stack: string[];
  architecture: {
    intro: string;
    layers: ArchitectureLayer[];
  };
  /** Ilustração em código usada no card e no topo da página do projeto. */
  mockup: ProjectMockup;
  /** Telas reais. Deixe vazio quando não houver. */
  images: ProjectImage[];
  /** Preencha quando existir. Campos vazios não geram botão. */
  links: {
    demo?: string;
    github?: string;
  };
  featured: boolean;
};

export type StackGroup = {
  title: string;
  description: string;
  items: string[];
};
