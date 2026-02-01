import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Github, Shield } from 'lucide-react';
import { projects } from '@/data/portfolio';
import FloatingSection from './FloatingSection';
import GlassCard from './GlassCard';

const ProjectGalaxy: React.FC = () => {
  const [showAll, setShowAll] = React.useState(false);
  const displayedProjects = showAll ? projects : projects.slice(0, 6);

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
            Projects
          </span>
          <h2 className="text-4xl md:text-6xl font-bold mt-4 text-foreground">
            Featured <span className="gradient-text">Work</span>
          </h2>
          <p className="text-muted-foreground mt-4">
            {projects.length} projects showcasing full-stack development
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {displayedProjects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <GlassCard className="h-full">
                {/* Project image placeholder */}
                <div className="aspect-video rounded-lg bg-gradient-to-br from-primary/10 to-accent/10 mb-6 overflow-hidden relative">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-4xl opacity-50">🚀</span>
                  </div>
                  {/* Confidential badge overlay */}
                  {project.confidential && (
                    <div className="absolute top-2 right-2 flex items-center gap-1 px-2 py-1 bg-amber-500/90 backdrop-blur-sm border border-amber-400/50 rounded-full">
                      <Shield size={10} className="text-amber-900" />
                      <span className="text-xs font-medium text-amber-900">Confidential</span>
                    </div>
                  )}
                </div>

                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-xl font-semibold text-foreground flex-1">
                    {project.title}
                  </h3>
                  {project.confidential && (
                    <div className="flex items-center gap-1 px-2 py-1 bg-amber-500/20 border border-amber-500/30 rounded-full ml-2 flex-shrink-0">
                      <Shield size={10} className="text-amber-400" />
                      <span className="text-xs font-medium text-amber-400">Confidential</span>
                    </div>
                  )}
                </div>
                
                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                  {project.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.slice(0, 4).map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 text-xs rounded bg-primary/10 text-primary"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Links */}
                <div className="flex flex-col gap-2">
                  {project.confidential ? (
                    <div className="flex items-center gap-2 text-amber-400 text-sm p-2 bg-amber-500/10 border border-amber-500/20 rounded-lg">
                      <Shield size={14} className="flex-shrink-0" />
                      <span className="text-xs">Source code not available due to confidentiality</span>
                    </div>
                  ) : (
                    <div className="flex gap-4">
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-sm text-primary hover:underline"
                        >
                          <ExternalLink className="w-4 h-4" />
                          Live Demo
                        </a>
                      )}
                      {(project.codeUrl || project.frontendUrl) && (
                        <a
                          href={project.codeUrl || project.frontendUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
                        >
                          <Github className="w-4 h-4" />
                          Source
                        </a>
                      )}
                    </div>
                  )}
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>

        {/* Show More/Less Button */}
        {projects.length > 6 && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <motion.button
              onClick={() => setShowAll(!showAll)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 rounded-full border border-primary/50 text-primary font-medium hover:bg-primary/10 transition-colors"
            >
              {showAll ? 'Show Less' : `View All ${projects.length} Projects`}
            </motion.button>
          </motion.div>
        )}
      </div>
    </FloatingSection>
  );
};

export default ProjectGalaxy;
