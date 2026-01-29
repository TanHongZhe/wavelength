"use client";

import dynamic from "next/dynamic";
import { AudioWaveform } from "lucide-react";

const GameEngine = dynamic(
    () => import("./GameEngine").then((mod) => mod.GameEngine),
    {
        ssr: false,
        loading: () => (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary mb-4 animate-pulse">
                        <AudioWaveform className="w-8 h-8 text-primary-foreground" />
                    </div>
                    <p className="text-muted-foreground">Loading game...</p>
                </div>
            </div>
        ),
    }
);

export function GameLoader() {
    return <GameEngine />;
}
