"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { Dial } from "./Dial";
import { Room } from "@/hooks/useGameRoom";
import { calculatePoints, DECK_INFO, DeckType } from "@/lib/gameData";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    ArrowRight,
    Shuffle,
    Flame,
    Edit3,
    Trophy,
    Eye,
    Send,
    Check,
    MessageCircle,
    Flag,
    Layers,
    X,
    RefreshCw
} from "lucide-react";

interface GameScreenProps {
    room: Room;
    isPsychic: boolean;
    isGuesser: boolean;
    currentDeck: DeckType;
    onAngleChange: (angle: number) => void;
    onSubmitClue: (clue: string) => void;
    onSkipClue: () => void;
    onFinalizeGuess: (angle: number) => void;
    onNextRound: () => void;
    onUpdateScore: (points: number) => void;
    onSetCustomCard: (left: string, right: string) => void;
    onChangeCard: () => void;
    onSwitchDeck: (deck: DeckType) => void;
    onEndGame: () => void;
    onLeave: () => void;
}

export function GameScreen({
    room,
    isPsychic,
    isGuesser,
    currentDeck,
    onAngleChange,
    onSubmitClue,
    onSkipClue,
    onFinalizeGuess,
    onNextRound,
    onUpdateScore,
    onSetCustomCard,
    onChangeCard,
    onSwitchDeck,
    onEndGame,
    onLeave,
}: GameScreenProps) {
    const [clue, setClue] = useState("");
    const [customLeft, setCustomLeft] = useState("");
    const [customRight, setCustomRight] = useState("");
    const [showCustom, setShowCustom] = useState(false);
    const [pointsAwarded, setPointsAwarded] = useState(false);
    const [shake, setShake] = useState(false);
    const [showDeckPicker, setShowDeckPicker] = useState(false);

    useEffect(() => {
        if (room.phase === "revealed" && !pointsAwarded) {
            const points = calculatePoints(room.target_angle, room.guess_angle);

            if (points === 4) {
                confetti({
                    particleCount: 100,
                    spread: 70,
                    origin: { y: 0.6 },
                    colors: ["#2dd4bf", "#fb923c", "#fde047"],
                });
            } else if (points === 0) {
                setTimeout(() => setShake(true), 0);
                setTimeout(() => setShake(false), 500);
            }

            if (isGuesser) {
                onUpdateScore(points);
            }

            setTimeout(() => setPointsAwarded(true), 0);
        }
    }, [room.phase, room.target_angle, room.guess_angle, pointsAwarded, isGuesser, onUpdateScore]);

    useEffect(() => {
        if (room.phase === "clue") {
            setTimeout(() => setPointsAwarded(false), 0);
            setTimeout(() => setClue(""), 0);
        }
    }, [room.phase, room.round_number]);

    const points = calculatePoints(room.target_angle, room.guess_angle);

    const handleSubmitClue = () => {
        if (clue.trim()) {
            onSubmitClue(clue.trim());
        }
    };

    const handleSetCustomCard = () => {
        if (customLeft.trim() && customRight.trim()) {
            onSetCustomCard(customLeft.trim(), customRight.trim());
            setShowCustom(false);
            setCustomLeft("");
            setCustomRight("");
        }
    };

    return (
        <div className={`min-h-screen p-6 pt-36 md:pt-28 ${shake ? "screen-shake" : ""}`}>
            {/* Header - Fixed Top Center */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="fixed top-20 md:top-4 left-0 right-0 z-40 flex justify-center pointer-events-none"
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

                    {/* Player Scores */}
                    <div className="flex items-center gap-3">
                        <div className="text-right">
                            <p className="text-xs text-muted-foreground truncate max-w-[80px]">
                                {room.player1_name} <span className="text-base">{room.player1_avatar || "🐼"}</span>
                            </p>
                            <p className="font-display font-bold text-primary">{room.psychic_score}</p>
                        </div>
                        <div className="w-px h-8 bg-border" />
                        <div className="text-left">
                            <p className="text-xs text-muted-foreground truncate max-w-[80px]">
                                <span className="text-base">{room.player2_avatar || "🐯"}</span> {room.player2_name}
                            </p>
                            <p className="font-display font-bold text-primary">{room.guesser_score}</p>
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* Deck Picker Button - Fixed Bottom Right */}
            <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                onClick={() => setShowDeckPicker(true)}
                className="fixed right-6 bottom-6 z-40 bg-card/95 backdrop-blur-md border border-border rounded-2xl p-4 shadow-xl hover:bg-card hover:scale-105 hover:shadow-2xl transition-all cursor-pointer group"
                title="Switch Deck"
            >
                <div className="flex items-center gap-3">
                    <div className="text-3xl">{DECK_INFO[currentDeck].emoji}</div>
                    <div className="text-left">
                        <div className="font-display font-bold text-sm">{DECK_INFO[currentDeck].name}</div>
                        <div className="text-xs text-muted-foreground flex items-center gap-1">
                            <Layers className="w-3 h-3" /> Change Deck
                        </div>
                    </div>
                </div>
            </motion.button>

            {/* Deck Picker Modal */}
            <AnimatePresence>
                {showDeckPicker && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
                        onClick={() => setShowDeckPicker(false)}
                    >
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            onClick={(e) => e.stopPropagation()}
                            className="bg-card border border-border rounded-2xl p-6 w-full max-w-md shadow-2xl"
                        >
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="font-display text-xl font-bold">Switch Card Deck</h3>
                                <button
                                    onClick={() => setShowDeckPicker(false)}
                                    className="p-1 hover:bg-secondary rounded-lg transition-colors"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                {(Object.keys(DECK_INFO) as DeckType[]).map((deckKey) => {
                                    const deck = DECK_INFO[deckKey];
                                    const isSelected = currentDeck === deckKey;
                                    return (
                                        <button
                                            key={deckKey}
                                            onClick={() => {
                                                onSwitchDeck(deckKey);
                                                setShowDeckPicker(false);
                                            }}
                                            className={`p-4 rounded-xl border-2 transition-all hover:scale-105 cursor-pointer ${isSelected
                                                    ? "border-primary bg-primary/10"
                                                    : "border-border hover:border-primary/50 bg-card"
                                                }`}
                                        >
                                            <div className="text-2xl mb-2">{deck.emoji}</div>
                                            <div className="font-display font-bold text-sm">{deck.name}</div>
                                            <div className="text-xs text-muted-foreground">{deck.count} cards</div>
                                        </button>
                                    );
                                })}
                            </div>

                            <p className="text-xs text-muted-foreground text-center mt-4">
                                Switching decks will change the current card
                            </p>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Role Badge */}
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center mt-24 md:mt-4 mb-6"
            >
                <span className={`inline-flex items-center gap-2 px-4 py-2 rounded-full font-display font-semibold text-sm ${isPsychic
                    ? "bg-wedge-teal/20 text-wedge-teal"
                    : "bg-wedge-orange/20 text-wedge-orange"
                    }`}>
                    {isPsychic ? (
                        <>
                            <Eye className="w-4 h-4" /> You are the Psychic
                        </>
                    ) : (
                        <>
                            <Trophy className="w-4 h-4" /> You are the Guesser
                        </>
                    )}
                </span>
            </motion.div>

            {/* Main Dial */}
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 }}
                className="mb-8"
            >
                <Dial
                    targetAngle={room.target_angle}
                    guessAngle={room.guess_angle}
                    showTarget={room.phase === "revealed"}
                    isPsychic={isPsychic}
                    canInteract={isGuesser && room.phase === "guessing"}
                    currentCard={room.current_card}
                    onAngleChange={onAngleChange}
                />
            </motion.div>

            {/* Phase-specific UI */}
            <AnimatePresence mode="wait">
                {room.phase === "clue" && isPsychic && (
                    <motion.div
                        key="clue-input"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="game-card max-w-md mx-auto"
                    >
                        <h3 className="font-display text-lg font-semibold text-primary mb-4 text-center">
                            Give a clue to help your partner find the target!
                        </h3>

                        <div className="flex gap-2 mb-3">
                            <Input
                                value={clue}
                                onChange={(e) => setClue(e.target.value)}
                                placeholder="Enter your clue..."
                                className="flex-1"
                                onKeyDown={(e) => e.key === "Enter" && handleSubmitClue()}
                            />
                            <Button
                                onClick={handleSubmitClue}
                                disabled={!clue.trim()}
                                className="btn-game px-4"
                            >
                                <Send className="w-4 h-4" />
                            </Button>
                        </div>

                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={onSkipClue}
                            className="w-full mb-4 text-muted-foreground hover:text-primary"
                        >
                            <MessageCircle className="w-4 h-4 mr-2" />
                            Skip (I&apos;ll give a verbal clue)
                        </Button>

                        <div className="flex gap-2 justify-center flex-wrap">
                            <Button
                                size="sm"
                                variant="outline"
                                onClick={() => onChangeCard()}
                                className="gap-2 transition-transform hover:scale-105 active:scale-95"
                            >
                                <RefreshCw className="w-4 h-4" /> New Card
                            </Button>
                            <Button
                                size="sm"
                                variant="outline"
                                onClick={() => setShowCustom(!showCustom)}
                                className="gap-2 transition-transform hover:scale-105 active:scale-95"
                            >
                                <Edit3 className="w-4 h-4" /> Custom
                            </Button>
                        </div>

                        {showCustom && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                className="mt-4 pt-4 border-t border-border"
                            >
                                <div className="flex gap-2 mb-2">
                                    <Input
                                        value={customLeft}
                                        onChange={(e) => setCustomLeft(e.target.value)}
                                        placeholder="Left label"
                                    />
                                    <Input
                                        value={customRight}
                                        onChange={(e) => setCustomRight(e.target.value)}
                                        placeholder="Right label"
                                    />
                                </div>
                                <Button
                                    size="sm"
                                    onClick={handleSetCustomCard}
                                    disabled={!customLeft.trim() || !customRight.trim()}
                                    className="w-full"
                                >
                                    <Check className="w-4 h-4 mr-2" /> Set Custom Card
                                </Button>
                            </motion.div>
                        )}
                    </motion.div>
                )}

                {room.phase === "clue" && isGuesser && (
                    <motion.div
                        key="waiting-clue"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="game-card max-w-md mx-auto text-center"
                    >
                        <h3 className="font-display text-lg font-semibold text-primary mb-2">
                            Waiting for the Psychic...
                        </h3>
                        <p className="text-muted-foreground">
                            They&apos;re thinking of a clue for you
                        </p>
                        <motion.div
                            className="flex justify-center gap-1 mt-4"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                        >
                            {[0, 1, 2].map((i) => (
                                <motion.div
                                    key={i}
                                    className="w-2 h-2 rounded-full bg-wedge-teal"
                                    animate={{
                                        scale: [1, 1.3, 1],
                                        opacity: [0.5, 1, 0.5],
                                    }}
                                    transition={{
                                        duration: 1,
                                        repeat: Infinity,
                                        delay: i * 0.2,
                                    }}
                                />
                            ))}
                        </motion.div>
                    </motion.div>
                )}

                {room.phase === "guessing" && (
                    <motion.div
                        key="guessing"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="game-card max-w-md mx-auto text-center"
                    >
                        {room.clue && room.clue !== "(verbal clue)" && (
                            <h3 className="font-display text-2xl font-bold text-primary mb-4">
                                &quot;{room.clue}&quot;
                            </h3>
                        )}

                        {room.clue === "(verbal clue)" && (
                            <p className="text-muted-foreground mb-4 italic">
                                Listen for the verbal clue!
                            </p>
                        )}

                        {isGuesser ? (
                            <>
                                <p className="text-muted-foreground mb-4">
                                    Click on the dial to make your guess!
                                </p>
                                <Button
                                    onClick={() => onFinalizeGuess(room.guess_angle)}
                                    className="btn-game-accent"
                                >
                                    Lock In Guess <ArrowRight className="w-4 h-4 ml-2" />
                                </Button>
                            </>
                        ) : (
                            <p className="text-muted-foreground">
                                Watching your partner guess...
                            </p>
                        )}
                    </motion.div>
                )}

                {room.phase === "revealed" && (
                    <motion.div
                        key="revealed"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="game-card max-w-md mx-auto text-center"
                    >
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: "spring", stiffness: 400, damping: 20 }}
                            className={`inline-flex items-center justify-center w-20 h-20 rounded-full mb-4 ${points === 4 ? "bg-wedge-teal" :
                                points === 3 ? "bg-wedge-orange" :
                                    points === 2 ? "bg-wedge-yellow" :
                                        "bg-muted"
                                }`}
                        >
                            <span className="font-display text-4xl font-bold text-white">
                                {points}
                            </span>
                        </motion.div>

                        <h3 className="font-display text-2xl font-bold text-primary mb-6">
                            {points === 4 ? "Perfect!" :
                                points === 3 ? "Great Job!" :
                                    points === 2 ? "Nice Try!" :
                                        "Miss!"}
                        </h3>

                        <div className="flex gap-3 justify-center flex-wrap mb-4">
                            <Button
                                onClick={() => onNextRound()}
                                className="btn-game gap-2"
                            >
                                <ArrowRight className="w-4 h-4" /> Next Round
                            </Button>
                        </div>

                        {/* End Game button */}
                        <Button
                            variant="outline"
                            onClick={onEndGame}
                            className="gap-2 text-muted-foreground hover:text-destructive hover:border-destructive"
                        >
                            <Flag className="w-4 h-4" /> End Game
                        </Button>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Leave button - moved to left side since deck picker is on right */}
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
