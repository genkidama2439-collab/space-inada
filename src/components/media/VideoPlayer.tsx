import type { VideoAsset } from "@/data/images";

/**
 * 動画プレーヤー。縦・横どちらの動画でも崩れないよう、
 * 黒背景の枠の中で object-contain（max-h制限）で表示する。
 * ミュート自動再生＋ループ（ブラウザの自動再生制限を回避）＋controlsで操作可。
 */
export function VideoPlayer({
  video,
  className = "",
  autoPlay = true,
}: {
  video: VideoAsset;
  className?: string;
  autoPlay?: boolean;
}) {
  if (!video.src) return null;

  return (
    <video
      className={`mx-auto max-h-[70vh] w-full bg-black object-contain ${className}`}
      controls
      muted
      loop
      autoPlay={autoPlay}
      playsInline
      preload="metadata"
      poster={video.poster}
      aria-label={video.label}
    >
      <source src={video.src} type="video/mp4" />
      お使いのブラウザは動画の再生に対応していません。
    </video>
  );
}
