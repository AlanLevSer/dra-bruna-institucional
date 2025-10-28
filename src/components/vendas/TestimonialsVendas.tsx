import { GrafismoDecor } from "@/components/GrafismoDecor";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Maria Silva",
    age: "45 anos",
    text: "Perdi 22 kg com o balão e aprendi a comer de verdade. Hoje mantenho o peso sem sofrimento. A equipe esteve comigo em cada etapa.",
    rating: 5,
  },
  {
    name: "Ana Paula",
    age: "38 anos",
    text: "Não foi só o balão, foi uma transformação completa. A diferença está no acompanhamento multidisciplinar — você não fica sozinha.",
    rating: 5,
  },
  {
    name: "Juliana Costa",
    age: "52 anos",
    text: "Tentei dietas a vida toda sem sucesso duradouro. Com o programa, finalmente consegui. São 18 kg a menos e muita saúde ganha.",
    rating: 5,
  },
];

export const TestimonialsVendas = () => {
  return (
    <section className="relative py-16 md:py-20 bg-muted/30 overflow-hidden">
      <GrafismoDecor variant="background" position="top-right" size="lg" opacity={0.15} />

      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">
            O que nossas pacientes dizem
          </h2>
          <p className="text-lg text-muted-foreground">
            Histórias reais de quem transformou a vida com o balão intragástrico e o Programa LevSer.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.name}
              className="bg-card rounded-xl p-6 shadow-elegant hover:shadow-hover hover:-translate-y-1 transition-all"
            >
              <div className="flex gap-1 mb-4">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-accent text-accent" />
                ))}
              </div>
              <p className="text-xs md:text-sm italic text-foreground mb-4 leading-relaxed">
                "{testimonial.text}"
              </p>
              <div className="border-t pt-4">
                <p className="text-xs font-semibold text-foreground">{testimonial.name}</p>
                <p className="text-[11px] text-muted-foreground">{testimonial.age}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="max-w-md mx-auto bg-card rounded-xl p-6 shadow-elegant text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <div className="flex gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-accent text-accent" />
              ))}
            </div>
          </div>
          <p className="text-2xl font-bold text-primary mb-1">4,9/5,0</p>
          <p className="text-sm text-muted-foreground">Baseado em mais de 3000 avaliações.</p>
        </div>
      </div>
    </section>
  );
};
