import logoFooter from "@/assets/logo-header.svg";
import { Instagram, Linkedin, Globe } from "lucide-react";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-card border-t border-border/50 py-8">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-4">
          <img 
            src={logoFooter}
            alt="Dra. Bruna Durelli - Especialista em Obesidade e Metabolismo"
            className="h-12 md:h-14 lg:h-16 w-auto mx-auto opacity-90 hover:opacity-100 transition-opacity"
            loading="lazy"
          />
          
          <p className="text-sm text-muted-foreground">
            CRM XXXXX - Especialista em Obesidade e Metabolismo
          </p>
          
          <div className="flex justify-center gap-6 pt-2">
            <a
              href="https://www.instagram.com/dra.brunadurelli"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
              aria-label="Instagram Dra. Bruna Durelli"
            >
              <Instagram size={20} />
            </a>
            <a
              href="https://www.instagram.com/levsersaude/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
              aria-label="Instagram LevSer Saúde"
            >
              <Instagram size={20} />
            </a>
            <a
              href="https://www.linkedin.com/company/levser"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
              aria-label="LinkedIn LevSer"
            >
              <Linkedin size={20} />
            </a>
            <a
              href="https://www.levser.com.br/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
              aria-label="Site LevSer"
            >
              <Globe size={20} />
            </a>
          </div>
          
          <div className="flex justify-center gap-6 text-sm text-muted-foreground pt-2">
            <a href="#" className="hover:text-primary transition-colors">
              Política de Privacidade
            </a>
            <span>•</span>
            <a href="#" className="hover:text-primary transition-colors">
              Termos de Uso
            </a>
          </div>
          
          <p className="text-xs text-muted-foreground pt-4">
            © {currentYear} Dra. Bruna Durelli. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};
