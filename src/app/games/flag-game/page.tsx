import { Metadata } from "next";
import { GameWrapper } from "./GameWrapper";
import { MoreGamesSidebar } from "@/components/minigames/MoreGamesSidebar";


export const metadata: Metadata = {
    title: {
        absolute: "Red Flag or Green Flag Game - Rate Dating Scenarios",
    },
    description: "Use Red, Green, and Beige flags to rate dating behaviors. The viral TikTok trend made into a multiplayer game. Play now with friends or partners.",
    keywords: ["red flag quiz", "green flag game", "beige flags", "dating quiz game", "relationship red flags", "viral tiktok game", "online multiplayer game"],
    alternates: {
        canonical: "https://wavelength.lol/games/flag-game/",
    },
    openGraph: {
        title: "Red Flag or Green Flag Game - Rate Dating Scenarios",
        description: "Is owning a snake a Red Flag or Green Flag? You decide with friends!",
        type: "website",
        url: "https://wavelength.lol/games/flag-game/",
    },
};

export default function FlagGamePage() {
    return (
        <div className="min-h-screen bg-background text-foreground flex flex-col">
            <h1 className="sr-only">Red Flag or Green Flag Game - Rate Dating Scenarios</h1>
            <GameWrapper />

            <div className="container mx-auto px-4 py-16 max-w-6xl">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    <div className="lg:col-span-2 space-y-12">
                        <section>
                            <h2 className="text-2xl font-bold text-white drop-shadow-sm mb-4">
                                The Viral Red Flag / Green Flag Game
                            </h2>
                            <p className="text-base text-slate-400 leading-relaxed">
                                Inspired by the viral TikTok trend, our **Flag Game** puts your dating standards to the test.
                                A scenario pops up—"They clap when the plane lands"—and you have to decide: is this a dealbreaker (Red Flag),
                                a total turn-on (Green Flag), or just weird but harmless (Beige Flag)?
                            </p>
                        </section>

                        <section className="grid md:grid-cols-2 gap-8">
                            <div className="bg-slate-900/40 backdrop-blur-md border border-white/10 p-6 rounded-2xl">
                                <h3 className="text-xl font-bold text-white mb-4">How It Works</h3>
                                <ul className="space-y-3 list-disc list-inside text-slate-400 text-sm">
                                    <li><strong className="text-white">Create a Game:</strong> Play solo or invite friends/partners.</li>
                                    <li><strong className="text-white">See the Scenario:</strong> "They have a shared Facebook account with their ex."</li>
                                    <li><strong className="text-white">Vote:</strong> Choose Red 🚩, Green 🟢, or Beige 🟧 within the time limit.</li>
                                    <li><strong className="text-white">Debate:</strong> See your friends' answers and argue your case!</li>
                                </ul>
                            </div>
                            <div className="bg-slate-900/40 backdrop-blur-md border border-white/10 p-6 rounded-2xl">
                                <h3 className="text-xl font-bold text-white mb-4">Why It's Fun</h3>
                                <p className="text-slate-400 mb-4 text-sm">
                                    It's the perfect icebreaker for first dates, a fun activity for couples, or a hilarious party game.
                                    Discover your friends' hidden icks and what they actually value in a relationship.
                                </p>
                            </div>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-white drop-shadow-sm mb-6">What is a Beige Flag?</h2>
                            <p className="text-slate-400 mb-4 text-sm">
                                A <strong className="text-white">Beige Flag</strong> is something that isn't inherently good or bad, just... odd. Like someone who
                                sets their alarm for 6:03 AM exactly, or eats pizza with a fork. It's not a dealbreaker, but it definitely makes you pause.
                            </p>
                        </section>
                    </div>

                    <div className="lg:col-span-1">
                        <MoreGamesSidebar currentGame="/games/flag-game" />
                    </div>
                </div>
            </div>

            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "SoftwareApplication",
                        "name": "Red Flag Green Flag Game",
                        "applicationCategory": "GameApplication",
                        "operatingSystem": "Browser",
                        "description": "Rate dating behaviors as Red, Green, or Beige flags.",
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
