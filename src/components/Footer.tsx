export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-card border-t border-border/50 py-8">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-4">
          <p className="text-2xl font-serif font-semibold text-foreground">
            Dra. Bruna Durelli
          </p>
          
          <p className="text-sm text-muted-foreground">
            CRM XXXXX - Especialista em Obesidade e Metabolismo
          </p>
          
          <div className="flex justify-center gap-6 text-sm text-muted-foreground">
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
