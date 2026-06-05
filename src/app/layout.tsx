import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import { SmoothScroll } from "@/components/providers/smooth-scroll";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://halsthesteakhouse.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Hal's The Steakhouse — Buckhead & Nashville",
    template: "%s · Hal's The Steakhouse",
  },
  description:
    "A Buckhead institution since 1989. New Orleans–inspired steakhouse with prime cuts, nightly live music, an open kitchen, and an upper patio with city views. Now in Nashville.",
  openGraph: {
    title: "Hal's The Steakhouse",
    description: "A Buckhead institution since 1989. Now in Nashville.",
    url: siteUrl,
    siteName: "Hal's The Steakhouse",
    images: [{ url: "/api/og", width: 1200, height: 630 }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Hal's The Steakhouse",
    description: "A Buckhead institution since 1989. Now in Nashville.",
    images: ["/api/og"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <body className="bg-ink text-cream antialiased">
        <SmoothScroll>{children}</SmoothScroll>
        <div className="grain-overlay" aria-hidden />
      </body>
    </html>
  );
}
