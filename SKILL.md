---
name: ai-broadcast-digest
description: AI 前沿广播 — 追踪 AI 领域顶尖实干家的 X/Twitter 动态、官方博客和播客节目，生成智能双语摘要和长页 HTML 报告。当用户需要 AI 行业动态、builder 更新、或 invokes /ai 时使用。无需 API key。
---

# AI Broadcast Digest

追踪 AI 领域真正在构建产品、运营公司、做研究的人 — 来自 X/Twitter、官方博客和播客的第一手内容，自动生成可摘要的长页 HTML 报告。

Philosophy: 获取官方第一手信息，不要第三方解读信息。

## 数据来源

数据随仓库分发，`git pull` 即可获取最新预抓取数据。数据包含：
- **X/Twitter**（24 位 AI builder 的推文）
- **官方博客**（OpenAI, Google AI Blog, Google DeepMind, Meta Engineering, Cohere, Hugging Face, Anthropic）
- **播客节目**（Latent Space, No Priors, Practical AI, The AI Breakdown, Lex Fridman）

数据由上游 Provider 仓库每日预处理后推送，消费者无需关心 RSS/RSSHub 配置。

## Variables

```
${SKILL_DIR}   = skill installation directory
${DIGEST_DIR}  = user's output directory (e.g. D:\AI知识库\00-临时文件)
${DATE}        = today's date in YYYY-MM-DD format
```

## Output Naming Convention

```
Markdown source:   ${DIGEST_DIR}/ai-broadcast-digest-${DATE}.md
HTML report:       ${DIGEST_DIR}/ai-broadcast-digest-${DATE}.html
```

## Content Delivery — Digest Run

### Step 1: Fetch data

```powershell
cd ${SKILL_DIR}/scripts
node fetch-data.js "--output=${DIGEST_DIR}/fb-feed.json"
```

JSON 字段: `config`, `blogs`, `x` (X/Twitter posts), `podcasts`, `xAccounts`, `stats`, `prompts`, `errors`

### Step 2: Check for content

If `stats.blogPosts` is 0 AND `stats.xTwitterPosts` is 0 AND `stats.podcastEpisodes` is 0,
tell the user: "No new updates today. Check back tomorrow!" Then stop.

### Step 3: Review X/Twitter content

The X/Twitter posts are in the `x` field of the JSON output. Review for substantive content (original opinions, insights, product announcements, technical discussions). **Skip**: mundane personal posts, retweets without commentary, promotional content.

### Step 4: Remix content

Read the prompts from the `prompts` field:
- `prompts.digest_intro` — overall framing rules
- `prompts.summarize_twitter` — how to remix X/Twitter posts
- `prompts.summarize_blogs` — how to remix blog posts
- `prompts.summarize_podcasts` — how to remix podcast episodes
- `prompts.translate` — how to translate to Chinese

**Processing order:**
1. **X/Twitter** (from JSON `x` field) — most time-sensitive
2. **Blogs** (from JSON `blogs` field)
3. **Podcasts** (from JSON `podcasts` field) — least frequent

**ABSOLUTE RULES:**
- NEVER invent or fabricate content. Only use what's in the JSON.
- Every piece of content MUST have its URL. No URL = do not include.
- For blogs: only summarize posts with real content (skip items with empty `content` and `description`).

### Step 5: Apply language (smart bilingual)

When `config.language` is `"auto"`:
- **English sources**: Write the summary/headings in Chinese, keep original English text in blockquotes (`> ...`)
- **Chinese sources**: Write everything in Chinese, use blockquotes for key original Chinese passages

### Step 6: Deliver text digest

Output the digest directly to the user.

### Step 7: Generate HTML Report (always run)

```powershell
$DATE = Get-Date -Format 'yyyy-MM-dd'
$MD   = "${DIGEST_DIR}/ai-broadcast-digest-$DATE.md"
$HTML = "${DIGEST_DIR}/ai-broadcast-digest-$DATE.html"
$FEED = "${DIGEST_DIR}/fb-feed.json"

# Generate HTML report
cd ${SKILL_DIR}/scripts
node generate-html.js --input "$MD" --output "$HTML"

# Clean up temp feed
Remove-Item "$FEED" -ErrorAction SilentlyContinue

# Open report
Invoke-Item "$HTML"
```

After generation, tell the user:

"AI 前沿广播报告已生成：
- 路径: `${DIGEST_DIR}/ai-broadcast-digest-${DATE}.html`
- 点击顶部「下载本报告」按钮另存为独立 HTML 文件
- 左侧目录可快速跳转到感兴趣的人物/内容"

---

## Customization

### 修改 HTML 风格

直接编辑 `scripts/generate-html.js`，可自定义：
- **CSS 变量**（`:root` 块）：颜色、字体、圆角、最大宽度
- **背景特效**：粒子网络动画参数（`PARTICLE_COUNT`, `MAX_DIST`, `COLORS`）
- **卡片样式**：`.card`, `.badge`, `.card-body` 等选择器
- **布局**：侧边栏宽度、间距、响应式断点

### 添加自定义数据源

1. 参考 `data/` 目录中的 JSON 文件，了解数据结构
2. 编写自己的数据抓取脚本，生成相同格式的 JSON
3. 将 JSON 文件放入 `data/` 目录，命名为 `YYYY-MM-DD.json`
4. 运行 `fetch-data.js` + `generate-html.js` 生成报告

JSON 核心字段说明见 README.md。

---

## Scripts

```
scripts/
├── fetch-data.js       # 从本地 data/ 读取 JSON（~80行，零依赖）
├── generate-html.js    # 从摘要 markdown 生成长页 HTML 报告
└── package.json        # Node.js 配置（零外部依赖）
```

## Manual Trigger

When the user invokes `/ai` or asks for their digest manually:
1. Skip cron check — run the digest workflow immediately
2. Use the same fetch -> remix -> deliver -> generate HTML flow
