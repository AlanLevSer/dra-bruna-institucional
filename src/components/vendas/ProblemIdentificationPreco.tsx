import { Button } from "@/components/ui/button";
import { XCircle, TrendingDown, Clock, CheckCircle2 } from "lucide-react";
import { CONTACT } from "@/lib/constants";
import { openLeadChat } from "@/lib/leadChat";

const problems = [
  {
    icon: XCircle,
    text: "Quantas vezes você já gastou com dietas que não funcionaram?",
  },
  {
    icon: TrendingDown,
    text: "Já somou quanto investiu em academia, remédios e promessas vazias?",
  },
  {
    icon: Clock,
    text: "Sente que está perdendo tempo e dinheiro sem resultado real?",
  },
  {
    icon: CheckCircle2,
    text: "Quer um tratamento que realmente vale cada centavo?",
    highlight: true,
  },
];

const ProblemIdentificationPreco = () => {
  const handleWhatsApp = () => {
    openLeadChat('problem_identification_preco', CONTACT.WHATSAPP_BALAO_VENDAS);
  };

  return (
    <section className="py-16 md:py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto space-y-12">
          {/* Header */}
          <div className="text-center space-y-4">
            <h2 className="text-3xl md:text-4xl font-serif font-bold">
              Você se identifica com algum desses sinais?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              O que encarece não é o tratamento — é o tempo perdido
            </p>
          </div>

          {/* Grid de problemas */}
          <div className="grid md:grid-cols-2 gap-6">
            {problems.map((problem, index) => (
              <div
                key={index}
                className={`bg-card rounded-xl p-6 shadow-elegant hover:shadow-hover hover:-translate-y-1 transition-all ${
                  problem.highlight ? 'border-2 border-primary' : ''
                }`}
              >
                <div className="flex items-start gap-4">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${
                    problem.highlight ? 'bg-primary text-primary-foreground' : 'bg-primary/10 text-primary'
                  }`}>
                    <problem.icon className="w-6 h-6" />
                  </div>
                  <p className={`text-base md:text-lg ${problem.highlight ? 'font-semibold' : 'text-muted-foreground'}`}>
                    {problem.text}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Mensagem central */}
          <div className="bg-primary/5 backdrop-blur-sm rounded-xl p-8 border border-primary/10 text-center space-y-6">
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
              Quando somamos tudo isso, o custo da frustração é infinitamente maior do que o de um tratamento que realmente funciona.
            </p>
            <p className="text-xl md:text-2xl font-semibold text-foreground">
              O balão gástrico te faz economizar tempo, energia e dinheiro. Em 20 minutos de procedimento, você conquista o controle da fome, elimina até 35 kg e muda completamente sua relação com o corpo.
            </p>
            <Button
              size="lg"
              onClick={handleWhatsApp}
              className="text-base px-8 py-6 h-auto shadow-elegant hover:shadow-hover"
            >
              Consultar Valores
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProblemIdentificationPreco;
