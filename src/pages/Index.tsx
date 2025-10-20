import { lazy, Suspense } from "react";
import { Navigation } from "@/components/Navigation";
import { Hero } from "@/components/Hero";
import { SobreDraBrunaResumo } from "@/components/SobreDraBrunaResumo";
import { ProgramaLevSer } from "@/components/ProgramaLevSer";
import { InvestimentoPagamento } from "@/components/InvestimentoPagamento";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { MobileCTA } from "@/components/MobileCTA";
import { SEOHead } from "@/components/SEOHead";
import { StructuredData } from "@/components/StructuredData";
import { FAQResumo } from "@/components/FAQResumo";
import { TratamentosGrid } from "@/components/TratamentosGrid";
import { Button } from "@/components/ui/button";
import { ArrowRight, Activity, Syringe, Zap } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { defaultSEO, generateStructuredData } from "@/lib/seo";

const ReconhecimentoMidia = lazy(() => import("@/components/ReconhecimentoMidia").then(m => ({ default: m.ReconhecimentoMidia })));
const Depoimentos = lazy(() => import("@/components/Depoimentos").then(m => ({ default: m.Depoimentos })));
const CTAFinal = lazy(() => import("@/components/CTAFinal").then(m => ({ default: m.CTAFinal })));
const Footer = lazy(() => import("@/components/Footer").then(m => ({ default: m.Footer })));

const Index = () => {
  const navigate = useNavigate();
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
          <SobreDraBrunaResumo />
          <ProgramaLevSer />
          
          {/* Seção Tratamentos */}
          <section id="tratamentos" className="py-16 xl:py-20 bg-muted/30">
            <div className="container mx-auto px-4">
              <h2 className="text-4xl lg:text-5xl font-serif font-bold text-center mb-4">Tratamentos Disponíveis</h2>
              <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">Abordagem completa com terapias endoscópicas, farmacológicas e medicina regenerativa</p>
              <div className="grid md:grid-cols-3 gap-8 mb-8">
                <Card className="cursor-pointer hover:shadow-hover transition-all" onClick={() => navigate("/tratamentos#endoscopicos")}>
                  <CardHeader><Activity className="w-12 h-12 text-primary mb-4" /><CardTitle>Terapias Endoscópicas</CardTitle></CardHeader>
                  <CardContent><p className="text-sm text-muted-foreground mb-4">Balão, Gastroplastia, Plasma de Argônio</p><Button variant="ghost" size="sm" className="p-0 h-auto">Ver procedimentos <ArrowRight className="ml-2 h-4 w-4" /></Button></CardContent>
                </Card>
                <Card className="cursor-pointer hover:shadow-hover transition-all" onClick={() => navigate("/tratamentos#farmacologicos")}>
                  <CardHeader><Syringe className="w-12 h-12 text-primary mb-4" /><CardTitle>Terapias Farmacológicas</CardTitle></CardHeader>
                  <CardContent><p className="text-sm text-muted-foreground mb-4">Canetas Emagrecedoras</p><Button variant="ghost" size="sm" className="p-0 h-auto">Saiba mais <ArrowRight className="ml-2 h-4 w-4" /></Button></CardContent>
                </Card>
                <Card className="cursor-pointer hover:shadow-hover transition-all" onClick={() => navigate("/tratamentos#regenerativos")}>
                  <CardHeader><Zap className="w-12 h-12 text-primary mb-4" /><CardTitle>Medicina Regenerativa</CardTitle></CardHeader>
                  <CardContent><p className="text-sm text-muted-foreground mb-4">Nutrição Celular, Otimização Metabólica</p><Button variant="ghost" size="sm" className="p-0 h-auto">Explore <ArrowRight className="ml-2 h-4 w-4" /></Button></CardContent>
                </Card>
              </div>
            </div>
          </section>

          <Suspense fallback={<div className="min-h-[20vh] flex items-center justify-center"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div></div>}>
            <Depoimentos />
            <ReconhecimentoMidia />
          </Suspense>
          
          <InvestimentoPagamento />
          
          <section id="faq" className="py-16 bg-card"><div className="container mx-auto px-4"><h2 className="text-4xl font-serif font-bold text-center mb-8">Perguntas Frequentes</h2><FAQResumo /><div className="text-center mt-8"><Button variant="outline" onClick={() => navigate("/recursos#faq")}>Ver todas as perguntas <ArrowRight className="ml-2 h-4 w-4" /></Button></div></div></section>
          
          <Suspense fallback={<div className="min-h-[20vh]"></div>}><CTAFinal /><Footer /></Suspense>
        </main>
        <WhatsAppButton />
        <MobileCTA />
      </div>
    </>
  );
};

export default Index;
