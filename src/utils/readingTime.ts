/**
 * Calculate reading time for article content
 * Based on average reading speed of 200-250 words per minute
 */

interface ReadingTimeResult {
  minutes: number;
  words: number;
  text: string;
}

export function calculateReadingTime(content: string, wordsPerMinute: number = 225): ReadingTimeResult {
  // Remove markdown syntax and HTML tags for accurate word count
  const cleanContent = content
    .replace(/```[\s\S]*?```/g, '') // Remove code blocks
    .replace(/`[^`]*`/g, '') // Remove inline code
    .replace(/#{1,6}\s/g, '') // Remove markdown headers
    .replace(/\*\*([^*]+)\*\*/g, '$1') // Remove bold markdown
    .replace(/\*([^*]+)\*/g, '$1') // Remove italic markdown
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1') // Remove links, keep text
    .replace(/<[^>]*>/g, '') // Remove HTML tags
    .replace(/\n+/g, ' ') // Replace newlines with spaces
    .trim();

  // Count words (split by whitespace and filter empty strings)
  const words = cleanContent.split(/\s+/).filter(word => word.length > 0);
  const wordCount = words.length;

  // Calculate reading time in minutes
  const minutes = Math.ceil(wordCount / wordsPerMinute);

  // Generate human-readable text
  const text = minutes === 1 ? '1 min read' : `${minutes} min read`;

  return {
    minutes,
    words: wordCount,
    text
  };
}

/**
 * Format reading time for display
 */
export function formatReadingTime(minutes: number): string {
  if (minutes < 1) {
    return 'Less than 1 min read';
  }
  
  if (minutes === 1) {
    return '1 min read';
  }
  
  return `${minutes} min read`;
}

/**
 * Estimate reading time from word count
 */
export function estimateReadingTimeFromWords(wordCount: number, wordsPerMinute: number = 225): ReadingTimeResult {
  const minutes = Math.ceil(wordCount / wordsPerMinute);
  const text = formatReadingTime(minutes);
  
  return {
    minutes,
    words: wordCount,
    text
  };
}