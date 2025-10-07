import { Sparkles } from "lucide-react";

interface DeclaracaoTransformacaoProps {
  headline: string;
}

export const DeclaracaoTransformacao = ({ headline }: DeclaracaoTransformacaoProps) => {
  return (
    <div className="text-center space-y-4 py-12 animate-in fade-in zoom-in duration-700">
      <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-primary to-primary/70 mb-6">
        <Sparkles className="w-10 h-10 text-primary-foreground" />
      </div>
      <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight px-4">
        {headline}
      </h1>
      <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
        Seu plano foi personalizado com base nas suas respostas
      </p>
    </div>
  );
};
