import type { Metadata } from "next";
import { Noto_Sans_SC } from "next/font/google";
import { headers } from "next/headers";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import {
  PRIMARY_KEYWORDS,
  SITE_NAME,
  SITE_ORIGIN,
  SITE_TAGLINE,
  SITE_TITLE,
} from "@/lib/site";
import "./globals.css";

const noto = Noto_Sans_SC({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_ORIGIN),
  title: {
    default: SITE_TITLE,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_TAGLINE,
  keywords: [...PRIMARY_KEYWORDS],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "zh_CN",
    siteName: SITE_NAME,
    title: SITE_TITLE,
    description: SITE_TAGLINE,
    url: SITE_ORIGIN,
  },
  twitter: {
    card: "summary",
    title: SITE_TITLE,
    description: SITE_TAGLINE,
  },
  robots: {
    index: true,
    follow: true,
  },
};

function isFreenodesPath(pathname: string | null): boolean {
  if (!pathname) return false;
  return (
    pathname === "/freenodes" ||
    pathname === "/免费节点" ||
    pathname === "/%E5%85%8D%E8%B4%B9%E8%8A%82%E7%82%B9"
  );
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = (await headers()).get("x-pathname");
  const showFreenodesAds = isFreenodesPath(pathname);

  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    alternateName: ["VPN中国", "中国可用VPN", "免费VPN推荐"],
    url: SITE_ORIGIN,
    description: SITE_TAGLINE,
    inLanguage: "zh-CN",
  };

  return (
    <html lang="zh-CN" className={`${noto.variable} h-full antialiased`}>
      <head>
        {showFreenodesAds ? (
          <script
            data-cfasync="false"
            src="https://wingsmob.com/1/210500b2a66fed07683eaa471f452231"
          />
        ) : null}
      </head>
      <body className="flex min-h-full flex-col bg-paper font-sans text-ink">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
        {showFreenodesAds ? (
          <script
            data-cfasync="false"
            src="https://grop.net/14/09bf7f67fad5eb7e27a4f8c9c70b4eea"
          />
        ) : null}
      </body>
    </html>
  );
}
