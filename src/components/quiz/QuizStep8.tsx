/* eslint-disable @typescript-eslint/no-explicit-any */
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Activity, Dumbbell, Footprints, AlertCircle } from "lucide-react";

interface QuizStep8Props {
  nivelAtividade: 'sedentaria' | 'baixa' | 'moderada' | 'alta' | null;
  forcaResistencia: 'nao_faco' | '1x_sem' | '2x_sem' | '3+_sem' | null;
  passosDia: '<4k' | '4-6k' | '6-8k' | '8k+' | 'nao_sei' | null;
  limitacaoDor: 'sem_dor' | 'dor_leve' | 'dor_moderada' | 'dor_importante' | null;
  onChange: (field: string, value: any) => void;
}

export const QuizStep8 = ({
  nivelAtividade,
  forcaResistencia,
  passosDia,
  limitacaoDor,
  onChange
}: QuizStep8Props) => {
  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <h2 className="text-2xl md:text-3xl font-serif font-bold mb-3">
          Seu Movimento Hoje
        </h2>
        <p className="text-muted-foreground text-sm md:text-base">
          Sem julgamentos — isso nos ajuda a ajustar metas possíveis para as próximas 12 semanas.
        </p>
      </div>

      {/* Nível de Atividade */}
      <div className="bg-card p-6 rounded-lg border shadow-sm">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-lg bg-primary/10">
            <Activity className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h3 className="font-semibold text-base">Nível de Atividade Física</h3>
            <p className="text-sm text-muted-foreground">Últimas 4 semanas</p>
          </div>
        </div>
        
        <RadioGroup
          value={nivelAtividade || ''}
          onValueChange={(val) => onChange('nivelAtividade', val as typeof nivelAtividade)}
        >
          <div className="space-y-3">
            <div className="flex items-center space-x-3 border rounded-lg p-4 hover:bg-primary/5 cursor-pointer transition-colors">
              <RadioGroupItem value="sedentaria" id="sedentaria" />
              <Label htmlFor="sedentaria" className="flex-1 cursor-pointer">
                <span className="font-medium">Sedentária</span>
                <span className="block text-xs text-muted-foreground">0-1x/semana, menos de 20 minutos</span>
              </Label>
            </div>
            
            <div className="flex items-center space-x-3 border rounded-lg p-4 hover:bg-primary/5 cursor-pointer transition-colors">
              <RadioGroupItem value="baixa" id="baixa" />
              <Label htmlFor="baixa" className="flex-1 cursor-pointer">
                <span className="font-medium">Baixa</span>
                <span className="block text-xs text-muted-foreground">2x/semana, atividade leve</span>
              </Label>
            </div>
            
            <div className="flex items-center space-x-3 border rounded-lg p-4 hover:bg-primary/5 cursor-pointer transition-colors">
              <RadioGroupItem value="moderada" id="moderada" />
              <Label htmlFor="moderada" className="flex-1 cursor-pointer">
                <span className="font-medium">Moderada</span>
                <span className="block text-xs text-muted-foreground">3-4x/semana, 30-45 minutos</span>
              </Label>
            </div>
            
            <div className="flex items-center space-x-3 border rounded-lg p-4 hover:bg-primary/5 cursor-pointer transition-colors">
              <RadioGroupItem value="alta" id="alta" />
              <Label htmlFor="alta" className="flex-1 cursor-pointer">
                <span className="font-medium">Alta</span>
                <span className="block text-xs text-muted-foreground">5+ x/semana</span>
              </Label>
            </div>
          </div>
        </RadioGroup>
      </div>

      {/* Treino de Força */}
      <div className="bg-card p-6 rounded-lg border shadow-sm">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-lg bg-primary/10">
            <Dumbbell className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h3 className="font-semibold text-base">Treino de Força/Resistência</h3>
            <p className="text-sm text-muted-foreground">Musculação, funcional, pilates</p>
          </div>
        </div>
        
        <RadioGroup
          value={forcaResistencia || ''}
          onValueChange={(val) => onChange('forcaResistencia', val as typeof forcaResistencia)}
        >
          <div className="space-y-3">
            <div className="flex items-center space-x-3 border rounded-lg p-4 hover:bg-primary/5 cursor-pointer transition-colors">
              <RadioGroupItem value="nao_faco" id="nao_faco" />
              <Label htmlFor="nao_faco" className="flex-1 cursor-pointer">
                Não faço
              </Label>
            </div>
            
            <div className="flex items-center space-x-3 border rounded-lg p-4 hover:bg-primary/5 cursor-pointer transition-colors">
              <RadioGroupItem value="1x_sem" id="1x_sem" />
              <Label htmlFor="1x_sem" className="flex-1 cursor-pointer">
                1x por semana
              </Label>
            </div>
            
            <div className="flex items-center space-x-3 border rounded-lg p-4 hover:bg-primary/5 cursor-pointer transition-colors">
              <RadioGroupItem value="2x_sem" id="2x_sem" />
              <Label htmlFor="2x_sem" className="flex-1 cursor-pointer">
                2x por semana
              </Label>
            </div>
            
            <div className="flex items-center space-x-3 border rounded-lg p-4 hover:bg-primary/5 cursor-pointer transition-colors">
              <RadioGroupItem value="3+_sem" id="3+_sem" />
              <Label htmlFor="3+_sem" className="flex-1 cursor-pointer">
                3+ vezes por semana
              </Label>
            </div>
          </div>
        </RadioGroup>
      </div>

      {/* Passos por Dia */}
      <div className="bg-card p-6 rounded-lg border shadow-sm">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-lg bg-primary/10">
            <Footprints className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h3 className="font-semibold text-base">Passos Médios por Dia</h3>
            <p className="text-sm text-muted-foreground">Se você acompanha</p>
          </div>
        </div>
        
        <RadioGroup
          value={passosDia || ''}
          onValueChange={(val) => onChange('passosDia', val as typeof passosDia)}
        >
          <div className="space-y-3">
            <div className="flex items-center space-x-3 border rounded-lg p-4 hover:bg-primary/5 cursor-pointer transition-colors">
              <RadioGroupItem value="<4k" id="menos_4k" />
              <Label htmlFor="menos_4k" className="flex-1 cursor-pointer">
                Menos de 4.000 passos
              </Label>
            </div>
            
            <div className="flex items-center space-x-3 border rounded-lg p-4 hover:bg-primary/5 cursor-pointer transition-colors">
              <RadioGroupItem value="4-6k" id="4_6k" />
              <Label htmlFor="4_6k" className="flex-1 cursor-pointer">
                4.000 - 6.000 passos
              </Label>
            </div>
            
            <div className="flex items-center space-x-3 border rounded-lg p-4 hover:bg-primary/5 cursor-pointer transition-colors">
              <RadioGroupItem value="6-8k" id="6_8k" />
              <Label htmlFor="6_8k" className="flex-1 cursor-pointer">
                6.000 - 8.000 passos
              </Label>
            </div>
            
            <div className="flex items-center space-x-3 border rounded-lg p-4 hover:bg-primary/5 cursor-pointer transition-colors">
              <RadioGroupItem value="8k+" id="8k_mais" />
              <Label htmlFor="8k_mais" className="flex-1 cursor-pointer">
                Mais de 8.000 passos
              </Label>
            </div>
            
            <div className="flex items-center space-x-3 border rounded-lg p-4 hover:bg-primary/5 cursor-pointer transition-colors">
              <RadioGroupItem value="nao_sei" id="nao_sei" />
              <Label htmlFor="nao_sei" className="flex-1 cursor-pointer">
                Não acompanho / Não sei
              </Label>
            </div>
          </div>
        </RadioGroup>
      </div>

      {/* Limitação/Dor */}
      <div className="bg-card p-6 rounded-lg border shadow-sm">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-lg bg-primary/10">
            <AlertCircle className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h3 className="font-semibold text-base">Limitação ou Dor ao Se Mover</h3>
            <p className="text-sm text-muted-foreground">Joelhos, costas, articulações</p>
          </div>
        </div>
        
        <RadioGroup
          value={limitacaoDor || ''}
          onValueChange={(val) => onChange('limitacaoDor', val as typeof limitacaoDor)}
        >
          <div className="space-y-3">
            <div className="flex items-center space-x-3 border rounded-lg p-4 hover:bg-primary/5 cursor-pointer transition-colors">
              <RadioGroupItem value="sem_dor" id="sem_dor" />
              <Label htmlFor="sem_dor" className="flex-1 cursor-pointer">
                Sem dor ou limitação
              </Label>
            </div>
            
            <div className="flex items-center space-x-3 border rounded-lg p-4 hover:bg-primary/5 cursor-pointer transition-colors">
              <RadioGroupItem value="dor_leve" id="dor_leve" />
              <Label htmlFor="dor_leve" className="flex-1 cursor-pointer">
                Dor leve, não atrapalha
              </Label>
            </div>
            
            <div className="flex items-center space-x-3 border rounded-lg p-4 hover:bg-primary/5 cursor-pointer transition-colors">
              <RadioGroupItem value="dor_moderada" id="dor_moderada" />
              <Label htmlFor="dor_moderada" className="flex-1 cursor-pointer">
                Dor moderada, limita alguns movimentos
              </Label>
            </div>
            
            <div className="flex items-center space-x-3 border rounded-lg p-4 hover:bg-primary/5 cursor-pointer transition-colors">
              <RadioGroupItem value="dor_importante" id="dor_importante" />
              <Label htmlFor="dor_importante" className="flex-1 cursor-pointer">
                Dor importante, dificulta atividades diárias
              </Label>
            </div>
          </div>
        </RadioGroup>
      </div>
    </div>
  );
};

