# Vídeo do espaço físico na LP C1 (leve e sem travar a página)

## Formato recomendado
- **MP4 (H.264 + AAC)** como arquivo principal — compatível com todos os navegadores/iOS.
- Opcional: **WebM (VP9)** como fonte alternativa para navegadores modernos (arquivo ~30% menor).
- Resolução: **1080x1920 (9:16)** se for vertical mobile-first, ou **1280x720** se horizontal.
- Duração: **8 a 20 segundos**, sem áudio (tour curto do espaço).
- Bitrate alvo: **1.5–2.5 Mbps** → peso final ideal **abaixo de 4 MB**.
- Hospedagem: enviar via Lovable Assets (CDN), não dentro do repositório.

## Como será implementado na LP
- Seção "Nossa estrutura" com o vídeo em `<video>` nativo:
  - `muted`, `loop`, `playsInline`, `autoPlay` (autoplay só funciona mudo)
  - `preload="none"` + `poster` (imagem estática leve em .avif/.webp)
  - vídeo só começa a carregar quando entra na viewport (IntersectionObserver), para não impactar o LCP da primeira dobra
- Sem player externo (YouTube/Vimeo) — evita scripts de terceiros que pesam e vazam tracking.
- Legenda curta abaixo do vídeo e nenhum CTA novo; o CTA existente segue sendo o LeadChat.

## Detalhes técnicos
- Novo componente `src/components/glp1/Glp1Espaco.tsx` renderizado na seção de estrutura da LP.
- Vídeo e poster publicados como `.asset.json` (CDN) e importados por URL.
- Nenhuma mudança em tracking, LeadChat, webhook ou rotas.

## O que preciso de você
- O arquivo do vídeo (pode subir aqui) e, se quiser, uma imagem para o poster. Se não enviar poster, gero um frame estático a partir do vídeo.
