"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GameConfig } from "./types";
import { Button } from "@/components/ui/button";
import { getDeckCards, WhosMostLikelyCard, DeckType } from "./cards";
import { useMutation, useQuery } from "convex/react";
import { api } from "convex/_generated/api";
import { Id } from "convex/_generated/dataModel";
import { ArrowRight, Check, X } from "lucide-react";
import { ProUpgradeCard } from "@/components/game/ProUpgradeCard";

interface WhosMostLikelyGameScreenProps {
    config: GameConfig;
    roomId: string;
    isPlayer1: boolean;
    opponentName: string;
    opponentAvatar: string;
    onLeave: () => void;
    convexRoom: Record<string, unknown> | null | undefined;
}

const ROUND_TIME_SECONDS = 10;

export function WhosMostLikelyGameScreen({
    config,
    roomId,
    isPlayer1,
    opponentName,
    opponentAvatar,
    onLeave,
    convexRoom,
}: WhosMostLikelyGameScreenProps) {
    const [cards] = useState<WhosMostLikelyCard[]>(() => {
        // Simple distinct seeding based on room code characters
        const seed = config.roomCode?.split('').reduce((a: number, b: string) => a + b.charCodeAt(0), 0) || 0;
        return getDeckCards(config.deckType as DeckType, config.cardCount, seed);
    });

    const [currentRound, setCurrentRound] = useState(1);
    const [myChoice, setMyChoice] = useState<string | null>(null);
    const [opponentChoice, setOpponentChoice] = useState<string | null>(null);
    const [teamScore, setTeamScore] = useState(0);
    const [phase, setPhase] = useState<"choosing" | "reveal">("choosing");
    const [gameOver, setGameOver] = useState(false);
    const [showUpgradeOverlay, setShowUpgradeOverlay] = useState(true);
    const [timeLeft, setTimeLeft] = useState(ROUND_TIME_SECONDS);
    const [timedOut, setTimedOut] = useState(false);
    const timerRef = useRef<NodeJS.Timeout | null>(null);
    const hasSubmittedTimeout = useRef(false);

    const currentCard = cards[currentRound - 1];

    // Convex mutation
    const convexRoomId = roomId as Id<"rooms">;
    const updateRoomMutation = useMutation(api.rooms.updateRoom);

    // Submit timeout choice to Convex
    const submitTimeout = useCallback(async () => {
        if (hasSubmittedTimeout.current) return;
        hasSubmittedTimeout.current = true;

        setTimedOut(true);
        setMyChoice("__TIMEOUT__");

        const updateData = isPlayer1
            ? { player1_choice: "__TIMEOUT__" }
            : { player2_choice: "__TIMEOUT__" };

        await updateRoomMutation({
            roomId: convexRoomId,
            updates: updateData,
        });
    }, [isPlayer1, convexRoomId, updateRoomMutation]);

    // Timer countdown
    useEffect(() => {
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

    // Reactive room state updates
    useEffect(() => {
        if (!convexRoom) return;

        const roomData = convexRoom as Record<string, unknown>;
        const roundNum = (roomData.round_number as number) || 1;
        const p1Choice = roomData.player1_choice as string | null;
        const p2Choice = roomData.player2_choice as string | null;
        const serverTeamScore = (roomData.psychic_score as number) || 0;

        setTeamScore(serverTeamScore);

        // Get choices based on player role
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

        // CRITICAL: Check if both players have made choices
        if (p1Choice && p2Choice && phase === "choosing") {
            setPhase("reveal");
        }

        // Sync round from server
        if (roundNum > currentRound) {
            setCurrentRound(roundNum);
            setMyChoice(null);
            setOpponentChoice(null);
            setPhase("choosing");
            setTimeLeft(ROUND_TIME_SECONDS);
            setTimedOut(false);
            hasSubmittedTimeout.current = false;
        }

        // Check for game end
        if (roomData.phase === "ended" && !gameOver) {
            setTimeout(() => {
                setGameOver(true);
            }, 2000);
        }
    }, [convexRoom, isPlayer1, currentRound, phase, myChoice, gameOver]);

    const handleChoice = async (choice: "PLAYER_1" | "PLAYER_2") => {
        if (myChoice || timedOut) return;

        setMyChoice(choice);

        const updateData = isPlayer1
            ? { player1_choice: choice }
            : { player2_choice: choice };

        await updateRoomMutation({
            roomId: convexRoomId,
            updates: updateData,
        });
    };

    const handleNextRound = async () => {
        if (!isPlayer1) return;

        const myActualChoice = myChoice || "__TIMEOUT__";
        const opponentActualChoice = opponentChoice || "__TIMEOUT__";
        const matched = myActualChoice === opponentActualChoice && myActualChoice !== "__TIMEOUT__";

        const newTeamScore = matched ? teamScore + 1 : teamScore;

        if (currentRound >= config.cardCount) {
            await updateRoomMutation({
                roomId: convexRoomId,
                updates: {
                    psychic_score: newTeamScore,
                    phase: "ended",
                    player1_choice: null,
                    player2_choice: null,
                },
            });
            setTimeout(() => {
                setGameOver(true);
            }, 2000);
        } else {
            await updateRoomMutation({
                roomId: convexRoomId,
                updates: {
                    round_number: currentRound + 1,
                    psychic_score: newTeamScore,
                    player1_choice: null,
                    player2_choice: null,
                },
            });

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

    // Check user pro status
    const user = useQuery(api.rooms.getMyUser);
    const isPro = user?.isPro ?? false;

    if (gameOver) {
        return (
            <>
                <div className="fixed inset-0 bg-background z-50 flex items-center justify-center p-6 overflow-y-auto">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="game-card max-w-md w-full text-center my-auto"
                    >
                        <h2 className="font-display text-3xl font-bold text-primary mb-4">🎉 Final Score</h2>

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
                                ? "🔥 Mind Readers! You know each other perfectly!"
                                : teamScore >= config.cardCount * 0.5
                                    ? "✨ Pretty good! Solid connection."
                                    : "💭 Still getting to know each other?"}
                        </p>

                        <Button onClick={onLeave} className="w-full h-12 btn-game mt-6">
                            Play Again
                        </Button>
                    </motion.div>
                </div>

                {showUpgradeOverlay && !isPro && (
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

    const timerPercent = (timeLeft / ROUND_TIME_SECONDS) * 100;

    const didITimeout = myChoice === "__TIMEOUT__" || timedOut;
    const didOpponentTimeout = opponentChoice === "__TIMEOUT__";
    const waitingForOpponent = myChoice && !opponentChoice && phase === "choosing";

    // Helper to render choices in reveal
    const renderRevealChoice = (choice: string | null) => {
        if (!choice || choice === "__TIMEOUT__") return "🐌 Too Slow!";
        if (choice === "PLAYER_1") return `${config.playerAvatar} ${config.playerName}`; // Wait, this assumes I am Player 1? No.
        // We need to know who is Player 1 and Player 2 relative to ME to display correctly.
        // To fix this: display logic depends on `isPlayer1` prop.
        // Actually choice is "PLAYER_1" or "PLAYER_2".
        // Player 1's name is always `config.playerName` IF `isPlayer1` is true.
        // Let's pass `p1Name` and `p2Name` properly.
        // Wait, `config` has `playerName`. `opponentName` is passed in.
        // If `isPlayer1` is true: P1 = config.playerName, P2 = opponentName.
        // If `isPlayer1` is false: P1 = opponentName, P2 = config.playerName.

        const p1Name = isPlayer1 ? config.playerName : opponentName;
        const p1Avatar = isPlayer1 ? config.playerAvatar : opponentAvatar;

        const p2Name = isPlayer1 ? opponentName : config.playerName;
        const p2Avatar = isPlayer1 ? opponentAvatar : config.playerAvatar;

        if (choice === "PLAYER_1") return `${p1Avatar} ${p1Name}`;
        if (choice === "PLAYER_2") return `${p2Avatar} ${p2Name}`;
        return choice;
    };

    const p1Name = isPlayer1 ? config.playerName : opponentName;
    const p1Avatar = isPlayer1 ? config.playerAvatar : opponentAvatar;
    const p2Name = isPlayer1 ? opponentName : config.playerName;
    const p2Avatar = isPlayer1 ? opponentAvatar : config.playerAvatar;

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
                                        className="absolute inset-y-0 left-0 bg-gradient-to-r from-purple-500 to-pink-500"
                                        animate={{ width: `${timerPercent}%` }}
                                        transition={{ duration: 0.3 }}
                                    />
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <span className={`font-display font-bold text-lg ${timeLeft <= 3 ? "text-white" : "text-primary"}`}>
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
                                    <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-red-500/20 text-red-500 font-display font-bold text-xl">
                                        🐌 Too Slow!
                                    </div>
                                </motion.div>
                            )}

                            {/* QUESTION CARD */}
                            <div className="bg-card border-2 border-primary/20 p-6 rounded-2xl shadow-sm mb-8 text-center min-h-[160px] flex flex-col justify-center">
                                <h2 className="font-display text-2xl md:text-3xl font-bold text-primary">
                                    {currentCard.question}
                                </h2>
                            </div>

                            {/* Player Choices */}
                            <div className="grid grid-cols-2 gap-4">
                                <motion.button
                                    onClick={() => handleChoice("PLAYER_1")}
                                    disabled={!!myChoice || timedOut}
                                    className={`relative overflow-hidden rounded-2xl p-6 text-center transition-all border-2 min-h-[140px] flex flex-col items-center justify-center gap-2 ${myChoice === "PLAYER_1"
                                        ? "border-purple-500 bg-purple-500/10 shadow-lg"
                                        : myChoice || timedOut
                                            ? "opacity-50 border-border bg-card"
                                            : "border-border bg-card hover:border-purple-500/50 hover:shadow-xl cursor-pointer"
                                        }`}
                                    whileHover={!myChoice && !timedOut ? { scale: 1.02 } : {}}
                                    whileTap={!myChoice && !timedOut ? { scale: 0.98 } : {}}
                                >
                                    <span className="text-4xl">{p1Avatar}</span>
                                    <span className="font-display text-lg font-bold text-primary px-2">
                                        {p1Name}
                                    </span>

                                    {myChoice === "PLAYER_1" && (
                                        <motion.div
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            className="absolute top-2 right-2"
                                        >
                                            <div className="w-6 h-6 rounded-full bg-purple-500 flex items-center justify-center">
                                                <Check className="w-4 h-4 text-white" />
                                            </div>
                                        </motion.div>
                                    )}
                                </motion.button>

                                <motion.button
                                    onClick={() => handleChoice("PLAYER_2")}
                                    disabled={!!myChoice || timedOut}
                                    className={`relative overflow-hidden rounded-2xl p-6 text-center transition-all border-2 min-h-[140px] flex flex-col items-center justify-center gap-2 ${myChoice === "PLAYER_2"
                                        ? "border-pink-500 bg-pink-500/10 shadow-lg"
                                        : myChoice || timedOut
                                            ? "opacity-50 border-border bg-card"
                                            : "border-border bg-card hover:border-pink-500/50 hover:shadow-xl cursor-pointer"
                                        }`}
                                    whileHover={!myChoice && !timedOut ? { scale: 1.02 } : {}}
                                    whileTap={!myChoice && !timedOut ? { scale: 0.98 } : {}}
                                >
                                    <span className="text-4xl">{p2Avatar}</span>
                                    <span className="font-display text-lg font-bold text-primary px-2">
                                        {p2Name}
                                    </span>

                                    {myChoice === "PLAYER_2" && (
                                        <motion.div
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            className="absolute top-2 right-2"
                                        >
                                            <div className="w-6 h-6 rounded-full bg-pink-500 flex items-center justify-center">
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
                                                className="w-2 h-2 rounded-full bg-primary"
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
                                    ? "🎉 It's a Match!"
                                    : didITimeout || didOpponentTimeout
                                        ? "⏰ Time ran out!"
                                        : "Different answers!"}
                            </h2>

                            <div className="grid grid-cols-2 gap-6 mb-8">
                                <div className={`game-card p-6 border-2 ${didITimeout ? "border-red-500/50" : "border-primary/20"}`}>
                                    <div className="text-4xl mb-2">{config.playerAvatar}</div>
                                    <p className="font-display font-semibold text-sm mb-3 text-muted-foreground">{config.playerName}</p>
                                    <div className={`inline-block px-4 py-2 rounded-xl font-semibold text-sm ${didITimeout
                                        ? "bg-red-500/20 text-red-500 border border-red-500/30"
                                        : myChoice === opponentChoice
                                            ? "bg-green-500/20 text-green-600 border border-green-500/30"
                                            : "bg-secondary border border-border"
                                        }`}>
                                        {renderRevealChoice(myChoice)}
                                    </div>
                                </div>

                                <div className={`game-card p-6 border-2 ${didOpponentTimeout ? "border-red-500/50" : "border-primary/20"}`}>
                                    <div className="text-4xl mb-2">{opponentAvatar}</div>
                                    <p className="font-display font-semibold text-sm mb-3 text-muted-foreground">{opponentName}</p>
                                    <div className={`inline-block px-4 py-2 rounded-xl font-semibold text-sm ${didOpponentTimeout
                                        ? "bg-red-500/20 text-red-500 border border-red-500/30"
                                        : myChoice === opponentChoice
                                            ? "bg-green-500/20 text-green-600 border border-green-500/30"
                                            : "bg-secondary border border-border"
                                        }`}>
                                        {renderRevealChoice(opponentChoice)}
                                    </div>
                                </div>
                            </div>

                            {!didITimeout && !didOpponentTimeout && myChoice === opponentChoice ? (
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-green-500/20 text-green-600 font-display font-bold mb-6 border border-green-500/30"
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
                                                    className="w-2 h-2 rounded-full bg-primary"
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
