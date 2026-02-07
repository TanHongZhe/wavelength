import { Metadata } from "next";
import { GameLoader } from "../../components/game/GameLoader";
import { LandingOverlay } from "../../components/LandingOverlay";

export const metadata: Metadata = {
    title: "Couple Games Online - 2 Player Games for Couples | Free Mini Games",
    description:
        "Play fun couple games online with your partner! Free 2-player mini games perfect for date nights, LDR couples, and bonding. Red Flag Green Flag, This or That, and more. No download required!",
    keywords: [
        "Couple games online",
        "2 player games for couples",
        "Mini games for couples",
        "Online games for couples",
        "Free couple games",
        "Date night games online",
        "Couples quiz games",
        "This or that couples",
        "Red flag green flag game",
        "Compatibility games for couples",
        "Fun games for couples",
        "Games to play with boyfriend",
        "Games to play with girlfriend",
        "Relationship games online",
        "LDR couple games",
        "Virtual date night games",
        "Quick couple games",
        "Icebreaker games for couples",
    ],
    alternates: {
        canonical: "https://wavelength.lol/couple-games/",
    },
    openGraph: {
        title: "Couple Games Online - Free 2 Player Mini Games",
        description:
            "Play fun couple games with your partner! Quick mini games like This or That, Red Flag Green Flag, and more. Free, no download, instant fun!",
        url: "https://wavelength.lol/couple-games/",
    },
};

// JSON-LD Schema for couple games landing page
const coupleGamesSchema = {
    "@context": "https://schema.org",
    "@type": "VideoGame",
    name: "Wavelength - Couple Games Collection",
    description:
        "A collection of fun couple games including Wavelength, Rapid Fire This or That, and Red Flag Green Flag. Perfect for date nights, LDR couples, and bonding with your partner.",
    url: "https://wavelength.lol/couple-games/",
    image: "https://wavelength.lol/og-image.png",
    operatingSystem: "Web Browser",
    applicationCategory: "Game",
    gamePlatform: ["Web Browser", "Desktop", "Mobile"],
    genre: ["Couples Game", "Party Game", "Mini Games", "Quiz Game"],
    numberOfPlayers: {
        "@type": "QuantitativeValue",
        minValue: 2,
        maxValue: 2,
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
            name: "What are good online games for couples?",
            acceptedAnswer: {
                "@type": "Answer",
                text: "Wavelength offers several fun couple games including the main Wavelength game, Rapid Fire This or That, and Red Flag Green Flag. All games are free, require no download, and are perfect for date nights or LDR couples.",
            },
        },
        {
            "@type": "Question",
            name: "What is the Red Flag Green Flag game?",
            acceptedAnswer: {
                "@type": "Answer",
                text: "Red Flag Green Flag is a fun couples game where you and your partner rate dating behaviors as red flags (dealbreakers), green flags (love it!), or beige flags (meh). See how well you align on relationship preferences!",
            },
        },
        {
            "@type": "Question",
            name: "Can you play couple games online for free?",
            acceptedAnswer: {
                "@type": "Answer",
                text: "Yes! All games on Wavelength are 100% free with no downloads or registration required. Just share a room code with your partner and start playing instantly in your browser.",
            },
        },
        {
            "@type": "Question",
            name: "What is This or That for couples?",
            acceptedAnswer: {
                "@type": "Answer",
                text: "This or That is a rapid-fire game where you and your partner choose between two options. You have 10 seconds to pick, and you score points when you both choose the same answer! Perfect for discovering how well you know each other.",
            },
        },
    ],
};

export default function CoupleGamesPage() {
    return (
        <main>
            {/* Schema.org structured data */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(coupleGamesSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
            />

            {/* Landing Overlay */}
            <LandingOverlay
                title="Fun Couple Games to Play Online"
                description="Quick mini games perfect for date nights, LDR couples, and bonding with your partner. Play This or That, Red Flag Green Flag, and more!"
                emoji="💑"
                gradient="from-pink-400 via-red-400 to-pink-400"
            />

            {/* Interactive Game Component */}
            <GameLoader />

            {/* Couple games content section */}
            <section className="max-w-4xl mx-auto px-4 py-12 space-y-8">
                <div className="text-center">
                    <h2 className="text-2xl font-semibold mb-4">Our Couple Games Collection</h2>
                    <div className="grid md:grid-cols-3 gap-6 text-left">
                        <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-xl p-6">
                            <div className="text-3xl mb-3">🌊</div>
                            <h3 className="font-semibold mb-2">Wavelength</h3>
                            <p className="text-sm text-muted-foreground">
                                The telepathic game! Give clues and guess where concepts fall on a spectrum. Are you on the same wavelength?
                            </p>
                        </div>
                        <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-xl p-6">
                            <div className="text-3xl mb-3">⚡</div>
                            <h3 className="font-semibold mb-2">Rapid Fire: This or That</h3>
                            <p className="text-sm text-muted-foreground">
                                10 seconds to choose! Pick between two options and see if you match with your partner.
                            </p>
                        </div>
                        <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-xl p-6">
                            <div className="text-3xl mb-3">🚩</div>
                            <h3 className="font-semibold mb-2">Red Flag, Green Flag</h3>
                            <p className="text-sm text-muted-foreground">
                                Rate dating behaviors! Is it a red flag, green flag, or beige flag? Find out if you agree!
                            </p>
                        </div>
                    </div>
                </div>

                {/* Why couples love it section */}
                <div className="text-center pt-8">
                    <h2 className="text-2xl font-semibold mb-4">Why Couples Love Our Games</h2>
                    <div className="grid md:grid-cols-2 gap-6 text-left max-w-2xl mx-auto">
                        <div className="flex gap-4">
                            <span className="text-2xl">🆓</span>
                            <div>
                                <h3 className="font-semibold">100% Free</h3>
                                <p className="text-sm text-muted-foreground">No downloads, no registration, no hidden fees.</p>
                            </div>
                        </div>
                        <div className="flex gap-4">
                            <span className="text-2xl">🌍</span>
                            <div>
                                <h3 className="font-semibold">Play Anywhere</h3>
                                <p className="text-sm text-muted-foreground">Perfect for long distance couples on any device.</p>
                            </div>
                        </div>
                        <div className="flex gap-4">
                            <span className="text-2xl">⚡</span>
                            <div>
                                <h3 className="font-semibold">Quick & Fun</h3>
                                <p className="text-sm text-muted-foreground">Games take 5-15 minutes. Perfect for a quick date!</p>
                            </div>
                        </div>
                        <div className="flex gap-4">
                            <span className="text-2xl">💬</span>
                            <div>
                                <h3 className="font-semibold">Spark Conversations</h3>
                                <p className="text-sm text-muted-foreground">Each game creates natural talking points and debates.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* SEO hidden content */}
            <div className="sr-only">
                <h1>Couple Games Online - 2 Player Mini Games</h1>
                <h2>Best Online Games for Couples FAQ</h2>
                <p>
                    Looking for fun games to play with your boyfriend or girlfriend? Our collection
                    of couple games includes Wavelength, Rapid Fire This or That, and Red Flag Green Flag.
                    All games are designed for 2 players and are perfect for date nights or LDR couples.
                </p>
                <p>
                    These mini games are quick to play (5-15 minutes each) and help you discover
                    how well you and your partner think alike. Great for virtual date nights,
                    icebreakers, or just having fun together!
                </p>
                <ul>
                    <li>Best couple games online free</li>
                    <li>2 player games for couples</li>
                    <li>This or that game for couples</li>
                    <li>Red flag green flag couples game</li>
                    <li>Date night games online</li>
                    <li>LDR games for couples</li>
                    <li>Fun games to play with partner</li>
                    <li>Compatibility quiz for couples</li>
                </ul>
            </div>
        </main>
    );
}
