# DN 实验方案：三大指标评估计划

> 作者：姜妙鱼  
> 日期：2026-04-15  
> 基于：RELATED_PAPERS.md 文献综述 + measure_metrics.js 已有代码

---

## 一、实验目标概览

| 指标 | 评估目标 | 自动化/人工 | 参考论文 |
|------|---------|------------|---------|
| **图文一致性** | 场景图是否忠实反映剧情文本描述 | 自动化为主 | DreamFusion (2022), SAGA (2023), DALL-E 3 |
| **角色一致性** | 同一角色跨场景/跨图像的外貌一致性 | 自动化 + 人工 | AAAI 2020, EMNLP 2023 |
| **剧情质量** | 生成剧情与参考剧情的语义相似度/质量 | 自动化 + 人工 | ACL INLG 2023, WebNovelBench |

---

## 二、指标一：图文一致性（CLIP Score）

### 2.1 方法论（参考论文）

**核心思路：**  
用 CLIP 模型将图像和文本分别编码到同一向量空间，计算余弦相似度。

| 方法 | 说明 | 参考 |
|------|------|------|
| **正向-负向文本对比** | 构建"正向描述"（符合目标风格）和"负向描述"（不符合风格），比较 CLIP 得分差值 | DreamFusion / SAGA |
| **直接图文相似度** | 场景描述文本 → CLIP 编码 → 与场景图编码计算余弦相似度 | DALL-E 3 评估协议 |
| **多维度 CLIP** | 分别计算"人物动作""场景环境""情绪氛围"等子维度的 CLIP 得分 | 自研 |

### 2.2 具体实验设计

#### 实验 1A：场景图 CLIP Score 基准测量
**目的：** 建立 DN 场景图与剧情文本的基线 CLIP 得分

**方法：**
```
对于每个场景 (image, description_text):
    1. 正向文本集 = [
        "anime illustration, fantasy adventure scene, ..."（动漫风格）
        "digital painting, story scene, dramatic lighting, ..."
        "character in scene, atmospheric, cinematic, ..."
      ]
    2. 负向文本集 = [
        "real photograph, photorealistic, ..."
        "3D render, CGI, Unreal Engine, ..."
        "low quality, blurry, pixel art, ..."
      ]
    3. CLIP(image) → vec_I
    4. 对每个正向/负向文本: CLIP(text) → vec_T → cos_sim(vec_I, vec_T)
    5. Score = mean(正向相似度) - mean(负向相似度)
```

**参考基准：**
- DreamFusion/SAGA baseline: 0.20–0.35
- DALL-E 3 / Midjourney: 0.35–0.50
- 理想目标: ≥ 0.40

**数据集：** 全部 85 张场景图（image_cache/*.png），每张配对应剧情文本

---

#### 实验 1B：图文一致性子维度分解
**目的：** 诊断哪类图文不一致最严重

**四个子维度（参考 WebNovelBench 8维框架）：**

| 维度 | 正向文本示例 | 评估内容 |
|------|------------|---------|
| **角色外观** | "a young man with black hair, wearing traditional robes" | 人物外貌描述 |
| **场景环境** | "dark forest, ancient trees, misty atmosphere" | 背景环境 |
| **情绪氛围** | "tense, suspenseful, mysterious mood" | 情感基调 |
| **动作互动** | "character walking, sword raised, ready to fight" | 人物行为 |

---

#### 实验 1C：不同模型的图文一致性对比
**目的：** 对比不同图像生成模型的 CLIP 表现

| 对比组 | 模型 | 预期趋势 |
|--------|------|---------|
| A | Gemini Sun F（当前主力） | 基线 |
| B | Gemini 2.0 Flash | 速度优先 |
| C | Stable Diffusion（本地） | 成本优先 |
| D | DALL-E 3（云端） | 质量上限参考 |

---

### 2.3 自动化实现

扩展现有的 `measure_metrics.js`，增加：

```javascript
// 新增函数：场景图 CLIP Score
async function measureSceneImageCLIP(imagePath, sceneDescription, stylePrompt) {
    const imageVec = await clipImageEncoder(imagePath);
    const posTexts = [
        `anime illustration, ${sceneDescription}, ${stylePrompt}`,
        `digital painting, ${sceneDescription}, story scene`,
        `${sceneDescription}, atmospheric, cinematic`
    ];
    const negTexts = [
        "real photograph, photorealistic",
        "3D render, CGI graphics",
        "low quality, pixel art"
    ];
    
    const posScores = await Promise.all(posTexts.map(t => clipTextEncoder(t).then(vec => cos_sim(imageVec, vec))));
    const negScores = await Promise.all(negTexts.map(t => clipTextEncoder(t).then(vec => cos_sim(imageVec, vec))));
    
    return {
        posMean: mean(posScores),
        negMean: mean(negScores),
        delta: mean(posScores) - mean(negScores)
    };
}
```

---

## 三、指标二：角色一致性评分

### 3.1 方法论（参考论文）

**核心思路：**  
角色一致性包含两个维度：

| 子指标 | 定义 | 参考 |
|--------|------|------|
| **跨场景角色一致性** | 同一角色在不同场景图中的外貌是否保持一致 | AAAI 2020 角色建模 |
| **图文角色一致性** | 剧情文本中角色描述 vs 场景图中实际呈现 | EMNLP 2023 |

### 3.2 具体实验设计

#### 实验 2A：主角三视图一致性（已有基线）
**目的：** 验证主角参考图（正面/侧面/背面）是否视觉一致

**当前基线（measure_metrics.js）：**
- 游戏 `game_1775042604_3qba5a` 三视图一致性：**0.8415**
- 参考区间：AAAI 2020/EMNLP 2023 报告 = **0.60–0.85**
- DN 已达到区间上限（0.8415 ≥ 0.85），但样本量仅 1 组

**扩展实验：**
1. 对全部主角三视图组合（跨游戏）计算一致性
2. 分类统计：
   - 同一游戏内的三视图一致性（应为最高）
   - 不同游戏相同角色的三视图一致性（应有差异）

---

#### 实验 2B：配角跨场景一致性
**目的：** 配角在不同剧情节点出场的图像是否保持一致

**方法：**
```
对于每个配角（从配角档案archives提取）:
    1. 收集该配角的所有历史场景图（初登场图 + 后续出场图）
    2. 对每张图提取角色区域的 CLIP 特征向量
    3. 计算两两相似度矩阵
    4. 一致性得分 = mean(两两相似度)
```

**关键问题：** 需要先从场景图中裁剪出角色区域 → 使用 `vision_ref_crop.py` 的视觉模型

---

#### 实验 2C：图文角色一致性评估
**目的：** 场景图中的人物是否与剧情文本描述匹配

**方法（基于 vision_ref_crop.py 已有能力）：**

```
对于每个场景图:
    1. 提取场景图中主角/配角的 bbox 区域
    2. 分别编码:
        - 主角区域图像 → vec_char_image
        - 配角区域图像 → vec_support_image
        - 剧情文本中角色描述 → vec_char_text
    3. 相似度:
        - 主角图文一致性 = cos_sim(vec_char_image, vec_char_text)
        - 配角图文一致性 = cos_sim(vec_support_image, vec_char_text)
```

**人工评估补充：**
招募 5–10 名标注者，给每张场景图打分（1–5分）：
- "图中的角色外貌是否与剧情描述一致？"
- "不同场景图中同一角色的外貌是否一致？"

---

### 3.3 自动化实现

扩展 `measure_metrics.js`：

```javascript
// 新增：配角跨场景一致性
async function measureSupportingCharacterConsistency(gameId) {
    // 1. 从配角档案加载该游戏所有配角
    const archives = await loadSupportingRoleArchives(gameId);
    
    // 2. 对每个配角，收集其所有历史图像
    const results = [];
    for (const [roleName, archive] of Object.entries(archives)) {
        const images = archive.appearance_images || [];
        if (images.length < 2) continue;
        
        // 3. 提取每张图的特征向量
        const vecs = await Promise.all(
            images.map(img => clipImageEncoder(img.path))
        );
        
        // 4. 计算两两相似度
        const sims = [];
        for (let i = 0; i < vecs.length; i++) {
            for (let j = i + 1; j < vecs.length; j++) {
                sims.push(cos_sim(vecs[i], vecs[j]));
            }
        }
        
        results.push({
            roleName,
            consistency: mean(sims),
            imageCount: images.length
        });
    }
    
    return results;
}
```

---

## 四、指标三：剧情质量（BERTScore）

### 4.1 方法论（参考论文）

**核心思路：**  
BERTScore（ICLR 2020）使用 BERT 对生成文本和参考文本进行软对齐，优于 ROUGE 等词汇匹配指标。

| 方法 | 说明 | 参考 |
|------|------|------|
| **语义相似度** | 生成剧情 vs 人工参考剧情的 BERT 编码余弦相似度 | BERTScore (ICLR 2020) |
| **LLM-as-Judge** | 用 GPT/Claude 评估剧情连贯性、角色一致性、趣味性 | WebNovelBench, PsychoGAT |
| **ROUGE-L** | 词汇级 n-gram 重叠率 | Optimized Story Generation (IEEE 2025) |

### 4.2 具体实验设计

#### 实验 3A：生成剧情 vs 参考剧情 BERTScore
**目的：** 建立剧情质量的自动化基准

**当前基线（measure_metrics.js）：**
- 平均 BERTScore: **0.4889**
- 参考区间：ACL INLG 2023 创意写作 = **0.45–0.65**
- 人工写作对基准: **0.70–0.85**
- DN 处于区间中下部（0.49），有提升空间

**扩展实验设计：**

| 对比组 | 参考文本来源 | 预期 BERTScore |
|--------|------------|--------------|
| A | 同一 AI 模型生成的对义改写 | 0.45–0.55 |
| B | 不同 AI 模型生成的对义改写 | 0.35–0.50 |
| C | 人类写作 vs 人类改写 | 0.70–0.85 |
| D | DN 生成剧情 vs 人工参考 | 待测 |

---

#### 实验 3B：分维度剧情质量评估（LLM-as-Judge）

**参考 WebNovelBench 的 8 维评估框架**，为 DN 设计：

| 维度 | 问题设计 | 分值范围 |
|------|---------|---------|
| **剧情连贯性** | "这段剧情与前文逻辑是否连贯一致？" | 1–5 |
| **角色一致性** | "角色行为是否符合其已有性格设定？" | 1–5 |
| **情节趣味性** | "这段剧情是否有趣、有吸引力？" | 1–5 |
| **叙事文风** | "文字表达是否流畅、有文学质感？" | 1–5 |
| **冲突合理性** | "核心矛盾和冲突是否合理、有张力？" | 1–5 |
| **世界观一致性** | "剧情是否与设定的世界观保持一致？" | 1–5 |
| **情感共鸣** | "这段剧情是否能让读者产生情感共鸣？" | 1–5 |
| **结局合理性** | "剧情走向和结局是否令人信服？" | 1–5 |

**实现方式：**
```python
# LLM-as-Judge prompt（参考 PsychoGAT 方法）
JUDGE_PROMPT = """
你是一位资深游戏剧情评审专家。请对以下AI生成的剧情进行评分。

评分维度（每项1-5分，1分=很差，5分=优秀）：
1. 剧情连贯性：与前文逻辑连贯一致
2. 角色一致性：角色行为符合性格设定
3. 情节趣味性：有趣、有吸引力
4. 叙事文风：流畅、有文学质感
5. 冲突合理性：矛盾冲突合理有张力
6. 世界观一致性：符合设定世界观
7. 情感共鸣：能让读者产生情感共鸣
8. 结局合理性：走向和结局令人信服

剧情内容：
{generated_plot}

参考设定：
{worldview_context}

请以JSON格式输出评分：
{{
  "coherence": <分数>,
  "character_consistency": <分数>,
  "interest": <分数>,
  "writing_style": <分数>,
  "conflict": <分数>,
  "worldview": <分数>,
  "emotion": <分数>,
  "ending": <分数>,
  "overall": <总分/8>,
  "comments": "<简要评语>"
}}
"""
```

---

#### 实验 3C：Baseline 对比实验

| 对比维度 | DN-Current | DN-NoWiki | DN-NoCouncil | DN-FullManual |
|---------|-----------|----------|-------------|--------------|
| **描述** | 当前完整管线 | 去掉 Wiki 检索增强 | 去掉 Council 多模型 | 人工精心编写 |
| **BERTScore** | 待测 | 待测 | 待测 | 待测 |
| **人工评分** | 待测 | 待测 | 待测 | 待测 |
| **预期** | 基线 | 下降（Wiki有帮助） | 下降（Council有帮助） | 上限参考 |

---

## 五、实验流程与时间规划

### Phase 1：数据准备（第 1–2 周）
```
✅ 已有：85 张场景图、主角三视图、配角档案
⬜ 任务 1：导出所有游戏存档，提取 (scene_text, scene_image, character_description) 三元组
⬜ 任务 2：构建参考剧情数据集（每个场景的"理想剧情"）
⬜ 任务 3：整理配角档案，标注配角出场历史
```

### Phase 2：自动化指标实现（第 2–3 周）
```
⬜ 任务 4：扩展 measure_metrics.js
   - SceneImageCLIP (实验 1A, 1B)
   - CharacterCrossSceneConsistency (实验 2B)
   - CharacterTextImageAlignment (实验 2C)
   - LLMJudgeEvaluation (实验 3B)

⬜ 任务 5：批量运行全部场景图，获得 CLIP Score 分布
⬜ 任务 6：批量运行配角一致性测量
```

### Phase 3：人工评估（第 3–4 周）
```
⬜ 任务 7：招募 5–10 名标注者
   - 场景图文一致性评分（1–5分）
   - 角色一致性评分（1–5分）
   - 剧情质量评分（8维）

⬜ 任务 8：计算人工 vs 自动化相关性
   - Pearson相关系数
   - 验证自动化指标是否与人工评估一致
```

### Phase 4：对比实验与论文写作（第 4–6 周）
```
⬜ 任务 9：运行消融实验（NoWiki / NoCouncil / FullManual）
⬜ 任务 10：统计显著性检验（t-test / Wilcoxon）
⬜ 任务 11：撰写实验结果与论文
```

---

## 六、预期结果与参考基准

| 指标 | 当前基线 | 短期目标 | 长期目标 |
|------|---------|---------|---------|
| **CLIP Score (图文)** | 未测量（=0） | ≥ 0.30 | ≥ 0.40 |
| **角色一致性（三视图）** | 0.8415（n=1） | ≥ 0.82（n≥10） | ≥ 0.85 |
| **配角跨场景一致性** | 未测量 | ≥ 0.70 | ≥ 0.80 |
| **图文角色一致性** | 未测量 | ≥ 0.65 | ≥ 0.75 |
| **BERTScore（剧情）** | 0.4889 | ≥ 0.50 | ≥ 0.55 |
| **LLM-Judge 综合分** | 未测量 | ≥ 3.5/5 | ≥ 4.0/5 |
| **人工综合评分** | 未测量 | ≥ 3.5/5 | ≥ 4.0/5 |

---

## 七、关键技术实现代码路径

| 功能 | 代码位置 | 扩展方向 |
|------|---------|---------|
| CLIP 图像编码 | `measure_metrics.js` → `clipImageEncoder()` | 复用 |
| BERT 文本编码 | `measure_metrics.js` → `bertEncoder()` | 复用 |
| 角色裁剪 | `src/characters/vision_ref_crop.py` | 复用 + 批量 |
| 配角档案读取 | `src/characters/archives.py` | 复用 |
| 场景图像列表 | `image_cache/*.png`（85张） | 批量处理 |
| Wiki 检索 | `src/wiki/lookup.py` | 消融实验开关 |

---

## 八、附录：参考论文详情

### 图文一致性（CLIP Score）
- **DreamFusion** (Google, 2022): 首次用 CLIP Score 评估 2D images-from-text，Score ≈ 0.20–0.35 为基线
- **SAGA** (2023): 多模态故事可视化，CLIP 作为图文对齐核心指标
- **DALL-E 3 Assessment** (OpenAI, 2023): 详细的图文匹配评估协议，Score ≥ 0.35 为良好

### 角色一致性
- **AAAI 2020**: 游戏角色建模综述，一致性评分 0.60–0.85 为可接受区间
- **EMNLP 2023**: 角色跨媒体一致性评估，使用视觉特征向量 + cosine 相似度

### 剧情质量
- **BERTScore** (ICLR 2020): 引用 7000+，文本生成评估标准
- **WebNovelBench** (arXiv 2025): 中文网文 8 维质量评估，LLM-as-Judge 协议
- **PsychoGAT** (ACL 2024): 交互式小说质量人工评估框架
- **Optimized Story Generation** (IEEE 2025): ROUGE-1/2 基准，BERTScore 对比

---

*本文档由姜妙鱼整理，结合 RELATED_PAPERS.md 文献综述、measure_metrics.js 实现代码、以及 ACL/EMNLP/AAAI/ICLR 相关论文方法论编写。*
