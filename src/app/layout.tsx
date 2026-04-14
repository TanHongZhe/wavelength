import type { Metadata } from "next";
import { Fredoka, Space_Grotesk } from "next/font/google";
import Script from "next/script";

const fredoka = Fredoka({ subsets: ['latin'], variable: '--font-fredoka', display: 'swap' });
const spaceGrotesk = Space_Grotesk({ subsets: ['latin'], variable: '--font-space-grotesk', display: 'swap' });
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Toaster } from "@/components/ui/toaster";
import { ConvexClientProvider } from "@/lib/convex/ConvexClientProvider";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";

const siteUrl = process.env.NEXT_PUBLIC_APP_URL || "https://wavelength.lol";


export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  alternates: {
    canonical: siteUrl,
  },
  title: {
    default: "Play Wavelength Online | Free Telepathic Browser Game",
    template: "%s | Wavelength Online",
  },
  description:
    "Play the Wavelength game online for free! The viral telepathic browser party game for friends and long distance relationships. Play instantly now.",
  keywords: [
    "Wavelength Game",
    "Wavelength Online",
    "Wavelength Game Online",
    "Play Wavelength Free",
    "Couple Card Games",
    "Social Guessing Game",
    "Telepathic Party Game",
    "Multiplayer Browser Game",
    "Long distance relationship games",
    "LDR games online",
    "Couples bonding games",
    "Virtual date night ideas",
    "Online games for couples",
    "Free online party games",
    "Zoom party games",
    "Browser games with friends",
    "best browser party games",
  ],
  authors: [{ name: "Wavelength Game", url: "https://wavelength.lol/about/" }],
  creator: "Wavelength Game",
  publisher: "Wavelength Game",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "Wavelength Online",
    title: "Play Wavelength Online | Free Telepathic Browser Game",
    description:
      "Play the Wavelength game online for free! The viral telepathic browser party game for friends and long distance relationships. Play instantly now.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Wavelength Game Online - Social Guessing Game",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Play Wavelength Online | Free Telepathic Browser Game",
    description:
      "Play the Wavelength game online for free! The viral telepathic browser party game for friends and long distance relationships. Play instantly now.",
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

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Wavelength Game",
  url: "https://wavelength.lol/",
  logo: "https://wavelength.lol/icon-512.png",
  sameAs: ["https://github.com/TanHongZhe/wavelength-vibe"],
  foundingDate: "2024-01-01",
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "customer support",
    url: "https://wavelength.lol/about/",
  },
};

const videoGameSchema = {
  "@context": "https://schema.org",
  "@type": "VideoGame",
  name: "Wavelength Game",
  alternateName: "Wavelength Online",
  description:
    "A telepathic party game and couple card game where players try to read each other's minds by guessing where a hidden target falls on a spectrum.",
  url: "https://wavelength.lol/",
  image: "https://wavelength.lol/og-image.png",
  operatingSystem: "Web Browser",
  applicationCategory: "Game",
  isBasedOn: "https://boardgamegeek.com/boardgame/262543/wavelength",
  gamePlatform: ["Web Browser", "Desktop", "Mobile"],
  genre: ["Social Guessing Game", "Party Game", "Multiplayer", "Couples Game", "Relationship Game", "Card Game"],
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
    name: "Wavelength Game",
  },
  publisher: {
    "@type": "Organization",
    name: "Wavelength Game",
  },
  inLanguage: "en",
  isAccessibleForFree: true,
  datePublished: "2024-01-01",
  // Updated dynamically to build/deploy date so Google always sees a fresh signal
  dateModified: new Date().toISOString().split('T')[0],
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: "https://wavelength.lol/",
    },
  ],
};

const webSiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Wavelength Game",
  alternateName: "Wavelength Online",
  url: "https://wavelength.lol/",
  description: "Play the viral Wavelength game online and couple card games in your browser!",
  // SearchAction removed: no real site-search at /?q= — including it caused invalid structured data
};

const speakableSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Wavelength Game - Free Multiplayer Browser Party Game",
  url: "https://wavelength.lol/",
  speakable: {
    "@type": "SpeakableSpecification",
    cssSelector: ["#main-content", "h1", ".game-description"],
  },
  mainEntity: {
    "@type": "VideoGame",
    name: "Wavelength Game",
  },
};

const gameModesSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Wavelength Game Modes",
  description: "Available game modes in Wavelength Game",
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

// breadcrumbSchema removed from global layout — homepage now includes it in its own page.tsx
// so it doesn't incorrectly appear on every route (FAQ, rules, etc. have their own breadcrumbs)
const jsonLdArray = [organizationSchema, videoGameSchema, webSiteSchema, speakableSchema, gameModesSchema];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="dns-prefetch" href="//convex.cloud" />
        <link rel="icon" href="/logo.png" sizes="any" />
        <link rel="icon" href="/logo.png" type="image/png" />
        <link rel="apple-touch-icon" href="/logo.png" />
        <link rel="manifest" href="/manifest.webmanifest" />
        <link rel="author" href="/llms.txt" type="text/plain" />
        <meta name="theme-color" content="#0f172a" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Wavelength" />
        {jsonLdArray.map((schema, index) => (
          <script
            key={index}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
          />
        ))}
      </head>
      <body className={`min-h-screen ${spaceGrotesk.variable} ${fredoka.variable}`}>
        <Script
          strategy="lazyOnload"
          src="https://www.googletagmanager.com/gtag/js?id=G-VH26VEY5X0"
        />
        <Script id="google-analytics" strategy="lazyOnload">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-VH26VEY5X0');
          `}
        </Script>
        <Script id="microsoft-clarity" strategy="lazyOnload">
          {`
            (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "vd4ou3bzy8");
          `}
        </Script>
        {/* Stripe uses Payment Links — no client-side SDK needed */}
        <ClerkProvider
          appearance={{
            baseTheme: dark,
            variables: {
              colorPrimary: '#ec4899', // pink-500
              fontSize: '16px',
              borderRadius: '0.75rem',
              colorBackground: '#0f172a', // slate-900 override
            },
            elements: {
              formButtonPrimary: 'bg-gradient-to-r from-pink-600 to-violet-600 hover:from-pink-500 hover:to-violet-500 border-0 shadow-lg shadow-pink-500/20 transition-all',
              card: 'bg-slate-900/95 border border-slate-800 shadow-2xl backdrop-blur-xl',
              headerTitle: 'text-slate-100',
              headerSubtitle: 'text-slate-400',
              socialButtonsBlockButton: 'text-slate-200 bg-slate-800 border-slate-700 hover:bg-slate-700 transition-colors',
              socialButtonsBlockButtonText: 'text-slate-200 font-medium',
              dividerLine: 'bg-slate-800',
              dividerText: 'text-slate-500',
              formFieldLabel: 'text-slate-300',
              formFieldInput: 'bg-slate-800 border-slate-700 focus:border-pink-500 focus:ring-pink-500/20 transition-all',
              footerActionLink: 'text-pink-400 hover:text-pink-300 transition-colors',
              identityPreviewScaleBox: 'bg-slate-800 border-slate-700',
              identityPreviewText: 'text-slate-200',
            }
          }}
        >
          <ConvexClientProvider>
            <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:rounded-md">
              Skip to main content
            </a>
            <Navbar />
            <main id="main-content">
              {children}
            </main>
            <Toaster />
          </ConvexClientProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}
