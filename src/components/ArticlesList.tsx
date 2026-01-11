import React, { useState, useEffect } from 'react';
import { Calendar, Clock, Tag, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import articlesData from '../data/articles.json';
import { calculateReadingTime } from '../utils/readingTime';
import { preloadArticleContent } from '../utils/articleLoader';
import { debugLogger } from '../utils/debugLogger';

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

interface ArticlesListProps {
  onArticleSelect: (slug: string) => void;
}

export const ArticlesList: React.FC<ArticlesListProps> = ({ onArticleSelect }) => {
  const [articles] = useState<Article[]>(articlesData.articles);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [readingTimes, setReadingTimes] = useState<Record<string, string>>({});
  const [clickedArticle, setClickedArticle] = useState<string | null>(null);

  // Get all unique tags
  const allTags = Array.from(new Set(articles.flatMap(article => article.tags)));

  // Filter articles by selected tag
  const filteredArticles = selectedTag
    ? articles.filter(article => article.tags.includes(selectedTag))
    : articles;

  // Sort articles: featured first, then by date
  const sortedArticles = [...filteredArticles].sort((a, b) => {
    if (a.featured && !b.featured) return -1;
    if (!a.featured && b.featured) return 1;
    return new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime();
  });

  // Calculate reading times for articles (mock calculation based on excerpt length)
  useEffect(() => {
    const times: Record<string, string> = {};
    articles.forEach(article => {
      // Estimate reading time from excerpt (in real app, this would be calculated from full content)
      const estimatedWords = article.excerpt.split(' ').length * 8; // Assume excerpt is 1/8 of full article
      const readingTime = calculateReadingTime(' '.repeat(estimatedWords));
      times[article.id] = readingTime.text;
    });
    setReadingTimes(times);
  }, [articles]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const handleArticleClick = (slug: string, event?: React.MouseEvent) => {
    debugLogger.log('info', 'ArticlesList', `Article clicked: ${slug}`);
    
    // Prevent any default behavior and stop propagation
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }
    
    // Show visual feedback
    setClickedArticle(slug);
    
    // Add a small delay to ensure the click is processed
    setTimeout(() => {
      debugLogger.log('info', 'ArticlesList', `Calling onArticleSelect for: ${slug}`);
      onArticleSelect(slug);
      setClickedArticle(null);
    }, 100);
  };

  const handleArticleHover = (slug: string) => {
    debugLogger.log('info', 'ArticlesList', `Article hovered: ${slug}`);
    // Preload article content on hover for better performance
    preloadArticleContent(slug);
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <h1 className="text-5xl font-bold text-gray-900 mb-4">
          Articles
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Thoughts on software development, architecture, and technology trends.
          Sharing insights from building scalable applications.
        </p>
      </motion.div>

      {/* Tag Filter */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="mb-12"
      >
        <div className="flex flex-wrap gap-3 justify-center">
          <button
            onClick={() => setSelectedTag(null)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
              selectedTag === null
                ? 'bg-gray-900 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            All Articles
          </button>
          {allTags.map(tag => (
            <button
              key={tag}
              onClick={() => setSelectedTag(tag)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                selectedTag === tag
                  ? 'bg-gray-900 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Articles List */}
      <div className="space-y-8">
        {sortedArticles.map((article, index) => (
          <motion.article
            key={article.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className={`group cursor-pointer transform transition-all duration-200 hover:scale-[1.02] ${
              clickedArticle === article.slug ? 'scale-[0.98] opacity-75' : ''
            }`}
            onClick={(e) => handleArticleClick(article.slug, e)}
            onMouseEnter={() => handleArticleHover(article.slug)}
          >
            <div className="border-b border-gray-200 pb-8 hover:border-gray-300 transition-colors duration-200">
              {/* Featured Badge */}
              {article.featured && (
                <div className="mb-4">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                    Featured
                  </span>
                </div>
              )}

              {/* Article Content */}
              <div className="flex flex-col lg:flex-row lg:items-start gap-6">
                {/* Cover Image */}
                <div className="lg:w-48 lg:flex-shrink-0">
                  <div className="aspect-video lg:aspect-square w-full bg-gray-200 rounded-lg overflow-hidden">
                    <img
                      src={article.coverImage}
                      alt={article.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                    />
                  </div>
                </div>

                {/* Article Info */}
                <div className="flex-1 min-w-0">
                  <h2 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-gray-700 transition-colors duration-200 line-clamp-2">
                    {article.title}
                  </h2>

                  <p className="text-gray-700 text-lg leading-relaxed mb-4 line-clamp-3">
                    {article.excerpt}
                  </p>

                  {/* Metadata */}
                  <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-4">
                    <div className="flex items-center gap-1">
                      <Calendar size={16} />
                      <span>{formatDate(article.publishedDate)}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock size={16} />
                      <span>{readingTimes[article.id] || '5 min read'}</span>
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {article.tags.slice(0, 3).map(tag => (
                      <span
                        key={tag}
                        className="inline-flex items-center gap-1 px-3 py-1 bg-blue-50 text-blue-700 text-sm rounded-full border border-blue-200"
                      >
                        <Tag size={12} />
                        {tag}
                      </span>
                    ))}
                    {article.tags.length > 3 && (
                      <span className="text-sm text-gray-600">
                        +{article.tags.length - 3} more
                      </span>
                    )}
                  </div>

                  {/* Read More */}
                  <div className="flex items-center text-blue-600 font-medium group-hover:text-blue-700 transition-colors duration-200">
                    <span>Read article</span>
                    <ArrowRight 
                      size={16} 
                      className="ml-2 group-hover:translate-x-1 transition-transform duration-200" 
                    />
                  </div>
                </div>
              </div>
            </div>
          </motion.article>
        ))}
      </div>

      {/* Empty State */}
      {filteredArticles.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-16"
        >
          <p className="text-gray-500 text-lg">
            No articles found for the selected tag.
          </p>
          <button
            onClick={() => setSelectedTag(null)}
            className="mt-4 text-gray-900 hover:text-gray-700 font-medium"
          >
            View all articles
          </button>
        </motion.div>
      )}
    </div>
  );
};