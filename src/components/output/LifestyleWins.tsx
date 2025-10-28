import { TransformacaoOutput } from "@/types/quiz";
import { Moon, Droplet, Dumbbell, Smartphone, ChefHat, Check } from "lucide-react";

interface LifestyleWinsProps {
  lifestyleWins: TransformacaoOutput['lifestyleWins'];
}

export const LifestyleWins = ({ lifestyleWins }: LifestyleWinsProps) => {
  const iconMap: Record<string, any> = {
    Moon,
    Droplet,
    Dumbbell,
    Smartphone,
    ChefHat
  };
  
  return (
    <div className="py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold mb-2">
            Lifestyle Wins
          </h2>
          <p className="text-muted-foreground">
            Microvitórias que constroem transformações duradouras
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-6">
          {lifestyleWins.map((win, index) => {
            const Icon = iconMap[win.icon] || Check;
            
            return (
              <div
                key={index}
                className="flex items-start gap-4 p-6 rounded-lg border bg-card hover:shadow-lg transition-all group"
              >
                <div className="p-3 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-lg mb-1">{win.titulo}</h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    Meta: {win.frequencia}
                  </p>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-primary to-primary/80"
                      style={{ width: '75%' }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        
        <div className="mt-8 p-6 rounded-lg bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20">
          <div className="flex items-start gap-4">
            <Check className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-semibold mb-2">Check-ins Semanais Gamificados</h3>
              <p className="text-sm text-muted-foreground">
                Acompanhe seu progresso com check-ins semanais, celebre suas vitórias e ajuste 
                o que for necessário. Cada pequena conquista te aproxima da transformação completa.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
/* eslint-disable @typescript-eslint/no-explicit-any */
