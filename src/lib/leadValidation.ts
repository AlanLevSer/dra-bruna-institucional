import { z } from "zod";

export const leadNameSchema = z.object({
  name: z
    .string()
    .trim()
    .min(3, "Nome deve ter pelo menos 3 caracteres")
    .max(100, "Nome muito longo")
    .regex(/^[a-zA-ZÀ-ÿ\s]+$/, "Use apenas letras e espaços"),
});

export const leadWhatsAppSchema = z.object({
  whatsapp: z
    .string()
    .trim()
    .regex(/^\d{10,11}$/, "WhatsApp deve ter 10 ou 11 dígitos"),
});

export const leadEmailSchema = z.object({
  email: z
    .string()
    .trim()
    .email("Email inválido")
    .max(255, "Email muito longo")
    .toLowerCase(),
});

export const leadCompleteSchema = leadNameSchema
  .merge(leadWhatsAppSchema)
  .merge(leadEmailSchema);

export type LeadData = z.infer<typeof leadCompleteSchema>;
