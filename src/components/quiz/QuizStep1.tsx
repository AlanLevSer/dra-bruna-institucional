/* eslint-disable @typescript-eslint/no-explicit-any */
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Scale, Calendar, Users } from "lucide-react";

interface QuizStep1Props {
  peso: number;
  altura: number;
  metaPeso: number;
  imc: number;
  idade: number;
  sexo: 'feminino' | 'masculino' | null;
  onChange: (field: string, value: any) => void;
}

export const QuizStep1 = ({ peso, altura, metaPeso, imc, idade, sexo, onChange }: QuizStep1Props) => {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="text-center space-y-2">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
          <Scale className="w-8 h-8 text-primary" />
        </div>
        <h2 className="text-2xl font-bold">Vamos começar pelo básico</h2>
        <p className="text-muted-foreground">
          Seus dados atuais nos ajudam a personalizar seu plano
        </p>
      </div>
      
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="peso">Peso atual (kg)</Label>
          <Input
            id="peso"
            type="number"
            min="40"
            max="300"
            value={peso || ''}
            onChange={(e) => onChange('peso', parseFloat(e.target.value) || 0)}
            placeholder="Ex: 85"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="altura">Altura (cm)</Label>
          <Input
            id="altura"
            type="number"
            min="120"
            max="250"
            value={altura || ''}
            onChange={(e) => onChange('altura', parseFloat(e.target.value) || 0)}
            placeholder="Ex: 165"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="idade" className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            Idade
          </Label>
          <Input
            id="idade"
            type="number"
            min="18"
            max="80"
            value={idade || ''}
            onChange={(e) => onChange('idade', parseFloat(e.target.value) || 0)}
            placeholder="Ex: 38"
          />
        </div>
        
        <div className="space-y-3">
          <Label className="flex items-center gap-2">
            <Users className="w-4 h-4" />
            Sexo biológico
          </Label>
          <RadioGroup value={sexo || ''} onValueChange={(val) => onChange('sexo', val)}>
            <div className="flex gap-4">
              <div className="flex items-center space-x-2 border rounded-lg p-3 flex-1 cursor-pointer hover:bg-primary/5">
                <RadioGroupItem value="feminino" id="feminino" />
                <Label htmlFor="feminino" className="cursor-pointer flex-1">Feminino</Label>
              </div>
              <div className="flex items-center space-x-2 border rounded-lg p-3 flex-1 cursor-pointer hover:bg-primary/5">
                <RadioGroupItem value="masculino" id="masculino" />
                <Label htmlFor="masculino" className="cursor-pointer flex-1">Masculino</Label>
              </div>
            </div>
          </RadioGroup>
        </div>
      </div>
      
      {imc > 0 && (
        <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
          <p className="text-sm text-muted-foreground">Seu IMC atual:</p>
          <p className="text-3xl font-bold text-primary">{imc.toFixed(1)}</p>
        </div>
      )}
      
      <div className="space-y-4">
        <Label>Quanto peso você deseja perder?</Label>
        <div className="space-y-6">
          <Slider
            value={[metaPeso]}
            onValueChange={([value]) => onChange('metaPeso', value)}
            min={5}
            max={40}
            step={5}
            className="w-full"
          />
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">5%</span>
            <div className="text-center">
              <p className="text-2xl font-bold text-primary">{metaPeso}%</p>
              <p className="text-sm text-muted-foreground">
                {peso > 0 && `≈ ${(peso * metaPeso / 100).toFixed(0)}kg`}
              </p>
            </div>
            <span className="text-sm text-muted-foreground">40%+</span>
          </div>
        </div>
      </div>
    </div>
  );
};

