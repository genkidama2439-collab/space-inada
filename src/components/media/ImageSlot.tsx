import Image from "next/image";
import type { ImageAsset } from "@/data/images";

/**
 * 画像スロット。親要素は `relative`＋サイズ/アスペクト＋`overflow-hidden` を指定すること。
 * - asset.src あり → next/image（fill / object-cover）で表示
 * - asset.src なし → テーマに合うプレースホルダー（レイアウトは確保済みなのでCLSなし）
 */
export function ImageSlot({
  asset,
  sizes = "100vw",
  priority = false,
  className = "",
}: {
  asset: ImageAsset;
  sizes?: string;
  priority?: boolean;
  className?: string;
  /** プレースホルダーに表示する小さなラベル */
  label?: string;
}) {
  if (asset.src) {
    return (
      <Image
        src={asset.src}
        alt={asset.alt}
        fill
        sizes={sizes}
        priority={priority}
        className={`object-cover ${className}`}
      />
    );
  }

  return (
    <div
      aria-hidden
      className={`cosmic-image-placeholder flex h-full w-full items-center justify-center ${className}`}
    >
      <span className="relative z-10 block h-12 w-12 rotate-[-18deg] border-y border-teal-200/35" />
    </div>
  );
}
