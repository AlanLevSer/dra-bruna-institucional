# Seção "Nossa estrutura" com vídeo na LP C1

Os arquivos enviados estão dentro do ideal: MP4 H.264, 1080x1920 (9:16), 16,7s, **sem faixa de áudio**, 2,9 MB. Poster WebP de 184 KB. Nada precisa ser reencodado.

## O que será feito

- Publicar vídeo e poster no CDN (Lovable Assets), sem colocar os binários no repositório.
- Novo componente `Glp1Espaco` renderizado logo após a seção "Estrutura e atendimento em São Paulo".
- Player `<video>` nativo (sem YouTube/Vimeo), configurado para não pesar a página:
  - `muted`, `loop`, `playsInline`, `poster` do WebP
  - `preload="none"` — o vídeo só começa a baixar quando entra na viewport (IntersectionObserver), então não afeta o carregamento da primeira dobra
  - autoplay silencioso ao entrar na tela; respeita `prefers-reduced-motion` (nesse caso fica só o poster com botão de play)
  - controles nativos disponíveis para quem quiser pausar
- Enquadramento vertical limitado (máx. ~420px de largura no desktop, centralizado) com cantos arredondados e borda no padrão da LP.
- Título curto ("Conheça nosso espaço") e legenda com o endereço — sem novo CTA; o CTA da LP continua sendo o LeadChat.

## Fora do escopo

- Nenhuma mudança em tracking, LeadChat, webhook, rotas ou sitemap.

## Detalhes técnicos

- `src/assets/levser-estrutura.mp4.asset.json` e `src/assets/levser-estrutura-poster.webp.asset.json` (pointers de CDN).
- `src/components/glp1/Glp1Espaco.tsx`, importado em `src/pages/TratamentoGlp1.tsx` entre `Glp1Estrutura` e `Glp1Faq`.
- Verificação com Playwright em 393px: poster visível de imediato, requisição do MP4 só após o scroll até a seção.
