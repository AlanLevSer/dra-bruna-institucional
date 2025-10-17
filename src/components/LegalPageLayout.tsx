import { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { ChevronUp } from "lucide-react";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { GrafismoDecor } from "@/components/GrafismoDecor";

interface LegalPageLayoutProps {
  title: string;
  vigencia: string;
  children: ReactNode;
}

export const LegalPageLayout = ({ title, vigencia, children }: LegalPageLayoutProps) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="relative">
        <GrafismoDecor />
        
        {/* Hero Section */}
        <section className="relative py-20 lg:py-28 bg-gradient-to-b from-primary/5 to-background">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 bg-gradient-to-r from-primary via-primary/80 to-secondary bg-clip-text text-transparent">
                {title}
              </h1>
              <p className="text-sm text-muted-foreground">
                Vigência: <span className="font-semibold">{vigencia}</span>
              </p>
            </div>
          </div>
        </section>

        {/* Content */}
        <section className="relative py-12 lg:py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto space-y-8">
              {children}
            </div>
          </div>
        </section>

        {/* Scroll to Top Button */}
        <Button
          size="icon"
          variant="outline"
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 rounded-full shadow-lg hover:shadow-xl transition-all z-50 bg-card/80 backdrop-blur-sm"
          aria-label="Voltar ao topo"
        >
          <ChevronUp className="w-5 h-5" />
        </Button>
      </main>

      <Footer />
    </div>
  );
};
