import { TestimonialsGoogle } from "@/components/TestimonialsGoogle";
import { CONTACT } from "@/lib/constants";
import { openLeadChat } from "@/lib/leadChat";

const TestimonialsGoogleB = () => {
  const handleWhatsApp = () => {
    openLeadChat('testimonials_google_b', CONTACT.WHATSAPP_BALAO_VENDAS);
  };

  return (
    <TestimonialsGoogle
      title="O Que Nossas Pacientes Dizem"
      subtitle="Nada gera mais confiança do que ver o resultado de quem já passou pela mesma jornada."
      cardVariant="default"
      reviewCount={12}
      ctaText="Agendar Avaliação Gratuita"
      onCtaClick={handleWhatsApp}
      backgroundColor="bg-gradient-to-br from-background via-muted/20 to-background"
    />
  );
};

export default TestimonialsGoogleB;
