import { useState, useRef, useEffect } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { QuizData } from "@/types/quiz";
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
import { toast } from "@/hooks/use-toast";
import { QuizProgress } from "./quiz/QuizProgress";
import { QuizNavigation } from "./quiz/QuizNavigation";
import { QuizStep1 } from "./quiz/QuizStep1";
import { QuizStep2 } from "./quiz/QuizStep2";
import { QuizStep3 } from "./quiz/QuizStep3";
import { QuizStep4 } from "./quiz/QuizStep4";
import { QuizStep5 } from "./quiz/QuizStep5";
import { QuizStep6 } from "./quiz/QuizStep6";
import { QuizStep7 } from "./quiz/QuizStep7";
import { QuizStep8 } from "./quiz/QuizStep8";
import { GeneratingAnimation } from "./quiz/GeneratingAnimation";
import { DeclaracaoTransformacao } from "./output/DeclaracaoTransformacao";
import { PlanoEnergeticoComponent } from "./output/PlanoEnergetico";
import { PerfilSaudeRadar } from "./output/PerfilSaudeRadar";
import { IndiceQLI } from "./output/IndiceQLI";
import { RoadmapFases } from "./output/RoadmapFases";
import { MixEstrategias } from "./output/MixEstrategias";
import { KPIsClinicas } from "./output/KPIsClinicas";
import { LifestyleWins } from "./output/LifestyleWins";
import { CTAsFinais } from "./output/CTAsFinais";

interface PlanoTransformacaoProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const PlanoTransformacao = ({ open, onOpenChange }: PlanoTransformacaoProps) => {
  const dialogContentRef = useRef<HTMLDivElement>(null);
  const [currentStep, setCurrentStep] = useState(1);
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
    // Scroll para o topo do dialog quando step mudar (exceto no step 1 inicial)
    if (currentStep > 1 && dialogContentRef.current) {
      dialogContentRef.current.scrollTo({ 
        top: 0, 
        behavior: 'smooth' 
      });
    }
  }, [currentStep]);

  const validateCurrentStep = () => {
    try {
      switch (currentStep) {
        case 1:
          step1Schema.parse({ peso: quizData.peso, altura: quizData.altura, metaPeso: quizData.metaPeso, idade: quizData.idade, sexo: quizData.sexo });
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
        case 8:
          step8Schema.parse({
            nivelAtividade: quizData.nivelAtividade,
            forcaResistencia: quizData.forcaResistencia,
            passosDia: quizData.passosDia,
            limitacaoDor: quizData.limitacaoDor
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
      case 1: return quizData.peso > 0 && quizData.altura > 0 && quizData.idade > 0 && quizData.sexo !== null;
      case 2: return quizData.comorbidades.length > 0;
      case 3: return quizData.tentativasAnteriores !== null;
      case 4: return quizData.invasividade !== null && 
                     quizData.tempoRecuperacao !== null && 
                     quizData.tempoDisponivel !== null;
      case 5: return quizData.dorPrincipal !== null;
      case 6: return quizData.expectativas.length > 0;
      case 7: return true;
      case 8: return quizData.nivelAtividade !== null && quizData.forcaResistencia !== null && quizData.passosDia !== null && quizData.limitacaoDor !== null;
      default: return false;
    }
  };

  const handleNext = () => {
    if (validateCurrentStep()) {
      setCurrentStep(Math.min(8, currentStep + 1));
    }
  };

  const handleSubmit = async () => {
    if (!validateCurrentStep()) return;
    
    setIsGenerating(true);
    
    // Simular processamento para dar sensação de personalização
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setShowOutput(true);
    setIsGenerating(false);
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
  };

  const output = showOutput ? generateTransformacaoOutput(quizData) : null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent ref={dialogContentRef} className="max-w-4xl max-h-[90vh] overflow-y-auto p-0">
        {isGenerating ? (
          <GeneratingAnimation />
        ) : !showOutput ? (
          <div className="p-8">
            <QuizProgress currentStep={currentStep} totalSteps={8} />
            
            {currentStep === 1 && (
              <QuizStep1
                peso={quizData.peso}
                altura={quizData.altura}
                metaPeso={quizData.metaPeso}
                imc={quizData.imc}
                idade={quizData.idade}
                sexo={quizData.sexo}
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
            {currentStep === 8 && (
              <QuizStep8
                nivelAtividade={quizData.nivelAtividade}
                forcaResistencia={quizData.forcaResistencia}
                passosDia={quizData.passosDia}
                limitacaoDor={quizData.limitacaoDor}
                onChange={updateQuizData}
              />
            )}
            
            <QuizNavigation
              currentStep={currentStep}
              totalSteps={8}
              canProceed={canProceed()}
              onBack={() => setCurrentStep(Math.max(1, currentStep - 1))}
              onNext={handleNext}
              onSubmit={handleSubmit}
            />
          </div>
        ) : output ? (
          <div>
            <DeclaracaoTransformacao headline={output.headline} alertaClinico={output.alertaClinico} />
            <PlanoEnergeticoComponent planoEnergetico={output.planoEnergetico} />
            <PerfilSaudeRadar perfilSaude={output.perfilSaude} quizData={quizData} />
            <IndiceQLI qli={output.qli} />
            <RoadmapFases roadmap={output.roadmap} />
            <MixEstrategias mixEstrategias={output.mixEstrategias} />
            <KPIsClinicas kpis={output.kpis} />
            <LifestyleWins lifestyleWins={output.lifestyleWins} />
            <CTAsFinais 
              onResetQuiz={resetQuiz}
              notaGlobal={output.perfilSaude.notaGlobal}
              conceito={output.perfilSaude.conceito}
              tratamentoRecomendado={output.mixEstrategias.intervencao?.nome || 'Protocolo Clínico'}
              metaKg={output.planoEnergetico.metaKg}
              semanasPlano={output.planoEnergetico.semanasPlano}
            />
          </div>
        ) : null}
      </DialogContent>
    </Dialog>
  );
};
