import { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Target, Brain, Trophy, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
    title: "How to Play Wavelength - Rules & Instructions",
    description: "Learn how to play Wavelength Online. Complete guide to rules, scoring, and gameplay mechanics for the social guessing game. Master the art of giving clues on a spectrum!",
    keywords: [
        "wavelength rules",
        "how to play wavelength",
        "wavelength game instructions",
        "wavelength scoring",
        "wavelength gameplay",
    ],
    alternates: {
        canonical: "https://wavelength.lol/rules/",
    },
    openGraph: {
        title: "How to Play Wavelength - Rules & Instructions",
        description: "Learn how to play Wavelength Online. Complete guide to rules, scoring, and gameplay mechanics.",
        url: "https://wavelength.lol/rules/",
    },
};

// FAQ Schema for GEO
const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
        {
            "@type": "Question",
            name: "How many players can play Wavelength?",
            acceptedAnswer: {
                "@type": "Answer",
                text: "Wavelength can be played with 2 to 20 players. Classic mode is designed for 2 players, while Party mode supports 2-6 players per team.",
            },
        },
        {
            "@type": "Question",
            name: "How does scoring work in Wavelength?",
            acceptedAnswer: {
                "@type": "Answer",
                text: "Points are awarded based on how close your guess is to the target: 4 points for a bullseye (dead center), 3 points for a near miss, 2 points for a close call, and 0 points if you miss the target zone entirely.",
            },
        },
        {
            "@type": "Question",
            name: "What is the role of the Psychic in Wavelength?",
            acceptedAnswer: {
                "@type": "Answer",
                text: "The Psychic sees the hidden target location on the dial and must give a one-word clue to help their teammates guess where it is on the spectrum between two opposing concepts.",
            },
        },
        {
            "@type": "Question",
            name: "Is Wavelength free to play online?",
            acceptedAnswer: {
                "@type": "Answer",
                text: "Yes! Wavelength Online is completely free to play in your browser. No download or registration required - just share a link with friends and start playing.",
            },
        },
    ],
};

// HowTo Schema for step-by-step instructions
const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How to Play Wavelength Online",
    description: "Learn how to play Wavelength, the telepathic party game where players guess positions on a spectrum.",
    totalTime: "PT5M",
    step: [
        {
            "@type": "HowToStep",
            name: "View the Spectrum",
            text: "Each round features a card with two opposing concepts, like 'Hot' vs 'Cold'. The dial represents the range between these two extremes.",
            position: 1,
        },
        {
            "@type": "HowToStep",
            name: "The Psychic Gives a Clue",
            text: "The Psychic sees a hidden target on the dial and gives a one-word clue suggesting that position on the spectrum.",
            position: 2,
        },
        {
            "@type": "HowToStep",
            name: "The Guesser Makes Their Guess",
            text: "The Guesser interprets the clue and moves the needle to where they believe the target is located, then locks in their guess.",
            position: 3,
        },
        {
            "@type": "HowToStep",
            name: "Reveal and Score",
            text: "The target is revealed! Points are awarded: 4 for bullseye, 3 for near miss, 2 for close call, 0 for missing.",
            position: 4,
        },
    ],
};

// Breadcrumb Schema
const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
        {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: "https://wavelength.lol",
        },
        {
            "@type": "ListItem",
            position: 2,
            name: "Rules",
            item: "https://wavelength.lol/rules/",
        },
    ],
};

const jsonLdSchemas = [faqSchema, howToSchema, breadcrumbSchema];

export default function RulesPage() {
    return (
        <>
            {jsonLdSchemas.map((schema, index) => (
                <script
                    key={index}
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
                />
            ))}
            <article className="min-h-screen pt-24 pb-12 px-6 bg-background">
                <div className="max-w-4xl mx-auto">
                    {/* Header */}
                    <header className="text-center mb-16">
                        <h1 className="font-display text-4xl md:text-5xl font-bold text-primary mb-4">
                            How to Play
                        </h1>
                        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                            Wavelength is a social guessing game where two minds try to meet on the same frequency.
                        </p>
                    </header>

                    {/* Core Concept */}
                    <section aria-labelledby="core-concepts" className="grid md:grid-cols-3 gap-8 mb-16">
                        <h2 id="core-concepts" className="sr-only">Core Game Concepts</h2>
                        <div className="game-card text-center p-8">
                            <div className="w-16 h-16 bg-wedge-teal/20 text-wedge-teal rounded-2xl flex items-center justify-center mx-auto mb-4">
                                <Brain className="w-8 h-8" aria-hidden="true" />
                            </div>
                            <h3 className="font-display text-xl font-semibold mb-2">Read Minds</h3>
                            <p className="text-muted-foreground">
                                One player is the Psychic. They know where the target is.
                            </p>
                        </div>
                        <div className="game-card text-center p-8">
                            <div className="w-16 h-16 bg-wedge-orange/20 text-wedge-orange rounded-2xl flex items-center justify-center mx-auto mb-4">
                                <HelpCircle className="w-8 h-8" aria-hidden="true" />
                            </div>
                            <h3 className="font-display text-xl font-semibold mb-2">Give a Clue</h3>
                            <p className="text-muted-foreground">
                                The Psychic gives a clue on a spectrum between two concepts.
                            </p>
                        </div>
                        <div className="game-card text-center p-8">
                            <div className="w-16 h-16 bg-wedge-yellow/20 text-wedge-yellow rounded-2xl flex items-center justify-center mx-auto mb-4">
                                <Target className="w-8 h-8" aria-hidden="true" />
                            </div>
                            <h3 className="font-display text-xl font-semibold mb-2">Find the Spot</h3>
                            <p className="text-muted-foreground">
                                The Guesser moves the dial to where they think the target is.
                            </p>
                        </div>
                    </section>

                    {/* Detailed Steps */}
                    <section aria-labelledby="detailed-steps" className="space-y-12 mb-16">
                        <h2 id="detailed-steps" className="sr-only">Step-by-Step Guide</h2>

                        <div className="flex flex-col md:flex-row gap-8 items-center">
                            <div className="flex-1">
                                <div className="text-sm font-bold text-wedge-teal tracking-wider uppercase mb-2">Step 1</div>
                                <h3 className="font-display text-3xl font-bold text-primary mb-4">The Spectrum</h3>
                                <p className="text-lg text-muted-foreground mb-4">
                                    Each round features a card with two opposing concepts, like &quot;Hot&quot; vs &quot;Cold&quot; or &quot;Fantasy&quot; vs &quot;Reality&quot;.
                                    The entire dial represents the range between these two extremes.
                                </p>
                            </div>
                            <div className="flex-1 bg-card p-8 rounded-2xl border-2 border-border/50">
                                <div className="flex justify-between items-center font-display font-bold text-primary text-lg">
                                    <span>Hot</span>
                                    <div className="h-2 flex-1 mx-4 bg-gradient-to-r from-orange-500 to-blue-500 rounded-full" role="img" aria-label="Spectrum from Hot to Cold" />
                                    <span>Cold</span>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col md:flex-row-reverse gap-8 items-center">
                            <div className="flex-1">
                                <div className="text-sm font-bold text-wedge-orange tracking-wider uppercase mb-2">Step 2</div>
                                <h3 className="font-display text-3xl font-bold text-primary mb-4">The Clue</h3>
                                <p className="text-lg text-muted-foreground mb-4">
                                    The Psychic sees a hidden target location on the dial. They must give a single clue (usually one word or phrase)
                                    that suggests that specific position on the spectrum.
                                </p>
                                <div className="bg-secondary/50 p-4 rounded-xl text-sm italic">
                                    Example: If the target is slightly towards &quot;Hot&quot; but mostly in the middle, the clue might be &quot;Coffee&quot;.
                                </div>
                            </div>
                            <div className="flex-1 bg-card p-8 rounded-2xl border-2 border-border/50 flex items-center justify-center">
                                <div className="text-center">
                                    <div className="font-display font-bold text-2xl text-primary mb-2">&quot;Coffee&quot;</div>
                                    <div className="text-sm text-muted-foreground">The clue suggests...</div>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col md:flex-row gap-8 items-center">
                            <div className="flex-1">
                                <div className="text-sm font-bold text-wedge-yellow tracking-wider uppercase mb-2">Step 3</div>
                                <h3 className="font-display text-3xl font-bold text-primary mb-4">The Guess</h3>
                                <p className="text-lg text-muted-foreground mb-4">
                                    The Guesser interprets the clue and moves the red needle to where they believe the target is located.
                                    Once they are confident, they lock in their guess.
                                </p>
                            </div>
                            <div className="flex-1 bg-card p-8 rounded-2xl border-2 border-border/50 flex justify-center">
                                <ArrowRight className="w-16 h-16 text-primary rotate-45" aria-hidden="true" />
                            </div>
                        </div>

                        <div className="flex flex-col md:flex-row-reverse gap-8 items-center">
                            <div className="flex-1">
                                <div className="text-sm font-bold text-primary tracking-wider uppercase mb-2">Step 4</div>
                                <h3 className="font-display text-3xl font-bold text-primary mb-4">The Reveal</h3>
                                <p className="text-lg text-muted-foreground mb-4">
                                    The target is revealed! Points are awarded based on how close the guess was to the center of the target.
                                </p>
                                <ul className="space-y-2" role="list">
                                    <li className="flex items-center gap-2">
                                        <span className="w-6 h-6 rounded-full bg-wedge-teal flex items-center justify-center text-xs font-bold text-white" aria-hidden="true">4</span>
                                        <span>Points: Bullseye! (Dead center)</span>
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <span className="w-6 h-6 rounded-full bg-wedge-orange flex items-center justify-center text-xs font-bold text-white" aria-hidden="true">3</span>
                                        <span>Points: Near miss</span>
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <span className="w-6 h-6 rounded-full bg-wedge-yellow flex items-center justify-center text-xs font-bold text-white" aria-hidden="true">2</span>
                                        <span>Points: Close call</span>
                                    </li>
                                </ul>
                            </div>
                            <div className="flex-1 bg-card p-8 rounded-2xl border-2 border-border/50 flex items-center justify-center">
                                <Trophy className="w-24 h-24 text-wedge-teal" aria-hidden="true" />
                            </div>
                        </div>
                    </section>

                    {/* FAQ Section (Visible for GEO) */}
                    <section aria-labelledby="faq-heading" className="mb-16">
                        <h2 id="faq-heading" className="font-display text-3xl font-bold text-primary mb-8 text-center">
                            Frequently Asked Questions
                        </h2>
                        <div className="space-y-6">
                            <details className="game-card p-6 group" open>
                                <summary className="font-semibold text-lg cursor-pointer list-none flex justify-between items-center">
                                    How many players can play Wavelength?
                                    <span className="text-primary group-open:rotate-180 transition-transform">▼</span>
                                </summary>
                                <p className="mt-4 text-muted-foreground">
                                    Wavelength can be played with 2 to 20 players. Classic mode is designed for 2 players, while Party mode supports 2-6 players per team.
                                </p>
                            </details>
                            <details className="game-card p-6 group">
                                <summary className="font-semibold text-lg cursor-pointer list-none flex justify-between items-center">
                                    How does scoring work in Wavelength?
                                    <span className="text-primary group-open:rotate-180 transition-transform">▼</span>
                                </summary>
                                <p className="mt-4 text-muted-foreground">
                                    Points are awarded based on how close your guess is to the target: 4 points for a bullseye (dead center), 3 points for a near miss, 2 points for a close call, and 0 points if you miss the target zone entirely.
                                </p>
                            </details>
                            <details className="game-card p-6 group">
                                <summary className="font-semibold text-lg cursor-pointer list-none flex justify-between items-center">
                                    What is the role of the Psychic?
                                    <span className="text-primary group-open:rotate-180 transition-transform">▼</span>
                                </summary>
                                <p className="mt-4 text-muted-foreground">
                                    The Psychic sees the hidden target location on the dial and must give a one-word clue to help their teammates guess where it is on the spectrum between two opposing concepts.
                                </p>
                            </details>
                            <details className="game-card p-6 group">
                                <summary className="font-semibold text-lg cursor-pointer list-none flex justify-between items-center">
                                    Is Wavelength free to play online?
                                    <span className="text-primary group-open:rotate-180 transition-transform">▼</span>
                                </summary>
                                <p className="mt-4 text-muted-foreground">
                                    Yes! Wavelength Online is completely free to play in your browser. No download or registration required - just share a link with friends and start playing.
                                </p>
                            </details>
                        </div>
                    </section>

                    {/* CTA */}
                    <section className="text-center mt-20 p-12 bg-card rounded-3xl border-2 border-primary/10">
                        <h2 className="font-display text-3xl font-bold text-primary mb-4">
                            Ready to test your telepathy?
                        </h2>
                        <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto">
                            Jump into a game right now. No download required.
                        </p>
                        <Link href="/">
                            <Button size="lg" className="btn-game px-12 py-6 text-xl">
                                Play Now <ArrowRight className="ml-2 w-6 h-6" aria-hidden="true" />
                            </Button>
                        </Link>
                    </section>
                </div>
            </article>
        </>
    );
}

