/**
 * Knowledge Base content loader
 * Loads .md files by slug via Vite ?raw imports, with in-memory cache.
 */

import { calculateReadingTime } from './readingTime';
import { extractTOC } from './markdownRenderer';

export interface KBContent {
  /** Raw markdown source */
  raw: string;
  readingTime: { minutes: number; words: number; text: string };
  tableOfContents: Array<{ id: string; title: string; level: number }>;
}

// ── Cache ─────────────────────────────────────────────────────────────────────
const cache = new Map<string, KBContent>();

// ── Explicit module registry (Vite needs static strings for ?raw) ─────────────
const kbModules: Record<string, () => Promise<{ default: string }>> = {
  'java-core':                  () => import('../data/kb/java-core.md?raw'),
  'java-ee':                    () => import('../data/kb/java-ee.md?raw'),
  'spring-boot':                () => import('../data/kb/spring-boot.md?raw'),
  'react':                      () => import('../data/kb/react.md?raw'),
  'aws-cloud-practitioner':     () => import('../data/kb/aws-cloud-practitioner.md?raw'),
  'oracle-cloud-oci':           () => import('../data/kb/oracle-cloud-oci.md?raw'),
  'oracle-cloud-genai':         () => import('../data/kb/oracle-cloud-genai.md?raw'),
  'docker':                     () => import('../data/kb/docker.md?raw'),
  'kubernetes':                 () => import('../data/kb/kubernetes.md?raw'),
  'github-foundations':         () => import('../data/kb/github-foundations.md?raw'),
  'google-ai-professional':     () => import('../data/kb/google-ai-professional.md?raw'),
  'ai-for-everyone':            () => import('../data/kb/ai-for-everyone.md?raw'),
  'cybersecurity-fundamentals': () => import('../data/kb/cybersecurity-fundamentals.md?raw'),
  'software-engineering':       () => import('../data/kb/software-engineering.md?raw'),
  'system-design':              () => import('../data/kb/system-design.md?raw'),
  'scrum':                      () => import('../data/kb/scrum.md?raw'),
};

/** Load a KB entry by slug — returns raw markdown + metadata */
export async function loadKBContent(slug: string): Promise<KBContent> {
  if (cache.has(slug)) return cache.get(slug)!;

  const loader = kbModules[slug];
  if (!loader) return buildFallback(slug, `No content registered for "${slug}".`);

  try {
    const mod = await loader();
    const raw = mod.default;
    if (!raw?.trim()) return buildFallback(slug, 'Content file is empty.');

    const result: KBContent = {
      raw,
      readingTime: calculateReadingTime(raw),
      tableOfContents: extractTOC(raw),
    };
    cache.set(slug, result);
    return result;
  } catch (err) {
    console.warn(`[kbLoader] Failed to load "${slug}":`, err);
    return buildFallback(slug, 'Content could not be loaded.');
  }
}

/** Preload without blocking */
export function preloadKBContent(slug: string): void {
  loadKBContent(slug).catch(() => {/* silent */});
}

// ── Helpers ───────────────────────────────────────────────────────────────────
function buildFallback(slug: string, reason: string): KBContent {
  const raw = `# Content Not Available\n\n${reason}\n\n**Slug:** \`${slug}\`\n\nThis page is being written. Check back soon.`;
  return {
    raw,
    readingTime: calculateReadingTime(raw),
    tableOfContents: [],
  };
}
