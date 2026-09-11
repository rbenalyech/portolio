export const siteConfig = {
  name: 'Riyad Benalyech',
  title: 'Riyad Benalyech — Cybersecurity, Systems & Networks',
  description: 'IT student specializing in Cybersecurity, Systems Administration, Networks and Digital Consulting. Explore my projects, skills and technical journey.',
  url: 'https://rbenalyech.github.io',
  email: 'rbenalyech@gmail.com',
  phone: '+32 485 19 40 62',
  location: 'Brussels, Belgium',
  linkedin: 'https://linkedin.com/in/riyad-benalyech-155ba5369',
  github: 'https://github.com/rbenalyech',
  tagline: 'Cybersecurity · Systems · Networks · Digital',
  heroStatement: 'I secure, build and understand digital infrastructures.',
  heroSub: 'Applied Computer Science Student — Specializing in Cybersecurity, Systems Administration & Digital Consulting',
};

export const aboutData = {
  intro: "I don't just use technology — I want to understand how it works, how systems communicate, and how they can be secured.",
  description: "Third-year Applied Computer Science student at Odisee Brussels, I approach IT with curiosity and rigor. From designing virtualized enterprise infrastructures to analyzing security practices, I'm driven by the desire to understand every layer of the stack.",
  pillars: [
    {
      id: 'cybersecurity',
      title: 'Cybersecurity',
      icon: 'shield',
      description: 'Understanding security challenges, authentication mechanisms, hardening practices, and risk analysis.',
    },
    {
      id: 'systems',
      title: 'Systems',
      icon: 'server',
      description: 'Administering Windows Server, Active Directory environments, and managing enterprise system infrastructure.',
    },
    {
      id: 'networks',
      title: 'Networks',
      icon: 'network',
      description: 'Understanding how machines, services and infrastructures communicate — from DNS to iSCSI to VLANs.',
    },
    {
      id: 'digital',
      title: 'Digital Consulting',
      icon: 'consulting',
      description: 'Translating business needs into technical solutions. Analysis, strategy, and clear communication.',
    },
  ],
  languages: [
    { name: 'French', level: 'Native' },
    { name: 'Dutch', level: 'Advanced' },
    { name: 'English', level: 'Good working knowledge' },
  ],
};

export const skillsData = {
  categories: [
    {
      id: 'cybersecurity',
      title: 'Cybersecurity',
      icon: 'shield',
      color: '#00D1FF',
      skills: [
        'Access Security & Authentication',
        'Bearer Tokens & API Key Management',
        'Active Directory / DNS Hardening',
        'Risk Analysis Fundamentals',
        'Network Security Best Practices',
        'Secure Secret Handling',
      ],
    },
    {
      id: 'systems',
      title: 'Systems Administration',
      icon: 'server',
      color: '#0077FF',
      skills: [
        'Windows Server Administration',
        'Active Directory & Group Policies',
        'DNS Management',
        'Linux Fundamentals',
        'User & Permission Management',
        'First-Line IT Support',
      ],
    },
    {
      id: 'virtualization',
      title: 'Virtualization',
      icon: 'vm',
      color: '#00D1FF',
      skills: [
        'VMware ESXi & vCenter',
        'vMotion Live Migration',
        'iSCSI Shared Storage',
        'Virtual Machine Management',
        'Nested Virtualization',
        'Resource Allocation',
      ],
    },
    {
      id: 'networking',
      title: 'Networking',
      icon: 'network',
      color: '#0077FF',
      skills: [
        'Network Infrastructure',
        'DNS Configuration',
        'iSCSI Protocol',
        'IP Addressing & Subnetting',
        'VMkernel Networking',
        'Docker Networking',
      ],
    },
    {
      id: 'development',
      title: 'Development Notions',
      icon: 'code',
      color: '#00D1FF',
      skills: [
        'JavaScript & TypeScript (basics)',
        'React & Node.js',
        'REST API Integration',
        'SQL & Database Design',
        'Docker & Docker Compose',
        'Git & GitHub',
      ],
    },
    {
      id: 'consulting',
      title: 'Digital Consulting',
      icon: 'consulting',
      color: '#0077FF',
      skills: [
        'Business Needs Analysis',
        'SWOT / TOWS / DESTEP Analysis',
        'Business Model Canvas',
        'Technical Communication',
        'Competitive Analysis',
        'Solution Design',
      ],
    },
  ],
};

export const processSteps = [
  {
    id: 'understand',
    number: '01',
    title: 'Understand',
    description: 'Analyze the problem, define the scope, and understand the requirements before writing a single line.',
    icon: 'search',
  },
  {
    id: 'analyze',
    number: '02',
    title: 'Analyze',
    description: 'Study the environment, identify constraints, map dependencies, and evaluate the existing infrastructure.',
    icon: 'analyze',
  },
  {
    id: 'build',
    number: '03',
    title: 'Build',
    description: 'Design and implement the solution — whether it\'s an infrastructure, a system configuration, or an application.',
    icon: 'build',
  },
  {
    id: 'secure',
    number: '04',
    title: 'Secure',
    description: 'Identify risks, harden configurations, implement authentication, and verify that security best practices are followed.',
    icon: 'shield',
  },
  {
    id: 'improve',
    number: '05',
    title: 'Improve',
    description: 'Monitor, document, optimize. Every project is an opportunity to learn and refine the approach.',
    icon: 'improve',
  },
];

export interface Project {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  category: string;
  year: string;
  featured: boolean;
  teamProject: boolean;
  description: string;
  role: string;
  challenge: string;
  approach: string;
  technologies: string[];
  results: string;
  lessons: string;
  architecture?: ArchitectureNode[];
  githubUrl?: string;
}

export interface ArchitectureNode {
  id: string;
  label: string;
  type: 'host' | 'vm' | 'service' | 'network' | 'storage' | 'client';
  ip?: string;
  status?: string;
  details?: string;
}

export const projects: Project[] = [
  {
    id: 'vmware',
    number: '01',
    title: 'VMware vSphere Infrastructure',
    subtitle: 'Virtualized Enterprise Environment with Live Migration',
    category: 'Infrastructure / Virtualization',
    year: '2026',
    featured: true,
    teamProject: false,
    description: 'Design of a complete virtualized enterprise datacenter infrastructure with two nested ESXi hosts, vCenter Server, Active Directory domain, shared iSCSI storage, and live VM migration demonstration without service interruption.',
    role: 'Infrastructure architect and administrator — responsible for designing and configuring the virtualized environment, setting up shared storage (iSCSI), Active Directory domain, DNS, and demonstrating vMotion live migration.',
    challenge: 'Build a fully functional enterprise-grade virtual infrastructure on a single physical machine using nested virtualization, and demonstrate zero-downtime VM migration between hosts.',
    approach: 'Built the infrastructure layer by layer: first the domain controller with Active Directory and DNS, then the ESXi hosts, then shared iSCSI storage, and finally vCenter for central management. Each layer was validated before building the next.',
    technologies: ['VMware ESXi 6.7', 'vCenter Server (VCSA)', 'vMotion', 'Windows Server 2019', 'Active Directory', 'DNS', 'iSCSI Target Server', 'VMFS 6', 'VMware Workstation'],
    results: 'Successfully demonstrated live vMotion migration of a running VM from one host to another with zero downtime. Built the entire multi-layer infrastructure on a single PC using nested virtualization.',
    lessons: 'Dependency ordering matters: without working DNS, vCenter fails; without shared storage, vMotion is impossible. Systematic verification after every step is essential. Resource management in nested virtualization demands careful memory allocation.',
    architecture: [
      { id: 'dc', label: 'Domain Controller', type: 'vm', ip: '192.168.125.100', status: 'ONLINE', details: 'Windows Server 2019 — AD DS, DNS, iSCSI Target (240GB datastore)' },
      { id: 'esxi-usa', label: 'ESXi USA', type: 'host', ip: '192.168.125.150', status: 'ONLINE', details: 'Primary hypervisor — 8GB RAM, 4 vCPUs, hosts vCenter VM' },
      { id: 'esxi-bru', label: 'ESXi Brussels', type: 'host', ip: '192.168.125.200', status: 'ONLINE', details: 'Secondary host — Migration target, 4-6GB RAM' },
      { id: 'vcenter', label: 'vCenter Server', type: 'service', ip: '192.168.125.250', status: 'ONLINE', details: 'VCSA Tiny — Embedded PSC, Datacenter DC_Odisee' },
      { id: 'iscsi', label: 'Shared Storage', type: 'storage', status: 'ACTIVE', details: 'iSCSI VMFS 6 Datastore — 240GB VHDX, accessible by both hosts' },
      { id: 'network', label: 'Network', type: 'network', ip: '192.168.125.0/24', status: 'ACTIVE', details: 'VMkernel adapters with vMotion enabled on both hosts' },
    ],
  },
  {
    id: 'mirrorhire',
    number: '02',
    title: 'MirrorHire',
    subtitle: 'AI-Powered Job Interview Simulator',
    category: 'AI / Web Application',
    year: '2026',
    featured: false,
    teamProject: false,
    description: 'A web application enabling users to practice job interviews with an AI recruiter, featuring automated scoring across 4 axes (communication, expertise, motivation, stress management) and a trilingual interface.',
    role: 'Sole developer — designed and built the full application from concept to deployment.',
    challenge: 'Create a realistic interview simulation experience using AI that provides meaningful, actionable feedback to help users prepare for real interviews.',
    approach: 'Built a Node.js/Express backend that proxies requests to the Groq API (LLaMA 3.3 70B). The AI generates contextual interview questions based on the selected company and role, then scores the candidate across multiple dimensions.',
    technologies: ['Node.js', 'Express.js', 'Groq API', 'LLaMA 3.3 70B', 'REST API', 'HTML/CSS/JS'],
    results: 'Fully functional interview simulator with multi-language support (FR/EN/NL), light/dark theme, and detailed AI-generated scoring with personalized feedback.',
    lessons: 'Learned prompt engineering techniques for controlling AI behavior, API integration patterns, and how to design conversational AI experiences that feel natural.',
  },
  {
    id: 'pingfin',
    number: '03',
    title: 'PingFin Bankius',
    subtitle: 'Interbank Payment Processing Platform',
    category: 'Team Project / Full-Stack',
    year: '2026',
    featured: false,
    teamProject: true,
    description: 'A collaborative team project simulating a complete interbank payment system. Each team operated its own bank, communicating through a shared clearing bank to process IBAN-based transactions.',
    role: 'Team member — contributed to the project across various aspects, gaining hands-on experience with application architecture, database design, and team collaboration in a technical environment.',
    challenge: 'Build a functional banking simulation that handles inter-bank payment flows (Originating Bank → Clearing Bank → Beneficiary Bank) with proper transaction management.',
    approach: 'Worked as part of a team using an agile-like methodology with daily deliverables. The application uses a layered backend architecture (Repository/Services pattern) with a React dashboard for monitoring transactions.',
    technologies: ['React', 'Vite', 'Node.js', 'Express.js', 'MySQL', 'Docker Compose', 'REST API'],
    results: 'Successfully implemented a working interbank payment system with IBAN-based account management, inbound/outbound payment processing, and clearing bank integration via BIC codes.',
    lessons: 'Gained a deep understanding of application architecture, teamwork in a technical context, and how backend systems handle financial transaction flows. This experience strengthened my ability to work with development teams and understand application logic.',
  },
];

export const labData = {
  title: 'My Lab',
  description: 'A space where I experiment, learn, and build. These are the environments and tools I work with.',
  categories: [
    {
      id: 'systems',
      title: 'Systems',
      icon: 'server',
      items: ['Windows Server 2019', 'Active Directory', 'DNS Server', 'Linux (Ubuntu)'],
    },
    {
      id: 'virtualization',
      title: 'Virtualization',
      icon: 'vm',
      items: ['VMware ESXi', 'VMware vCenter', 'VMware Workstation', 'Nested Virtualization'],
    },
    {
      id: 'networking',
      title: 'Networking',
      icon: 'network',
      items: ['iSCSI Storage', 'DNS Configuration', 'VMkernel Adapters', 'Docker Networks'],
    },
    {
      id: 'security',
      title: 'Security',
      icon: 'shield',
      items: ['AD Hardening', 'API Key Management', 'Bearer Token Auth', 'Network Security'],
    },
    {
      id: 'devtools',
      title: 'Dev & Tools',
      icon: 'code',
      items: ['Docker / Docker Compose', 'Git / GitHub', 'VS Code', 'Command Line'],
    },
  ],
  stats: [
    { label: 'Technologies', value: '20+' },
    { label: 'Projects', value: '03' },
    { label: 'Domains', value: '05' },
    { label: 'Languages', value: '03' },
  ],
};

export const timelineData = [
  {
    year: '2017',
    title: 'Secondary Education — IT Track',
    institution: 'Institut Regina Pacis, Laeken',
    description: 'Started my IT journey with a specialized computer science track.',
    type: 'education' as const,
  },
  {
    year: '2022',
    title: 'First Professional Experience',
    institution: 'Colruyt, Laeken',
    description: 'Sales assistant — customer service, inventory management.',
    type: 'experience' as const,
  },
  {
    year: '2024 Jan',
    title: 'IT Internship',
    institution: 'Wemmel Town Hall',
    description: 'First-line IT support, workstation setup, user assistance, ticket management.',
    type: 'experience' as const,
  },
  {
    year: '2024 Sep',
    title: 'Bachelor in Applied Computer Science',
    institution: 'Odisee, Brussels',
    description: 'Specializations: Cybersecurity, Digital Consulting, Systems Administration.',
    type: 'education' as const,
  },
  {
    year: '2025',
    title: 'Belgian Senate',
    institution: 'ISS — Belgian Senate',
    description: 'Teamwork in a demanding institutional environment.',
    type: 'experience' as const,
  },
  {
    year: '2026',
    title: 'Academic Projects',
    institution: 'Odisee, Brussels',
    description: 'Built VMware vSphere Infrastructure, MirrorHire, and contributed to PingFin Bankius.',
    type: 'project' as const,
  },
  {
    year: '2026',
    title: 'bpost Collect',
    institution: 'bpost, Vilvoorde',
    description: 'Parcel collection along fixed routes — deadlines, logistics, fast-paced work.',
    type: 'experience' as const,
  },
  {
    year: '2027',
    title: 'Looking for Internship',
    institution: 'February — May 2027',
    description: 'Seeking an internship in Cybersecurity, Systems, Networks or IT Infrastructure.',
    type: 'goal' as const,
  },
];

export const navItems = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Lab', href: '#lab' },
  { label: 'Journey', href: '#journey' },
  { label: 'Contact', href: '#contact' },
];
