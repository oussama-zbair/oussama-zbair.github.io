import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Building2 } from 'lucide-react';
import { BentoCard } from './BentoGrid';
import { experiences } from '@/data/portfolio';

const ExperienceCard: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const exp = experiences[currentIndex];

  const next = () => setCurrentIndex((prev) => (prev + 1) % experiences.length);
  const prev = () => setCurrentIndex((prev) => (prev - 1 + experiences.length) % experiences.length);

  return (
    <BentoCard colSpan={2} rowSpan={2} variant="default" className="p-6 flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-accent" />
          <span className="text-xs font-mono uppercase tracking-wider text-muted-foreground">Experience</span>
        </div>
        
        {/* Navigation */}
        <div className="flex gap-1">
          <button
            onClick={prev}
            className="p-1.5 rounded-full bg-secondary hover:bg-secondary/80 transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={next}
            className="p-1.5 rounded-full bg-secondary hover:bg-secondary/80 transition-colors"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.2 }}
          className="flex-1 flex flex-col"
        >
          {/* Company */}
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 rounded-lg bg-secondary">
              <Building2 className="w-5 h-5 text-muted-foreground" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">{exp.title}</h3>
              <p className="text-sm text-muted-foreground">{exp.company}</p>
            </div>
          </div>

          {/* Period */}
          <p className="text-xs text-primary font-mono mb-4">{exp.period}</p>

          {/* Responsibilities */}
          <ul className="space-y-2 flex-1 overflow-hidden">
            {exp.responsibilities.slice(0, 3).map((resp, i) => (
              <li key={i} className="text-xs text-muted-foreground flex gap-2">
                <span className="text-primary">→</span>
                <span className="line-clamp-2">{resp}</span>
              </li>
            ))}
          </ul>

          {/* Dots indicator */}
          <div className="flex justify-center gap-1 mt-4">
            {experiences.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentIndex(i)}
                className={`w-1.5 h-1.5 rounded-full transition-all ${
                  i === currentIndex
                    ? 'bg-primary w-4'
                    : 'bg-secondary hover:bg-muted-foreground'
                }`}
              />
            ))}
          </div>
        </motion.div>
      </AnimatePresence>
    </BentoCard>
  );
};

export default ExperienceCard;
