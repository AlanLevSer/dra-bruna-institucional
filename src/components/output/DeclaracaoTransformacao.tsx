import { Sparkles, AlertCircle } from "lucide-react";

interface DeclaracaoTransformacaoProps {
  headline: string;
  alertaClinico?: string;
}

export const DeclaracaoTransformacao = ({ headline, alertaClinico }: DeclaracaoTransformacaoProps) => {
  return (
    <div className="text-center space-y-4 py-8 md:py-12 px-4 animate-in fade-in zoom-in duration-700">
      <div className="inline-flex items-center justify-center w-16 h-16 md:w-20 md:h-20 rounded-full bg-gradient-to-br from-primary to-primary/70 mb-4 md:mb-6">
        <Sparkles className="w-8 h-8 md:w-10 md:h-10 text-primary-foreground" />
      </div>
      <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold leading-tight px-2">
        {headline}
      </h1>
      <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto px-2">
        Seu plano foi personalizado com base nas suas respostas
      </p>
      
      {alertaClinico && (
        <div className="max-w-2xl mx-auto mt-6">
          <div className="bg-amber-50 dark:bg-amber-950/30 border-2 border-amber-200 dark:border-amber-800 rounded-lg p-4 flex gap-3 text-left">
            <AlertCircle className="w-5 h-5 text-amber-600 dark:text-amber-500 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-amber-800 dark:text-amber-200 leading-relaxed">
              {alertaClinico}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
