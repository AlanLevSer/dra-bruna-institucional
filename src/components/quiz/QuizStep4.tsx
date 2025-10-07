import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Settings, Clock, Calendar } from "lucide-react";

interface QuizStep4Props {
  invasividade: 'minima' | 'moderada' | 'nao_importa';
  tempoRecuperacao: 'minimo' | 'moderado' | 'nao_importa';
  tempoDisponivel: '1-3h/sem' | '3-5h/sem' | '5+h/sem';
  onChange: (field: string, value: string) => void;
}

export const QuizStep4 = ({ invasividade, tempoRecuperacao, tempoDisponivel, onChange }: QuizStep4Props) => {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="text-center space-y-2">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
          <Settings className="w-8 h-8 text-primary" />
        </div>
        <h2 className="text-2xl font-bold">Suas preferências</h2>
        <p className="text-muted-foreground">
          Vamos personalizar sua jornada de acordo com seu estilo de vida
        </p>
      </div>
      
      <div className="space-y-6">
        <div className="space-y-3">
          <Label className="text-base">Preferência de invasividade</Label>
          <RadioGroup value={invasividade} onValueChange={(value) => onChange('invasividade', value)}>
            <div className="flex items-start space-x-3 p-4 rounded-lg border hover:border-primary/50 transition-colors">
              <RadioGroupItem value="minima" id="inv-min" className="mt-1" />
              <div className="flex-1">
                <Label htmlFor="inv-min" className="cursor-pointer font-medium">Mínima invasividade</Label>
                <p className="text-sm text-muted-foreground">Prefiro estratégias não invasivas</p>
              </div>
            </div>
            <div className="flex items-start space-x-3 p-4 rounded-lg border hover:border-primary/50 transition-colors">
              <RadioGroupItem value="moderada" id="inv-mod" className="mt-1" />
              <div className="flex-1">
                <Label htmlFor="inv-mod" className="cursor-pointer font-medium">Invasividade moderada</Label>
                <p className="text-sm text-muted-foreground">Aceito procedimentos endoscópicos se necessário</p>
              </div>
            </div>
            <div className="flex items-start space-x-3 p-4 rounded-lg border hover:border-primary/50 transition-colors">
              <RadioGroupItem value="nao_importa" id="inv-nao" className="mt-1" />
              <div className="flex-1">
                <Label htmlFor="inv-nao" className="cursor-pointer font-medium">Não importa</Label>
                <p className="text-sm text-muted-foreground">Busco a melhor estratégia, independente da invasividade</p>
              </div>
            </div>
          </RadioGroup>
        </div>
        
        <div className="space-y-3">
          <Label className="text-base">Tempo disponível para recuperação</Label>
          <RadioGroup value={tempoRecuperacao} onValueChange={(value) => onChange('tempoRecuperacao', value)}>
            <div className="flex items-start space-x-3 p-4 rounded-lg border hover:border-primary/50 transition-colors">
              <RadioGroupItem value="minimo" id="rec-min" className="mt-1" />
              <div className="flex-1">
                <Label htmlFor="rec-min" className="cursor-pointer font-medium">Mínimo</Label>
                <p className="text-sm text-muted-foreground">Preciso voltar às atividades imediatamente</p>
              </div>
            </div>
            <div className="flex items-start space-x-3 p-4 rounded-lg border hover:border-primary/50 transition-colors">
              <RadioGroupItem value="moderado" id="rec-mod" className="mt-1" />
              <div className="flex-1">
                <Label htmlFor="rec-mod" className="cursor-pointer font-medium">Moderado (1-3 dias)</Label>
                <p className="text-sm text-muted-foreground">Posso tirar alguns dias de repouso</p>
              </div>
            </div>
            <div className="flex items-start space-x-3 p-4 rounded-lg border hover:border-primary/50 transition-colors">
              <RadioGroupItem value="nao_importa" id="rec-nao" className="mt-1" />
              <div className="flex-1">
                <Label htmlFor="rec-nao" className="cursor-pointer font-medium">Flexível</Label>
                <p className="text-sm text-muted-foreground">Posso ajustar minha agenda conforme necessário</p>
              </div>
            </div>
          </RadioGroup>
        </div>
        
        <div className="space-y-3">
          <Label className="text-base">Tempo disponível para acompanhamento</Label>
          <RadioGroup value={tempoDisponivel} onValueChange={(value) => onChange('tempoDisponivel', value)}>
            <div className="flex items-start space-x-3 p-4 rounded-lg border hover:border-primary/50 transition-colors">
              <RadioGroupItem value="1-3h/sem" id="tempo-min" className="mt-1" />
              <div className="flex-1">
                <Label htmlFor="tempo-min" className="cursor-pointer font-medium">1-3 horas/semana</Label>
                <p className="text-sm text-muted-foreground">Agenda executiva, otimização máxima</p>
              </div>
            </div>
            <div className="flex items-start space-x-3 p-4 rounded-lg border hover:border-primary/50 transition-colors">
              <RadioGroupItem value="3-5h/sem" id="tempo-med" className="mt-1" />
              <div className="flex-1">
                <Label htmlFor="tempo-med" className="cursor-pointer font-medium">3-5 horas/semana</Label>
                <p className="text-sm text-muted-foreground">Consigo organizar alguns momentos dedicados</p>
              </div>
            </div>
            <div className="flex items-start space-x-3 p-4 rounded-lg border hover:border-primary/50 transition-colors">
              <RadioGroupItem value="5+h/sem" id="tempo-flex" className="mt-1" />
              <div className="flex-1">
                <Label htmlFor="tempo-flex" className="cursor-pointer font-medium">5+ horas/semana</Label>
                <p className="text-sm text-muted-foreground">Tenho disponibilidade para me dedicar intensamente</p>
              </div>
            </div>
          </RadioGroup>
        </div>
      </div>
    </div>
  );
};
