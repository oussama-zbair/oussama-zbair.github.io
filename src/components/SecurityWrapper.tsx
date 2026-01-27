import React, { useEffect } from 'react';
import { useSecurityProtection } from '@/hooks/useSecurityProtection';

interface SecurityWrapperProps {
  children: React.ReactNode;
}

/**
 * Security wrapper component that applies protection measures
 * to the entire application
 */
const SecurityWrapper: React.FC<SecurityWrapperProps> = ({ children }) => {
  // Apply security protections
  useSecurityProtection();

  useEffect(() => {
    // Add CSS to prevent selection on body
    document.body.style.userSelect = 'none';
    document.body.style.webkitUserSelect = 'none';
    
    // Prevent image dragging globally
    const style = document.createElement('style');
    style.textContent = `
      img, a, button, [data-protected] {
        -webkit-user-drag: none;
        user-drag: none;
        -webkit-touch-callout: none;
      }
      
      /* Allow selection in form inputs */
      input, textarea {
        user-select: text !important;
        -webkit-user-select: text !important;
      }
      
      /* Hide content when printing */
      @media print {
        body * {
          visibility: hidden !important;
        }
        body::after {
          content: 'Printing is disabled for security reasons.';
          visibility: visible;
          position: fixed;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          font-size: 24px;
        }
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return (
    <div 
      className="no-select no-drag"
      onContextMenu={(e) => e.preventDefault()}
      data-protected="true"
    >
      {children}
    </div>
  );
};

export default SecurityWrapper;
