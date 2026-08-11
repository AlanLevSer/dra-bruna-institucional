import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { openLeadChat } from "@/lib/leadChat";

export const CTA_LABEL = "Quero iniciar minha Avaliação Estratégica";

type Glp1CtaProps = {
  ctaSource: string;
  label?: string;
  className?: string;
  microcopy?: string;
  size?: "default" | "lg";
};

export const Glp1Cta = ({
  ctaSource,
  label = CTA_LABEL,
  className = "",
  microcopy,
  size = "lg",
}: Glp1CtaProps) => {
  return (
    <div className={`flex flex-col items-start gap-3 ${className}`}>
      <Button
        size={size}
        onClick={() => void openLeadChat(ctaSource)}
        data-cta-source={ctaSource}
        className="w-full sm:w-auto h-auto min-h-14 py-4 px-7 text-base font-semibold rounded-full whitespace-normal bg-primary text-primary-foreground shadow-lg transition-all hover:bg-primary/90 hover:shadow-xl active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
      >
        <span className="text-left">{label}</span>
        <ArrowRight className="ml-2 h-5 w-5 shrink-0" aria-hidden="true" />
      </Button>

      {microcopy && (
        <p className="text-sm text-muted-foreground leading-relaxed">{microcopy}</p>
      )}
    </div>
  );
};
