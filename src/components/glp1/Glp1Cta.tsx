import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CONTACT } from "@/lib/constants";
import { openLeadChat } from "@/lib/leadChat";
import { trackWhatsAppClick } from "@/lib/analytics";

export const CTA_LABEL = "Quero iniciar minha Avaliação Estratégica";

type Glp1CtaProps = {
  ctaSource: string;
  label?: string;
  className?: string;
  microcopy?: string;
  showWhatsApp?: boolean;
  size?: "default" | "lg";
};

export const Glp1Cta = ({
  ctaSource,
  label = CTA_LABEL,
  className = "",
  microcopy,
  showWhatsApp = false,
  size = "lg",
}: Glp1CtaProps) => {
  const handleWhatsApp = () => {
    trackWhatsAppClick(ctaSource, {
      action: "secondary_channel",
      destination_url: CONTACT.WHATSAPP_URL,
    });
    window.open(CONTACT.WHATSAPP_URL, "_blank", "noopener,noreferrer");
  };

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

      {showWhatsApp && (
        <button
          type="button"
          onClick={handleWhatsApp}
          className="text-sm text-muted-foreground underline underline-offset-4 hover:text-foreground transition-colors"
        >
          Prefere conversar diretamente pelo WhatsApp?
        </button>
      )}
    </div>
  );
};
