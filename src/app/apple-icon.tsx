import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

/**
 * iOS ホーム画面用アイコン（生成）。
 * フォント取得に依存しないよう、文字ではなく図形（ダイヤ＝きらめき）で描く。
 */
export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(150deg, #0b1026 0%, #1e1b4b 60%, #0f172a 100%)",
        }}
      >
        <div
          style={{
            width: 86,
            height: 86,
            background: "#fbbf24",
            transform: "rotate(45deg)",
            borderRadius: 16,
          }}
        />
      </div>
    ),
    { ...size },
  );
}
