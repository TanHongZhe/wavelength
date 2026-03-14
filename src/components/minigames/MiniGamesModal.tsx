"use client";

import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { X, Zap, Flag, Users, SlidersVertical, GraduationCap } from "lucide-react";

interface MiniGamesModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export function MiniGamesModal({ isOpen, onClose }: MiniGamesModalProps) {
    const router = useRouter();

    const handleNavigate = (path: string) => {
        router.push(path);
        onClose();
    };

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
                            {/* Fantasy Slider Game Card */}
                            <motion.button
                                className="game-card border border-white/10 w-full text-left group hover:scale-[1.02] transition-transform"
                                onClick={() => handleNavigate("/games/fantasy-slider")}
                                whileTap={{ scale: 0.98 }}
                            >
                                <div className="flex items-start gap-3 md:gap-4">
                                    <div className="p-3 md:p-4 rounded-xl bg-gradient-to-br from-blue-400/20 to-cyan-400/20 text-cyan-500 group-hover:from-blue-400 group-hover:to-cyan-400 group-hover:text-white transition-all">
                                        <SlidersVertical className="w-6 h-6 md:w-8 md:h-8" />
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="font-display text-lg md:text-xl font-semibold text-primary mb-1">
                                            🎚️ Fantasy Slider
                                        </h3>
                                        <p className="text-xs md:text-sm text-muted-foreground mb-2">
                                            Rate your interest in various fantasies on a scale of 0-10. See how well matched you are!
                                        </p>
                                        <div className="flex gap-2 flex-wrap">
                                            <span className="px-2 py-1 rounded-md bg-secondary text-xs font-medium">
                                                2 Players
                                            </span>
                                            <span className="px-2 py-1 rounded-md bg-secondary text-xs font-medium">
                                                Untimed
                                            </span>
                                            <span className="px-2 py-1 rounded-md bg-green-500/20 text-green-600 dark:text-green-400 text-xs font-medium">
                                                NEW ✨
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </motion.button>

                            {/* Who's Most Likely Game Card */}
                            <motion.button
                                className="game-card border border-white/10 w-full text-left group hover:scale-[1.02] transition-transform"
                                onClick={() => handleNavigate("/games/whos-most-likely")}
                                whileTap={{ scale: 0.98 }}
                            >
                                <div className="flex items-start gap-3 md:gap-4">
                                    <div className="p-3 md:p-4 rounded-xl bg-gradient-to-br from-purple-400/20 to-pink-400/20 text-pink-500 group-hover:from-purple-400 group-hover:to-pink-400 group-hover:text-white transition-all">
                                        <Users className="w-6 h-6 md:w-8 md:h-8" />
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="font-display text-lg md:text-xl font-semibold text-primary mb-1">
                                            👈 Rapid Fire: Who's Most Likely?
                                        </h3>
                                        <p className="text-xs md:text-sm text-muted-foreground mb-2">
                                            Point fingers! Who is most likely to do what? 10 seconds to decide.
                                        </p>
                                        <div className="flex gap-2 flex-wrap">
                                            <span className="px-2 py-1 rounded-md bg-secondary text-xs font-medium">
                                                2 Players
                                            </span>
                                            <span className="px-2 py-1 rounded-md bg-secondary text-xs font-medium">
                                                3 Decks
                                            </span>
                                            <span className="px-2 py-1 rounded-md bg-green-500/20 text-green-600 dark:text-green-400 text-xs font-medium">
                                                NEW ✨
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </motion.button>

                            {/* Rapid Fire Game Card */}
                            <motion.button
                                className="game-card border border-white/10 w-full text-left group hover:scale-[1.02] transition-transform"
                                onClick={() => handleNavigate("/games/this-or-that")}
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
                                className="game-card border border-white/10 w-full text-left group hover:scale-[1.02] transition-transform"
                                onClick={() => handleNavigate("/games/flag-game")}
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
                                            Rate dating behaviors as red, green, or beige flags.
                                        </p>
                                        <div className="flex gap-2 flex-wrap">
                                            <span className="px-2 py-1 rounded-md bg-secondary text-xs font-medium">
                                                2 Players
                                            </span>
                                            <span className="px-2 py-1 rounded-md bg-secondary text-xs font-medium">
                                                20-100 rounds
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </motion.button>

                            {/* General Knowledge Game Card */}
                            <motion.button
                                className="game-card border border-white/10 w-full text-left group hover:scale-[1.02] transition-transform"
                                onClick={() => handleNavigate("/games/general-knowledge")}
                                whileTap={{ scale: 0.98 }}
                            >
                                <div className="flex items-start gap-3 md:gap-4">
                                    <div className="p-3 md:p-4 rounded-xl bg-gradient-to-br from-blue-400/20 to-indigo-400/20 text-indigo-500 group-hover:from-blue-400 group-hover:to-indigo-400 group-hover:text-white transition-all">
                                        <GraduationCap className="w-6 h-6 md:w-8 md:h-8" />
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="font-display text-lg md:text-xl font-semibold text-primary mb-1">
                                            🎓 Rapid Fire: General Knowledge Quiz
                                        </h3>
                                        <p className="text-xs md:text-sm text-muted-foreground mb-2">
                                            10 seconds to answer! Test your smarts across 15 topics.
                                        </p>
                                        <div className="flex gap-2 flex-wrap">
                                            <span className="px-2 py-1 rounded-md bg-secondary text-xs font-medium">
                                                2-6 Players
                                            </span>
                                            <span className="px-2 py-1 rounded-md bg-secondary text-xs font-medium">
                                                Timed
                                            </span>
                                            <span className="px-2 py-1 rounded-md bg-green-500/20 text-green-600 dark:text-green-400 text-xs font-medium">
                                                NEW ✨
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </motion.button>
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
        </AnimatePresence >
    );
}
