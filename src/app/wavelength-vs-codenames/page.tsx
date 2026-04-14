import { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: {
    absolute: "Wavelength vs Codenames: Which Game Should You Play? | Wavelength Online",
  },
  description:
    "Comparing Wavelength Online and Codenames? Both are brilliant word-clue games, but they play very differently. Find out which game fits your group and how to play each free online.",
  keywords: [
    "wavelength vs codenames",
    "codenames vs wavelength",
    "best word guessing games online",
    "games like codenames",
    "games like wavelength",
    "codenames online free",
    "wavelength online free",
    "party games like codenames",
    "social deduction games online",
    "best browser party games",
  ],
  alternates: {
    canonical: "https://wavelength.lol/wavelength-vs-codenames/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://wavelength.lol/wavelength-vs-codenames/",
    siteName: "Wavelength Online",
    title: "Wavelength vs Codenames: Which Game Should You Play?",
    description:
      "Both are brilliant clue-giving games — but they're very different. Compare Wavelength Online and Codenames to find out which fits your group.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Wavelength vs Codenames comparison",
      },
    ],
  },
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Wavelength vs Codenames: Which Game Should You Play?",
  description:
    "A fair, detailed comparison of Wavelength Online and Codenames — covering gameplay, player counts, difficulty, and when to play each game.",
  url: "https://wavelength.lol/wavelength-vs-codenames/",
  image: "https://wavelength.lol/og-image.png",
  author: { "@type": "Organization", name: "Wavelength Game" },
  publisher: {
    "@type": "Organization",
    name: "Wavelength Game",
    logo: { "@type": "ImageObject", url: "https://wavelength.lol/icon-512.png" },
  },
  datePublished: "2024-01-01",
  dateModified: new Date().toISOString().split("T")[0],
  mainEntityOfPage: { "@type": "WebPage", "@id": "https://wavelength.lol/wavelength-vs-codenames/" },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Is Wavelength similar to Codenames?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Both games involve giving clues and guessing, but they're mechanically different. Codenames uses a grid of words where you give one clue to connect multiple targets. Wavelength uses a dial — you give a clue about where a hidden point sits on a spectrum between two opposing concepts. Wavelength is more about intuition and alignment; Codenames is more about categorization and lateral thinking.",
      },
    },
    {
      "@type": "Question",
      name: "Which is better for couples — Wavelength or Codenames?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Wavelength Online is generally better for couples. It's 2-player friendly and every round generates conversation about how you think differently. Codenames works best with 4+ players split into teams and tends to be more competitive.",
      },
    },
    {
      "@type": "Question",
      name: "Can you play Codenames online for free?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes — Codenames has an unofficial browser version at codenames.game. Wavelength Online is also free at wavelength.lol. Both run in the browser with no download required.",
      },
    },
    {
      "@type": "Question",
      name: "Which game is easier to learn — Wavelength or Codenames?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Wavelength is faster to learn. The mechanic is intuitive — guess where a point is on a scale. Codenames has more rules to remember, especially around the Spymaster role and the game-ending assassin card.",
      },
    },
  ],
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://wavelength.lol/" },
    { "@type": "ListItem", position: 2, name: "Wavelength vs Codenames", item: "https://wavelength.lol/wavelength-vs-codenames/" },
  ],
};

// Factual comparison data — based on published game rules
const comparison = [
  {
    category: "Core mechanic",
    wavelength: "Give a clue for a hidden point on a spectrum dial",
    codenames: "Give a one-word clue connecting multiple grid words",
  },
  {
    category: "Players",
    wavelength: "2–20 (great at any count)",
    codenames: "4–8 (best with 4+, needs teams)",
  },
  {
    category: "Learning curve",
    wavelength: "5 minutes — intuitive from round 1",
    codenames: "10–15 minutes — rules have exceptions",
  },
  {
    category: "Round length",
    wavelength: "~2 min per round",
    codenames: "20–40 min per full game",
  },
  {
    category: "Best for couples",
    wavelength: "Yes — 2-player mode built in",
    codenames: "Not ideal — designed for teams",
  },
  {
    category: "Generates conversation",
    wavelength: "Yes — every round is debatable",
    codenames: "Less so — focus is on winning",
  },
  {
    category: "Play online free",
    wavelength: "Yes — wavelength.lol",
    codenames: "Yes — unofficial browser version",
  },
  {
    category: "Original designer",
    wavelength: "Wolfgang Warsch, Alex Hague, Justin Vickers",
    codenames: "Vlaada Chvátil (Czech Games Edition)",
  },
];

const wavelengthWins = [
  "Playing as a couple or with 2–3 people",
  "You want rounds to spark real conversation",
  "New players or mixed-age groups",
  "Quick 15-minute sessions",
  "Virtual game nights where you want everyone engaged",
];

const codenamesWins = [
  "You have 4–8 players and want team competition",
  "Your group loves lateral thinking puzzles",
  "You want a full 30–40 minute game with a clear winner",
  "Players enjoy strategy over intuition",
];

export default function WavelengthVsCodenamesPage() {
  return (
    <>
      {[articleSchema, faqSchema, breadcrumbSchema].map((schema, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      ))}
      <article className="min-h-screen pt-24 pb-12 px-6 bg-background">
        <div className="max-w-4xl mx-auto">
          {/* Breadcrumb */}
          <nav className="text-xs text-muted-foreground mb-6" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
            <span className="mx-2">/</span>
            <span>Wavelength vs Codenames</span>
          </nav>

          {/* Header */}
          <header className="mb-12">
            <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
              Wavelength vs Codenames: Which Game Should You Play?
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl">
              Both are clue-giving party games beloved by tabletop fans — but they play very differently. Here&apos;s an honest comparison to help you pick the right one.
            </p>
          </header>

          {/* TL;DR */}
          <section className="bg-slate-900/40 border border-white/10 rounded-2xl p-6 mb-12">
            <h2 className="text-lg font-bold text-foreground mb-3">The Short Answer</h2>
            <p className="text-muted-foreground mb-3">
              <strong className="text-foreground">Play Wavelength</strong> if you want something quick, intuitive, and perfect for 2–6 people — especially couples or mixed-age groups.
            </p>
            <p className="text-muted-foreground">
              <strong className="text-foreground">Play Codenames</strong> if you have a bigger group (4–8), want team competition, and enjoy lateral thinking puzzles with a strategic edge.
            </p>
          </section>

          {/* Side-by-side comparison table */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-foreground mb-6">Head-to-Head Comparison</h2>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr>
                    <th className="text-left p-4 bg-slate-900/60 border border-white/10 text-muted-foreground font-medium text-sm">Category</th>
                    <th className="text-left p-4 bg-primary/10 border border-white/10 text-primary font-bold text-sm">Wavelength Online</th>
                    <th className="text-left p-4 bg-slate-900/60 border border-white/10 text-foreground font-bold text-sm">Codenames</th>
                  </tr>
                </thead>
                <tbody>
                  {comparison.map((row, i) => (
                    <tr key={row.category} className={i % 2 === 0 ? "bg-slate-900/20" : ""}>
                      <td className="p-4 border border-white/10 text-sm font-medium text-muted-foreground">{row.category}</td>
                      <td className="p-4 border border-white/10 text-sm text-foreground">{row.wavelength}</td>
                      <td className="p-4 border border-white/10 text-sm text-muted-foreground">{row.codenames}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* When to pick each */}
          <section className="grid md:grid-cols-2 gap-6 mb-12">
            <div className="bg-primary/5 border border-primary/20 rounded-2xl p-6">
              <h2 className="text-xl font-bold text-primary mb-4">Choose Wavelength When...</h2>
              <ul className="space-y-3">
                {wavelengthWins.map((item) => (
                  <li key={item} className="flex gap-3 text-sm text-foreground">
                    <CheckCircle className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
              <Link href="/" className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-primary hover:underline">
                Play Wavelength Free <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>
            </div>
            <div className="bg-slate-900/40 border border-white/10 rounded-2xl p-6">
              <h2 className="text-xl font-bold text-foreground mb-4">Choose Codenames When...</h2>
              <ul className="space-y-3">
                {codenamesWins.map((item) => (
                  <li key={item} className="flex gap-3 text-sm text-muted-foreground">
                    <CheckCircle className="w-4 h-4 text-muted-foreground flex-shrink-0 mt-0.5" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-xs text-muted-foreground">
                Codenames is available at codenames.game (unofficial browser version).
              </p>
            </div>
          </section>

          {/* Deep dive differences */}
          <section className="mb-12 space-y-8">
            <h2 className="text-2xl font-bold text-foreground">How They Actually Play Differently</h2>

            <div className="bg-slate-900/40 border border-white/10 rounded-2xl p-6">
              <h3 className="text-lg font-bold text-foreground mb-3">The Clue-Giving Experience</h3>
              <p className="text-muted-foreground mb-3">
                In <strong className="text-foreground">Codenames</strong>, the Spymaster gives a single clue that must connect multiple words on a grid (e.g., &ldquo;Space: 3&rdquo; means three of the grid words relate to space). It rewards vocabulary and categorical thinking — and punishes clues that accidentally point at the opponent&apos;s words.
              </p>
              <p className="text-muted-foreground">
                In <strong className="text-foreground">Wavelength</strong>, there&apos;s no grid and no opponent word trap. You just give one clue about <em>where on a scale</em> something sits. The challenge isn&apos;t language — it&apos;s predicting how your specific partner interprets concepts. This makes it feel much more personal.
              </p>
            </div>

            <div className="bg-slate-900/40 border border-white/10 rounded-2xl p-6">
              <h3 className="text-lg font-bold text-foreground mb-3">What &ldquo;Winning&rdquo; Feels Like</h3>
              <p className="text-muted-foreground mb-3">
                Codenames has a clear win condition: one team identifies all their agents before the other. Victory feels earned — a result of smart clue-giving and careful guessing.
              </p>
              <p className="text-muted-foreground">
                Wavelength scores points but the <em>real</em> win is a perfect bullseye — that moment when both players&apos; interpretations were identical. That shared experience is more memorable than the score. Many groups play Wavelength primarily for the conversations, not the leaderboard.
              </p>
            </div>

            <div className="bg-slate-900/40 border border-white/10 rounded-2xl p-6">
              <h3 className="text-lg font-bold text-foreground mb-3">Playing with Non-Gamers</h3>
              <p className="text-muted-foreground">
                Wavelength is consistently the easier onboarding. There are no hidden roles, no game-ending assassin cards, no team composition decisions. Someone who has never played a party game in their life can understand the core loop — &ldquo;guess where the target is on the scale&rdquo; — before the first round ends. Codenames requires a full rules explanation and a practice round.
              </p>
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
            <h2 className="font-display text-3xl font-bold text-primary mb-3">Try Wavelength Free — Right Now</h2>
            <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
              No download, no account. Create a room, share the link, and be playing in under 30 seconds.
            </p>
            <Link href="/">
              <Button size="lg" className="btn-game px-10 py-5 text-lg">
                Play Wavelength Online <ArrowRight className="ml-2 w-5 h-5" aria-hidden="true" />
              </Button>
            </Link>
          </section>

          {/* Internal links */}
          <nav aria-label="Related pages" className="grid sm:grid-cols-2 gap-4 mb-8">
            {[
              { href: "/couple-games/", label: "Online Games for Couples" },
              { href: "/long-distance-games/", label: "Long Distance Relationship Games" },
              { href: "/how-well-do-you-know-your-partner/", label: "How Well Do You Know Your Partner?" },
              { href: "/faq/", label: "Wavelength Online FAQ" },
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
