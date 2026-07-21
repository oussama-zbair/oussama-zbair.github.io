import React from 'react';
import { motion } from 'framer-motion';
import { Award, ExternalLink, CheckCircle2, Star } from 'lucide-react';
import { certifications } from '@/data/portfolio';
import FloatingSection from './FloatingSection';

// ── Issuer config ─────────────────────────────────────────────────────────────
const ISSUERS: Record<string, { color: string; bg: string; border: string; logo: string }> = {
  oracle:          { color: '#F80000', bg: 'rgba(248,0,0,0.08)',    border: 'rgba(248,0,0,0.25)',   logo: '' },
  aws:             { color: '#FF9900', bg: 'rgba(255,153,0,0.08)',  border: 'rgba(255,153,0,0.25)', logo: 'amazonwebservices' },
  google:          { color: '#4285F4', bg: 'rgba(66,133,244,0.08)', border: 'rgba(66,133,244,0.25)',logo: 'google' },
  github:          { color: '#ffffff', bg: 'rgba(255,255,255,0.06)',border: 'rgba(255,255,255,0.15)',logo: 'github' },
  ibm:             { color: '#0062FF', bg: 'rgba(0,98,255,0.08)',   border: 'rgba(0,98,255,0.25)',  logo: 'ibm' },
  hackerrank:      { color: '#00EA64', bg: 'rgba(0,234,100,0.08)',  border: 'rgba(0,234,100,0.25)', logo: 'hackerrank' },
  coursera:        { color: '#0056D2', bg: 'rgba(0,86,210,0.08)',   border: 'rgba(0,86,210,0.25)',  logo: 'coursera' },
  certiprof:       { color: '#3b82f6', bg: 'rgba(59,130,246,0.08)',border: 'rgba(59,130,246,0.25)',logo: '' },
  'linux-foundation': { color: '#FCC624', bg: 'rgba(252,198,36,0.08)', border: 'rgba(252,198,36,0.25)', logo: 'linux' },
};

interface CertCardProps {
  cert: typeof certifications[0];
  index: number;
  featured?: boolean;
}

const CertCard: React.FC<CertCardProps> = ({ cert, index, featured }) => {
  const cfg = ISSUERS[cert.badge || ''] ?? {
    color: '#3b82f6', bg: 'rgba(59,130,246,0.08)', border: 'rgba(59,130,246,0.25)', logo: '',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.06 }}
      whileHover={{ y: -4, scale: 1.01 }}
      className="relative rounded-2xl border overflow-hidden transition-all duration-300 group"
      style={{ borderColor: cfg.border, background: cfg.bg }}
    >
      {/* Top accent line */}
      <div className="h-0.5 w-full" style={{ background: cfg.color }} />

      {/* Latest indicator — subtle colored dot, no text badge */}
      {cert.isLatest && (
        <div
          className="absolute top-3 right-3 w-2 h-2 rounded-full animate-pulse"
          style={{ background: cfg.color, boxShadow: `0 0 6px ${cfg.color}` }}
        />
      )}

      <div className={`p-5 ${featured ? 'pb-5' : 'pb-4'}`}>
        {/* Issuer logo + verify */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            {cfg.logo ? (
              <img
                src={`https://cdn.simpleicons.org/${cfg.logo}/${cfg.color.replace('#','')}`}
                alt={cert.issuer}
                width={featured ? 20 : 16}
                height={featured ? 20 : 16}
                className="flex-shrink-0"
                onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }}
              />
            ) : (
              <Award className="w-4 h-4" style={{ color: cfg.color }} />
            )}
            <span className="text-xs font-semibold" style={{ color: cfg.color }}>
              {cert.issuer}
            </span>
          </div>
          {cert.verifyUrl && (
            <a
              href={cert.verifyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-[10px] font-medium opacity-70 hover:opacity-100 transition-opacity"
              style={{ color: cfg.color }}
            >
              <CheckCircle2 className="w-3 h-3" />
              Verify
              <ExternalLink className="w-2.5 h-2.5" />
            </a>
          )}
        </div>

        {/* Title */}
        <h3 className={`font-bold text-foreground leading-snug mb-2 group-hover:opacity-90 transition-opacity ${featured ? 'text-base' : 'text-sm'}`}>
          {cert.title}
        </h3>

        {/* Date */}
        <p className="text-[11px] text-muted-foreground font-mono">{cert.date}</p>
      </div>
    </motion.div>
  );
};

// ── CertificationsGalaxy ──────────────────────────────────────────────────────
const CertificationsGalaxy: React.FC = () => {
  const latest = certifications.filter(c => c.isLatest);
  const others  = certifications.filter(c => !c.isLatest);

  return (
    <FloatingSection className="min-h-screen py-20 bg-background relative">
      <div className="container mx-auto px-4 relative z-10">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-xs font-mono text-primary tracking-[0.3em] uppercase">Certifications</span>
          <h2 className="text-4xl md:text-6xl font-bold mt-4 text-foreground">
            Professional <span className="gradient-text">Credentials</span>
          </h2>
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
            {certifications.length} industry-recognized certifications across Java, Cloud, AI, DevOps & Security
          </p>
        </motion.div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-4 mb-16"
        >
          {[
            { value: certifications.length, label: 'Total Certs' },
            { value: latest.length, label: 'This Year' },
            { value: '6+', label: 'Issuers' },
            { value: '5+', label: 'Domains' },
          ].map(stat => (
            <div key={stat.label}
              className="flex flex-col items-center px-6 py-3 rounded-xl border border-border bg-card/40 min-w-[100px]">
              <span className="text-2xl font-black text-primary">{stat.value}</span>
              <span className="text-[11px] text-muted-foreground mt-0.5">{stat.label}</span>
            </div>
          ))}
        </motion.div>

        {/* Latest — featured large cards */}
        <div className="mb-12">
          <div className="flex items-center gap-2 mb-6 justify-center">
            <div className="h-px flex-1 max-w-[80px] bg-border" />
            <span className="text-xs font-mono text-primary uppercase tracking-widest flex items-center gap-1.5">
              <Star className="w-3 h-3 fill-primary" /> Latest Achievements
            </span>
            <div className="h-px flex-1 max-w-[80px] bg-border" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
            {latest.map((cert, i) => (
              <CertCard key={cert.id} cert={cert} index={i} featured />
            ))}
          </div>
        </div>

        {/* Others */}
        <div>
          <div className="flex items-center gap-2 mb-6 justify-center">
            <div className="h-px flex-1 max-w-[80px] bg-border" />
            <span className="text-xs font-mono text-muted-foreground uppercase tracking-widest flex items-center gap-1.5">
              <Award className="w-3 h-3" /> More Certifications
            </span>
            <div className="h-px flex-1 max-w-[80px] bg-border" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 max-w-5xl mx-auto">
            {others.map((cert, i) => (
              <CertCard key={cert.id} cert={cert} index={i} />
            ))}
          </div>
        </div>

      </div>
    </FloatingSection>
  );
};

export default CertificationsGalaxy;
