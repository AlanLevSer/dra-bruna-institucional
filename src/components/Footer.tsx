import logoFooter from "@/assets/logo-header-hq.avif";
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
              width={200}
              height={50}
              style={{ imageRendering: 'crisp-edges' }}
            />
          
          <div className="space-y-1">
            <p className="text-sm font-semibold text-foreground">
              Dra. Bruna Durelli
            </p>
            <p className="text-xs text-muted-foreground">
              CRM 124809 • RQE 57361
            </p>
            <p className="text-xs text-muted-foreground">
              Sócia-fundadora da LevSer | Especialista em Obesidade, Endoscopia, Nutrologia e Medicina Regenerativa
            </p>
          </div>
          
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
            <a href="/politica-privacidade" className="hover:text-primary transition-colors">
              Política de Privacidade
            </a>
            <span>•</span>
            <a href="/termos-uso" className="hover:text-primary transition-colors">
              Termos de Uso
            </a>
          </div>
          
          <div className="pt-6 border-t border-border/50 max-w-3xl mx-auto">
            <p className="text-xs text-muted-foreground/80 leading-relaxed space-y-2">
              <span className="block">
                <strong>Resultados variam conforme avaliação clínica e adesão.</strong> 
                Todo tratamento é individualizado e requer comprometimento do paciente.
              </span>
              <span className="block">
                <strong>Intervenções indicadas após critérios médicos e exames.</strong> 
                Nenhum procedimento é realizado sem avaliação completa e consentimento informado.
              </span>
              <span className="block">
                <strong>Decisão compartilhada; segurança em primeiro lugar.</strong> 
                Você participa ativamente da escolha do melhor programa para seu caso.
              </span>
              <span className="block mt-2">
                Procedimentos médicos possuem riscos e contraindicações que serão 
                avaliados durante a consulta. Este site não substitui consulta médica presencial.
              </span>
            </p>
          </div>
          
          <p className="text-xs text-muted-foreground pt-4">
            © {currentYear} Dra. Bruna Durelli. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};
