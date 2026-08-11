# Marca d'água do Hero: tornar visível e preencher a dobra

## Problema
A camada atual usa opacidade ~9–10% em uma grade de 3 imagens com dois gradientes sobrepostos — na prática a imagem some, e no mobile ela nem cobre a dobra corretamente.

## Nova abordagem (apenas `src/components/glp1/Glp1Hero.tsx`)
- Trocar a grade de 3 imagens por **uma única imagem em cobertura total** da dobra (`absolute inset-0`, `object-cover`, `object-[70%_center]`), garantindo preenchimento correto em qualquer resolução, sem faixas vazias.
- Aumentar a presença: opacidade ~25% no desktop e ~18% no mobile, com leve dessaturação/`contrast` para manter o ar clínico.
- Substituir os dois gradientes por **um único gradiente lateral** `from-background via-background/85 to-background/30` (desktop) e vertical no mobile — protege a leitura do texto à esquerda e deixa a foto aparecer à direita.
- Definir altura mínima da dobra (`min-h-[560px] md:min-h-[640px]`) para a imagem sempre preencher o viewport inicial.
- Manter `aria-hidden`, `pointer-events-none`, `loading="eager"`/`fetchPriority` baixo apenas para não atrasar LCP do título.

## Imagem
`src/assets/transformation-confidence.avif` como base (mulher, já usada no site). Segunda imagem opcional só em telas ≥1280px, se necessário para preencher largura.

## Verificação
Screenshots com Playwright em 390px, 768px e 1440px para confirmar que a foto aparece claramente e o título/CTA continuam legíveis.

## Observação
Os erros de typecheck reportados (LeadChatWidget, Quiz, vite.config, testes) são pré-existentes e não têm relação com o Hero; o build de produção passa. Posso corrigi-los em uma tarefa separada, se quiser.
