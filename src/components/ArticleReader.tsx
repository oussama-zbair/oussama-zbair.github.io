import React, { useState, useEffect } from 'react';
import { ArrowLeft, Calendar, Clock, Heart, Share2, Bookmark, User } from 'lucide-react';
import { motion } from 'framer-motion';
import articlesData from '../data/articles.json';
import { loadArticleContent } from '../utils/articleLoader';
import { parseMarkdown, renderMarkdownToHTML } from '../utils/markdown';

interface Article {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  publishedDate: string;
  tags: string[];
  coverImage: string;
  featured: boolean;
}

interface ArticleReaderProps {
  slug: string;
  onBack: () => void;
}

export const ArticleReader: React.FC<ArticleReaderProps> = ({ slug, onBack }) => {
  const [article, setArticle] = useState<Article | null>(null);
  const [content, setContent] = useState<string>('');
  const [readingTime, setReadingTime] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);

  useEffect(() => {
    const loadArticle = async () => {
      try {
        setLoading(true);
        setError(null);
        
        console.log(`ArticleReader: Loading article with slug: ${slug}`);

        // Find article metadata
        const articleData = articlesData.articles.find(a => a.slug === slug);
        if (!articleData) {
          console.error(`ArticleReader: No metadata found for slug: ${slug}`);
          throw new Error(`Article metadata not found for: ${slug}`);
        }

        console.log(`ArticleReader: Found metadata for: ${articleData.title}`);
        setArticle(articleData);

        // Load article content with timeout to prevent blocking
        console.log(`ArticleReader: Loading content for: ${slug}`);
        
        const loadWithTimeout = Promise.race([
          loadArticleContent(slug),
          new Promise<never>((_, reject) => 
            setTimeout(() => reject(new Error('Loading timeout')), 10000)
          )
        ]);
        
        const articleContent = await loadWithTimeout;
        
        if (!articleContent || !articleContent.content) {
          throw new Error(`No content returned for article: ${slug}`);
        }

        console.log(`ArticleReader: Content loaded, length: ${articleContent.content.length} characters`);
        
        // Parse markdown and render to HTML
        const nodes = parseMarkdown(articleContent.content);
        const htmlContent = renderMarkdownToHTML(nodes);
        
        console.log(`ArticleReader: Markdown parsed and rendered to HTML`);
        
        setContent(htmlContent);
        setReadingTime(articleContent.readingTime.text);

        // Check if article is liked/bookmarked (from localStorage)
        try {
          const likedArticles = JSON.parse(localStorage.getItem('likedArticles') || '[]');
          const bookmarkedArticles = JSON.parse(localStorage.getItem('bookmarkedArticles') || '[]');
          
          setIsLiked(likedArticles.includes(slug));
          setIsBookmarked(bookmarkedArticles.includes(slug));
        } catch (storageError) {
          console.warn('Failed to load localStorage data:', storageError);
        }

        console.log(`ArticleReader: Article loaded successfully: ${articleData.title}`);

      } catch (err) {
        console.error('ArticleReader: Error loading article:', err);
        const errorMessage = err instanceof Error ? err.message : 'Failed to load article';
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      loadArticle();
    } else {
      setError('No article slug provided');
      setLoading(false);
    }
  }, [slug]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const handleLike = () => {
    const likedArticles = JSON.parse(localStorage.getItem('likedArticles') || '[]');
    
    if (isLiked) {
      const updated = likedArticles.filter((id: string) => id !== slug);
      localStorage.setItem('likedArticles', JSON.stringify(updated));
    } else {
      likedArticles.push(slug);
      localStorage.setItem('likedArticles', JSON.stringify(likedArticles));
    }
    
    setIsLiked(!isLiked);
  };

  const handleBookmark = () => {
    const bookmarkedArticles = JSON.parse(localStorage.getItem('bookmarkedArticles') || '[]');
    
    if (isBookmarked) {
      const updated = bookmarkedArticles.filter((id: string) => id !== slug);
      localStorage.setItem('bookmarkedArticles', JSON.stringify(updated));
    } else {
      bookmarkedArticles.push(slug);
      localStorage.setItem('bookmarkedArticles', JSON.stringify(bookmarkedArticles));
    }
    
    setIsBookmarked(!isBookmarked);
  };

  const handleShare = async () => {
    const url = window.location.href;
    const title = article?.title || 'Check out this article';
    
    if (navigator.share) {
      try {
        await navigator.share({ title, url });
      } catch (err) {
        // User cancelled or error occurred
        console.log('Share cancelled');
      }
    } else {
      // Fallback: copy to clipboard
      try {
        await navigator.clipboard.writeText(url);
        // You could show a toast notification here
        console.log('URL copied to clipboard');
      } catch (err) {
        console.error('Failed to copy URL');
      }
    }
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-8"></div>
          <div className="h-12 bg-gray-200 rounded w-3/4 mb-4"></div>
          <div className="h-6 bg-gray-200 rounded w-1/2 mb-8"></div>
          <div className="h-64 bg-gray-200 rounded mb-8"></div>
          <div className="space-y-4">
            <div className="h-4 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded w-5/6"></div>
            <div className="h-4 bg-gray-200 rounded w-4/6"></div>
          </div>
        </div>
        <div className="text-center mt-8">
          <p className="text-gray-600">Loading article: {slug}</p>
          <p className="text-sm text-gray-500 mt-2">This may take a moment...</p>
        </div>
      </div>
    );
  }

  if (error || !article) {
    return (
      <div className="max-w-4xl mx-auto px-6 py-12">
        <button
          onClick={onBack}
          className="flex items-center text-gray-600 hover:text-gray-900 mb-8 transition-colors"
        >
          <ArrowLeft size={20} className="mr-2" />
          Back to articles
        </button>
        <div className="text-center py-16">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Article Not Found</h1>
          <p className="text-gray-600 mb-8">
            {error || 'The article you\'re looking for doesn\'t exist.'}
          </p>
          <button
            onClick={onBack}
            className="bg-gray-900 text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors"
          >
            Back to Articles
          </button>
        </div>
      </div>
    );
  }

  return (
    <article className="max-w-4xl mx-auto px-6 py-12">
      {/* Back Button */}
      <motion.button
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        onClick={onBack}
        className="flex items-center text-gray-600 hover:text-gray-900 mb-8 transition-colors group"
      >
        <ArrowLeft size={20} className="mr-2 group-hover:-translate-x-1 transition-transform" />
        Back to articles
      </motion.button>

      {/* Article Header */}
      <motion.header
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-12"
      >
        {/* Featured Badge */}
        {article.featured && (
          <div className="mb-6">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800">
              Featured Article
            </span>
          </div>
        )}

        {/* Title */}
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-6">
          {article.title}
        </h1>

        {/* Metadata */}
        <div className="flex flex-wrap items-center gap-6 text-gray-600 mb-8">
          <div className="flex items-center gap-2">
            <Calendar size={18} />
            <span>{formatDate(article.publishedDate)}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock size={18} />
            <span>{readingTime}</span>
          </div>
        </div>

        {/* Author */}
        <div className="flex items-center gap-4 mb-8">
          <div className="w-12 h-12 bg-gray-200 rounded-full overflow-hidden flex items-center justify-center">
            <User size={24} className="text-gray-600" />
          </div>
          <div>
            <p className="font-semibold text-gray-900">Oussama Zbair</p>
            <p className="text-gray-600 text-sm">Full Stack Developer</p>
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-8">
          {article.tags.map(tag => (
            <span
              key={tag}
              className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Cover Image */}
        <div className="aspect-video w-full bg-gray-200 rounded-xl overflow-hidden mb-8">
          <img
            src={article.coverImage}
            alt={article.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-4 py-4 border-y border-gray-200">
          <button
            onClick={handleLike}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
              isLiked
                ? 'bg-red-50 text-red-600 hover:bg-red-100'
                : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
            }`}
          >
            <Heart size={18} fill={isLiked ? 'currentColor' : 'none'} />
            <span>{isLiked ? 'Liked' : 'Like'}</span>
          </button>

          <button
            onClick={handleBookmark}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
              isBookmarked
                ? 'bg-blue-50 text-blue-600 hover:bg-blue-100'
                : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
            }`}
          >
            <Bookmark size={18} fill={isBookmarked ? 'currentColor' : 'none'} />
            <span>{isBookmarked ? 'Saved' : 'Save'}</span>
          </button>

          <button
            onClick={handleShare}
            className="flex items-center gap-2 px-4 py-2 bg-gray-50 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <Share2 size={18} />
            <span>Share</span>
          </button>
        </div>
      </motion.header>

      {/* Article Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="prose prose-lg prose-gray max-w-none"
        dangerouslySetInnerHTML={{ __html: content }}
      />

      {/* Add copy functionality script */}
      <script
        dangerouslySetInnerHTML={{
          __html: `
            window.copyToClipboard = function(button) {
              const code = button.getAttribute('data-code');
              navigator.clipboard.writeText(code).then(() => {
                const originalText = button.innerHTML;
                button.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20,6 9,17 4,12"></polyline></svg> Copied!';
                button.classList.add('copied');
                setTimeout(() => {
                  button.innerHTML = originalText;
                  button.classList.remove('copied');
                }, 2000);
              }).catch(() => {
                console.error('Failed to copy code');
              });
            };
          `
        }}
      />

      {/* Article Footer */}
      <motion.footer
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="mt-16 pt-8 border-t border-gray-200"
      >
        {/* Author Bio */}
        <div className="bg-gray-50 rounded-xl p-8 mb-8">
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 bg-gray-200 rounded-full overflow-hidden flex-shrink-0 flex items-center justify-center">
              <User size={32} className="text-gray-600" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Oussama Zbair</h3>
              <p className="text-gray-600 leading-relaxed">
                Full Stack Developer passionate about building scalable applications and sharing knowledge 
                about modern web technologies. Experienced in Java, Spring Boot, React, and cloud architecture.
              </p>
            </div>
          </div>
        </div>

        {/* Action Buttons (Repeat) */}
        <div className="flex items-center justify-center gap-4">
          <button
            onClick={handleLike}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg transition-colors ${
              isLiked
                ? 'bg-red-50 text-red-600 hover:bg-red-100'
                : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
            }`}
          >
            <Heart size={20} fill={isLiked ? 'currentColor' : 'none'} />
            <span>{isLiked ? 'Liked' : 'Like this article'}</span>
          </button>

          <button
            onClick={handleShare}
            className="flex items-center gap-2 px-6 py-3 bg-gray-900 text-white hover:bg-gray-800 rounded-lg transition-colors"
          >
            <Share2 size={20} />
            <span>Share article</span>
          </button>
        </div>
      </motion.footer>
    </article>
  );
};