"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GameConfig } from "./types";
import { Button } from "@/components/ui/button";
import { getDeckCards, FantasyCard, DeckType } from "./cards";
import { useMutation, useQuery } from "convex/react";
import { api } from "convex/_generated/api";
import { Id } from "convex/_generated/dataModel";
import { ArrowRight, Check, Lock, Star } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { ProUpgradeCard } from "@/components/game/ProUpgradeCard";

interface FantasySliderGameScreenProps {
    config: GameConfig;
    roomId: string;
    isPlayer1: boolean;
    opponentName: string;
    opponentAvatar: string;
    onLeave: () => void;
    convexRoom: Record<string, unknown> | null | undefined;
}

export function FantasySliderGameScreen({
    config,
    roomId,
    isPlayer1,
    opponentName,
    opponentAvatar,
    onLeave,
    convexRoom,
}: FantasySliderGameScreenProps) {
    const [cards] = useState<FantasyCard[]>(() => {
        const seed = config.roomCode?.split('').reduce((a: number, b: string) => a + b.charCodeAt(0), 0) || 0;
        return getDeckCards(config.deckType as DeckType, config.cardCount, seed);
    });

    const [currentRound, setCurrentRound] = useState(1);
    const [myValue, setMyValue] = useState<number>(5);
    const [myLockedIn, setMyLockedIn] = useState(false);
    const [opponentLockedIn, setOpponentLockedIn] = useState(false);
    const [opponentValue, setOpponentValue] = useState<number | null>(null);
    const [teamScore, setTeamScore] = useState(0);
    const [phase, setPhase] = useState<"choosing" | "reveal">("choosing");
    const [gameOver, setGameOver] = useState(false);
    const [showUpgradeOverlay, setShowUpgradeOverlay] = useState(true);

    const currentCard = cards[currentRound - 1];

    const convexRoomId = roomId as Id<"rooms">;
    const updateRoomMutation = useMutation(api.rooms.updateRoom);

    // Reset state when round changes
    useEffect(() => {
        setMyValue(5);
        setMyLockedIn(false);
        setOpponentLockedIn(false);
        setOpponentValue(null);
    }, [currentRound]);

    // Reactive room state updates
    useEffect(() => {
        if (!convexRoom) return;

        const roomData = convexRoom as Record<string, unknown>;
        const roundNum = (roomData.round_number as number) || 1;
        const p1Choice = roomData.player1_choice as string | null; // Stored as string "5"
        const p2Choice = roomData.player2_choice as string | null;
        const serverTeamScore = (roomData.psychic_score as number) || 0;

        setTeamScore(serverTeamScore);

        // Get choices based on player role
        const theirChoiceStr = isPlayer1 ? p2Choice : p1Choice;
        const myChoiceStr = isPlayer1 ? p1Choice : p2Choice;

        // Check if opponent locked in
        if (theirChoiceStr !== null && theirChoiceStr !== undefined) {
            setOpponentLockedIn(true);
            // In reveal phase, we will actually see the value
            if (phase === "reveal") {
                setOpponentValue(parseInt(theirChoiceStr, 10));
            }
        }

        // Check if both locked in -> Reveal
        if (p1Choice && p2Choice && phase === "choosing") {
            setPhase("reveal");
            // Set opponent value immediately on transition
            const oppVal = isPlayer1 ? p2Choice : p1Choice;
            if (oppVal) setOpponentValue(parseInt(oppVal, 10));
        }

        // Sync round from server
        if (roundNum > currentRound) {
            setCurrentRound(roundNum);
            setMyValue(5);
            setMyLockedIn(false);
            setOpponentLockedIn(false);
            setOpponentValue(null);
            setPhase("choosing");
        }

        // Check for game end
        if (roomData.phase === "ended" && !gameOver) {
            setTimeout(() => {
                setGameOver(true);
            }, 1000);
        }
    }, [convexRoom, isPlayer1, currentRound, phase, gameOver]);

    const handleLockIn = async () => {
        if (myLockedIn) return;

        setMyLockedIn(true);

        const updateData = isPlayer1
            ? { player1_choice: myValue.toString() }
            : { player2_choice: myValue.toString() };

        await updateRoomMutation({
            roomId: convexRoomId,
            updates: updateData,
        });
    };

    const handleNextRound = async () => {
        if (!isPlayer1) return;

        // Calculate score
        // We need opponent value. It should be set in effect.
        // Assuming reveal phase has happened, both values are known locally or on server
        // But calculation is better done here based on server state or local state.
        // Local state `opponentValue` should be reliable in reveal phase.
        if (opponentValue === null) return;

        const diff = Math.abs(myValue - opponentValue);
        let points = 0;
        if (diff === 0) points = 3;
        else if (diff === 1) points = 2;
        else if (diff === 2) points = 1;

        const newTeamScore = teamScore + points;

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
                            {teamScore}
                        </div>
                        <p className="text-lg text-muted-foreground mb-4">Total Points</p>

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

    // Helper for labels
    const getLabel = (val: number) => {
        switch (val) {
            case 0: return "Nope 🤢";
            case 1: return "Nahh 😬";
            case 2: return "Don't think so 🫤";
            case 3: return "Meh 😒";
            case 4: return "Maybe 🤔";
            case 5: return "Sure 🤷";
            case 6: return "Why not? 🙂";
            case 7: return "Into it 😃";
            case 8: return "Love it 😍";
            case 9: return "Need this 🔥";
            case 10: return "Absolute Dream 🚀";
            default: return "Maybe 🤔";
        }
    };

    return (
        <div className="fixed inset-0 bg-background z-50 flex flex-col">
            {/* Header */}
            <div className="fixed top-4 left-0 right-0 z-40 flex justify-center pointer-events-none">
                <div className="pointer-events-auto flex items-center gap-4 bg-background/80 backdrop-blur-md px-6 py-2 rounded-full border border-border/50 shadow-sm">
                    <span className="font-display font-bold text-primary">Round {currentRound}/{config.cardCount}</span>
                    <div className="h-4 w-px bg-border" />
                    <Star className="w-4 h-4 text-orange-500 fill-orange-500" />
                    <span className="font-display font-bold text-primary">{teamScore}</span>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col items-center justify-center p-6 pt-24 max-w-md mx-auto w-full">

                {/* Question Card */}
                <motion.div
                    layoutId={`card-${currentCard.id}`}
                    className="w-full bg-card border-2 border-primary/20 p-8 rounded-3xl shadow-lg mb-10 text-center min-h-[200px] flex flex-col justify-center items-center backdrop-blur-sm relative overflow-hidden"
                >
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-pink-500" />
                    <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-2">Fantasy Level</h3>
                    <h2 className="font-display text-3xl md:text-4xl font-bold text-primary leading-tight">
                        {currentCard.question}
                    </h2>
                </motion.div>

                {/* Slider Section */}
                <div className="w-full space-y-8 mb-8">
                    <div className="relative pt-6 pb-2">
                        {/* Labels above slider */}
                        <div className="absolute -top-2 left-0 right-0 flex justify-between px-1">
                            <span className="text-xs font-semibold text-muted-foreground">Not for me</span>
                            <span className="text-xs font-semibold text-muted-foreground">Dream</span>
                        </div>

                        {/* The Slider */}
                        <Slider
                            defaultValue={[5]}
                            value={[myValue]}
                            min={0}
                            max={10}
                            step={1}
                            onValueChange={(val: number[]) => !myLockedIn && setMyValue(val[0])}
                            disabled={myLockedIn}
                            className="w-full h-8"
                        />

                        {/* Current Value Indicator */}
                        <div className="mt-4 text-center">
                            <span className="inline-block px-4 py-1 rounded-full bg-primary/10 text-primary font-bold font-display text-xl border border-primary/20">
                                {myValue} - {getLabel(myValue)}
                            </span>
                        </div>
                    </div>

                    {/* Opponent Reveal Card (Only shown in reveal phase) */}
                    {phase === "reveal" && (
                        <div className="h-[80px] flex items-center justify-center w-full">
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="w-full bg-secondary/30 p-4 rounded-xl border border-border flex items-center gap-4"
                            >
                                <div className="text-3xl">{opponentAvatar}</div>
                                <div className="flex-1">
                                    <div className="flex justify-between text-xs text-muted-foreground mb-1">
                                        <span>{opponentName}'s Choice</span>
                                        <span className="font-bold text-primary">{opponentValue}</span>
                                    </div>
                                    <div className="relative h-2 bg-muted rounded-full overflow-hidden">
                                        <motion.div
                                            className="absolute top-0 bottom-0 left-0 bg-primary/50"
                                            initial={{ width: 0 }}
                                            animate={{ width: `${(opponentValue || 0) * 10}%` }}
                                        />
                                    </div>
                                </div>
                                <div className="text-center min-w-[50px]">
                                    {opponentValue !== null && Math.abs(myValue - opponentValue) === 0 && <span className="text-2xl">🔥</span>}
                                    {opponentValue !== null && Math.abs(myValue - opponentValue) === 1 && <span className="text-2xl">✨</span>}
                                    {opponentValue !== null && Math.abs(myValue - opponentValue) === 2 && <span className="text-2xl">👍</span>}
                                    {opponentValue !== null && Math.abs(myValue - opponentValue) > 2 && <span className="text-2xl">👀</span>}
                                </div>
                            </motion.div>
                        </div>
                    )}
                </div>

                {/* Bottom Actions */}
                <div className="w-full mt-auto">
                    {phase === "choosing" ? (
                        <div className="flex items-center gap-3">
                            {/* Opponent Status Pill */}
                            <div className="flex items-center gap-2 bg-secondary/50 px-4 h-14 rounded-xl border border-border/50 shrink-0">
                                <span className="text-2xl">{opponentAvatar}</span>
                                {opponentLockedIn && <span className="text-xs">🔒</span>}
                            </div>

                            {/* Lock In Button */}
                            <Button
                                onClick={handleLockIn}
                                disabled={myLockedIn}
                                className={`flex-1 h-14 text-lg font-bold rounded-xl transition-all ${myLockedIn
                                    ? "bg-secondary text-muted-foreground border-border"
                                    : "bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white shadow-lg shadow-purple-500/25"
                                    }`}
                            >
                                {myLockedIn ? (
                                    <span className="flex items-center gap-2"><Lock className="w-5 h-5" /> Locked In</span>
                                ) : (
                                    "Lock In Answer"
                                )}
                            </Button>
                        </div>
                    ) : (
                        isPlayer1 ? (
                            <Button
                                onClick={handleNextRound}
                                className="w-full h-14 text-lg font-bold rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg"
                            >
                                <span className="flex items-center gap-2">Next Round <ArrowRight className="w-5 h-5" /></span>
                            </Button>
                        ) : (
                            <div className="text-center text-muted-foreground animate-pulse">
                                Waiting for host...
                            </div>
                        )
                    )}
                </div>

            </div>

            {/* Leave button */}
            <div className="fixed bottom-6 left-6 z-40">
                <Button variant="ghost" size="sm" onClick={onLeave} className="text-muted-foreground hover:text-primary">
                    <span className="text-xs">Leave Game</span>
                </Button>
            </div>
        </div>
    );
}
