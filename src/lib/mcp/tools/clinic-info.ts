import { defineTool } from "@lovable.dev/mcp-js";

export default defineTool({
  name: "clinic_info",
  title: "Informações da clínica",
  description:
    "Retorna dados de contato, endereço e horários de atendimento do consultório da Dra. Bruna Durelli.",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: () => {
    const info = {
      medica: "Dra. Bruna Durelli",
      especialidade:
        "Medicina metabólica, endoscopia bariátrica e medicina regenerativa",
      whatsapp: "(11) 99702-3024",
      whatsapp_link: "https://wa.me/5511997023024",
      email: "contato@brunadurelli.com.br",
      endereco: "Av. Brasil, 173 - Jardim Paulista, São Paulo - SP, 01431-000",
      horarios: {
        semana: "Seg a Sex: 8h às 18h",
        sabado: "Sáb: 8h às 12h",
      },
    };

    return {
      content: [{ type: "text", text: JSON.stringify(info, null, 2) }],
      structuredContent: info,
    };
  },
});
