import { defineTool } from "@lovable.dev/mcp-js";

const TREATMENTS = [
  {
    slug: "balao-intragastrico",
    nome: "Balão Intragástrico",
    resumo:
      "Procedimento endoscópico sem cortes que reduz o volume gástrico e ajuda no emagrecimento com acompanhamento multidisciplinar.",
    path: "/balao-intragastrico",
  },
  {
    slug: "gastroplastia-endoscopica",
    nome: "Gastroplastia Endoscópica",
    resumo:
      "Sutura endoscópica do estômago (sleeve endoscópico) para redução de capacidade gástrica sem cirurgia aberta.",
    path: "/gastroplastia-endoscopica",
  },
  {
    slug: "canetas-emagrecedoras",
    nome: "Canetas Emagrecedoras",
    resumo:
      "Terapia sacietógena com medicações injetáveis, sempre com indicação e acompanhamento médico.",
    path: "/canetas-emagrecedoras",
  },
  {
    slug: "medicina-regenerativa",
    nome: "Medicina Regenerativa",
    resumo:
      "Protocolos de regeneração metabólica e celular voltados a energia, longevidade e recuperação funcional.",
    path: "/medicina-regenerativa",
  },
  {
    slug: "plasma-argonio",
    nome: "Plasma de Argônio",
    resumo:
      "Tratamento endoscópico indicado em casos de reganho de peso após cirurgia bariátrica.",
    path: "/plasma-argonio",
  },
  {
    slug: "nutricao-celular",
    nome: "Nutrição Celular",
    resumo:
      "Abordagem nutricional focada em função mitocondrial, saciedade e reequilíbrio metabólico.",
    path: "/nutricao-celular",
  },
  {
    slug: "programa-levser",
    nome: "Programa LevSer",
    resumo:
      "Programa completo de transformação metabólica com os quatro pilares: nutrição, metabólica/regenerativa, movimento e mente.",
    path: "/programa-levser",
  },
];

export default defineTool({
  name: "list_treatments",
  title: "Listar tratamentos",
  description:
    "Lista os tratamentos e programas oferecidos, com resumo e caminho da página no site.",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: () => ({
    content: [{ type: "text", text: JSON.stringify(TREATMENTS, null, 2) }],
    structuredContent: { treatments: TREATMENTS },
  }),
});
