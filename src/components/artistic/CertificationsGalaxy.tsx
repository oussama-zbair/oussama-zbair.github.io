import React from 'react';
import { motion } from 'framer-motion';
import { Award, ExternalLink, CheckCircle2, Star } from 'lucide-react';
import { certifications } from '@/data/portfolio';
import FloatingSection from './FloatingSection';

// ── Issuer config ─────────────────────────────────────────────────────────────
const ISSUERS: Record<string, { color: string; bg: string; border: string; logo: string; svg?: string }> = {
  // ── Inline SVGs (removed from simple-icons or not available) ────────────────
  oracle: {
    color: '#F80000',
    bg: 'rgba(248,0,0,0.08)',
    border: 'rgba(248,0,0,0.25)',
    logo: '',
    svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 33"><ellipse cx="50" cy="16.5" rx="49" ry="15.5" fill="#F80000"/><ellipse cx="50" cy="16.5" rx="30" ry="15.5" fill="#fff"/></svg>',
  },
  microsoft: {
    color: '#00A4EF',
    bg: 'rgba(0,164,239,0.08)',
    border: 'rgba(0,164,239,0.25)',
    logo: '',
    svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 21 21"><rect x="1" y="1" width="9" height="9" fill="#F25022"/><rect x="11" y="1" width="9" height="9" fill="#7FBA00"/><rect x="1" y="11" width="9" height="9" fill="#00A4EF"/><rect x="11" y="11" width="9" height="9" fill="#FFB900"/></svg>',
  },
  certiprof: {
    color: '#3b82f6',
    bg: 'rgba(59,130,246,0.08)',
    border: 'rgba(59,130,246,0.25)',
    logo: '',
    svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" fill="none" stroke="#3b82f6" stroke-width="2"/><path d="M8 12l3 3 5-5" fill="none" stroke="#3b82f6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  },
  // ── simple-icons CDN slugs (confirmed available) ─────────────────────────────
  aws: {
    color: '#FF9900',
    bg: 'rgba(255,153,0,0.08)',
    border: 'rgba(255,153,0,0.25)',
    logo: '',
    svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="#FF9900" d="M6.763 10.036c0 .296.032.535.088.71.064.176.144.368.256.576.04.064.056.128.056.184 0 .08-.048.16-.152.24l-.504.336a.383.383 0 0 1-.208.072c-.08 0-.16-.04-.24-.112a2.473 2.473 0 0 1-.288-.376 6.212 6.212 0 0 1-.248-.471c-.622.734-1.405 1.101-2.347 1.101-.67 0-1.205-.191-1.596-.574-.391-.384-.59-.894-.59-1.533 0-.678.239-1.23.726-1.644.487-.415 1.133-.623 1.955-.623.272 0 .551.024.846.064.296.04.6.104.918.176v-.583c0-.607-.127-1.030-.375-1.277-.255-.248-.686-.368-1.3-.368-.28 0-.568.031-.863.103-.295.072-.583.16-.862.272a2.29 2.29 0 0 1-.28.104.488.488 0 0 1-.127.023c-.112 0-.168-.08-.168-.247v-.391c0-.128.016-.224.056-.28a.597.597 0 0 1 .224-.167 4.572 4.572 0 0 1 .998-.352 4.8 4.8 0 0 1 1.237-.152c.943 0 1.633.215 2.077.646.436.43.662 1.085.662 1.963v2.586zm-3.24 1.214c.263 0 .534-.048.822-.144.287-.096.543-.271.758-.51.128-.152.224-.32.272-.504.047-.184.08-.406.08-.662v-.32a6.716 6.716 0 0 0-.735-.136 6.024 6.024 0 0 0-.75-.048c-.535 0-.926.104-1.19.32-.263.215-.39.518-.39.917 0 .375.095.655.295.846.191.2.47.24.838.24zm6.41.862c-.144 0-.24-.024-.304-.08-.063-.048-.12-.16-.168-.311L7.586 5.55a1.398 1.398 0 0 1-.072-.32c0-.128.064-.2.191-.2h.783c.151 0 .255.025.31.08.065.048.113.16.16.312l1.342 5.284 1.246-5.284c.04-.16.088-.264.151-.312a.549.549 0 0 1 .32-.08h.638c.152 0 .256.025.32.08.063.048.12.16.151.312l1.262 5.348 1.382-5.348c.048-.16.104-.264.16-.312a.52.52 0 0 1 .311-.08h.743c.128 0 .2.065.2.2 0 .04-.009.08-.017.128a1.137 1.137 0 0 1-.056.2l-1.924 6.17c-.048.16-.104.263-.168.311a.51.51 0 0 1-.303.08h-.687a.49.49 0 0 1-.32-.08c-.063-.056-.12-.16-.15-.32L12.59 7.006l-1.23 5.134c-.04.16-.088.264-.15.32a.513.513 0 0 1-.32.08h-.686zm10.126.215c-.415 0-.83-.048-1.23-.143-.399-.096-.71-.2-.918-.32-.128-.071-.215-.151-.247-.224a.56.56 0 0 1-.048-.224v-.407c0-.167.064-.247.183-.247.048 0 .096.008.144.024.048.016.12.048.2.08.27.12.566.215.878.28.32.063.63.095.95.095.503 0 .894-.088 1.165-.264a.86.86 0 0 0 .406-.758.777.777 0 0 0-.215-.559c-.144-.151-.415-.287-.806-.415l-1.157-.36c-.583-.183-1.014-.454-1.277-.813a1.902 1.902 0 0 1-.4-1.158c0-.335.073-.63.216-.886.143-.255.335-.479.574-.662.24-.184.51-.32.83-.415.32-.096.655-.136 1.006-.136.175 0 .359.008.535.032.183.024.35.056.51.088.16.04.312.08.455.127.144.048.256.096.336.144a.69.69 0 0 1 .24.2.43.43 0 0 1 .072.255v.375c0 .168-.064.256-.184.256a.83.83 0 0 1-.303-.096 3.652 3.652 0 0 0-1.533-.311c-.455 0-.815.071-1.062.223-.248.152-.375.383-.375.702 0 .216.08.4.24.552.159.151.454.303.877.43l1.134.358c.574.184.99.44 1.237.767.247.327.367.702.367 1.117 0 .343-.07.655-.207.926-.144.272-.336.511-.583.703-.248.2-.543.343-.886.44-.36.104-.742.152-1.157.152zM21.698 16.207c-2.626 1.94-6.442 2.969-9.722 2.969-4.598 0-8.74-1.7-11.87-4.526-.247-.223-.025-.527.27-.352 3.384 1.963 7.563 3.153 11.877 3.153 2.914 0 6.115-.607 9.06-1.852.446-.191.822.295.385.608z"/></svg>',
  },
  google:           { color: '#4285F4', bg: 'rgba(66,133,244,0.08)', border: 'rgba(66,133,244,0.25)',  logo: 'google' },
  github:           { color: '#ffffff', bg: 'rgba(255,255,255,0.06)',border: 'rgba(255,255,255,0.15)', logo: 'github' },
  ibm:              { color: '#0062FF', bg: 'rgba(0,98,255,0.08)',    border: 'rgba(0,98,255,0.25)',    logo: 'ibm' },
  hackerrank:       { color: '#00EA64', bg: 'rgba(0,234,100,0.08)',   border: 'rgba(0,234,100,0.25)',   logo: 'hackerrank' },
  coursera:         { color: '#0056D2', bg: 'rgba(0,86,210,0.08)',    border: 'rgba(0,86,210,0.25)',    logo: 'coursera' },
  'linux-foundation': { color: '#FCC624', bg: 'rgba(252,198,36,0.08)', border: 'rgba(252,198,36,0.25)', logo: 'linuxfoundation' },
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
            {cfg.svg ? (
              <span
                className="flex-shrink-0"
                style={{ width: featured ? 20 : 16, height: featured ? 20 : 16, display: 'inline-flex' }}
                dangerouslySetInnerHTML={{ __html: cfg.svg }}
              />
            ) : cfg.logo ? (
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
