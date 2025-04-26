import React from 'react';
import { motion } from 'framer-motion';

type TechLogoProps = {
  name: string;
  className?: string;
};

const TechLogo: React.FC<TechLogoProps> = ({ name, className = "w-5 h-5" }) => {
  const getLogoUrl = (tech: string): string => {
    const logos: Record<string, string> = {
      Java: "https://raw.githubusercontent.com/devicons/devicon/master/icons/java/java-original.svg",
      "Spring Boot": "https://raw.githubusercontent.com/devicons/devicon/master/icons/spring/spring-original.svg",
      React: "https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original.svg",
      TypeScript: "https://raw.githubusercontent.com/devicons/devicon/master/icons/typescript/typescript-original.svg",
      JavaScript: "https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-original.svg",
      "Next.js": "https://raw.githubusercontent.com/devicons/devicon/master/icons/nextjs/nextjs-original.svg",
      "Tailwind CSS": "https://raw.githubusercontent.com/devicons/devicon/master/icons/tailwindcss/tailwindcss-plain.svg",
      Oracle: "https://raw.githubusercontent.com/devicons/devicon/master/icons/oracle/oracle-original.svg",
      PostgreSQL: "https://raw.githubusercontent.com/devicons/devicon/master/icons/postgresql/postgresql-original.svg",
      MongoDB: "https://raw.githubusercontent.com/devicons/devicon/master/icons/mongodb/mongodb-original.svg",
      Docker: "https://raw.githubusercontent.com/devicons/devicon/master/icons/docker/docker-original.svg",
      Jenkins: "https://raw.githubusercontent.com/devicons/devicon/master/icons/jenkins/jenkins-original.svg",
      Git: "https://raw.githubusercontent.com/devicons/devicon/master/icons/git/git-original.svg",
      Vue: "https://raw.githubusercontent.com/devicons/devicon/master/icons/vuejs/vuejs-original.svg",
      "Vue.js": "https://raw.githubusercontent.com/devicons/devicon/master/icons/vuejs/vuejs-original.svg",
      Redux: "https://raw.githubusercontent.com/devicons/devicon/master/icons/redux/redux-original.svg",
      Firebase: "https://raw.githubusercontent.com/devicons/devicon/master/icons/firebase/firebase-plain.svg",
      Webpack: "https://raw.githubusercontent.com/devicons/devicon/master/icons/webpack/webpack-original.svg",
      Babel: "https://raw.githubusercontent.com/devicons/devicon/master/icons/babel/babel-original.svg",
      "Material UI": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/materialui/materialui-original.svg",
      SASS: "https://raw.githubusercontent.com/devicons/devicon/master/icons/sass/sass-original.svg",
    };
    
    return logos[tech] || '';
  };

  const logoUrl = getLogoUrl(name);

  return logoUrl ? (
    <motion.img 
      src={logoUrl} 
      alt={`${name} logo`} 
      className={`${className} inline-block`}
      loading="lazy"
      whileHover={{ scale: 1.2 }}
      transition={{ type: "spring", stiffness: 300 }}
    />
  ) : null;
};

export default TechLogo;
