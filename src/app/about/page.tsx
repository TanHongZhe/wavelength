import { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Github, Gamepad2, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";


export const metadata: Metadata = {
    title: "About the Wavelength Game | Project Info",
    description: "About the Wavelength Game project. A free web adaptation of the popular social guessing game to play online. Learn about the technology and team.",
    keywords: [
        "wavelength game about",
        "wavelength online about",
        "wavelength game creator",
        "wavelength web app",
    ],
    alternates: {
        canonical: "https://wavelength.lol/about/",
    },
    openGraph: {
        title: "About the Wavelength Game | Project Info",
        description: "Learn about the Wavelength Game online project - a free, open-source web adaptation of the popular social guessing game.",
        url: "https://wavelength.lol/about/",
    },
};

// WebPage Schema
const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "About Wavelength Game",
    description: "About the Wavelength Game project. A free, open-source web adaptation of the popular social guessing game.",
    url: "https://wavelength.lol/about/",
    isPartOf: {
        "@type": "WebSite",
        name: "Wavelength Game",
        url: "https://wavelength.lol/",
    },
    about: {
        "@type": "VideoGame",
        name: "Wavelength Game",
    },
    author: {
        "@type": "Person",
        name: "Wavelength Game",
    },
    speakable: {
        "@type": "SpeakableSpecification",
        cssSelector: ["article", "h1", "h2", ".prose"],
    },
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
            item: "https://wavelength.lol/",
        },
        {
            "@type": "ListItem",
            position: 2,
            name: "About",
            item: "https://wavelength.lol/about/",
        },
    ],
};

const jsonLdSchemas = [webPageSchema, breadcrumbSchema];

export default function AboutPage() {
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
                <div className="max-w-3xl mx-auto">
                    {/* Header */}
                    <header className="text-center mb-16">
                        <h1 className="font-display text-4xl md:text-5xl font-bold text-primary mb-6">
                            About the Wavelength Game
                        </h1>
                        <p className="text-xl text-muted-foreground leading-relaxed">
                            A digital tribute to the award-winning party game.
                        </p>
                    </header>

                    {/* Content */}
                    <div className="prose prose-lg dark:prose-invert mx-auto mb-16">
                        <p>
                            Wavelength Game Online is a web-based adaptation of <a href="https://www.wavelength.zone/" target="_blank" rel="noopener noreferrer" className="text-primary font-semibold hover:underline">Wavelength</a>,
                            the hit social guessing game designed by Wolfgang Warsch, Alex Hague, and Justin Vickers.
                        </p>

                        <p>
                            This project was built to bring the joy of &quot;telepathic&quot; connection to friends and families who may not be in the same room.
                            It captures the core mechanics of the physical board game—the satisfying dial, the tension of the reveal, and the
                            hilarious debates that follow—and packages it into a seamless, instant-play browser experience.
                        </p>

                        <h2 className="font-display font-bold text-primary mt-12 mb-6 text-2xl">How It Works</h2>
                        <p>
                            Using modern web technologies like Next.js, React, and Convex, the Wavelength Game online offers real-time synchronization
                            across devices. This means when you spin the dial on your phone, your friends see it move on their screens instantly.
                            No app downloads tailored for any specific platform—just share a link and play in your browser.
                        </p>

                        <h2 className="font-display font-bold text-primary mt-12 mb-6 text-2xl">More Than Just The Basic Game</h2>
                        <p>
                            We have taken the core concept of the <strong>Wavelength Game</strong> and expanded it into the ultimate online party experience.
                            Not only can you play the classic Wavelength game online, but we have also introduced specialized decks for every occasion.
                            Whether you need hilarious General Knowledge and Pop Culture questions for your friend group, or you're looking for our spicy 18+ Lust mode designed perfectly to spice up date nights for couples—the Wavelength game online has something for everyone.
                        </p>


                    </div>

                    {/* Social Proof / Credits */}
                    <nav aria-label="Project Links" className="grid md:grid-cols-2 gap-6 mb-16">
                        <a
                            href="https://github.com/TanHongZhe/wavelength-vibe"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center p-6 bg-slate-900/40 backdrop-blur-md border border-white/10 rounded-2xl transition-all hover:-translate-y-1 hover:border-white/20 group hover:shadow-[0_0_20px_rgba(255,255,255,0.05)]"
                        >
                            <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center mr-4 group-hover:scale-110 transition-transform">
                                <Github className="w-6 h-6 text-white" aria-hidden="true" />
                            </div>
                            <div>
                                <h3 className="font-bold text-white">GitHub</h3>
                                <p className="text-sm text-slate-400">View the source code</p>
                            </div>
                            <ArrowRight className="ml-auto w-5 h-5 text-slate-400 group-hover:text-primary transition-colors" aria-hidden="true" />
                        </a>

                        <a
                            href="https://www.wavelength.zone/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center p-6 bg-slate-900/40 backdrop-blur-md border border-white/10 rounded-2xl transition-all hover:-translate-y-1 hover:border-white/20 group hover:shadow-[0_0_20px_rgba(255,255,255,0.05)]"
                        >
                            <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center mr-4 group-hover:scale-110 transition-transform">
                                <Heart className="w-6 h-6 text-rose-400" aria-hidden="true" />
                            </div>
                            <div>
                                <h3 className="font-bold text-white">Original Game</h3>
                                <p className="text-sm text-slate-400">Support the creators</p>
                            </div>
                            <ArrowRight className="ml-auto w-5 h-5 text-slate-400 group-hover:text-primary transition-colors" aria-hidden="true" />
                        </a>

                        <a
                            href="https://impostergame.lol"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center p-6 bg-slate-900/40 backdrop-blur-md border border-white/10 rounded-2xl transition-all hover:-translate-y-1 hover:border-white/20 group hover:shadow-[0_0_20px_rgba(255,255,255,0.05)]"
                        >
                            <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center mr-4 group-hover:scale-110 transition-transform">
                                <Gamepad2 className="w-6 h-6 text-emerald-400" aria-hidden="true" />
                            </div>
                            <div>
                                <h3 className="font-bold text-white">Imposter Game</h3>
                                <p className="text-sm text-slate-400">Another fun party game</p>
                            </div>
                            <ArrowRight className="ml-auto w-5 h-5 text-slate-400 group-hover:text-primary transition-colors" aria-hidden="true" />
                        </a>
                    </nav>

                    {/* Footer */}
                    <footer className="text-center pt-8 border-t border-border">
                        <p className="text-sm text-muted-foreground mb-4">
                            Disclaimer: This is a fan-made project and is not affiliated with the official Wavelength game creators.
                            Please support the original creators by buying the physical board game!
                        </p>
                        <Link href="/">
                            <Button variant="link" className="text-primary font-semibold">
                                Back to Game
                            </Button>
                        </Link>
                    </footer>
                </div>
            </article>
        </>
    );
}

