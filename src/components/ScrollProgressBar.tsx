import React, { useEffect, useState } from 'react';
import { motion, useSpring } from 'framer-motion';

const ScrollProgressBar: React.FC = () => {
  const [progress, setProgress] = useState(0);
  const spring = useSpring(progress, { stiffness: 200, damping: 30 });

  useEffect(() => {
    const onScroll = () => {
      const el = document.documentElement;
      const scrolled = el.scrollTop;
      const total = el.scrollHeight - el.clientHeight;
      setProgress(total > 0 ? scrolled / total : 0);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => { spring.set(progress); }, [progress, spring]);

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 z-[60] h-[2px] origin-left"
      style={{
        scaleX: spring,
        background: 'linear-gradient(90deg, hsl(217 91% 60%), hsl(24 95% 53%), hsl(173 80% 50%))',
      }}
    />
  );
};

export default ScrollProgressBar;
