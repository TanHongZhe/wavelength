import { Metadata } from "next";
import { GameWrapper } from "./GameWrapper";
import { MoreGamesSidebar } from "@/components/minigames/MoreGamesSidebar";


export const metadata: Metadata = {
    title: {
        absolute: "This or That: Rapid Fire Couples Game",
    },
    description: "The ultimate 'This or That' rapid fire game for couples. Choose between two options in 10 seconds and see if you match!",
    keywords: ["this or that game", "couples rapid fire", "relationship quiz", "online date night game", "compatibility test"],
    alternates: {
        canonical: "https://wavelength.lol/games/this-or-that/",
    },
    openGraph: {
        title: "This or That: Rapid Fire Couples Game",
        description: "10 seconds. 2 options. Can you match your partner's choice?",
        type: "website",
        url: "https://wavelength.lol/games/this-or-that/",
    },
};

export default function ThisOrThatPage() {
    return (
        <div className="min-h-screen bg-background text-foreground flex flex-col">
            <h1 className="sr-only">This or That: Rapid Fire Couples Game</h1>
            <GameWrapper />

            <div className="container mx-auto px-4 py-16 max-w-6xl">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    <div className="lg:col-span-2 space-y-12">
                        <section>
                            <h2 className="text-2xl font-bold text-white drop-shadow-sm mb-4">
                                The Fast-Paced Compatibility Game
                            </h2>
                            <p className="text-base text-slate-400 leading-relaxed">
                                **This or That** is the classic rapid-fire game reimagined for couples online.
                                You're presented with two options—like "Coffee or Tea", "Beach or Mountains", "Cuddling or Making Out"—and
                                you have just 10 seconds to lock in your answer.
                            </p>
                        </section>

                        <section className="grid md:grid-cols-2 gap-8">
                            <div className="bg-slate-900/40 backdrop-blur-md border border-white/10 p-6 rounded-2xl">
                                <h3 className="text-xl font-bold text-white mb-4">How to Play</h3>
                                <ul className="space-y-3 list-disc list-inside text-slate-400 text-sm">
                                    <li><strong className="text-white">Step 1:</strong> Start a game and invite your partner.</li>
                                    <li><strong className="text-white">Step 2:</strong> A "This or That" question appears.</li>
                                    <li><strong className="text-white">Step 3:</strong> You have 10 seconds to tap your choice.</li>
                                    <li><strong className="text-white">Step 4:</strong> Matches earn points!</li>
                                </ul>
                            </div>
                            <div className="bg-slate-900/40 backdrop-blur-md border border-white/10 p-6 rounded-2xl">
                                <h3 className="text-xl font-bold text-white mb-4">Why It's Fun</h3>
                                <p className="text-slate-400 text-sm">
                                    It's simple, fast, and surprisingly revealing. It forces you to go with your gut instinct
                                    and sparks fun debates about your choices afterward. Perfect for killing time or LDR date nights.
                                </p>
                            </div>
                        </section>
                    </div>

                    <div className="lg:col-span-1">
                        <MoreGamesSidebar currentGame="/games/this-or-that" />
                    </div>
                </div>
            </div>

            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "SoftwareApplication",
                        "name": "This or That Game",
                        "applicationCategory": "GameApplication",
                        "operatingSystem": "Browser",
                        "description": "A rapid-fire This or That game for couples.",
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
