import Link from "next/link";
import type { ReactNode } from "react";

/**
 * セクション見出し（h2）＋任意の「すべて見る →」リンク。
 * トップページの各セクションで共通利用する。
 * - subtitle: 見出し下の補足（例：評価の平均点）
 * - href を渡すと右側にリンクを表示する
 */
export function SectionHeading({
  title,
  href,
  linkLabel = "すべて見る →",
  subtitle,
  reveal = false,
}: {
  title: string;
  href?: string;
  linkLabel?: string;
  subtitle?: ReactNode;
  reveal?: boolean;
}) {
  return (
    <div
      className={`flex items-end justify-between gap-4${reveal ? " reveal-up" : ""}`}
    >
      <div>
        <h2 className="cosmic-title text-2xl font-bold sm:text-3xl">{title}</h2>
        {subtitle && (
          <p className="mt-2 text-sm text-amber-200">{subtitle}</p>
        )}
      </div>
      {href && (
        <Link href={href} className="cosmic-link text-sm">
          {linkLabel}
        </Link>
      )}
    </div>
  );
}
