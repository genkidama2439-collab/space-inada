"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { trackEvent } from "@/lib/analytics";
import { formatPrice, type PlanPriceKind } from "@/data/plans";

/** 公式LINE（予約相談） */
const LINE_URL = "https://lin.ee/5z6HX4S";

/** 入力内容の自動保存キー（離脱しても復元する） */
const STORAGE_KEY = "booking-form-v2";

type PlanOption = {
  slug: string;
  name: string;
  kind: PlanPriceKind;
  /** /人 なら大人1名の料金、/組 なら1組の料金。要見積りは null */
  basePrice: number | null;
  /** 子供（0〜15才）料金。/人 プランのみ */
  childPrice: number | null;
};

type Props = {
  planOptions: PlanOption[];
  defaultPlan?: string;
  /** 送迎オプションの料金 */
  pickupPrice: number;
};

function formatDate(v: string): string {
  if (!v) return "";
  const [y, m, d] = v.split("-");
  if (!y || !m || !d) return v;
  return `${y}/${m}/${d}`;
}

function formatInstagram(v: string): string {
  const trimmed = v.trim().replace(/^@+/, "");
  return trimmed ? `@${trimmed}` : "";
}

/**
 * LINE送信用テキストを組み立てる。
 * 人数・オプション・お会計（概算）・お支払い方法（現地現金のみ）まで含める。
 */
function buildMessage(v: {
  date: string;
  plan: string;
  name: string;
  adults: string;
  children: string;
  phone: string;
  hotel: string;
  stay: string;
  pickup: boolean;
  location: boolean;
  instagram: string;
  story: boolean;
  totalText: string;
}): string {
  return `【スペースイナダ ご予約・お問い合わせ】

① 撮影希望日：
${formatDate(v.date)}

② 希望プラン：
${v.plan}

③ お名前：
${v.name}

④ 人数：
大人：${v.adults}人
子ども（0〜15才）：${v.children}人

⑤ 携帯番号：
${v.phone}

⑥ 宿泊施設名：
${v.hotel}

⑦ 滞在期間：
${v.stay}

⑧ オプション：
送迎：${v.pickup ? "希望する（+¥5,000）" : "なし"}
場所指定：${v.location ? "希望する（応相談）" : "なし"}

⑨ Instagram（任意）：
${formatInstagram(v.instagram)}
ストーリータグ付け：${v.story ? "OK" : "未回答"}

━━━━━━━━━━━━━━━━
💴 お会計（概算）：
${v.totalText}
※お支払いは「現地にて現金決済のみ」となります。
（最終金額はLINEにてご確定します）
━━━━━━━━━━━━━━━━
⚠️【集合場所について】
最高の星空スポットで撮影するため、集合場所は当日の風や星の位置に合わせてこちらで調整し、"当日"にLINEにてご連絡します。楽しみにお待ちください！

※旅行スケジュールの関係で早めに場所を知りたい方はご相談ください🤲

🍴【夜ご飯のおすすめタイミング】
撮影時間と被らないよう、晩御飯は"早めの時間"か"撮影後の遅い時間"にとるのがおすすめです！

深夜までやっているおすすめの夜ご飯屋さんは、画面下のメニューバーからいつでも確認できます✨
━━━━━━━━━━━━━━━━`;
}

const inputClass =
  "w-full rounded-lg border border-teal-200/15 bg-[#050814]/80 px-4 py-3 text-sm text-white placeholder:text-zinc-500 outline-none transition-colors focus:border-teal-200/70";

function RequiredBadge() {
  return (
    <span className="ml-2 rounded bg-rose-500/15 px-1.5 py-0.5 text-[10px] font-semibold text-rose-300">
      必須
    </span>
  );
}

export function BookingForm({ planOptions, defaultPlan, pickupPrice }: Props) {
  const defaultPlanName =
    planOptions.find((p) => p.slug === defaultPlan)?.name ?? "";

  const [date, setDate] = useState("");
  const [plan, setPlan] = useState(defaultPlanName);
  const [name, setName] = useState("");
  const [adults, setAdults] = useState("2");
  const [children, setChildren] = useState("0");
  const [phone, setPhone] = useState("");
  const [hotel, setHotel] = useState("");
  const [stay, setStay] = useState("");
  const [pickup, setPickup] = useState(false);
  const [location, setLocation] = useState(false);
  const [instagram, setInstagram] = useState("");
  const [story, setStory] = useState(false);
  const [status, setStatus] = useState<"idle" | "copied" | "error">("idle");
  // コピー／コピー失敗の操作対象だったメッセージ。現在のメッセージと違えば「古い」状態とみなす。
  const [actedMessage, setActedMessage] = useState("");

  const previewRef = useRef<HTMLTextAreaElement>(null);

  // ───── お会計（概算）の計算 ─────
  const selectedPlan = planOptions.find((p) => p.name === plan);
  const adultsNum = Math.max(0, parseInt(adults, 10) || 0);
  const childrenNum = Math.max(0, parseInt(children, 10) || 0);
  const pickupAmount = pickup ? pickupPrice : 0;

  const total: number | null = useMemo(() => {
    if (!selectedPlan) return null;
    if (selectedPlan.kind === "perPerson") {
      return (
        adultsNum * (selectedPlan.basePrice ?? 0) +
        childrenNum * (selectedPlan.childPrice ?? 0) +
        pickupAmount
      );
    }
    if (selectedPlan.kind === "perGroup") {
      return (selectedPlan.basePrice ?? 0) + pickupAmount;
    }
    return null; // quote（プロポーズ等）
  }, [selectedPlan, adultsNum, childrenNum, pickupAmount]);

  // 表示・送信用の合計テキスト
  const totalText = useMemo(() => {
    if (!plan) return "プランを選択すると概算が表示されます";
    if (total == null) return "別途お見積り（LINEでご相談ください）";
    return `${formatPrice(total)}${location ? "　＋ 場所指定（応相談）" : ""}`;
  }, [plan, total, location]);

  // 内訳行（UI表示用）
  const breakdown = useMemo(() => {
    if (!selectedPlan || total == null) return [] as string[];
    const lines: string[] = [];
    if (selectedPlan.kind === "perPerson") {
      lines.push(`大人 ${adultsNum}名 × ${formatPrice(selectedPlan.basePrice ?? 0)}`);
      if (childrenNum > 0) {
        lines.push(
          `子ども ${childrenNum}名 × ${formatPrice(selectedPlan.childPrice ?? 0)}`,
        );
      }
    } else if (selectedPlan.kind === "perGroup") {
      lines.push(`${selectedPlan.name} 1組 ${formatPrice(selectedPlan.basePrice ?? 0)}`);
    }
    if (pickup) lines.push(`送迎 +${formatPrice(pickupPrice)}`);
    return lines;
  }, [selectedPlan, total, adultsNum, childrenNum, pickup, pickupPrice]);

  const message = useMemo(
    () =>
      buildMessage({
        date,
        plan,
        name,
        adults,
        children,
        phone,
        hotel,
        stay,
        pickup,
        location,
        instagram,
        story,
        totalText,
      }),
    [date, plan, name, adults, children, phone, hotel, stay, pickup, location, instagram, story, totalText],
  );

  // 入力が変わったら（コピー後に編集したら）コピー状態は無効化する
  const effectiveStatus = actedMessage === message ? status : "idle";

  // localStorage から復元（マウント後に一度だけ。ハイドレーション不一致を避ける）
  const restoredRef = useRef(false);
  function applySaved(s: Record<string, unknown>) {
    if (typeof s.date === "string") setDate(s.date);
    if (typeof s.plan === "string") setPlan(s.plan);
    if (typeof s.name === "string") setName(s.name);
    if (typeof s.adults === "string") setAdults(s.adults);
    if (typeof s.children === "string") setChildren(s.children);
    if (typeof s.phone === "string") setPhone(s.phone);
    if (typeof s.hotel === "string") setHotel(s.hotel);
    if (typeof s.stay === "string") setStay(s.stay);
    if (typeof s.pickup === "boolean") setPickup(s.pickup);
    if (typeof s.location === "boolean") setLocation(s.location);
    if (typeof s.instagram === "string") setInstagram(s.instagram);
    if (typeof s.story === "boolean") setStory(s.story);
  }
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const saved = JSON.parse(raw) as Record<string, unknown>;
        // URLで明示的にプランが指定されていれば、そちらを優先
        if (defaultPlanName) saved.plan = defaultPlanName;
        // マウント後に一度だけ復元する正規パターン（SSRと初回描画はデフォルト値→ハイドレーション安全）
        // eslint-disable-next-line react-hooks/set-state-in-effect
        applySaved(saved);
      }
    } catch {
      // 破損データは無視
    }
    restoredRef.current = true;
    // 復元はマウント時の一度きり
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 入力変更を自動保存（復元完了後のみ）
  useEffect(() => {
    if (!restoredRef.current) return;
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ date, plan, name, adults, children, phone, hotel, stay, pickup, location, instagram, story }),
      );
    } catch {
      // 保存できない環境では何もしない
    }
  }, [date, plan, name, adults, children, phone, hotel, stay, pickup, location, instagram, story]);

  function handleClear() {
    setDate("");
    setPlan(defaultPlanName);
    setName("");
    setAdults("2");
    setChildren("0");
    setPhone("");
    setHotel("");
    setStay("");
    setPickup(false);
    setLocation(false);
    setInstagram("");
    setStory(false);
    setStatus("idle");
    setActedMessage("");
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // 何もしない
    }
  }

  function fallbackCopy(): boolean {
    const ta = previewRef.current;
    if (!ta) return false;
    ta.removeAttribute("readonly");
    ta.focus();
    ta.select();
    let ok = false;
    try {
      ok = document.execCommand("copy");
    } catch {
      ok = false;
    }
    ta.setAttribute("readonly", "");
    ta.setSelectionRange(0, 0);
    ta.blur();
    return ok;
  }

  async function handleCopy() {
    let ok = false;
    try {
      if (
        typeof navigator !== "undefined" &&
        navigator.clipboard &&
        window.isSecureContext
      ) {
        await navigator.clipboard.writeText(message);
        ok = true;
      } else {
        ok = fallbackCopy();
      }
    } catch {
      ok = fallbackCopy();
    }
    setActedMessage(message);
    setStatus(ok ? "copied" : "error");
    // CV計測：予約文のコピー
    trackEvent("booking_copy", { plan: plan || "未選択", success: ok });
  }

  return (
    <div className="mt-10 grid gap-8 lg:grid-cols-2">
      {/* 入力フォーム（カード） */}
      <form
        onSubmit={(e) => e.preventDefault()}
        className="cosmic-panel rounded-lg p-6 sm:p-8"
      >
        <h2 className="text-lg font-bold text-white">予約内容を入力</h2>
        <p className="mt-1 text-xs text-zinc-500">
          入力すると右（スマホは下）の送信文が自動で作られます。
        </p>

        <div className="mt-6 space-y-5">
          <div>
            <label htmlFor="date" className="mb-1.5 block text-sm font-medium text-zinc-200">
              撮影希望日
              <RequiredBadge />
            </label>
            <input
              id="date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              aria-required
              className={`${inputClass} [color-scheme:dark]`}
            />
          </div>

          <div>
            <label htmlFor="plan" className="mb-1.5 block text-sm font-medium text-zinc-200">
              希望プラン
              <RequiredBadge />
            </label>
            <select
              id="plan"
              value={plan}
              onChange={(e) => setPlan(e.target.value)}
              aria-required
              className={`${inputClass} [color-scheme:dark]`}
            >
              <option value="">選択してください</option>
              {planOptions.map((p) => (
                <option key={p.slug} value={p.name}>
                  {p.name}
                </option>
              ))}
              <option value="相談して決めたい">相談して決めたい</option>
            </select>
          </div>

          <div>
            <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-zinc-200">
              お名前
              <RequiredBadge />
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="山田 太郎"
              aria-required
              className={inputClass}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="adults" className="mb-1.5 block text-sm font-medium text-zinc-200">
                大人の人数
              </label>
              <input
                id="adults"
                type="number"
                min={0}
                inputMode="numeric"
                value={adults}
                onChange={(e) => setAdults(e.target.value)}
                className={inputClass}
              />
            </div>
            <div>
              <label htmlFor="children" className="mb-1.5 block text-sm font-medium text-zinc-200">
                子ども（0〜15才）
              </label>
              <input
                id="children"
                type="number"
                min={0}
                inputMode="numeric"
                value={children}
                onChange={(e) => setChildren(e.target.value)}
                className={inputClass}
              />
            </div>
          </div>

          <div>
            <label htmlFor="phone" className="mb-1.5 block text-sm font-medium text-zinc-200">
              携帯番号
              <RequiredBadge />
            </label>
            <input
              id="phone"
              type="tel"
              inputMode="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="090-1234-5678"
              aria-required
              className={inputClass}
            />
          </div>

          <div>
            <label htmlFor="hotel" className="mb-1.5 block text-sm font-medium text-zinc-200">
              宿泊施設名
            </label>
            <input
              id="hotel"
              type="text"
              value={hotel}
              onChange={(e) => setHotel(e.target.value)}
              placeholder="〇〇リゾート宮古島"
              className={inputClass}
            />
          </div>

          <div>
            <label htmlFor="stay" className="mb-1.5 block text-sm font-medium text-zinc-200">
              滞在期間
            </label>
            <input
              id="stay"
              type="text"
              value={stay}
              onChange={(e) => setStay(e.target.value)}
              placeholder="7/15〜7/18"
              className={inputClass}
            />
          </div>

          {/* オプション */}
          <fieldset>
            <legend className="mb-1.5 block text-sm font-medium text-zinc-200">
              オプション（任意）
            </legend>
            <div className="space-y-2">
              <label className="flex items-center justify-between gap-2 rounded-lg border border-teal-200/15 bg-[#050814]/60 px-4 py-3 text-sm text-zinc-200">
                <span className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={pickup}
                    onChange={(e) => setPickup(e.target.checked)}
                    className="h-4 w-4 rounded border-teal-200/20 bg-[#050814] accent-teal-300"
                  />
                  送迎（3名まで）
                </span>
                <span className="text-amber-200">+{formatPrice(pickupPrice)}</span>
              </label>
              <label className="flex items-center justify-between gap-2 rounded-lg border border-teal-200/15 bg-[#050814]/60 px-4 py-3 text-sm text-zinc-200">
                <span className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={location}
                    onChange={(e) => setLocation(e.target.checked)}
                    className="h-4 w-4 rounded border-teal-200/20 bg-[#050814] accent-teal-300"
                  />
                  場所指定（撮りたい場所をリクエスト）
                </span>
                <span className="text-zinc-400">応相談</span>
              </label>
            </div>
          </fieldset>

          <div>
            <label htmlFor="instagram" className="mb-1.5 block text-sm font-medium text-zinc-200">
              Instagram（任意）
            </label>
            <input
              id="instagram"
              type="text"
              value={instagram}
              onChange={(e) => setInstagram(e.target.value)}
              placeholder="instagram_id（@は不要）"
              className={inputClass}
            />
            <label className="mt-3 flex items-center gap-2 text-sm text-zinc-300">
              <input
                type="checkbox"
                checked={story}
                onChange={(e) => setStory(e.target.checked)}
                className="h-4 w-4 rounded border-teal-200/20 bg-[#050814] accent-teal-300"
              />
              ストーリーへのタグ付けOK
            </label>
          </div>
        </div>

        {/* お会計（概算） */}
        <div className="mt-6 rounded-lg border border-amber-200/25 bg-amber-300/5 p-5">
          <div className="flex items-baseline justify-between gap-3">
            <span className="text-sm font-medium text-zinc-200">お会計（概算）</span>
            <span className="text-right text-xl font-bold text-amber-200">
              {plan && total != null ? formatPrice(total) : totalText}
            </span>
          </div>
          {plan && total != null && location && (
            <p className="mt-1 text-right text-xs text-zinc-400">＋ 場所指定（応相談）</p>
          )}
          {breakdown.length > 0 && (
            <ul className="mt-3 space-y-0.5 text-xs text-zinc-400">
              {breakdown.map((b) => (
                <li key={b}>・{b}</li>
              ))}
            </ul>
          )}
          {selectedPlan?.kind === "perGroup" && (
            <p className="mt-2 text-xs text-zinc-500">
              ※{selectedPlan.name}は人数に関わらず1組あたりの料金です。
            </p>
          )}
          <p className="mt-3 text-xs font-medium text-amber-100/80">
            💴 お支払いは「現地にて現金決済のみ」です。
          </p>
          <p className="mt-1 text-xs text-zinc-500">
            ※上記は概算です。最終金額はLINEで確定します。
          </p>
        </div>

        <div className="mt-6 flex items-center justify-between gap-3 border-t border-teal-200/10 pt-5">
          <p className="text-xs text-zinc-500">入力内容はこの端末に自動保存されます</p>
          <button
            type="button"
            onClick={handleClear}
            className="rounded-lg border border-teal-200/15 bg-slate-950/40 px-4 py-1.5 text-xs text-zinc-300 transition-colors hover:border-amber-200/60 hover:text-amber-100"
          >
            入力内容をクリア
          </button>
        </div>
      </form>

      {/* プレビュー + アクション */}
      <div className="lg:sticky lg:top-20 lg:self-start">
        <div className="cosmic-panel rounded-lg p-6 sm:p-8">
          <h2 className="text-lg font-bold text-white">送信内容プレビュー</h2>
          <p className="mt-1 text-xs text-zinc-500">
            この内容をコピーして、公式LINEのトークに貼り付けて送信してください。
          </p>

          <textarea
            ref={previewRef}
            readOnly
            value={message}
            rows={18}
            aria-label="送信内容プレビュー"
            className="mt-4 w-full resize-none rounded-lg border border-teal-200/15 bg-[#03040a]/85 p-4 text-xs leading-relaxed text-zinc-200 outline-none"
          />

          {/* ステータス表示 */}
          <div aria-live="polite" className="mt-4 min-h-[1.5rem]">
            {effectiveStatus === "copied" && (
              <p className="rounded-lg bg-emerald-500/15 px-3 py-2 text-sm font-medium text-emerald-300">
                コピーしました。LINEで貼り付けて送信してください。
              </p>
            )}
            {effectiveStatus === "error" && (
              <p className="rounded-lg bg-rose-500/15 px-3 py-2 text-sm font-medium text-rose-300">
                自動コピーできませんでした。プレビューを長押し／選択して手動でコピーしてください。
              </p>
            )}
          </div>

          {/* ボタン */}
          <div className="mt-2 space-y-3">
            <button
              type="button"
              onClick={handleCopy}
              className="flex h-14 w-full items-center justify-center gap-2 rounded-lg border border-amber-200/70 bg-amber-300 text-base font-bold text-zinc-950 shadow-lg shadow-amber-300/15 transition-colors hover:bg-teal-200"
            >
              📋 内容をコピーする
            </button>

            <a
              href={LINE_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() =>
                trackEvent("open_official_line", {
                  plan: plan || "未選択",
                  copied: effectiveStatus === "copied",
                })
              }
              className={`flex h-14 w-full items-center justify-center gap-2 rounded-lg text-base font-bold transition-all ${
                effectiveStatus === "copied"
                  ? "scale-[1.02] bg-[#06C755] text-white shadow-lg shadow-[#06C755]/30 animate-pulse"
                  : "border border-[#06C755]/60 bg-[#06C755]/10 text-[#5fe39a]"
              }`}
            >
              💬 公式LINEを開く
            </a>

            <p className="text-center text-xs text-zinc-500">
              ※自動では送信されません。LINEを開いたら、トークに貼り付け（ペースト）して送信してください。
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
