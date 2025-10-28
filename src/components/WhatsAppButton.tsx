import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CONTACT } from "@/lib/constants";
import { trackEvent } from "@/lib/analytics";

export const WhatsAppButton = () => {
  const handleWhatsAppClick = () => {
    try {
      trackEvent('cta_whatsapp_click', {
        location: 'floating_button',
        path: window.location.pathname,
      });
    } catch (e) { void e; }
    window.open(CONTACT.WHATSAPP_URL, "_blank");
  };

  return (
    <Button
      onClick={handleWhatsAppClick}
      className="fixed bottom-6 right-6 z-50 h-14 w-14 rounded-full bg-[#25D366] hover:bg-[#20BD5A] p-0 shadow-elegant hover:shadow-hover hover:scale-105 transition-all text-white"
      aria-label="Contato via WhatsApp"
    >
      <MessageCircle size={24} />
    </Button>
  );
};
