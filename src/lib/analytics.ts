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

// Custom event tracking
export function trackEvent(eventName: string, params?: Record<string, any>) {
  if (window.gtag) {
    window.gtag('event', eventName, params);
  }
  
  if (import.meta.env.DEV) {
    console.log('📊 GA4 Event:', eventName, params);
  }
}

// Helper: Bucket de valores para evitar PII
export function getValueBucket(value: number): string {
  if (value === 0) return '0';
  if (value <= 500) return '1-500';
  if (value <= 1000) return '501-1000';
  if (value <= 2000) return '1001-2000';
  if (value <= 3000) return '2001-3000';
  return '3000+';
}

// Perfil de Saúde events
export function trackPerfilSaudeViewed(notaGlobal: number, conceito: string) {
  trackEvent('perfil_saude_viewed', {
    nota_global_bucket: getValueBucket(notaGlobal),
    conceito,
  });
}

export function trackPerfilSaudeExported(format: 'png' | 'pdf', notaGlobal: number) {
  trackEvent('perfil_saude_exported', {
    format,
    nota_global_bucket: getValueBucket(notaGlobal),
  });
}

export function trackPerfilSaudeCTAClicked(notaGlobal: number, conceito: string, problemasQtd: number) {
  trackEvent('perfil_saude_cta_clicked', {
    nota_global_bucket: getValueBucket(notaGlobal),
    conceito,
    problemas_qtd: problemasQtd,
  });
}

// Tracking de micro-CTA
export function trackMicroCTAClick(message: string, position: string) {
  trackEvent('quiz_micro_cta_clicked', { 
    message,
    position,
    timestamp: new Date().toISOString()
  });
}

// Tracking de seção vista (usar Intersection Observer)
export function trackOutputSectionViewed(section: string, timeSpent: number) {
  trackEvent('quiz_output_section_viewed', { 
    section,
    time_spent_seconds: timeSpent
  });
}

// Tracking de scroll depth
export function trackOutputScrollDepth(depth: number) {
  trackEvent('quiz_output_scroll_depth', { 
    depth_percentage: depth
  });
}

// Tracking de CTA final
export function trackFinalCTAClick(ctaType: 'presencial' | 'teleconsulta' | 'duvidas') {
  trackEvent('quiz_final_cta_clicked', { 
    cta_type: ctaType,
    timestamp: new Date().toISOString()
  });
}
