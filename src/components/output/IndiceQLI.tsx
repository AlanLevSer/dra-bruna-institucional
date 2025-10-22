import { TransformacaoOutput } from "@/types/quiz";
import { Zap, Moon, Smile, Activity, Sparkles, Droplet, TrendingUp } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface IndiceQLIProps {
  qli: TransformacaoOutput['qli'];
}

export const IndiceQLI = ({ qli }: IndiceQLIProps) => {
  const items = [
    { key: 'energia', label: 'Energia', icon: Zap },
    { key: 'sono', label: 'Sono', icon: Moon },
    { key: 'humor', label: 'Humor', icon: Smile },
    { key: 'mobilidade', label: 'Mobilidade', icon: Activity },
    { key: 'autoconfianca', label: 'Autoconfiança', icon: Sparkles },
    { key: 'metabolico', label: 'Metabólico', icon: Droplet }
  ] as const;
  
  // Calcular ganho total
  const totalGain = items.reduce((acc, { key }) => {
    const data = qli[key];
    return acc + (data.meta - data.baseline);
  }, 0);
  
  return (
    <div className="py-8 md:py-12 px-4 bg-gradient-to-b from-muted/20 to-background">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-6 md:mb-8">
          <h2 className="text-xl md:text-2xl lg:text-3xl font-bold mb-3">
            Como Sua Qualidade de Vida Vai Evoluir
          </h2>
          <p className="text-base md:text-lg text-muted-foreground max-w-3xl mx-auto">
            Estas são as melhorias que você pode esperar nos próximos 6–12 meses.
          </p>
          <p className="text-sm md:text-base text-primary font-semibold mt-2">
            É isso que você está investindo: viver melhor todos os dias.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-8">
          {items.map(({ key, label, icon: Icon }) => {
            const data = qli[key];
            const gain = data.meta - data.baseline;
            const progress = (data.meta / 10) * 100;
            
            return (
              <div 
                key={key}
                className="p-6 rounded-lg border bg-card hover:shadow-lg transition-shadow animate-in slide-in-from-left duration-700"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="font-semibold text-lg">{label}</h3>
                </div>
                
                <div className="space-y-3">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-muted-foreground">Hoje</span>
                    <span className="font-bold text-lg">{data.baseline}/10</span>
                  </div>
                  
                  <div className="relative h-3 bg-muted rounded-full overflow-hidden">
                    <div 
                      className="absolute h-full bg-gradient-to-r from-primary to-primary/80 transition-all duration-1000 ease-out"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Meta</span>
                    <div className="flex items-center gap-3">
                      <span className="font-bold text-2xl text-primary">{data.meta}/10</span>
                      
                      {/* NOVO: Badge de ganho */}
                      <div className="flex items-center gap-1 px-3 py-1.5 bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800 rounded-full">
                        <TrendingUp className="w-4 h-4 text-green-600 dark:text-green-500" />
                        <span className="text-sm font-bold text-green-700 dark:text-green-400">+{gain} pts</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        
        {/* NOVO: Summary card com ganho total */}
        <Card className="mt-8 bg-gradient-to-br from-primary/10 to-primary/5 border-2 border-primary/20">
          <CardContent className="p-6 md:p-8">
            <div className="text-center">
              <h3 className="text-xl font-bold mb-2">Ganho Total de Qualidade de Vida</h3>
              <div className="flex items-center justify-center gap-2 mb-3">
                <span className="text-4xl md:text-5xl font-bold text-primary">
                  +{totalGain} pontos
                </span>
                <span className="text-lg text-muted-foreground">em 6 áreas</span>
              </div>
              <p className="text-sm md:text-base text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                Imagine acordar com mais energia, dormir profundamente, se movimentar sem dor, 
                e se olhar no espelho com confiança. <strong className="text-foreground">Isso tem preço?</strong>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
