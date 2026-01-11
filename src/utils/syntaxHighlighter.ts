/**
 * Advanced syntax highlighter for code blocks
 * Supports multiple languages with proper tokenization
 */

interface Token {
  type: string;
  value: string;
}

interface LanguageDefinition {
  keywords: string[];
  operators: string[];
  strings: RegExp[];
  comments: RegExp[];
  numbers: RegExp;
  functions: RegExp;
  classes: RegExp;
}

const languages: Record<string, LanguageDefinition> = {
  javascript: {
    keywords: [
      'const', 'let', 'var', 'function', 'return', 'if', 'else', 'for', 'while', 'do',
      'switch', 'case', 'default', 'break', 'continue', 'try', 'catch', 'finally',
      'throw', 'new', 'this', 'super', 'class', 'extends', 'import', 'export',
      'from', 'as', 'default', 'async', 'await', 'yield', 'typeof', 'instanceof',
      'in', 'of', 'delete', 'void', 'null', 'undefined', 'true', 'false'
    ],
    operators: ['=', '==', '===', '!=', '!==', '<', '>', '<=', '>=', '+', '-', '*', '/', '%', '&&', '||', '!', '?', ':', '=>'],
    strings: [/"([^"\\]|\\.)*"/g, /'([^'\\]|\\.)*'/g, /`([^`\\]|\\.)*`/g],
    comments: [/\/\/.*$/gm, /\/\*[\s\S]*?\*\//g],
    numbers: /\b\d+\.?\d*\b/g,
    functions: /\b([a-zA-Z_$][a-zA-Z0-9_$]*)\s*(?=\()/g,
    classes: /\bclass\s+([a-zA-Z_$][a-zA-Z0-9_$]*)/g
  },
  
  typescript: {
    keywords: [
      'const', 'let', 'var', 'function', 'return', 'if', 'else', 'for', 'while', 'do',
      'switch', 'case', 'default', 'break', 'continue', 'try', 'catch', 'finally',
      'throw', 'new', 'this', 'super', 'class', 'extends', 'import', 'export',
      'from', 'as', 'default', 'async', 'await', 'yield', 'typeof', 'instanceof',
      'in', 'of', 'delete', 'void', 'null', 'undefined', 'true', 'false',
      'interface', 'type', 'enum', 'namespace', 'module', 'declare', 'public',
      'private', 'protected', 'readonly', 'static', 'abstract', 'implements'
    ],
    operators: ['=', '==', '===', '!=', '!==', '<', '>', '<=', '>=', '+', '-', '*', '/', '%', '&&', '||', '!', '?', ':', '=>'],
    strings: [/"([^"\\]|\\.)*"/g, /'([^'\\]|\\.)*'/g, /`([^`\\]|\\.)*`/g],
    comments: [/\/\/.*$/gm, /\/\*[\s\S]*?\*\//g],
    numbers: /\b\d+\.?\d*\b/g,
    functions: /\b([a-zA-Z_$][a-zA-Z0-9_$]*)\s*(?=\()/g,
    classes: /\bclass\s+([a-zA-Z_$][a-zA-Z0-9_$]*)/g
  },

  java: {
    keywords: [
      'abstract', 'assert', 'boolean', 'break', 'byte', 'case', 'catch', 'char',
      'class', 'const', 'continue', 'default', 'do', 'double', 'else', 'enum',
      'extends', 'final', 'finally', 'float', 'for', 'goto', 'if', 'implements',
      'import', 'instanceof', 'int', 'interface', 'long', 'native', 'new', 'package',
      'private', 'protected', 'public', 'return', 'short', 'static', 'strictfp',
      'super', 'switch', 'synchronized', 'this', 'throw', 'throws', 'transient',
      'try', 'void', 'volatile', 'while', 'true', 'false', 'null'
    ],
    operators: ['=', '==', '!=', '<', '>', '<=', '>=', '+', '-', '*', '/', '%', '&&', '||', '!', '?', ':'],
    strings: [/"([^"\\]|\\.)*"/g, /'([^'\\]|\\.)*'/g],
    comments: [/\/\/.*$/gm, /\/\*[\s\S]*?\*\//g],
    numbers: /\b\d+\.?\d*[fFdDlL]?\b/g,
    functions: /\b([a-zA-Z_$][a-zA-Z0-9_$]*)\s*(?=\()/g,
    classes: /\b(class|interface|enum)\s+([a-zA-Z_$][a-zA-Z0-9_$]*)/g
  },

  python: {
    keywords: [
      'and', 'as', 'assert', 'break', 'class', 'continue', 'def', 'del', 'elif',
      'else', 'except', 'exec', 'finally', 'for', 'from', 'global', 'if', 'import',
      'in', 'is', 'lambda', 'not', 'or', 'pass', 'print', 'raise', 'return',
      'try', 'while', 'with', 'yield', 'True', 'False', 'None', 'async', 'await'
    ],
    operators: ['=', '==', '!=', '<', '>', '<=', '>=', '+', '-', '*', '/', '//', '%', '**', '&', '|', '^', '~', '<<', '>>', 'and', 'or', 'not'],
    strings: [/"([^"\\]|\\.)*"/g, /'([^'\\]|\\.)*'/g, /"""[\s\S]*?"""/g, /'''[\s\S]*?'''/g],
    comments: [/#.*$/gm],
    numbers: /\b\d+\.?\d*\b/g,
    functions: /\bdef\s+([a-zA-Z_][a-zA-Z0-9_]*)\s*(?=\()/g,
    classes: /\bclass\s+([a-zA-Z_][a-zA-Z0-9_]*)/g
  },

  sql: {
    keywords: [
      'SELECT', 'FROM', 'WHERE', 'INSERT', 'UPDATE', 'DELETE', 'CREATE', 'DROP',
      'ALTER', 'TABLE', 'INDEX', 'VIEW', 'DATABASE', 'SCHEMA', 'GRANT', 'REVOKE',
      'COMMIT', 'ROLLBACK', 'TRANSACTION', 'BEGIN', 'END', 'IF', 'ELSE', 'WHILE',
      'FOR', 'LOOP', 'BREAK', 'CONTINUE', 'RETURN', 'FUNCTION', 'PROCEDURE',
      'TRIGGER', 'CURSOR', 'DECLARE', 'SET', 'EXEC', 'EXECUTE', 'AS', 'ON',
      'INNER', 'LEFT', 'RIGHT', 'FULL', 'OUTER', 'JOIN', 'UNION', 'ALL',
      'DISTINCT', 'ORDER', 'BY', 'GROUP', 'HAVING', 'LIMIT', 'OFFSET',
      'AND', 'OR', 'NOT', 'IN', 'EXISTS', 'BETWEEN', 'LIKE', 'IS', 'NULL'
    ],
    operators: ['=', '!=', '<>', '<', '>', '<=', '>=', '+', '-', '*', '/', '%'],
    strings: [/'([^'\\]|\\.)*'/g, /"([^"\\]|\\.)*"/g],
    comments: [/--.*$/gm, /\/\*[\s\S]*?\*\//g],
    numbers: /\b\d+\.?\d*\b/g,
    functions: /\b([a-zA-Z_][a-zA-Z0-9_]*)\s*(?=\()/g,
    classes: /\b(TABLE|VIEW|INDEX|PROCEDURE|FUNCTION)\s+([a-zA-Z_][a-zA-Z0-9_]*)/gi
  },

  yaml: {
    keywords: ['true', 'false', 'null', 'yes', 'no', 'on', 'off'],
    operators: [':', '-', '|', '>', '&', '*', '<<', '!'],
    strings: [/"([^"\\]|\\.)*"/g, /'([^'\\]|\\.)*'/g],
    comments: [/#.*$/gm],
    numbers: /\b\d+\.?\d*\b/g,
    functions: /^(\s*)([a-zA-Z_][a-zA-Z0-9_-]*)\s*:/gm,
    classes: /^([a-zA-Z_][a-zA-Z0-9_-]*)\s*:/gm
  },

  json: {
    keywords: ['true', 'false', 'null'],
    operators: [':', ',', '{', '}', '[', ']'],
    strings: [/"([^"\\]|\\.)*"/g],
    comments: [],
    numbers: /\b-?\d+\.?\d*([eE][+-]?\d+)?\b/g,
    functions: /^(\s*)"([^"]+)"\s*:/gm,
    classes: /^(\s*)"([^"]+)"\s*:/gm
  },

  css: {
    keywords: [
      'important', 'inherit', 'initial', 'unset', 'auto', 'none', 'normal',
      'bold', 'italic', 'underline', 'solid', 'dashed', 'dotted', 'double',
      'block', 'inline', 'flex', 'grid', 'absolute', 'relative', 'fixed',
      'static', 'sticky', 'hidden', 'visible', 'transparent'
    ],
    operators: [':', ';', '{', '}', '(', ')', ',', '>', '+', '~', '*'],
    strings: [/"([^"\\]|\\.)*"/g, /'([^'\\]|\\.)*'/g],
    comments: [/\/\*[\s\S]*?\*\//g],
    numbers: /\b\d+\.?\d*(px|em|rem|%|vh|vw|pt|pc|in|cm|mm|ex|ch|vmin|vmax|deg|rad|turn|s|ms|Hz|kHz|dpi|dpcm|dppx)?\b/g,
    functions: /([a-zA-Z-]+)\s*(?=\()/g,
    classes: /\.([a-zA-Z_-][a-zA-Z0-9_-]*)/g
  }
};

/**
 * Tokenize code based on language rules
 */
function tokenize(code: string, language: string): Token[] {
  const lang = languages[language.toLowerCase()] || languages.javascript;
  const tokens: Token[] = [];
  let remaining = code;
  let position = 0;

  while (position < code.length) {
    let matched = false;

    // Check for comments first (highest priority)
    for (const commentRegex of lang.comments) {
      commentRegex.lastIndex = position;
      const match = commentRegex.exec(code);
      if (match && match.index === position) {
        tokens.push({ type: 'comment', value: match[0] });
        position += match[0].length;
        matched = true;
        break;
      }
    }

    if (matched) continue;

    // Check for strings
    for (const stringRegex of lang.strings) {
      stringRegex.lastIndex = position;
      const match = stringRegex.exec(code);
      if (match && match.index === position) {
        tokens.push({ type: 'string', value: match[0] });
        position += match[0].length;
        matched = true;
        break;
      }
    }

    if (matched) continue;

    // Check for numbers
    lang.numbers.lastIndex = position;
    const numberMatch = lang.numbers.exec(code);
    if (numberMatch && numberMatch.index === position) {
      tokens.push({ type: 'number', value: numberMatch[0] });
      position += numberMatch[0].length;
      continue;
    }

    // Check for keywords
    const wordMatch = /^[a-zA-Z_$][a-zA-Z0-9_$]*/.exec(code.slice(position));
    if (wordMatch) {
      const word = wordMatch[0];
      if (lang.keywords.includes(word)) {
        tokens.push({ type: 'keyword', value: word });
        position += word.length;
        continue;
      }
    }

    // Check for operators
    let operatorMatched = false;
    for (const operator of lang.operators.sort((a, b) => b.length - a.length)) {
      if (code.slice(position, position + operator.length) === operator) {
        tokens.push({ type: 'operator', value: operator });
        position += operator.length;
        operatorMatched = true;
        break;
      }
    }

    if (operatorMatched) continue;

    // Check for functions
    lang.functions.lastIndex = position;
    const functionMatch = lang.functions.exec(code);
    if (functionMatch && functionMatch.index === position) {
      tokens.push({ type: 'function', value: functionMatch[1] });
      position += functionMatch[1].length;
      continue;
    }

    // Default: add character as text
    tokens.push({ type: 'text', value: code[position] });
    position++;
  }

  return tokens;
}

/**
 * Highlight code with syntax coloring
 */
export function highlightCode(code: string, language: string): string {
  if (!language || !languages[language.toLowerCase()]) {
    return escapeHtml(code);
  }

  const tokens = tokenize(code, language);
  
  return tokens.map(token => {
    const escapedValue = escapeHtml(token.value);
    
    switch (token.type) {
      case 'keyword':
        return `<span class="token keyword">${escapedValue}</span>`;
      case 'string':
        return `<span class="token string">${escapedValue}</span>`;
      case 'comment':
        return `<span class="token comment">${escapedValue}</span>`;
      case 'number':
        return `<span class="token number">${escapedValue}</span>`;
      case 'operator':
        return `<span class="token operator">${escapedValue}</span>`;
      case 'function':
        return `<span class="token function">${escapedValue}</span>`;
      default:
        return escapedValue;
    }
  }).join('');
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
 * Get language display name
 */
export function getLanguageDisplayName(language: string): string {
  const displayNames: Record<string, string> = {
    javascript: 'JavaScript',
    typescript: 'TypeScript',
    java: 'Java',
    python: 'Python',
    sql: 'SQL',
    yaml: 'YAML',
    json: 'JSON',
    css: 'CSS',
    html: 'HTML',
    bash: 'Bash',
    shell: 'Shell',
    dockerfile: 'Dockerfile',
    xml: 'XML'
  };

  return displayNames[language.toLowerCase()] || language.toUpperCase();
}

/**
 * Detect language from code content (basic heuristics)
 */
export function detectLanguage(code: string): string {
  // Simple heuristics for language detection
  if (code.includes('function') && code.includes('const')) return 'javascript';
  if (code.includes('interface') && code.includes('type')) return 'typescript';
  if (code.includes('public class') && code.includes('void')) return 'java';
  if (code.includes('def ') && code.includes('import')) return 'python';
  if (code.includes('SELECT') && code.includes('FROM')) return 'sql';
  if (code.includes('apiVersion:') && code.includes('kind:')) return 'yaml';
  if (code.startsWith('{') && code.includes('"')) return 'json';
  if (code.includes('FROM ') && code.includes('RUN ')) return 'dockerfile';
  
  return 'text';
}