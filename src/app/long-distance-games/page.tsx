import { Metadata } from "next";
import { GameLoader } from "../../components/game/GameLoader";
import Link from "next/link";
import { LandingOverlay } from "../../components/LandingOverlay";

export const metadata: Metadata = {
    title: "Best Games for Long Distance Relationships | LDR Games Online",
    description:
        "Looking for games to play with your long distance partner? Wavelength is the perfect LDR game for couples bonding. Free, no download, instant multiplayer connection.",
    keywords: [
        "Long distance relationship games",
        "LDR games online",
        "Games to play with boyfriend long distance",
        "Games to play with girlfriend long distance",
        "Couples bonding games",
        "Virtual date night games",
        "Online relationship games",
        "Games for long distance friends",
        "Connection games for couples",
        "Deep conversation starter game",
        "LDR activities",
        "Long distance date ideas",
    ],
    alternates: {
        canonical: "https://wavelength.lol/long-distance-games",
    },
    openGraph: {
        title: "Best Games for Long Distance Relationships | Wavelength",
        description:
            "The perfect game for LDR couples. Connect, bond, and have fun together even when you're miles apart. Free to play in your browser!",
        url: "https://wavelength.lol/long-distance-games",
    },
};

// JSON-LD Schema for LDR landing page
const ldrGameSchema = {
    "@context": "https://schema.org",
    "@type": "VideoGame",
    name: "Wavelength - Long Distance Relationship Game",
    description:
        "The perfect game for couples in long distance relationships. A telepathic guessing game that helps you connect and bond with your partner from anywhere in the world.",
    url: "https://wavelength.lol/long-distance-games",
    image: "https://wavelength.lol/og-image.png",
    operatingSystem: "Web Browser",
    applicationCategory: "Game",
    gamePlatform: ["Web Browser", "Desktop", "Mobile"],
    genre: ["Couples Game", "Relationship Game", "LDR Game", "Party Game"],
    numberOfPlayers: {
        "@type": "QuantitativeValue",
        minValue: 2,
        maxValue: 20,
    },
    playMode: ["MultiPlayer", "CoOp"],
    offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
        availability: "https://schema.org/InStock",
    },
    isAccessibleForFree: true,
    audience: {
        "@type": "Audience",
        audienceType: "Long Distance Couples",
    },
};

const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
        {
            "@type": "Question",
            name: "What are good games to play in a long distance relationship?",
            acceptedAnswer: {
                "@type": "Answer",
                text: "Wavelength is one of the best games for LDR couples. It's a telepathic guessing game where you and your partner try to get on the same wavelength by guessing where concepts fall on a spectrum. It's free, works in any browser, and creates meaningful conversations.",
            },
        },
        {
            "@type": "Question",
            name: "How do you play games with your long distance partner?",
            acceptedAnswer: {
                "@type": "Answer",
                text: "Simply share a room code with your partner! One person creates a game room and shares the code. Your partner joins using that code, and you can play together in real-time while video calling. No downloads required.",
            },
        },
        {
            "@type": "Question",
            name: "Is Wavelength free to play online?",
            acceptedAnswer: {
                "@type": "Answer",
                text: "Yes! Wavelength Online is 100% free to play. No downloads, no registration, no hidden fees. Just open your browser and start playing with your partner instantly.",
            },
        },
    ],
};

export default function LongDistanceGamesPage() {
    return (
        <main>
            {/* Schema.org structured data */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(ldrGameSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
            />

            {/* Landing Overlay */}
            <LandingOverlay
                title="The Best Game for Long Distance Relationships"
                description="Connect with your partner from miles away. Wavelength is the perfect LDR game for couples who want to bond, have fun, and discover how well they know each other."
                emoji="💜"
                gradient="from-purple-400 via-pink-400 to-purple-400"
            />

            {/* Interactive Game Component */}
            <GameLoader />

            {/* LDR-focused content section */}
            <section className="max-w-4xl mx-auto px-4 py-12 space-y-8">
                <div className="text-center">
                    <h2 className="text-2xl font-semibold mb-4">Why Couples Love Wavelength for LDR</h2>
                    <div className="grid md:grid-cols-3 gap-6 text-left">
                        <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-xl p-6">
                            <div className="text-3xl mb-3">💕</div>
                            <h3 className="font-semibold mb-2">Deepen Your Connection</h3>
                            <p className="text-sm text-muted-foreground">
                                Discover how well you and your partner think alike with thought-provoking spectrum questions.
                            </p>
                        </div>
                        <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-xl p-6">
                            <div className="text-3xl mb-3">🌍</div>
                            <h3 className="font-semibold mb-2">Play From Anywhere</h3>
                            <p className="text-sm text-muted-foreground">
                                No matter the distance or timezone, connect instantly in your browser. Perfect for virtual date nights.
                            </p>
                        </div>
                        <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-xl p-6">
                            <div className="text-3xl mb-3">💬</div>
                            <h3 className="font-semibold mb-2">Spark Conversations</h3>
                            <p className="text-sm text-muted-foreground">
                                Each round creates natural talking points. Perfect for when you don&apos;t know what to talk about on calls.
                            </p>
                        </div>
                    </div>
                </div>

                {/* How to play section */}
                <div className="text-center pt-8">
                    <h2 className="text-2xl font-semibold mb-4">How to Play with Your LDR Partner</h2>
                    <ol className="text-left max-w-xl mx-auto space-y-3 text-muted-foreground">
                        <li className="flex gap-3">
                            <span className="font-bold text-primary">1.</span>
                            <span>One partner creates a game room and gets a unique code</span>
                        </li>
                        <li className="flex gap-3">
                            <span className="font-bold text-primary">2.</span>
                            <span>Share the code with your partner (via text, Discord, or your video call)</span>
                        </li>
                        <li className="flex gap-3">
                            <span className="font-bold text-primary">3.</span>
                            <span>Take turns being the &quot;Psychic&quot; - give a clue about where the target is on the spectrum</span>
                        </li>
                        <li className="flex gap-3">
                            <span className="font-bold text-primary">4.</span>
                            <span>Your partner guesses based on your clue - the closer, the more points!</span>
                        </li>
                    </ol>
                </div>


            </section>

            {/* SEO hidden content */}
            <div className="sr-only">
                <h1>Best Games for Long Distance Relationships</h1>
                <h2>Long Distance Relationship Games FAQ</h2>
                <p>
                    Looking for games to play with your boyfriend or girlfriend in a long distance relationship?
                    Wavelength is one of the best LDR games available online. Unlike video games that require
                    downloads or expensive subscriptions, Wavelength is completely free and works right in your browser.
                </p>
                <p>
                    Perfect for virtual date nights, this couples bonding game helps you connect on a deeper level.
                    Whether you&apos;re in different cities or different countries, you can play together instantly.
                    Just share a room code and start discovering how well you know each other!
                </p>
                <ul>
                    <li>Best games to play with long distance boyfriend</li>
                    <li>Best games to play with long distance girlfriend</li>
                    <li>Free online games for couples</li>
                    <li>Virtual date night ideas</li>
                    <li>LDR activities to do together</li>
                    <li>Games for long distance friends</li>
                </ul>
            </div>
        </main>
    );
}
