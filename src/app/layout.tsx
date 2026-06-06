import type { Metadata, Viewport } from "next";
import { Noto_Sans_JP } from "next/font/google";
import "./globals.css";
import { siteConfig } from "@/lib/seo";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { JsonLd } from "@/components/seo/JsonLd";
import { localBusinessJsonLd } from "@/lib/jsonld";
import { GoogleAnalytics } from "@/components/analytics/GoogleAnalytics";
import { FloatingBookingButton } from "@/components/booking/FloatingBookingButton";
import { ScrollProgress } from "@/components/layout/ScrollProgress";

const notoSansJp = Noto_Sans_JP({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

/**
 * 全ページ共通メタの土台。
 * - metadataBase: 相対 canonical / OG 画像を絶対URL化
 * - title.template: 子ページの title に屋号を自動付与
 * - 既定 OG / Twitter: 子ページが上書きしなければ継承
 */
export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name}｜宮古島の星空フォト・記念日撮影`,
    template: `%s｜${siteConfig.shortName}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: siteConfig.name,
    locale: siteConfig.locale,
    url: siteConfig.url,
    // og:image はファイル規約 app/opengraph-image.tsx が全ページに自動付与
  },
  twitter: { card: siteConfig.twitter.card },
  appleWebApp: {
    capable: true,
    title: siteConfig.shortName,
    statusBarStyle: "black-translucent",
  },
  robots: { index: true, follow: true },
  // Google Search Console のHTMLタグ確認（環境変数で設定）
  verification: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
    ? { google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION }
    : undefined,
};

export const viewport: Viewport = {
  themeColor: "#09090b",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" className={`${notoSansJp.variable} antialiased`}>
      <body className="cosmic-page flex min-h-screen flex-col text-zinc-100">
        <JsonLd data={localBusinessJsonLd()} />
        <ScrollProgress />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-teal-200 focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-zinc-950"
        >
          本文へスキップ
        </a>
        <Header />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />
        <FloatingBookingButton />
        <GoogleAnalytics />
      </body>
    </html>
  );
}
