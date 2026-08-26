// src/lib/jsonld.ts — Schema.org JSON-LD Generator

import type { SeoConfig, SameAsEntry, KnownLanguage } from '@/config/seo';

export interface JsonLdGraph {
  '@context': 'https://schema.org';
  '@graph': Record<string, unknown>[];
}

/**
 * Generates the complete JSON-LD structured data for the Entity Home.
 * Returns null if required config fields are missing.
 */
export function generateJsonLd(
  config: SeoConfig,
  sameAs: SameAsEntry[],
  languages: KnownLanguage[],
  topics: string[]
): JsonLdGraph | null {
  if (!config.name || !config.canonicalDomain || sameAs.length === 0) {
    return null;
  }

  const domain = config.canonicalDomain;

  const personEntity: Record<string, unknown> = {
    '@type': 'Person',
    '@id': `${domain}/#person`,
    'name': config.name,
    'alternateName': config.alternateNames,
    'jobTitle': config.jobTitle,
    'nationality': {
      '@type': 'Country',
      'name': config.country,
    },
    'url': domain,
    'image': `${domain}${config.ogImagePath}`,
    'sameAs': sameAs.map(entry => entry.url),
    'knowsAbout': topics,
    'knowsLanguage': languages.map(lang => lang.bcp47),
  };

  const webSiteEntity: Record<string, unknown> = {
    '@type': 'WebSite',
    '@id': `${domain}/#website`,
    'url': domain,
    'name': config.siteName,
    'publisher': {
      '@id': `${domain}/#person`,
    },
  };

  return {
    '@context': 'https://schema.org',
    '@graph': [personEntity, webSiteEntity],
  };
}
