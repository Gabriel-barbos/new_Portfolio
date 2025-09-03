import js from "../assets/icons-globe/javascript.svg"
import node from "../assets/icons-globe/node.png"
import mongo from "../assets/icons-globe/mongo.png"
import react from "../assets/icons-globe/react.png"
import tailwind from "../assets/icons-globe/tailwind.png"
import reactNative from "../assets/icons-globe/react-native.png"
import next from "../assets/icons-globe/next.png"
import typescript from "../assets/icons-globe/typescript.png"
import firebase from "../assets/icons-globe/firebase.png"
import python from "../assets/icons-globe/python.png"
import html from "../assets/icons-globe/html.png"
import css from "../assets/icons-globe/css.png"
import sql from "../assets/icons-globe/mysql.png"
import powerbi from "../assets/icons-globe/powerbi.png"

import impermaq from "../assets/projects/impermaq (2).png";
import vendas from "../assets/projects/vendas.png";
import campusface from "../assets/projects/campusface.png";
import fatecoleta from "../assets/projects/fatecoleta.png"
import nutrihub from "../assets/projects/nutrihub-bg.png"
import devuhub from "../assets/projects/devhub.png"
import michele from "../assets/projects/michele-cortinass.png"
import tourlis from "../assets/projects/tourlis.png"
import miniprojeto from "../assets/projects/miniprojeto.png"
import inmobel from "../assets/projects/inmobel.png"
import jarvis from "../assets/projects/JARVIS.png"
export type Locale = 'en' | 'pt';

export interface Project {
  id: number;
  title: string;
  description: string;
  features: string[];
  image: string;
  previewUrl: string;
  repoUrl: string;
  technologies: {
    name: string;
    icon: string;
  }[];
}

interface ProjectTranslations {
  [locale: string]: {
    [projectId: number]: {
      title: string;
      description: string;
      features: string[];
    };
  };
}

export const projectTranslations: ProjectTranslations = {
  pt: {
       11: {
      title: 'JARVIS',
      description: '"Just a Rather Very Intelligent System" Programa para automações web para tarefas repetivas',
      features: [
        'Diversas automações web',
        'Adaptável a instabilidades',
        'Tratamento de erros robusto',
        'Compativel com grande volume de dados',
      ],
    },

    10: {
      title: 'Inmobel Móveis Planejados',
      description: 'Site para vitrine da empresa, apresentação de portfólio e serviços',
      features: [
        'Portfólio de projetos',
        'Aba "Contate-nos"',
        'Responsivo',
        'Integração com Whatsapp',
        
      ],
    },

    1: {
      title: 'Impermaq Máquinas',
      description: 'Site para vitrine de produtos e serviços e vendas de maquinas industriais',
      features: [
        'Cadastro de produtos',
        'Controle de acesso para administradores',
        'Responsivo',
        'Integração com Whatsapp para orçamentos',
        'Admin dashboard',
      ],
    },
    2: {
      title: 'Sistema de Vendas',
      description: 'Sistema completo de frente de caixa com gestão de produtos, estoque e relatórios',
      features: [
        'Sistema de estoque e venda',
        'Dashboard de relatórios e gráficos',
        'Cadastro de Produtos',
        'Operadores e Administradores',
        'Abertura e fechamento de Caixa',
      ],
    },
    3: {
      title: 'CampusFace',
      description: 'Sistema mobile para controle de acesso com reconhecimento facial e QR code',
      features: [
        'Liberação de acesso com reconhecimento facial',
        'Sistema 100% mobile',
        'Cadastro de usuários pelo celular',
        'Histórico de entrada de usuários',
      ],
    },
    4: {
      title: 'FateColeta',
      description: 'Plataforma web para cadastro de pontos de coleta de reciclagem',
      features: [
        'Acessibilidade',
        'Integração com Firebase',
        'Troca de Temas e Responsividade',
        'Interação com Maps',
      ],
    },
    5: {
      title: 'Devhub',
      description: 'Rede Social voltada para o público tech',
      features: [
        'Lógica de Posts, Comentários e Threads',
        'Desenvolvido com FastAPI',
        'Troca de Temas e Responsividade',
        'Uso de componentes Shadcn',
        'Banco de dados não relacional',
      ],
    },
    6: {
      title: 'Nutrihub',
      description: 'Projeto Colaborativo Internacional para o desenvolvimento de um sistema de nutrição',
      features: [
        'Projeto em colaboração com estudantes Colombianos',
        'Ler código de barras de Alimentos',
        'Integração com API da tabela nutricional',
        'Metodologia SCRUM',
      ],
    },
    7: {
      title: 'Michele Cortinas',
      description: 'E-commerce para loja de cortinas',
      features: [
        'Recuperação de senha via E-mail',
        'Carrinho de compras',
        'Visualização de cada produto de acordo com a cor',
        'Solicitar orçamento',
      ],
    },
    8: {
      title: 'Tourlis',
      description: 'Site sobre turismo Sustentável com métricas avançadas',
      features: [
        'Integração com PowerBi',
        'Responsivo',
        'Quiz Interativo',
        'Metodologia SCRUM',
      ],
    },
    9: {
      title: 'React Native HUB',
      description: 'Projeto desenvolvido para exercitar conceitos do React Native',
      features: [
        'Navegação entre telas',
        'Troca de temas',
        'Async Storage',
        'Design responsivo',
      ],
    },
  },
  en: {
       11: {
      title: 'JARVIS',
      description: '"Just a Rather Very Intelligent System" Program for repetive web tasks',
      features: [
        'multiple web automations',
        'Adaptable to instability',
        'Robust error handling',
        'Compatible with a big amount of data',
      ],
    },

    10: {
      title: 'Inmobel Móveis Planejados',
      description: 'Site para vitrine da empresa, apresentação de portfólio e serviços',
      features: [
        'Projects portfolio',
        '"Contact-us" section',
        'Responsive design',
        'WhatsApp integration',
        
      ],
    },

    1: {
      title: 'Impermaq Machines',
      description: 'Website for product and service showcase and industrial machine sales',
      features: [
        'Product registration',
        'Access control for administrators',
        'Responsive design',
        'WhatsApp integration for quotes',
        'Admin dashboard',
      ],
    },
    2: {
      title: 'Sales System',
      description: 'Complete point-of-sale system with product management, inventory and reports',
      features: [
        'Inventory and sales system',
        'Reports and charts dashboard',
        'Product registration',
        'Operators and Administrators',
        'Cash register opening and closing',
      ],
    },
    3: {
      title: 'CampusFace',
      description: 'Mobile system for access control with facial recognition and QR code',
      features: [
        'Access release with facial recognition',
        '100% mobile system',
        'User registration via mobile',
        'User entry history',
      ],
    },
    4: {
      title: 'FateColeta',
      description: 'Web platform for registering recycling collection points',
      features: [
        'Accessibility',
        'Firebase integration',
        'Theme switching and Responsiveness',
        'Maps interaction',
      ],
    },
    5: {
      title: 'Devhub',
      description: 'Social network aimed at the tech audience',
      features: [
        'Posts, Comments and Threads logic',
        'Developed with FastAPI',
        'Theme switching and Responsiveness',
        'Use of Shadcn components',
        'Non-relational database',
      ],
    },
    6: {
      title: 'Nutrihub',
      description: 'International Collaborative Project for developing a nutrition system',
      features: [
        'Project in collaboration with Colombian students',
        'Read food barcodes',
        'Integration with nutritional table API',
        'SCRUM methodology',
      ],
    },
    7: {
      title: 'Michele Curtains',
      description: 'E-commerce for curtain store',
      features: [
        'Password recovery via email',
        'Shopping cart',
        'Product visualization according to color',
        'Request quote',
      ],
    },
    8: {
      title: 'Tourlis',
      description: 'Sustainable tourism website with advanced metrics',
      features: [
        'PowerBI integration',
        'Responsive design',
        'Interactive quiz',
        'SCRUM methodology',
      ],
    },
    9: {
      title: 'React Native HUB',
      description: 'Project developed to exercise React Native concepts',
      features: [
        'Screen navigation',
        'Theme switching',
        'Async Storage',
        'Responsive design',
      ],
    },
  },
};

export const projectsBaseData: Omit<Project, 'title' | 'description' | 'features'>[] = [
      {
    id: 11,
    image: jarvis,
    previewUrl: '',
    repoUrl: '  ',
    technologies: [
      { name: 'Python', icon: python },
  
    ],
  },
  
  {
    id: 10,
    image: inmobel,
    previewUrl: 'https://inmobel-design-studio.vercel.app',
    repoUrl: 'https://github.com/Gabriel-barbos/impermaq-V2',
    technologies: [
      { name: 'React', icon: react },
      { name: 'JavaScript', icon: js },
      { name: 'CSS', icon: css },
      { name: 'Tailwind CSS', icon: tailwind },
    ],
  },
  
  {
    id: 1,
    image: impermaq,
    previewUrl: 'https://www.impermaq.com.br',
    repoUrl: 'https://github.com/Gabriel-barbos/impermaq-V2',
    technologies: [
      { name: 'React', icon: react },
      { name: 'Node.js', icon: node },
      { name: 'MongoDB', icon: mongo },
      { name: 'Tailwind CSS', icon: tailwind },
    ],
  },
  {
    id: 2,
    image: vendas,
    previewUrl: 'https://sistema-de-vendas2.vercel.app/',
    repoUrl: 'https://github.com/Gabriel-barbos/SistemaDeVendas',
    technologies: [
      { name: 'React', icon: react },
      { name: 'JavaScript', icon: js },
      { name: 'Node.js', icon: node },
      { name: 'MongoDB', icon: mongo },
    ],
  },
  {
    id: 3,
    image: campusface,
    previewUrl: 'https://www.figma.com/slides/e9dU490NWBNaWJadKCaInl/CampusFace_Apresentação1?node-id=1-42&t=KWX84i36Y183YUl0-0',
    repoUrl: 'https://github.com/Gabriel-barbos/CampusFace',
    technologies: [
      { name: 'React Native', icon: reactNative },
      { name: 'JavaScript', icon: js },
      { name: 'Node.js', icon: node },
      { name: 'MongoDB', icon: mongo },
    ],
  },
  {
    id: 4,
    image: fatecoleta,
    previewUrl: 'https://www.figma.com/deck/TBCbQNAOopJBtAxGYEfZVl/fatecoleta---ux?node-id=1-32&t=L0Owh5S6iMojC1IJ-1',
    repoUrl: 'https://fatecoleta.vercel.app',
    technologies: [
      { name: 'Next', icon: next },
      { name: 'TypeScript', icon: typescript },
      { name: 'Firebase', icon: firebase },
      { name: 'Tailwind CSS', icon: tailwind },
    ],
  },
  {
    id: 5,
    image: devuhub,
    previewUrl: 'docs/Devhub.pdf',
    repoUrl: 'https://github.com/Gabriel-barbos/Devhub.git',
    technologies: [
      { name: 'Next', icon: next },
      { name: 'TypeScript', icon: typescript },
      { name: 'Mongo DB', icon: mongo },
      { name: 'Python', icon: python },
    ],
  },
  {
    id: 6,
    image: nutrihub,
    previewUrl: 'docs/NutriHub.pdf',
    repoUrl: 'https://github.com/gabrielmeiradev/nutrihub',
    technologies: [
      { name: 'HTML', icon: html },
      { name: 'CSS', icon: css },
      { name: 'Javascript', icon: js },
      { name: 'Tailwind CSS', icon: tailwind },
    ],
  },
  {
    id: 7,
    image: michele,
    previewUrl: 'docs/MicheleCortinas.pdf',
    repoUrl: 'https://github.com/Gabriel-barbos/Michele-Cortinas',
    technologies: [
      { name: 'React', icon: react },
      { name: 'MySQL', icon: sql },
      { name: 'Javascript', icon: js },
      { name: 'Node.Js', icon: node },
    ],
  },
  {
    id: 8,
    image: tourlis,
    previewUrl: 'https://youtu.be/TsgTKow4El0?si=g6CTXUWCz50tbaaO',
    repoUrl: 'https://github.com/Gabriel-barbos/Tourlis',
    technologies: [
      { name: 'HTML', icon: html },
      { name: 'CSS', icon: css },
      { name: 'Javascript', icon: js },
      { name: 'Power BI', icon: powerbi },
    ],
  },
  {
    id: 9,
    image: miniprojeto,
    previewUrl: 'https://snack.expo.dev/@gabriel.barbosaa/mini-projetos',
    repoUrl: 'https://snack.expo.dev/@gabriel.barbosaa/mini-projetos',
    technologies: [
      { name: 'React Native', icon: reactNative },
      { name: 'Node', icon: node },
      { name: 'Javascript', icon: js },
      { name: 'Tailwind CSS', icon: tailwind },
    ],
  },
];

// Função para obter projetos traduzidos
export const getTranslatedProjects = (locale: Locale): Project[] => {
  return projectsBaseData.map((baseProject) => {
    const translation = projectTranslations[locale][baseProject.id];
    return {
      ...baseProject,
      title: translation.title,
      description: translation.description,
      features: translation.features,
    };
  });
};

// Função para obter um projeto específico traduzido
export const getTranslatedProject = (projectId: number, locale: Locale): Project | undefined => {
  const baseProject = projectsBaseData.find(p => p.id === projectId);
  if (!baseProject) return undefined;

  const translation = projectTranslations[locale][projectId];
  if (!translation) return undefined;

  return {
    ...baseProject,
    title: translation.title,
    description: translation.description,
    features: translation.features,
  };
};