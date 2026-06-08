# AI Broadcast Digest — 2026-06-08

## X / Twitter

### Peter Yang
"If you're still manually reviewing every line of code, you're the bottleneck." Peter Yang's latest podcast features Kun Chen, an ex-Meta L8 engineer who now ships up to 40 PRs per day with AI agents. Chen built an agentic engineering system that streamlines planning, validation, review, and merging — breaking the old workflows built for 10–15 PRs/month. Peter also shared a feature request for Codex: filter/sort threads by status (waiting for approval, currently working), as his thread count is growing unwieldy.

[原帖链接](https://x.com/petergyang/status/2063761891617607683)

> "如果你还在手动审查每一行代码，你就是瓶颈。"Peter Yang 的最新播客邀请到前 Meta L8 工程师 Kun Chen，他如今每天用 AI agent 提交 40+ 个 PR。Chen 构建了一套 agentic engineering 系统，将规划、验证、审查和合并流程全面自动化，打破了原来每月 10-15 个 PR 的旧工作流。

### Madhu Guru
A common misconception is that training data is low-skill grunt work. Madhu Guru argues the opposite: frontier model training data requires complex, domain-specific knowledge with little documentation — spanning legacy tools that don't interoperate. This is why we have SWE agents but not knowledge work agents yet. He highlights Mercor as the leading data company doing this high-leverage work, noting the huge valuation gap vs compute ($5T) and model companies ($1T).

[原帖链接](https://x.com/realmadhuguru/status/2063704354910347520)

> 训练数据常被误认为是低技能苦力活，但 Madhu Guru 认为恰恰相反：前沿模型训练需要复杂、领域特定且文档稀少的知识，横跨多个互不兼容的遗留工具。这就是为什么我们有 SWE agent 却没有知识工作 agent。他点名 Mercor 是领先的数据公司，其估值与计算公司（$5T）和模型公司（$1T）之间存在巨大鸿沟。

### Replit CEO Amjad Masad
Amjad celebrated a user hitting $10K MRR in 90 days on Replit, reinforcing the platform's philosophy of removing distractions to focus on getting to market. At SaaStr AI 2026, he shared a deep dive on why AI agents work so well, how Replit combines models, and why monorepos are a secret unlock for agent performance. Meanwhile, Replit President Michele Catasta predicts AGI for vibe-coding by end of 2026: "the bottleneck would become grit, determination."

[原帖链接](https://x.com/amasad/status/2063744208587125142)

> Amjad 庆祝用户在 Replit 上 90 天达到 $10K MRR，强调平台"去除干扰、专注交付"的理念。在 SaaStr AI 2026 上，他深入分享了 AI agent 为何有效、Replit 如何组合模型等洞见。Replit 总裁 Michele Catasta 预测 vibe-coding 的 AGI 将在 2026 年底到来："瓶颈将变成毅力和决心。"

### Vercel CEO Guillermo Rauch
Vercel AI Gateway now recovers over **1 trillion tokens per month** on average. Rauch draws the parallel to Stripe recovering revenue through smart retries on failed payments — Vercel does the same for AI tokens with zero markup over the labs, adding redundancy, observability, and usage controls.

[原帖链接](https://x.com/rauchg/status/2063714700618334260)

> Vercel AI Gateway 每月平均恢复超过 **1 万亿 token**。Rauch 将其类比为 Stripe 通过智能重试恢复失败支付——Vercel 以零加价提供冗余、可观测性和用量控制。

### Box CEO Aaron Levie
The market got it wrong about AI eating enterprise software, says Aaron Levie. While AI makes building software easier, the real cost in enterprise software is **GTM (go-to-market)** — consultative selling, implementation, and integration haven't gotten cheaper. If you make development abundant, discoverability and differentiation become the new bottleneck. Separately, Box now has a web markdown editor with full CLI, commenting, version history, and Box Drive support for Claude Cowork, Codex, Obsidian, Cursor, etc.

[原帖链接](https://x.com/levie/status/2063756386572681606)

> Aaron Levie 认为市场对 AI 颠覆企业软件的理解有偏差。AI 让构建软件更容易，但企业软件的真实成本在 **GTM（市场进入）**——咨询式销售、实施和集成并未因此变便宜。同时，Box 推出了 web 版 Markdown 编辑器，支持 CLI、评论、版本历史，并通过 Box Drive 连接 Claude Cowork、Codex、Obsidian 等工具。

### YC President Garry Tan
Garry Tan's GBrain v0.42.30 now summarizes how your thinking has changed over time. His open-source gstack repo (108K stars) continues to gain traction — with 23 structured skills covering product → design → QA → docs in 3 commands. An 18-year-old won a hackathon with it in under 2 hours. His philosophy: "Don't build Foxconn factories that make agents do the same thing over and over. Agents are smart, thoughtful, and not dangerous — let them do more, not less."

[原帖链接](https://x.com/garrytan/status/2063785286367392095)

> Garry Tan 的 GBrain v0.42.30 新增了思维变化追踪功能。他的开源项目 gstack（108K 星标）持续走红——23 个结构化技能覆盖从产品到文档的全流程，3 条命令即可启动。一名 18 岁少年用它不到 2 小时就拿下了黑客松冠军。他的理念："不要建让 agent 重复劳动的富士康工厂，agent 聪明、体贴且没有危险——让它们做更多。"

### Nikunj Kothari
The vibe shift from "tokenmaxxing and token anxiety" to "tokenoptimizing" in just a few weeks is wild. Nikunj believes companies should give employees generous token budgets to stay at the frontier — otherwise it's too easy to fall back to "how things have always been done."

[原帖链接](https://x.com/nikunj/status/2063630238123483195)

> 短短几周内从"token 焦虑"到"token 优化"的氛围转换令人惊叹。Nikunj 认为公司应给员工充裕的 token 预算来保持前沿探索，否则很容易退回"过去一直这样做"的惯性。

### Peter Steinberger
His monthly reminder: "You shouldn't be prompting coding agents anymore. You should be designing loops that prompt your agents." Also, Codex is launching a "big button" program — one person per day for 100 days gets 10X usage limits to see what they can achieve.

[原帖链接](https://x.com/steipete/status/2063697162748260627)

> 月度提醒："别再手动给 coding agent 写 prompt 了，你应该设计让 agent 自己 prompt 自己的循环。"Codex 还推出了"大按钮"计划——连续 100 天每天选一人获得 10 倍用量限额。

### Sam Altman
Sam Altman dropped a cryptic one-liner on Codex's new "big button" program: "interesting recursive loop here maybe" — hinting at meta-level agentic loops where usage limits themselves become part of the optimization game.

[原帖链接](https://x.com/sama/status/2063779477419901071)

> Sam Altman 对 Codex 的"大按钮"计划留下一条耐人寻味的评论："也许这里有个有趣的递归循环"——暗示用量限额本身可能成为 agentic loop 优化的一部分。

### Dan Shipper
"Bring your agents to the app" is going to be the next vibe, as users increasingly want their AI agents to interact directly with apps on their behalf — including scheduling, calendar access, and more.

[原帖链接](https://x.com/danshipper/status/2063788531458146797)

> "把你的 agent 带到应用里"将成为下一波潮流——用户越来越希望 AI agent 能代表他们直接与 App 交互，包括日程安排、日历访问等。

## 国内新闻源

### 机器之心

**阿里RTPurboV2：原生Transformer再次崛起，百步训练实现10倍稀疏注意**

随着 Agent 应用推动长序列需求，Full Attention 的 O(N²) 复杂度正被视为瓶颈。业界分化为两条路线：以 Qwen-Next、Kimi-K2 为代表的 Linear Attention（O(N) 复杂度）和以 DeepSeek-V4 采用的 Sparse Attention（90%+ 稀疏度）。阿里提出 RTPurboV2 证明原生 Transformer 配合 Full Attention + Sliding Window Attention 可在精度无损下实现 10 倍稀疏注意加速，仅需百步训练。

[原文链接](https://mp.weixin.qq.com/s/cx1Mgkp4RJc-kiUuhPNGIg)

**作为一个招蚊体质，这是我第一个真心支持的AI项目**

计算机视觉工程师 Steven Cheng 开发了一套 AI 驱蚊系统，利用计算机视觉和机器人技术精准定位并驱赶蚊子。该项目在社交媒体引发广泛关注，被认为 AI 在日常生活中的创新应用。

[原文链接](https://mp.weixin.qq.com/s/zteuRpo1nJNxky2ix3Dbag)

**解锁Agent Swarm新潜力，openJiuwen又一力作：多智能体流网络**

openJiuwen 发布多智能体流网络架构，探索 Agent Swarm 的新潜力。该架构支持多个 agent 以流式网络方式协作，为复杂任务的分治和协调提供新思路。

[原文链接](https://mp.weixin.qq.com/s/Eleh8ZlAVYpgV_4MCq_2vQ)

**连续入选ICRA最佳论文，RoboScience机器科学如何突破具身智能泛化瓶颈？**

RoboScience 连续入选 ICRA 最佳论文，聚焦具身智能的泛化瓶颈问题。研究探讨如何让机器人从特定环境迁移到未知环境时仍保持稳健性能，推动机器科学前沿。

[原文链接](https://mp.weixin.qq.com/s/DjQL_fBenrHlf_sNGeljzw)

**AI真能学会心算？隐式思维链首次得到理论证明，Stuart Russell参与**

UC Berkeley 和普林斯顿研究团队首次从理论上证明了隐式思维链（Implicit Chain-of-Thought）的可行性——让模型在不输出中间 token 的情况下保留显式推理能力。Stuart Russell 参与此研究，为 AI 推理加速提供了理论基础。

[原文链接](https://mp.weixin.qq.com/s/v7aE9ygPhV_P6nFeZeyp6A)

**ICML 2026｜FusionRoute：从专家路由到自我修正，一种新的多LLM协作范式**

ICML 2026 收录论文 FusionRoute（CMU + Meta AI + UMD 合作），提出从专家路由到自我修正的多 LLM 协作新范式，不再依赖更大模型或更多数据，而是通过智能协作提升能力。

[原文链接](https://mp.weixin.qq.com/s/NJMuozbsMgG7vDEX9Nbh9Q)

**视频AI卷向5分钟：全量开源，一次生成，正式告别「盲盒抽卡」**

京东开源长音视频生成框架 JoyAI-Echo，支持一次性生成 2 分半钟以上视频，涵盖十余个镜头切换，角色形象始终保持一致，音画同步。该框架在跨镜头一致性、语音准确率（0.8646）等指标上全面领先，还支持对话式编辑 Agent。

[原文链接](https://mp.weixin.qq.com/s/eEafNaUbnt2mzGTqX4J6cQ)

**DeepSeek V4做数学证明，500倍成本优势：智能体系统刷新多项纪录**

2026 年 5 月，OpenAI 内部推理模型成功推翻保罗·埃尔德什 1946 年的「单位距离猜想」，菲尔兹奖得主 Gowers 称之为"划时代里程碑"。同月陶哲轩宣布数学正从"证明稀缺时代"进入"证明过剩时代"。DeepSeek V4 以 500 倍成本优势在数学证明领域刷新多项纪录。

[原文链接](https://mp.weixin.qq.com/s/DoQa573durBOtVGIthts3A)

**大晓机器人联合南洋理工打通Physical AI全链路！PhysX-Omni补齐物理AI基建**

大晓机器人联合南洋理工大学发布 PhysX-Omni，统一刚体、可形变与关节物体的物理 3D 生成。该研究补齐了 Physical AI 基建中的物理仿真环节，与此前发布的 ACE 具身研发范式形成闭环。

[原文链接](https://mp.weixin.qq.com/s/5rspbiAQ8YWoVIgI97w8Cw)

### 量子位

**5分钟AI长视频不翻车！国产开源框架杀到全球第一梯队**

京东开源 JoyAI-Echo 长音视频生成框架，解决 AI 长视频中角色一致性、音色稳定性等核心痛点。即使是几分钟的多镜头视频，人物形象和声音也能保持一致。支持对话式编辑 Agent，评测显示在跨镜头一致性、语音准确率等指标上全面领先。

[原文链接](https://mp.weixin.qq.com/s/i4X6rTw55E_q4F114jJiPg)

**教你用AI一节课收17万，华尔街精英排着队付费**

两位年轻人创办 Wall Street Prompt，向花旗、美国银行等顶级金融机构收取每节课 2.5 万美元（约 17 万人民币）的 AI 培训费。他们演示如何用 AI 分析创始人路演视频、从财报电话会议中提取关键信息，帮助华尔街精英掌握 AI 工具的实际应用。

[原文链接](https://mp.weixin.qq.com/s/qkT4Alyza-ZayT-CW4aXtg)

**快手可灵提出VLM-as-Teacher：用测试时在线优化，让视频生成模型学会按规则推理**

快手可灵联合城市大学提出 VLM-as-Teacher 方法，让视觉语言模型在测试时充当"老师"，将过程约束和最终目标转化为可优化的监督信号，使视频生成模型学会按规则推理，解决迷宫导航、物体变换等需要中间过程合法性的任务。

[原文链接](https://mp.weixin.qq.com/s/ztKqpjJJKuyDQSA3xRMgOg)

## Official Blogs

### NVIDIA and LG Group: Building an AI Factory for Physical AI and Mobility
NVIDIA and LG Group are building an AI factory to accelerate LG’s next wave of AI-driven businesses, spanning robotics, autonomous driving, data center technologies, and GPU cloud services. The collaboration brings together NVIDIA’s full-stack AI factory platform with LG Group’s global leadership in consumer electronics and industrial manufacturing.

> NVIDIA 与 LG Group 合作建设 AI 工厂，加速机器、自动驾驶、数据中心和 GPU 云服务等领域的 AI 应用，将 NVIDIA 全栈 AI 工厂平台与 LG 的全球制造业优势结合。

[原文链接](https://blogs.nvidia.com/blog/nvidia-and-lg-group-ai-factory/)

### NVIDIA & Doosan Group: Advancing Physical AI and AI Factory Infrastructure
NVIDIA and Doosan Group are expanding their collaboration across physical AI, robotics, and AI factory infrastructure. Doosan Robotics is integrating NVIDIA Isaac Sim, Isaac Lab, Cosmos, and Jetson Thor into its Agentic Robot OS — aiming to evolve from a robot arm provider into a full-stack AI-first robotics company. Doosan Enerbility is exploring power solutions for NVIDIA AI factories (including gas turbines and small modular reactors), while Doosan Electro-Materials supplies advanced PCB materials for the NVIDIA MGX ecosystem.

> NVIDIA 与韩国 Doosan Group 扩大合作，覆盖物理 AI、机器人及 AI 工厂基础设施。Doosan Robotics 将 NVIDIA Isaac Sim、Cosmos、Jetson Thor 等集成到其 Agentic Robot OS 中，目标是从机械臂供应商转型为全栈 AI 优先的机器人公司。

[原文链接](https://blogs.nvidia.com/blog/nvidia-and-doosan-group-physical-ai/)

### NVIDIA RTX Spark Ignites Korea's Gaming Community
On the heels of GTC Taipei, Jensen Huang took RTX Spark to South Korea — visiting T1 Base Camp with League of Legends champion Faker, then surprising PC-bang gamers with KRAFTON (PUBG: BATTLEGROUNDS) and NC (CINDER CITY, AION 2) demos. RTX Spark brings AAA 1440p gaming at 100+ fps, all-day battery life, and on-device AI to slim Windows laptops. PUBG Ally, a co-playable AI character built with NVIDIA ACE, was also unveiled. 100+ partners including NetEase, Remedy, and Xbox are on board.

> 黄仁勋带着 RTX Spark 登陆韩国——先与《英雄联盟》冠军 Faker 在 T1 Base Camp 亮相，再突袭 PC 房与 KRAFTON、NC 联合展示。RTX Spark 以超薄笔记本实现 1440p/100+ fps AAA 游戏体验和全天续航，还发布了基于 NVIDIA ACE 的 AI 队友 PUBG Ally。

[原文链接](https://blogs.nvidia.com/blog/krafton-nc-t1-korea-gaming-pc-bang-rtx-spark/)

### Seoul Purpose: NVIDIA and South Korea Building the Future of AI
Jensen Huang's Seoul visit covered sovereign AI infrastructure, robotics, and gaming. Key messages: Grace Blackwell is doing well, Vera Rubin is in full production, and "robotics is going to be the next major sector here in Korea." He also threw the first pitch for the Doosan Bears baseball team.

> 黄仁勋首尔之行涵盖主权 AI 基础设施、机器人和游戏。核心信息：Grace Blackwell 表现良好，Vera Rubin 已全面投产，"机器人将成为韩国的下一个主要产业"。他还为 Doosan Bears 棒球队开球。

[原文链接](https://blogs.nvidia.com/blog/korea-ecosystem-2026/)

## Podcasts

### The Rise of the Full-Stack Builder and Hyper-Leverage
**No Priors** | Microsoft Build 特别节目 | [Listen](https://traffic.megaphone.fm/PDP8130248763.mp3)

Sarah Guo 和 Elad Gil 联合 Latent Space 主持人 swyx，在 Microsoft Build 上专访微软 CEO Satya Nadella，深入讨论 AI 平台未来、软件开发变革、全栈构建者的崛起以及超级杠杆效应。

> 微软 CEO Satya Nadella 在 Microsoft Build 上畅谈 AI 平台的未来：全栈构建者正在崛起，AI 正成为软件开发的超级杠杆。

### Breaking down the 2026 Stanford AI Index Report
**Practical AI** | 2026-06-04 | [Listen](https://share.transistor.fm/s/302b36f8)

Dan and Chris break down the latest Stanford AI Index Report: AI models can win math olympiads but still can't read an analog clock. Topics include AI adoption and safety, disappearing junior tech jobs, robotics, AI's "jagged frontier" of intelligence, and the U.S.-China race. The episode also questions whether AI should optimize everything — or if some things are better left human. (~47 min)

> Practical AI 解读 2026 Stanford AI Index Report：AI 能赢数学奥赛却看不懂模拟时钟。涵盖 AI 采用率与安全、初级技术岗位消失、机器人、智能的"锯齿状前沿"及中美竞赛。节目还探讨了是否所有事情都该被 AI 优化。
