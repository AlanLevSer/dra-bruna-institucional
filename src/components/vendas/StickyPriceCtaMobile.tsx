import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { CONTACT } from "@/lib/constants";
import { openLeadChat } from "@/lib/leadChat";
import { trackPricingCTAClick } from "@/lib/analytics";

const CTA_SOURCE = "sticky_price_mobile";

export const StickyPriceCtaMobile = () => {
  const [heroCTAVisible, setHeroCTAVisible] = useState(true);
  const [chatOpen, setChatOpen] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);

  // Observa quando o CTA do hero sai do viewport
  useEffect(() => {
    const target = document.getElementById("hero-price-cta");
    if (!target) return;

    observerRef.current = new IntersectionObserver(
      ([entry]) => setHeroCTAVisible(entry.isIntersecting),
      { threshold: 0 }
    );
    observerRef.current.observe(target);

    return () => observerRef.current?.disconnect();
  }, []);

  // Detecta abertura/fechamento do LeadChat via polling (leve, só quando sticky visível)
  useEffect(() => {
    if (heroCTAVisible) return;

    const interval = setInterval(() => {
      const isOpen = window.LeadChat?.isOpen() ?? false;
      setChatOpen(isOpen);
    }, 120);

    return () => clearInterval(interval);
  }, [heroCTAVisible]);

  const handleCTA = () => {
    const scrollDepth = Math.round(
      (window.scrollY / Math.max(1, document.documentElement.scrollHeight - window.innerHeight)) * 100
    );

    trackPricingCTAClick({
      source: CTA_SOURCE,
      section: "sticky",
      position: "bottom",
      scroll_depth: scrollDepth,
    });

    openLeadChat(CTA_SOURCE, CONTACT.WHATSAPP_BALAO_VENDAS, {
      section: "sticky",
      position: "bottom",
      scroll_depth: scrollDepth,
    });
  };

  const visible = !heroCTAVisible && !chatOpen;

  if (!visible) return null;

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-40 lg:hidden px-4 pb-[env(safe-area-inset-bottom,0px)] pt-3 bg-gradient-to-t from-background via-background/95 to-transparent"
      role="complementary"
      aria-label="CTA fixo — consultar valores"
    >
      <Button
        size="lg"
        onClick={handleCTA}
        className="w-full text-base py-6 h-auto shadow-hover"
      >
        Consultar Valores
      </Button>
    </div>
  );
};

export default StickyPriceCtaMobile;
