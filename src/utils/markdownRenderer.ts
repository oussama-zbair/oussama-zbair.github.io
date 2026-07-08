/**
 * Markdown renderer using `marked` + `highlight.js`
 * Uses highlight.js core + specific languages to keep bundle small.
 */

import { marked, Renderer } from 'marked';
import hljs from 'highlight.js/lib/core';

// Register only the languages used in KB / articles
import java       from 'highlight.js/lib/languages/java';
import javascript from 'highlight.js/lib/languages/javascript';
import typescript from 'highlight.js/lib/languages/typescript';
import python     from 'highlight.js/lib/languages/python';
import bash       from 'highlight.js/lib/languages/bash';
import yaml       from 'highlight.js/lib/languages/yaml';
import json       from 'highlight.js/lib/languages/json';
import xml        from 'highlight.js/lib/languages/xml';
import sql        from 'highlight.js/lib/languages/sql';
import dockerfile from 'highlight.js/lib/languages/dockerfile';
import kotlin     from 'highlight.js/lib/languages/kotlin';
import plaintext  from 'highlight.js/lib/languages/plaintext';

hljs.registerLanguage('java',       java);
hljs.registerLanguage('javascript', javascript);
hljs.registerLanguage('js',         javascript);
hljs.registerLanguage('typescript', typescript);
hljs.registerLanguage('ts',         typescript);
hljs.registerLanguage('python',     python);
hljs.registerLanguage('py',         python);
hljs.registerLanguage('bash',       bash);
hljs.registerLanguage('sh',         bash);
hljs.registerLanguage('shell',      bash);
hljs.registerLanguage('yaml',       yaml);
hljs.registerLanguage('yml',        yaml);
hljs.registerLanguage('json',       json);
hljs.registerLanguage('xml',        xml);
hljs.registerLanguage('html',       xml);
hljs.registerLanguage('sql',        sql);
hljs.registerLanguage('dockerfile', dockerfile);
hljs.registerLanguage('docker',     dockerfile);
hljs.registerLanguage('kotlin',     kotlin);
hljs.registerLanguage('plaintext',  plaintext);
hljs.registerLanguage('text',       plaintext);

// ── Configure renderer ────────────────────────────────────────────────────────

const renderer = new Renderer();

// Code blocks — wrap with our header + copy button
renderer.code = ({ text, lang }) => {
  const language = lang && hljs.getLanguage(lang) ? lang : 'plaintext';
  const highlighted = hljs.highlight(text, { language }).value;
  const display = language === 'plaintext' ? 'text' : language;
  const escaped = text
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

  return `
<div class="code-block-wrapper">
  <div class="code-block-header">
    <span class="code-language">${display}</span>
    <button class="copy-button" onclick="copyToClipboard(this)" data-code="${escaped}">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
      </svg>
      Copy
    </button>
  </div>
  <pre><code class="hljs language-${language}">${highlighted}</code></pre>
</div>`;
};

// Inline code
renderer.codespan = ({ text }) =>
  `<code class="inline-code">${text}</code>`;

// Headings — add scroll-margin id
renderer.heading = ({ text, depth }) => {
  const id = text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .trim();
  return `<h${depth} id="${id}">${text}</h${depth}>\n`;
};

// Links — open external in new tab
renderer.link = ({ href, title, text }) => {
  const titleAttr = title ? ` title="${title}"` : '';
  const external = href?.startsWith('http') ? ' target="_blank" rel="noopener noreferrer"' : '';
  return `<a href="${href}"${titleAttr}${external}>${text}</a>`;
};

// Tables — wrap for responsive scroll
renderer.table = ({ header, rows }) => {
  // header and rows come as already-rendered HTML strings in marked v15
  return `<div class="table-wrapper"><table><thead>${header}</thead><tbody>${rows}</tbody></table></div>`;
};

// Configure marked
marked.setOptions({
  renderer,
  gfm: true,        // GitHub Flavored Markdown (tables, strikethrough, task lists)
  breaks: false,
});

// ── Public API ────────────────────────────────────────────────────────────────

/** Render a markdown string to safe HTML */
export function renderMarkdown(source: string): string {
  return marked(source) as string;
}

/** Extract headings for table of contents */
export function extractTOC(
  source: string
): Array<{ id: string; title: string; level: number }> {
  const headingRegex = /^(#{1,3})\s+(.+)$/gm;
  const toc: Array<{ id: string; title: string; level: number }> = [];
  let match: RegExpExecArray | null;

  while ((match = headingRegex.exec(source)) !== null) {
    const level = match[1].length;
    const raw = match[2].trim();
    // Strip inline markdown from title
    const title = raw.replace(/\*\*(.+?)\*\*/g, '$1').replace(/`(.+?)`/g, '$1');
    const id = title
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .trim();
    toc.push({ id, title, level });
  }

  return toc;
}
