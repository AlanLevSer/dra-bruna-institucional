import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { openLeadChat } from "@/lib/leadChat";

/**
 * CTA fixo mobile — aparece após o usuário passar da dobra do hero.
 * Reutiliza o mesmo LeadChat existente (cta_source: sticky_mobile).
 */
export const Glp1StickyCta = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) return null;

  return (
    <div className="md:hidden fixed bottom-0 inset-x-0 z-40 border-t border-border bg-background/95 backdrop-blur px-4 py-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))]">
      <Button
        onClick={() => void openLeadChat("sticky_mobile")}
        data-cta-source="sticky_mobile"
        className="w-full h-12 rounded-full text-sm font-medium"
      >
        Quero iniciar minha Avaliação Estratégica
      </Button>
    </div>
  );
};
