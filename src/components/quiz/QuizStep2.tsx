import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Heart, Activity } from "lucide-react";

interface QuizStep2Props {
  comorbidades: Array<'dm2' | 'ri' | 'has' | 'dislipidemia' | 'apneia' | 'sop' | 'nenhuma'>;
  onChange: (comorbidades: Array<'dm2' | 'ri' | 'has' | 'dislipidemia' | 'apneia' | 'sop' | 'nenhuma'>) => void;
}

export const QuizStep2 = ({ comorbidades, onChange }: QuizStep2Props) => {
  const options = [
    { value: 'dm2', label: 'Diabetes tipo 2' },
    { value: 'ri', label: 'Resistência Insulínica' },
    { value: 'has', label: 'Hipertensão' },
    { value: 'dislipidemia', label: 'Dislipidemia' },
    { value: 'apneia', label: 'Apneia do Sono' },
    { value: 'sop', label: 'SOP (Síndrome dos Ovários Policísticos)' },
    { value: 'nenhuma', label: 'Nenhuma das anteriores' }
  ] as const;
  
  const handleToggle = (value: typeof options[number]['value']) => {
    if (value === 'nenhuma') {
      onChange(['nenhuma']);
    } else {
      const newComorbidades = comorbidades.includes(value)
        ? comorbidades.filter(c => c !== value)
        : [...comorbidades.filter(c => c !== 'nenhuma'), value];
      onChange(newComorbidades as typeof comorbidades);
    }
  };
  
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="text-center space-y-2">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
          <Activity className="w-8 h-8 text-primary" />
        </div>
        <h2 className="text-2xl font-bold">Sua saúde metabólica</h2>
        <p className="text-muted-foreground">
          Selecione todas as condições que se aplicam a você
        </p>
      </div>
      
      <div className="grid md:grid-cols-2 gap-4">
        {options.map((option) => (
          <div
            key={option.value}
            className={`flex items-start space-x-3 p-4 rounded-lg border-2 transition-colors cursor-pointer ${
              comorbidades.includes(option.value)
                ? 'border-primary bg-primary/5'
                : 'border-border hover:border-primary/50'
            }`}
            onClick={() => handleToggle(option.value)}
          >
            <Checkbox
              id={option.value}
              checked={comorbidades.includes(option.value)}
              onCheckedChange={() => handleToggle(option.value)}
              className="mt-1"
            />
            <Label
              htmlFor={option.value}
              className="cursor-pointer flex-1 leading-relaxed"
            >
              {option.label}
            </Label>
          </div>
        ))}
      </div>
    </div>
  );
};
