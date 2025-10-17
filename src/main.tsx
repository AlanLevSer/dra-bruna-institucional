import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { registerSW } from 'virtual:pwa-register';
import { initWebVitals, observePerformance } from './lib/analytics';

// Register service worker
const updateSW = registerSW({
  onNeedRefresh() {
    if (confirm('Nova versão disponível. Atualizar agora?')) {
      updateSW(true);
    }
  },
  onOfflineReady() {
    console.log('App pronto para funcionar offline');
  },
});

// Initialize Web Vitals monitoring
if ('requestIdleCallback' in window) {
  requestIdleCallback(() => {
    initWebVitals();
    observePerformance();
  });
} else {
  setTimeout(() => {
    initWebVitals();
    observePerformance();
  }, 1000);
}

createRoot(document.getElementById("root")!).render(<App />);
