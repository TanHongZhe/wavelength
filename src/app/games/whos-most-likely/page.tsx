import { Metadata } from "next";
import { GameWrapper } from "./GameWrapper";
import { MoreGamesSidebar } from "@/components/minigames/MoreGamesSidebar";


export const metadata: Metadata = {
    title: {
        absolute: "Who's Most Likely? - The Couples & Friends Party Game",
    },
    description: "Point fingers in this rapid-fire 'Who is most likely to' game. Perfect for couples, friends, and parties. Play online for free.",
    keywords: ["who's most likely game", "couples most likely to", "fun party games for friends", "online drinking game", "zoom party games"],
    openGraph: {
        title: "Who's Most Likely? - The Couples & Friends Party Game",
        description: "Point fingers and find out what your friends really think of you!",
        type: "website",
    },
};

export default function WhosMostLikelyPage() {
    return (
        <div className="min-h-screen bg-background text-foreground flex flex-col">
            <h1 className="sr-only">Who's Most Likely? - The Couples & Friends Party Game</h1>
            <GameWrapper />

            <div className="container mx-auto px-4 py-16 max-w-6xl">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    <div className="lg:col-span-2 space-y-12">
                        <section>
                            <h2 className="text-2xl font-bold text-white drop-shadow-sm mb-4">
                                The Classic 'Most Likely To' Game
                            </h2>
                            <p className="text-base text-slate-400 leading-relaxed">
                                It's the game that reveals what you *really* think about each other.
                                **Who's Most Likely** is a fast-paced game where you have just 10 seconds to decide which player fits the description best.
                            </p>
                        </section>

                        <section className="grid md:grid-cols-2 gap-8">
                            <div className="bg-slate-900/40 backdrop-blur-md border border-white/10 p-6 rounded-2xl">
                                <h3 className="text-xl font-bold text-white mb-4">How to Play</h3>
                                <ul className="space-y-3 list-disc list-inside text-slate-400 text-sm">
                                    <li><strong className="text-white">Step 1:</strong> Create a room and invite a friend or partner.</li>
                                    <li><strong className="text-white">Step 2:</strong> A question appears (e.g., "Who is most likely to forget their anniversary?").</li>
                                    <li><strong className="text-white">Step 3:</strong> You have 10 seconds to vote for Player 1 or Player 2.</li>
                                    <li><strong className="text-white">Step 4:</strong> Matches score points!</li>
                                </ul>
                            </div>
                            <div className="bg-slate-900/40 backdrop-blur-md border border-white/10 p-6 rounded-2xl">
                                <h3 className="text-xl font-bold text-white mb-4">Decks Available</h3>
                                <ul className="mt-2 text-slate-400 space-y-3 text-sm">
                                    <li>
                                        😇 <strong className="text-white">Normal Mode:</strong> Fun, lighthearted questions safe for everyone.
                                    </li>
                                    <li>
                                        😬 <strong className="text-white">Awkward Mode:</strong> Questions designed to stir the pot and create funny tension.
                                    </li>
                                    <li>
                                        😈 <strong className="text-white">Lust Mode:</strong> Strictly for couples. 18+ questions to heat things up.
                                    </li>
                                </ul>
                            </div>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-white drop-shadow-sm mb-6">Why Play Online?</h2>
                            <p className="text-slate-400 mb-4 text-sm">
                                Wavelength makes it easy to play "Who's Most Likely" even if you aren't in the same room.
                                Whether you're in a long-distance relationship or just hanging out on Discord, our real-time sync makes it feel like you're together.
                            </p>
                        </section>
                    </div>

                    <div className="lg:col-span-1">
                        <MoreGamesSidebar currentGame="/games/whos-most-likely" />
                    </div>
                </div>
            </div>

            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "SoftwareApplication",
                        "name": "Who's Most Likely",
                        "applicationCategory": "GameApplication",
                        "operatingSystem": "Browser",
                        "description": "An online version of the popular 'Who is most likely to' party game.",
                        "offers": {
                            "@type": "Offer",
                            "price": "0",
                            "priceCurrency": "USD"
                        }
                    })
                }}
            />
        </div>
    );
}
