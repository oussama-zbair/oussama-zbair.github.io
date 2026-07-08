import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, Code2, FolderGit2, Award, Briefcase, BookOpen, Mail, Moon, Sun, Library } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import ResumeDownloadButton from './ResumeDownloadButton';

interface NavItem {
  id: string;
  label: string;
  icon: React.ElementType;
  isRoute?: boolean;
  routePath?: string;
}

const navItems: NavItem[] = [
  { id: 'hero', label: 'Home', icon: Home },
  { id: 'tech-stack', label: 'Skills', icon: Code2 },
  { id: 'projects', label: 'Projects', icon: FolderGit2 },
  { id: 'certifications', label: 'Certs', icon: Award },
  { id: 'experience', label: 'Experience', icon: Briefcase },
  { id: 'blog', label: 'Blog', icon: BookOpen },
  { id: 'knowledge', label: 'KB', icon: Library, isRoute: true, routePath: 'https://docs.oussamazbair.engineer' },
  { id: 'contact', label: 'Contact', icon: Mail },
];

const FloatingNav: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      // Show nav after scrolling past 80% of viewport height
      const scrollThreshold = window.innerHeight * 0.8;
      setIsVisible(window.scrollY > scrollThreshold);

      // Detect active section with improved logic
      const sections = navItems.map(item => document.getElementById(item.id)).filter(Boolean);
      const scrollPosition = window.scrollY + 100; // Add offset for better detection

      let currentSection = 'hero'; // Default to hero

      for (let i = 0; i < sections.length; i++) {
        const section = sections[i];
        if (section) {
          const sectionTop = section.offsetTop;
          const sectionBottom = sectionTop + section.offsetHeight;
          
          // Check if we're within this section
          if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
            currentSection = navItems[i].id;
            break;
          }
        }
      }

      setActiveSection(currentSection);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial check

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      let offset = 80;
      if (id === 'hero') offset = 0;
      const top = element.offsetTop - offset;
      window.scrollTo({ top: Math.max(0, top), behavior: 'smooth' });
    }
  };

  const handleNavClick = (item: NavItem) => {
    if (item.isRoute && item.routePath) {
      if (item.routePath.startsWith('http')) {
        window.open(item.routePath, '_blank', 'noopener,noreferrer');
      } else {
        navigate(item.routePath);
      }
    } else {
      scrollToSection(item.id);
    }
  };

  const isDark = resolvedTheme === 'dark';
  const toggleTheme = () => setTheme(isDark ? 'light' : 'dark');

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.nav
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="fixed top-4 left-1/2 -translate-x-1/2 z-50 max-w-[95vw]"
        >
          <div className="glass-card px-1 sm:px-2 py-2 rounded-full flex items-center gap-0.5 sm:gap-1 border border-primary/20 shadow-lg shadow-black/20 overflow-x-auto scrollbar-hide">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = item.isRoute ? false : activeSection === item.id;

              return (
                <motion.button
                  key={item.id}
                  onClick={() => handleNavClick(item)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={cn(
                    'relative px-2 sm:px-3 py-2 rounded-full flex items-center gap-1 sm:gap-2 transition-all duration-300 flex-shrink-0',
                    'text-xs sm:text-sm font-medium min-w-0',
                    isActive
                      ? 'text-primary-foreground'
                      : 'text-muted-foreground hover:text-foreground'
                  )}
                >
                  {/* Active background */}
                  {isActive && (
                    <motion.div
                      layoutId="activeNavBg"
                      className="absolute inset-0 bg-primary rounded-full"
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    />
                  )}
                  
                  <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4 relative z-10 flex-shrink-0" />
                  <span className="hidden lg:inline relative z-10 whitespace-nowrap">{item.label}</span>
                  <span className="hidden sm:inline lg:hidden relative z-10 whitespace-nowrap text-xs">
                    {item.label.length > 6 ? item.label.substring(0, 4) + '.' : item.label}
                  </span>
                </motion.button>
              );
            })}

            {/* Divider */}
            <div className="w-px h-4 sm:h-6 bg-border mx-0.5 sm:mx-1 flex-shrink-0" />

            {/* Resume Download */}
            <div className="flex-shrink-0">
              <ResumeDownloadButton variant="compact" />
            </div>

            {/* Theme Toggle */}
            {mounted && (
              <motion.button
                onClick={toggleTheme}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="relative p-1.5 sm:p-2 rounded-full text-muted-foreground hover:text-foreground transition-colors flex-shrink-0"
                aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
              >
                <AnimatePresence mode="wait" initial={false}>
                  {isDark ? (
                    <motion.div
                      key="moon"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Moon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="sun"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Sun className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-500" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
            )}
          </div>
        </motion.nav>
      )}
    </AnimatePresence>
  );
};

export default FloatingNav;
