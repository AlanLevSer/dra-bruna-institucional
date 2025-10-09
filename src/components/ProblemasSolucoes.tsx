import { Scale, Scissors, UtensilsCrossed } from "lucide-react";

interface ProblemaItem {
  emoji: string;
  problema: string;
  descricao: string;
  icon: typeof Scale;
}

const problemas: ProblemaItem[] = [
  {
    emoji: "😔",
    problema: "Perco peso mas sempre volta",
    descricao: "Você faz dieta, emagrece, mas em poucos meses o peso retorna — muitas vezes maior que antes",
    icon: Scale
  },
  {
    emoji: "😰",
    problema: "Tenho medo de cirurgia",
    descricao: "Cirurgia bariátrica te assusta pelos riscos, internação e mudanças irreversíveis",
    icon: Scissors
  },
  {
    emoji: "🍽️",
    problema: "Não consigo controlar a fome",
    descricao: "A sensação de fome é constante e você não consegue se sentir satisfeita mesmo comendo",
    icon: UtensilsCrossed
  }
];

export const ProblemasSolucoes = () => {
  return (
    <section className="py-16 xl:py-20 bg-gradient-to-b from-background to-muted/30 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 animate-fade-in">
          <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
            Você não está sozinha
          </span>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-4">
            Você já tentou de tudo?
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-8">
            Já fez dieta mil vezes e o peso sempre volta?<br />
            Tem medo de cirurgia ou não se qualifica?<br />
            Sente que precisa de mais do que força de vontade?
          </p>
          <p className="text-xl text-foreground font-medium max-w-2xl mx-auto">
            A frustração de emagrecer e ver o peso voltar <span className="text-primary">não é culpa sua</span>.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {problemas.map((item, index) => (
            <div
              key={index}
              className="bg-card p-8 rounded-xl shadow-elegant hover:shadow-hover transition-all duration-300 hover-lift animate-fade-in opacity-0 border border-border/50"
              style={{ 
                animationDelay: `${index * 0.15}s`,
                animationFillMode: "forwards"
              }}
            >
              <div className="text-5xl mb-4 animate-pulse-soft">
                {item.emoji}
              </div>
              <h3 className="text-xl font-serif font-bold text-foreground mb-3">
                {item.problema}
              </h3>
              <p className="text-muted-foreground">
                {item.descricao}
              </p>
            </div>
          ))}
        </div>

        <div className="max-w-3xl mx-auto mt-12 bg-primary/5 border border-primary/20 rounded-2xl p-8 animate-fade-in" style={{ animationDelay: "0.5s" }}>
          <p className="text-lg text-foreground text-center leading-relaxed">
            O problema é que <strong>dietas sozinhas não resolvem a causa da fome descontrolada</strong>. 
            Você precisa de <span className="text-primary font-semibold">suporte físico real + mudança de hábitos</span>.
          </p>
        </div>
      </div>
    </section>
  );
};
