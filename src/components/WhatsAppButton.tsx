import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CONTACT } from "@/lib/constants";

export const WhatsAppButton = () => {
  const handleWhatsAppClick = () => {
    window.open(CONTACT.WHATSAPP_URL, "_blank");
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
