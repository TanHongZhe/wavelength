import { Metadata } from "next";
import { GameEngine } from "../components/game/GameEngine";
import { Footer } from "@/components/Footer";
import Link from "next/link";

export const runtime = "edge";
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  // ... existing metadata ...
  title: {
    absolute: "Wavelength Game | Play Wavelength Online Free",
  },
  description:
    "Play the Wavelength game online for free! The viral telepathic browser party game perfect for friends, long distance relationships, and couples.",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://wavelength.lol/",
    siteName: "Wavelength Game",
    title: "Wavelength Game | Play Wavelength Online Free",
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

export default function HomePage() {
  return (
    <main className="flex flex-col min-h-screen">
      {/* Interactive Game Component - Client-side rendered */}
      <h1 className="sr-only">Wavelength Game - Free Multiplayer Browser Party Game</h1>
      <GameEngine />

      {/* Visible SEO Content - Placed below the game, visible to crawlers and users */}
      <section className="container mx-auto px-4 py-12 text-muted-foreground/80 max-w-4xl space-y-8">
        <div className="prose prose-invert max-w-none">
          <h2 className="text-2xl font-bold text-foreground mb-4">About the Wavelength Game</h2>
          <p className="mb-4">
            The Wavelength game online is the best free telepathic party game to play in your browser.
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

        <Footer />
      </section>
    </main>
  );
}

