/**
 * Debug logger for article system
 */

interface LogEntry {
  timestamp: string;
  level: 'info' | 'warn' | 'error';
  component: string;
  message: string;
  data?: any;
}

class DebugLogger {
  private logs: LogEntry[] = [];
  private maxLogs = 100;

  log(level: 'info' | 'warn' | 'error', component: string, message: string, data?: any) {
    const entry: LogEntry = {
      timestamp: new Date().toISOString(),
      level,
      component,
      message,
      data
    };

    this.logs.push(entry);
    
    // Keep only the last maxLogs entries
    if (this.logs.length > this.maxLogs) {
      this.logs = this.logs.slice(-this.maxLogs);
    }

    // Also log to console with appropriate level
    const logMessage = `[${component}] ${message}`;
    switch (level) {
      case 'info':
        console.log(logMessage, data || '');
        break;
      case 'warn':
        console.warn(logMessage, data || '');
        break;
      case 'error':
        console.error(logMessage, data || '');
        break;
    }
  }

  getLogs(): LogEntry[] {
    return [...this.logs];
  }

  clearLogs(): void {
    this.logs = [];
  }

  getLogsForComponent(component: string): LogEntry[] {
    return this.logs.filter(log => log.component === component);
  }
}

export const debugLogger = new DebugLogger();

// Make it available globally for debugging
if (typeof window !== 'undefined') {
  (window as any).articleDebugLogger = debugLogger;
}