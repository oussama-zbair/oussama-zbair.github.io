import { useEffect } from 'react';

/**
 * Security protection hook.
 *
 * What this does (and why):
 * - Disables console output in production so stack traces / data shapes
 *   are not visible to casual observers in the browser console.
 * - Prevents drag-and-drop of images/links (minor UX hardening).
 *
 * What this intentionally does NOT do:
 * - Block F12 / right-click — this is security theater; any developer
 *   can bypass it in seconds and it harms legitimate users (accessibility,
 *   screen readers, power users).
 * - Detect DevTools — unreliable and creates false positives.
 * - Block copy — breaks accessibility and usability.
 *
 * Real security for this site lives in:
 * - No API keys or secrets in the client bundle (checked via .env)
 * - CSP headers in public/_headers (Netlify)
 * - HTTPS enforced via Netlify
 */
export const useSecurityProtection = () => {
  useEffect(() => {
    // Silence console in production to avoid leaking internals
    if (import.meta.env.PROD) {
      const noop = () => {};
      console.log   = noop;
      console.warn  = noop;
      console.info  = noop;
      console.debug = noop;
      // Keep console.error for legitimate runtime error tracking
    }

    // Prevent drag-start on images and links (minor UX hardening)
    const handleDragStart = (e: DragEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'IMG' || target.tagName === 'A') {
        e.preventDefault();
      }
    };

    document.addEventListener('dragstart', handleDragStart);
    return () => document.removeEventListener('dragstart', handleDragStart);
  }, []);
};
