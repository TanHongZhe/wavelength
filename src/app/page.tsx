import { Metadata } from "next";
import { GameEngine } from "../components/game/GameEngine";
import { Footer } from "@/components/Footer";
import Link from "next/link";

export const runtime = "edge";
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: {
    absolute: "Play Wavelength Online | Free Telepathic Browser Game",
  },
  description:
    "Play the Wavelength game online for free! The viral telepathic browser party game perfect for friends, long distance relationships, and couples.",
  alternates: {
    canonical: "https://wavelength.lol/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://wavelength.lol/",
    siteName: "Wavelength Online",
    title: "Play Wavelength Online | Free Telepathic Browser Game",
    description:
      "Play the Wavelength game online for free! The viral telepathic browser party game perfect for friends, long distance relationships, and couples.",
  },
  keywords: [
    "Wavelength Online",
    "Wavelength Game Online",
    "Couple Card Games",
    "Play Wavelength Online",
    "Wavelength Game",
    "Wavelength",
    "Wavelength Browser Game",
    "Free Social Guessing Game",
    "Free Party Game",
    "Telepathic Party Game",
    "Multiplayer Browser Game",
    "Multiplayer Party Game",
    "Long distance relationship games",
    "LDR games online",
    "LDR games",
    "LDR party games",
    "Couples bonding games",
    "Relationship games for couples",
    "Virtual date night games",
    "Games to play with partner",
    "Fun games for couples",
    "Games to strengthen relationship",
    "Couples bonding activities",
    "Free relationship games",
    "Online games for couples",
    "Communication games for couples",
    "Games to get to know your partner",
    "Couples question games",
  ],
};

// FAQPage schema — on the homepage for rich FAQ results on the branded "Wavelength Online" query
const homeFaqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is Wavelength Online?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Wavelength Online is a free browser-based telepathic party game where players try to read each other's minds. One player (the Psychic) gives a one-word clue to help others guess where a hidden target falls on a spectrum between two opposing concepts — no download or registration required.",
      },
    },
    {
      "@type": "Question",
      name: "Is Wavelength Online free to play?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, Wavelength Online is completely free to play. Just visit the site, create a room, and share the link with your friends. Optional premium features are available for players who want to unlock extra game modes.",
      },
    },
    {
      "@type": "Question",
      name: "How many players can play Wavelength Online?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Wavelength Online supports 2 to 20 players. Classic Mode is designed for head-to-head 2-player games, while Party Mode supports up to 20 players split across two competing teams.",
      },
    },
    {
      "@type": "Question",
      name: "Does Wavelength Online work on mobile?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, Wavelength Online is fully optimized for mobile, tablet, and desktop devices. It works on any modern web browser — no app download or installation required.",
      },
    },
  ],
};

// Breadcrumb for homepage (moved from layout so it only appears on this route)
const homeBreadcrumbSchema = {
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

export default function HomePage() {
  return (
    // Changed from <main> to <div> — layout.tsx already wraps children in <main id="main-content">
    // Nested <main> elements are invalid HTML and confuse crawlers
    <div className="flex flex-col min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homeFaqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homeBreadcrumbSchema) }}
      />
      <GameEngine />

      {/* Visible SEO Content - Placed below the game, visible to crawlers and users */}
      <section className="container mx-auto px-4 py-12 text-muted-foreground/80 max-w-4xl space-y-8">
        <div className="prose prose-invert max-w-none">
          <h1 className="text-3xl font-extrabold text-foreground mb-4">Play Wavelength Online</h1>
          <p className="mb-4 text-lg">
            The <strong>Wavelength game online</strong> is the best free telepathic party game to play natively in your browser.
            Perfect for long-distance relationships, couples bonding, and connecting with friends anywhere.
            Challenge your partner or friends to guess exactly where a hidden target lies on a spectrum.
            The ultimate LDR game with instant multiplayer — no downloads or registration required.
          </p>

          <div className="mt-8 mb-8 border-l-4 border-primary pl-4">
            <h2 className="text-xl font-bold text-foreground mb-3">Explore Multiple Wavelength Game Modes</h2>
            <p className="mb-3">
              When you play <strong>Wavelength online</strong>, you aren&apos;t just limited to the standard questions. We have expanded the Wavelength game to include a massive variety of categories to suit any vibe:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>Classic Wavelength Game:</strong> The standard mode you know and love, perfect for friends and family gatherings.</li>
              <li>
                <strong>General Knowledge:</strong> Test your alignment on pop culture, movies, music, and science.{" "}
                <Link href="/games/general-knowledge/" className="hover:text-primary transition-colors underline">
                  Play General Knowledge →
                </Link>
              </li>
              <li>
                <strong>Couples &amp; Date Night:</strong> Relationship-focused questions designed to see how well you and your partner actually align.{" "}
                <Link href="/games/this-or-that/" className="hover:text-primary transition-colors underline">
                  Play This or That →
                </Link>
              </li>
              <li>
                <strong>Fantasy Slider:</strong> Rate scenarios on a spectrum and see if you and your partner match.{" "}
                <Link href="/games/fantasy-slider/" className="hover:text-primary transition-colors underline">
                  Play Fantasy Slider →
                </Link>
              </li>
              <li>
                <strong>Who&apos;s Most Likely:</strong> Point fingers and find out who your group thinks is most likely to do what.{" "}
                <Link href="/games/whos-most-likely/" className="hover:text-primary transition-colors underline">
                  Play Who&apos;s Most Likely →
                </Link>
              </li>
              <li>
                <strong>Flag Game:</strong> A geography and culture guessing game you can play with anyone, anywhere.{" "}
                <Link href="/games/flag-game/" className="hover:text-primary transition-colors underline">
                  Play Flag Game →
                </Link>
              </li>
              <li><strong>18+ Lust &amp; Spicy Modes:</strong> Adult-themed game modes that add a hilarious, spicy twist to the traditional Wavelength game — perfect for late-night virtual date nights.</li>
            </ul>
          </div>

          {/* GEO Optimization: Quick Facts for AI Discovery */}
          <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6 my-8">
            <h2 className="text-lg font-bold text-foreground mb-4">Quick Facts: Wavelength Game</h2>
            <div className="grid sm:grid-cols-2 gap-4 text-sm">
              <div>
                <dt className="font-semibold text-foreground">Main Keyword:</dt>
                <dd>Wavelength Game</dd>
              </div>
              <div>
                <dt className="font-semibold text-foreground">Game Type:</dt>
                <dd>Telepathic Party Game</dd>
              </div>
              <div>
                <dt className="font-semibold text-foreground">Players:</dt>
                <dd>2–20 Players</dd>
              </div>
              <div>
                <dt className="font-semibold text-foreground">Platform:</dt>
                <dd>Browser (Mobile, Tablet, Desktop)</dd>
              </div>
              <div>
                <dt className="font-semibold text-foreground">Cost:</dt>
                <dd>Free</dd>
              </div>
              <div>
                <dt className="font-semibold text-foreground">Features:</dt>
                <dd>Real-time Multiplayer, No Download, No Registration</dd>
              </div>
              <div>
                <dt className="font-semibold text-foreground">Best For:</dt>
                <dd>Friends, Couples, Long Distance Relationships, Virtual Date Nights</dd>
              </div>
            </div>
          </div>

          {/* Social Proof / Testimonials */}
          <div className="my-8">
            <h2 className="text-xl font-bold text-foreground mb-6">What Players Are Saying</h2>
            <div className="grid md:grid-cols-3 gap-4">
              <blockquote className="bg-slate-900/50 border border-slate-800 rounded-xl p-5">
                <p className="text-sm text-muted-foreground/90 italic mb-3">
                  &ldquo;We play this every Friday from different cities. The spectrum rounds always spark the best conversations.&rdquo;
                </p>
                <footer className="text-xs font-semibold text-foreground">Alex &amp; Jordan — LDR couple</footer>
              </blockquote>
              <blockquote className="bg-slate-900/50 border border-slate-800 rounded-xl p-5">
                <p className="text-sm text-muted-foreground/90 italic mb-3">
                  &ldquo;My family uses this for Zoom game nights. It&apos;s the only game everyone actually wants to play again.&rdquo;
                </p>
                <footer className="text-xs font-semibold text-foreground">Sam — parent of 3</footer>
              </blockquote>
              <blockquote className="bg-slate-900/50 border border-slate-800 rounded-xl p-5">
                <p className="text-sm text-muted-foreground/90 italic mb-3">
                  &ldquo;Way better than 20 questions. The clue-giving forces you to think about how others see the world.&rdquo;
                </p>
                <footer className="text-xs font-semibold text-foreground">Mike — college student</footer>
              </blockquote>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mt-8">
            <div>
              <h2 className="text-xl font-semibold text-foreground mb-2">Game Resources</h2>
              <ul className="list-disc pl-5 space-y-1">
                <li><Link href="/rules/" className="hover:text-primary transition-colors">Read Official Rules &amp; Scoring</Link></li>
                <li><Link href="/faq/" className="hover:text-primary transition-colors">Frequently Asked Questions</Link></li>
                <li><Link href="/about/" className="hover:text-primary transition-colors">About the Project</Link></li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-foreground mb-2">Play by Occasion</h2>
              <ul className="list-disc pl-5 space-y-1">
                <li><Link href="/long-distance-games/" className="hover:text-primary transition-colors">Long Distance Relationship Games</Link></li>
                <li><Link href="/couple-games/" className="hover:text-primary transition-colors">Online Games for Couples</Link></li>
                <li><Link href="/valentines-games/" className="hover:text-primary transition-colors">Valentine&apos;s Day Games</Link></li>
                <li><Link href="/relationship-games/" className="hover:text-primary transition-colors">Relationship Building Games</Link></li>
              </ul>
            </div>
          </div>

          {/* FAQ Section - visible on page, backed by FAQPage schema above */}
          <div className="mt-10">
            <h2 className="text-xl font-bold text-foreground mb-4">Frequently Asked Questions</h2>
            <div className="space-y-4">
              <details className="bg-slate-900/50 border border-slate-800 rounded-xl p-5">
                <summary className="font-semibold text-foreground cursor-pointer">What is Wavelength Online?</summary>
                <p className="mt-3 text-sm">
                  Wavelength Online is a free browser-based telepathic party game where players try to read each other&apos;s minds. One player (the Psychic) gives a clue to help others guess where a hidden target falls on a spectrum between two opposing concepts — no download or registration required.
                </p>
              </details>
              <details className="bg-slate-900/50 border border-slate-800 rounded-xl p-5">
                <summary className="font-semibold text-foreground cursor-pointer">Is Wavelength Online free to play?</summary>
                <p className="mt-3 text-sm">
                  Yes, completely free. Create a room, share the link with friends, and play instantly. Optional premium features unlock extra game modes.
                </p>
              </details>
              <details className="bg-slate-900/50 border border-slate-800 rounded-xl p-5">
                <summary className="font-semibold text-foreground cursor-pointer">How many players can play Wavelength Online?</summary>
                <p className="mt-3 text-sm">
                  2 to 20 players. Classic Mode is 1-on-1, Party Mode splits up to 20 players across two competing teams.
                </p>
              </details>
              <details className="bg-slate-900/50 border border-slate-800 rounded-xl p-5">
                <summary className="font-semibold text-foreground cursor-pointer">Does Wavelength Online work on mobile?</summary>
                <p className="mt-3 text-sm">
                  Yes — fully optimized for mobile, tablet, and desktop. Works on any modern web browser with no app install needed.
                </p>
              </details>
            </div>
          </div>
        </div>

        <Footer />
      </section>
    </div>
  );
}
