import React from 'react';
import { Briefcase } from 'lucide-react';

interface ExperienceItem {
  id: number;
  role: string;
  company: string;
  location: string;
  period: string;
  description: string[];
  technologies: string[];
}

const ExperienceSection: React.FC = () => {
  const experiences: ExperienceItem[] = [
    {
      id: 1,
      role: "Java Software Engineer",
      company: "Confidential",
      location: "Rabat, Morocco",
      period: "Jan 2023 – Present",
      description: [
        "Developed robust backend solutions using Java and Spring Boot frameworks",
        "Implemented secure RESTful APIs with JWT authentication and RBAC authorization",
        "Refactored and optimized legacy codebase to enhance maintainability and performance",
        "Contributed to clean technical documentation and improved developer onboarding",
      ],
      technologies: ["Java", "Spring Boot", "JWT", "RBAC", "REST APIs", "Code Refactoring"]
    },
    {
      id: 2,
      role: "Software Engineer (Final Year Internship)",
      company: "Skills & Smart Group",
      location: "Casablanca, Morocco",
      period: "Mar 2025 – Sept 2025",
      description: [
        "Designed and implemented secure REST APIs with authentication and user management for web-based insurance management platform",
        "Developed interactive web dashboards and forms for multiple user roles with comprehensive functionality",
        "Set up automated CI/CD pipelines with integrated testing and deployment processes",
        "Improved code quality through comprehensive unit testing and detailed technical documentation",
        "Implemented secure user authentication, authorization systems, and data protection measures"
      ],
      technologies: ["Spring Boot", "React", "PostgreSQL", "JWT", "Docker", "CI/CD", "REST APIs", "Unit Testing"]
    },
    {
      id: 3,
      role: "Full Stack Developer Intern",
      company: "Ministry of Interior",
      location: "Rabat, Morocco",
      period: "Jun 2024 – Oct 2024",
      description: [
        "Built an internal desktop document management application using Electron.js and React",
        "Integrated advanced user management, real-time activity tracking, and search features",
        "Boosted performance with indexing and caching strategies",
        "Documented system architecture and user workflows for effective handover"
      ],
      technologies: ["Electron.js", "React", "Node.js", "Desktop App", "Search Indexing", "System Documentation"]
    },
    {
      id: 4,
      role: "Teaching Intern – Mathematics and Computer Science",
      company: "Ministry of National Education",
      location: "Agadir, Morocco",
      period: "Jan 2023 – May 2023",
      description: [
        "Provided comprehensive support to students in applied mathematics and computer science subjects",
        "Delivered interactive workshops on programming fundamentals, networking concepts, and cybersecurity principles",
        "Developed engaging educational content and practical exercises for enhanced learning outcomes",
        "Mentored students in technical problem-solving and critical thinking methodologies",
        "Collaborated with faculty to improve curriculum delivery and student engagement strategies"
      ],
      technologies: ["Teaching", "Programming", "Networking", "Cybersecurity", "Educational Technology"]
    }
  ];

  return (
    <section id="experience" className="section-container bg-dark-200">
      <div className="flex items-center justify-center mb-12">
        <Briefcase size={24} className="text-neon mr-3 animate-pulse-neon" />
        <h2 className="section-title mb-0">Professional Experience</h2>
      </div>

      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 top-0 bottom-0 w-1 bg-neon/20 rounded"></div>

        {/* Experience items */}
        <div className="space-y-12">
          {experiences.map((exp, index) => (
            <div key={exp.id} className={`relative flex flex-col md:flex-row ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
              <div className="md:w-1/2 p-4">
                <div className="glass-card p-6 hover:border-neon transition-all">
                  <h3 className="text-xl font-bold text-white mb-1">{exp.role}</h3>
                  <div className="flex items-center text-purple mb-4">
                    <span>{exp.company}</span>
                    <span className="mx-2 text-gray-500">•</span>
                    <span className="text-gray-400">{exp.location}</span>
                  </div>
                  <div className="mb-4">
                    <span className="inline-block bg-dark-300 text-neon px-3 py-1 rounded-full text-sm font-mono">
                      {exp.period}
                    </span>
                  </div>
                  <ul className="space-y-2 mb-4">
                    {exp.description.map((item, i) => (
                      <li key={i} className="text-gray-300 flex">
                        <span className="text-neon mr-2">›</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="flex flex-wrap gap-2">
                    {exp.technologies.map((tech, i) => (
                      <span key={i} className="px-2 py-1 text-xs font-mono bg-dark-300 text-gray-300 rounded">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <div className="md:w-1/2 hidden md:block"></div>

              {/* Timeline marker */}
              <div className="absolute left-0 md:left-1/2 transform -translate-y-1/2 md:-translate-x-1/2 top-10 w-6 h-6 rounded-full bg-neon shadow-lg shadow-neon/50 z-10"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
