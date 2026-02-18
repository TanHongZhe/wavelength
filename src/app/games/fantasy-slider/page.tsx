import { Metadata } from "next";
import { GameWrapper } from "./GameWrapper";
import { MoreGamesSidebar } from "@/components/minigames/MoreGamesSidebar";


export const metadata: Metadata = {
    title: {
        absolute: "Fantasy Slider: The Ultimate Couples Lust & Romance Game",
    },
    description: "Rate your spicy fantasies from 0-10 and see if you match! The perfect lust mini-game for couples to explore desires. Play for free online.",
    keywords: ["lust mini games", "spicy couple games", "online couples games", "fantasy rating game", "18+ couple games", "relationship games"],
    openGraph: {
        title: "Fantasy Slider: The Ultimate Couples Lust & Romance Game",
        description: "How well do your fantasies align? Rate them and find out!",
        type: "website",
    },
};

export default function FantasySliderPage() {
    return (
        <div className="min-h-screen bg-background text-foreground flex flex-col">
            <h1 className="sr-only">Fantasy Slider: The Ultimate Couples Lust & Romance Game</h1>
            <GameWrapper />

            {/* SEO Content Section */}
            <div className="container mx-auto px-4 py-16 max-w-6xl">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    <div className="lg:col-span-2 space-y-12">
                        <section>
                            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                                Fantasy Slider: The Spicy Mini Game for Couples
                            </h2>
                            <p className="text-base text-muted-foreground leading-relaxed">
                                Looking to spice up your relationship or just curious about what your partner is into?
                                **Fantasy Slider** is the perfect "lust mini game" designed to help couples communicate their desires
                                in a fun, low-pressure way.
                            </p>
                        </section>

                        <section className="grid md:grid-cols-2 gap-8">
                            <div className="bg-card p-6 rounded-2xl border border-border/50">
                                <h3 className="text-xl font-bold text-foreground mb-4">How to Play</h3>
                                <ul className="space-y-3 list-disc list-inside text-muted-foreground text-sm">
                                    <li><strong>Step 1:</strong> Start a game and share the room code with your partner.</li>
                                    <li><strong>Step 2:</strong> A fantasy scenario appears (e.g., "Kissing in the rain").</li>
                                    <li><strong>Step 3:</strong> Rate your interest secretly on a slider from 0 ("Nope") to 10 ("Absolute Dream").</li>
                                    <li><strong>Step 4:</strong> Lock in your answer and wait for your partner to do the same.</li>
                                    <li><strong>Step 5:</strong> Reveal! Score points based on how compatible your answers are.</li>
                                </ul>
                            </div>
                            <div className="bg-card p-6 rounded-2xl border border-border/50">
                                <h3 className="text-xl font-bold text-foreground mb-4">Why Play?</h3>
                                <p className="text-muted-foreground mb-4 text-sm">
                                    It's not just about winning; it's about discovery. Find out which fantasies you both share
                                    and which ones might need a little more conversation.
                                </p>
                                <p className="font-semibold text-primary text-sm">
                                    Featuring two decks:
                                </p>
                                <ul className="mt-2 text-muted-foreground space-y-1 text-sm">
                                    <li>😇 <strong>Normal Deck:</strong> Fun, romantic, and sweet.</li>
                                    <li>😈 <strong>Lust Deck:</strong> Spicy, 18+ scenarios for the adventurous.</li>
                                </ul>
                            </div>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-foreground mb-4">Frequently Asked Questions</h2>
                            <div className="space-y-6">
                                <div>
                                    <h3 className="text-lg font-bold text-foreground mb-2">Is this game free?</h3>
                                    <p className="text-sm text-muted-foreground">Yes! The base game with the Normal deck is completely free to play. The Lust deck is available for Pro users.</p>
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-foreground mb-2">Do we need to be in the same room?</h3>
                                    <p className="text-sm text-muted-foreground">Nope! Fantasy Slider is a perfect long-distance relationship game. Just share the room code and play from anywhere in the world.</p>
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-foreground mb-2">Is it anonymous?</h3>
                                    <p className="text-sm text-muted-foreground">Your partner will see your answers once both of you have locked in. That's the fun part!</p>
                                </div>
                            </div>
                        </section>
                    </div>

                    <div className="lg:col-span-1">
                        <MoreGamesSidebar currentGame="/games/fantasy-slider" />
                    </div>
                </div>
            </div>

            {/* JSON-LD Schema */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "SoftwareApplication",
                        "name": "Fantasy Slider",
                        "applicationCategory": "GameApplication",
                        "operatingSystem": "Browser",
                        "description": "A couples compatibility game to rate fantasies and discover shared interests.",
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
