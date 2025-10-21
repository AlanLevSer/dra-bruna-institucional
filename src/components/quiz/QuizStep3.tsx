import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { History, TrendingUp } from "lucide-react";

interface QuizStep3Props {
  tentativasAnteriores: number | null;
  efeitoSanfona: boolean;
  gatilhos: Array<'estresse' | 'ansiedade' | 'social' | 'emocional' | 'fome_noturna'>;
  onChange: (field: string, value: number | boolean | string[]) => void;
}

export const QuizStep3 = ({ tentativasAnteriores, efeitoSanfona, gatilhos, onChange }: QuizStep3Props) => {
  const gatilhosOptions = [
    { value: 'estresse', label: 'Estresse do dia a dia' },
    { value: 'ansiedade', label: 'Ansiedade' },
    { value: 'social', label: 'Situações sociais' },
    { value: 'emocional', label: 'Emoções intensas' },
    { value: 'fome_noturna', label: 'Fome noturna' }
  ] as const;
  
  const handleGatilhoToggle = (value: typeof gatilhosOptions[number]['value']) => {
    const newGatilhos = gatilhos.includes(value)
      ? gatilhos.filter(g => g !== value)
      : [...gatilhos, value];
    onChange('gatilhos', newGatilhos);
  };
  
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="text-center space-y-2">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
          <History className="w-8 h-8 text-primary" />
        </div>
        <h2 className="text-2xl font-bold">Sua jornada até aqui</h2>
        <p className="text-muted-foreground">
          Entender o passado nos ajuda a construir um futuro diferente
        </p>
      </div>
      
      <div className="space-y-6">
        <div className="space-y-3">
          <Label>Quantas vezes você já tentou emagrecer?</Label>
          <RadioGroup 
            value={tentativasAnteriores !== null ? tentativasAnteriores.toString() : undefined} 
            onValueChange={(value) => onChange('tentativasAnteriores', parseInt(value))}
          >
            <div className="flex items-center space-x-2 p-3 rounded-lg border hover:border-primary/50 transition-colors">
              <RadioGroupItem value="0" id="tent-0" />
              <Label htmlFor="tent-0" className="cursor-pointer flex-1">Esta é minha primeira vez</Label>
            </div>
            <div className="flex items-center space-x-2 p-3 rounded-lg border hover:border-primary/50 transition-colors">
              <RadioGroupItem value="2" id="tent-2" />
              <Label htmlFor="tent-2" className="cursor-pointer flex-1">1-3 vezes</Label>
            </div>
            <div className="flex items-center space-x-2 p-3 rounded-lg border hover:border-primary/50 transition-colors">
              <RadioGroupItem value="5" id="tent-5" />
              <Label htmlFor="tent-5" className="cursor-pointer flex-1">4-6 vezes</Label>
            </div>
            <div className="flex items-center space-x-2 p-3 rounded-lg border hover:border-primary/50 transition-colors">
              <RadioGroupItem value="8" id="tent-8" />
              <Label htmlFor="tent-8" className="cursor-pointer flex-1">7+ vezes</Label>
            </div>
          </RadioGroup>
        </div>
        
        <div className="flex items-start space-x-3 p-4 rounded-lg border-2 transition-colors cursor-pointer"
          onClick={() => onChange('efeitoSanfona', !efeitoSanfona)}
        >
          <Checkbox
            id="sanfona"
            checked={efeitoSanfona}
            onCheckedChange={(checked) => onChange('efeitoSanfona', checked === true)}
          />
          <div className="flex-1">
            <Label htmlFor="sanfona" className="cursor-pointer font-medium">
              Sofro com efeito sanfona
            </Label>
            <p className="text-sm text-muted-foreground mt-1">
              Perco peso mas sempre volto a ganhar
            </p>
          </div>
        </div>
        
        <div className="space-y-3">
          <Label>Quais são seus principais gatilhos?</Label>
          <div className="grid gap-3">
            {gatilhosOptions.map((option) => (
              <div
                key={option.value}
                className={`flex items-start space-x-3 p-4 rounded-lg border-2 transition-colors cursor-pointer ${
                  gatilhos.includes(option.value)
                    ? 'border-primary bg-primary/5'
                    : 'border-border hover:border-primary/50'
                }`}
                onClick={() => handleGatilhoToggle(option.value)}
              >
                <Checkbox
                  id={option.value}
                  checked={gatilhos.includes(option.value)}
                  onCheckedChange={() => handleGatilhoToggle(option.value)}
                />
                <Label htmlFor={option.value} className="cursor-pointer flex-1">
                  {option.label}
                </Label>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
