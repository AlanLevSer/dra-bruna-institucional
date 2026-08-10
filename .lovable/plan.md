# LP C1 — Rota de aquisição GLP-1/GIP (LevSer)

## Fase 1 — Auditoria (concluída)

O que já existe e será **reutilizado sem reconstrução**:

| Item | Onde está | Situação |
| --- | --- | --- |
| LeadChat (nome, telefone, e-mail) | `src/components/LeadChatWidget.tsx` | Reutilizar como está. Montado por página via `<div id="lead-chat-widget">` + lazy import. |
| Abertura do LeadChat | `openLeadChat(source, fallbackUrl?)` em `src/lib/leadChat.ts` | Registra `cta_clicked` com `cta_source`, chama `window.LeadChat.open({ cta_source })`, com fallback para WhatsApp. |
| Webhook / Kommo | `submitLeadPayload()` em `src/lib/leadDelivery.ts` → `POST /api/lead` → `api/lead.ts` → `MAKE_LEAD_WEBHOOK_URL` | Reutilizar. Não criar segundo webhook. |
| Tracking / UTM / GCLID | `src/lib/tracking.ts` (`TRACKING_PARAM_KEYS`, `persistTrackingParams`, `buildLeadTrackingPayload`, `trackEvent`) + `src/lib/utm.ts` | Persistência first/last touch em session/localStorage, já capturando utm_*, gclid, gbraid, wbraid, fbclid, campaign_id, ad_group_id, keyword. |
| GTM/GA4/Meta | `trackEvent` empurra para `dataLayer`, `gtag` e `fbq`; `AnalyticsLoader` | Reutilizar. |
| WhatsApp | `CONTACT.WHATSAPP_URL` em `src/lib/constants.ts`, `trackWhatsAppClick` | Reutilizar. |
| SEO / rodapé / design system | `SEOHead`, `Footer`, tokens em `src/index.css`, componentes shadcn | Reutilizar. |
| Padrão de rotas | `src/App.tsx` com `lazy()` + rota kebab-case; LPs pagas usam sufixo de variante (`-a`, `-b`, `-preco-a`) | Seguir o mesmo padrão. |
| Assets | `dra-bruna-hero.avif`, `dra-bruna-professional.avif`, `levser-grafismo.avif` | Reutilizar. Nenhuma imagem nova gerada. |

**Lacunas encontradas** (confirmadas por busca no código — não existem hoje em nenhum arquivo):

- `ad_id`, `route_intent`, `intent_cluster`, `lp_variant` não são capturados nem persistidos.
- `cta_source` é registrado apenas no evento `chat_open`; **não** vai no payload do webhook.
- Nomes de eventos vigentes são `cta_clicked`, `chat_open`, `chat_step`, `form_submit`, `whatsapp_redirect` — não `lp_view`/`leadchat_open`/`lead_submit`.

**Riscos/conflitos:** `LeadChatWidget` e `tracking.ts` são compartilhados pelo site institucional. Toda mudança será **aditiva** (campos novos opcionais), sem alterar nomes ou fluxos existentes.

## Fase 2 — Implementação

### Rota

`/tratamento-glp1-a` (segue a convenção de LP paga do projeto). Isolada; nenhuma rota existente é tocada.

### Extensões mínimas de tracking (aditivas)

Separação clara entre **atribuição de aquisição** (persistida) e **contexto de página** (não persistido):

1. `src/lib/tracking.ts` — acrescentar apenas `ad_id` a `TRACKING_PARAM_KEYS` (campo opcional; capturado e preservado somente quando vier na URL/origem, nunca presumido). Nenhuma outra chave de aquisição é criada ou renomeada.
2. `src/lib/tracking.ts` — novo helper leve de **page context**, separado do first/last touch: `setPageContext({ route_intent, lp_variant })` guarda o contexto em memória para a página ativa e lê `intent_cluster` exclusivamente da URL, sem inferência; ausente ⇒ `UNKNOWN`. `getPageContext()` devolve o objeto; limpeza no unmount da LP, para que páginas institucionais não enviem esses campos.
3. `src/components/LeadChatWidget.tsx` — acrescentar ao `baseWebhookPayload`: `cta_source` (do `ctaSourceRef`), `ad_id` e o page context (`route_intent`, `lp_variant`, `intent_cluster`). Em páginas sem page context, os campos simplesmente não aparecem.
4. Na LP: `route_intent = GLP`, `lp_variant = GLP_C1_V1`, definidos como contexto de página — não gravados no mecanismo de first/last touch.

`cta_source` preservado nos valores: `hero_primary`, `journey_section`, `evaluation_section`, `final_cta`, `sticky_mobile`.

### Eventos

Nomenclatura atual mantida, sem eventos duplicados para renomeação:

- `cta_clicked`, `chat_open`, `chat_step`, `form_submit`, `whatsapp_redirect` — inalterados.
- `lp_view` — única adição, no mount da LP, com o payload de tracking + page context.

Nenhum é marcado como conversão primária. 01-MQL permanece offline no Kommo, sem alteração.

### Página e seções

Nova pasta `src/components/glp1/` com componentes locais (composição, sem alterar componentes globais):

1. **Hero** — headline "Seu tratamento para emagrecer começa antes da escolha da ferramenta.", subheadline, CTA "Quero iniciar minha Avaliação Estratégica" (`cta_source: hero_primary`), microcopy, faixa discreta de confiança (tratamento médico, equipe interdisciplinar, acompanhamento, São Paulo/Jardim Paulista).
2. **Por que a avaliação vem primeiro** — copy definida + grade escaneável: Histórico, Saúde metabólica, Composição corporal, Alimentação, Comportamento, Rotina, Objetivos. Sem questionário.
3. **Como a LevSer conduz** — jornada ENTENDER → DEFINIR DIREÇÃO → ACOMPANHAR → MEDIR → AJUSTAR → CONSOLIDAR (timeline leve em CSS, sem animação pesada). CTA `journey_section`.
4. **Os 4 pilares** — Nutrição Inteligente; Saúde Metabólica & Regenerativa; Corpo em Movimento; Mente & Comportamento.
5. **Ferramentas terapêuticas** — GLP-1/GIP como ferramenta dentro da estratégia; sem catálogo, sem marcas, sem dose.
6. **Avaliação Estratégica** — seção principal com os 5 pontos (entender momento, mapear histórico, compreender objetivos, definir direção, orientar próximos passos) + CTA `evaluation_section`.
7. **Autoridade** — Dra. Bruna + equipe, usando foto e textos já aprovados no projeto. Sem claims novos.
8. **Estrutura / localização** — Av. Brasil, Jardim Paulista, São Paulo, a partir de `CONTACT.ADDRESS`.
9. **FAQ** — as 6 perguntas definidas, usando o Accordion do design system; a 6ª responde com o endereço de `CONTACT`.
10. **CTA final** — título, texto, CTA `final_cta`, microcopy.
11. **Sticky CTA mobile** — variante local, aparece após o hero sair do viewport (`cta_source: sticky_mobile`).
12. **WhatsApp secundário** — link discreto "Prefere conversar diretamente pelo WhatsApp?" usando `CONTACT.WHATSAPP_URL` + `trackWhatsAppClick`. Sem botão flutuante concorrente.
13. **Footer** — reutilizar `Footer` existente (já traz redes sociais).

Copy segue as proibições: sem marcas de medicamento, dose, mg, preço, promessa de prescrição ou de resultado, sem urgência artificial, sem antes/depois.

### Performance

Mobile-first; hero acima da dobra sem imagem pesada; seções abaixo da dobra em `lazy` + `Suspense`; LeadChat carregado em idle (mesmo padrão das LPs atuais); nenhuma dependência nova.

## Fase 3 — QA

Playwright headless em viewports mobile (iPhone/Android) e desktop: hero e CTA acima da dobra, abertura do LeadChat por todos os CTAs, sticky mobile, FAQ, link de WhatsApp, console sem erros, requisições quebradas, layout shift. Teste com URL contendo utm_*, gclid, campaign_id, ad_group_id, ad_id, intent_cluster, verificando persistência até o payload enviado a `/api/lead` (interceptando a requisição). Verificação de que as páginas institucionais continuam funcionando.

Fora do meu alcance: confirmar a chegada real do Lead no Kommo (depende do webhook de produção) — fica como validação sua após o deploy.

## Fase 4 — Relatório

Ao final: rota criada, arquivos criados/alterados, componentes e tracking reutilizados, mudanças aditivas no tracking, eventos confirmados, testes executados, pendências e o que não foi alterado.

## Detalhes técnicos

- Arquivos novos: `src/pages/TratamentoGlp1.tsx` e `src/components/glp1/*.tsx`.
- Arquivos alterados (mínimo): `src/App.tsx` (uma rota), `src/lib/tracking.ts` (4 chaves novas), `src/components/LeadChatWidget.tsx` (5 campos novos no payload), `public/sitemap.xml` opcional.
- Não serão tocados: LeadChat UX/passos, `api/lead.ts`, `leadDelivery.ts`, funil Kommo, MCP/agent integrations, demais páginas.
