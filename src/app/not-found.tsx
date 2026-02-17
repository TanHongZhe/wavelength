import Link from "next/link";
import { Button } from "@/components/ui/button";
import { AudioWaveform, Home } from "lucide-react";

export default function NotFound() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-background text-foreground text-center">
            <div className="inline-flex items-center justify-center w-24 h-24 rounded-3xl bg-primary mb-8 animate-pulse">
                <AudioWaveform className="w-12 h-12 text-primary-foreground" />
            </div>

            <h1 className="font-display text-8xl font-bold text-primary mb-4">404</h1>
            <h2 className="text-2xl font-semibold mb-6">Off the Wavelength?</h2>

            <p className="text-muted-foreground max-w-md mb-8 text-lg">
                The page you are guessing for doesn&apos;t exist on this spectrum.
                Let&apos;s get you back to the game.
            </p>

            <Link href="/">
                <Button size="lg" className="btn-game gap-2">
                    <Home className="w-5 h-5" />
                    Back to Home
                </Button>
            </Link>
        </div>
    );
}
