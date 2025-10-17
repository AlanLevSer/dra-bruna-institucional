import { useEffect, useState } from 'react';
import { onCLS, onFCP, onINP, onLCP, onTTFB, Metric } from 'web-vitals';

interface Metrics {
  lcp?: number;
  fcp?: number;
  inp?: number;
  cls?: number;
  ttfb?: number;
}

export const PerformanceMonitor = () => {
  const [metrics, setMetrics] = useState<Metrics>({});
  const [isMinimized, setIsMinimized] = useState(false);

  useEffect(() => {
    const updateMetric = (metric: Metric) => {
      setMetrics(prev => ({
        ...prev,
        [metric.name.toLowerCase()]: metric.value
      }));
    };

    onLCP(updateMetric);
    onFCP(updateMetric);
    onINP(updateMetric);
    onCLS(updateMetric);
    onTTFB(updateMetric);
  }, []);

  if (import.meta.env.PROD) return null;

  const getRating = (name: string, value: number) => {
    const thresholds = {
      lcp: { good: 2500, poor: 4000 },
      fcp: { good: 1800, poor: 3000 },
      inp: { good: 200, poor: 500 },
      cls: { good: 0.1, poor: 0.25 },
      ttfb: { good: 800, poor: 1800 },
    };

    const threshold = thresholds[name as keyof typeof thresholds];
    if (!threshold) return 'text-muted-foreground';
    
    if (value <= threshold.good) return 'text-green-500';
    if (value <= threshold.poor) return 'text-yellow-500';
    return 'text-red-500';
  };

  const formatValue = (name: string, value?: number) => {
    if (value === undefined) return '-';
    if (name === 'cls') return value.toFixed(3);
    return `${Math.round(value)}ms`;
  };

  if (isMinimized) {
    return (
      <button
        onClick={() => setIsMinimized(false)}
        className="fixed bottom-4 right-4 bg-background/95 border border-border text-foreground px-3 py-2 rounded-lg text-xs font-mono shadow-lg hover:bg-accent transition-colors z-50"
      >
        📊 Metrics
      </button>
    );
  }

  return (
    <div className="fixed bottom-4 right-4 bg-background/95 backdrop-blur-sm border border-border text-foreground p-4 rounded-lg shadow-xl z-50 w-64">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-semibold text-sm flex items-center gap-2">
          📊 Performance Metrics
        </h3>
        <button
          onClick={() => setIsMinimized(true)}
          className="text-muted-foreground hover:text-foreground transition-colors"
        >
          ✕
        </button>
      </div>
      
      <ul className="space-y-2 text-xs font-mono">
        <li className="flex justify-between items-center">
          <span className="text-muted-foreground">LCP:</span>
          <span className={getRating('lcp', metrics.lcp || 0)}>
            {formatValue('lcp', metrics.lcp)}
          </span>
        </li>
        <li className="flex justify-between items-center">
          <span className="text-muted-foreground">FCP:</span>
          <span className={getRating('fcp', metrics.fcp || 0)}>
            {formatValue('fcp', metrics.fcp)}
          </span>
        </li>
        <li className="flex justify-between items-center">
          <span className="text-muted-foreground">INP:</span>
          <span className={getRating('inp', metrics.inp || 0)}>
            {formatValue('inp', metrics.inp)}
          </span>
        </li>
        <li className="flex justify-between items-center">
          <span className="text-muted-foreground">CLS:</span>
          <span className={getRating('cls', metrics.cls || 0)}>
            {formatValue('cls', metrics.cls)}
          </span>
        </li>
        <li className="flex justify-between items-center">
          <span className="text-muted-foreground">TTFB:</span>
          <span className={getRating('ttfb', metrics.ttfb || 0)}>
            {formatValue('ttfb', metrics.ttfb)}
          </span>
        </li>
      </ul>
      
      <div className="mt-3 pt-3 border-t border-border text-xs text-muted-foreground">
        <div className="flex gap-3">
          <span className="text-green-500">● Good</span>
          <span className="text-yellow-500">● Needs Improvement</span>
          <span className="text-red-500">● Poor</span>
        </div>
      </div>
    </div>
  );
};
