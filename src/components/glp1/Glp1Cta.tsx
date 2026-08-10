import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CONTACT } from "@/lib/constants";
import { openLeadChat } from "@/lib/leadChat";
import { trackWhatsAppClick } from "@/lib/analytics";

export const CTA_LABEL = "Quero iniciar minha Avaliação Estratégica";

type Glp1CtaProps = {
  ctaSource: string;
  className?: string;
  microcopy?: string;
  showWhatsApp?: boolean;
  size?: "default" | "lg";
};

export const Glp1Cta = ({
  ctaSource,
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
        className="w-full sm:w-auto h-14 px-7 text-base font-medium rounded-full shadow-warm"
      >
        {CTA_LABEL}
        <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
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
