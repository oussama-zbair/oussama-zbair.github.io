
import React from 'react';
import { Code } from 'lucide-react';

// Define the keyframes animation styles in the component
const slideLeftKeyframes = `
  @keyframes slide-left {
    from {
      transform: translateX(100%);
    }
    to {
      transform: translateX(-100%);
    }
  }
`;

const fallKeyframes = `
  @keyframes fall {
    from {
      transform: translateY(-100%);
    }
    to {
      transform: translateY(100vh);
    }
  }
`;

const SpaceIllustration = () => {
  // Insert the keyframes into the document on component mount
  React.useEffect(() => {
    const styleElement = document.createElement('style');
    styleElement.textContent = slideLeftKeyframes + fallKeyframes;
    document.head.appendChild(styleElement);

    // Cleanup on unmount
    return () => {
      document.head.removeChild(styleElement);
    };
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Animated code lines */}
      <div className="absolute inset-0">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute left-0 h-px bg-gradient-to-r from-neon/20 via-neon to-neon/20"
            style={{
              top: `${(i + 1) * 12}%`,
              width: '100%',
              animation: `slide-left ${3 + i}s linear infinite`,
              opacity: 0.5,
            }}
          />
        ))}
      </div>

      {/* Matrix-like falling code symbols */}
      <div className="absolute inset-0">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute"
            style={{
              left: `${(i + 1) * 8}%`,
              animation: `fall ${4 + Math.random() * 4}s linear infinite`,
              animationDelay: `${Math.random() * 2}s`,
            }}
          >
            <Code
              className="text-neon/40"
              size={20}
              style={{
                filter: 'blur(0.5px)',
              }}
            />
          </div>
        ))}
      </div>

      {/* Glowing orbs */}
      <div className="absolute top-1/3 right-[30%] w-32 h-32 bg-purple/10 rounded-full blur-3xl animate-pulse-neon" />
      <div className="absolute bottom-1/4 left-[25%] w-48 h-48 bg-neon/5 rounded-full blur-3xl animate-pulse-neon" 
        style={{ animationDelay: '1s' }} 
      />
    </div>
  );
};

export default SpaceIllustration;
