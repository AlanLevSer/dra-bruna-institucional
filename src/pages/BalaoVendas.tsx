import { SEOHead } from "@/components/SEOHead";
import { HeroVendas } from "@/components/vendas/HeroVendas";
import { StatsVendas } from "@/components/vendas/StatsVendas";
import { TransformacoesReaisVendas } from "@/components/vendas/TransformacoesReaisVendas";
import { TargetAudienceVendas } from "@/components/vendas/TargetAudienceVendas";
import { ProgramaLevSerVendas } from "@/components/vendas/ProgramaLevSerVendas";
import { PilaresMetodoVendas } from "@/components/vendas/PilaresMetodoVendas";
import { JornadaFasesVendas } from "@/components/vendas/JornadaFasesVendas";
import { PlansComparison } from "@/components/vendas/PlansComparison";
import { ComparadorBaloes } from "@/components/ComparadorBaloes";
import { ResultsVendas } from "@/components/vendas/ResultsVendas";
import { TestimonialsVendas } from "@/components/vendas/TestimonialsVendas";
import { CredentialsVendas } from "@/components/vendas/CredentialsVendas";
import { DifferentialsVendas } from "@/components/vendas/DifferentialsVendas";
import { MediaRecognitionVendas } from "@/components/vendas/MediaRecognitionVendas";
import { FAQVendas } from "@/components/vendas/FAQVendas";
import { FinalCTAVendas } from "@/components/vendas/FinalCTAVendas";
import { Footer } from "@/components/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";

const BalaoVendas = () => {
  const seoData = {
    title: "Bal�o Intrag�strico - Perca at� 35 kg em at� 12 meses | Dra. Bruna Durelli",
    description:
      "Tratamento completo com bal�o intrag�strico, acompanhamento interdisciplinar e resultados duradouros. Consulta de avalia��o com desconto. Agende agora!",
    keywords:
      "bal�o intrag�strico, emagrecimento, perda de peso, obesidade, Dra. Bruna Durelli, LevSer, S�o Paulo",
    canonical: "https://drabrunadurelli.com/balao-intragastrico-a",
  } as const;

  return (
    <>
      <SEOHead data={seoData} />
      <HeroVendas />
      <StatsVendas />
      <TransformacoesReaisVendas />
      <TargetAudienceVendas />
      <ProgramaLevSerVendas />
      <PilaresMetodoVendas />
      <JornadaFasesVendas />
      <PlansComparison />
      <ComparadorBaloes />
      <ResultsVendas />
      <TestimonialsVendas />
      <CredentialsVendas />
      <DifferentialsVendas />
      <MediaRecognitionVendas />
      <FAQVendas />
      <FinalCTAVendas />
      <Footer />
      <WhatsAppButton />
    </>
  );
};

export default BalaoVendas;



