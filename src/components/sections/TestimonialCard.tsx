import Link from "next/link";
import { getPlan } from "@/data/plans";
import type { Testimonial } from "@/data/testimonials";

function Stars({ rating }: { rating: number }) {
  return (
    <span className="text-amber-200" aria-label={`5段階中${rating}`}>
      {"★".repeat(rating)}
      <span className="text-zinc-600">{"★".repeat(5 - rating)}</span>
    </span>
  );
}

export function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  const plan = getPlan(testimonial.plan);
  return (
    <figure className="cosmic-panel flex h-full flex-col rounded-lg p-6">
      <div className="flex items-center justify-between gap-2">
        <Stars rating={testimonial.rating} />
        {plan && (
          <Link
            href={`/plans/${plan.slug}`}
            className="rounded-md border border-teal-200/15 bg-teal-300/10 px-2.5 py-0.5 text-xs text-teal-200 hover:border-amber-200/50 hover:text-amber-100"
          >
            {plan.name}
          </Link>
        )}
      </div>
      <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-zinc-300">
        {testimonial.body}
      </blockquote>
      <figcaption className="mt-5 text-xs text-zinc-500">
        {testimonial.name}・{testimonial.area}
      </figcaption>
    </figure>
  );
}
