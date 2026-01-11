import { debugLogger } from './debugLogger';

/**
 * Dynamic article content loader
 * Loads article content files dynamically by slug with improved error handling
 */

interface ArticleContent {
  content: string;
  readingTime: {
    minutes: number;
    words: number;
    text: string;
  };
}

// Cache for loaded articles to avoid re-fetching
const articleCache = new Map<string, ArticleContent>();

/**
 * Load article content dynamically by slug
 */
export async function loadArticleContent(slug: string): Promise<ArticleContent> {
  debugLogger.log('info', 'ArticleLoader', `Loading article: ${slug}`);
  
  // Check cache first
  if (articleCache.has(slug)) {
    debugLogger.log('info', 'ArticleLoader', `Article ${slug} loaded from cache`);
    return articleCache.get(slug)!;
  }

  try {
    debugLogger.log('info', 'ArticleLoader', `Attempting to load article file: ${slug}.md`);
    
    // Use a more reliable import method
    let content: string;
    
    try {
      // Use explicit imports for known articles to avoid dynamic import issues
      const articleModules: Record<string, () => Promise<{ default: string }>> = {
        'microservices-spring-boot-docker': () => import('../data/articles/microservices-spring-boot-docker.md?raw'),
        'react-performance-patterns': () => import('../data/articles/react-performance-patterns.md?raw'),
        'devops-cicd-jenkins-docker': () => import('../data/articles/devops-cicd-jenkins-docker.md?raw'),
        'database-optimization-guide': () => import('../data/articles/database-optimization-guide.md?raw'),
        'typescript-advanced-patterns': () => import('../data/articles/typescript-advanced-patterns.md?raw'),
      };

      const moduleLoader = articleModules[slug];
      if (moduleLoader) {
        const module = await moduleLoader();
        content = module.default;
        debugLogger.log('info', 'ArticleLoader', `Successfully loaded ${slug} via explicit import`);
      } else {
        throw new Error(`No module loader found for slug: ${slug}`);
      }
    } catch (importError) {
      debugLogger.log('warn', 'ArticleLoader', `Import failed for ${slug}`, importError);
      
      try {
        // Fallback: Try dynamic import (might work in some cases)
        const module = await import(`../data/articles/${slug}.md?raw`);
        content = module.default;
        debugLogger.log('info', 'ArticleLoader', `Successfully loaded ${slug} via dynamic import fallback`);
      } catch (dynamicError) {
        debugLogger.log('error', 'ArticleLoader', `Dynamic import also failed for ${slug}`, dynamicError);
        throw new Error(`Could not load article content for: ${slug}`);
      }
    }

    if (!content || content.trim().length === 0) {
      throw new Error(`Article content is empty for: ${slug}`);
    }

    // Calculate reading time
    const { calculateReadingTime } = await import('./readingTime');
    const readingTime = calculateReadingTime(content);

    const articleContent: ArticleContent = {
      content,
      readingTime
    };

    // Cache the result
    articleCache.set(slug, articleContent);
    debugLogger.log('info', 'ArticleLoader', `Article ${slug} cached successfully`);

    return articleContent;
  } catch (error) {
    debugLogger.log('error', 'ArticleLoader', `Failed to load article content for slug: ${slug}`, error);
    
    // Return a fallback content instead of throwing
    const fallbackContent = `
# Article Not Available

We're sorry, but this article is currently not available. This might be due to:

- The article is still being written
- There was an issue loading the content
- The article file is missing

Please try again later or contact support if the issue persists.

**Article ID:** ${slug}
    `;

    const { calculateReadingTime } = await import('./readingTime');
    const readingTime = calculateReadingTime(fallbackContent);

    return {
      content: fallbackContent,
      readingTime
    };
  }
}

/**
 * Preload article content for better performance
 */
export function preloadArticleContent(slug: string): void {
  // Preload without waiting for the result
  loadArticleContent(slug).catch(error => {
    console.warn(`Failed to preload article: ${slug}`, error);
  });
}

/**
 * Clear article cache (useful for development)
 */
export function clearArticleCache(): void {
  articleCache.clear();
  console.log('Article cache cleared');
}

/**
 * Get cache size for debugging
 */
export function getArticleCacheSize(): number {
  return articleCache.size;
}

/**
 * Check if article exists in cache
 */
export function isArticleCached(slug: string): boolean {
  return articleCache.has(slug);
}

/**
 * Get all cached article slugs
 */
export function getCachedArticleSlugs(): string[] {
  return Array.from(articleCache.keys());
}