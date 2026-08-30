// api/visitors.js — Vercel serverless function proxying the shared visitor store.
// The JSONBin key stays server-side and is NEVER exposed to the browser.
//
// GET  /api/visitors  -> returns the current visitor array
// POST /api/visitors  -> body: a VisitorEntry; appends (deduped by countryCode),
//                        caps to 100, drops entries older than 30 days, returns updated array

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

async function readBin() {
  const res = await fetch(`${BASE}/${BIN_ID}/latest`, {
    headers: { 'X-Access-Key': KEY },
    cache: 'no-store',
  });
  if (!res.ok) throw new Error(`read failed: ${res.status}`);
  const json = await res.json();
  const record = json && json.record;
  return Array.isArray(record) ? record : [];
}

async function writeBin(list) {
  const res = await fetch(`${BASE}/${BIN_ID}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json', 'X-Access-Key': KEY },
    body: JSON.stringify(list),
  });
  if (!res.ok) throw new Error(`write failed: ${res.status}`);
}

export default async function handler(req, res) {
  // Basic CORS for same-origin use
  res.setHeader('Cache-Control', 'no-store');

  if (!BIN_ID || !KEY) {
    return res.status(200).json([]); // not configured — behave gracefully
  }

  try {
    if (req.method === 'GET') {
      const list = pruneAndCap(await readBin());
      return res.status(200).json(list);
    }

    if (req.method === 'POST') {
      const entry = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;

      // Minimal validation
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

      const existing = await readBin();
      const deduped = existing.filter((e) => e.countryCode !== safeEntry.countryCode);
      const updated = pruneAndCap([safeEntry, ...deduped]);
      await writeBin(updated);
      return res.status(200).json(updated);
    }

    res.setHeader('Allow', 'GET, POST');
    return res.status(405).json({ error: 'method not allowed' });
  } catch (err) {
    return res.status(200).json([]); // fail soft — UI shows empty rather than breaking
  }
}
