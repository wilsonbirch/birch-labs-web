import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";

import { site } from "@/content/site";
import { seoMetadata } from "@/lib/metadata";

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

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

const base = seoMetadata(site.seo);

export const metadata: Metadata = {
  ...base,
  metadataBase: new URL(siteUrl),
  title: {
    default: site.seo.title,
    template: `%s | ${site.businessName}`,
  },
  openGraph: { ...base.openGraph, type: "website", siteName: site.businessName },
};

// Dark-first: default to dark unless the user has explicitly chosen light.
const themeScript = `(()=>{try{var t=localStorage.getItem('theme');var d=t==='light'?false:(t==='dark'||!t||t==='system'||matchMedia('(prefers-color-scheme: dark)').matches);document.documentElement.classList.toggle('dark',d);}catch(e){document.documentElement.classList.add('dark');}})();`;

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
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="flex min-h-full flex-col overflow-x-clip bg-[color:var(--color-bg)] font-sans text-[color:var(--color-ink)]">
        {children}
      </body>
    </html>
  );
}
