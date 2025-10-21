import { z } from "zod";

export const step1Schema = z.object({
  peso: z.number()
    .min(40, "Peso mínimo: 40kg")
    .max(300, "Peso máximo: 300kg"),
  altura: z.number()
    .min(120, "Altura mínima: 1,20m")
    .max(250, "Altura máxima: 2,50m"),
  metaPeso: z.number().min(5).max(50)
});

export const step2Schema = z.object({
  comorbidades: z.array(z.string())
    .min(1, "Selecione ao menos uma opção")
});

export const step3Schema = z.object({
  tentativasAnteriores: z.number().min(0),
  efeitoSanfona: z.boolean(),
  gatilhos: z.array(z.string())
});

export const step4Schema = z.object({
  invasividade: z.enum(['minima', 'moderada', 'nao_importa']),
  tempoRecuperacao: z.enum(['minimo', 'moderado', 'nao_importa']),
  tempoDisponivel: z.enum(['1-3h/sem', '3-5h/sem', '5+h/sem'])
});

export const step5Schema = z.object({
  dorPrincipal: z.enum(['energia', 'compulsao', 'dores_articulares', 'autoestima', 'marcadores_alterados', 'mobilidade'])
});

export const step6Schema = z.object({
  expectativas: z.array(z.string())
    .min(1, "Selecione ao menos uma expectativa")
    .max(3, "Selecione no máximo 3 expectativas")
});

export const step7Schema = z.object({
  cirurgiaGastricaPrevia: z.boolean(),
  cirurgiaBariatricaPreviaTipo: z.enum(['nenhuma', 'bypass', 'sleeve', 'outras']),
  reganhoPosBariatrica: z.boolean(),
  falhaPreviaClinica: z.boolean()
});
