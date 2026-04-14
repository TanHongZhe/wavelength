import { Metadata } from "next";
import { GameLoader } from "../../components/game/GameLoader";
import Link from "next/link";
import { LandingOverlay } from "../../components/LandingOverlay";
import { Footer } from "@/components/Footer";


export const metadata: Metadata = {
    title: {
        absolute: "Best LDR Games Online | Wavelength Game",
    },
    description:
        "Play the Wavelength Game! The top choice for LDR couples. Free, instant multiplayer fun perfect for long distance date nights and virtual bonding.",
    keywords: [
        "Wavelength Game Online",
        "Couple Card Games",
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
        canonical: "https://wavelength.lol/long-distance-games/",
    },
    openGraph: {
        title: "Best LDR Games Online | Wavelength Game",
        description:
            "Play the Wavelength Game! The top choice for LDR couples. Free, instant multiplayer fun perfect for long distance date nights and virtual bonding.",
        url: "https://wavelength.lol/long-distance-games/",
    },
};

// JSON-LD Schema for LDR landing page
const ldrGameSchema = {
    "@context": "https://schema.org",
    "@type": "VideoGame",
    name: "Wavelength - Long Distance Relationship Game",
    description:
        "The perfect game for couples in long distance relationships. A telepathic guessing game that helps you connect and bond with your partner from anywhere in the world.",
    url: "https://wavelength.lol/long-distance-games/",
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

const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://wavelength.lol/" },
        { "@type": "ListItem", position: 2, name: "Long Distance Games", item: "https://wavelength.lol/long-distance-games/" },
    ],
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
                text: "The Wavelength Game is one of the best games for LDR couples. It's a telepathic guessing game where you and your partner try to get on the same wavelength by guessing where concepts fall on a spectrum. It's free, works in any browser, and creates meaningful conversations.",
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
            name: "Is the Wavelength Game free to play online?",
            acceptedAnswer: {
                "@type": "Answer",
                text: "Yes! The Wavelength Game is free to start playing online. No downloads required - just open your browser and start playing with your partner instantly.",
            },
        },
    ],
};

export default function LongDistanceGamesPage() {
    return (
        // Changed from <main> to <div> — layout.tsx already wraps in <main id="main-content">
        <div>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ldrGameSchema) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

            {/* Landing Overlay */}
            <LandingOverlay
                title="The Best Game for Long Distance Relationships"
                description="Connect with your partner from miles away. The Wavelength Game is perfect for couples who want to bond, have fun, and discover how well they know each other."
                emoji="💜"
                gradient="from-purple-400 via-pink-400 to-purple-400"
            />

            {/* Interactive Game Component */}
            <GameLoader />

            {/* LDR-focused content section */}
            <section className="max-w-4xl mx-auto px-4 py-12 space-y-8">
                <div className="text-center">
                    <h2 className="text-2xl font-bold mb-4 text-white drop-shadow-sm">Why Couples Love the Wavelength Game for LDR</h2>
                    <div className="grid md:grid-cols-3 gap-6 text-left">
                        <div className="bg-slate-900/40 backdrop-blur-md border border-white/10 rounded-2xl p-6 transition-all duration-300 ease-out hover:-translate-y-1 hover:border-white/20">
                            <div className="text-3xl mb-3">💕</div>
                            <h3 className="font-bold mb-2 text-white">Deepen Your Connection</h3>
                            <p className="text-sm text-slate-400">
                                Discover how well you and your partner think alike with thought-provoking spectrum questions.
                            </p>
                        </div>
                        <div className="bg-slate-900/40 backdrop-blur-md border border-white/10 rounded-2xl p-6 transition-all duration-300 ease-out hover:-translate-y-1 hover:border-white/20">
                            <div className="text-3xl mb-3">🌍</div>
                            <h3 className="font-bold mb-2 text-white">Play From Anywhere</h3>
                            <p className="text-sm text-slate-400">
                                No matter the distance or timezone, connect instantly in your browser. Perfect for virtual date nights.
                            </p>
                        </div>
                        <div className="bg-slate-900/40 backdrop-blur-md border border-white/10 rounded-2xl p-6 transition-all duration-300 ease-out hover:-translate-y-1 hover:border-white/20">
                            <div className="text-3xl mb-3">💬</div>
                            <h3 className="font-bold mb-2 text-white">Spark Conversations</h3>
                            <p className="text-sm text-slate-400">
                                Each round creates natural talking points. Perfect for when you don&apos;t know what to talk about on calls.
                            </p>
                        </div>
                    </div>
                </div>

                {/* How to play section */}
                <div className="text-center pt-8">
                    <h2 className="text-2xl font-bold mb-4 text-white drop-shadow-sm">How to Play with Your LDR Partner</h2>
                    <ol className="text-left max-w-xl mx-auto space-y-3 text-slate-400">
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

            {/* Related pages - visible internal linking */}
            <section className="max-w-4xl mx-auto px-4 pb-12">
                <h2 className="text-lg font-bold text-white mb-4">More Couple Game Guides</h2>
                <div className="grid sm:grid-cols-2 gap-3">
                    <Link href="/couple-games/" className="flex items-center justify-between p-4 bg-slate-900/40 border border-white/10 rounded-xl hover:border-white/20 transition-colors">
                        <span className="text-sm font-medium text-foreground">Online Games for Couples</span>
                        <span className="text-muted-foreground text-sm">→</span>
                    </Link>
                    <Link href="/relationship-games/" className="flex items-center justify-between p-4 bg-slate-900/40 border border-white/10 rounded-xl hover:border-white/20 transition-colors">
                        <span className="text-sm font-medium text-foreground">Relationship Building Games</span>
                        <span className="text-muted-foreground text-sm">→</span>
                    </Link>
                    <Link href="/how-well-do-you-know-your-partner/" className="flex items-center justify-between p-4 bg-slate-900/40 border border-white/10 rounded-xl hover:border-white/20 transition-colors">
                        <span className="text-sm font-medium text-foreground">How Well Do You Know Your Partner?</span>
                        <span className="text-muted-foreground text-sm">→</span>
                    </Link>
                    <Link href="/valentines-games/" className="flex items-center justify-between p-4 bg-slate-900/40 border border-white/10 rounded-xl hover:border-white/20 transition-colors">
                        <span className="text-sm font-medium text-foreground">Valentine&apos;s Day Games</span>
                        <span className="text-muted-foreground text-sm">→</span>
                    </Link>
                </div>
            </section>
            <div className="max-w-4xl mx-auto px-4 pb-12"><Footer /></div>
        </div>
    );
}
