import { GraduationCap, Award, Globe } from "lucide-react";
import { OptimizedImage } from "@/components/OptimizedImage";
import draBrunaImg from "@/assets/dra-bruna-professional.avif";

const CredentialsSection = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="bg-blue-50 border-2 border-blue-200 rounded-lg px-4 py-2 w-fit mx-auto mb-4">
              <span className="text-blue-700 font-semibold text-sm">
                ⭐ RECOMENDADO POR 98% DOS PACIENTES
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Conheça a Dra. Bruna Durelli
            </h2>
            <p className="text-xl text-wellness-warm font-semibold mb-4">
              Referência nacional em tratamento interdisciplinar da obesidade
            </p>
            <div className="flex justify-center gap-4 mt-6">
              <div className="bg-yellow-50 px-3 py-1 rounded-full border border-yellow-200">
                <span className="text-yellow-700 text-sm font-medium">CRM Ativo</span>
              </div>
              <div className="bg-green-50 px-3 py-1 rounded-full border border-green-200">
                <span className="text-green-700 text-sm font-medium">Pós-graduada</span>
              </div>
              <div className="bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
                <span className="text-blue-700 text-sm font-medium">+10 Anos</span>
              </div>
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="flex items-start space-x-4">
                <div className="bg-wellness-soft p-3 rounded-full flex-shrink-0">
                  <GraduationCap className="w-6 h-6 text-wellness-warm" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">Formação Acadêmica</h3>
                  <ul className="text-muted-foreground space-y-1">
                    <li>• Especialista em Obesidade</li>
                    <li>• Nutrologia e Medicina Regenerativa</li>
                    <li>• Endoscopia Digestiva</li>
                    <li>• Formação Premium: Einstein, Santa Casa, ABRAN</li>
                  </ul>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="bg-wellness-soft p-3 rounded-full flex-shrink-0">
                  <Award className="w-6 h-6 text-wellness-warm" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">Certificações</h3>
                  <ul className="text-muted-foreground space-y-1">
                    <li>• Membro titular SOBED (Sociedade Brasileira de Endoscopia Digestiva)</li>
                    <li>• Membro titular ABESO (Associação Brasileira para Estudo da Obesidade)</li>
                    <li>• Formação em procedimentos minimamente invasivos com segurança e precisão</li>
                    <li>• Abordagem integrativa para saúde celular e metabólica</li>
                  </ul>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="bg-wellness-soft p-3 rounded-full flex-shrink-0">
                  <Globe className="w-6 h-6 text-wellness-warm" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">Congressos Internacionais</h3>
                  <ul className="text-muted-foreground space-y-1">
                    <li>• World Congress on Obesity (Londres, 2023)</li>
                    <li>• International Conference on Bariatric Medicine</li>
                    <li>• European Congress of Endocrinology</li>
                    <li>• American Society for Metabolic Surgery</li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="text-center">
              <div className="relative inline-block">
                <OptimizedImage 
                  src={draBrunaImg} 
                  alt="Dra. Bruna Durelli - Especialista em Obesidade"
                  width={320}
                  height={320}
                  className="w-80 h-80 object-cover rounded-2xl shadow-lg mx-auto"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-wellness-warm/10 to-transparent rounded-2xl"></div>
              </div>
              <div className="mt-6 p-6 bg-wellness-soft/20 rounded-xl">
                <p className="text-lg font-medium text-wellness-warm">
                  "Há mais de 10 anos, escolhi dedicar minha carreira a te ajudar a conquistar 
                  uma vida mais leve e saudável. Acredito que você merece um cuidado que 
                  respeita sua história, seus desafios e seu tempo — com ciência, sim, mas 
                  também com empatia de verdade. Estou aqui para te acompanhar, não para te julgar."
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CredentialsSection;
