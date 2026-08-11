# Pacote de sincronização da LP C1 (sem push, sem deploy)

Fonte: estado atual do Lovable, HEAD `2a018f5`, working tree limpo. Nenhum arquivo do projeto será alterado — a LP não é tocada, `Glp1Espaco.tsx` fica como está.

## O que será entregue

Um pacote em `/mnt/documents/c1-glp1-sync/` com o código-fonte da C1, os assets reais (incluindo MP4 e poster baixados do CDN) e um manifesto de integração. Também um `.zip` único para download.

```text
c1-glp1-sync/
  MANIFESTO.md
  src/pages/TratamentoGlp1.tsx
  src/components/glp1/{Glp1Hero,Glp1Sections,Glp1Cta,Glp1StickyCta,Glp1Midia,Glp1Avaliacoes,Glp1Espaco}.tsx
  modificados/{App.tsx, index.css, vercel.json, eslint.config.js}
  modificados/diffs/*.patch          (diff de cada arquivo modificado)
  dependencias-auditar/              (arquivos alterados no Lovable para a C1)
  assets/
    dra-bruna-professional.avif
    transformation-confidence.avif
    media/*.avif  (6 logos)
    levser-estrutura.mp4            (binário real, 2.910.780 bytes)
    levser-estrutura-poster.webp    (binário real, 183.674 bytes)
    pointers/*.asset.json           (referência atual, para o Claude Code substituir)
```

## Verificações já feitas

- Imports reais da C1 mapeados: `@/lib/tracking`, `@/lib/analytics`, `@/lib/leadChat`, `@/components/GoogleReviewCard`, `@/hooks/useGoogleReviews`, `@/lib/constants`, `@/types/google-reviews`, `@/components/SEOHead`, `@/components/ui/{button,accordion,carousel}`, `lucide-react`.
- Ocorrências Lovable-only em código da C1: exatamente duas, ambas em `Glp1Espaco.tsx` (imports dos dois `.asset.json`), cujos `url` apontam para `/__l5e/assets-v1/...`. Nenhuma outra referência a `__l5e`, `lovable.app`, `lovable-gcp` ou `assets-v1` no código da LP. As demais ocorrências de "lovable" no projeto são do MCP (`@lovable.dev/mcp-js`) e da rota `/.lovable/oauth/consent` em `App.tsx` — fora do escopo da C1.
- Binários confirmados como baixáveis do CDN (HTTP 200, `video/mp4`, 2.910.780 bytes; poster WebP 183.674 bytes). O pacote incluirá os arquivos reais, não apenas os ponteiros.

## Classificação das dependências (entra no manifesto)

Cada arquivo será classificado por data do último commit, comparando com o período de implementação da C1 (10–11/08/2026):

- Alterados para a C1, entram como **DIFF A AUDITAR**: `src/lib/tracking.ts`, `src/lib/analytics.ts`, `src/lib/leadChat.ts`, `src/components/LeadChatWidget.tsx`, `src/index.css`, `src/App.tsx`, `vercel.json`, `eslint.config.js`.
- Não alterados, entram apenas como **dependência reutilizada** (não copiar/sobrescrever): `src/lib/leadDelivery.ts`, `src/hooks/useGoogleReviews.ts`, `src/components/GoogleReviewCard.tsx`, `src/components/SEOHead.tsx`, `src/lib/constants.ts`, `src/types/google-reviews.ts`, componentes `ui/`.

Para cada arquivo o manifesto trará: caminho, motivo da dependência, modificado SIM/NÃO, e o diff quando aplicável.

## Manifesto (seções A–E)

A. arquivos novos · B. arquivos modificados (com diffs) · C. assets novos (com tamanho, resolução e codec obtidos via ffprobe) · D. dependências reutilizadas não copiadas · E. assets Lovable-only a eliminar, com o mapeamento sugerido `.asset.json` → `public/` ou `src/assets/` para o Claude Code aplicar no GitHub oficial.

## Fora do escopo

Sem push, sem branch, sem alteração de `main`, sem publicação, sem correção da referência do vídeo, sem `dist/` ou `node_modules/`.
