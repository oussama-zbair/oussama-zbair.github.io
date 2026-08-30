// src/lib/visitorStore.ts — Shared visitor location store + counter.
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

export interface VisitorState {
  visitors: VisitorEntry[];
  total: number;
}

const ENDPOINT = '/api/visitors';
const EMPTY: VisitorState = { visitors: [], total: 0 };

function normalize(data: unknown): VisitorState {
  if (data && typeof data === 'object' && Array.isArray((data as VisitorState).visitors)) {
    const s = data as VisitorState;
    return { visitors: s.visitors, total: typeof s.total === 'number' ? s.total : s.visitors.length };
  }
  return EMPTY;
}

/**
 * Reads the shared visitor state (list + total) without incrementing the counter.
 * Returns empty state on any failure.
 */
export async function fetchVisitorState(): Promise<VisitorState> {
  try {
    const res = await fetch(ENDPOINT, { cache: 'no-store' });
    if (!res.ok) return EMPTY;
    return normalize(await res.json());
  } catch {
    return EMPTY;
  }
}

/**
 * Registers the current visitor: increments the counter and appends the entry
 * (deduped by country server-side). Returns the updated state.
 * On failure, returns an optimistic local merge so the UI still updates.
 */
export async function registerVisitor(
  entry: VisitorEntry,
  current: VisitorState
): Promise<VisitorState> {
  try {
    const res = await fetch(ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(entry),
    });
    if (res.ok) return normalize(await res.json());
  } catch {
    // fall through to optimistic merge
  }

  const deduped = current.visitors.filter((e) => e.countryCode !== entry.countryCode);
  return {
    visitors: [entry, ...deduped].slice(0, 100),
    total: current.total + 1,
  };
}
