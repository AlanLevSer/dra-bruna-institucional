import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { initWebVitals, observePerformance } from "./lib/analytics";

// Initialize Web Vitals monitoring without blocking initial render
const bootstrapAnalytics = () => {
  initWebVitals();
  observePerformance();
};

if ("requestIdleCallback" in window) {
  requestIdleCallback(bootstrapAnalytics);
} else {
  setTimeout(bootstrapAnalytics, 1000);
}

createRoot(document.getElementById("root")!).render(<App />);
