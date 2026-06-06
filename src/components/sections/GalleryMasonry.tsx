import { ImageSlot } from "@/components/media/ImageSlot";
import type { ImageAsset } from "@/data/images";

/**
 * 縦・横の写真をそのまま活かすマソンリー（2列）。
 *
 * CSS の `columns` は列の高さを揃える balance 挙動で大きな空白ができるため、
 * ここでは画像を「低い方の列」へ貪欲に振り分けて両列の高さを揃える方式にする。
 * これで縦横比を保ったまま、不自然な空白なくタイルが詰まる。
 *
 * - reveal: スクロール表示アニメ（reveal-up）と段差ディレイ（トップの抜粋用）
 * - priorityCount: 先頭から何枚を priority 読み込みにするか（LCP対策）
 */
export function GalleryMasonry({
  images,
  className = "",
  reveal = false,
  priorityCount = 0,
}: {
  images: ImageAsset[];
  className?: string;
  reveal?: boolean;
  priorityCount?: number;
}) {
  // 高さの重み（縦=1.5 / 横=0.67）で、その時点で低い列へ追加していく。
  const columns: { img: ImageAsset; i: number }[][] = [[], []];
  const heights = [0, 0];
  images.forEach((img, i) => {
    const target = heights[0] <= heights[1] ? 0 : 1;
    columns[target].push({ img, i });
    heights[target] += img.orientation === "portrait" ? 1.5 : 0.67;
  });

  return (
    <div className={`flex gap-3 sm:gap-4 ${className}`}>
      {columns.map((col, ci) => (
        <div key={ci} className="flex w-1/2 flex-col gap-3 sm:gap-4">
          {col.map(({ img, i }) => (
            <figure
              key={img.src ?? i}
              className={`cosmic-panel relative w-full overflow-hidden rounded-lg ${
                img.orientation === "portrait" ? "aspect-[2/3]" : "aspect-[3/2]"
              }${reveal ? ` reveal-up ${i % 3 === 1 ? "delay-100" : i % 3 === 2 ? "delay-200" : ""}` : ""}`}
            >
              <ImageSlot
                asset={img}
                sizes="(max-width: 640px) 50vw, 33vw"
                priority={i < priorityCount}
              />
            </figure>
          ))}
        </div>
      ))}
    </div>
  );
}
