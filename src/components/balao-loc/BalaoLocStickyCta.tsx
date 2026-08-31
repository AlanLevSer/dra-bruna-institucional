import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { openLeadChat } from "@/lib/leadChat";

export const BalaoLocStickyCta = () => {
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
        className="w-full h-12 rounded-full text-base font-semibold bg-[hsl(var(--primary-strong))] text-primary-foreground shadow-lg transition-all hover:bg-[hsl(var(--primary-stronger))] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--primary-strong))] focus-visible:ring-offset-2 focus-visible:ring-offset-background"
      >
        Avaliar se o balão faz sentido
      </Button>
    </div>
  );
};
