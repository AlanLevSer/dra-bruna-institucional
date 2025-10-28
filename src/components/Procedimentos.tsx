import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Syringe, Activity, Zap, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { GrafismoDecor } from "@/components/GrafismoDecor";

const procedures = [
  {
    icon: Syringe,
    title: "Balão Intragástrico",
    description: "Procedimento não cirúrgico que auxilia na redução do apetite e promove saciedade precoce.",
    link: "/balão-intragastrico",
  },
  {
    icon: Activity,
    title: "Gastroplastia Endoscópica",
    description: "Técnica endoscópica minimamente invasiva para redução do estômago e perda de peso.",
    link: "/gastroplastia-endoscopica",
  },
  {
    icon: Zap,
    title: "Plasma de Argônio",
    description: "Técnica endoscópica avançada para tratamento de reganho de peso e dilatação gástrica.",
    link: "/plasma-argonio",
  },
];

export const Procedimentos = () => {
  const navigate = useNavigate();

  return (
    <section id="procedimentos" className="relative py-12 xl:py-16 bg-card overflow-hidden">
      <GrafismoDecor variant="background" position="center" size="xl" opacity={0.15} rotate={0} color="gray" />
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-10 animate-fade-in">
          <div className="inline-block px-4 py-2 bg-secondary/10 rounded-full mb-4">
            <span className="text-sm font-medium text-secondary">Tratamentos Avançados</span>
          </div>
          
          <h2 className="text-4xl lg:text-5xl font-serif font-bold text-foreground mb-6">
            Procedimentos Endoscópicos
          </h2>
          
          <p className="text-lg text-muted-foreground leading-relaxed">
            Tecnologia de ponta combinada com expertise médica para oferecer 
            as melhores soluções em tratamento da obesidade.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {procedures.map((procedure, index) => (
            <Card
              key={index}
              className="group hover:shadow-hover transition-all duration-300 border-border/50 animate-fade-in cursor-pointer"
              style={{ animationDelay: `${index * 0.1}s` }}
              onClick={() => navigate(procedure.link)}
            >
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors group-hover:scale-110 duration-300">
                  <procedure.icon className="text-primary" size={24} />
                </div>
                <CardTitle className="text-xl font-serif group-hover:text-primary transition-colors">{procedure.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground leading-relaxed">
                  {procedure.description}
                </p>
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full group/btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(procedure.link);
                  }}
                >
                  Saiba mais
                  <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
