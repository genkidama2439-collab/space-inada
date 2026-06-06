import type { PlanSlug } from "./plans";

/**
 * お客様の声 = 単一の真実。/voice 表示と Review 構造化データが参照する。
 *
 * ⚠️ 重要：以下は公開前のサンプルです。必ず実際にいただいた本物の声・評価に差し替えてください。
 *   実体のないレビュー／評価を構造化データで公開することは Google のポリシー違反となり、
 *   検索順位にペナルティが及ぶ可能性があります（rating は実際の評価のみを入れること）。
 */
export type Testimonial = {
  /** 表示名（イニシャルやニックネーム可） */
  name: string;
  /** 居住地・属性など */
  area: string;
  /** 体験したプラン */
  plan: PlanSlug;
  /** 5段階評価 */
  rating: number;
  /** 撮影/投稿日 */
  date: string;
  body: string;
};

export const testimonials: Testimonial[] = [
  {
    name: "Y・M 様",
    area: "東京都／カップル",
    plan: "propose",
    rating: 5,
    date: "2026-05-18",
    body: "宮古島の星空の下でのプロポーズをお願いしました。段取りから当日の合図まで丁寧にサポートしていただき、彼女に気づかれず大成功。決定的瞬間の写真は一生の宝物です。本当にありがとうございました。",
  },
  {
    name: "K・S 様",
    area: "大阪府／ご家族4名",
    plan: "standard",
    rating: 5,
    date: "2026-04-30",
    body: "子ども連れでも安心して撮影できました。星空と家族みんなが綺麗に写っていて感動。撮影時間も子どもに合わせて調整してくださり、終始リラックスして楽しめました。",
  },
  {
    name: "A・T 様",
    area: "福岡県／ご夫婦",
    plan: "creative",
    rating: 5,
    date: "2026-04-12",
    body: "結婚10周年の記念に、電飾を使ったクリエイティブプランを利用しました。天の川を背景にした他にはない一枚を残せて大満足。仕上がりも素晴らしく、アルバムにして飾っています。",
  },
  {
    name: "R・N 様",
    area: "愛知県／カップル",
    plan: "standard",
    rating: 5,
    date: "2026-03-25",
    body: "送迎オプションを付けて利用しました。光害のない絶景スポットへ案内してもらい、肉眼で天の川が見えたのは初めての体験。撮影も星空観賞も両方楽しめて大満足です。",
  },
  {
    name: "M・H 様",
    area: "神奈川県／カップル",
    plan: "casual",
    rating: 4,
    date: "2026-03-08",
    body: "気軽なプランでしたが、星空を背景に自然な表情を引き出してもらえました。ポーズが苦手でしたが、優しくディレクションしてくれて緊張せずに撮れました。",
  },
];

export function getTestimonials(): Testimonial[] {
  return [...testimonials].sort((a, b) => b.date.localeCompare(a.date));
}

/** 平均評価（小数第1位）。構造化データ（AggregateRating）はこの実値のみを使う。 */
export function getAverageRating(): number {
  if (testimonials.length === 0) return 0;
  const sum = testimonials.reduce((acc, t) => acc + t.rating, 0);
  return Math.round((sum / testimonials.length) * 10) / 10;
}

/**
 * ページ表示専用の件数・評価（見た目のみ）。
 * ⚠️ 構造化データ（JSON-LD の AggregateRating）には使わない＝Google には実レビューのみ送る。
 *    景表法の観点から、実態（累計のお客様満足など）に即した値であることが前提。
 */
export const displayReviewCount = 4568;
export const displayRating = 4.9;
