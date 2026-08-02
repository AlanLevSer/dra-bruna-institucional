import { describe, it, expect, vi, beforeEach } from "vitest";
import { readFileSync } from "fs";
import { resolve } from "path";

// ---------------------------------------------------------------------------
// 1. TRACKING_PARAM_KEYS — campos de atribuição presentes
// ---------------------------------------------------------------------------

describe("TRACKING_PARAM_KEYS — campos de atribuição Google Ads", () => {
  it("contém campaign_id, ad_group_id e keyword", async () => {
    const { TRACKING_PARAM_KEYS } = await import("@/lib/tracking");
    expect(TRACKING_PARAM_KEYS).toContain("campaign_id");
    expect(TRACKING_PARAM_KEYS).toContain("ad_group_id");
    expect(TRACKING_PARAM_KEYS).toContain("keyword");
  });
});

// ---------------------------------------------------------------------------
// 2. buildLeadTrackingPayload — campos chegam no payload
// ---------------------------------------------------------------------------

describe("buildLeadTrackingPayload — propagação de campaign_id/ad_group_id/keyword", () => {
  beforeEach(() => {
    sessionStorage.clear();
    localStorage.clear();
    vi.resetModules();
  });

  it("retorna campaign_id, ad_group_id e keyword vindos da URL", async () => {
    Object.defineProperty(window, "location", {
      writable: true,
      configurable: true,
      value: {
        pathname: "/balao-intragastrico-preco-a",
        search: "?campaign_id=23236971034&ad_group_id=987&keyword=balao+gastrico",
        hash: "",
        href: "https://www.brunadurelli.com.br/balao-intragastrico-preco-a?campaign_id=23236971034&ad_group_id=987&keyword=balao+gastrico",
      },
    });

    const { buildLeadTrackingPayload } = await import("@/lib/tracking");
    const payload = buildLeadTrackingPayload();

    expect(payload.campaign_id).toBe("23236971034");
    expect(payload.ad_group_id).toBe("987");
    expect(payload.keyword).toBe("balao gastrico"); // URLSearchParams decodifica + como espaço
  });

  it("payload não expõe campos como string 'undefined'", async () => {
    Object.defineProperty(window, "location", {
      writable: true,
      configurable: true,
      value: {
        pathname: "/balao-intragastrico-preco-a",
        search: "",
        hash: "",
        href: "https://www.brunadurelli.com.br/balao-intragastrico-preco-a",
      },
    });

    const { buildLeadTrackingPayload } = await import("@/lib/tracking");
    const payload = buildLeadTrackingPayload();
    const serialized = JSON.parse(JSON.stringify(payload));

    for (const [key, value] of Object.entries(serialized)) {
      expect(value, `campo "${key}" não deve ser a string "undefined"`).not.toBe("undefined");
    }
  });
});

// ---------------------------------------------------------------------------
// 3. webhookProxy — contrato HTTP verificado no código-fonte
// ---------------------------------------------------------------------------

describe("webhookProxy — contrato HTTP (via análise de fonte)", () => {
  const source = readFileSync(
    resolve(__dirname, "../../api/_shared/webhookProxy.ts"),
    "utf8",
  );

  it("retorna 405 para métodos não-POST", () => {
    expect(source).toContain("method_not_allowed");
    expect(source).toContain("405");
  });

  it("retorna 204 para preflight OPTIONS", () => {
    expect(source).toContain("OPTIONS");
    expect(source).toContain("204");
  });

  it("retorna 400 para body vazio", () => {
    expect(source).toContain("empty_body");
    expect(source).toContain("400");
  });

  it("retorna 400 para JSON inválido", () => {
    expect(source).toContain("invalid_json");
    expect(source).toContain("400");
  });

  it("retorna 500 quando env var ausente", () => {
    expect(source).toContain("missing_webhook_env");
    expect(source).toContain("500");
  });

  it("suporta allowMissingEnv para ambientes sem webhook configurado", () => {
    expect(source).toContain("allowMissingEnv");
    expect(source).toContain("skipped");
  });

  it("retorna 502 quando Make.com falha", () => {
    expect(source).toContain("webhook_forward_failed");
    expect(source).toContain("502");
  });

  it("não expõe PII em logs de produção", () => {
    // Prod não deve logar body — apenas erros controlados sem dados do usuário
    expect(source).not.toContain("console.log");
    expect(source).not.toContain("console.error");
  });
});

// ---------------------------------------------------------------------------
// 4. LeadChatWidget — baseWebhookPayload contém os três campos
// ---------------------------------------------------------------------------

describe("LeadChatWidget — baseWebhookPayload contém campaign_id/ad_group_id/keyword", () => {
  const source = readFileSync(
    resolve(__dirname, "../components/LeadChatWidget.tsx"),
    "utf8",
  );

  it("referencia campaign_id no baseWebhookPayload", () => {
    expect(source).toContain("campaign_id: trackingPayload.campaign_id");
  });

  it("referencia ad_group_id no baseWebhookPayload", () => {
    expect(source).toContain("ad_group_id: trackingPayload.ad_group_id");
  });

  it("referencia keyword no baseWebhookPayload", () => {
    expect(source).toContain("keyword: trackingPayload.keyword");
  });
});

// ---------------------------------------------------------------------------
// 5. FinalCTAVendasPreco — semântica WhatsApp (não voz)
// ---------------------------------------------------------------------------

describe("FinalCTAVendasPreco — semântica do canal de contato", () => {
  const source = readFileSync(
    resolve(__dirname, "../components/vendas/FinalCTAVendasPreco.tsx"),
    "utf8",
  );

  it("usa texto 'Falar pelo WhatsApp' (não 'Ligar' ou 'Ligar para')", () => {
    expect(source).toContain("Falar pelo WhatsApp");
    expect(source).not.toContain("WhatsApp · Ligar");
    expect(source).not.toContain("Ligar para");
  });

  it("usa ícone SVG do WhatsApp (não ícone Phone)", () => {
    expect(source).toContain("WhatsAppIcon");
    expect(source).not.toContain("import { Phone");
    expect(source).not.toContain("<Phone");
  });

  it("número não tem underline (não é link de voz)", () => {
    expect(source).not.toContain("underline underline-offset");
  });

  it("dispara evento whatsapp_phone_row (não phone_click)", () => {
    expect(source).toContain("whatsapp_phone_row");
    expect(source).not.toContain("phone_click");
  });
});

// ---------------------------------------------------------------------------
// 6. openLeadChat — exatamente 1 cta_clicked por clique, com cta_source
// ---------------------------------------------------------------------------

describe("openLeadChat — exatamente 1 cta_clicked por clique", () => {
  beforeEach(() => {
    vi.resetModules();
    sessionStorage.clear();
    localStorage.clear();
    Object.defineProperty(window, "location", {
      writable: true,
      configurable: true,
      value: {
        pathname: "/balao-intragastrico-preco-a",
        search: "",
        hash: "",
        href: "https://www.brunadurelli.com.br/balao-intragastrico-preco-a",
      },
    });
  });

  it("dispara cta_clicked exatamente 1x quando widget disponível", async () => {
    const pushedEvents: Array<Record<string, unknown>> = [];
    Object.defineProperty(window, "dataLayer", { writable: true, configurable: true, value: pushedEvents });
    Object.defineProperty(window, "LeadChat", {
      writable: true,
      configurable: true,
      value: { open: vi.fn(), close: vi.fn(), isOpen: () => false },
    });

    const { openLeadChat } = await import("@/lib/leadChat");
    openLeadChat("sticky_price_mobile");

    const ctaEvents = pushedEvents.filter((e) => e.event === "cta_clicked");
    expect(ctaEvents).toHaveLength(1);
    expect(ctaEvents[0].source).toBe("sticky_price_mobile");
    expect(ctaEvents[0].cta_source).toBe("sticky_price_mobile");
  });

  it("cta_clicked inclui cta_source e não dispara novamente em widget_opened", async () => {
    const pushedEvents: Array<Record<string, unknown>> = [];
    Object.defineProperty(window, "dataLayer", { writable: true, configurable: true, value: pushedEvents });
    Object.defineProperty(window, "LeadChat", {
      writable: true,
      configurable: true,
      value: { open: vi.fn(), close: vi.fn(), isOpen: () => false },
    });

    const { openLeadChat } = await import("@/lib/leadChat");
    await openLeadChat("hero_price_primary");

    // Exatamente 1 — sem duplicata "widget_opened"
    const ctaEvents = pushedEvents.filter((e) => e.event === "cta_clicked");
    expect(ctaEvents).toHaveLength(1);
    // Não deve existir action=widget_opened como cta_clicked
    const legacyWidgetOpened = pushedEvents.find(
      (e) => e.event === "cta_clicked" && e.action === "widget_opened",
    );
    expect(legacyWidgetOpened).toBeUndefined();
  });

  it("quando widget indisponível usa leadchat_open_attempt (não cta_clicked) para fallback", async () => {
    const pushedEvents: Array<Record<string, unknown>> = [];
    Object.defineProperty(window, "dataLayer", { writable: true, configurable: true, value: pushedEvents });
    // Sem window.LeadChat — força fallback
    Object.defineProperty(window, "LeadChat", { writable: true, configurable: true, value: undefined });
    // Suprime window.open
    Object.defineProperty(window, "open", { writable: true, configurable: true, value: vi.fn() });

    const { openLeadChat } = await import("@/lib/leadChat");
    await openLeadChat("whatsapp_phone_row");
    await new Promise((r) => setTimeout(r, 400));

    const ctaEvents = pushedEvents.filter((e) => e.event === "cta_clicked");
    expect(ctaEvents).toHaveLength(1); // apenas o do clique inicial
    const fallbackAttempt = pushedEvents.find(
      (e) => e.event === "leadchat_open_attempt" && e.outcome === "whatsapp_fallback",
    );
    expect(fallbackAttempt).toBeDefined();
  });
});
