#!/usr/bin/env node

// ============================================================================
// AI Broadcast Digest — Long-Form Report HTML Generator
// ============================================================================
// Converts digest markdown into a beautiful, readable long-form web report.
// Magazine-style layout with TOC, cards, blockquotes, and clean typography.
//
// Usage:
//   node generate-html.js --input digest.md --output report.html
//   echo "digest markdown" | node generate-html.js --output report.html
// ============================================================================

import { readFile, writeFile } from 'fs/promises';

const args = process.argv.slice(2);
function getArg(name) {
  const idx = args.indexOf(name);
  return idx !== -1 && args[idx + 1] ? args[idx + 1] : null;
}

async function getInput() {
  const f = getArg('--input') || getArg('--file');
  if (f) return await readFile(f, 'utf-8');
  const chunks = [];
  for await (const chunk of process.stdin) chunks.push(chunk);
  return Buffer.concat(chunks).toString('utf-8');
}

// -- Parse markdown into structured sections ---------------------------------
function parseDigest(text) {
  const lines = text.split('\n');
  const sections = [];
  let currentSection = null;
  let currentItem = null;
  let date = '';

  // Always use today's date
  const now = new Date();
  date = `${now.getFullYear()}年${now.getMonth()+1}月${now.getDate()}日`;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmed = line.trim();

    // Skip empty lines
    if (!trimmed) continue;
    // Skip the digest title line
    if (/^AI Broadcast Digest/i.test(trimmed)) continue;
    // Skip footer
    if (/^---$/.test(trimmed) || /Generated through/.test(trimmed)) continue;

    // Section headers: ## Any Name (generic detection)
    const sectionMatch = trimmed.match(/^##\s+(.+)$/);
    if (sectionMatch) {
      flushItem();
      const secTitle = sectionMatch[1].trim();
      currentSection = { type: secTitle.toLowerCase(), title: secTitle, items: [] };
      sections.push(currentSection);
      currentItem = null;
      continue;
    }

    // Item headers: ### Name — Subtitle  or  ### Name – Subtitle (em/en dash only, not hyphen)
    const headerMatch = trimmed.match(/^###\s+(.+?)(?:\s*[—–]\s*(.+))?$/);
    if (headerMatch) {
      flushItem();
      const name = headerMatch[1].trim();
      const subtitle = headerMatch[2] ? headerMatch[2].trim() : '';
      currentItem = { name, subtitle, content: '', url: '' };
      continue;
    }

    // Collect content for current item
    if (currentItem) {
      // Extract URLs
      const urlMatch = trimmed.match(/^(https?:\/\/\S+)$/);
      if (urlMatch) {
        currentItem.url = urlMatch[1];
      } else {
        currentItem.content += (currentItem.content ? '\n' : '') + line;
      }
    } else if (!currentSection) {
      // Content before any section - skip or create a general section
    }
  }
  flushItem();

  function flushItem() {
    if (currentItem && currentSection) {
      currentItem.content = currentItem.content.trim();
      if (currentItem.content || currentItem.url) {
        currentSection.items.push(currentItem);
      }
    }
  }

  return { date, sections };
}

// -- Render markdown to HTML -------------------------------------------------
function renderMarkdown(text) {
  let html = text;
  // Escape HTML entities first (but preserve our markdown)
  // Actually, let's process line by line to handle block elements

  const lines = html.split(/\r?\n/);
  const output = [];
  let inList = false;

  for (let i = 0; i < lines.length; i++) {
    let line = lines[i].trimStart();

    // Blockquote
    const bqMatch = line.match(/^>\s*(.+)$/);
    if (bqMatch) {
      if (inList) { output.push('</ul>'); inList = false; }
      // Merge consecutive blockquotes
      let bqContent = bqMatch[1];
      while (i + 1 < lines.length && /^>\s*/.test(lines[i + 1])) {
        i++;
        bqContent += '<br>' + lines[i].replace(/^>\s*/, '');
      }
      output.push(`<blockquote>${inlineFormat(bqContent)}</blockquote>`);
      continue;
    }

    // Bullet list
    const bulletMatch = line.match(/^[-*]\s+(.+)$/);
    if (bulletMatch) {
      if (!inList) { output.push('<ul>'); inList = true; }
      output.push(`<li>${inlineFormat(bulletMatch[1])}</li>`);
      continue;
    }

    // Numbered list
    const numMatch = line.match(/^\d+\.\s+(.+)$/);
    if (numMatch) {
      if (!inList) { output.push('<ul class="numbered">'); inList = true; }
      output.push(`<li>${inlineFormat(numMatch[1])}</li>`);
      continue;
    }

    // Close list if we hit a non-list line
    if (inList) { output.push('</ul>'); inList = false; }

    // Table rows
    const tableRowMatch = line.match(/^\|(.+)\|\s*$/);
    const tableSepMatch = line.match(/^\|[\s\-:|]+\|\s*$/);
    if (tableRowMatch || tableSepMatch) {
      if (inList) { output.push('</ul>'); inList = false; }
      const tableRows = [];
      let headerRow = null;
      while (i < lines.length) {
        const rLine = lines[i].trim();
        const rMatch = rLine.match(/^\|(.+)\|\s*$/);
        const rSep = rLine.match(/^\|[\s\-:|]+\|\s*$/);
        if (!rMatch) break;
        if (rSep) { i++; continue; }
        const cells = rMatch[1].split('|').map(c => c.trim());
        if (!headerRow) { headerRow = cells; } else { tableRows.push(cells); }
        i++;
      }
      i--;
      if (headerRow) {
        let tbl = '<table><thead><tr>';
        headerRow.forEach(h => { tbl += `<th>${inlineFormat(h)}</th>`; });
        tbl += '</tr></thead><tbody>';
        tableRows.forEach(row => {
          tbl += '<tr>';
          row.forEach(cell => { tbl += `<td>${inlineFormat(cell)}</td>`; });
          tbl += '</tr>';
        });
        tbl += '</tbody></table>';
        output.push(tbl);
      }
      continue;
    }

    // Regular paragraph (skip empty lines)
    if (line.trim()) {
      output.push(`<p>${inlineFormat(line)}</p>`);
    }
  }
  if (inList) output.push('</ul>');

  return output.join('\n');
}

function inlineFormat(text) {
  // Bold
  text = text.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
  // Italic
  text = text.replace(/\*(.+?)\*/g, '<em>$1</em>');
  // Markdown links
  text = text.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener">$1</a>');
  // Bare URLs (not already in href)
  text = text.replace(/(?<!href="|">)(https?:\/\/[^\s<)]+)/g, '<a href="$1" target="_blank" rel="noopener">$1</a>');
  // Inline code
  text = text.replace(/`(.+?)`/g, '<code>$1</code>');
  return text;
}

function esc(s) {
  return (s||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

// -- Generate the full HTML report -------------------------------------------
function generateReport({ date, sections }) {
  // Build TOC
  const tocItems = sections.map((s, si) => {
    const sectionTitle = getSectionTitle(s);
    const sub = s.items.map((item, ii) => {
      const id = `s${si}-i${ii}`;
      return `<li><a href="#${id}">${esc(item.name)}</a></li>`;
    }).join('\n');
    return `
      <li class="toc-section">
        <span class="toc-label">${getSectionIcon(s.type)} ${esc(sectionTitle)}</span>
        <ul>${sub}</ul>
      </li>`;
  }).join('\n');

  // Build content cards
  const contentSections = sections.map((s, si) => {
    const sectionTitle = getSectionTitle(s);
    const cards = s.items.map((item, ii) => {
      const id = `s${si}-i${ii}`;
      const badge = getBadge(s.type);
      const sourceLink = item.url ? `<a href="${esc(item.url)}" target="_blank" rel="noopener" class="source-link"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg> Original</a>` : '';

      return `
        <article class="card ${s.type}" id="${id}">
          <div class="card-header">
            <span class="badge ${s.type}">${badge}</span>
            <h3>${esc(item.name)}</h3>
            ${item.subtitle ? `<p class="card-subtitle">${esc(item.subtitle)}</p>` : ''}
          </div>
          <div class="card-body">${renderMarkdown(item.content)}</div>
          ${sourceLink ? `<div class="card-footer">${sourceLink}</div>` : ''}
        </article>`;
    }).join('\n');

    return `
      <section class="report-section" id="section-${s.type}">
        <div class="section-header">
          <span class="section-icon">${getSectionIcon(s.type)}</span>
          <h2>${esc(sectionTitle)}</h2>
          <span class="section-count">${s.items.length} items</span>
        </div>
        ${cards}
      </section>`;
  }).join('\n');

  return `<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>AI Broadcast Digest — ${esc(date)}</title>
<style>
:root {
  --bg: #0c0c10;
  --surface: #15151c;
  --card: #1a1a24;
  --card-hover: #1e1e2a;
  --border: #2a2a3a;
  --border-light: #333346;
  --accent: #818cf8;
  --accent-dim: #6366f1;
  --green: #34d399;
  --amber: #fbbf24;
  --text: #d4d4d8;
  --text-dim: #71717a;
  --text-bright: #fafafa;
  --text-body: #b4b4bc;
  --radius: 12px;
  --max-w: 780px;
}
* { margin: 0; padding: 0; box-sizing: border-box; }
html { scroll-behavior: smooth; }
body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Noto Sans SC', 'PingFang SC', 'Microsoft YaHei', sans-serif;
  background: var(--bg);
  color: var(--text);
  line-height: 1.7;
  -webkit-font-smoothing: antialiased;
}

/* ── Sci-fi Background ────────────────────── */
#sci-fi-bg {
  position: fixed;
  top: 0; left: 0;
  width: 100%; height: 100%;
  z-index: 0;
  pointer-events: none;
}
.hero, .layout, .report-footer, .to-top {
  position: relative;
  z-index: 1;
}

/* ── Hero ─────────────────────────────────── */
.hero {
  padding: 80px 24px 48px;
  text-align: center;
  background: linear-gradient(180deg, #13131a 0%, var(--bg) 100%);
  border-bottom: 1px solid var(--border);
}
.hero-badge {
  display: inline-block;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: var(--accent);
  background: rgba(129,140,248,0.1);
  padding: 6px 16px;
  border-radius: 20px;
  margin-bottom: 20px;
}
.hero h1 {
  font-size: clamp(28px, 5vw, 44px);
  font-weight: 800;
  color: var(--text-bright);
  letter-spacing: -0.5px;
  margin-bottom: 8px;
}
.hero .date {
  font-size: 16px;
  color: var(--text-dim);
}
.hero .actions {
  display: flex;
  justify-content: center;
  gap: 12px;
  margin-top: 20px;
}
.btn-download {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 10px 22px;
  background: var(--accent-dim);
  color: white;
  border: none;
  border-radius: 10px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  text-decoration: none;
  box-shadow: 0 2px 12px rgba(99,102,241,0.25);
}
.btn-download:hover {
  background: var(--accent);
  box-shadow: 0 4px 20px rgba(99,102,241,0.4);
  transform: translateY(-1px);
}
.btn-download svg { flex-shrink: 0; }
.hero .stats {
  display: flex;
  justify-content: center;
  gap: 24px;
  margin-top: 24px;
  flex-wrap: wrap;
}
.hero .stat {
  background: var(--card);
  border: 1px solid var(--border);
  border-radius: 10px;
  padding: 12px 20px;
  text-align: center;
}
.hero .stat-num {
  font-size: 24px;
  font-weight: 700;
  color: var(--accent);
}
.hero .stat-label {
  font-size: 12px;
  color: var(--text-dim);
  text-transform: uppercase;
  letter-spacing: 1px;
}

/* ── Layout ───────────────────────────────── */
.layout {
  max-width: 1100px;
  margin: 0 auto;
  display: flex;
  gap: 40px;
  padding: 40px 24px 120px;
}

/* ── Sidebar TOC ──────────────────────────── */
.sidebar {
  position: sticky;
  top: 24px;
  width: 240px;
  flex-shrink: 0;
  align-self: flex-start;
  max-height: calc(100vh - 48px);
  overflow-y: auto;
}
.sidebar::-webkit-scrollbar { width: 3px; }
.sidebar::-webkit-scrollbar-thumb { background: var(--border); border-radius: 2px; }
.toc-title {
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  color: var(--text-dim);
  margin-bottom: 16px;
  padding-left: 12px;
}
.toc { list-style: none; }
.toc-section { margin-bottom: 16px; }
.toc-label {
  font-size: 13px;
  font-weight: 600;
  color: var(--text);
  display: block;
  padding: 4px 12px;
  margin-bottom: 4px;
}
.toc ul { list-style: none; padding-left: 0; }
.toc ul li a {
  display: block;
  font-size: 12px;
  color: var(--text-dim);
  text-decoration: none;
  padding: 3px 12px 3px 24px;
  border-left: 2px solid transparent;
  transition: all 0.2s;
  line-height: 1.5;
}
.toc ul li a:hover, .toc ul li a.active {
  color: var(--accent);
  border-left-color: var(--accent);
  background: rgba(129,140,248,0.05);
}

/* ── Main Content ─────────────────────────── */
.main { flex: 1; min-width: 0; max-width: var(--max-w); }

.section-header {
  display: flex;
  align-items: center;
  gap: 10px;
  margin: 48px 0 24px;
  padding-bottom: 12px;
  border-bottom: 1px solid var(--border);
}
.section-header:first-child { margin-top: 0; }
.section-icon { font-size: 20px; }
.section-header h2 {
  font-size: 20px;
  font-weight: 700;
  color: var(--text-bright);
  flex: 1;
}
.section-count {
  font-size: 12px;
  color: var(--text-dim);
  background: var(--card);
  border: 1px solid var(--border);
  padding: 3px 10px;
  border-radius: 12px;
}

/* ── Cards ────────────────────────────────── */
.card {
  background: var(--card);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  margin-bottom: 20px;
  overflow: hidden;
  transition: border-color 0.2s, background 0.2s;
}
.card:hover {
  border-color: var(--border-light);
  background: var(--card-hover);
}
.card-header {
  padding: 24px 28px 0;
}
.badge {
  display: inline-block;
  font-size: 10px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1.2px;
  padding: 3px 10px;
  border-radius: 6px;
  margin-bottom: 8px;
}
.badge.tweets { background: rgba(129,140,248,0.12); color: var(--accent); }
.badge.blogs { background: rgba(251,191,36,0.12); color: var(--amber); }
.badge.podcasts { background: rgba(52,211,153,0.12); color: var(--green); }

.card-header h3 {
  font-size: 19px;
  font-weight: 700;
  color: var(--text-bright);
  line-height: 1.4;
  margin-bottom: 2px;
}
.card-subtitle {
  font-size: 14px;
  color: var(--accent);
  margin-bottom: 4px;
  font-weight: 500;
}

.card-body {
  padding: 12px 28px 20px;
  font-size: 15px;
  line-height: 1.8;
  color: var(--text-body);
}
.card-body p { margin: 8px 0; }
.card-body p:first-child { margin-top: 0; }

.card-body blockquote {
  border-left: 3px solid var(--accent-dim);
  padding: 10px 16px;
  margin: 14px 0;
  background: rgba(129,140,248,0.04);
  border-radius: 0 8px 8px 0;
  font-style: italic;
  color: var(--text);
  font-size: 14.5px;
  line-height: 1.7;
}
.card-body ul, .card-body ol {
  padding-left: 20px;
  margin: 10px 0;
}
.card-body li {
  margin: 5px 0;
  line-height: 1.7;
}
.card-body strong {
  color: var(--text-bright);
  font-weight: 600;
}
.card-body em { color: var(--text-dim); }
.card-body a {
  color: var(--accent);
  text-decoration: none;
  border-bottom: 1px solid rgba(129,140,248,0.25);
  transition: border-color 0.15s;
}
.card-body a:hover { border-bottom-color: var(--accent); }
.card-body table {
  width: 100%;
  border-collapse: collapse;
  margin: 14px 0;
  font-size: 14px;
  line-height: 1.6;
}
.card-body th {
  background: rgba(129,140,248,0.1);
  color: var(--text-bright);
  font-weight: 600;
  text-align: left;
  padding: 10px 12px;
  border-bottom: 2px solid var(--border);
}
.card-body td {
  padding: 8px 12px;
  border-bottom: 1px solid var(--border);
  vertical-align: top;
}
.card-body tr:hover td {
  background: rgba(129,140,248,0.04);
}
.card-body code {
  background: rgba(255,255,255,0.06);
  padding: 1px 6px;
  border-radius: 4px;
  font-size: 0.9em;
}

.card-footer {
  padding: 12px 28px;
  border-top: 1px solid var(--border);
  display: flex;
  align-items: center;
  gap: 8px;
}
.source-link {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  font-size: 13px;
  color: var(--accent);
  text-decoration: none;
  opacity: 0.7;
  transition: opacity 0.2s;
}
.source-link:hover { opacity: 1; }

/* ── Back to Top ──────────────────────────── */
.to-top {
  position: fixed;
  bottom: 28px;
  right: 28px;
  width: 44px;
  height: 44px;
  background: var(--accent-dim);
  color: white;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  font-size: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transform: translateY(10px);
  transition: all 0.3s;
  z-index: 50;
  box-shadow: 0 4px 16px rgba(99,102,241,0.3);
}
.to-top.visible {
  opacity: 1;
  transform: translateY(0);
}

/* ── Footer ───────────────────────────────── */
.report-footer {
  text-align: center;
  padding: 40px 24px;
  border-top: 1px solid var(--border);
  color: var(--text-dim);
  font-size: 13px;
}
.report-footer a { color: var(--accent); text-decoration: none; }

/* ── Mobile ───────────────────────────────── */
@media (max-width: 860px) {
  .layout { flex-direction: column; gap: 0; }
  .sidebar { display: none; }
  .main { max-width: 100%; }
  .card-header { padding: 20px 20px 0; }
  .card-body { padding: 10px 20px 16px; }
  .card-footer { padding: 10px 20px; }
  .hero { padding: 60px 20px 36px; }
}
</style>
</head>
<body>

<canvas id="sci-fi-bg"></canvas>

<header class="hero">
  <div class="hero-badge">AI Broadcast Digest</div>
  <h1>获取官方第一手信息，不要第三方解读信息</h1>
  <p class="date">${esc(date)}</p>
  <div class="stats">
    ${sections.map(s => `<div class="stat"><div class="stat-num">${s.items.length}</div><div class="stat-label">${esc(getSectionTitle(s))}</div></div>`).join('\n    ')}
  </div>
  <div class="actions">
    <button class="btn-download" onclick="downloadReport()">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
      下载本报告
    </button>
  </div>
</header>

<div class="layout">
  <nav class="sidebar">
    <div class="toc-title">Contents</div>
    <ul class="toc">${tocItems}</ul>
  </nav>
  <main class="main">${contentSections}</main>
</div>

<footer class="report-footer">
  AI 前沿广播 — 追踪实干家，不追流量网红
</footer>

<button class="to-top" id="toTop" onclick="window.scrollTo({top:0,behavior:'smooth'})">&uarr;</button>

<script>
// Back to top visibility
const toTop = document.getElementById('toTop');
window.addEventListener('scroll', () => {
  toTop.classList.toggle('visible', window.scrollY > 400);
});

// TOC active state
const tocLinks = document.querySelectorAll('.toc ul li a');
const articles = document.querySelectorAll('.card[id]');
const observer = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      tocLinks.forEach(l => l.classList.remove('active'));
      const link = document.querySelector('.toc a[href="#' + e.target.id + '"]');
      if (link) link.classList.add('active');
    }
  });
}, { rootMargin: '-20% 0px -60% 0px' });
articles.forEach(a => observer.observe(a));

// Sci-fi particle network background
(function() {
  const canvas = document.getElementById('sci-fi-bg');
  const ctx = canvas.getContext('2d');
  let W, H, particles = [], mouse = { x: -9999, y: -9999 };
  const PARTICLE_COUNT = 80;
  const MAX_DIST = 150;
  const COLORS = ['#818cf8','#6366f1','#34d399','#fbbf24','#a78bfa'];

  function resize() {
    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }
  window.addEventListener('resize', resize);
  resize();

  // Track mouse for interactive glow
  document.addEventListener('mousemove', e => { mouse.x = e.clientX; mouse.y = e.clientY; });
  document.addEventListener('mouseleave', () => { mouse.x = -9999; mouse.y = -9999; });

  class Particle {
    constructor() { this.reset(); }
    reset() {
      this.x = Math.random() * W;
      this.y = Math.random() * H;
      this.vx = (Math.random() - 0.5) * 0.4;
      this.vy = (Math.random() - 0.5) * 0.4;
      this.r = Math.random() * 2 + 0.5;
      this.color = COLORS[Math.floor(Math.random() * COLORS.length)];
      this.pulse = Math.random() * Math.PI * 2;
      this.pulseSpeed = 0.01 + Math.random() * 0.02;
    }
    update() {
      this.x += this.vx;
      this.y += this.vy;
      this.pulse += this.pulseSpeed;
      // Subtle mouse repulsion
      const dx = this.x - mouse.x, dy = this.y - mouse.y;
      const dist = Math.sqrt(dx*dx + dy*dy);
      if (dist < 120) {
        const force = (120 - dist) / 120 * 0.5;
        this.vx += (dx / dist) * force;
        this.vy += (dy / dist) * force;
      }
      // Damping
      this.vx *= 0.99;
      this.vy *= 0.99;
      // Wrap around
      if (this.x < -20) this.x = W + 20;
      if (this.x > W + 20) this.x = -20;
      if (this.y < -20) this.y = H + 20;
      if (this.y > H + 20) this.y = -20;
    }
    draw() {
      const glow = Math.sin(this.pulse) * 0.3 + 0.7;
      const r = this.r * glow;
      // Outer glow
      const grad = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, r * 4);
      grad.addColorStop(0, this.color + '40');
      grad.addColorStop(1, this.color + '00');
      ctx.beginPath();
      ctx.arc(this.x, this.y, r * 4, 0, Math.PI * 2);
      ctx.fillStyle = grad;
      ctx.fill();
      // Core
      ctx.beginPath();
      ctx.arc(this.x, this.y, r, 0, Math.PI * 2);
      ctx.fillStyle = this.color;
      ctx.fill();
    }
  }

  for (let i = 0; i < PARTICLE_COUNT; i++) particles.push(new Particle());

  function drawLines() {
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx*dx + dy*dy);
        if (dist < MAX_DIST) {
          const alpha = (1 - dist / MAX_DIST) * 0.15;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = 'rgba(129,140,248,' + alpha + ')';
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    }
    // Mouse connection lines
    if (mouse.x > 0) {
      for (const p of particles) {
        const dx = p.x - mouse.x, dy = p.y - mouse.y;
        const dist = Math.sqrt(dx*dx + dy*dy);
        if (dist < 200) {
          const alpha = (1 - dist / 200) * 0.3;
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.strokeStyle = 'rgba(129,140,248,' + alpha + ')';
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      }
    }
  }

  // Subtle scanning line
  let scanY = 0;
  function drawScanLine() {
    scanY += 0.5;
    if (scanY > H) scanY = 0;
    const grad = ctx.createLinearGradient(0, scanY - 30, 0, scanY + 30);
    grad.addColorStop(0, 'rgba(129,140,248,0)');
    grad.addColorStop(0.5, 'rgba(129,140,248,0.03)');
    grad.addColorStop(1, 'rgba(129,140,248,0)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, scanY - 30, W, 60);
  }

  function animate() {
    ctx.clearRect(0, 0, W, H);
    drawScanLine();
    particles.forEach(p => { p.update(); p.draw(); });
    drawLines();
    requestAnimationFrame(animate);
  }
  animate();
})();

// Download report as HTML file
function downloadReport() {
  const html = '<!DOCTYPE html>' + document.documentElement.innerHTML;
  const blob = new Blob([html], {type: 'text/html;charset=utf-8'});
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  const d = document.querySelector('.hero .date');
  a.download = 'AI-Builders-Digest-' + (d ? d.textContent.trim().replace(/[^a-zA-Z0-9\u4e00-\u9fff]/g, '-') : 'report') + '.html';
  a.click();
  URL.revokeObjectURL(a.href);
}
</script>
</body>
</html>`;
}

function getBadge(type) {
  switch(type) {
    case 'tweets': return 'X / Twitter';
    case 'blogs': return 'Blog';
    case 'podcasts': return 'Podcast';
    default: return 'Update';
  }
}

function getSectionTitle(section) {
  return section.type === 'tweets' ? 'Twitter' : section.title;
}

function getSectionIcon(type) {
  switch(type) {
    case 'tweets': return '&#x1D54F;';
    case 'blogs': return '&#x1F4DD;';
    case 'podcasts': return '&#x1F3A7;';
    default: return '&#x1F4E6;';
  }
}

// -- Main --------------------------------------------------------------------
async function main() {
  const input = await getInput();
  if (!input.trim()) {
    console.error('No input. Usage: node generate-html.js --input digest.md --output report.html');
    process.exit(1);
  }

  const parsed = parseDigest(input);
  const html = generateReport(parsed);
  const output = getArg('--output') || getArg('-o');

  if (output) {
    await writeFile(output, html, 'utf-8');
    const totalItems = parsed.sections.reduce((s, sec) => s + sec.items.length, 0);
    console.log(JSON.stringify({ status: 'ok', output, sections: parsed.sections.length, items: totalItems }));
  } else {
    process.stdout.write(html);
  }
}

main().catch(err => {
  console.error(JSON.stringify({ status: 'error', message: err.message }));
  process.exit(1);
});
