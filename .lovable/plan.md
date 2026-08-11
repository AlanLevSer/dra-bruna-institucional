# Otimização final de CRO — LP C1 (/tratamento-glp1-a)

Apenas front-end da LP. Nada de LeadChat, webhook, Kommo, tracking, UTM/GCLID, page context, rota, noindex ou sitemap é alterado. Nenhuma dependência nova.

## Reuso confirmado no projeto

- Mídia: `src/components/ReconhecimentoMidia.tsx` (e `MediaRecognitionSection.tsx`) já reúnem os 6 veículos (Terra, Crescer, Jovem Pan, Boa Forma, BandNews, Ana Maria) com os logos em `src/assets/media/*.avif`. Hoje cada logo é um `<a target="_blank">`.
- Avaliações: `src/components/TestimonialsGoogle.tsx` + `GoogleReviewCard.tsx` + `useGoogleReviews` (função de backend `get-google-reviews`, cache de 24h). Nota e total vêm dessa mesma fonte; os cards já não têm nenhum link externo.

## O que será feito

### 1. Contraste dos CTAs
Reforçar `Glp1Cta` (usado por hero_primary, journey_section, evaluation_section, final_cta) e `Glp1StickyCta`: fundo primário sólido, texto primary-foreground, seta visível, hover mais escuro, estado active, focus ring — sem gradiente, sem vermelho de urgência. Labels e `cta_source` inalterados.

### 2. Nova seção "Dra. Bruna na mídia"
Novo componente local `src/components/glp1/Glp1Midia.tsx`, compacto, reutilizando os mesmos assets de logo e a mesma lista de veículos do componente institucional, porém **sem `href`, sem `onClick`, sem `target`** — apenas `<img>` em faixa/grid. Os componentes institucionais existentes não são tocados.
- Eyebrow: DRA. BRUNA NA MÍDIA
- Headline: "Conhecimento médico que também ganha espaço na mídia."
- Texto: "Participações sobre obesidade, emagrecimento e saúde em veículos nacionais."
- Desktop: 6 logos em uma faixa. Mobile: grid 3x2 compacto, sem interação. Altura reservada (width/height) para CLS baixo, `loading="lazy"`.

### 3. Nova seção "Experiência LevSer" (Google)
Novo componente local `src/components/glp1/Glp1Avaliacoes.tsx` que consome o mesmo `useGoogleReviews` e renderiza `GoogleReviewCard`, com copy própria:
- Eyebrow: EXPERIÊNCIA LEVSER
- Headline: "O cuidado também aparece na experiência de quem passa por aqui."
- Sub: "Avaliações compartilhadas por pessoas que já conheceram a LevSer e nossa equipe."
- Nota média e quantidade exibidas exatamente como vierem da fonte existente (sem números inventados). Se a chamada falhar, a seção simplesmente não é renderizada (nada quebrado, nada inventado).
- Priorização leve dos reviews por palavras-chave de acolhimento/atendimento/equipe/acompanhamento, mantendo o texto original intacto; máximo de 6 cards, carrossel já existente no mobile.
- Sem "Ver no Google", sem link de Maps, sem CTA externo.

### 4. Ordem final das seções
Hero → Para quem é → Problema → Método → Pilares → GLP-1/GIP → Frase-síntese → Avaliação Estratégica → Dra. Bruna + equipe → **Mídia** → Estrutura → Nosso espaço (vídeo/foto real já existente, mantido) → **Avaliações Google** → FAQ → CTA final → Disclaimer.

### 5. Auditoria de links
Varredura da LP: os únicos elementos de conversão continuam sendo os CTAs do LeadChat. Logos sem navegação, reviews sem navegação, nenhum link externo novo.

### Ponto de atenção — WhatsApp
Você pediu antes para **remover** o contato direto por WhatsApp da LP (para não perder UTM), e ele está removido hoje. Este briefing o permite como alternativa secundária. Mantenho **removido** por padrão, para preservar a atribuição; se quiser reativá-lo abaixo do CTA final, é só dizer e eu incluo.

## Detalhes técnicos

- Arquivos alterados: `src/components/glp1/Glp1Cta.tsx`, `Glp1StickyCta.tsx`, `src/pages/TratamentoGlp1.tsx` (ordem/composição). Novos: `src/components/glp1/Glp1Midia.tsx`, `Glp1Avaliacoes.tsx`.
- Nenhuma alteração em `ReconhecimentoMidia.tsx`, `MediaRecognitionSection.tsx`, `TestimonialsGoogle.tsx`, `GoogleReviewCard.tsx`, `useGoogleReviews`, edge functions ou outras páginas.
- QA Playwright em 390px e desktop: overflow, deformação de logo, altura das seções, contraste dos CTAs, clique em logos e reviews (não deve navegar), os 5 CTAs abrindo o LeadChat, `cta_source` efetivo após fechar/reabrir, `lp_view` único, console limpo.
- Relatório final com os 18 itens solicitados.
