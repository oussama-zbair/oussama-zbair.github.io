import React from 'react';
import { motion } from 'framer-motion';
import { Download, FileText } from 'lucide-react';
import { BentoCard } from './BentoGrid';

const DownloadCard: React.FC = () => {
  return (
    <BentoCard colSpan={1} rowSpan={1} variant="glow" className="p-6">
      <div className="h-full flex flex-col justify-between">
        <div className="flex items-center gap-2">
          <FileText className="w-4 h-4 text-primary" />
          <span className="text-xs font-mono uppercase tracking-wider text-muted-foreground">Resume</span>
        </div>

        <div className="space-y-2">
          <motion.button
            whileHover={{ scale: 1.02, x: 4 }}
            whileTap={{ scale: 0.98 }}
            className="w-full flex items-center gap-2 px-3 py-2 rounded-lg bg-secondary/80 hover:bg-secondary text-sm text-foreground transition-colors"
          >
            <Download className="w-4 h-4" />
            <span>English</span>
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.02, x: 4 }}
            whileTap={{ scale: 0.98 }}
            className="w-full flex items-center gap-2 px-3 py-2 rounded-lg bg-secondary/50 hover:bg-secondary/80 text-sm text-muted-foreground transition-colors"
          >
            <Download className="w-4 h-4" />
            <span>Français</span>
          </motion.button>
        </div>
      </div>
    </BentoCard>
  );
};

export default DownloadCard;
