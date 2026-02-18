import React from 'react';
import SecurityWrapper from '@/components/SecurityWrapper';
import ConstellationScene from '@/components/three/ConstellationScene';
import GeolocationBanner from '@/components/artistic/GeolocationBanner';
import FloatingNav from '@/components/artistic/FloatingNav';
import IdentityReveal from '@/components/artistic/IdentityReveal';
import TechStackConstellation from '@/components/artistic/TechStackConstellation';
import ProjectGalaxy from '@/components/artistic/ProjectGalaxy';
import CertificationsGalaxy from '@/components/artistic/CertificationsGalaxy';
import ExperienceTimeline from '@/components/artistic/ExperienceTimeline';
import BlogSection from '@/components/artistic/BlogSection';
import ContactPortal from '@/components/artistic/ContactPortal';

const Index: React.FC = () => {
  return (
    <SecurityWrapper>
      <div className="relative min-h-screen bg-background text-foreground overflow-x-hidden">
        {/* Geolocation Banner */}
        <GeolocationBanner />

        {/* Floating Navigation */}
        <FloatingNav />

        {/* 3D Background - Fixed */}
        <ConstellationScene />

        {/* Hero Section - Full viewport */}
        <section id="hero" className="relative min-h-screen">
          <IdentityReveal />
        </section>

        {/* Content Sections */}
        <div className="relative z-10">
          <section id="tech-stack" className="min-h-screen">
            <TechStackConstellation />
          </section>
          <section id="projects" className="min-h-screen">
            <ProjectGalaxy />
          </section>
          <section id="certifications" className="min-h-screen">
            <CertificationsGalaxy />
          </section>
          <section id="experience" className="min-h-screen">
            <ExperienceTimeline />
          </section>
          <section id="blog" className="min-h-screen">
            <BlogSection />
          </section>
          <section id="contact" className="min-h-screen">
            <ContactPortal />
          </section>
        </div>
      </div>
    </SecurityWrapper>
  );
};

export default Index;
