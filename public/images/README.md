# 画像の置き場所

このフォルダに写真を置くと、サイトの各スロットに反映されます。
レイアウト（スペース）はすでに確保済みなので、**ファイルを置いて1行設定するだけ**で実写真に切り替わります。

## 手順
1. 画像をこのフォルダの該当サブフォルダに置く
2. `src/data/images.ts` の該当 `src` のコメントを外す（パスを設定する）
3. 完了（プレースホルダー → 実写真に自動で切り替わる）

## 推奨フォルダ構成と画像サイズ

| 用途 | パス | 推奨サイズ・比率 |
|---|---|---|
| トップのメインビジュアル | `public/images/hero/hero.jpg` | 1920×1080（16:9）以上、横長 |
| プラン写真（slug別） | `public/images/plans/{slug}.jpg` | 1200×900（4:3） |
| ブログ記事カバー（slug別） | `public/images/blog/{slug}.jpg` | 1600×900（16:9） |
| 代表ポートレート | `public/images/about/inada-keiichi.jpg` | 900×1200（3:4 縦長） |
| 撮影風景 | `public/images/about/activity.jpg` | 1200×900 |
| ギャラリー作品 | `public/images/gallery/01.jpg` 〜 | 正方形 or 横長。1200px程度 |

## 補足
- 画像は `next/image` で自動的に WebP 変換・サイズ最適化・遅延読み込みされます。
- 容量削減のため、アップロード前に長辺2000px程度・適度な圧縮を推奨。
- 外部CDN（S3など）に置く場合は `next.config.ts` の `images.remotePatterns` にホストを追加し、
  `images.ts` の `src` を絶対URLにしてください。
- `alt` テキストは `src/data/images.ts` に SEO を意識して記述済みです。
