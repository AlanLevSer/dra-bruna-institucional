/* eslint-disable react-refresh/only-export-components */
import { LucideIcon, Flame, Stethoscope, Trophy } from "lucide-react";
import { GrafismoDecor } from "@/components/GrafismoDecor";

interface CasoDeUso {
  icon: LucideIcon;
  titulo: string;
  problema: string;
  solucao: string;
  beneficios: string[];
}

interface CasosDeUsoProps {
  casos: CasoDeUso[];
}

export const CasosDeUso = ({ casos }: CasosDeUsoProps) => {
  return (
    <section className="relative py-16 bg-muted/30 overflow-hidden">
      <GrafismoDecor variant="background" position="top-left" size="lg" opacity={0.15} rotate={25} color="gray" />
      <div className="container mx-auto px-4 relative z-10">
        <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-4 text-center">
          Casos de Uso EspecÃ­ficos
        </h2>
        <p className="text-lg text-muted-foreground mb-12 max-w-3xl mx-auto text-center">
          Programas personalizados para diferentes perfis e necessidades
        </p>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {casos.map((caso, index) => {
            const Icon = caso.icon;
            return (
              <div
                key={index}
                className="bg-card rounded-2xl p-6 shadow-elegant hover:shadow-lg transition-all duration-300 border border-border/50"
              >
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Icon className="w-7 h-7 text-primary" />
                </div>
                
                <h3 className="text-xl font-serif font-bold text-foreground mb-3">
                  {caso.titulo}
                </h3>
                
                <div className="space-y-4">
                  <div>
                    <p className="text-sm font-medium text-destructive mb-2">Desafio:</p>
                    <p className="text-sm text-muted-foreground">{caso.problema}</p>
                  </div>
                  
                  <div>
                    <p className="text-sm font-medium text-primary mb-2">SoluÃ§Ã£o:</p>
                    <p className="text-sm text-muted-foreground">{caso.solucao}</p>
                  </div>
                  
                  <div>
                    <p className="text-sm font-medium text-foreground mb-2">BenefÃ­cios:</p>
                    <ul className="space-y-1">
                      {caso.beneficios.map((beneficio, idx) => (
                        <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
                          <span className="text-primary mt-0.5">â€¢</span>
                          <span>{beneficio}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

// Dados padrÃ£o para Medicina Regenerativa
export const casosDeUsoRegenerativa: CasoDeUso[] = [
  {
    icon: Flame,
    titulo: "Menopausa & ClimatÃ©rio",
    problema: "Ganho de peso, fadiga, resistÃªncia metabÃ³lica, queda de massa magra",
    solucao: "Programas regenerativos para modular inflamaÃ§Ã£o, preservar mÃºsculo e otimizar energia",
    beneficios: [
      "Controle de peso facilitado",
      "Mais disposiÃ§Ã£o e foco",
      "Sono e humor melhores",
      "PreservaÃ§Ã£o de massa muscular"
    ]
  },
  {
    icon: Stethoscope,
    titulo: "PÃ³s-BariÃ¡trica",
    problema: "DeficiÃªncias nutricionais severas, fadiga crÃ´nica, queda de cabelo, anemia",
    solucao: "RepleÃ§Ã£o estratÃ©gica intravenosa e via oral para recuperar marcadores e qualidade de vida",
    beneficios: [
      "Energia restaurada",
      "RecuperaÃ§Ã£o capilar e unhas",
      "Imunidade fortalecida",
      "ManutenÃ§Ã£o do peso saudÃ¡vel"
    ]
  },
  {
    icon: Trophy,
    titulo: "Atletas & Performance",
    problema: "Dificuldade de reduzir gordura sem perder performance ou massa magra",
    solucao: "Programas de composiÃ§Ã£o corporal + recuperaÃ§Ã£o acelerada + energia limpa",
    beneficios: [
      "ManutenÃ§Ã£o de forÃ§a",
      "RecuperaÃ§Ã£o mais rÃ¡pida",
      "Foco mental sustentado",
      "Controle de inflamaÃ§Ã£o pÃ³s-treino"
    ]
  }
];

