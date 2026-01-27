export interface PersonalInfo {
  name: string;
  firstName: string;
  lastName: string;
  title: string;
  location: string;
  experience: string;
  freelance: string;
  bio: string;
  shortBio: string;
  email: string;
  calendlyUrl: string;
}

export interface SocialLink {
  name: string;
  url: string;
  icon: string;
}

export interface Skill {
  name: string;
  level: number;
  icon?: string;
}

export interface SkillCategory {
  title: string;
  skills: Skill[];
}

export interface Project {
  title: string;
  description: string;
  image: string;
  tags: string[];
  category: string[];
  liveUrl?: string;
  codeUrl?: string;
  backendUrl?: string;
  frontendUrl?: string;
}

export interface Experience {
  title: string;
  company: string;
  location: string;
  period: string;
  responsibilities: string[];
  technologies: string[];
}

export interface Certification {
  title: string;
  issuer: string;
  date: string;
  id: string;
  verifyUrl?: string;
  badge?: string;
  isLatest?: boolean;
}

// Personal Information
export const personalInfo: PersonalInfo = {
  name: 'Oussama Zbair',
  firstName: 'Oussama',
  lastName: 'Zbair',
  title: 'Software Engineer & Full Stack Developer',
  location: 'Morocco',
  experience: '2+ years',
  freelance: 'Available',
  bio: "I'm a passionate Software Engineer with expertise in full-stack development. My journey in programming started with a curiosity about how websites work, and evolved into a deep love for creating elegant, efficient software solutions. With several years of experience in web development, I specialize in building scalable and performant applications using modern technologies. I'm particularly interested in cloud architecture, DevOps practices, and creating smooth user experiences. When I'm not coding, I enjoy contributing to open source projects, writing technical articles, and staying updated with the latest industry trends.",
  shortBio: 'I build modern web applications with a focus on performance, scalability, and exceptional user experiences. Passionate about creating innovative software solutions.',
  email: 'contact@oussamazbair.me',
  calendlyUrl: 'https://calendly.com/oussama-zbair',
};

// Social Links
export const socialLinks: SocialLink[] = [
  {
    name: 'GitHub',
    url: 'https://github.com/oussama-zbair',
    icon: 'github',
  },
  {
    name: 'LinkedIn',
    url: 'https://www.linkedin.com/in/oussama-zbair',
    icon: 'linkedin',
  },
];

// Skills Data
export const skillCategories: SkillCategory[] = [
  {
    title: 'Backend & Java',
    skills: [
      { name: 'Java', level: 95 },
      { name: 'Spring Boot', level: 90 },
      { name: 'JPA/Hibernate', level: 85 },
      { name: 'Maven/Gradle', level: 85 },
      { name: 'JUnit/Mockito', level: 80 },
      { name: 'RESTful APIs', level: 90 },
    ],
  },
  {
    title: 'Frontend',
    skills: [
      { name: 'React', level: 95 },
      { name: 'TypeScript', level: 90 },
      { name: 'JavaScript', level: 95 },
      { name: 'HTML/CSS', level: 95 },
      { name: 'Next.js', level: 85 },
      { name: 'Tailwind CSS', level: 90 },
    ],
  },
  {
    title: 'Database & DevOps',
    skills: [
      { name: 'Oracle', level: 85 },
      { name: 'PostgreSQL', level: 85 },
      { name: 'MongoDB', level: 80 },
      { name: 'Docker', level: 85 },
      { name: 'Jenkins', level: 80 },
      { name: 'Git', level: 90 },
    ],
  },
];

export const additionalTechnologies: string[] = [
  'Microservices', 'Spring Security', 'Spring Cloud', 'RabbitMQ', 'Apache Kafka',
  'Elasticsearch', 'Redis', 'WebSockets', 'OAuth2', 'JWT', 'Vue.js', 'Redux',
  'SASS', 'Material UI', 'Figma', 'Jest', 'Cypress', 'Firebase', 'Strapi',
  'Webpack', 'Babel', 'Vercel', 'Netlify', 'GitHub Actions', 'Jira'
];

// Projects Data
export const projects: Project[] = [
  {
    title: 'Ethera - Audio Harmony Platform',
    description: 'Full-stack audio conversion platform that transforms standard 440 Hz tuning to natural 432 Hz frequency. Features YouTube video conversion, local file upload (MP3/WAV/FLAC), real-time audio visualization, and secure download endpoints.',
    image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=600&q=80',
    tags: ['React 19', 'TypeScript', 'Spring Boot 3.x', 'Java 17', 'FFmpeg', 'yt-dlp', 'Web Audio API', 'Tailwind CSS'],
    category: ['Full-Stack', 'Audio'],
    backendUrl: 'https://github.com/oussama-zbair/Ethera-backend',
    frontendUrl: 'https://github.com/oussama-zbair/Ethera-frontend',
  },
  {
    title: 'Insurance Management Platform (PFE)',
    description: 'Multi-role insurance management platform for electronic and appliance coverage. Features JWT auth, 2FA, device registration, claims, admin dashboard, and secure CI/CD deployment.',
    image: 'https://images.unsplash.com/photo-1605902711622-cfb43c4437d2?auto=format&fit=crop&w=600&q=80',
    tags: ['Spring Boot', 'React', 'JWT', 'Firebase', 'Docker', 'PostgreSQL'],
    category: ['Full-Stack', 'Security'],
    codeUrl: 'https://github.com/oussama-zbair/insurance-platform',
  },
  {
    title: 'Document Management System (DMS)',
    description: 'Desktop app for document workflow, advanced search, and user access control. Developed for the Moroccan Ministry of Interior using Electron.js and deployed on Windows servers.',
    image: 'https://images.unsplash.com/photo-1537432376769-00a5f1be3cbb?auto=format&fit=crop&w=600&q=80',
    tags: ['Electron.js', 'React', 'Node.js', 'MySQL', 'Socket.io'],
    category: ['Desktop', 'Full-Stack'],
    codeUrl: 'https://github.com/oussama-zbair/desktop-doc-manager',
  },
  {
    title: 'CurrencyXchange',
    description: 'Real-time currency converter with geolocation and dynamic exchange rate data. Frontend built with React, backend Spring Boot WebFlux, deployed on Azure with CI/CD.',
    image: 'https://images.unsplash.com/photo-1588776814546-0fef3d9a6d67?auto=format&fit=crop&w=600&q=80',
    tags: ['Spring Boot', 'React', 'WebFlux', 'REST API', 'Azure'],
    category: ['Full-Stack', 'Finance'],
    liveUrl: 'https://green-sea-0ad5cce03.1.azurestaticapps.net/',
    codeUrl: 'https://github.com/oussama-zbair/CurrencyXchange-Backend',
  },
  {
    title: 'ImgBGRemoval',
    description: 'AI-powered image background remover using Flask and U²-Net deep learning. Upload an image, remove the background, and download the result instantly.',
    image: 'https://images.unsplash.com/photo-1580894732444-8ecded7900c8?auto=format&fit=crop&w=600&q=80',
    tags: ['Python', 'Flask', 'PyTorch', 'OpenCV'],
    category: ['AI', 'ML'],
    codeUrl: 'https://github.com/oussama-zbair/ImgBGRemoval',
  },
  {
    title: 'QuizMaster',
    description: 'Gamified quiz app with real-time scoring and category-based learning. Built with modern React stack and animated UI.',
    image: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=600&q=80',
    tags: ['React', 'Vite', 'TypeScript', 'Tailwind', 'Framer Motion'],
    category: ['Frontend', 'Learning', 'Education'],
    liveUrl: 'https://quiz-master-dojo.vercel.app/',
    codeUrl: 'https://github.com/oussama-zbair/QuizMaster',
  },
  {
    title: 'ClassroomLite',
    description: 'Student-teacher assignment submission and grading system developed using Django and SQLite. Clean UI, secure role-based access, and feedback workflows.',
    image: 'https://images.unsplash.com/photo-1584697964154-33ad5d07ef0e?auto=format&fit=crop&w=600&q=80',
    tags: ['Django', 'SQLite', 'Bootstrap', 'jQuery'],
    category: ['Full-Stack', 'Education'],
    codeUrl: 'https://github.com/oussama-zbair/ClassroomLite',
  },
  {
    title: 'Vulnerability Score Prediction (ML)',
    description: 'Machine learning project predicting vulnerability scores using Random Forest, SVM, and Neural Networks. Includes Jupyter notebooks and visual analysis.',
    image: 'https://images.unsplash.com/photo-1581091870632-2c4464c14299?auto=format&fit=crop&w=600&q=80',
    tags: ['Python', 'scikit-learn', 'TensorFlow', 'pandas'],
    category: ['ML', 'Security'],
    codeUrl: 'https://github.com/oussama-zbair/vulnerability-detection-notebook',
  },
  {
    title: 'Weather App',
    description: 'Interactive weather forecast platform using Next.js, Mapbox and OpenWeatherMap. Explore weather worldwide via geolocation and dynamic maps.',
    image: 'https://images.unsplash.com/photo-1611866098054-1d0858d16d6d?auto=format&fit=crop&w=600&q=80',
    tags: ['Next.js', 'Mapbox', 'OpenWeatherMap', 'Tailwind'],
    category: ['Frontend', 'Full-Stack'],
    liveUrl: 'https://weather-world-view.vercel.app/',
    codeUrl: 'https://github.com/oussama-zbair/weather-app',
  },
];

// Experience Data
export const experiences: Experience[] = [
  {
    title: 'Java Software Engineer',
    company: 'Confidential',
    location: 'Rabat, Morocco',
    period: 'Jan 2023 – Present',
    responsibilities: [
      'Developed robust backend solutions using Java and Spring Boot frameworks',
      'Implemented secure RESTful APIs with JWT authentication and RBAC authorization',
      'Refactored and optimized legacy codebase to enhance maintainability and performance',
      'Contributed to clean technical documentation and improved developer onboarding',
    ],
    technologies: ['Java', 'Spring Boot', 'JWT', 'RBAC', 'REST APIs', 'Code Refactoring'],
  },
  {
    title: 'Software Engineer (Final Year Internship)',
    company: 'Skills & Smart Group',
    location: 'Casablanca, Morocco',
    period: 'Mar 2025 – Sept 2025',
    responsibilities: [
      'Designed and implemented secure REST APIs with authentication and user management for web-based insurance management platform',
      'Developed interactive web dashboards and forms for multiple user roles with comprehensive functionality',
      'Set up automated CI/CD pipelines with integrated testing and deployment processes',
      'Improved code quality through comprehensive unit testing and detailed technical documentation',
      'Implemented secure user authentication, authorization systems, and data protection measures',
    ],
    technologies: ['Spring Boot', 'React', 'PostgreSQL', 'JWT', 'Docker', 'CI/CD', 'REST APIs', 'Unit Testing'],
  },
  {
    title: 'Full Stack Developer Intern',
    company: 'Ministry of Interior',
    location: 'Rabat, Morocco',
    period: 'Jun 2024 – Oct 2024',
    responsibilities: [
      'Built an internal desktop document management application using Electron.js and React',
      'Integrated advanced user management, real-time activity tracking, and search features',
      'Boosted performance with indexing and caching strategies',
      'Documented system architecture and user workflows for effective handover',
    ],
    technologies: ['Electron.js', 'React', 'Node.js', 'Desktop App', 'Search Indexing', 'System Documentation'],
  },
  {
    title: 'Teaching Intern – Mathematics and Computer Science',
    company: 'Ministry of National Education',
    location: 'Agadir, Morocco',
    period: 'Jan 2023 – May 2023',
    responsibilities: [
      'Provided comprehensive support to students in applied mathematics and computer science subjects',
      'Delivered interactive workshops on programming fundamentals, networking concepts, and cybersecurity principles',
      'Developed engaging educational content and practical exercises for enhanced learning outcomes',
      'Mentored students in technical problem-solving and critical thinking methodologies',
    ],
    technologies: ['Teaching', 'Programming', 'Networking', 'Cybersecurity', 'Educational Technology'],
  },
];

// Certifications Data
export const certifications: Certification[] = [
  {
    title: 'Oracle Certified Professional: Java SE 17 Developer',
    issuer: 'Oracle',
    date: 'Aug 2025',
    id: 'OCP-JAVA-SE17',
    verifyUrl: 'https://catalog-education.oracle.com/ords/certview/sharebadge?id=849829866522B6FA742488FA939868C667EDB16772E28F8B6E73A2244074563F',
    badge: 'oracle',
    isLatest: true,
  },
  {
    title: 'Oracle Certified Professional, Java EE 7 Application Developer',
    issuer: 'Oracle',
    date: 'Jul 2025',
    id: 'OCP-JAVAEE7',
    verifyUrl: 'https://catalog-education.oracle.com/ords/certview/sharebadge?id=996DC26F0ED828BD1E44BA17FDF80E922F976193FFB4309053FB601B09B06C46',
    badge: 'oracle',
    isLatest: true,
  },
  {
    title: 'Oracle Cloud Infrastructure 2025 Certified Generative AI Professional',
    issuer: 'Oracle',
    date: 'Jul 2025',
    id: 'OCI-GAI-2025',
    verifyUrl: 'https://catalog-education.oracle.com/ords/certview/sharebadge?id=D82504154B0AE7FC580ED227EE9E04A0C9612B28F6A09B5CE8A0BC86FE764007',
    badge: 'oracle',
    isLatest: true,
  },
  {
    title: 'GitHub Foundations',
    issuer: 'GitHub',
    date: 'Mar 2025',
    id: 'GITHUB-FOUNDATIONS',
    verifyUrl: 'https://www.credly.com/badges/c23b7130-b6de-40d0-aaef-6df5a84660d8/public_url',
    badge: 'github',
    isLatest: true,
  },
  {
    title: 'Oracle Cloud Infrastructure 2024 Certified Associate',
    issuer: 'Oracle',
    date: 'Feb 2025',
    id: 'OCI-ASSOCIATE-2024',
    verifyUrl: 'https://catalog-education.oracle.com/pls/certview/sharebadge?id=D30E4CA29B911578359425C1B0F4CB37631053C50554D49F58B721BC1F9B7EB6',
    badge: 'oracle',
  },
  {
    title: 'Scrum Foundation Professional Certificate (SFPC)',
    issuer: 'CertiProf',
    date: 'Aug 2024',
    id: 'SFPC-2024',
    badge: 'certiprof',
  },
  {
    title: 'Certified Software Engineer',
    issuer: 'HackerRank',
    date: 'Aug 2024',
    id: '1dbd917c8d70',
    verifyUrl: 'https://www.hackerrank.com/certificates/1dbd917c8d70',
    badge: 'hackerrank',
  },
  {
    title: 'Software Engineering Specialization',
    issuer: 'The Hong Kong University of Science and Technology',
    date: 'Dec 2023',
    id: 'COURSERA-SE-SPEC',
    verifyUrl: 'https://coursera.org/share/2a4c7bb33799fbf42558c59a79db5e28',
    badge: 'coursera',
  },
  {
    title: 'Foundations of Cybersecurity',
    issuer: 'Google',
    date: 'Nov 2023',
    id: '831599c22e7d7256e8ee574d11a0cbf2',
    verifyUrl: 'https://coursera.org/share/831599c22e7d7256e8ee574d11a0cbf2',
    badge: 'google',
  },
  {
    title: 'Cybersecurity Fundamentals',
    issuer: 'IBM',
    date: 'Jan 2021',
    id: '9d19b0bb-62e8-426f-89e4-32ead2a42756',
    verifyUrl: 'https://www.youracclaim.com/badges/9d19b0bb-62e8-426f-89e4-32ead2a42756?source=linked_in_profile',
    badge: 'ibm',
  },
];

// Project filter categories
export const projectCategories: string[] = [
  'All', 'Full-Stack', 'Frontend', 'Desktop', 'AI', 'ML', 'Security', 'Finance', 'Education', 'Learning', 'Audio'
];
