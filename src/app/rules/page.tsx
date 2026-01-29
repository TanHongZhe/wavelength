import { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Target, Brain, Trophy, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
    title: "How to Play Wavelength - Rules & Instructions",
    description: "Learn how to play Wavelength Online. Complete guide to rules, scoring, and gameplay mechanics for the social guessing game.",
};

export default function RulesPage() {
    return (
        <div className="min-h-screen pt-24 pb-12 px-6 bg-background">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="text-center mb-16">
                    <h1 className="font-display text-4xl md:text-5xl font-bold text-primary mb-4">
                        How to Play
                    </h1>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                        Wavelength is a social guessing game where two minds try to meet on the same frequency.
                    </p>
                </div>

                {/* Core Concept */}
                <div className="grid md:grid-cols-3 gap-8 mb-16">
                    <div className="game-card text-center p-8">
                        <div className="w-16 h-16 bg-wedge-teal/20 text-wedge-teal rounded-2xl flex items-center justify-center mx-auto mb-4">
                            <Brain className="w-8 h-8" />
                        </div>
                        <h3 className="font-display text-xl font-semibold mb-2">Read Minds</h3>
                        <p className="text-muted-foreground">
                            One player is the Psychic. They know where the target is.
                        </p>
                    </div>
                    <div className="game-card text-center p-8">
                        <div className="w-16 h-16 bg-wedge-orange/20 text-wedge-orange rounded-2xl flex items-center justify-center mx-auto mb-4">
                            <HelpCircle className="w-8 h-8" />
                        </div>
                        <h3 className="font-display text-xl font-semibold mb-2">Give a Clue</h3>
                        <p className="text-muted-foreground">
                            The Psychic gives a clue on a spectrum between two concepts.
                        </p>
                    </div>
                    <div className="game-card text-center p-8">
                        <div className="w-16 h-16 bg-wedge-yellow/20 text-wedge-yellow rounded-2xl flex items-center justify-center mx-auto mb-4">
                            <Target className="w-8 h-8" />
                        </div>
                        <h3 className="font-display text-xl font-semibold mb-2">Find the Spot</h3>
                        <p className="text-muted-foreground">
                            The Guesser moves the dial to where they think the target is.
                        </p>
                    </div>
                </div>

                {/* Detailed Steps */}
                <div className="space-y-12 mb-16">
                    <section className="flex flex-col md:flex-row gap-8 items-center">
                        <div className="flex-1">
                            <div className="text-sm font-bold text-wedge-teal tracking-wider uppercase mb-2">Step 1</div>
                            <h2 className="font-display text-3xl font-bold text-primary mb-4">The Spectrum</h2>
                            <p className="text-lg text-muted-foreground mb-4">
                                Each round features a card with two opposing concepts, like &quot;Hot&quot; vs &quot;Cold&quot; or &quot;Fantasy&quot; vs &quot;Reality&quot;.
                                The entire dial represents the range between these two extremes.
                            </p>
                        </div>
                        <div className="flex-1 bg-card p-8 rounded-2xl border-2 border-border/50">
                            <div className="flex justify-between items-center font-display font-bold text-primary text-lg">
                                <span>Hot</span>
                                <div className="h-2 flex-1 mx-4 bg-gradient-to-r from-orange-500 to-blue-500 rounded-full" />
                                <span>Cold</span>
                            </div>
                        </div>
                    </section>

                    <section className="flex flex-col md:flex-row-reverse gap-8 items-center">
                        <div className="flex-1">
                            <div className="text-sm font-bold text-wedge-orange tracking-wider uppercase mb-2">Step 2</div>
                            <h2 className="font-display text-3xl font-bold text-primary mb-4">The Clue</h2>
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
                    </section>

                    <section className="flex flex-col md:flex-row gap-8 items-center">
                        <div className="flex-1">
                            <div className="text-sm font-bold text-wedge-yellow tracking-wider uppercase mb-2">Step 3</div>
                            <h2 className="font-display text-3xl font-bold text-primary mb-4">The Guess</h2>
                            <p className="text-lg text-muted-foreground mb-4">
                                The Guesser interprets the clue and moves the red needle to where they believe the target is located.
                                Once they are confident, they lock in their guess.
                            </p>
                        </div>
                        <div className="flex-1 bg-card p-8 rounded-2xl border-2 border-border/50 flex justify-center">
                            <ArrowRight className="w-16 h-16 text-primary rotate-45" />
                        </div>
                    </section>

                    <section className="flex flex-col md:flex-row-reverse gap-8 items-center">
                        <div className="flex-1">
                            <div className="text-sm font-bold text-primary tracking-wider uppercase mb-2">Step 4</div>
                            <h2 className="font-display text-3xl font-bold text-primary mb-4">The Reveal</h2>
                            <p className="text-lg text-muted-foreground mb-4">
                                The target is revealed! Points are awarded based on how close the guess was to the center of the target.
                            </p>
                            <ul className="space-y-2">
                                <li className="flex items-center gap-2">
                                    <span className="w-6 h-6 rounded-full bg-wedge-teal flex items-center justify-center text-xs font-bold text-white">4</span>
                                    <span>Points: Bullseye! (Dead center)</span>
                                </li>
                                <li className="flex items-center gap-2">
                                    <span className="w-6 h-6 rounded-full bg-wedge-orange flex items-center justify-center text-xs font-bold text-white">3</span>
                                    <span>Points: Near miss</span>
                                </li>
                                <li className="flex items-center gap-2">
                                    <span className="w-6 h-6 rounded-full bg-wedge-yellow flex items-center justify-center text-xs font-bold text-white">2</span>
                                    <span>Points: Close call</span>
                                </li>
                            </ul>
                        </div>
                        <div className="flex-1 bg-card p-8 rounded-2xl border-2 border-border/50 flex items-center justify-center">
                            <Trophy className="w-24 h-24 text-wedge-teal" />
                        </div>
                    </section>
                </div>

                {/* CTA */}
                <div className="text-center mt-20 p-12 bg-card rounded-3xl border-2 border-primary/10">
                    <h2 className="font-display text-3xl font-bold text-primary mb-4">
                        Ready to test your telepathy?
                    </h2>
                    <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto">
                        Jump into a game right now. No download required.
                    </p>
                    <Link href="/">
                        <Button size="lg" className="btn-game px-12 py-6 text-xl">
                            Play Now <ArrowRight className="ml-2 w-6 h-6" />
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    );
}
