import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Moon, Zap, Shirt, FileText, Baby, Briefcase, Footprints } from "lucide-react";

type Expectativa = 'dormir_melhor' | 'ter_energia' | 'vestir_confianca' | 'melhorar_exames' | 'brincar_filhos' | 'performance_trabalho' | 'autonomia_movimentos';

interface QuizStep6Props {
  expectativas: Expectativa[];
  onChange: (expectativas: Expectativa[]) => void;
}

export const QuizStep6 = ({ expectativas, onChange }: QuizStep6Props) => {
  const options = [
    { 
      value: 'dormir_melhor', 
      icon: Moon,
      label: 'Dormir profundamente',
      description: 'Todas as noites, sem interrupções'
    },
    { 
      value: 'ter_energia', 
      icon: Zap,
      label: 'Ter energia constante',
      description: 'Do início ao fim do dia'
    },
    { 
      value: 'vestir_confianca', 
      icon: Shirt,
      label: 'Vestir-me com confiança',
      description: 'Sentir-me bem nas minhas roupas'
    },
    { 
      value: 'melhorar_exames', 
      icon: FileText,
      label: 'Normalizar meus exames',
      description: 'Glicemia, colesterol, pressão'
    },
    { 
      value: 'brincar_filhos', 
      icon: Baby,
      label: 'Brincar com meus filhos',
      description: 'Sem cansaço ou limitações'
    },
    { 
      value: 'performance_trabalho', 
      icon: Briefcase,
      label: 'Ter foco no trabalho',
      description: 'Clareza mental e produtividade'
    },
    { 
      value: 'autonomia_movimentos', 
      icon: Footprints,
      label: 'Mover-me com leveza',
      description: 'Autonomia e sem dor'
    }
  ] as const;
  
  const handleToggle = (value: typeof options[number]['value']) => {
    if (expectativas.includes(value)) {
      onChange(expectativas.filter(e => e !== value));
    } else {
      if (expectativas.length < 3) {
        onChange([...expectativas, value]);
      }
    }
  };
  
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="text-center space-y-2">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
          <Zap className="w-8 h-8 text-primary" />
        </div>
        <h2 className="text-2xl font-bold">Como você quer se sentir?</h2>
        <p className="text-muted-foreground">
          Escolha até 3 expectativas que mais importam para você
        </p>
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-sm">
          <span className="font-medium text-primary">{expectativas.length}/3</span>
          <span className="text-muted-foreground">selecionadas</span>
        </div>
      </div>
      
      <div className="grid md:grid-cols-2 gap-4">
        {options.map((option) => {
          const Icon = option.icon;
          const isSelected = expectativas.includes(option.value);
          const isDisabled = !isSelected && expectativas.length >= 3;
          
          return (
            <div
              key={option.value}
              className={`flex items-start space-x-4 p-4 rounded-lg border-2 transition-all cursor-pointer ${
                isSelected
                  ? 'border-primary bg-primary/5 shadow-sm'
                  : isDisabled
                  ? 'border-border opacity-50 cursor-not-allowed'
                  : 'border-border hover:border-primary/50'
              }`}
              onClick={() => !isDisabled && handleToggle(option.value)}
            >
              <Checkbox
                id={option.value}
                checked={isSelected}
                disabled={isDisabled}
                onCheckedChange={() => !isDisabled && handleToggle(option.value)}
                className="mt-1"
              />
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-1">
                  <div className={`p-2 rounded-lg ${
                    isSelected ? 'bg-primary/10' : 'bg-muted'
                  }`}>
                    <Icon className={`w-5 h-5 ${
                      isSelected ? 'text-primary' : 'text-muted-foreground'
                    }`} />
                  </div>
                  <Label 
                    htmlFor={option.value} 
                    className={`cursor-pointer font-medium ${isDisabled ? 'cursor-not-allowed' : ''}`}
                  >
                    {option.label}
                  </Label>
                </div>
                <p className="text-sm text-muted-foreground ml-14">
                  {option.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
