import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";
import { CONTACT } from "@/lib/constants";
import { trackEvent } from "@/lib/analytics";

interface MicroCTAProps {
  message: string;
  variant?: 'default' | 'outline';
  position: string;
}

export const MicroCTA = ({ message, variant = 'outline', position }: MicroCTAProps) => {
  const handleClick = () => {
    trackEvent('quiz_micro_cta_clicked', { 
      message, 
      position,
      timestamp: new Date().toISOString()
    });
    
    const whatsappUrl = `${CONTACT.WHATSAPP_URL.split('?')[0]}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };
  
  return (
    <div className="flex justify-center my-8 px-4">
      <Button
        variant={variant}
        size="lg"
        className="gap-2 shadow-lg hover:shadow-xl transition-all"
        onClick={handleClick}
      >
        <MessageCircle className="w-5 h-5" />
        {message}
      </Button>
    </div>
  );
};
