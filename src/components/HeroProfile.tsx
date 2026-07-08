import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Mail, Github, Linkedin, Code2, Cloud, Cpu, ExternalLink, Sparkles } from 'lucide-react';
import { personalInfo } from '@/data/portfolio';

// ── Geo hook ──────────────────────────────────────────────────────────────────
interface GeoData { country: string; countryCode: string; city: string; timezone: string; }

function useVisitorGeo(): GeoData | null {
  const [geo, setGeo] = useState<GeoData | null>(null);
  useEffect(() => {
    (async () => {
      try {
        const r = await fetch('https://get.geojs.io/v1/ip/geo.json');
        if (r.ok) {
          const d = await r.json();
          if (d.country) {
            setGeo({
              country: d.country,
              countryCode: (d.country_code || '').toUpperCase(),
              city: d.city || '',
              timezone: d.timezone || 'UTC'
            });
            return;
          }
        }
      } catch { /* silent */ }
      const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
      const map: Record<string, [string, string]> = {
        'Africa/Casablanca': ['Morocco','MA'], 'Africa/Cairo': ['Egypt','EG'],
        'Europe/Paris': ['France','FR'], 'Europe/London': ['United Kingdom','GB'],
        'Europe/Berlin': ['Germany','DE'], 'America/New_York': ['United States','US'],
        'America/Los_Angeles': ['United States','US'], 'Asia/Tokyo': ['Japan','JP'],
        'Asia/Dubai': ['UAE','AE'], 'Asia/Riyadh': ['Saudi Arabia','SA'], 'Asia/Kolkata': ['India','IN'],
      };
      const [country, code] = map[tz] ?? ['Unknown','UN'];
      setGeo({ country, countryCode: code, city: '', timezone: tz });
    })();
  }, []);
  return geo;
}

// ── Flag image via flagcdn.com — larger, cleaner, works on all platforms ──────
const FlagImage: React.FC<{ code: string }> = ({ code }) => {
  const lower = code.toLowerCase();
  if (!lower || lower === 'un') {
    return (
      <span className="flex items-center justify-center w-8 h-6 text-lg leading-none">🌍</span>
    );
  }
  return (
    <img
      src={`https://flagcdn.com/40x30/${lower}.png`}
      srcSet={`https://flagcdn.com/80x60/${lower}.png 2x`}
      width={40}
      height={30}
      alt={`Flag of ${code}`}
      className="rounded flex-shrink-0 shadow-md border border-white/10"
      style={{ objectFit: 'cover', display: 'block' }}
      onError={e => {
        const img = e.target as HTMLImageElement;
        img.style.display = 'none';
        const span = document.createElement('span');
        span.textContent = '🌍';
        span.style.fontSize = '1.25rem';
        img.parentNode?.insertBefore(span, img.nextSibling);
      }}
    />
  );
};

// ── Ticking clock — same pattern as navbar, always fresh ─────────────────────
function useClock(tz?: string) {
  const [timeStr, setTimeStr] = useState('');
  const [dateStr, setDateStr] = useState('');
  useEffect(() => {
    const tick = () => {
      const now = new Date();
      const opts = tz ? { timeZone: tz } : {};
      setTimeStr(now.toLocaleTimeString('en-US', { ...opts, hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false }));
      setDateStr(now.toLocaleDateString('en-US', { ...opts, weekday: 'short', month: 'short', day: 'numeric' }));
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [tz]);
  return { timeStr, dateStr };
}

// ── Greeting based on visitor's country ──────────────────────────────────────
function getGreeting(geo: GeoData): string {
  const greetings: Record<string, string> = {
    FR: 'Bonjour', DE: 'Hallo', ES: 'Hola', IT: 'Ciao', PT: 'Olá',
    JP: 'こんにちは', CN: ' 你好', KR: '안녕하세요', SA: 'مرحباً',
    MA: 'مرحباً', EG: 'أهلاً', AE: 'أهلاً', RU: 'Привет',
  };
  const word = greetings[geo.countryCode] ?? 'Hello';
  const loc = geo.city ? `${geo.city}, ${geo.country}` : geo.country;
  return `${word} — thanks for visiting from ${loc}!`;
}

// ── Typing animation hook ─────────────────────────────────────────────────────
const ROLES = [
  'Software Engineer',
  'Full Stack Developer',
  'AI Solutions Builder',
  'Backend Engineer',
];

function useTyping(words: string[], speed = 80, pause = 1800) {
  const [displayed, setDisplayed] = useState('');
  const [wordIdx, setWordIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = words[wordIdx];
    let delay = deleting ? speed / 2 : speed;

    if (!deleting && charIdx === current.length) {
      delay = pause;
      const t = setTimeout(() => setDeleting(true), delay);
      return () => clearTimeout(t);
    }
    if (deleting && charIdx === 0) {
      setDeleting(false);
      setWordIdx(i => (i + 1) % words.length);
      return;
    }

    const t = setTimeout(() => {
      setCharIdx(i => i + (deleting ? -1 : 1));
      setDisplayed(current.slice(0, charIdx + (deleting ? -1 : 1)));
    }, delay);
    return () => clearTimeout(t);
  }, [charIdx, deleting, wordIdx, words, speed, pause]);

  return displayed;
}

// ── Animated canvas background ────────────────────────────────────────────────
const TechParticles: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    const resize = () => {
      canvas.width  = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // Nodes
    const COUNT = 55;
    type Node = { x: number; y: number; vx: number; vy: number; r: number; opacity: number };
    const nodes: Node[] = Array.from({ length: COUNT }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
      r: 1.5 + Math.random() * 2,
      opacity: 0.3 + Math.random() * 0.5,
    }));

    // Tech labels that float
    const LABELS = ['Java', 'React', 'Spring', 'AWS', 'Docker', 'K8s', 'SQL', 'Git', 'AI', 'TypeScript', 'OCI', 'Python'];
    type Label = { x: number; y: number; vx: number; vy: number; text: string; opacity: number };
    const labels: Label[] = LABELS.map(text => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.2,
      vy: (Math.random() - 0.5) * 0.2,
      text,
      opacity: 0.06 + Math.random() * 0.08,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw floating tech labels
      ctx.font = '11px "Space Mono", monospace';
      labels.forEach(l => {
        l.x += l.vx; l.y += l.vy;
        if (l.x < -60) l.x = canvas.width + 10;
        if (l.x > canvas.width + 60) l.x = -10;
        if (l.y < -20) l.y = canvas.height + 10;
        if (l.y > canvas.height + 20) l.y = -10;
        ctx.fillStyle = `rgba(139,92,246,${l.opacity})`;
        ctx.fillText(l.text, l.x, l.y);
      });

      // Move nodes
      nodes.forEach(n => {
        n.x += n.vx; n.y += n.vy;
        if (n.x < 0 || n.x > canvas.width)  n.vx *= -1;
        if (n.y < 0 || n.y > canvas.height) n.vy *= -1;
      });

      // Draw edges
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 110) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(139,92,246,${0.12 * (1 - dist / 110)})`;
            ctx.lineWidth = 0.8;
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.stroke();
          }
        }
      }

      // Draw nodes
      nodes.forEach(n => {
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(139,92,246,${n.opacity})`;
        ctx.fill();
      });

      animId = requestAnimationFrame(draw);
    };

    draw();
    return () => { cancelAnimationFrame(animId); window.removeEventListener('resize', resize); };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ opacity: 0.6 }}
    />
  );
};

// ── HeroProfile ───────────────────────────────────────────────────────────────
const HeroProfile: React.FC = () => {
  const geo    = useVisitorGeo();
  const clock  = useClock(geo?.timezone);
  const role   = useTyping(ROLES);

  const pills = [
    { icon: Code2,  label: 'Java · Spring Boot · React' },
    { icon: Cloud,  label: 'AWS · OCI · Docker · K8s'   },
    { icon: Cpu,    label: 'AI Solutions Builder'        },
  ];

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center pt-14 px-4 overflow-hidden">

      {/* Animated tech network background */}
      <TechParticles />

      {/* Soft radial glow behind card */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[600px] h-[600px] rounded-full bg-primary/5 blur-[120px]" />
      </div>

      <div className="relative z-10 w-full max-w-2xl">

        {/* ── Visitor banner — always visible, always ticking ──────────────── */}
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-5 px-4 py-3 rounded-xl bg-card/60 backdrop-blur-sm border border-border"
        >
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">

            {/* Flag + greeting */}
            <div className="flex items-center gap-3">
              {geo ? (
                <>
                  <FlagImage code={geo.countryCode} />
                  <div>
                    <p className="text-xs font-medium text-foreground flex items-center gap-1 flex-wrap">
                      <Sparkles className="w-3 h-3 text-primary flex-shrink-0" />
                      <span>
                        {(() => {
                          const greetings: Record<string, string> = {
                            FR: 'Bonjour', DE: 'Hallo', ES: 'Hola', IT: 'Ciao', PT: 'Olá',
                            JP: 'こんにちは', CN: '你好', KR: '안녕하세요', SA: 'مرحباً',
                            MA: 'مرحباً', EG: 'أهلاً', AE: 'أهلاً', RU: 'Привет',
                          };
                          return greetings[geo.countryCode] ?? 'Hello';
                        })()}
                      </span>
                      <span className="text-muted-foreground">— thanks for visiting</span>
                    </p>
                    <p className="text-xs text-muted-foreground mt-0.5 flex items-center gap-1">
                      <MapPin className="w-3 h-3 flex-shrink-0" />
                      {geo.city ? `${geo.city}, ${geo.country}` : geo.country}
                    </p>
                  </div>
                </>
              ) : (
                <span className="text-xs text-muted-foreground animate-pulse flex items-center gap-1.5">
                  <MapPin className="w-3 h-3" /> Detecting location…
                </span>
              )}
            </div>

            {/* Live clock */}
            <div className="font-mono text-right sm:flex-shrink-0 pl-[52px] sm:pl-0">
              <div className="text-sm font-semibold text-foreground tabular-nums tracking-tight">
                {clock.timeStr}
              </div>
              <div className="text-[11px] text-muted-foreground">{clock.dateStr}</div>
            </div>

          </div>
        </motion.div>

        {/* ── Profile card ─────────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="rounded-2xl border border-border bg-card/60 backdrop-blur-sm p-7"
        >
          {/* Avatar + identity */}
          <div className="flex items-start gap-5 mb-5">
            <div className="w-16 h-16 rounded-2xl bg-primary/15 border border-primary/20
                            flex items-center justify-center flex-shrink-0 relative overflow-hidden">
              {/* Subtle shimmer on avatar */}
              <motion.div
                animate={{ x: ['-100%', '200%'] }}
                transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 3, ease: 'easeInOut' }}
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12"
              />
              <span className="text-xl font-bold text-primary relative z-10">OZ</span>
            </div>

            <div>
              <div className="flex flex-wrap items-center gap-2 mb-1">
                <h1 className="text-2xl font-bold tracking-tight">
                  {personalInfo.firstName}{' '}
                  <span className="text-primary">{personalInfo.lastName}</span>
                </h1>
                <span className="flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px]
                                 font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Available
                </span>
              </div>
              <p className="text-muted-foreground text-sm min-h-[1.25rem]">
                <span className="text-foreground font-medium">{role}</span>
                <span className="animate-pulse text-primary ml-0.5">|</span>
              </p>
              <div className="flex items-center gap-1.5 mt-1.5 text-xs text-muted-foreground">
                <MapPin className="w-3 h-3" /> Morocco
              </div>
            </div>
          </div>

          {/* Bio */}
          <p className="text-sm text-muted-foreground leading-relaxed mb-5">
            I build scalable backend systems and AI-powered applications. Java specialist with
            hands-on experience in LLMs, cloud architecture, and full-stack development.
          </p>

          {/* Tech pills */}
          <div className="flex flex-wrap gap-2 mb-6">
            {pills.map(({ icon: Icon, label }) => (
              <span key={label}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg
                           bg-muted/60 border border-border text-xs text-muted-foreground">
                <Icon className="w-3.5 h-3.5 text-primary" />
                {label}
              </span>
            ))}
          </div>

          {/* Actions — no big Download Resume, just clean links */}
          <div className="flex flex-wrap items-center gap-2.5">

            {/* Open to work chip */}
            <a
              href={`mailto:${personalInfo.email}`}
              className="flex items-center gap-2 px-4 py-2 rounded-full
                         bg-primary text-primary-foreground text-sm font-medium
                         hover:opacity-90 transition-opacity"
            >
              <Mail className="w-3.5 h-3.5" />
              Get in touch
            </a>

            {/* Docs link */}
            <a
              href="https://docs.oussamazbair.engineer"
              target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-4 py-2 rounded-full border border-border
                         text-sm font-medium text-muted-foreground hover:text-primary
                         hover:border-primary/40 transition-all"
            >
              Engineering Docs <ExternalLink className="w-3.5 h-3.5" />
            </a>

            {/* Social icons */}
            <div className="flex items-center gap-1.5 ml-auto">
              <a href="https://github.com/oussama-zbair" target="_blank" rel="noopener noreferrer"
                aria-label="GitHub"
                className="p-2 rounded-lg border border-border text-muted-foreground
                           hover:text-foreground hover:border-primary/40 transition-all">
                <Github className="w-4 h-4" />
              </a>
              <a href="https://www.linkedin.com/in/oussama-zbair" target="_blank" rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="p-2 rounded-lg border border-border text-muted-foreground
                           hover:text-foreground hover:border-primary/40 transition-all">
                <Linkedin className="w-4 h-4" />
              </a>
              <a href="https://oussama-zbair.medium.com" target="_blank" rel="noopener noreferrer"
                aria-label="Medium"
                className="p-2 rounded-lg border border-border text-muted-foreground
                           hover:text-foreground hover:border-primary/40 transition-all text-xs font-bold">
                M
              </a>
            </div>
          </div>
        </motion.div>

        {/* Scroll hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="flex flex-col items-center mt-8 gap-1"
        >
          <span className="text-xs text-muted-foreground/40">Scroll to explore</span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
            className="text-muted-foreground/30 text-sm"
          >
            ↓
          </motion.div>
        </motion.div>

      </div>
    </div>
  );
};

export default HeroProfile;
