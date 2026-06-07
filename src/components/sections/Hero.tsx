import Link from "next/link";

// 24px の極小ぼかし（LQIP）。最初の1フレームからシャトルのぼかしを描画し、
// 「青いグラデーション → 画像がパッと出る」初回ちらつきを防ぐ。インラインなので追加リクエスト不要。
const HERO_LQIP =
  "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAASABIAAD/4QCMRXhpZgAATU0AKgAAAAgABQESAAMAAAABAAEAAAEaAAUAAAABAAAASgEbAAUAAAABAAAAUgEoAAMAAAABAAIAAIdpAAQAAAABAAAAWgAAAAAAAABIAAAAAQAAAEgAAAABAAOgAQADAAAAAQABAACgAgAEAAAAAQAAABigAwAEAAAAAQAAAA0AAAAA/8AAEQgADQAYAwEiAAIRAQMRAf/EAB8AAAEFAQEBAQEBAAAAAAAAAAABAgMEBQYHCAkKC//EALUQAAIBAwMCBAMFBQQEAAABfQECAwAEEQUSITFBBhNRYQcicRQygZGhCCNCscEVUtHwJDNicoIJChYXGBkaJSYnKCkqNDU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6g4SFhoeIiYqSk5SVlpeYmZqio6Slpqeoqaqys7S1tre4ubrCw8TFxsfIycrS09TV1tfY2drh4uPk5ebn6Onq8fLz9PX29/j5+v/EAB8BAAMBAQEBAQEBAQEAAAAAAAABAgMEBQYHCAkKC//EALURAAIBAgQEAwQHBQQEAAECdwABAgMRBAUhMQYSQVEHYXETIjKBCBRCkaGxwQkjM1LwFWJy0QoWJDThJfEXGBkaJicoKSo1Njc4OTpDREVGR0hJSlNUVVZXWFlaY2RlZmdoaWpzdHV2d3h5eoKDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uLj5OXm5+jp6vLz9PX29/j5+v/bAEMAAgICAgICAwICAwUDAwMFBgUFBQUGCAYGBgYGCAoICAgICAgKCgoKCgoKCgwMDAwMDA4ODg4ODw8PDw8PDw8PD//bAEMBAgICBAQEBwQEBxALCQsQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEP/dAAQAAv/aAAwDAQACEQMRAD8A/Ijwf4D1b+09Pae1eSDUQ3ktGN3mhThguO+eK+l7/wDY78YTfBa3+J9npjrCkkrzyMDvZC+xAsQBO1cdf7xPavLPg14w1nQNRc28pf7GiyW4blY5QwZXwc9DzjjNffmkfth/EQeHI7WS3heC3tzO6ZwJJHlwSRtwBg8AD0NeHnXE+YUuWjh6UWk976tvZWey/U+2yTg/AV4uvUqtSa2eyS3aa3d9vI/JW58B+IP7QudMWwkW4tQxlRlIMYXruz0/GqP/AAguv/8APqfzFfUnxV+JGp6hd3txp1umnR3xaSZVO9pC/PzuQC2D0zXgH/CUav8A89P0r1qONr1YRnKKi2tVvqePi8uwdGpKmpykk97JH//Z";

/**
 * トップページのファーストビュー。
 * 宮古島の星空写真を背景に、暗めのグラデーションを重ねて文字を読みやすくする
 * 静的なヒーロー（クライアントJS不要のサーバーコンポーネント）。
 */
export function Hero() {
  return (
    <section className="relative -mt-28 flex min-h-[100svh] items-center justify-center overflow-hidden bg-[#050a1c] pt-28 md:mt-0 md:pt-0">
      {/* 即時表示の LQIP（本画像ロード前のちらつき防止）。bg-cover で全面に敷く。 */}
      <div
        aria-hidden
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url("${HERO_LQIP}")` }}
      />

      {/* 本画像：PC（md以上）＝横長 / スマホ＝縦長 を picture で出し分け。
          表示される1枚だけをDLし（二重取得を回避）、誤った向きの一瞬表示も起きない。
          fetchPriority=high で LCP を優先読み込み。 */}
      <picture>
        <source
          media="(min-width: 768px)"
          srcSet="/images/hero/hero-shuttle-desktop.jpg"
        />
        <img
          src="/images/hero/hero-shuttle-mobile.jpg"
          alt="星空へ打ち上がるスペースシャトル｜スペースイナダ"
          fetchPriority="high"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover"
        />
      </picture>

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

      {/* 星空が旋律のようにつながる、軽量なCSS/SVGアニメーション */}
      <div aria-hidden className="cosmic-aurora-stage">
        <span className="cosmic-aurora cosmic-aurora-one" />
        <span className="cosmic-aurora cosmic-aurora-two" />
      </div>
      <div aria-hidden className="cosmic-orbit-map" />
      <div aria-hidden className="cosmic-viewfinder">
        <span className="cosmic-viewfinder-corner cosmic-viewfinder-tl" />
        <span className="cosmic-viewfinder-corner cosmic-viewfinder-tr" />
        <span className="cosmic-viewfinder-corner cosmic-viewfinder-bl" />
        <span className="cosmic-viewfinder-corner cosmic-viewfinder-br" />
        <span className="cosmic-focus-ring" />
        <span className="cosmic-focus-dot" />
      </div>
      <svg
        aria-hidden
        className="cosmic-score"
        viewBox="0 0 1000 420"
        preserveAspectRatio="none"
      >
        <path
          className="cosmic-score-line cosmic-score-line-one"
          d="M-40 310 C120 250 175 110 330 165 S540 350 710 210 S900 85 1040 145"
          pathLength="1"
        />
        <path
          className="cosmic-score-line cosmic-score-line-two"
          d="M-20 365 C150 335 225 205 390 250 S620 390 785 285 S930 205 1030 245"
          pathLength="1"
        />
        <g className="cosmic-score-notes">
          <circle className="cosmic-score-note note-one" cx="170" cy="205" r="4" />
          <circle className="cosmic-score-note note-two" cx="330" cy="165" r="5" />
          <circle className="cosmic-score-note note-three" cx="535" cy="290" r="4" />
          <circle className="cosmic-score-note note-four" cx="710" cy="210" r="5" />
          <circle className="cosmic-score-note note-five" cx="885" cy="110" r="4" />
        </g>
      </svg>
      <span aria-hidden className="cosmic-meteor cosmic-meteor-one" />
      <span aria-hidden className="cosmic-meteor cosmic-meteor-two" />
      <span aria-hidden className="cosmic-meteor cosmic-meteor-three" />

      {/* コピー＋CTA */}
      <div className="relative z-10 mx-auto max-w-4xl px-5 text-center">
        <p className="text-sm font-semibold tracking-[0.4em] text-amber-200 drop-shadow-[0_0_18px_rgba(251,191,36,0.5)] sm:text-base">
          SPACE INADA
        </p>
        <h1 className="mt-5 whitespace-nowrap text-[2.6rem] font-black tracking-wide text-white drop-shadow-[0_2px_36px_rgba(4,8,28,0.7)] sm:text-7xl lg:text-8xl">
          スペースイナダ
        </h1>

        <p className="mx-auto mt-8 max-w-2xl text-lg font-semibold leading-relaxed text-white drop-shadow-[0_2px_24px_rgba(4,8,28,0.75)] sm:text-2xl">
          星は、記憶を照らす。
        </p>
        <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-slate-200 drop-shadow-[0_1px_18px_rgba(4,8,28,0.75)] sm:text-base">
          宮古島の静かな夜、満天の星、天の川。
          大切な人との時間を、忘れられない一枚に。
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
