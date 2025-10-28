import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Activity, Syringe, Zap, Microscope, Apple, Flame } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { LucideIcon } from "lucide-react";

interface Tratamento {
  icon: LucideIcon;
  title: string;
  description: string;
  link: string;
  category: "endoscopico" | "emagrecimento_longevidade";
}

const tratamentos: Tratamento[] = [
  {
    icon: Activity,
    title: "Balão Intragástrico",
    description: "Dispositivo temporário que reduz a capacidade gástrica, promovendo saciedade precoce. Ideal para quem busca perda de 10-25% do peso.",
    link: "/balão-intragastrico",
    category: "endoscopico"
  },
  {
    icon: Activity,
    title: "Gastroplastia Endoscópica",
    description: "Redução do estômago por via endoscópica, sem cortes externos. Recuperação rápida e resultados consistentes.",
    link: "/gastroplastia-endoscopica",
    category: "endoscopico"
  },
  {
    icon: Flame,
    title: "Plasma de Argônio",
    description: "Tratamento endoscópico para reganho de peso pós-cirurgia bariátrica. Técnica minimamente invasiva e eficaz.",
    link: "/plasma-argonio",
    category: "endoscopico"
  },
  {
    icon: Syringe,
    title: "Canetas Emagrecedoras",
    description: "Mounjaro, Ozempic, Wegovy e Saxenda. Controle avançado da fome com acompanhamento médico personalizado.",
    link: "/canetas-emagrecedoras",
    category: "emagrecimento_longevidade"
  },
  {
    icon: Microscope,
    title: "Medicina Regenerativa",
    description: "Otimização metabólica, hormonal e celular. Mais energia, menos inflamação, preservação muscular.",
    link: "/medicina-regenerativa",
    category: "emagrecimento_longevidade"
  },
  {
    icon: Apple,
    title: "Nutrição Celular",
    description: "Suplementação personalizada e terapia nutricional avançada para resultados superiores.",
    link: "/nutricao-celular",
    category: "emagrecimento_longevidade"
  }
];

interface TratamentosGridProps {
  category?: "endoscopico" | "emagrecimento_longevidade";
  showAll?: boolean;
}

export const TratamentosGrid = ({ category, showAll = false }: TratamentosGridProps) => {
  const navigate = useNavigate();
  
  const filtered = showAll 
    ? tratamentos 
    : category 
    ? tratamentos.filter(t => t.category === category)
    : tratamentos;

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {filtered.map((tratamento) => {
        const Icon = tratamento.icon;
        return (
          <Card 
            key={tratamento.link}
            className="group cursor-pointer hover:shadow-hover transition-all duration-300 hover:-translate-y-1"
            onClick={() => navigate(tratamento.link)}
          >
            <CardHeader>
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <Icon className="w-7 h-7 text-primary" />
              </div>
              <CardTitle className="text-lg">{tratamento.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-sm mb-4">
                {tratamento.description}
              </CardDescription>
              <Button variant="ghost" size="sm" className="group/btn p-0 h-auto">
                Saiba mais
                <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
              </Button>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};
