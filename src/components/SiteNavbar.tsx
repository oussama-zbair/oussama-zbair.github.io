import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Home, Code2, FolderGit2, Award,
  BookOpen, Mail, Library, Download, Menu, X
} from 'lucide-react';
import { cn } from '@/lib/utils';
import ResumeDownloadModal from './artistic/ResumeDownloadModal';

const NAV_ITEMS = [
  { id: 'hero',           label: 'Home',          icon: Home },
  { id: 'tech-stack',     label: 'Skills',         icon: Code2 },
  { id: 'projects',       label: 'Projects',       icon: FolderGit2 },
  { id: 'certifications', label: 'Certifications', icon: Award },
  { id: 'blog',           label: 'Writing',        icon: BookOpen },
  { id: 'contact',        label: 'Contact',        icon: Mail },
];

// ── OZ Logo mark ──────────────────────────────────────────────────────────────
const OZLogo: React.FC<{ onClick: () => void }> = ({ onClick }) => (
  <button
    onClick={onClick}
    aria-label="Home"
    className="flex items-center gap-2.5 hover:opacity-80 transition-opacity flex-shrink-0 group"
  >
    {/* Purple badge */}
    <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center flex-shrink-0
                    group-hover:scale-105 transition-transform duration-200">
      <span className="text-xs font-black text-white tracking-tight">OZ</span>
    </div>
    {/* Name — hidden on small screens */}
    <span className="hidden sm:block text-sm font-semibold text-foreground">
    </span>
  </button>
);

// ── SiteNavbar ────────────────────────────────────────────────────────────────
const SiteNavbar: React.FC = () => {
  const [activeSection, setActiveSection] = useState('hero');
  const [scrolled, setScrolled]           = useState(false);
  const [mobileOpen, setMobileOpen]       = useState(false);
  const [resumeOpen, setResumeOpen]       = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
      const pos = window.scrollY + 120;
      for (const item of [...NAV_ITEMS].reverse()) {
        const el = document.getElementById(item.id);
        if (el && el.offsetTop <= pos) { setActiveSection(item.id); break; }
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (id: string) => {
    setMobileOpen(false);
    // Small delay so the mobile menu closes before scrolling
    setTimeout(() => {
      if (id === 'hero') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }
      const el = document.getElementById(id);
      if (el) {
        const top = el.getBoundingClientRect().top + window.scrollY - 80;
        window.scrollTo({ top: Math.max(0, top), behavior: 'smooth' });
      }
    }, 50);
  };

  return (
    <>
      <header className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        scrolled
          ? 'bg-background/90 backdrop-blur-xl border-b border-border shadow-sm'
          : 'bg-background/70 backdrop-blur-md border-b border-border/30'
      )}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-14 flex items-center gap-4">

          {/* OZ Logo */}
          <OZLogo onClick={() => scrollTo('hero')} />

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-0.5 ml-4">
            {NAV_ITEMS.map(item => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => scrollTo(item.id)}
                  className={cn(
                    'px-3 py-1.5 rounded-lg text-sm font-medium transition-all',
                    isActive
                      ? 'bg-primary/10 text-primary'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted/60'
                  )}
                >
                  {item.label}
                </button>
              );
            })}
            {/* Docs external link */}
            <a
              href="https://docs.oussamazbair.engineer"
              target="_blank" rel="noopener noreferrer"
              className="px-3 py-1.5 rounded-lg text-sm font-medium text-muted-foreground
                         hover:text-foreground hover:bg-muted/60 transition-all flex items-center gap-1.5"
            >
              <Library className="w-3.5 h-3.5" />
              Docs
            </a>
          </nav>

          <div className="flex-1" />

          {/* Right actions */}
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setResumeOpen(true)}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium
                         bg-primary text-primary-foreground hover:opacity-90 transition-opacity"
            >
              <Download className="w-3.5 h-3.5" />
              Resume
            </button>

            {/* Mobile burger */}
            <button
              onClick={() => setMobileOpen(v => !v)}
              className="lg:hidden p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/60 transition-all"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* ── Mobile dropdown ────────────────────────────────────────────────── */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="lg:hidden overflow-hidden border-t border-border bg-background/95 backdrop-blur-xl"
            >
              <div className="px-4 py-3 flex flex-col gap-1">
                {NAV_ITEMS.map(item => {
                  const Icon = item.icon;
                  const isActive = activeSection === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => scrollTo(item.id)}
                      className={cn(
                        'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all text-left',
                        isActive
                          ? 'bg-primary/10 text-primary'
                          : 'text-muted-foreground hover:text-foreground hover:bg-muted/60'
                      )}
                    >
                      <Icon className="w-4 h-4" />
                      {item.label}
                    </button>
                  );
                })}
                <a
                  href="https://docs.oussamazbair.engineer"
                  target="_blank" rel="noopener noreferrer"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium
                             text-muted-foreground hover:text-foreground hover:bg-muted/60 transition-all"
                >
                  <Library className="w-4 h-4" />
                  Engineering Docs
                </a>
                <button
                  onClick={() => { setResumeOpen(true); setMobileOpen(false); }}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium
                             bg-primary/10 text-primary hover:bg-primary/20 transition-all mt-1"
                >
                  <Download className="w-4 h-4" />
                  Download Resume
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <ResumeDownloadModal isOpen={resumeOpen} onClose={() => setResumeOpen(false)} />
    </>
  );
};

export default SiteNavbar;
