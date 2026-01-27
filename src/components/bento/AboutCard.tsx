import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { BentoCard } from './BentoGrid';

const AboutCard: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const shortBio = "Passionate Software Engineer crafting elegant solutions with modern tech.";
  const fullBio = "I'm a passionate Software Engineer with expertise in full-stack development. My journey started with curiosity about how websites work and evolved into a deep love for creating elegant, efficient solutions. I specialize in building scalable applications using Java, Spring Boot, React, and cloud technologies. When I'm not coding, I enjoy contributing to open source and staying updated with industry trends.";

  return (
    <BentoCard colSpan={2} rowSpan={1} variant="shine" className="p-6">
      <div className="flex flex-col h-full">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-2 h-2 rounded-full bg-primary" />
          <span className="text-xs font-mono uppercase tracking-wider text-muted-foreground">About</span>
        </div>
        
        <motion.div
          animate={{ height: isExpanded ? 'auto' : '4rem' }}
          className="overflow-hidden flex-1"
        >
          <p className="text-sm text-muted-foreground leading-relaxed">
            {isExpanded ? fullBio : shortBio}
          </p>
        </motion.div>

        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="mt-4 flex items-center gap-1 text-xs text-primary hover:text-primary/80 transition-colors self-start"
        >
          {isExpanded ? (
            <>
              <ChevronUp className="w-3 h-3" />
              Less
            </>
          ) : (
            <>
              <ChevronDown className="w-3 h-3" />
              More
            </>
          )}
        </button>
      </div>
    </BentoCard>
  );
};

export default AboutCard;
