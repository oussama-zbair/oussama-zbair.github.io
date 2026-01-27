import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Award, ExternalLink, ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { certifications } from '@/data/portfolio';

const CertificationsSection: React.FC = () => {
  const [showAll, setShowAll] = useState(false);
  
  const latestCerts = certifications.filter((cert) => cert.isLatest);
  const otherCerts = certifications.filter((cert) => !cert.isLatest);
  
  const displayedOtherCerts = showAll ? otherCerts : otherCerts.slice(0, 4);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <section id="certifications" className="py-24 lg:py-32 relative">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 right-0 h-px section-divider" />
      
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 terminal-heading">Certifications & Credentials</h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-accent mx-auto rounded-full" />
        </motion.div>

        {/* Latest Certifications */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-12"
        >
          <h3 className="text-xl font-semibold text-primary mb-6 text-center">Latest Professional Certifications</h3>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {latestCerts.map((cert) => (
              <motion.div
                key={cert.id}
                variants={itemVariants}
                className="relative glass-card rounded-xl p-6 space-y-4 group hover:border-primary/30 transition-colors"
              >
                {/* Latest badge */}
                <span className="absolute -top-2 -right-2 px-2 py-1 rounded-full bg-primary text-primary-foreground text-xs font-medium">
                  LATEST
                </span>
                
                {/* Icon */}
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Award className="h-6 w-6 text-primary" />
                </div>
                
                {/* Content */}
                <div className="space-y-2">
                  <h4 className="font-semibold text-foreground line-clamp-2 group-hover:text-primary transition-colors">
                    {cert.title}
                  </h4>
                  <p className="text-sm text-muted-foreground">{cert.issuer}</p>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>{cert.date}</span>
                    <span className="font-mono">ID: {cert.id.slice(0, 12)}...</span>
                  </div>
                </div>
                
                {/* Verify link */}
                {cert.verifyUrl && (
                  <a
                    href={cert.verifyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-sm text-primary hover:underline"
                  >
                    <span>Verify Credential</span>
                    <ExternalLink className="h-3 w-3" />
                  </a>
                )}
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Additional Certifications */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h3 className="text-xl font-semibold text-primary mb-6 text-center">Additional Certifications</h3>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-4"
          >
            {displayedOtherCerts.map((cert) => (
              <motion.div
                key={cert.id}
                variants={itemVariants}
                className="glass-card rounded-xl p-4 space-y-3 group hover:border-primary/30 transition-colors"
              >
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center flex-shrink-0">
                    <Award className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-sm text-foreground line-clamp-2 group-hover:text-primary transition-colors">
                      {cert.title}
                    </h4>
                    <p className="text-xs text-muted-foreground mt-1">{cert.issuer}</p>
                    <p className="text-xs text-muted-foreground">{cert.date}</p>
                  </div>
                </div>
                
                {cert.verifyUrl && (
                  <a
                    href={cert.verifyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-xs text-primary hover:underline"
                  >
                    <span>Verify</span>
                    <ExternalLink className="h-3 w-3" />
                  </a>
                )}
              </motion.div>
            ))}
          </motion.div>
          
          {/* Show more button */}
          {otherCerts.length > 4 && (
            <div className="text-center mt-8">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowAll(!showAll)}
                className="text-muted-foreground hover:text-primary"
              >
                {showAll ? (
                  <>
                    <ChevronUp className="mr-2 h-4 w-4" />
                    Show Less
                  </>
                ) : (
                  <>
                    <ChevronDown className="mr-2 h-4 w-4" />
                    Show {otherCerts.length - 4} More
                  </>
                )}
              </Button>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default CertificationsSection;
