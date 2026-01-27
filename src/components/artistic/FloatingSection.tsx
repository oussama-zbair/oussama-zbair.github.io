import React from 'react';
import { motion } from 'framer-motion';

interface FloatingSectionProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

const FloatingSection: React.FC<FloatingSectionProps> = ({ 
  children, 
  className = '',
  delay = 0 
}) => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 100 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ 
        duration: 1,
        delay,
        ease: [0.16, 1, 0.3, 1]
      }}
      className={`relative ${className}`}
    >
      {children}
    </motion.section>
  );
};

export default FloatingSection;
