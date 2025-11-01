import { Check, Sparkles, Droplet } from "lucide-react";
import { Button } from "./ui/button";

interface BalãoOption {
  name: string;
  duration: string;
  color: string;
  ideal: string;
  perda: string;
  vantagens: string[];
  destaque?: boolean;
}

const baloesOptions: BalãoOption[] = [
  {
    name: "Balão 6 meses",
    duration: "6 meses",
    color: "from-green-500/20 to-green-600/20",
    ideal: "Ideal para iniciantes",
    perda: "15 - 25% do peso",
    vantagens: [
      "Adaptação mais rápida",
      "Procedimento mais curto",
      "Ótimo primeiro passo"
    ]
  },
  {
    name: "Balão 12 meses",
    duration: "12 meses",
    color: "from-blue-500/20 to-blue-600/20",
    ideal: "Resultado mais consolidado",
    perda: "15 - 30% do peso",
    vantagens: [
      "Mais tempo para criar hábitos",
      "Melhor custo-benefício",
      "Resultados mais duradouros"
    ],
    destaque: true
  },
  {
    name: "Balão Ajustável",
    duration: "12 meses",
    color: "from-purple-500/20 to-purple-600/20",
    ideal: "Máximo controle",
    perda: "15 - 35% do peso",
    vantagens: [
      "Volume modulável",
      "Ajuste conforme necessidade",
      "Menos desconfortos"
    ]
  }
];

export const ComparadorBaloes = () => {
  const scrollToSection = () => {
    const element = document.querySelector("#agendar");
    if (element) {
      const rootStyles = getComputedStyle(document.documentElement);
      const headerVar = rootStyles.getPropertyValue('--header-height').trim();
      const headerOffset = (parseInt(headerVar.replace('px','')) || 80) + 8;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
    }
  };

  return (
    <section className="py-16 xl:py-20 bg-muted/30 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 animate-fade-in">
          <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
            Opções Disponíveis
          </span>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-4">
            Qual balão é ideal para você?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Cada tipo de balão tem suas características — vamos encontrar o melhor para o seu momento
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {baloesOptions.map((balão, index) => (
            <div
              key={index}
              className={`relative bg-gradient-to-br ${balão.color} backdrop-blur-md rounded-2xl p-8 border border-white/20 shadow-[0_8px_24px_rgba(0,0,0,0.08)] hover:shadow-[0_16px_48px_rgba(202,124,95,0.15)] hover:scale-105 transition-all duration-500 animate-fade-in opacity-0 group`}
              style={{
                animationDelay: `${index * 0.15}s`,
                animationFillMode: "forwards"
              }}
            >
              {balão.destaque && (
                <>
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-primary via-secondary to-primary rounded-2xl opacity-75 blur-sm animate-gradient-shift -z-10" />
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-6 py-2 bg-gradient-to-r from-primary to-secondary text-primary-foreground rounded-full text-sm font-bold flex items-center gap-2 shadow-lg backdrop-blur-sm">
                    <span className="w-2 h-2 bg-primary-foreground rounded-full animate-pulse-soft" />
                    Mais escolhido
                  </div>
                </>
              )}

              {/* Ícone visual do balão */}
              <div className="relative w-24 h-24 mx-auto mb-6">
                <div className="absolute inset-0 bg-gradient-to-br from-white/30 to-white/10 rounded-full blur-lg" />
                <div className="relative w-full h-full bg-card/50 backdrop-blur-sm border-2 border-white/30 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                  <Droplet className="w-12 h-12 text-foreground" strokeWidth={1.5} />
                </div>
              </div>

              <div className="text-center mb-6">
                <h3 className="text-2xl font-serif font-bold text-foreground mb-2">
                  {balão.name}
                </h3>
                <p className="text-3xl font-bold text-primary mb-1">
                  {balão.duration}
                </p>
                <p className="text-sm text-muted-foreground">
                  {balão.ideal}
                </p>
              </div>

              <div className="bg-card/50 backdrop-blur-sm rounded-xl p-4 mb-6">
                <p className="text-sm text-muted-foreground mb-1">Perda de peso esperada</p>
                <p className="text-2xl font-bold text-foreground">
                  {balão.perda}
                </p>
              </div>

              <ul className="space-y-3 mb-6">
                {balão.vantagens.map((vantagem, vIndex) => (
                  <li key={vIndex} className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-muted-foreground">{vantagem}</span>
                  </li>
                ))}
              </ul>

              <Button 
                variant={balão.destaque ? "default" : "outline"} 
                className="w-full group"
                onClick={scrollToSection}
              >
                Saiba mais
                <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
              </Button>
            </div>
          ))}
        </div>

        <div className="text-center mt-12 animate-fade-in" style={{ animationDelay: "0.4s" }}>
          <p className="text-muted-foreground mb-4">
            Não sabe qual escolher? Nossa equipe te ajuda a decidir na pré-consulta
          </p>
          <Button size="lg" className="group" onClick={scrollToSection}>
            Agendar Pré-Consulta
            <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
          </Button>
        </div>
      </div>
    </section>
  );
};
