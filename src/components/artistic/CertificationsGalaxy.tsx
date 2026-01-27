import React from 'react';
import { motion } from 'framer-motion';
import { Award, ExternalLink, Shield, Star } from 'lucide-react';
import { certifications } from '@/data/portfolio';
import FloatingSection from './FloatingSection';
import GlassCard from './GlassCard';

// Organization logo URLs using shields.io or simple-icons
const issuerLogos: Record<string, string> = {
  oracle: 'https://img.shields.io/badge/Oracle-F80000?style=for-the-badge&logo=oracle&logoColor=white',
  github: 'https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white',
  google: 'https://img.shields.io/badge/Google-4285F4?style=for-the-badge&logo=google&logoColor=white',
  ibm: 'https://img.shields.io/badge/IBM-052FAD?style=for-the-badge&logo=ibm&logoColor=white',
  hackerrank: 'https://img.shields.io/badge/HackerRank-00EA64?style=for-the-badge&logo=hackerrank&logoColor=black',
  coursera: 'https://img.shields.io/badge/Coursera-0056D2?style=for-the-badge&logo=coursera&logoColor=white',
  certiprof: 'https://img.shields.io/badge/CertiProf-2F3E46?style=for-the-badge&logoColor=white',
  aws: 'https://img.shields.io/badge/AWS-232F3E?style=for-the-badge&logo=amazon-aws&logoColor=white',
};

const CertificationsGalaxy: React.FC = () => {
  const latestCerts = certifications.filter(c => c.isLatest);
  const otherCerts = certifications.filter(c => !c.isLatest);

  const getIssuerColor = (issuer: string) => {
    if (issuer.includes('Oracle')) return 'from-red-500 to-orange-500';
    if (issuer.includes('GitHub')) return 'from-gray-600 to-gray-800';
    if (issuer.includes('Google')) return 'from-blue-400 to-green-500';
    if (issuer.includes('IBM')) return 'from-blue-500 to-blue-700';
    if (issuer.includes('HackerRank')) return 'from-green-400 to-emerald-600';
    if (issuer.includes('Coursera')) return 'from-blue-500 to-blue-600';
    return 'from-primary to-accent';
  };

  const getLogoBadge = (badge?: string) => {
    if (!badge) return null;
    return issuerLogos[badge] || null;
  };

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
            Certifications
          </span>
          <h2 className="text-4xl md:text-6xl font-bold mt-4 text-foreground">
            Professional <span className="gradient-text">Credentials</span>
          </h2>
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
            Industry-recognized certifications validating expertise in Java, Cloud, and Software Engineering
          </p>
        </motion.div>

        {/* Latest/Featured Certifications */}
        <div className="mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center justify-center gap-2 mb-8"
          >
            <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
            <span className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
              Latest Achievements
            </span>
            <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {latestCerts.map((cert, index) => (
              <motion.div
                key={cert.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <GlassCard className="h-full relative overflow-hidden group">
                  {/* Gradient accent */}
                  <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${getIssuerColor(cert.issuer)}`} />
                  
                  <div className="flex items-start gap-4">
                    {/* Organization Logo Badge */}
                    <div className="flex-shrink-0">
                      {getLogoBadge(cert.badge) ? (
                        <img
                          src={getLogoBadge(cert.badge)!}
                          alt={cert.issuer}
                          className="h-7 rounded"
                          loading="lazy"
                        />
                      ) : (
                        <div className="w-12 h-7 bg-muted rounded flex items-center justify-center">
                          <Award className="w-4 h-4 text-muted-foreground" />
                        </div>
                      )}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">
                        {cert.title}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-2">{cert.issuer}</p>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Shield className="w-3 h-3" />
                          {cert.date}
                        </span>
                        {cert.verifyUrl && (
                          <a
                            href={cert.verifyUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1 text-primary hover:underline"
                          >
                            <ExternalLink className="w-3 h-3" />
                            Verify
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Other Certifications */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center justify-center gap-2 mb-8"
          >
            <Award className="w-5 h-5 text-primary" />
            <span className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
              More Certifications
            </span>
          </motion.div>

          <div className="flex flex-wrap justify-center gap-4 max-w-5xl mx-auto">
            {otherCerts.map((cert, index) => (
              <motion.div
                key={cert.id}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ scale: 1.02, y: -2 }}
                className="glass-card rounded-xl p-4 max-w-xs"
              >
                <div className="flex items-center gap-3">
                  {/* Organization Logo Badge */}
                  {getLogoBadge(cert.badge) ? (
                    <img
                      src={getLogoBadge(cert.badge)!}
                      alt={cert.issuer}
                      className="h-6 rounded flex-shrink-0"
                      loading="lazy"
                    />
                  ) : (
                    <div className="w-10 h-6 bg-muted rounded flex items-center justify-center flex-shrink-0">
                      <Award className="w-3 h-3 text-muted-foreground" />
                    </div>
                  )}
                  <div>
                    <h4 className="text-sm font-medium text-foreground line-clamp-2">
                      {cert.title}
                    </h4>
                    <p className="text-xs text-muted-foreground mt-1">
                      {cert.issuer} • {cert.date}
                    </p>
                    {cert.verifyUrl && (
                      <a
                        href={cert.verifyUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-primary hover:underline inline-flex items-center gap-1 mt-1"
                      >
                        <ExternalLink className="w-3 h-3" />
                        Verify
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </FloatingSection>
  );
};

export default CertificationsGalaxy;
