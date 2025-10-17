import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation, Navigate } from "react-router-dom";
import { useEffect } from "react";
import { PerformanceMonitor } from "./components/dev/PerformanceMonitor";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import NutricaoCelular from "./pages/NutricaoCelular";
import BalaoIntragastrico from "./pages/BalaoIntragastrico";
import GastroplastiaEndoscopica from "./pages/GastroplastiaEndoscopica";
import CanetasEmagrecedoras from "./pages/CanetasEmagrecedoras";
import MedicinaRegenerativa from "./pages/MedicinaRegenerativa";
import PlasmaArgonio from "./pages/PlasmaArgonio";
import PoliticaPrivacidade from "./pages/PoliticaPrivacidade";
import TermosUso from "./pages/TermosUso";

const queryClient = new QueryClient();

const ScrollManager = () => {
  const location = useLocation();
  useEffect(() => {
    const rootStyles = getComputedStyle(document.documentElement);
    const headerVar = rootStyles.getPropertyValue('--header-height').trim();
    const headerOffset = (parseInt(headerVar.replace('px','')) || 80) + 8;

    if (!location.hash) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const el = document.querySelector(location.hash);
    if (el) {
      const y = el.getBoundingClientRect().top + window.pageYOffset - headerOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  }, [location.pathname, location.hash]);
  return null;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      {import.meta.env.DEV && <PerformanceMonitor />}
      <BrowserRouter>
        <ScrollManager />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/nutricao-celular" element={<NutricaoCelular />} />
          <Route path="/balao-intragastrico" element={<BalaoIntragastrico />} />
          <Route path="/terapias-endoscopicas" element={<BalaoIntragastrico />} /> {/* Redirect antigo */}
          <Route path="/gastroplastia-endoscopica" element={<GastroplastiaEndoscopica />} />
          <Route path="/canetas-emagrecedoras" element={<CanetasEmagrecedoras />} />
          <Route path="/terapia-sacietogena" element={<Navigate to="/canetas-emagrecedoras" replace />} />
          <Route path="/medicina-regenerativa" element={<MedicinaRegenerativa />} />
          <Route path="/plasma-argonio" element={<PlasmaArgonio />} />
          <Route path="/politica-privacidade" element={<PoliticaPrivacidade />} />
          <Route path="/termos-uso" element={<TermosUso />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
