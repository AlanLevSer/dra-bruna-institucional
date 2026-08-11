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

Nenhum arquivo existente será classificado por data de commit. Todos os arquivos existentes tocados no período da C1 entram como:

`POSSIVELMENTE MODIFICADO DURANTE A IMPLEMENTAÇÃO C1 — DIFF OBRIGATÓRIO CONTRA O GITHUB OFICIAL (main / 5ef2462)`

São eles: `src/App.tsx`, `src/index.css`, `vercel.json`, `eslint.config.js`, `src/lib/tracking.ts`, `src/lib/analytics.ts`, `src/lib/leadChat.ts`, `src/components/LeadChatWidget.tsx`. Para cada um o pacote traz: versão completa atual do Lovable, patch (`git log -p -1`), SHA do último commit Lovable e descrição curta da alteração. O patch é material de auditoria — a integração é semântica, feita pelo Claude Code sobre o código atual do GitHub; nada é aplicado automaticamente e nenhuma melhoria já existente no GitHub é sobrescrita.

Dependências reutilizadas e **não copiadas**: `src/lib/leadDelivery.ts`, `src/hooks/useGoogleReviews.ts`, `src/lib/googlePlaces.ts`, `src/components/GoogleReviewCard.tsx`, `src/components/SEOHead.tsx`, `src/lib/constants.ts`, `src/types/google-reviews.ts`, `src/components/ui/{button,accordion,carousel}`.

## Hashes de integridade

SHA-256 no `MANIFESTO.md` para: `levser-estrutura.mp4`, `levser-estrutura-poster.webp`, todos os `src/components/glp1/*`, `TratamentoGlp1.tsx`, assets específicos da C1 (foto Dra. Bruna, imagem do hero, 6 logos), os arquivos modificados completos e o ZIP final.

## Histórico Lovable — C1 GLP-1/GIP

Seção no manifesto com SHA, data e mensagem dos commits relevantes (criação da LP, tracking/page context, CRO, mídia, Google Reviews, CTA, rewrite `tratamento-glp1-a`, ajuste ESLint MCP), com aviso explícito de que esses SHAs **não** servem para cherry-pick — o histórico do GitHub é outro.

## Vídeo e poster

Binários reais incluídos com nome, tamanho, resolução, codec (ffprobe) e origem. Os `.asset.json` seguem apenas como referência histórica. `Glp1Espaco.tsx` não é alterado. O manifesto registra:

- ESTADO ATUAL LOVABLE: `.asset.json` → `/__l5e/assets-v1/...` → dependência exclusiva da infraestrutura Lovable.
- ESTADO NECESSÁRIO NO GITHUB/VERCEL: substituir por asset independente do Lovable. A escolha entre `public/media/` e `src/assets/` fica com o Claude Code. URL absoluta do CDN Lovable não é solução definitiva.

## Varredura Lovable-only

Busca por `__l5e`, `asset.json`, `lovable`, `lovable.app`, `lovable-gcp`, `assets-v1` restrita ao escopo da C1, com todas as ocorrências listadas e o contador `C1 LOVABLE-ONLY DEPENDENCIES = N`.

## Manifesto (seções A–E)

A. arquivos novos · B. arquivos modificados · C. assets novos · D. dependências reutilizadas não copiadas · E. assets Lovable-only a eliminar.


## Fora do escopo

Sem push, sem branch, sem alteração de `main`, sem publicação, sem correção da referência do vídeo, sem `dist/` ou `node_modules/`.
