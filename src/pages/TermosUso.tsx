import { LegalPageLayout } from "@/components/LegalPageLayout";
import { SEOHead } from "@/components/SEOHead";
import { Building, FileText, UserCheck, Calendar, Stethoscope, CreditCard, Copyright, Link2, Shield, Lock, AlertTriangle, Ban, RefreshCw, Scale, Mail } from "lucide-react";

const sections = [
  {
    icon: Building,
    title: "1. Quem somos",
    content: (
      <>
        <p>
          Este site (<a href="https://www.brunadurelli.com.br" className="text-primary hover:underline">https://www.brunadurelli.com.br</a>, "Site") é operado por <strong>LEVSER SAÚDE LTDA</strong>, CNPJ 47.894.379/0001-94, com sede na Av. Brasil, 173 – Jardim Paulista, São Paulo – SP, 01431-000 ("LevSer", "nós", "nosso").
        </p>
        <p className="mt-2">
          Contato do Encarregado de Dados (LGPD): <a href="mailto:dpo@levser.com.br" className="text-primary hover:underline font-semibold">dpo@levser.com.br</a>
        </p>
        <p className="mt-4 p-3 bg-muted/50 border-l-4 border-primary rounded">
          Ao acessar e utilizar o Site, você ("Usuário") concorda com estes Termos de Uso e com a nossa Política de Privacidade. Se não concordar, interrompa o uso imediatamente.
        </p>
      </>
    ),
  },
  {
    icon: FileText,
    title: "2. Escopo e natureza das informações",
    content: (
      <>
        <ul className="space-y-2">
          <li>• O conteúdo deste Site tem caráter <strong>informativo e educacional</strong>.</li>
          <li className="p-3 bg-destructive/10 border-l-4 border-destructive rounded">
            <strong>Não constitui diagnóstico, prescrição ou substituto de consulta médica presencial.</strong> Decisões sobre saúde exigem avaliação clínica individualizada.
          </li>
          <li className="p-3 bg-destructive/10 border-l-4 border-destructive rounded">
            <strong>Em caso de emergência, procure atendimento de urgência imediatamente.</strong>
          </li>
        </ul>
      </>
    ),
  },
  {
    icon: UserCheck,
    title: "3. Elegibilidade e conduta do Usuário",
    content: (
      <>
        <p>Ao utilizar o Site, você declara que:</p>
        <ul className="mt-2 space-y-1 ml-4">
          <li>• é maior de 18 anos (ou possui autorização do responsável);</li>
          <li>• fornecerá informações verdadeiras, exatas e completas;</li>
          <li>• não utilizará o Site para fins ilícitos, difamatórios, abusivos, discriminatórios, que infrinjam direitos de terceiros ou violem a legislação;</li>
          <li>• não tentará acessar áreas restritas, explorar vulnerabilidades, nem utilizar robôs/scrapers ou processos automatizados sem autorização.</li>
        </ul>
      </>
    ),
  },
  {
    icon: Calendar,
    title: "4. Agendamento, telemedicina e comunicações",
    content: (
      <>
        <p>
          O agendamento pode ocorrer por formulários, WhatsApp, telefone ou plataformas de terceiros. A confirmação está sujeita à disponibilidade de agenda e critérios clínicos.
        </p>
        <p className="mt-3">
          <strong>Telemedicina:</strong> quando ofertada, segue a regulamentação vigente e não substitui atos que exijam exame físico ou procedimentos presenciais. Poderemos solicitar consulta presencial ou exames.
        </p>
        <p className="mt-3">
          Ao solicitar contato, você autoriza comunicações por e-mail, telefone e WhatsApp, conforme a Política de Privacidade. Você pode revogar a qualquer tempo.
        </p>
      </>
    ),
  },
  {
    icon: Stethoscope,
    title: "5. Serviços, elegibilidade clínica e limites",
    content: (
      <>
        <p>
          A indicação de procedimentos, terapias injetáveis, programas ou cirurgias depende de avaliação médica, exames e critérios de segurança.
        </p>
        <p className="mt-3 p-3 bg-muted/50 border border-border rounded">
          <strong>Resultados podem variar</strong> conforme história clínica, adesão e particularidades biológicas. Não garantimos resultados específicos.
        </p>
        <p className="mt-3">
          A LevSer pode recusar, postergar ou redirecionar casos que não atendam a critérios técnicos/éticos.
        </p>
      </>
    ),
  },
  {
    icon: CreditCard,
    title: "6. Pagamentos, reagendamentos e cancelamentos",
    content: (
      <>
        <p>Valores, condições e formas de pagamento serão informados pela equipe de atendimento.</p>
        <p className="mt-3">
          Reagendamentos e cancelamentos seguem políticas internas informadas no momento do agendamento (inclusive prazos e eventuais taxas).
        </p>
        <p className="mt-3">
          Para contratações à distância, observar-se-á o Código de Defesa do Consumidor; determinados serviços de saúde, uma vez prestados ou iniciados, não são passíveis de arrependimento.
        </p>
      </>
    ),
  },
  {
    icon: Copyright,
    title: "7. Propriedade intelectual",
    content: (
      <>
        <p>
          Todo o conteúdo do Site (textos, marcas, logotipos, imagens, vídeos, layouts) é de titularidade da LevSer e/ou da Dra. Bruna Durelli ou de terceiros licenciantes, protegido por direitos autorais e de marca.
        </p>
        <p className="mt-3 font-semibold">
          É vedada a reprodução, distribuição, adaptação, engenharia reversa ou uso comercial sem autorização expressa e por escrito.
        </p>
      </>
    ),
  },
  {
    icon: Link2,
    title: "8. Conteúdo de terceiros e links externos",
    content: (
      <>
        <p>
          Podemos disponibilizar links para sites de terceiros (laboratórios, agendas, redes sociais, meios de pagamento). Não controlamos tais ambientes e não nos responsabilizamos por seus conteúdos, políticas ou práticas.
        </p>
        <p className="mt-3">
          O uso de serviços de terceiros está sujeito aos termos e políticas desses provedores.
        </p>
      </>
    ),
  },
  {
    icon: Shield,
    title: "9. Privacidade e proteção de dados (LGPD)",
    content: (
      <>
        <p>
          O tratamento de dados pessoais, inclusive dados sensíveis de saúde, ocorre conforme a Política de Privacidade publicada no Site.
        </p>
        <p className="mt-3">
          Direitos do titular (acesso, correção, eliminação, revogação de consentimento etc.) podem ser exercidos via{" "}
          <a href="mailto:dpo@levser.com.br" className="text-primary hover:underline font-semibold">
            dpo@levser.com.br
          </a>.
        </p>
      </>
    ),
  },
  {
    icon: Lock,
    title: "10. Segurança do Site",
    content: (
      <p>
        Adotamos medidas técnicas e organizacionais razoáveis (criptografia em trânsito, controles de acesso, logs). Nenhum ambiente é 100% livre de riscos. O Usuário é responsável por manter seus dispositivos seguros e por não compartilhar dados confidenciais indevidamente.
      </p>
    ),
  },
  {
    icon: AlertTriangle,
    title: "11. Isenções de responsabilidade",
    content: (
      <>
        <p>Na máxima extensão permitida pela lei:</p>
        <ul className="mt-2 space-y-1 ml-4">
          <li>• o Site é disponibilizado "no estado em que se encontra";</li>
          <li>• não garantimos disponibilidade ininterrupta ou livre de erros;</li>
          <li>• não respondemos por perdas indiretas, lucros cessantes, danos decorrentes de indisponibilidade, falhas de rede, mau uso ou força maior.</li>
        </ul>
      </>
    ),
  },
  {
    icon: Ban,
    title: "12. Limitação de responsabilidade",
    content: (
      <p>
        Salvo dolo ou culpa grave, a responsabilidade da LevSer, relacionada ao uso do Site, limita-se aos valores eventualmente pagos pelo Usuário diretamente à LevSer em razão do serviço específico associado à reclamação. Nada nestes Termos exclui responsabilidade por obrigações legais e éticas na prestação de serviços de saúde.
      </p>
    ),
  },
  {
    icon: Shield,
    title: "13. Indenização",
    content: (
      <p>
        O Usuário concorda em indenizar a LevSer, a Dra. Bruna Durelli, seus profissionais e colaboradores por reclamações ou perdas decorrentes de uso indevido do Site, violação destes Termos ou de direitos de terceiros.
      </p>
    ),
  },
  {
    icon: RefreshCw,
    title: "14. Atualizações, suspensão e encerramento",
    content: (
      <>
        <p>
          Podemos alterar o Site ou estes Termos a qualquer tempo para refletir mudanças legais, técnicas ou operacionais.
        </p>
        <p className="mt-3">Alterações passam a valer na data de publicação. O uso contínuo significará aceite.</p>
        <p className="mt-3">
          Podemos suspender ou encerrar funcionalidades por motivos técnicos, legais, de segurança ou manutenção.
        </p>
      </>
    ),
  },
  {
    icon: Scale,
    title: "15. Legislação e foro",
    content: (
      <p className="font-semibold">
        Estes Termos são regidos pelas leis do Brasil. Fica eleito o foro da Comarca de São Paulo/SP, com renúncia a qualquer outro, para dirimir controvérsias não solucionadas amigavelmente.
      </p>
    ),
  },
  {
    icon: Mail,
    title: "16. Contatos",
    content: (
      <div className="space-y-2 text-sm">
        <p><strong>LEVSER SAÚDE LTDA</strong> – CNPJ 47.894.379/0001-94</p>
        <p><strong>Endereço:</strong> Av. Brasil, 173 – Jardim Paulista, São Paulo – SP, 01431-000</p>
        <p>
          <strong>Site:</strong>{" "}
          <a href="https://www.brunadurelli.com.br" className="text-primary hover:underline">
            https://www.brunadurelli.com.br
          </a>
        </p>
        <p>
          <strong>DPO (LGPD):</strong>{" "}
          <a href="mailto:dpo@levser.com.br" className="text-primary hover:underline font-semibold">
            dpo@levser.com.br
          </a>
        </p>
      </div>
    ),
  },
];

export default function TermosUso() {
  return (
    <>
      <SEOHead
        data={{
          title: "Termos de Uso | Dra. Bruna Durelli",
          description: "Termos de Uso do site da Dra. Bruna Durelli. Conheça as regras e condições de uso dos nossos serviços.",
          keywords: "termos de uso, condições de uso, regras, termos e condições",
          canonical: "https://www.brunadurelli.com.br/termos-uso",
        }}
      />

      <LegalPageLayout title="Termos de Uso" vigencia="17/10/2025">
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
      </LegalPageLayout>
    </>
  );
}
