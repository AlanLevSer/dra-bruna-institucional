import { SEOHead } from "@/components/SEOHead";
import { HeroVendas } from "@/components/vendas/HeroVendas";
import { StatsVendas } from "@/components/vendas/StatsVendas";
import { TargetAudienceVendas } from "@/components/vendas/TargetAudienceVendas";
import { MethodVendas } from "@/components/vendas/MethodVendas";
import { PlansComparison } from "@/components/vendas/PlansComparison";
import { TestimonialsVendas } from "@/components/vendas/TestimonialsVendas";
import { ResultsVendas } from "@/components/vendas/ResultsVendas";
import { CredentialsVendas } from "@/components/vendas/CredentialsVendas";
import { DifferentialsVendas } from "@/components/vendas/DifferentialsVendas";
import { MediaRecognitionVendas } from "@/components/vendas/MediaRecognitionVendas";
import { ComparadorBaloes } from "@/components/ComparadorBaloes";
import { FAQVendas } from "@/components/vendas/FAQVendas";
import { FinalCTAVendas } from "@/components/vendas/FinalCTAVendas";
import { Footer } from "@/components/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { ExitIntentModal } from "@/components/vendas/ExitIntentModal";

const BalaoVendas = () => {
  const seoData = {
    title: "Balão Intragástrico - Perca até 25kg em 6 Meses | Dra. Bruna Durelli",
    description: "Tratamento completo com balão intragástrico, acompanhamento multidisciplinar e resultados duradouros. Consulta de avaliação com desconto. Agende agora!",
    keywords: "balão intragástrico, emagrecimento, perda de peso, obesidade, Dra. Bruna Durelli, LevSer",
    canonical: "https://brunadurelli.com.br/balao-intragastrico-a",
  };

  return (
    <>
      <SEOHead data={seoData} />
      <HeroVendas />
      <StatsVendas />
      <TargetAudienceVendas />
      <MethodVendas />
      <PlansComparison />
      <TestimonialsVendas />
      <ResultsVendas />
      <CredentialsVendas />
      <DifferentialsVendas />
      <MediaRecognitionVendas />
      <ComparadorBaloes />
      <FAQVendas />
      <FinalCTAVendas />
      <Footer />
      <WhatsAppButton />
      <ExitIntentModal />
    </>
  );
};

export default BalaoVendas;
