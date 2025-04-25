
import React from 'react';
import { Circle, Code } from 'lucide-react';

const Logo = () => {
  return (
    <div className="relative flex items-center">
      <div className="relative">
        <Code className="w-8 h-8 text-neon" />
        <Circle className="w-8 h-8 absolute top-0 left-0 text-purple opacity-50 animate-pulse" />
      </div>
    </div>
  );
};

export default Logo;
