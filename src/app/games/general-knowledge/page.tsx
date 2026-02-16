import { Metadata } from "next";
import { GameWrapper } from "./GameWrapper";
import { MoreGamesSidebar } from "@/components/minigames/MoreGamesSidebar";

export const metadata: Metadata = {
    title: "General Knowledge Quiz Game - Play Online Trivia for Free | Wavelength",
    description: "Challenge your friends in this fast-paced General Knowledge Quiz! 10 seconds per question across 8 topics like History, Science & Pop Culture. Play free online now.",
    keywords: ["general knowledge quiz", "online trivia game", "multiplayer quiz", "play trivia with friends", "history quiz", "science trivia", "pop culture quiz", "free online games"],
    openGraph: {
        title: "General Knowledge Quiz - Rate Your Brainpower",
        description: "Think you know it all? Prove it in this rapid-fire trivia showdown. Play with friends for free!",
        type: "website",
    },
};

export default function GeneralKnowledgePage() {
    return (
        <div className="min-h-screen bg-background text-foreground flex flex-col">
            <GameWrapper />

            <div className="container mx-auto px-4 py-16 max-w-6xl">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    <div className="lg:col-span-2 space-y-12">
                        <section>
                            <h2 className="text-2xl font-bold text-foreground mb-4">
                                The Ultimate General Knowledge Challenge
                            </h2>
                            <p className="text-base text-muted-foreground leading-relaxed">
                                Put your random knowledge to the test with our **General Knowledge Quiz**.
                                From pop culture and history to science and literature, cover all bases in this fast-paced
                                showdown. You have just 10 seconds per question—no time for Googling!
                            </p>
                        </section>

                        <section className="grid md:grid-cols-2 gap-8">
                            <div className="bg-card p-6 rounded-2xl border border-border/50">
                                <h3 className="text-xl font-bold text-foreground mb-4">How It Works</h3>
                                <ul className="space-y-3 list-disc list-inside text-muted-foreground text-sm">
                                    <li><strong>Pick a Topic:</strong> Choose from 8 decks like History, Science, or Random.</li>
                                    <li><strong>Beat the Clock:</strong> You have 10 seconds to answer each question.</li>
                                    <li><strong>Score Points:</strong> Get it right to earn points. First to the top wins!</li>
                                    <li><strong>Multiplayer:</strong> Up to 6 players can join a room.</li>
                                </ul>
                            </div>
                            <div className="bg-card p-6 rounded-2xl border border-border/50">
                                <h3 className="text-xl font-bold text-foreground mb-4">Why Play?</h3>
                                <p className="text-muted-foreground mb-4 text-sm">
                                    Whether you're hosting a game night, killing time with friends, or just want to prove you're the
                                    smartest person in the room, this quiz delivers instant fun and friendly competition.
                                </p>
                            </div>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-foreground mb-6">Topics Included</h2>
                            <ul className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-muted-foreground">
                                <li className="flex items-center gap-2">🧠 Classic</li>
                                <li className="flex items-center gap-2">🎬 Pop Culture</li>
                                <li className="flex items-center gap-2">📜 History</li>
                                <li className="flex items-center gap-2">🔬 Science</li>
                                <li className="flex items-center gap-2">🌍 Geography</li>
                                <li className="flex items-center gap-2">📚 Literature</li>
                                <li className="flex items-center gap-2">⚽ Sports</li>
                                <li className="flex items-center gap-2">🎲 Random</li>
                            </ul>
                        </section>
                    </div>

                    <div className="lg:col-span-1">
                        <MoreGamesSidebar currentGame="/games/general-knowledge" />
                    </div>
                </div>
            </div>
        </div>
    );
}
