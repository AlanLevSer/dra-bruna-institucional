# Otimização da LP C1 — /tratamento-glp1-a

Apenas copy, hierarquia, ordem de seções, imagens e contraste de CTA. Nenhuma alteração em LeadChat, webhook, Kommo, tracking, UTM/GCLID, page context, eventos, rota ou MCP.

## Nova ordem das seções

1. Hero
2. Para quem é
3. Problema / por que a avaliação vem primeiro
4. Método LevSer (Entender → Definir direção → Acompanhar → Medir → Ajustar → Consolidar)
5. Quatro pilares oficiais
6. GLP-1/GIP como ferramenta
7. Frase-síntese da proposta de valor
8. Avaliação Estratégica (com CTA)
9. Dra. Bruna + equipe interdisciplinar
10. Estrutura / localização
11. FAQ
12. CTA final
13. Disclaimer

## Copy

- Hero: headline "Tratamento médico para emagrecer com estratégia, acompanhamento e direção clínica.", subheadline e bloco de posicionamento "A medicação, quando indicada, é uma ferramenta. A jornada é o tratamento." tratado como destaque visual (não disclaimer).
- Nova seção "E se eu estiver buscando tratamento com GLP-1/GIP?" com o destaque "Ferramenta ≠ tratamento completo." — sem marcas, doses, mg ou promessa de prescrição.
- Método LevSer como timeline de 6 etapas, estática (sem animação pesada).
- Pilares renomeados para Nutrição Inteligente, Saúde Metabólica & Regenerativa, Corpo em Movimento, Mente & Comportamento.
- Avaliação Estratégica apresentada como ponto de decisão, com micro-jornada visual: chega com dúvidas → mapeamos seu momento → definimos direção → você entende os próximos passos.
- Perfil, problema, frase-síntese, FAQ (9 perguntas) e CTA final exatamente com os textos aprovados.
- FAQ item "atendimento presencial" mantém a regra atual (avaliação presencial no Jardim Paulista, etapas do acompanhamento podem ser remotas); endereço vindo de CONTACT.ADDRESS.

## Autoridade e imagens

- Seção da Dra. Bruna com foto profissional já existente no projeto (`dra-bruna-professional.avif`, fallback `dra-bruna-elegant.avif`), credenciais já aprovadas no site (CRM 124809 / RQE 57361; Obesidade, Nutrologia, Medicina Regenerativa e Endoscopia Digestiva), apresentadas de forma enxuta.
- Bloco "Equipe interdisciplinar LevSer" explicando que médico, nutrição, movimento e comportamento estão na mesma jornada.
- Estrutura física: o projeto não possui hoje foto da clínica/fachada. A seção de estrutura usará endereço, unidade Jardim Paulista e apoio visual sóbrio, sem banco de imagens genérico. Se você enviar fotos reais da unidade, incluo depois.

## CTAs e taxonomia

| Seção | Label | cta_source |
|---|---|---|
| Hero | Quero entender qual tratamento faz sentido para mim | `hero_primary` |
| Meio da jornada / Método | Quero entender meu próximo passo | `journey_section` |
| Avaliação Estratégica | Quero iniciar minha Avaliação Estratégica | `evaluation_section` |
| Final | Quero conversar sobre meu tratamento | `final_cta` |
| Sticky mobile | Quero entender meu tratamento | `sticky_mobile` |

`jornada_mid` → `journey_section` e `cta_final` → `final_cta` (renomeação de rótulo apenas; o fluxo e o payload continuam idênticos). Todos abrem o mesmo LeadChat via `openLeadChat`.

## Contraste dos botões

`Glp1Cta` passa a aceitar label por prop e usa fundo primário sólido com texto de alto contraste, hover mais escuro, estado active (leve compressão), anel de foco visível e ícone de seta. Tokens semânticos apenas, sem cor promocional.

## Detalhes técnicos

- Arquivos alterados: `src/components/glp1/Glp1Cta.tsx`, `Glp1Hero.tsx`, `Glp1Sections.tsx`, `Glp1StickyCta.tsx`, `src/pages/TratamentoGlp1.tsx` (apenas ordem/composição das seções). Nada fora de `src/components/glp1/` e da página.
- `setPageContext`, `lp_view` único, `route_intent`, `lp_variant`, `intent_cluster` e a lógica de `ctaSourceRef` permanecem intocados.
- QA com Playwright em 390px e desktop: hero e CTA acima da dobra, contraste, todos os CTAs, sticky, LeadChat abre/fecha/reabre com outro CTA e envia o último `cta_source` efetivo, FAQ, imagens, console limpo, `lp_view` único.
- Relatório final com seções reordenadas, copy, headline, CTAs/cta_source, imagens, mudanças visuais, resultado de QA e pendências.
