import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // AVIF を優先し、非対応ブラウザは WebP にフォールバック。
    // Next の既定は WebP のみで AVIF が効かないため明示する（Core Web Vitals 対策）。
    formats: ["image/avif", "image/webp"],
    // 端末幅に合わせた srcset。星空写真は重いので無駄な大判DLを避ける。
    deviceSizes: [360, 414, 768, 1024, 1280, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    // 最適化画像のキャッシュ保持（1年）。画像はローカルのみのため remotePatterns は不要。
    minimumCacheTTL: 31536000,
  },
};

export default nextConfig;
