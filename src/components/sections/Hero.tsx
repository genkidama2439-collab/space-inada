import Image from "next/image";
import Link from "next/link";

const HERO_IMAGE = "/images/miyakojima-starry-sky-hero.png";

/**
 * トップページのファーストビュー。
 * 宮古島の星空写真を背景に、暗めのグラデーションを重ねて文字を読みやすくする
 * 静的なヒーロー（クライアントJS不要のサーバーコンポーネント）。
 */
export function Hero() {
  return (
    <section className="relative -mt-16 flex min-h-[100svh] items-center justify-center overflow-hidden bg-[#050a1c] pt-16 md:mt-0 md:pt-0">
      {/* 画像が未配置でも崩れないよう、背景に星空調のグラデーションを敷く */}
      <div
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(circle_at_50%_18%,rgba(56,128,210,0.35),transparent_42%),linear-gradient(180deg,#0a1733_0%,#070d22_48%,#04060f_100%)]"
      />
      <div
        aria-hidden
        className="absolute inset-0 opacity-70 [background-image:radial-gradient(circle,rgba(255,255,255,0.7)_0_1px,transparent_1.8px),radial-gradient(circle,rgba(165,243,252,0.4)_0_1px,transparent_1.6px)] [background-position:24px_44px,120px_150px] [background-size:200px_200px,300px_300px]"
      />

      {/* メインの星空写真（LCP対象。next/image で最適化＋object-cover） */}
      <Image
        src={HERO_IMAGE}
        alt="宮古島の満天の星空と天の川｜スペースイナダの星空フォト"
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />

      {/* 文字を読みやすくする暗めのグラデーション（上＝ヘッダー、下＝コピー/次セクション接続） */}
      <div
        aria-hidden
        className="absolute inset-0 bg-[linear-gradient(180deg,rgba(3,6,20,0.62)_0%,rgba(3,6,20,0.14)_26%,rgba(3,6,20,0.5)_62%,rgba(5,8,20,0.95)_100%)]"
      />
      {/* シネマティックなビネットで高級感を出す */}
      <div
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(120%_90%_at_50%_38%,transparent_44%,rgba(2,4,14,0.6)_100%)]"
      />

      {/* コピー＋CTA */}
      <div className="relative z-10 mx-auto max-w-4xl px-5 text-center">
        <p className="text-sm font-semibold tracking-[0.4em] text-amber-200 drop-shadow-[0_0_18px_rgba(251,191,36,0.5)] sm:text-base">
          SPACE INADA
        </p>
        <h1 className="mt-5 whitespace-nowrap text-[2.6rem] font-black tracking-wide text-white drop-shadow-[0_2px_36px_rgba(4,8,28,0.7)] sm:text-7xl lg:text-8xl">
          スペースイナダ
        </h1>

        <p className="mx-auto mt-8 max-w-2xl text-lg font-semibold leading-relaxed text-white drop-shadow-[0_2px_24px_rgba(4,8,28,0.75)] sm:text-2xl">
          宮古島の夜空へ、記念日を打ち上げる。
        </p>
        <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-slate-200 drop-shadow-[0_1px_18px_rgba(4,8,28,0.75)] sm:text-base">
          天の川まで肉眼で見える宮古島の星空を背景に、旅の一瞬を忘れられない一枚へ。
          星空フォトの撮影プランをご相談ください。
        </p>

        <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/booking"
            className="inline-flex h-12 items-center justify-center rounded-lg border border-amber-200/70 bg-amber-300 px-7 text-sm font-bold text-zinc-950 shadow-lg shadow-amber-300/20 transition-colors hover:bg-teal-200"
          >
            予約・相談する
          </Link>
          <Link
            href="/plans"
            className="inline-flex h-12 items-center justify-center rounded-lg border border-teal-200/40 bg-slate-950/45 px-7 text-sm font-semibold text-white backdrop-blur transition-colors hover:border-amber-200/70 hover:text-amber-100"
          >
            撮影プランを見る
          </Link>
        </div>
      </div>

      {/* 次セクション（#050814）へ自然につなぐ最下部のフェード */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-[linear-gradient(180deg,transparent_0%,#050814_100%)]"
      />
    </section>
  );
}
