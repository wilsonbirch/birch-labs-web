import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";

import { JsonLd } from "@/components/ui/JsonLd";
import { site } from "@/content/site";
import { seoMetadata } from "@/lib/metadata";
import { THEME_BOOT_SCRIPT, themeCss } from "@/lib/themes";
import { SITE_URL } from "@/lib/site-url";
import { siteGraph } from "@/lib/structured-data";

import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});


const base = seoMetadata(site.seo);

export const metadata: Metadata = {
  ...base,
  metadataBase: new URL(SITE_URL),
  title: {
    default: site.seo.title,
    template: `%s | ${site.businessName}`,
  },
  openGraph: { ...base.openGraph, type: "website", siteName: site.businessName },
};

export const viewport: Viewport = {
  themeColor: "#003087",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      data-scroll-behavior="smooth"
      className={`${inter.variable} ${jetbrainsMono.variable} h-full antialiased motion-safe:scroll-smooth`}
    >
      <head>
        <meta name="color-scheme" content="dark light" />
        {/* Theme tokens for every site theme, then pick this visit's theme before first paint
            (see lib/themes.ts). */}
        <style dangerouslySetInnerHTML={{ __html: themeCss() }} />
        <script dangerouslySetInnerHTML={{ __html: THEME_BOOT_SCRIPT }} />
        <link rel="alternate" type="text/plain" href="/llms.txt" title="Site summary for LLMs" />
        <JsonLd data={siteGraph()} />
      </head>
      <body className="flex min-h-full flex-col overflow-x-clip bg-[color:var(--color-bg)] font-sans text-[color:var(--color-ink)]">
        {children}
      </body>
    </html>
  );
}
