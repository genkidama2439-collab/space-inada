import Link from "next/link";
import { planPriceLabel, type Plan } from "@/data/plans";

/** プラン料金比較表（横スクロール対応）。data/plans.ts を参照。 */
export function PlanComparison({ plans }: { plans: Plan[] }) {
  return (
    <div className="cosmic-panel -mx-5 overflow-x-auto rounded-lg px-5 sm:mx-0 sm:px-0">
      <table className="w-full min-w-[680px] border-collapse text-left text-sm">
        <thead>
          <tr className="border-b border-teal-200/15 text-zinc-400">
            <th scope="col" className="py-3 pr-4 font-medium">
              プラン
            </th>
            <th scope="col" className="py-3 pr-4 font-medium">
              料金（税込）
            </th>
            <th scope="col" className="py-3 pr-4 font-medium">
              撮影時間
            </th>
            <th scope="col" className="py-3 pr-4 font-medium">
              納品
            </th>
            <th scope="col" className="py-3 pr-4 font-medium">
              こんな方に
            </th>
            <th scope="col" className="py-3 font-medium" />
          </tr>
        </thead>
        <tbody>
          {plans.map((plan) => (
            <tr key={plan.slug} className="border-b border-teal-200/10 align-top">
              <th scope="row" className="py-4 pr-4 font-bold text-white">
                {plan.name}
              </th>
              <td className="py-4 pr-4 text-zinc-200">{planPriceLabel(plan)}</td>
              <td className="py-4 pr-4 text-zinc-300">
                {plan.durationMin ? `約${plan.durationMin}分` : "応相談"}
              </td>
              <td className="py-4 pr-4 text-zinc-300">{plan.deliveryCount}</td>
              <td className="py-4 pr-4 text-zinc-300">{plan.forWhom.join("・")}</td>
              <td className="py-4">
                <Link
                  href={`/booking?plan=${plan.slug}`}
                  className="inline-flex whitespace-nowrap rounded-md border border-amber-200/70 bg-amber-300 px-4 py-1.5 text-xs font-semibold text-zinc-950 transition-colors hover:bg-teal-200"
                >
                  予約する
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
