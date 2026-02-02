/* eslint-disable @typescript-eslint/no-explicit-any */

export type Locale = 'en' | 'pt';

interface Translations {
  [locale: string]: {
    [key: string]: any;
  };
}

// Translation object structure
export const translations: Translations = {
  en: {
    description: {
      part1: 'Software Engineer Student',
      part2: 'committed to creating ',
      highlight: 'innovative and efficient solutions',
      part3: ' for diverse problems.',
    },

    technologiesIntro: {
      part1: 'Knowledge in the main ',
      highlight: 'Technologies',
      part2: ' on the market',
    },

    nav: {
      home: 'Home',
      about: 'About',
      skills: 'Skills',
      projects: 'Projects',
      experience: 'Experience',
      education: 'Education',
      certifications: 'Certifications',
      tools: 'Tools',
      contact: 'Contact',
    },

    hero: {
      greeting: 'Hello, I\'m',
      role: 'Software Developer',
      cta: 'My projects',
      download: 'Download CV',
    },

    about: {
      title: 'About Me',
      connect: 'Connect With Me',
      resume: 'Resume',
      description: 'I am passionate about technology, constantly seeking to improve my knowledge and skills in this dynamic and ever-evolving field. My soft skills are fundamental to my professional success, as I have exceptional communication abilities that allow me to collaborate effectively in multidisciplinary teams. I am proactive and resilient, always looking for creative solutions to complex challenges.',

    },

    skills: {
      title: 'Technologies',
      basic: 'Basic',
      intermediate: 'Intermediate',
      advanced: 'Advanced',
    },

    projects: {
      title: 'Projects',
      viewPreview: 'View Preview',
      viewRepository: 'Repository',
      techUsed: 'Technologies Used:',
      features: 'Features:',
      loadingProjects: 'Loading projects...',
      noProjects: 'No projects found.',
      viewProject: 'View Project',
      viewCode: 'View Code',
      liveDemo: 'Live Demo',
      documentation: 'Documentation',
      loadMore: 'Load More Projects',
    },

    experience: {
      title: 'Work Experience',
      present: 'Present',
      location: 'Location',
      description: 'Description',
      techTitle: 'Technologies Used',
      viewDetails: 'View Details',
      jobs: {
        job1: {
          position: 'IT Intern',
          description: 'I participated in the entire process of programming and testing vehicle telemetry equipment, increasing productivity through automations created in Notion and Excel. I developed training materials (videos and documents) for platform clients, contributing to better user experience and satisfaction. I also created two web systems to convert encrypted codes, optimizing a process previously done manually and significantly reducing the technical team’s workload.',
          location: 'São Paulo, SP',
        },
        job2: {
          position: 'AI Training Expert',
          description: 'I work on training and improving AI models by evaluating and adjusting prompts and responses in English and Portuguese. I deal with a wide variety of topics, mainly focused on analyzing AI-generated code, performing debugging, refactoring, and quality testing to ensure more accurate, coherent, and efficient results.',
          location: 'São Paulo, SP (remote)',
        },
        job3: {
          position: 'English Teacher',
          description: 'I taught hybrid English classes, with part of the students in person and part online. I created personalized study materials and a virtual learning environment on Discord with tips, notes, and additional exercises. I also led group activities to make learning more engaging and interactive, enhancing language development through collaboration.',
          location: 'São Paulo, SP',
        },
      },
    },


    education: {
      title: 'Education & Language',
      degree: 'Degree',
      institution: 'Institution',
      period: 'Period',
      languages: 'Languages',
      cards: [
          {
          degree: 'Bachelors degree in software engineering' ,
          institution: 'FIAP',
          description: 'My training is focused on designing and developing complete technological solutions within the field of Software Engineering. This includes creating applications for desktop, web, mobile devices, cloud environments, and the Internet of Things (IoT). Throughout the program, I studied essential subjects such as programming logic, algorithms, databases, artificial intelligence, cloud computing, information security, software engineering principles, user experience (UX), and agile development methodologies.',
        },
        {
          degree: 'Technologist in Multiplatform Software Development',
          institution: 'FATEC Zona Leste',
          description: 'Training focused on creating complete technological solutions, with emphasis on software development for desktop, web, mobile devices, cloud applications, and the Internet of Things (IoT). During the course, I studied essential subjects such as programming logic, algorithms, databases, artificial intelligence, cloud computing, information security, software engineering, UX (user experience), and agile methodologies.',
        },
        {
          degree: 'Industrial Automation Technician Integrated with High School',
          institution: 'ETEC Martin Luther King',
          description: 'Technical training focused on programming, installation, and maintenance of automated systems. Learned about PLCs, sensors, electrical systems, and instrumentation, integrating knowledge in electricity, electronics, and industrial safety.',
        },
        {
          degree: 'Language Course - English',
          institution: 'Wizard Language School',
          description: 'Training in reading, writing, listening, and conversation, focused on fluency, vocabulary, and practical use of the language in real-life situations.',
        },
      ],
      languageLevels: {
        english: 'Advanced',
        portuguese: 'Native',
        spanish: 'Basic',
      },

    },

    certifications: {
      title: "Certifications & Courses",
      description: "My journey of continuous learning and professional achievements",
      tabs: {
        certifications: "Certifications",
        courses: "Courses",
        all: "All",
      },
      badges: {
        certification: "Certification",
        course: "Course",
        special: "Special",
      },
      buttonViewCredential: "View Credential",
      noItemsFound: "No items found",
      loadMore: "Load More",
    },

    tools: {
      title: "Known Tools",
      skillLevels: {
        basic: "Basic",
        intermediate: "Intermediate",
        advanced: "Advanced",
      },
    },


     contact: {
      title: "Get in Touch",
      email: "Email",
      phone: "Phone",
      location: "Location",
      socialMedia: "Social Media",
      whatsapp: {
        title: "Contact me via WhatsApp",
        subtitle: "Click the button below to start a chat with me on WhatsApp",
        logoAlt: "WhatsApp Logo",
        quickReply: "Quick reply guaranteed →",
        openButton: "Open WhatsApp"
      }
    }
  

  },

  pt: {
    description: {
      part1: 'Estudante de Engenharia de Software ',
      part2: 'empenhado em criar ',
      highlight: 'soluções inovadoras e eficientes',
      part3: ' para problemas diversos.',
    },

    technologiesIntro: {
      part1: 'Conhecimento nas principais ',
      highlight: 'Tecnologias',
      part2: ' do mercado',
    },

    nav: {
      home: 'Início',
      about: 'Sobre',
      skills: 'Habilidades',
      projects: 'Projetos',
      experience: 'Experiência',
      education: 'Formação',
      certifications: 'Certificados',
      tools: 'Ferramentas',
      contact: 'Contato',
    },

    hero: {
      greeting: 'Olá, eu sou',
      role: 'Desenvolvedor de Software',
      cta: 'Meus projetos',
      download: 'Baixar Currículo',
    },

    about: {
      title: 'Sobre Mim',
      connect: 'Conecte-se Comigo',
      resume: 'Currículo',
      description: 'Sou uma pessoa apaixonada por tecnologia, constantemente buscando aprimorar meu conhecimento e habilidades nessa área dinâmica e em constante evolução. Minhas soft skills são fundamentais para meu sucesso profissional, pois possuo uma capacidade excepcional de comunicação, o que me permite colaborar efetivamente em equipes multidisciplinares. Sou proativo e resiliente, sempre buscando soluções criativas para desafios complexos.',

    },

    skills: {
      title: 'Tecnologias',
      basic: 'Básico',
      intermediate: 'Intermediário',
      advanced: 'Avançado',
    },



    projects: {
      title: 'Projetos',
      viewPreview: 'Ver Prévia',
      viewRepository: 'Repositório',
      techUsed: 'Tecnologias Utilizadas:',
      features: 'Funcionalidades:',
      loadingProjects: 'Carregando projetos...',
      noProjects: 'Nenhum projeto encontrado.',
      viewProject: 'Ver Projeto',
      viewCode: 'Ver Código',
      liveDemo: 'Demonstração',
      documentation: 'Documentação',
      loadMore: 'Carregar Mais Projetos',
    },

    experience: {
      title: 'Experiência Profissional',
      present: 'Presente',
      location: 'Local',
      description: 'Descrição',
      techTitle: 'Tecnologias Desenvolvidas',
      viewDetails: 'Ver Detalhes',
      jobs: {
        job1: {
          position: 'Support Analyst',
          description: 'Atuo na resolução de tickets de suporte ao cliente, solucionando problemas nas plataformas e esclarecendo dúvidas sobre o sistema. Também participo no desenvolvimento de melhorias sistêmicas e aplicações internas voltadas a aumentar a produtividade e a eficiência operacional. Durante minha jornada na Scope, desenvolvi softwares de automação e integrações via API que modernizaram processos internos, como um sistema de emissão automática de notas fiscais integrado à SEFAZ, sites para conversão de códigos criptografados que substituíram planilhas manuais e um RPA para automações web repetitivas, reduzindo tempo e erros operacionais. Além disso, contribuí na programação e testes de equipamentos de telemetria veicular e na criação de materiais de treinamento para aprimorar a experiência dos cliente',
          location: 'São Paulo, SP',
        },
        job2: {
          position: 'Especialista em Treinamento de IA',
          description: 'Atuo no treinamento e aprimoramento de modelos de IA, avaliando e ajustando prompts e respostas em inglês e português. Trabalho com uma ampla variedade de temas, com foco principal na análise de códigos gerados por IA, realizando tarefas como debug, refatoração e testes de qualidade para garantir respostas mais precisas, coerentes e eficientes.',
          location: 'São Paulo, SP (remoto)',
        },
        job3: {
          position: 'Professor de Inglês',
          description: 'Ministrei aulas de Inglês em formato híbrido, com parte dos alunos presencialmente e outra parte online. Elaborei materiais de estudo personalizados e criei um ambiente virtual no Discord com dicas, anotações e exercícios complementares. Além disso, promovi dinâmicas em grupo para tornar o aprendizado mais interativo e engajador, potencializando a evolução no idioma de forma colaborativa.',
          location: 'São Paulo, SP',
        },
      },
    },


    education: {
      title: 'Formação Acadêmica & Idiomas',
      degree: 'Graduação',
      institution: 'Instituição',
      period: 'Período',
      languages: 'Idiomas',
      cards: [
          {
          degree: 'Bacharelado em Engenharia de Software' ,
          institution: 'FIAP',
          description: 'Minha formação é voltada para a criação e desenvolvimento de soluções tecnológicas completas na área de Engenharia de Software. Isso inclui o desenvolvimento de aplicações para desktop, web, dispositivos móveis, ambientes em nuvem e Internet das Coisas (IoT). Durante o curso, estudei disciplinas essenciais como lógica de programação, algoritmos, bancos de dados, inteligência artificial, computação em nuvem, segurança da informação, engenharia de software, experiência do usuário (UX) e metodologias ágeis',
        },
        {
          degree: 'Tecnólogo em Desenvolvimento de Software Multiplataforma',
          institution: 'FATEC Zona Leste',
          description: 'Formação voltada para a criação de soluções tecnológicas completas, com foco em desenvolvimento de software para desktop, web, dispositivos móveis, aplicações em nuvem e Internet das Coisas (IoT).Durante o curso, estudei disciplinas fundamentais como lógica de programação, algoritmos, banco de dados, inteligência artificial, computação em nuvem, segurança da informação, engenharia de software, UX (experiência do usuário) e metodologias ágeis.',
        },
        {
          degree: 'Técnico em Automação Industrial Integrado ao Ensino Médio',
          institution: 'ETEC Martin Luther King',
          description: 'Formação técnica com foco na programação, instalação e manutenção de sistemas automatizados. Aprendizado em CLPs, sensores, sistemas elétricos e instrumentação, com integração de conhecimentos em elétrica, eletrônica e segurança industrial.',
        },
        {
          degree: 'Curso de Idiomas - Inglês',
          institution: 'Wizard Escola de Idiomas',
          description: 'Formação em leitura, escrita, escuta e conversação, com foco na fluência, vocabulário e uso prático do idioma em contextos reais.',
        },
      ],
      languageLevels: {
        english: 'Avançado',
        portuguese: 'Nativo',
        spanish: 'Básico',
      },
    },

    certifications: {
      title: "Certificações & Cursos",
      description: "Minha jornada de aprendizado contínuo e conquistas profissionais",
      tabs: {
        certifications: "Certificações",
        courses: "Cursos",
        all: "Todos",
      },
      badges: {
        certification: "Certificação",
        course: "Curso",
        special: "Especial",
      },
      buttonViewCredential: "Ver Credencial",
      noItemsFound: "Nenhum item encontrado",
      loadMore: "Carregar Mais",
    },

    tools: {
      title: "Ferramentas Conhecidas",
      skillLevels: {
        basic: "Básico",
        intermediate: "Intermediário",
        advanced: "Avançado",
      },
    },

    contact: {
      title: "Entre em Contato",
      email: "Email",
      phone: "Telefone",
      location: "Localização",
      socialMedia: "Redes Sociais",
      whatsapp: {
        title: "Entre em contato via WhatsApp",
        subtitle: "Clique no botão abaixo para iniciar uma conversa comigo no WhatsApp",
        logoAlt: "Logo do WhatsApp",
        quickReply: "Resposta rápida garantida →",
        openButton: "Abrir WhatsApp"
      }
    }
  },
};