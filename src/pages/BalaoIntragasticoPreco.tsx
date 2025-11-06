import { lazy, Suspense, useEffect } from "react";
import { SEOHead } from "@/components/SEOHead";
import HeroVendasPreco from "@/components/vendas/HeroVendasPreco";
import ProblemIdentificationPreco from "@/components/vendas/ProblemIdentificationPreco";
import { StatsVendas } from "@/components/vendas/StatsVendas";
import { TransformacoesReaisVendasB } from "@/components/vendas/TransformacoesReaisVendasB";
import WhatsIncludedSection from "@/components/vendas/WhatsIncludedSection";
import draBrunaHero from "@/assets/dra-bruna-hero.avif";

import { DifferentialsVendas } from "@/components/vendas/DifferentialsVendas";
import { MediaRecognitionVendas } from "@/components/vendas/MediaRecognitionVendas";
import { Footer } from "@/components/Footer";

// Lazy imports para componentes below-the-fold
const BenefitsListPreco = lazy(() => import("@/components/vendas/BenefitsListPreco"));
const PricingContextSection = lazy(() => import("@/components/vendas/PricingContextSection"));
const CredentialsVendasPreco = lazy(() => import("@/components/vendas/CredentialsVendasPreco"));
const TestimonialsGoogleB = lazy(() => import("@/components/vendas/TestimonialsGoogleB"));
const FAQVendasPreco = lazy(() => import("@/components/vendas/FAQVendasPreco"));
const FinalCTAVendasPreco = lazy(() => import("@/components/vendas/FinalCTAVendasPreco"));

// LeadChatWidget carregado sob demanda
const LeadChatWidget = lazy(() => import("@/components/LeadChatWidget"));

const BalaoIntragasticoPreco = () => {
  const seoData = {
    title: "Quanto Custa o Balão Intragástrico? Valores 2025 | Dra. Bruna Durelli",
    description: "Descubra o valor do balão intragástrico com acompanhamento completo. Perca até 35kg em 6 meses. Parcelamento facilitado. Consulte valores agora!",
    keywords: "quanto custa balão intragástrico, preço balão gástrico, valor balão intragástrico, investimento balão, São Paulo, Dra. Bruna Durelli",
    canonical: "https://www.brunadurelli.com.br/balao-intragastrico-preco-a",
  };

  // Preload da imagem hero
  useEffect(() => {
    const heroImagePreload = new Image();
    heroImagePreload.src = draBrunaHero;
  }, []);

  // Carregar LeadChatWidget com IdleCallback
  useEffect(() => {
    const enableWidget = () => {
      const widgetElement = document.getElementById("lead-chat-widget");
      if (widgetElement) {
        widgetElement.style.display = "block";
      }
    };

    if (typeof window.requestIdleCallback === "function") {
      const idleCallbackId = window.requestIdleCallback(() => enableWidget(), { timeout: 4000 });
      return () => {
        if (window.cancelIdleCallback) {
          window.cancelIdleCallback(idleCallbackId);
        }
      };
    } else {
      const timeoutId = window.setTimeout(() => enableWidget(), 2000);
      return () => clearTimeout(timeoutId);
    }
  }, []);

  return (
    <>
      <SEOHead data={seoData} />
      
      {/* Above-the-fold content */}
      <HeroVendasPreco />
      <ProblemIdentificationPreco />
      <StatsVendas />
      <TransformacoesReaisVendasB />
      <WhatsIncludedSection />
      
      {/* Below-the-fold content com lazy loading */}
      <Suspense fallback={<div className="min-h-screen" />}>
        <BenefitsListPreco />
        <PricingContextSection />
        <DifferentialsVendas />
        <CredentialsVendasPreco />
        <TestimonialsGoogleB />
        <MediaRecognitionVendas />
        <FAQVendasPreco />
        <FinalCTAVendasPreco />
        <Footer />
      </Suspense>
      
      {/* LeadChatWidget carregado sob demanda */}
      <div id="lead-chat-widget" style={{ display: "none" }}>
        <Suspense fallback={null}>
          <LeadChatWidget 
            showFloatingButton={false} 
            origin="balao-intragastrico-preco-a" 
          />
        </Suspense>
      </div>
    </>
  );
};

export default BalaoIntragasticoPreco;
