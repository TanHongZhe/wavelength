"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { GeneralKnowledgeGameEngine } from "@/components/minigames/general-knowledge/GeneralKnowledgeGameEngine";
import { Sparkles, GraduationCap, LogIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useUser, SignInButton } from "@clerk/nextjs";

export function GameWrapper() {
    return (
        <Suspense fallback={<div className="min-h-screen bg-background" />}>
            <GameWrapperContent />
        </Suspense>
    );
}

function GameWrapperContent() {
    const searchParams = useSearchParams();
    const { isSignedIn, isLoaded } = useUser();
    const [gameMode, setGameMode] = useState<"landing" | "create" | "join" | null>("landing");

    useEffect(() => {
        if (searchParams.get("code")) {
            setGameMode("join");
        }
    }, [searchParams]);

    if (gameMode === "create" || gameMode === "join") {
        return (
            <div className="fixed inset-0 z-50 bg-background">
                <GeneralKnowledgeGameEngine
                    onClose={() => setGameMode("landing")}
                    initialMode={gameMode}
                />
            </div>
        );
    }

    const isGuest = isLoaded && !isSignedIn;

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
                    className="w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl shadow-blue-500/20"
                    whileHover={{ rotate: 10, scale: 1.05 }}
                    animate={{ rotate: [0, 5, -5, 0] }}
                    transition={{
                        rotate: { duration: 4, repeat: Infinity, ease: "easeInOut" },
                        default: { type: "spring", stiffness: 400 }
                    }}
                >
                    <GraduationCap className="w-10 h-10 text-white" />
                </motion.div>

                <h2 className="font-display text-5xl md:text-6xl font-bold text-primary mb-3">
                    General Knowledge
                </h2>

                <p className="text-xl text-muted-foreground font-medium max-w-2xl mx-auto mb-8">
                    10 seconds to answer from 8 topics. Compete against friends locally or online!
                </p>

                <div className="space-y-4 w-full max-w-md mx-auto">
                    {isGuest ? (
                        <SignInButton mode="modal">
                            <motion.button
                                className="game-card w-full text-left group hover:scale-[1.02] transition-transform"
                                whileTap={{ scale: 0.98 }}
                            >
                                <div className="flex items-start gap-4">
                                    <div className="p-3 rounded-xl bg-wedge-teal/20 text-wedge-teal group-hover:bg-wedge-teal group-hover:text-white transition-colors">
                                        <LogIn className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h3 className="font-display text-xl font-semibold text-primary mb-1">
                                            Sign In to Create
                                        </h3>
                                        <p className="text-muted-foreground">
                                            Create an account to host games. You can join as a guest!
                                        </p>
                                    </div>
                                </div>
                            </motion.button>
                        </SignInButton>
                    ) : (
                        <motion.button
                            className="game-card w-full text-left group hover:scale-[1.02] transition-transform"
                            onClick={() => setGameMode("create")}
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
                                        Start a new quiz game
                                    </p>
                                </div>
                            </div>
                        </motion.button>
                    )}

                    <motion.button
                        className="game-card w-full text-left group hover:scale-[1.02] transition-transform"
                        onClick={() => setGameMode("join")}
                        whileTap={{ scale: 0.98 }}
                    >
                        <div className="flex items-start gap-4">
                            <div className="p-3 rounded-xl bg-wedge-orange/20 text-wedge-orange group-hover:bg-wedge-orange group-hover:text-white transition-colors">
                                <GraduationCap className="w-6 h-6" />
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
