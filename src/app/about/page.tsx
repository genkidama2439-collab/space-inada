import type { Metadata } from "next";
import { buildMetadata, siteConfig } from "@/lib/seo";
import { Section } from "@/components/ui/Section";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { CtaBooking } from "@/components/sections/CtaBooking";
import { JsonLd } from "@/components/seo/JsonLd";
import { personJsonLd } from "@/lib/jsonld";
import { ImageSlot } from "@/components/media/ImageSlot";
import { VideoPlayer } from "@/components/media/VideoPlayer";
import { aboutPortrait, aboutActivity, shootingVideo } from "@/data/images";

export const metadata: Metadata = buildMetadata({
  title: "私たちについて｜代表 稲田圭市のストーリー",
  description:
    "宮古島で星空フォトを手がける代表・稲田圭市のストーリー。撮影への想いと、宮古島の星空を守る活動についてご紹介します。",
  path: "/about",
});

export default function AboutPage() {
  return (
    <Section>
      <JsonLd data={personJsonLd()} />
      <Breadcrumbs items={[{ name: "私たちについて", path: "/about" }]} />

      <h1 className="cosmic-title mt-6 text-3xl font-bold sm:text-4xl">
        宮古島の星空を、人生の記念に
      </h1>

      <div className="mt-10 space-y-12">
        <section className="grid gap-8 sm:grid-cols-[2fr_3fr] sm:items-start">
          <div className="cosmic-panel relative aspect-[3/4] w-full overflow-hidden rounded-lg">
            <ImageSlot
              asset={aboutPortrait}
              sizes="(max-width: 640px) 100vw, 40vw"
              label="Portrait"
            />
          </div>
          <div>
          <h2 className="text-2xl font-bold text-teal-100">代表・{siteConfig.author.name}</h2>
          <p className="mt-4 leading-relaxed text-zinc-300">
            宮古島で星空フォトを撮り続けてきたフォトグラファーです。都会では決して見られない
            満天の星空、そして肉眼で見える天の川。この島の夜空に出会ったとき、
            「この感動を、人生の大切な瞬間とともに残したい」と強く思いました。
          </p>
          <p className="mt-4 leading-relaxed text-zinc-300">
            記念日、プロポーズ、家族旅行——お客様一人ひとりの物語に寄り添い、
            星空の下でしか生まれない自然な表情を大切に撮影しています。
          </p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-teal-100">撮影への想い</h2>
          <p className="mt-4 leading-relaxed text-zinc-300">
            星空フォトは技術だけでは成り立ちません。天候を読み、月齢を計算し、
            その日その時間にしか撮れない一枚を狙います。さらに、緊張せず自然体でいられる
            空気づくりも大切にしています。写真を見返すたびに、宮古島の夜の感動が
            よみがえる——そんな一枚をお届けします。
          </p>
          {shootingVideo.src && (
            <div className="cosmic-panel mt-6 overflow-hidden rounded-lg bg-black">
              <VideoPlayer video={shootingVideo} autoPlay={false} />
            </div>
          )}
        </section>

        <section>
          <div className="cosmic-panel relative mb-6 aspect-[16/9] w-full overflow-hidden rounded-lg">
            <ImageSlot
              asset={aboutActivity}
              sizes="(max-width: 768px) 100vw, 768px"
            />
          </div>
          <h2 className="text-2xl font-bold text-teal-100">宮古島の星空を守る活動</h2>
          <p className="mt-4 leading-relaxed text-zinc-300">
            美しい星空は、光害の少ない自然環境があってこそ。撮影地のマナーを守り、
            ゴミを残さず、地域の自然と共生する撮影を心がけています。
            この島の星空を次の世代にも残せるよう、私たちにできることを続けていきます。
          </p>
        </section>
      </div>

      <div className="mt-20">
        <CtaBooking />
      </div>
    </Section>
  );
}
