/**
 * measure_metrics.js
 * 测量三项指标：CLIP Score、角色一致性、BERTScore
 * 使用 @xenova/transformers (ONNX runtime, CPU only)
 */

const { pipeline, cos_sim } = require('@xenova/transformers');
const path = require('path');
const fs = require('fs');
const pkg = require(path.join(__dirname, '..', '..', 'node_modules', '@xenova', 'transformers', 'package.json'));

// ---- 路径配置 ----
const ROOT_DIR = path.resolve(__dirname, '..', '..');
const IMAGE_CACHE_DIR = path.join(ROOT_DIR, 'image_cache');
const INITIAL_DIR = path.join(__dirname, '..', '..', 'initial');
const OUTPUT_FILE = path.join(ROOT_DIR, 'docs', 'METRICS_RESULTS.md');

console.log('Root dir:', ROOT_DIR);
console.log('Image cache:', IMAGE_CACHE_DIR);

// ---- 辅助函数 ----
function getImageFiles(dir) {
    const files = [];
    if (!fs.existsSync(dir)) return files;
    try {
        for (const f of fs.readdirSync(dir)) {
            if (/\.(png|jpg|jpeg)$/i.test(f)) {
                files.push(path.join(dir, f));
            }
        }
    } catch (e) {
        console.warn('Cannot read dir:', dir, e.message);
    }
    return files;
}

const cachedImages = getImageFiles(IMAGE_CACHE_DIR);
console.log('Found ' + cachedImages.length + ' images in image_cache');

// ---- 关键修复：统一提取向量 ----
// image-feature-extraction / feature-extraction 返回可能是：
//   { data: Float32Array, dims: [...] }  ← xenova/transformers Tensor 对象
//   或已经是普通数组/TypedArray
// 统一返回普通 JS 数组（cos_sim 需要）
function toArray(vec) {
    if (vec === null || vec === undefined) return null;
    if (typeof vec === 'number') return [vec];
    if (Array.isArray(vec)) return vec;

    // xenova/transformers Tensor-like 对象
    if (vec && typeof vec === 'object') {
        // 有 .data 属性（Tensor）
        if (vec.data && typeof vec.data.toArray === 'function') {
            // .toArray() 返回普通数组
            return vec.data.toArray();
        }
        if (vec.data && typeof vec.data === 'object' && !Array.isArray(vec.data)) {
            // 已经是 TypedArray / ArrayBufferView
            return Array.from(vec.data);
        }
        if (Array.isArray(vec.data)) return vec.data;
        if (typeof vec.data === 'number') return [vec.data];

        // 没有 .data，直接是普通数组或 TypedArray
        if (vec.length !== undefined) return Array.from(vec);
    }
    return [vec];
}

// 统一 cos_sim 调用：自动转数组
function cosineSimilarity(a, b) {
    const va = toArray(a);
    const vb = toArray(b);
    if (!va || !vb) return 0;
    return cos_sim(va, vb);
}

// ---- 主函数 ----
async function main() {
    const results = {
        clipScores: [],
        bertScores: [],
        characterConsistency: [],
    };

    // 1. 加载模型
    console.log('\n[1] Loading CLIP image encoder...');
