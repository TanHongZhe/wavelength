"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Check, X, Trophy, Clock, ArrowRight } from "lucide-react";
import { Room, Player } from "./useGeneralKnowledgeRoom";
import confetti from "canvas-confetti";
import { ProUpgradeCard } from "@/components/game/ProUpgradeCard";

interface GeneralKnowledgeGameScreenProps {
    room: Room;
    players: Player[];
    currentPlayer?: Player;
    isHost: boolean;
    onSubmitAnswer: (index: number) => void;
    onReveal: () => void;
    onNextRound: () => void;
    onCalculateScores: () => void;
    onLeave: () => void;
    deckType: string;
}

export function GeneralKnowledgeGameScreen({
    room,
    players,
    currentPlayer,
    isHost,
    onSubmitAnswer,
    onReveal,
    onNextRound,
    onCalculateScores,
    onLeave,
    deckType,
}: GeneralKnowledgeGameScreenProps) {
    const [timeLeft, setTimeLeft] = useState(10);
    const [selectedOption, setSelectedOption] = useState<number | null>(null);
    const [showUpgradeOverlay, setShowUpgradeOverlay] = useState(true);
    const scoredRoundsRef = useRef<Set<number>>(new Set());
    const confettiFiredRef = useRef(false);

    // Timer logic
    useEffect(() => {
        if (room.phase === "playing") {
            setTimeLeft(10);
            setSelectedOption(null);

            const timer = setInterval(() => {
                setTimeLeft((prev) => {
                    if (prev <= 1) {
                        clearInterval(timer);
                        if (isHost) {
                            onReveal();
                        }
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);

            return () => clearInterval(timer);
        }
    }, [room.phase, room.round_number, isHost, onReveal]);

    // Auto-reveal when all players have submitted
    useEffect(() => {
        if (room.phase === "playing") {
            const allSubmitted = players.every(p =>
                p.answer && p.answer.round === room.round_number
            );

            if (allSubmitted && players.length > 0 && isHost) {
                setTimeout(() => {
                    onReveal();
                }, 500);
            }
        }
    }, [players, room.phase, room.round_number, isHost, onReveal]);

    // Score calculation
    useEffect(() => {
        if (room.phase === "revealed" && isHost && !scoredRoundsRef.current.has(room.round_number)) {
            scoredRoundsRef.current.add(room.round_number);
            onCalculateScores();
        }
    }, [room.phase, room.round_number, isHost, onCalculateScores]);

    // Handle Option Click
    const handleOptionClick = (index: number) => {
        if (room.phase !== "playing" || selectedOption !== null) return;
        setSelectedOption(index);
        onSubmitAnswer(index);
    };

    const currentQuestion = room.current_question;
    const isRevealed = room.phase === "revealed" || room.phase === "ended";

    const timerPercent = (timeLeft / 10) * 100;

    if (!currentQuestion && room.phase !== "ended") {
        return (
            <div className="fixed inset-0 bg-background flex items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                    <p className="text-muted-foreground">Loading question...</p>
                </div>
            </div>
        );
    }

    // ============================
    // GAME OVER SCREEN
    // ============================
    if (room.phase === "ended") {
        const sortedPlayers = [...players].sort((a, b) => b.score - a.score);
        const winner = sortedPlayers[0];
        const isWinner = winner?.player_id === currentPlayer?.player_id;

        if (isWinner && !confettiFiredRef.current) {
            confettiFiredRef.current = true;
            confetti({
                particleCount: 100,
                spread: 70,
                origin: { y: 0.6 }
            });
        }

        return (
            <>
                {/* Leaderboard - full screen centered */}
                <div className="fixed inset-0 bg-background z-40 flex items-center justify-center p-4">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="game-card max-w-lg w-full text-center p-8"
                    >
                        <Trophy className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
                        <h2 className="text-3xl font-display font-bold mb-2">Game Over!</h2>
                        <p className="text-muted-foreground mb-8">Final Scores</p>

                        <div className="space-y-4 mb-8 max-h-[40vh] overflow-y-auto pr-2">
                            {sortedPlayers.map((p, index) => (
                                <div key={p.id} className={`flex items-center justify-between p-4 rounded-xl border ${index === 0 ? "bg-yellow-500/10 border-yellow-500/50" : "bg-card border-border"}`}>
                                    <div className="flex items-center gap-3">
                                        <div className="font-bold text-lg w-6">{index + 1}.</div>
                                        <div className="text-2xl">{p.avatar}</div>
                                        <div className="font-medium text-left">
                                            <div>{p.name}</div>
                                            {index === 0 && <div className="text-xs text-yellow-500 font-bold">WINNER</div>}
                                        </div>
                                    </div>
                                    <div className="text-xl font-bold">{p.score} pts</div>
                                </div>
                            ))}
                        </div>

                        <Button onClick={onLeave} className="w-full h-12 btn-game">
                            Play Again
                        </Button>
                    </motion.div>
                </div>

                {/* Upgrade Overlay - ABOVE everything with z-[60] */}
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
            </>
        );
    }

    // ============================
    // GAMEPLAY SCREEN
    // ============================
    return (
        <div className="fixed inset-0 bg-background flex flex-col">
            {/* Header - Rapid Fire Style */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="fixed top-4 left-0 right-0 z-40 flex justify-center pointer-events-none"
            >
                <div className="pointer-events-auto flex items-center gap-4 md:gap-6 bg-background/80 backdrop-blur-md px-6 py-2 rounded-full border border-border/50 shadow-sm">
                    <div className="flex items-center gap-3 md:border-r md:border-border md:pr-4">
                        <div className="font-display text-sm text-muted-foreground mr-1">
                            Room: <span className="font-bold text-primary">{room.room_code}</span>
                        </div>
                        <div className="font-display text-sm text-muted-foreground">
                            Round: <span className="font-bold text-primary">{room.round_number}</span>
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        <span className="text-lg">{currentPlayer?.avatar}</span>
                        <div className="ml-2 text-center">
                            <p className="text-xs text-muted-foreground">Score</p>
                            <p className="font-display font-bold text-xl text-primary">{currentPlayer?.score || 0}</p>
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col items-center justify-center p-6 pt-24 overflow-y-auto">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={room.round_number}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="w-full max-w-3xl"
                    >
                        {/* Orange Countdown Bar */}
                        <div className="mb-8 max-w-lg mx-auto">
                            <div className="relative h-8 bg-secondary rounded-full overflow-hidden border border-border">
                                <motion.div
                                    className={`absolute inset-y-0 left-0 bg-gradient-to-r ${timeLeft <= 3 ? "from-red-500 to-red-400" : "from-wedge-orange to-wedge-yellow"}`}
                                    animate={{ width: `${timerPercent}%` }}
                                    transition={{ duration: 0.3 }}
                                />
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <span className={`font-display font-bold text-lg ${timeLeft <= 3 ? "text-white" : "text-primary flex items-center gap-2"}`}>
                                        {timeLeft > 0 ? (
                                            <>
                                                <Clock className="w-4 h-4" />
                                                {timeLeft}s
                                            </>
                                        ) : "⏰ Time's Up!"}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Question */}
                        <div className="text-center mb-8">
                            <h2 className="text-2xl md:text-3xl font-bold font-display leading-tight text-primary">
                                {currentQuestion?.question}
                            </h2>
                        </div>

                        {/* Options Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                            {currentQuestion?.options.map((option, index) => {
                                const isSelected = selectedOption === index;
                                const isCorrect = isRevealed && index === currentQuestion.answer;
                                const isWrong = isRevealed && isSelected && !isCorrect;

                                const playersWhoChoseThis = players.filter(
                                    (p) =>
                                        p.answer &&
                                        p.answer.round === room.round_number &&
                                        p.answer.choice === index
                                );

                                return (
                                    <motion.button
                                        key={index}
                                        onClick={() => handleOptionClick(index)}
                                        disabled={isRevealed || timeLeft === 0 || selectedOption !== null}
                                        whileHover={!isRevealed && !selectedOption ? { scale: 1.02 } : {}}
                                        whileTap={!isRevealed && !selectedOption ? { scale: 0.98 } : {}}
                                        className={`relative overflow-hidden rounded-2xl p-6 text-center transition-all border-2 min-h-[100px] flex flex-col items-center justify-center gap-2 group ${isRevealed
                                            ? isCorrect
                                                ? "border-green-500 bg-green-500/20 shadow-md"
                                                : isWrong
                                                    ? "border-red-500 bg-red-500/20 opacity-90"
                                                    : "border-border bg-muted/50 opacity-50"
                                            : isSelected
                                                ? "border-wedge-teal bg-wedge-teal/10 shadow-lg ring-2 ring-wedge-teal/20"
                                                : "border-border bg-card hover:border-wedge-teal hover:shadow-lg cursor-pointer"
                                            }`}
                                    >
                                        <div className={`absolute left-0 top-0 bottom-0 w-1.5 transition-colors ${isRevealed
                                            ? isCorrect ? "bg-green-500" : isWrong ? "bg-red-500" : "bg-transparent"
                                            : isSelected ? "bg-wedge-teal" : "bg-transparent group-hover:bg-wedge-teal/50"
                                            }`} />

                                        <span className={`font-display text-lg font-semibold px-2 ${isRevealed && isCorrect ? "text-green-700 dark:text-green-300" :
                                            isRevealed && isWrong ? "text-red-700 dark:text-red-300" :
                                                "text-primary"
                                            }`}>
                                            {option}
                                        </span>

                                        {/* Avatars of players who chose this */}
                                        {isRevealed && playersWhoChoseThis.length > 0 && (
                                            <div className="flex flex-wrap justify-center gap-1 mt-1 z-10 w-full px-2">
                                                {playersWhoChoseThis.map((p) => (
                                                    <div
                                                        key={p.id}
                                                        className="w-6 h-6 rounded-full bg-background border border-border flex items-center justify-center text-xs shadow-sm"
                                                        title={p.name}
                                                    >
                                                        {p.avatar}
                                                    </div>
                                                ))}
                                            </div>
                                        )}

                                        {/* Status Icons */}
                                        {isRevealed && isCorrect && (
                                            <div className="absolute top-2 right-2 bg-green-500 text-white rounded-full p-1 shadow-sm">
                                                <Check className="w-3 h-3" />
                                            </div>
                                        )}
                                        {isRevealed && isWrong && (
                                            <div className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 shadow-sm">
                                                <X className="w-3 h-3" />
                                            </div>
                                        )}
                                    </motion.button>
                                );
                            })}
                        </div>

                        {/* Player Avatars Strip */}
                        <div className="flex flex-wrap items-center justify-center gap-4 bg-secondary/50 p-4 rounded-xl border border-border/50 backdrop-blur-sm">
                            {players.map((p) => {
                                const hasAnswered = p.answer && p.answer.round === room.round_number;
                                const isMe = p.player_id === currentPlayer?.player_id;

                                return (
                                    <div key={p.id} className="relative flex flex-col items-center">
                                        <motion.div
                                            className={`w-10 h-10 rounded-full flex items-center justify-center border-2 text-lg shadow-sm ${hasAnswered && !isRevealed ? "bg-wedge-teal border-wedge-teal text-white" :
                                                isMe ? "bg-primary border-primary text-primary-foreground" : "bg-card border-border text-muted-foreground"
                                                }`}
                                            animate={hasAnswered && !isRevealed ? { scale: [1, 1.15, 1] } : {}}
                                        >
                                            {p.avatar}
                                        </motion.div>

                                        {/* Result Indicators */}
                                        {isRevealed && hasAnswered && (
                                            <div className={`absolute -top-1 -right-1 w-4 h-4 rounded-full flex items-center justify-center border border-white ${p.answer?.choice === currentQuestion?.answer ? "bg-green-500" : "bg-red-500"
                                                }`}>
                                                {p.answer?.choice === currentQuestion?.answer ? (
                                                    <Check className="w-2.5 h-2.5 text-white" />
                                                ) : (
                                                    <X className="w-2.5 h-2.5 text-white" />
                                                )}
                                            </div>
                                        )}

                                        {/* Name - Always visible */}
                                        <div className="mt-1 text-xs font-semibold text-center max-w-[64px] truncate text-muted-foreground">
                                            {p.name}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        {/* Host Controls */}
                        {isRevealed && isHost && (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="mt-8 flex justify-center"
                            >
                                <Button
                                    size="lg"
                                    onClick={onNextRound}
                                    className="btn-game gap-2 px-8 h-12 text-lg"
                                >
                                    Next Question <ArrowRight className="w-4 h-4" />
                                </Button>
                            </motion.div>
                        )}
                        {isRevealed && !isHost && (
                            <div className="mt-8 text-center text-muted-foreground animate-pulse">
                                Waiting for host...
                            </div>
                        )}
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Leave button */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="fixed bottom-6 left-6 z-40"
            >
                <Button variant="outline" size="sm" onClick={onLeave} className="bg-background/80 backdrop-blur-sm">
                    ← Leave
                </Button>
            </motion.div>
        </div>
    );
}
