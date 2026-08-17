const GRAFISMO_URL = "/levser-grafismo.avif";

interface GrafismoDecorProps {
  variant?: "hero" | "background" | "accent" | "floating";
  position?: "top-right" | "top-left" | "bottom-right" | "bottom-left" | "center";
  size?: "sm" | "md" | "lg" | "xl";
  opacity?: number;
  rotate?: number;
  color?: "primary" | "secondary" | "accent" | "gray";
  eager?: boolean;
}

export const GrafismoDecor = ({
  variant = "background",
  position = "top-right",
  size = "md",
  opacity = 0.25,
  rotate = 0,
  color = "gray",
  eager = false,
}: GrafismoDecorProps) => {
  const sizeClasses = {
    sm: "w-32 h-32",
    md: "w-48 h-48",
    lg: "w-64 h-64",
    xl: "w-96 h-96",
  };

  const positionClasses = {
    "top-right": "top-0 right-0",
    "top-left": "top-0 left-0",
    "bottom-right": "bottom-0 right-0",
    "bottom-left": "bottom-0 left-0",
    "center": "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
  };

  const variantStyles = {
    hero: "",
    background: "blur-sm",
    accent: "",
    floating: "animate-pulse blur-sm",
  };

  const colorFilters = {
    primary: "hue-rotate-0",
    secondary: "hue-rotate-[145deg]",
    accent: "hue-rotate-[35deg]",
    gray: "grayscale",
  };

  return (
    <div
      className={`absolute ${positionClasses[position]} ${sizeClasses[size]} ${variantStyles[variant]} ${colorFilters[color]} pointer-events-none`}
      style={{ opacity, transform: `rotate(${rotate}deg)` }}
      aria-hidden="true"
    >
      <img
        src={GRAFISMO_URL}
        alt=""
        aria-hidden="true"
        loading={eager ? "eager" : "lazy"}
        fetchPriority="low"
        className="w-full h-full object-contain"
      />
    </div>
  );
};
