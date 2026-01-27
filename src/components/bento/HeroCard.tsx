import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Sparkles } from 'lucide-react';
import { BentoCard } from './BentoGrid';

const roles = [
  'Software Engineer',
  'Full Stack Developer', 
  'Cloud Architect',
  'Java Specialist',
];

const HeroCard: React.FC = () => {
  const [roleIndex, setRoleIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <BentoCard colSpan={3} rowSpan={2} variant="gradient" className="p-8 flex flex-col justify-between">
      {/* Decorative blobs */}
      <div className="blob w-32 h-32 bg-primary -top-10 -right-10 opacity-30" />
      <div className="blob w-24 h-24 bg-accent bottom-10 left-10 opacity-20" />

      <div className="relative z-10">
        {/* Status */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-2 mb-6"
        >
          <span className="status-dot bg-[hsl(var(--success))]" />
          <span className="text-sm text-muted-foreground">Available for opportunities</span>
        </motion.div>

        {/* Name */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 tracking-tight"
        >
          <span className="text-foreground">Oussama</span>
          <br />
          <span className="gradient-text">Zbair</span>
        </motion.h1>

        {/* Animated role */}
        <div className="h-8 overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.p
              key={roleIndex}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="text-lg text-muted-foreground font-mono"
            >
              {roles[roleIndex]}
            </motion.p>
          </AnimatePresence>
        </div>
      </div>

      {/* Location */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="relative z-10 flex items-center gap-2 text-sm text-muted-foreground"
      >
        <MapPin className="w-4 h-4" />
        <span>Morocco</span>
        <span className="mx-2">•</span>
        <span>2+ years experience</span>
      </motion.div>
    </BentoCard>
  );
};

export default HeroCard;
