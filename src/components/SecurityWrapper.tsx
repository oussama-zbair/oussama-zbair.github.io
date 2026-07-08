import React, { useEffect } from 'react';
import { useSecurityProtection } from '@/hooks/useSecurityProtection';

interface SecurityWrapperProps {
  children: React.ReactNode;
}

/**
 * Applies lightweight, non-intrusive security protections.
 * See useSecurityProtection for rationale on what is and isn't blocked.
 */
const SecurityWrapper: React.FC<SecurityWrapperProps> = ({ children }) => {
  useSecurityProtection();

  useEffect(() => {
    // Block printing — prevent easy PDF export of the full page
    const style = document.createElement('style');
    style.textContent = `
      @media print {
        body * { visibility: hidden !important; }
        body::after {
          content: 'Printing is not available.';
          visibility: visible;
          position: fixed;
          top: 50%; left: 50%;
          transform: translate(-50%, -50%);
          font-size: 20px;
          font-family: sans-serif;
        }
      }
    `;
    document.head.appendChild(style);
    return () => { document.head.removeChild(style); };
  }, []);

  return <>{children}</>;
};

export default SecurityWrapper;
