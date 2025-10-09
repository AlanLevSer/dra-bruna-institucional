import { Check, Sparkles } from "lucide-react";
import { Button } from "./ui/button";

interface BalaoOption {
  name: string;
  duration: string;
  color: string;
  ideal: string;
  perda: string;
  vantagens: string[];
  destaque?: boolean;
}

const baloesOptions: BalaoOption[] = [
  {
    name: "Balão 6 meses",
    duration: "6 meses",
    color: "from-green-500/20 to-green-600/20",
    ideal: "Ideal para iniciantes",
    perda: "10-15% do peso",
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
    perda: "15-20% do peso",
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
    perda: "15-25% do peso",
    vantagens: [
      "Volume modulável",
      "Ajuste conforme necessidade",
      "Menos desconfortos"
    ]
  }
];

export const ComparadorBaloes = () => {
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
          {baloesOptions.map((balao, index) => (
            <div
              key={index}
              className={`relative bg-gradient-to-br ${balao.color} backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover-lift transition-all duration-300 animate-fade-in opacity-0`}
              style={{ 
                animationDelay: `${index * 0.1}s`,
                animationFillMode: "forwards"
              }}
            >
              {balao.destaque && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-primary text-primary-foreground rounded-full text-sm font-medium flex items-center gap-1 animate-pulse-soft">
                  <Sparkles className="w-4 h-4" />
                  Mais escolhido
                </div>
              )}

              <div className="text-center mb-6">
                <h3 className="text-2xl font-serif font-bold text-foreground mb-2">
                  {balao.name}
                </h3>
                <p className="text-3xl font-bold text-primary mb-1">
                  {balao.duration}
                </p>
                <p className="text-sm text-muted-foreground">
                  {balao.ideal}
                </p>
              </div>

              <div className="bg-card/50 backdrop-blur-sm rounded-xl p-4 mb-6">
                <p className="text-sm text-muted-foreground mb-1">Perda de peso esperada</p>
                <p className="text-2xl font-bold text-foreground">
                  {balao.perda}
                </p>
              </div>

              <ul className="space-y-3 mb-6">
                {balao.vantagens.map((vantagem, vIndex) => (
                  <li key={vIndex} className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-muted-foreground">{vantagem}</span>
                  </li>
                ))}
              </ul>

              <Button 
                variant={balao.destaque ? "default" : "outline"} 
                className="w-full group"
              >
                Saiba mais
                <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
              </Button>
            </div>
          ))}
        </div>

        <div className="text-center mt-12 animate-fade-in" style={{ animationDelay: "0.4s" }}>
          <p className="text-muted-foreground mb-4">
            Não sabe qual escolher? Nossa equipe te ajuda a decidir na consulta de avaliação
          </p>
          <Button size="lg" className="group">
            Agendar Avaliação
            <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
          </Button>
        </div>
      </div>
    </section>
  );
};
