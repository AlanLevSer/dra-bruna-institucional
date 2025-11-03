import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation, Navigate } from "react-router-dom";
import { Suspense, lazy, useEffect } from "react";
import { PerformanceMonitor } from "./components/dev/PerformanceMonitor";
import { AnalyticsLoader } from "./components/AnalyticsLoader";
import { rememberVisitContext } from "@/lib/utm";

const Index = lazy(() => import("./pages/Index"));
const NotFound = lazy(() => import("./pages/NotFound"));
const Sobre = lazy(() => import("./pages/Sobre"));
const ProgramaLevSerPage = lazy(() => import("./pages/ProgramaLevSerPage"));
const Tratamentos = lazy(() => import("./pages/Tratamentos"));
const Recursos = lazy(() => import("./pages/Recursos"));
const NutricaoCelular = lazy(() => import("./pages/NutricaoCelular"));
const BalaoIntragastrico = lazy(() => import("./pages/BalaoIntragastrico"));
const GastroplastiaEndoscopica = lazy(() => import("./pages/GastroplastiaEndoscopica"));
const CanetasEmagrecedoras = lazy(() => import("./pages/CanetasEmagrecedoras"));
const MedicinaRegenerativa = lazy(() => import("./pages/MedicinaRegenerativa"));
const PlasmaArgonio = lazy(() => import("./pages/PlasmaArgonio"));
const PoliticaPrivacidade = lazy(() => import("./pages/PoliticaPrivacidade"));
const TermosUso = lazy(() => import("./pages/TermosUso"));
const Quiz = lazy(() => import("./pages/Quiz"));
const BalaoVendas = lazy(() => import("./pages/BalaoVendas"));
const BalaoIntragasticoB = lazy(() => import("./pages/BalaoIntragasticoB"));
const PlasmaArgonioVendas = lazy(() => import("./pages/PlasmaArgonioVendas"));

const queryClient = new QueryClient();

const ScrollManager = () => {
  const location = useLocation();
  useEffect(() => {
    rememberVisitContext();

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
      <AnalyticsLoader />
      {import.meta.env.DEV && <PerformanceMonitor />}
      <BrowserRouter
        future={{
          v7_startTransition: true,
          v7_relativeSplatPath: true
        }}
      >
        <ScrollManager />
        <Suspense fallback={<div className="min-h-[40vh] w-full flex items-center justify-center bg-background"><div className="animate-spin rounded-full h-10 w-10 border-2 border-primary border-t-transparent" aria-label="Carregando" /></div>}>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/sobre" element={<Sobre />} />
            <Route path="/programa-levser" element={<ProgramaLevSerPage />} />
            <Route path="/tratamentos" element={<Tratamentos />} />
            <Route path="/recursos" element={<Recursos />} />
            <Route path="/quiz" element={<Quiz />} />
            <Route path="/descubra-seu-caminho" element={<Quiz />} />
            <Route path="/nutricao-celular" element={<NutricaoCelular />} />
            <Route path="/balao-intragastrico" element={<BalaoIntragastrico />} />
            <Route path="/balão-intragastrico" element={<Navigate to="/balao-intragastrico" replace />} />
            <Route path="/balao-intragastrico-a" element={<BalaoVendas />} />
            <Route path="/balão-intragastrico-a" element={<Navigate to="/balao-intragastrico-a" replace />} />
            <Route path="/balao-intragastrico-b" element={<BalaoIntragasticoB />} />
            <Route path="/balão-intragastrico-b" element={<Navigate to="/balao-intragastrico-b" replace />} />
            <Route path="/terapias-endoscopicas" element={<Navigate to="/balao-intragastrico" replace />} />
            <Route path="/gastroplastia-endoscopica" element={<GastroplastiaEndoscopica />} />
            <Route path="/canetas-emagrecedoras" element={<CanetasEmagrecedoras />} />
            <Route path="/terapia-sacietogena" element={<Navigate to="/canetas-emagrecedoras" replace />} />
            <Route path="/medicina-regenerativa" element={<MedicinaRegenerativa />} />
            <Route path="/plasma-argonio" element={<PlasmaArgonio />} />
            <Route path="/plasma-de-argonio-a" element={<PlasmaArgonioVendas />} />
            <Route path="/plasma-argonio-a" element={<Navigate to="/plasma-de-argonio-a" replace />} />
            <Route path="/politica-privacidade" element={<PoliticaPrivacidade />} />
            <Route path="/termos-uso" element={<TermosUso />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
