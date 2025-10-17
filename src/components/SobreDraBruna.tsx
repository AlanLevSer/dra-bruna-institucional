import { CheckCircle2 } from "lucide-react";
import { GrafismoDecor } from "@/components/GrafismoDecor";
import { OptimizedImage } from "@/components/OptimizedImage";
import draImage from "@/assets/dra-bruna-professional.jpg";
export const SobreDraBruna = () => {
  return <section id="sobre" className="py-20 xl:py-28 bg-muted/30 relative overflow-hidden">
      <GrafismoDecor variant="background" position="top-right" size="lg" opacity={0.15} rotate={-20} color="gray" />
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 xl:gap-24 items-center max-w-7xl mx-auto">
          
          {/* Coluna 1: Foto Profissional */}
          <div className="relative animate-fade-in">
            <div className="relative rounded-2xl overflow-hidden shadow-elegant max-w-[280px] mx-auto lg:mx-0">
              <OptimizedImage 
                src={draImage} 
                alt="Dra. Bruna Durelli - Especialista em Obesidade" 
                className="w-full h-auto object-cover"
                width={280}
                height={420}
              />
            </div>
            <div className="absolute -bottom-5 -right-5 bg-primary p-4 lg:p-5 rounded-xl shadow-elegant max-w-[260px]">
              <p className="text-[11px] font-medium text-primary-foreground mb-1">
                Experiência
              </p>
              <p className="text-lg font-serif font-bold text-primary-foreground">
                +3.000 pacientes transformados
              </p>
            </div>
          </div>

          {/* Coluna 2: Conteúdo */}
          <div className="space-y-6 lg:space-y-8 animate-fade-in" style={{
          animationDelay: "0.1s"
        }}>
            <div className="inline-block px-3 py-1 bg-primary/10 rounded-full">
              <span className="text-[11px] font-medium text-primary">Quem sou eu</span>
            </div>

            <h2 className="text-xl md:text-2xl xl:text-3xl font-serif font-bold text-foreground">
              Dra. Bruna Durelli
            </h2>

            <p className="text-sm lg:text-base text-muted-foreground leading-relaxed">
              Há mais de 10 anos, escolhi dedicar minha carreira a te ajudar a conquistar uma vida mais leve e saudável. 
              Acredito que você merece um cuidado que respeita sua história, seus desafios e seu tempo — com ciência, sim, 
              mas também com empatia de verdade. Estou aqui para te acompanhar, não para te julgar.
            </p>

            {/* Credenciais */}
            <div className="space-y-3.5">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="text-primary flex-shrink-0 mt-0.5" size={16} />
                <div>
                  <p className="font-semibold text-sm text-foreground">Especialista em Obesidade</p>
                  <p className="text-xs text-muted-foreground">Formação completa em tratamento interdisciplinar da obesidade</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <CheckCircle2 className="text-primary flex-shrink-0 mt-0.5" size={16} />
                <div>
                  <p className="font-semibold text-sm text-foreground">Nutrologia e Medicina Regenerativa</p>
                  <p className="text-xs text-muted-foreground">Abordagem integrativa para saúde celular e metabólica</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle2 className="text-primary flex-shrink-0 mt-0.5" size={16} />
                <div>
                  <p className="font-semibold text-sm text-foreground">Endoscopia Digestiva</p>
                  <p className="text-xs text-muted-foreground">Procedimentos minimamente invasivos com segurança e precisão</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle2 className="text-primary flex-shrink-0 mt-0.5" size={16} />
                <div>
                  <p className="font-semibold text-sm text-foreground">Formação Premium</p>
                  <p className="text-xs text-muted-foreground">Einstein, Santa Casa, ABRAN - instituições de referência</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle2 className="text-primary flex-shrink-0 mt-0.5" size={16} />
                <div>
                  <p className="font-semibold text-sm text-foreground">Membro titular SOBED e ABESO</p>
                  <p className="text-xs text-muted-foreground">Principais sociedades médicas do país</p>
                </div>
              </div>
            </div>

            {/* Conexão com LevSer - DESTAQUE */}
            <div className="bg-gradient-premium p-5 lg:p-6 rounded-xl text-primary-foreground shadow-elegant">
              <p className="text-[11px] font-medium mb-1 opacity-90">Onde atendo</p>
              <p className="text-sm lg:text-base font-semibold mb-2">
                Sou sócia-fundadora da LevSer
              </p>
              <p className="text-xs leading-relaxed opacity-90">
                A LevSer é minha clínica, e é onde vou te receber com todo carinho que você merece. 
                Criamos um espaço acolhedor, equipado e humanizado para que você se sinta segura em cada consulta, 
                cada procedimento, cada conversa. Aqui, você não é mais um número — você é minha prioridade.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>;
};