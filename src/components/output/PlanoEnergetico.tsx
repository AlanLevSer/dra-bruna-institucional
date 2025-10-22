import { PlanoEnergetico } from "@/types/quiz";
import { Flame, TrendingDown, Calendar, Scale, Egg, CheckCircle2, AlertCircle } from "lucide-react";

interface PlanoEnergeticoProps {
  planoEnergetico: PlanoEnergetico;
}

export const PlanoEnergeticoComponent = ({ planoEnergetico }: PlanoEnergeticoProps) => {
  return (
    <div className="py-8 md:py-12 px-4 bg-gradient-to-b from-muted/20 to-background">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-xl md:text-2xl lg:text-3xl font-bold mb-2">
            Seu Plano Energético Inteligente
          </h2>
          <p className="text-sm md:text-base text-muted-foreground">
            Estimativa educativa para alinhar expectativa e estratégia
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            As metas finais são personalizadas na avaliação
          </p>
        </div>
        
        {/* Métricas Principais */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          <div className="bg-card rounded-lg p-4 border shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <Scale className="w-4 h-4 text-primary" />
              <span className="text-xs text-muted-foreground">Meta de Perda</span>
            </div>
            <p className="text-2xl font-bold text-primary">{planoEnergetico.metaKg} kg</p>
            <p className="text-xs text-muted-foreground">
              em {planoEnergetico.semanasPlano} semanas
            </p>
          </div>
          
          <div className="bg-card rounded-lg p-4 border shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <TrendingDown className="w-4 h-4 text-amber-600" />
              <span className="text-xs text-muted-foreground">Déficit Necessário</span>
            </div>
            <p className="text-2xl font-bold text-amber-600">
              {planoEnergetico.deficitDiario}
            </p>
            <p className="text-xs text-muted-foreground">kcal/dia</p>
          </div>
          
          <div className="bg-card rounded-lg p-4 border shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <Flame className="w-4 h-4 text-orange-500" />
              <span className="text-xs text-muted-foreground">Gasto Estimado</span>
            </div>
            <p className="text-2xl font-bold text-orange-500">
              {planoEnergetico.tdee}
            </p>
            <p className="text-xs text-muted-foreground">kcal/dia (TDEE)</p>
          </div>
          
          <div className="bg-card rounded-lg p-4 border shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <Egg className="w-4 h-4 text-blue-600" />
              <span className="text-xs text-muted-foreground">Meta Proteica</span>
            </div>
            <p className="text-2xl font-bold text-blue-600">
              {planoEnergetico.proteinaMeta}g
            </p>
            <p className="text-xs text-muted-foreground">por dia</p>
          </div>
        </div>
        
        {/* Fases do Plano */}
        <div className="bg-card rounded-lg p-6 border shadow-sm mb-6">
          <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
            <Calendar className="w-5 h-5 text-primary" />
            Calorias de Referência por Fase
          </h3>
          <div className="grid md:grid-cols-3 gap-4">
            {planoEnergetico.fases.map((fase) => (
              <div key={fase.fase} className="border rounded-lg p-4 bg-muted/30">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold text-muted-foreground">
                    Fase {fase.fase}
                  </span>
                  <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">
                    Semanas {fase.semanas}
                  </span>
                </div>
                <p className="text-2xl font-bold text-primary mb-1">
                  {fase.kcalAlvo} kcal
                </p>
                <p className="text-xs text-muted-foreground">
                  TDEE ajustado: {fase.tdeeAjustado} kcal
                </p>
              </div>
            ))}
          </div>
          <p className="text-xs text-muted-foreground mt-4 italic">
            * Valores ajustados conforme adaptação metabólica natural ao longo do tempo
          </p>
        </div>
        
        {/* Facilitadores */}
        <div className="bg-card rounded-lg p-6 border shadow-sm mb-6">
          <h3 className="font-semibold text-lg mb-4">Como Vamos Facilitar Isso</h3>
          <div className="space-y-3">
            {planoEnergetico.facilitadores.map((facilitador, idx) => (
              <div key={idx} className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-muted-foreground">{facilitador}</p>
              </div>
            ))}
          </div>
        </div>
        
        {/* Aviso de Segurança */}
        {planoEnergetico.avisoSeguranca && (
          <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900 rounded-lg p-4 mb-6">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-amber-800 dark:text-amber-200">
                {planoEnergetico.avisoSeguranca}
              </p>
            </div>
          </div>
        )}
        
        {/* Disclaimer */}
        <div className="bg-muted/50 border rounded-lg p-4 text-center">
          <p className="text-xs text-muted-foreground">
            <strong>Importante:</strong> Não iniciamos dietas restritivas sem avaliação. 
            Estes números orientam a conversa para definir um plano{" "}
            <strong>seguro e sustentável</strong>.
          </p>
        </div>
      </div>
    </div>
  );
};
