import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Github, ArrowUpRight } from 'lucide-react';
import { BentoCard } from './BentoGrid';

interface ProjectCardProps {
  title: string;
  description: string;
  tags: string[];
  image?: string;
  liveUrl?: string;
  codeUrl?: string;
  colSpan?: number;
  rowSpan?: number;
  featured?: boolean;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  title,
  description,
  tags,
  image,
  liveUrl,
  codeUrl,
  colSpan = 2,
  rowSpan = 1,
  featured = false,
}) => {
  return (
    <BentoCard 
      colSpan={colSpan} 
      rowSpan={rowSpan} 
      variant={featured ? 'gradient' : 'shine'}
      className="overflow-hidden"
    >
      {/* Background image */}
      {image && (
        <div className="absolute inset-0 opacity-20 group-hover:opacity-30 transition-opacity duration-500">
          <img
            src={image}
            alt=""
            className="w-full h-full object-cover scale-105 group-hover:scale-110 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-card via-card/80 to-transparent" />
        </div>
      )}

      {/* Content */}
      <div className="relative z-10 p-6 h-full flex flex-col justify-between">
        <div>
          {/* Header with links */}
          <div className="flex items-start justify-between mb-4">
            <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2 pr-4">
              {title}
            </h3>
            <div className="flex gap-2 hover-reveal">
              {liveUrl && (
                <a
                  href={liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full bg-primary/10 hover:bg-primary/20 transition-colors"
                >
                  <ExternalLink className="w-4 h-4 text-primary" />
                </a>
              )}
              {codeUrl && (
                <a
                  href={codeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full bg-secondary hover:bg-secondary/80 transition-colors"
                >
                  <Github className="w-4 h-4" />
                </a>
              )}
            </div>
          </div>

          {/* Description */}
          <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
            {description}
          </p>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5">
          {tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="px-2 py-0.5 rounded text-xs bg-secondary/80 text-muted-foreground"
            >
              {tag}
            </span>
          ))}
          {tags.length > 3 && (
            <span className="px-2 py-0.5 rounded text-xs bg-secondary/50 text-muted-foreground">
              +{tags.length - 3}
            </span>
          )}
        </div>

        {/* Hover arrow */}
        <motion.div
          initial={{ x: -10, opacity: 0 }}
          whileHover={{ x: 0, opacity: 1 }}
          className="absolute bottom-4 right-4 hover-reveal"
        >
          <ArrowUpRight className="w-5 h-5 text-primary" />
        </motion.div>
      </div>
    </BentoCard>
  );
};

export default ProjectCard;
