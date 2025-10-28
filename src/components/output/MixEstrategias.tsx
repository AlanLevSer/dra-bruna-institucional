import { TransformacaoOutput } from "@/types/quiz";
import { Utensils, Dumbbell, Brain, Sparkles, Syringe, Scissors, Shield, Lightbulb, Zap } from "lucide-react";

interface MixEstrategiasProps {
  mixEstrategias: TransformacaoOutput['mixEstrategias'];
}

export const MixEstrategias = ({ mixEstrategias }: MixEstrategiasProps) => {
  const icons: Record<string, any> = {
    "Nutrição Inteligente": Utensils,
    "Corpo em Movimento": Dumbbell,
    "Mente & Comportamento": Brain,
    "Saúde Regenerativa": Sparkles,
    "Prevenção de Recaída": Shield
  };
  
  const intervencaoIcons: Record<string, any> = {
    gastroplastia: Scissors,
    balão_6m: Syringe,
    balão_12m: Syringe,
    injetaveis: Syringe,
    plasma_argonio: Zap
  };
  
  const enfaseColors = {
    alta: 'border-l-4 border-primary bg-primary/5',
    media: 'border-l-4 border-primary/50 bg-primary/[0.02]',
    baixa: 'border-l-2 border-muted bg-background'
  };
  
  return (
    <div className="py-8 md:py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-xl md:text-2xl lg:text-3xl font-bold mb-2">
            Mix de Estratégias Personalizado
          </h2>
          <p className="text-sm md:text-base text-muted-foreground">
            Seu plano integrado para transformação sustentável
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-6 md:mb-8">
          {mixEstrategias.pilares.map((pilar) => {
            const Icon = icons[pilar.nome];
            
            return (
              <div
                key={pilar.nome}
                className={`p-6 rounded-lg border transition-all hover:shadow-lg ${enfaseColors[pilar.enfase]}`}
              >
                <div className="flex items-start gap-4">
                  <div className={`p-3 rounded-lg ${
                    pilar.enfase === 'alta' ? 'bg-primary/10' : 'bg-muted'
                  }`}>
                    <Icon className={`w-6 h-6 ${
                      pilar.enfase === 'alta' ? 'text-primary' : 'text-muted-foreground'
                    }`} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-bold text-lg">{pilar.nome}</h3>
                      {pilar.enfase === 'alta' && (
                        <span className="px-2 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">
                          Alta Ênfase
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {pilar.descricao}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        
        {mixEstrategias.microcopy && (
          <div className="bg-primary/5 border-l-4 border-primary p-4 mb-6 rounded-r-lg">
            <p className="text-sm text-muted-foreground">{mixEstrategias.microcopy}</p>
          </div>
        )}
        
        {mixEstrategias.intervencao && (
          <div className="relative p-6 md:p-8 rounded-lg border-2 border-primary bg-gradient-to-br from-primary/5 to-primary/10 shadow-lg">
            {mixEstrategias.intervencao.badgeRecuperacao && (
              <div className="absolute top-4 right-4">
                <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">
                  {mixEstrategias.intervencao.badgeRecuperacao}
                </span>
              </div>
            )}
            <div className="flex flex-col md:flex-row items-start gap-6">
              <div className="p-4 rounded-lg bg-primary/20">
                {(() => {
                  const IntervencaoIcon = intervencaoIcons[mixEstrategias.intervencao.tipo];
                  return <IntervencaoIcon className="w-8 h-8 text-primary" />;
                })()}
              </div>
              <div className="flex-1">
                <div className="flex flex-col md:flex-row md:items-center gap-2 mb-2">
                  <h3 className="text-xl font-bold">
                    Intervenção Sugerida
                  </h3>
                  {mixEstrategias.intervencao.tipo === 'gastroplastia' && (
                    <span className="px-3 py-1 rounded-full bg-green-500/10 text-green-600 text-xs font-medium w-fit">
                      Procedimento Endoscópico
                    </span>
                  )}
                </div>
                <p className="text-lg font-semibold text-primary mb-2">
                  {mixEstrategias.intervencao.nome}
                </p>
                <p className="text-muted-foreground">
                  {mixEstrategias.intervencao.justificativa}
                </p>
                <div className="mt-4 p-4 rounded-lg bg-background/50 border">
                  <div className="flex items-start gap-2 text-sm">
                    <Lightbulb className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
                    <p>
                      <strong>Por que sugerimos:</strong> Esta intervenção complementa os pilares estratégicos, 
                      acelerando seus resultados de forma segura e sustentável.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {mixEstrategias.alternativas && mixEstrategias.alternativas.length > 0 && (
          <div className="mt-8">
            <h4 className="text-lg font-semibold mb-4 text-muted-foreground">
              Outras Opções (com tempo de adaptação)
            </h4>
            <div className="space-y-4">
              {mixEstrategias.alternativas.map((alt, idx) => (
                <div key={idx} className="border border-border/50 rounded-lg p-4 bg-muted/20">
                  <div className="flex items-start justify-between mb-2">
                    <h5 className="font-semibold text-sm">{alt.nome}</h5>
                    <span className="px-2 py-1 bg-amber-100 text-amber-700 text-xs rounded">
                      {alt.badgeRecuperacao}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground mb-2">{alt.justificativa}</p>
                  <p className="text-xs text-muted-foreground italic">{alt.nota}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
/* eslint-disable @typescript-eslint/no-explicit-any */
