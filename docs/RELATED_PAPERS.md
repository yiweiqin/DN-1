# 相关论文综述：LLM驱动的叙事游戏内容生成

> 生成时间：2026-04-13  
> 项目：可视化冒险类游戏内容生产引擎 (DN)

---

## 一、论文清单（30篇）

### A. LLM叙事生成与交互式小说（10篇）

| # | 论文标题 | 年份 | 引用 | 来源 | 关键贡献 |
|---|---------|------|------|------|----------|
| 1 | **STORY2GAME: Generating (Almost) Everything in an Interactive Fiction Game** | 2025 | 2 | arXiv:2505.03547 | 从故事生成完整交互式游戏：自动生成动作代码、前置条件/效果、动态扩展新动作 |
| 2 | **PsychoGAT: A Novel Psychological Measurement Paradigm through Interactive Fiction Games with LLM Agents** | 2024 | 41 | ACL 2024 | 将心理量表转化为交互式小说游戏，LLM作为心理学家+游戏设计师双重角色 |
| 3 | **Symmetry-Aware LLM-Driven Generation and Repair of Interactive Fiction Graphs in Twine/Twee** | 2026 | 0 | Symmetry | 图分析+LLM生成并修复分支叙事，检测状态不一致、死循环、不可达结局 |
| 4 | **Interactive Fiction Game Playing as Multi-Paragraph Reading Comprehension with Reinforcement Learning** | 2020 | 35 | EMNLP 2020 | 将IF游戏求解重构为多段落阅读理解任务，对象中心历史检索策略 |
| 5 | **Research on the Application of Large Language Models in Interactive Game Storyline Generation** | 2025 | 0 | ACE | 系统分析LLM在长程角色记忆、故事逻辑连贯性、因果推理方面的缺陷与优化路径 |
| 6 | **AP-Based LLM Story Generation: Envision Technology Development Through Science Fiction** | 2025 | 1 | GCCE | 基于用户技术体验生成个性化近未来科幻故事，多模态LLM生成叙事+视觉插图 |
| 7 | **Narrative-to-Scene Generation: An LLM-Driven Pipeline for 2D Game Environments** | 2025 | 1 | arXiv:2509.04481 | 从叙事文本提取空间谓词，生成2D瓦片游戏场景，评估tile-object匹配与空间约束 |
| 8 | **Optimized Story Generation using DeepSeek LLM with Supervised Fine-Tuning** | 2025 | 3 | IEEE | SFT微调提升叙事连贯性，ROUGE-1提升15%、ROUGE-2提升31% |
| 9 | **LLM-Based Procedural Level Generation in Psychological Horror Game** | 2025 | 0 | IEEE | LLaMA 3.2本地生成动态叙事，空间上下文引导的两句话故事 |
| 10 | **WebNovelBench: Placing LLM Novelists on the Web Novel Distribution** | 2025 | - | arXiv:2505.14818 | 4000+中文网文数据集，8维叙事质量评估框架，LLM-as-Judge自动评分 |

### B. 多智能体LLM协同与共识机制（10篇）

| # | 论文标题 | 年份 | 引用 | 来源 | 关键贡献 |
|---|---------|------|------|------|----------|
| 11 | **LLM-based Multi-Agent Systems Survey** | 2024 | 高 | arXiv:2402.01680 | 多智能体LLM系统全面综述：任务分解、协作模式、自主性分级 |
| 12 | **AgentVerse: Facilitating Multi-Agent Collaboration and Exploring Emergent Behaviors** | 2023 | 高 | arXiv:2308.10848 | 清华/北邮/微信团队，多Agent协作框架，涌现行为探索 |
| 13 | **Solo-Performance-Prompting (SPP): Multiple Personality for LLM Reasoning** | 2023 | 高 | arXiv:2307.05300 | 微软/UIUC，单一LLM模拟多重人格协同推理，减少幻觉 |
| 14 | **Generative Agents: Interactive Simulacra of Human Behavior** | 2023 | 极高 | arXiv:2303.07418 | Stanford，25个AI Agent在沙盒环境中生活、社交、记忆 |
| 15 | **ChatDev: Communicative Agents for Software Development** | 2023 | 极高 | arXiv:2307.07924 | 多Agent协作开发软件，CEO/CTO/程序员等角色扮演 |
| 16 | **Igniting Creative Writing in Small Language Models: LLM-as-a-Judge vs Multi-Agent Refined Rewards** | 2025 | - | arXiv:2508.21476 | 多Agent拒绝采样框架为创意任务构建偏好数据，RLAIF训练7B模型 |
| 17 | **CRMAgent: A Multi-Agent LLM System for E-Commerce CRM Message Template Generation** | 2025 | - | arXiv:2507.08325 | 群体学习+检索适配双模式生成高质量消息模板 |
| 18 | **MAGIS: LLM-Based Multi-Agent Framework for GitHub Issue Resolution** | 2024 | 高 | arXiv:2403.17927 | Manager/Developer/QA四Agent协作解决GitHub Issue |
| 19 | **Position: Towards a Responsible LLM-empowered Multi-Agent Systems** | 2025 | - | arXiv:2502.01714 | LLM-MAS可信性挑战：不可预测性叠加、人机协同设计 |
| 20 | **Improving Factuality and Reasoning in Language Models through Multiagent Debate** | 2023 | 高 | arXiv:2305.14325 | 多LLM辩论达成共识，提升事实准确性与推理质量 |

### C. 程序化内容生成与游戏AI（10篇）

| # | 论文标题 | 年份 | 引用 | 来源 | 关键贡献 |
|---|---------|------|------|------|----------|
| 21 | **Procedural Content Generation in Games** (Book) | 2016 | 经典 | Springer | PCG经典教材，搜索方法、生成式方法、混合方法分类 |
| 22 | **Procedural Content Generation via Machine Learning (PCGML)** | 2020 | 高 | IEEE TGA | 机器学习驱动的PCG综述：地图、关卡、规则、资产生成 |
| 23 | **Large Language Models for Procedural Content Generation** | 2023 | 中 | FDG | LLM用于PCG的早期探索：文本生成关卡、规则、任务 |
| 24 | **LLM-based Realistic Safety-Critical Driving Video Generation** | 2025 | - | arXiv | LLM生成安全关键驾驶场景视频，代码生成+视频合成 |
| 25 | **Text-to-Game: Autonomous Code Generation for Text-Based Games** | 2023 | 中 | arXiv:2305.18368 | 从文本描述自动生成可玩文字冒险游戏代码 |
| 26 | **GameGAN: Learning to Simulate Games from Video** | 2020 | 高 | NeurIPS | 从游戏视频学习游戏引擎，生成新关卡 |
| 27 | **World Building as a Formal Task for Large Language Models** | 2024 | 中 | arXiv | 将世界构建形式化为LLM任务：实体、关系、约束生成 |
| 28 | **Character Creation in Games using Large Language Models** | 2024 | 中 | FDG | LLM生成游戏角色：外貌、性格、背景故事、技能树 |
| 29 | **Diffusion Models for Game Asset Generation** | 2023-25 | 高 | 多来源 | 扩散模型生成游戏资产：角色立绘、场景、UI、纹理 |
| 30 | **A Survey on Game AI for Narrative Games** | 2022 | 高 | IEEE TGA | 叙事游戏AI综述：剧情管理、对话系统、角色建模 |

---

## 二、论文使用的数据集与评估方法

### 2.1 叙事生成数据集

| 数据集 | 来源论文 | 规模 | 特点 |
|--------|----------|------|------|
| **WebNovelBench** | #10 | 4000+中文网文 | 大纲→正文生成任务，8维质量评估 |
| **Jericho** | #4 | 30+IF游戏 | 文字冒险游戏基准，含难度分级 |
| **Twine/Twee Games** | #3 | 多个分支叙事 | 图结构叙事，状态追踪 |
| **心理学量表** | #2 | 抑郁/认知扭曲/人格 | 标准化量表转游戏 |

### 2.2 评估维度

**自动化指标：**
- ROUGE-1/2/L、METEOR、BERTScore（文本质量）
- LLM-as-Judge（叙事连贯性、角色一致性、创意性）
- 成功率/可玩性（STORY2GAME：玩家能否完整游玩生成的故事）

**人工评估：**
- 内容连贯性 (Coherence)
- 交互性 (Interactivity)
- 趣味性 (Interest)
- 沉浸感 (Immersion)
- 满意度 (Satisfaction)

### 2.3 多智能体评估

- **共识达成率**：多模型投票/辩论后的意见一致性
- **事实准确性提升**：相对单模型的幻觉减少比例
- **任务完成率**：协作解决复杂任务的成功率

---

## 三、对你项目的参考价值

### 3.1 架构层面

| 你的模块 | 参考论文 | 可借鉴点 |
|----------|----------|----------|
| **Council多模型投票** | #11-20 | 匿名互评→排名→主席综合的Pipeline；SPP的多重人格；辩论式共识 |
| **世界观生成** | #1, #27, #28 | 故事→世界填充→动作代码的渐进式生成；实体-关系-约束形式化 |
| **剧情分章生成** | #1-10 | 状态一致性检测；分支叙事图修复；长程记忆管理 |
| **角色档案系统** | #14, #28 | 记忆流+反思机制；角色属性→背景→外貌的层级生成 |
| **图像生成管线** | #6, #7, #29 | 叙事→空间谓词→场景生成；多模态协同 |

### 3.2 论文可写的数据实验

#### 必测数据：

| 实验类别 | 具体指标 | 参考基准 |
|----------|----------|----------|
| **叙事质量** | ROUGE/BERTScore vs 人工写作 | WebNovelBench方法 |
| **Council效果** | 单模型 vs 多模型投票 vs 主席综合 | 辩论论文方法 |
| **游戏可玩性** | 成功率、分支覆盖率、状态一致性 | STORY2GAME方法 |
| **用户满意度** | 5点Likert量表（连贯性/趣味性/沉浸感） | PsychoGAT方法 |

#### 可选增强：

| 实验类别 | 具体指标 | 参考基准 |
|----------|----------|----------|
| **图像质量** | FID/CLIP Score vs 人工绘制 | 扩散模型论文 |
| **生成速度** | 单场景生成时间、端到端游戏创建时间 | 实时性要求 |
| **成本分析** | API调用次数、Token消耗、模型对比 | 工程论文 |
| **消融实验** | 移除Council/Wiki检索/模板的影响 | 消融研究 |

### 3.3 创新点提炼

基于论文空白，你的项目可以强调：

1. **工程化管线 vs 单点生成**：大部分论文是单任务（只生成故事/只生成关卡），你是端到端叙事+图像的完整管线
2. **Council for Games**：多模型共识在游戏内容生成的应用尚少，你的"2轮council整合"有创新性
3. **Wiki检索增强**：将知识图谱融入叙事生成，提升世界观一致性与真实感
4. **模板+LLM混合**：预设世界观模板与LLM生成结合，平衡可控性与创意性
5. **配角档案系统**：自动抽取、合并、演化配角信息，论文中少见

---

## 四、推荐写作框架

### 论文标题建议
"DN Engine: An LLM-Powered Content Production Pipeline for Narrative Adventure Games with Multi-Model Consensus and Visual Generation"

### 章节结构

1. **Introduction**
   - 叙事游戏内容生产的痛点
   - LLM在游戏内容生成的机遇与挑战
   - 我们的贡献：端到端管线+多模型共识+多模态协同

2. **Related Work**
   - LLM叙事生成（#1-10）
   - 多智能体LLM系统（#11-20）
   - 程序化内容生成（#21-30）

3. **System Architecture**
   - Council机制详解
   - 世界观模板系统
   - 图像生成管线
   - 角色档案系统

4. **Experiments**
   - 数据集构建（自建 vs 公开）
   - 自动评估指标
   - 人工评估协议
   - 消融实验

5. **Results & Discussion**
   - Council vs 单模型
   - 模板 vs 纯LLM
   - 与baseline对比
   - 案例分析

6. **Conclusion & Future Work**

---

## 五、快速检索表

| 你的问题 | 查看论文 |
|----------|----------|
| Council怎么设计评估？ | #13, #15, #20 |
| 怎么测故事质量？ | #10, #8 |
| 怎么测游戏可玩性？ | #1, #4, #3 |
| 怎么测图像质量？ | #29, #6, #7 |
| 多模态协同怎么做？ | #6, #25, #27 |
| 长程记忆怎么处理？ | #14, #5, #4 |

---

*本报告由姜妙鱼基于Semantic Scholar搜索结果与领域知识整理*
