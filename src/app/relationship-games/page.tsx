import { Metadata } from "next";
import { GameLoader } from "../../components/game/GameLoader";
import Link from "next/link";
import { LandingOverlay } from "../../components/LandingOverlay";

export const metadata: Metadata = {
    title: "Relationship Games for Couples | Fun Bonding Games Online",
    description:
        "Discover the best relationship games to play with your partner. Wavelength is a fun, free couples game that sparks deep conversations and strengthens your bond.",
    keywords: [
        "Relationship games",
        "Relationship games for couples",
        "Couples games online",
        "Bonding games for couples",
        "Games to play with partner",
        "Fun games for couples",
        "Date night games",
        "Games to strengthen relationship",
        "Couples bonding activities",
        "Free relationship games",
        "Online games for couples",
        "Communication games for couples",
        "Games to get to know your partner",
        "Couples question games",
    ],
    alternates: {
        canonical: "https://wavelength.lol/relationship-games/",
    },
    openGraph: {
        title: "Relationship Games for Couples | Wavelength",
        description:
            "The best relationship game for couples! Bond, laugh, and discover how well you know each other. Free to play online!",
        url: "https://wavelength.lol/relationship-games/",
    },
};

// JSON-LD Schema for relationship games page
const relationshipGameSchema = {
    "@context": "https://schema.org",
    "@type": "VideoGame",
    name: "Wavelength - Relationship Game for Couples",
    description:
        "The perfect relationship game for couples who want to bond and have fun. A telepathic guessing game that sparks deep conversations and helps you understand each other better.",
    url: "https://wavelength.lol/relationship-games/",
    image: "https://wavelength.lol/og-image.png",
    operatingSystem: "Web Browser",
    applicationCategory: "Game",
    gamePlatform: ["Web Browser", "Desktop", "Mobile"],
    genre: ["Couples Game", "Relationship Game", "Bonding Game", "Party Game"],
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
        audienceType: "Couples",
    },
};

const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
        {
            "@type": "Question",
            name: "What are good relationship games for couples?",
            acceptedAnswer: {
                "@type": "Answer",
                text: "Wavelength is one of the best relationship games for couples! It's a telepathic guessing game where partners try to get on the same wavelength by guessing where concepts fall on a spectrum. It naturally sparks conversations and helps you understand how your partner thinks.",
            },
        },
        {
            "@type": "Question",
            name: "How can games strengthen a relationship?",
            acceptedAnswer: {
                "@type": "Answer",
                text: "Playing games together creates shared experiences, encourages communication, and adds fun to your relationship. Wavelength specifically helps couples discover how aligned their thinking is, leading to deeper understanding and meaningful conversations.",
            },
        },
        {
            "@type": "Question",
            name: "What games help couples communicate better?",
            acceptedAnswer: {
                "@type": "Answer",
                text: "Wavelength is excellent for couple communication! Each round requires you to give clues and interpret your partner's thinking. It reveals how you both view concepts differently and creates natural opportunities for discussion.",
            },
        },
    ],
};

export default function RelationshipGamesPage() {
    return (
        <main>
            {/* Schema.org structured data */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(relationshipGameSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
            />

            {/* Landing Overlay */}
            <LandingOverlay
                title="The Best Relationship Game for Couples"
                description="Strengthen your bond and have fun together. Wavelength helps couples connect through playful competition and meaningful conversations."
                emoji="💑"
                gradient="from-rose-400 via-pink-400 to-rose-400"
            />

            {/* Interactive Game Component */}
            <GameLoader />

            {/* Relationship-focused content section */}
            <section className="max-w-4xl mx-auto px-4 py-12 space-y-8">
                <div className="text-center">
                    <h2 className="text-2xl font-semibold mb-4">Why Couples Love Wavelength</h2>
                    <div className="grid md:grid-cols-3 gap-6 text-left">
                        <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-xl p-6">
                            <div className="text-3xl mb-3">🧠</div>
                            <h3 className="font-semibold mb-2">Understand Each Other</h3>
                            <p className="text-sm text-muted-foreground">
                                Discover how your partner thinks. Each round reveals whether you&apos;re truly on the same wavelength.
                            </p>
                        </div>
                        <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-xl p-6">
                            <div className="text-3xl mb-3">💬</div>
                            <h3 className="font-semibold mb-2">Spark Conversations</h3>
                            <p className="text-sm text-muted-foreground">
                                Every spectrum creates natural discussion. &quot;Why did you think that was more hot than cold?&quot;
                            </p>
                        </div>
                        <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-xl p-6">
                            <div className="text-3xl mb-3">😂</div>
                            <h3 className="font-semibold mb-2">Laugh Together</h3>
                            <p className="text-sm text-muted-foreground">
                                The surprising mismatches are often the funniest moments. Build memories through playful competition.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Benefits Section */}
                <div className="bg-gradient-to-r from-rose-500/5 via-pink-500/5 to-rose-500/5 rounded-2xl p-8 text-center">
                    <h2 className="text-2xl font-semibold mb-4">💝 Strengthen Your Relationship</h2>
                    <p className="text-muted-foreground max-w-xl mx-auto mb-6">
                        Research shows that couples who play together stay together. Wavelength is perfect for:
                    </p>
                    <ul className="text-left max-w-md mx-auto space-y-2 text-muted-foreground">
                        <li className="flex items-center gap-2">
                            <span className="text-rose-400">♥</span>
                            <span>Weekly date night activities</span>
                        </li>
                        <li className="flex items-center gap-2">
                            <span className="text-rose-400">♥</span>
                            <span>Getting to know a new partner better</span>
                        </li>
                        <li className="flex items-center gap-2">
                            <span className="text-rose-400">♥</span>
                            <span>Rekindling connection in long-term relationships</span>
                        </li>
                        <li className="flex items-center gap-2">
                            <span className="text-rose-400">♥</span>
                            <span>Breaking out of boring conversation patterns</span>
                        </li>
                        <li className="flex items-center gap-2">
                            <span className="text-rose-400">♥</span>
                            <span>Having fun without screens (well, just one screen!)</span>
                        </li>
                    </ul>
                </div>

                {/* How to play section */}
                <div className="text-center pt-8">
                    <h2 className="text-2xl font-semibold mb-4">How to Play with Your Partner</h2>
                    <ol className="text-left max-w-xl mx-auto space-y-3 text-muted-foreground">
                        <li className="flex gap-3">
                            <span className="font-bold text-rose-400">1.</span>
                            <span>Create a game room and share the code with your partner</span>
                        </li>
                        <li className="flex gap-3">
                            <span className="font-bold text-rose-400">2.</span>
                            <span>Take turns being the &quot;Psychic&quot; - you see where the target is on a spectrum</span>
                        </li>
                        <li className="flex gap-3">
                            <span className="font-bold text-rose-400">3.</span>
                            <span>Give a one-word clue to help your partner guess the target location</span>
                        </li>
                        <li className="flex gap-3">
                            <span className="font-bold text-rose-400">4.</span>
                            <span>Celebrate the hits, laugh at the misses, and discuss why you thought differently!</span>
                        </li>
                    </ol>
                </div>


            </section>

            {/* SEO hidden content */}
            <div className="sr-only">
                <h1>Relationship Games for Couples</h1>
                <h2>Best Games for Couples FAQ</h2>
                <p>
                    Looking for relationship games to play with your partner? Wavelength is one of the best
                    bonding games for couples available online. This free game helps strengthen your relationship
                    by revealing how you and your partner think differently - and similarly!
                </p>
                <p>
                    Perfect for date nights, weekend fun, or anytime you want to connect with your significant other.
                    No downloads needed, just open your browser and start playing together instantly.
                </p>
                <ul>
                    <li>Best relationship games for couples</li>
                    <li>Fun games to play with partner</li>
                    <li>Couples bonding games online</li>
                    <li>Date night game ideas</li>
                    <li>Games to strengthen relationship</li>
                    <li>Communication games for couples</li>
                    <li>Free couples games online</li>
                </ul>
            </div>
        </main>
    );
}
