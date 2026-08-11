# Marca d'água do Hero em 40%

## Objetivo
Tornar a foto de fundo claramente visível na primeira dobra de `/tratamento-glp1-a`, inclusive no mobile.

## Alteração
- Em `src/components/glp1/Glp1Hero.tsx`, definir a imagem de fundo com **40% de opacidade em todas as resoluções** (`opacity-40`), removendo a diferença atual entre mobile e desktop.
- Manter a imagem em cobertura total da dobra (`absolute inset-0`, `h-full w-full`, `object-cover`).
- Preservar o gradiente sobre a imagem para manter título, textos e CTA legíveis.
- Não alterar copy, altura, CTA, tracking ou demais seções.

## Verificação
Conferir a primeira dobra em 393px (mobile atual) e 1440px (desktop), validando que a mulher aparece claramente e que o conteúdo continua legível.
