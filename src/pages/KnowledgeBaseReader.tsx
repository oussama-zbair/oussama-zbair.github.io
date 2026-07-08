import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft, Clock, Calendar, Award, Tag,
  BookOpen, ChevronRight, List, X, ExternalLink
} from 'lucide-react';
import { kbEntries, categoryColors, difficultyColors } from '../data/knowledgeBase';
import { loadKBContent } from '../utils/kbLoader';
import { renderMarkdown } from '../utils/markdownRenderer';

const KnowledgeBaseReader: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  const entry = kbEntries.find(e => e.slug === slug);

  const [html, setHtml] = useState('');
  const [toc, setToc] = useState<Array<{ id: string; title: string; level: number }>>([]);
  const [readingTime, setReadingTime] = useState('');
  const [loading, setLoading] = useState(true);
  const [tocOpen, setTocOpen] = useState(false);
  const [activeHeading, setActiveHeading] = useState('');
  const contentRef = useRef<HTMLDivElement>(null);

  // Load content
  useEffect(() => {
    if (!slug) return;
    setLoading(true);
    window.scrollTo({ top: 0 });

    loadKBContent(slug).then(result => {
      setHtml(renderMarkdown(result.raw));
      setToc(result.tableOfContents);
      setReadingTime(result.readingTime.text);
      setLoading(false);
    });
  }, [slug]);

  // Active heading tracker
  useEffect(() => {
    if (!toc.length) return;
    const observer = new IntersectionObserver(
      entries => {
        const visible = entries.find(e => e.isIntersecting);
        if (visible) setActiveHeading(visible.target.id);
      },
      { rootMargin: '-20% 0% -70% 0%', threshold: 0 }
    );
    toc.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [toc, html]);

  // Copy code snippet support
  useEffect(() => {
    (window as any).copyToClipboard = (button: HTMLButtonElement) => {
      const code = button.getAttribute('data-code') || '';
      navigator.clipboard.writeText(code).then(() => {
        const orig = button.innerHTML;
        button.innerHTML = '✓ Copied!';
        setTimeout(() => { button.innerHTML = orig; }, 2000);
      });
    };
  }, []);

  const scrollToHeading = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 100;
      window.scrollTo({ top, behavior: 'smooth' });
      setTocOpen(false);
    }
  };

  if (!entry) {
    return (
      <div className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center gap-4">
        <BookOpen className="w-12 h-12 text-muted-foreground" />
        <h1 className="text-2xl font-bold">Topic not found</h1>
        <p className="text-muted-foreground">The slug <code className="text-primary">{slug}</code> doesn't exist.</p>
        <button onClick={() => navigate('/knowledge')} className="mt-2 text-primary hover:underline text-sm">
          ← Back to Knowledge Base
        </button>
      </div>
    );
  }

  const catColors = categoryColors[entry.category];
  const diffColors = difficultyColors[entry.difficulty];

  return (
    <div className="min-h-screen bg-background text-foreground">

      {/* ── Sticky top bar ─────────────────────────────────────────────────── */}
      <div className="sticky top-0 z-40 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="max-w-6xl mx-auto px-4 h-14 flex items-center gap-3">
          <button
            onClick={() => navigate('/knowledge')}
            className="flex items-center gap-1.5 text-muted-foreground hover:text-foreground transition-colors text-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            Knowledge Base
          </button>
          <span className="text-border">/</span>
          <span className={`text-xs font-medium px-2 py-0.5 rounded-full border ${catColors.bg} ${catColors.text} ${catColors.border}`}>
            {entry.category}
          </span>
          <span className="hidden sm:block text-sm text-muted-foreground truncate">
            {entry.title}
          </span>

          {/* TOC toggle (mobile) */}
          {toc.length > 0 && (
            <button
              onClick={() => setTocOpen(true)}
              className="ml-auto lg:hidden flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground border border-border rounded-lg px-3 py-1.5"
            >
              <List className="w-3.5 h-3.5" /> Contents
            </button>
          )}
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-10 flex gap-10">

        {/* ── Main content ───────────────────────────────────────────────────── */}
        <main className="flex-1 min-w-0">

          {/* Article header */}
          <motion.header
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-10"
          >
            {entry.isNew && (
              <span className="inline-block mb-3 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-primary text-primary-foreground">
                NEW
              </span>
            )}
            <h1 className="text-3xl md:text-4xl font-bold mb-3">{entry.title}</h1>
            <p className="text-muted-foreground text-lg mb-6">{entry.subtitle}</p>

            {/* Meta row */}
            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-6">
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4" /> {readingTime || `${entry.readingMinutes} min read`}
              </span>
              <span className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4" />
                Updated {new Date(entry.lastUpdated).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
              </span>
              <span className={`flex items-center gap-1.5 ${diffColors.text}`}>
                <span className={`w-2 h-2 rounded-full ${diffColors.dot}`} />
                {entry.difficulty}
              </span>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-6">
              {entry.tags.map(tag => (
                <span key={tag} className="flex items-center gap-1 px-3 py-1 rounded-full bg-muted text-muted-foreground text-xs">
                  <Tag className="w-3 h-3" /> {tag}
                </span>
              ))}
            </div>

            {/* Certifications */}
            {entry.certifications.length > 0 && (
              <div className="flex flex-wrap gap-2 p-4 rounded-xl bg-primary/5 border border-primary/15">
                <div className="w-full flex items-center gap-2 text-xs font-medium text-primary mb-1">
                  <Award className="w-3.5 h-3.5" /> Covers these certifications
                </div>
                {entry.certifications.map(cert => (
                  <span key={cert} className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs border border-primary/20">
                    {cert}
                  </span>
                ))}
              </div>
            )}
          </motion.header>

          {/* Article body */}
          {loading ? (
            <LoadingSkeleton />
          ) : (
            <motion.div
              ref={contentRef}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="prose prose-neutral dark:prose-invert max-w-none kb-prose"
              dangerouslySetInnerHTML={{ __html: html }}
            />
          )}

          {/* ── Related entries ──────────────────────────────────────────────── */}
          <RelatedEntries currentSlug={entry.slug} category={entry.category} />
        </main>

        {/* ── Sidebar TOC (desktop) ──────────────────────────────────────────── */}
        {toc.length > 0 && (
          <aside className="hidden lg:block w-60 flex-shrink-0">
            <div className="sticky top-24">
              <p className="text-xs font-mono uppercase tracking-widest text-muted-foreground mb-3">
                On this page
              </p>
              <nav className="space-y-0.5">
                {toc.map(item => (
                  <button
                    key={item.id}
                    onClick={() => scrollToHeading(item.id)}
                    className={`w-full text-left text-xs py-1.5 rounded transition-colors truncate
                      ${item.level === 2 ? 'pl-0' : 'pl-3'}
                      ${activeHeading === item.id
                        ? 'text-primary font-medium'
                        : 'text-muted-foreground hover:text-foreground'
                      }`}
                  >
                    {item.level > 2 && (
                      <ChevronRight className="inline w-3 h-3 mr-1 opacity-50" />
                    )}
                    {item.title}
                  </button>
                ))}
              </nav>
            </div>
          </aside>
        )}
      </div>

      {/* ── Mobile TOC drawer ─────────────────────────────────────────────────── */}
      <AnimatePresence>
        {tocOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setTocOpen(false)}
              className="fixed inset-0 bg-black/50 z-50 lg:hidden"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="fixed right-0 top-0 bottom-0 w-72 bg-card border-l border-border z-50 lg:hidden p-6 overflow-y-auto"
            >
              <div className="flex items-center justify-between mb-4">
                <p className="text-xs font-mono uppercase tracking-widest text-muted-foreground">
                  On this page
                </p>
                <button onClick={() => setTocOpen(false)}>
                  <X className="w-4 h-4 text-muted-foreground" />
                </button>
              </div>
              <nav className="space-y-1">
                {toc.map(item => (
                  <button
                    key={item.id}
                    onClick={() => scrollToHeading(item.id)}
                    className={`w-full text-left text-sm py-2 rounded transition-colors
                      ${item.level === 2 ? 'pl-0' : 'pl-4'}
                      ${activeHeading === item.id
                        ? 'text-primary font-medium'
                        : 'text-muted-foreground hover:text-foreground'
                      }`}
                  >
                    {item.title}
                  </button>
                ))}
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Copy code script */}
      <script dangerouslySetInnerHTML={{ __html: `
        window.copyToClipboard = function(btn) {
          var code = btn.getAttribute('data-code');
          navigator.clipboard.writeText(code).then(function() {
            var orig = btn.innerHTML;
            btn.innerHTML = '✓ Copied!';
            setTimeout(function(){ btn.innerHTML = orig; }, 2000);
          });
        };
      `}} />
    </div>
  );
};

// ── Loading skeleton ──────────────────────────────────────────────────────────

const LoadingSkeleton: React.FC = () => (
  <div className="animate-pulse space-y-4">
    {[100, 90, 75, 100, 60, 85].map((w, i) => (
      <div key={i} className={`h-4 bg-muted rounded w-[${w}%]`} />
    ))}
    <div className="h-32 bg-muted rounded mt-6" />
    <div className="space-y-3 mt-4">
      {[100, 80, 90, 70].map((w, i) => (
        <div key={i} className={`h-4 bg-muted rounded w-[${w}%]`} />
      ))}
    </div>
  </div>
);

// ── Related entries ───────────────────────────────────────────────────────────

const RelatedEntries: React.FC<{ currentSlug: string; category: string }> = ({ currentSlug, category }) => {
  const navigate = useNavigate();
  const related = kbEntries
    .filter(e => e.slug !== currentSlug && e.category === category)
    .slice(0, 3);

  if (!related.length) return null;

  return (
    <section className="mt-16 pt-8 border-t border-border">
      <h2 className="text-sm font-mono uppercase tracking-widest text-muted-foreground mb-4">
        More in {category}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {related.map(entry => {
          const colors = categoryColors[entry.category];
          return (
            <button
              key={entry.slug}
              onClick={() => {
                navigate(`/knowledge/${entry.slug}`);
                window.scrollTo({ top: 0 });
              }}
              className="group text-left p-4 rounded-xl border border-border hover:border-primary/30
                         bg-card hover:-translate-y-0.5 transition-all duration-200"
            >
              <div className={`text-[11px] font-medium mb-1 ${colors.text}`}>{entry.category}</div>
              <div className="text-sm font-semibold group-hover:text-primary transition-colors">
                {entry.title}
              </div>
              <div className="flex items-center gap-1 mt-2 text-xs text-muted-foreground">
                <Clock className="w-3 h-3" /> {entry.readingMinutes} min
                <ExternalLink className="w-3 h-3 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
};

export default KnowledgeBaseReader;
