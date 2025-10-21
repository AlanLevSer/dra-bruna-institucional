import { useState, useEffect } from "react";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { SEOHead } from "@/components/SEOHead";
import { StructuredData } from "@/components/StructuredData";
import { QuizData } from "@/types/quiz";
import { generateTransformacaoOutput } from "@/lib/quiz-logic";
import { 
  step1Schema, 
  step2Schema, 
  step3Schema, 
  step4Schema, 
  step5Schema, 
  step6Schema,
  step7Schema
} from "@/lib/quiz-validation";
import { toast } from "@/hooks/use-toast";
import { QuizProgress } from "@/components/quiz/QuizProgress";
import { QuizNavigation } from "@/components/quiz/QuizNavigation";
import { QuizStep1 } from "@/components/quiz/QuizStep1";
import { QuizStep2 } from "@/components/quiz/QuizStep2";
import { QuizStep3 } from "@/components/quiz/QuizStep3";
import { QuizStep4 } from "@/components/quiz/QuizStep4";
import { QuizStep5 } from "@/components/quiz/QuizStep5";
import { QuizStep6 } from "@/components/quiz/QuizStep6";
import { QuizStep7 } from "@/components/quiz/QuizStep7";
import { GeneratingAnimation } from "@/components/quiz/GeneratingAnimation";
import { DeclaracaoTransformacao } from "@/components/output/DeclaracaoTransformacao";
import { PerfilSaudeRadar } from "@/components/output/PerfilSaudeRadar";
import { IndiceQLI } from "@/components/output/IndiceQLI";
import { RoadmapFases } from "@/components/output/RoadmapFases";
import { MixEstrategias } from "@/components/output/MixEstrategias";
import { KPIsClinicas } from "@/components/output/KPIsClinicas";
import { LifestyleWins } from "@/components/output/LifestyleWins";
import { CTAsFinais } from "@/components/output/CTAsFinais";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { trackEvent } from "@/lib/analytics";

const Quiz = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [showOutput, setShowOutput] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [quizData, setQuizData] = useState<QuizData>({
    peso: 0,
    altura: 0,
    imc: 0,
    metaPeso: 15,
    comorbidades: [],
    tentativasAnteriores: 0,
    efeitoSanfona: false,
    gatilhos: [],
    invasividade: 'moderada',
    tempoRecuperacao: 'moderado',
    tempoDisponivel: '3-5h/sem',
    dorPrincipal: 'energia',
    expectativas: [],
    cirurgiaGastricaPrevia: false,
    cirurgiaBariatricaPreviaTipo: 'nenhuma',
    reganhoPosBariatrica: false,
    falhaPreviaClinica: false
  });

  useEffect(() => {
    // Track quiz start
    trackEvent('quiz_started', {
      page: '/quiz',
      timestamp: new Date().toISOString()
    });
  }, []);

  const updateQuizData = (field: string, value: any) => {
    const newData = { ...quizData, [field]: value };
    if (field === 'peso' || field === 'altura') {
      if (newData.peso > 0 && newData.altura > 0) {
        const alturaM = newData.altura / 100;
        newData.imc = parseFloat((newData.peso / (alturaM * alturaM)).toFixed(1));
      }
    }
    setQuizData(newData);
  };

  useEffect(() => {
    // Scroll para o topo da página quando step mudar (exceto no step 1 inicial)
    if (currentStep > 1) {
      window.scrollTo({ 
        top: 0, 
        behavior: 'smooth' 
      });
    }
  }, [currentStep]);

  const validateCurrentStep = () => {
    try {
      switch (currentStep) {
        case 1:
          step1Schema.parse({ peso: quizData.peso, altura: quizData.altura, metaPeso: quizData.metaPeso });
          return true;
        case 2:
          step2Schema.parse({ comorbidades: quizData.comorbidades });
          return true;
        case 3:
          step3Schema.parse({ 
            tentativasAnteriores: quizData.tentativasAnteriores, 
            efeitoSanfona: quizData.efeitoSanfona, 
            gatilhos: quizData.gatilhos 
          });
          return true;
        case 4:
          step4Schema.parse({ 
            invasividade: quizData.invasividade, 
            tempoRecuperacao: quizData.tempoRecuperacao, 
            tempoDisponivel: quizData.tempoDisponivel 
          });
          return true;
        case 5:
          step5Schema.parse({ dorPrincipal: quizData.dorPrincipal });
          return true;
        case 6:
          step6Schema.parse({ expectativas: quizData.expectativas });
          return true;
        case 7:
          step7Schema.parse({ 
            cirurgiaGastricaPrevia: quizData.cirurgiaGastricaPrevia,
            cirurgiaBariatricaPreviaTipo: quizData.cirurgiaBariatricaPreviaTipo,
            reganhoPosBariatrica: quizData.reganhoPosBariatrica,
            falhaPreviaClinica: quizData.falhaPreviaClinica
          });
          return true;
        default:
          return false;
      }
    } catch (error: any) {
      const errorMessage = error.errors?.[0]?.message || "Dados inválidos";
      toast({
        title: "Validação de dados",
        description: errorMessage,
        variant: "destructive"
      });
      return false;
    }
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1: return quizData.peso > 0 && quizData.altura > 0;
      case 2: return quizData.comorbidades.length > 0;
      case 3: return true;
      case 4: return true;
      case 5: return true;
      case 6: return quizData.expectativas.length > 0;
      case 7: return true;
      default: return false;
    }
  };

  const handleNext = () => {
    if (validateCurrentStep()) {
      trackEvent('quiz_step_completed', {
        step: currentStep,
        totalSteps: 7
      });
      setCurrentStep(Math.min(7, currentStep + 1));
    }
  };

  const handleSubmit = async () => {
    if (!validateCurrentStep()) return;
    
    trackEvent('quiz_submitted', {
      imc: quizData.imc,
      metaPeso: quizData.metaPeso
    });
    
    setIsGenerating(true);
    
    // Simular processamento para dar sensação de personalização
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setShowOutput(true);
    setIsGenerating(false);
    
    trackEvent('quiz_result_generated', {
      imc: quizData.imc
    });
  };

  const resetQuiz = () => {
    setCurrentStep(1);
    setShowOutput(false);
    setIsGenerating(false);
    setQuizData({
      peso: 0,
      altura: 0,
      imc: 0,
      metaPeso: 15,
      comorbidades: [],
      tentativasAnteriores: 0,
      efeitoSanfona: false,
      gatilhos: [],
      invasividade: 'moderada',
      tempoRecuperacao: 'moderado',
      tempoDisponivel: '3-5h/sem',
      dorPrincipal: 'energia',
      expectativas: [],
      cirurgiaGastricaPrevia: false,
      cirurgiaBariatricaPreviaTipo: 'nenhuma',
      reganhoPosBariatrica: false,
      falhaPreviaClinica: false
    });
    
    trackEvent('quiz_reset');
  };

  const output = showOutput ? generateTransformacaoOutput(quizData) : null;

  const quizSchema = {
    "@context": "https://schema.org",
    "@type": "Quiz",
    "name": "Descubra Seu Caminho - Quiz Personalizado",
    "description": "Quiz interativo gratuito para descobrir o plano de tratamento ideal personalizado para sua jornada de emagrecimento e saúde",
    "provider": {
      "@type": "Physician",
      "name": "Dra. Bruna Durelli",
      "jobTitle": "Gastroenterologista e Endoscopista",
      "url": "https://drabrunadurelli.com"
    },
    "about": {
      "@type": "MedicalCondition",
      "name": "Obesidade e Emagrecimento"
    }
  };

  return (
    <>
      <SEOHead data={{
        title: "Descubra Seu Caminho - Quiz Personalizado Gratuito | Dra. Bruna Durelli",
        description: "Responda nosso quiz gratuito de 6 perguntas e descubra o plano de tratamento ideal personalizado para sua jornada. Sem compromisso, 100% online.",
        keywords: "quiz emagrecimento gratuito, teste obesidade online, plano personalizado, diagnóstico obesidade, avaliação gratuita",
        canonical: "https://drabrunadurelli.com/quiz",
        ogImage: "https://drabrunadurelli.com/og-quiz.jpg"
      }} />
      
      <StructuredData data={quizSchema} />
      
      <div className="min-h-screen flex flex-col bg-background">
        <Navigation />
        
        <main className="flex-1">
          {/* Hero Section */}
          {!showOutput && !isGenerating && currentStep === 1 && (
            <section className="py-12 md:py-16 bg-gradient-to-br from-primary/5 via-background to-background border-b">
              <div className="container mx-auto px-4">
                <div className="max-w-3xl mx-auto text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 md:w-20 md:h-20 rounded-full bg-gradient-to-br from-primary to-primary/70 mb-6">
                    <Sparkles className="w-8 h-8 md:w-10 md:h-10 text-primary-foreground" />
                  </div>
                  <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold mb-4">
                    Descubra Seu Caminho
                  </h1>
                  <p className="text-lg md:text-xl text-muted-foreground mb-2">
                    Responda 7 perguntas e receba um plano personalizado
                  </p>
                  <p className="text-sm text-muted-foreground">
                    100% gratuito • Sem compromisso • Resultados imediatos
                  </p>
                </div>
              </div>
            </section>
          )}

          {/* Quiz Content */}
          <section className="py-8 md:py-12">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                {isGenerating ? (
                  <GeneratingAnimation />
                ) : !showOutput ? (
                  <div className="bg-card rounded-2xl shadow-lg border p-6 md:p-8">
                    <QuizProgress currentStep={currentStep} totalSteps={7} />
                    
                    {currentStep === 1 && (
                      <QuizStep1
                        peso={quizData.peso}
                        altura={quizData.altura}
                        metaPeso={quizData.metaPeso}
                        imc={quizData.imc}
                        onChange={updateQuizData}
                      />
                    )}
                    {currentStep === 2 && (
                      <QuizStep2
                        comorbidades={quizData.comorbidades}
                        onChange={(val) => updateQuizData('comorbidades', val)}
                      />
                    )}
                    {currentStep === 3 && (
                      <QuizStep3
                        tentativasAnteriores={quizData.tentativasAnteriores}
                        efeitoSanfona={quizData.efeitoSanfona}
                        gatilhos={quizData.gatilhos}
                        onChange={updateQuizData}
                      />
                    )}
                    {currentStep === 4 && (
                      <QuizStep4
                        invasividade={quizData.invasividade}
                        tempoRecuperacao={quizData.tempoRecuperacao}
                        tempoDisponivel={quizData.tempoDisponivel}
                        onChange={updateQuizData}
                      />
                    )}
                    {currentStep === 5 && (
                      <QuizStep5
                        dorPrincipal={quizData.dorPrincipal}
                        onChange={(val) => updateQuizData('dorPrincipal', val)}
                      />
                    )}
                    {currentStep === 6 && (
                      <QuizStep6
                        expectativas={quizData.expectativas}
                        onChange={(val) => updateQuizData('expectativas', val)}
                      />
                    )}
                    {currentStep === 7 && (
                      <QuizStep7
                        cirurgiaGastricaPrevia={quizData.cirurgiaGastricaPrevia}
                        cirurgiaBariatricaPreviaTipo={quizData.cirurgiaBariatricaPreviaTipo}
                        reganhoPosBariatrica={quizData.reganhoPosBariatrica}
                        falhaPreviaClinica={quizData.falhaPreviaClinica}
                        onChange={updateQuizData}
                      />
                    )}
                    
                    <QuizNavigation
                      currentStep={currentStep}
                      totalSteps={7}
                      canProceed={canProceed()}
                      onBack={() => setCurrentStep(Math.max(1, currentStep - 1))}
                      onNext={handleNext}
                      onSubmit={handleSubmit}
                    />
                  </div>
                ) : output ? (
                  <div className="space-y-6">
                    <div className="bg-card rounded-2xl shadow-lg border overflow-hidden">
                      <DeclaracaoTransformacao headline={output.headline} alertaClinico={output.alertaClinico} />
                    </div>
                    
                    <PerfilSaudeRadar perfilSaude={output.perfilSaude} quizData={quizData} />
                    
                    <div className="bg-card rounded-2xl shadow-lg border overflow-hidden">
                      <IndiceQLI qli={output.qli} />
                      <RoadmapFases roadmap={output.roadmap} />
                      <MixEstrategias mixEstrategias={output.mixEstrategias} />
                      <KPIsClinicas kpis={output.kpis} />
                      <LifestyleWins lifestyleWins={output.lifestyleWins} />
                      <CTAsFinais onResetQuiz={resetQuiz} />
                    </div>
                    
                    {/* Back to Site Button */}
                    <div className="flex justify-center pt-4">
                      <Link to="/">
                        <Button variant="outline" size="lg">
                          <ArrowLeft className="mr-2 h-4 w-4" />
                          Voltar ao Site
                        </Button>
                      </Link>
                    </div>
                  </div>
                ) : null}
              </div>
            </div>
          </section>
        </main>
        
        <Footer />
        <WhatsAppButton />
      </div>
    </>
  );
};

export default Quiz;
