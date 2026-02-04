import { Metadata } from "next";
import { GameLoader } from "../components/game/GameLoader";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Play Wavelength Online - Free Social Guessing Game | Browser Game",
  description:
    "Play Wavelength Online free! A telepathic party game where you guess where concepts fall on a spectrum. No download required - play instantly in your browser with friends.",
  keywords: [
    "Play Wavelength Online",
    "Wavelength Browser Game",
    "Free Social Guessing Game",
    "Telepathic Party Game",
    "Multiplayer Browser Game",
  ],
};

export default function HomePage() {
  return (
    <main>
      {/* SEO Content - Streamlined to avoid duplicate content with /rules and /faq */}
      <h1 className="sr-only">Play Wavelength Online - Free Social Guessing Game</h1>

      <div className="sr-only">
        <p>
          Wavelength Online is the best free telepathic party game to play in your browser.
          Challenge friends to guess where a hidden target lies on a spectrum.
          Instant multiplayer with no downloads or registration required.
        </p>

        <nav aria-label="Quick Navigation">
          <h2>Game Resources</h2>
          <ul>
            <li><Link href="/rules">Read the Official Rules & Scoring</Link></li>
            <li><Link href="/faq">Frequently Asked Questions</Link></li>
            <li><Link href="/about">About this Open Source Project</Link></li>
          </ul>
        </nav>

        <h2>Why Play Here?</h2>
        <ul>
          <li>100% Free & Open Source</li>
          <li>Works on Mobile & Desktop</li>
          <li>Real-time Multiplayer Sync</li>
        </ul>
      </div>

      {/* Interactive Game Component - Client-side rendered */}
      <GameLoader />

      {/* Additional SEO Footer Content */}
      <footer className="hidden">
        <nav aria-label="Game Navigation">
          <Link href="/rules">How to Play Wavelength</Link>
          <Link href="/about">About Wavelength Online</Link>
        </nav>
        <p>
          Play Wavelength Online - the best free social guessing game available in your browser.
          Challenge your friends to see who&apos;s on the same wavelength!
        </p>
      </footer>
    </main>
  );
}
