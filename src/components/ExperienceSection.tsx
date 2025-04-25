
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
      role: "Senior Software Engineer",
      company: "Tech Solutions Inc.",
      location: "Remote",
      period: "Jan 2022 - Present",
      description: [
        "Lead a team of 5 developers working on a microservices-based e-commerce platform",
        "Implemented CI/CD pipelines that reduced deployment time by 40%",
        "Redesigned the authentication system, improving security and user experience",
        "Mentored junior developers through code reviews and pair programming sessions"
      ],
      technologies: ["React", "Node.js", "Docker", "AWS", "GraphQL"]
    },
    {
      id: 2,
      role: "Full Stack Developer",
      company: "Digital Innovations",
      location: "Casablanca, Morocco",
      period: "Mar 2020 - Dec 2021",
      description: [
        "Developed and maintained multiple client web applications from concept to deployment",
        "Built RESTful APIs and integrated third-party services",
        "Optimized database queries resulting in 30% faster page loads",
        "Collaborated with UX/UI designers to implement responsive designs"
      ],
      technologies: ["JavaScript", "React", "Express", "MongoDB", "Redux"]
    },
    {
      id: 3,
      role: "Frontend Developer",
      company: "WebCraft Studios",
      location: "Rabat, Morocco",
      period: "Jun 2018 - Feb 2020",
      description: [
        "Created interactive web interfaces for client projects",
        "Implemented responsive designs ensuring cross-browser compatibility",
        "Participated in Agile development cycles with two-week sprints",
        "Reduced bundle size by 35% through code splitting and lazy loading"
      ],
      technologies: ["HTML5", "CSS3", "JavaScript", "jQuery", "Bootstrap"]
    }
  ];

  return (
    <section id="experience" className="section-container bg-dark-200">
      <div className="flex items-center justify-center mb-12">
        <Briefcase size={24} className="text-neon mr-3 animate-pulse-neon" />
        <h2 className="section-title mb-0">Work Experience</h2>
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
