import { TransformacaoOutput } from "@/types/quiz";
import { Zap, Moon, Smile, Activity, Sparkles, Droplet } from "lucide-react";

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
  
  return (
    <div className="py-8 md:py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-6 md:mb-8">
          <h2 className="text-xl md:text-2xl lg:text-3xl font-bold mb-2">
            Índice de Qualidade de Vida (QLI)
          </h2>
          <p className="text-sm md:text-base text-muted-foreground">
            Evolução esperada em 6–12 meses
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
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
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-xl text-primary">{data.meta}/10</span>
                      <span className="text-sm text-primary font-medium">+{gain} pts</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
