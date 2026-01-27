import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Code2, Github, Linkedin, ExternalLink } from 'lucide-react';
import { personalInfo, socialLinks } from '@/data/portfolio';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const getSocialIcon = (name: string) => {
    switch (name.toLowerCase()) {
      case 'github':
        return <Github className="h-5 w-5" />;
      case 'linkedin':
        return <Linkedin className="h-5 w-5" />;
      default:
        return <ExternalLink className="h-5 w-5" />;
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative py-12 bg-card border-t border-border">
      {/* Gradient top border */}
      <div className="absolute top-0 left-0 right-0 h-px section-divider" />

      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo & Copyright */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col items-center md:items-start gap-2"
          >
            <button
              onClick={scrollToTop}
              className="flex items-center gap-2 group"
              aria-label="Scroll to top"
            >
              <Code2 className="h-6 w-6 text-primary group-hover:scale-110 transition-transform" />
              <span className="font-semibold">
                <span className="text-foreground">Oussama</span>
                <span className="text-primary ml-1">Zbair</span>
              </span>
            </button>
            <p className="text-sm text-muted-foreground flex items-center gap-1">
              © {currentYear} Made with <Heart className="h-4 w-4 text-destructive fill-destructive" /> by {personalInfo.firstName}
            </p>
          </motion.div>

          {/* Navigation Links */}
          <motion.nav
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="flex flex-wrap justify-center gap-6"
          >
            {['About', 'Skills', 'Projects', 'Experience', 'Contact'].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                {item}
              </a>
            ))}
          </motion.nav>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex items-center gap-4"
          >
            {socialLinks.map((link) => (
              <a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all"
                aria-label={link.name}
              >
                {getSocialIcon(link.name)}
              </a>
            ))}
          </motion.div>
        </div>

        {/* Security & Privacy Notice */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-8 pt-6 border-t border-border text-center"
        >
          <p className="text-xs text-muted-foreground">
            This website is protected. All content is copyrighted © {currentYear} {personalInfo.name}.
            <br />
            Unauthorized copying, modification, or distribution is prohibited.
          </p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
