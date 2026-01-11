/**
 * Markdown parser and renderer for article content
 * Enhanced with proper syntax highlighting
 */

import { highlightCode, getLanguageDisplayName } from './syntaxHighlighter';

export interface MarkdownNode {
  type: string;
  content: string;
  level?: number;
  language?: string;
  children?: MarkdownNode[];
}

/**
 * Parse markdown content into structured nodes
 */
export function parseMarkdown(content: string): MarkdownNode[] {
  const lines = content.split('\n');
  const nodes: MarkdownNode[] = [];
  let currentCodeBlock: string[] = [];
  let inCodeBlock = false;
  let codeLanguage = '';

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Handle code blocks
    if (line.startsWith('```')) {
      if (inCodeBlock) {
        // End of code block
        nodes.push({
          type: 'code',
          content: currentCodeBlock.join('\n'),
          language: codeLanguage
        });
        currentCodeBlock = [];
        inCodeBlock = false;
        codeLanguage = '';
      } else {
        // Start of code block
        inCodeBlock = true;
        codeLanguage = line.slice(3).trim();
      }
      continue;
    }

    if (inCodeBlock) {
      currentCodeBlock.push(line);
      continue;
    }

    // Handle headers
    if (line.startsWith('#')) {
      const level = line.match(/^#+/)?.[0].length || 1;
      const content = line.replace(/^#+\s*/, '');
      nodes.push({
        type: 'heading',
        content,
        level
      });
      continue;
    }

    // Handle empty lines
    if (line.trim() === '') {
      continue;
    }

    // Handle paragraphs
    let paragraph = line;
    
    // Look ahead for continuation lines
    while (i + 1 < lines.length && 
           lines[i + 1].trim() !== '' && 
           !lines[i + 1].startsWith('#') && 
           !lines[i + 1].startsWith('```')) {
      i++;
      paragraph += ' ' + lines[i];
    }

    if (paragraph.trim()) {
      nodes.push({
        type: 'paragraph',
        content: paragraph.trim()
      });
    }
  }

  return nodes;
}

/**
 * Render markdown nodes to HTML with enhanced styling
 */
export function renderMarkdownToHTML(nodes: MarkdownNode[]): string {
  return nodes.map(node => renderNode(node)).join('\n');
}

function renderNode(node: MarkdownNode): string {
  switch (node.type) {
    case 'heading':
      const tag = `h${Math.min(node.level || 1, 6)}`;
      const id = generateHeadingId(node.content);
      return `<${tag} id="${id}">${processInlineMarkdown(node.content)}</${tag}>`;
    
    case 'paragraph':
      return `<p>${processInlineMarkdown(node.content)}</p>`;
    
    case 'code':
      const language = node.language || 'text';
      const languageDisplay = getLanguageDisplayName(language);
      const highlightedCode = highlightCode(node.content, language);
      
      return `
        <div class="code-block-wrapper">
          <div class="code-block-header">
            <span class="code-language">${languageDisplay}</span>
            <button class="copy-button" onclick="copyToClipboard(this)" data-code="${escapeHtml(node.content)}">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                <path d="m5 15-4-4 4-4"></path>
              </svg>
              Copy
            </button>
          </div>
          <pre><code class="language-${language}">${highlightedCode}</code></pre>
        </div>
      `;
    
    default:
      return `<p>${processInlineMarkdown(node.content)}</p>`;
  }
}

/**
 * Process inline markdown (bold, italic, code, links)
 */
function processInlineMarkdown(text: string): string {
  return text
    // Bold text
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    // Italic text
    .replace(/\*([^*]+)\*/g, '<em>$1</em>')
    // Inline code
    .replace(/`([^`]+)`/g, '<code class="inline-code">$1</code>')
    // Links
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>');
}

/**
 * Generate heading ID for anchor links
 */
function generateHeadingId(content: string): string {
  return content
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .trim();
}

/**
 * Escape HTML characters
 */
function escapeHtml(text: string): string {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

/**
 * Extract plain text from markdown (for excerpts, search, etc.)
 */
export function extractPlainText(content: string): string {
  return content
    .replace(/```[\s\S]*?```/g, '') // Remove code blocks
    .replace(/`[^`]*`/g, '') // Remove inline code
    .replace(/#{1,6}\s/g, '') // Remove headers
    .replace(/\*\*([^*]+)\*\*/g, '$1') // Remove bold
    .replace(/\*([^*]+)\*/g, '$1') // Remove italic
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1') // Remove links, keep text
    .replace(/\n+/g, ' ') // Replace newlines with spaces
    .trim();
}

/**
 * Generate table of contents from markdown content
 */
export function generateTableOfContents(content: string): Array<{id: string, title: string, level: number}> {
  const nodes = parseMarkdown(content);
  const toc: Array<{id: string, title: string, level: number}> = [];

  nodes.forEach(node => {
    if (node.type === 'heading' && node.level && node.level <= 3) {
      const id = generateHeadingId(node.content);
      
      toc.push({
        id,
        title: node.content,
        level: node.level
      });
    }
  });

  return toc;
}