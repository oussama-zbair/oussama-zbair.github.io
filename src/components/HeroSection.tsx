import React, { useState, useEffect } from 'react';
import { ArrowDown, Terminal } from 'lucide-react';
import { Button } from './ui/button';
import SpaceIllustration from './SpaceIllustration';

const HeroSection: React.FC = () => {
  const [text, setText] = useState("");
  const fullText = "SOFTWARE ENGINEER & FULL STACK DEVELOPER";
  
  useEffect(() => {
    let i = 0;
    const typingEffect = setInterval(() => {
      if (i < fullText.length) {
        setText(fullText.substring(0, i + 1));
        i++;
      } else {
        clearInterval(typingEffect);
      }
    }, 100);
    
    return () => clearInterval(typingEffect);
  }, []);
  
  return (
    <section id="home" className="min-h-screen flex flex-col justify-center items-center relative overflow-hidden pt-20">
      {/* Add SpaceIllustration */}
      <SpaceIllustration />
      
      <div className="container mx-auto px-4 z-10">
        <div className="flex flex-col items-center text-center">
          <div className="mb-6 relative">
            <span className="text-sm font-mono tracking-wider bg-dark-100 py-1 px-4 rounded-full text-neon">
              Hello, World! I'm
            </span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="text-white">Oussama</span>
            <span className="text-neon ml-4 neon-glow">Zbair</span>
          </h1>
          
          <div className="h-8 mb-8">
            <h2 className="font-mono text-sm md:text-lg typewriter text-gray-300">
              {text}
            </h2>
          </div>
          
          <p className="text-gray-400 max-w-lg mb-8 text-center">
            I build modern web applications with a focus on performance, 
            scalability, and exceptional user experiences. Passionate about 
            creating innovative software solutions.
          </p>
          
          <div className="flex flex-wrap gap-4 justify-center">
            <Button variant="default" className="bg-neon hover:bg-neon/80 text-dark-300 font-medium">
              <ArrowDown size={16} className="mr-2" />
              Download CV (EN)
            </Button>
            <Button variant="outline" className="border-neon text-neon hover:bg-neon/10">
              <ArrowDown size={16} className="mr-2" />
              Télécharger CV (FR)
            </Button>
            <Button variant="outline" className="border-purple text-purple hover:bg-purple/10">
              <Terminal size={16} className="mr-2" />
              Open Terminal
            </Button>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-8 w-full flex justify-center animate-bounce-soft">
        <a href="#about" aria-label="Scroll down">
          <ArrowDown className="text-neon" />
        </a>
      </div>
    </section>
  );
};

export default HeroSection;
