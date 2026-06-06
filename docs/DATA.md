# データの追加・管理

プラン・記事・お客様の声・画像は、すべて `src/data/` の型付きデータで一元管理しています。
データを足すだけで、一覧・詳細ページ・sitemap・内部リンク・OG画像に自動反映されます。

| 種類 | ファイル | 反映先 |
|---|---|---|
| プラン | `src/data/plans.ts` | `/plans`, `/plans/[plan]`, 比較表, sitemap, 関連リンク, OG |
| ブログ記事 | `src/data/posts.ts` | `/blog`, `/blog/[slug]`, sitemap, 関連記事, OG |
| お客様の声 | `src/data/testimonials.ts` | `/voice`, トップ抜粋, レビュー構造化 |
| 画像スロット | `src/data/images.ts` | Hero/プラン/記事/About/ギャラリー |
| FAQ | `src/data/faqs.ts` | `/faq`, FAQ構造化データ |

## 記事を1本追加する例
`src/data/posts.ts` の `posts` 配列に要素を1つ追加するだけ。
slug・タイトル・本文（型付きブロック）・関連プラン・SEO を埋めれば、ページもsitemapも自動生成されます。

## データ品質の自動チェック（重要）

`npm run build` を実行すると、ビルドの一部として **データ整合性が自動検証** されます
（`src/lib/data-integrity.ts`、sitemap生成時に実行）。次のような問題があるとビルドが失敗し、
原因が表示されます：

- slug の重複 / URLに使えない形式
- 必須フィールド（name / title / seo.title / seo.description / excerpt など）の欠落
- `relatedPlans` やお客様の声の `plan` が存在しないプランを参照（参照切れ）
- 日付（publishedAt / updatedAt / date）の形式不正
- rating が 1〜5 の範囲外
- ギャラリー画像の alt 欠落
- HowTo ステップの欠落

例：
```
Error: データ整合性チェックに失敗しました（1件）:
  - posts/milky-way-miyakojima: slug が重複しています
```

このため、記事やプランを増やしてもデータの不整合に気づかず公開してしまう事故を防げます。
（テストフレームワーク等の追加依存は不要です。）
