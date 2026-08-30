// src/lib/visitorStore.ts — Shared visitor location store.
//
// The browser talks ONLY to our own same-origin serverless endpoint (/api/visitors).
// The JSONBin key lives server-side in the Vercel function and is never exposed here.

export interface VisitorEntry {
  country: string;
  countryCode: string;
  city: string;
  lat: number;
  lon: number;
  timestamp: number;
}

const ENDPOINT = '/api/visitors';

/**
 * Reads the shared visitor list from our serverless endpoint.
 * Returns an empty array on any failure.
 */
export async function fetchVisitors(): Promise<VisitorEntry[]> {
  try {
    const res = await fetch(ENDPOINT, { cache: 'no-store' });
    if (!res.ok) return [];
    const list = await res.json();
    return Array.isArray(list) ? (list as VisitorEntry[]) : [];
  } catch {
    return [];
  }
}

/**
 * Sends the current visitor to the serverless endpoint, which appends it to the
 * shared list (deduped by country) and returns the updated list.
 * On failure, returns an optimistic local merge so the UI still updates.
 */
export async function pushVisitor(
  entry: VisitorEntry,
  existing: VisitorEntry[]
): Promise<VisitorEntry[]> {
  try {
    const res = await fetch(ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(entry),
    });
    if (res.ok) {
      const list = await res.json();
      if (Array.isArray(list)) return list as VisitorEntry[];
    }
  } catch {
    // fall through to optimistic merge
  }

  // Optimistic fallback: merge locally (deduped by country)
  const deduped = existing.filter((e) => e.countryCode !== entry.countryCode);
  return [entry, ...deduped].slice(0, 100);
}
