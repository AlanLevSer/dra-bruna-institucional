import { Navigation } from "@/components/Navigation";
import { Hero } from "@/components/Hero";
import { ProgramaLevSer } from "@/components/ProgramaLevSer";
import { Procedimentos } from "@/components/Procedimentos";
import { Nutricao } from "@/components/Nutricao";
import { Diferenciais } from "@/components/Diferenciais";
import { Depoimentos } from "@/components/Depoimentos";
import { FAQ } from "@/components/FAQ";
import { CTAFinal } from "@/components/CTAFinal";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <Hero />
      <ProgramaLevSer />
      <Procedimentos />
      <Nutricao />
      <Diferenciais />
      <Depoimentos />
      <FAQ />
      <CTAFinal />
      <Footer />
    </div>
  );
};

export default Index;
