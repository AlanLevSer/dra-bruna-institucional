# Marca d'água do Hero: reforçar no mobile

## Objetivo
Deixar a foto de fundo bem mais visível na primeira dobra do mobile, mantendo o desktop como está.

## Alteração (apenas `src/components/glp1/Glp1Hero.tsx`)
- Opacidade da imagem: **~60% no mobile**, mantendo **40% no desktop** (`opacity-60 md:opacity-40`).
- Gradiente mobile mais leve: hoje `from-background via-background/80 to-background/45` apaga a foto; passa para algo como `from-background/85 via-background/55 to-background/35`. O gradiente lateral do desktop (`md:`) fica inalterado.
- Enquadramento mobile: `object-[65%_center]` para a mulher aparecer melhor no recorte estreito (desktop mantém o atual em `md:`).
- Nenhuma mudança em copy, CTA, altura, tracking ou demais seções.

## Verificação
Screenshot da dobra em 393px (mobile atual) e 1440px, confirmando que a foto aparece claramente no mobile e que título, textos e CTA continuam legíveis.
