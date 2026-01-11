import React, { useState, useEffect } from 'react';
import { Github, Linkedin, Menu, X } from 'lucide-react';
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
    { name: 'Home', href: '#home', isRoute: false },
    { name: 'About', href: '#about', isRoute: false },
    { name: 'Skills', href: '#skills', isRoute: false },
    { name: 'Projects', href: '#projects', isRoute: false },
    { name: 'Experience', href: '#experience', isRoute: false },
    { name: 'Articles', href: '/articles', isRoute: true },
    { name: 'Certifications', href: '#certifications', isRoute: false },
    { name: 'Contact', href: '#contact', isRoute: false },
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

  const renderNavLink = (link: typeof navLinks[0]) => {
    if (link.isRoute) {
      return (
        <Link
          key={link.name}
          to={link.href}
          className={`text-gray-300 hover:text-cyan-400 px-3 py-2 rounded-md text-sm font-medium transition-all ${
            location.pathname === link.href ? 'text-cyan-400' : ''
          }`}
          onClick={() => setIsOpen(false)}
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
    if (link.isRoute) {
      return (
        <Link
          key={link.name}
          to={link.href}
          className={`text-gray-300 hover:text-cyan-400 block px-3 py-2 rounded-md text-base font-medium ${
            location.pathname === link.href ? 'text-cyan-400' : ''
          }`}
          onClick={() => setIsOpen(false)}
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
          className={`text-gray-300 hover:text-cyan-400 block px-3 py-2 rounded-md text-base font-medium w-full text-left ${
            isActive ? 'text-cyan-400' : ''
          }`}
        >
          {link.name}
        </button>
      );
    }
  };

  return (
    <nav 
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-gray-900/80 backdrop-blur-xl shadow-lg shadow-cyan-500/10 border-b border-cyan-500/20' 
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link to="/" className="flex items-center gap-3">
            <Logo />
            <span className="text-xl font-bold">
              <span className="text-white">Oussama</span>
              <span className="text-cyan-400"> Zbair</span>
            </span>
          </Link>
          
          <div className="hidden lg:block">
            <div className="ml-10 flex items-center space-x-1">
              {navLinks.map(renderNavLink)}
            </div>
          </div>

          <div className="hidden md:flex items-center space-x-4">
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
          
          <div className="lg:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg bg-gray-800/50 text-gray-300 hover:text-cyan-400 focus:outline-none"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`lg:hidden ${isOpen ? 'block' : 'hidden'}`}>
        <div className="px-4 pt-2 pb-4 space-y-2 bg-gray-900/95 backdrop-blur-xl border-t border-cyan-500/20">
          {navLinks.map(renderMobileNavLink)}
          <div className="flex space-x-4 px-3 py-3">
            <a 
              href="https://github.com/oussama-zbair" 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-2 rounded-lg bg-gray-800/50 text-gray-300 hover:text-cyan-400 hover:bg-cyan-500/10 transition-all"
            >
              <Github size={20} />
            </a>
            <a 
              href="https://www.linkedin.com/in/oussama-zbair" 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-2 rounded-lg bg-gray-800/50 text-gray-300 hover:text-cyan-400 hover:bg-cyan-500/10 transition-all"
            >
              <Linkedin size={20} />
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;