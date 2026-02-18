"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { RapidFireGameEngine } from "@/components/minigames/rapid-fire/RapidFireGameEngine";
import { Button } from "@/components/ui/button";
import { Sparkles, Users, Zap } from "lucide-react";
import { motion } from "framer-motion";

export function GameWrapper() {
    return (
        <Suspense fallback={<div className="min-h-screen bg-background" />}>
            <GameWrapperContent />
        </Suspense>
    );
}

function GameWrapperContent() {
    const searchParams = useSearchParams();
    const [gameState, setGameState] = useState<{ isPlaying: boolean; initialMode: "create" | "join" | "initial" }>({
        isPlaying: false,
        initialMode: "initial"
    });

    useEffect(() => {
        if (searchParams.get("code")) {
            setGameState({ isPlaying: true, initialMode: "join" });
        }
    }, [searchParams]);

    if (gameState.isPlaying) {
        return (
            <div className="fixed inset-0 z-50 bg-background">
                <RapidFireGameEngine
                    onClose={() => setGameState({ isPlaying: false, initialMode: "initial" })}
                    initialMode={gameState.initialMode}
                />
            </div>
        );
    }

    return (
        <div className="relative w-full py-20 bg-gradient-to-b from-background via-purple-900/10 to-background flex flex-col items-center justify-center text-center overflow-hidden">
            <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="relative z-10 container px-4"
            >
                <motion.div
                    className="w-20 h-20 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl shadow-orange-500/20"
                    whileHover={{ rotate: 10, scale: 1.05 }}
                    animate={{ rotate: [0, 5, -5, 0] }}
                    transition={{
                        rotate: { duration: 4, repeat: Infinity, ease: "easeInOut" },
                        default: { type: "spring", stiffness: 400 }
                    }}
                >
                    <Zap className="w-10 h-10 text-white" />
                </motion.div>

                <h2 className="font-display text-5xl md:text-6xl font-bold text-primary mb-3">
                    This or That
                </h2>

                <p className="text-xl text-muted-foreground font-medium max-w-2xl mx-auto mb-8">
                    10 seconds to choose between two options with your partner. See if you're on the same page!
                </p>

                <div className="space-y-4 w-full max-w-md mx-auto">
                    <motion.button
                        className="game-card w-full text-left group hover:scale-[1.02] transition-transform"
                        onClick={() => setGameState({ isPlaying: true, initialMode: "create" })}
                        whileTap={{ scale: 0.98 }}
                    >
                        <div className="flex items-start gap-4">
                            <div className="p-3 rounded-xl bg-wedge-teal/20 text-wedge-teal group-hover:bg-wedge-teal group-hover:text-white transition-colors">
                                <Sparkles className="w-6 h-6" />
                            </div>
                            <div>
                                <h3 className="font-display text-xl font-semibold text-primary mb-1">
                                    Create Room
                                </h3>
                                <p className="text-muted-foreground">
                                    Start a new game (Classic or Party)
                                </p>
                            </div>
                        </div>
                    </motion.button>

                    <motion.button
                        className="game-card w-full text-left group hover:scale-[1.02] transition-transform"
                        onClick={() => setGameState({ isPlaying: true, initialMode: "join" })}
                        whileTap={{ scale: 0.98 }}
                    >
                        <div className="flex items-start gap-4">
                            <div className="p-3 rounded-xl bg-wedge-orange/20 text-wedge-orange group-hover:bg-wedge-orange group-hover:text-white transition-colors">
                                <Users className="w-6 h-6" />
                            </div>
                            <div>
                                <h3 className="font-display text-xl font-semibold text-primary mb-1">
                                    Join Room
                                </h3>
                                <p className="text-muted-foreground">
                                    Enter a room code to join
                                </p>
                            </div>
                        </div>
                    </motion.button>
                </div>
            </motion.div>
        </div>
    );
}
