import { TransformacaoOutput } from "@/types/quiz";
import { MapPin, Target, TrendingUp, Award } from "lucide-react";

interface RoadmapFasesProps {
  roadmap: TransformacaoOutput['roadmap'];
}

export const RoadmapFases = ({ roadmap }: RoadmapFasesProps) => {
  const icons = [MapPin, Target, TrendingUp, Award];
  
  return (
    <div className="py-8 md:py-12 px-4 bg-muted/20">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-xl md:text-2xl lg:text-3xl font-bold mb-2">
            Roadmap em 4 Fases
          </h2>
          <p className="text-sm md:text-base text-muted-foreground">
            Seu caminho estruturado rumo à transformação
          </p>
        </div>
        
        <div className="relative">
          {/* Timeline line - hidden on mobile */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-1 bg-primary/20 -translate-x-1/2" />
          
          <div className="space-y-8">
            {roadmap.map((fase, index) => {
              const Icon = icons[index];
              const isEven = index % 2 === 0;
              
              return (
                <div 
                  key={fase.fase}
                  className={`relative flex flex-col md:flex-row items-center gap-8 ${
                    isEven ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                >
                  {/* Content Card */}
                  <div className={`flex-1 ${isEven ? 'md:text-right' : 'md:text-left'}`}>
                    <div className="p-6 rounded-lg border bg-card shadow-lg hover:shadow-xl transition-shadow animate-in slide-in-from-left duration-700">
                      <div className="flex items-center gap-3 mb-3">
                        <div className={`p-3 rounded-lg bg-primary/10 ${isEven ? 'md:ml-auto' : ''}`}>
                          <Icon className="w-6 h-6 text-primary" />
                        </div>
                        <div className={isEven ? 'md:order-first md:text-right' : ''}>
                          <h3 className="text-xl font-bold">{fase.titulo}</h3>
                          <p className="text-sm text-primary font-medium">{fase.duracao}</p>
                        </div>
                      </div>
                      
                      <p className="text-muted-foreground mb-4">
                        {fase.objetivo}
                      </p>
                      
                      <ul className={`space-y-2 ${isEven ? 'md:text-right' : ''}`}>
                        {fase.entregas.map((entrega, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <span className={`text-primary font-bold ${isEven ? 'md:order-last md:ml-2' : 'md:mr-2'}`}>✓</span>
                            <span className="text-sm">{entrega}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  
                  {/* Center Badge - hidden on mobile */}
                  <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 w-16 h-16 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold text-xl shadow-lg z-10">
                    {fase.fase}
                  </div>
                  
                  {/* Mobile Badge */}
                  <div className="md:hidden flex w-12 h-12 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold shadow-lg">
                    {fase.fase}
                  </div>
                  
                  {/* Spacer for desktop */}
                  <div className="hidden md:block flex-1" />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
