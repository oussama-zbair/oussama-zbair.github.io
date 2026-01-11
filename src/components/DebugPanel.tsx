import React, { useState, useEffect } from 'react';
import { debugLogger } from '../utils/debugLogger';

interface DebugPanelProps {
  selectedArticle: string | null;
}

export const DebugPanel: React.FC<DebugPanelProps> = ({ selectedArticle }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [logs, setLogs] = useState<any[]>([]);

  useEffect(() => {
    const updateLogs = () => {
      setLogs(debugLogger.getLogs().slice(-10)); // Show last 10 logs
    };

    updateLogs();
    const interval = setInterval(updateLogs, 1000);
    return () => clearInterval(interval);
  }, []);

  // Show debug panel only in development
  if (process.env.NODE_ENV !== 'development') {
    return null;
  }

  return (
    <>
      {/* Debug Toggle Button */}
      <button
        onClick={() => setIsVisible(!isVisible)}
        className="fixed bottom-4 right-4 z-50 bg-red-500 text-white px-3 py-2 rounded-lg text-sm font-mono"
        style={{ fontSize: '12px' }}
      >
        DEBUG
      </button>

      {/* Debug Panel */}
      {isVisible && (
        <div className="fixed bottom-16 right-4 z-50 bg-black text-green-400 p-4 rounded-lg max-w-md max-h-96 overflow-auto font-mono text-xs">
          <div className="mb-2">
            <strong>Current State:</strong>
            <div>Selected Article: {selectedArticle || 'null'}</div>
            <div>URL: {window.location.href}</div>
            <div>Pathname: {window.location.pathname}</div>
            <div>Search: {window.location.search}</div>
          </div>
          
          <div className="mb-2">
            <strong>Recent Logs:</strong>
            <div className="max-h-48 overflow-y-auto">
              {logs.map((log, index) => (
                <div key={index} className={`text-xs ${
                  log.level === 'error' ? 'text-red-400' : 
                  log.level === 'warn' ? 'text-yellow-400' : 
                  'text-green-400'
                }`}>
                  [{log.component}] {log.message}
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={() => debugLogger.clearLogs()}
            className="bg-gray-700 text-white px-2 py-1 rounded text-xs"
          >
            Clear Logs
          </button>
        </div>
      )}
    </>
  );
};