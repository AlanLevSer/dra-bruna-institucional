import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { initWebVitals, observePerformance } from './lib/analytics';

// Register service worker dynamically when idle
if ('serviceWorker' in navigator) {
  const scheduleSWRegistration = () => {
    const doRegister = async () => {
      const { registerSW } = await import('virtual:pwa-register');
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
    };
    
    if ('requestIdleCallback' in window) {
      (window as any).requestIdleCallback(doRegister, { timeout: 4000 });
    } else {
      setTimeout(doRegister, 3000);
    }
  };
  
  if (document.readyState === 'complete') {
    scheduleSWRegistration();
  } else {
    window.addEventListener('load', scheduleSWRegistration, { once: true });
  }
}

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
