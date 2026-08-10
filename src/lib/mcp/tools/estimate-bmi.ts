import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";

export default defineTool({
  name: "estimate_bmi",
  title: "Estimar IMC e faixa de risco",
  description:
    "Calcula o IMC a partir de peso e altura e retorna a faixa de classificação e uma orientação geral. Não substitui avaliação médica.",
  inputSchema: {
    weight_kg: z.number().positive().describe("Peso em quilogramas."),
    height_cm: z.number().positive().describe("Altura em centímetros."),
    waist_cm: z
      .number()
      .positive()
      .optional()
      .describe("Circunferência abdominal em centímetros (opcional)."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: ({ weight_kg, height_cm, waist_cm }) => {
    const h = height_cm / 100;
    const imc = Number((weight_kg / (h * h)).toFixed(1));

    const faixa =
      imc < 18.5
        ? "Abaixo do peso"
        : imc < 25
          ? "Peso adequado"
          : imc < 30
            ? "Sobrepeso"
            : imc < 35
              ? "Obesidade grau I"
              : imc < 40
                ? "Obesidade grau II"
                : "Obesidade grau III";

    const riscoAbdominal =
      waist_cm === undefined
        ? null
        : waist_cm > 102
          ? "Muito elevado"
          : waist_cm > 94
            ? "Elevado"
            : "Dentro do esperado";

    const result = {
      imc,
      faixa,
      risco_abdominal: riscoAbdominal,
      orientacao:
        "Resultado apenas informativo. Para um plano individualizado, faça o Mapa Metabólico em /mapa-metabolico ou agende uma avaliação com a equipe da Dra. Bruna Durelli.",
    };

    return {
      content: [{ type: "text", text: JSON.stringify(result, null, 2) }],
      structuredContent: result,
    };
  },
});
