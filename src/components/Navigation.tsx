import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, ChevronDown, Sparkles } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logoHeader from "@/assets/logo-header.avif";

interface SubMenuItem {
  label: string;
  href: string;
  isGroupHeader?: boolean;
  indent?: boolean;
  isDivider?: boolean;
  badge?: string;
  icon?: any;
}

interface NavItem {
  label: string;
  href: string;
  type: "link" | "dropdown" | "anchor";
  subItems?: SubMenuItem[];
}

const navItems: NavItem[] = [
  { label: "Início", href: "/", type: "link" },
  {
    label: "Sobre",
    href: "/sobre",
    type: "dropdown",
    subItems: [
      { label: "Dra. Bruna Durelli", href: "/sobre#sobre" },
      { label: "Jornada de Transformação", href: "/sobre#jornada" },
      { label: "Experiência Concierge", href: "/sobre#experiencia-concierge" },
      { label: "Ver tudo", href: "/sobre" },
    ],
  },
  {
    label: "Programa LevSer",
    href: "/programa-levser",
    type: "dropdown",
    subItems: [
      { label: "Visão Geral", href: "/programa-levser#programa" },
      { label: "Diferenciais", href: "/programa-levser#diferenciais" },
      { label: "Comunidade de Apoio", href: "/programa-levser#comunidade" },
      { label: "Segurança & Evidências", href: "/programa-levser#seguranca" },
      { label: "Ver tudo", href: "/programa-levser" },
    ],
  },
  {
    label: "Tratamentos",
    href: "/tratamentos",
    type: "dropdown",
    subItems: [
      { label: "Procedimentos Endoscópicos", href: "/tratamentos#endoscopicos", isGroupHeader: true },
      { label: "Balão Intragástrico", href: "/balão-intragastrico", indent: true },
      { label: "Gastroplastia Endoscópica", href: "/gastroplastia-endoscopica", indent: true },
      { label: "Plasma de Argônio", href: "/plasma-argonio", indent: true },
      { label: "divider", href: "#", isDivider: true },
      { label: "Emagrecimento & Longevidade", href: "/tratamentos#emagrecimento-longevidade", isGroupHeader: true },
      { label: "Canetas Emagrecedoras", href: "/canetas-emagrecedoras", indent: true },
      { label: "Medicina Regenerativa", href: "/medicina-regenerativa", indent: true },
      { label: "Nutrição Celular", href: "/nutricao-celular", indent: true },
      { label: "divider", href: "#", isDivider: true },
      { label: "Ver todos os tratamentos", href: "/tratamentos" },
    ],
  },
  { label: "Depoimentos", href: "/#depoimentos", type: "anchor" },
  {
    label: "Recursos",
    href: "/recursos",
    type: "dropdown",
    subItems: [
      { label: "Descubra Seu Caminho", href: "/quiz", badge: "Novo", icon: Sparkles },
      { label: "FAQ Completo", href: "/recursos#faq" },
      { label: "Calculadoras", href: "/recursos#calculadoras" },
      { label: "Ver tudo", href: "/recursos" },
    ],
  },
];

export const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const navRef = useRef<HTMLElement | null>(null);
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  const navigate = useNavigate();

  useEffect(() => {
    const handleScrollOrResize = () => {
      setIsScrolled(window.scrollY > 20);
      const h = navRef.current?.getBoundingClientRect().height ?? 80;
      document.documentElement.style.setProperty('--header-height', `${Math.ceil(h)}px`);
    };
    window.addEventListener("scroll", handleScrollOrResize);
    window.addEventListener("resize", handleScrollOrResize);
    handleScrollOrResize();
    return () => {
      window.removeEventListener("scroll", handleScrollOrResize);
      window.removeEventListener("resize", handleScrollOrResize);
    };
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  const handleNavClick = (href: string, type: string) => {
    setIsMobileMenuOpen(false);
    setOpenDropdown(null);

    // Se é link para página
    if (type === "link" || href.startsWith("/")) {
      navigate(href);
      return;
    }

    // Se é âncora (pode ser na homepage ou em outra página com âncora)
    if (href.startsWith("/#")) {
      if (!isHomePage) {
        navigate(href); // Router vai lidar com navegação + scroll
      } else {
        const element = document.querySelector(href.replace("/", ""));
        if (element) {
          const rootStyles = getComputedStyle(document.documentElement);
          const headerVar = rootStyles.getPropertyValue('--header-height').trim();
          const headerOffset = (parseInt(headerVar.replace('px','')) || 80) + 8;
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
          window.scrollTo({ top: offsetPosition, behavior: "smooth" });
        }
      }
    }
  };

  return (
    <nav
      ref={navRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled || isMobileMenuOpen ? "bg-background/95 backdrop-blur-md shadow-elegant border-b border-border" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto py-4">
        <div className="flex items-center justify-between px-4 lg:px-6 gap-4">
          <Link
            to="/"
            className="flex items-center shrink-0 lg:-ml-4"
          >
            <img 
                src={logoHeader}
                alt="Dra. Bruna Durelli - Especialista em Obesidade e Metabolismo"
                className="h-12 md:h-14 lg:h-16 w-auto transition-opacity hover:opacity-90 shrink-0"
                loading="eager"
                width={200}
                height={50}
              />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-4 lg:gap-6 flex-1 justify-center">
            {navItems.map((item) =>
              item.type === "dropdown" ? (
                <div
                  key={item.label}
                  className="relative group"
                  onMouseEnter={() => {
                    if (dropdownTimeoutRef.current) {
                      clearTimeout(dropdownTimeoutRef.current);
                    }
                    setOpenDropdown(item.label);
                  }}
                  onMouseLeave={() => {
                    dropdownTimeoutRef.current = setTimeout(() => {
                      setOpenDropdown(null);
                    }, 150);
                  }}
                >
                  <button 
                    className="text-sm lg:text-base font-medium text-foreground/80 hover:text-primary transition-colors flex items-center gap-0.5 py-1.5 whitespace-nowrap shrink-0"
                    aria-label={`Menu ${item.label}`}
                    aria-expanded={openDropdown === item.label}
                  >
                    {item.label}
                    <ChevronDown className={`w-4 h-4 transition-transform ${openDropdown === item.label ? 'rotate-180' : ''}`} aria-hidden="true" />
                  </button>
                  {openDropdown === item.label && (
                    <div className="absolute top-full left-0 mt-0 w-64 bg-card border border-border rounded-lg shadow-hover z-50 py-2 animate-fade-in">
                      {item.subItems?.map((subItem, index) => {
                        if (subItem.isDivider) {
                          return <div key={`divider-${index}`} className="my-2 border-t border-border" />;
                        }
                        
                        if (subItem.isGroupHeader) {
                          return (
                            <div
                              key={subItem.href}
                              className="px-4 py-2 text-xs font-semibold text-foreground/60 uppercase tracking-wider"
                            >
                              {subItem.label}
                            </div>
                          );
                        }
                        
                        const Icon = subItem.icon;
                        return (
                          <Link
                            key={subItem.href}
                            to={subItem.href}
                            onClick={() => setOpenDropdown(null)}
                            className={`flex items-center gap-2 px-4 py-3 text-sm text-foreground/80 hover:text-primary hover:bg-muted/30 transition-colors ${
                              subItem.indent ? 'pl-8' : ''
                            }`}
                          >
                            {Icon && <Icon className="w-4 h-4 text-primary shrink-0" />}
                            <span className="flex-1">{subItem.label}</span>
                            {subItem.badge && (
                              <span className="text-[10px] bg-primary text-white px-1.5 py-0.5 rounded-full font-medium">
                                {subItem.badge}
                              </span>
                            )}
                          </Link>
                        );
                      })}
                    </div>
                  )}
                </div>
              ) : item.type === "link" ? (
                <Link
                  key={item.href}
                  to={item.href}
                  className="text-sm lg:text-base font-medium text-foreground/80 hover:text-primary transition-colors whitespace-nowrap shrink-0 py-1.5"
                >
                  {item.label}
                </Link>
              ) : (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(item.href, item.type);
                  }}
                  className="text-sm lg:text-base font-medium text-foreground/80 hover:text-primary transition-colors whitespace-nowrap shrink-0 py-1.5"
                >
                  {item.label}
                </a>
              )
            )}
            <div className="hidden lg:block ml-auto">
              <Button
                onClick={() => handleNavClick("/#agendar", "anchor")}
                className="bg-gradient-premium hover:opacity-90 transition-opacity shrink-0 text-sm px-4 py-2 whitespace-nowrap"
              >
                Agende sua Consulta
              </Button>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden text-foreground"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-menu"
            aria-label={isMobileMenuOpen ? "Fechar menu" : "Abrir menu de navegação"}
          >
            {isMobileMenuOpen ? <X size={24} aria-hidden="true" /> : <Menu size={24} aria-hidden="true" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <>
            <div
              className="fixed inset-0 top-[var(--header-height)] bg-foreground/30 z-40"
              onClick={() => setIsMobileMenuOpen(false)}
              aria-hidden="true"
            />
            <div id="mobile-menu" className="lg:hidden mt-4 p-4 pb-6 space-y-4 rounded-xl border border-border bg-card shadow-hover animate-fade-in relative z-50 text-left">
              {navItems.map((item) =>
                item.type === "dropdown" ? (
                  <div key={item.label} className="space-y-2">
                    <button
                      onClick={() =>
                        setOpenDropdown(
                          openDropdown === item.label ? null : item.label
                        )
                      }
                      className="w-full flex items-center justify-start gap-2 text-left text-sm font-medium text-foreground/80 hover:text-primary transition-colors"
                      aria-label={`Menu ${item.label}`}
                      aria-expanded={openDropdown === item.label}
                    >
                      {item.label}
                      <ChevronDown
                        className={`w-4 h-4 shrink-0 transition-transform ${
                          openDropdown === item.label ? "rotate-180" : ""
                        }`}
                        aria-hidden="true"
                      />
                    </button>
                    {openDropdown === item.label && (
                      <div className="pl-4 space-y-2">
                        {item.subItems?.map((subItem, index) => {
                          if (subItem.isDivider) {
                            return <div key={`divider-${index}`} className="my-2 border-t border-border" />;
                          }
                          
                          if (subItem.isGroupHeader) {
                            return (
                              <div
                                key={subItem.href}
                                className="py-1 text-xs font-semibold text-foreground/60 uppercase tracking-wider"
                              >
                                {subItem.label}
                              </div>
                            );
                          }
                          
                          const Icon = subItem.icon;
                          return (
                            <Link
                              key={subItem.href}
                              to={subItem.href}
                              onClick={() => setIsMobileMenuOpen(false)}
                              className={`flex items-center gap-2 text-sm text-foreground/70 hover:text-primary transition-colors ${
                                subItem.indent ? 'pl-4' : ''
                              }`}
                            >
                              {Icon && <Icon className="w-4 h-4 text-primary shrink-0" />}
                              <span className="flex-1">{subItem.label}</span>
                              {subItem.badge && (
                                <span className="text-[10px] bg-primary text-white px-1.5 py-0.5 rounded-full font-medium">
                                  {subItem.badge}
                                </span>
                              )}
                            </Link>
                          );
                        })}
                      </div>
                    )}
                  </div>
                ) : item.type === "link" ? (
                  <Link
                    key={item.href}
                    to={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block text-left text-sm font-medium text-foreground/80 hover:text-primary transition-colors"
                  >
                    {item.label}
                  </Link>
                ) : (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick(item.href, item.type);
                    }}
                    className="block text-left text-sm font-medium text-foreground/80 hover:text-primary transition-colors"
                  >
                    {item.label}
                  </a>
                )
              )}
              <Button
                onClick={() => handleNavClick("/#agendar", "anchor")}
                className="w-full bg-gradient-premium hover:opacity-90 transition-opacity"
              >
                Agende sua Consulta
              </Button>
            </div>
          </>
        )}
      </div>
    </nav>
  );
};
