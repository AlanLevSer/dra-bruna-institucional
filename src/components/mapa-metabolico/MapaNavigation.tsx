import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Save } from 'lucide-react';

interface MapaNavigationProps {
  currentStep: number;
  totalSteps: number;
  canGoBack: boolean;
  canGoForward: boolean;
  onBack: () => void;
  onForward: () => void;
  onSave?: () => void;
  isLastStep?: boolean;
}

export const MapaNavigation = ({
  currentStep,
  totalSteps,
  canGoBack,
  canGoForward,
  onBack,
  onForward,
  onSave,
  isLastStep,
}: MapaNavigationProps) => {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-6 border-t border-border">
      <Button
        variant="outline"
        onClick={onBack}
        disabled={!canGoBack || currentStep === 0}
        className="w-full sm:w-auto"
      >
        <ChevronLeft className="w-4 h-4 mr-2" />
        Voltar
      </Button>

      <div className="flex gap-3 w-full sm:w-auto">
        {onSave && !isLastStep && (
          <Button variant="ghost" onClick={onSave} className="flex-1 sm:flex-none">
            <Save className="w-4 h-4 mr-2" />
            Salvar
          </Button>
        )}

        <Button onClick={onForward} disabled={!canGoForward} className="flex-1 sm:flex-none">
          {isLastStep ? 'Ver Resultado' : 'Continuar'}
          {!isLastStep && <ChevronRight className="w-4 h-4 ml-2" />}
        </Button>
      </div>
    </div>
  );
};
