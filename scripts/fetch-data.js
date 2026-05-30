#!/usr/bin/env node

// ============================================================================
// AI Broadcast Digest Consumer — Fetch Data
// ============================================================================
// Reads pre-fetched data from local data/ directory (populated via git pull).
// Falls back to the repo's raw GitHub URL if local file is missing.
//
// Usage:
//   node fetch-data.js --output=./feed.json
//   node fetch-data.js --output=./feed.json --date=2026-05-29
// ============================================================================

import { readFile, writeFile, mkdir } from 'fs/promises';
import { existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const REPO_DIR = join(__dirname, '..');
const DATA_DIR = join(REPO_DIR, 'data');
const REPO_RAW = 'https://raw.githubusercontent.com/Leon-LiZZZ/ai-broadcast-digest-consumer/main';

// -- CLI args ----------------------------------------------------------------

function getArg(name) {
  const arg = process.argv.find(a => a.startsWith(`--${name}=`));
  return arg ? arg.split('=').slice(1).join('=') : null;
}

const today = new Date();
const dateStr = getArg('date') || `${today.getFullYear()}-${String(today.getMonth()+1).padStart(2,'0')}-${String(today.getDate()).padStart(2,'0')}`;
const outputPath = getArg('output');

// -- Main --------------------------------------------------------------------

async function main() {
  let raw = null;

  // 1. Try local data/ directory (git pull keeps it fresh)
  const localPath = join(DATA_DIR, `${dateStr}.json`);
  if (existsSync(localPath)) {
    raw = await readFile(localPath, 'utf-8');
    console.error(`[Consumer] Loaded local data: ${localPath}`);
  } else {
    // 2. Fallback: fetch from repo raw URL
    const remoteUrl = `${REPO_RAW}/data/${dateStr}.json`;
    console.error(`[Consumer] Local data not found, trying remote: ${remoteUrl}`);
    try {
      const res = await fetch(remoteUrl, { signal: AbortSignal.timeout(30000) });
      if (res.ok) {
        raw = await res.text();
        console.error(`[Consumer] Fetched from remote successfully`);
      }
    } catch { /* handled below */ }
  }

  if (!raw) {
    console.error(`[Consumer] No data available for ${dateStr}. Run 'git pull' to get latest data.`);
    process.exit(1);
  }

  // 3. Validate JSON
  let data;
  try {
    data = JSON.parse(raw);
  } catch {
    console.error(`[Consumer] Invalid JSON data for ${dateStr}`);
    process.exit(1);
  }

  const blogCount = data.stats?.blogPosts ?? data.blogs?.length ?? 0;
  const tweetCount = data.stats?.xTweets ?? data.x?.length ?? 0;
  console.error(`[Consumer] Data loaded: ${blogCount} blogs, ${tweetCount} tweets`);

  // 4. Output
  const json = JSON.stringify(data, null, 2);
  if (outputPath) {
    const dir = dirname(outputPath);
    if (!existsSync(dir)) await mkdir(dir, { recursive: true });
    await writeFile(outputPath, json, 'utf-8');
    console.error(`[Consumer] Written to ${outputPath}`);
  } else {
    process.stdout.write(json);
    process.stdout.write('\n');
  }
}

main().catch(err => {
  console.error(`[Consumer] Error: ${err.message}`);
  process.exit(1);
});
