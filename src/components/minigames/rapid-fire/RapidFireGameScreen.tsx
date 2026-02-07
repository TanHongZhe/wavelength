"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GameConfig } from "./RapidFireGameEngine";
import { Button } from "@/components/ui/button";
import { getDeckCards, RapidFireCard, DeckType } from "./cards";
import { supabase } from "@/lib/supabase/client";
import { ArrowRight, Check, X } from "lucide-react";

interface RapidFireGameScreenProps {
    config: GameConfig;
    roomId: string;
    isPlayer1: boolean;
    opponentName: string;
    opponentAvatar: string;
    onLeave: () => void;
}

const ROUND_TIME_SECONDS = 10;

export function RapidFireGameScreen({
    config,
    roomId,
    isPlayer1,
    opponentName,
    opponentAvatar,
    onLeave
}: RapidFireGameScreenProps) {
    const [cards] = useState<RapidFireCard[]>(() => {
        const seed = config.roomCode?.split('').reduce((a, b) => a + b.charCodeAt(0), 0) || 0;
        const deckCards = getDeckCards(config.deckType as DeckType, config.cardCount, seed);
        return deckCards;
    });

    const [currentRound, setCurrentRound] = useState(1);
    const [myChoice, setMyChoice] = useState<string | null>(null);
    const [opponentChoice, setOpponentChoice] = useState<string | null>(null);
    const [teamScore, setTeamScore] = useState(0);
    const [phase, setPhase] = useState<"choosing" | "reveal">("choosing");
    const [gameOver, setGameOver] = useState(false);
    const [timeLeft, setTimeLeft] = useState(ROUND_TIME_SECONDS);
    const [timedOut, setTimedOut] = useState(false);
    const timerRef = useRef<NodeJS.Timeout | null>(null);
    const hasSubmittedTimeout = useRef(false);

    const currentCard = cards[currentRound - 1];

    // Submit timeout choice to Supabase
    const submitTimeout = useCallback(async () => {
        if (hasSubmittedTimeout.current) return;
        hasSubmittedTimeout.current = true;

        setTimedOut(true);
        setMyChoice("__TIMEOUT__");

        const updateData = isPlayer1
            ? { player1_choice: "__TIMEOUT__" }
            : { player2_choice: "__TIMEOUT__" };

        await supabase
            .from("rooms")
            .update(updateData as Record<string, unknown>)
            .eq("id", roomId);
    }, [isPlayer1, roomId]);

    // Timer countdown - keeps running even after choice, stops on reveal
    useEffect(() => {
        // Only stop timer in reveal phase
        if (phase === "reveal") {
            if (timerRef.current) {
                clearInterval(timerRef.current);
                timerRef.current = null;
            }
            return;
        }

        timerRef.current = setInterval(() => {
            setTimeLeft(prev => {
                if (prev <= 1) {
                    // Time's up! Submit timeout if player hasn't picked
                    if (!myChoice && !hasSubmittedTimeout.current) {
                        submitTimeout();
                    }
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => {
            if (timerRef.current) {
                clearInterval(timerRef.current);
                timerRef.current = null;
            }
        };
    }, [phase, myChoice, submitTimeout]);

    // Reset state when round changes
    useEffect(() => {
        setTimeLeft(ROUND_TIME_SECONDS);
        setTimedOut(false);
        hasSubmittedTimeout.current = false;
    }, [currentRound]);

    // Poll for game state updates
    useEffect(() => {
        if (!roomId) return;

        const poll = async () => {
            const { data } = await supabase
                .from("rooms")
                .select("*")
                .eq("id", roomId)
                .single();

            if (data) {
                const roomData = data as Record<string, unknown>;
                const roundNum = (roomData.round_number as number) || 1;
                const p1Choice = roomData.player1_choice as string | null;
                const p2Choice = roomData.player2_choice as string | null;
                const serverTeamScore = (roomData.psychic_score as number) || 0;

                // Update team score
                setTeamScore(serverTeamScore);

                // Get choices based on player role
                const theirChoice = isPlayer1 ? p2Choice : p1Choice;
                const serverMyChoice = isPlayer1 ? p1Choice : p2Choice;

                // Update opponent choice
                if (theirChoice) {
                    setOpponentChoice(theirChoice);
                }

                // Sync my choice from server if we don't have it locally
                if (serverMyChoice && !myChoice) {
                    setMyChoice(serverMyChoice);
                    if (serverMyChoice === "__TIMEOUT__") {
                        setTimedOut(true);
                    }
                }

                // CRITICAL: Check if both players have made choices - go to reveal
                if (p1Choice && p2Choice && phase === "choosing") {
                    setPhase("reveal");
                }

                // If round changed from server, sync it
                if (roundNum > currentRound) {
                    setCurrentRound(roundNum);
                    setMyChoice(null);
                    setOpponentChoice(null);
                    setPhase("choosing");
                    setTimeLeft(ROUND_TIME_SECONDS);
                    setTimedOut(false);
                    hasSubmittedTimeout.current = false;
                }
            }
        };

        poll();
        const interval = setInterval(poll, 400); // Poll slightly faster
        return () => clearInterval(interval);
    }, [roomId, isPlayer1, currentRound, phase, myChoice]);

    const handleChoice = async (choice: string) => {
        if (myChoice || timedOut) return;

        setMyChoice(choice);

        const updateData = isPlayer1
            ? { player1_choice: choice }
            : { player2_choice: choice };

        await supabase
            .from("rooms")
            .update(updateData as Record<string, unknown>)
            .eq("id", roomId);
    };

    const handleNextRound = async () => {
        // Only host (Player 1) can advance rounds
        if (!isPlayer1) return;

        // Calculate if matched (timeouts never match)
        const myActualChoice = myChoice || "__TIMEOUT__";
        const opponentActualChoice = opponentChoice || "__TIMEOUT__";
        const matched = myActualChoice === opponentActualChoice && myActualChoice !== "__TIMEOUT__";

        const newTeamScore = matched ? teamScore + 1 : teamScore;

        if (currentRound >= config.cardCount) {
            await supabase
                .from("rooms")
                .update({
                    psychic_score: newTeamScore,
                    phase: "ended",
                    player1_choice: null,
                    player2_choice: null,
                } as Record<string, unknown>)
                .eq("id", roomId);
            setGameOver(true);
        } else {
            await supabase
                .from("rooms")
                .update({
                    round_number: currentRound + 1,
                    psychic_score: newTeamScore,
                    player1_choice: null,
                    player2_choice: null,
                } as Record<string, unknown>)
                .eq("id", roomId);

            // Reset local state for next round
            setMyChoice(null);
            setOpponentChoice(null);
            setPhase("choosing");
            setCurrentRound(prev => prev + 1);
            if (matched) {
                setTeamScore(prev => prev + 1);
            }
        }
    };

    if (!currentCard) {
        return (
            <div className="fixed inset-0 bg-background z-50 flex items-center justify-center">
                <p>Loading cards...</p>
            </div>
        );
    }

    // Game Over Screen
    if (gameOver) {
        return (
            <div className="fixed inset-0 bg-background z-50 flex items-center justify-center p-6">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="game-card max-w-md w-full text-center"
                >
                    <h2 className="font-display text-3xl font-bold text-primary mb-4">🎉 Game Over!</h2>

                    <div className="flex items-center justify-center gap-3 mb-4">
                        <span className="text-4xl">{config.playerAvatar}</span>
                        <span className="text-4xl">{opponentAvatar}</span>
                    </div>

                    <div className="text-6xl font-display font-bold text-primary mb-2">
                        {teamScore} / {config.cardCount}
                    </div>
                    <p className="text-lg text-muted-foreground mb-4">Team Score</p>

                    <p className="text-muted-foreground mb-6">
                        {teamScore >= config.cardCount * 0.8
                            ? "🔥 Amazing! You're totally in sync!"
                            : teamScore >= config.cardCount * 0.5
                                ? "✨ Great minds think alike!"
                                : "💭 Opposites attract?"}
                    </p>

                    <Button onClick={onLeave} className="w-full h-12 btn-game">
                        Back to Home
                    </Button>
                </motion.div>
            </div>
        );
    }

    // Timer bar width percentage
    const timerPercent = (timeLeft / ROUND_TIME_SECONDS) * 100;

    // Get display values for reveal phase
    const getDisplayChoice = (choice: string | null) => {
        if (!choice || choice === "__TIMEOUT__") return "🐌 Too Slow!";
        return choice;
    };

    const didITimeout = myChoice === "__TIMEOUT__" || timedOut;
    const didOpponentTimeout = opponentChoice === "__TIMEOUT__";

    // Check if we're waiting for opponent
    const waitingForOpponent = myChoice && !opponentChoice && phase === "choosing";

    return (
        <div className="fixed inset-0 bg-background z-50 flex flex-col">
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="fixed top-4 left-0 right-0 z-40 flex justify-center pointer-events-none"
            >
                <div className="pointer-events-auto flex items-center gap-4 md:gap-6 bg-background/80 backdrop-blur-md px-6 py-2 rounded-full border border-border/50 shadow-sm">
                    <div className="flex items-center gap-3 md:border-r md:border-border md:pr-4">
                        <div className="font-display text-sm text-muted-foreground mr-1">
                            Room: <span className="font-bold text-primary">{config.roomCode}</span>
                        </div>
                        <div className="font-display text-sm text-muted-foreground">
                            Round: <span className="font-bold text-primary">{currentRound}/{config.cardCount}</span>
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        <span className="text-lg">{config.playerAvatar}</span>
                        <span className="text-lg">{opponentAvatar}</span>
                        <div className="ml-2 text-center">
                            <p className="text-xs text-muted-foreground">Team Score</p>
                            <p className="font-display font-bold text-xl text-primary">{teamScore}</p>
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col items-center justify-center p-6 pt-24">
                <AnimatePresence mode="wait">
                    {phase === "choosing" && (
                        <motion.div
                            key={`choosing-${currentRound}`}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="w-full max-w-lg"
                        >
                            {/* Orange Countdown Bar */}
                            <div className="mb-6">
                                <div className="relative h-8 bg-secondary rounded-full overflow-hidden border border-border">
                                    <motion.div
                                        className="absolute inset-y-0 left-0 bg-gradient-to-r from-wedge-orange to-wedge-yellow"
                                        animate={{ width: `${timerPercent}%` }}
                                        transition={{ duration: 0.3 }}
                                    />
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <span className={`font-display font-bold text-lg ${timeLeft <= 3 ? "text-white" : "text-primary"
                                            }`}>
                                            {timeLeft > 0 ? `${timeLeft}s` : "⏰"}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Timeout Message */}
                            {timedOut && (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="text-center mb-6"
                                >
                                    <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-wedge-orange/20 text-wedge-orange font-display font-bold text-xl">
                                        🐌 Too Slow!
                                    </div>
                                </motion.div>
                            )}

                            <h2 className="font-display text-2xl font-bold text-center text-primary mb-6">
                                Which do you prefer?
                            </h2>

                            {/* Option Cards - Left and Right */}
                            <div className="grid grid-cols-2 gap-4">
                                <motion.button
                                    onClick={() => handleChoice(currentCard.optionA)}
                                    disabled={!!myChoice || timedOut}
                                    className={`relative overflow-hidden rounded-2xl p-6 text-center transition-all border-2 min-h-[120px] flex items-center justify-center ${myChoice === currentCard.optionA
                                        ? "border-wedge-teal bg-wedge-teal/10 shadow-lg"
                                        : myChoice || timedOut
                                            ? "opacity-50 border-border bg-card"
                                            : "border-border bg-card hover:border-wedge-teal hover:shadow-xl cursor-pointer"
                                        }`}
                                    whileHover={!myChoice && !timedOut ? { scale: 1.02 } : {}}
                                    whileTap={!myChoice && !timedOut ? { scale: 0.98 } : {}}
                                >
                                    <div className={`absolute left-0 top-0 bottom-0 w-1.5 ${myChoice === currentCard.optionA ? "bg-wedge-teal" : "bg-wedge-teal/40"
                                        }`} />

                                    <span className="font-display text-lg font-semibold text-primary px-2">
                                        {currentCard.optionA}
                                    </span>

                                    {myChoice === currentCard.optionA && (
                                        <motion.div
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            className="absolute top-2 right-2"
                                        >
                                            <div className="w-6 h-6 rounded-full bg-wedge-teal flex items-center justify-center">
                                                <Check className="w-4 h-4 text-white" />
                                            </div>
                                        </motion.div>
                                    )}
                                </motion.button>

                                <motion.button
                                    onClick={() => handleChoice(currentCard.optionB)}
                                    disabled={!!myChoice || timedOut}
                                    className={`relative overflow-hidden rounded-2xl p-6 text-center transition-all border-2 min-h-[120px] flex items-center justify-center ${myChoice === currentCard.optionB
                                        ? "border-wedge-orange bg-wedge-orange/10 shadow-lg"
                                        : myChoice || timedOut
                                            ? "opacity-50 border-border bg-card"
                                            : "border-border bg-card hover:border-wedge-orange hover:shadow-xl cursor-pointer"
                                        }`}
                                    whileHover={!myChoice && !timedOut ? { scale: 1.02 } : {}}
                                    whileTap={!myChoice && !timedOut ? { scale: 0.98 } : {}}
                                >
                                    <div className={`absolute right-0 top-0 bottom-0 w-1.5 ${myChoice === currentCard.optionB ? "bg-wedge-orange" : "bg-wedge-orange/40"
                                        }`} />

                                    <span className="font-display text-lg font-semibold text-primary px-2">
                                        {currentCard.optionB}
                                    </span>

                                    {myChoice === currentCard.optionB && (
                                        <motion.div
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            className="absolute top-2 left-2"
                                        >
                                            <div className="w-6 h-6 rounded-full bg-wedge-orange flex items-center justify-center">
                                                <Check className="w-4 h-4 text-white" />
                                            </div>
                                        </motion.div>
                                    )}
                                </motion.button>
                            </div>

                            {/* Waiting for opponent */}
                            {(waitingForOpponent || (timedOut && !opponentChoice)) && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="text-center mt-6"
                                >
                                    <p className="text-muted-foreground mb-2">Waiting for {opponentName}...</p>
                                    <div className="flex justify-center gap-1">
                                        {[0, 1, 2].map((i) => (
                                            <motion.div
                                                key={i}
                                                className="w-2 h-2 rounded-full bg-wedge-orange"
                                                animate={{ scale: [1, 1.3, 1], opacity: [0.5, 1, 0.5] }}
                                                transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                                            />
                                        ))}
                                    </div>
                                </motion.div>
                            )}
                        </motion.div>
                    )}

                    {phase === "reveal" && (
                        <motion.div
                            key={`reveal-${currentRound}`}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            className="w-full max-w-lg text-center"
                        >
                            <h2 className="font-display text-2xl font-bold text-primary mb-8">
                                {!didITimeout && !didOpponentTimeout && myChoice === opponentChoice
                                    ? "🎉 You matched!"
                                    : didITimeout || didOpponentTimeout
                                        ? "⏰ Time ran out!"
                                        : "Different tastes!"}
                            </h2>

                            <div className="grid grid-cols-2 gap-6 mb-8">
                                <div className={`game-card p-6 border-2 ${didITimeout ? "border-wedge-orange/50" : "border-wedge-teal/30"}`}>
                                    <div className="text-4xl mb-2">{config.playerAvatar}</div>
                                    <p className="font-display font-semibold text-sm mb-3 text-muted-foreground">{config.playerName}</p>
                                    <div className={`inline-block px-4 py-2 rounded-xl font-semibold text-sm ${didITimeout
                                        ? "bg-wedge-orange/20 text-wedge-orange border border-wedge-orange/30"
                                        : myChoice === opponentChoice
                                            ? "bg-wedge-teal/20 text-wedge-teal border border-wedge-teal/30"
                                            : "bg-secondary border border-border"
                                        }`}>
                                        {getDisplayChoice(myChoice)}
                                    </div>
                                </div>

                                <div className={`game-card p-6 border-2 ${didOpponentTimeout ? "border-wedge-orange/50" : "border-wedge-orange/30"}`}>
                                    <div className="text-4xl mb-2">{opponentAvatar}</div>
                                    <p className="font-display font-semibold text-sm mb-3 text-muted-foreground">{opponentName}</p>
                                    <div className={`inline-block px-4 py-2 rounded-xl font-semibold text-sm ${didOpponentTimeout
                                        ? "bg-wedge-orange/20 text-wedge-orange border border-wedge-orange/30"
                                        : myChoice === opponentChoice
                                            ? "bg-wedge-teal/20 text-wedge-teal border border-wedge-teal/30"
                                            : "bg-secondary border border-border"
                                        }`}>
                                        {getDisplayChoice(opponentChoice)}
                                    </div>
                                </div>
                            </div>

                            {!didITimeout && !didOpponentTimeout && myChoice === opponentChoice ? (
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-wedge-teal/20 text-wedge-teal font-display font-bold mb-6 border border-wedge-teal/30"
                                >
                                    <Check className="w-5 h-5" /> +1 Point Each!
                                </motion.div>
                            ) : (
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-secondary text-muted-foreground font-display font-bold mb-6 border border-border"
                                >
                                    <X className="w-5 h-5" /> No points
                                </motion.div>
                            )}

                            <div>
                                {isPlayer1 ? (
                                    <Button onClick={handleNextRound} className="btn-game gap-2">
                                        {currentRound >= config.cardCount ? "See Results" : "Next Round"}
                                        <ArrowRight className="w-4 h-4" />
                                    </Button>
                                ) : (
                                    <div className="text-center">
                                        <p className="text-muted-foreground text-sm mb-2">Waiting for host...</p>
                                        <div className="flex justify-center gap-1">
                                            {[0, 1, 2].map((i) => (
                                                <motion.div
                                                    key={i}
                                                    className="w-2 h-2 rounded-full bg-wedge-orange"
                                                    animate={{ scale: [1, 1.3, 1], opacity: [0.5, 1, 0.5] }}
                                                    transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Leave button */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="fixed bottom-6 left-6"
            >
                <Button variant="outline" size="sm" onClick={onLeave}>
                    Leave Game
                </Button>
            </motion.div>
        </div>
    );
}
