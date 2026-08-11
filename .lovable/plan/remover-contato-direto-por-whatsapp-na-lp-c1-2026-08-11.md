# Remover contato direto por WhatsApp na LP C1

Motivo: o link direto para o WhatsApp perde o contexto de aquisição (UTMs, GCLID), então todo contato deve passar pelo LeadChat.

## O que muda
- Retirar o link "Prefere conversar diretamente pelo WhatsApp?" do bloco de CTA da LP.
- O CTA principal (LeadChat) segue como único caminho de contato.

## Detalhes técnicos
- `src/components/glp1/Glp1Cta.tsx`: remover a prop `showWhatsApp`, o bloco do botão de WhatsApp, o handler `handleWhatsApp`, e os imports agora não usados (`CONTACT`, `trackWhatsAppClick`).
- `src/components/glp1/Glp1Sections.tsx` (linha ~488): remover a passagem `showWhatsApp` no CTA final.
- Escopo restrito à LP `/tratamento-glp1-a`; nenhum outro botão de WhatsApp do site é alterado.
