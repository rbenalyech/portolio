export type Language = 'en' | 'fr' | 'nl';

export interface Translations {
  nav: {
    home: string;
    about: string;
    skills: string;
    projects: string;
    lab: string;
    journey: string;
    contact: string;
    online: string;
  };
  hero: {
    portfolioYear: string;
    tags: string[];
    statement: string;
    sub: string;
    explore: string;
    viewProjects: string;
  };
  about: {
    sectionLabel: string;
    headingTop: string;
    headingHighlight: string;
    intro: string;
    description: string;
    pillars: {
      cybersecurity: { title: string; description: string; skills: string[] };
      systems: { title: string; description: string; skills: string[] };
      networks: { title: string; description: string; skills: string[] };
      digital: { title: string; description: string; skills: string[] };
    };
    languagesLabel: string;
    languageLevels: { french: string; dutch: string; english: string };
  };
  skills: {
    sectionLabel: string;
    heading: string;
    headingHighlight: string;
    description: string;
    sysLabel: string;
    categories: {
      cybersecurity: string;
      systems: string;
      virtualization: string;
      networking: string;
      development: string;
      consulting: string;
    };
    skills: {
      cybersecurity: string[];
      systems: string[];
      virtualization: string[];
      networking: string[];
      development: string[];
      consulting: string[];
    };
  };
  methodology: {
    sectionLabel: string;
    heading: string;
    headingHighlight: string;
    description: string;
    steps: { title: string; description: string }[];
  };
  projects: {
    sectionLabel: string;
    heading: string;
    headingHighlight: string;
    description: string;
    featured: string;
    team: string;
    explore: string;
    allOnline: string;
    theChallenge: string;
    theApproach: string;
    myRole: string;
    technologies: string;
    results: string;
    whatILearned: string;
    viewGithub: string;
    soloProject: string;
    items: {
      vmware: {
        title: string;
        subtitle: string;
        category: string;
        description: string;
        role: string;
        challenge: string;
        approach: string;
        results: string;
        lessons: string;
      };
      mirrorhire: {
        title: string;
        subtitle: string;
        category: string;
        description: string;
        role: string;
        challenge: string;
        approach: string;
        results: string;
        lessons: string;
      };
      pingfin: {
        title: string;
        subtitle: string;
        category: string;
        description: string;
        role: string;
        challenge: string;
        approach: string;
        results: string;
        lessons: string;
        teamDisclaimer: string;
      };
    };
    archNodes: {
      dc: { label: string; details: string };
      esxiUsa: { label: string; details: string };
      esxiBru: { label: string; details: string };
      vcenter: { label: string; details: string };
      iscsi: { label: string; details: string };
      network: { label: string; details: string };
    };
  };
  lab: {
    sectionLabel: string;
    heading: string;
    headingHighlight: string;
    description: string;
    sysLabel: string;
    operational: string;
    lastUpdate: string;
    statLabels: { technologies: string; projects: string; domains: string; languages: string };
    categories: {
      systems: string;
      virtualization: string;
      networking: string;
      security: string;
      devtools: string;
    };
  };
  timeline: {
    sectionLabel: string;
    heading: string;
    headingHighlight: string;
    description: string;
    types: { education: string; experience: string; project: string; goal: string };
    items: {
      year: string;
      title: string;
      institution: string;
      description: string;
      type: 'education' | 'experience' | 'project' | 'goal';
    }[];
  };
  opportunity: {
    sectionLabel: string;
    headingTop: string;
    headingHighlight: string;
    description: string;
    interests: string[];
    cta: string;
  };
  contact: {
    sectionLabel: string;
    heading: string[];
    description: string;
    labels: { email: string; linkedin: string; github: string; cv: string };
    cvValue: string;
    cta: string;
    ctaCopied: string;
  };
  networkMap: {
    nodes: Record<string, { label: string; description: string; details: string[] }>;
  };
  terminal: {
    welcome: string;
    helpHint: string;
  };
  loader: {
    initializing: string;
  };
}

export const translations: Record<Language, Translations> = {
  en: {
    nav: {
      home: 'Home',
      about: 'About',
      skills: 'Skills',
      projects: 'Projects',
      lab: 'Lab',
      journey: 'Journey',
      contact: 'Contact',
      online: 'Online',
    },
    hero: {
      portfolioYear: 'PORTFOLIO // 2026',
      tags: ['Cybersecurity', 'Systems', 'Networks', 'Digital'],
      statement: 'I secure, build and understand digital infrastructures.',
      sub: 'Applied Computer Science Student — Specializing in Cybersecurity, Systems Administration & Digital Consulting',
      explore: 'Explore',
      viewProjects: 'View Projects',
    },
    about: {
      sectionLabel: 'About',
      headingTop: 'Understanding technology,',
      headingHighlight: 'not just using it.',
      intro: "I don't just use technology — I want to understand how it works, how systems communicate, and how they can be secured.",
      description: "Third-year Applied Computer Science student at Odisee Brussels, I approach IT with curiosity and rigor. From designing virtualized enterprise infrastructures to analyzing security practices, I'm driven by the desire to understand every layer of the stack.",
      pillars: {
        cybersecurity: {
          title: 'Cybersecurity',
          description: 'Understanding security challenges, authentication mechanisms, hardening practices, and risk analysis.',
          skills: ['Firewall', 'IDS/IPS', 'Hardening', 'Risk Analysis'],
        },
        systems: {
          title: 'Systems',
          description: 'Administering Windows Server, Active Directory environments, and managing enterprise system infrastructure.',
          skills: ['Windows Server', 'Active Directory', 'GPO', 'PowerShell'],
        },
        networks: {
          title: 'Networks',
          description: 'Understanding how machines, services and infrastructures communicate — from DNS to iSCSI to VLANs.',
          skills: ['DNS', 'DHCP', 'VLAN', 'TCP/IP'],
        },
        digital: {
          title: 'Digital Consulting',
          description: 'Translating business needs into technical solutions. Analysis, strategy, and clear communication.',
          skills: ['Analysis', 'Strategy', 'Communication', 'Solutions'],
        },
      },
      languagesLabel: 'Languages',
      languageLevels: { french: 'Native', dutch: 'Advanced', english: 'Good working knowledge' },
    },
    skills: {
      sectionLabel: 'Skills',
      heading: 'Technical ',
      headingHighlight: 'Control Panel',
      description: "An overview of my technical domains and the skills I'm developing across different areas of IT.",
      sysLabel: 'SKILLS_PANEL.SYS',
      categories: {
        cybersecurity: 'Cybersecurity',
        systems: 'Systems Administration',
        virtualization: 'Virtualization',
        networking: 'Networking',
        development: 'Development Notions',
        consulting: 'Digital Consulting',
      },
      skills: {
        cybersecurity: ['Access Security & Authentication', 'Bearer Tokens & API Key Management', 'Active Directory / DNS Hardening', 'Risk Analysis Fundamentals', 'Network Security Best Practices', 'Secure Secret Handling'],
        systems: ['Windows Server Administration', 'Active Directory & Group Policies', 'DNS Management', 'Linux Fundamentals', 'User & Permission Management', 'First-Line IT Support'],
        virtualization: ['VMware ESXi & vCenter', 'vMotion Live Migration', 'iSCSI Shared Storage', 'Virtual Machine Management', 'Nested Virtualization', 'Resource Allocation'],
        networking: ['Network Infrastructure', 'DNS Configuration', 'iSCSI Protocol', 'IP Addressing & Subnetting', 'VMkernel Networking', 'Docker Networking'],
        development: ['JavaScript & TypeScript (basics)', 'React & Node.js', 'REST API Integration', 'SQL & Database Design', 'Docker & Docker Compose', 'Git & GitHub'],
        consulting: ['Business Needs Analysis', 'SWOT / TOWS / DESTEP Analysis', 'Business Model Canvas', 'Technical Communication', 'Competitive Analysis', 'Solution Design'],
      },
    },
    methodology: {
      sectionLabel: 'Methodology',
      heading: 'How I ',
      headingHighlight: 'approach problems',
      description: 'Every project follows a structured thinking process — from understanding the challenge to delivering a secure, optimized solution.',
      steps: [
        { title: 'Understand', description: 'Analyze the problem, define the scope, and understand the requirements before writing a single line.' },
        { title: 'Analyze', description: 'Study the environment, identify constraints, map dependencies, and evaluate the existing infrastructure.' },
        { title: 'Build', description: "Design and implement the solution — whether it's an infrastructure, a system configuration, or an application." },
        { title: 'Secure', description: 'Identify risks, harden configurations, implement authentication, and verify that security best practices are followed.' },
        { title: 'Improve', description: 'Monitor, document, optimize. Every project is an opportunity to learn and refine the approach.' },
      ],
    },
    projects: {
      sectionLabel: 'Projects',
      heading: "What I've ",
      headingHighlight: 'built',
      description: 'Real projects that demonstrate my technical thinking — from virtualized enterprise infrastructure to AI-powered applications and collaborative team work.',
      featured: 'Featured Project',
      team: 'Team Project',
      explore: 'Explore',
      allOnline: 'All Systems Online',
      theChallenge: 'THE CHALLENGE',
      theApproach: 'THE APPROACH',
      myRole: 'MY ROLE',
      technologies: 'Technologies',
      results: 'RESULTS',
      whatILearned: 'WHAT I LEARNED',
      viewGithub: 'View on GitHub',
      soloProject: 'Solo Project',
      items: {
        vmware: {
          title: 'VMware vSphere Infrastructure',
          subtitle: 'Virtualized Enterprise Environment with Live Migration',
          category: 'Infrastructure / Virtualization',
          description: 'Design of a complete virtualized enterprise datacenter infrastructure with two nested ESXi hosts, vCenter Server, Active Directory domain, shared iSCSI storage, and live VM migration demonstration without service interruption.',
          role: 'Sole infrastructure architect and administrator — responsible for designing and configuring the entire virtualized environment, setting up shared storage (iSCSI), Active Directory domain, DNS, and demonstrating vMotion live migration.',
          challenge: 'Build a fully functional enterprise-grade virtual infrastructure on a single physical machine using nested virtualization, and demonstrate zero-downtime VM migration between hosts.',
          approach: 'Built the infrastructure layer by layer: first the domain controller with Active Directory and DNS, then the ESXi hosts, then shared iSCSI storage, and finally vCenter for central management. Each layer was validated before building the next.',
          results: 'Successfully demonstrated live vMotion migration of a running VM from one host to another with zero downtime. Built the entire multi-layer infrastructure on a single PC using nested virtualization.',
          lessons: 'Dependency ordering matters: without working DNS, vCenter fails; without shared storage, vMotion is impossible. Systematic verification after every step is essential. Resource management in nested virtualization demands careful memory allocation.',
        },
        mirrorhire: {
          title: 'MirrorHire',
          subtitle: 'AI-Powered Job Interview Simulator',
          category: 'AI / Web Application',
          description: 'A web application enabling users to practice job interviews with an AI recruiter, featuring automated scoring across 4 axes (communication, expertise, motivation, stress management) and a trilingual interface.',
          role: 'Sole developer — designed and built the full application from concept to deployment.',
          challenge: 'Create a realistic interview simulation experience using AI that provides meaningful, actionable feedback to help users prepare for real interviews.',
          approach: 'Built a Node.js/Express backend that proxies requests to the Groq API (LLaMA 3.3 70B). The AI generates contextual interview questions based on the selected company and role, then scores the candidate across multiple dimensions.',
          results: 'Fully functional interview simulator with multi-language support (FR/EN/NL), light/dark theme, and detailed AI-generated scoring with personalized feedback.',
          lessons: 'Learned prompt engineering techniques for controlling AI behavior, API integration patterns, and how to design conversational AI experiences that feel natural.',
        },
        pingfin: {
          title: 'PingFin Bankius',
          subtitle: 'Interbank Payment Processing Platform',
          category: 'Team Project / Full-Stack',
          description: 'A collaborative team project simulating a complete interbank payment system. Each team operated its own bank, communicating through a shared clearing bank to process IBAN-based transactions.',
          role: 'Team member — contributed to the project across various aspects, gaining hands-on experience with application architecture, database design, and team collaboration in a technical environment.',
          challenge: 'Build a functional banking simulation that handles inter-bank payment flows (Originating Bank → Clearing Bank → Beneficiary Bank) with proper transaction management.',
          approach: 'Worked as part of a team using an agile-like methodology with daily deliverables. The application uses a layered backend architecture (Repository/Services pattern) with a React dashboard for monitoring transactions.',
          results: 'Successfully implemented a working interbank payment system with IBAN-based account management, inbound/outbound payment processing, and clearing bank integration via BIC codes.',
          lessons: 'Gained a deep understanding of application architecture, teamwork in a technical context, and how backend systems handle financial transaction flows. This experience strengthened my ability to work with development teams and understand application logic.',
          teamDisclaimer: 'This was a collaborative team project where each team operated its own bank instance. My contribution spanned multiple aspects of the project, giving me hands-on experience with application architecture, database design, and working within a development team. While my core focus remains in systems and infrastructure, this experience strengthened my understanding of how applications are built and how teams collaborate on technical projects.',
        },
      },
      archNodes: {
        dc: { label: 'Domain Controller', details: 'Windows Server 2019 — AD DS, DNS, iSCSI Target (240GB datastore)' },
        esxiUsa: { label: 'ESXi USA', details: 'Primary hypervisor — 8GB RAM, 4 vCPUs, hosts vCenter VM' },
        esxiBru: { label: 'ESXi Brussels', details: 'Secondary host — Migration target, 4-6GB RAM' },
        vcenter: { label: 'vCenter Server', details: 'VCSA Tiny — Embedded PSC, Datacenter DC_Odisee' },
        iscsi: { label: 'Shared Storage', details: 'iSCSI VMFS 6 Datastore — 240GB VHDX, accessible by both hosts' },
        network: { label: 'Network', details: 'VMkernel adapters with vMotion enabled on both hosts' },
      },
    },
    lab: {
      sectionLabel: 'My Lab',
      heading: 'Technical ',
      headingHighlight: 'Environment',
      description: 'A space where I experiment, learn, and build. These are the environments and tools I work with.',
      sysLabel: 'LAB_DASHBOARD.SYS',
      operational: 'Operational',
      lastUpdate: 'LAST UPDATE: 2026',
      statLabels: { technologies: 'Technologies', projects: 'Projects', domains: 'Domains', languages: 'Languages' },
      categories: {
        systems: 'Systems',
        virtualization: 'Virtualization',
        networking: 'Networking',
        security: 'Security',
        devtools: 'Dev & Tools',
      },
    },
    timeline: {
      sectionLabel: 'Journey',
      heading: 'My ',
      headingHighlight: 'path so far',
      description: 'From secondary IT education to building enterprise infrastructure — each step has been about learning, experimenting, and growing.',
      types: { education: 'education', experience: 'experience', project: 'project', goal: 'goal' },
      items: [
        {
          year: '2017',
          title: 'Secondary Education — IT Track',
          institution: 'Institut Regina Pacis, Laeken',
          description: 'Started my IT journey with a specialized computer science track, building foundational knowledge in hardware, software, and networking.',
          type: 'education',
        },
        {
          year: '2024 Jan',
          title: 'IT Internship',
          institution: 'Wemmel Town Hall',
          description: 'First-line IT support in a real professional environment — workstation setup, user assistance, Active Directory management, and ticket handling.',
          type: 'experience',
        },
        {
          year: '2024 Sep',
          title: 'Bachelor in Applied Computer Science',
          institution: 'Odisee, Brussels',
          description: 'Specializations in Cybersecurity, Digital Consulting, and Systems Administration. Building enterprise-grade projects and deepening technical expertise.',
          type: 'education',
        },
        {
          year: '2027',
          title: 'Your Next Chapter?',
          institution: 'February — May 2027',
          description: "I'm looking for an internship where I can bring my skills in cybersecurity, systems and networks to a team that values curiosity and growth. Could your organization be the next step in my journey?",
          type: 'goal',
        },
      ],
    },
    opportunity: {
      sectionLabel: 'Opportunity',
      headingTop: 'Looking for an',
      headingHighlight: 'internship opportunity',
      description: "I'm currently seeking a February—May 2027 internship where I can apply my knowledge in cybersecurity, systems administration, networking and digital consulting while continuing to develop my technical skills within an IT team.",
      interests: ['Cybersecurity', 'Systems Administration', 'Network Engineering', 'IT Infrastructure', 'Digital Consulting'],
      cta: "Let's Talk",
    },
    contact: {
      sectionLabel: 'Contact',
      heading: ['Have a project,', 'an opportunity,', 'or just want to talk?'],
      description: "I'm always open to discussing new opportunities, interesting projects, or just having a conversation about technology. Feel free to reach out.",
      labels: { email: 'Email', linkedin: 'LinkedIn', github: 'GitHub', cv: 'CV' },
      cvValue: 'Download Resume',
      cta: 'Copy Email',
      ctaCopied: 'Copied!',
    },
    networkMap: {
      nodes: {
        internet: { label: 'INTERNET', description: 'External network traffic', details: ['Inbound: 1.2 Gbps', 'Outbound: 800 Mbps', 'Latency: 12ms'] },
        firewall: { label: 'FIREWALL', description: 'pfSense — Network Security', details: ['Rules: 47 active', 'NAT: configured', 'VPN: 2 tunnels', 'IDS/IPS: Snort'] },
        webserver: { label: 'WEB SERVER', description: 'Nginx — Reverse Proxy', details: ['Active conns: 234', 'SSL: Let\'s Encrypt', 'Load: 23%'] },
        vpn: { label: 'VPN GATEWAY', description: 'OpenVPN / WireGuard', details: ['Clients: 3 connected', 'Encryption: AES-256', 'Protocol: UDP/1194'] },
        database: { label: 'DATABASE', description: 'PostgreSQL — Data Store', details: ['Size: 2.4 GB', 'Queries/s: 145', 'Uptime: 99.97%'] },
        client: { label: 'CLIENT', description: 'Windows 11 Workstation', details: ['Status: Connected', 'IP: 10.0.1.50', 'Latency: 3ms'] },
        dns: { label: 'DNS RESOLVER', description: 'BIND9 — Name Resolution', details: ['Zones: 12', 'Cache hit: 94%', 'Queries/s: 890'] },
      },
    },
    terminal: {
      welcome: 'Welcome to RB Terminal v1.0',
      helpHint: 'Type "help" for available commands.',
    },
    loader: {
      initializing: 'INITIALIZING...',
    },
  },

  fr: {
    nav: {
      home: 'Accueil',
      about: 'À propos',
      skills: 'Compétences',
      projects: 'Projets',
      lab: 'Labo',
      journey: 'Parcours',
      contact: 'Contact',
      online: 'En ligne',
    },
    hero: {
      portfolioYear: 'PORTFOLIO // 2026',
      tags: ['Cybersécurité', 'Systèmes', 'Réseaux', 'Digital'],
      statement: 'Je sécurise, construis et comprends les infrastructures numériques.',
      sub: "Étudiant en Informatique Appliquée — Spécialisé en Cybersécurité, Administration Systèmes & Consulting Digital",
      explore: 'Explorer',
      viewProjects: 'Voir les projets',
    },
    about: {
      sectionLabel: 'À propos',
      headingTop: 'Comprendre la technologie,',
      headingHighlight: "pas seulement l'utiliser.",
      intro: "Je ne me contente pas d'utiliser la technologie — je veux comprendre comment elle fonctionne, comment les systèmes communiquent, et comment ils peuvent être sécurisés.",
      description: "Étudiant en troisième année d'Informatique Appliquée à Odisee Bruxelles, j'aborde l'IT avec curiosité et rigueur. De la conception d'infrastructures virtualisées d'entreprise à l'analyse des pratiques de sécurité, je suis motivé par le désir de comprendre chaque couche du stack.",
      pillars: {
        cybersecurity: {
          title: 'Cybersécurité',
          description: "Comprendre les défis de sécurité, les mécanismes d'authentification, les pratiques de durcissement et l'analyse des risques.",
          skills: ['Firewall', 'IDS/IPS', 'Durcissement', 'Analyse risques'],
        },
        systems: {
          title: 'Systèmes',
          description: "Administrer Windows Server, les environnements Active Directory et gérer l'infrastructure système d'entreprise.",
          skills: ['Windows Server', 'Active Directory', 'GPO', 'PowerShell'],
        },
        networks: {
          title: 'Réseaux',
          description: 'Comprendre comment les machines, services et infrastructures communiquent — du DNS à iSCSI en passant par les VLANs.',
          skills: ['DNS', 'DHCP', 'VLAN', 'TCP/IP'],
        },
        digital: {
          title: 'Consulting Digital',
          description: 'Traduire les besoins métiers en solutions techniques. Analyse, stratégie et communication claire.',
          skills: ['Analyse', 'Stratégie', 'Communication', 'Solutions'],
        },
      },
      languagesLabel: 'Langues',
      languageLevels: { french: 'Langue maternelle', dutch: 'Avancé', english: 'Bonne maîtrise' },
    },
    skills: {
      sectionLabel: 'Compétences',
      heading: 'Panneau de ',
      headingHighlight: 'Contrôle Technique',
      description: "Un aperçu de mes domaines techniques et des compétences que je développe dans différents domaines de l'IT.",
      sysLabel: 'SKILLS_PANEL.SYS',
      categories: {
        cybersecurity: 'Cybersécurité',
        systems: 'Administration Systèmes',
        virtualization: 'Virtualisation',
        networking: 'Réseaux',
        development: 'Notions de Développement',
        consulting: 'Consulting Digital',
      },
      skills: {
        cybersecurity: ["Sécurité d'accès & Authentification", 'Gestion des Bearer Tokens & Clés API', 'Durcissement Active Directory / DNS', "Fondamentaux de l'analyse des risques", 'Bonnes pratiques de sécurité réseau', 'Gestion sécurisée des secrets'],
        systems: ['Administration Windows Server', 'Active Directory & Stratégies de groupe', 'Gestion DNS', 'Fondamentaux Linux', 'Gestion des utilisateurs & permissions', 'Support IT de première ligne'],
        virtualization: ['VMware ESXi & vCenter', 'Migration live vMotion', 'Stockage partagé iSCSI', 'Gestion des machines virtuelles', 'Virtualisation imbriquée', 'Allocation des ressources'],
        networking: ['Infrastructure réseau', 'Configuration DNS', 'Protocole iSCSI', 'Adressage IP & Sous-réseaux', 'Réseau VMkernel', 'Réseau Docker'],
        development: ['JavaScript & TypeScript (bases)', 'React & Node.js', 'Intégration API REST', 'SQL & Conception de bases de données', 'Docker & Docker Compose', 'Git & GitHub'],
        consulting: ['Analyse des besoins métiers', 'Analyse SWOT / TOWS / DESTEP', 'Business Model Canvas', 'Communication technique', 'Analyse concurrentielle', 'Conception de solutions'],
      },
    },
    methodology: {
      sectionLabel: 'Méthodologie',
      heading: 'Comment je ',
      headingHighlight: 'résous les problèmes',
      description: "Chaque projet suit un processus de réflexion structuré — de la compréhension du défi à la livraison d'une solution sécurisée et optimisée.",
      steps: [
        { title: 'Comprendre', description: "Analyser le problème, définir le périmètre et comprendre les exigences avant d'écrire une seule ligne." },
        { title: 'Analyser', description: "Étudier l'environnement, identifier les contraintes, cartographier les dépendances et évaluer l'infrastructure existante." },
        { title: 'Construire', description: "Concevoir et implémenter la solution — qu'il s'agisse d'une infrastructure, d'une configuration système ou d'une application." },
        { title: 'Sécuriser', description: "Identifier les risques, durcir les configurations, implémenter l'authentification et vérifier le respect des bonnes pratiques de sécurité." },
        { title: 'Améliorer', description: "Surveiller, documenter, optimiser. Chaque projet est une occasion d'apprendre et d'affiner l'approche." },
      ],
    },
    projects: {
      sectionLabel: 'Projets',
      heading: "Ce que j'ai ",
      headingHighlight: 'construit',
      description: "Des projets concrets qui démontrent ma réflexion technique — de l'infrastructure virtualisée d'entreprise aux applications alimentées par l'IA et au travail d'équipe.",
      featured: 'Projet Principal',
      team: 'Projet en Équipe',
      explore: 'Explorer',
      allOnline: 'Tous les systèmes en ligne',
      theChallenge: 'LE DÉFI',
      theApproach: "L'APPROCHE",
      myRole: 'MON RÔLE',
      technologies: 'Technologies',
      results: 'RÉSULTATS',
      whatILearned: "CE QUE J'AI APPRIS",
      viewGithub: 'Voir sur GitHub',
      soloProject: 'Projet Solo',
      items: {
        vmware: {
          title: 'Infrastructure VMware vSphere',
          subtitle: "Environnement d'entreprise virtualisé avec migration live",
          category: 'Infrastructure / Virtualisation',
          description: "Conception d'une infrastructure de datacenter d'entreprise virtualisée complète avec deux hôtes ESXi imbriqués, vCenter Server, domaine Active Directory, stockage partagé iSCSI et démonstration de migration live de VM sans interruption de service.",
          role: "Architecte et administrateur d'infrastructure unique — responsable de la conception et de la configuration de l'ensemble de l'environnement virtualisé, de la mise en place du stockage partagé (iSCSI), du domaine Active Directory, du DNS et de la démonstration de la migration live vMotion.",
          challenge: "Construire une infrastructure virtuelle entièrement fonctionnelle de niveau entreprise sur une seule machine physique en utilisant la virtualisation imbriquée, et démontrer la migration de VM sans temps d'arrêt entre les hôtes.",
          approach: "Construction de l'infrastructure couche par couche : d'abord le contrôleur de domaine avec Active Directory et DNS, puis les hôtes ESXi, puis le stockage partagé iSCSI, et enfin vCenter pour la gestion centralisée. Chaque couche a été validée avant de construire la suivante.",
          results: "Démonstration réussie de la migration live vMotion d'une VM en cours d'exécution d'un hôte à un autre sans temps d'arrêt. Construction de l'intégralité de l'infrastructure multi-couches sur un seul PC en utilisant la virtualisation imbriquée.",
          lessons: "L'ordre des dépendances compte : sans DNS fonctionnel, vCenter échoue ; sans stockage partagé, vMotion est impossible. La vérification systématique après chaque étape est essentielle. La gestion des ressources en virtualisation imbriquée exige une allocation mémoire soigneuse.",
        },
        mirrorhire: {
          title: 'MirrorHire',
          subtitle: "Simulateur d'entretien d'embauche propulsé par l'IA",
          category: 'IA / Application Web',
          description: "Une application web permettant aux utilisateurs de s'entraîner à des entretiens d'embauche avec un recruteur IA, avec une notation automatisée sur 4 axes (communication, expertise, motivation, gestion du stress) et une interface trilingue.",
          role: "Développeur unique — conception et construction de l'application complète du concept au déploiement.",
          challenge: "Créer une expérience de simulation d'entretien réaliste utilisant l'IA qui fournit des retours significatifs et actionnables pour aider les utilisateurs à se préparer aux vrais entretiens.",
          approach: "Construction d'un backend Node.js/Express qui relaie les requêtes vers l'API Groq (LLaMA 3.3 70B). L'IA génère des questions d'entretien contextuelles basées sur l'entreprise et le poste sélectionnés, puis note le candidat selon plusieurs dimensions.",
          results: "Simulateur d'entretien entièrement fonctionnel avec support multilingue (FR/EN/NL), thème clair/sombre et notation détaillée générée par l'IA avec retours personnalisés.",
          lessons: "Apprentissage des techniques de prompt engineering pour contrôler le comportement de l'IA, des patterns d'intégration d'API et de la conception d'expériences d'IA conversationnelle qui semblent naturelles.",
        },
        pingfin: {
          title: 'PingFin Bankius',
          subtitle: 'Plateforme de traitement de paiements interbancaires',
          category: 'Projet en Équipe / Full-Stack',
          description: "Un projet d'équipe collaboratif simulant un système complet de paiement interbancaire. Chaque équipe opérait sa propre banque, communiquant via une banque de compensation partagée pour traiter les transactions basées sur IBAN.",
          role: "Membre de l'équipe — contribution au projet sous divers aspects, acquisition d'une expérience pratique en architecture applicative, conception de bases de données et collaboration en équipe dans un environnement technique.",
          challenge: "Construire une simulation bancaire fonctionnelle gérant les flux de paiement interbancaires (Banque d'origine → Banque de compensation → Banque bénéficiaire) avec une gestion appropriée des transactions.",
          approach: "Travail en équipe utilisant une méthodologie de type agile avec des livrables quotidiens. L'application utilise une architecture backend en couches (pattern Repository/Services) avec un dashboard React pour le suivi des transactions.",
          results: "Implémentation réussie d'un système de paiement interbancaire fonctionnel avec gestion de comptes basée sur IBAN, traitement des paiements entrants/sortants et intégration de banque de compensation via codes BIC.",
          lessons: "Compréhension approfondie de l'architecture applicative, du travail d'équipe dans un contexte technique et de la gestion des flux de transactions financières par les systèmes backend. Cette expérience a renforcé ma capacité à travailler avec des équipes de développement et à comprendre la logique applicative.",
          teamDisclaimer: "Il s'agit d'un projet collaboratif en équipe où chaque équipe opérait sa propre instance bancaire. Ma contribution a couvert de multiples aspects du projet, me donnant une expérience pratique en architecture applicative, conception de bases de données et travail au sein d'une équipe de développement. Bien que mon focus principal reste les systèmes et l'infrastructure, cette expérience a renforcé ma compréhension de la façon dont les applications sont construites et comment les équipes collaborent sur des projets techniques.",
        },
      },
      archNodes: {
        dc: { label: 'Contrôleur de domaine', details: 'Windows Server 2019 — AD DS, DNS, Cible iSCSI (datastore 240Go)' },
        esxiUsa: { label: 'ESXi USA', details: 'Hyperviseur principal — 8Go RAM, 4 vCPUs, héberge la VM vCenter' },
        esxiBru: { label: 'ESXi Bruxelles', details: 'Hôte secondaire — Cible de migration, 4-6Go RAM' },
        vcenter: { label: 'vCenter Server', details: 'VCSA Tiny — PSC intégré, Datacenter DC_Odisee' },
        iscsi: { label: 'Stockage Partagé', details: 'Datastore iSCSI VMFS 6 — VHDX 240Go, accessible par les deux hôtes' },
        network: { label: 'Réseau', details: 'Adaptateurs VMkernel avec vMotion activé sur les deux hôtes' },
      },
    },
    lab: {
      sectionLabel: 'Mon Labo',
      heading: 'Environnement ',
      headingHighlight: 'Technique',
      description: "Un espace où j'expérimente, j'apprends et je construis. Voici les environnements et outils avec lesquels je travaille.",
      sysLabel: 'LAB_DASHBOARD.SYS',
      operational: 'Opérationnel',
      lastUpdate: 'DERNIÈRE MISE À JOUR : 2026',
      statLabels: { technologies: 'Technologies', projects: 'Projets', domains: 'Domaines', languages: 'Langues' },
      categories: {
        systems: 'Systèmes',
        virtualization: 'Virtualisation',
        networking: 'Réseaux',
        security: 'Sécurité',
        devtools: 'Dev & Outils',
      },
    },
    timeline: {
      sectionLabel: 'Parcours',
      heading: 'Mon ',
      headingHighlight: 'parcours',
      description: "De l'enseignement secondaire IT à la construction d'infrastructures d'entreprise — chaque étape a été une occasion d'apprendre, d'expérimenter et de grandir.",
      types: { education: 'formation', experience: 'expérience', project: 'projet', goal: 'objectif' },
      items: [
        {
          year: '2017',
          title: 'Enseignement secondaire — Filière IT',
          institution: 'Institut Regina Pacis, Laeken',
          description: "Début de mon parcours IT avec une filière spécialisée en informatique, construisant des connaissances fondamentales en matériel, logiciel et réseaux.",
          type: 'education',
        },
        {
          year: '2024 Jan',
          title: 'Stage IT',
          institution: 'Commune de Wemmel',
          description: "Support IT de première ligne dans un vrai environnement professionnel — configuration de postes de travail, assistance utilisateur, gestion Active Directory et traitement de tickets.",
          type: 'experience',
        },
        {
          year: '2024 Sep',
          title: 'Bachelier en Informatique Appliquée',
          institution: 'Odisee, Bruxelles',
          description: "Spécialisations en Cybersécurité, Consulting Digital et Administration Systèmes. Construction de projets de niveau entreprise et approfondissement de l'expertise technique.",
          type: 'education',
        },
        {
          year: '2027',
          title: 'Votre prochain chapitre ?',
          institution: 'Février — Mai 2027',
          description: "Je recherche un stage où je peux apporter mes compétences en cybersécurité, systèmes et réseaux à une équipe qui valorise la curiosité et la croissance. Votre organisation pourrait-elle être la prochaine étape de mon parcours ?",
          type: 'goal',
        },
      ],
    },
    opportunity: {
      sectionLabel: 'Opportunité',
      headingTop: "À la recherche d'une",
      headingHighlight: 'opportunité de stage',
      description: "Je suis actuellement à la recherche d'un stage de février à mai 2027 où je peux appliquer mes connaissances en cybersécurité, administration systèmes, réseaux et consulting digital tout en continuant à développer mes compétences techniques au sein d'une équipe IT.",
      interests: ['Cybersécurité', 'Administration Systèmes', 'Ingénierie Réseau', 'Infrastructure IT', 'Consulting Digital'],
      cta: 'Discutons',
    },
    contact: {
      sectionLabel: 'Contact',
      heading: ['Vous avez un projet,', 'une opportunité,', 'ou juste envie de discuter ?'],
      description: "Je suis toujours ouvert à discuter de nouvelles opportunités, de projets intéressants ou simplement d'avoir une conversation sur la technologie. N'hésitez pas à me contacter.",
      labels: { email: 'Email', linkedin: 'LinkedIn', github: 'GitHub', cv: 'CV' },
      cvValue: 'Télécharger le CV',
      cta: 'Copier l\'email',
      ctaCopied: 'Copié !',
    },
    networkMap: {
      nodes: {
        internet: { label: 'INTERNET', description: 'Trafic réseau externe', details: ['Entrant: 1.2 Gbps', 'Sortant: 800 Mbps', 'Latence: 12ms'] },
        firewall: { label: 'PARE-FEU', description: 'pfSense — Sécurité réseau', details: ['Règles: 47 actives', 'NAT: configuré', 'VPN: 2 tunnels', 'IDS/IPS: Snort'] },
        webserver: { label: 'SERVEUR WEB', description: 'Nginx — Proxy inverse', details: ['Connexions: 234', 'SSL: Let\'s Encrypt', 'Charge: 23%'] },
        vpn: { label: 'PASSERELLE VPN', description: 'OpenVPN / WireGuard', details: ['Clients: 3 connectés', 'Chiffrement: AES-256', 'Protocole: UDP/1194'] },
        database: { label: 'BASE DE DONNÉES', description: 'PostgreSQL — Stockage', details: ['Taille: 2.4 GB', 'Requêtes/s: 145', 'Uptime: 99.97%'] },
        client: { label: 'CLIENT', description: 'Poste Windows 11', details: ['Statut: Connecté', 'IP: 10.0.1.50', 'Latence: 3ms'] },
        dns: { label: 'RÉSOLVEUR DNS', description: 'BIND9 — Résolution de noms', details: ['Zones: 12', 'Cache hit: 94%', 'Requêtes/s: 890'] },
      },
    },
    terminal: {
      welcome: 'Bienvenue sur RB Terminal v1.0',
      helpHint: 'Tapez "help" pour les commandes disponibles.',
    },
    loader: {
      initializing: 'INITIALISATION...',
    },
  },

  nl: {
    nav: {
      home: 'Home',
      about: 'Over mij',
      skills: 'Vaardigheden',
      projects: 'Projecten',
      lab: 'Labo',
      journey: 'Traject',
      contact: 'Contact',
      online: 'Online',
    },
    hero: {
      portfolioYear: 'PORTFOLIO // 2026',
      tags: ['Cybersecurity', 'Systemen', 'Netwerken', 'Digitaal'],
      statement: 'Ik beveilig, bouw en begrijp digitale infrastructuren.',
      sub: 'Student Toegepaste Informatica — Gespecialiseerd in Cybersecurity, Systeembeheer & Digitale Consulting',
      explore: 'Ontdek',
      viewProjects: 'Bekijk projecten',
    },
    about: {
      sectionLabel: 'Over mij',
      headingTop: 'Technologie begrijpen,',
      headingHighlight: 'niet enkel gebruiken.',
      intro: 'Ik gebruik technologie niet alleen — ik wil begrijpen hoe het werkt, hoe systemen communiceren en hoe ze beveiligd kunnen worden.',
      description: 'Derdejaarsstudent Toegepaste Informatica aan Odisee Brussel, ik benader IT met nieuwsgierigheid en nauwkeurigheid. Van het ontwerpen van gevirtualiseerde bedrijfsinfrastructuren tot het analyseren van beveiligingspraktijken, ik word gedreven door het verlangen om elke laag van de stack te begrijpen.',
      pillars: {
        cybersecurity: {
          title: 'Cybersecurity',
          description: 'Beveiligingsuitdagingen begrijpen, authenticatiemechanismen, verhardingspraktijken en risicoanalyse.',
          skills: ['Firewall', 'IDS/IPS', 'Hardening', 'Risicoanalyse'],
        },
        systems: {
          title: 'Systemen',
          description: 'Windows Server beheren, Active Directory-omgevingen en enterprise systeeminfrastructuur onderhouden.',
          skills: ['Windows Server', 'Active Directory', 'GPO', 'PowerShell'],
        },
        networks: {
          title: 'Netwerken',
          description: 'Begrijpen hoe machines, diensten en infrastructuren communiceren — van DNS tot iSCSI tot VLANs.',
          skills: ['DNS', 'DHCP', 'VLAN', 'TCP/IP'],
        },
        digital: {
          title: 'Digitale Consulting',
          description: 'Bedrijfsbehoeften vertalen naar technische oplossingen. Analyse, strategie en heldere communicatie.',
          skills: ['Analyse', 'Strategie', 'Communicatie', 'Oplossingen'],
        },
      },
      languagesLabel: 'Talen',
      languageLevels: { french: 'Moedertaal', dutch: 'Gevorderd', english: 'Goede werkkennis' },
    },
    skills: {
      sectionLabel: 'Vaardigheden',
      heading: 'Technisch ',
      headingHighlight: 'Controlepaneel',
      description: 'Een overzicht van mijn technische domeinen en de vaardigheden die ik ontwikkel in verschillende IT-gebieden.',
      sysLabel: 'SKILLS_PANEL.SYS',
      categories: {
        cybersecurity: 'Cybersecurity',
        systems: 'Systeembeheer',
        virtualization: 'Virtualisatie',
        networking: 'Netwerken',
        development: 'Ontwikkelingsnoties',
        consulting: 'Digitale Consulting',
      },
      skills: {
        cybersecurity: ['Toegangsbeveiliging & Authenticatie', 'Bearer Tokens & API Key Beheer', 'Active Directory / DNS Verharding', 'Fundamenten van risicoanalyse', 'Best practices netwerkbeveiliging', 'Veilig geheimenbeheer'],
        systems: ['Windows Server Beheer', 'Active Directory & Groepsbeleid', 'DNS Beheer', 'Linux Fundamenten', 'Gebruikers- & Rechtenbeheer', 'Eerstelijns IT-ondersteuning'],
        virtualization: ['VMware ESXi & vCenter', 'vMotion Live Migratie', 'iSCSI Gedeelde Opslag', 'Beheer van virtuele machines', 'Geneste virtualisatie', 'Resourcetoewijzing'],
        networking: ['Netwerkinfrastructuur', 'DNS Configuratie', 'iSCSI Protocol', 'IP-adressering & Subnetting', 'VMkernel Netwerken', 'Docker Netwerken'],
        development: ['JavaScript & TypeScript (basis)', 'React & Node.js', 'REST API Integratie', 'SQL & Database-ontwerp', 'Docker & Docker Compose', 'Git & GitHub'],
        consulting: ['Bedrijfsbehoefteanalyse', 'SWOT / TOWS / DESTEP Analyse', 'Business Model Canvas', 'Technische Communicatie', 'Concurrentieanalyse', 'Oplossingsontwerp'],
      },
    },
    methodology: {
      sectionLabel: 'Methodologie',
      heading: 'Hoe ik problemen ',
      headingHighlight: 'aanpak',
      description: 'Elk project volgt een gestructureerd denkproces — van het begrijpen van de uitdaging tot het leveren van een beveiligde, geoptimaliseerde oplossing.',
      steps: [
        { title: 'Begrijpen', description: 'Het probleem analyseren, de scope definiëren en de vereisten begrijpen voordat er één lijn code geschreven wordt.' },
        { title: 'Analyseren', description: 'De omgeving bestuderen, beperkingen identificeren, afhankelijkheden in kaart brengen en de bestaande infrastructuur evalueren.' },
        { title: 'Bouwen', description: 'De oplossing ontwerpen en implementeren — of het nu een infrastructuur, een systeemconfiguratie of een applicatie is.' },
        { title: 'Beveiligen', description: "Risico's identificeren, configuraties verharden, authenticatie implementeren en controleren of beveiligingsbest practices worden gevolgd." },
        { title: 'Verbeteren', description: 'Monitoren, documenteren, optimaliseren. Elk project is een kans om te leren en de aanpak te verfijnen.' },
      ],
    },
    projects: {
      sectionLabel: 'Projecten',
      heading: 'Wat ik heb ',
      headingHighlight: 'gebouwd',
      description: 'Echte projecten die mijn technisch denken demonstreren — van gevirtualiseerde bedrijfsinfrastructuur tot AI-aangedreven applicaties en teamwerk.',
      featured: 'Uitgelicht Project',
      team: 'Teamproject',
      explore: 'Ontdek',
      allOnline: 'Alle systemen online',
      theChallenge: 'DE UITDAGING',
      theApproach: 'DE AANPAK',
      myRole: 'MIJN ROL',
      technologies: 'Technologieën',
      results: 'RESULTATEN',
      whatILearned: 'WAT IK HEB GELEERD',
      viewGithub: 'Bekijk op GitHub',
      soloProject: 'Soloproject',
      items: {
        vmware: {
          title: 'VMware vSphere Infrastructuur',
          subtitle: 'Gevirtualiseerde bedrijfsomgeving met live migratie',
          category: 'Infrastructuur / Virtualisatie',
          description: 'Ontwerp van een complete gevirtualiseerde datacenter-infrastructuur voor bedrijven met twee geneste ESXi-hosts, vCenter Server, Active Directory-domein, gedeelde iSCSI-opslag en demonstratie van live VM-migratie zonder serviceonderbreking.',
          role: 'Enige infrastructuurarchitect en beheerder — verantwoordelijk voor het ontwerpen en configureren van de volledige gevirtualiseerde omgeving, het opzetten van gedeelde opslag (iSCSI), Active Directory-domein, DNS en het demonstreren van vMotion live migratie.',
          challenge: 'Een volledig functionele enterprise-grade virtuele infrastructuur bouwen op één fysieke machine met geneste virtualisatie, en zero-downtime VM-migratie tussen hosts demonstreren.',
          approach: 'De infrastructuur laag voor laag opgebouwd: eerst de domeincontroller met Active Directory en DNS, dan de ESXi-hosts, vervolgens gedeelde iSCSI-opslag en ten slotte vCenter voor centraal beheer. Elke laag werd gevalideerd voordat de volgende werd gebouwd.',
          results: 'Succesvolle demonstratie van live vMotion-migratie van een draaiende VM van de ene host naar de andere zonder downtime. De volledige meerlagige infrastructuur gebouwd op één PC met geneste virtualisatie.',
          lessons: 'De volgorde van afhankelijkheden is belangrijk: zonder werkende DNS faalt vCenter; zonder gedeelde opslag is vMotion onmogelijk. Systematische verificatie na elke stap is essentieel. Resourcebeheer bij geneste virtualisatie vereist zorgvuldige geheugentoewijzing.',
        },
        mirrorhire: {
          title: 'MirrorHire',
          subtitle: 'AI-aangedreven sollicitatiegesprekssimulator',
          category: 'AI / Webapplicatie',
          description: 'Een webapplicatie waarmee gebruikers kunnen oefenen voor sollicitatiegesprekken met een AI-recruiter, met geautomatiseerde scoring op 4 assen (communicatie, expertise, motivatie, stressmanagement) en een drietalige interface.',
          role: 'Enige ontwikkelaar — ontwerp en bouw van de volledige applicatie van concept tot deployment.',
          challenge: 'Een realistische sollicitatiegesprekssimulatie creëren met AI die zinvolle, bruikbare feedback geeft om gebruikers voor te bereiden op echte gesprekken.',
          approach: 'Een Node.js/Express backend gebouwd die verzoeken doorstuurt naar de Groq API (LLaMA 3.3 70B). De AI genereert contextuele sollicitatievragen op basis van het geselecteerde bedrijf en de functie, en scoort vervolgens de kandidaat op meerdere dimensies.',
          results: 'Volledig functionele sollicitatiegesprekssimulator met meertalige ondersteuning (FR/EN/NL), licht/donker thema en gedetailleerde AI-gegenereerde scoring met gepersonaliseerde feedback.',
          lessons: 'Geleerde prompt engineering-technieken voor het beheersen van AI-gedrag, API-integratiepatronen en het ontwerpen van conversationele AI-ervaringen die natuurlijk aanvoelen.',
        },
        pingfin: {
          title: 'PingFin Bankius',
          subtitle: 'Interbancair betalingsverwerkingsplatform',
          category: 'Teamproject / Full-Stack',
          description: 'Een collaboratief teamproject dat een compleet interbancair betalingssysteem simuleert. Elk team beheerde zijn eigen bank en communiceerde via een gedeelde clearingbank om IBAN-gebaseerde transacties te verwerken.',
          role: 'Teamlid — bijgedragen aan het project op verschillende aspecten, met praktische ervaring in applicatiearchitectuur, database-ontwerp en samenwerking in een technische omgeving.',
          challenge: 'Een functionele banksimulatie bouwen die interbancaire betalingsstromen (Oorsprongsbank → Clearingbank → Begunstigdebank) afhandelt met correct transactiebeheer.',
          approach: 'Werkte als onderdeel van een team met een agile-achtige methodologie met dagelijkse deliverables. De applicatie gebruikt een gelaagde backend-architectuur (Repository/Services pattern) met een React-dashboard voor het monitoren van transacties.',
          results: 'Succesvolle implementatie van een werkend interbancair betalingssysteem met IBAN-gebaseerd accountbeheer, verwerking van inkomende/uitgaande betalingen en clearingbank-integratie via BIC-codes.',
          lessons: 'Diepgaand begrip verworven van applicatiearchitectuur, teamwerk in een technische context en hoe backend-systemen financiële transactiestromen afhandelen. Deze ervaring versterkte mijn vermogen om met ontwikkelteams te werken en applicatielogica te begrijpen.',
          teamDisclaimer: 'Dit was een collaboratief teamproject waarbij elk team zijn eigen bankinstantie beheerde. Mijn bijdrage omvatte meerdere aspecten van het project, waardoor ik praktische ervaring opdeed met applicatiearchitectuur, database-ontwerp en werken binnen een ontwikkelteam. Hoewel mijn kernfocus bij systemen en infrastructuur blijft, versterkte deze ervaring mijn begrip van hoe applicaties worden gebouwd en hoe teams samenwerken aan technische projecten.',
        },
      },
      archNodes: {
        dc: { label: 'Domeincontroller', details: 'Windows Server 2019 — AD DS, DNS, iSCSI Target (240GB datastore)' },
        esxiUsa: { label: 'ESXi USA', details: 'Primaire hypervisor — 8GB RAM, 4 vCPUs, host vCenter VM' },
        esxiBru: { label: 'ESXi Brussel', details: 'Secundaire host — Migratiedoel, 4-6GB RAM' },
        vcenter: { label: 'vCenter Server', details: 'VCSA Tiny — Embedded PSC, Datacenter DC_Odisee' },
        iscsi: { label: 'Gedeelde Opslag', details: 'iSCSI VMFS 6 Datastore — 240GB VHDX, toegankelijk door beide hosts' },
        network: { label: 'Netwerk', details: 'VMkernel adapters met vMotion ingeschakeld op beide hosts' },
      },
    },
    lab: {
      sectionLabel: 'Mijn Labo',
      heading: 'Technische ',
      headingHighlight: 'Omgeving',
      description: 'Een ruimte waar ik experimenteer, leer en bouw. Dit zijn de omgevingen en tools waarmee ik werk.',
      sysLabel: 'LAB_DASHBOARD.SYS',
      operational: 'Operationeel',
      lastUpdate: 'LAATSTE UPDATE: 2026',
      statLabels: { technologies: 'Technologieën', projects: 'Projecten', domains: 'Domeinen', languages: 'Talen' },
      categories: {
        systems: 'Systemen',
        virtualization: 'Virtualisatie',
        networking: 'Netwerken',
        security: 'Beveiliging',
        devtools: 'Dev & Tools',
      },
    },
    timeline: {
      sectionLabel: 'Traject',
      heading: 'Mijn ',
      headingHighlight: 'traject',
      description: 'Van secundair IT-onderwijs tot het bouwen van bedrijfsinfrastructuur — elke stap was een kans om te leren, te experimenteren en te groeien.',
      types: { education: 'opleiding', experience: 'ervaring', project: 'project', goal: 'doel' },
      items: [
        {
          year: '2017',
          title: 'Secundair onderwijs — IT-richting',
          institution: 'Institut Regina Pacis, Laken',
          description: 'Begin van mijn IT-traject met een gespecialiseerde informatica-richting, met opbouw van fundamentele kennis in hardware, software en netwerken.',
          type: 'education',
        },
        {
          year: '2024 Jan',
          title: 'IT-stage',
          institution: 'Gemeente Wemmel',
          description: 'Eerstelijns IT-ondersteuning in een echte professionele omgeving — werkstationinstallatie, gebruikersassistentie, Active Directory-beheer en ticketafhandeling.',
          type: 'experience',
        },
        {
          year: '2024 Sep',
          title: 'Bachelor Toegepaste Informatica',
          institution: 'Odisee, Brussel',
          description: 'Specialisaties in Cybersecurity, Digitale Consulting en Systeembeheer. Bouwen van enterprise-grade projecten en verdieping van technische expertise.',
          type: 'education',
        },
        {
          year: '2027',
          title: 'Uw volgend hoofdstuk?',
          institution: 'Februari — Mei 2027',
          description: 'Ik ben op zoek naar een stage waar ik mijn vaardigheden in cybersecurity, systemen en netwerken kan inbrengen bij een team dat nieuwsgierigheid en groei waardeert. Kan uw organisatie de volgende stap in mijn traject zijn?',
          type: 'goal',
        },
      ],
    },
    opportunity: {
      sectionLabel: 'Opportuniteit',
      headingTop: 'Op zoek naar een',
      headingHighlight: 'stage-opportuniteit',
      description: 'Ik ben momenteel op zoek naar een stage van februari tot mei 2027 waar ik mijn kennis in cybersecurity, systeembeheer, netwerken en digitale consulting kan toepassen terwijl ik mijn technische vaardigheden blijf ontwikkelen binnen een IT-team.',
      interests: ['Cybersecurity', 'Systeembeheer', 'Netwerktechniek', 'IT-infrastructuur', 'Digitale Consulting'],
      cta: 'Laten we praten',
    },
    contact: {
      sectionLabel: 'Contact',
      heading: ['Heeft u een project,', 'een opportuniteit,', 'of wilt u gewoon praten?'],
      description: 'Ik sta altijd open voor het bespreken van nieuwe mogelijkheden, interessante projecten of gewoon een gesprek over technologie. Neem gerust contact op.',
      labels: { email: 'Email', linkedin: 'LinkedIn', github: 'GitHub', cv: 'CV' },
      cvValue: 'CV Downloaden',
      cta: 'E-mail kopiëren',
      ctaCopied: 'Gekopieerd!',
    },
    networkMap: {
      nodes: {
        internet: { label: 'INTERNET', description: 'Extern netwerkverkeer', details: ['Inkomend: 1.2 Gbps', 'Uitgaand: 800 Mbps', 'Latentie: 12ms'] },
        firewall: { label: 'FIREWALL', description: 'pfSense — Netwerkbeveiliging', details: ['Regels: 47 actief', 'NAT: geconfigureerd', 'VPN: 2 tunnels', 'IDS/IPS: Snort'] },
        webserver: { label: 'WEBSERVER', description: 'Nginx — Reverse Proxy', details: ['Verbindingen: 234', 'SSL: Let\'s Encrypt', 'Belasting: 23%'] },
        vpn: { label: 'VPN GATEWAY', description: 'OpenVPN / WireGuard', details: ['Clients: 3 verbonden', 'Encryptie: AES-256', 'Protocol: UDP/1194'] },
        database: { label: 'DATABASE', description: 'PostgreSQL — Dataopslag', details: ['Grootte: 2.4 GB', 'Queries/s: 145', 'Uptime: 99.97%'] },
        client: { label: 'CLIENT', description: 'Windows 11 Werkstation', details: ['Status: Verbonden', 'IP: 10.0.1.50', 'Latentie: 3ms'] },
        dns: { label: 'DNS RESOLVER', description: 'BIND9 — Naamresolutie', details: ['Zones: 12', 'Cache hit: 94%', 'Queries/s: 890'] },
      },
    },
    terminal: {
      welcome: 'Welkom bij RB Terminal v1.0',
      helpHint: 'Typ "help" voor beschikbare commando\'s.',
    },
    loader: {
      initializing: 'INITIALISEREN...',
    },
  },
};
