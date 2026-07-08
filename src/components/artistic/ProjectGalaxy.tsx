import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Github, Shield, X, ChevronRight } from 'lucide-react';
import { projects } from '@/data/portfolio';
import FloatingSection from './FloatingSection';

// ── Tech icon map (Simple Icons CDN) ─────────────────────────────────────────
// Format: https://cdn.simpleicons.org/{slug}/{hex-color}
const TECH_ICONS: Record<string, { icon: string; color: string }> = {
  'Java':           { icon: 'openjdk',           color: 'ED8B00' },
  'Spring Boot':    { icon: 'springboot',        color: '6DB33F' },
  'React':          { icon: 'react',             color: '61DAFB' },
  'React 19':       { icon: 'react',             color: '61DAFB' },
  'TypeScript':     { icon: 'typescript',        color: '3178C6' },
  'JavaScript':     { icon: 'javascript',        color: 'F7DF1E' },
  'Docker':         { icon: 'docker',            color: '2496ED' },
  'PostgreSQL':     { icon: 'postgresql',        color: '4169E1' },
  'MySQL':          { icon: 'mysql',             color: '4479A1' },
  'MongoDB':        { icon: 'mongodb',           color: '47A248' },
  'Python':         { icon: 'python',            color: '3776AB' },
  'Flask':          { icon: 'flask',             color: 'ffffff' },
  'Node.js':        { icon: 'nodedotjs',         color: '339933' },
  'Next.js':        { icon: 'nextdotjs',         color: 'ffffff' },
  'Tailwind CSS':   { icon: 'tailwindcss',       color: '06B6D4' },
  'Tailwind':       { icon: 'tailwindcss',       color: '06B6D4' },
  'AWS':            { icon: 'amazonwebservices', color: 'FF9900' },
  'Azure':          { icon: 'microsoftazure',    color: '0078D4' },
  'Firebase':       { icon: 'firebase',          color: 'FFCA28' },
  'Git':            { icon: 'git',               color: 'F05032' },
  'GitHub Actions': { icon: 'githubactions',     color: '2088FF' },
  'Electron.js':    { icon: 'electron',          color: '47848F' },
  'Django':         { icon: 'django',            color: '092E20' },
  'scikit-learn':   { icon: 'scikitlearn',       color: 'F7931E' },
  'PyTorch':        { icon: 'pytorch',           color: 'EE4C2C' },
  'TensorFlow':     { icon: 'tensorflow',        color: 'FF6F00' },
  'Vite':           { icon: 'vite',              color: '646CFF' },
  'Mapbox':         { icon: 'mapbox',            color: '000000' },
  'Framer Motion':  { icon: 'framer',            color: '0055FF' },
  'JWT':            { icon: 'jsonwebtokens',     color: 'D63AFF' },
  'SQLite':         { icon: 'sqlite',            color: '003B57' },
  'Bootstrap':      { icon: 'bootstrap',         color: '7952B3' },
  'REST API':       { icon: 'fastapi',           color: '009688' },
};

const TechBadge: React.FC<{ tag: string }> = ({ tag }) => {
  const tech = TECH_ICONS[tag];
  if (tech) {
    return (
      <span className="flex items-center gap-1.5 px-2 py-1 rounded-md bg-muted/60 border border-border text-[11px] text-muted-foreground">
        <img
          src={`https://cdn.simpleicons.org/${tech.icon}/${tech.color}`}
          alt={tag}
          width={12}
          height={12}
          className="flex-shrink-0"
          onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }}
        />
        {tag}
      </span>
    );
  }
  return (
    <span className="px-2 py-1 rounded-md bg-primary/10 text-primary text-[11px]">{tag}</span>
  );
};

// ── Category placeholder icons (for projects without screenshots) ─────────────
const CATEGORY_PLACEHOLDERS: Record<string, { emoji: string; gradient: string }> = {
  'Desktop':    { emoji: '🖥️', gradient: 'from-slate-700 to-slate-900'    },
  'ML':         { emoji: '🤖', gradient: 'from-violet-900 to-purple-900'  },
  'Security':   { emoji: '🔐', gradient: 'from-red-900 to-rose-900'       },
  'Full-Stack': { emoji: '⚡', gradient: 'from-primary/30 to-accent/20'   },
  'AI':         { emoji: '🧠', gradient: 'from-pink-900 to-fuchsia-900'   },
  'Frontend':   { emoji: '🎨', gradient: 'from-cyan-900 to-blue-900'      },
  'Audio':      { emoji: '🎵', gradient: 'from-indigo-900 to-purple-900'  },
  'default':    { emoji: '🚀', gradient: 'from-primary/20 to-accent/10'   },
};

// ── Auto-cycling slideshow image ──────────────────────────────────────────────
const ProjectImage: React.FC<{
  src: string;
  images?: string[];
  title: string;
  category: string[];
  isModal?: boolean;
}> = ({ src, images, title, category, isModal = false }) => {
  const allImages = images && images.length > 1 ? images : src ? [src] : [];
  const [idx, setIdx] = useState(0);
  const [imgError, setImgError] = useState<Record<number, boolean>>({});
  const placeholder = CATEGORY_PLACEHOLDERS[category[0]] ?? CATEGORY_PLACEHOLDERS['default'];

  // Auto-cycle on the card (not modal)
  useEffect(() => {
    if (isModal || allImages.length <= 1) return;
    const id = setInterval(() => setIdx(i => (i + 1) % allImages.length), 3000);
    return () => clearInterval(id);
  }, [allImages.length, isModal]);

  if (allImages.length === 0 || imgError[0]) {
    return (
      <div className={`w-full h-full bg-gradient-to-br ${placeholder.gradient} flex flex-col items-center justify-center gap-2`}>
        <span className="text-4xl">{placeholder.emoji}</span>
        <span className="text-xs text-white/40 font-mono px-2 text-center">{category.join(' · ')}</span>
      </div>
    );
  }

  return (
    <div className="relative w-full h-full">
      {/* Images */}
      {allImages.map((imgSrc, i) => (
        <img
          key={imgSrc}
          src={imgSrc}
          alt={`${title} screenshot ${i + 1}`}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
            i === idx ? 'opacity-100' : 'opacity-0'
          } ${!isModal ? 'group-hover:scale-105 transition-transform duration-500' : ''}`}
          onError={() => setImgError(prev => ({ ...prev, [i]: true }))}
          loading="lazy"
        />
      ))}

      {/* Dot indicators — only when multiple images */}
      {allImages.length > 1 && (
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
          {allImages.map((_, i) => (
            <button
              key={i}
              onClick={e => { e.stopPropagation(); setIdx(i); }}
              className={`rounded-full transition-all duration-300 ${
                i === idx
                  ? 'w-4 h-1.5 bg-white'
                  : 'w-1.5 h-1.5 bg-white/40 hover:bg-white/70'
              }`}
            />
          ))}
        </div>
      )}

      {/* Image counter badge */}
      {allImages.length > 1 && (
        <div className="absolute top-2 left-2 px-1.5 py-0.5 rounded-md bg-black/50 backdrop-blur-sm text-[10px] text-white font-mono z-10">
          {idx + 1}/{allImages.length}
        </div>
      )}
    </div>
  );
};
const ProjectModal: React.FC<{ project: typeof projects[0]; onClose: () => void }> = ({ project, onClose }) => (
  <AnimatePresence>
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.92, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.92, opacity: 0, y: 20 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className="bg-card border border-border rounded-2xl p-6 max-w-lg w-full shadow-2xl max-h-[85vh] overflow-y-auto"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1 pr-4">
            <h3 className="text-xl font-bold text-foreground">{project.title}</h3>
            {project.confidential && (
              <span className="inline-flex items-center gap-1 mt-1 px-2 py-0.5 rounded-full text-[11px] font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/20">
                <Shield className="w-3 h-3" /> Confidential
              </span>
            )}
          </div>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-muted/60 text-muted-foreground hover:text-foreground transition-colors">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Screenshot */}
        {(project.image || (project.images && project.images.length > 0)) && (
          <div className="aspect-video w-full rounded-xl overflow-hidden bg-muted/20 mb-5">
            <ProjectImage src={project.image} images={project.images} title={project.title} category={project.category} isModal />
          </div>
        )}

        {/* Full description */}
        <p className="text-sm text-muted-foreground leading-relaxed mb-5">{project.description}</p>

        {/* All tags */}
        <div className="flex flex-wrap gap-1.5 mb-5">
          {project.tags.map(tag => <TechBadge key={tag} tag={tag} />)}
        </div>

        {/* Links */}
        {!project.confidential && (
          <div className="flex flex-wrap gap-3">
            {project.liveUrl && (
              <a href={project.liveUrl} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity">
                <ExternalLink className="w-3.5 h-3.5" /> Live Demo
              </a>
            )}
            {(project.codeUrl || project.frontendUrl || project.backendUrl) && (
              <>
                {project.frontendUrl && (
                  <a href={project.frontendUrl} target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-1.5 px-4 py-2 rounded-full border border-border text-sm text-muted-foreground hover:text-foreground hover:border-primary/40 transition-all">
                    <Github className="w-3.5 h-3.5" /> Frontend
                  </a>
                )}
                {project.backendUrl && (
                  <a href={project.backendUrl} target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-1.5 px-4 py-2 rounded-full border border-border text-sm text-muted-foreground hover:text-foreground hover:border-primary/40 transition-all">
                    <Github className="w-3.5 h-3.5" /> Backend
                  </a>
                )}
                {project.codeUrl && !project.frontendUrl && (
                  <a href={project.codeUrl} target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-1.5 px-4 py-2 rounded-full border border-border text-sm text-muted-foreground hover:text-foreground hover:border-primary/40 transition-all">
                    <Github className="w-3.5 h-3.5" /> Source
                  </a>
                )}
              </>
            )}
          </div>
        )}
        {project.confidential && (
          <div className="flex items-center gap-2 text-amber-400 text-xs p-3 bg-amber-500/10 border border-amber-500/20 rounded-lg">
            <Shield className="w-4 h-4 flex-shrink-0" />
            Source code not available due to confidentiality agreement.
          </div>
        )}
      </motion.div>
    </motion.div>
  </AnimatePresence>
);

// ── ProjectGalaxy ─────────────────────────────────────────────────────────────
const ProjectGalaxy: React.FC = () => {
  const [showAll, setShowAll] = useState(false);
  const [selected, setSelected] = useState<typeof projects[0] | null>(null);
  const displayed = showAll ? projects : projects.slice(0, 6);

  return (
    <FloatingSection className="min-h-screen py-20 bg-background relative">
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-xs font-mono text-primary tracking-[0.3em] uppercase">Projects</span>
          <h2 className="text-4xl md:text-6xl font-bold mt-4 text-foreground">
            Featured <span className="gradient-text">Work</span>
          </h2>
          <p className="text-muted-foreground mt-4">{projects.length} projects — click any card for full details</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-7xl mx-auto">
          {displayed.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
              whileHover={{ y: -4 }}
              onClick={() => setSelected(project)}
              className="group cursor-pointer rounded-2xl border border-border bg-card/50 backdrop-blur-sm
                         hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5
                         transition-all duration-300 overflow-hidden flex flex-col"
            >
              {/* Top gradient bar */}
              <div className="h-1 w-full bg-gradient-to-r from-primary via-accent to-primary/50" />

              {/* Project image */}
              <div className="aspect-video w-full overflow-hidden bg-muted/20 relative">
                <ProjectImage src={project.image} images={project.images} title={project.title} category={project.category} />
                {project.confidential && (
                  <div className="absolute top-2 right-2 flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-amber-500/90 text-amber-900 backdrop-blur-sm">
                    <Shield className="w-2.5 h-2.5" /> NDA
                  </div>
                )}
              </div>

              <div className="p-5 flex flex-col flex-1">

                {/* Title */}
                <h3 className="text-base font-bold text-foreground group-hover:text-primary transition-colors leading-snug mb-2">
                  {project.title}
                </h3>

                {/* Description — 2 lines, click for more */}
                <p className="text-xs text-muted-foreground leading-relaxed mb-4 line-clamp-2 flex-1">
                  {project.description}
                </p>

                {/* Tech badges — first 4 */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {project.tags.slice(0, 4).map(tag => <TechBadge key={tag} tag={tag} />)}
                  {project.tags.length > 4 && (
                    <span className="px-2 py-1 rounded-md bg-muted/40 text-[11px] text-muted-foreground">
                      +{project.tags.length - 4}
                    </span>
                  )}
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between pt-3 border-t border-border/50">
                  <div className="flex gap-2" onClick={e => e.stopPropagation()}>
                    {project.liveUrl && (
                      <a href={project.liveUrl} target="_blank" rel="noopener noreferrer"
                        className="flex items-center gap-1 text-[11px] text-primary hover:underline">
                        <ExternalLink className="w-3 h-3" /> Demo
                      </a>
                    )}
                    {(project.codeUrl || project.frontendUrl) && !project.confidential && (
                      <a href={project.codeUrl || project.frontendUrl} target="_blank" rel="noopener noreferrer"
                        className="flex items-center gap-1 text-[11px] text-muted-foreground hover:text-foreground">
                        <Github className="w-3 h-3" /> Code
                      </a>
                    )}
                  </div>
                  <span className="flex items-center gap-0.5 text-[11px] text-muted-foreground/60 group-hover:text-primary/60 transition-colors">
                    Details <ChevronRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

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

      {/* Detail modal */}
      {selected && <ProjectModal project={selected} onClose={() => setSelected(null)} />}
    </FloatingSection>
  );
};

export default ProjectGalaxy;
