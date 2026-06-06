import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/seo";
import { getPlans } from "@/data/plans";
import { getPosts } from "@/data/posts";
import { assertDataIntegrity } from "@/lib/data-integrity";

/**
 * 全URLを動的生成。プラン・記事はデータから自動列挙されるため、
 * ページ追加時に sitemap への手作業は不要。
 *
 * ここはビルド時に必ず実行されるため、データ品質チェックも併せて行う
 * （不整合があればビルドを失敗させる）。
 */
export default function sitemap(): MetadataRoute.Sitemap {
  assertDataIntegrity();

  const base = siteConfig.url;
  const now = new Date();

  const staticPages: MetadataRoute.Sitemap = [
    { url: `${base}/`, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${base}/plans`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/booking`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/gallery`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/voice`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/about`, lastModified: now, changeFrequency: "yearly", priority: 0.6 },
    { url: `${base}/faq`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/access`, lastModified: now, changeFrequency: "yearly", priority: 0.5 },
    { url: `${base}/privacy`, lastModified: now, changeFrequency: "yearly", priority: 0.2 },
    { url: `${base}/legal`, lastModified: now, changeFrequency: "yearly", priority: 0.2 },
    { url: `${base}/blog`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
  ];

  const planPages: MetadataRoute.Sitemap = getPlans().map((p) => ({
    url: `${base}/plans/${p.slug}`,
    lastModified: new Date(p.updatedAt),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const postPages: MetadataRoute.Sitemap = getPosts().map((post) => ({
    url: `${base}/blog/${post.slug}`,
    lastModified: new Date(post.updatedAt),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...staticPages, ...planPages, ...postPages];
}
