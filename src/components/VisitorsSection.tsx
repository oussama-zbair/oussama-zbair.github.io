import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, TrendingUp, Users } from 'lucide-react';

// ── Types ─────────────────────────────────────────────────────────────────────
interface VisitorEntry {
  country: string;
  countryCode: string;
  city: string;
  lat: number;
  lon: number;
  timestamp: number;
}
interface GeoData {
  country: string;
  country_code: string;
  city: string;
  latitude: string;
  longitude: string;
  timezone: string;
}

// ── Constants ──────────────────────────────────────────────────────────────────
const STORAGE_KEY     = 'oz_visitors_log_v2';
const MAX_STORED      = 30;
const DECAY_MS        = 14 * 24 * 60 * 60 * 1000;
const COUNT_NAMESPACE = 'oussamazbair-engineer';
const COUNT_KEY       = 'visitors';

// ── Known country coordinates fallback ───────────────────────────────────────
const COUNTRY_COORDS: Record<string, [number, number]> = {
  MA:[31.79,-7.09], FR:[46.23,2.21], DE:[51.16,10.45], ES:[40.46,-3.74],
  GB:[55.37,-3.43], US:[37.09,-95.71], CA:[56.13,-106.34], BR:[-14.23,-51.92],
  JP:[36.20,138.25], CN:[35.86,104.19], IN:[20.59,78.96], AU:[-25.27,133.77],
  RU:[61.52,105.31], ZA:[-30.55,22.93], EG:[26.82,30.80], SA:[23.88,45.07],
  AE:[23.42,53.84], TR:[38.96,35.24], IT:[41.87,12.56], NL:[52.13,5.29],
  PT:[39.39,-8.22], PL:[51.91,19.14], SE:[60.12,18.64], NO:[60.47,8.47],
  MX:[23.63,-102.55], AR:[-38.41,-63.61], CO:[4.57,-74.29], NG:[9.08,8.67],
  KE:[-0.02,37.90], PH:[12.87,121.77], ID:[-0.78,113.92], TH:[15.87,100.99],
  VN:[14.05,108.27], KR:[35.90,127.76], SG:[1.35,103.82], MY:[4.21,101.97],
  PK:[30.37,69.34], BD:[23.68,90.35], IQ:[33.22,43.68], IR:[32.42,53.68],
  NZ:[-40.90,174.88], UA:[48.37,31.16], RO:[45.94,24.96], CZ:[49.81,15.47],
  HU:[47.16,19.50], GR:[39.07,21.82], BE:[50.50,4.46], CH:[46.81,8.22],
  AT:[47.51,14.55], DK:[56.26,9.50], FI:[61.92,25.74], SK:[48.66,19.69],
};

function getCoords(countryCode: string): [number, number] {
  return COUNTRY_COORDS[countryCode.toUpperCase()] ?? [0, 0];
}

// Equirectangular projection
function latLonToXY(lat: number, lon: number, w: number, h: number): [number, number] {
  const x = ((lon + 180) / 360) * w;
  const y = ((90 - lat) / 180) * h;
  return [x, y];
}

// ── Helpers ────────────────────────────────────────────────────────────────────
function flagImg(code: string) {
  const lower = code.toLowerCase();
  if (!lower || lower === 'un') return null;
  return `https://flagcdn.com/20x15/${lower}.png`;
}

function timeAgo(ts: number): string {
  const s = Math.floor((Date.now() - ts) / 1000);
  if (s < 60)    return 'just now';
  if (s < 3600)  return `${Math.floor(s / 60)}m ago`;
  if (s < 86400) return `${Math.floor(s / 3600)}h ago`;
  return `${Math.floor(s / 86400)}d ago`;
}

function loadVisitors(): VisitorEntry[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const all: VisitorEntry[] = raw ? JSON.parse(raw) : [];
    return all.filter(v => Date.now() - v.timestamp < DECAY_MS);
  } catch { return []; }
}

function saveVisitors(e: VisitorEntry[]) {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(e)); } catch {}
}

function addVisitor(geo: GeoData, entries: VisitorEntry[]): VisitorEntry[] {
  const code = (geo.country_code || '').toUpperCase();
  const [lat, lon] = getCoords(code);
  const entry: VisitorEntry = {
    country:     geo.country || 'Unknown',
    countryCode: code,
    city:        geo.city || '',
    lat:         parseFloat(geo.latitude) || lat,
    lon:         parseFloat(geo.longitude) || lon,
    timestamp:   Date.now(),
  };
  const filtered = entries.filter(e => e.countryCode !== code);
  return [entry, ...filtered].slice(0, MAX_STORED);
}

async function bumpCount(): Promise<number | null> {
  try {
    const r = await fetch(`https://api.countapi.xyz/hit/${COUNT_NAMESPACE}/${COUNT_KEY}`, { cache: 'no-store' });
    if (!r.ok) return null;
    return (await r.json()).value ?? null;
  } catch { return null; }
}

// ── Animated counter ───────────────────────────────────────────────────────────
const Counter: React.FC<{ value: number }> = ({ value }) => {
  const [d, setD] = useState(0);
  const prev = useRef(0);
  useEffect(() => {
    const start = prev.current, end = value, t0 = performance.now(), dur = 1400;
    const tick = (now: number) => {
      const p = Math.min((now - t0) / dur, 1);
      const e = 1 - Math.pow(1 - p, 3);
      setD(Math.round(start + (end - start) * e));
      if (p < 1) requestAnimationFrame(tick); else prev.current = end;
    };
    requestAnimationFrame(tick);
  }, [value]);
  return <>{d.toLocaleString()}</>;
};

// ── World map canvas ───────────────────────────────────────────────────────────
interface Dot {
  x: number; y: number;
  lat: number; lon: number;
  country: string; code: string;
  pulse: number;   // 0–1 phase
  isCurrent: boolean;
}

interface Arc {
  x1: number; y1: number;
  x2: number; y2: number;
  progress: number; // 0–1
  speed: number;
  color: string;
}

const WorldMap: React.FC<{ visitors: VisitorEntry[]; currentCode: string }> = ({ visitors, currentCode }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef   = useRef<number>(0);
  const arcsRef   = useRef<Arc[]>([]);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const W = canvas.width;
    const H = canvas.height;
    ctx.clearRect(0, 0, W, H);

    // ── Background gradient ──────────────────────────────────────────────────
    const bg = ctx.createRadialGradient(W / 2, H / 2, 0, W / 2, H / 2, W * 0.6);
    bg.addColorStop(0, 'rgba(139,92,246,0.06)');
    bg.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, W, H);

    // ── Latitude grid lines ──────────────────────────────────────────────────
    ctx.strokeStyle = 'rgba(139,92,246,0.07)';
    ctx.lineWidth = 0.5;
    for (let lat = -60; lat <= 60; lat += 30) {
      const [, y] = latLonToXY(lat, 0, W, H);
      ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke();
    }
    for (let lon = -150; lon <= 150; lon += 60) {
      const [x] = latLonToXY(0, lon, W, H);
      ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke();
    }

    // ── Continent silhouette dots (simplified) ──────────────────────────────
    const LAND_DOTS: [number, number][] = [
      // Europe
      [52,13],[48,2],[41,13],[40,-4],[51,-1],[59,18],[60,25],[47,19],[45,14],
      [64,26],[56,10],[50,14],[38,23],[47,8],[46,15],
      // North America
      [40,-74],[34,-118],[41,-87],[29,-95],[45,-75],[43,-79],[37,-122],
      [51,-114],[49,-123],[32,-117],[25,-80],[42,-71],
      // South America
      [-23,-43],[-34,-58],[-12,-77],[4,-74],[-16,-68],[-33,-70],[5,-53],
      [-15,-47],[-27,-48],[-22,-63],
      // Africa
      [30,31],[6,3],[-26,28],[14,17],[0,38],[-18,47],[36,3],[15,32],
      [-1,36],[10,7],[12,15],[-8,14],[33,-7],
      // Asia
      [35,139],[31,121],[28,77],[23,113],[13,100],[1,104],[37,127],
      [55,37],[39,116],[51,71],[25,51],[33,44],[40,47],[43,77],[56,60],
      [60,90],[53,104],[25,85],[33,65],[15,101],
      // Oceania
      [-33,151],[-37,144],[-27,153],[-31,115],[-41,174],[-36,174],
    ];
    LAND_DOTS.forEach(([lat, lon]) => {
      const [x, y] = latLonToXY(lat, lon, W, H);
      ctx.beginPath();
      ctx.arc(x, y, 1.2, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(139,92,246,0.18)';
      ctx.fill();
    });

    // ── Arcs between visitor dots ────────────────────────────────────────────
    arcsRef.current = arcsRef.current
      .map(a => ({ ...a, progress: Math.min(a.progress + a.speed, 1) }))
      .filter(a => a.progress < 1);

    arcsRef.current.forEach(arc => {
      const mx = (arc.x1 + arc.x2) / 2;
      const my = Math.min(arc.y1, arc.y2) - 30;
      const p  = arc.progress;

      // Quadratic bezier point
      const bx = (1 - p) * (1 - p) * arc.x1 + 2 * (1 - p) * p * mx + p * p * arc.x2;
      const by = (1 - p) * (1 - p) * arc.y1 + 2 * (1 - p) * p * my + p * p * arc.y2;

      ctx.save();
      ctx.beginPath();
      ctx.moveTo(arc.x1, arc.y1);
      ctx.quadraticCurveTo(mx, my, bx, by);
      ctx.strokeStyle = arc.color;
      ctx.lineWidth = 1;
      ctx.stroke();

      // Moving dot on arc
      ctx.beginPath();
      ctx.arc(bx, by, 2.5, 0, Math.PI * 2);
      ctx.fillStyle = arc.color;
      ctx.fill();
      ctx.restore();
    });

    // ── Visitor dots ─────────────────────────────────────────────────────────
    const now = Date.now() / 1000;
    visitors.forEach((v, i) => {
      const [x, y] = latLonToXY(v.lat, v.lon, W, H);
      const isCurrent = v.countryCode === currentCode;
      const phase = (now * 1.2 + i * 0.8) % 1;

      // Outer pulse ring
      if (isCurrent || i < 5) {
        ctx.save();
        ctx.beginPath();
        ctx.arc(x, y, 6 + phase * 14, 0, Math.PI * 2);
        ctx.strokeStyle = isCurrent
          ? `rgba(139,92,246,${0.6 * (1 - phase)})`
          : `rgba(236,72,153,${0.4 * (1 - phase)})`;
        ctx.lineWidth = 1.5;
        ctx.stroke();
        ctx.restore();
      }

      // Core dot
      ctx.save();
      ctx.beginPath();
      ctx.arc(x, y, isCurrent ? 5 : 3.5, 0, Math.PI * 2);
      const grad = ctx.createRadialGradient(x, y, 0, x, y, isCurrent ? 5 : 3.5);
      grad.addColorStop(0, isCurrent ? '#c4b5fd' : '#f9a8d4');
      grad.addColorStop(1, isCurrent ? '#7c3aed' : '#db2777');
      ctx.fillStyle = grad;
      ctx.shadowColor = isCurrent ? '#8b5cf6' : '#ec4899';
      ctx.shadowBlur  = isCurrent ? 12 : 6;
      ctx.fill();
      ctx.restore();
    });

    animRef.current = requestAnimationFrame(draw);
  }, [visitors, currentCode]);

  // Spawn arcs periodically
  useEffect(() => {
    if (visitors.length < 2) return;
    const id = setInterval(() => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const W = canvas.width, H = canvas.height;
      const a = visitors[Math.floor(Math.random() * visitors.length)];
      const b = visitors[Math.floor(Math.random() * visitors.length)];
      if (a.countryCode === b.countryCode) return;
      const [x1, y1] = latLonToXY(a.lat, a.lon, W, H);
      const [x2, y2] = latLonToXY(b.lat, b.lon, W, H);
      arcsRef.current.push({
        x1, y1, x2, y2,
        progress: 0,
        speed: 0.008 + Math.random() * 0.006,
        color: Math.random() > 0.5 ? 'rgba(139,92,246,0.55)' : 'rgba(236,72,153,0.45)',
      });
      // cap arcs
      if (arcsRef.current.length > 8) arcsRef.current.shift();
    }, 1800);
    return () => clearInterval(id);
  }, [visitors]);

  // Resize + start/stop animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const resize = () => {
      canvas.width  = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    animRef.current = requestAnimationFrame(draw);
    return () => { cancelAnimationFrame(animRef.current); ro.disconnect(); };
  }, [draw]);

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full"
      style={{ display: 'block' }}
    />
  );
};

// ── Main section ───────────────────────────────────────────────────────────────
const VisitorsSection: React.FC = () => {
  const [visitors,    setVisitors]  = useState<VisitorEntry[]>([]);
  const [totalCount,  setTotal]     = useState<number | null>(null);
  const [currentCode, setCurrent]   = useState('');
  const [counted,     setCounted]   = useState(false);
  const [expanded,    setExpanded]  = useState(false);

  useEffect(() => {
    if (counted) return;
    setCounted(true);
    const stored = loadVisitors();
    setVisitors(stored);

    Promise.all([
      fetch('https://get.geojs.io/v1/ip/geo.json').then(r => r.ok ? r.json() as Promise<GeoData> : null).catch(() => null),
      bumpCount(),
    ]).then(([geo, count]) => {
      if (count !== null) setTotal(count);
      if (geo?.country) {
        setCurrent((geo.country_code || '').toUpperCase());
        const updated = addVisitor(geo, stored);
        setVisitors(updated);
        saveVisitors(updated);
      }
    });
  }, [counted]);

  const shown = expanded ? visitors : visitors.slice(0, 5);

  return (
    <section className="py-16 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[500px] h-[300px] rounded-full bg-primary/5 blur-[100px]" />
      </div>

      <div className="container mx-auto px-4 max-w-5xl relative z-10">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8"
        >
          <span className="text-xs font-mono text-primary tracking-[0.3em] uppercase">Live</span>
          <h2 className="text-3xl md:text-4xl font-bold mt-3 text-foreground">
            Visitors Around the <span className="gradient-text">World</span>
          </h2>
          <p className="text-muted-foreground mt-2 text-sm max-w-md mx-auto">
            Real people who visited this portfolio — tracked by country
          </p>
        </motion.div>

        {/* Main layout: map + sidebar */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-4"
        >

          {/* ── Animated world map ─────────────────────────────────────────── */}
          <div className="lg:col-span-2 rounded-2xl border border-border bg-card/40 backdrop-blur-sm overflow-hidden" style={{ minHeight: '280px' }}>
            {/* Map header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-muted/20">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-xs font-mono text-muted-foreground">Live globe</span>
              </div>
              <div className="flex items-center gap-3 text-[11px] text-muted-foreground">
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-primary inline-block" />
                  You
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-accent inline-block" />
                  Visitor
                </span>
              </div>
            </div>
            <div style={{ height: '240px' }}>
              <WorldMap visitors={visitors} currentCode={currentCode} />
            </div>
          </div>

          {/* ── Stats + feed ────────────────────────────────────────────────── */}
          <div className="flex flex-col gap-3">

            {/* Stats */}
            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-2xl border border-border bg-card/50 p-4 text-center">
                <TrendingUp className="w-4 h-4 text-primary mx-auto mb-1" />
                <div className="text-xl font-black text-foreground tabular-nums">
                  {totalCount !== null ? <Counter value={totalCount} /> : '—'}
                </div>
                <div className="text-[11px] text-muted-foreground mt-0.5">Total Visits</div>
              </div>
              <div className="rounded-2xl border border-border bg-card/50 p-4 text-center">
                <Users className="w-4 h-4 text-primary mx-auto mb-1" />
                <div className="text-xl font-black text-foreground">{visitors.length}</div>
                <div className="text-[11px] text-muted-foreground mt-0.5">Countries</div>
              </div>
            </div>

            {/* Visitor feed */}
            <div className="rounded-2xl border border-border bg-card/40 backdrop-blur-sm overflow-hidden flex-1">
              <div className="px-3 py-2.5 border-b border-border bg-muted/20">
                <span className="text-[11px] font-mono text-muted-foreground uppercase tracking-widest">
                  Recent visitors
                </span>
              </div>
              <div className="divide-y divide-border/50">
                <AnimatePresence initial={false}>
                  {shown.length === 0 ? (
                    <div className="py-8 text-center text-muted-foreground text-xs">
                      Detecting…
                    </div>
                  ) : shown.map((v, i) => (
                    <motion.div
                      key={`${v.countryCode}-${v.timestamp}`}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.04 }}
                      className={`flex items-center gap-2.5 px-3 py-2 transition-colors ${
                        v.countryCode === currentCode
                          ? 'bg-primary/8 border-l-2 border-l-primary'
                          : 'hover:bg-muted/20'
                      }`}
                    >
                      {/* Flag image */}
                      <div className="flex-shrink-0 w-5">
                        {flagImg(v.countryCode) ? (
                          <img src={flagImg(v.countryCode)!} alt={v.countryCode}
                            width={20} height={15}
                            className="rounded-sm shadow-sm object-cover" />
                        ) : (
                          <span className="text-sm">🌍</span>
                        )}
                      </div>

                      {/* Location */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1">
                          <span className="text-xs font-medium text-foreground truncate">
                            {v.city ? `${v.city}` : v.country}
                          </span>
                          {v.countryCode === currentCode && (
                            <span className="text-[9px] font-bold text-primary bg-primary/10 px-1 py-0.5 rounded flex-shrink-0">
                              YOU
                            </span>
                          )}
                        </div>
                        <div className="text-[10px] text-muted-foreground">{v.country}</div>
                      </div>

                      {/* Time */}
                      <span className="text-[10px] text-muted-foreground font-mono flex-shrink-0">
                        {timeAgo(v.timestamp)}
                      </span>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>

              {visitors.length > 5 && (
                <button
                  onClick={() => setExpanded(v => !v)}
                  className="w-full py-2 text-[11px] text-muted-foreground hover:text-primary
                             hover:bg-muted/20 transition-colors border-t border-border"
                >
                  {expanded ? '↑ Less' : `↓ +${visitors.length - 5} more`}
                </button>
              )}
            </div>
          </div>
        </motion.div>

        {/* Privacy note */}
        <p className="text-center text-[10px] text-muted-foreground/40 mt-4 flex items-center justify-center gap-1">
          <MapPin className="w-3 h-3" />
          Country/city level only · No personal data stored · No cookies
        </p>

      </div>
    </section>
  );
};

export default VisitorsSection;
