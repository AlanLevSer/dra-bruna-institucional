import { onCLS, onFCP, onINP, onLCP, onTTFB, Metric } from 'web-vitals';

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
  }
}

function sendToAnalytics(metric: Metric) {
  // Send to Google Analytics 4 if available
  if (window.gtag) {
    window.gtag('event', metric.name, {
      value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
      metric_id: metric.id,
      metric_value: metric.value,
      metric_delta: metric.delta,
      event_category: 'Web Vitals',
    });
  }
  
  // Log in development
  if (import.meta.env.DEV) {
    console.log('📊 Web Vital:', {
      name: metric.name,
      value: metric.value,
      rating: metric.rating,
      delta: metric.delta,
    });
  }
}

export function initWebVitals() {
  onCLS(sendToAnalytics);
  onFCP(sendToAnalytics);
  onINP(sendToAnalytics);
  onLCP(sendToAnalytics);
  onTTFB(sendToAnalytics);
}

// Performance observer for custom metrics
export function observePerformance() {
  if (typeof PerformanceObserver === 'undefined') return;

  try {
    // Observe long tasks
    const longTaskObserver = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (entry.duration > 50 && import.meta.env.DEV) {
          console.warn('⚠️ Long task detected:', entry.duration.toFixed(2), 'ms');
        }
      }
    });
    
    if (PerformanceObserver.supportedEntryTypes?.includes('longtask')) {
      longTaskObserver.observe({ entryTypes: ['longtask'] });
    }
  } catch (e) {
    // Observer not supported
  }
}
