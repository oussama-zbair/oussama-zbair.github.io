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
      role: "Software Engineering Intern – Web Full Stack Developer",
      company: "Skills Conseil Dev (Skills & Smart Group)",
      location: "Casablanca, Morocco",
      period: "Feb 2025 – Jul 2025",
      description: [
        "Designed and developed a full-stack insurance web platform for mobile and electronic device coverage",
        "Built secure REST APIs in Spring Boot 3 for user authentication, policy management, and claims processing",
        "Integrated advanced features: Google 2FA, Firebase email verification, file uploads, JWT security, reCAPTCHA",
        "Developed fully responsive dashboards with React (Vite) for clients, admins, managers, and providers",
        "Implemented PostgreSQL database schema with complex relations for users, contracts, claims, and devices",
        "Followed agile methodology and managed source code via Bitbucket, with CI/CD delivery using Docker"
      ],
      technologies: ["Spring Boot", "React", "PostgreSQL", "JWT", "Docker", "Firebase", "Google Authenticator", "Tailwind CSS"]
    },
    {
      id: 2,
      role: "Java Software Engineering Intern",
      company: "Prefecture of Inzegane Ait Melloul – Ministry of Interior",
      location: "Agadir, Morocco",
      period: "Jul 2023 – Sep 2023",
      description: [
        "Developed a document management system to organize, classify, and search legal and administrative files",
        "Implemented CRUD operations in Java Swing with JDBC for multi-user interaction",
        "Built authentication and authorization layer with user role management and session handling",
        "Improved UI/UX by adding Bootstrap-integrated design and real-time PDF preview features",
        "Delivered a professional software solution for local administration’s digital transition"
      ],
      technologies: ["Java", "Swing", "JDBC", "MySQL", "Bootstrap", "MVC"]
    },
    {
      id: 3,
      role: "Full Stack Developer – Personal Projects & Freelance",
      company: "GitHub @oussama-zbair",
      location: "Remote",
      period: "2023 – Present",
      description: [
        "Built professional full-stack projects such as a Currency Converter (Spring Boot + React) and OCR tool (Flask)",
        "Developed an image background remover app using U²-Net model with Flask, PyTorch, OpenCV",
        "Created an animated weather web app with OpenWeatherMap API and Mapbox for location detection",
        "Configured CI/CD pipelines and deployed apps with Jenkins, Docker, and Ansible on AWS EC2",
        "Maintained high-quality documentation with Markdown, UML, LaTeX and published projects on GitHub"
      ],
      technologies: ["Spring Boot", "React", "Flask", "PyTorch", "Docker", "Jenkins", "AWS", "OpenCV", "CI/CD"]
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
