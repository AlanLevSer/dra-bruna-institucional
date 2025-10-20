import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, ChevronDown } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logoHeader from "@/assets/logo-header.svg";

const navItems = [
  { label: "Início", href: "/", type: "link" },
  {
    label: "Sobre",
    href: "/sobre",
    type: "dropdown",
    subItems: [
      { label: "Dra. Bruna Durelli", href: "/sobre#sobre" },
      { label: "Jornada de Transformação", href: "/sobre#jornada" },
      { label: "Experiência Concierge", href: "/sobre#concierge" },
      { label: "Ver tudo", href: "/sobre" },
    ],
  },
  { label: "Programa LevSer", href: "/programa-levser", type: "link" },
  {
    label: "Tratamentos",
    href: "/tratamentos",
    type: "dropdown",
    subItems: [
      { label: "Balão Intragástrico", href: "/balao-intragastrico" },
      { label: "Gastroplastia Endoscópica", href: "/gastroplastia-endoscopica" },
      { label: "Plasma de Argônio", href: "/plasma-argonio" },
      { label: "Canetas Emagrecedoras", href: "/canetas-emagrecedoras" },
      { label: "Medicina Regenerativa", href: "/medicina-regenerativa" },
      { label: "Nutrição Celular", href: "/nutricao-celular" },
      { label: "Ver todos", href: "/tratamentos" },
    ],
  },
  { label: "Depoimentos", href: "/#depoimentos", type: "anchor" },
  {
    label: "Recursos",
    href: "/recursos",
    type: "dropdown",
    subItems: [
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
        <div className="flex items-center justify-between lg:justify-start px-4 lg:px-0">
          <Link
            to="/"
            className="flex items-center shrink-0 lg:-ml-4"
          >
            <img 
              src={logoHeader}
              alt="Dra. Bruna Durelli - Especialista em Obesidade e Metabolismo"
              className="h-12 md:h-14 lg:h-16 w-auto transition-opacity hover:opacity-90 shrink-0"
              loading="eager"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1.5 lg:gap-2 ml-0">
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
                    className="text-xs lg:text-sm font-medium text-foreground/80 hover:text-primary transition-colors flex items-center gap-0.5 py-1.5 whitespace-nowrap shrink-0"
                    aria-label={`Menu ${item.label}`}
                    aria-expanded={openDropdown === item.label}
                  >
                    {item.label}
                    <ChevronDown className={`w-4 h-4 transition-transform ${openDropdown === item.label ? 'rotate-180' : ''}`} aria-hidden="true" />
                  </button>
                  {openDropdown === item.label && (
                    <div className="absolute top-full left-0 mt-0 w-64 bg-card border border-border rounded-lg shadow-hover z-50 py-2 animate-fade-in">
                      {item.subItems?.map((subItem) => (
                        <Link
                          key={subItem.href}
                          to={subItem.href}
                          onClick={() => setOpenDropdown(null)}
                          className="block px-4 py-3 text-sm text-foreground/80 hover:text-primary hover:bg-muted/30 transition-colors"
                        >
                          {subItem.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : item.type === "link" ? (
                <Link
                  key={item.href}
                  to={item.href}
                  className="text-xs lg:text-sm font-medium text-foreground/80 hover:text-primary transition-colors whitespace-nowrap shrink-0 py-1.5"
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
                  className="text-xs lg:text-sm font-medium text-foreground/80 hover:text-primary transition-colors whitespace-nowrap shrink-0 py-1.5"
                >
                  {item.label}
                </a>
              )
            )}
            <Button
              onClick={() => handleNavClick("/#agendar", "anchor")}
              className="bg-gradient-premium hover:opacity-90 transition-opacity shrink-0 text-xs lg:text-sm px-2.5 lg:px-3 py-1.5 whitespace-pre-line text-center leading-tight"
            >
              Agende sua{"\n"}Consulta
            </Button>
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
                        {item.subItems?.map((subItem) => (
                          <Link
                            key={subItem.href}
                            to={subItem.href}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="block text-sm text-foreground/70 hover:text-primary transition-colors"
                          >
                            {subItem.label}
                          </Link>
                        ))}
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
