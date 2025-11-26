import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import type { Answers } from '@/lib/mapa-metabolico/types';

interface StepSymptomsProps {
  answers: Partial<Answers>;
  onChange: (key: keyof Answers, value: unknown) => void;
}

export const StepSymptoms = ({ answers, onChange }: StepSymptomsProps) => {
  const symptoms = [
    { key: 'fatigue' as keyof Answers, label: 'Cansaço constante' },
    { key: 'brain_fog' as keyof Answers, label: 'Dificuldade de concentração (brain fog)' },
    { key: 'joint_pain_inflammation' as keyof Answers, label: 'Dores articulares / inflamação' },
    { key: 'bloating' as keyof Answers, label: 'Inchaço / desconforto abdominal' },
  ];

  const getScaleColor = (value: number) => {
    if (value >= 7) return 'text-destructive';
    if (value >= 4) return 'text-orange-500';
    return 'text-green-600';
  };

  return (
    <div className="space-y-8">
      <p className="text-sm text-muted-foreground">
        Indique a intensidade de cada sintoma nos últimos 30 dias (0 = nenhum, 10 = muito intenso)
      </p>

      {symptoms.map((symptom) => {
        const value = (answers[symptom.key] as number) || 0;
        return (
          <div key={symptom.key} className="space-y-3">
            <div className="flex justify-between items-center">
              <Label>{symptom.label}</Label>
              <span className={`text-2xl font-bold ${getScaleColor(value)}`}>{value}</span>
            </div>
            <Slider
              value={[value]}
              onValueChange={(val) => onChange(symptom.key, val[0])}
              max={10}
              step={1}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Nenhum</span>
              <span>Muito intenso</span>
            </div>
          </div>
        );
      })}

      <div className="flex items-center space-x-2 pt-4">
        <Checkbox
          id="sleep-restorative"
          checked={answers.non_restorative_sleep || false}
          onCheckedChange={(checked) => onChange('non_restorative_sleep', checked)}
        />
        <Label htmlFor="sleep-restorative" className="cursor-pointer font-normal">
          Sono não reparador (acordo cansado/a)
        </Label>
      </div>
    </div>
  );
};
