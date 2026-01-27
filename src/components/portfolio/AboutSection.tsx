import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Briefcase, User, Calendar, ExternalLink, Github, Linkedin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { personalInfo, socialLinks } from '@/data/portfolio';

const AboutSection: React.FC = () => {
  const infoItems = [
    { icon: User, label: 'Name', value: personalInfo.name },
    { icon: MapPin, label: 'Location', value: personalInfo.location },
    { icon: Briefcase, label: 'Experience', value: personalInfo.experience },
    { icon: Calendar, label: 'Freelance', value: personalInfo.freelance },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

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

  return (
    <section id="about" className="py-24 lg:py-32 relative">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 right-0 h-px section-divider" />
      
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 terminal-heading">About Me</h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-accent mx-auto rounded-full" />
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid lg:grid-cols-2 gap-12 lg:gap-16"
        >
          {/* Left Column - Bio */}
          <motion.div variants={itemVariants} className="space-y-6">
            <h3 className="text-2xl font-semibold text-primary">Who am I?</h3>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              {personalInfo.bio.split('. ').map((sentence, index) => (
                <p key={index}>
                  {sentence.trim()}{index < personalInfo.bio.split('. ').length - 1 ? '.' : ''}
                </p>
              ))}
            </div>
            
            <Button
              variant="outline"
              className="border-primary/50 text-primary hover:bg-primary/10"
              onClick={() => window.open(personalInfo.calendlyUrl, '_blank')}
            >
              <Calendar className="mr-2 h-4 w-4" />
              Schedule a Meeting
            </Button>
          </motion.div>

          {/* Right Column - Info Cards */}
          <motion.div variants={itemVariants} className="space-y-6">
            {/* Personal Info Card */}
            <div className="glass-card rounded-xl p-6 space-y-4">
              <h4 className="text-lg font-semibold text-foreground">Personal Info</h4>
              <div className="grid grid-cols-2 gap-4">
                {infoItems.map((item) => (
                  <div key={item.label} className="flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <item.icon className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground uppercase tracking-wider">{item.label}</p>
                      <p className="text-sm font-medium text-foreground">{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Social Links Card */}
            <div className="glass-card rounded-xl p-6 space-y-4">
              <h4 className="text-lg font-semibold text-foreground">Contact & Social</h4>
              <div className="space-y-3">
                {socialLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-3 rounded-lg bg-secondary/50 hover:bg-primary/10 transition-colors group"
                  >
                    <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                      {getSocialIcon(link.name)}
                    </div>
                    <span className="text-sm text-muted-foreground group-hover:text-primary transition-colors">
                      {link.url.replace('https://', '').replace('www.', '')}
                    </span>
                    <ExternalLink className="h-4 w-4 ml-auto text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
