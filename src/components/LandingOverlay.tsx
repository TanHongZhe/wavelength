"use client";

import { useState, useEffect } from "react";

interface LandingOverlayProps {
    title: string;
    description: string;
    emoji?: string;
    gradient?: string;
}

export function LandingOverlay({
    title,
    description,
    emoji = "💜",
    gradient = "from-purple-400 via-pink-400 to-purple-400",
}: LandingOverlayProps) {
    const [isVisible, setIsVisible] = useState(true);
    const [isAnimatingOut, setIsAnimatingOut] = useState(false);

    // Check if user has dismissed this overlay before (using localStorage)
    useEffect(() => {
        const dismissed = sessionStorage.getItem("landing-overlay-dismissed");
        if (dismissed === "true") {
            setIsVisible(false);
        }
    }, []);

    const handleDismiss = () => {
        setIsAnimatingOut(true);
        sessionStorage.setItem("landing-overlay-dismissed", "true");
        setTimeout(() => {
            setIsVisible(false);
        }, 300);
    };

    if (!isVisible) return null;

    return (
        <div
            className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-opacity duration-300 ${isAnimatingOut ? "opacity-0" : "opacity-100"
                }`}
            style={{ backgroundColor: "rgba(0, 0, 0, 0.7)", backdropFilter: "blur(4px)" }}
        >
            <div
                className={`relative max-w-lg w-full bg-card/95 backdrop-blur-xl border border-border/50 rounded-2xl p-8 shadow-2xl transform transition-all duration-300 ${isAnimatingOut ? "scale-95 opacity-0" : "scale-100 opacity-100"
                    }`}
            >
                {/* Glow effect */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-purple-500/20 blur-xl -z-10" />

                {/* Content */}
                <div className="text-center space-y-4">
                    <div className="text-4xl">{emoji}</div>

                    <h1 className={`text-2xl md:text-3xl font-bold bg-gradient-to-r ${gradient} bg-clip-text text-transparent`}>
                        {title}
                    </h1>

                    <p className="text-muted-foreground leading-relaxed">
                        {description}
                    </p>

                    <button
                        onClick={handleDismiss}
                        className="mt-6 px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
                    >
                        Play Now ▶
                    </button>
                </div>
            </div>
        </div>
    );
}
