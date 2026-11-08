export const sections = [
  { id: "sobre", label: "Sobre" },
  { id: "experiencia", label: "Experiência" },
  { id: "projetos", label: "Projetos" },
  { id: "stack", label: "Stack" },
  { id: "formacao", label: "Formação" },
  { id: "contato", label: "Contato" },
] as const;

export type SectionId = (typeof sections)[number]["id"];
