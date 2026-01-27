import React from 'react';
import { motion } from 'framer-motion';
import { Award, ExternalLink } from 'lucide-react';
import { BentoCard } from './BentoGrid';
import { certifications } from '@/data/portfolio';

const CertificationsCard: React.FC = () => {
  const latestCerts = certifications.filter((c) => c.isLatest).slice(0, 4);

  return (
    <BentoCard colSpan={2} rowSpan={1} variant="shine" className="p-6">
      {/* Header */}
      <div className="flex items-center gap-2 mb-4">
        <Award className="w-4 h-4 text-[hsl(var(--success))]" />
        <span className="text-xs font-mono uppercase tracking-wider text-muted-foreground">Certifications</span>
        <span className="ml-auto text-xs text-muted-foreground">{certifications.length} total</span>
      </div>

      {/* Scrolling certifications */}
      <div className="space-y-2">
        {latestCerts.map((cert, index) => (
          <motion.div
            key={cert.id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex items-center gap-3 p-2 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors group"
          >
            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
              <Award className="w-4 h-4 text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-medium text-foreground truncate">{cert.title}</p>
              <p className="text-xs text-muted-foreground">{cert.issuer} • {cert.date}</p>
            </div>
            {cert.verifyUrl && (
              <a
                href={cert.verifyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <ExternalLink className="w-3 h-3 text-primary" />
              </a>
            )}
          </motion.div>
        ))}
      </div>
    </BentoCard>
  );
};

export default CertificationsCard;
