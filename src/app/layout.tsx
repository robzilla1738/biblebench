import type { Metadata } from "next";
import { Geist, Geist_Mono, Instrument_Sans, Instrument_Serif, Poppins } from "next/font/google";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });
const instrumentSans = Instrument_Sans({
  variable: "--font-instrument-sans",
  subsets: ["latin"],
});
const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  weight: "400",
  style: ["normal", "italic"],
  subsets: ["latin"],
});
const poppins = Poppins({
  variable: "--font-poppins",
  weight: ["500", "600", "700"],
  subsets: ["latin"],
});
const BASE_URL = "https://biblebench.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "BibleBench | A benchmark for biblical literacy, built by The Church",
    template: "%s | BibleBench",
  },
  description:
    "An AI benchmark scored by people, not just machines. Written by pastors, theologians, and scholars across traditions.",
  keywords: [
    "Bible benchmark",
    "AI evaluation",
    "biblical literacy",
    "LLM benchmark",
    "theology",
    "Scripture",
    "AI scoring",
    "Christian scholarship",
  ],
  authors: [{ name: "BibleBench" }],
  creator: "BibleBench",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: BASE_URL,
    siteName: "BibleBench",
    title: "BibleBench | A benchmark for biblical literacy, built by The Church",
    description:
      "An AI benchmark scored by people, not just machines. Open to professors, pastors, scholars, and any Christian with a question worth asking.",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "BibleBench -- An AI benchmark scored by people, not just machines" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "BibleBench | A benchmark for biblical literacy, built by The Church",
    description:
      "An AI benchmark scored by people, not just machines. Open to professors, pastors, scholars, and any Christian with a question worth asking.",
    images: [{ url: "/og.png", alt: "BibleBench" }],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: BASE_URL,
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
      className={`${geistSans.variable} ${geistMono.variable} ${instrumentSans.variable} ${instrumentSerif.variable} ${poppins.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
