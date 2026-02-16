import { Metadata } from "next";
import { GameLoader } from "../components/game/GameLoader";
import Link from "next/link";

export const runtime = "edge";

export const metadata: Metadata = {
  title: {
    absolute: "Wavelength Game Online | Free Couple Card Games",
  },
  description:
    "Play Wavelength Game Online free! The viral telepathic party game perfect for long distance relationships and couple card games. Instant play in browser.",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://wavelength.lol/",
    siteName: "Wavelength Game Online",
    title: "Wavelength Game Online | Free Couple Card Games",
    description:
      "Play Wavelength Game Online free! The viral telepathic party game perfect for long distance relationships and couple card games. Instant play in browser.",
  },
  keywords: [
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

export default function HomePage() {
  return (
    <main className="flex flex-col min-h-screen">
      {/* Interactive Game Component - Client-side rendered */}
      <h1 className="sr-only">Wavelength Game Online - Free Multiplayer Couple Card Games</h1>
      <GameLoader />

      {/* Visible SEO Content - Placed below the game, visible to crawlers and users */}
      <section className="container mx-auto px-4 py-12 text-muted-foreground/80 max-w-4xl space-y-8">
        <div className="prose prose-invert max-w-none">
          <h2 className="text-2xl font-bold text-foreground mb-4">About Wavelength Online</h2>
          <p className="mb-4">
            Wavelength Online is the best free telepathic party game to play in your browser.
            Perfect for long distance relationships, couples bonding, and connecting with friends anywhere.
            Challenge your partner or friends to guess where a hidden target lies on a spectrum.
            The ultimate LDR game with instant multiplayer - no downloads or registration required.
          </p>

          <div className="grid md:grid-cols-2 gap-8 mt-8">
            <div>
              <h3 className="text-xl font-semibold text-foreground mb-2">Game Resources</h3>
              <ul className="list-disc pl-5 space-y-1">
                <li><Link href="/rules/" className="hover:text-primary transition-colors">Read Official Rules & Scoring</Link></li>
                <li><Link href="/faq/" className="hover:text-primary transition-colors">Frequently Asked Questions</Link></li>
                <li><Link href="/about/" className="hover:text-primary transition-colors">About the Project</Link></li>
                <li><Link href="/long-distance-games/" className="hover:text-primary transition-colors">Games for Long Distance Couples</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-foreground mb-2">Why Play Wavelength?</h3>
              <ul className="list-disc pl-5 space-y-1">
                <li>Instant Browser Play</li>
                <li>Works on Mobile, Tablet & Desktop</li>
                <li>Real-time Multiplayer Sync</li>
                <li>Perfect or Virtual Date Nights</li>
              </ul>
            </div>
          </div>
        </div>

        <footer className="text-center pt-12 pb-8 border-t border-border/40">
          <div className="flex flex-wrap items-center justify-center gap-6 mb-6">
            <Link href="/terms" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Terms of Service</Link>

            <Link href="/refund-policy" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Refund Policy</Link>

            <a
              href="https://billing.stripe.com/p/login/bJe3cxgmr2kT8183KDfQI00"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-flex items-center justify-center px-5 py-2 rounded-full bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-white text-sm font-medium shadow-lg shadow-pink-500/25 hover:shadow-pink-500/40 hover:scale-105 transition-all duration-300"
            >
              <span className="relative z-10">Manage Subscription</span>
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </a>
          </div>

          <p className="text-muted-foreground/60 text-sm">
            The best way to connect with friends and partners from miles away. 💜
          </p>
        </footer>
      </section>
    </main>
  );
}
