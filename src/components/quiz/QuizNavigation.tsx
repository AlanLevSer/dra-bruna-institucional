import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";

interface QuizNavigationProps {
  currentStep: number;
  totalSteps: number;
  canProceed: boolean;
  onBack: () => void;
  onNext: () => void;
  onSubmit: () => void;
}

export const QuizNavigation = ({
  currentStep,
  totalSteps,
  canProceed,
  onBack,
  onNext,
  onSubmit
}: QuizNavigationProps) => {
  const isFirstStep = currentStep === 1;
  const isLastStep = currentStep === totalSteps;
  
  return (
    <div className="flex justify-between items-center mt-8 pt-6 border-t">
      <Button
        variant="outline"
        onClick={onBack}
        disabled={isFirstStep}
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Voltar
      </Button>
      
      <Button
        onClick={isLastStep ? onSubmit : onNext}
        disabled={!canProceed}
      >
        {isLastStep ? "Ver meu plano" : "Próxima"}
        {!isLastStep && <ArrowRight className="ml-2 h-4 w-4" />}
      </Button>
    </div>
  );
};
