#!/usr/bin/env node

// ============================================================================
// AI Broadcast Digest Consumer — Fetch Pre-generated Report
// ============================================================================
// Tries to fetch pre-generated MD + HTML from the consumer repo.
// Priority: local output/ → remote GitHub raw → exit 1 (triggers local gen)
//
// Usage:
//   node fetch-report.js --date=2026-06-01 --output=D:\AI知识库\00-临时文件
//   node fetch-report.js  (uses today's date, outputs to stdout)
//
// Exit codes:
//   0 — success, MD + HTML written to output dir
//   1 — not available, caller should fall back to local generation
// ============================================================================

import { readFile, writeFile, mkdir, copyFile } from 'fs/promises';
import { existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const REPO_DIR = join(__dirname, '..');
const OUTPUT_DIR = join(REPO_DIR, 'output');
const REPO_RAW = 'https://raw.githubusercontent.com/Leon-LiZZZ/ai-broadcast-digest-consumer/main';

// -- CLI args ----------------------------------------------------------------

function getArg(name) {
  const arg = process.argv.find(a => a.startsWith(`--${name}=`));
  return arg ? arg.split('=').slice(1).join('=') : null;
}

const today = new Date();
const dateStr = getArg('date') || `${today.getFullYear()}-${String(today.getMonth()+1).padStart(2,'0')}-${String(today.getDate()).padStart(2,'0')}`;
const outputDir = getArg('output');

// -- Fetch a single file (local → remote) ------------------------------------

async function fetchFile(filename) {
  // 1. Try local output/ directory
  const localPath = join(OUTPUT_DIR, filename);
  if (existsSync(localPath)) {
    console.error(`[Consumer] ✓ Local: ${filename}`);
    return await readFile(localPath, 'utf-8');
  }

  // 2. Fallback: remote GitHub raw URL
  const remoteUrl = `${REPO_RAW}/output/${filename}`;
  console.error(`[Consumer] → Remote: ${remoteUrl}`);
  try {
    const res = await fetch(remoteUrl, { signal: AbortSignal.timeout(30000) });
    if (res.ok) {
      const content = await res.text();
      console.error(`[Consumer] ✓ Remote: ${filename}`);
      return content;
    }
    if (res.status === 404) {
      console.error(`[Consumer] ✗ Not found: ${filename}`);
    } else {
      console.error(`[Consumer] ✗ HTTP ${res.status}: ${filename}`);
    }
  } catch (err) {
    console.error(`[Consumer] ✗ Network error: ${err.message}`);
  }

  return null;
}

// -- Main --------------------------------------------------------------------

async function main() {
  const mdFile = `ai-broadcast-digest-${dateStr}.md`;
  const htmlFile = `ai-broadcast-digest-${dateStr}.html`;

  console.error(`[Consumer] Fetching report for ${dateStr}...`);

  // Fetch both files
  const mdContent = await fetchFile(mdFile);
  const htmlContent = await fetchFile(htmlFile);

  if (!mdContent || !htmlContent) {
    console.error(`[Consumer] Report not available for ${dateStr}. Fall back to local generation.`);
    process.exit(1);
  }

  // Write to output directory
  if (outputDir) {
    if (!existsSync(outputDir)) await mkdir(outputDir, { recursive: true });

    const mdOut = join(outputDir, mdFile);
    const htmlOut = join(outputDir, htmlFile);

    await writeFile(mdOut, mdContent, 'utf-8');
    await writeFile(htmlOut, htmlContent, 'utf-8');

    console.error(`[Consumer] Written: ${mdOut}`);
    console.error(`[Consumer] Written: ${htmlOut}`);

    // Output summary to stdout (for the caller to display)
    console.log(JSON.stringify({
      status: 'ok',
      source: 'repo',
      date: dateStr,
      markdown: mdOut,
      html: htmlOut,
    }));
  } else {
    // No output dir — just report success
    console.log(JSON.stringify({
      status: 'ok',
      source: 'repo',
      date: dateStr,
      mdLength: mdContent.length,
      htmlLength: htmlContent.length,
    }));
  }
}

main().catch(err => {
  console.error(`[Consumer] Error: ${err.message}`);
  process.exit(1);
});
