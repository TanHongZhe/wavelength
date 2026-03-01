import { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";


export const metadata: Metadata = {
    title: "Terms of Service | Wavelength Game",
    description: "Read the Terms of Service for the Wavelength Game. Understand our rules, user conduct, intellectual property rights, and disclaimers before playing.",
    openGraph: {
        url: "https://wavelength.lol/terms/",
    },
};

export default function TermsPage() {
    return (
        <main className="container mx-auto px-4 py-32 max-w-4xl">
            <h1 className="text-3xl font-bold mb-6 text-white drop-shadow-sm">Terms of Service</h1>
            <div className="prose prose-invert max-w-none text-slate-400">
                <p className="mb-4">Last updated: {new Date().toLocaleDateString()}</p>
                <p className="mb-4">Welcome to the Wavelength Game. By accessing or using our website, you agree to be bound by these Terms of Service.</p>

                <h2 className="text-xl font-bold text-white mt-8 mb-4">1. Acceptance of Terms</h2>
                <p className="mb-4">By accessing or using our services, you agree to comply with and be bound by these terms. If you do not agree to these terms, you may not access or use usage of our services.</p>

                <h2 className="text-xl font-bold text-white mt-8 mb-4">2. Subscription Services</h2>
                <p className="mb-4">We offer subscription-based access to premium features ("Pro Access"). By subscribing, you agree to pay the applicable fees.</p>

                <h2 className="text-xl font-bold text-white mt-8 mb-4">3. User Conduct</h2>
                <p className="mb-4">You agree to use the service only for lawful purposes along with the game's intended nature. You are prohibited from violating or attempting to violate the security of the Website.</p>

                <h2 className="text-xl font-bold text-white mt-8 mb-4">4. Intellectual Property</h2>
                <p className="mb-4">The content, organization, graphics, design, compilation, and other matters related to the Site are protected under applicable copyrights and trademarks. This is a fan-made project and is not affiliated with the official Wavelength board game creators.</p>

                <h2 className="text-xl font-bold text-white mt-8 mb-4">5. Disclaimer</h2>
                <p className="mb-4">The materials on the Wavelength Game are provided on an 'as is' basis. The Wavelength Game makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.</p>
            </div>

            <div className="mt-16 pt-8 border-t border-white/10 text-center">
                <p className="mb-4 text-slate-400">Have questions regarding our Terms?</p>
                <Link href="/feedback">
                    <Button variant="outline">Contact Us</Button>
                </Link>
            </div>
        </main>
    );
}
