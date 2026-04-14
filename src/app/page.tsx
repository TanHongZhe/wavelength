import { Metadata } from "next";
import { GameEngine } from "../components/game/GameEngine";
import { Footer } from "@/components/Footer";
import Link from "next/link";

export const runtime = "edge";
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  // ... existing metadata ...
  title: {
    absolute: "Play Wavelength Online | Free Telepathic Browser Game",
  },
  description:
    "Play the Wavelength game online for free! The viral telepathic browser party game perfect for friends, long distance relationships, and couples.",
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

export default function HomePage() {
  return (
    <main className="flex flex-col min-h-screen">
      <GameEngine />

      {/* Visible SEO Content - Placed below the game, visible to crawlers and users */}
      <section className="container mx-auto px-4 py-12 text-muted-foreground/80 max-w-4xl space-y-8">
        <div className="prose prose-invert max-w-none">
          <h1 className="text-3xl font-extrabold text-foreground mb-4">Play Wavelength Online</h1>
          <p className="mb-4 text-lg">
            The <strong>Wavelength game online</strong> is the best free telepathic party game to play natively in your browser.
            Perfect for long-distance relationships, couples bonding, and connecting with friends anywhere.
            Challenge your partner or friends to guess exactly where a hidden target lies on a spectrum.
            The ultimate LDR game with instant multiplayer - no downloads or registration required.
          </p>

          <div className="mt-8 mb-8 border-l-4 border-primary pl-4">
            <h2 className="text-xl font-bold text-foreground mb-3">Explore Multiple Wavelength Game Modes</h2>
            <p className="mb-3">
              When you play <strong>Wavelength online</strong>, you aren't just limited to the standard questions. We have expanded the Wavelength game to include a massive variety of categories to suit any vibe:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>Classic Wavelength Game:</strong> The standard mode you know and love, perfect for friends and family gatherings.</li>
              <li><strong>General Knowledge:</strong> Test your alignment on pop culture, movies, music, and science with hundreds of custom cards.</li>
              <li><strong>Couples & Date Night:</strong> Relationship-focused questions designed to see how well you and your partner actually align.</li>
              <li><strong>18+ Lust & Spicy Modes:</strong> Looking to spice up your virtual date nights? Our adult-themed game modes (like the 18+ Lust deck) add a hilarious, spicy twist to the traditional Wavelength game, making it the perfect late-night activity.</li>
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
                <dd>2+ Players</dd>
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

          <div className="grid md:grid-cols-2 gap-8 mt-8">
            <div>
              <h2 className="text-xl font-semibold text-foreground mb-2">Game Resources</h2>
              <ul className="list-disc pl-5 space-y-1">
                <li><Link href="/rules/" className="hover:text-primary transition-colors">Read Official Rules & Scoring</Link></li>
                <li><Link href="/faq/" className="hover:text-primary transition-colors">Frequently Asked Questions</Link></li>
                <li><Link href="/about/" className="hover:text-primary transition-colors">About the Project</Link></li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-foreground mb-2">Why Play Wavelength?</h2>
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

