import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";
import { GrafismoDecor } from "@/components/GrafismoDecor";

const testimonials = [
  {
    name: "Maria Silva",
    role: "Paciente desde 2022",
    content: "A Dra. Bruna mudou minha vida. Pela primeira vez senti que alguém realmente entendia minhas dificuldades e me ajudou de forma humanizada. Perdi 28kg e ganhei saúde e autoestima.",
    rating: 5,
  },
  {
    name: "João Santos",
    role: "Programa LevSer",
    content: "O acompanhamento é impecável. A doutora está sempre disponível e o programa é completo. Não é só sobre perder peso, é sobre aprender a viver melhor. Recomendo de olhos fechados.",
    rating: 5,
  },
  {
    name: "Ana Carolina",
    role: "Paciente desde 2021",
    content: "Tentei várias vezes emagrecer sozinha e sempre voltava ao peso anterior. Com o tratamento da Dra. Bruna, entendi meu metabolismo e hoje mantenho meu peso de forma natural. Gratidão define!",
    rating: 5,
  },
];

export const Depoimentos = () => {
  return (
    <section id="depoimentos" className="relative py-8 xl:py-10 bg-muted/30 overflow-hidden">
      <GrafismoDecor variant="background" position="top-right" size="lg" opacity={0.18} rotate={-20} color="gray" />
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-6 xl:mb-8 animate-fade-in">
          <div className="inline-block px-3.5 py-1.5 bg-primary/10 rounded-full mb-3">
            <span className="text-xs font-medium text-primary">Histórias Reais</span>
          </div>
          
          <h2 className="text-2xl md:text-3xl xl:text-4xl font-serif font-bold text-foreground mb-4">
            O que dizem nossos pacientes
          </h2>
          
          <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
            Transformações que vão além dos números na balança. 
            Vidas que foram impactadas de forma positiva e duradoura.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-5 xl:gap-6 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <Card
              key={index}
              className="hover:shadow-hover hover:-translate-y-1 transition-all duration-300 border-border/50 animate-fade-in group"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardContent className="pt-4 px-4 pb-4">
                <div className="flex gap-0.5 mb-3">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star key={i} className="fill-accent text-accent group-hover:scale-110 transition-transform" size={16} />
                  ))}
                </div>
                
                <p className="text-xs md:text-sm text-foreground/90 leading-relaxed mb-4 italic">
                  "{testimonial.content}"
                </p>
                
                <div className="pt-2.5 border-t border-border/50">
                  <p className="font-semibold text-xs md:text-sm text-foreground">{testimonial.name}</p>
                  <p className="text-[11px] md:text-xs text-muted-foreground">{testimonial.role}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-10 animate-fade-in" style={{ animationDelay: "0.3s" }}>
          <div className="inline-flex items-center gap-2 bg-card px-5 py-3 rounded-full shadow-elegant">
            <Star className="fill-accent text-accent" size={20} />
            <div className="text-left">
              <p className="text-xl font-serif font-bold text-foreground">4.9/5.0</p>
              <p className="text-xs text-muted-foreground">Avaliação média dos pacientes</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
