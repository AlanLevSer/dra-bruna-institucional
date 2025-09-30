import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Syringe, Activity, Pill, Stethoscope } from "lucide-react";

const procedures = [
  {
    icon: Syringe,
    title: "Balão Intragástrico",
    description: "Procedimento não cirúrgico que auxilia na redução do apetite e promove saciedade precoce.",
  },
  {
    icon: Activity,
    title: "Endoscopia Bariátrica",
    description: "Técnica endoscópica minimamente invasiva para redução do estômago e perda de peso.",
  },
  {
    icon: Pill,
    title: "Farmacoterapia Avançada",
    description: "Medicações modernas e seguras para controle de peso, prescritas com acompanhamento rigoroso.",
  },
  {
    icon: Stethoscope,
    title: "Avaliação Metabólica",
    description: "Exames completos para identificar fatores que podem estar dificultando a perda de peso.",
  },
];

export const Procedimentos = () => {
  return (
    <section id="procedimentos" className="py-24 bg-card">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16 animate-fade-in">
          <div className="inline-block px-4 py-2 bg-secondary/10 rounded-full mb-4">
            <span className="text-sm font-medium text-secondary">Tratamentos Avançados</span>
          </div>
          
          <h2 className="text-4xl lg:text-5xl font-serif font-bold text-foreground mb-6">
            Procedimentos Especializados
          </h2>
          
          <p className="text-lg text-muted-foreground leading-relaxed">
            Tecnologia de ponta combinada com expertise médica para oferecer 
            as melhores soluções em tratamento da obesidade.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {procedures.map((procedure, index) => (
            <Card
              key={index}
              className="group hover:shadow-hover transition-all duration-300 border-border/50 animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <procedure.icon className="text-primary" size={24} />
                </div>
                <CardTitle className="text-xl font-serif">{procedure.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  {procedure.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
