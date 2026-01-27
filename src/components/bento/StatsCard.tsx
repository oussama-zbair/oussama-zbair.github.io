import React from 'react';
import { motion } from 'framer-motion';
import { BentoCard } from './BentoGrid';
import { projects, certifications, experiences } from '@/data/portfolio';

const stats = [
  { label: 'Projects', value: projects.length, color: 'primary' },
  { label: 'Certifications', value: certifications.length, color: 'accent' },
  { label: 'Years Exp', value: '2+', color: 'info' },
];

const StatsCard: React.FC = () => {
  return (
    <BentoCard colSpan={1} rowSpan={1} variant="default" className="p-6">
      <div className="h-full flex flex-col justify-between">
        <div className="text-xs font-mono uppercase tracking-wider text-muted-foreground mb-4">Stats</div>
        
        <div className="space-y-3">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center justify-between"
            >
              <span className="text-xs text-muted-foreground">{stat.label}</span>
              <span 
                className="text-lg font-bold"
                style={{ color: `hsl(var(--${stat.color}))` }}
              >
                {stat.value}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </BentoCard>
  );
};

export default StatsCard;
