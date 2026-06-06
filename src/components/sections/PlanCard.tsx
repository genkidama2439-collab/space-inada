import Link from "next/link";
import { planPriceLabel, type Plan } from "@/data/plans";
import { ImageSlot } from "@/components/media/ImageSlot";
import { planImages } from "@/data/images";

export function PlanCard({ plan }: { plan: Plan }) {
  const images = planImages(plan);
  const photoCount = images.filter((img) => img.src).length;
  const durationLabel = plan.durationMin ? `約${plan.durationMin}分` : "応相談";

  return (
    <Link
      href={`/plans/${plan.slug}`}
      className="cosmic-panel cosmic-panel-hover group flex h-full flex-col overflow-hidden rounded-2xl"
    >
      <div className="relative aspect-[16/10] w-full overflow-hidden">
        <ImageSlot
          asset={images[0]}
          sizes="(max-width: 640px) 84vw, (max-width: 1024px) 50vw, 33vw"
          className="transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-slate-950/80 to-transparent" />
        {photoCount > 1 && (
          <span className="absolute bottom-3 right-3 rounded-full border border-white/15 bg-black/55 px-2.5 py-1 text-[10px] font-semibold text-white backdrop-blur">
            写真 {photoCount}枚
          </span>
        )}
        {plan.badge && (
          <span className="absolute left-3 top-3 rounded-full border border-amber-100/70 bg-amber-300 px-3 py-1 text-[11px] font-bold text-zinc-950 shadow-lg shadow-amber-300/15 sm:left-4 sm:top-4 sm:px-3.5 sm:text-xs">
            {plan.badge}
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <div className="flex flex-wrap gap-1.5">
          {plan.forWhom.map((w) => (
            <span
              key={w}
              className="rounded-full border border-teal-200/15 bg-teal-300/10 px-2.5 py-1 text-[10px] font-medium text-teal-100 sm:text-[11px]"
            >
              {w}
            </span>
          ))}
        </div>
        <h3 className="mt-4 text-xl font-bold text-white group-hover:text-teal-100">
          {plan.name}
        </h3>
        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-zinc-400">
          {plan.tagline}
        </p>

        <div className="mt-5 rounded-xl border border-amber-200/20 bg-amber-300/[0.06] p-4">
          <p className="text-[10px] font-semibold tracking-[0.18em] text-amber-200/70">
            料金（税込）
          </p>
          <p className="mt-1 text-xl font-bold text-amber-100">
            {planPriceLabel(plan)}
          </p>
          {typeof plan.priceFrom === "number" && (
            <ul className="mt-2 space-y-1 text-xs leading-relaxed text-zinc-400">
              {plan.pricingDetail.slice(0, 3).map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
          )}
        </div>

        <dl className="mt-3 grid grid-cols-2 gap-2">
          <div className="rounded-xl border border-white/10 bg-slate-950/35 p-3">
            <dt className="text-[10px] text-zinc-500">撮影時間</dt>
            <dd className="mt-1 text-sm font-semibold text-white">{durationLabel}</dd>
          </div>
          <div className="rounded-xl border border-white/10 bg-slate-950/35 p-3">
            <dt className="text-[10px] text-zinc-500">納品データ</dt>
            <dd className="mt-1 text-sm font-semibold leading-snug text-white">
              {plan.deliveryCount}
            </dd>
          </div>
        </dl>

        <div className="mt-3 flex gap-2.5 rounded-xl border border-teal-200/10 bg-teal-300/[0.05] p-3 text-xs leading-relaxed text-zinc-300">
          <span aria-hidden className="shrink-0 text-amber-300">
            ✦
          </span>
          <p>{plan.features[0]}</p>
        </div>

        <span className="mt-auto flex items-center justify-between pt-5 text-sm font-semibold text-teal-200">
          プラン詳細を見る
          <span
            aria-hidden
            className="transition-transform duration-200 group-hover:translate-x-1"
          >
            →
          </span>
        </span>
      </div>
    </Link>
  );
}
