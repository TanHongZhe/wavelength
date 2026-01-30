import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Toaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"),
  title: {
    default: "Wavelength Online - Free Social Guessing Game | Play in Browser",
    template: "%s | Wavelength Online",
  },
  description:
    "Play Wavelength Online free in your browser! A telepathic party game where players guess positions on a spectrum based on clues. No download required - instant multiplayer fun.",
  keywords: [
    "Play Wavelength Online",
    "Wavelength Browser Game",
    "Free Social Guessing Game",
    "Multiplayer Party Game",
    "Telepathic Game Online",
    "Spectrum Guessing Game",
    "Free Browser Game",
    "Online Party Games",
    "Wavelength Digital",
    "Social Deduction Game",
  ],
  authors: [{ name: "Hong Zhe" }],
  creator: "Hong Zhe",
  publisher: "Wavelength Online",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://wavelength.lol",
    siteName: "Wavelength Online",
    title: "Wavelength Online - Free Social Guessing Game",
    description:
      "Play the viral telepathic party game in your browser! Guess where concepts fall on a spectrum based on one-word clues.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Wavelength Online - Social Guessing Game",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Wavelength Online - Free Social Guessing Game",
    description:
      "Play the viral telepathic party game in your browser! Guess where concepts fall on a spectrum.",
    images: ["/og-image.png"],
    creator: "@WavelengthGame",
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
  verification: {
    google: "6BGwQT3TR-d5LsaZcKqONCOaCQqpX-Q4_ScjXs0IMQ4",
  },
};

// JSON-LD Schema for VideoGame
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "VideoGame",
  name: "Wavelength Online",
  description:
    "A telepathic party game where players try to read each other's minds by guessing where a hidden target falls on a spectrum between two opposing concepts.",
  url: "https://wavelength.lol",
  operatingSystem: "Web Browser",
  applicationCategory: "Game",
  gamePlatform: ["Web Browser", "Desktop", "Mobile"],
  genre: ["Social Guessing Game", "Party Game", "Multiplayer"],
  numberOfPlayers: {
    "@type": "QuantitativeValue",
    minValue: 2,
    maxValue: 20,
  },
  playMode: ["MultiPlayer", "CoOp"],
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
    availability: "https://schema.org/InStock",
  },
  author: {
    "@type": "Person",
    name: "Hong Zhe",
  },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.8",
    ratingCount: "1250",
    bestRating: "5",
    worstRating: "1",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="theme-color" content="#1e3a5f" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen">
        <Navbar />
        {children}
        <Toaster />
      </body>
    </html>
  );
}
