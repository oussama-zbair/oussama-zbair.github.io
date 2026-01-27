import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { personalInfo } from '@/data/portfolio';
import ResumeDownloadButton from './ResumeDownloadButton';
import SpaceNameEffect from '../SpaceNameEffect';

const IdentityReveal: React.FC = () => {
  const [phase, setPhase] = useState(0);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 500),
      setTimeout(() => setPhase(2), 1500),
      setTimeout(() => setPhase(3), 2500),
      setTimeout(() => setShowContent(true), 3500),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div className="absolute inset-0 flex items-center justify-center z-10">
      <div className="text-center">
        {/* Phase 1: Enigmatic question */}
        <AnimatePresence>
          {phase >= 1 && phase < 3 && (
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="text-sm md:text-base font-mono text-muted-foreground tracking-[0.3em] uppercase mb-8"
            >
              Who builds the future?
            </motion.p>
          )}
        </AnimatePresence>

        {/* Phase 2 & 3: Name reveal with space effects */}
        <AnimatePresence>
          {phase >= 2 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="relative"
            >
              {/* Immediate visible space effects */}
              <div className="absolute inset-0 pointer-events-none">
                {/* Glowing background */}
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/40 via-cyan-500/40 to-purple-500/40 rounded-full blur-3xl animate-pulse" />
                
                {/* Rotating rings */}
                <div className="absolute inset-0 border-2 border-cyan-400/60 rounded-full animate-spin" style={{ animationDuration: '20s' }} />
                <div className="absolute inset-8 border border-purple-500/50 rounded-full animate-spin" style={{ animationDuration: '15s', animationDirection: 'reverse' }} />
                
                {/* Floating particles */}
                {[...Array(16)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute w-2 h-2 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full animate-pulse"
                    style={{
                      left: `${10 + (i * 5) % 80}%`,
                      top: `${15 + (i * 7) % 70}%`,
                      animationDelay: `${i * 0.2}s`,
                      animationDuration: `${1 + Math.random()}s`,
                      boxShadow: '0 0 10px currentColor',
                    }}
                  />
                ))}
              </div>
              
              <SpaceNameEffect className="relative">
                <h1 className="text-5xl md:text-8xl lg:text-9xl font-bold tracking-tight relative z-10">
                  <motion.span
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2, duration: 0.8 }}
                    className="block text-foreground drop-shadow-lg"
                  >
                    {personalInfo.firstName}
                  </motion.span>
                  <motion.span
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                    className="block gradient-text drop-shadow-2xl"
                    style={{
                      textShadow: '0 0 20px hsl(var(--primary)), 0 0 40px hsl(var(--primary))'
                    }}
                  >
                    {personalInfo.lastName}
                  </motion.span>
                </h1>
              </SpaceNameEffect>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Phase 4: Role & CTA */}
        <AnimatePresence>
          {showContent && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="mt-8 space-y-6"
            >
              <p className="text-lg md:text-xl text-muted-foreground font-light tracking-wide">
                {personalInfo.title}
              </p>
              
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.6, duration: 1 }}
                className="w-24 h-px bg-gradient-to-r from-transparent via-primary to-transparent mx-auto"
              />

              {/* Download Resume Button */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.6 }}
                className="pt-4"
              >
                <ResumeDownloadButton />
              </motion.div>

              <p className="text-sm text-muted-foreground/70 max-w-md mx-auto pt-4">
                Scroll to explore my universe
              </p>

              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="pointer-events-auto"
              >
                <svg
                  className="w-6 h-6 mx-auto text-primary/50"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 14l-7 7m0 0l-7-7m7 7V3"
                  />
                </svg>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default IdentityReveal;
