import React from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, ExternalLink } from 'lucide-react';
import { BentoCard } from './BentoGrid';
import { socialLinks } from '@/data/portfolio';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  github: Github,
  linkedin: Linkedin,
};

const SocialCard: React.FC = () => {
  return (
    <BentoCard colSpan={1} rowSpan={1} variant="default" className="p-6">
      <div className="h-full flex flex-col justify-between">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-2 h-2 rounded-full bg-[hsl(var(--info))]" />
          <span className="text-xs font-mono uppercase tracking-wider text-muted-foreground">Connect</span>
        </div>

        <div className="flex gap-3">
          {socialLinks.map((link) => {
            const Icon = iconMap[link.icon] || ExternalLink;
            return (
              <motion.a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="p-3 rounded-xl bg-secondary hover:bg-secondary/80 transition-colors"
              >
                <Icon className="w-5 h-5 text-muted-foreground hover:text-primary transition-colors" />
              </motion.a>
            );
          })}
        </div>
      </div>
    </BentoCard>
  );
};

export default SocialCard;
