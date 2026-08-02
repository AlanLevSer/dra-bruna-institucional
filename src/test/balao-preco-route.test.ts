import { describe, it, expect, beforeEach, vi } from "vitest";
import { TRACKING_PARAM_KEYS, getTrackingParamsFromUrl } from "@/lib/tracking";

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const setLocationSearch = (search: string) => {
  Object.defineProperty(window, "location", {
    writable: true,
    configurable: true,
    value: {
      ...window.location,
      pathname: "/balao-intragastrico-preco-a",
      search,
      href: `https://www.brunadurelli.com.br/balao-intragastrico-preco-a${search}`,
    },
  });
};

// ---------------------------------------------------------------------------
// 1. TRACKING_PARAM_KEYS — novos campos desta branch
// ---------------------------------------------------------------------------

describe("TRACKING_PARAM_KEYS", () => {
  it("inclui campaign_id", () => {
    expect(TRACKING_PARAM_KEYS).toContain("campaign_id");
  });

  it("inclui ad_group_id", () => {
    expect(TRACKING_PARAM_KEYS).toContain("ad_group_id");
  });

  it("inclui keyword", () => {
    expect(TRACKING_PARAM_KEYS).toContain("keyword");
  });

  it("preserva utm_source, utm_campaign e gclid", () => {
    const required = ["utm_source", "utm_campaign", "gclid"] as const;
    for (const key of required) {
      expect(TRACKING_PARAM_KEYS).toContain(key);
    }
  });
});

// ---------------------------------------------------------------------------
// 2. getTrackingParamsFromUrl — cenários da rota de preço
// ---------------------------------------------------------------------------

describe("getTrackingParamsFromUrl", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it("rota direta sem parâmetros não lança exceção", () => {
    setLocationSearch("");
    expect(() => getTrackingParamsFromUrl()).not.toThrow();
  });

  it("preserva utm_source, utm_medium e utm_campaign", () => {
    setLocationSearch("?utm_source=google&utm_medium=cpc&utm_campaign=balao_preco");
    const params = getTrackingParamsFromUrl();
    expect(params.utm_source).toBe("google");
    expect(params.utm_medium).toBe("cpc");
    expect(params.utm_campaign).toBe("balao_preco");
  });

  it("preserva gclid sintético", () => {
    setLocationSearch("?gclid=CjwKCAjw_abc123");
    const params = getTrackingParamsFromUrl();
    expect(params.gclid).toBe("CjwKCAjw_abc123");
  });

  it("captura campaign_id e ad_group_id", () => {
    setLocationSearch("?campaign_id=23236971034&ad_group_id=987654321");
    const params = getTrackingParamsFromUrl();
    expect(params.campaign_id).toBe("23236971034");
    expect(params.ad_group_id).toBe("987654321");
  });

  it("lida com placeholder literal {campaignname} codificado sem lançar erro", () => {
    setLocationSearch("?utm_campaign=%7Bcampaignname%7D");
    expect(() => getTrackingParamsFromUrl()).not.toThrow();
    const params = getTrackingParamsFromUrl();
    expect(typeof params.utm_campaign).toBe("string");
  });

  it("lida com placeholder literal {campaignname} não codificado sem lançar erro", () => {
    setLocationSearch("?utm_campaign={campaignname}");
    expect(() => getTrackingParamsFromUrl()).not.toThrow();
  });

  it("parâmetros desconhecidos não afetam parâmetros conhecidos", () => {
    setLocationSearch("?utm_source=google&unknown_param=xyz");
    const params = getTrackingParamsFromUrl();
    expect(params.utm_source).toBe("google");
  });
});

// ---------------------------------------------------------------------------
// 3. vercel.json — rota presente na lista de rewrites
// ---------------------------------------------------------------------------

describe("vercel.json — rota balao-intragastrico-preco-a", async () => {
  const vercelConfig = (await import("../../vercel.json")) as {
    rewrites?: Array<{ source: string; destination: string }>;
    redirects?: Array<{ source: string; destination: string }>;
  };

  it("rota está na lista de rewrites do Vercel", () => {
    const rewrite = vercelConfig.rewrites?.find((r) =>
      r.source.includes("balao-intragastrico-preco-a")
    );
    expect(rewrite).toBeDefined();
  });

  it("não existe redirect permanente para a rota de preço", () => {
    const redirect = vercelConfig.redirects?.find((r) =>
      r.source.includes("balao-intragastrico-preco-a")
    );
    expect(redirect).toBeUndefined();
  });
});

// ---------------------------------------------------------------------------
// 4. openLeadChat — cta_source passado para window.LeadChat.open
// ---------------------------------------------------------------------------

describe("openLeadChat — cta_source passado ao widget", () => {
  it("chama window.LeadChat.open com cta_source correto", async () => {
    const open = vi.fn();
    (window as unknown as Record<string, unknown>).LeadChat = {
      open,
      close: vi.fn(),
      isOpen: () => false,
    };

    const { openLeadChat } = await import("@/lib/leadChat");
    openLeadChat("hero_price_primary");

    expect(open).toHaveBeenCalledWith(
      expect.objectContaining({ cta_source: "hero_price_primary" })
    );

    delete (window as unknown as Record<string, unknown>).LeadChat;
  });

  it("sticky_price_mobile é passado como cta_source", async () => {
    const open = vi.fn();
    (window as unknown as Record<string, unknown>).LeadChat = {
      open,
      close: vi.fn(),
      isOpen: () => false,
    };

    const { openLeadChat } = await import("@/lib/leadChat");
    openLeadChat("sticky_price_mobile");

    expect(open).toHaveBeenCalledWith(
      expect.objectContaining({ cta_source: "sticky_price_mobile" })
    );

    delete (window as unknown as Record<string, unknown>).LeadChat;
  });
});

// ---------------------------------------------------------------------------
// 5. StickyPriceCtaMobile — exportação correta
// ---------------------------------------------------------------------------

describe("StickyPriceCtaMobile", () => {
  it("exporta componente nomeado sem erro de importação", async () => {
    const mod = await import("@/components/vendas/StickyPriceCtaMobile");
    expect(mod.StickyPriceCtaMobile).toBeDefined();
    expect(typeof mod.StickyPriceCtaMobile).toBe("function");
  });
});
