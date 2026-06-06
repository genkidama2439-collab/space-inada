import type { Plan, PlanSlug } from "./plans";
import type { Post } from "./posts";

/**
 * サイト全体の画像スロットを一元管理する。
 *
 * 【写真を後から入れる手順】
 *  1. 画像ファイルを public/images/... に置く（推奨パスは各定義のコメント参照）
 *  2. 該当スロットの `src` のコメントを外す／パスを設定する
 *  → それだけで自動的にプレースホルダーから実写真へ切り替わる（レイアウトは確保済みなので崩れない）。
 *
 * `src` が未設定のスロットは、テーマに合うプレースホルダーが表示される。
 */
export type ImageAsset = {
  /** /images/... のパス。未設定ならプレースホルダー表示 */
  src?: string;
  /** alt テキスト（SEO・アクセシビリティ用。実写真未設定でも先に用意しておく） */
  alt: string;
};

/* ───────────── トップ ヒーロー ───────────── */
export const heroImage: ImageAsset = {
  // src: "/images/hero/hero.jpg", // 推奨: 横長 1920×1080 以上
  alt: "宮古島の満天の星空と天の川を背景にしたカップルの星空フォト",
};

/* ───────────── プラン（slug別） ───────────── */
// 各プランに写真を「複数枚」設定できる（配列の順番に表示される）。
// 写真が用意できたら該当行のコメントを外す（推奨: 1200×900 程度）。
const PLAN_IMAGE_SRC: Partial<Record<PlanSlug, string[]>> = {
  casual: [
    "/images/plans/standard-33-couple-grass-facing-milkyway.jpg",
    "/images/plans/standard-46-couple-lookup-milkyway-center.jpg",
    "/images/plans/standard-15-couple-grassslope-sitting-milkyway.jpg",
    "/images/plans/standard-29-couple-handhold-grasshill-stars.jpg",
  ],
  standard: [
    "/images/plans/standard-44-couple-facing-handhold-moon.jpg",
    "/images/plans/standard-11-couple-seaside-tetrapod-milkyway.jpg",
    "/images/plans/standard-09-couple-handhold-facing-milkyway.jpg",
    "/images/plans/standard-57-couple-deck-back-milkyway.jpg",
  ],
  family: [
    "/images/plans/family-01-shoulder-ride-milkyway.jpg",
    "/images/plans/family-14-pointing-light-milkyway.jpg",
    "/images/plans/family-09-three-sisters-white-dress.jpg",
    "/images/plans/family-07-grass-sitting-lookup-milkyway.jpg",
  ],
  creative: [
    "/images/plans/creative-03-illumination-proposal-fairylights.jpg",
    "/images/plans/creative-01-illumination-fairylights-couple.jpg",
    "/images/plans/creative-05-illumination-couple-foreheads.jpg",
    "/images/plans/creative-06-illumination-light-up-milkyway.jpg",
  ],
  propose: [
    "/images/plans/propose-07-milkyway-reflection-embrace.jpg",
    "/images/plans/propose-03-milkyway-kneeling-moonrise.jpg",
    "/images/plans/propose-01-milkyway-kneeling-silhouette.jpg",
    "/images/plans/propose-06-milkyway-grassfield-kneeling.jpg",
  ],
};

/** プランの写真をすべて返す（未設定ならプレースホルダー1枚）。 */
export function planImages(plan: Plan): ImageAsset[] {
  const srcs = PLAN_IMAGE_SRC[plan.slug] ?? [];
  if (srcs.length === 0) {
    return [{ alt: `${plan.name}｜宮古島の星空フォト撮影イメージ` }];
  }
  return srcs.map((src, i) => ({
    src,
    alt:
      srcs.length > 1
        ? `${plan.name}｜宮古島の星空フォト撮影イメージ（${i + 1}/${srcs.length}）`
        : `${plan.name}｜宮古島の星空フォト撮影イメージ`,
  }));
}

/** カードのサムネ用に先頭の1枚を返す。 */
export function planImage(plan: Plan): ImageAsset {
  return planImages(plan)[0];
}

/* ───────────── ブログ（slug別カバー） ───────────── */
// 推奨: 横長 1600×900
const POST_IMAGE_SRC: Record<string, string> = {
  // "milky-way-miyakojima": "/images/blog/milky-way.jpg",
};

export function postImage(post: Post): ImageAsset {
  return {
    src: POST_IMAGE_SRC[post.slug],
    alt: post.title,
  };
}

/* ───────────── 動画（撮影の様子） ───────────── */
export type VideoAsset = {
  /** /videos/... のパス。未設定なら表示しない */
  src?: string;
  /** ポスター画像（任意。未設定でも可） */
  poster?: string;
  /** スクリーンリーダー/SEO 用の説明 */
  label: string;
};

export const shootingVideo: VideoAsset = {
  src: "/videos/shooting.mp4",
  // poster: "/images/video-poster.jpg", // 用意できたら設定
  label: "宮古島の星空のもとでの撮影の様子",
};

/* ───────────── About（代表・活動） ───────────── */
export const aboutPortrait: ImageAsset = {
  // src: "/images/about/inada-keiichi.jpg", // 推奨: 縦長 900×1200
  alt: "代表・稲田圭市のポートレート",
};
export const aboutActivity: ImageAsset = {
  // src: "/images/about/activity.jpg",
  alt: "宮古島の星空のもとで撮影する様子",
};

/* ───────────── ギャラリー（作品集 / 画像検索狙い） ───────────── */
// 写真を追加するときは src を設定（alt は検索キーワードを意識して記述済み）。
export const galleryImages: ImageAsset[] = [
  { src: "/images/gallery/standard-30-milkyway-landscape-nopeople.jpg", alt: "宮古島の天の川と星空フォト" },
  { src: "/images/plans/propose-07-milkyway-reflection-embrace.jpg", alt: "宮古島でプロポーズ撮影をするカップルの星空フォト" },
  { src: "/images/plans/family-01-shoulder-ride-milkyway.jpg", alt: "宮古島の星空を背景にした家族写真" },
  { src: "/images/plans/standard-44-couple-facing-handhold-moon.jpg", alt: "宮古島の記念日カップルフォト" },
  { src: "/images/gallery/standard-39-man-beach-milkyway-sea.jpg", alt: "宮古島のビーチで撮影した星空ポートレート" },
  { src: "/images/gallery/standard-49-woman-beach-reach-milkyway.jpg", alt: "宮古島の夜空に広がる満天の星" },
  { src: "/images/plans/standard-57-couple-deck-back-milkyway.jpg", alt: "宮古島ロケーション撮影の星空ツアーの一枚" },
  { src: "/images/plans/creative-06-illumination-light-up-milkyway.jpg", alt: "宮古島の星空と光跡を活かしたクリエイティブフォト" },
  { src: "/images/plans/standard-33-couple-grass-facing-milkyway.jpg", alt: "宮古島でカジュアルプランのカップル星空フォト" },
];
