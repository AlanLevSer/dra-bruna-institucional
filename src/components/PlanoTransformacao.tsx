import { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { QuizData } from "@/types/quiz";
import { generateTransformacaoOutput } from "@/lib/quiz-logic";
import { QuizProgress } from "./quiz/QuizProgress";
import { QuizNavigation } from "./quiz/QuizNavigation";
import { QuizStep1 } from "./quiz/QuizStep1";
import { QuizStep2 } from "./quiz/QuizStep2";
import { QuizStep3 } from "./quiz/QuizStep3";
import { QuizStep4 } from "./quiz/QuizStep4";
import { QuizStep5 } from "./quiz/QuizStep5";
import { QuizStep6 } from "./quiz/QuizStep6";
import { DeclaracaoTransformacao } from "./output/DeclaracaoTransformacao";
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
  const [currentStep, setCurrentStep] = useState(1);
  const [showOutput, setShowOutput] = useState(false);
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
    expectativas: []
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

  const canProceed = () => {
    switch (currentStep) {
      case 1: return quizData.peso > 0 && quizData.altura > 0;
      case 2: return quizData.comorbidades.length > 0;
      case 3: return true;
      case 4: return true;
      case 5: return true;
      case 6: return quizData.expectativas.length > 0;
      default: return false;
    }
  };

  const handleSubmit = () => {
    setShowOutput(true);
  };

  const output = showOutput ? generateTransformacaoOutput(quizData) : null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto p-0">
        {!showOutput ? (
          <div className="p-8">
            <QuizProgress currentStep={currentStep} totalSteps={6} />
            
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
            
            <QuizNavigation
              currentStep={currentStep}
              totalSteps={6}
              canProceed={canProceed()}
              onBack={() => setCurrentStep(Math.max(1, currentStep - 1))}
              onNext={() => setCurrentStep(Math.min(6, currentStep + 1))}
              onSubmit={handleSubmit}
            />
          </div>
        ) : output ? (
          <div>
            <DeclaracaoTransformacao headline={output.headline} />
            <IndiceQLI qli={output.qli} />
            <RoadmapFases roadmap={output.roadmap} />
            <MixEstrategias mixEstrategias={output.mixEstrategias} />
            <KPIsClinicas kpis={output.kpis} />
            <LifestyleWins lifestyleWins={output.lifestyleWins} />
            <CTAsFinais />
          </div>
        ) : null}
      </DialogContent>
    </Dialog>
  );
};
