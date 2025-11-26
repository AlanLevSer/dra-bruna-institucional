import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import type { Answers } from '@/lib/mapa-metabolico/types';

interface StepHistoryProps {
  answers: Partial<Answers>;
  onChange: (key: keyof Answers, value: unknown) => void;
}

export const StepHistory = ({ answers, onChange }: StepHistoryProps) => {
  const emotionOptions = [
    { value: 'culpa', label: 'Culpa' },
    { value: 'ansiedade', label: 'Ansiedade' },
    { value: 'vergonha', label: 'Vergonha' },
    { value: 'neutro', label: 'Neutro / Nenhuma emoção negativa' },
  ];

  const handleEmotionToggle = (value: string) => {
    const current = answers.emotions_food || [];
    const updated = current.includes(value) ? current.filter((e) => e !== value) : [...current, value];
    onChange('emotions_food', updated);
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="regain">
          Perdeu mais de 5kg e recuperou quantas vezes? <span className="text-destructive">*</span>
        </Label>
        <Select
          value={answers.lost_5kg_regain_times}
          onValueChange={(value) => onChange('lost_5kg_regain_times', value)}
        >
          <SelectTrigger id="regain">
            <SelectValue placeholder="Selecione" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="0">Nenhuma vez</SelectItem>
            <SelectItem value="1">1 vez</SelectItem>
            <SelectItem value="2–3">2 a 3 vezes</SelectItem>
            <SelectItem value=">3">Mais de 3 vezes</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="yoyo">
          Vive efeito sanfona? <span className="text-destructive">*</span>
        </Label>
        <Select value={answers.yo_yo_weight} onValueChange={(value) => onChange('yo_yo_weight', value)}>
          <SelectTrigger id="yoyo">
            <SelectValue placeholder="Selecione" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="nunca">Nunca</SelectItem>
            <SelectItem value="às vezes">Às vezes</SelectItem>
            <SelectItem value="sim">Sim, constantemente</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="snacking">
          Beliscar/compulsão à noite <span className="text-destructive">*</span>
        </Label>
        <Select value={answers.night_snacking} onValueChange={(value) => onChange('night_snacking', value)}>
          <SelectTrigger id="snacking">
            <SelectValue placeholder="Selecione" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="nunca">Nunca</SelectItem>
            <SelectItem value="às vezes">Às vezes</SelectItem>
            <SelectItem value="frequente">Frequente</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-3 pt-4">
        <Label>Emoções que você sente em relação à comida</Label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {emotionOptions.map((option) => (
            <div key={option.value} className="flex items-center space-x-2">
              <Checkbox
                id={`emotion-${option.value}`}
                checked={(answers.emotions_food || []).includes(option.value)}
                onCheckedChange={() => handleEmotionToggle(option.value)}
              />
              <Label htmlFor={`emotion-${option.value}`} className="cursor-pointer font-normal">
                {option.label}
              </Label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
