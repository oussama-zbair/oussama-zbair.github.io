import React, { useEffect, useRef } from 'react';

interface SpaceNameEffectProps {
  children: React.ReactNode;
  className?: string;
}

const SpaceNameEffect: React.FC<SpaceNameEffectProps> = ({ children, className = '' }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Create floating particles
    const createParticle = () => {
      const particle = document.createElement('div');
      particle.className = 'absolute pointer-events-none';
      
      // Random position around the container
      const angle = Math.random() * Math.PI * 2;
      const distance = 100 + Math.random() * 50;
      const x = Math.cos(angle) * distance;
      const y = Math.sin(angle) * distance;
      
      particle.style.left = `calc(50% + ${x}px)`;
      particle.style.top = `calc(50% + ${y}px)`;
      particle.style.width = '4px';
      particle.style.height = '4px';
      particle.style.borderRadius = '50%';
      particle.style.background = 'linear-gradient(45deg, #06b6d4, #a855f7)';
      particle.style.boxShadow = '0 0 10px currentColor';
      particle.style.animation = 'pulse 2s infinite';
      
      container.appendChild(particle);
      
      // Animate the particle in a spiral
      let startTime = Date.now();
      const duration = 4000;
      
      const animate = () => {
        const elapsed = Date.now() - startTime;
        const progress = elapsed / duration;
        
        if (progress >= 1) {
          if (container.contains(particle)) {
            container.removeChild(particle);
          }
          return;
        }
        
        // Spiral motion
        const currentAngle = angle + progress * Math.PI * 6;
        const currentDistance = distance * (1 - progress * 0.7);
        const currentX = Math.cos(currentAngle) * currentDistance;
        const currentY = Math.sin(currentAngle) * currentDistance;
        
        particle.style.left = `calc(50% + ${currentX}px)`;
        particle.style.top = `calc(50% + ${currentY}px)`;
        particle.style.opacity = `${1 - progress}`;
        particle.style.transform = `scale(${1 - progress * 0.5})`;
        
        requestAnimationFrame(animate);
      };
      
      requestAnimationFrame(animate);
    };

    // Create particles periodically
    const interval = setInterval(createParticle, 300);
    
    // Create initial burst
    for (let i = 0; i < 12; i++) {
      setTimeout(createParticle, i * 100);
    }

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      {/* Cosmic background glow - more visible */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/30 via-cyan-500/30 to-purple-500/30 rounded-full blur-3xl animate-pulse pointer-events-none" />
      
      {/* Additional glow layers */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/20 to-transparent rounded-full blur-2xl animate-pulse pointer-events-none" style={{ animationDelay: '1s' }} />
      
      {/* Rotating rings - more visible */}
      <div className="absolute inset-0 pointer-events-none">
        <div 
          className="absolute inset-0 border-2 border-cyan-400/50 rounded-full animate-spin"
          style={{ animationDuration: '20s' }}
        />
        <div 
          className="absolute inset-8 border border-purple-500/40 rounded-full animate-spin"
          style={{ animationDuration: '15s', animationDirection: 'reverse' }}
        />
        <div 
          className="absolute inset-16 border border-pink-500/30 rounded-full animate-spin"
          style={{ animationDuration: '25s' }}
        />
      </div>
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
      
      {/* Static floating stars - more visible */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-white rounded-full animate-pulse shadow-lg"
            style={{
              left: `${15 + (i * 7) % 70}%`,
              top: `${20 + (i * 11) % 60}%`,
              animationDelay: `${i * 0.3}s`,
              animationDuration: `${1.5 + Math.random()}s`,
              boxShadow: '0 0 8px rgba(255, 255, 255, 0.8)',
            }}
          />
        ))}
      </div>
      
      {/* Shooting stars */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(4)].map((_, i) => (
          <div
            key={`shooting-${i}`}
            className="absolute w-1 h-1 bg-gradient-to-r from-cyan-400 to-transparent rounded-full"
            style={{
              left: `${10 + i * 25}%`,
              top: `${15 + i * 20}%`,
              animation: `shooting-star ${3 + i}s linear infinite`,
              animationDelay: `${i * 1.5}s`,
              boxShadow: '0 0 6px currentColor',
            }}
          />
        ))}
      </div>
      
      <style dangerouslySetInnerHTML={{
        __html: `
        @keyframes shooting-star {
          0% { 
            transform: translateX(-100px) translateY(-100px) scale(0);
            opacity: 0;
          }
          10% { 
            opacity: 1;
            transform: translateX(-50px) translateY(-50px) scale(1);
          }
          90% { 
            opacity: 1;
            transform: translateX(200px) translateY(200px) scale(1);
          }
          100% { 
            opacity: 0;
            transform: translateX(300px) translateY(300px) scale(0);
          }
        }
        `
      }} />
    </div>
  );
};

export default SpaceNameEffect;