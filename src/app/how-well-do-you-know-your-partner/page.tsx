import { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: {
    absolute: "How Well Do You Know Your Partner? Play the Free Online Game",
  },
  description:
    "Find out how well you really know your partner with the Wavelength game — a free online telepathic game that tests how aligned your thinking truly is. No download required.",
  keywords: [
    "how well do you know your partner",
    "how well do you know your partner game",
    "partner quiz online",
    "couples quiz online free",
    "do you know your partner game",
    "relationship compatibility game",
    "how well do you know me game",
    "couples mind reading game",
    "how well do couples know each other",
    "free couples quiz",
    "get to know your partner game",
    "couples alignment game",
  ],
  alternates: {
    canonical: "https://wavelength.lol/how-well-do-you-know-your-partner/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://wavelength.lol/how-well-do-you-know-your-partner/",
    siteName: "Wavelength Online",
    title: "How Well Do You Know Your Partner? Play the Free Online Game",
    description:
      "Find out how well you really know your partner. The Wavelength game tests how aligned your thinking truly is — free, no download, play instantly.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "How Well Do You Know Your Partner - Wavelength Online",
      },
    ],
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How do you find out how well you know your partner?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The best way to test how well you know your partner is through a real-time alignment game like Wavelength Online. Unlike static quizzes, Wavelength requires one player to give a clue and the other to guess — revealing genuine differences (and surprising similarities) in how you both think.",
      },
    },
    {
      "@type": "Question",
      name: "What is the 'How Well Do You Know Your Partner' game?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "It's a category of couple games where partners answer questions or make choices and compare how closely they matched. Wavelength Online is a version of this: one player (the Psychic) sees where a hidden target sits on a spectrum and gives a clue — the other player guesses where it is. Points are scored based on alignment.",
      },
    },
    {
      "@type": "Question",
      name: "Is there a free online quiz to test how well couples know each other?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes — Wavelength Online is free and works in any browser. It goes beyond a simple quiz by creating dynamic, real-time rounds that reveal how similarly you and your partner interpret concepts, phrases, and ideas.",
      },
    },
    {
      "@type": "Question",
      name: "How long does the Wavelength game take?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A typical session is 15–30 minutes depending on the number of rounds you set. You can also play a quick 5-minute session with fewer rounds.",
      },
    },
  ],
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://wavelength.lol/" },
    {
      "@type": "ListItem",
      position: 2,
      name: "How Well Do You Know Your Partner",
      item: "https://wavelength.lol/how-well-do-you-know-your-partner/",
    },
  ],
};

const gameSchema = {
  "@context": "https://schema.org",
  "@type": "VideoGame",
  name: "Wavelength Online — How Well Do You Know Your Partner?",
  description:
    "A free browser-based telepathic game that tests how aligned couples are by having them give clues and guess positions on a spectrum. The ultimate 'how well do you know your partner' game.",
  url: "https://wavelength.lol/how-well-do-you-know-your-partner/",
  image: "https://wavelength.lol/og-image.png",
  operatingSystem: "Web Browser",
  applicationCategory: "Game",
  gamePlatform: ["Web Browser", "Desktop", "Mobile"],
  genre: ["Couples Game", "Quiz Game", "Party Game", "Relationship Game"],
  numberOfPlayers: { "@type": "QuantitativeValue", minValue: 2, maxValue: 20 },
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD", availability: "https://schema.org/InStock" },
  isAccessibleForFree: true,
};

const spectrumExamples = [
  { left: "Hot", right: "Cold", clue: "Ice cream", insight: "Is ice cream closer to cold or just cold-adjacent? The debate reveals how literally each person interprets things." },
  { left: "Serious", right: "Silly", clue: "A first date", insight: "One of you may see first dates as nerve-wracking, the other as an adventure. Watch who goes where." },
  { left: "Famous", right: "Unknown", clue: "Your hometown", insight: "This one exposes hometown pride — and exactly how much you've told your partner about where you grew up." },
  { left: "Overrated", right: "Underrated", clue: "Brunch", insight: "The brunch spectrum has ended more relationships than it should. See where you both land." },
];

export default function HowWellDoYouKnowYourPartnerPage() {
  return (
    <>
      {[faqSchema, breadcrumbSchema, gameSchema].map((schema, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      ))}
      <article className="min-h-screen pt-24 pb-12 px-6 bg-background">
        <div className="max-w-4xl mx-auto">
          {/* Breadcrumb */}
          <nav className="text-xs text-muted-foreground mb-6" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
            <span className="mx-2">/</span>
            <span>How Well Do You Know Your Partner</span>
          </nav>

          {/* Header */}
          <header className="mb-12">
            <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
              How Well Do You Know Your Partner?
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl">
              Stop guessing. Play Wavelength Online — the free browser game that objectively reveals how aligned your thinking really is.
            </p>
            <div className="mt-6">
              <Link href="/">
                <Button size="lg" className="btn-game px-8 py-4 text-lg">
                  Find Out Now — Play Free <ArrowRight className="ml-2 w-5 h-5" aria-hidden="true" />
                </Button>
              </Link>
            </div>
          </header>

          {/* Why quizzes aren't enough */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-foreground mb-4">Why &ldquo;Trivia About Your Partner&rdquo; Isn&apos;t Enough</h2>
            <p className="text-muted-foreground mb-4">
              Most &ldquo;how well do you know your partner&rdquo; games ask things like their favorite color or their mom&apos;s birthday. That&apos;s memorization, not understanding.
            </p>
            <p className="text-muted-foreground mb-4">
              <strong className="text-foreground">Wavelength tests something deeper:</strong> how you and your partner interpret the world. Is the same clue closer to &ldquo;hot&rdquo; or &ldquo;cold&rdquo;? Is a politician closer to &ldquo;good&rdquo; or &ldquo;evil&rdquo;? These questions don&apos;t have a right answer — only a <em>your partner&apos;s</em> answer.
            </p>
            <p className="text-muted-foreground">
              The gap between where you place the dial and where they do is the real measurement. Some gaps are hilarious. Some are surprising. Some will lead to a 30-minute conversation about why you think coffee is &ldquo;hot&rdquo; and they think it&apos;s &ldquo;cold-adjacent.&rdquo;
            </p>
          </section>

          {/* What the game reveals */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-foreground mb-6">What Wavelength Actually Reveals About Your Partner</h2>
            <div className="space-y-4">
              {spectrumExamples.map((ex) => (
                <div key={ex.clue} className="bg-slate-900/40 border border-white/10 rounded-2xl p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-xs font-mono text-muted-foreground px-2 py-1 bg-slate-800 rounded">{ex.left}</span>
                    <div className="flex-1 h-px bg-white/10" />
                    <span className="text-sm font-bold text-foreground">&ldquo;{ex.clue}&rdquo;</span>
                    <div className="flex-1 h-px bg-white/10" />
                    <span className="text-xs font-mono text-muted-foreground px-2 py-1 bg-slate-800 rounded">{ex.right}</span>
                  </div>
                  <p className="text-sm text-muted-foreground italic">{ex.insight}</p>
                </div>
              ))}
            </div>
          </section>

          {/* How to play */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-foreground mb-4">How to Play</h2>
            <ol className="space-y-4">
              {[
                { n: "1", t: "One person is the Psychic", d: "Only the Psychic sees where the hidden target is on the dial — between two opposing concepts like Hot/Cold or Good/Evil." },
                { n: "2", t: "Give a one-word clue", d: "The Psychic gives a single clue that hints at where the target is. Too easy and you score nothing. Too vague and your partner misses." },
                { n: "3", t: "Your partner places the dial", d: "Based on the clue, your partner moves the dial to where they think the target is. The closer they are, the more points you score." },
                { n: "4", t: "Reveal & discuss", d: "The target reveals. You either celebrate an exact match — or spend 10 minutes debating why your clue meant something completely different to each of you." },
              ].map((step) => (
                <li key={step.n} className="bg-slate-900/40 border border-white/10 rounded-xl p-5 flex gap-4">
                  <span className="w-8 h-8 rounded-full bg-primary/10 text-primary font-bold text-sm flex items-center justify-center flex-shrink-0">
                    {step.n}
                  </span>
                  <div>
                    <h3 className="font-bold text-foreground mb-1">{step.t}</h3>
                    <p className="text-sm text-muted-foreground">{step.d}</p>
                  </div>
                </li>
              ))}
            </ol>
          </section>

          {/* Game modes for couples */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-foreground mb-4">Game Modes to Test Your Alignment</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                { href: "/", label: "Classic Wavelength", desc: "The original spectrum game. Pure clue-giving and guessing — the cleanest test of how alike you think." },
                { href: "/games/this-or-that/", label: "This or That", desc: "Rapid-fire choices. See if you and your partner consistently pick the same side. Surprising how often you don't." },
                { href: "/games/fantasy-slider/", label: "Fantasy Slider", desc: "Rate scenarios on a 0–10 slider. Revealing, funny, and great for couples who want to learn something new." },
                { href: "/games/whos-most-likely/", label: "Who's Most Likely", desc: "Point the finger at each other. Who's most likely to get lost? To cry at a movie? You might be surprised." },
              ].map((mode) => (
                <Link key={mode.href} href={mode.href} className="bg-slate-900/40 border border-white/10 rounded-xl p-5 hover:border-white/20 transition-colors group">
                  <h3 className="font-bold text-foreground mb-1 group-hover:text-primary transition-colors">{mode.label} →</h3>
                  <p className="text-sm text-muted-foreground">{mode.desc}</p>
                </Link>
              ))}
            </div>
          </section>

          {/* FAQ */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-foreground mb-4">Frequently Asked Questions</h2>
            <div className="space-y-3">
              {faqSchema.mainEntity.map((q, i) => (
                <details key={i} className="bg-slate-900/40 border border-white/10 rounded-xl p-5">
                  <summary className="font-semibold text-foreground cursor-pointer">{q.name}</summary>
                  <p className="mt-3 text-sm text-muted-foreground">{q.acceptedAnswer.text}</p>
                </details>
              ))}
            </div>
          </section>

          {/* CTA */}
          <section className="text-center p-10 bg-card rounded-3xl border-2 border-primary/10 mb-12">
            <h2 className="font-display text-3xl font-bold text-primary mb-3">Ready to Find Out?</h2>
            <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
              Start a game in 30 seconds. No download, no account. Just you, your partner, and a dial.
            </p>
            <Link href="/">
              <Button size="lg" className="btn-game px-10 py-5 text-lg">
                Play Wavelength Free <ArrowRight className="ml-2 w-5 h-5" aria-hidden="true" />
              </Button>
            </Link>
          </section>

          {/* Internal links */}
          <nav aria-label="Related pages" className="grid sm:grid-cols-2 gap-4 mb-8">
            {[
              { href: "/couple-games/", label: "Online Games for Couples" },
              { href: "/long-distance-games/", label: "Long Distance Relationship Games" },
              { href: "/relationship-games/", label: "Relationship Building Games" },
              { href: "/valentines-games/", label: "Valentine's Day Games" },
            ].map((link) => (
              <Link key={link.href} href={link.href} className="flex items-center justify-between p-4 bg-slate-900/40 border border-white/10 rounded-xl hover:border-white/20 transition-colors">
                <span className="text-sm font-medium text-foreground">{link.label}</span>
                <ArrowRight className="w-4 h-4 text-muted-foreground" aria-hidden="true" />
              </Link>
            ))}
          </nav>

          <Footer />
        </div>
      </article>
    </>
  );
}
