import { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
    title: "FAQ - Frequently Asked Questions About Wavelength",
    description: "Get answers to common questions about Wavelength Online. Learn about gameplay, scoring, player limits, and more. Everything you need to know to start playing!",
    keywords: [
        "wavelength faq",
        "wavelength questions",
        "how to play wavelength",
        "wavelength game help",
        "wavelength online help",
        "wavelength support",
    ],
    alternates: {
        canonical: "https://wavelength.lol/faq/",
    },
    openGraph: {
        title: "FAQ - Frequently Asked Questions About Wavelength",
        description: "Get answers to common questions about Wavelength Online. Everything you need to know!",
        url: "https://wavelength.lol/faq/",
    },
};

// Comprehensive FAQ data
const faqItems = [
    {
        question: "What is Wavelength Online?",
        answer: "Wavelength Online is a free, browser-based adaptation of the popular party game Wavelength. It's a telepathic game where one player (the Psychic) gives a clue to help others guess the position of a hidden target on a spectrum between two opposing concepts. For example, if the spectrum is 'Hot' to 'Cold' and the target is near 'Hot', the Psychic might give the clue 'Coffee' to hint at the position.",
    },
    {
        question: "How many players can play Wavelength?",
        answer: "Wavelength Online supports 2 to 20 players. In Classic Mode, 2 players take turns being the Psychic and Guesser. In Party Mode, players are divided into two teams (2-10 players per team) that compete against each other.",
    },
    {
        question: "Is Wavelength Online free to play?",
        answer: "Yes! Wavelength Online is completely free to play. There are no downloads required, no registration needed, and no in-app purchases. Simply share a link with your friends and start playing instantly in your web browser.",
    },
    {
        question: "How does scoring work in Wavelength?",
        answer: "Points are awarded based on how close the guess is to the center of the hidden target zone: 4 points for a perfect bullseye (dead center), 3 points for a near miss (within the target zone), 2 points for getting close (edge of the target), and 0 points if you miss the target entirely.",
    },
    {
        question: "What devices can I play Wavelength on?",
        answer: "Wavelength Online works on any device with a modern web browser - including smartphones, tablets, laptops, and desktop computers. The game is fully responsive and optimized for both touch and mouse input.",
    },
    {
        question: "Do I need to create an account to play?",
        answer: "No account or registration is required. You can start playing immediately by creating a room and sharing the room code with your friends. Your game progress is saved automatically for the duration of your session.",
    },
    {
        question: "What is the role of the Psychic?",
        answer: "The Psychic is the player who sees the hidden target location on the dial. Their job is to give a single clue (usually one word or short phrase) that helps their teammates guess where the target is positioned on the spectrum. The challenge is giving a clue that accurately represents the target's position between the two opposing concepts.",
    },
    {
        question: "What makes a good clue in Wavelength?",
        answer: "A good clue clearly indicates the position on the spectrum. For example, if your spectrum is 'Good' to 'Evil' and the target is slightly toward 'Evil', you might say 'Politician' - something that's perceved as neither perfectly good nor completely evil. The best clues are ones where most people would agree on where they fall on the spectrum.",
    },
    {
        question: "Can I play Wavelength with remote friends?",
        answer: "Absolutely! Wavelength Online is designed for remote play. Create a room, share the room code or link with your friends no matter where they are, and everyone can join from their own device. The game synchronizes in real-time, so everyone sees the dial move as guesses are made.",
    },
    {
        question: "How long does a game of Wavelength take?",
        answer: "A typical game of Wavelength takes 15-30 minutes, depending on the number of rounds you choose to play. Each round takes about 2-3 minutes. You can customize the number of rounds when setting up your game.",
    },
    {
        question: "Is this the official Wavelength game?",
        answer: "No, Wavelength Online is a fan-made digital adaptation. It's inspired by the award-winning physical board game Wavelength designed by Wolfgang Warsch, Alex Hague, and Justin Vickers. We encourage everyone to support the original creators by purchasing the physical board game!",
    },
    {
        question: "Is Wavelength Online open source?",
        answer: "Yes! Wavelength Online is an open-source project. You can view the source code, contribute, or learn how it was built by visiting our GitHub repository. The game is built with modern web technologies including Next.js, React, and Supabase for real-time multiplayer.",
    },
];

// FAQ Schema
const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: {
            "@type": "Answer",
            text: item.answer,
        },
    })),
};

// Breadcrumb Schema
const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
        {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: "https://wavelength.lol",
        },
        {
            "@type": "ListItem",
            position: 2,
            name: "FAQ",
            item: "https://wavelength.lol/faq/",
        },
    ],
};

// Speakable schema for voice assistants
const speakableSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Wavelength Online FAQ",
    url: "https://wavelength.lol/faq/",
    speakable: {
        "@type": "SpeakableSpecification",
        cssSelector: ["article", "h1", "summary", "p"],
    },
};

const jsonLdSchemas = [faqSchema, breadcrumbSchema, speakableSchema];

export default function FAQPage() {
    return (
        <>
            {jsonLdSchemas.map((schema, index) => (
                <script
                    key={index}
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
                />
            ))}
            <article className="min-h-screen pt-24 pb-12 px-6 bg-background">
                <div className="max-w-4xl mx-auto">
                    {/* Header */}
                    <header className="text-center mb-16">
                        <div className="w-16 h-16 bg-primary/10 text-primary rounded-2xl flex items-center justify-center mx-auto mb-6">
                            <HelpCircle className="w-8 h-8" aria-hidden="true" />
                        </div>
                        <h1 className="font-display text-4xl md:text-5xl font-bold text-primary mb-4">
                            Frequently Asked Questions
                        </h1>
                        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                            Everything you need to know about playing Wavelength Online. Can&apos;t find your answer? Check out our{" "}
                            <Link href="/rules" className="text-primary hover:underline">
                                rules page
                            </Link>{" "}
                            or{" "}
                            <Link href="/about" className="text-primary hover:underline">
                                about page
                            </Link>.
                        </p>
                    </header>

                    {/* FAQ Items */}
                    <section aria-labelledby="faq-list" className="space-y-4 mb-16">
                        <h2 id="faq-list" className="sr-only">FAQ List</h2>
                        {faqItems.map((item, index) => (
                            <details
                                key={index}
                                className="game-card p-6 group"
                                open={index === 0}
                            >
                                <summary className="font-semibold text-lg cursor-pointer list-none flex justify-between items-center gap-4">
                                    <span>{item.question}</span>
                                    <span className="text-primary group-open:rotate-180 transition-transform flex-shrink-0">
                                        ▼
                                    </span>
                                </summary>
                                <p className="mt-4 text-muted-foreground leading-relaxed">
                                    {item.answer}
                                </p>
                            </details>
                        ))}
                    </section>

                    {/* Quick Links */}
                    <section aria-labelledby="quick-links" className="grid md:grid-cols-2 gap-6 mb-16">
                        <h2 id="quick-links" className="sr-only">Quick Links</h2>
                        <Link
                            href="/rules"
                            className="flex items-center p-6 bg-card rounded-2xl border border-border hover:border-primary/50 transition-colors group"
                        >
                            <div>
                                <h3 className="font-semibold text-primary text-lg">Learn the Rules</h3>
                                <p className="text-sm text-muted-foreground">
                                    Step-by-step guide on how to play
                                </p>
                            </div>
                            <ArrowRight className="ml-auto w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" aria-hidden="true" />
                        </Link>

                        <Link
                            href="/"
                            className="flex items-center p-6 bg-card rounded-2xl border border-border hover:border-primary/50 transition-colors group"
                        >
                            <div>
                                <h3 className="font-semibold text-primary text-lg">Start Playing</h3>
                                <p className="text-sm text-muted-foreground">
                                    Create or join a game instantly
                                </p>
                            </div>
                            <ArrowRight className="ml-auto w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" aria-hidden="true" />
                        </Link>
                    </section>

                    {/* CTA */}
                    <section className="text-center p-12 bg-card rounded-3xl border-2 border-primary/10">
                        <h2 className="font-display text-3xl font-bold text-primary mb-4">
                            Ready to Play?
                        </h2>
                        <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto">
                            Jump into a game right now. No download or registration required.
                        </p>
                        <Link href="/">
                            <Button size="lg" className="btn-game px-12 py-6 text-xl">
                                Play Now <ArrowRight className="ml-2 w-6 h-6" aria-hidden="true" />
                            </Button>
                        </Link>
                    </section>
                </div>
            </article>
        </>
    );
}
