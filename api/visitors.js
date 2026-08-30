// api/visitors.js — Vercel serverless function for the shared visitor store + counter.
// The JSONBin key stays server-side and is NEVER exposed to the browser.
//
// The bin stores a single object: { visitors: VisitorEntry[], total: number }
//
// GET  /api/visitors  -> { visitors, total }  (read-only, no increment)
// POST /api/visitors  -> body: a VisitorEntry; increments total, appends the
//                        visitor (deduped by countryCode), caps to 100, drops
//                        entries older than 30 days. Returns { visitors, total }.

const BIN_ID = process.env.JSONBIN_BIN_ID;
const KEY = process.env.JSONBIN_KEY;
const BASE = 'https://api.jsonbin.io/v3/b';

const MAX_STORED = 100;
const DECAY_MS = 30 * 24 * 60 * 60 * 1000;

function pruneAndCap(entries) {
  const now = Date.now();
  return entries
    .filter((e) => e && typeof e.timestamp === 'number' && now - e.timestamp < DECAY_MS)
    .sort((a, b) => b.timestamp - a.timestamp)
    .slice(0, MAX_STORED);
}

// Normalizes whatever is stored in the bin into { visitors, total }.
// Supports the legacy shape where the bin was a bare array of visitors.
function normalize(record) {
  if (Array.isArray(record)) {
    return { visitors: pruneAndCap(record), total: record.length };
  }
  if (record && typeof record === 'object') {
    const visitors = Array.isArray(record.visitors) ? pruneAndCap(record.visitors) : [];
    const total = typeof record.total === 'number' ? record.total : visitors.length;
    return { visitors, total };
  }
  return { visitors: [], total: 0 };
}

async function readBin() {
  const res = await fetch(`${BASE}/${BIN_ID}/latest`, {
    headers: { 'X-Access-Key': KEY },
    cache: 'no-store',
  });
  if (!res.ok) throw new Error(`read failed: ${res.status}`);
  const json = await res.json();
  return normalize(json && json.record);
}

async function writeBin(state) {
  const res = await fetch(`${BASE}/${BIN_ID}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json', 'X-Access-Key': KEY },
    body: JSON.stringify(state),
  });
  if (!res.ok) throw new Error(`write failed: ${res.status}`);
}

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');

  if (!BIN_ID || !KEY) {
    return res.status(200).json({ visitors: [], total: 0 });
  }

  try {
    if (req.method === 'GET') {
      return res.status(200).json(await readBin());
    }

    if (req.method === 'POST') {
      const entry = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;

      if (
        !entry ||
        typeof entry.countryCode !== 'string' ||
        typeof entry.lat !== 'number' ||
        typeof entry.lon !== 'number'
      ) {
        return res.status(400).json({ error: 'invalid entry' });
      }

      const safeEntry = {
        country: String(entry.country || 'Unknown').slice(0, 80),
        countryCode: entry.countryCode.toUpperCase().slice(0, 3),
        city: String(entry.city || '').slice(0, 80),
        lat: entry.lat,
        lon: entry.lon,
        timestamp: Date.now(),
      };

      const state = await readBin();
      const deduped = state.visitors.filter((e) => e.countryCode !== safeEntry.countryCode);
      const visitors = pruneAndCap([safeEntry, ...deduped]);
      const total = state.total + 1;

      await writeBin({ visitors, total });
      return res.status(200).json({ visitors, total });
    }

    res.setHeader('Allow', 'GET, POST');
    return res.status(405).json({ error: 'method not allowed' });
  } catch (err) {
    return res.status(200).json({ visitors: [], total: 0 });
  }
}
