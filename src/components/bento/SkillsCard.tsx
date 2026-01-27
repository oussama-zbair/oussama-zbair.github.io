import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BentoCard } from './BentoGrid';

const skillGroups = {
  backend: ['Java', 'Spring Boot', 'JPA', 'REST APIs', 'Microservices'],
  frontend: ['React', 'TypeScript', 'Next.js', 'Tailwind'],
  devops: ['Docker', 'Jenkins', 'AWS', 'PostgreSQL', 'Git'],
};

const SkillsCard: React.FC = () => {
  const [activeGroup, setActiveGroup] = useState<keyof typeof skillGroups>('backend');
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  return (
    <BentoCard colSpan={2} rowSpan={2} variant="default" className="p-6 flex flex-col">
      {/* Header */}
      <div className="flex items-center gap-2 mb-4">
        <div className="w-2 h-2 rounded-full bg-[hsl(var(--info))]" />
        <span className="text-xs font-mono uppercase tracking-wider text-muted-foreground">Skills</span>
      </div>

      {/* Tab switcher */}
      <div className="flex gap-2 mb-6">
        {Object.keys(skillGroups).map((group) => (
          <button
            key={group}
            onClick={() => setActiveGroup(group as keyof typeof skillGroups)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
              activeGroup === group
                ? 'bg-primary text-primary-foreground'
                : 'bg-secondary text-muted-foreground hover:text-foreground'
            }`}
          >
            {group.charAt(0).toUpperCase() + group.slice(1)}
          </button>
        ))}
      </div>

      {/* Skills grid */}
      <div className="flex-1 flex flex-wrap gap-2 content-start">
        {skillGroups[activeGroup].map((skill, index) => (
          <motion.span
            key={skill}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.05 }}
            onMouseEnter={() => setHoveredSkill(skill)}
            onMouseLeave={() => setHoveredSkill(null)}
            className={`skill-pill cursor-default ${
              hoveredSkill === skill ? 'scale-110' : ''
            }`}
          >
            {skill}
          </motion.span>
        ))}
      </div>

      {/* More indicator */}
      <div className="mt-4 text-xs text-muted-foreground">
        +20 more technologies
      </div>
    </BentoCard>
  );
};

export default SkillsCard;
