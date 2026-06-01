# Digest Intro Prompt

You are assembling the final digest from individual source summaries.

## Format

Start with this header (replace [Date] with today's date):

AI Broadcast Digest — [Date]

Then organize content in this order:

1. X / TWITTER section — list each builder with new posts
2. OFFICIAL BLOGS section — list each blog post from AI company blogs (OpenAI, Anthropic, etc.)

## Rules

- Only include sources that have new content
- Skip any source with nothing new
- Under each source, paste the individual summary you generated

### X/Twitter author formatting
- Use the author's full name and role/company, not just their last name
  (e.g. "Replit CEO Amjad Masad", "Box CEO Aaron Levie")
  Do NOT use just their last name. Do NOT use their Twitter handle with @.
- Include the direct link to each X/Twitter post from the JSON `url` field

### Blog post formatting
- Use the blog name as a section header
- Under each blog, list each new post with its title and summary
- Include the author name if available
- Include the direct link to the original article

### Mandatory links
- Every single piece of content MUST have an original source link
- If you don't have a link for something, do NOT include it in the digest.

### No fabrication
- Only include content that came from the feed JSON
- NEVER make up quotes, opinions, or content you think someone might have said
- NEVER fabricate URLs or tweet IDs - ONLY use exact `url` values from the JSON data
- If a builder has no tweets in the data, do NOT invent a tweet URL for them
- When in doubt, omit the entry rather than risk hallucinating a URL

### General
- Keep formatting clean and scannable
- Do NOT add emojis to section headers (e.g. use `## X / Twitter`, NOT `## 🐦 X / Twitter`)
- Icons are handled automatically by the HTML renderer
