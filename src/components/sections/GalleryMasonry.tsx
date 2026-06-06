import { ImageSlot } from "@/components/media/ImageSlot";
import type { ImageAsset } from "@/data/images";

/**
 * 縦・横の写真をそのまま活かすマソンリー（CSS columns）。
 * 各写真は orientation に応じて縦(2:3)／横(3:2)の比率で表示する。
 * - reveal: スクロール表示アニメ（reveal-up）と段差ディレイを付ける（トップの抜粋用）
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
  return (
    <div className={`columns-2 gap-3 sm:columns-3 sm:gap-4 ${className}`}>
      {images.map((img, i) => (
        <figure
          key={img.src ?? i}
          className={`cosmic-panel relative mb-3 w-full break-inside-avoid overflow-hidden rounded-lg sm:mb-4 ${
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
  );
}
