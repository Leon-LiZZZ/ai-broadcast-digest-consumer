#!/usr/bin/env node

// ============================================================================
// AI Broadcast Digest — Validate Generated Digest
// ============================================================================
// Validates that all URLs in the generated markdown digest exist in the
// source JSON data. Detects LLM hallucinations (fake URLs).
//
// Usage:
//   node validate-digest.js --markdown=digest.md --data=data.json
//   node validate-digest.js --markdown=digest.md --data=data.json --fix
// ============================================================================

import { readFile, writeFile } from 'fs/promises';

const args = process.argv.slice(2);
function getArg(name) {
  const arg = args.find(a => a.startsWith(`--${name}=`));
  return arg ? arg.split('=').slice(1).join('=') : null;
}

const ARG_MARKDOWN = getArg('markdown');
const ARG_DATA = getArg('data');
const ARG_FIX = args.includes('--fix');

if (!ARG_MARKDOWN || !ARG_DATA) {
  console.error('Usage: node validate-digest.js --markdown=<file> --data=<file> [--fix]');
  process.exit(1);
}

// -- Extract URLs from markdown -----------------------------------------------
function extractUrls(markdown) {
  const urlRegex = /https?:\/\/[^\s\)\]]+/g;
  const urls = [];
  let match;
  while ((match = urlRegex.exec(markdown)) !== null) {
    urls.push({ url: match[0], pos: match.index });
  }
  return urls;
}

// -- Extract tweet IDs from URLs ---------------------------------------------
function extractTweetId(url) {
  const match = url.match(/\/status\/(\d+)/);
  return match ? match[1] : null;
}

// -- Main validation ---------------------------------------------------------
async function validate() {
  const markdown = await readFile(ARG_MARKDOWN, 'utf-8');
  const data = JSON.parse(await readFile(ARG_DATA, 'utf-8'));

  // Build set of valid URLs from JSON
  const validUrls = new Set();
  const validTweetIds = new Set();

  // Add tweet URLs (field is 'x' in the JSON)
  const tweets = data.x || data.tweets || [];
  for (const tweet of tweets) {
    if (tweet.url) {
      validUrls.add(tweet.url);
      const id = extractTweetId(tweet.url);
      if (id) validTweetIds.add(id);
    }
  }

  // Add blog URLs
  if (data.blogs) {
    for (const blog of data.blogs) {
      if (blog.url) validUrls.add(blog.url);
    }
  }

  // Add podcast URLs
  if (data.podcasts) {
    for (const podcast of data.podcasts) {
      if (podcast.url) validUrls.add(podcast.url);
    }
  }

  // Extract URLs from markdown
  const markdownUrls = extractUrls(markdown);

  // Find hallucinated URLs
  const hallucinations = [];
  const validFound = [];
  const unknownUrls = [];

  for (const { url, pos } of markdownUrls) {
    // Skip non-content URLs
    if (url.includes('example.com') || url.includes('placeholder')) continue;

    const tweetId = extractTweetId(url);

    if (validUrls.has(url)) {
      validFound.push({ url, pos });
    } else if (tweetId && validTweetIds.has(tweetId)) {
      // URL might have different format but same tweet ID
      validFound.push({ url, pos, note: 'matched by tweet ID' });
    } else if (tweetId) {
      // Has tweet ID format but ID not in data
      hallucinations.push({ url, pos, tweetId });
    } else {
      // Not a tweet URL and not in valid URLs
      unknownUrls.push({ url, pos });
    }
  }

  // Report results
  console.log('\n=== Validation Results ===\n');
  console.log(`Total URLs in markdown: ${markdownUrls.length}`);
  console.log(`Valid URLs: ${validFound.length}`);
  console.log(`Hallucinated tweet URLs: ${hallucinations.length}`);
  console.log(`Unknown URLs: ${unknownUrls.length}`);

  if (hallucinations.length > 0) {
    console.log('\n--- Hallucinated Tweet URLs ---');
    for (const { url, tweetId } of hallucinations) {
      console.log(`  ❌ ${url}`);
      console.log(`     Tweet ID: ${tweetId} (not found in source data)`);
    }
  }

  if (unknownUrls.length > 0) {
    console.log('\n--- Unknown URLs (not in source data) ---');
    for (const { url } of unknownUrls) {
      console.log(`  ⚠️  ${url}`);
    }
  }

  // Fix mode: remove sections with hallucinated URLs
  if (ARG_FIX && hallucinations.length > 0) {
    console.log('\n--- Fixing: Removing sections with hallucinated URLs ---');
    let fixedMarkdown = markdown;

    // Find sections to remove (heading + link)
    for (const { url } of hallucinations) {
      // Find the section containing this URL
      const linkPattern = new RegExp(`\\[.*?\\]\\(${url.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\)`);
      const linkMatch = linkPattern.exec(fixedMarkdown);

      if (linkMatch) {
        // Find the heading before this link
        const beforeLink = fixedMarkdown.substring(0, linkMatch.index);
        const headingMatch = beforeLink.match(/### [^\n]+\n/);

        if (headingMatch) {
          const sectionStart = headingMatch.index;
          const sectionEnd = linkMatch.index + linkMatch[0].length;

          // Find the end of the section (next --- or end of file)
          const afterLink = fixedMarkdown.substring(sectionEnd);
          const nextSection = afterLink.match(/\n---\n/);
          const fullSectionEnd = nextSection
            ? sectionEnd + nextSection.index + nextSection[0].length
            : sectionEnd;

          const removedSection = fixedMarkdown.substring(sectionStart, fullSectionEnd);
          console.log(`  Removing section: ${removedSection.substring(0, 80)}...`);

          fixedMarkdown = fixedMarkdown.substring(0, sectionStart) + fixedMarkdown.substring(fullSectionEnd);
        }
      }
    }

    await writeFile(ARG_MARKDOWN, fixedMarkdown, 'utf-8');
    console.log(`\nFixed markdown written to ${ARG_MARKDOWN}`);
  }

  // Exit with error code if hallucinations found
  if (hallucinations.length > 0) {
    process.exit(1);
  }

  console.log('\n✅ All URLs validated successfully!');
}

validate().catch(err => {
  console.error('Error:', err.message);
  process.exit(1);
});
