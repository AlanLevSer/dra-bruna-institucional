import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { MobileCTA } from "@/components/MobileCTA";
import { SubpageHero } from "@/components/SubpageHero";
import { TreatmentSection } from "@/components/TreatmentSection";
import { IndicationList } from "@/components/IndicationList";
import { BenefitsList } from "@/components/BenefitsList";
import { CTASection } from "@/components/CTASection";
import { SEOHead } from "@/components/SEOHead";
import { StructuredData } from "@/components/StructuredData";
import { CasosDeUso, casosDeUsoRegenerativa } from "@/components/CasosDeUso";
import { ComparadorRegenerativa } from "@/components/ComparadorRegenerativa";
import { pageSEO } from "@/lib/seo";
import patientConfident from "@/assets/patient-confident.jpg";
import transformationHealth from "@/assets/transformation-health.jpg";
import { Battery, Shield, Zap, Sparkles } from "lucide-react";

const MedicinaRegenerativa = () => {
  const handleWhatsApp = () => {
    window.open("https://wa.me/5561999999999?text=Olá! Gostaria de saber mais sobre Medicina Regenerativa", "_blank");
  };

  const indicacoes = [
    "Pessoas em emagrecimento que querem preservar massa magra e energia",
    "Quem sente fadiga crônica ou 'metabolismo travado'",
    "Mulheres em menopausa/climatério com resistência metabólica",
    "Pós-bariátrica com deficiências nutricionais",
    "Atletas que querem recomposição corporal sem perder performance",
    "Histórico de dietas restritivas com efeito rebote",
    "Dificuldade de manter resultados a longo prazo",
    "Quem busca otimização de saúde além da balança"
  ];

  const beneficios = [
    "Mais disposição e foco mental sustentado",
    "Redução de inflamação e resistência metabólica",
    "Preservação de massa magra durante perda de peso",
    "Melhora de sono, humor e controle de apetite",
    "Pele, cabelo e elasticidade preservados",
    "Resultados sustentáveis com menos efeito rebote",
    "Recuperação tecidual e energia celular otimizada",
    "Autonomia metabólica no longo prazo"
  ];

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "MedicalTherapy",
    "name": "Medicina Regenerativa Metabólica",
    "description": "Abordagem avançada para otimização metabólica, energia celular e saúde integral além da perda de peso",
    "availableService": {
      "@type": "MedicalProcedure",
      "name": "Protocolos Regenerativos Metabólicos"
    },
    "provider": {
      "@type": "Physician",
      "name": "Dra. Bruna Durelli"
    }
  };

  return (
    <>
      <SEOHead data={pageSEO.medicinaRegenerativa} />
      <StructuredData data={serviceSchema} />
      
      <div className="min-h-screen">
        <Navigation />
        <main>
          <SubpageHero
            title="Medicina Regenerativa"
            subtitle="O Futuro da Saúde Metabólica"
            description="Transforme não apenas seu peso, mas a qualidade de cada célula do seu corpo. Mais energia, menos inflamação, resultados que você sente — e que ficam."
            image={patientConfident}
            ctaText="Descobrir meu protocolo regenerativo"
            onCtaClick={handleWhatsApp}
          />

          <TreatmentSection title="O que é Medicina Regenerativa?" variant="muted">
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              <div>
                <p className="mb-4">
                  Medicina Regenerativa é uma abordagem avançada que vai além do "comer menos e se mover mais". 
                  Aqui, tratamos o metabolismo de forma sistêmica, focando na qualidade celular e energia real.
                </p>
                <p className="mb-4">
                  Não é "biohacking" nem promessa milagrosa. É <strong>medicina baseada em evidências</strong>, 
                  individualizada por exames laboratoriais completos e acompanhada pela equipe médica em cada etapa.
                </p>
                <p>
                  O objetivo é restaurar a capacidade natural do seu corpo de regular peso, energia e saúde 
                  — não criar dependência eterna de intervenções externas.
                </p>
              </div>
              <div>
                <img 
                  src={transformationHealth} 
                  alt="Medicina Regenerativa - Saúde Celular" 
                  className="rounded-2xl shadow-elegant w-full h-auto object-cover"
                />
              </div>
            </div>
          </TreatmentSection>

          <TreatmentSection title="Como funciona no organismo?">
            <p className="mb-8 text-lg">
              Nossa abordagem regenerativa atua em 4 pilares fundamentais para transformação profunda e sustentável:
            </p>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-card rounded-xl p-6 border border-border/50 hover:shadow-elegant transition-shadow">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Battery className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-serif font-bold text-foreground mb-3">1. Energia Celular</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Repleção estratégica de nutrientes (IVs metabólicos, suplementação de precisão)</li>
                  <li>• Otimização da função mitocondrial (suas "usinas de energia")</li>
                  <li>• Disposição sustentada sem estímulos artificiais</li>
                </ul>
              </div>

              <div className="bg-card rounded-xl p-6 border border-border/50 hover:shadow-elegant transition-shadow">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Shield className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-serif font-bold text-foreground mb-3">2. Controle Inflamatório</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Modulação do estresse oxidativo</li>
                  <li>• Redução de marcadores inflamatórios que "travam" o peso</li>
                  <li>• Melhora da resposta insulínica e sensibilidade metabólica</li>
                </ul>
              </div>

              <div className="bg-card rounded-xl p-6 border border-border/50 hover:shadow-elegant transition-shadow">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Zap className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-serif font-bold text-foreground mb-3">3. Preservação Muscular</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Protocolos para manter massa magra durante perda de gordura</li>
                  <li>• Recuperação tecidual (pele, cabelo, elasticidade)</li>
                  <li>• Suporte de composição corporal, não apenas peso</li>
                </ul>
              </div>

              <div className="bg-card rounded-xl p-6 border border-border/50 hover:shadow-elegant transition-shadow">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Sparkles className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-serif font-bold text-foreground mb-3">4. Equilíbrio Hormonal</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Otimização de insulina, cortisol, função tireoidiana</li>
                  <li>• Melhora de sono, humor e controle de saciedade</li>
                  <li>• Redução de compulsões e ansiedade alimentar</li>
                </ul>
              </div>
            </div>

            <div className="mt-8 bg-accent/10 border-l-4 border-accent rounded-lg p-6">
              <p className="text-sm text-muted-foreground">
                <strong className="text-foreground">Resultados percebidos pelos pacientes:</strong> mais disposição 
                no dia a dia, recuperação mais rápida pós-exercício, menos compulsão alimentar, rotina mais estável, 
                pele e cabelo com melhor aspecto, sono de qualidade.
              </p>
            </div>
          </TreatmentSection>

          <CasosDeUso casos={casosDeUsoRegenerativa} />

          <IndicationList title="Para quem é indicada a Medicina Regenerativa?" items={indicacoes} />

          <ComparadorRegenerativa />

          <TreatmentSection title="O que pode incluir nos protocolos?" variant="muted">
            <p className="mb-6">
              Cada protocolo é <strong>individualizado conforme avaliação clínica e exames laboratoriais</strong>. 
              Não há "pacote pronto" — montamos estratégias personalizadas para seus objetivos e necessidades.
            </p>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-serif font-bold text-foreground mb-3">Protocolos Nutricionais</h3>
                <ul className="space-y-2 text-muted-foreground list-disc list-inside">
                  <li>IVs metabólicos (energia, foco, imunidade)</li>
                  <li>Repleção de vitaminas, minerais e antioxidantes</li>
                  <li>Suplementação de precisão guiada por exames</li>
                  <li>Moduladores de saciedade e metabolismo</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-serif font-bold text-foreground mb-3">Suporte Metabólico</h3>
                <ul className="space-y-2 text-muted-foreground list-disc list-inside">
                  <li>Otimização de sono, humor e estresse</li>
                  <li>Controle de apetite e compulsões</li>
                  <li>Protocolos de preservação muscular</li>
                  <li>Estratégias de recuperação e performance</li>
                </ul>
              </div>
            </div>

            <div className="mt-8 bg-primary/5 border-l-4 border-primary rounded-lg p-6">
              <p className="text-sm text-muted-foreground">
                <strong className="text-foreground">Nota clínica:</strong> Todos os protocolos são baseados 
                em evidências científicas, personalizados por exames e acompanhados continuamente pela equipe médica. 
                Segurança e resultados sustentáveis são prioridades absolutas.
              </p>
            </div>
          </TreatmentSection>

          <BenefitsList 
            title="Benefícios Esperados da Abordagem Regenerativa" 
            benefits={beneficios} 
          />

          <TreatmentSection title="Integração com o Programa LevSer">
            <p className="mb-4">
              A Medicina Regenerativa não é um "tratamento isolado" — ela se integra naturalmente 
              às <strong>4 Fases da Jornada LevSer</strong>:
            </p>
            
            <div className="space-y-4">
              <div className="bg-card rounded-lg p-5 border border-border/50">
                <h3 className="font-serif font-bold text-foreground mb-2">Fase 2 — Reset & Ritmo</h3>
                <p className="text-sm text-muted-foreground">
                  Introduzimos protocolos regenerativos para reduzir inflamação, otimizar saciedade e 
                  estabilizar energia durante o reset inicial.
                </p>
              </div>

              <div className="bg-card rounded-lg p-5 border border-border/50">
                <h3 className="font-serif font-bold text-foreground mb-2">Fase 3 — Consolidação & Autonomia</h3>
                <p className="text-sm text-muted-foreground">
                  Ajustes regenerativos para preservar massa magra, melhorar sono/humor e qualidade de pele 
                  durante a recomposição corporal.
                </p>
              </div>

              <div className="bg-card rounded-lg p-5 border border-border/50">
                <h3 className="font-serif font-bold text-foreground mb-2">Fase 4 — Manutenção & Estilo de Vida</h3>
                <p className="text-sm text-muted-foreground">
                  Ciclos leves de protocolos regenerativos (trimestrais/semestrais) para manter disposição, 
                  estabilidade de peso e marcadores otimizados.
                </p>
              </div>
            </div>

            <p className="mt-6 text-sm text-muted-foreground">
              Saiba mais sobre o{" "}
              <a href="/#programa-levser" className="text-primary hover:underline font-medium">
                Programa LevSer completo
              </a>
              {" "}e como ele integra todas as terapias.
            </p>
          </TreatmentSection>

          <CTASection
            title="Pronto para descobrir seu protocolo regenerativo?"
            description="Agende uma avaliação personalizada e descubra como a Medicina Regenerativa pode transformar sua saúde além da balança."
            buttonText="Agendar Avaliação"
            onButtonClick={handleWhatsApp}
          />
        </main>
        <Footer />
        <WhatsAppButton />
        <MobileCTA />
      </div>
    </>
  );
};

export default MedicinaRegenerativa;
