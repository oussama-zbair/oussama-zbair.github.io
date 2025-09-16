import React, { useEffect } from 'react';
import { User, CalendarPlus, Github, Linkedin } from 'lucide-react';
import { Button } from './ui/button';

const AboutSection: React.FC = () => {

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://assets.calendly.com/assets/external/widget.js';
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const openCalendly = () => {
    (window as any).Calendly.initPopupWidget({ url: 'https://calendly.com/oussama-zbair' });
  };

  return (
    <section id="about" className="section-container">
      <h2 className="section-title">About Me</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="glass-card p-6 order-2 md:order-1">
          <h3 className="text-xl font-bold text-white mb-4">Who am I?</h3>
          <p className="text-gray-300 mb-4">
            I'm a passionate Software Engineer with expertise in full-stack development. My journey in 
            programming started with a curiosity about how websites work, and evolved into a deep love 
            for creating elegant, efficient software solutions.
          </p>
          <p className="text-gray-300 mb-4">
            With several years of experience in web development, I specialize in building scalable and 
            performant applications using modern technologies. I'm particularly interested in 
            cloud architecture, DevOps practices, and creating smooth user experiences.
          </p>
          <p className="text-gray-300">
            When I'm not coding, I enjoy contributing to open source projects, writing technical articles, 
            and staying updated with the latest industry trends. I'm always open to new challenges and 
            opportunities to grow as a developer.
          </p>

          <div className="mt-6">
            <Button 
              className="bg-neon hover:bg-neon/80 text-dark-300"
              onClick={openCalendly}
            >
              <CalendarPlus size={16} className="mr-2" />
              Schedule a Meeting
            </Button>
          </div>
        </div>
        
        <div className="order-1 md:order-2">
          <div className="glass-card p-6 mb-6">
            <h3 className="text-xl font-bold text-white mb-4 flex items-center">
              <User size={20} className="mr-2 text-neon" />
              Personal Info
            </h3>
            
            <ul className="space-y-4">
              <li className="flex items-center text-gray-300">
                <span className="font-semibold mr-2 text-gray-400 w-24">Name:</span>
                <span>Oussama Zbair</span>
              </li>
              <li className="flex items-center text-gray-300">
                <span className="font-semibold mr-2 text-gray-400 w-24">Location:</span>
                <span>Morocco</span>
              </li>
              <li className="flex items-center text-gray-300">
                <span className="font-semibold mr-2 text-gray-400 w-24">Experience:</span>
                <span>2+ years</span>
              </li>
              <li className="flex items-center text-gray-300">
                <span className="font-semibold mr-2 text-gray-400 w-24">Freelance:</span>
                <span>Available</span>
              </li>
            </ul>
          </div>
          
          <div className="glass-card p-6">
            <h3 className="text-xl font-bold text-white mb-4">Contact & Social</h3>
            
            <ul className="space-y-4">
              <li>
                <a href="https://github.com/oussama-zbair" target="_blank" rel="noopener noreferrer" className="flex items-center text-gray-300 hover:text-neon transition-colors">
                  <Github size={16} className="mr-3 text-neon" />
                  <span>github.com/oussama-zbair</span>
                </a>
              </li>
              <li>
                <a href="https://www.linkedin.com/in/oussama-zbair" target="_blank" rel="noopener noreferrer" className="flex items-center text-gray-300 hover:text-neon transition-colors">
                  <Linkedin size={16} className="mr-3 text-neon" />
                  <span>linkedin.com/in/oussama-zbair</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
