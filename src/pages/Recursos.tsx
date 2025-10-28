�import { lazy, Suspense } from "react";
import { Navigation } from "@/components/Navigation";
import { SubpageHero } from "@/components/SubpageHero";
import { SEOHead } from "@/components/SEOHead";
import { CONTACT } from "@/lib/constants";
import { GrafismoDecor } from "@/components/GrafismoDecor";
import { Calculator, BookOpen, HelpCircle, Sparkles } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import heroImage from "@/assets/transformation-empowerment.avif";

const FAQ = lazy(() => import("@/components/FAQ").then(m => ({ default: m.FAQ })));
const InvestimentoPagamento = lazy(() => import("@/components/InvestimentoPagamento").then(m => ({ default: m.InvestimentoPagamento })));
const CTASection = lazy(() => import("@/components/CTASection").then(m => ({ default: m.CTASection })));
const Footer = lazy(() => import("@/components/Footer").then(m => ({ default: m.Footer })));
const WhatsAppButton = lazy(() => import("@/components/WhatsAppButton").then(m => ({ default: m.WhatsAppButton })));

const Recursos = () => {
  const navigate = useNavigate();
  
  const handleCTA = () => {
    window.open(CONTACT.WHATSAPP_URL, '_blank');
  };

  const scrollToCalculadora = () => {
    const element = document.querySelector("#calculadoras");
    if (element) {
      const rootStyles = getComputedStyle(document.documentElement);
      const headerVar = rootStyles.getPropertyValue('--header-height').trim();
      const headerOffset = (parseInt(headerVar.replace('px','')) || 80) + 8;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
    }
  };

  return (
    <>
      <SEOHead data={{
        title: "Recursos Educativos - FAQ, Calculadoras, Guias | Dra. Bruna Durelli",
        description: "Acesse nossos recursos educativos: FAQ completo, calculadoras de IMC e ROI, guias de emagrecimento, vídeos e artigos sobre tratamento de obesidade.",
        keywords: "faq obesidade, calculadora imc, guia emagrecimento, recursos educativos, dra bruna durelli",
        canonical: "https://www.brunadurelli.com.br/recursos"
      }} />
      
      <div className="min-h-screen">
        <Navigation />
        <main>
          <SubpageHero
            title="Recursos Educativos"
            subtitle="Ferramentas e Conteúdos"
            description="Acesse calculadoras, FAQ completo e materiais educativos para apoiar sua jornada de transformação. Conhecimento é poder."
            image={heroImage}
            ctaText="Tirar Dúvidas"
            onCtaClick={handleCTA}
          />
          
          {/* Cards de Recursos */}
          <section className="py-16 xl:py-20 bg-background relative overflow-hidden">
            <GrafismoDecor variant="background" position="top-right" size="lg" opacity={0.1} rotate={-20} color="gray" />
            <div className="container mx-auto px-4 relative z-10">
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto mb-16">
                <Card 
                  className="cursor-pointer hover:shadow-hover transition-all border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-background" 
                  onClick={() => navigate('/quiz')}
                >
                  <CardHeader>
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center mb-4">
                      <Sparkles className="w-7 h-7 text-white" />
                    </div>
                    <CardTitle className="flex items-center gap-2">
                      Descubra Seu Caminho
                      <span className="text-xs bg-primary text-white px-2 py-0.5 rounded-full font-normal">Novo</span>
                    </CardTitle>
                    <CardDescription>
                      Quiz personalizado gratuito para descobrir o tratamento ideal. 6 perguntas, resultados imediatos
                    </CardDescription>
                  </CardHeader>
                </Card>

                <Card className="cursor-pointer hover:shadow-hover transition-all" onClick={scrollToCalculadora}>
                  <CardHeader>
                    <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                      <Calculator className="w-7 h-7 text-primary" />
                    </div>
                    <CardTitle>Calculadoras</CardTitle>
                    <CardDescription>
                      Ferramentas interativas para calcular ROI do tratamento e entender o valor do investimento
                    </CardDescription>
                  </CardHeader>
                </Card>

                <Card className="cursor-pointer hover:shadow-hover transition-all" onClick={() => {
                  const element = document.querySelector("#faq");
                  if (element) {
                    const rootStyles = getComputedStyle(document.documentElement);
                    const headerVar = rootStyles.getPropertyValue('--header-height').trim();
                    const headerOffset = (parseInt(headerVar.replace('px','')) || 80) + 8;
                    const elementPosition = element.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                    window.scrollTo({ top: offsetPosition, behavior: "smooth" });
                  }
                }}>
                  <CardHeader>
                    <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                      <HelpCircle className="w-7 h-7 text-primary" />
                    </div>
                    <CardTitle>FAQ Completo</CardTitle>
                    <CardDescription>
                      Respostas detalhadas para as principais dúvidas sobre tratamentos e o Programa LevSer
                    </CardDescription>
                  </CardHeader>
                </Card>

                <Card className="cursor-pointer hover:shadow-hover transition-all" onClick={handleCTA}>
                  <CardHeader>
                    <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                      <BookOpen className="w-7 h-7 text-primary" />
                    </div>
                    <CardTitle>Materiais Educativos</CardTitle>
                    <CardDescription>
                      Entre em contato para receber guias, artigos e materiais personalizados
                    </CardDescription>
                  </CardHeader>
                </Card>
              </div>
            </div>
          </section>

          {/* Calculadora ROI */}
          <section id="calculadoras" className="py-16 xl:py-20 bg-muted/30">
            <div className="container mx-auto px-4">
              <div className="text-center max-w-3xl mx-auto mb-12">
                <h2 className="text-3xl xl:text-4xl font-serif font-bold mb-4">
                  Calculadora de Retorno sobre Investimento
                </h2>
                <p className="text-muted-foreground">
                  Entenda o valor real do investimento no seu tratamento comparando com gastos evitáveis
                </p>
              </div>
              
              <Suspense fallback={<div className="min-h-[20vh]" />}>
                <InvestimentoPagamento />
              </Suspense>
            </div>
          </section>

          {/* FAQ Completo */}
          <Suspense fallback={<div className="min-h-[20vh]" />}>
            <FAQ />
          </Suspense>
          
          <Suspense fallback={<div className="min-h-[10vh]" />}>
            <CTASection
              title="Ainda Tem Dúvidas?"
              description="Entre em contato e tire todas as suas dúvidas sobre tratamentos, consultas e o Programa LevSer."
              buttonText="Tirar Dúvidas pelo WhatsApp"
              onButtonClick={handleCTA}
            />
          </Suspense>
          
          <Suspense fallback={<div className="min-h-[10vh]" />}>
            <Footer />
          </Suspense>
        </main>
        <Suspense fallback={null}>
          <WhatsAppButton />
        </Suspense>
      </div>
    </>
  );
};

export default Recursos;

