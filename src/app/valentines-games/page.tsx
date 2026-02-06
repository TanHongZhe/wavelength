import { Metadata } from "next";
import { GameLoader } from "../../components/game/GameLoader";
import Link from "next/link";
import { LandingOverlay } from "../../components/LandingOverlay";

export const metadata: Metadata = {
    title: "Valentine's Day Games for Couples 2026 | Free Online Games",
    description:
        "Looking for Valentine's Day games to play with your partner? Wavelength is the perfect couples game for Valentine's 2026. Free, fun, and romantic - play together online!",
    keywords: [
        "Valentine's Day games",
        "Valentines games for couples",
        "Valentine's Day games online",
        "Romantic games for couples",
        "Valentine's Day date ideas",
        "Games to play on Valentine's Day",
        "Couples games Valentine",
        "Valentine's Day activities",
        "Free Valentine's Day games",
        "Online games for couples",
        "Virtual Valentine's date",
        "Valentine's Day 2026",
        "Romantic date night games",
        "Fun Valentine's games",
    ],
    alternates: {
        canonical: "https://wavelength.lol/valentines-games",
    },
    openGraph: {
        title: "Valentine's Day Games for Couples 2026 | Wavelength",
        description:
            "The perfect game for Valentine's Day! Connect with your partner in this fun, romantic guessing game. Free to play online!",
        url: "https://wavelength.lol/valentines-games",
    },
};

// JSON-LD Schema for Valentine's landing page
const valentinesGameSchema = {
    "@context": "https://schema.org",
    "@type": "VideoGame",
    name: "Wavelength - Valentine's Day Couples Game",
    description:
        "The perfect game for Valentine's Day 2026. A telepathic guessing game that helps couples connect and have fun together. Discover how well you know each other!",
    url: "https://wavelength.lol/valentines-games",
    image: "https://wavelength.lol/og-image.png",
    operatingSystem: "Web Browser",
    applicationCategory: "Game",
    gamePlatform: ["Web Browser", "Desktop", "Mobile"],
    genre: ["Couples Game", "Romantic Game", "Party Game", "Valentine's Day Game"],
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
            name: "What are fun games to play on Valentine's Day?",
            acceptedAnswer: {
                "@type": "Answer",
                text: "Wavelength is one of the best Valentine's Day games for couples! It's a telepathic guessing game where you and your partner try to get on the same wavelength. It sparks fun conversations and helps you discover how well you know each other - perfect for a romantic date night.",
            },
        },
        {
            "@type": "Question",
            name: "What are good date night games for couples?",
            acceptedAnswer: {
                "@type": "Answer",
                text: "Wavelength is perfect for date nights! One person gives a clue about where a concept falls on a spectrum (like 'Hot to Cold'), and their partner guesses. It's simple to learn, creates natural conversation, and reveals fun insights about how you both think.",
            },
        },
        {
            "@type": "Question",
            name: "Are there free Valentine's Day games online?",
            acceptedAnswer: {
                "@type": "Answer",
                text: "Yes! Wavelength Online is 100% free to play. No downloads, no registration, no hidden fees. Just open your browser, share a room code with your partner, and start playing together instantly. Perfect for a fun Valentine's Day activity!",
            },
        },
    ],
};

const eventSchema = {
    "@context": "https://schema.org",
    "@type": "Event",
    name: "Valentine's Day 2026 Gaming",
    description: "Play Wavelength with your partner this Valentine's Day 2026",
    startDate: "2026-02-14",
    endDate: "2026-02-14",
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode: "https://schema.org/OnlineEventAttendanceMode",
    location: {
        "@type": "VirtualLocation",
        url: "https://wavelength.lol/valentines-games",
    },
    organizer: {
        "@type": "Organization",
        name: "Wavelength Online",
        url: "https://wavelength.lol",
    },
    offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
        availability: "https://schema.org/InStock",
        url: "https://wavelength.lol/valentines-games",
    },
};

export default function ValentinesGamesPage() {
    return (
        <main>
            {/* Schema.org structured data */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(valentinesGameSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(eventSchema) }}
            />

            {/* Landing Overlay */}
            <LandingOverlay
                title="Valentine's Day Games for Couples 2026"
                description="Make this Valentine's Day special with Wavelength - the perfect couples game to discover how well you know each other. Free, fun, and romantic!"
                emoji="💕"
                gradient="from-pink-400 via-red-400 to-pink-400"
            />

            {/* Interactive Game Component */}
            <GameLoader />

            {/* Valentine's focused content section */}
            <section className="max-w-4xl mx-auto px-4 py-12 space-y-8">
                <div className="text-center">
                    <h2 className="text-2xl font-semibold mb-4">Why Wavelength is Perfect for Valentine&apos;s Day</h2>
                    <div className="grid md:grid-cols-3 gap-6 text-left">
                        <div className="bg-gradient-to-br from-pink-500/10 to-red-500/10 backdrop-blur-sm border border-pink-500/20 rounded-xl p-6">
                            <div className="text-3xl mb-3">💑</div>
                            <h3 className="font-semibold mb-2">Perfect for Date Night</h3>
                            <p className="text-sm text-muted-foreground">
                                Whether you&apos;re celebrating at home or having a virtual date, Wavelength adds fun and laughter to your evening.
                            </p>
                        </div>
                        <div className="bg-gradient-to-br from-pink-500/10 to-red-500/10 backdrop-blur-sm border border-pink-500/20 rounded-xl p-6">
                            <div className="text-3xl mb-3">💭</div>
                            <h3 className="font-semibold mb-2">Discover Each Other</h3>
                            <p className="text-sm text-muted-foreground">
                                Find out how aligned your thoughts are! Each round reveals new insights about how you both see the world.
                            </p>
                        </div>
                        <div className="bg-gradient-to-br from-pink-500/10 to-red-500/10 backdrop-blur-sm border border-pink-500/20 rounded-xl p-6">
                            <div className="text-3xl mb-3">🎁</div>
                            <h3 className="font-semibold mb-2">100% Free Gift</h3>
                            <p className="text-sm text-muted-foreground">
                                No cost, no downloads, no signup. The perfect free activity to share with your special someone.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Valentine's Day Ideas Section */}
                <div className="bg-gradient-to-r from-pink-500/5 via-red-500/5 to-pink-500/5 rounded-2xl p-8 text-center">
                    <h2 className="text-2xl font-semibold mb-4">💝 Valentine&apos;s Day 2026 Ideas</h2>
                    <p className="text-muted-foreground max-w-xl mx-auto mb-6">
                        Looking for something different this Valentine&apos;s Day? Instead of the usual dinner and movie,
                        try a game night! Wavelength is perfect for:
                    </p>
                    <ul className="text-left max-w-md mx-auto space-y-2 text-muted-foreground">
                        <li className="flex items-center gap-2">
                            <span className="text-pink-400">♥</span>
                            <span>Cozy at-home date nights</span>
                        </li>
                        <li className="flex items-center gap-2">
                            <span className="text-pink-400">♥</span>
                            <span>Virtual dates with your long-distance partner</span>
                        </li>
                        <li className="flex items-center gap-2">
                            <span className="text-pink-400">♥</span>
                            <span>Double dates with friends</span>
                        </li>
                        <li className="flex items-center gap-2">
                            <span className="text-pink-400">♥</span>
                            <span>Galentine&apos;s Day celebrations</span>
                        </li>
                        <li className="flex items-center gap-2">
                            <span className="text-pink-400">♥</span>
                            <span>Anti-Valentine&apos;s parties with friends</span>
                        </li>
                    </ul>
                </div>

                {/* How to play section */}
                <div className="text-center pt-8">
                    <h2 className="text-2xl font-semibold mb-4">How to Play on Valentine&apos;s Day</h2>
                    <ol className="text-left max-w-xl mx-auto space-y-3 text-muted-foreground">
                        <li className="flex gap-3">
                            <span className="font-bold text-pink-400">1.</span>
                            <span>Create a game room and share the code with your date</span>
                        </li>
                        <li className="flex gap-3">
                            <span className="font-bold text-pink-400">2.</span>
                            <span>Take turns being the &quot;Psychic&quot; - see a spectrum and give a one-word clue</span>
                        </li>
                        <li className="flex gap-3">
                            <span className="font-bold text-pink-400">3.</span>
                            <span>Your partner guesses where on the spectrum you mean</span>
                        </li>
                        <li className="flex gap-3">
                            <span className="font-bold text-pink-400">4.</span>
                            <span>Celebrate when you&apos;re on the same wavelength! 💕</span>
                        </li>
                    </ol>
                </div>


            </section>

            {/* SEO hidden content */}
            <div className="sr-only">
                <h1>Valentine&apos;s Day Games for Couples 2026</h1>
                <h2>Valentine&apos;s Day Games FAQ</h2>
                <p>
                    Looking for Valentine&apos;s Day games to play with your boyfriend, girlfriend, husband, or wife?
                    Wavelength is one of the best romantic games for couples in 2026. Unlike expensive date nights,
                    this free online game brings you closer together through fun, laughter, and discovering how well
                    you know each other.
                </p>
                <p>
                    Perfect for Valentine&apos;s Day 2026, whether you&apos;re having an at-home date night, celebrating
                    long distance, or hosting a couples game night. No downloads, no cost - just instant fun!
                </p>
                <ul>
                    <li>Best Valentine&apos;s Day games 2026</li>
                    <li>Free Valentine&apos;s games online</li>
                    <li>Romantic games for couples</li>
                    <li>Valentine&apos;s Day date ideas</li>
                    <li>Games to play on Valentine&apos;s Day</li>
                    <li>Couples activities for Valentine&apos;s</li>
                    <li>Virtual Valentine&apos;s date games</li>
                    <li>Galentine&apos;s Day games</li>
                </ul>
            </div>
        </main>
    );
}
