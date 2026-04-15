# 指标测量结果

> 测量时间: 2026-04-13T11:45:56.031Z
> 模型: Xenova/clip-vit-base-patch32 (CLIP), Xenova/all-MiniLM-L6-v2 (BERT)
> 环境: Node.js v24.11.1, @xenova/transformers 2.17.2

---

## 汇总

| 指标 | 平均值 | 说明 |
|------|--------|------|
| **CLIP Score（图文一致性）** | **N/A** | 图像 vs 正向风格文本的余弦相似度 |
| **CLIP Delta（风格偏好）** | **N/A** | 正向文本得分 - 负向文本得分，越大越符合目标风格 |
| **角色一致性（三视图）** | **0.8415** | 主角正面/侧面/背面三视图两两相似度均值 |
| **BERTScore（剧情质量）** | **0.4889** | 剧情文本对的语义相似度 |

---

## 1. CLIP Score（图文一致性）

**测量方法**:
- 使用 image-feature-extraction + feature-extraction 管道（Xenova/clip-vit-base-patch32）
- 分别编码图像与文本描述，计算余弦相似度
- 正样本: "anime illustration, fantasy adventure scene..." 等3条
- 负样本: "real photograph, 3D render..." 等3条
- Delta = mean(正样本相似度) - mean(负样本相似度)

**样本数**: 0 张场景图

| 图像 | 正向得分 | 负向得分 | Delta |
|------|---------|---------|-------|
|_暂无场景图片数据_|
**平均值**: 正向得分 = **N/A**, Delta = **N/A**

---

## 2. 角色一致性评分

**测量方法**:
- 提取主角三视图（正面、侧面/背面）的视觉特征向量
- 使用 CLIP image-feature-extraction 编码
- 计算两两之间的余弦相似度，取均值

**样本数**: 1 组主角三视图

| 游戏ID | 正面-背面 | 正面-侧面 | 背面-侧面 | 平均 |
|--------|----------|----------|----------|------|
| game_1775042604_3qba5a | 0.8138 | 0.7979 | 0.913 | **0.8415** |
**平均值**: **0.8415**

---

## 3. 剧情质量 BERTScore

**测量方法**:
- 使用 feature-extraction 管道（Xenova/all-MiniLM-L6-v2）编码英文剧情文本
- 计算同义改写文本对之间的余弦相似度

| 文本对 | BERTScore |
|--------|-----------|
| "The hero entered the dark forest, heart pounding with f..." vs "Walking deeper into the shadowy woods, the protagonist ..." | **0.5126** |
| "She discovered a hidden cave behind the waterfall." vs "Behind the cascading water lay a mysterious cavern wait..." | **0.5663** |
| "The dragon guarded its treasure jealously on the mounta..." vs "High upon the mountain, the wyrm kept watch over its gl..." | **0.4932** |
| "The merchant offered mysterious potions at the crossroa..." vs "At the intersection of two dusty roads, a vendor displa..." | **0.4101** |
| "The knight vowed to protect the innocent village from t..." vs "Vowing to defend the helpless hamlet, the warrior prepa..." | **0.5288** |
| "A sudden storm forced the travelers to seek shelter in ..." vs "The rain came without warning, driving them to take ref..." | **0.4681** |
| "The ancient map revealed a path no one had walked for c..." vs "Faded ink on yellowed parchment showed a route long for..." | **0.3711** |
| "Fireflies guided the lost child back to the village at ..." vs "In the glow of countless tiny lights, the child found t..." | **0.5608** |
**平均 BERTScore**: **0.4889**

---

## 指标参考基准

| 指标 | 范围 | 参考基准 |
|------|------|---------|
| CLIP Score | -1~1（越高越好） | DreamFusion/SAGA = 0.20-0.35; DALL-E 3/Midjourney = 0.35-0.50 |
| 角色一致性 | 0~1（越高越好） | AAAI2020/EMNLP2023 游戏角色报告 = 0.60-0.85 |
| BERTScore | 0~1（越高越好） | ACL/INLG 2023 创意写作 = 0.45-0.65; 人工写作对 = 0.70-0.85 |

---

*由 measure_metrics.js 自动生成 · 2026/4/13 19:45:56*