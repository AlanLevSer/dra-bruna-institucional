import { LegalPageLayout } from "@/components/LegalPageLayout";
import { SEOHead } from "@/components/SEOHead";
import { Shield, Lock, FileText, Users, Globe, Clock, UserCheck, ShieldAlert, Baby, RefreshCw, Building } from "lucide-react";

const sections = [
  {
    icon: Building,
    title: "1. Quem somos",
    content: (
      <>
        <p>Este site (<a href="https://www.brunadurelli.com.br" className="text-primary hover:underline">https://www.brunadurelli.com.br</a>, "Site") é operado por <strong>LEVSER SAÚDE LTDA</strong> ("Controlador"), CNPJ 47.894.379/0001-94, com sede na Av. Brasil, 173 – Jardim Paulista, São Paulo – SP, 01431-000.</p>
        <p className="mt-2">
          Encarregado(a) de Dados (DPO): <a href="mailto:dpo@levser.com.br" className="text-primary hover:underline font-semibold">dpo@levser.com.br</a>
        </p>
      </>
    ),
  },
  {
    icon: FileText,
    title: "2. Quais dados tratamos",
    content: (
      <>
        <ul className="space-y-2">
          <li><strong>Identificação e contato:</strong> nome, e-mail, telefone/WhatsApp, cidade.</li>
          <li><strong>Perfil/triagem:</strong> idade, IMC, objetivos, preferências, disponibilidade.</li>
          <li className="p-3 bg-primary/5 border-l-4 border-primary rounded">
            <strong>Dados de saúde (sensíveis):</strong> informações clínicas fornecidas voluntariamente (ex.: comorbidades, exames, histórico).
          </li>
          <li><strong>Navegação e cookies:</strong> IP, dispositivo, páginas acessadas, eventos (por ferramentas de analytics/ads).</li>
          <li><strong>Arquivos enviados:</strong> exames e documentos (quando aplicável).</li>
        </ul>
        <p className="mt-4 text-sm bg-muted/50 p-3 rounded border border-border">
          Dados sensíveis de saúde são tratados exclusivamente para assistência à saúde, por equipe/profissionais habilitados, sob sigilo e com controles de acesso (LGPD art. 11, II, "f").
        </p>
      </>
    ),
  },
  {
    icon: Shield,
    title: "3. Finalidades e bases legais",
    content: (
      <ul className="space-y-2">
        <li><strong>Agendamento e atendimento</strong> (consultas, procedimentos, acompanhamento) – execução de contrato e proteção da saúde (LGPD art. 7º, V; art. 11, II, "f").</li>
        <li><strong>Triagem clínica e elegibilidade</strong> – proteção da saúde.</li>
        <li><strong>Comunicações operacionais</strong> (confirmações, orientações) – execução de contrato.</li>
        <li><strong>Conteúdos e ofertas</strong> (e-mail/SMS/WhatsApp/ads) – consentimento e/ou legítimo interesse com opt-out.</li>
        <li><strong>Segurança, prevenção a fraudes e cumprimento legal</strong> – obrigação legal/regulatória e exercício regular de direitos.</li>
        <li><strong>Analytics e melhoria do Site</strong> – consentimento para cookies não essenciais.</li>
      </ul>
    ),
  },
  {
    icon: Lock,
    title: "4. Cookies e tecnologias",
    content: (
      <p>
        Usamos cookies estritamente necessários ao funcionamento e, com seu consentimento, cookies de estatística (medição de uso) e marketing (personalização de anúncios). Preferências podem ser gerenciadas no banner de cookies e no navegador. Para detalhes, consulte a Política de Cookies.
      </p>
    ),
  },
  {
    icon: Users,
    title: "5. Compartilhamento com terceiros (operadores)",
    content: (
      <p>
        Compartilhamos dados apenas o necessário com provedores que nos apoiam em: hospedagem/CDN, formulários, agenda/prontuário eletrônico, CRM/atendimento, mensageria/marketing, pagamentos, laboratórios, analytics/ads. Todos atuam sob contrato, confidencialidade e requisitos de segurança.
      </p>
    ),
  },
  {
    icon: Globe,
    title: "6. Transferências internacionais",
    content: (
      <p>
        Quando utilizamos provedores com servidores fora do Brasil (ex.: nuvem/analytics), aplicamos salvaguardas contratuais e técnicas adequadas.
      </p>
    ),
  },
  {
    icon: Clock,
    title: "7. Retenção de dados",
    content: (
      <ul className="space-y-2">
        <li><strong>Leads (marketing):</strong> até 24 meses sem interação ou até opt-out/revogação.</li>
        <li><strong>Pacientes/prontuários:</strong> conforme normas do CFM e prazos legais aplicáveis.</li>
        <li><strong>Faturamento/documentos legais:</strong> prazos fiscais/regulatórios.</li>
      </ul>
    ),
  },
  {
    icon: UserCheck,
    title: "8. Direitos do titular",
    content: (
      <>
        <p>Você pode solicitar:</p>
        <ul className="mt-2 space-y-1 ml-4">
          <li>• Confirmação e acesso aos seus dados</li>
          <li>• Correção de dados incompletos ou desatualizados</li>
          <li>• Anonimização, bloqueio ou eliminação (quando aplicável)</li>
          <li>• Portabilidade dos dados</li>
          <li>• Informações sobre compartilhamentos</li>
          <li>• Revogação de consentimento</li>
        </ul>
        <p className="mt-4 p-3 bg-primary/5 border border-primary/20 rounded">
          <strong>Canal do DPO:</strong>{" "}
          <a href="mailto:dpo@levser.com.br" className="text-primary hover:underline font-semibold">
            dpo@levser.com.br
          </a>
          <br />
          Responderemos em prazos razoáveis conforme a LGPD.
        </p>
      </>
    ),
  },
  {
    icon: ShieldAlert,
    title: "9. Segurança",
    content: (
      <p>
        Adotamos medidas técnicas e organizacionais proporcionais: criptografia em trânsito, gestão de acessos, logs, backups, avaliação periódica de riscos, contratos com operadores e treinamento da equipe. Nenhum ambiente é 100% isento de riscos.
      </p>
    ),
  },
  {
    icon: Baby,
    title: "10. Crianças e adolescentes",
    content: (
      <p>
        Quando aplicável, o tratamento observará a LGPD, incluindo consentimento do responsável legal e proteção do melhor interesse do menor.
      </p>
    ),
  },
  {
    icon: RefreshCw,
    title: "11. Atualizações desta Política",
    content: (
      <p>
        Podemos atualizar esta Política para refletir mudanças legais ou operacionais. A versão vigente e a data de vigência estarão sempre nesta página.
      </p>
    ),
  },
];

export default function PoliticaPrivacidade() {
  return (
    <>
      <SEOHead
        data={{
          title: "Política de Privacidade | Dra. Bruna Durelli",
          description: "Política de Privacidade do site da Dra. Bruna Durelli. Saiba como tratamos seus dados pessoais e de saúde conforme a LGPD.",
          keywords: "política de privacidade, LGPD, proteção de dados, privacidade, dados de saúde",
          canonical: "https://www.brunadurelli.com.br/politica-privacidade",
        }}
      />

      <LegalPageLayout title="Política de Privacidade" vigencia="17/10/2025">
        {sections.map((section, index) => (
          <div
            key={index}
            className="bg-card/80 backdrop-blur-sm border border-border/50 rounded-xl p-6 hover:shadow-md transition-all"
          >
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center flex-shrink-0">
                <section.icon className="w-6 h-6 text-primary" />
              </div>
              
              <div className="flex-1">
                <h2 className="text-lg font-semibold mb-3 text-foreground">{section.title}</h2>
                <div className="prose prose-sm text-muted-foreground max-w-none">
                  {section.content}
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Contact Info */}
        <div className="bg-gradient-to-br from-primary/10 to-secondary/10 border border-primary/20 rounded-xl p-6 mt-8">
          <h2 className="text-lg font-semibold mb-4 text-foreground">Informações de Contato</h2>
          <div className="space-y-2 text-sm text-muted-foreground">
            <p><strong>Controlador:</strong> LEVSER SAÚDE LTDA – CNPJ 47.894.379/0001-94</p>
            <p><strong>Endereço:</strong> Av. Brasil, 173 – Jardim Paulista, São Paulo – SP, 01431-000</p>
            <p>
              <strong>Site:</strong>{" "}
              <a href="https://www.brunadurelli.com.br" className="text-primary hover:underline">
                https://www.brunadurelli.com.br
              </a>
            </p>
            <p>
              <strong>DPO:</strong>{" "}
              <a href="mailto:dpo@levser.com.br" className="text-primary hover:underline font-semibold">
                dpo@levser.com.br
              </a>
            </p>
          </div>
        </div>
      </LegalPageLayout>
    </>
  );
}
