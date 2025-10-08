import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export const WhatsAppButton = () => {
  const handleWhatsAppClick = () => {
    const phoneNumber = "5511997023024";
    const message = "Olá, Dra. Bruna! Gostaria de agendar uma consulta.";
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };

  return (
    <Button
      onClick={handleWhatsAppClick}
      size="lg"
      className="fixed bottom-6 right-6 z-50 rounded-full w-14 h-14 p-0 shadow-hover hover:shadow-elegant bg-[#25D366] hover:bg-[#20BD5A] text-white animate-float"
      aria-label="Contato via WhatsApp"
    >
      <MessageCircle size={28} />
    </Button>
  );
};
