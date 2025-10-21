import { useEffect, useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CONTACT } from "@/lib/constants";
import { X } from "lucide-react";

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

    const timer = setTimeout(() => {
      if (!hasShown) {
        setIsOpen(true);
        setHasShown(true);
      }
    }, 30000); // 30 segundos

    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      document.removeEventListener("mouseleave", handleMouseLeave);
      clearTimeout(timer);
    };
  }, [hasShown]);

  const handleWhatsApp = () => {
    window.open(CONTACT.WHATSAPP_BALAO_VENDAS, "_blank");
    setIsOpen(false);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[600px] p-0 overflow-hidden">
        <div className="relative bg-gradient-to-br from-primary to-primary/80 text-white p-8 md:p-12">
          {/* Badge */}
          <div className="inline-block bg-white text-primary px-4 py-2 rounded-full text-sm font-bold mb-4 animate-bounce">
            🎁 OFERTA EXCLUSIVA
          </div>

          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Antes de ir... Uma oportunidade única!
          </h2>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 mb-6">
            <div className="flex items-center gap-4 mb-4">
              <span className="text-4xl font-bold">R$ 97</span>
              <div>
                <span className="text-xl line-through opacity-70 block">R$ 700</span>
                <span className="text-sm font-medium">Desconto de 86%</span>
              </div>
            </div>
            <p className="text-lg opacity-90 mb-4">
              Consulta de Avaliação Completa com a Dra. Bruna Durelli
            </p>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start gap-2">
                <span className="font-bold">✓</span>
                <span>Avaliação médica completa e detalhada</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-bold">✓</span>
                <span>Plano de tratamento personalizado</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-bold">✓</span>
                <span>Orientação nutricional inicial</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-bold">✓</span>
                <span>Sem compromisso de contratação</span>
              </li>
            </ul>
          </div>

          <Button
            variant="hero"
            size="xl"
            onClick={handleWhatsApp}
            className="w-full bg-white text-primary hover:bg-white/90 shadow-xl"
          >
            🚀 SIM! QUERO MINHA CONSULTA COM DESCONTO
          </Button>

          <button
            onClick={handleClose}
            className="mt-4 text-sm underline opacity-70 hover:opacity-100 transition-opacity mx-auto block"
          >
            Não, obrigado
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
