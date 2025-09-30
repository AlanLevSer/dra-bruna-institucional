import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, ChevronDown } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const navItems = [
  { label: "Início", href: "#inicio", type: "anchor" },
  { label: "Programa LevSer", href: "#programa", type: "anchor" },
  {
    label: "Procedimentos",
    href: "#procedimentos",
    type: "dropdown",
    subItems: [
      { label: "Terapias Cirúrgicas", href: "/terapias-cirurgicas" },
      { label: "Terapias Endoscópicas", href: "/terapias-endoscopicas" },
      { label: "Gastroplastia Endoscópica", href: "/gastroplastia-endoscopica" },
    ],
  },
  {
    label: "Nutrição & Metabolismo",
    href: "#nutricao",
    type: "dropdown",
    subItems: [
      { label: "Nutrição Celular", href: "/nutricao-celular" },
      { label: "Terapia Sacietógena", href: "/terapia-sacietogena" },
    ],
  },
  { label: "Diferenciais", href: "#diferenciais", type: "anchor" },
  { label: "Depoimentos", href: "#depoimentos", type: "anchor" },
  { label: "FAQ", href: "#faq", type: "anchor" },
];

export const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const navRef = useRef<HTMLElement | null>(null);
  const location = useLocation();
  const isHomePage = location.pathname === "/";

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

  const scrollToSection = (href: string) => {
    if (isHomePage) {
      const element = document.querySelector(href);
      if (element) {
        const rootStyles = getComputedStyle(document.documentElement);
        const headerVar = rootStyles.getPropertyValue('--header-height').trim();
        const headerOffset = (parseInt(headerVar.replace('px','')) || 80) + 8;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth"
        });
        setIsMobileMenuOpen(false);
      }
    } else {
      window.location.href = "/" + href;
    }
  };

  return (
    <nav
      ref={navRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-card/95 backdrop-blur-md shadow-elegant" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <a
            href="#inicio"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection("#inicio");
            }}
            className="text-xl font-serif font-semibold text-foreground"
          >
            Dra. Bruna Durelli
          </a>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
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
                  <button className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors flex items-center gap-1 py-2">
                    {item.label}
                    <ChevronDown className={`w-4 h-4 transition-transform ${openDropdown === item.label ? 'rotate-180' : ''}`} />
                  </button>
                  {openDropdown === item.label && (
                    <div className="absolute top-full left-0 mt-0 w-64 bg-card border border-border rounded-lg shadow-hover z-50 py-2 animate-fade-in">
                      {item.subItems?.map((subItem) => (
                        <Link
                          key={subItem.href}
                          to={subItem.href}
                          className="block px-4 py-3 text-sm text-foreground/80 hover:text-primary hover:bg-muted/30 transition-colors"
                        >
                          {subItem.label}
                        </Link>
                      ))}
                      {item.href.startsWith("#") && (
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            scrollToSection(item.href);
                          }}
                          className="block w-full text-left px-4 py-3 text-sm text-foreground/80 hover:text-primary hover:bg-muted/30 transition-colors border-t border-border mt-2 pt-3"
                        >
                          Ver tudo
                        </button>
                      )}
                    </div>
                  )}
                </div>
              ) : (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(item.href);
                  }}
                  className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors"
                >
                  {item.label}
                </a>
              )
            )}
            <Button
              onClick={() => scrollToSection("#agendar")}
              className="bg-gradient-premium hover:opacity-90 transition-opacity"
            >
              Agende sua Avaliação
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden text-foreground"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="lg:hidden mt-4 pb-4 space-y-4 animate-fade-in">
            {navItems.map((item) =>
              item.type === "dropdown" ? (
                <div key={item.label} className="space-y-2">
                  <button
                    onClick={() =>
                      setOpenDropdown(
                        openDropdown === item.label ? null : item.label
                      )
                    }
                    className="w-full flex items-center justify-between text-sm font-medium text-foreground/80 hover:text-primary transition-colors"
                  >
                    {item.label}
                    <ChevronDown
                      className={`w-4 h-4 transition-transform ${
                        openDropdown === item.label ? "rotate-180" : ""
                      }`}
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
              ) : (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(item.href);
                  }}
                  className="block text-sm font-medium text-foreground/80 hover:text-primary transition-colors"
                >
                  {item.label}
                </a>
              )
            )}
            <Button
              onClick={() => scrollToSection("#agendar")}
              className="w-full bg-gradient-premium hover:opacity-90 transition-opacity"
            >
              Agende sua Avaliação
            </Button>
          </div>
        )}
      </div>
    </nav>
  );
};
