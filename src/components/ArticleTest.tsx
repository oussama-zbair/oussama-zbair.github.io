import React, { useState } from 'react';
import { loadArticleContent } from '../utils/articleLoader';
import articlesData from '../data/articles.json';

export const ArticleTest: React.FC = () => {
  const [testResults, setTestResults] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  const testArticleLoading = async () => {
    setLoading(true);
    const results: Record<string, string> = {};

    for (const article of articlesData.articles) {
      try {
        console.log(`Testing article: ${article.slug}`);
        const content = await loadArticleContent(article.slug);
        results[article.slug] = `✅ Success (${content.content.length} chars)`;
      } catch (error) {
        results[article.slug] = `❌ Error: ${error instanceof Error ? error.message : 'Unknown error'}`;
      }
    }

    setTestResults(results);
    setLoading(false);
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold mb-8">Article Loading Test</h1>
      
      <button
        onClick={testArticleLoading}
        disabled={loading}
        className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 disabled:opacity-50 mb-8"
      >
        {loading ? 'Testing...' : 'Test Article Loading'}
      </button>

      <div className="space-y-4">
        {Object.entries(testResults).map(([slug, result]) => (
          <div key={slug} className="p-4 border rounded-lg">
            <div className="font-semibold">{slug}</div>
            <div className="text-sm text-gray-600">{result}</div>
          </div>
        ))}
      </div>

      <div className="mt-8 p-4 bg-gray-100 rounded-lg">
        <h3 className="font-semibold mb-2">Available Articles:</h3>
        <ul className="space-y-1">
          {articlesData.articles.map(article => (
            <li key={article.id} className="text-sm">
              <strong>{article.slug}</strong> - {article.title}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};