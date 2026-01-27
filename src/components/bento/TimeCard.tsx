import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Clock } from 'lucide-react';
import { BentoCard } from './BentoGrid';

const TimeCard: React.FC = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  // Morocco timezone (GMT+1)
  const moroccoTime = new Date(time.toLocaleString('en-US', { timeZone: 'Africa/Casablanca' }));
  const hours = moroccoTime.getHours();
  const minutes = moroccoTime.getMinutes();
  const seconds = moroccoTime.getSeconds();

  // Determine greeting based on time
  const getGreeting = () => {
    if (hours < 12) return 'Good morning';
    if (hours < 18) return 'Good afternoon';
    return 'Good evening';
  };

  return (
    <BentoCard colSpan={1} rowSpan={1} variant="shine" className="p-6">
      <div className="h-full flex flex-col justify-between">
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 text-muted-foreground" />
          <span className="text-xs text-muted-foreground">Morocco</span>
        </div>

        <div>
          <motion.p
            key={seconds}
            initial={{ opacity: 0.5 }}
            animate={{ opacity: 1 }}
            className="text-3xl font-mono font-bold text-foreground"
          >
            {String(hours).padStart(2, '0')}
            <span className="animate-pulse">:</span>
            {String(minutes).padStart(2, '0')}
          </motion.p>
          <p className="text-xs text-primary mt-1">{getGreeting()}!</p>
        </div>
      </div>
    </BentoCard>
  );
};

export default TimeCard;
