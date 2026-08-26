// src/lib/platform.ts — Platform Identification Utility

import { Github, Linkedin, Twitter, Instagram } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export interface PlatformInfo {
  name: string;
  icon: LucideIcon | null;
}

const PLATFORM_MAP: Record<string, PlatformInfo> = {
  'github.com': { name: 'GitHub', icon: Github },
  'linkedin.com': { name: 'LinkedIn', icon: Linkedin },
  'www.linkedin.com': { name: 'LinkedIn', icon: Linkedin },
  'x.com': { name: 'X', icon: Twitter },
  'twitter.com': { name: 'X', icon: Twitter },
  'instagram.com': { name: 'Instagram', icon: Instagram },
  'www.instagram.com': { name: 'Instagram', icon: Instagram },
  'dev.to': { name: 'Dev.to', icon: null },
  'medium.com': { name: 'Medium', icon: null },
  'www.wikidata.org': { name: 'Wikidata', icon: null },
  'wikidata.org': { name: 'Wikidata', icon: null },
  'www.hackerrank.com': { name: 'HackerRank', icon: null },
  'hackerrank.com': { name: 'HackerRank', icon: null },
  'www.kaggle.com': { name: 'Kaggle', icon: null },
  'kaggle.com': { name: 'Kaggle', icon: null },
  'discord.com': { name: 'Discord', icon: null },
};

/**
 * Identifies the platform from a URL string.
 * Returns the platform name and optional lucide icon.
 * Falls back to the URL hostname if platform is unrecognized.
 */
export function identifyPlatform(url: string): PlatformInfo {
  try {
    const hostname = new URL(url).hostname;
    const match = PLATFORM_MAP[hostname];
    if (match) return match;
    return { name: hostname, icon: null };
  } catch {
    return { name: url, icon: null };
  }
}
