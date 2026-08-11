import { CONTACT } from "./constants";
import { trackEvent, trackPricingLeadConversion, trackWhatsAppClick } from "./analytics";
import { buildLeadTrackingPayload } from "./tracking";

export interface ConversionMetadata {
  section?: string;
  position?: "hero" | "middle" | "bottom";
  scroll_depth?: number;
  program_selected?: string;
}

export const openLeadChat = (
  source: string,
  fallbackUrl?: string,
  conversionMetadata?: ConversionMetadata
): Promise<boolean> => {
  return new Promise((resolve) => {
    try {
      // Exatamente 1 cta_clicked por ação real do usuário, com campos de atribuição Google Ads
      const trackingPayload = buildLeadTrackingPayload();
      trackEvent("cta_clicked", {
        source,
        cta_source: source,
        ...(trackingPayload.campaign_id ? { campaign_id: trackingPayload.campaign_id } : {}),
        ...(trackingPayload.ad_group_id ? { ad_group_id: trackingPayload.ad_group_id } : {}),
        ...(trackingPayload.keyword ? { keyword: trackingPayload.keyword } : {}),
      });

      if (typeof window !== "undefined" && window.LeadChat) {
        window.LeadChat.open({ cta_source: source, program_selected: conversionMetadata?.program_selected });
        // chat_open é disparado dentro de LeadChatWidget.handleOpen — sem segundo cta_clicked aqui

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

      // Evento técnico: widget ainda não montado, tentando retry
      trackEvent("leadchat_open_attempt", { source, outcome: "retry_pending" });

      setTimeout(() => {
        if (window.LeadChat) {
          window.LeadChat.open({ cta_source: source, program_selected: conversionMetadata?.program_selected });
          // chat_open disparado pelo widget — sem cta_clicked extra aqui

          if (conversionMetadata) {
            trackPricingLeadConversion({
              source,
              method: "widget",
              ...conversionMetadata,
            });
          }

          resolve(true);
        } else {
          // Widget indisponível — fallback WhatsApp direto (evento técnico, não conversão)
          trackEvent("leadchat_open_attempt", {
            source,
            outcome: "whatsapp_fallback",
            reason: "widget_not_available",
          });

          if (conversionMetadata) {
            trackPricingLeadConversion({
              source,
              method: "whatsapp",
              ...conversionMetadata,
            });
          }

          const url = fallbackUrl || CONTACT.WHATSAPP_URL;
          trackWhatsAppClick(source, { action: "fallback_whatsapp", destination_url: url });
          window.open(url, "_blank");
          resolve(false);
        }
      }, 300);
    } catch (error) {
      trackEvent("cta_error", { source, error: String(error) });

      if (conversionMetadata) {
        trackPricingLeadConversion({
          source,
          method: "whatsapp",
          ...conversionMetadata,
        });
      }

      const url = fallbackUrl || CONTACT.WHATSAPP_URL;
      trackWhatsAppClick(source, { action: "fallback_whatsapp", destination_url: url });
      window.open(url, "_blank");
      resolve(false);
    }
  });
};
