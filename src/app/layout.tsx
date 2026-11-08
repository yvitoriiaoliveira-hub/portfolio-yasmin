import type { Metadata, Viewport } from "next";
import { Geist_Mono, Inter, Sora } from "next/font/google";
import type { ReactNode } from "react";

import { BackToTop } from "@/components/layout/back-to-top";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { ScrollProgress } from "@/components/layout/scroll-progress";
import { Providers } from "@/components/providers";
import { siteConfig } from "@/content/site";

import "./globals.css";

const sora = Sora({ subsets: ["latin"], variable: "--font-sora", display: "swap" });
const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono", display: "swap" });

const title = `${siteConfig.shortName} — ${siteConfig.role}`;

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: { default: title, template: `%s · ${siteConfig.shortName}` },
  description: siteConfig.description,
  keywords: [...siteConfig.keywords],
  authors: [{ name: siteConfig.name, url: siteConfig.url }],
  creator: siteConfig.name,
  applicationName: `Portfólio · ${siteConfig.shortName}`,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    url: "/",
    siteName: `Portfólio · ${siteConfig.shortName}`,
    title,
    description: siteConfig.description,
  },
  twitter: { card: "summary_large_image", title, description: siteConfig.description },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large" } },
  category: "technology",
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f5f7fb" },
    { media: "(prefers-color-scheme: dark)", color: "#06080f" },
  ],
  colorScheme: "light dark",
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html
      lang="pt-BR"
      suppressHydrationWarning
      data-scroll-behavior="smooth"
      className={`${sora.variable} ${inter.variable} ${geistMono.variable}`}
    >
      <body className="min-h-dvh">
        <a
          href="#conteudo"
          className="fixed top-3 left-3 z-[100] -translate-y-20 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-transform focus:translate-y-0"
        >
          Pular para o conteúdo
        </a>
        <Providers>
          <ScrollProgress />
          <Header />
          <main id="conteudo" tabIndex={-1} className="outline-none">
            {children}
          </main>
          <Footer />
          <BackToTop />
        </Providers>
      </body>
    </html>
  );
}
