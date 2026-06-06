import { getPlan, getPlans, planPriceLabel } from "@/data/plans";
import { renderOgImage, ogSize, ogContentType } from "@/lib/og";

export const alt = "宮古島の星空フォト 撮影プラン";
export const size = ogSize;
export const contentType = ogContentType;

export function generateStaticParams() {
  return getPlans().map((p) => ({ plan: p.slug }));
}

export default async function Image({
  params,
}: {
  params: Promise<{ plan: string }>;
}) {
  const { plan: slug } = await params;
  const plan = getPlan(slug);
  return renderOgImage({
    title: plan ? plan.name : "撮影プラン",
    subtitle: plan ? `${planPriceLabel(plan)}・宮古島` : undefined,
  });
}
