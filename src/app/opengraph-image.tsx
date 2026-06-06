import { siteConfig } from "@/lib/seo";
import { renderOgImage, ogSize, ogContentType } from "@/lib/og";

export const alt = `${siteConfig.name}｜宮古島の星空フォト`;
export const size = ogSize;
export const contentType = ogContentType;

export default function OgImage() {
  return renderOgImage({
    title: "満天の星空で残す、記念日・プロポーズの一枚",
    subtitle: siteConfig.name,
  });
}
