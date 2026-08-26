// src/config/seo.ts — Centralized Entity SEO Configuration

export interface SeoConfig {
  name: string;
  alternateNames: string[];
  jobTitle: string;
  country: string;
  canonicalDomain: string;
  description: string;
  keywords: string[];
  ogImagePath: string;
  twitterHandle: string;
  siteName: string;
}

export interface SameAsEntry {
  url: string;
  platform: string;
}

export interface KnownLanguage {
  name: string;
  bcp47: string;
}

/**
 * Resolves the canonical domain from env variable with validation and fallback.
 */
export function resolveCanonicalDomain(envValue?: string): string {
  const fallback = 'https://oussamazbair.engineer';
  if (!envValue || envValue.trim() === '') return fallback;
  const trimmed = envValue.trim().replace(/\/+$/, '');
  if (!trimmed.startsWith('https://')) return fallback;
  return trimmed;
}

/**
 * Builds an absolute URL from a relative path using the canonical domain.
 */
export function buildAbsoluteUrl(path: string): string {
  const base = seoConfig.canonicalDomain;
  if (path.startsWith('https://') || path.startsWith('http://')) return path;
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `${base}${cleanPath}`;
}

// --- Configuration Data ---

export const seoConfig: SeoConfig = {
  name: 'Oussama Zbair',
  alternateNames: ['Oussama Zbayr', 'Osama Zbair', 'ⵓⵙⴰⵎⴰ ⵣⴱⴰⵢⵔ', 'أسامة ازباير'],
  jobTitle: 'Software Engineer',
  country: 'Morocco',
  canonicalDomain: resolveCanonicalDomain(import.meta.env.VITE_CANONICAL_DOMAIN),
  description: 'Software Engineer specializing in Java, Spring Boot, React, TypeScript, and cloud architecture. Building scalable, performant applications with modern technologies.',
  keywords: [
    'Oussama Zbair', 'Software Engineer', 'Full Stack Developer',
    'Java Developer', 'Spring Boot', 'React', 'TypeScript', 'Morocco', 'Portfolio'
  ],
  ogImagePath: '/og-image.png',
  twitterHandle: '@ousama_zbair',
  siteName: 'Oussama Zbair',
};

export const sameAsUrls: SameAsEntry[] = [
  { url: 'https://www.wikidata.org/wiki/Q141178600', platform: 'Wikidata' },
  { url: 'https://www.linkedin.com/in/oussama-zbair/', platform: 'LinkedIn' },
  { url: 'https://github.com/oussama-zbair', platform: 'GitHub' },
  { url: 'https://x.com/ousama_zbair', platform: 'X' },
  { url: 'https://dev.to/oussama-zbair', platform: 'Dev.to' },
  { url: 'https://medium.com/@oussama-zbair', platform: 'Medium' },
  { url: 'https://www.hackerrank.com/profile/oussama_zbair', platform: 'HackerRank' },
  { url: 'https://www.kaggle.com/oussamazbair', platform: 'Kaggle' },
  { url: 'https://www.instagram.com/ou_ssama_zbair', platform: 'Instagram' },
  { url: 'https://discord.com/users/763812683795136513', platform: 'Discord' },
];

export const knownLanguages: KnownLanguage[] = [
  { name: 'Tamazight', bcp47: 'zgh' },
  { name: 'Arabic', bcp47: 'ar' },
  { name: 'French', bcp47: 'fr' },
  { name: 'English', bcp47: 'en' },
];

export const knowsAbout: string[] = [
  'Software Engineering',
  'Web Development',
  'Backend Architecture',
  'Cloud Computing',
  'REST APIs',
];
