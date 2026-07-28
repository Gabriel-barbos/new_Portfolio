import google from "../assets/icons/google1.png";
import ibm from "../assets/icons/ibm1.png";
import azure from "../assets/icons/azure.png";
import dio from "../assets/icons/dio2.png";
import bradesco from "../assets/icons/bradesco.png";
import jovem from "../assets/icons/eng.png";
import aws from "../assets/icons/aws.png";
import fiap from "../assets/icons/fiap.png";
import alura from "../assets/icons/alura.png";
import anthropic from "../assets/icons/antropic.png";

export interface Certification {
  id: number;
  name: string;
  issuer: string;
  issuerLogo: string;
  date: string;
  credentialUrl: string;
  skills: string[];
  type: 'certification' | 'course';
  theme: 'google' | 'azure' | 'ibm' | 'dio' | 'santander' | 'aws' | 'meta' | 'default' | 'fiap' | 'alura' | 'anthropic';
  isSpecial?: boolean;
}

export const certifications: Certification[] = [
  {
    id: 1,
    name: "Google Cloud Computing Foundations Certificate",
    issuer: "Google Cloud",
    issuerLogo: google,
    date: "2024-05-26",
    credentialUrl: "https://www.credly.com/badges/adef3268-9dfe-496f-918d-26e46640255a/public_url",
    skills: ["Cloud Architecture", "Virtual Machine", "Ai", "Cloud Storage", "Cloud Network"],
    type: "certification",
    theme: "google",
    isSpecial: true
  },
  {
    id: 2,
    name: "AWS Academy Graduate - Cloud Foundations",
    issuer: "AWS",
    issuerLogo: aws,
    date: "2024-05-26",
    credentialUrl: "https://www.credly.com/badges/b72ba373-0301-4375-b5c3-8894b44696af/linked_in_profile",
    skills: ["Cloud Architecture", "Virtual Machine", "Ai", "Cloud Storage", "Cloud Network"],
    type: "certification",
    theme: "aws",
    isSpecial: true
  },

  {
    id: 22,
    name: " AI Fluency Framework & Foundations",
    issuer: "Anthropic",
    issuerLogo: anthropic,
    date: "2026-05-05",
    credentialUrl: "https://verify.skilljar.com/c/3uohh4739ww8",
    skills: ["AI Literacy", "Prompt Engineering", "LLM", "Claude", "AI Ethics "],
    type: "certification",
    theme: "anthropic",
    isSpecial: false
  },

    {
    id: 6,
    name: "Chatbots",
    issuer: "Fiap",
    issuerLogo: fiap,
    date: "2025-04-24",
    credentialUrl: "https://on.fiap.com.br/local/nanocourses/gerar_certificado.php?chave=6526af44be2aaee6dff30a26dc0b698c&action=view",
    skills: ["prompt engineering", "AI", "Chat Bots"],
    type: "certification",
    theme: "fiap",
    isSpecial: true
  },

      {
    id: 7,
    name: "Automação de processos com n8n",
    issuer: "Alura",
    issuerLogo: alura,
    date: "2026-05-20",
    credentialUrl: "https://cursos.alura.com.br/user/Gabriel-barbosa79/course/automacao-n8n-multiagentes/certificate",
    skills: ["N8N", "AI", "Chat Bots", "Automação","APIs"],
    type: "certification",
    theme: "alura",
    isSpecial: true
  },
     {
    id: 8,
    name: "ITIL",
    issuer: "FIAP",
    issuerLogo: fiap,
    date: "2026-07-17",
    credentialUrl: "https://on.fiap.com.br/local/nanocourses/gerar_certificado.php?chave=ed90b24504c4774877f2e3c4ac70bb1f&action=view",
    skills: ["ITIL", "Support", "Troubleshooting", "Incident Management", "Change Management"],
    type: "certification",
    theme: "fiap",
    isSpecial: false
  },


  {
    id: 3,
    name: "React: desenvolvendo com JavaScript",
    issuer: "Alura",
    issuerLogo: alura,
    date: "2024-06-10",
    credentialUrl: "https://cursos.alura.com.br/certificate",
    skills: ["React", "JavaScript", "Hooks", "Component Design"],
    type: "course",
    theme: "alura",
  },

  {
    id: 5,
    name: "Criar um serviço de IoT para seus aplicativos nativos de nuvem usando o IoT Central",
    issuer: "Microsoft",
    issuerLogo: azure,
    date: "2025-09-21",
    credentialUrl: "https://learn.microsoft.com/api/achievements/share/pt-br/GabrielBarbosa-4747/8Z877R7W?sharingId=F1C330B23F9BEFC9",
    skills: ["C#", "Cloud Computing", "AI", "IoT", "Azure"],
    type: "certification",
    theme: "azure"
  },

    {
    id: 4,
    name: "Orquestrar contêineres para aplicativos nativos de nuvem com o AKS",
    issuer: "Microsoft",
    issuerLogo: azure,
    date: "2025-09-21",
    credentialUrl: "https://learn.microsoft.com/api/achievements/share/pt-br/GabrielBarbosa-4747/8Z877R7W?sharingId=F1C330B23F9BEFC9",
    skills: ["C#", "Cloud Computing", "AI", "IoT", "Azure"],
    type: "certification",
    theme: "azure"
  },


  {
    id: 7,
    name: "Agentes Autônomos (Agentic AI)",
    issuer: "Fiap",
    issuerLogo: fiap,
    date: "2025-04-16",
    credentialUrl: "https://on.fiap.com.br/local/nanocourses/gerar_certificado.php?chave=f04096416194f572dd840d8627d36fed&action=view",
    skills: ["Machine Learning", "AI", "Autonomous Agents","Chat Bots"],
    type: "course",
    theme: "fiap",
  },
  {
    id: 8,
    name: "Microsoft Azure Fundamentals: Describe Azure architecture and services",
    issuer: "Microsoft",
    issuerLogo: azure,
    date: "2025-03-12",
    credentialUrl: "https://learn.microsoft.com/en-us/users/gabrielbarbosa-4747/achievements/wzhuy9xn",
    skills: ["Azure", "Cloud Computing", "Infrastructure"],
    type: "certification",
    theme: "azure"
  },
  {
    id: 9,
    name: "Google Cloud Computing Foundations: Networking & Security in Google Cloud",
    issuer: "Google",
    issuerLogo: google,
    date: "2025-05-16",
    credentialUrl: "https://www.cloudskillsboost.google/public_profiles/e6218dc7-e424-4687-a921-181ddfb57c80/badges/15805176",
    skills: ["Google Cloud", "Cloud Computing", "Infrastructure", "Network", "Security"],
    type: "certification",
    theme: "google"
  },
  {
    id: 10,
    name: "Google Cloud Computing Foundations: Infrastructure in Google Cloud",
    issuer: "Google",
    issuerLogo: google,
    date: "2025-05-09",
    credentialUrl: "https://www.cloudskillsboost.google/public_profiles/e6218dc7-e424-4687-a921-181ddfb57c80/badges/15624870",
    skills: ["Google Cloud", "Cloud Computing", "Infrastructure"],
    type: "certification",
    theme: "google"
  },
  {
    id: 11,
    name: "Modernize Infrastructure and Applications with Google Cloud",
    issuer: "Google",
    issuerLogo: google,
    date: "2025-07-26",
    credentialUrl: "https://www.cloudskillsboost.google/public_profiles/e6218dc7-e424-4687-a921-181ddfb57c80/badges/18641542",
    skills: ["Google Cloud", "Cloud Computing", "AI", "Network", "Machine Learning"],
    type: "course",
    theme: "google"
  },
  {
    id: 12,
    name: "Digital Transformation with Google Cloud",
    issuer: "Google",
    issuerLogo: google,
    date: "2025-07-26",
    credentialUrl: "https://www.cloudskillsboost.google/public_profiles/e6218dc7-e424-4687-a921-181ddfb57c80/badges/18641474",
    skills: ["Google Cloud", "Cloud Computing", "AI", "Network", "Machine Learning"],
    type: "course",
    theme: "google"
  },

    {
    id: 14,
    name: "Automação de processos com n8n: multiagentes, guardrails e subworkflows",
    issuer: "Alura",
    issuerLogo: alura,
    date: "2026-05-20",
    credentialUrl: "https://cursos.alura.com.br/user/Gabriel-barbosa79/course/automacao-n8n-multiagentes/certificate",
    skills: ["N8N", "AI", "Chat Bots", "Automação", "APIs"],
    type: "course",
    theme: "alura"
  },

      {
    id: 15,
    name: "Automação de processos com n8n: integração de APIs REST",
    issuer: "Alura",
    issuerLogo: alura,
    date: "2026-05-18",
    credentialUrl: "https://cursos.alura.com.br/user/Gabriel-barbosa79/course/automacao-n8n-integracao-apis-rest/certificate",
    skills: ["N8N", "AI", "Chat Bots", "Automação", "APIs"],
    type: "course",
    theme: "alura"
  },

       {
    id: 16,
    name: "Automação de processos com n8n: integração de bases de conhecimento",
    issuer: "Alura",
    issuerLogo: alura,
    date: "2026-05-17",
    credentialUrl: "https://cursos.alura.com.br/user/Gabriel-barbosa79/course/automacao-n8n-integracao-apis-rest/certificate",
    skills: ["N8N", "AI", "Chat Bots", "Automação", "APIs"],
    type: "course",
    theme: "alura"
  },

    {
    id: 17,
    name: "Automação de processos com n8n: coleta e análise de dados",
    issuer: "Alura",
    issuerLogo: alura,
    date: "2026-05-10",
    credentialUrl: "https://cursos.alura.com.br/user/Gabriel-barbosa79/course/automacao-n8n-coleta-analise-de-dados/certificate",
    skills: ["N8N", "AI", "Chat Bots", "Automação", "APIs"],
    type: "course",
    theme: "alura"
  },
      {
    id: 17,
    name: "Automação de processos com n8n: modelagem de fluxos e integração de sistemas",
    issuer: "Alura",
    issuerLogo: alura,
    date: "2026-05-04",
    credentialUrl: "https://cursos.alura.com.br/user/Gabriel-barbosa79/course/automacao-processos-modelagem-de-fluxos-n8n/certificate",
    skills: ["N8N", "AI", "Chat Bots", "Automação", "APIs"],
    type: "course",
    theme: "alura"
  },
  {
    id: 13,
    name: "Google Cloud Computing Foundations: Data, ML, and AI in Google Cloud",
    issuer: "Google",
    issuerLogo: google,
    date: "2025-05-23",
    credentialUrl: "https://www.cloudskillsboost.google/public_profiles/e6218dc7-e424-4687-a921-181ddfb57c80/badges/15996851",
    skills: ["Google Cloud", "Cloud Computing", "AI", "Network", "Machine Learning"],
    type: "course",
    theme: "google"
  },
  {
    id: 14,
    name: "Microsoft Azure: Deploy a website to Azure with Azure App Service",
    issuer: "Microsoft",
    issuerLogo: azure,
    date: "2025-03-26",
    credentialUrl: "https://learn.microsoft.com/api/achievements/share/en-us/GabrielBarbosa-4747/QSPLB63E?sharingId=F1C330B23F9BEFC9",
    skills: ["ASP.NET", "Cloud Functions", "App Engine", "C#"],
    type: "course",
    theme: "azure"
  },
  {
    id: 15,
    name: "Microsoft Azure: Build web apps with ASP.NET Core for beginners",
    issuer: "Microsoft",
    issuerLogo: azure,
    date: "2025-03-19",
    credentialUrl: "https://learn.microsoft.com/api/achievements/share/en-us/GabrielBarbosa-4747/FVFABK6X?sharingId=F1C330B23F9BEFC9",
    skills: ["ASP.NET", "Cloud Functions", "App Engine", "C#"],
    type: "course",
    theme: "azure"
  },
  {
    id: 16,
    name: "DIO: Conceitos Fundamentais de IA",
    issuer: "Digital Innovation One",
    issuerLogo: dio,
    date: "2025-02-08",
    credentialUrl: "docs/IA.pdf",
    skills: ["Machine Learning", "AI", "prompt engineering"],
    type: "certification",
    theme: "dio"
  },
  {
    id: 17,
    name: "Construindo seu Portfólio Front-end do Zero com HTML, CSS e JavaScript",
    issuer: "Digital Innovation One",
    issuerLogo: dio,
    date: "2024-04-18",
    credentialUrl: "/public/docs/Portfolio.pdf",
    skills: ["JavaScript", "React", "CSS"],
    type: "course",
    theme: "dio"
  },
  {
    id: 18,
    name: "IBM Certified Technical Advocate - Cloud v5",
    issuer: "IBM",
    issuerLogo: ibm,
    date: "2024-03-22",
    credentialUrl: "#",
    skills: ["AI", "Machine Learning", "Watson", "Cloud Computing"],
    type: "course",
    theme: "ibm"
  },
  {
    id: 19,
    name: "Introdução À Gestão De Projetos",
    issuer: "Bradesco",
    issuerLogo: bradesco,
    date: "2024-02-20",
    credentialUrl: "https://lms.ev.org.br/mpls/web/Lms/UnifiedSearch/PageUnifiedSearch.aspx?elementID=482&filtersByContentType=WEB",
    skills: ["Projects", "Management", "Software development"],
    type: "certification",
    theme: "santander"
  },
  {
    id: 20,
    name: "Introdução ao Git e ao GitHub",
    issuer: "Digital Innovation One",
    issuerLogo: dio,
    date: "2023-12-17",
    credentialUrl: "/public/docs/Git.pdf",
    skills: ["Git", "Github", "CLI", "Version Control"],
    type: "course",
    theme: "dio"
  },
  {
    id: 21,
    name: "Curso de Contrução de Drones",
    issuer: "Jovem Engenheiro",
    issuerLogo: jovem,
    date: "2019-11-22",
    credentialUrl: "#",
    skills: ["SketchUp", "3D Modeling", "Electronics", "Arduino"],
    type: "course",
    theme: "default"
  }
];