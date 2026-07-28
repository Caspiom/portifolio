export const t = {
  en: {
    nav: {
      links: ['About', 'Experience', 'Skills', 'Projects', 'Contact'],
      github: 'GitHub',
    },
    hero: {
      greeting: '// Salvador, BA',
      title: 'Full-Stack Developer | Software Engineering Student',
      bio: 'I build full-stack applications and REST APIs, focused on systems integration and backend work. I work with Java, Python and Rust, across AWS and Azure. Currently studying at UCSAL and always shipping something new.',
      viewProjects: 'See my work',
      getInTouch: 'Get in touch',
      scroll: 'scroll',
    },
    about: {
      label: 'about',
      title: 'A bit about me',
      p1: 'I\'m a software engineering student at UCSAL in Salvador and I\'ve been writing code seriously for a few years now. I got into it through audio/video production, editing and live streaming mostly, and somewhere along the way I got hooked on the software side.',
      p2: 'Right now I\'m working at <strong>Gaspari Tecnologia</strong>, managing cloud infrastructure on AWS and Azure, writing Python scripts to automate the boring parts, and building full-stack apps with Rust, Java, and React. At <strong>UCSAL\'s software factory</strong> I worked on real projects end-to-end using Java and React.',
      p3: 'What I enjoy most is integration: wiring together systems that were never meant to talk to each other, and making that run reliably. I reach for Rust when the problem calls for performance and memory safety, and Python for everything else.',
      stats: {
        experience: 'Years in Development',
        repos: 'GitHub Repositories',
        languages: 'Languages',
        cloud: 'Cloud Platforms',
      },
    },
    experience: {
      label: 'experience',
      title: 'Where I\'ve worked',
      jobs: [
        {
          period: 'Sep 2025 — Present',
          role: 'Junior Full-Stack Developer',
          company: 'Gaspari Tecnologia',
          location: 'Salvador, BA',
          bullets: [
            'Built a Rust (Axum) API integrating Power BI Embedded through app-owns-data (Entra ID app registration), delivering reports to end users inside the application. In production, serving a real client.',
            'Built Microsoft Graph API integrations (Entra ID authentication, SharePoint, scope-based permissions) to automate client file workflows.',
            'Developed full-stack web applications with React on the frontend and Java/Python on the backend, covering the full product lifecycle from prototyping to deploy.',
            'Wrote Python automations that cut repetitive tasks from ~2h down to ~15min.',
            'Worked with cloud environments (AWS and Azure), Docker and CI/CD to ship the applications.',
            'Administered Microsoft 365 and Google Workspace platforms (50+ users) and provided N2 technical support to internal users.',
          ],
        },
        {
          period: 'Oct 2024 — Present',
          role: 'Software Engineer',
          company: 'Fábrica de Software Acadêmica UCSAL',
          location: 'Salvador, BA',
          bullets: [
            'Full-cycle software development, from conception to deployment and maintenance.',
            'Built full-stack applications using Java and React, covering both backend services and interactive frontends.',
            'Requirements analysis, prototyping, and system implementation.',
            'Software testing for quality assurance and production environment deployments.',
          ],
        },
        {
          period: 'Jan 2020 — Oct 2024',
          role: 'Freelance Audio/Video Technician',
          company: 'M2 AudioVisual',
          location: 'Salvador, BA',
          bullets: [
            'Technical production of audio and video for artistic and corporate events.',
            'Filming, audiovisual editing, and live-stream operations.',
          ],
        },
      ],
      edu: {
        degree: 'B.Sc. Software Engineering',
        school: 'Universidade Católica do Salvador (UCSAL)',
        period: 'Jan 2023 — Dec 2026',
      },
    },
    skills: {
      label: 'skills',
      title: 'What I work with',
      groups: [
        { category: 'Languages', icon: '{ }' },
        { category: 'Cloud & Infrastructure', icon: '☁' },
        { category: 'Tools & Platforms', icon: '⚙' },
        { category: 'Practices', icon: '◈' },
      ],
      langNative: 'Native',
      langFluent: 'Fluent',
    },
    projects: {
      label: 'projects',
      title: 'Things I\'ve built',
      otherTitle: 'other stuff',
      githubCta: 'All 29 repos on GitHub →',
      prodBadge: 'Production · Real client',
      items: [
        {
          name: 'Power BI Embedded Reports (Rust API)',
          description: 'A Rust (Axum) API that integrates Power BI Embedded using app-owns-data, authenticating through an Entra ID app registration to deliver reports to end users right inside the application. In production, serving a real client.',
        },
        {
          name: 'HACKATHON-TJBA-2025',
          description: 'Full-stack solution built for the TJBA 2025 hackathon, serving the Tribunal de Justiça da Bahia: Java and Spring Boot on the backend, React on the frontend.',
        },
        {
          name: 'Microservices with Eureka (Spring Boot)',
          description: 'Microservices architecture using Netflix Eureka for service discovery and Spring Boot, with independent services registering and finding each other at runtime.',
        },
        {
          name: 'Neural Network From Scratch',
          description: 'A neural network built from the ground up in Python, no ML frameworks, just math and code to understand how deep learning actually works.',
        },
        {
          name: 'PacmanIA',
          description: 'An intelligent agent that plays Pac-Man using AI pathfinding algorithms, built entirely in Python.',
        },
        {
          name: 'TodoList CLI (Rust)',
          description: 'A simple but solid command-line to-do list manager written in Rust. Fast, minimal, and memory-safe.',
        },
        {
          name: 'Google Workspace User Filter',
          description: 'CLI tool for analyzing and filtering Google Workspace users. Handy for IT admins managing large orgs.',
        },
        {
          name: 'DiscordBotAi',
          description: 'A Discord bot with an AI personality, built in Python. Responds to messages with generated content.',
        },
        {
          name: 'PDF to CSV',
          description: 'A Python utility to extract and convert data from PDF files into structured CSV format.',
        },
        {
          name: 'flappyfox',
          description: 'A Flappy Bird clone written in Rust. A fun little systems programming exercise with game loop logic.',
        },
      ],
    },
    contact: {
      label: 'contact',
      title: 'Let\'s talk',
      desc: 'Open to opportunities, freelance work, or just talking shop. Email is best.',
      emailLabel: 'Email',
      phoneLabel: 'Phone',
      githubLabel: 'GitHub',
      linkedinLabel: 'LinkedIn',
      locationLabel: 'Location',
      location: 'Salvador, Bahia, Brazil',
      cta: 'Send an email',
    },
    game: {
      label: 'just for fun',
      title: 'Kill some time',
      desc: 'Bored scrolling? Here\'s a Space Invaders. Arrow keys / WASD to move, Space to shoot.',
      controls: 'Arrow keys / WASD to move · Space to shoot',
      play: 'Play',
      retry: 'Try Again',
      playAgain: 'Play Again',
      gameOver: 'Game Over',
      win: 'You cleared it!',
    },
    footer: {
      built: 'Designed & Built by',
    },
  },

  pt: {
    nav: {
      links: ['Sobre', 'Experiência', 'Habilidades', 'Projetos', 'Contato'],
      github: 'GitHub',
    },
    hero: {
      greeting: '// Salvador, BA',
      title: 'Desenvolvedor Full-Stack | Estudante de Engenharia de Software',
      bio: 'Construo aplicações full-stack e APIs REST, com foco em integração de sistemas e backend. Trabalho com Java, Python e Rust, em ambientes AWS e Azure. Atualmente estudando na UCSAL e sempre entregando algo novo.',
      viewProjects: 'Ver meus projetos',
      getInTouch: 'Entrar em contato',
      scroll: 'rolar',
    },
    about: {
      label: 'sobre',
      title: 'Um pouco sobre mim',
      p1: 'Sou estudante de engenharia de software na UCSAL, em Salvador, e escrevo código de forma séria há alguns anos. Comecei pela produção audiovisual, mais edição e transmissão ao vivo, e em algum momento fui fisgado pelo lado do software.',
      p2: 'Hoje trabalho na <strong>Gaspari Tecnologia</strong>, gerenciando infraestrutura em nuvem na AWS e Azure, escrevendo scripts Python para automatizar tarefas operacionais e desenvolvendo aplicações full-stack com Rust, Java e React. Na <strong>fábrica de software da UCSAL</strong> trabalhei em projetos reais do início ao fim com Java e React.',
      p3: 'O que mais gosto é de integração: conectar sistemas que não foram feitos para conversar e fazer isso rodar de forma confiável. Uso Rust quando o problema pede desempenho e segurança de memória, e Python para todo o resto.',
      stats: {
        experience: 'Anos em Desenvolvimento',
        repos: 'Repositórios no GitHub',
        languages: 'Linguagens',
        cloud: 'Plataformas Cloud',
      },
    },
    experience: {
      label: 'experiência',
      title: 'Onde trabalhei',
      jobs: [
        {
          period: 'Set 2025 — Atual',
          role: 'Desenvolvedor Full-Stack Júnior',
          company: 'Gaspari Tecnologia',
          location: 'Salvador, BA',
          bullets: [
            'Desenvolvi uma API em Rust (Axum) que integra o Power BI Embedded no modelo app-owns-data (autenticação via registro de app no Entra ID), entregando relatórios a usuários finais direto na aplicação. Em produção, com cliente real.',
            'Construí integrações com a Microsoft Graph API (autenticação via Entra ID, SharePoint, permissionamento por escopo) para automatizar fluxos de arquivos de clientes.',
            'Desenvolvi aplicações web full-stack com React no frontend e Java/Python no backend, cobrindo todo o ciclo do produto, da prototipação ao deploy.',
            'Criei automações em Python que reduziram tarefas repetitivas de ~2h para ~15min.',
            'Trabalhei com ambientes de nuvem (AWS e Azure), Docker e CI/CD na entrega das aplicações.',
            'Administrei plataformas Microsoft 365 e Google Workspace (+50 usuários) e prestei suporte técnico N2 a usuários internos.',
          ],
        },
        {
          period: 'Out 2024 — Atual',
          role: 'Engenheiro de Software',
          company: 'Fábrica de Software Acadêmica UCSAL',
          location: 'Salvador, BA',
          bullets: [
            'Desenvolvimento completo de software, da concepção à implantação e manutenção.',
            'Construção de aplicações full-stack utilizando Java e React, cobrindo desde serviços backend até interfaces interativas.',
            'Análise de requisitos, elaboração de protótipos e implementação de sistemas.',
            'Testes de software para garantia de qualidade e implantação em ambiente de produção.',
          ],
        },
        {
          period: 'Jan 2020 — Out 2024',
          role: 'Freelancer, Técnico em Áudio e Vídeo',
          company: 'M2 AudioVisual',
          location: 'Salvador, BA',
          bullets: [
            'Produção técnica de áudio e vídeo para eventos artísticos e corporativos.',
            'Filmagem, edição audiovisual e operação de transmissões ao vivo.',
          ],
        },
      ],
      edu: {
        degree: 'Bacharelado em Engenharia de Software',
        school: 'Universidade Católica do Salvador (UCSAL)',
        period: 'Jan 2023 — Dez 2026',
      },
    },
    skills: {
      label: 'habilidades',
      title: 'Com o que trabalho',
      groups: [
        { category: 'Linguagens', icon: '{ }' },
        { category: 'Cloud & Infraestrutura', icon: '☁' },
        { category: 'Ferramentas & Plataformas', icon: '⚙' },
        { category: 'Práticas', icon: '◈' },
      ],
      langNative: 'Nativo',
      langFluent: 'Fluente',
    },
    projects: {
      label: 'projetos',
      title: 'O que construí',
      otherTitle: 'outras coisas',
      githubCta: 'Todos os 29 repos no GitHub →',
      prodBadge: 'Produção · Cliente real',
      items: [
        {
          name: 'Relatórios Power BI Embedded (API em Rust)',
          description: 'API em Rust (Axum) que integra o Power BI Embedded no modelo app-owns-data, com autenticação via registro de app no Entra ID, entregando relatórios a usuários finais direto na aplicação. Em produção, atendendo cliente real.',
        },
        {
          name: 'HACKATHON-TJBA-2025',
          description: 'Solução full-stack desenvolvida no hackathon do TJBA 2025 para o Tribunal de Justiça da Bahia: backend em Java com Spring Boot e frontend em React.',
        },
        {
          name: 'Microsserviços com Eureka (Spring Boot)',
          description: 'Arquitetura de microsserviços usando Netflix Eureka para descoberta de serviços e Spring Boot, com serviços independentes se registrando e se encontrando em tempo de execução.',
        },
        {
          name: 'Neural Network From Scratch',
          description: 'Uma rede neural feita do zero em Python, sem frameworks de ML, só matemática e código para entender como o deep learning funciona por dentro.',
        },
        {
          name: 'PacmanIA',
          description: 'Um agente inteligente que joga Pac-Man usando algoritmos de pathfinding com IA, desenvolvido inteiramente em Python.',
        },
        {
          name: 'TodoList CLI (Rust)',
          description: 'Um gerenciador de tarefas por linha de comando simples e sólido escrito em Rust. Rápido, minimalista e com segurança de memória.',
        },
        {
          name: 'Filtro de Usuários do Google Workspace',
          description: 'Ferramenta CLI para análise e filtragem de usuários do Google Workspace. Útil para administradores de TI em grandes organizações.',
        },
        {
          name: 'DiscordBotAi',
          description: 'Um bot do Discord com personalidade de IA, desenvolvido em Python. Responde a mensagens com conteúdo gerado por IA.',
        },
        {
          name: 'PDF para CSV',
          description: 'Um utilitário Python para extrair e converter dados de arquivos PDF em formato CSV estruturado.',
        },
        {
          name: 'flappyfox',
          description: 'Um clone do Flappy Bird escrito em Rust. Um exercício divertido de programação de sistemas com lógica de game loop.',
        },
      ],
    },
    contact: {
      label: 'contato',
      title: 'Vamos conversar',
      desc: 'Aberto a oportunidades, freelas ou só trocar uma ideia sobre tecnologia. E-mail é o melhor jeito.',
      emailLabel: 'E-mail',
      phoneLabel: 'Telefone',
      githubLabel: 'GitHub',
      linkedinLabel: 'LinkedIn',
      locationLabel: 'Localização',
      location: 'Salvador, Bahia, Brasil',
      cta: 'Enviar e-mail',
    },
    game: {
      label: 'só pra divertir',
      title: 'Mate o tempo',
      desc: 'Entediado rolando a página? Aqui tem um Space Invaders. Setas / WASD pra mover, Espaço pra atirar.',
      controls: 'Setas / WASD pra mover · Espaço pra atirar',
      play: 'Jogar',
      retry: 'Tentar de novo',
      playAgain: 'Jogar de novo',
      gameOver: 'Game Over',
      win: 'Você zerou!',
    },
    footer: {
      built: 'Desenhado & Desenvolvido por',
    },
  },
}
