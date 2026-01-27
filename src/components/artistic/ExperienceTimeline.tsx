import React from 'react';
import { motion } from 'framer-motion';
import { experiences } from '@/data/portfolio';
import FloatingSection from './FloatingSection';
import GlassCard from './GlassCard';

const ExperienceTimeline: React.FC = () => {
  return (
    <FloatingSection className="min-h-screen py-20 bg-background relative">
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-xs font-mono text-primary tracking-[0.3em] uppercase">
            Experience
          </span>
          <h2 className="text-4xl md:text-6xl font-bold mt-4 text-foreground">
            My <span className="gradient-text">Journey</span>
          </h2>
        </motion.div>

        <div className="max-w-3xl mx-auto relative">
          {/* Timeline line */}
          <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary via-accent to-transparent" />

          {experiences.map((exp, index) => (
            <motion.div
              key={exp.company + exp.period}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`relative pl-8 md:pl-0 mb-12 ${
                index % 2 === 0 
                  ? 'md:pr-[calc(50%+2rem)] md:text-right' 
                  : 'md:pl-[calc(50%+2rem)]'
              }`}
            >
              {/* Timeline dot */}
              <div 
                className={`absolute top-2 w-3 h-3 rounded-full bg-primary border-2 border-background
                  left-[-6px] md:left-[calc(50%-6px)]`}
              />

              <GlassCard hover={false} className="inline-block text-left">
                <span className="text-xs font-mono text-primary">
                  {exp.period}
                </span>
                <h3 className="text-lg font-semibold text-foreground mt-1">
                  {exp.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {exp.company} • {exp.location}
                </p>
                <div className="flex flex-wrap gap-1 mt-2">
                  {exp.technologies.slice(0, 4).map((tech) => (
                    <span 
                      key={tech}
                      className="text-[10px] px-1.5 py-0.5 rounded bg-primary/10 text-primary"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </FloatingSection>
  );
};

export default ExperienceTimeline;
