import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Search, BookOpen, Clock, ChevronRight, Sparkles,
  Filter, Award, X
} from 'lucide-react';
import {
  kbEntries,
  kbCategories,
  categoryColors,
  difficultyColors,
  type KBCategory,
  type KBDifficulty,
} from '../data/knowledgeBase';
import { preloadKBContent } from '../utils/kbLoader';

const KnowledgeBase: React.FC = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState<KBCategory | 'All'>('All');
  const [activeDifficulty, setActiveDifficulty] = useState<KBDifficulty | 'All'>('All');

  const filtered = useMemo(() => {
    return kbEntries.filter(entry => {
      const matchesSearch =
        search.trim() === '' ||
        entry.title.toLowerCase().includes(search.toLowerCase()) ||
        entry.subtitle.toLowerCase().includes(search.toLowerCase()) ||
        entry.tags.some(t => t.toLowerCase().includes(search.toLowerCase()));

      const matchesCategory =
        activeCategory === 'All' || entry.category === activeCategory;

      const matchesDifficulty =
        activeDifficulty === 'All' || entry.difficulty === activeDifficulty;

      return matchesSearch && matchesCategory && matchesDifficulty;
    });
  }, [search, activeCategory, activeDifficulty]);

  const featured = filtered.filter(e => e.featured);
  const rest = filtered.filter(e => !e.featured);

  const clearFilters = () => {
    setSearch('');
    setActiveCategory('All');
    setActiveDifficulty('All');
  };

  const hasFilters = search || activeCategory !== 'All' || activeDifficulty !== 'All';

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* ── Header ─────────────────────────────────────────────────────────── */}
      <div className="border-b border-border bg-card/40 backdrop-blur-sm sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center gap-4">
          <button
            onClick={() => navigate('/')}
            className="text-muted-foreground hover:text-foreground transition-colors text-sm"
          >
            ← Home
          </button>
          <div className="h-4 w-px bg-border" />
          <div className="flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-primary" />
            <span className="font-semibold text-sm">Knowledge Base</span>
          </div>
          <div className="ml-auto text-xs text-muted-foreground">
            {filtered.length} of {kbEntries.length} topics
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* ── Hero ───────────────────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-mono mb-4">
            <Sparkles className="w-3 h-3" />
            Personal Engineering Knowledge Base
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Everything I Know,{' '}
            <span className="gradient-text">Documented</span>
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Deep technical notes from years of certifications and engineering work.
            A living reference — not just a list of badges.
          </p>
        </motion.div>

        {/* ── Search ─────────────────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="relative mb-6 max-w-xl mx-auto"
        >
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
          <input
            type="text"
            placeholder="Search topics, tags, certifications…"
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-xl bg-card border border-border text-sm focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all"
          />
          {search && (
            <button
              onClick={() => setSearch('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </motion.div>

        {/* ── Filters ────────────────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.15 }}
          className="flex flex-wrap gap-3 justify-center mb-10"
        >
          {/* Category pills */}
          <div className="flex flex-wrap gap-2 justify-center">
            <button
              onClick={() => setActiveCategory('All')}
              className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${
                activeCategory === 'All'
                  ? 'bg-primary text-primary-foreground border-primary'
                  : 'bg-card border-border text-muted-foreground hover:border-primary/40 hover:text-foreground'
              }`}
            >
              All Categories
            </button>
            {kbCategories.map(cat => {
              const colors = categoryColors[cat];
              const isActive = activeCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(isActive ? 'All' : cat)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${
                    isActive
                      ? `${colors.bg} ${colors.text} ${colors.border}`
                      : 'bg-card border-border text-muted-foreground hover:border-primary/40 hover:text-foreground'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          {/* Difficulty pills */}
          <div className="flex items-center gap-2 border-l border-border pl-3">
            <Filter className="w-3 h-3 text-muted-foreground" />
            {(['All', 'Beginner', 'Intermediate', 'Advanced'] as const).map(d => (
              <button
                key={d}
                onClick={() => setActiveDifficulty(d === 'All' ? 'All' : d as KBDifficulty)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${
                  activeDifficulty === d
                    ? 'bg-primary text-primary-foreground border-primary'
                    : 'bg-card border-border text-muted-foreground hover:border-primary/40'
                }`}
              >
                {d}
              </button>
            ))}
          </div>

          {hasFilters && (
            <button
              onClick={clearFilters}
              className="flex items-center gap-1 px-3 py-1.5 rounded-full text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              <X className="w-3 h-3" /> Clear
            </button>
          )}
        </motion.div>

        {/* ── Featured ───────────────────────────────────────────────────────── */}
        {featured.length > 0 && (
          <section className="mb-12">
            <h2 className="text-xs font-mono text-muted-foreground uppercase tracking-widest mb-4 flex items-center gap-2">
              <Sparkles className="w-3 h-3 text-primary" /> Featured
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {featured.map((entry, i) => (
                <KBCard key={entry.slug} entry={entry} index={i} />
              ))}
            </div>
          </section>
        )}

        {/* ── All entries ────────────────────────────────────────────────────── */}
        {rest.length > 0 && (
          <section>
            {featured.length > 0 && (
              <h2 className="text-xs font-mono text-muted-foreground uppercase tracking-widest mb-4">
                All Topics
              </h2>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {rest.map((entry, i) => (
                <KBCard key={entry.slug} entry={entry} index={featured.length + i} />
              ))}
            </div>
          </section>
        )}

        {/* ── Empty state ──────────────────────────────────────────────────────── */}
        {filtered.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <p className="text-muted-foreground text-lg mb-4">
              No topics match your filters.
            </p>
            <button
              onClick={clearFilters}
              className="text-primary hover:underline text-sm"
            >
              Clear all filters
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
};

// ── KBCard ────────────────────────────────────────────────────────────────────

interface KBCardProps {
  entry: (typeof kbEntries)[0];
  index: number;
}

const KBCard: React.FC<KBCardProps> = ({ entry, index }) => {
  const navigate = useNavigate();
  const colors = categoryColors[entry.category];
  const difficulty = difficultyColors[entry.difficulty];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.04 }}
      onMouseEnter={() => preloadKBContent(entry.slug)}
      onClick={() => navigate(`/knowledge/${entry.slug}`)}
      className="group relative cursor-pointer rounded-2xl bg-card border border-border p-5
                 hover:border-primary/30 hover:-translate-y-1 hover:shadow-lg
                 hover:shadow-primary/5 transition-all duration-300"
    >
      {/* New badge */}
      {entry.isNew && (
        <span className="absolute top-3 right-3 px-2 py-0.5 rounded-full text-[10px] font-bold bg-primary text-primary-foreground">
          NEW
        </span>
      )}

      {/* Category */}
      <div className={`inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-medium border mb-3 ${colors.bg} ${colors.text} ${colors.border}`}>
        {entry.category}
      </div>

      {/* Title + subtitle */}
      <h3 className="font-bold text-base mb-1 group-hover:text-primary transition-colors leading-snug">
        {entry.title}
      </h3>
      <p className="text-muted-foreground text-xs leading-relaxed mb-4 line-clamp-2">
        {entry.subtitle}
      </p>

      {/* Tags */}
      <div className="flex flex-wrap gap-1 mb-4">
        {entry.tags.slice(0, 3).map(tag => (
          <span key={tag} className="px-2 py-0.5 rounded-md bg-muted text-muted-foreground text-[11px]">
            {tag}
          </span>
        ))}
        {entry.tags.length > 3 && (
          <span className="text-[11px] text-muted-foreground">+{entry.tags.length - 3}</span>
        )}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between text-[11px] text-muted-foreground border-t border-border pt-3">
        <div className="flex items-center gap-3">
          {/* Difficulty */}
          <span className={`flex items-center gap-1 ${difficulty.text}`}>
            <span className={`w-1.5 h-1.5 rounded-full ${difficulty.dot}`} />
            {entry.difficulty}
          </span>
          {/* Reading time */}
          <span className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            {entry.readingMinutes} min
          </span>
        </div>
        {/* Certs count */}
        {entry.certifications.length > 0 && (
          <span className="flex items-center gap-1">
            <Award className="w-3 h-3" />
            {entry.certifications.length} cert{entry.certifications.length > 1 ? 's' : ''}
          </span>
        )}
        <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
      </div>
    </motion.div>
  );
};

export default KnowledgeBase;
