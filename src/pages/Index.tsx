
import React from 'react';
import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import AboutSection from '../components/AboutSection';
import SkillsSection from '../components/SkillsSection';
import ProjectsSection from '../components/ProjectsSection';
import ExperienceSection from '../components/ExperienceSection';
import PublicationsSection from '../components/PublicationsSection';
import CertificationsSection from '../components/CertificationsSection';
import ContactSection from '../components/ContactSection';
import Footer from '../components/Footer';
import TerminalSection from '../components/TerminalSection';

const Index = () => {
  return (
    <div className="min-h-screen bg-dark-300 text-white">
      <Navbar />
      <HeroSection />
      <AboutSection />
      <SkillsSection />
      <ProjectsSection />
      <ExperienceSection />
      <PublicationsSection />
      <CertificationsSection />
      <ContactSection />
      <Footer />
      <TerminalSection />
    </div>
  );
};

export default Index;
