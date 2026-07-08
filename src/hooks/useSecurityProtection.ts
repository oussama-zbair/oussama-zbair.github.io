import { useEffect } from 'react';

export const useSecurityProtection = () => {
  useEffect(() => {
    // ── Silence console in production ──────────────────────────────────────
    if (import.meta.env.PROD) {
      const noop = () => {};
      console.log   = noop;
      console.warn  = noop;
      console.info  = noop;
      console.debug = noop;
    }

    // ── Block copy / cut ───────────────────────────────────────────────────
    const handleCopy = (e: ClipboardEvent) => {
      const target = e.target as HTMLElement;
      // Allow copy inside form inputs
      if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA') return;
      e.preventDefault();
      e.clipboardData?.setData('text/plain', '');
    };
    const handleCut = (e: ClipboardEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA') return;
      e.preventDefault();
    };

    // ── Block right-click context menu ─────────────────────────────────────
    const handleContextMenu = (e: MouseEvent) => e.preventDefault();

    // ── Block inspect / devtools keyboard shortcuts ────────────────────────
    const handleKeyDown = (e: KeyboardEvent) => {
      // F12
      if (e.key === 'F12') { e.preventDefault(); return; }
      // Ctrl+Shift+I / Ctrl+Shift+J / Ctrl+Shift+C
      if (e.ctrlKey && e.shiftKey && ['I','i','J','j','C','c'].includes(e.key)) {
        e.preventDefault(); return;
      }
      // Ctrl+U (view source)
      if (e.ctrlKey && (e.key === 'u' || e.key === 'U')) {
        e.preventDefault(); return;
      }
      // Ctrl+C / Ctrl+X (copy/cut) — block outside inputs
      if (e.ctrlKey && (e.key === 'c' || e.key === 'x')) {
        const target = e.target as HTMLElement;
        if (target.tagName !== 'INPUT' && target.tagName !== 'TEXTAREA') {
          e.preventDefault();
        }
      }
    };

    // ── Block drag of images/links ─────────────────────────────────────────
    const handleDragStart = (e: DragEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'IMG' || target.tagName === 'A') e.preventDefault();
    };

    document.addEventListener('copy',        handleCopy);
    document.addEventListener('cut',         handleCut);
    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('keydown',     handleKeyDown);
    document.addEventListener('dragstart',   handleDragStart);

    return () => {
      document.removeEventListener('copy',        handleCopy);
      document.removeEventListener('cut',         handleCut);
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('keydown',     handleKeyDown);
      document.removeEventListener('dragstart',   handleDragStart);
    };
  }, []);
};
