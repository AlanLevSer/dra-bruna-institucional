import { lazy, Suspense } from "react";
import { SEOHead } from "@/components/SEOHead";
import { HeroVendasB } from "@/components/vendas/HeroVendasB";
import { ProblemIdentificationB } from "@/components/vendas/ProblemIdentificationB";
import { StatsVendas } from "@/components/vendas/StatsVendas";
import { TransformacoesReaisVendasB } from "@/components/vendas/TransformacoesReaisVendasB";
import { ComoFuncionaB } from "@/components/vendas/ComoFuncionaB";
import LeadChatWidget from "@/components/LeadChatWidget";

const BenefitsListB = lazy(() => import("@/components/vendas/BenefitsListB"));
const DifferentialsVendas = lazy(() => import("@/components/vendas/DifferentialsVendas").then(m => ({ default: m.DifferentialsVendas })));
const CredentialsVendasB = lazy(() => import("@/components/vendas/CredentialsVendasB"));
const TestimonialsGoogleB = lazy(() => import("@/components/vendas/TestimonialsGoogleB"));
const MediaRecognitionVendas = lazy(() => import("@/components/vendas/MediaRecognitionVendas").then(m => ({ default: m.MediaRecognitionVendas })));
const FAQVendasB = lazy(() => import("@/components/vendas/FAQVendasB"));
const FinalCTAVendasB = lazy(() => import("@/components/vendas/FinalCTAVendasB"));
const Footer = lazy(() => import("@/components/Footer").then(m => ({ default: m.Footer })));

const BalaoIntragasticoB = () => {
  const seoData = {
    title: "Perca de 10 a 35kg em 6 meses com Balão Intragástrico | Dra. Bruna Durelli",
    description: "Tratamento completo com acompanhamento médico, nutricional e psicológico. Mais de 3.000 vidas transformadas. Agende sua avaliação!",
    keywords: "balão intragástrico, emagrecimento, obesidade, perda de peso, Dra. Bruna Durelli, São Paulo",
    canonical: "https://www.brunadurelli.com.br/balao-intragastrico-b",
  };

  return (
    <>
      <SEOHead data={seoData} />
      <HeroVendasB />
      <ProblemIdentificationB />
      <StatsVendas />
      <TransformacoesReaisVendasB />
      <ComoFuncionaB />
      
      <Suspense fallback={<div className="min-h-[400px]" />}>
        <BenefitsListB />
        <DifferentialsVendas />
        <CredentialsVendasB />
        <TestimonialsGoogleB />
        <MediaRecognitionVendas />
        <FAQVendasB />
        <FinalCTAVendasB />
        <Footer />
      </Suspense>
      
      <LeadChatWidget showFloatingButton={false} origin="balao-intragastrico-b" />
    </>
  );
};

export default BalaoIntragasticoB;
