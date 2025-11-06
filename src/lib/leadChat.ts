import { CONTACT } from "./constants";
import { trackEvent, trackPricingLeadConversion } from "./analytics";

export interface ConversionMetadata {
  section?: string;
  position?: "hero" | "middle" | "bottom";
  scroll_depth?: number;
}

/**
 * Opens the LeadChat widget with robust fallback handling
 * 
 * @param source - Tracking source identifier
 * @param fallbackUrl - WhatsApp URL to use if widget is unavailable
 * @param conversionMetadata - Optional metadata for conversion tracking
 * @returns Promise<boolean> - true if widget opened, false if fallback used
 */
export const openLeadChat = (
  source: string, 
  fallbackUrl?: string,
  conversionMetadata?: ConversionMetadata
): Promise<boolean> => {
  return new Promise((resolve) => {
    try {
      trackEvent("cta_clicked", { source, action: "attempt_widget" });
      
      // Check if widget is available
      if (typeof window !== "undefined" && window.LeadChat) {
        window.LeadChat.open();
        trackEvent("cta_clicked", { source, action: "widget_opened" });
        
        // Track pricing conversion if metadata provided
        if (conversionMetadata) {
          trackPricingLeadConversion({
            source,
            method: "widget",
            ...conversionMetadata,
          });
        }
        
        resolve(true);
        return;
      }
      
      // Retry after short delay (widget may still be loading)
      setTimeout(() => {
        if (window.LeadChat) {
          window.LeadChat.open();
          trackEvent("cta_clicked", { source, action: "widget_opened_delayed" });
          
          // Track pricing conversion if metadata provided
          if (conversionMetadata) {
            trackPricingLeadConversion({
              source,
              method: "widget",
              ...conversionMetadata,
            });
          }
          
          resolve(true);
        } else {
          // Fallback: open WhatsApp directly
          trackEvent("cta_clicked", { 
            source, 
            action: "fallback_whatsapp", 
            reason: "widget_not_available" 
          });
          
          // Track pricing conversion if metadata provided
          if (conversionMetadata) {
            trackPricingLeadConversion({
              source,
              method: "whatsapp",
              ...conversionMetadata,
            });
          }
          
          const url = fallbackUrl || CONTACT.WHATSAPP_URL;
          window.open(url, "_blank");
          resolve(false);
        }
      }, 300);
    } catch (error) {
      // Error handling: fallback to WhatsApp
      trackEvent("cta_error", { source, error: String(error) });
      
      // Track pricing conversion if metadata provided
      if (conversionMetadata) {
        trackPricingLeadConversion({
          source,
          method: "whatsapp",
          ...conversionMetadata,
        });
      }
      
      const url = fallbackUrl || CONTACT.WHATSAPP_URL;
      window.open(url, "_blank");
      resolve(false);
    }
  });
};
