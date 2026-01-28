import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Download, FileText } from 'lucide-react';
import ResumeDownloadModal from './ResumeDownloadModal';

interface ResumeDownloadButtonProps {
  variant?: 'default' | 'compact';
  className?: string;
}

const ResumeDownloadButton: React.FC<ResumeDownloadButtonProps> = ({ 
  variant = 'default',
  className = '' 
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleClick = () => {
    setIsModalOpen(true);
  };

  if (variant === 'compact') {
    return (
      <>
        <motion.button
          onClick={handleClick}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`relative p-2 rounded-full text-muted-foreground hover:text-foreground transition-colors ${className}`}
          aria-label="Download Resume"
        >
          <Download className="w-4 h-4" />
        </motion.button>
        <ResumeDownloadModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      </>
    );
  }

  return (
    <>
      <motion.button
        onClick={handleClick}
        whileHover={{ scale: 1.02, y: -2 }}
        whileTap={{ scale: 0.98 }}
        className={`group relative inline-flex items-center gap-3 px-6 py-3 rounded-full 
          bg-gradient-to-r from-primary to-accent text-primary-foreground font-medium
          shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 
          transition-all duration-300 overflow-hidden ${className}`}
      >
        {/* Shine effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent 
          translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
        
        <div className="flex items-center gap-3 relative z-10">
          <FileText className="w-5 h-5" />
          <span>Download Resume</span>
          <Download className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
        </div>
      </motion.button>
      <ResumeDownloadModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
};

export default ResumeDownloadButton;
