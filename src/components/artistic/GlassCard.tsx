import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

const GlassCard: React.FC<GlassCardProps> = ({ 
  children, 
  className,
  hover = true 
}) => {
  return (
    <motion.div
      whileHover={hover ? { 
        scale: 1.02,
        boxShadow: '0 0 40px rgba(168, 85, 247, 0.2)'
      } : undefined}
      transition={{ duration: 0.3 }}
      className={cn(
        'relative overflow-hidden rounded-2xl',
        'bg-card/30 backdrop-blur-xl',
        'border border-white/5',
        'p-6 md:p-8',
        className
      )}
    >
      {/* Gradient accent */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>

      {/* Subtle noise overlay */}
      <div 
        className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`
        }}
      />
    </motion.div>
  );
};

export default GlassCard;
