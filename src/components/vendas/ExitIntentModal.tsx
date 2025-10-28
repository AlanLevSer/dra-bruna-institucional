import { useEffect, useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CONTACT } from "@/lib/constants";
import { trackEvent } from "@/lib/analytics";

export const ExitIntentModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [hasShown, setHasShown] = useState(false);

  useEffect(() => {
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0 && !hasShown) {
        setIsOpen(true);
        setHasShown(true);
      }
    };

    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [hasShown]);

  const handleWhatsApp = () => {
    try {
      trackEvent('cta_whatsapp_click', {
        location: 'exit_intent_modal',
        path: window.location.pathname,
      });
    } catch {}
    window.open(CONTACT.WHATSAPP_BALAO_VENDAS, "_blank");
    setIsOpen(false);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[600px] p-0 overflow-hidden">
        <div className="relative bg-card backdrop-blur-sm p-8 md:p-12 border border-border/50">
          {/* Badge */}
          <div className="inline-block bg-primary/10 text-primary px-4 py-2 rounded-full text-xs font-medium mb-4">
            Oferta Exclusiva
          </div>

          <h2 className="text-2xl md:text-3xl font-serif font-bold mb-4">
            Antes de ir...
          </h2>
          
          <div className="bg-muted/30 rounded-xl p-6 mb-6">
            <p className="text-lg text-foreground mb-4">
              Consulta de Avaliação Completa com a Dra. Bruna Durelli
            </p>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="text-primary font-bold">✓</span>
                <span>Avaliação médica completa e detalhada</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary font-bold">✓</span>
                <span>Plano de tratamento personalizado</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary font-bold">✓</span>
                <span>Orientação nutricional inicial</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary font-bold">✓</span>
                <span>Sem compromisso de contratação</span>
              </li>
            </ul>
          </div>

          <Button
            size="lg"
            onClick={handleWhatsApp}
            className="w-full bg-gradient-premium hover:opacity-90 text-white shadow-elegant"
          >
            Agendar Agora
          </Button>

          <button
            onClick={handleClose}
            className="mt-4 text-sm text-muted-foreground hover:text-foreground transition-colors mx-auto block"
          >
            Não, obrigada
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

