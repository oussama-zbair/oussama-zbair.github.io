import React, { useState, useEffect } from 'react';
import { Github, Linkedin, Menu, X, Home, User, Code, Briefcase, Award, BookOpen, Mail } from 'lucide-react';
import Logo from './Logo';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }

      // Update active section based on scroll position (only on home page)
      if (location.pathname === '/') {
        const sections = ['home', 'about', 'skills', 'projects', 'experience', 'certifications', 'contact'];
        for (const section of sections) {
          const element = document.getElementById(section);
          if (element) {
            const rect = element.getBoundingClientRect();
            if (rect.top <= 100 && rect.bottom >= 100) {
              setActiveSection(section);
              break;
            }
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [location.pathname]);

  const navLinks = [
    { name: 'Home', href: '#home', isRoute: false, icon: Home },
    { name: 'About', href: '#about', isRoute: false, icon: User },
    { name: 'Skills', href: '#skills', isRoute: false, icon: Code },
    { name: 'Projects', href: '#projects', isRoute: false, icon: Briefcase },
    { name: 'Experience', href: '#experience', isRoute: false, icon: Briefcase },
    { name: 'Articles', href: '/articles', isRoute: true, icon: BookOpen },
    { name: 'Certifications', href: '#certifications', isRoute: false, icon: Award },
    { name: 'Contact', href: '#contact', isRoute: false, icon: Mail },
  ];

  const handleAnchorClick = (href: string) => {
    if (location.pathname !== '/') {
      // If not on home page, navigate to home first
      window.location.href = '/' + href;
    } else {
      // Already on home page, just scroll
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
    setIsOpen(false);
  };

  const renderDesktopNavLink = (link: typeof navLinks[0]) => {
    if (link.isRoute) {
      return (
        <Link
          key={link.name}
          to={link.href}
          className={`text-gray-300 hover:text-cyan-400 px-3 py-2 rounded-md text-sm font-medium transition-all ${
            location.pathname === link.href ? 'text-cyan-400' : ''
          }`}
        >
          {link.name}
        </Link>
      );
    } else {
      const isActive = activeSection === link.href.substring(1) && location.pathname === '/';
      return (
        <button
          key={link.name}
          onClick={() => handleAnchorClick(link.href)}
          className={`text-gray-300 hover:text-cyan-400 px-3 py-2 rounded-md text-sm font-medium transition-all ${
            isActive ? 'text-cyan-400' : ''
          }`}
        >
          {link.name}
        </button>
      );
    }
  };

  const renderMobileNavLink = (link: typeof navLinks[0]) => {
    const Icon = link.icon;
    if (link.isRoute) {
      return (
        <Link
          key={link.name}
          to={link.href}
          className={`flex flex-col items-center justify-center p-4 rounded-2xl transition-all duration-300 ${
            location.pathname === link.href 
              ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30' 
              : 'bg-gray-800/50 text-gray-300 hover:bg-cyan-500/10 hover:text-cyan-400 border border-gray-700/50'
          }`}
          onClick={() => setIsOpen(false)}
        >
          <Icon size={24} className="mb-2" />
          <span className="text-xs font-medium">{link.name}</span>
        </Link>
      );
    } else {
      const isActive = activeSection === link.href.substring(1) && location.pathname === '/';
      return (
        <button
          key={link.name}
          onClick={() => handleAnchorClick(link.href)}
          className={`flex flex-col items-center justify-center p-4 rounded-2xl transition-all duration-300 ${
            isActive 
              ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30' 
              : 'bg-gray-800/50 text-gray-300 hover:bg-cyan-500/10 hover:text-cyan-400 border border-gray-700/50'
          }`}
        >
          <Icon size={24} className="mb-2" />
          <span className="text-xs font-medium">{link.name}</span>
        </button>
      );
    }
  };

  return (
    <>
      {/* Desktop Navbar - unchanged */}
      <nav 
        className={`fixed w-full z-50 transition-all duration-300 hidden lg:block ${
          scrolled 
            ? 'bg-gray-900/80 backdrop-blur-xl shadow-lg shadow-cyan-500/10 border-b border-cyan-500/20' 
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <Link to="/" className="flex items-center gap-3 relative group">
              <Logo />
              <div className="relative">
                {/* Space particles around name */}
                <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  {[...Array(8)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute animate-ping"
                      style={{
                        left: `${-10 + Math.random() * 120}%`,
                        top: `${-20 + Math.random() * 140}%`,
                        animationDelay: `${Math.random() * 2}s`,
                        animationDuration: `${1 + Math.random()}s`,
                      }}
                    >
                      <div className="w-0.5 h-0.5 bg-cyan-400 rounded-full" />
                    </div>
                  ))}
                </div>
                
                <span className="text-xl font-bold relative z-10">
                  <span className="text-white">Oussama</span>
                  <span className="text-cyan-400"> Zbair</span>
                </span>
              </div>
            </Link>
            
            <div className="flex items-center space-x-1">
              {navLinks.map(renderDesktopNavLink)}
            </div>

            <div className="flex items-center space-x-4">
              <a 
                href="https://github.com/oussama-zbair" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-gray-800/50 text-gray-300 hover:text-cyan-400 hover:bg-cyan-500/10 transition-all border border-transparent hover:border-cyan-500/30"
                aria-label="GitHub"
              >
                <Github size={20} />
              </a>
              <a 
                href="https://www.linkedin.com/in/oussama-zbair" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-gray-800/50 text-gray-300 hover:text-cyan-400 hover:bg-cyan-500/10 transition-all border border-transparent hover:border-cyan-500/30"
                aria-label="LinkedIn"
              >
                <Linkedin size={20} />
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Header - Simple top bar */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-gray-900/95 backdrop-blur-xl border-b border-gray-700/50">
        <div className="flex items-center justify-between px-4 h-16">
          <Link to="/" className="flex items-center gap-2 relative group">
            <Logo />
            <div className="relative">
              {/* Mobile space particles */}
              <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                {[...Array(6)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute animate-pulse"
                    style={{
                      left: `${Math.random() * 100}%`,
                      top: `${Math.random() * 100}%`,
                      animationDelay: `${Math.random() * 1.5}s`,
                    }}
                  >
                    <div className="w-0.5 h-0.5 bg-cyan-400 rounded-full" />
                  </div>
                ))}
              </div>
              
              <span className="text-lg font-bold relative z-10">
                <span className="text-white">Oussama</span>
                <span className="text-cyan-400"> Zbair</span>
              </span>
            </div>
          </Link>
          
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 rounded-xl bg-gray-800/50 text-gray-300 hover:text-cyan-400 transition-all"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation - Full screen overlay */}
      <div className={`lg:hidden fixed inset-0 z-40 transition-all duration-500 ${
        isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
      }`}>
        {/* Backdrop */}
        <div 
          className="absolute inset-0 bg-gray-900/95 backdrop-blur-xl"
          onClick={() => setIsOpen(false)}
        />
        
        {/* Navigation Content */}
        <div className="relative h-full flex flex-col justify-center px-6 py-20">
          {/* Navigation Grid */}
          <div className="grid grid-cols-2 gap-4 mb-8">
            {navLinks.map(renderMobileNavLink)}
          </div>
          
          {/* Social Links */}
          <div className="flex justify-center space-x-6 mb-8">
            <a 
              href="https://github.com/oussama-zbair" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex flex-col items-center justify-center p-6 rounded-2xl bg-gray-800/50 text-gray-300 hover:text-cyan-400 hover:bg-cyan-500/10 transition-all border border-gray-700/50"
              onClick={() => setIsOpen(false)}
            >
              <Github size={28} className="mb-2" />
              <span className="text-xs font-medium">GitHub</span>
            </a>
            <a 
              href="https://www.linkedin.com/in/oussama-zbair" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex flex-col items-center justify-center p-6 rounded-2xl bg-gray-800/50 text-gray-300 hover:text-cyan-400 hover:bg-cyan-500/10 transition-all border border-gray-700/50"
              onClick={() => setIsOpen(false)}
            >
              <Linkedin size={28} className="mb-2" />
              <span className="text-xs font-medium">LinkedIn</span>
            </a>
          </div>
          
          {/* Close hint */}
          <div className="text-center">
            <p className="text-gray-500 text-sm">Tap anywhere to close</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;