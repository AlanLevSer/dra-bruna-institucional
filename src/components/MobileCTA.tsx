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
    const element = document.querySelector("#agendar");
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 lg:hidden p-4 bg-gradient-to-t from-background via-background to-transparent animate-slide-in-left">
      <Button
        onClick={scrollToSection}
        size="lg"
        className="w-full bg-gradient-premium hover:opacity-90 transition-opacity shadow-hover group"
      >
        <Calendar className="mr-2" size={20} />
        Agendar Avaliação
      </Button>
    </div>
  );
};
