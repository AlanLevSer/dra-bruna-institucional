import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import type { Answers } from '@/lib/mapa-metabolico/types';

interface StepLifestyleProps {
  answers: Partial<Answers>;
  onChange: (key: keyof Answers, value: unknown) => void;
}

export const StepLifestyle = ({ answers, onChange }: StepLifestyleProps) => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="sleep">
            Horas de sono por noite <span className="text-destructive">*</span>
          </Label>
          <Select value={answers.sleep_hours_bucket} onValueChange={(value) => onChange('sleep_hours_bucket', value)}>
            <SelectTrigger id="sleep">
              <SelectValue placeholder="Selecione" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="<5">Menos de 5h</SelectItem>
              <SelectItem value="5–6">5 a 6h</SelectItem>
              <SelectItem value="6–7">6 a 7h</SelectItem>
              <SelectItem value="7–8">7 a 8h</SelectItem>
              <SelectItem value=">8">Mais de 8h</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="stress">
            Nível de estresse (0-10) <span className="text-destructive">*</span>
          </Label>
          <Input
            id="stress"
            type="number"
            min={0}
            max={10}
            value={answers.stress_0_10 ?? ''}
            onChange={(e) => onChange('stress_0_10', parseInt(e.target.value))}
            placeholder="Ex: 7"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="exercise">
            Exercícios por semana <span className="text-destructive">*</span>
          </Label>
          <Select
            value={answers.exercise_freq_bucket}
            onValueChange={(value) => onChange('exercise_freq_bucket', value)}
          >
            <SelectTrigger id="exercise">
              <SelectValue placeholder="Selecione" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="0">Nenhum</SelectItem>
              <SelectItem value="1–2">1 a 2 vezes</SelectItem>
              <SelectItem value="3–4">3 a 4 vezes</SelectItem>
              <SelectItem value="5+">5 ou mais vezes</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="sitting">Tempo sentado por dia</Label>
          <Select
            value={answers.sitting_time_bucket}
            onValueChange={(value) => onChange('sitting_time_bucket', value)}
          >
            <SelectTrigger id="sitting">
              <SelectValue placeholder="Selecione (opcional)" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="<3h">Menos de 3h</SelectItem>
              <SelectItem value="3–6h">3 a 6h</SelectItem>
              <SelectItem value="6–9h">6 a 9h</SelectItem>
              <SelectItem value=">9h">Mais de 9h</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="ultraprocessed">
            Ultraprocessados (frequência) <span className="text-destructive">*</span>
          </Label>
          <Select
            value={answers.ultra_processed_freq}
            onValueChange={(value) => onChange('ultra_processed_freq', value)}
          >
            <SelectTrigger id="ultraprocessed">
              <SelectValue placeholder="Selecione" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="rare">Raramente</SelectItem>
              <SelectItem value="1–3w">1-3 vezes/semana</SelectItem>
              <SelectItem value="4–6w">4-6 vezes/semana</SelectItem>
              <SelectItem value="daily">Diariamente</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="alcohol">
            Álcool (frequência) <span className="text-destructive">*</span>
          </Label>
          <Select value={answers.alcohol_freq} onValueChange={(value) => onChange('alcohol_freq', value)}>
            <SelectTrigger id="alcohol">
              <SelectValue placeholder="Selecione" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="never">Nunca</SelectItem>
              <SelectItem value="social">Social (eventos)</SelectItem>
              <SelectItem value="weekly">Semanal</SelectItem>
              <SelectItem value="daily">Diário</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-3 pt-4">
        <div className="flex items-center space-x-2">
          <Checkbox
            id="meal-21h"
            checked={answers.last_meal_after_21 || false}
            onCheckedChange={(checked) => onChange('last_meal_after_21', checked)}
          />
          <Label htmlFor="meal-21h" className="cursor-pointer font-normal">
            Costuma fazer última refeição após 21h?
          </Label>
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox
            id="midnight-eating"
            checked={answers.midnight_eating || false}
            onCheckedChange={(checked) => onChange('midnight_eating', checked)}
          />
          <Label htmlFor="midnight-eating" className="cursor-pointer font-normal">
            Come de madrugada?
          </Label>
        </div>
      </div>
    </div>
  );
};
