import { useEffect, useRef } from 'react';
import { trackEvent } from '@/lib/analytics';
import { getStoredUTMContext } from '@/lib/utm';

interface PageTrackingOptions {
  pageName: string;
  pageType?: string;
  enableScrollTracking?: boolean;
  enableTimeTracking?: boolean;
  enableEngagementScore?: boolean;
}

const SCROLL_THRESHOLDS = [25, 50, 75, 100];
const TIME_THRESHOLDS = [30, 60, 120, 300]; // seconds

export const usePageTracking = ({
  pageName,
  pageType = 'landing_page',
  enableScrollTracking = true,
  enableTimeTracking = true,
  enableEngagementScore = true,
}: PageTrackingOptions) => {
  const scrollTracked = useRef<Set<number>>(new Set());
  const timeTracked = useRef<Set<number>>(new Set());
  const startTime = useRef<number>(Date.now());
  const maxScroll = useRef<number>(0);

  useEffect(() => {
    // Track page view
    const utmContext = getStoredUTMContext();
    
    trackEvent('page_view', {
      page_name: pageName,
      page_type: pageType,
      page_path: window.location.pathname,
      page_url: window.location.href,
      referrer: document.referrer,
      utm_source: utmContext.params.utm_source || '',
      utm_medium: utmContext.params.utm_medium || '',
      utm_campaign: utmContext.params.utm_campaign || '',
      device: /Mobi|Android/i.test(navigator.userAgent) ? 'mobile' : 'desktop',
      timestamp: new Date().toISOString(),
    });

    // Facebook Pixel PageView
    try {
      window.fbq?.('track', 'PageView', {
        content_name: pageName,
        content_category: pageType,
      });
    } catch (e) {
      void e;
    }
  }, [pageName, pageType]);

  useEffect(() => {
    if (!enableScrollTracking) return;

    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = Math.round((scrollTop / docHeight) * 100);

      // Update max scroll
      if (scrollPercent > maxScroll.current) {
        maxScroll.current = scrollPercent;
      }

      // Track scroll thresholds
      SCROLL_THRESHOLDS.forEach((threshold) => {
        if (scrollPercent >= threshold && !scrollTracked.current.has(threshold)) {
          scrollTracked.current.add(threshold);
          trackEvent('scroll_depth', {
            page_name: pageName,
            page_type: pageType,
            depth: threshold,
            timestamp: new Date().toISOString(),
          });
        }
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [enableScrollTracking, pageName, pageType]);

  useEffect(() => {
    if (!enableTimeTracking) return;

    const interval = setInterval(() => {
      const elapsed = Math.floor((Date.now() - startTime.current) / 1000);
      
      TIME_THRESHOLDS.forEach((threshold) => {
        if (elapsed >= threshold && !timeTracked.current.has(threshold)) {
          timeTracked.current.add(threshold);
          trackEvent('time_on_page', {
            page_name: pageName,
            page_type: pageType,
            seconds: threshold,
            timestamp: new Date().toISOString(),
          });
        }
      });
    }, 5000); // Check every 5 seconds

    return () => clearInterval(interval);
  }, [enableTimeTracking, pageName, pageType]);

  useEffect(() => {
    if (!enableEngagementScore) return;

    const calculateEngagement = () => {
      const timeScore = Math.min((Date.now() - startTime.current) / 1000 / 120, 1); // Max at 2 minutes
      const scrollScore = maxScroll.current / 100;
      const engagementScore = Math.round((timeScore * 0.5 + scrollScore * 0.5) * 100);

      trackEvent('engagement_score', {
        page_name: pageName,
        page_type: pageType,
        score: engagementScore,
        time_seconds: Math.floor((Date.now() - startTime.current) / 1000),
        max_scroll: maxScroll.current,
        timestamp: new Date().toISOString(),
      });
    };

    // Track on page unload
    const handleBeforeUnload = () => {
      calculateEngagement();
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [enableEngagementScore, pageName, pageType]);
};
