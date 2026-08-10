import { auth, defineMcp } from "@lovable.dev/mcp-js";
import clinicInfoTool from "./tools/clinic-info";
import listTreatmentsTool from "./tools/list-treatments";
import estimateBmiTool from "./tools/estimate-bmi";

const projectRef = import.meta.env.VITE_SUPABASE_PROJECT_ID ?? "project-ref-unset";

export default defineMcp({
  name: "dra-bruna-institucional",
  title: "dra-bruna-institucional",
  version: "0.1.0",
  instructions:
    "Ferramentas do site da Dra. Bruna Durelli. Use `clinic_info` para contato, endereço e horários; `list_treatments` para os tratamentos e programas oferecidos; `estimate_bmi` para um cálculo informativo de IMC e risco abdominal.",
  auth: auth.oauth.issuer({
    issuer: `https://${projectRef}.supabase.co/auth/v1`,
    acceptedAudiences: "authenticated",
  }),
  tools: [clinicInfoTool, listTreatmentsTool, estimateBmiTool],
});
