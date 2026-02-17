"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";
import { Trophy, Medal, Sparkles, Home, Crown, Star, LogIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Room } from "@/hooks/useGameRoom";
import { useUser, SignInButton } from "@clerk/nextjs";
import { ProUpgradeCard } from "./ProUpgradeCard";

// Stripe Payment Link for monthly upgrade (same as PaywallModal)
// Stripe Payment Link for monthly upgrade (PRODUCTION)
// Stripe Payment Link for monthly upgrade (PRODUCTION)
import { STRIPE_MONTHLY_LINK } from "@/lib/stripe";

interface GameOverScreenProps {
    room: Room;
    playerId: string;
    onLeave: () => void;
}

export function GameOverScreen({ room, playerId, onLeave }: GameOverScreenProps) {
    const { isSignedIn, user } = useUser();
    const player1Score = room.psychic_score;
    const player2Score = room.guesser_score;
    const player1Name = room.player1_name || "Player 1";
    const player2Name = room.player2_name || "Player 2";
    const player1Avatar = room.player1_avatar || "🐼";
    const player2Avatar = room.player2_avatar || "🐯";

    // Determine winner
    const player1Wins = player1Score > player2Score;
    const player2Wins = player2Score > player1Score;
    const isTie = player1Score === player2Score;

    const [showUpgradeOverlay, setShowUpgradeOverlay] = useState(true);

    // Am I the winner?
    const amIPlayer1 = room.psychic_id === playerId || (!room.guesser_id);
    const iWon = (amIPlayer1 && player1Wins) || (!amIPlayer1 && player2Wins);

    const isLimitReached = room.clue?.includes("Daily Limit");

    const handleUpgrade = () => {
        if (!isSignedIn) return;
        const email = user?.primaryEmailAddress?.emailAddress;
        const url = email
            ? `${STRIPE_MONTHLY_LINK}?prefilled_email=${encodeURIComponent(email)}`
            : STRIPE_MONTHLY_LINK;
        window.open(url, "_blank");
    };

    // Trigger confetti on mount
    useEffect(() => {
        // Multiple bursts of confetti
        const duration = 3000;
        const animationEnd = Date.now() + duration;
        const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

        function randomInRange(min: number, max: number) {
            return Math.random() * (max - min) + min;
        }

        const interval = setInterval(function () {
            const timeLeft = animationEnd - Date.now();

            if (timeLeft <= 0) {
                return clearInterval(interval);
            }

            const particleCount = 50 * (timeLeft / duration);

            confetti({
                ...defaults,
                particleCount,
                origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
                colors: ['#2dd4bf', '#fb923c', '#fde047', '#a78bfa'],
            });
            confetti({
                ...defaults,
                particleCount,
                origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
                colors: ['#2dd4bf', '#fb923c', '#fde047', '#a78bfa'],
            });
        }, 250);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-6 relative">
            {/* Background decoration - only show if overlay is closed */}
            {!showUpgradeOverlay && (
                <div className="fixed inset-0 overflow-hidden pointer-events-none">
                    <motion.div
                        className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-wedge-teal/20 blur-3xl"
                        animate={{
                            scale: [1, 1.3, 1],
                            opacity: [0.3, 0.5, 0.3],
                        }}
                        transition={{ duration: 3, repeat: Infinity }}
                    />
                    <motion.div
                        className="absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full bg-wedge-orange/20 blur-3xl"
                        animate={{
                            scale: [1.3, 1, 1.3],
                            opacity: [0.3, 0.5, 0.3],
                        }}
                        transition={{ duration: 3, repeat: Infinity }}
                    />
                </div>
            )}


            {/* Main content */}
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 20 }}
                className="text-center z-10 w-full max-w-4xl"
            >
                {/* Trophy icon */}
                <motion.div
                    initial={{ y: -50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="mb-6"
                >
                    <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-br from-wedge-yellow to-wedge-orange shadow-lg">
                        <Trophy className="w-12 h-12 text-white" />
                    </div>
                </motion.div>

                {/* Title */}
                <motion.h1
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="font-display text-4xl md:text-5xl font-bold text-primary mb-2"
                >
                    {isLimitReached ? "Daily Limit Reached!" : "Game Over!"}
                </motion.h1>

                <motion.p
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="text-lg text-muted-foreground mb-8"
                >
                    {room.round_number} rounds played
                </motion.p>

                <div className="flex flex-col md:flex-row gap-6 justify-center items-start">
                    {/* Leaderboard */}
                    <motion.div
                        initial={{ y: 30, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="game-card w-full max-w-md mx-auto mb-8 flex-1"
                    >
                        <h2 className="font-display text-xl font-semibold text-primary mb-4 flex items-center justify-center gap-2">
                            <Sparkles className="w-5 h-5 text-wedge-yellow" />
                            Final Scores
                            <Sparkles className="w-5 h-5 text-wedge-yellow" />
                        </h2>

                        {/* Player 1 */}
                        <motion.div
                            initial={{ x: -20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: 0.6 }}
                            className={`flex items-center justify-between p-4 gap-4 rounded-xl mb-3 ${player1Wins ? "bg-wedge-teal/20 border-2 border-wedge-teal" : "bg-secondary"
                                }`}
                        >
                            <div className="flex items-center gap-3 min-w-0">
                                {player1Wins && <Medal className="w-6 h-6 text-wedge-teal flex-shrink-0" />}
                                <span className="text-2xl flex-shrink-0">{player1Avatar}</span>
                                <span className="font-display font-semibold text-primary truncate">
                                    {player1Name}
                                </span>
                            </div>
                            <span className="font-display text-2xl font-bold text-primary flex-shrink-0">
                                {player1Score}
                            </span>
                        </motion.div>

                        {/* Player 2 */}
                        <motion.div
                            initial={{ x: 20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: 0.7 }}
                            className={`flex items-center justify-between p-4 gap-4 rounded-xl ${player2Wins ? "bg-wedge-teal/20 border-2 border-wedge-teal" : "bg-secondary"
                                }`}
                        >
                            <div className="flex items-center gap-3 min-w-0">
                                {player2Wins && <Medal className="w-6 h-6 text-wedge-teal flex-shrink-0" />}
                                <span className="text-2xl flex-shrink-0">{player2Avatar}</span>
                                <span className="font-display font-semibold text-primary truncate">
                                    {player2Name}
                                </span>
                            </div>
                            <span className="font-display text-2xl font-bold text-primary flex-shrink-0">
                                {player2Score}
                            </span>
                        </motion.div>

                        {/* Result message */}
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.8 }}
                            className="mt-4 text-center font-display font-semibold"
                        >
                            {isTie ? (
                                <span className="text-wedge-orange">It&apos;s a tie! 🤝</span>
                            ) : iWon ? (
                                <span className="text-wedge-teal">You won! 🎉</span>
                            ) : (
                                <span className="text-muted-foreground">Better luck next time! 💪</span>
                            )}
                        </motion.p>
                    </motion.div>

                    {/* Upsell Card (Only visible if limit reached) */}
                    {isLimitReached && (
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0, x: 20 }}
                            animate={{ scale: 1, opacity: 1, x: 0 }}
                            transition={{ delay: 0.6 }}
                            className="game-card w-full max-w-md mx-auto mb-8 flex-1 bg-gradient-to-br from-amber-400/10 to-orange-500/10 border-orange-500/30"
                        >
                            <div className="p-4 bg-gradient-to-br from-amber-400 to-orange-500 rounded-xl text-white shadow-lg mb-6">
                                <Crown className="w-10 h-10 text-white fill-white/20 mb-3" />
                                <h3 className="text-2xl font-bold font-display mb-2">Unlock Unlimited Play</h3>
                                <p className="text-white/90 text-sm">
                                    Try Pro free for 24 hours! <span className="font-bold underline text-white">Only the host needs Pro for the whole party.</span>
                                </p>
                            </div>

                            <div className="space-y-3 mb-6 text-left">
                                <div className="flex items-center gap-2">
                                    <Star className="w-4 h-4 text-orange-500" />
                                    <span className="text-sm">Unlimited Daily Games</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Star className="w-4 h-4 text-orange-500" />
                                    <span className="text-sm font-bold text-orange-600 dark:text-orange-400">Host Unlocks for Everyone</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Star className="w-4 h-4 text-orange-500" />
                                    <span className="text-sm">Unlock Decks for Party</span>
                                </div>
                            </div>

                            {isSignedIn ? (
                                <Button
                                    onClick={handleUpgrade}
                                    className="w-full h-12 text-lg font-bold bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-500 hover:to-orange-600 text-white shadow-lg"
                                >
                                    <Sparkles className="w-4 h-4 mr-2" />
                                    Start 1-Day Free Trial
                                </Button>
                            ) : (
                                <SignInButton mode="modal">
                                    <LogIn className="w-4 h-4 mr-2" />
                                    Log In to Claim Free Trial
                                </SignInButton>
                            )}
                        </motion.div>
                    )}
                </div>

                {/* Play again button (only if NOT limit reached, or make it behave differently?) */}
                {!isLimitReached && (
                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.9 }}
                    >
                        <Button
                            onClick={onLeave}
                            className="btn-game gap-2 text-lg px-8 py-6"
                        >
                            <Home className="w-5 h-5" />
                            Play Again
                        </Button>
                    </motion.div>
                )}

                {isLimitReached && (
                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.9 }}
                    >
                        <Button
                            variant="ghost"
                            onClick={onLeave}
                            className="text-muted-foreground hover:text-foreground"
                        >
                            <Home className="w-4 h-4 mr-2" />
                            Return Home
                        </Button>
                    </motion.div>
                )}

            </motion.div>

            {/* Overlay Component */}
            {showUpgradeOverlay && (
                <div
                    className="fixed inset-0 z-[60] flex items-center justify-center p-4"
                    style={{ backgroundColor: "rgba(0,0,0,0.85)" }}
                >
                    <div className="relative w-full max-w-4xl">
                        <button
                            onClick={() => setShowUpgradeOverlay(false)}
                            className="absolute -top-3 -right-3 z-[70] bg-white text-black rounded-full w-10 h-10 flex items-center justify-center shadow-xl text-xl font-bold hover:bg-gray-200 transition-colors border-2 border-gray-300"
                        >
                            ✕
                        </button>
                        <ProUpgradeCard className="mt-0" />
                    </div>
                </div>
            )}
        </div >
    );
}
