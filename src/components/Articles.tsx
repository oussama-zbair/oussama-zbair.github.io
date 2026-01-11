import React, { useState, useEffect } from 'react';
import { ArticlesList } from './ArticlesList';
import { ArticleReader } from './ArticleReader';
import { debugLogger } from '../utils/debugLogger';
import { DebugPanel } from './DebugPanel';

export const Articles: React.FC = () => {
  const [selectedArticle, setSelectedArticle] = useState<string | null>(null);

  // Handle browser back/forward navigation
  useEffect(() => {
    const handlePopState = () => {
      const urlParams = new URLSearchParams(window.location.search);
      const articleSlug = urlParams.get('article');
      console.log(`Articles: URL changed, article param: ${articleSlug}`);
      console.log(`Articles: Full URL: ${window.location.href}`);
      setSelectedArticle(articleSlug);
    };

    // Set initial state from URL
    console.log(`Articles: Initial URL check: ${window.location.href}`);
    handlePopState();

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const handleArticleSelect = (slug: string) => {
    debugLogger.log('info', 'Articles', `Selecting article: ${slug}`);
    
    try {
      setSelectedArticle(slug);
      
      // Update URL without page reload
      const url = new URL(window.location.href);
      url.searchParams.set('article', slug);
      window.history.pushState({ article: slug }, '', url.toString());
      
      debugLogger.log('info', 'Articles', `URL updated to: ${url.toString()}`);
      
      // Scroll to top
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (error) {
      debugLogger.log('error', 'Articles', `Error selecting article ${slug}`, error);
      // Still try to set the article even if URL update fails
      setSelectedArticle(slug);
    }
  };

  const handleBackToList = () => {
    console.log(`Articles: Going back to list`);
    
    try {
      setSelectedArticle(null);
      
      // Update URL without page reload
      const url = new URL(window.location.href);
      url.searchParams.delete('article');
      window.history.pushState({}, '', url.toString());
      
      console.log(`Articles: URL updated to: ${url.toString()}`);
      
      // Scroll to top
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (error) {
      console.error(`Articles: Error going back to list:`, error);
      // Still try to go back even if URL update fails
      setSelectedArticle(null);
    }
  };

  console.log(`Articles: Rendering with selectedArticle: ${selectedArticle}`);

  return (
    <div className="min-h-screen bg-white">
      {selectedArticle ? (
        <ArticleReader 
          slug={selectedArticle} 
          onBack={handleBackToList}
        />
      ) : (
        <ArticlesList 
          onArticleSelect={handleArticleSelect}
        />
      )}
      <DebugPanel selectedArticle={selectedArticle} />
    </div>
  );
};