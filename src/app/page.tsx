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
      {/* SEO Content - Rendered on Server, visible to crawlers */}
      <div className="sr-only">
        <h1>Play Wavelength Online - Free Social Guessing Game</h1>
        <p>
          Wavelength Online is a free telepathic party game you can play right in your browser.
          No downloads, no installations - just instant multiplayer fun with friends and family.
        </p>

        <h2>How to Play Wavelength</h2>
        <p>
          Wavelength is a social guessing game where players try to read each other&apos;s minds.
          One player is the Psychic who sees a hidden target on a spectrum between two opposing concepts.
          The Psychic gives a one-word clue to help their teammates guess where the target is located.
        </p>

        <h3>Game Rules</h3>
        <ol>
          <li>The Psychic sees a hidden target position on the dial</li>
          <li>A spectrum card shows two opposing concepts (e.g., &quot;Hot&quot; to &quot;Cold&quot;)</li>
          <li>The Psychic gives a one-word clue to hint at the target location</li>
          <li>The Guesser moves the dial needle to their best guess</li>
          <li>Points are awarded based on how close the guess is to the target</li>
        </ol>

        <h3>Scoring System</h3>
        <ul>
          <li>4 Points - Dead center! Perfect guess!</li>
          <li>3 Points - Very close to the target</li>
          <li>2 Points - Close but not quite</li>
          <li>0 Points - Missed the target zone</li>
        </ul>

        <h2>Why Play Wavelength Online?</h2>
        <ul>
          <li>100% Free to play - no payment required</li>
          <li>No download or installation needed</li>
          <li>Works on any device with a web browser</li>
          <li>Perfect for remote game nights</li>
          <li>Fun for all ages - family-friendly content</li>
          <li>Both casual and competitive play modes</li>
        </ul>

        <h2>About Wavelength</h2>
        <p>
          Wavelength is the digital version of the popular party game that tests how well
          you know your friends and family. Originally a physical board game, our online
          version brings the same excitement to your browser. Whether you&apos;re playing with
          friends across the world or having a virtual game night, Wavelength Online
          delivers hours of telepathic fun.
        </p>
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
