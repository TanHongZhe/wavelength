import { Metadata } from "next";
import { GameWrapper } from "./GameWrapper";
import { MoreGamesSidebar } from "@/components/minigames/MoreGamesSidebar";


export const metadata: Metadata = {
    title: {
        absolute: "General Knowledge Quiz Game - Play Online Trivia for Free",
    },
    description: "Challenge friends in this fast-paced General Knowledge Quiz! Answer in 10 seconds across 15 topics like History & Science. Play free online now.",
    keywords: ["general knowledge quiz", "online trivia game", "multiplayer quiz", "play trivia with friends", "history quiz", "science trivia", "pop culture quiz", "free online games"],
    alternates: {
        canonical: "https://wavelength.lol/games/general-knowledge/",
    },
    openGraph: {
        title: "General Knowledge Quiz Game - Play Online Trivia for Free",
        description: "Think you know it all? Prove it in this rapid-fire trivia showdown. Play with friends for free!",
        type: "website",
        url: "https://wavelength.lol/games/general-knowledge/",
    },
};

export default function GeneralKnowledgePage() {
    return (
        <div className="min-h-screen bg-background text-foreground flex flex-col">
            <h1 className="sr-only">General Knowledge Quiz Game - Play Online Trivia for Free</h1>
            <GameWrapper />

            <div className="container mx-auto px-4 py-16 max-w-6xl">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    <div className="lg:col-span-2 space-y-12">
                        <section>
                            <h2 className="text-2xl font-bold text-white drop-shadow-sm mb-4">
                                The Ultimate General Knowledge Challenge
                            </h2>
                            <p className="text-base text-slate-400 leading-relaxed">
                                Put your random knowledge to the test with our **General Knowledge Quiz**.
                                From pop culture and history to science and literature, cover all bases in this fast-paced
                                showdown. You have just 10 seconds per question—no time for Googling!
                            </p>
                        </section>

                        <section className="grid md:grid-cols-2 gap-8">
                            <div className="bg-slate-900/40 backdrop-blur-md border border-white/10 p-6 rounded-2xl">
                                <h3 className="text-xl font-bold text-white mb-4">How It Works</h3>
                                <ul className="space-y-3 list-disc list-inside text-slate-400 text-sm">
                                    <li><strong className="text-white">Pick a Topic:</strong> Choose from 8 decks like History, Science, or Random.</li>
                                    <li><strong className="text-white">Beat the Clock:</strong> You have 10 seconds to answer each question.</li>
                                    <li><strong className="text-white">Score Points:</strong> Get it right to earn points. First to the top wins!</li>
                                    <li><strong className="text-white">Multiplayer:</strong> Up to 6 players can join a room.</li>
                                </ul>
                            </div>
                            <div className="bg-slate-900/40 backdrop-blur-md border border-white/10 p-6 rounded-2xl">
                                <h3 className="text-xl font-bold text-white mb-4">Why Play?</h3>
                                <p className="text-slate-400 mb-4 text-sm">
                                    Whether you're hosting a game night, killing time with friends, or just want to prove you're the
                                    smartest person in the room, this quiz delivers instant fun and friendly competition.
                                </p>
                            </div>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-white drop-shadow-sm mb-6">Topics Included</h2>
                            <ul className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-slate-400">
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
