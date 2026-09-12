'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { projects } from '@/data/portfolio';
import type { Project } from '@/data/portfolio';
import { useLanguage } from '@/i18n/LanguageContext';
import ScrollReveal from './ScrollReveal';
import VMwareArchitecture from './VMwareArchitecture';

const projectIds = ['vmware', 'mirrorhire', 'pingfin'] as const;

/* ── Demo Translations ── */
type Lang = 'en' | 'fr' | 'nl';
const demoT = {
  mirrorhire: {
    en: {
      title: 'AI Interview Simulation',
      desc: 'Experience how MirrorHire conducts AI-powered pre-screening interviews for IT positions.',
      subdesc: 'Type your answers freely — the AI adapts its questions based on your responses and keywords.',
      start: 'START INTERVIEW',
      placeholder: 'Type your answer...',
      live: 'LIVE',
      intro: "Welcome to MirrorHire's AI interview simulation. I'll be conducting a pre-screening interview for an IT Infrastructure & Cybersecurity position. Answer naturally — I'll adapt my questions based on your responses.\n\nLet's start: Tell me about your background and what drew you to IT.",
      followup: 'Good answer. Let me ask you something different —',
      endMsg: "Thank you for this thorough interview. You've demonstrated excellent breadth of knowledge across IT domains.",
      score: 'Final Assessment',
      categories: { tech: 'Technical Knowledge', problem: 'Problem Solving', comm: 'Communication', fit: 'Cultural Fit' },
      levels: { excellent: 'Excellent', strong: 'Strong', good: 'Good', average: 'Average', weak: 'Needs Work' },
      recommendation: 'Recommendation',
      proceed: 'PROCEED TO NEXT ROUND',
      strengths: 'Strengths',
      improvements: 'Areas for Improvement',
      knowledge: [
        { keys: ['experience','background','about you','yourself','tell me','who are','introduce','career'],
          q: 'Tell me about your background and experience.',
          a: "That's a solid background. I can see you have hands-on experience. Let me dig deeper — Can you describe a technical challenge you faced recently and how you resolved it?",
          suggestions: ["I once had to migrate a full AD domain with zero downtime", "I debugged a network outage affecting 200 users", "I automated server provisioning with Ansible"] },
        { keys: ['challenge','problem','difficult','issue','resolve','debug','troubleshoot','fix','solved'],
          q: 'Describe a technical challenge you resolved.',
          a: "Good problem-solving approach. Your methodology shows structured thinking. Now, what monitoring and alerting tools have you worked with in production?",
          suggestions: ["We used Zabbix and Grafana for infrastructure monitoring", "I set up ELK stack for centralized logging", "Prometheus with custom alerts for critical services"] },
        { keys: ['monitor','nagios','zabbix','grafana','prometheus','alert','observ','datadog','splunk','elk'],
          q: 'What monitoring tools do you use?',
          a: "Strong monitoring toolkit. Observability is critical in modern infrastructure. How do you approach incident response when a critical system goes down at 3 AM?",
          suggestions: ["Follow runbook, assess impact, communicate, restore, then RCA", "Triage severity, check monitoring dashboards, escalate if needed", "I prioritize service restoration before root cause analysis"] },
        { keys: ['incident','outage','down','3am','emergency','on-call','pager','sla','disaster','recovery'],
          q: 'How do you handle critical incidents?',
          a: "That's a mature incident response mindset — prioritizing service restoration before root cause analysis is key. What's your experience with virtualization technologies?",
          suggestions: ["I built a full VMware vSphere environment with vMotion", "Experience with Proxmox and KVM for lab environments", "Managed Hyper-V clusters with live migration"] },
        { keys: ['virtual','vmware','esxi','hyperv','hyper-v','proxmox','kvm','vmotion','vsphere','vcenter'],
          q: "What's your virtualization experience?",
          a: "Impressive virtualization knowledge. How do you manage networking — VLANs, firewalls, routing?",
          suggestions: ["I configured VLANs and inter-VLAN routing on Cisco switches", "Set up pfSense firewalls with VPN tunnels", "Managed network segmentation for PCI compliance"] },
        { keys: ['network','vlan','firewall','routing','switch','tcp','dns','dhcp','subnet','cisco','pfsense','osi'],
          q: 'Tell me about your networking skills.',
          a: "Solid networking fundamentals. What about cloud platforms — AWS, Azure, or GCP?",
          suggestions: ["Deployed infrastructure on AWS with EC2, S3, and VPCs", "Used Azure AD and Azure VMs for hybrid setups", "Managed GCP projects with Terraform"] },
        { keys: ['cloud','aws','azure','gcp','google cloud','ec2','s3','lambda','terraform','iaas'],
          q: "What's your cloud experience?",
          a: "Good cloud exposure. How do you approach automation and infrastructure as code?",
          suggestions: ["I use Ansible playbooks for configuration management", "Terraform for provisioning, GitHub Actions for CI/CD", "Bash and PowerShell scripts for routine automation"] },
        { keys: ['automat','ansible','puppet','chef','terraform','script','bash','powershell','iac','ci/cd','pipeline'],
          q: 'How do you approach automation?',
          a: "Automation is the backbone of modern IT. What security practices do you implement to protect infrastructure?",
          suggestions: ["Defense in depth with firewalls, IDS, and endpoint protection", "Regular vulnerability scanning and patch management", "Zero trust architecture with MFA and least privilege"] },
        { keys: ['secur','cyber','penetr','vuln','pentest','ids','ips','siem','hardening','patch','encrypt','zero trust'],
          q: 'What security practices do you follow?',
          a: "Security-first mindset — exactly what organizations need. Can you walk me through setting up a new server including hardening?",
          suggestions: ["Minimal install, disable unused services, configure firewall, apply CIS benchmarks", "Automate with Ansible: OS hardening, SSH keys, fail2ban, updates", "Follow company baseline, then harden per CIS/STIG guidelines"] },
        { keys: ['server','linux','windows server','setup','install','deploy','config','harden','provision'],
          q: 'How do you set up and harden a server?',
          a: "Thorough provisioning process. How do you handle backup and disaster recovery planning?",
          suggestions: ["3-2-1 backup rule with offsite and cloud copies", "Automated daily backups with monthly restore tests", "Veeam for VM backups with replication to DR site"] },
        { keys: ['backup','restore','replication','snapshot','failover','redundan','ha','high avail'],
          q: "What's your backup/DR strategy?",
          a: "Strong DR awareness. How do you work in a team and handle disagreements on technical decisions?",
          suggestions: ["I present data-driven arguments and listen to alternatives", "Collaborative approach — POCs to validate different solutions", "Clear communication, documentation, and shared decision-making"] },
        { keys: ['team','collaborat','communic','disagree','conflict','agile','scrum','colleague'],
          q: 'How do you work in a team?',
          a: "Good interpersonal skills. Where do you see yourself growing professionally in 3-5 years?",
          suggestions: ["Moving toward a security architect or CISO role", "Deepening cloud and DevOps expertise", "Leading an infrastructure team while staying hands-on"] },
        { keys: ['future','goal','grow','year','career','aspir','next step','evolve','learn','certif'],
          q: 'Where do you see yourself in 3-5 years?',
          a: "Clear vision for your career. What certifications do you hold or are pursuing?",
          suggestions: ["CompTIA Security+ and working toward CCNA", "AWS Solutions Architect Associate certified", "Studying for OSCP to deepen pentesting skills"] },
        { keys: ['docker','container','kubernetes','k8s','pod','orchestr','microservice'],
          q: "What's your container experience?",
          a: "Container orchestration is reshaping deployment. How do you handle logging in containerized environments?",
          suggestions: ["EFK stack for container log aggregation", "Docker logging drivers with centralized syslog", "Prometheus + Loki for metrics and logs"] },
        { keys: ['active directory','ad','ldap','group policy','gpo','domain','sso','identity'],
          q: 'What is your Active Directory experience?',
          a: "AD and identity management are foundational. How do you manage user access and permissions?",
          suggestions: ["RBAC with security groups and regular access reviews", "Automated provisioning/deprovisioning with scripts", "SSO integration with Azure AD for cloud apps"] },
        { keys: ['python','java','code','program','develop','api','rest','git','github'],
          q: 'Do you have programming experience?',
          a: "Programming bridges dev and ops. What's your approach to version control and change management?",
          suggestions: ["Git with feature branches and pull request reviews", "Change advisory board for production changes", "Infrastructure as code with version-controlled repos"] },
      ],
    },
    fr: {
      title: 'Simulation d\'Entretien IA',
      desc: 'Découvrez comment MirrorHire mène des entretiens de pré-sélection alimentés par l\'IA pour les postes IT.',
      subdesc: 'Tapez vos réponses librement — l\'IA adapte ses questions en fonction de vos réponses et mots-clés.',
      start: 'COMMENCER L\'ENTRETIEN',
      placeholder: 'Tapez votre réponse...',
      live: 'EN DIRECT',
      intro: "Bienvenue dans la simulation d'entretien IA de MirrorHire. Je vais mener un entretien de pré-sélection pour un poste en Infrastructure IT & Cybersécurité. Répondez naturellement — j'adapterai mes questions selon vos réponses.\n\nCommençons : Parlez-moi de votre parcours et de ce qui vous a attiré vers l'IT.",
      followup: 'Bonne réponse. Laissez-moi vous poser une autre question —',
      endMsg: "Merci pour cet entretien approfondi. Vous avez démontré d'excellentes connaissances dans les domaines IT.",
      score: 'Évaluation Finale',
      categories: { tech: 'Connaissances Techniques', problem: 'Résolution de Problèmes', comm: 'Communication', fit: 'Adéquation Culturelle' },
      levels: { excellent: 'Excellent', strong: 'Solide', good: 'Bon', average: 'Moyen', weak: 'À Améliorer' },
      recommendation: 'Recommandation',
      proceed: 'PASSER AU TOUR SUIVANT',
      strengths: 'Points Forts',
      improvements: 'Axes d\'Amélioration',
      knowledge: [
        { keys: ['expérience','parcours','vous-même','présentez','parlez','carrière','background'],
          q: 'Parlez-moi de votre parcours et expérience.',
          a: "Un parcours solide. Je vois que vous avez de l'expérience pratique. Pouvez-vous décrire un défi technique que vous avez résolu récemment ?",
          suggestions: ["J'ai migré un domaine AD complet sans interruption", "J'ai résolu une panne réseau affectant 200 utilisateurs", "J'ai automatisé le provisionnement serveur avec Ansible"] },
        { keys: ['défi','problème','difficile','résoudre','debug','dépanner','corriger','résolu'],
          q: 'Décrivez un défi technique que vous avez résolu.',
          a: "Bonne approche de résolution. Quels outils de monitoring utilisez-vous en production ?",
          suggestions: ["Zabbix et Grafana pour la supervision d'infrastructure", "Stack ELK pour la centralisation des logs", "Prometheus avec alertes personnalisées"] },
        { keys: ['monitor','supervision','zabbix','grafana','prometheus','alerte','observ','splunk','elk'],
          q: 'Quels outils de monitoring utilisez-vous ?',
          a: "Solide boîte à outils. Comment gérez-vous un incident critique à 3h du matin ?",
          suggestions: ["Suivre le runbook, évaluer l'impact, communiquer, restaurer", "Trier la sévérité, vérifier les dashboards, escalader si besoin", "Priorité à la restauration du service avant l'analyse"] },
        { keys: ['incident','panne','urgence','astreinte','critique','sla','disponibilité'],
          q: 'Comment gérez-vous les incidents critiques ?',
          a: "Une approche mature. Quelle est votre expérience avec les technologies de virtualisation ?",
          suggestions: ["J'ai monté un environnement VMware vSphere complet", "Expérience avec Proxmox et KVM en lab", "Gestion de clusters Hyper-V avec migration live"] },
        { keys: ['virtual','vmware','esxi','hyperv','proxmox','kvm','vmotion','vsphere'],
          q: 'Quelle est votre expérience en virtualisation ?',
          a: "Impressionnant. Comment gérez-vous le réseau — VLANs, firewalls, routage ?",
          suggestions: ["Configuration de VLANs et routage inter-VLAN sur Cisco", "Mise en place de firewalls pfSense avec tunnels VPN", "Segmentation réseau pour conformité PCI"] },
        { keys: ['réseau','vlan','firewall','routage','switch','tcp','dns','dhcp','cisco','pfsense'],
          q: 'Parlez-moi de vos compétences réseau.',
          a: "Solides fondamentaux réseau. Et les plateformes cloud — AWS, Azure, GCP ?",
          suggestions: ["Déploiement d'infra sur AWS avec EC2, S3 et VPC", "Azure AD et VMs Azure pour configurations hybrides", "Projets GCP gérés avec Terraform"] },
        { keys: ['cloud','aws','azure','gcp','ec2','s3','terraform','iaas'],
          q: 'Quelle est votre expérience cloud ?',
          a: "Bonne exposition au cloud. Comment approchez-vous l'automatisation ?",
          suggestions: ["Playbooks Ansible pour la gestion de configuration", "Terraform pour le provisionnement, GitHub Actions pour CI/CD", "Scripts Bash et PowerShell pour l'automatisation"] },
        { keys: ['automat','ansible','puppet','terraform','script','bash','powershell','ci/cd'],
          q: 'Comment approchez-vous l\'automatisation ?',
          a: "L'automatisation est essentielle. Quelles pratiques de sécurité implémentez-vous ?",
          suggestions: ["Défense en profondeur avec firewalls, IDS et EDR", "Scans de vulnérabilités réguliers et gestion des patches", "Architecture zero trust avec MFA et moindre privilège"] },
        { keys: ['sécur','cyber','vulnér','pentest','ids','siem','durcissement','patch','chiffr','zero trust'],
          q: 'Quelles pratiques de sécurité suivez-vous ?',
          a: "Mentalité sécurité d'abord. Comment configurez-vous un nouveau serveur avec durcissement ?",
          suggestions: ["Installation minimale, désactiver services inutiles, CIS benchmarks", "Automatisation Ansible : durcissement OS, clés SSH, fail2ban", "Suivre la baseline entreprise puis durcir selon CIS/STIG"] },
        { keys: ['serveur','linux','windows server','installer','déployer','configur','durcir'],
          q: 'Comment configurez-vous et durcissez un serveur ?',
          a: "Processus rigoureux. Comment gérez-vous la sauvegarde et le PRA ?",
          suggestions: ["Règle 3-2-1 avec copies hors-site et cloud", "Sauvegardes automatiques quotidiennes avec tests mensuels", "Veeam pour les VMs avec réplication vers le site DR"] },
        { keys: ['sauvegarde','restaur','réplication','snapshot','failover','redondance','haute dispo','pra'],
          q: 'Quelle est votre stratégie de sauvegarde/PRA ?',
          a: "Bonne conscience du PRA. Comment travaillez-vous en équipe ?",
          suggestions: ["Arguments basés sur les données et écoute des alternatives", "Approche collaborative — POCs pour valider les solutions", "Communication claire, documentation et décisions partagées"] },
        { keys: ['équipe','collabor','communic','désaccord','conflit','agile','collègue'],
          q: 'Comment travaillez-vous en équipe ?',
          a: "Les compétences interpersonnelles sont aussi importantes que les techniques. Où vous voyez-vous dans 3-5 ans ?",
          suggestions: ["Évoluer vers un rôle d'architecte sécurité", "Approfondir l'expertise cloud et DevOps", "Diriger une équipe infra tout en restant technique"] },
        { keys: ['futur','objectif','évoluer','ans','carrière','aspir','apprendre','certif'],
          q: 'Où vous voyez-vous dans 3-5 ans ?',
          a: "Vision claire. Quelles certifications avez-vous ou préparez-vous ?",
          suggestions: ["CompTIA Security+ et préparation du CCNA", "Certifié AWS Solutions Architect Associate", "Préparation de l'OSCP pour le pentesting"] },
        { keys: ['docker','conteneur','kubernetes','k8s','orchestr','microservice'],
          q: 'Quelle est votre expérience avec les conteneurs ?',
          a: "L'orchestration de conteneurs transforme le déploiement. Comment gérez-vous les logs dans les environnements conteneurisés ?",
          suggestions: ["Stack EFK pour l'agrégation de logs conteneurs", "Drivers de logging Docker avec syslog centralisé", "Prometheus + Loki pour métriques et logs"] },
        { keys: ['active directory','ad','ldap','gpo','domaine','sso','identité'],
          q: 'Quelle est votre expérience avec Active Directory ?',
          a: "AD et la gestion d'identité sont fondamentaux. Comment gérez-vous les accès utilisateurs ?",
          suggestions: ["RBAC avec groupes de sécurité et revues d'accès", "Provisionnement/déprovisionnement automatisé", "Intégration SSO avec Azure AD"] },
        { keys: ['python','java','code','programm','développ','api','rest','git'],
          q: 'Avez-vous de l\'expérience en programmation ?',
          a: "La programmation fait le pont entre dev et ops. Quelle est votre approche du versionnement et de la gestion des changements ?",
          suggestions: ["Git avec branches feature et revues de pull requests", "Comité de changement pour les modifications en production", "Infrastructure as code avec repos versionnés"] },
      ],
    },
    nl: {
      title: 'AI Sollicitatiesimulatie',
      desc: 'Ervaar hoe MirrorHire AI-gestuurde preselectie-interviews voert voor IT-functies.',
      subdesc: 'Typ uw antwoorden vrij — de AI past de vragen aan op basis van uw antwoorden en trefwoorden.',
      start: 'START INTERVIEW',
      placeholder: 'Typ uw antwoord...',
      live: 'LIVE',
      intro: "Welkom bij de AI-sollicitatiesimulatie van MirrorHire. Ik voer een preselectie-interview voor een functie in IT-Infrastructuur & Cybersecurity. Antwoord natuurlijk — ik pas mijn vragen aan op basis van uw antwoorden.\n\nLaten we beginnen: Vertel me over uw achtergrond en wat u naar IT heeft getrokken.",
      followup: 'Goed antwoord. Laat me u iets anders vragen —',
      endMsg: "Bedankt voor dit grondige interview. U heeft uitstekende kennis getoond over IT-domeinen.",
      score: 'Eindbeoordeling',
      categories: { tech: 'Technische Kennis', problem: 'Probleemoplossing', comm: 'Communicatie', fit: 'Culturele Fit' },
      levels: { excellent: 'Uitstekend', strong: 'Sterk', good: 'Goed', average: 'Gemiddeld', weak: 'Verbetering Nodig' },
      recommendation: 'Aanbeveling',
      proceed: 'DOOR NAAR VOLGENDE RONDE',
      strengths: 'Sterke Punten',
      improvements: 'Verbeterpunten',
      knowledge: [
        { keys: ['ervaring','achtergrond','uzelf','vertel','carrière','wie bent'],
          q: 'Vertel me over uw achtergrond en ervaring.',
          a: "Een solide achtergrond. Kunt u een technische uitdaging beschrijven die u onlangs hebt opgelost?",
          suggestions: ["Ik heb een volledig AD-domein gemigreerd zonder downtime", "Ik heb een netwerkstoring opgelost die 200 gebruikers trof", "Ik heb serverprovisioning geautomatiseerd met Ansible"] },
        { keys: ['uitdaging','probleem','moeilijk','oploss','debug','troubleshoot'],
          q: 'Beschrijf een technische uitdaging die u hebt opgelost.',
          a: "Goede probleemoplossing. Welke monitoringtools gebruikt u in productie?",
          suggestions: ["Zabbix en Grafana voor infrastructuurmonitoring", "ELK-stack voor gecentraliseerde logging", "Prometheus met aangepaste alerts"] },
        { keys: ['monitor','zabbix','grafana','prometheus','alert','observ','splunk','elk'],
          q: 'Welke monitoringtools gebruikt u?',
          a: "Sterke toolkit. Hoe handelt u een kritisch incident af om 3 uur 's nachts?",
          suggestions: ["Runbook volgen, impact beoordelen, communiceren, herstellen", "Ernst triëren, dashboards controleren, escaleren indien nodig", "Prioriteit aan serviceherstel vóór rootcause-analyse"] },
        { keys: ['incident','storing','nood','bereikbaar','kritiek','sla'],
          q: 'Hoe handelt u kritieke incidenten af?',
          a: "Een volwassen aanpak. Wat is uw ervaring met virtualisatietechnologieën?",
          suggestions: ["Ik heb een volledige VMware vSphere-omgeving gebouwd", "Ervaring met Proxmox en KVM in labomgevingen", "Beheer van Hyper-V-clusters met live migratie"] },
        { keys: ['virtual','vmware','esxi','hyperv','proxmox','kvm','vmotion','vsphere'],
          q: 'Wat is uw virtualisatie-ervaring?',
          a: "Indrukwekkend. Hoe beheert u netwerken — VLANs, firewalls, routing?",
          suggestions: ["VLAN-configuratie en inter-VLAN routing op Cisco", "pfSense firewalls met VPN-tunnels opgezet", "Netwerksegmentatie voor PCI-compliance"] },
        { keys: ['netwerk','vlan','firewall','routing','switch','tcp','dns','dhcp','cisco'],
          q: 'Vertel me over uw netwerkvaardigheden.',
          a: "Solide netwerkfundamenten. En cloudplatforms — AWS, Azure, GCP?",
          suggestions: ["Infra gedeployed op AWS met EC2, S3 en VPCs", "Azure AD en Azure VMs voor hybride setups", "GCP-projecten beheerd met Terraform"] },
        { keys: ['cloud','aws','azure','gcp','ec2','s3','terraform'],
          q: 'Wat is uw cloud-ervaring?',
          a: "Goede cloud-ervaring. Hoe benadert u automatisering?",
          suggestions: ["Ansible playbooks voor configuratiebeheer", "Terraform voor provisioning, GitHub Actions voor CI/CD", "Bash- en PowerShell-scripts voor automatisering"] },
        { keys: ['automat','ansible','puppet','terraform','script','bash','powershell','ci/cd'],
          q: 'Hoe benadert u automatisering?',
          a: "Automatisering is essentieel. Welke beveiligingspraktijken implementeert u?",
          suggestions: ["Defense in depth met firewalls, IDS en EDR", "Regelmatige kwetsbaarheidsscans en patchbeheer", "Zero trust architectuur met MFA en least privilege"] },
        { keys: ['beveilig','cyber','kwetsbaar','pentest','ids','siem','hardening','patch','versleutel'],
          q: 'Welke beveiligingspraktijken volgt u?',
          a: "Security-first mentaliteit. Hoe configureert u een nieuwe server met hardening?",
          suggestions: ["Minimale installatie, onnodige services uitschakelen, CIS benchmarks", "Automatisering met Ansible: OS hardening, SSH keys, fail2ban", "Bedrijfsbaseline volgen, dan hardenen volgens CIS/STIG"] },
        { keys: ['server','linux','windows server','installeer','deploy','configureer','harden'],
          q: 'Hoe configureert u een server met hardening?',
          a: "Grondig proces. Hoe handelt u backup en disaster recovery af?",
          suggestions: ["3-2-1 backup-regel met offsite en cloudkopieën", "Geautomatiseerde dagelijkse backups met maandelijkse tests", "Veeam voor VM-backups met replicatie naar DR-site"] },
        { keys: ['backup','herstel','replicatie','snapshot','failover','redundant','hoge beschikbaar'],
          q: 'Wat is uw backup/DR-strategie?',
          a: "Sterk DR-bewustzijn. Hoe werkt u in een team?",
          suggestions: ["Datagedreven argumenten en luisteren naar alternatieven", "Collaboratieve aanpak — POCs om oplossingen te valideren", "Duidelijke communicatie en gedeelde besluitvorming"] },
        { keys: ['team','samenwerk','communic','onenigheid','conflict','agile','collega'],
          q: 'Hoe werkt u in een team?',
          a: "Goede interpersoonlijke vaardigheden. Waar ziet u uzelf over 3-5 jaar?",
          suggestions: ["Evolueren naar een security architect rol", "Cloud en DevOps expertise verdiepen", "Een infrastructuurteam leiden en hands-on blijven"] },
        { keys: ['toekomst','doel','groei','jaar','carrière','leren','certificer'],
          q: 'Waar ziet u uzelf over 3-5 jaar?',
          a: "Duidelijke visie. Welke certificeringen heeft u of bent u aan het behalen?",
          suggestions: ["CompTIA Security+ en bezig met CCNA", "AWS Solutions Architect Associate gecertificeerd", "Bezig met OSCP voor pentesting"] },
      ],
    },
  },
  pingfin: {
    en: {
      topology: 'NETWORK TOPOLOGY',
      clearing: 'Clearing House',
      ready: 'READY',
      processing: 'PROCESSING',
      transfer: 'INTERBANK TRANSFER',
      send: 'SEND TRANSFER',
      processingBtn: 'PROCESSING...',
      route: 'ROUTE',
      protocol: 'Protocol: SEPA CT',
      log: 'TRANSFER LOG',
    },
    fr: {
      topology: 'TOPOLOGIE RÉSEAU',
      clearing: 'Chambre de Compensation',
      ready: 'PRÊT',
      processing: 'TRAITEMENT',
      transfer: 'VIREMENT INTERBANCAIRE',
      send: 'ENVOYER LE VIREMENT',
      processingBtn: 'TRAITEMENT...',
      route: 'ROUTE',
      protocol: 'Protocole : SEPA CT',
      log: 'JOURNAL DE TRANSFERT',
    },
    nl: {
      topology: 'NETWERKTOPOLOGIE',
      clearing: 'Clearinginstelling',
      ready: 'GEREED',
      processing: 'VERWERKING',
      transfer: 'INTERBANCAIRE OVERSCHRIJVING',
      send: 'OVERSCHRIJVING VERSTUREN',
      processingBtn: 'VERWERKING...',
      route: 'ROUTE',
      protocol: 'Protocol: SEPA CT',
      log: 'OVERDRACHTSLOG',
    },
  },
};

/* ── Interactive Demo Components ── */

interface VM {
  id: string;
  label: string;
  ip: string;
  host: 'usa' | 'brussels';
  status: 'online' | 'migrating' | 'offline';
}

function VMwareDemo() {
  const [vms, setVms] = useState<VM[]>([
    { id: 'dc', label: 'Domain Controller', ip: '192.168.125.100', host: 'usa', status: 'online' },
    { id: 'web', label: 'Web Server', ip: '192.168.125.110', host: 'usa', status: 'online' },
    { id: 'client', label: 'Client Win11', ip: '192.168.125.50', host: 'brussels', status: 'online' },
    { id: 'dns', label: 'DNS Server', ip: '192.168.125.10', host: 'brussels', status: 'online' },
  ]);
  const [selectedVM, setSelectedVM] = useState<string | null>(null);
  const [migrating, setMigrating] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);
  const [log, setLog] = useState<string[]>(['[SYSTEM] vCenter 8.0 ready — 2 ESXi hosts online']);

  const migrateVM = useCallback((vmId: string) => {
    const vm = vms.find(v => v.id === vmId);
    if (!vm || migrating) return;
    const targetHost = vm.host === 'usa' ? 'brussels' : 'usa';
    const targetLabel = targetHost === 'usa' ? 'ESXi USA' : 'ESXi Brussels';

    setMigrating(vmId);
    setProgress(0);
    setVms(prev => prev.map(v => v.id === vmId ? { ...v, status: 'migrating' as const } : v));
    setLog(prev => [...prev, `[vMotion] Starting live migration: ${vm.label} → ${targetLabel}`]);

    let p = 0;
    const interval = setInterval(() => {
      p += Math.random() * 4 + 2;
      if (p >= 100) {
        p = 100;
        clearInterval(interval);
        setVms(prev => prev.map(v => v.id === vmId ? { ...v, host: targetHost, status: 'online' as const } : v));
        setLog(prev => [...prev, `[vMotion] ${vm.label} migrated to ${targetLabel} — 0 downtime`]);
        setMigrating(null);
        setSelectedVM(null);
      }
      setProgress(Math.min(p, 100));
    }, 60);
  }, [vms, migrating]);

  const usaVMs = vms.filter(v => v.host === 'usa');
  const brusselsVMs = vms.filter(v => v.host === 'brussels');
  const sel = vms.find(v => v.id === selectedVM);

  return (
    <div className="glass-card rounded-xl overflow-hidden">
      <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-bg-surface/50">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-danger/60" />
          <div className="w-2.5 h-2.5 rounded-full bg-warning/60" />
          <div className="w-2.5 h-2.5 rounded-full bg-success/60" />
        </div>
        <span className="mono-label text-text-muted text-[0.6rem]">VCENTER_MIGRATION.SYS</span>
        <span className="status-online text-[0.6rem]">LIVE</span>
      </div>

      <div className="p-4 sm:p-6">
        {/* vCenter header */}
        <div className="flex items-center gap-3 mb-5">
          <div className="w-8 h-8 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-primary">
              <rect x="2" y="2" width="20" height="8" rx="2"/><rect x="2" y="14" width="20" height="8" rx="2"/>
              <circle cx="6" cy="6" r="1" fill="currentColor"/><circle cx="6" cy="18" r="1" fill="currentColor"/>
            </svg>
          </div>
          <div>
            <span className="text-text-primary text-sm font-semibold font-[family-name:var(--font-heading)]">vCenter Server 8.0</span>
            <span className="block text-[0.6rem] text-text-muted font-[family-name:var(--font-mono)]">192.168.125.200 — Cluster: RB-LAB</span>
          </div>
        </div>

        {/* Two hosts side by side */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-5">
          {/* ESXi USA */}
          <div className="rounded-lg border border-border bg-bg-surface/30 p-3">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-1.5 h-1.5 rounded-full bg-success animate-pulse" />
              <span className="text-[0.7rem] font-[family-name:var(--font-mono)] text-success font-semibold">ESXi USA</span>
              <span className="text-[0.55rem] text-text-muted font-[family-name:var(--font-mono)] ml-auto">192.168.125.150</span>
            </div>
            <div className="space-y-1.5">
              {usaVMs.length === 0 && (
                <div className="text-[0.65rem] text-text-muted/50 font-[family-name:var(--font-mono)] py-3 text-center border border-dashed border-border/50 rounded">
                  No VMs
                </div>
              )}
              {usaVMs.map(vm => (
                <button
                  key={vm.id}
                  onClick={() => setSelectedVM(selectedVM === vm.id ? null : vm.id)}
                  className={`w-full text-left px-3 py-2 rounded border transition-all text-[0.7rem] font-[family-name:var(--font-mono)] ${
                    selectedVM === vm.id
                      ? 'border-primary/40 bg-primary/10 text-primary'
                      : vm.status === 'migrating'
                        ? 'border-warning/30 bg-warning/5 text-warning animate-pulse'
                        : 'border-border/50 bg-bg-deep/50 text-text-secondary hover:border-primary/30 hover:text-text-primary'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <div className={`w-1.5 h-1.5 rounded-full ${vm.status === 'migrating' ? 'bg-warning' : 'bg-success'}`} />
                    <span className="truncate">{vm.label}</span>
                  </div>
                  <span className="text-[0.55rem] text-text-muted ml-4">{vm.ip}</span>
                </button>
              ))}
            </div>
          </div>

          {/* ESXi Brussels */}
          <div className="rounded-lg border border-border bg-bg-surface/30 p-3">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-1.5 h-1.5 rounded-full bg-success animate-pulse" />
              <span className="text-[0.7rem] font-[family-name:var(--font-mono)] text-secondary font-semibold">ESXi Brussels</span>
              <span className="text-[0.55rem] text-text-muted font-[family-name:var(--font-mono)] ml-auto">192.168.125.160</span>
            </div>
            <div className="space-y-1.5">
              {brusselsVMs.length === 0 && (
                <div className="text-[0.65rem] text-text-muted/50 font-[family-name:var(--font-mono)] py-3 text-center border border-dashed border-border/50 rounded">
                  No VMs
                </div>
              )}
              {brusselsVMs.map(vm => (
                <button
                  key={vm.id}
                  onClick={() => setSelectedVM(selectedVM === vm.id ? null : vm.id)}
                  className={`w-full text-left px-3 py-2 rounded border transition-all text-[0.7rem] font-[family-name:var(--font-mono)] ${
                    selectedVM === vm.id
                      ? 'border-primary/40 bg-primary/10 text-primary'
                      : vm.status === 'migrating'
                        ? 'border-warning/30 bg-warning/5 text-warning animate-pulse'
                        : 'border-border/50 bg-bg-deep/50 text-text-secondary hover:border-primary/30 hover:text-text-primary'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <div className={`w-1.5 h-1.5 rounded-full ${vm.status === 'migrating' ? 'bg-warning' : 'bg-success'}`} />
                    <span className="truncate">{vm.label}</span>
                  </div>
                  <span className="text-[0.55rem] text-text-muted ml-4">{vm.ip}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Migration progress */}
        {migrating && (
          <div className="mb-4 p-3 rounded-lg bg-warning/5 border border-warning/20">
            <div className="flex justify-between text-[0.65rem] font-[family-name:var(--font-mono)] mb-1.5">
              <span className="text-warning">vMotion in progress...</span>
              <span className="text-text-muted">{Math.round(progress)}%</span>
            </div>
            <div className="h-1.5 bg-bg-deep rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-warning to-success rounded-full transition-all duration-100" style={{ width: `${progress}%` }} />
            </div>
          </div>
        )}

        {/* Selected VM action */}
        {sel && !migrating && (
          <div className="mb-4 p-3 rounded-lg bg-primary/5 border border-primary/15">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div>
                <span className="text-[0.7rem] text-text-primary font-[family-name:var(--font-mono)] block">{sel.label}</span>
                <span className="text-[0.6rem] text-text-muted font-[family-name:var(--font-mono)]">
                  {sel.ip} — on {sel.host === 'usa' ? 'ESXi USA' : 'ESXi Brussels'}
                </span>
              </div>
              <button
                onClick={() => migrateVM(sel.id)}
                className="px-4 py-1.5 rounded text-[0.7rem] font-[family-name:var(--font-mono)] bg-primary/15 text-primary border border-primary/30 hover:bg-primary/25 transition-all"
              >
                Migrate → {sel.host === 'usa' ? 'Brussels' : 'USA'}
              </button>
            </div>
          </div>
        )}

        {/* Log */}
        <div className="rounded-lg bg-bg-deep/80 border border-border/50 p-3 max-h-[100px] overflow-y-auto">
          {log.map((entry, i) => (
            <div key={i} className="text-[0.6rem] font-[family-name:var(--font-mono)] text-text-muted leading-relaxed">
              {entry}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function MirrorHireDemo() {
  const { language } = useLanguage();
  const t = demoT.mirrorhire[language as Lang];
  const knowledge = t.knowledge;
  const maxQuestions = 6;

  const [messages, setMessages] = useState<{ role: 'ai' | 'user'; text: string }[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [typing, setTyping] = useState(false);
  const [displayedText, setDisplayedText] = useState('');
  const [started, setStarted] = useState(false);
  const [questionCount, setQuestionCount] = useState(0);
  const [usedIndices, setUsedIndices] = useState<Set<number>>(new Set());
  const [currentSuggestions, setCurrentSuggestions] = useState<string[]>([]);
  const [showScore, setShowScore] = useState(false);
  const [matchedTopics, setMatchedTopics] = useState<number[]>([]);
  const chatRef = useRef<HTMLDivElement>(null);
  const typingRef = useRef<ReturnType<typeof setInterval>>(undefined);

  useEffect(() => {
    if (chatRef.current) chatRef.current.scrollTop = chatRef.current.scrollHeight;
  }, [messages, displayedText, showScore]);

  const getResponse = useCallback((input: string): { text: string; nextSuggestions: string[] } => {
    const lower = input.toLowerCase();
    let bestMatch = -1;
    let bestScore = 0;
    knowledge.forEach((entry, idx) => {
      if (usedIndices.has(idx)) return;
      const score = entry.keys.reduce((s, k) => s + (lower.includes(k) ? 1 : 0), 0);
      if (score > bestScore) { bestScore = score; bestMatch = idx; }
    });
    if (bestMatch >= 0 && bestScore > 0) {
      setUsedIndices(prev => new Set([...prev, bestMatch]));
      setMatchedTopics(prev => [...prev, bestMatch]);
      return { text: knowledge[bestMatch].a, nextSuggestions: knowledge[bestMatch].suggestions };
    }
    const unused = knowledge.map((_, i) => i).filter(i => !usedIndices.has(i));
    if (unused.length > 0) {
      const pick = unused[Math.floor(Math.random() * unused.length)];
      setUsedIndices(prev => new Set([...prev, pick]));
      return { text: `${t.followup} ${knowledge[pick].q}`, nextSuggestions: knowledge[pick].suggestions };
    }
    return { text: t.endMsg, nextSuggestions: [] };
  }, [usedIndices, knowledge, t]);

  const typeText = useCallback((fullText: string, onDone: () => void) => {
    let i = 0;
    setDisplayedText('');
    if (typingRef.current) clearInterval(typingRef.current);
    typingRef.current = setInterval(() => {
      i++;
      setDisplayedText(fullText.slice(0, i));
      if (i >= fullText.length) { clearInterval(typingRef.current); onDone(); }
    }, 15 + Math.random() * 10);
  }, []);

  const startInterview = useCallback(() => {
    setStarted(true);
    setTyping(true);
    setTimeout(() => {
      typeText(t.intro, () => {
        setMessages([{ role: 'ai', text: t.intro }]);
        setDisplayedText('');
        setTyping(false);
        setCurrentSuggestions(knowledge[0]?.suggestions || []);
      });
    }, 800);
  }, [typeText, t, knowledge]);

  const sendMessage = useCallback(() => {
    if (!inputValue.trim() || typing) return;
    const userMsg = inputValue.trim();
    setInputValue('');
    setCurrentSuggestions([]);
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setTyping(true);
    const newCount = questionCount + 1;
    setQuestionCount(newCount);

    setTimeout(() => {
      if (newCount >= maxQuestions) {
        const endText = t.endMsg;
        typeText(endText, () => {
          setMessages(prev => [...prev, { role: 'ai', text: endText }]);
          setDisplayedText('');
          setTyping(false);
          setShowScore(true);
        });
      } else {
        const { text, nextSuggestions } = getResponse(userMsg);
        typeText(text, () => {
          setMessages(prev => [...prev, { role: 'ai', text }]);
          setDisplayedText('');
          setTyping(false);
          setCurrentSuggestions(nextSuggestions);
        });
      }
    }, 600 + Math.random() * 800);
  }, [inputValue, typing, questionCount, getResponse, typeText, t, maxQuestions]);

  const scoreData = {
    overall: 72 + matchedTopics.length * 3 + Math.min(questionCount * 2, 10),
    tech: matchedTopics.length >= 3 ? t.levels.strong : matchedTopics.length >= 1 ? t.levels.good : t.levels.average,
    problem: questionCount >= 4 ? t.levels.strong : t.levels.good,
    comm: questionCount >= 3 ? t.levels.good : t.levels.average,
    fit: t.levels.good,
  };

  const strengthsList = [
    matchedTopics.length >= 2 && t.categories.tech,
    questionCount >= 4 && t.categories.problem,
    t.categories.comm,
  ].filter(Boolean) as string[];

  const improvementsList = [
    matchedTopics.length < 3 && t.categories.tech,
    questionCount < 4 && t.categories.problem,
  ].filter(Boolean) as string[];

  return (
    <div className="glass-card rounded-xl overflow-hidden">
      <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-bg-surface/50">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-danger/60" />
          <div className="w-2.5 h-2.5 rounded-full bg-warning/60" />
          <div className="w-2.5 h-2.5 rounded-full bg-success/60" />
        </div>
        <span className="mono-label text-text-muted text-[0.6rem] hidden sm:inline">MIRRORHIRE_INTERVIEW.SYS</span>
        <span className="mono-label text-text-muted text-[0.6rem] sm:hidden">MIRRORHIRE.SYS</span>
        <div className="flex items-center gap-2">
          {started && <span className="text-[0.55rem] font-[family-name:var(--font-mono)] text-text-muted">Q{questionCount}/{maxQuestions}</span>}
          <span className="status-online text-[0.6rem]">{t.live}</span>
        </div>
      </div>

      <div className="p-4 sm:p-6">
        {!started ? (
          <div className="flex flex-col items-center py-8">
            <div className="w-16 h-16 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-4">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-primary">
                <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/>
              </svg>
            </div>
            <h4 className="font-[family-name:var(--font-heading)] text-text-primary font-semibold mb-2">{t.title}</h4>
            <p className="text-sm text-text-muted text-center max-w-sm mb-2">{t.desc}</p>
            <p className="text-[0.65rem] text-text-muted text-center max-w-sm mb-6 font-[family-name:var(--font-mono)]">{t.subdesc}</p>
            <button onClick={startInterview} className="px-6 py-2.5 rounded-lg text-sm font-[family-name:var(--font-mono)] bg-primary/15 text-primary border border-primary/30 hover:bg-primary/25 transition-all">
              {t.start}
            </button>
          </div>
        ) : (
          <>
            <div ref={chatRef} className="space-y-4 mb-4 max-h-[320px] overflow-y-auto pr-2">
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[80%] px-4 py-3 rounded-xl text-sm whitespace-pre-line ${
                    msg.role === 'user'
                      ? 'bg-primary/15 text-text-primary border border-primary/20 rounded-br-sm'
                      : 'bg-bg-surface/80 text-text-secondary border border-border rounded-bl-sm'
                  }`}>
                    {msg.role === 'ai' && <span className="block text-[0.6rem] text-primary font-[family-name:var(--font-mono)] mb-1">AI INTERVIEWER</span>}
                    {msg.text}
                  </div>
                </motion.div>
              ))}
              {typing && displayedText && (
                <div className="flex justify-start">
                  <div className="max-w-[80%] bg-bg-surface/80 border border-border rounded-xl rounded-bl-sm px-4 py-3">
                    <span className="block text-[0.6rem] text-primary font-[family-name:var(--font-mono)] mb-1">AI INTERVIEWER</span>
                    <span className="text-sm text-text-secondary whitespace-pre-line">{displayedText}<span className="animate-pulse">|</span></span>
                  </div>
                </div>
              )}
              {typing && !displayedText && (
                <div className="flex justify-start">
                  <div className="bg-bg-surface/80 border border-border rounded-xl rounded-bl-sm px-4 py-3">
                    <div className="flex items-center gap-1">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary/50 animate-bounce" style={{ animationDelay: '0ms' }} />
                      <div className="w-1.5 h-1.5 rounded-full bg-primary/50 animate-bounce" style={{ animationDelay: '150ms' }} />
                      <div className="w-1.5 h-1.5 rounded-full bg-primary/50 animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                </div>
              )}

              {showScore && (
                <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="mt-4">
                  <div className="rounded-xl border border-primary/20 bg-bg-surface/50 p-4 sm:p-5">
                    <div className="flex items-center justify-between mb-4">
                      <span className="mono-label text-primary text-[0.7rem]">{t.score}</span>
                      <span className="text-2xl font-[family-name:var(--font-heading)] font-bold text-primary">{scoreData.overall}/100</span>
                    </div>
                    <div className="grid grid-cols-2 gap-3 mb-4">
                      {[
                        { label: t.categories.tech, value: scoreData.tech },
                        { label: t.categories.problem, value: scoreData.problem },
                        { label: t.categories.comm, value: scoreData.comm },
                        { label: t.categories.fit, value: scoreData.fit },
                      ].map(cat => (
                        <div key={cat.label} className="flex items-center justify-between px-3 py-2 rounded-lg bg-bg-deep/50 border border-border/30">
                          <span className="text-[0.6rem] text-text-muted font-[family-name:var(--font-mono)]">{cat.label}</span>
                          <span className={`text-[0.65rem] font-[family-name:var(--font-mono)] font-semibold ${
                            cat.value === t.levels.excellent || cat.value === t.levels.strong ? 'text-success' :
                            cat.value === t.levels.good ? 'text-primary' : 'text-warning'
                          }`}>{cat.value}</span>
                        </div>
                      ))}
                    </div>
                    <div className="grid grid-cols-2 gap-3 mb-4">
                      <div>
                        <span className="text-[0.6rem] text-success font-[family-name:var(--font-mono)] block mb-1">{t.strengths}</span>
                        {strengthsList.map(s => (
                          <div key={s} className="flex items-center gap-1 mb-0.5">
                            <span className="text-success text-[0.6rem]">+</span>
                            <span className="text-[0.6rem] text-text-secondary">{s}</span>
                          </div>
                        ))}
                      </div>
                      <div>
                        <span className="text-[0.6rem] text-warning font-[family-name:var(--font-mono)] block mb-1">{t.improvements}</span>
                        {improvementsList.length > 0 ? improvementsList.map(s => (
                          <div key={s} className="flex items-center gap-1 mb-0.5">
                            <span className="text-warning text-[0.6rem]">-</span>
                            <span className="text-[0.6rem] text-text-secondary">{s}</span>
                          </div>
                        )) : (
                          <span className="text-[0.6rem] text-text-muted">—</span>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center justify-between pt-3 border-t border-border/30">
                      <span className="text-[0.6rem] text-text-muted font-[family-name:var(--font-mono)]">{t.recommendation}</span>
                      <button
                        onClick={() => {
                          setMessages([]);
                          setInputValue('');
                          setTyping(false);
                          setDisplayedText('');
                          setStarted(false);
                          setQuestionCount(0);
                          setUsedIndices(new Set());
                          setCurrentSuggestions([]);
                          setShowScore(false);
                          setMatchedTopics([]);
                          if (typingRef.current) clearInterval(typingRef.current);
                        }}
                        className="text-[0.7rem] text-success font-[family-name:var(--font-mono)] font-bold hover:text-primary transition-colors cursor-pointer"
                      >{t.proceed} ✓</button>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>

            {!showScore && currentSuggestions.length > 0 && !typing && (
              <div className="flex flex-wrap gap-2 mb-3">
                {currentSuggestions.map((s, i) => (
                  <button
                    key={i}
                    onClick={() => setInputValue(s)}
                    className="text-[0.65rem] px-3 py-1.5 rounded-lg bg-bg-surface/30 border border-border/50 text-text-muted hover:border-primary/30 hover:text-text-secondary transition-all font-[family-name:var(--font-mono)] text-left"
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}

            {!showScore && (
              <div className="flex gap-2">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                  placeholder={t.placeholder}
                  disabled={typing}
                  className="flex-1 bg-bg-surface/50 border border-border rounded-lg px-4 py-2.5 text-sm text-text-primary placeholder:text-text-muted/50 focus:outline-none focus:border-primary/40 disabled:opacity-30 transition-colors"
                />
                <button onClick={sendMessage} disabled={typing || !inputValue.trim()} className="px-4 py-2.5 rounded-lg bg-primary/15 text-primary border border-primary/30 hover:bg-primary/25 disabled:opacity-30 transition-all">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/></svg>
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

type TransferStep = 'idle' | 'route-check' | 'bank-a-debit' | 'to-central' | 'central-process' | 'to-bank-b' | 'bank-b-credit' | 'done';

function PingFinDemo() {
  const { language } = useLanguage();
  const pt = demoT.pingfin[language as Lang];
  const [balanceA, setBalanceA] = useState(3200.00);
  const [balanceB, setBalanceB] = useState(1850.00);
  const [sendAmount, setSendAmount] = useState('');
  const [direction, setDirection] = useState<'a-to-b' | 'b-to-a'>('a-to-b');
  const [step, setStep] = useState<TransferStep>('idle');
  const [logs, setLogs] = useState<string[]>([]);
  const logsEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    logsEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs]);

  const addLog = useCallback((msg: string) => {
    setLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] ${msg}`]);
  }, []);

  const runTransfer = useCallback(() => {
    const amount = parseFloat(sendAmount);
    const senderBalance = direction === 'a-to-b' ? balanceA : balanceB;
    if (isNaN(amount) || amount <= 0 || amount > senderBalance) return;

    const from = direction === 'a-to-b' ? 'Bank A' : 'Bank B';
    const to = direction === 'a-to-b' ? 'Bank B' : 'Bank A';
    setLogs([]);

    setStep('route-check');
    addLog(`[ROUTE] Resolving path: ${from} → Central Bank → ${to}`);

    setTimeout(() => {
      addLog(`[ROUTE] Route established via /api/transfers/interbank`);
      addLog(`[AUTH] Validating transfer credentials...`);
      setStep('bank-a-debit');
    }, 800);

    setTimeout(() => {
      addLog(`[${from.toUpperCase()}] Debiting €${amount.toFixed(2)} from account`);
      if (direction === 'a-to-b') setBalanceA(prev => prev - amount);
      else setBalanceB(prev => prev - amount);
      setStep('to-central');
    }, 1800);

    setTimeout(() => {
      addLog(`[TRANSFER] Sending funds to Central Bank...`);
      setStep('central-process');
    }, 2800);

    setTimeout(() => {
      addLog(`[CENTRAL] Processing interbank transfer`);
      addLog(`[CENTRAL] Compliance check: PASSED`);
      addLog(`[CENTRAL] Routing to ${to}...`);
      setStep('to-bank-b');
    }, 3800);

    setTimeout(() => {
      addLog(`[TRANSFER] Forwarding funds to ${to}...`);
      setStep('bank-b-credit');
    }, 4800);

    setTimeout(() => {
      addLog(`[${to.toUpperCase()}] Crediting €${amount.toFixed(2)} to account`);
      if (direction === 'a-to-b') setBalanceB(prev => prev + amount);
      else setBalanceA(prev => prev + amount);
      setStep('done');
      addLog(`[SUCCESS] Transfer complete: ${from} → Central Bank → ${to} — €${amount.toFixed(2)}`);
    }, 5800);

    setTimeout(() => {
      setStep('idle');
      setSendAmount('');
    }, 7500);
  }, [sendAmount, direction, balanceA, balanceB, addLog]);

  const isActive = step !== 'idle';
  const fromLabel = direction === 'a-to-b' ? 'Bank A' : 'Bank B';
  const toLabel = direction === 'a-to-b' ? 'Bank B' : 'Bank A';

  return (
    <div className="glass-card rounded-xl overflow-hidden">
      <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-bg-surface/50">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-danger/60" />
          <div className="w-2.5 h-2.5 rounded-full bg-warning/60" />
          <div className="w-2.5 h-2.5 rounded-full bg-success/60" />
        </div>
        <span className="mono-label text-text-muted text-[0.6rem] hidden sm:inline">PINGFIN_INTERBANK_SYSTEM</span>
        <span className="mono-label text-text-muted text-[0.6rem] sm:hidden">PINGFIN.SYS</span>
        <span className="status-online text-[0.6rem]">DEMO</span>
      </div>

      <div className="p-4 sm:p-6">
        {/* Network Topology */}
        <span className="mono-label text-text-muted text-[0.6rem] block mb-3">{pt.topology}</span>
        {/* Mobile: vertical stack */}
        <div className="flex flex-col items-center gap-2 mb-6 sm:hidden">
          <div className={`w-full rounded-lg p-3 border transition-all duration-500 ${
            step === 'bank-a-debit' ? 'border-warning/50 bg-warning/5' :
            step === 'done' && direction === 'b-to-a' ? 'border-success/50 bg-success/5' :
            'border-border bg-bg-surface/30'
          }`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="1.5"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg>
                <span className="mono-label text-primary text-[0.6rem]">BANK A</span>
              </div>
              <span className="text-lg font-[family-name:var(--font-heading)] font-bold text-text-primary">€{balanceA.toFixed(2)}</span>
            </div>
            <span className="text-[0.55rem] text-text-muted font-[family-name:var(--font-mono)]">BE71 0961 2345 6769</span>
          </div>

          <div className={`w-6 h-0.5 rotate-90 transition-colors duration-300 ${
            step === 'to-central' || step === 'bank-a-debit' ? 'bg-primary' : 'bg-border'
          }`} />

          <div className={`w-full rounded-lg p-3 border transition-all duration-500 ${
            step === 'central-process' ? 'border-secondary/50 bg-secondary/5' : 'border-border bg-bg-surface/30'
          }`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--secondary)" strokeWidth="1.5"><path d="M3 21h18M3 10h18M5 6l7-3 7 3M4 10v11M20 10v11M8 14v3M12 14v3M16 14v3"/></svg>
                <span className="mono-label text-secondary text-[0.6rem]">CENTRAL BANK</span>
              </div>
              <div className="flex items-center gap-1">
                <div className={`w-1.5 h-1.5 rounded-full ${step === 'central-process' ? 'bg-secondary animate-pulse' : 'bg-success'}`} />
                <span className="text-[0.55rem] text-text-muted font-[family-name:var(--font-mono)]">
                  {step === 'central-process' ? pt.processing : pt.ready}
                </span>
              </div>
            </div>
            <span className="text-[0.55rem] text-text-muted font-[family-name:var(--font-mono)]">{pt.clearing}</span>
          </div>

          <div className={`w-6 h-0.5 rotate-90 transition-colors duration-300 ${
            step === 'to-bank-b' || step === 'bank-b-credit' ? 'bg-primary' : 'bg-border'
          }`} />

          <div className={`w-full rounded-lg p-3 border transition-all duration-500 ${
            step === 'bank-b-credit' ? 'border-success/50 bg-success/5' :
            step === 'done' && direction === 'a-to-b' ? 'border-success/50 bg-success/5' :
            'border-border bg-bg-surface/30'
          }`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="1.5"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg>
                <span className="mono-label text-primary text-[0.6rem]">BANK B</span>
              </div>
              <span className="text-lg font-[family-name:var(--font-heading)] font-bold text-text-primary">€{balanceB.toFixed(2)}</span>
            </div>
            <span className="text-[0.55rem] text-text-muted font-[family-name:var(--font-mono)]">NL91 ABNA 0417 1643 00</span>
          </div>
        </div>

        {/* Desktop/Tablet: horizontal row */}
        <div className="hidden sm:flex items-center justify-between gap-2 mb-6">
          {/* Bank A */}
          <div className={`flex-1 rounded-lg p-4 border transition-all duration-500 ${
            step === 'bank-a-debit' ? 'border-warning/50 bg-warning/5' :
            step === 'done' && direction === 'b-to-a' ? 'border-success/50 bg-success/5' :
            'border-border bg-bg-surface/30'
          }`}>
            <div className="flex items-center gap-2 mb-2">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="1.5"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg>
              <span className="mono-label text-primary text-[0.6rem]">BANK A</span>
            </div>
            <span className="text-xl font-[family-name:var(--font-heading)] font-bold text-text-primary block">€{balanceA.toFixed(2)}</span>
            <span className="text-[0.55rem] text-text-muted font-[family-name:var(--font-mono)]">BE71 0961 2345 6769</span>
          </div>

          <div className="flex flex-col items-center gap-1 shrink-0">
            <div className={`h-0.5 w-10 transition-colors duration-300 ${
              step === 'to-central' || step === 'bank-a-debit' ? 'bg-primary' : 'bg-border'
            }`} />
            {(step === 'to-central' && direction === 'a-to-b') || (step === 'to-bank-b' && direction === 'b-to-a') ? (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-[0.5rem] text-primary font-[family-name:var(--font-mono)]">
                {direction === 'a-to-b' ? '→' : '←'}
              </motion.div>
            ) : null}
          </div>

          {/* Central Bank */}
          <div className={`flex-1 rounded-lg p-4 border transition-all duration-500 ${
            step === 'central-process' ? 'border-secondary/50 bg-secondary/5' : 'border-border bg-bg-surface/30'
          }`}>
            <div className="flex items-center gap-2 mb-2">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--secondary)" strokeWidth="1.5"><path d="M3 21h18M3 10h18M5 6l7-3 7 3M4 10v11M20 10v11M8 14v3M12 14v3M16 14v3"/></svg>
              <span className="mono-label text-secondary text-[0.6rem]">CENTRAL BANK</span>
            </div>
            <span className="text-[0.6rem] text-text-muted font-[family-name:var(--font-mono)] block">{pt.clearing}</span>
            <div className="flex items-center gap-1 mt-1">
              <div className={`w-1.5 h-1.5 rounded-full ${step === 'central-process' ? 'bg-secondary animate-pulse' : 'bg-success'}`} />
              <span className="text-[0.55rem] text-text-muted font-[family-name:var(--font-mono)]">
                {step === 'central-process' ? pt.processing : pt.ready}
              </span>
            </div>
          </div>

          <div className="flex flex-col items-center gap-1 shrink-0">
            <div className={`h-0.5 w-10 transition-colors duration-300 ${
              step === 'to-bank-b' || step === 'bank-b-credit' ? 'bg-primary' : 'bg-border'
            }`} />
            {(step === 'to-bank-b' && direction === 'a-to-b') || (step === 'to-central' && direction === 'b-to-a') ? (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-[0.5rem] text-primary font-[family-name:var(--font-mono)]">
                {direction === 'a-to-b' ? '→' : '←'}
              </motion.div>
            ) : null}
          </div>

          {/* Bank B */}
          <div className={`flex-1 rounded-lg p-4 border transition-all duration-500 ${
            step === 'bank-b-credit' ? 'border-success/50 bg-success/5' :
            step === 'done' && direction === 'a-to-b' ? 'border-success/50 bg-success/5' :
            'border-border bg-bg-surface/30'
          }`}>
            <div className="flex items-center gap-2 mb-2">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="1.5"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg>
              <span className="mono-label text-primary text-[0.6rem]">BANK B</span>
            </div>
            <span className="text-xl font-[family-name:var(--font-heading)] font-bold text-text-primary block">€{balanceB.toFixed(2)}</span>
            <span className="text-[0.55rem] text-text-muted font-[family-name:var(--font-mono)]">NL91 ABNA 0417 1643 00</span>
          </div>
        </div>

        {/* Transfer Controls */}
        <span className="mono-label text-text-muted text-[0.6rem] block mb-3">{pt.transfer}</span>
        <div className="flex flex-col sm:flex-row gap-2 mb-4">
          <button
            onClick={() => !isActive && setDirection(direction === 'a-to-b' ? 'b-to-a' : 'a-to-b')}
            disabled={isActive}
            className="px-3 py-2 rounded-lg text-[0.65rem] font-[family-name:var(--font-mono)] bg-bg-surface/50 border border-border text-text-secondary hover:border-primary/40 disabled:opacity-30 transition-all flex items-center gap-2 justify-center"
          >
            <span>{fromLabel}</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            <span>{toLabel}</span>
          </button>
          <div className="relative flex-1">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted text-sm">€</span>
            <input
              type="number"
              value={sendAmount}
              onChange={(e) => setSendAmount(e.target.value)}
              placeholder="0.00"
              disabled={isActive}
              className="w-full bg-bg-surface/50 border border-border rounded-lg pl-7 pr-4 py-2 text-sm text-text-primary placeholder:text-text-muted/50 focus:outline-none focus:border-primary/40 disabled:opacity-30 transition-colors"
            />
          </div>
          <button
            onClick={runTransfer}
            disabled={isActive || !sendAmount || parseFloat(sendAmount) <= 0}
            className="px-5 py-2 rounded-lg text-sm font-[family-name:var(--font-mono)] bg-primary/15 text-primary border border-primary/30 hover:bg-primary/25 disabled:opacity-30 transition-all"
          >
            {isActive ? pt.processingBtn : pt.send}
          </button>
        </div>

        {/* Route Info */}
        <div className="flex items-start gap-2 mb-4 px-3 py-2 rounded-lg bg-bg-surface/20 border border-border/50">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--text-muted)" strokeWidth="1.5" className="shrink-0 mt-0.5"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/></svg>
          <span className="text-[0.55rem] sm:text-[0.6rem] text-text-muted font-[family-name:var(--font-mono)] break-all">
            {pt.route}: {fromLabel} → /api/central/clearing → {toLabel} | {pt.protocol}: SEPA CT
          </span>
        </div>

        {/* Transfer Logs */}
        {logs.length > 0 && (
          <div>
            <span className="mono-label text-text-muted text-[0.6rem] block mb-2">{pt.log}</span>
            <div className="bg-bg-deep/50 rounded-lg p-3 max-h-[160px] overflow-y-auto border border-border/30">
              {logs.map((log, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -5 }}
                  animate={{ opacity: 1, x: 0 }}
                  className={`text-[0.6rem] font-[family-name:var(--font-mono)] py-0.5 ${
                    log.includes('[SUCCESS]') ? 'text-success' :
                    log.includes('[CENTRAL]') ? 'text-secondary' :
                    log.includes('[ROUTE]') ? 'text-warning' :
                    log.includes('[AUTH]') ? 'text-warning' :
                    'text-text-muted'
                  }`}
                >
                  {log}
                </motion.div>
              ))}
              <div ref={logsEndRef} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function ProjectDemo({ projectId }: { projectId: string }) {
  if (projectId === 'vmware') return <VMwareDemo />;
  if (projectId === 'mirrorhire') return <MirrorHireDemo />;
  if (projectId === 'pingfin') return <PingFinDemo />;
  return null;
}

function ProjectDetail({ project, onClose }: { project: Project; onClose: () => void }) {
  const { t } = useLanguage();
  const projectT = t.projects.items[project.id as keyof typeof t.projects.items];
  const overlayRef = useRef<HTMLDivElement>(null);
  const [showDemo, setShowDemo] = useState(false);

  useEffect(() => {
    document.documentElement.style.overflow = 'hidden';
    if (overlayRef.current) overlayRef.current.scrollTop = 0;
    return () => { document.documentElement.style.overflow = ''; };
  }, []);

  return (
    <motion.div
      ref={overlayRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 overflow-y-auto overscroll-contain"
      style={{ height: '100dvh', width: '100vw', background: '#080F14' }}
      onClick={onClose}
    >
      <div className="flex items-start justify-center min-h-full px-2 sm:px-4 py-8 sm:py-20">
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.98 }}
          transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
          className="relative w-full max-w-4xl glass-card rounded-xl"
          onClick={(e) => e.stopPropagation()}
        >
        <div className="flex items-center justify-between px-6 py-4 border-b border-border bg-bg-surface/50">
          <div className="flex items-center gap-3">
            {project.featured && <span className="featured-badge">{t.projects.featured}</span>}
            {project.teamProject && <span className="team-badge">{t.projects.team}</span>}
            {!project.teamProject && project.featured && (
              <span className="tech-tag text-[0.65rem]">{t.projects.soloProject}</span>
            )}
            <span className="mono-label text-text-muted">{projectT.category}</span>
          </div>
          <button onClick={onClose} className="interactive text-text-muted hover:text-text-primary p-1 transition-colors">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12"/></svg>
          </button>
        </div>

        <div className="p-4 sm:p-6 md:p-8 space-y-6 sm:space-y-8">
          <div>
            <span className="section-number">{project.number}</span>
            <h3 className="heading-lg text-2xl md:text-3xl text-text-primary mt-2">{projectT.title}</h3>
            <p className="text-text-secondary mt-1">{projectT.subtitle}</p>
          </div>

          {project.id === 'vmware' && project.architecture && (
            <VMwareArchitecture nodes={project.architecture} />
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <CaseStudyBlock title={t.projects.theChallenge} content={projectT.challenge} />
            <CaseStudyBlock title={t.projects.theApproach} content={projectT.approach} />
          </div>

          <CaseStudyBlock title={t.projects.myRole} content={projectT.role} />

          {project.id === 'pingfin' && 'teamDisclaimer' in projectT && (
            <div className="p-4 rounded-lg bg-secondary/5 border border-secondary/15">
              <p className="text-sm text-text-secondary leading-relaxed">
                {(projectT as typeof t.projects.items.pingfin).teamDisclaimer}
              </p>
            </div>
          )}

          <div>
            <h4 className="mono-label text-primary mb-3">{t.projects.technologies}</h4>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <span key={tech} className="tech-tag">{tech}</span>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <CaseStudyBlock title={t.projects.results} content={projectT.results} />
            <CaseStudyBlock title={t.projects.whatILearned} content={projectT.lessons} />
          </div>

          {/* Interactive Demo */}
          <div className="pt-4 border-t border-border">
            <div className="flex justify-center">
              <button
                onClick={() => setShowDemo(!showDemo)}
                className={`group flex items-center gap-3 px-6 py-3 rounded-lg font-[family-name:var(--font-mono)] text-sm transition-all duration-300 ${
                  showDemo
                    ? 'bg-primary/15 text-primary border border-primary/30'
                    : 'bg-bg-surface/80 text-text-muted border border-border hover:border-primary/40 hover:text-primary'
                }`}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={`transition-transform duration-300 ${showDemo ? 'rotate-90' : 'group-hover:translate-x-0.5'}`}>
                  <polygon points="5 3 19 12 5 21 5 3" fill={showDemo ? 'currentColor' : 'none'} />
                </svg>
                {showDemo ? 'CLOSE DEMO' : 'INTERACTIVE DEMO'}
              </button>
            </div>

            <AnimatePresence>
              {showDemo && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
                  className="overflow-hidden mt-6"
                >
                  <ProjectDemo projectId={project.id} />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {project.githubUrl && (
            <div className="pt-4 border-t border-border">
              <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="btn-ghost interactive">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
                {t.projects.viewGithub}
              </a>
            </div>
          )}
        </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

function CaseStudyBlock({ title, content }: { title: string; content: string }) {
  return (
    <div>
      <h4 className="mono-label text-primary mb-2">{title}</h4>
      <p className="text-sm text-text-secondary leading-relaxed">{content}</p>
    </div>
  );
}

function ProjectCard({ project, onClick, index }: { project: Project; onClick: () => void; index: number }) {
  const { t } = useLanguage();
  const projectT = t.projects.items[project.id as keyof typeof t.projects.items];

  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ duration: 0.3 }}
      className="glass-card rounded-xl overflow-hidden cursor-pointer group w-full"
      onClick={onClick}
    >
      <div className={`p-6 md:p-8 ${project.featured ? 'md:flex md:gap-8 md:items-start' : ''}`}>
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-4">
            <span className="font-[family-name:var(--font-mono)] text-3xl md:text-4xl font-bold text-border group-hover:text-primary/30 transition-colors duration-500">
              {project.number}
            </span>
            <div className="flex gap-2">
              {project.featured && <span className="featured-badge">{t.projects.featured}</span>}
              {project.teamProject && <span className="team-badge">{t.projects.team}</span>}
              {!project.teamProject && project.featured && (
                <span className="tech-tag text-[0.6rem]">{t.projects.soloProject}</span>
              )}
            </div>
          </div>
          <span className="mono-label text-text-muted text-[0.6rem] mb-2 block">{projectT.category}</span>
          <h3 className="font-[family-name:var(--font-heading)] text-xl md:text-2xl font-semibold text-text-primary mb-2 group-hover:text-primary transition-colors duration-300">
            {projectT.title}
          </h3>
          <p className="text-sm text-text-secondary mb-4 max-w-xl">{projectT.subtitle}</p>
          <p className="text-sm text-text-muted leading-relaxed max-w-2xl mb-6">
            {projectT.description}
          </p>
        </div>

        {project.featured && project.architecture && (
          <div className="hidden md:block md:w-[340px] lg:w-[400px] shrink-0">
            <div className="grid grid-cols-2 gap-2">
              {project.architecture.slice(0, 4).map((node) => (
                <div key={node.id} className="flex items-center gap-2 px-3 py-2 rounded-md bg-bg-surface/50 border border-border/50">
                  <div className="w-1.5 h-1.5 rounded-full bg-success" />
                  <span className="font-[family-name:var(--font-mono)] text-[0.6rem] text-text-muted">{node.label}</span>
                </div>
              ))}
            </div>
            <div className="mt-2 text-right">
              <span className="status-online text-[0.55rem]">{t.projects.allOnline}</span>
            </div>
          </div>
        )}
      </div>

      <div className="px-6 md:px-8 pb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div className="flex flex-wrap gap-1.5">
          {project.technologies.slice(0, 5).map((tech) => (
            <span key={tech} className="tech-tag text-[0.6rem]">{tech}</span>
          ))}
          {project.technologies.length > 5 && (
            <span className="tech-tag text-[0.6rem] opacity-60">+{project.technologies.length - 5}</span>
          )}
        </div>
        <span className="mono-label text-text-muted group-hover:text-primary transition-colors flex items-center gap-1 shrink-0 self-end sm:self-auto">
          {t.projects.explore}
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="group-hover:translate-x-1 transition-transform"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
        </span>
      </div>
    </motion.div>
  );
}

export default function Projects() {
  const { t } = useLanguage();
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <section id="projects" className="relative py-16 sm:py-24 md:py-32 overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-30" />
      <div className="relative max-w-6xl mx-auto px-6">
        <ScrollReveal>
          <div className="flex items-center gap-4 mb-4">
            <span className="section-number">04</span>
            <div className="glow-line flex-1 max-w-[60px]" />
            <span className="section-label">{t.projects.sectionLabel}</span>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <h2 className="heading-lg text-3xl sm:text-4xl md:text-5xl text-text-primary mb-4">
            {t.projects.heading}<span className="text-primary">{t.projects.headingHighlight}</span>
          </h2>
          <p className="text-text-muted max-w-xl mb-12">
            {t.projects.description}
          </p>
        </ScrollReveal>

        <div className="space-y-6">
          {projects.map((project, i) => (
            <ScrollReveal key={project.id} delay={i * 0.12}>
              <ProjectCard project={project} onClick={() => setSelectedProject(project)} index={i} />
            </ScrollReveal>
          ))}
        </div>
      </div>

      {typeof document !== 'undefined' && createPortal(
        <AnimatePresence>
          {selectedProject && (
            <ProjectDetail project={selectedProject} onClose={() => setSelectedProject(null)} />
          )}
        </AnimatePresence>,
        document.body
      )}
    </section>
  );
}
