import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Quote } from 'lucide-react';
import { BentoCard } from './BentoGrid';

const quotes = [
  { text: "Code is poetry written in logic.", author: "Dev Wisdom" },
  { text: "First, solve the problem. Then, write the code.", author: "John Johnson" },
  { text: "Simplicity is the soul of efficiency.", author: "Austin Freeman" },
  { text: "Talk is cheap. Show me the code.", author: "Linus Torvalds" },
];

const QuoteCard: React.FC = () => {
  const [currentQuote, setCurrentQuote] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentQuote((prev) => (prev + 1) % quotes.length);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  return (
    <BentoCard colSpan={2} rowSpan={1} variant="shine" className="p-6">
      <div className="h-full flex flex-col justify-between">
        <Quote className="w-5 h-5 text-primary/30" />
        
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuote}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="flex-1 flex flex-col justify-center"
          >
            <p className="text-sm text-foreground italic leading-relaxed">
              "{quotes[currentQuote].text}"
            </p>
            <p className="text-xs text-muted-foreground mt-2">
              — {quotes[currentQuote].author}
            </p>
          </motion.div>
        </AnimatePresence>

        {/* Progress dots */}
        <div className="flex gap-1">
          {quotes.map((_, i) => (
            <div
              key={i}
              className={`h-0.5 rounded-full transition-all ${
                i === currentQuote
                  ? 'w-6 bg-primary'
                  : 'w-1.5 bg-muted'
              }`}
            />
          ))}
        </div>
      </div>
    </BentoCard>
  );
};

export default QuoteCard;
