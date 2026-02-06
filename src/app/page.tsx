import { Metadata } from "next";
import { GameLoader } from "../components/game/GameLoader";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Wavelength Online - Free Social Guessing Game",
  description:
    "Play Wavelength Online free! The viral telepathic party game perfect for long distance relationships and couples bonding. Guess where concepts fall on a spectrum. No download required - instant browser play.",
  keywords: [
    "Play Wavelength Online",
    "Wavelength Browser Game",
    "Free Social Guessing Game",
    "Telepathic Party Game",
    "Multiplayer Browser Game",
    "Long distance relationship games",
    "LDR games online",
    "Couples bonding games",
    "Virtual date night games",
  ],
};

export default function HomePage() {
  return (
    <main>
      {/* SEO Content - Streamlined to avoid duplicate content with /rules and /faq */}

      <div className="sr-only">
        <h1>Wavelength Online - The Best Game for Long Distance Relationships</h1>
        <p>
          Wavelength Online is the best free telepathic party game to play in your browser.
          Perfect for long distance relationships, couples bonding, and connecting with friends from miles away.
          Challenge your partner or friends to guess where a hidden target lies on a spectrum.
          The ultimate LDR game with instant multiplayer - no downloads or registration required.
        </p>

        <nav aria-label="Quick Navigation">
          <h2>Game Resources</h2>
          <ul>
            <li><Link href="/rules">Read the Official Rules &amp; Scoring</Link></li>
            <li><Link href="/faq">Frequently Asked Questions</Link></li>
            <li><Link href="/about">About this Open Source Project</Link></li>
            <li><Link href="/long-distance-games">Games for Long Distance Relationships</Link></li>
          </ul>
        </nav>

        <h2>Why Play Here?</h2>
        <ul>
          <li>100% Free &amp; Open Source</li>
          <li>Works on Mobile &amp; Desktop</li>
          <li>Real-time Multiplayer Sync</li>
          <li>Perfect for LDR couples and long distance friends</li>
          <li>Great for virtual date nights</li>
        </ul>
      </div>

      {/* Interactive Game Component - Client-side rendered */}
      <GameLoader />

      {/* Visible SEO Footer - Styled subtly */}
      <footer className="text-center py-6 px-4 text-sm text-muted-foreground/70">
        <p>
          The best way to connect with friends and partners from miles away. 💜
        </p>
      </footer>

      {/* Additional Hidden SEO Content */}
      <div className="hidden">
        <nav aria-label="Game Navigation">
          <Link href="/rules">How to Play Wavelength</Link>
          <Link href="/about">About Wavelength Online</Link>
          <Link href="/long-distance-games">Long Distance Relationship Games</Link>
        </nav>
        <p>
          Play Wavelength Online - the best free social guessing game available in your browser.
          Challenge your friends to see who&apos;s on the same wavelength!
          Perfect for couples in long distance relationships looking for games to play together online.
        </p>
      </div>
    </main>
  );
}
