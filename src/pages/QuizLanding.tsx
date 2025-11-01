import { useEffect, useState } from "react";
import { Suspense, lazy } from "react";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { SEOHead } from "@/components/SEOHead";
import { StructuredData } from "@/components/StructuredData";
import { pageSEO, generateStructuredData } from "@/lib/seo";
import LeadChatWidget from "@/components/LeadChatWidget";
import { QuizLandingHero } from "@/components/quiz/QuizLandingHero";
import { ExitIntentModal } from "@/components/vendas/ExitIntentModal";
import { trackEvent } from "@/lib/analytics";
import { captureUTMLandingParams, hasUTMParams } from "@/lib/utm-landing";

// Lazy load quiz steps
const QuizProgress = lazy(() => import("@/components/quiz/QuizProgress").then(m => ({ default: m.QuizProgress })));
const QuizNavigation = lazy(() => import("@/components/quiz/QuizNavigation").then(m => ({ default: m.QuizNavigation })));
const QuizStep1 = lazy(() => import("@/components/quiz/QuizStep1").then(m => ({ default: m.QuizStep1 })));
const QuizStep2 = lazy(() => import("@/components/quiz/QuizStep2").then(m => ({ default: m.QuizStep2 })));
const QuizStep3 = lazy(() => import("@/components/quiz/QuizStep3").then(m => ({ default: m.QuizStep3 })));
const QuizStep4 = lazy(() => import("@/components/quiz/QuizStep4").then(m => ({ default: m.QuizStep4 })));
const QuizStep5 = lazy(() => import("@/components/quiz/QuizStep5").then(m => ({ default: m.QuizStep5 })));
const QuizStep6 = lazy(() => import("@/components/quiz/QuizStep6").then(m => ({ default: m.QuizStep6 })));
const QuizStep7 = lazy(() => import("@/components/quiz/QuizStep7").then(m => ({ default: m.QuizStep7 })));
const QuizStep8 = lazy(() => import("@/components/quiz/QuizStep8").then(m => ({ default: m.QuizStep8 })));
const GeneratingAnimation = lazy(() => import("@/components/quiz/GeneratingAnimation").then(m => ({ default: m.GeneratingAnimation })));

// Output components
const DeclaracaoTransformacao = lazy(() => import("@/components/output/DeclaracaoTransformacao").then(m => ({ default: m.DeclaracaoTransformacao })));
const PlanoEnergeticoComponent = lazy(() => import("@/components/output/PlanoEnergetico").then(m => ({ default: m.PlanoEnergeticoComponent })));
const PerfilSaudeRadar = lazy(() => import("@/components/output/PerfilSaudeRadar").then(m => ({ default: m.PerfilSaudeRadar })));
const IndiceQLI = lazy(() => import("@/components/output/IndiceQLI").then(m => ({ default: m.IndiceQLI })));
const RoadmapFases = lazy(() => import("@/components/output/RoadmapFases").then(m => ({ default: m.RoadmapFases })));
const MixEstrategias = lazy(() => import("@/components/output/MixEstrategias").then(m => ({ default: m.MixEstrategias })));
const KPIsClinicas = lazy(() => import("@/components/output/KPIsClinicas").then(m => ({ default: m.KPIsClinicas })));
const LifestyleWins = lazy(() => import("@/components/output/LifestyleWins").then(m => ({ default: m.LifestyleWins })));
const CTAsFinais = lazy(() => import("@/components/output/CTAsFinais").then(m => ({ default: m.CTAsFinais })));

import { QuizData, TransformacaoOutput } from "@/types/quiz";
import { generateTransformacaoOutput } from "@/lib/quiz-logic";
import { 
  step1Schema, 
  step2Schema, 
  step3Schema, 
  step4Schema, 
  step5Schema, 
  step6Schema,
  step7Schema,
  step8Schema
} from "@/lib/quiz-validation";
import { ZodError } from "zod";

const QuizLanding = () => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [showOutput, setShowOutput] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [quizData, setQuizData] = useState<QuizData>({
    peso: 0,
    altura: 0,
    imc: 0,
    metaPeso: 15,
    idade: 0,
    sexo: null,
    comorbidades: [],
    tentativasAnteriores: null,
    efeitoSanfona: false,
    gatilhos: [],
    invasividade: null,
    tempoRecuperacao: null,
    tempoDisponivel: null,
    dorPrincipal: null,
    expectativas: [],
    cirurgiaGastricaPrevia: false,
    cirurgiaBariatricaPreviaTipo: 'nenhuma',
    reganhoPosBariatrica: false,
    falhaPreviaClinica: false,
    nivelAtividade: null,
    forcaResistencia: null,
    passosDia: null,
    limitacaoDor: null
  });
  const [outputData, setOutputData] = useState<TransformacaoOutput | null>(null);

  // Capture UTM params on mount
  useEffect(() => {
    captureUTMLandingParams();
    trackEvent("quiz_landing_page_viewed", { 
      has_utm: hasUTMParams(),
      step: currentStep 
    });
  }, []);

  useEffect(() => {
    if (currentStep === 1) {
      trackEvent("quiz_landing_started", { has_utm: hasUTMParams() });
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentStep]);

  const updateQuizData = <K extends keyof QuizData>(field: K, value: QuizData[K]) => {
    const newData: QuizData = { ...quizData, [field]: value };
    if (field === 'peso' || field === 'altura') {
      if (newData.peso > 0 && newData.altura > 0) {
        const alturaM = newData.altura / 100;
        newData.imc = parseFloat((newData.peso / (alturaM * alturaM)).toFixed(1));
      }
    }
    setQuizData(newData);
  };

  const validateCurrentStep = (): boolean => {
    try {
      switch (currentStep) {
        case 1: step1Schema.parse(quizData); return true;
        case 2: step2Schema.parse(quizData); return true;
        case 3: step3Schema.parse(quizData); return true;
        case 4: step4Schema.parse(quizData); return true;
        case 5: step5Schema.parse(quizData); return true;
        case 6: step6Schema.parse(quizData); return true;
        case 7: step7Schema.parse(quizData); return true;
        case 8: step8Schema.parse(quizData); return true;
        default: return false;
      }
    } catch (e) {
      if (e instanceof ZodError) {
        return false;
      }
      return false;
    }
  };

  const canProceed = (): boolean => {
    return validateCurrentStep();
  };

  const handleNext = () => {
    if (canProceed()) {
      trackEvent("quiz_landing_step_completed", { 
        step: currentStep,
        has_utm: hasUTMParams() 
      });
      
      if (currentStep < 8) {
        setCurrentStep(currentStep + 1);
      } else {
        handleSubmit();
      }
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    setIsGenerating(true);
    trackEvent("quiz_landing_submitted", {
      imc: quizData.imc,
      metaPeso: quizData.metaPeso,
      has_utm: hasUTMParams()
    });

    setTimeout(() => {
      generateOutput();
    }, 3000);
  };

  const resetQuiz = () => {
    setShowOutput(false);
    setCurrentStep(1);
    setOutputData(null);
    setQuizData({
      peso: 0,
      altura: 0,
      imc: 0,
      metaPeso: 15,
      idade: 0,
      sexo: null,
      comorbidades: [],
      tentativasAnteriores: null,
      efeitoSanfona: false,
      gatilhos: [],
      invasividade: null,
      tempoRecuperacao: null,
      tempoDisponivel: null,
      dorPrincipal: null,
      expectativas: [],
      cirurgiaGastricaPrevia: false,
      cirurgiaBariatricaPreviaTipo: 'nenhuma',
      reganhoPosBariatrica: false,
      falhaPreviaClinica: false,
      nivelAtividade: null,
      forcaResistencia: null,
      passosDia: null,
      limitacaoDor: null
    });
    trackEvent("quiz_landing_reset", { has_utm: hasUTMParams() });
  };

  const generateOutput = () => {
    const output = generateTransformacaoOutput(quizData);
    setOutputData(output);
    setIsGenerating(false);
    setShowOutput(true);
    trackEvent("quiz_landing_output_generated", { 
      notaGlobal: output.perfilSaude.notaGlobal,
      has_utm: hasUTMParams() 
    });
  };

  const quizSchema = {
    "@context": "https://schema.org",
    "@type": "Quiz",
    "name": "Plano Personalizado de Emagrecimento",
    "description": "Em poucos cliques, descubra seu plano personalizado de transformação",
    "provider": {
      "@type": "Physician",
      "name": "Dra. Bruna Durelli",
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1: 
        return (
          <QuizStep1
            peso={quizData.peso}
            altura={quizData.altura}
            metaPeso={quizData.metaPeso}
            imc={quizData.imc}
            idade={quizData.idade}
            sexo={quizData.sexo}
            onChange={updateQuizData}
          />
        );
      case 2: 
        return (
          <QuizStep2
            comorbidades={quizData.comorbidades}
            onChange={(val) => updateQuizData('comorbidades', val)}
          />
        );
      case 3: 
        return (
          <QuizStep3
            tentativasAnteriores={quizData.tentativasAnteriores}
            efeitoSanfona={quizData.efeitoSanfona}
            gatilhos={quizData.gatilhos}
            onChange={(field: string, value: number | boolean | string[]) => {
              if (field === 'tentativasAnteriores') {
                updateQuizData('tentativasAnteriores', value as number);
              } else if (field === 'efeitoSanfona') {
                updateQuizData('efeitoSanfona', value as boolean);
              } else if (field === 'gatilhos') {
                updateQuizData('gatilhos', value as QuizData['gatilhos']);
              }
            }}
          />
        );
      case 4: 
        return (
          <QuizStep4
            invasividade={quizData.invasividade}
            tempoRecuperacao={quizData.tempoRecuperacao}
            tempoDisponivel={quizData.tempoDisponivel}
            onChange={(field: string, value: string) => {
              if (field === 'invasividade') {
                updateQuizData('invasividade', value as QuizData['invasividade']);
              } else if (field === 'tempoRecuperacao') {
                updateQuizData('tempoRecuperacao', value as QuizData['tempoRecuperacao']);
              } else if (field === 'tempoDisponivel') {
                updateQuizData('tempoDisponivel', value as QuizData['tempoDisponivel']);
              }
            }}
          />
        );
      case 5: 
        return (
          <QuizStep5
            dorPrincipal={quizData.dorPrincipal}
            onChange={(value) => updateQuizData('dorPrincipal', value as QuizData['dorPrincipal'])}
          />
        );
      case 6: 
        return (
          <QuizStep6
            expectativas={quizData.expectativas}
            onChange={(value) => updateQuizData('expectativas', value)}
          />
        );
      case 7: 
        return (
          <QuizStep7
            cirurgiaGastricaPrevia={quizData.cirurgiaGastricaPrevia}
            cirurgiaBariatricaPreviaTipo={quizData.cirurgiaBariatricaPreviaTipo}
            reganhoPosBariatrica={quizData.reganhoPosBariatrica}
            falhaPreviaClinica={quizData.falhaPreviaClinica}
            onChange={updateQuizData}
          />
        );
      case 8: 
        return (
          <QuizStep8
            nivelAtividade={quizData.nivelAtividade}
            forcaResistencia={quizData.forcaResistencia}
            passosDia={quizData.passosDia}
            limitacaoDor={quizData.limitacaoDor}
            onChange={updateQuizData}
          />
        );
      default: 
        return null;
    }
  };

  if (showOutput && outputData) {
    const { perfilSaude, planoEnergetico, qli, roadmap, mixEstrategias, kpis, lifestyleWins } = outputData;
    
    return (
      <>
        <SEOHead data={pageSEO.quizLanding} />
        <StructuredData data={[generateStructuredData.organization, generateStructuredData.physician]} />
        <div className="min-h-screen bg-background">
          <Navigation />
          <main className="pt-20">
            <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="animate-spin rounded-full h-10 w-10 border-2 border-primary border-t-transparent" /></div>}>
              <DeclaracaoTransformacao
                headline={outputData.headline}
                alertaClinico={outputData.alertaClinico}
              />
              <PlanoEnergeticoComponent planoEnergetico={planoEnergetico} />
              <PerfilSaudeRadar
                perfilSaude={perfilSaude}
                quizData={quizData}
              />
              <IndiceQLI qli={qli} />
              <RoadmapFases roadmap={roadmap} />
              <MixEstrategias mixEstrategias={mixEstrategias} />
              <KPIsClinicas kpis={kpis} />
              <LifestyleWins lifestyleWins={lifestyleWins} />
              <CTAsFinais
                onResetQuiz={resetQuiz}
                notaGlobal={perfilSaude.notaGlobal}
                conceito={perfilSaude.conceito}
                tratamentoRecomendado={mixEstrategias.intervencao?.nome || "Protocolo Clínico"}
                metaKg={planoEnergetico.metaKg}
                semanasPlano={planoEnergetico.semanasPlano}
              />
            </Suspense>
          </main>
          <Footer />
          <LeadChatWidget />
        </div>
      </>
    );
  }

  return (
    <>
      <SEOHead data={pageSEO.quizLanding} />
      <StructuredData data={quizSchema} />
      <div className="min-h-screen bg-background">
        <Navigation />
        
        {isGenerating ? (
          <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="animate-spin rounded-full h-10 w-10 border-2 border-primary border-t-transparent" /></div>}>
            <GeneratingAnimation />
          </Suspense>
        ) : (
          <main className="pt-20 pb-16">
            {currentStep === 1 && <QuizLandingHero />}
            
            <div className="container mx-auto px-4 max-w-3xl">
              <Suspense fallback={<div className="flex items-center justify-center py-12"><div className="animate-spin rounded-full h-8 w-8 border-2 border-primary border-t-transparent" /></div>}>
                <QuizProgress currentStep={currentStep} totalSteps={8} />
                <div className="mb-8">{renderStep()}</div>
                <QuizNavigation
                  currentStep={currentStep}
                  totalSteps={8}
                  onNext={handleNext}
                  onBack={handleBack}
                  onSubmit={handleSubmit}
                  canProceed={canProceed()}
                />
              </Suspense>
            </div>
          </main>
        )}
        
        <Footer />
        <LeadChatWidget />
        <ExitIntentModal />
      </div>
    </>
  );
};

export default QuizLanding;
