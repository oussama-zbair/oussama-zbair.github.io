// src/lib/canonical.ts — Canonical URL Resolver

/**
 * Resolves the canonical URL for a given page path.
 * - Strips query params and fragments from path
 * - Root "/" gets trailing slash
 * - Non-root paths get no trailing slash
 * - No double slashes between domain and path
 */
export function resolveCanonicalUrl(domain: string, path: string): string {
  // Strip trailing slash from domain
  const cleanDomain = domain.replace(/\/+$/, '');

  // Strip query params and fragments
  let cleanPath = path.split('?')[0].split('#')[0];

  // Ensure path starts with /
  if (!cleanPath.startsWith('/')) {
    cleanPath = `/${cleanPath}`;
  }

  // Root path: domain + trailing slash
  if (cleanPath === '/') {
    return `${cleanDomain}/`;
  }

  // Non-root: strip trailing slash from path
  cleanPath = cleanPath.replace(/\/+$/, '');

  return `${cleanDomain}${cleanPath}`;
}
