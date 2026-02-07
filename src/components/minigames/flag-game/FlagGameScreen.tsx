"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { getFlagCards, FlagCard } from "./flagCards";
import { supabase } from "@/lib/supabase/client";
import { ArrowRight, MessageCircle } from "lucide-react";

interface FlagGameConfig {
    playerName: string;
    playerAvatar: string;
    roomCode: string;
    cardCount: number;
}

interface FlagGameScreenProps {
    config: FlagGameConfig;
    roomId: string;
    isPlayer1: boolean;
    opponentName: string;
    opponentAvatar: string;
    onLeave: () => void;
}

const ROUND_TIME_SECONDS = 10;

// Beige flags based on game length
function getBeigeFlags(cardCount: number): number {
    if (cardCount >= 100) return 15;
    if (cardCount >= 50) return 7;
    return 3;
}

type FlagChoice = "RED" | "GREEN" | "BEIGE" | "__TIMEOUT__" | null;

export function FlagGameScreen({
    config,
    roomId,
    isPlayer1,
    opponentName,
    opponentAvatar,
    onLeave
}: FlagGameScreenProps) {
    const [cards] = useState<FlagCard[]>(() => {
        const seed = config.roomCode?.split('').reduce((a, b) => a + b.charCodeAt(0), 0) || 0;
        return getFlagCards(config.cardCount, seed);
    });

    const [currentRound, setCurrentRound] = useState(1);
    const [myChoice, setMyChoice] = useState<FlagChoice>(null);
    const [opponentChoice, setOpponentChoice] = useState<FlagChoice>(null);
    const [teamScore, setTeamScore] = useState(0);
    const [phase, setPhase] = useState<"rules" | "choosing" | "reveal">("rules");
    const [gameOver, setGameOver] = useState(false);
    const [timeLeft, setTimeLeft] = useState(ROUND_TIME_SECONDS);
    const [timedOut, setTimedOut] = useState(false);
    const [beigeRemaining, setBeigeRemaining] = useState(() => getBeigeFlags(config.cardCount));
    const [showDebatePrompt, setShowDebatePrompt] = useState(false);
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
        if (phase !== "choosing") {
            if (timerRef.current) {
                clearInterval(timerRef.current);
                timerRef.current = null;
            }
            return;
        }

        timerRef.current = setInterval(() => {
            setTimeLeft(prev => {
                if (prev <= 1) {
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
        setShowDebatePrompt(false);
    }, [currentRound]);

    // Poll for game start (rules phase sync)
    useEffect(() => {
        if (!roomId || phase !== "rules") return;

        const poll = async () => {
            const { data } = await supabase
                .from("rooms")
                .select("phase")
                .eq("id", roomId)
                .single();

            if (data) {
                const roomData = data as Record<string, unknown>;
                // If room phase is "clue" (playing), start the game
                if (roomData.phase === "clue") {
                    setPhase("choosing");
                }
            }
        };

        poll();
        const interval = setInterval(poll, 500);
        return () => clearInterval(interval);
    }, [roomId, phase]);

    // Poll for game state updates
    useEffect(() => {
        if (!roomId || phase === "rules") return;

        const poll = async () => {
            const { data } = await supabase
                .from("rooms")
                .select("*")
                .eq("id", roomId)
                .single();

            if (data) {
                const roomData = data as Record<string, unknown>;
                const roundNum = (roomData.round_number as number) || 1;
                const p1Choice = roomData.player1_choice as FlagChoice;
                const p2Choice = roomData.player2_choice as FlagChoice;
                const serverTeamScore = (roomData.psychic_score as number) || 0;

                setTeamScore(serverTeamScore);

                const theirChoice = isPlayer1 ? p2Choice : p1Choice;
                const serverMyChoice = isPlayer1 ? p1Choice : p2Choice;

                if (theirChoice) {
                    setOpponentChoice(theirChoice);
                }

                if (serverMyChoice && !myChoice) {
                    setMyChoice(serverMyChoice);
                    if (serverMyChoice === "__TIMEOUT__") {
                        setTimedOut(true);
                    }
                }

                if (p1Choice && p2Choice && phase === "choosing") {
                    setPhase("reveal");
                }

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
        const interval = setInterval(poll, 400);
        return () => clearInterval(interval);
    }, [roomId, isPlayer1, currentRound, phase, myChoice]);

    const handleChoice = async (choice: FlagChoice) => {
        if (myChoice || timedOut || !choice) return;

        if (choice === "BEIGE") {
            if (beigeRemaining <= 0) return;
            setBeigeRemaining(prev => prev - 1);
        }

        setMyChoice(choice);

        const updateData = isPlayer1
            ? { player1_choice: choice }
            : { player2_choice: choice };

        await supabase
            .from("rooms")
            .update(updateData as Record<string, unknown>)
            .eq("id", roomId);
    };

    const handleStartGame = async () => {
        if (!isPlayer1) return; // Only host can start

        // Update room phase to start the game for both players
        await supabase
            .from("rooms")
            .update({ phase: "clue" } as Record<string, unknown>)
            .eq("id", roomId);

        setPhase("choosing");
    };

    const handleNextRound = async () => {
        if (!isPlayer1) return;

        const myActualChoice = myChoice || "__TIMEOUT__";
        const opponentActualChoice = opponentChoice || "__TIMEOUT__";

        // Both picked the same non-timeout flag = match
        const matched = myActualChoice === opponentActualChoice &&
            myActualChoice !== "__TIMEOUT__" &&
            myActualChoice !== "BEIGE";

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

            setMyChoice(null);
            setOpponentChoice(null);
            setPhase("choosing");
            setCurrentRound(prev => prev + 1);
            if (matched) {
                setTeamScore(prev => prev + 1);
            }
        }
    };

    if (!currentCard && phase !== "rules") {
        return (
            <div className="fixed inset-0 bg-background z-50 flex items-center justify-center">
                <p>Loading cards...</p>
            </div>
        );
    }

    // Rules Modal
    if (phase === "rules") {
        return (
            <div className="fixed inset-0 bg-background z-50 flex items-center justify-center p-6">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="game-card max-w-md w-full text-center"
                >
                    <h2 className="font-display text-3xl font-bold text-primary mb-4">
                        🚩 Red, Green, Beige 🟩
                    </h2>

                    <div className="space-y-4 text-left mb-6">
                        <div className="bg-secondary/50 rounded-xl p-4">
                            <p className="text-sm text-muted-foreground mb-3">
                                You&apos;ll see different dating behaviors. Rate each one:
                            </p>
                            <div className="space-y-2">
                                <div className="flex items-center gap-3">
                                    <span className="text-2xl">🚩</span>
                                    <span className="font-semibold text-red-500">Red Flag</span>
                                    <span className="text-muted-foreground text-sm">- Dealbreaker!</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <span className="text-2xl">🟩</span>
                                    <span className="font-semibold text-green-500">Green Flag</span>
                                    <span className="text-muted-foreground text-sm">- Love it!</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <span className="text-2xl">🟨</span>
                                    <span className="font-semibold text-yellow-500">Beige Flag</span>
                                    <span className="text-muted-foreground text-sm">- Meh, whatever</span>
                                </div>
                            </div>
                        </div>

                        <div className="bg-wedge-orange/10 border border-wedge-orange/30 rounded-xl p-4">
                            <p className="font-display font-bold text-wedge-orange mb-1">
                                ⚠️ Limited Beige Flags!
                            </p>
                            <p className="text-sm text-muted-foreground">
                                You only get <strong className="text-primary">{getBeigeFlags(config.cardCount)} Beige Flags</strong> for the entire game!
                                Use them wisely - you&apos;ll have to make hard choices for most scenarios.
                            </p>
                        </div>

                        <div className="bg-secondary/50 rounded-xl p-4">
                            <p className="text-sm text-muted-foreground">
                                <strong>Scoring:</strong> You get a point when you both pick Red or both pick Green!
                            </p>
                        </div>
                    </div>

                    {isPlayer1 ? (
                        <Button onClick={handleStartGame} className="w-full h-12 btn-game">
                            Let&apos;s Go! 🎉
                        </Button>
                    ) : (
                        <div className="text-center">
                            <p className="text-muted-foreground mb-3">Waiting for host to start...</p>
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
                </motion.div>
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
                            ? "🔥 Perfect match! You think alike!"
                            : teamScore >= config.cardCount * 0.5
                                ? "✨ Pretty in sync!"
                                : "💭 Opposites attract?"}
                    </p>

                    <Button onClick={onLeave} className="w-full h-12 btn-game">
                        Back to Home
                    </Button>
                </motion.div>
            </div>
        );
    }

    const timerPercent = (timeLeft / ROUND_TIME_SECONDS) * 100;

    const getFlagEmoji = (choice: FlagChoice) => {
        if (choice === "RED") return "🚩";
        if (choice === "GREEN") return "🟩";
        if (choice === "BEIGE") return "🟨";
        if (choice === "__TIMEOUT__") return "🐌";
        return "❓";
    };

    const getFlagLabel = (choice: FlagChoice) => {
        if (choice === "RED") return "Red Flag";
        if (choice === "GREEN") return "Green Flag";
        if (choice === "BEIGE") return "Beige Flag";
        if (choice === "__TIMEOUT__") return "Too Slow!";
        return "Unknown";
    };

    const didITimeout = myChoice === "__TIMEOUT__" || timedOut;
    const didOpponentTimeout = opponentChoice === "__TIMEOUT__";

    // Check if it's a "RED ALERT" (one red, one green)
    const isRedAlert = (myChoice === "RED" && opponentChoice === "GREEN") ||
        (myChoice === "GREEN" && opponentChoice === "RED");

    // Check if matched (both red or both green)
    const isMatch = (myChoice === "RED" && opponentChoice === "RED") ||
        (myChoice === "GREEN" && opponentChoice === "GREEN");

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
                            <p className="text-xs text-muted-foreground">Score</p>
                            <p className="font-display font-bold text-xl text-primary">{teamScore}</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-1 pl-2 border-l border-border">
                        <span className="text-lg">🟨</span>
                        <span className="font-display font-bold text-primary">{beigeRemaining}</span>
                    </div>
                </div>
            </motion.div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col items-center justify-center p-6 pt-24">
                <AnimatePresence mode="wait">
                    {phase === "choosing" && currentCard && (
                        <motion.div
                            key={`choosing-${currentRound}`}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="w-full max-w-lg"
                        >
                            {/* Timer Bar */}
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

                            {/* Scenario Card */}
                            <div className="game-card p-8 mb-6">
                                <p className="font-display text-xl md:text-2xl font-semibold text-center text-primary leading-relaxed">
                                    &quot;{currentCard.scenario}&quot;
                                </p>
                            </div>

                            {/* Flag Buttons */}
                            <div className="grid grid-cols-3 gap-3">
                                <motion.button
                                    onClick={() => handleChoice("RED")}
                                    disabled={!!myChoice || timedOut}
                                    className={`relative overflow-hidden rounded-2xl p-4 text-center transition-all border-2 min-h-[100px] flex flex-col items-center justify-center gap-2 ${myChoice === "RED"
                                        ? "border-red-500 bg-red-500/20 shadow-lg"
                                        : myChoice || timedOut
                                            ? "opacity-50 border-border bg-card"
                                            : "border-border bg-card hover:border-red-500 hover:shadow-xl cursor-pointer"
                                        }`}
                                    whileHover={!myChoice && !timedOut ? { scale: 1.02 } : {}}
                                    whileTap={!myChoice && !timedOut ? { scale: 0.98 } : {}}
                                >
                                    <span className="text-3xl">🚩</span>
                                    <span className="font-display font-semibold text-red-500">Red</span>
                                </motion.button>

                                <motion.button
                                    onClick={() => handleChoice("GREEN")}
                                    disabled={!!myChoice || timedOut}
                                    className={`relative overflow-hidden rounded-2xl p-4 text-center transition-all border-2 min-h-[100px] flex flex-col items-center justify-center gap-2 ${myChoice === "GREEN"
                                        ? "border-green-500 bg-green-500/20 shadow-lg"
                                        : myChoice || timedOut
                                            ? "opacity-50 border-border bg-card"
                                            : "border-border bg-card hover:border-green-500 hover:shadow-xl cursor-pointer"
                                        }`}
                                    whileHover={!myChoice && !timedOut ? { scale: 1.02 } : {}}
                                    whileTap={!myChoice && !timedOut ? { scale: 0.98 } : {}}
                                >
                                    <span className="text-3xl">🟩</span>
                                    <span className="font-display font-semibold text-green-500">Green</span>
                                </motion.button>

                                <motion.button
                                    onClick={() => handleChoice("BEIGE")}
                                    disabled={!!myChoice || timedOut || beigeRemaining <= 0}
                                    className={`relative overflow-hidden rounded-2xl p-4 text-center transition-all border-2 min-h-[100px] flex flex-col items-center justify-center gap-2 ${myChoice === "BEIGE"
                                        ? "border-yellow-500 bg-yellow-500/20 shadow-lg"
                                        : myChoice || timedOut
                                            ? "opacity-50 border-border bg-card"
                                            : beigeRemaining <= 0
                                                ? "opacity-30 border-border bg-card cursor-not-allowed"
                                                : "border-border bg-card hover:border-yellow-500 hover:shadow-xl cursor-pointer"
                                        }`}
                                    whileHover={!myChoice && !timedOut && beigeRemaining > 0 ? { scale: 1.02 } : {}}
                                    whileTap={!myChoice && !timedOut && beigeRemaining > 0 ? { scale: 0.98 } : {}}
                                >
                                    <span className="text-3xl">🟨</span>
                                    <span className="font-display font-semibold text-yellow-600">Beige</span>
                                    <span className="text-xs text-muted-foreground">({beigeRemaining} left)</span>
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
                            {/* Result Message */}
                            <h2 className="font-display text-2xl font-bold text-primary mb-4">
                                {isRedAlert
                                    ? "🚨 RED ALERT! 🚨"
                                    : isMatch
                                        ? "💕 Relationship Goals!"
                                        : didITimeout || didOpponentTimeout
                                            ? "⏰ Time ran out!"
                                            : "Different vibes!"}
                            </h2>

                            {/* Scenario reminder */}
                            {currentCard && (
                                <div className="bg-secondary/50 rounded-xl p-4 mb-6">
                                    <p className="text-sm text-muted-foreground italic">
                                        &quot;{currentCard.scenario}&quot;
                                    </p>
                                </div>
                            )}

                            {/* Choices side by side */}
                            <div className="grid grid-cols-2 gap-6 mb-6">
                                <div className={`game-card p-6 border-2 ${myChoice === "RED" ? "border-red-500/50" :
                                    myChoice === "GREEN" ? "border-green-500/50" :
                                        myChoice === "BEIGE" ? "border-yellow-500/50" :
                                            "border-wedge-orange/50"
                                    }`}>
                                    <div className="text-4xl mb-2">{config.playerAvatar}</div>
                                    <p className="font-display font-semibold text-sm mb-3 text-muted-foreground">{config.playerName}</p>
                                    <div className="text-4xl mb-2">{getFlagEmoji(myChoice)}</div>
                                    <p className={`font-semibold text-sm ${myChoice === "RED" ? "text-red-500" :
                                        myChoice === "GREEN" ? "text-green-500" :
                                            myChoice === "BEIGE" ? "text-yellow-600" :
                                                "text-wedge-orange"
                                        }`}>
                                        {getFlagLabel(myChoice)}
                                    </p>
                                </div>

                                <div className={`game-card p-6 border-2 ${opponentChoice === "RED" ? "border-red-500/50" :
                                    opponentChoice === "GREEN" ? "border-green-500/50" :
                                        opponentChoice === "BEIGE" ? "border-yellow-500/50" :
                                            "border-wedge-orange/50"
                                    }`}>
                                    <div className="text-4xl mb-2">{opponentAvatar}</div>
                                    <p className="font-display font-semibold text-sm mb-3 text-muted-foreground">{opponentName}</p>
                                    <div className="text-4xl mb-2">{getFlagEmoji(opponentChoice)}</div>
                                    <p className={`font-semibold text-sm ${opponentChoice === "RED" ? "text-red-500" :
                                        opponentChoice === "GREEN" ? "text-green-500" :
                                            opponentChoice === "BEIGE" ? "text-yellow-600" :
                                                "text-wedge-orange"
                                        }`}>
                                        {getFlagLabel(opponentChoice)}
                                    </p>
                                </div>
                            </div>

                            {/* Score indicator */}
                            {isMatch ? (
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-wedge-teal/20 text-wedge-teal font-display font-bold mb-6 border border-wedge-teal/30"
                                >
                                    ✓ +1 Point!
                                </motion.div>
                            ) : isRedAlert ? (
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    className="space-y-3 mb-6"
                                >
                                    <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-red-500/20 text-red-500 font-display font-bold border border-red-500/30">
                                        ✗ No points - you disagree!
                                    </div>
                                    {!showDebatePrompt ? (
                                        <div>
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={() => setShowDebatePrompt(true)}
                                                className="gap-2"
                                            >
                                                <MessageCircle className="w-4 h-4" />
                                                Wait, why?!
                                            </Button>
                                        </div>
                                    ) : (
                                        <motion.div
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className="bg-secondary/50 rounded-xl p-4"
                                        >
                                            <p className="text-sm text-muted-foreground">
                                                💬 Time to debate! Discuss why you picked different flags before moving on.
                                            </p>
                                        </motion.div>
                                    )}
                                </motion.div>
                            ) : (
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-secondary text-muted-foreground font-display font-bold mb-6 border border-border"
                                >
                                    No points
                                </motion.div>
                            )}

                            {/* Next Round Button */}
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
