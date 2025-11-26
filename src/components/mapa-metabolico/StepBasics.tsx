import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import type { Answers } from '@/lib/mapa-metabolico/types';

interface StepBasicsProps {
  answers: Partial<Answers>;
  onChange: (key: keyof Answers, value: unknown) => void;
}

export const StepBasics = ({ answers, onChange }: StepBasicsProps) => {
  const diagnosesOptions = [
    { value: 'none', label: 'Nenhum' },
    { value: 'hypertension', label: 'Hipertensão' },
    { value: 'prediabetes', label: 'Pré-diabetes' },
    { value: 'diabetes', label: 'Diabetes' },
    { value: 'dyslipidemia', label: 'Dislipidemia' },
    { value: 'hypothyroidism', label: 'Hipotireoidismo' },
    { value: 'other', label: 'Outro' },
  ];

  const handleDiagnosisToggle = (value: string) => {
    const current = answers.diagnoses || [];
    const updated = current.includes(value) ? current.filter((d) => d !== value) : [...current, value];
    onChange('diagnoses', updated);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="age">
            Idade <span className="text-destructive">*</span>
          </Label>
          <Input
            id="age"
            type="number"
            min={18}
            max={85}
            value={answers.age || ''}
            onChange={(e) => onChange('age', parseInt(e.target.value))}
            placeholder="Ex: 35"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="sex">
            Sexo (biológico) <span className="text-destructive">*</span>
          </Label>
          <Select value={answers.sex} onValueChange={(value) => onChange('sex', value)}>
            <SelectTrigger id="sex">
              <SelectValue placeholder="Selecione" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="F">Feminino</SelectItem>
              <SelectItem value="M">Masculino</SelectItem>
              <SelectItem value="ND">Prefiro não dizer</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="weight">
            Peso (kg) <span className="text-destructive">*</span>
          </Label>
          <Input
            id="weight"
            type="number"
            min={30}
            max={300}
            step={0.1}
            value={answers.weight_kg || ''}
            onChange={(e) => onChange('weight_kg', parseFloat(e.target.value))}
            placeholder="Ex: 75.5"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="height">
            Altura (cm) <span className="text-destructive">*</span>
          </Label>
          <Input
            id="height"
            type="number"
            min={120}
            max={220}
            value={answers.height_cm || ''}
            onChange={(e) => onChange('height_cm', parseInt(e.target.value))}
            placeholder="Ex: 165"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="waist">Circunferência abdominal (cm)</Label>
          <Input
            id="waist"
            type="number"
            min={50}
            max={200}
            value={answers.waist_cm || ''}
            onChange={(e) => onChange('waist_cm', parseInt(e.target.value))}
            placeholder="Ex: 90 (opcional)"
          />
        </div>

        <div className="flex items-center space-x-2 pt-8">
          <Checkbox
            id="abdominal"
            checked={answers.abdominal_protrusion || false}
            onCheckedChange={(checked) => onChange('abdominal_protrusion', checked)}
          />
          <Label htmlFor="abdominal" className="cursor-pointer">
            Barriga proeminente?
          </Label>
        </div>
      </div>

      <div className="space-y-3">
        <Label>
          Diagnósticos prévios <span className="text-destructive">*</span>
        </Label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {diagnosesOptions.map((option) => (
            <div key={option.value} className="flex items-center space-x-2">
              <Checkbox
                id={`dx-${option.value}`}
                checked={(answers.diagnoses || []).includes(option.value)}
                onCheckedChange={() => handleDiagnosisToggle(option.value)}
              />
              <Label htmlFor={`dx-${option.value}`} className="cursor-pointer font-normal">
                {option.label}
              </Label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
