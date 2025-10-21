import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Zap, Cookie, Footprints, Heart, Activity, TrendingDown } from "lucide-react";

interface QuizStep5Props {
  dorPrincipal: 'energia' | 'compulsao' | 'dores_articulares' | 'autoestima' | 'marcadores_alterados' | 'mobilidade' | null;
  onChange: (value: string) => void;
}

export const QuizStep5 = ({ dorPrincipal, onChange }: QuizStep5Props) => {
  const options = [
    { 
      value: 'energia', 
      icon: Zap,
      label: 'Falta de energia constante',
      description: 'Acordo cansado, tenho picos de fadiga durante o dia'
    },
    { 
      value: 'compulsao', 
      icon: Cookie,
      label: 'Compulsão alimentar',
      description: 'Dificuldade em controlar a fome e os impulsos'
    },
    { 
      value: 'dores_articulares', 
      icon: Footprints,
      label: 'Dores articulares',
      description: 'Joelhos, costas ou articulações doloridas'
    },
    { 
      value: 'autoestima', 
      icon: Heart,
      label: 'Baixa autoestima',
      description: 'Não me sinto bem com minha aparência'
    },
    { 
      value: 'marcadores_alterados', 
      icon: TrendingDown,
      label: 'Marcadores metabólicos alterados',
      description: 'Glicemia, colesterol, triglicerídeos fora do ideal'
    },
    { 
      value: 'mobilidade', 
      icon: Activity,
      label: 'Dificuldade de movimentação',
      description: 'Me canso fácil, falta de condicionamento'
    }
  ] as const;
  
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="text-center space-y-2">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
          <Heart className="w-8 h-8 text-primary" />
        </div>
        <h2 className="text-2xl font-bold">Qual é sua principal dor hoje?</h2>
        <p className="text-muted-foreground">
          O que mais impacta sua qualidade de vida neste momento
        </p>
      </div>
      
      <RadioGroup value={dorPrincipal || undefined} onValueChange={onChange}>
        <div className="grid gap-3">
          {options.map((option) => {
            const Icon = option.icon;
            return (
              <div
                key={option.value}
                className={`flex items-start space-x-4 p-4 rounded-lg border-2 transition-all cursor-pointer ${
                  dorPrincipal === option.value
                    ? 'border-primary bg-primary/5 shadow-sm'
                    : 'border-border hover:border-primary/50'
                }`}
                onClick={() => onChange(option.value)}
              >
                <RadioGroupItem value={option.value} id={option.value} className="mt-1" />
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-1">
                    <div className={`p-2 rounded-lg ${
                      dorPrincipal === option.value ? 'bg-primary/10' : 'bg-muted'
                    }`}>
                      <Icon className={`w-5 h-5 ${
                        dorPrincipal === option.value ? 'text-primary' : 'text-muted-foreground'
                      }`} />
                    </div>
                    <Label htmlFor={option.value} className="cursor-pointer font-medium text-base">
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
      </RadioGroup>
    </div>
  );
};
