import { Navigation } from "@/components/Navigation";
import { Hero } from "@/components/Hero";
import { ProgramaLevSer } from "@/components/ProgramaLevSer";
import { JornadaTransformacao } from "@/components/JornadaTransformacao";
import { Procedimentos } from "@/components/Procedimentos";
import { Nutricao } from "@/components/Nutricao";
import { Diferenciais } from "@/components/Diferenciais";
import { Depoimentos } from "@/components/Depoimentos";
import { FAQ } from "@/components/FAQ";
import { CTAFinal } from "@/components/CTAFinal";
import { Footer } from "@/components/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { MobileCTA } from "@/components/MobileCTA";
import { SEOHead } from "@/components/SEOHead";
import { StructuredData } from "@/components/StructuredData";
import { defaultSEO, generateStructuredData } from "@/lib/seo";

const Index = () => {
  return (
    <>
      <SEOHead data={defaultSEO} />
      <StructuredData data={[
        generateStructuredData.organization,
        generateStructuredData.physician,
        generateStructuredData.localBusiness
      ]} />
      
      <div className="min-h-screen">
        <Navigation />
        <main>
          <Hero />
          <ProgramaLevSer />
          <JornadaTransformacao />
          <Procedimentos />
          <Nutricao />
          <Diferenciais />
          <Depoimentos />
          <FAQ />
          <CTAFinal />
        </main>
        <Footer />
        <WhatsAppButton />
        <MobileCTA />
      </div>
    </>
  );
};

export default Index;
