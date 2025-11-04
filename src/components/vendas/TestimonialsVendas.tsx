import { TestimonialsGoogle } from "@/components/TestimonialsGoogle";

export const TestimonialsVendas = () => {
  return (
    <TestimonialsGoogle
      title="O que nossas pacientes dizem"
      subtitle="Histórias reais de quem transformou a vida com o balão intragástrico e o Programa LevSer."
      cardVariant="default"
      reviewCount={12}
      showGrafismo={true}
      backgroundColor="bg-muted/30"
    />
  );
};
