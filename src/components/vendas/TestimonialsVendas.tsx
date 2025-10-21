import { Star, Quote } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import { OptimizedImage } from "@/components/OptimizedImage";
import transformation1 from "@/assets/transformation-beginning.jpg";
import transformation2 from "@/assets/transformation-confidence.jpg";
import transformation3 from "@/assets/transformation-empowerment.jpg";
import transformation4 from "@/assets/transformation-health.jpg";
import transformation5 from "@/assets/transformation-joy.jpg";
import transformation6 from "@/assets/transformation-lifestyle.jpg";
import transformation7 from "@/assets/transformation-selfcare.jpg";
import transformation8 from "@/assets/transformation-success.jpg";
import transformation9 from "@/assets/transformation-wellness.jpg";

export const TestimonialsVendas = () => {
  const [emblaRef] = useEmblaCarousel({ loop: true, align: "start" });

  const testimonials = [
    {
      name: "Maria Silva",
      age: "45 anos",
      text: "Perdi 22kg com o balão e aprendi a comer de verdade. Hoje mantenho o peso sem sofrimento.",
      rating: 5,
    },
    {
      name: "Ana Paula",
      age: "38 anos",
      text: "A equipe me acompanhou em cada etapa. Não foi só o balão, foi uma transformação completa.",
      rating: 5,
    },
    {
      name: "Juliana Costa",
      age: "52 anos",
      text: "Tentei dieta a vida toda. Com o balão e o programa, finalmente consegui. São 18kg a menos e muita saúde ganha.",
      rating: 5,
    },
  ];

  const transformationImages = [
    { src: transformation1, alt: "Transformação 1" },
    { src: transformation2, alt: "Transformação 2" },
    { src: transformation3, alt: "Transformação 3" },
    { src: transformation4, alt: "Transformação 4" },
    { src: transformation5, alt: "Transformação 5" },
    { src: transformation6, alt: "Transformação 6" },
    { src: transformation7, alt: "Transformação 7" },
    { src: transformation8, alt: "Transformação 8" },
    { src: transformation9, alt: "Transformação 9" },
  ];

  return (
    <section className="py-16 md:py-20 bg-gradient-to-br from-background to-wellness-cream">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            O Que Nossas Pacientes Dizem
          </h2>
          <p className="text-lg text-muted-foreground">
            Histórias reais de pessoas que transformaram suas vidas com o balão intragástrico
          </p>
        </div>

        {/* Depoimentos */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-6 shadow-lg hover-lift"
            >
              <div className="flex gap-1 mb-4">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <Quote className="w-8 h-8 text-primary/30 mb-3" />
              <p className="text-foreground mb-4 leading-relaxed">
                "{testimonial.text}"
              </p>
              <div className="border-t pt-4">
                <p className="font-bold text-foreground">{testimonial.name}</p>
                <p className="text-sm text-muted-foreground">{testimonial.age}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Carrossel de Transformações */}
        <div className="mb-12">
          <h3 className="text-2xl font-bold text-center mb-6">
            Transformações Reais
          </h3>
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex gap-4">
              {transformationImages.map((image, index) => (
                <div
                  key={index}
                  className="flex-[0_0_300px] min-w-0 rounded-xl overflow-hidden shadow-md"
                >
                  <OptimizedImage
                    src={image.src}
                    alt={image.alt}
                    width={300}
                    height={400}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Vídeo Testimonial (Placeholder) */}
        <div className="bg-gradient-to-br from-primary/5 to-wellness-soft/30 rounded-2xl p-8 text-center">
          <h3 className="text-2xl font-bold mb-4">
            Assista ao Depoimento Completo de Maria
          </h3>
          <div className="aspect-video bg-muted rounded-xl flex items-center justify-center max-w-3xl mx-auto">
            <p className="text-muted-foreground">Vídeo em breve</p>
          </div>
        </div>
      </div>
    </section>
  );
};
