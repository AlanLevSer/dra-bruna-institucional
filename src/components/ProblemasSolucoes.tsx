import { TrendingDown, ShieldAlert, Apple } from "lucide-react";

interface ProblemaItem {
  problema: string;
  descricao: string;
  icon: typeof TrendingDown;
}

const problemas: ProblemaItem[] = [
  {
    problema: "Perco peso mas sempre volta",
    descricao: "Você faz dieta, emagrece, mas em poucos meses o peso retorna — muitas vezes maior que antes",
    icon: TrendingDown
  },
  {
    problema: "Tenho medo de cirurgia",
    descricao: "Cirurgia bariátrica te assusta pelos riscos, internação e mudanças irreversíveis",
    icon: ShieldAlert
  },
  {
    problema: "Não consigo controlar a fome",
    descricao: "A sensação de fome é constante e você não consegue se sentir satisfeita mesmo comendo",
    icon: Apple
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
              className="relative bg-card/80 backdrop-blur-sm p-8 rounded-2xl shadow-elegant hover:shadow-hover transition-all duration-500 hover:-translate-y-2 animate-fade-in opacity-0 border border-primary/20 group overflow-hidden"
              style={{ 
                animationDelay: `${index * 0.15}s`,
                animationFillMode: "forwards"
              }}
            >
              {/* Glow effect ao hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />
              
              <div className="relative z-10">
                {/* Ícone com gradiente e glow */}
                <div className="relative w-20 h-20 mx-auto mb-6">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-secondary/30 rounded-full blur-lg group-hover:blur-xl transition-all duration-500" />
                  <div className="relative w-full h-full bg-card/80 backdrop-blur-sm border-2 border-primary/30 rounded-full flex items-center justify-center shadow-elegant group-hover:scale-110 transition-transform duration-500">
                    <item.icon className="w-10 h-10 text-primary" strokeWidth={1.5} />
                  </div>
                </div>

                <h3 className="text-xl font-serif font-bold text-foreground mb-3">
                  {item.problema}
                </h3>
                
                {/* Linha divisória elegante */}
                <div className="w-12 h-0.5 bg-gradient-to-r from-primary/50 to-transparent mx-auto mb-4" />
                
                <p className="text-muted-foreground leading-relaxed">
                  {item.descricao}
                </p>
              </div>
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
