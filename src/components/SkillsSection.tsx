import React from 'react';
import { Settings } from 'lucide-react';
import TechLogo from './TechLogo';

const SkillsSection: React.FC = () => {
  const categories = [
    {
      name: "Backend & Java",
      skills: [
        { name: "Java", level: 95 },
        { name: "Spring Boot", level: 90 },
        { name: "JPA/Hibernate", level: 85 },
        { name: "Maven/Gradle", level: 85 },
        { name: "JUnit/Mockito", level: 80 },
        { name: "RESTful APIs", level: 90 },
      ]
    },
    {
      name: "Frontend",
      skills: [
        {
          name: "React",
          level: 95,
          icon: <Code className="w-5 h-5 text-neon" />
        },
        {
          name: "TypeScript",
          level: 90,
          icon: <Code className="w-5 h-5 text-neon" />
        },
        {
          name: "JavaScript",
          level: 95,
          icon: <Code className="w-5 h-5 text-neon" />
        },
        {
          name: "HTML/CSS",
          level: 95,
          icon: <Code className="w-5 h-5 text-neon" />
        },
        {
          name: "Next.js",
          level: 85,
          icon: <Code className="w-5 h-5 text-neon" />
        },
        {
          name: "Tailwind CSS",
          level: 90,
          icon: <Code className="w-5 h-5 text-neon" />
        }
      ]
    },
    {
      name: "Database & DevOps",
      skills: [
        { name: "Oracle", level: 85, icon: <Code className="w-5 h-5 text-neon" /> },
        { name: "PostgreSQL", level: 85, icon: <Code className="w-5 h-5 text-neon" /> },
        { name: "MongoDB", level: 80, icon: <Code className="w-5 h-5 text-neon" /> },
        { name: "Docker", level: 85, icon: <Code className="w-5 h-5 text-neon" /> },
        { name: "Jenkins", level: 80, icon: <Code className="w-5 h-5 text-neon" /> },
        { name: "Git", level: 90, icon: <Code className="w-5 h-5 text-neon" /> },
      ]
    }
  ];

  return (
    <section id="skills" className="section-container bg-dark-200">
      <div className="flex items-center justify-center mb-12">
        <Settings size={24} className="text-neon mr-3 animate-pulse-neon" />
        <h2 className="section-title mb-0">Technical Skills</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {categories.map((category, index) => (
          <div key={index} className="glass-card p-6 hover:shadow-xl transition-all hover:border-neon/30">
            <h3 className="text-xl font-bold text-white mb-6 text-center">{category.name}</h3>
            <div className="space-y-5">
              {category.skills.map((skill, skillIndex) => (
                <div key={skillIndex}>
                  <div className="flex justify-between mb-1 items-center">
                    <div className="flex items-center gap-2">
                      <TechLogo name={skill.name} className="w-5 h-5" />
                      <span className="text-gray-300">{skill.name}</span>
                    </div>
                    <span className="text-neon font-mono">{skill.level}%</span>
                  </div>
                  <div className="h-2 bg-dark-300 rounded-full">
                    <div 
                      className="h-full bg-gradient-to-r from-purple to-neon rounded-full"
                      style={{ width: `${skill.level}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-16">
        <h3 className="text-2xl font-bold text-white mb-6 text-center">Additional Technologies & Tools</h3>
        
        <div className="flex flex-wrap justify-center gap-3">
          {["Microservices", "Spring Security", "Spring Cloud", "RabbitMQ", "Apache Kafka", "Elasticsearch", "Redis", "WebSockets", "OAuth2", "JWT", "Vue.js", "Redux", "SASS", "Material UI", "Figma", "Jest", "Cypress", "Firebase", "Strapi", "Webpack", "Babel", "Vercel", "Netlify", "GitHub Actions", "Jira"].map((tech, index) => (
            <span key={index} className="px-4 py-2 bg-dark-300 text-gray-300 rounded-full hover:bg-neon/10 hover:text-neon transition-all">
              {tech}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
