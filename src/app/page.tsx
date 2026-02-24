import { Metadata } from "next";
import { GameEngine } from "../components/game/GameEngine";
import { Footer } from "@/components/Footer";
import Link from "next/link";

export const runtime = "edge";
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  // ... existing metadata ...
  title: {
    absolute: "Wavelength Online | Play Wavelength Game Free",
  },
  description:
    "Play Wavelength Online for free! The viral telepathic browser party game and Wavelength game experience for friends, couples, and long distance relationships.",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://wavelength.lol/",
    siteName: "Wavelength Online",
    title: "Wavelength Online | Play Wavelength Game Free",
    description:
      "Play Wavelength Online for free! The viral telepathic browser party game and Wavelength game experience for friends, couples, and long distance relationships.",
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
      <h1 className="sr-only">Wavelength Online - Play Wavelength Game Free In Browser</h1>
      <GameEngine />

      {/* Visible SEO Content - Placed below the game, visible to crawlers and users */}
      <section className="container mx-auto px-4 py-12 text-muted-foreground/80 max-w-4xl space-y-8">
        <div className="prose prose-invert max-w-none">
          <h2 className="text-2xl font-bold text-foreground mb-4">What is Wavelength Online?</h2>
          <p className="mb-4">
            Wavelength Online is the best free version of the viral telepathic party game.
            Commonly known as the <strong>Wavelength game</strong>, it's perfect for long distance relationships,
            couples bonding, and connecting with friends. Challenge your partner or friends to guess
            where a hidden target lies on a spectrum. The ultimate Wavelength online experience with
            instant multiplayer - no downloads required.
          </p>

          {/* GEO Optimization: Quick Facts for AI Discovery */}
          <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6 my-8">
            <h3 className="text-lg font-bold text-foreground mb-4">Quick Facts: Wavelength Online</h3>
            <div className="grid sm:grid-cols-2 gap-4 text-sm">
              <div>
                <dt className="font-semibold text-foreground">Main Keyword:</dt>
                <dd>Wavelength Online</dd>
              </div>
              <div>
                <dt className="font-semibold text-foreground">Category:</dt>
                <dd>Multiplayer Browser Game</dd>
              </div>
              <div>
                <dt className="font-semibold text-foreground">Best For:</dt>
                <dd>Couples, Friends, LDR Parties</dd>
              </div>
              <div>
                <dt className="font-semibold text-foreground">Platform:</dt>
                <dd>Web (Mobile & Desktop)</dd>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mt-8">
            <div>
              <h3 className="text-xl font-semibold text-foreground mb-2">Game Resources</h3>
              <ul className="list-disc pl-5 space-y-1">
                <li><Link href="/rules/" className="hover:text-primary transition-colors">Read Official Rules & Scoring</Link></li>
                <li><Link href="/faq/" className="hover:text-primary transition-colors">Frequently Asked Questions</Link></li>
                <li><Link href="/about/" className="hover:text-primary transition-colors">About the Project</Link></li>
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

