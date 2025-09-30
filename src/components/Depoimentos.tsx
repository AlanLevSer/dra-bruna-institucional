import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";

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
    <section id="depoimentos" className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16 animate-fade-in">
          <div className="inline-block px-4 py-2 bg-primary/10 rounded-full mb-4">
            <span className="text-sm font-medium text-primary">Histórias Reais</span>
          </div>
          
          <h2 className="text-4xl lg:text-5xl font-serif font-bold text-foreground mb-6">
            O que dizem nossos pacientes
          </h2>
          
          <p className="text-lg text-muted-foreground leading-relaxed">
            Transformações que vão além dos números na balança. 
            Vidas que foram impactadas de forma positiva e duradoura.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card
              key={index}
              className="hover:shadow-hover transition-all duration-300 border-border/50 animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardContent className="pt-6">
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star key={i} className="fill-accent text-accent" size={18} />
                  ))}
                </div>
                
                <p className="text-foreground/90 leading-relaxed mb-6 italic">
                  "{testimonial.content}"
                </p>
                
                <div className="pt-4 border-t border-border/50">
                  <p className="font-semibold text-foreground">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12 animate-fade-in" style={{ animationDelay: "0.3s" }}>
          <div className="inline-flex items-center gap-2 bg-card px-6 py-4 rounded-full shadow-elegant">
            <Star className="fill-accent text-accent" size={24} />
            <div className="text-left">
              <p className="text-2xl font-serif font-bold text-foreground">4.9/5.0</p>
              <p className="text-sm text-muted-foreground">Avaliação média dos pacientes</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
