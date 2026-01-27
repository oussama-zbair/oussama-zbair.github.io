import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, ExternalLink, Rss, PenTool } from 'lucide-react';
import FloatingSection from './FloatingSection';
import GlassCard from './GlassCard';

const BlogSection: React.FC = () => {
  const blogUrl = 'https://blog.oussamazbair.me';

  return (
    <FloatingSection className="py-20 bg-background relative">
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="text-xs font-mono text-primary tracking-[0.3em] uppercase">
            Blog
          </span>
          <h2 className="text-4xl md:text-6xl font-bold mt-4 text-foreground">
            Thoughts & <span className="gradient-text">Insights</span>
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto"
        >
          <GlassCard className="text-center">
            <div className="flex justify-center mb-6">
              <div className="relative">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                  <PenTool className="w-10 h-10 text-primary" />
                </div>
                <motion.div
                  animate={{ 
                    scale: [1, 1.2, 1],
                    opacity: [0.5, 0.8, 0.5]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute -inset-2 rounded-full border border-primary/30"
                />
              </div>
            </div>

            <h3 className="text-2xl font-bold text-foreground mb-4">
              Exploring Tech Through Writing
            </h3>
            
            <p className="text-muted-foreground mb-8 max-w-lg mx-auto">
              I write about software engineering, Java development, cloud architecture, 
              and my journey in tech. Join me as I share tutorials, insights, and lessons learned.
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              <motion.a
                href={blogUrl}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-primary-foreground font-medium hover:opacity-90 transition-opacity"
              >
                <BookOpen className="w-5 h-5" />
                Read My Blog
                <ExternalLink className="w-4 h-4" />
              </motion.a>

              <motion.a
                href={`${blogUrl}/rss.xml`}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-primary/50 text-primary font-medium hover:bg-primary/10 transition-colors"
              >
                <Rss className="w-5 h-5" />
                Subscribe to RSS
              </motion.a>
            </div>

            {/* Topics */}
            <div className="mt-10 pt-8 border-t border-border">
              <p className="text-sm text-muted-foreground mb-4">Topics I write about:</p>
              <div className="flex flex-wrap justify-center gap-2">
                {['Java', 'Spring Boot', 'Cloud Architecture', 'DevOps', 'React', 'System Design', 'Career Tips'].map((topic, index) => (
                  <motion.span
                    key={topic}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05 }}
                    className="px-3 py-1 rounded-full text-xs bg-secondary text-muted-foreground"
                  >
                    {topic}
                  </motion.span>
                ))}
              </div>
            </div>
          </GlassCard>
        </motion.div>
      </div>
    </FloatingSection>
  );
};

export default BlogSection;
