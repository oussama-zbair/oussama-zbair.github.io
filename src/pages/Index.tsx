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
          <div id="tech-stack"><TechStackConstellation /></div>
          <div id="projects"><ProjectGalaxy /></div>
          <div id="certifications"><CertificationsGalaxy /></div>
          <div id="experience"><ExperienceTimeline /></div>
          <div id="blog"><BlogSection /></div>
          <div id="contact"><ContactPortal /></div>
        </div>
      </div>
    </SecurityWrapper>
  );
};

export default Index;
