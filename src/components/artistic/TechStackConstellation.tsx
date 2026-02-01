import React from 'react';
import { motion } from 'framer-motion';
import FloatingSection from './FloatingSection';

interface TechBadge {
  name: string;
  logo: string;
  color: string;
  textColor?: string;
}

interface TechCategory {
  title: string;
  icon: string;
  techs: TechBadge[];
}

const techStack: TechCategory[] = [
  {
    title: 'Programming Languages',
    icon: '🔤',
    techs: [
      { name: 'JavaScript', logo: 'javascript', color: '#F7DF1E', textColor: 'black' },
      { name: 'TypeScript', logo: 'typescript', color: '#007ACC', textColor: 'white' },
      { name: 'Python', logo: 'python', color: '#3776AB', textColor: 'white' },
      { name: 'Java', logo: 'openjdk', color: '#007396', textColor: 'white' },
      { name: 'Kotlin', logo: 'kotlin', color: '#0095D5', textColor: 'white' },
      { name: 'Shell', logo: 'gnu-bash', color: '#121011', textColor: 'white' },
    ],
  },
  {
    title: 'Frameworks & Libraries',
    icon: '🚀',
    techs: [
      { name: 'React', logo: 'react', color: '#20232A', textColor: '#61DAFB' },
      { name: 'Angular', logo: 'angular', color: '#DD0031', textColor: 'white' },
      { name: 'Spring Boot', logo: 'spring-boot', color: '#6DB33F', textColor: 'white' },
      { name: 'Node.js', logo: 'node.js', color: '#43853D', textColor: 'white' },
      { name: 'Express.js', logo: 'express', color: '#404D59', textColor: 'white' },
      { name: 'Django', logo: 'django', color: '#092E20', textColor: 'white' },
      { name: 'Flask', logo: 'flask', color: '#000000', textColor: 'white' },
      { name: 'TensorFlow', logo: 'tensorflow', color: '#FF6F00', textColor: 'white' },
    ],
  },
  {
    title: 'DevOps & CI/CD',
    icon: '⚙️',
    techs: [
      { name: 'Docker', logo: 'docker', color: '#2496ED', textColor: 'white' },
      { name: 'Kubernetes', logo: 'kubernetes', color: '#326CE5', textColor: 'white' },
      { name: 'Jenkins', logo: 'jenkins', color: '#D24939', textColor: 'white' },
      { name: 'GitHub Actions', logo: 'github-actions', color: '#2088FF', textColor: 'white' },
      { name: 'Terraform', logo: 'terraform', color: '#623CE4', textColor: 'white' },
    ],
  },
  {
    title: 'Databases',
    icon: '🗄️',
    techs: [
      { name: 'PostgreSQL', logo: 'postgresql', color: '#316192', textColor: 'white' },
      { name: 'MySQL', logo: 'mysql', color: '#4479A1', textColor: 'white' },
      { name: 'MongoDB', logo: 'mongodb', color: '#4EA94B', textColor: 'white' },
      { name: 'Redis', logo: 'redis', color: '#DC382D', textColor: 'white' },
      { name: 'Oracle', logo: 'oracle', color: '#F80000', textColor: 'white' },
    ],
  },
  {
    title: 'Cloud Platforms',
    icon: '☁️',
    techs: [
      { name: 'AWS', logo: 'amazon-aws', color: '#232F3E', textColor: 'white' },
      { name: 'Azure', logo: 'microsoft-azure', color: '#0078D4', textColor: 'white' },
      { name: 'Google Cloud', logo: 'google-cloud', color: '#4285F4', textColor: 'white' },
      { name: 'Heroku', logo: 'heroku', color: '#430098', textColor: 'white' },
      { name: 'Vercel', logo: 'vercel', color: '#000000', textColor: 'white' },
    ],
  },
  {
    title: 'Testing & Tools',
    icon: '🧪',
    techs: [
      { name: 'Jest', logo: 'jest', color: '#C21325', textColor: 'white' },
      { name: 'Pytest', logo: 'pytest', color: '#0A9EDC', textColor: 'white' },
      { name: 'Selenium', logo: 'selenium', color: '#43B02A', textColor: 'white' },
      { name: 'Postman', logo: 'postman', color: '#FF6C37', textColor: 'white' },
      { name: 'Git', logo: 'git', color: '#F05032', textColor: 'white' },
    ],
  },
];

const TechStackConstellation: React.FC = () => {
  return (
    <FloatingSection className="min-h-screen flex items-center justify-center py-20 bg-background relative">
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-xs font-mono text-primary tracking-[0.3em] uppercase">
            Tech Stack
          </span>
          <h2 className="text-4xl md:text-6xl font-bold mt-4 text-foreground">
            My <span className="gradient-text">Arsenal</span>
          </h2>
        </motion.div>

        {/* Tech categories */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {techStack.map((category, catIndex) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: catIndex * 0.1 }}
              className="glass-card rounded-2xl p-6"
            >
              <div className="flex items-center gap-3 mb-6">
                <span className="text-2xl">{category.icon}</span>
                <h3 className="text-lg font-semibold text-foreground">{category.title}</h3>
              </div>
              
              <div className="flex flex-wrap gap-2">
                {category.techs.map((tech, i) => (
                  <motion.a
                    key={tech.name}
                    href={`https://img.shields.io/badge/${tech.name.replace(/\+/g, '%2B').replace(/\s/g, '_')}-${tech.color.replace('#', '')}?style=for-the-badge&logo=${tech.logo}&logoColor=${tech.textColor || 'white'}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: catIndex * 0.1 + i * 0.05 }}
                    whileHover={{ scale: 1.05, y: -2 }}
                    className="cursor-pointer"
                  >
                    <img
                      src={`https://img.shields.io/badge/${tech.name.replace(/\+/g, '%2B').replace(/\s/g, '_')}-${tech.color.replace('#', '')}?style=for-the-badge&logo=${tech.logo}&logoColor=${tech.textColor || 'white'}`}
                      alt={tech.name}
                      className="h-7 rounded"
                      loading="lazy"
                    />
                  </motion.a>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </FloatingSection>
  );
};

export default TechStackConstellation;
