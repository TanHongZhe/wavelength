import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Toaster } from "@/components/ui/toaster";

const siteUrl = process.env.NEXT_PUBLIC_APP_URL || "https://wavelength.lol";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Wavelength Online - Free Multiplayer Social Party Game",
    template: "%s | Wavelength Online",
  },
  description:
    "Play Wavelength Online free! The viral telepathic party game. No downloads required - instant browser play for friends & couples.",
  keywords: [
    // Core Keywords
    "Wavelength Online",
    "Play Wavelength Free",
    "Social Guessing Game",
    "Telepathic Party Game",
    "Multiplayer Browser Game",
    "Wavelength Game Online",
    // LDR & Couples
    "Long distance relationship games",
    "LDR games online",
    "Couples bonding games",
    "Virtual date night ideas",
    "Online games for couples",
    // Party & Friends
    "Free online party games",
    "Zoom party games",
    "Browser games with friends",
    "Best web games 2026",
  ],
  authors: [{ name: "Hong Zhe", url: "https://wavelength.lol/about" }],
  creator: "Hong Zhe",
  publisher: "Wavelength Online",
  alternates: {
    canonical: `${siteUrl}/`,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "Wavelength Online",
    title: "Wavelength Online - Free Multiplayer Social Party Game",
    description:
      "Play Wavelength Online free! The viral party game perfect for long distance relationships and couples bonding. No download required - instant browser play.",
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
    title: "Wavelength Online - Free Multiplayer Social Party Game",
    description:
      "Play Wavelength Online free! The viral party game perfect for long distance relationships and couples bonding. No download required - instant browser play.",
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
  category: "Games",
};

// JSON-LD Schema - Multiple schemas for comprehensive SEO
const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Wavelength Online",
  url: "https://wavelength.lol",
  logo: "https://wavelength.lol/icon-512.png",
  sameAs: [
    "https://github.com/TanHongZhe/wavelength-vibe",
  ],
  foundingDate: "2024-01-01",
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "customer support",
    url: "https://wavelength.lol/about",
  },
};

const videoGameSchema = {
  "@context": "https://schema.org",
  "@type": "VideoGame",
  name: "Wavelength Online",
  description:
    "A telepathic party game where players try to read each other's minds by guessing where a hidden target falls on a spectrum between two opposing concepts.",
  url: "https://wavelength.lol",
  image: "https://wavelength.lol/og-image.png",
  operatingSystem: "Web Browser",
  applicationCategory: "Game",
  gamePlatform: ["Web Browser", "Desktop", "Mobile"],
  genre: ["Social Guessing Game", "Party Game", "Multiplayer", "Couples Game", "Relationship Game", "LDR Game"],
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
  publisher: {
    "@type": "Organization",
    name: "Wavelength Online",
  },
  inLanguage: "en",
  isAccessibleForFree: true,
  datePublished: "2024-01-01",
  dateModified: "2026-02-04",
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: "https://wavelength.lol",
    },
  ],
};

const webSiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Wavelength Online",
  url: "https://wavelength.lol",
  description: "Play the viral telepathic party game in your browser!",
  potentialAction: {
    "@type": "SearchAction",
    target: "https://wavelength.lol/?q={search_term_string}",
    "query-input": "required name=search_term_string",
  },
};

// Speakable schema for voice assistants
const speakableSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Wavelength Online - Free Multiplayer Social Party Game",
  url: "https://wavelength.lol",
  speakable: {
    "@type": "SpeakableSpecification",
    cssSelector: ["#main-content", "h1", ".game-description"],
  },
  mainEntity: {
    "@type": "VideoGame",
    name: "Wavelength Online",
  },
};

// ItemList schema for game modes
const gameModesSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Wavelength Game Modes",
  description: "Available game modes in Wavelength Online",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Classic Mode",
      description: "Head-to-head gameplay for 2 players. Take turns being the Psychic and Guesser.",
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Party Mode",
      description: "Team-based gameplay for 4-20 players. Two teams compete to guess the target.",
    },
  ],
};

const jsonLdArray = [organizationSchema, videoGameSchema, breadcrumbSchema, webSiteSchema, speakableSchema, gameModesSchema];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Performance optimizations */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="//supabase.co" />

        {/* Favicons and PWA */}
        <link rel="icon" href="/logo.png" sizes="any" />
        <link rel="icon" href="/logo.png" type="image/png" />
        <link rel="apple-touch-icon" href="/logo.png" />
        <link rel="manifest" href="/manifest.webmanifest" />

        {/* AI/LLM content guide */}
        <link rel="author" href="/llms.txt" type="text/plain" />

        {/* PWA meta tags */}
        <meta name="theme-color" content="#0f172a" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Wavelength" />

        {/* Structured Data */}
        {jsonLdArray.map((schema, index) => (
          <script
            key={index}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
          />
        ))}
      </head>
      <body className="min-h-screen">
        <Script
          strategy="afterInteractive"
          src="https://www.googletagmanager.com/gtag/js?id=G-VH26VEY5X0"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-VH26VEY5X0');
          `}
        </Script>
        <Script id="microsoft-clarity" strategy="afterInteractive">
          {`
            (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "vd4ou3bzy8");
          `}
        </Script>
        <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:rounded-md">
          Skip to main content
        </a>
        <Navbar />
        <main id="main-content">
          {children}
        </main>
        <Toaster />
      </body>
    </html>
  );
}
