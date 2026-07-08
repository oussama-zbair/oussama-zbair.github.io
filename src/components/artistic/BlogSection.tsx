import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, ExternalLink, Library, ArrowRight } from 'lucide-react';
import FloatingSection from './FloatingSection';

const BlogSection: React.FC = () => {
  const kbUrl     = 'https://docs.oussamazbair.engineer';
  const mediumUrl = 'https://oussama-zbair.medium.com';

  const cards = [
    {
      icon: Library,
      label: 'Engineering Docs',
      description: 'Deep technical documentation from every certification — Java, AWS, Kubernetes, AI, and more. A living engineering handbook.',
      href: kbUrl,
      cta: 'Open Docs',
      accent: 'text-primary border-primary/20 bg-primary/5',
      ctaClass: 'bg-primary text-primary-foreground hover:opacity-90',
    },
    {
      icon: BookOpen,
      label: 'Medium Blog',
      description: 'Experience-oriented articles: how I passed certifications, lessons learned from real projects, and engineering insights.',
      href: mediumUrl,
      cta: 'Read on Medium',
      accent: 'text-accent border-accent/20 bg-accent/5',
      ctaClass: 'border border-accent/50 text-accent hover:bg-accent/10',
    },
  ];

  return (
    <FloatingSection className="py-24 relative">
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="text-xs font-mono text-primary tracking-[0.3em] uppercase">
            Writing
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mt-3 text-foreground">
            Knowledge &amp; <span className="gradient-text">Insights</span>
          </h2>
          <p className="text-muted-foreground mt-3 max-w-lg mx-auto">
            Two places where I share what I know — one for deep reference, one for stories.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
          {cards.map((card, i) => {
            const Icon = card.icon;
            return (
              <motion.a
                key={card.label}
                href={card.href}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -4 }}
                className={`group flex flex-col gap-4 p-6 rounded-2xl border bg-card/40
                            backdrop-blur-sm transition-all duration-300 hover:shadow-lg
                            hover:shadow-primary/5 cursor-pointer ${card.accent}`}
              >
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${card.accent}`}>
                  <Icon className="w-5 h-5" />
                </div>

                <div>
                  <h3 className="font-bold text-lg text-foreground mb-1">{card.label}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {card.description}
                  </p>
                </div>

                <div className="mt-auto">
                  <span className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${card.ctaClass}`}>
                    {card.cta}
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </motion.a>
            );
          })}
        </div>
      </div>
    </FloatingSection>
  );
};

export default BlogSection;
