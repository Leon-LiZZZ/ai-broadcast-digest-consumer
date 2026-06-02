# AI 前沿广播 — 2026-06-02

## Twitter

### Swyx (Latent Space 主播)

Swyx 密集转发了多条关于 AI 基础设施和视频生成的重要动态。最引人注目的是 Microsoft 与 NVIDIA 联手推出搭载 Grace + Blackwell 芯片的笔记本电脑，正面挑战 Apple Silicon 六年的统治地位。

> whoah - Grace + Blackwell chips in a laptop. @Microsoft + @NVIDIA teaming up to take on 6 years of total dominance of Apple Silicon

[来源](https://x.com/swyx/status/2061567877879369953)

Swyx 还重点推荐了 Latent Space 最新一期关于 xAI Grok Imagine 的播客，前 xAI 世界模型负责人、NVIDIA Cosmos 研究员 Ethan He 分享了多个深刻洞察：视频模型的智能主要来自语言而非视频数据；idea-to-code 已经很快了，瓶颈回到了算力；下一次飞跃不是更好的视频模型，而是 video agent；Diffusion 将成为 AGI 的前端，LLM 是后端，Generative UI 将取代 HTML/CSS。

> 1. Video models get most of their intelligence from language, not from video data.
> 2. Idea-to-code is fast now. The bottleneck is back to having enough compute to try every idea.
> 3. Iteration speed beats almost everything else in model development.
> 4. The next leap won't be a better video model. It'll be a video agent.
> 5. Diffusion will be the frontend of AGI, the LLM the backend. Generative UI will replace HTML/CSS.

[来源](https://x.com/swyx/status/2061494196469645771)

此外，xAI 一个小团队在 3 个月内交付了 SOTA 级视频模型，方法论值得借鉴：强人才 + 共同目标、每天一次 sync、其余时间全部用来构建，少协调、多算力、多迭代。

[来源](https://x.com/swyx/status/2061552992684515589)

---

### Replit CEO Amjad Masad

Amjad Masad 分享了 Replit 的最新重大更新：从一个 prompt 出发，免费获得一个完整的生意，包括网站、移动 App、幻灯片和发布视频，同时集成 Stripe Atlas、QuickBooks、Mercury 等创业基础设施。他还转发了一位用户用 Replit 构建 dialmoments.com（iOS App + 网站），两个月内的收入已经够支付世界杯旅行和信用卡账单的案例，生动展示了 AI 编程的变现潜力。

> Prompt to business:
> - website
> - mobile app
> - monetization
> - Delaware corp

[来源](https://x.com/amasad/status/2061575503434408106)

---

### Vercel CEO Guillermo Rauch

Guillermo Rauch 推荐了 MiniMax M3，这是目前 Next.js agent 评测中表现最好的开源模型，仅次于 Opus 和 GPT5，但成本低 10 倍（Vercel AI Gateway 上首周更是 20 倍优惠）。MiniMax M3 是 MiniMax 首个长上下文模型，支持多模态输入。

> MiniMax M3 is now the leading open model on the Next.js agent evaluations. Right behind Opus & GPT5, but 10× cheaper.

[来源](https://x.com/rauchg/status/2061593874498531707)

Rauch 还转发 shadcn 的新功能：任何 GitHub repo 都可以变成 registry，通过 registry.json 定义组件，用 CLI 安装，分发组件、工具、配置、文档、rules、design systems、workflows、agents、skills 等。他评价："Git is all you need. Always has been."

[来源](https://x.com/rauchg/status/2061533151676293430)

另外推荐了一个 Vercel 上的全栈 agent 开源项目 Caltext：通过 iMessage 追踪卡路里，技术栈包括 Bun + Turborepo、Hono on Nitro、Chat SDK + AI SDK + GPT-4.1 vision、Upstash Redis、Vercel Workflows。

[来源](https://x.com/rauchg/status/2061415178298937365)

---

### Y Combinator CEO Garry Tan

Garry Tan 今日极为高产，核心主题围绕 agent 时代的开发范式转变。他分享了一篇重磅文章，以 Garry's List 的 54 万行 Rails 代码为反面教材，提出 agent 时代的开发方法论：用 agent 完成任务后 `skillify it` 保存为 markdown skill，TypeScript 只用于确定性 I/O，为 skill 添加 LLM eval 和集成测试，让 agent 下次自动加载 skill。核心思想是：Rails 功能只服务一个 App，而 skill pack 可以复用到下一个项目。

> Do not copy the Rails pattern.
> 1. Finish the task with an agent
> 2. Say `skillify it`
> 3. Save the markdown skill
> 4. Keep TypeScript only for deterministic I/O

[来源](https://x.com/garrytan/status/2061564831283720298)

他转发 Ankit Gupta 的观点：AI 计算正在从"大型机时代"进入"PC 时代"，数据中心依然关键，但个人软硬件即将爆发。NVIDIA RTX Spark 正是这一趋势的硬件体现。

> i suspect we've been in the mainframe era of AI computing and we're about to enter the PC era of it.

[来源](https://x.com/garrytan/status/2061470688758956505)

关于智能饱和与开源追赶：当模型智能超过人类判断力时，开源将追上闭源前沿，竞争将转向服务成本。MiniMax M3 的发布似乎正在验证这一判断。

[来源](https://x.com/garrytan/status/2061345828153991240)

他还推荐了 GBrain，一个为 AI agent 设计的知识图谱系统，基于 Markdown 文件构建自组织类型知识图谱，支持混合搜索和"夜间梦境循环"，定位为"Obsidian 给人看，GBrain 给 agent 用"。

[来源](https://x.com/garrytan/status/2061345861939179601)

---

### Every CEO Dan Shipper

Dan Shipper 围绕 Codex 和 AI 实施发表了多条观点。他认为 SaaS 股票将在一年内回归，因为 AI 实际上会把用户基数放大 10 倍：用户不只是人类，还有 agent。

> it's so funny to see investors bearish on SaaS stocks. SaaS stocks will be back in a year when people realize AI actually 10x's their user base. users are agents, not just humans.

[来源](https://x.com/danshipper/status/2061550920635191666)

他还指出 Codex 正在各类排名中迅速超越 Claude，并分享了企业 AI 落地的务实路径：先自己构建获得 fluency，指定负责人，从一个窄且痛的工作流开始自动化，做到 95%（跑 evals 和 QA），然后复制成功经验。这比宣称"自动化了整个公司"慢，但真的有效。

> 1- Get fluent: build something yourself first
> 2- Assign an owner
> 3- Automate one narrow, painful workflow
> 4- Build it to 95% (running evals & QA)
> 5- Scale the wins so other teams benefit

[来源](https://x.com/danshipper/status/2061488563586293964)

---

### OpenAI CEO Sam Altman

Sam Altman 宣布 OpenAI Foundation 发布 AI Resilience 愿景，已启动超过 1.3 亿美元的初始资助，覆盖生物韧性（bio-resilience）、网络韧性（cyber-resilience）、AI 模型安全和 AI 对青少年影响四大领域。

> The OpenAI Foundation is doing a lot of wonderful things. Helping society become resilient to AI is going to be incredibly important.

[来源](https://x.com/sama/status/2061562575322492937)

---

### OpenClaw 创始人 Peter Steinberger

Peter Steinberger 分享了一个有趣的 Codex 使用方式：让 Codex 在需要帮助时使用 sag.sh 语音呼叫他，"时不时听到它跟我说话，这感觉太酷了"。他还转发了 OpenClaw 与 NVIDIA 合作开源的最大规模 Skill 安全数据集，覆盖 67,453 个 ClawHub skills 的安全扫描结果：NVIDIA SkillSpector 标记了 1/2 的 agentic 风险，仅 0.31% 被判定为恶意，但不同扫描器对风险的共识度极低（不超过 8.5%）。

> In collaboration with @nvidia, we're open-sourcing a dataset of security scans for 67,453 ClawHub skills:
> - NVIDIA SkillSpector flagged 1/2 for agentic risk
> - Only 0.31% were malicious
> - No two scanners agreed on more than 8.5% of risks

[来源](https://x.com/steipete/status/2061348059091484884)

---

### Claude Developer Thariq & Alex Albert

Claude 开发团队宣布重置 Pro 和 Max 用户的 5 小时和每周速率限制，并修复了一个导致 Claude Code 会话生成过多并行 subagent、消耗速度超预期的 bug。

> We've reset 5-hour and weekly rate limits for all users on Pro and Max plans. We fixed an issue that caused some Claude Code sessions to spawn excessive parallel subagents, burning through usage faster than expected.

[来源](https://x.com/trq212/status/2061513513324200390)

---

### Matt Turck (AI 投资人)

Matt Turck 用一句对话精准描绘了当前 AI agent 的企业现实与认知差距：CEO 说"我们现在有数万个 AI agent 在大规模生产运行"，CTO 则一脸茫然。

[来源](https://x.com/mattturck/status/2061533386296963464)

---

## 官方博客

### OpenAI: AI 政策与政治倡导立场

OpenAI 发布声明，阐述其在 AI 政策和政治倡导方面的方法论，强调透明度、支持审慎监管和 AI 安全，并明确表示没有外部政治团体代表公司发言。

[阅读原文](https://openai.com/index/our-views-on-ai-policy-and-political-advocacy)

---

### OpenAI: Stargate 密歇根数据中心动工

OpenAI 在密歇根州破土动工建设 1GW 数据中心项目，作为 Stargate 计划的一部分，旨在扩大 AI 基础设施覆盖、创造就业并支持当地社区。这标志着 Stargate 从规划进入实质建设阶段。

> OpenAI breaks ground on a 1GW data center project in Michigan as part of Stargate, building AI infrastructure to expand access, create jobs, and support communities.

[阅读原文](https://openai.com/index/stargate-michigan-data-center)

---

### OpenAI: 前沿模型和 Codex 正式登陆 AWS

OpenAI 前沿模型和 Codex 已在 AWS 全面可用（GA），企业客户可以通过熟悉的 AWS 环境、管控和采购流程使用 OpenAI，从评估到生产的速度大幅提升。这是 OpenAI 多渠道分发战略的重要一步。

> OpenAI frontier models and Codex are now generally available on AWS, giving enterprises a new path to build with OpenAI through the AWS environments, controls, and procurement workflows they already use.

[阅读原文](https://openai.com/index/openai-frontier-models-and-codex-are-now-available-on-aws)

---

### Google AI Blog: 用 Gemini 构建 Google I/O 2026

Google 分享了内部团队如何使用 AI（主要是 Gemini）来策划和执行 Google I/O 2026 大会的全过程，展示了 AI 在大型活动制作中的实际落地能力。

[阅读原文](https://blog.google/innovation-and-ai/technology/ai/io-2026-google-ai/)

---

### NVIDIA: AI Cloud 生态全球扩张

NVIDIA 在 GTC Taipei 宣布 AI Cloud 生态系统全球扩张，覆盖六大洲。Jensen Huang 表示："每个公司和每个国家都需要 AI 工厂基础设施，将数据转化为智能。"核心亮点包括：

- **CoreWeave** 率先采用 NVIDIA Vera Rubin 和 Spectrum-X Ethernet Photonics，为百万 GPU AI 工厂提供网络基础
- **Nebius** 构建全栈 Physical AI Workbench，集成 Cosmos 3、Isaac Sim 和 GR00T
- **Firmus** 通过 Project Southgate 在澳大利亚和东南亚扩建液冷 AI 工厂
- 六大 Exemplar Cloud 合作伙伴：CoreWeave、Crusoe、Lambda、Nebius、Vultr、YTL
- NVIDIA DSX 平台帮助 AI Cloud 更快上线，DSX MaxLPS 可在固定功率预算内增加最多 40% 的 GPU

> "Every company and every country needs AI factory infrastructure to turn data into intelligence."

[阅读原文](https://blogs.nvidia.com/blog/ai-cloud-ecosystem/)

---

### NVIDIA: Factory Operations Blueprint (FOX) 发布

NVIDIA 在 GTC Taipei 发布 Factory Operations Blueprint (FOX)，这是一个用于构建自主工厂管理 agent 的参考设计。FOX 帮助开发者构建安全、集中的工厂管理 agent，用于编排和优化质量管控、物料运输和工人安全等专业工业 AI agent。

核心亮点：
- **Foxconn 的 MoMClaw**：连接传感器、机器信号与数百个专业 agent，通过自然语言界面提供实时答案，预计根因分析时间缩短 80%，劳动生产率提升 15%，机器故障率降低 10%
- **Pegatron** 编排多专业 agent，预计资产冗余成本降低 15%
- **Advantech** 部署 AI 工厂大脑管理能源，预计能耗降低 10%
- 运行于 **NVIDIA DGX Station**，搭载 GB300 Grace Blackwell Ultra Desktop Superchip，20 petaflops FP4 性能，支持 1 万亿参数模型

[阅读原文](https://blogs.nvidia.com/blog/factory-operations-fox-blueprint-ai-brain/)

---

### NVIDIA: 台湾产业巨头加速全球 AI 基础设施建设

台湾拥有超过 500 家 NVIDIA 生态合作伙伴，超过 100 万个 NVIDIA MGX 机架组件在 25 个工厂组装。随着 Vera Rubin 进入全面量产，台湾生态覆盖从 TSMC 芯片制造到 Foxconn、Pegatron、QCT、Wistron、Inventec 系统集成的完整供应链。

关键应用：TSMC 使用 NVIDIA cuLitho 将计算光刻效率提升 20-50%；QCT 使用 Omniverse 数字孪生加速工厂规划；Wistron 通过 Omniverse DSX Blueprint 和 PhysicsNeMo 将布局分析速度提升 70%，设施功耗降低 20%。

[阅读原文](https://blogs.nvidia.com/blog/taiwan-ecosystem-ai-infrastructure/)

---

### NVIDIA: RTX Spark 与本地 AI Agent 全面升级

NVIDIA 在 GTC Taipei 发布 **RTX Spark**，这是一款专为个人 agent 打造的 Windows PC 新品类，搭载 1 petaflops AI 算力和 128GB 统一内存。同步发布的重要更新包括：

- **NVIDIA OpenShell** 运行时登陆 Windows，与 Microsoft 安全原语集成，Hermes Agent 和 OpenClaw 将在 Windows 应用中集成
- **NVIDIA NemoClaw** 蓝图扩展到全系列产品线，新增简化安装程序
- llama.cpp 和 vLLM 的 multi-token prediction 优化，**Qwen 3.6/3.5 27B 推理性能提升 2 倍**
- **H Company** 发布 computer-use 工具，让 agent 像用户一样看屏幕操作鼠标键盘
- **Adobe Premiere 和 Photoshop** 将为 RTX Spark 重新架构，GPU 加速合成
- **DGX Station for Windows**：桌面级 AI 超级计算机，数据中心级 GPU + CPU
- Blender Cycles 集成 **DLSS 4.5 Ray Reconstruction**

[阅读原文](https://blogs.nvidia.com/blog/rtx-ai-garage-computex-spark-local-agents/)

---

## 播客

### 为什么 Video Agent 模型是下一个：Ethan He, xAI Grok Imagine (Why Video Agent models are next)
**Latent Space** | 2026-05-31 | [收听](https://www.latent.space/p/video-agents)

前 xAI 世界模型负责人 Ethan He 深度访谈，讨论 AI 视频为何会走上 coding agent 的同一发展路径：从 autocomplete 阶段到 agent 阶段，世界模型如何变得实时交互，语言模型如何成为视频的控制层，以及 Generative UI 取代 HTML/CSS 的愿景。这是 Latent Space 首期关于 xAI 的播客。

---

### 异步 Agent 时代：Cognition 与 OpenInspect (The Age of Async Agents)
**Latent Space** | 2026-05-30 | 时长 68 分钟 | [收听](https://www.latent.space/p/cognition)

Cognition 的 Walden Yan 和 OpenInspect 的 Cole Murray 讨论异步 agent 的时代，探讨 agent 如何从实时交互走向后台持续运行，以及监督、验证和安全方面的新挑战。

---

### ESM：Bitter Lesson 正在降临蛋白质领域 (The Bitter Lesson is Coming for Proteins)
**Latent Space** | 2026-05-29 | 时长 70 分钟 | [收听](https://www.latent.space/p/esmfold2)

BioHub 的 Alex Rives 宣布 ESMFold 2 发布，这是一个开源的蛋白质预测、设计和发现引擎。ESM 团队证明了 BERT 类 transformer 在足够大的数据集上训练可以超越 AlphaFold3。发布包含 68 亿蛋白质图谱和 11 亿预测结构。核心洞察：蛋白质折叠的世界模型思路与 LLM 异曲同工，用无监督训练学习抽象模式，然后接上预测头做下游任务。

---

### 为企业 AI 构建 Guardian：Onyx Security CEO 访谈 (Building an AI Guardian for Enterprise)
**No Priors** | 2026-05-28 | 时长 41 分钟 | [收听](https://traffic.megaphone.fm/PDP6949464408.mp3)

Onyx Security CEO Maxim Bar Kogan 讨论 AI agent 的企业级安全监控。Onyx 的产品是 AI control plane，负责监督 agent 权限和上下文，平衡延迟、成本和可靠性。核心观点：当前安全控制缺乏监测 agent 意图的上下文，需要独立于模型供应商的监督层。

---

### 用 MCP 和 Kubernetes 重启企业 AI (Rebooting Enterprise AI with MCP and Kubernetes)
**Practical AI** | 2026-05-28 | 时长 48 分钟 | [收听](https://share.transistor.fm/s/d76e02d5)

Stacklok CEO Craig McLuckie 探讨 MCP、Kubernetes、ToolHive 和企业 AI 基础设施。当 AI agent 开始像同事而非聊天机器人一样工作时，组织将如何管理身份验证、agent 编排和系统架构。

---

### 物理学最大谜团：反物质、暗能量与万物理论 (#497 - Biggest Mysteries in Physics)
**Lex Fridman** | 2026-05-29 | 时长 3 小时 | [收听](https://lexfridman.com/don-lincoln/)

Fermilab 粒子物理学家 Don Lincoln 深度对话，涵盖电弱力、希格斯玻色子发现、万物理论、暗能量和暗物质。虽然不是 AI 主题，但关于"智能能否理解宇宙终极规律"的讨论对 AGI 研究者同样有启发。

---

## 今日统计

| 维度 | 数量 |
|------|------|
| 博客文章 | 8 篇 |
| X/Twitter 动态 | 44 条 |
| 播客节目 | 6 期 |
| 监控博主 | 25 位 |
| 数据源 | 8 博客 + 25 X + 4 播客 |

---

*生成时间: 2026-06-02 | 数据窗口: X 24h · 博客 3d · 播客 7d*
