/**
 * Personal Engineering Knowledge Base — Data Layer
 *
 * Each entry represents one topic/technology page.
 * Content lives in src/data/kb/<slug>.md, loaded via kbLoader.ts.
 */

export type KBCategory =
  | 'Programming'
  | 'Web Development'
  | 'Cloud Computing'
  | 'DevOps'
  | 'Artificial Intelligence'
  | 'Cybersecurity'
  | 'Software Engineering'
  | 'Databases'
  | 'Agile';

export type KBDifficulty = 'Beginner' | 'Intermediate' | 'Advanced';

export interface KBEntry {
  /** URL-safe identifier, also the .md filename */
  slug: string;
  title: string;
  subtitle: string;
  category: KBCategory;
  tags: string[];
  difficulty: KBDifficulty;
  /** ISO date of the last content update */
  lastUpdated: string;
  /** Estimated reading time in minutes */
  readingMinutes: number;
  /** Certifications this topic supports */
  certifications: string[];
  /** Whether to show a "new" badge */
  isNew?: boolean;
  /** Whether to pin to the top of the list */
  featured?: boolean;
}

export const kbEntries: KBEntry[] = [
  // ─── Programming ────────────────────────────────────────────────────────────
  {
    slug: 'java-core',
    title: 'Java Core',
    subtitle: 'OOP fundamentals, JVM internals, concurrency, and the Java SE 17 developer exam',
    category: 'Programming',
    tags: ['Java', 'OOP', 'JVM', 'Concurrency', 'Generics', 'Streams'],
    difficulty: 'Advanced',
    lastUpdated: '2025-08-01',
    readingMinutes: 35,
    certifications: ['Oracle Certified Professional: Java SE 17 Developer'],
    isNew: false,
    featured: true,
  },
  {
    slug: 'java-ee',
    title: 'Java EE 7',
    subtitle: 'Enterprise Java — EJBs, JPA, CDI, JAX-RS, and the Java EE 7 exam',
    category: 'Programming',
    tags: ['Java EE', 'EJB', 'JPA', 'CDI', 'JAX-RS', 'Servlets'],
    difficulty: 'Advanced',
    lastUpdated: '2025-07-15',
    readingMinutes: 30,
    certifications: ['Oracle Certified Professional: Java EE 7 Application Developer'],
    isNew: false,
    featured: true,
  },
  // ─── Web Development ────────────────────────────────────────────────────────
  {
    slug: 'spring-boot',
    title: 'Spring Boot',
    subtitle: 'Auto-configuration, REST APIs, security, data access, and production best practices',
    category: 'Web Development',
    tags: ['Spring Boot', 'Spring Security', 'JPA', 'REST', 'Microservices'],
    difficulty: 'Intermediate',
    lastUpdated: '2025-09-01',
    readingMinutes: 28,
    certifications: [],
    isNew: false,
    featured: true,
  },
  {
    slug: 'react',
    title: 'React',
    subtitle: 'Hooks, component patterns, state management, and performance optimization',
    category: 'Web Development',
    tags: ['React', 'Hooks', 'Context', 'Performance', 'Testing'],
    difficulty: 'Intermediate',
    lastUpdated: '2025-08-20',
    readingMinutes: 22,
    certifications: [],
    isNew: false,
    featured: false,
  },
  // ─── Cloud Computing ────────────────────────────────────────────────────────
  {
    slug: 'aws-cloud-practitioner',
    title: 'AWS Cloud Practitioner',
    subtitle: 'AWS global infrastructure, core services, pricing, and the CCP exam guide',
    category: 'Cloud Computing',
    tags: ['AWS', 'EC2', 'S3', 'IAM', 'VPC', 'Cloud'],
    difficulty: 'Beginner',
    lastUpdated: '2026-02-28',
    readingMinutes: 25,
    certifications: ['AWS Certified Cloud Practitioner'],
    isNew: true,
    featured: true,
  },
  {
    slug: 'oracle-cloud-oci',
    title: 'Oracle Cloud Infrastructure',
    subtitle: 'OCI compute, networking, storage, IAM, and the OCI Associate exam',
    category: 'Cloud Computing',
    tags: ['OCI', 'Oracle Cloud', 'Compute', 'Networking', 'IAM'],
    difficulty: 'Intermediate',
    lastUpdated: '2025-02-28',
    readingMinutes: 20,
    certifications: ['Oracle Cloud Infrastructure 2024 Certified Associate'],
    isNew: false,
    featured: false,
  },
  {
    slug: 'oracle-cloud-genai',
    title: 'OCI Generative AI Professional',
    subtitle: 'Large language models on OCI, embeddings, RAG, and the OCI GenAI exam',
    category: 'Artificial Intelligence',
    tags: ['OCI', 'Generative AI', 'LLM', 'RAG', 'Embeddings', 'Oracle'],
    difficulty: 'Intermediate',
    lastUpdated: '2025-07-15',
    readingMinutes: 22,
    certifications: ['Oracle Cloud Infrastructure 2025 Certified Generative AI Professional'],
    isNew: false,
    featured: false,
  },
  // ─── DevOps ─────────────────────────────────────────────────────────────────
  {
    slug: 'docker',
    title: 'Docker',
    subtitle: 'Containers, images, networking, volumes, Compose, and production patterns',
    category: 'DevOps',
    tags: ['Docker', 'Containers', 'Docker Compose', 'Networking'],
    difficulty: 'Intermediate',
    lastUpdated: '2025-06-01',
    readingMinutes: 20,
    certifications: [],
    isNew: false,
    featured: false,
  },
  {
    slug: 'kubernetes',
    title: 'Kubernetes & Cloud Native',
    subtitle: 'Pods, deployments, services, Helm, observability, and the KCNA exam',
    category: 'DevOps',
    tags: ['Kubernetes', 'K8s', 'Helm', 'Cloud Native', 'CNCF'],
    difficulty: 'Advanced',
    lastUpdated: '2025-05-01',
    readingMinutes: 32,
    certifications: ['Kubernetes and Cloud Native Essentials (The Linux Foundation)'],
    isNew: false,
    featured: false,
  },
  {
    slug: 'github-foundations',
    title: 'GitHub Foundations',
    subtitle: 'Git internals, GitHub workflows, Actions, collaboration, and the GitHub exam',
    category: 'DevOps',
    tags: ['GitHub', 'Git', 'GitHub Actions', 'CI/CD', 'Collaboration'],
    difficulty: 'Beginner',
    lastUpdated: '2025-03-15',
    readingMinutes: 18,
    certifications: ['GitHub Foundations'],
    isNew: false,
    featured: false,
  },
  // ─── Artificial Intelligence ─────────────────────────────────────────────────
  {
    slug: 'google-ai-professional',
    title: 'Google AI Professional',
    subtitle: 'Machine learning fundamentals, Vertex AI, responsible AI, and the Google AI exam',
    category: 'Artificial Intelligence',
    tags: ['AI', 'ML', 'Vertex AI', 'Google Cloud', 'Responsible AI'],
    difficulty: 'Intermediate',
    lastUpdated: '2026-03-31',
    readingMinutes: 26,
    certifications: ['Google AI Professional Certificate'],
    isNew: true,
    featured: true,
  },
  {
    slug: 'ai-for-everyone',
    title: 'AI For Everyone',
    subtitle: 'Non-technical AI literacy — strategy, ethics, workflow automation, and DeepLearning.AI',
    category: 'Artificial Intelligence',
    tags: ['AI Strategy', 'AI Ethics', 'DeepLearning.AI', 'Machine Learning'],
    difficulty: 'Beginner',
    lastUpdated: '2024-06-01',
    readingMinutes: 14,
    certifications: ['AI For Everyone'],
    isNew: false,
    featured: false,
  },
  // ─── Cybersecurity ───────────────────────────────────────────────────────────
  {
    slug: 'cybersecurity-fundamentals',
    title: 'Cybersecurity Fundamentals',
    subtitle: 'Threat models, cryptography, network security, and the IBM & Google certifications',
    category: 'Cybersecurity',
    tags: ['Cybersecurity', 'Cryptography', 'Network Security', 'IBM', 'Google'],
    difficulty: 'Beginner',
    lastUpdated: '2023-11-30',
    readingMinutes: 20,
    certifications: ['IBM Cybersecurity Fundamentals', 'Google Foundations of Cybersecurity'],
    isNew: false,
    featured: false,
  },
  // ─── Software Engineering ────────────────────────────────────────────────────
  {
    slug: 'software-engineering',
    title: 'Software Engineering',
    subtitle: 'SDLC, design patterns, architecture, testing, and the HKUST specialization',
    category: 'Software Engineering',
    tags: ['SDLC', 'Design Patterns', 'Architecture', 'Testing', 'Clean Code'],
    difficulty: 'Intermediate',
    lastUpdated: '2023-12-31',
    readingMinutes: 28,
    certifications: ['Software Engineering Specialization (HKUST)', 'Certified Software Engineer (HackerRank)'],
    isNew: false,
    featured: false,
  },
  {
    slug: 'system-design',
    title: 'System Design',
    subtitle: 'Scalability, load balancing, caching, databases, and distributed systems',
    category: 'Software Engineering',
    tags: ['System Design', 'Scalability', 'Load Balancing', 'Caching', 'Distributed Systems'],
    difficulty: 'Advanced',
    lastUpdated: '2025-07-01',
    readingMinutes: 35,
    certifications: [],
    isNew: false,
    featured: false,
  },
  // ─── Agile ───────────────────────────────────────────────────────────────────
  {
    slug: 'scrum',
    title: 'Scrum & Agile',
    subtitle: 'Scrum framework, ceremonies, roles, and the SFPC certification',
    category: 'Agile',
    tags: ['Scrum', 'Agile', 'Sprint', 'Product Backlog', 'CertiProf'],
    difficulty: 'Beginner',
    lastUpdated: '2024-08-31',
    readingMinutes: 15,
    certifications: ['Scrum Foundation Professional Certificate (SFPC)'],
    isNew: false,
    featured: false,
  },
];

/** All unique categories present in the knowledge base */
export const kbCategories: KBCategory[] = Array.from(
  new Set(kbEntries.map(e => e.category))
) as KBCategory[];

/** Category → accent color (Tailwind classes) */
export const categoryColors: Record<KBCategory, { bg: string; text: string; border: string }> = {
  'Programming':          { bg: 'bg-orange-500/10', text: 'text-orange-400',  border: 'border-orange-500/30' },
  'Web Development':      { bg: 'bg-cyan-500/10',   text: 'text-cyan-400',    border: 'border-cyan-500/30'   },
  'Cloud Computing':      { bg: 'bg-sky-500/10',    text: 'text-sky-400',     border: 'border-sky-500/30'    },
  'DevOps':               { bg: 'bg-violet-500/10', text: 'text-violet-400',  border: 'border-violet-500/30' },
  'Artificial Intelligence': { bg: 'bg-pink-500/10', text: 'text-pink-400',  border: 'border-pink-500/30'   },
  'Cybersecurity':        { bg: 'bg-red-500/10',    text: 'text-red-400',     border: 'border-red-500/30'    },
  'Software Engineering': { bg: 'bg-emerald-500/10',text: 'text-emerald-400', border: 'border-emerald-500/30'},
  'Databases':            { bg: 'bg-yellow-500/10', text: 'text-yellow-400',  border: 'border-yellow-500/30' },
  'Agile':                { bg: 'bg-teal-500/10',   text: 'text-teal-400',    border: 'border-teal-500/30'   },
};

/** Difficulty → color */
export const difficultyColors: Record<KBDifficulty, { text: string; dot: string }> = {
  Beginner:     { text: 'text-emerald-400', dot: 'bg-emerald-400' },
  Intermediate: { text: 'text-amber-400',   dot: 'bg-amber-400'   },
  Advanced:     { text: 'text-red-400',     dot: 'bg-red-400'     },
};
