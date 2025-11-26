import { CheckCircle2 } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

interface MapaProgressProps {
  currentStep: number;
  totalSteps: number;
  stepTitles: string[];
}

export const MapaProgress = ({ currentStep, totalSteps, stepTitles }: MapaProgressProps) => {
  const progress = Math.round(((currentStep + 1) / totalSteps) * 100);

  return (
    <div className="w-full space-y-4">
      <div className="flex justify-between items-center">
        <span className="text-sm font-medium text-muted-foreground">
          Etapa {currentStep + 1} de {totalSteps}
        </span>
        <span className="text-sm font-medium text-primary">{progress}%</span>
      </div>

      <Progress value={progress} className="h-2" />

      <div className="hidden md:flex justify-between items-center pt-2">
        {stepTitles.map((title, index) => (
          <div key={index} className="flex items-center gap-2">
            {index < currentStep ? (
              <CheckCircle2 className="w-5 h-5 text-primary" />
            ) : (
              <div
                className={`w-5 h-5 rounded-full border-2 ${
                  index === currentStep ? 'border-primary bg-primary/10' : 'border-muted-foreground/30'
                }`}
              />
            )}
            <span
              className={`text-xs ${
                index === currentStep ? 'text-foreground font-medium' : 'text-muted-foreground'
              }`}
            >
              {title}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
