"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";
import { Trophy, Medal, Sparkles, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Room } from "@/hooks/useGameRoom";

interface GameOverScreenProps {
    room: Room;
    playerId: string;
    onLeave: () => void;
}

export function GameOverScreen({ room, playerId, onLeave }: GameOverScreenProps) {
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

    // Am I the winner?
    const amIPlayer1 = room.psychic_id === playerId || (!room.guesser_id);
    const iWon = (amIPlayer1 && player1Wins) || (!amIPlayer1 && player2Wins);

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
        <div className="min-h-screen flex flex-col items-center justify-center p-6">
            {/* Background decoration */}
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

            {/* Main content */}
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 20 }}
                className="text-center z-10"
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
                    Game Over!
                </motion.h1>

                <motion.p
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="text-lg text-muted-foreground mb-8"
                >
                    {room.round_number} rounds played
                </motion.p>

                {/* Leaderboard */}
                <motion.div
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="game-card max-w-sm mx-auto mb-8"
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
                        className={`flex items-center justify-between p-4 rounded-xl mb-3 ${player1Wins ? "bg-wedge-teal/20 border-2 border-wedge-teal" : "bg-secondary"
                            }`}
                    >
                        <div className="flex items-center gap-3">
                            {player1Wins && <Medal className="w-6 h-6 text-wedge-teal" />}
                            <span className="text-2xl">{player1Avatar}</span>
                            <span className="font-display font-semibold text-primary">
                                {player1Name}
                            </span>
                        </div>
                        <span className="font-display text-2xl font-bold text-primary">
                            {player1Score}
                        </span>
                    </motion.div>

                    {/* Player 2 */}
                    <motion.div
                        initial={{ x: 20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.7 }}
                        className={`flex items-center justify-between p-4 rounded-xl ${player2Wins ? "bg-wedge-teal/20 border-2 border-wedge-teal" : "bg-secondary"
                            }`}
                    >
                        <div className="flex items-center gap-3">
                            {player2Wins && <Medal className="w-6 h-6 text-wedge-teal" />}
                            <span className="text-2xl">{player2Avatar}</span>
                            <span className="font-display font-semibold text-primary">
                                {player2Name}
                            </span>
                        </div>
                        <span className="font-display text-2xl font-bold text-primary">
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

                {/* Play again button */}
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
            </motion.div>
        </div>
    );
}
