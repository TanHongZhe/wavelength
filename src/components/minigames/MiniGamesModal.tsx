"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Zap, Flag } from "lucide-react";
import { RapidFireGameEngine } from "./rapid-fire/RapidFireGameEngine";
import { FlagGameEngine } from "./flag-game/FlagGameEngine";

interface MiniGamesModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export function MiniGamesModal({ isOpen, onClose }: MiniGamesModalProps) {
    const [selectedGame, setSelectedGame] = useState<string | null>(null);

    // If a game is selected, show that game's engine
    if (selectedGame === "rapid-fire") {
        return (
            <RapidFireGameEngine
                onClose={() => {
                    setSelectedGame(null);
                    onClose();
                }}
            />
        );
    }

    if (selectedGame === "flag-game") {
        return (
            <FlagGameEngine
                onClose={() => {
                    setSelectedGame(null);
                    onClose();
                }}
            />
        );
    }

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
                        onClick={onClose}
                    />

                    {/* Modal */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[95%] md:w-full max-w-2xl max-h-[80vh] overflow-y-auto bg-card border-2 border-border rounded-2xl shadow-2xl z-50 p-4 md:p-6"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between mb-4 md:mb-6">
                            <div>
                                <h2 className="text-2xl md:text-3xl font-display font-bold text-primary">
                                    Mini Games 🎲
                                </h2>
                                <p className="text-sm md:text-base text-muted-foreground mt-1">
                                    Quick 2-player games to play together
                                </p>
                            </div>
                            <button
                                onClick={onClose}
                                className="p-2 rounded-lg hover:bg-secondary transition-colors"
                            >
                                <X className="w-6 h-6" />
                            </button>
                        </div>

                        {/* Games Grid */}
                        <div className="space-y-3 md:space-y-4">
                            {/* Rapid Fire Game Card */}
                            <motion.button
                                className="game-card w-full text-left group hover:scale-[1.02] transition-transform"
                                onClick={() => setSelectedGame("rapid-fire")}
                                whileTap={{ scale: 0.98 }}
                            >
                                <div className="flex items-start gap-3 md:gap-4">
                                    <div className="p-3 md:p-4 rounded-xl bg-gradient-to-br from-yellow-400/20 to-orange-400/20 text-orange-500 group-hover:from-yellow-400 group-hover:to-orange-400 group-hover:text-white transition-all">
                                        <Zap className="w-6 h-6 md:w-8 md:h-8" />
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="font-display text-lg md:text-xl font-semibold text-primary mb-1">
                                            ⚡ Rapid Fire: This or That
                                        </h3>
                                        <p className="text-xs md:text-sm text-muted-foreground mb-2">
                                            10 seconds to choose between this or that with your partner. See if you&apos;re on the same page!
                                        </p>
                                        <div className="flex gap-2 flex-wrap">
                                            <span className="px-2 py-1 rounded-md bg-secondary text-xs font-medium">
                                                2 Players
                                            </span>
                                            <span className="px-2 py-1 rounded-md bg-secondary text-xs font-medium">
                                                ~5 min
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </motion.button>

                            {/* Flag Game Card */}
                            <motion.button
                                className="game-card w-full text-left group hover:scale-[1.02] transition-transform"
                                onClick={() => setSelectedGame("flag-game")}
                                whileTap={{ scale: 0.98 }}
                            >
                                <div className="flex items-start gap-3 md:gap-4">
                                    <div className="p-3 md:p-4 rounded-xl bg-gradient-to-br from-red-400/20 to-green-400/20 text-red-500 group-hover:from-red-400 group-hover:to-green-400 group-hover:text-white transition-all">
                                        <Flag className="w-6 h-6 md:w-8 md:h-8" />
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="font-display text-lg md:text-xl font-semibold text-primary mb-1">
                                            🚩 Rapid Fire: Red, Green, Beige
                                        </h3>
                                        <p className="text-xs md:text-sm text-muted-foreground mb-2">
                                            Rate dating behaviors as red flags, green flags, or beige flags! Limited beige flags forces hard choices.
                                        </p>
                                        <div className="flex gap-2 flex-wrap">
                                            <span className="px-2 py-1 rounded-md bg-secondary text-xs font-medium">
                                                2 Players
                                            </span>
                                            <span className="px-2 py-1 rounded-md bg-secondary text-xs font-medium">
                                                20-100 rounds
                                            </span>
                                            <span className="px-2 py-1 rounded-md bg-green-500/20 text-green-600 dark:text-green-400 text-xs font-medium">
                                                NEW ✨
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </motion.button>

                            {/* Placeholder for future games - only show 1 on mobile */}
                            <div className="hidden md:grid md:grid-cols-2 gap-3">
                                {[1, 2].map((i) => (
                                    <div
                                        key={i}
                                        className="game-card opacity-50 cursor-not-allowed"
                                    >
                                        <div className="text-center py-6">
                                            <div className="text-3xl mb-2">🎮</div>
                                            <p className="text-sm font-semibold text-muted-foreground">
                                                Coming Soon
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Footer - hidden on mobile */}
                        <div className="hidden md:block mt-6 pt-4 border-t border-border">
                            <p className="text-sm text-muted-foreground text-center">
                                More mini games coming soon! Have suggestions? Send us feedback.
                            </p>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
