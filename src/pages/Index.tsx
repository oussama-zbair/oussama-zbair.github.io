import React from 'react';
import SecurityWrapper from '@/components/SecurityWrapper';
import SiteNavbar from '@/components/SiteNavbar';
import HeroProfile from '@/components/HeroProfile';
import TechStackConstellation from '@/components/artistic/TechStackConstellation';
import ProjectGalaxy from '@/components/artistic/ProjectGalaxy';
import CertificationsGalaxy from '@/components/artistic/CertificationsGalaxy';
import BlogSection from '@/components/artistic/BlogSection';
import ContactPortal from '@/components/artistic/ContactPortal';

const Index: React.FC = () => {
  return (
    <SecurityWrapper>
      <div className="relative min-h-screen bg-background text-foreground overflow-x-hidden">

        {/* Always-visible navbar */}
        <SiteNavbar />

        {/* Hero */}
        <section id="hero">
          <HeroProfile />
        </section>

        <section id="tech-stack">
          <TechStackConstellation />
        </section>

        <section id="projects">
          <ProjectGalaxy />
        </section>

        <section id="certifications">
          <CertificationsGalaxy />
        </section>

        <section id="blog">
          <BlogSection />
        </section>

        <section id="contact">
          <ContactPortal />
        </section>

      </div>
    </SecurityWrapper>
  );
};

export default Index;
