import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Download, Users, Mail, Briefcase, Calendar, Trash2, RefreshCw, X } from 'lucide-react';
import { getLocalDownloads, clearLocalDownloads } from '@/lib/emailService';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface DownloadRecord {
  id: string;
  name: string;
  email: string;
  role: string;
  timestamp: string;
}

const DownloadStats: React.FC = () => {
  const [downloads, setDownloads] = useState<DownloadRecord[]>([]);
  const [isVisible, setIsVisible] = useState(false);

  const loadDownloads = () => {
    const localDownloads = getLocalDownloads();
    setDownloads(localDownloads);
  };

  useEffect(() => {
    loadDownloads();
  }, []);

  const handleClearDownloads = () => {
    if (confirm('Are you sure you want to clear all local download records?')) {
      clearLocalDownloads();
      setDownloads([]);
    }
  };

  const exportToCSV = () => {
    if (downloads.length === 0) return;

    const headers = ['Name', 'Email', 'Role', 'Timestamp'];
    const csvContent = [
      headers.join(','),
      ...downloads.map(d => [
        `"${d.name}"`,
        `"${d.email}"`,
        `"${d.role}"`,
        `"${new Date(d.timestamp).toLocaleString()}"`
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `cv-downloads-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const roleStats = downloads.reduce((acc, download) => {
    acc[download.role] = (acc[download.role] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  // Secret key combination to show admin panel (Ctrl+Shift+A)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key === 'A') {
        e.preventDefault();
        setIsVisible(!isVisible);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isVisible]);

  if (!isVisible) {
    return (
      <div className="fixed bottom-4 right-4 z-50">
        <Button
          onClick={() => setIsVisible(true)}
          variant="outline"
          size="sm"
          className="opacity-20 hover:opacity-100 transition-opacity"
        >
          <Users className="w-4 h-4" />
        </Button>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed inset-4 z-50 bg-background/95 backdrop-blur-sm border border-border rounded-lg p-6 overflow-auto"
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <Download className="w-6 h-6" />
          CV Download Statistics
        </h2>
        <Button onClick={() => setIsVisible(false)} variant="outline" size="sm">
          <X className="w-4 h-4" />
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Users className="w-4 h-4" />
              Total Downloads
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{downloads.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Mail className="w-4 h-4" />
              Unique Emails
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {new Set(downloads.map(d => d.email)).size}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Briefcase className="w-4 h-4" />
              Top Role
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-lg font-bold">
              {Object.entries(roleStats).sort(([,a], [,b]) => b - a)[0]?.[0] || 'N/A'}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              Latest
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-sm font-bold">
              {downloads.length > 0 
                ? new Date(downloads[downloads.length - 1].timestamp).toLocaleDateString()
                : 'N/A'
              }
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Actions */}
      <div className="flex gap-2 mb-4">
        <Button onClick={loadDownloads} variant="outline" size="sm">
          <RefreshCw className="w-4 h-4 mr-2" />
          Refresh
        </Button>
        <Button onClick={exportToCSV} variant="outline" size="sm" disabled={downloads.length === 0}>
          <Download className="w-4 h-4 mr-2" />
          Export CSV
        </Button>
        <Button onClick={handleClearDownloads} variant="destructive" size="sm" disabled={downloads.length === 0}>
          <Trash2 className="w-4 h-4 mr-2" />
          Clear All
        </Button>
      </div>

      {/* Downloads Table */}
      <div className="border border-border rounded-lg overflow-hidden">
        <div className="max-h-96 overflow-auto">
          <table className="w-full">
            <thead className="bg-muted/50 sticky top-0">
              <tr>
                <th className="text-left p-3 font-medium">Name</th>
                <th className="text-left p-3 font-medium">Email</th>
                <th className="text-left p-3 font-medium">Role</th>
                <th className="text-left p-3 font-medium">Date</th>
              </tr>
            </thead>
            <tbody>
              {downloads.length === 0 ? (
                <tr>
                  <td colSpan={4} className="text-center p-8 text-muted-foreground">
                    No downloads recorded yet
                  </td>
                </tr>
              ) : (
                downloads.map((download) => (
                  <tr key={download.id} className="border-t border-border hover:bg-muted/30">
                    <td className="p-3">{download.name}</td>
                    <td className="p-3">{download.email}</td>
                    <td className="p-3 capitalize">{download.role.replace('_', ' ')}</td>
                    <td className="p-3">{new Date(download.timestamp).toLocaleString()}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {downloads.length > 0 && (
        <div className="mt-4 text-sm text-muted-foreground">
          💡 Tip: Set up EmailJS, Google Sheets, or webhooks to automatically receive notifications instead of checking here manually.
        </div>
      )}
    </motion.div>
  );
};

export default DownloadStats;