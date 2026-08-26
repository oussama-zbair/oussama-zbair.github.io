import React from 'react';
import SecurityWrapper from '@/components/SecurityWrapper';
import SiteNavbar from '@/components/SiteNavbar';
import HeroProfile from '@/components/HeroProfile';
import ScrollProgressBar from '@/components/ScrollProgressBar';
import TechStackConstellation from '@/components/artistic/TechStackConstellation';
import ProjectGalaxy from '@/components/artistic/ProjectGalaxy';
import CertificationsGalaxy from '@/components/artistic/CertificationsGalaxy';
import BlogSection from '@/components/artistic/BlogSection';
import VisitorsSection from '@/components/VisitorsSection';
import ContactPortal from '@/components/artistic/ContactPortal';
import Footer from '@/components/Footer';
import SEOHead from '@/components/SEOHead';

const Index: React.FC = () => {
  return (
    <SecurityWrapper>
      <div className="relative min-h-screen bg-background text-foreground overflow-x-hidden">

        <SEOHead ogType="profile" />

        <ScrollProgressBar />

        <header>
          <SiteNavbar />
        </header>

        <main>
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

          <VisitorsSection />

          <section id="contact">
            <ContactPortal />
          </section>
        </main>

        <Footer />

      </div>
    </SecurityWrapper>
  );
};

export default Index;
