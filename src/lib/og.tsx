import { ImageResponse } from "next/og";
import { siteConfig } from "./seo";

/** OG画像の共通設定とテンプレート（ルート / プラン / 記事で共有） */
export const ogSize = { width: 1200, height: 630 };
export const ogContentType = "image/png";

/**
 * 星空フォトのブランドに合わせたOG画像を生成する。
 * 日本語フォントは next/og の自動フォント取得に依存（ビルド時に解決）。
 */
export function renderOgImage(opts: {
  title: string;
  eyebrow?: string;
  subtitle?: string;
}) {
  const { title, eyebrow = "宮古島 星空フォト", subtitle = siteConfig.name } = opts;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          background:
            "linear-gradient(160deg, #09090b 0%, #1e1b4b 55%, #0f172a 100%)",
          color: "white",
          padding: "80px",
        }}
      >
        <div style={{ fontSize: 32, color: "#fbbf24", marginBottom: 28 }}>
          {eyebrow}
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 68,
            fontWeight: 700,
            lineHeight: 1.25,
            maxWidth: 1040,
          }}
        >
          {title}
        </div>
        <div style={{ fontSize: 30, color: "#a1a1aa", marginTop: 40 }}>
          {subtitle}
        </div>
      </div>
    ),
    { ...ogSize },
  );
}
