import { Button } from "@/components/ui/button";
import { Calendar } from "lucide-react";
import { useState, useEffect } from "react";

export const MobileCTA = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = () => {
    // Se estiver na homepage, scroll para #agendar
    if (window.location.pathname === "/") {
      const element = document.querySelector("#agendar");
      if (element) {
        const rootStyles = getComputedStyle(document.documentElement);
        const headerVar = rootStyles.getPropertyValue('--header-height').trim();
        const headerOffset = (parseInt(headerVar.replace('px','')) || 80) + 8;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        window.scrollTo({ top: offsetPosition, behavior: "smooth" });
      }
    } else {
      // Se estiver em outra página, navega para homepage com âncora
      window.location.href = "/#agendar";
    }
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 lg:hidden p-4 pb-20 bg-gradient-to-t from-background via-background to-transparent animate-slide-in-left">
      <Button
        onClick={scrollToSection}
        size="lg"
        className="w-full bg-gradient-premium hover:opacity-90 transition-opacity shadow-hover group"
        aria-label="Agendar Avaliação Premium"
      >
        <Calendar className="mr-2" size={20} aria-hidden="true" />
        Avaliação Premium
      </Button>
    </div>
  );
};
