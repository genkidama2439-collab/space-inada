import Link from "next/link";
import { planPriceLabel, type Plan } from "@/data/plans";
import { ImageSlot } from "@/components/media/ImageSlot";
import { planImages } from "@/data/images";

export function PlanCard({ plan }: { plan: Plan }) {
  const images = planImages(plan);
  const photoCount = images.filter((img) => img.src).length;

  return (
    <Link
      href={`/plans/${plan.slug}`}
      className="cosmic-panel cosmic-panel-hover group flex flex-col overflow-hidden rounded-lg"
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden">
        <ImageSlot
          asset={images[0]}
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 50vw, 33vw"
          className="transition-transform duration-500 group-hover:scale-105"
        />
        {photoCount > 1 && (
          <span className="absolute bottom-2 right-2 rounded-md bg-black/55 px-1.5 py-0.5 text-[10px] font-semibold text-white backdrop-blur">
            ◻ {photoCount}
          </span>
        )}
        {plan.badge && (
          <span className="absolute left-2 top-2 rounded-md border border-amber-200/70 bg-amber-300 px-2 py-0.5 text-[10px] font-bold text-zinc-950 shadow-lg shadow-amber-300/15 sm:left-3 sm:top-3 sm:px-3 sm:py-1 sm:text-xs">
            {plan.badge}
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col p-3.5 sm:p-6">
        <div className="flex flex-wrap gap-1.5">
          {plan.forWhom.slice(0, 2).map((w) => (
            <span
              key={w}
              className="rounded-md border border-teal-200/15 bg-teal-300/10 px-2 py-0.5 text-[10px] text-teal-200 sm:px-2.5 sm:text-xs"
            >
              {w}
            </span>
          ))}
        </div>
        <h3 className="mt-2.5 text-sm font-bold text-white group-hover:text-teal-100 sm:mt-4 sm:text-lg">
          {plan.name}
        </h3>
        <p className="mt-1.5 line-clamp-2 flex-1 text-xs leading-relaxed text-zinc-400 sm:mt-2 sm:text-sm">
          {plan.tagline}
        </p>
        <p className="mt-3 text-sm font-bold text-amber-200 sm:mt-4 sm:text-base">
          {planPriceLabel(plan)}
        </p>
      </div>
    </Link>
  );
}
