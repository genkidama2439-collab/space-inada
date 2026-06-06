/**
 * 計測（Google Analytics 4）の共通ユーティリティ。
 *
 * 計測IDは環境変数 NEXT_PUBLIC_GA_ID（例: G-XXXXXXXXXX）で設定する。
 * 未設定なら GA は読み込まれない（開発・プレビューで誤計測しない）。
 */

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

export const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

/** 任意のイベントを GA4 に送信（gtag 未ロード時は何もしない） */
export function trackEvent(
  action: string,
  params: Record<string, unknown> = {},
): void {
  if (typeof window === "undefined" || typeof window.gtag !== "function") return;
  window.gtag("event", action, params);
}
