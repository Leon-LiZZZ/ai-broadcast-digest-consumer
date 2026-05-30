# AI Broadcast Digest Consumer

追踪 AI 领域真正在构建产品、运营公司、做研究的人 — 来自 X/Twitter、官方博客和播客的第一手内容。

本仓库是 **消费端分发版**：数据已预抓取并随仓库分发，`git pull` 即可获取最新内容。你可以自由修改 HTML 报告风格和添加自定义数据源。

> Provider 仓库（数据抓取端）：[ai-broadcast-digest](https://github.com/Leon-LiZZZ/ai-broadcast-digest)

## Quick Start

```bash
# 1. 克隆仓库
git clone https://github.com/Leon-LiZZZ/ai-broadcast-digest-consumer.git
cd ai-broadcast-digest-consumer

# 2. 读取当天数据
cd scripts
node fetch-data.js --output=./feed.json

# 3. 用 AI（如 ChatGPT/Claude）根据 feed.json 生成摘要 markdown
#    参考 prompts/ 目录中的提示词模板

# 4. 生成 HTML 报告
node generate-html.js --input=./digest.md --output=./report.html

# 5. 打开报告
open report.html  # macOS
# 或双击 report.html 文件
```

### 获取最新数据

```bash
git pull
```

数据文件存放在 `data/` 目录，每日更新。

## 数据覆盖范围

### X/Twitter（24 位 AI builder）

Andrej Karpathy, Swyx, Josh Woodward, Kevin Weil, Peter Yang, Nan Yu, Madhu Guru, Amanda Askell, Cat Wu, Thariq, Google Labs, Amjad Masad, Guillermo Rauch, Alex Albert, Aaron Levie, Ryo Lu, Garry Tan, Matt Turck, Nikunj Kothari, Peter Steinberger, Dan Shipper, Aditya Agarwal, Sam Altman, Claude

### 官方博客（7 源）

OpenAI, Google AI Blog, Google DeepMind, Meta Engineering, Cohere, Hugging Face, Anthropic

### 播客节目（5 源）

Latent Space, No Priors, Practical AI, The AI Breakdown, Lex Fridman

## JSON 数据 Schema

`data/YYYY-MM-DD.json` 的核心字段：

| 字段 | 类型 | 说明 |
|------|------|------|
| `date` | string | 日期，格式 `YYYY-MM-DD` |
| `config` | object | 配置，`language: "auto"` 表示智能双语 |
| `stats` | object | 统计：`blogPosts`, `xTwitterPosts`, `xAccounts`, `podcastEpisodes`, `podcastSources` |
| `blogs` | array | 博客文章列表 |
| `x` | array | 推文列表 |
| `podcasts` | array | 播客节目列表 |
| `prompts` | object | AI 摘要提示词模板 |
| `errors` | array | 抓取错误记录（可选） |

### Blog 条目字段

```json
{
  "source": "blog",
  "name": "OpenAI",
  "title": "文章标题",
  "url": "https://...",
  "publishedAt": "2026-05-28T12:00:00.000Z",
  "author": "",
  "description": "简短描述（≤500字）",
  "content": "完整正文"
}
```

### X/Twitter 条目字段

```json
{
  "source": "x",
  "name": "Andrej Karpathy",
  "handle": "karpathy",
  "title": "推文摘要",
  "url": "https://x.com/karpathy/status/...",
  "publishedAt": "2026-05-28T10:00:00.000Z",
  "description": "推文文本",
  "content": "完整内容（含 HTML 清理后文本）"
}
```

### Podcast 条目字段

```json
{
  "source": "podcast",
  "name": "Latent Space",
  "title": "节目标题",
  "url": "https://...",
  "audioUrl": "https://...mp3",
  "duration": "01:23:45",
  "publishedAt": "2026-05-25T12:00:00.000Z",
  "description": "节目简介（≤800字）",
  "content": "完整 show notes"
}
```

## Customization

### 修改 HTML 报告风格

直接编辑 `scripts/generate-html.js`：

- **主题色**：修改 `:root` 中的 CSS 变量（`--accent`, `--bg`, `--card` 等）
- **背景特效**：调整粒子动画参数（`PARTICLE_COUNT`, `COLORS`）
- **卡片布局**：修改 `.card` 相关样式
- **字体**：修改 `body` 的 `font-family`

### 添加自定义数据源

1. 编写脚本抓取你关注的信息源
2. 生成符合上述 JSON Schema 的数据文件
3. 放入 `data/YYYY-MM-DD.json`
4. 运行 `fetch-data.js` + `generate-html.js`

`prompts/` 目录提供了 5 个提示词模板，可用于指导 AI 生成摘要：
- `summarize-twitter.md` — 推文摘要规则
- `summarize-blogs.md` — 博客摘要规则
- `summarize-podcasts.md` — 播客摘要规则
- `digest-intro.md` — 整体编排规则
- `translate.md` — 中英双语翻译规则

## 项目结构

```
├── data/                  # 预抓取数据（git 跟踪，每日更新）
│   └── YYYY-MM-DD.json
├── prompts/               # AI 摘要提示词模板
├── scripts/
│   ├── fetch-data.js      # 从本地 data/ 读取数据
│   ├── generate-html.js   # Markdown → HTML 报告生成器
│   └── package.json
├── SKILL.md               # Qoder AI 技能定义
└── README.md
```

## Requirements

- **Node.js** >= 18（使用内置 `fetch` API）
- 零外部依赖（`npm install` 不需要）

## License

MIT
