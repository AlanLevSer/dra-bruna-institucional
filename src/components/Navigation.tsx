import { useState, useEffect, useRef, type ElementType } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, ChevronDown, Sparkles, Activity } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logoHeader from "@/assets/logo-header-hq.webp";

// ─── Theme System ──────────────────────────────────────────────────────────────

type NavTheme = "light" | "warm" | "terracotta" | "dark" | "photo";

interface NavThemeConfig {
  /** Background when NOT scrolled (transparent for light themes, subtle scrim for dark) */
  bg: string;
  /** Background when scrolled or mobile menu is open */
  bgScrolled: string;
  border: string;
  text: string;
  textHover: string;
  icon: string;
  logoFilter: string;
  ddBg: string;
  ddBorder: string;
  ddText: string;
  ddTextHover: string;
  ddHover: string;
  mobileMenuBg: string;
  groupLabel: string;
}

const NAV_THEMES: Record<NavTheme, NavThemeConfig> = {
  light: {
    bg: "transparent",
    bgScrolled: "hsl(0 0% 98% / 0.96)",
    border: "hsl(0 0% 88%)",
    text: "hsl(0 0% 16% / 0.82)",
    textHover: "hsl(16 51% 46%)",
    icon: "hsl(0 0% 16%)",
    logoFilter: "none",
    ddBg: "hsl(0 0% 100%)",
    ddBorder: "hsl(0 0% 88%)",
    ddText: "hsl(0 0% 16% / 0.8)",
    ddTextHover: "hsl(16 51% 46%)",
    ddHover: "hsl(0 0% 96%)",
    mobileMenuBg: "hsl(0 0% 100%)",
    groupLabel: "hsl(0 0% 50%)",
  },
  warm: {
    bg: "transparent",
    bgScrolled: "hsl(30 18% 97% / 0.97)",
    border: "hsl(16 28% 84%)",
    text: "hsl(16 18% 18% / 0.85)",
    textHover: "hsl(16 55% 34%)",
    icon: "hsl(16 18% 18%)",
    logoFilter: "none",
    ddBg: "hsl(30 20% 97%)",
    ddBorder: "hsl(16 28% 84%)",
    ddText: "hsl(16 18% 20% / 0.82)",
    ddTextHover: "hsl(16 55% 34%)",
    ddHover: "hsl(30 18% 93%)",
    mobileMenuBg: "hsl(30 18% 97%)",
    groupLabel: "hsl(16 20% 52%)",
  },
  terracotta: {
    bg: "transparent",
    bgScrolled: "hsl(16 38% 96% / 0.97)",
    border: "hsl(16 32% 80%)",
    text: "hsl(16 54% 22%)",
    textHover: "hsl(16 54% 36%)",
    icon: "hsl(16 54% 22%)",
    logoFilter: "none",
    ddBg: "hsl(30 20% 97%)",
    ddBorder: "hsl(16 32% 80%)",
    ddText: "hsl(16 54% 22%)",
    ddTextHover: "hsl(16 54% 36%)",
    ddHover: "hsl(16 28% 92%)",
    mobileMenuBg: "hsl(30 20% 97%)",
    groupLabel: "hsl(16 28% 52%)",
  },
  dark: {
    bg: "hsl(0 0% 8% / 0.55)",
    bgScrolled: "hsl(0 0% 8% / 0.96)",
    border: "hsl(0 0% 100% / 0.08)",
    text: "hsl(0 0% 90% / 0.85)",
    textHover: "hsl(16 51% 72%)",
    icon: "hsl(0 0% 90%)",
    logoFilter: "brightness(0) invert(1)",
    ddBg: "hsl(0 0% 12%)",
    ddBorder: "hsl(0 0% 100% / 0.1)",
    ddText: "hsl(0 0% 86%)",
    ddTextHover: "hsl(16 51% 72%)",
    ddHover: "hsl(0 0% 17%)",
    mobileMenuBg: "hsl(0 0% 12%)",
    groupLabel: "hsl(0 0% 56%)",
  },
  photo: {
    bg: "hsl(0 0% 0% / 0.28)",
    bgScrolled: "hsl(0 0% 5% / 0.85)",
    border: "hsl(0 0% 100% / 0.12)",
    text: "hsl(0 0% 95%)",
    textHover: "hsl(16 51% 80%)",
    icon: "hsl(0 0% 95%)",
    logoFilter: "brightness(0) invert(1)",
    ddBg: "hsl(0 0% 10%)",
    ddBorder: "hsl(0 0% 100% / 0.12)",
    ddText: "hsl(0 0% 86%)",
    ddTextHover: "hsl(16 51% 80%)",
    ddHover: "hsl(0 0% 16%)",
    mobileMenuBg: "hsl(0 0% 10%)",
    groupLabel: "hsl(0 0% 56%)",
  },
};

// ─── Nav Items ────────────────────────────────────────────────────────────────

interface SubMenuItem {
  label: string;
  href: string;
  isGroupHeader?: boolean;
  indent?: boolean;
  isDivider?: boolean;
  badge?: string;
  icon?: ElementType;
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
      { label: "Balão Intragástrico", href: "/balao-intragastrico", indent: true },
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
  { label: "Depoimentos", href: "/#depoimentos-google", type: "anchor" },
  {
    label: "Recursos",
    href: "/recursos",
    type: "dropdown",
    subItems: [
      { label: "Mapa Metabólico", href: "/mapa-metabolico", badge: "Novo", icon: Activity },
      { label: "Descubra Seu Caminho", href: "/quiz", badge: "Novo", icon: Sparkles },
      { label: "FAQ Completo", href: "/recursos#faq" },
      { label: "Calculadoras", href: "/recursos#calculadoras" },
      { label: "Ver tudo", href: "/recursos" },
    ],
  },
];

// ─── Component ────────────────────────────────────────────────────────────────

export const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [navTheme, setNavTheme] = useState<NavTheme>("light");

  const navRef = useRef<HTMLElement | null>(null);
  const dropdownTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);
  // tracks currently-intersecting themed sections: element → theme
  const visibleSections = useRef<Map<Element, NavTheme>>(new Map());

  const location = useLocation();
  const isHomePage = location.pathname === "/";
  const navigate = useNavigate();

  // ── Scroll listener: compact mode + --header-height var ──────────────────
  useEffect(() => {
    const handleScrollOrResize = () => {
      setIsScrolled(window.scrollY > 20);
      const h = navRef.current?.getBoundingClientRect().height ?? 80;
      document.documentElement.style.setProperty("--header-height", `${Math.ceil(h)}px`);
    };
    window.addEventListener("scroll", handleScrollOrResize, { passive: true });
    window.addEventListener("resize", handleScrollOrResize, { passive: true });
    handleScrollOrResize();
    return () => {
      window.removeEventListener("scroll", handleScrollOrResize);
      window.removeEventListener("resize", handleScrollOrResize);
    };
  }, []);

  // ── Scroll lock when mobile menu open ─────────────────────────────────────
  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isMobileMenuOpen]);

  // ── IntersectionObserver: adaptive theme per section ──────────────────────
  useEffect(() => {
    if (observerRef.current) observerRef.current.disconnect();
    visibleSections.current.clear();
    setNavTheme("light");

    const timeout = setTimeout(() => {
      const sections = document.querySelectorAll("[data-nav-theme]");
      if (!sections.length) return;

      observerRef.current = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            const theme = entry.target.getAttribute("data-nav-theme") as NavTheme;
            if (entry.isIntersecting && theme && theme in NAV_THEMES) {
              visibleSections.current.set(entry.target, theme);
            } else {
              visibleSections.current.delete(entry.target);
            }
          });

          // Among currently-intersecting sections, pick the one closest to
          // the top of the viewport. Positive tops (entering from below) beat
          // negative tops (already scrolled past). Within each group, prefer
          // the one with the smallest absolute distance from 0.
          let winner: NavTheme | null = null;
          let bestTop: number | null = null;

          visibleSections.current.forEach((theme, el) => {
            const top = el.getBoundingClientRect().top;
            if (bestTop === null) {
              bestTop = top;
              winner = theme;
            } else if (top >= 0 && (bestTop < 0 || top < bestTop)) {
              // Prefer positive tops; pick smallest positive
              bestTop = top;
              winner = theme;
            } else if (top < 0 && bestTop < 0 && top > bestTop) {
              // All negative: pick least-negative (most visible at top)
              bestTop = top;
              winner = theme;
            }
          });

          if (winner) setNavTheme(winner);
        },
        // Zone: from just below header (~80px) to top 50% of viewport.
        // Fires when a section enters or leaves this band.
        { rootMargin: "-80px 0px -50% 0px", threshold: 0 }
      );

      sections.forEach((s) => observerRef.current!.observe(s));
    }, 120);

    return () => {
      clearTimeout(timeout);
      observerRef.current?.disconnect();
    };
  }, [location.pathname]);

  // ── Navigation click handler ───────────────────────────────────────────────
  const handleNavClick = (href: string, type: string) => {
    setIsMobileMenuOpen(false);
    setOpenDropdown(null);

    if (type === "link" || href.startsWith("/")) {
      navigate(href);
      return;
    }

    if (href.startsWith("/#")) {
      if (!isHomePage) {
        navigate(href);
      } else {
        const element = document.querySelector(href.replace("/", ""));
        if (element) {
          const rootStyles = getComputedStyle(document.documentElement);
          const headerVar = rootStyles.getPropertyValue("--header-height").trim();
          const headerOffset = (parseInt(headerVar.replace("px", "")) || 80) + 8;
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
          window.scrollTo({ top: offsetPosition, behavior: "smooth" });
        }
      }
    }
  };

  // ── Computed theme values ──────────────────────────────────────────────────
  const t = NAV_THEMES[navTheme];
  const isActive = isScrolled || isMobileMenuOpen;
  // Dark/photo themes always need a background to keep text legible
  const needsBackground = isActive || navTheme === "dark" || navTheme === "photo";

  const navStyle = {
    // CSS custom properties cascade to all children
    "--nav-text": t.text,
    "--nav-text-hover": t.textHover,
    "--nav-icon": t.icon,
    "--nav-logo-filter": t.logoFilter,
    "--nav-dd-bg": t.ddBg,
    "--nav-dd-border": t.ddBorder,
    "--nav-dd-text": t.ddText,
    "--nav-dd-text-hover": t.ddTextHover,
    "--nav-dd-hover": t.ddHover,
    "--nav-mobile-bg": t.mobileMenuBg,
    "--nav-group-label": t.groupLabel,
    // Direct style overrides for the nav shell
    backgroundColor: needsBackground ? t.bgScrolled : t.bg,
    borderBottomColor: isActive ? t.border : "transparent",
  } as React.CSSProperties;

  // ── Render ─────────────────────────────────────────────────────────────────
  return (
    <nav
      ref={navRef}
      className={[
        "nav-adaptive",
        "fixed top-0 left-0 right-0 z-50 border-b",
        needsBackground ? "backdrop-blur-sm" : "",
        isActive ? "shadow-sm" : "",
      ]
        .filter(Boolean)
        .join(" ")}
      style={navStyle}
    >
      <div
        className={[
          "container mx-auto",
          isScrolled ? "py-2.5" : "py-4",
          "transition-[padding] duration-300 ease-out",
        ].join(" ")}
      >
        <div className="flex items-center justify-between px-4 lg:px-6 gap-4">
          {/* Logo */}
          <Link to="/" className="flex items-center shrink-0 lg:-ml-4">
            <img
              src={logoHeader}
              alt="Dra. Bruna Durelli - Especialista em Obesidade e Metabolismo"
              className={[
                "nav-logo w-auto hover:opacity-90 shrink-0",
                isScrolled
                  ? "h-14 md:h-16 lg:h-20"
                  : "h-20 md:h-24 lg:h-28",
              ].join(" ")}
              loading="eager"
              fetchPriority="high"
              width={112}
              height={112}
              style={{ imageRendering: "crisp-edges" }}
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
                    if (dropdownTimeoutRef.current) clearTimeout(dropdownTimeoutRef.current);
                    setOpenDropdown(item.label);
                  }}
                  onMouseLeave={() => {
                    dropdownTimeoutRef.current = setTimeout(() => setOpenDropdown(null), 150);
                  }}
                >
                  <button
                    className="nav-link-text text-sm lg:text-base font-medium flex items-center gap-0.5 py-1.5 whitespace-nowrap shrink-0"
                    aria-label={`Menu ${item.label}`}
                    aria-expanded={openDropdown === item.label}
                  >
                    {item.label}
                    <ChevronDown
                      className={`w-4 h-4 transition-transform ${openDropdown === item.label ? "rotate-180" : ""}`}
                      aria-hidden="true"
                    />
                  </button>

                  {openDropdown === item.label && (
                    <div className="nav-dropdown-panel absolute top-full left-0 mt-0 w-64 border rounded-lg shadow-hover z-50 py-2 animate-fade-in">
                      {item.subItems?.map((subItem, index) => {
                        if (subItem.isDivider) {
                          return (
                            <div
                              key={`divider-${index}`}
                              className="my-2 border-t"
                              style={{ borderColor: t.ddBorder }}
                            />
                          );
                        }
                        if (subItem.isGroupHeader) {
                          return (
                            <div
                              key={subItem.href}
                              className="nav-dropdown-group-label px-4 py-2 text-xs font-semibold uppercase tracking-wider"
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
                            className={`nav-dropdown-item flex items-center gap-2 px-4 py-3 text-sm ${
                              subItem.indent ? "pl-8" : ""
                            }`}
                          >
                            {Icon && (
                              <Icon
                                className="w-4 h-4 shrink-0"
                                style={{ color: t.textHover }}
                              />
                            )}
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
                  className="nav-link-text text-sm lg:text-base font-medium whitespace-nowrap shrink-0 py-1.5"
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
                  className="nav-link-text text-sm lg:text-base font-medium whitespace-nowrap shrink-0 py-1.5"
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

          {/* Mobile hamburger */}
          <button
            className="nav-icon lg:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-menu"
            aria-label={isMobileMenuOpen ? "Fechar menu" : "Abrir menu de navegação"}
          >
            {isMobileMenuOpen ? (
              <X size={24} aria-hidden="true" />
            ) : (
              <Menu size={24} aria-hidden="true" />
            )}
          </button>
        </div>

        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <>
            <div
              className="fixed inset-0 top-[var(--header-height)] bg-foreground/30 z-40"
              onClick={() => setIsMobileMenuOpen(false)}
              aria-hidden="true"
            />
            <div
              id="mobile-menu"
              className="nav-mobile-panel lg:hidden mt-4 p-4 pb-6 space-y-4 rounded-xl border shadow-hover animate-fade-in relative z-50 text-left"
            >
              {navItems.map((item) =>
                item.type === "dropdown" ? (
                  <div key={item.label} className="space-y-2">
                    <button
                      onClick={() =>
                        setOpenDropdown(openDropdown === item.label ? null : item.label)
                      }
                      className="nav-link-text w-full flex items-center justify-start gap-2 text-left text-sm font-medium"
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
                            return (
                              <div
                                key={`divider-${index}`}
                                className="my-2 border-t"
                                style={{ borderColor: t.ddBorder }}
                              />
                            );
                          }
                          if (subItem.isGroupHeader) {
                            return (
                              <div
                                key={subItem.href}
                                className="nav-dropdown-group-label py-1 text-xs font-semibold uppercase tracking-wider"
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
                              className={`nav-dropdown-item flex items-center gap-2 text-sm ${
                                subItem.indent ? "pl-4" : ""
                              }`}
                            >
                              {Icon && (
                                <Icon
                                  className="w-4 h-4 shrink-0"
                                  style={{ color: t.textHover }}
                                />
                              )}
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
                    className="nav-link-text block text-left text-sm font-medium"
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
                    className="nav-link-text block text-left text-sm font-medium"
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
