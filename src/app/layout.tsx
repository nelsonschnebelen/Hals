import type { Metadata } from "next";
import { Anton, Archivo, Fraunces } from "next/font/google";
import "./globals.css";
import { SmoothScroll } from "@/components/providers/smooth-scroll";

// Noir type system: Anton (condensed display), Archivo (grotesque UI/body),
// Fraunces (serif italic accents).
const anton = Anton({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-anton",
  display: "swap",
});
const archivo = Archivo({
  subsets: ["latin"],
  variable: "--font-archivo",
  display: "swap",
});
const fraunces = Fraunces({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-fraunces",
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://halsthesteakhouse.com";
const ogImage = "/og.jpg";

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
    images: [{ url: ogImage, width: 1200, height: 630 }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Hal's The Steakhouse",
    description: "A Buckhead institution since 1989. Now in Nashville.",
    images: [ogImage],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${anton.variable} ${archivo.variable} ${fraunces.variable}`}
    >
      <body className="bg-ink text-cream antialiased">
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
