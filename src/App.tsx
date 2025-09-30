import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import NutricaoCelular from "./pages/NutricaoCelular";
import TerapiasCirurgicas from "./pages/TerapiasCirurgicas";
import TerapiasEndoscopicas from "./pages/TerapiasEndoscopicas";
import GastroplastiaEndoscopica from "./pages/GastroplastiaEndoscopica";
import TerapiaSacietogena from "./pages/TerapiaSacietogena";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/nutricao-celular" element={<NutricaoCelular />} />
          <Route path="/terapias-cirurgicas" element={<TerapiasCirurgicas />} />
          <Route path="/terapias-endoscopicas" element={<TerapiasEndoscopicas />} />
          <Route path="/gastroplastia-endoscopica" element={<GastroplastiaEndoscopica />} />
          <Route path="/terapia-sacietogena" element={<TerapiaSacietogena />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
