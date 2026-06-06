import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { Section } from "@/components/ui/Section";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { CtaBooking } from "@/components/sections/CtaBooking";
import { ImageSlot } from "@/components/media/ImageSlot";
import { galleryImages } from "@/data/images";

export const metadata: Metadata = buildMetadata({
  title: "撮影ギャラリー｜宮古島の星空フォト作品",
  description:
    "宮古島の星空フォト撮影ギャラリー。天の川・プロポーズ・カップル・家族写真など、実際の撮影作品をご紹介します。",
  path: "/gallery",
});

export default function GalleryPage() {
  return (
    <Section>
      <Breadcrumbs items={[{ name: "撮影ギャラリー", path: "/gallery" }]} />

      <h1 className="cosmic-title mt-6 text-3xl font-bold sm:text-4xl">
        撮影ギャラリー
      </h1>
      <p className="mt-4 max-w-2xl text-sm leading-relaxed text-zinc-400">
        宮古島の星空のもとで撮影した作品の数々。天の川を背景にしたカップルフォト、
        プロポーズの瞬間、家族の笑顔——ここでしか残せない一枚をご覧ください。
      </p>

      {/* 縦・横をそのまま活かすマソンリー（CSS columns）。各写真は元の向きの比率で表示 */}
      <div className="mt-12 columns-2 gap-3 sm:columns-3 sm:gap-4">
        {galleryImages.map((img, i) => (
          <figure
            key={i}
            className={`cosmic-panel relative mb-3 w-full break-inside-avoid overflow-hidden rounded-lg sm:mb-4 ${
              img.orientation === "portrait" ? "aspect-[2/3]" : "aspect-[3/2]"
            }`}
          >
            <ImageSlot
              asset={img}
              sizes="(max-width: 640px) 50vw, 33vw"
              priority={i < 3}
            />
          </figure>
        ))}
      </div>

      <div className="mt-20">
        <CtaBooking heading="あなたの一枚も、宮古島の星空で残しませんか" />
      </div>
    </Section>
  );
}
