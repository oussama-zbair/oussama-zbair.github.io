import React from 'react';
import { Settings } from 'lucide-react'; 
import { motion } from 'framer-motion';
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
        { name: "React", level: 95 },
        { name: "TypeScript", level: 90 },
        { name: "JavaScript", level: 95 },
        { name: "HTML/CSS", level: 95 },
        { name: "Next.js", level: 85 },
        { name: "Tailwind CSS", level: 90 },
      ]
    },
    {
      name: "Database & DevOps",
      skills: [
        { name: "Oracle", level: 85 },
        { name: "PostgreSQL", level: 85 },
        { name: "MongoDB", level: 80 },
        { name: "Docker", level: 85 },
        { name: "Jenkins", level: 80 },
        { name: "Git", level: 90 },
      ]
    }
  ];

  return (
    <section id="skills" className="section-container bg-dark-200">
      <motion.div 
        className="flex items-center justify-center mb-12"
        initial={{ opacity: 0, y: -50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <Settings size={24} className="text-neon mr-3 animate-pulse-neon" />
        <h2 className="section-title mb-0">Technical Skills</h2>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {categories.map((category, index) => (
          <motion.div
            key={index}
            className="glass-card p-6 hover:shadow-xl transition-all hover:border-neon/30"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: index * 0.3 }}
          >
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
                  <div className="h-2 bg-dark-300 rounded-full overflow-hidden">
                    <motion.div 
                      className="h-full bg-gradient-to-r from-purple to-neon rounded-full"
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      transition={{ duration: 1 }}
                    ></motion.div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-16">
        <h3 className="text-2xl font-bold text-white mb-6 text-center">Additional Technologies & Tools</h3>

        <div className="flex flex-wrap justify-center gap-3">
          {[
            "Microservices", "Spring Security", "Spring Cloud", "RabbitMQ", "Apache Kafka", 
            "Elasticsearch", "Redis", "WebSockets", "OAuth2", "JWT", "Vue.js", "Redux", 
            "SASS", "Material UI", "Figma", "Jest", "Cypress", "Firebase", "Strapi", 
            "Webpack", "Babel", "Vercel", "Netlify", "GitHub Actions", "Jira"
          ].map((tech, index) => (
            <motion.span
              key={index}
              className="px-4 py-2 bg-dark-300 text-gray-300 rounded-full hover:bg-neon/10 hover:text-neon transition-all"
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, delay: index * 0.05 }}
            >
              {tech}
            </motion.span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
