import { Metadata } from "next";
import { GameWrapper } from "./GameWrapper";
import { MoreGamesSidebar } from "@/components/minigames/MoreGamesSidebar";

export const runtime = 'edge';

export const metadata: Metadata = {
    title: "This or That: Rapid Fire Couples Game | Wavelength",
    description: "The ultimate 'This or That' rapid fire game for couples. Choose between two options in 10 seconds and see if you match!",
    keywords: ["this or that game", "couples rapid fire", "relationship quiz", "online date night game", "compatibility test"],
    openGraph: {
        title: "This or That - Couples Rapid Fire",
        description: "10 seconds. 2 options. Can you match your partner's choice?",
        type: "website",
    },
};

export default function ThisOrThatPage() {
    return (
        <div className="min-h-screen bg-background text-foreground flex flex-col">
            <GameWrapper />

            <div className="container mx-auto px-4 py-16 max-w-6xl">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    <div className="lg:col-span-2 space-y-12">
                        <section>
                            <h2 className="text-2xl font-bold text-foreground mb-4">
                                The Fast-Paced Compatibility Game
                            </h2>
                            <p className="text-base text-muted-foreground leading-relaxed">
                                **This or That** is the classic rapid-fire game reimagined for couples online.
                                You're presented with two options—like "Coffee or Tea", "Beach or Mountains", "Cuddling or Making Out"—and
                                you have just 10 seconds to lock in your answer.
                            </p>
                        </section>

                        <section className="grid md:grid-cols-2 gap-8">
                            <div className="bg-card p-6 rounded-2xl border border-border/50">
                                <h3 className="text-xl font-bold text-foreground mb-4">How to Play</h3>
                                <ul className="space-y-3 list-disc list-inside text-muted-foreground text-sm">
                                    <li><strong>Step 1:</strong> Start a game and invite your partner.</li>
                                    <li><strong>Step 2:</strong> A "This or That" question appears.</li>
                                    <li><strong>Step 3:</strong> You have 10 seconds to tap your choice.</li>
                                    <li><strong>Step 4:</strong> Matches earn points!</li>
                                </ul>
                            </div>
                            <div className="bg-card p-6 rounded-2xl border border-border/50">
                                <h3 className="text-xl font-bold text-foreground mb-4">Why It's Fun</h3>
                                <p className="text-muted-foreground text-sm">
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
