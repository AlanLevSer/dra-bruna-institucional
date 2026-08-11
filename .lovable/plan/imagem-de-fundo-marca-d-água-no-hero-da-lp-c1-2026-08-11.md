# Imagem de fundo "marca d'água" no Hero da LP C1

## Objetivo
Adicionar fotos de mulheres (as mesmas já usadas no site) como fundo sutil, em marca d'água, apenas na primeira dobra de `/tratamento-glp1-a`, sem prejudicar leitura nem contraste do CTA.

## O que muda
Somente `src/components/glp1/Glp1Hero.tsx` (camada visual). Nenhuma alteração em copy, CTAs, tracking, LeadChat ou infraestrutura.

### Composição visual
- O `<header>` passa a ser `relative overflow-hidden`.
- Camada de imagem absoluta atrás do conteúdo (`-z-0`, conteúdo em `relative z-10`), com:
  - Mobile: uma única imagem cobrindo a dobra, opacidade baixa (~8–10%), posicionada à direita.
  - Desktop: colagem discreta de 2–3 imagens à direita, mesma opacidade baixa.
- Gradiente sobreposto do fundo (`from-background via-background/95 to-transparent`) para garantir contraste do título, do texto e do botão.
- `aria-hidden="true"`, `pointer-events-none`, `loading="lazy"` nas imagens decorativas.

### Imagens (já existentes no projeto, mesmas do site principal)
- `src/assets/transformation-confidence.avif`
- `src/assets/transformation-selfcare.avif`
- `src/assets/patient-wellness-1.avif`

## Detalhes técnicos
- Uso de tokens semânticos (`bg-background`, `from-background`) — sem cores hardcoded.
- Sem novas dependências, sem novos assets gerados.
- Verificação com Playwright em 390px e desktop: screenshot do hero para confirmar legibilidade e contraste do CTA.
