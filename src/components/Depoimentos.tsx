import { TestimonialsGoogle } from "@/components/TestimonialsGoogle";

export const Depoimentos = () => {
  return (
    <TestimonialsGoogle
      title="O que dizem nossos pacientes"
      subtitle="Transformações que vão além dos números na balança. Vidas que foram impactadas de forma positiva e duradoura."
      cardVariant="default"
      reviewCount={12}
      showGrafismo={true}
      backgroundColor="bg-muted/30"
    />
  );
};
