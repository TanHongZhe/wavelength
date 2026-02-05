"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { Dial } from "../Dial";
import { Room, PartyPlayer } from "@/hooks/usePartyRoom";
import { calculatePoints, DECK_INFO, DeckType } from "@/lib/gameData";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    ArrowRight,
    Shuffle,
    Flame,
    Edit3,
    Copy,
    Send,
    Lock,
    Check,
    Loader2,
    Trophy,
    Eye,
    MessageCircle,
    Flag,
    Users,
    RefreshCw,
    Layers,
    X
} from "lucide-react";

interface PartyGameScreenProps {
    room: Room;
    players: PartyPlayer[];
    currentPlayer: PartyPlayer | undefined;
    isPsychic: boolean;
    isGuesser: boolean;
    currentDeck: DeckType;
    onUpdateMyGuess: (angle: number) => void;
    onLockInGuess: (angle: number) => void;
    onSubmitClue: (clue: string) => void;
    onNextRound: () => void;
    onSetCustomCard: (left: string, right: string) => void;
    onChangeCard: () => void;
    onSwitchDeck: (deck: DeckType) => void;
    onEndGame: () => void;
    onLeave: () => void;
}

export function PartyGameScreen({
    room,
    players,
    currentPlayer,
    isPsychic,
    isGuesser,
    currentDeck,
    onUpdateMyGuess,
    onLockInGuess,
    onSubmitClue,
    onNextRound,
    onSetCustomCard,
    onChangeCard,
    onSwitchDeck,
    onEndGame,
    onLeave,
}: PartyGameScreenProps) {
    const [clue, setClue] = useState("");
    const [showDeckPicker, setShowDeckPicker] = useState(false);

    const [pointsAwarded, setPointsAwarded] = useState(false);

    // Sort players: Psychic first, then by score
    // NOTE: This visual sort assumes the 'players' array passed in is already STABLE for logic purposes.
    // However, purely for visual display, we want Psychic at top.
    const sortedPlayers = [...players].sort((a, b) => {
        if (a.role === "psychic") return -1;
        if (b.role === "psychic") return 1;
        return (b.score || 0) - (a.score || 0);
    });

    // Calculate generic points for display (just based on current player's view or avg?)
    const myPoints = currentPlayer && currentPlayer.guess_angle !== null && room.phase === "revealed"
        ? calculatePoints(room.target_angle, currentPlayer.guess_angle)
        : 0;

    useEffect(() => {
        if (room.phase === "revealed" && !pointsAwarded) {
            if (myPoints === 4) {
                confetti({
                    particleCount: 100,
                    spread: 70,
                    origin: { y: 0.6 },
                    colors: ["#2dd4bf", "#fb923c", "#fde047"],
                });
            }
            setPointsAwarded(true);
        }
    }, [room.phase, pointsAwarded, myPoints]);

    useEffect(() => {
        if (room.phase === "clue") {
            setPointsAwarded(false);
            setClue("");
        }
    }, [room.phase, room.round_number]);

    const handleSubmitClue = () => {
        if (clue.trim()) onSubmitClue(clue.trim());
    };

    return (
        <div className="min-h-screen p-6 pt-36 md:pt-28 flex flex-col items-center">

            {/* Header - Fixed Top Center */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="fixed top-20 md:top-4 left-0 right-0 z-40 flex justify-center pointer-events-none"
            >
                <div className="pointer-events-auto flex items-center gap-4 md:gap-6 bg-background/80 backdrop-blur-md px-6 py-2 rounded-full border border-border/50 shadow-sm">
                    <div className="flex items-center gap-3">
                        <div className="font-display text-sm text-muted-foreground mr-1">
                            Room: <span className="font-bold text-primary">{room.room_code}</span>
                        </div>
                        <div className="font-display text-sm text-muted-foreground">
                            Round: <span className="font-bold text-primary">{room.round_number}</span>
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


            <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* LEFT/TOP: Game Area (Dial) */}
                <div className="lg:col-span-2 flex flex-col items-center">

                    {/* Role Badge */}
                    <div className="text-center mt-12 md:mt-0 mb-6">
                        <span className={`inline-flex items-center gap-2 px-4 py-2 rounded-full font-display font-semibold text-sm ${isPsychic
                            ? "bg-wedge-teal/20 text-wedge-teal"
                            : "bg-wedge-orange/20 text-wedge-orange"
                            }`}>
                            {isPsychic ? (
                                <><Eye className="w-4 h-4" /> You are the Psychic</>
                            ) : (
                                <><Trophy className="w-4 h-4" /> You are a Guesser</>
                            )}
                        </span>
                    </div>

                    {/* Dial */}
                    <div className="w-full max-w-lg mb-8">
                        <Dial
                            targetAngle={room.target_angle}
                            guessAngle={currentPlayer?.guess_angle ?? 90}
                            showTarget={room.phase === "revealed" || isPsychic}
                            isPsychic={isPsychic}
                            canInteract={isGuesser && room.phase === "guessing" && !currentPlayer?.locked_in}
                            currentCard={room.current_card}
                            onAngleChange={onUpdateMyGuess}
                        />
                    </div>

                    {/* Controls / Messages */}
                    <div className="w-full max-w-md">
                        <AnimatePresence mode="wait">
                            {/* PSYCHIC GIVING CLUE */}
                            {room.phase === "clue" && isPsychic && (
                                <motion.div
                                    key="psychic-clue"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    className="game-card"
                                >
                                    <h3 className="font-display text-lg font-semibold text-primary mb-4 text-center">
                                        Give a clue!
                                    </h3>

                                    {/* Change Card Button */}
                                    <div className="flex justify-center mb-4">
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => onChangeCard()}
                                            className="text-xs text-muted-foreground hover:text-primary gap-1"
                                        >
                                            <RefreshCw className="w-3 h-3" /> Change Words
                                        </Button>
                                    </div>

                                    <div className="flex gap-2">
                                        <Input
                                            value={clue}
                                            onChange={(e) => setClue(e.target.value)}
                                            placeholder="Enter clue..."
                                            onKeyDown={(e) => e.key === "Enter" && handleSubmitClue()}
                                        />
                                        <Button onClick={handleSubmitClue} disabled={!clue.trim()} className="btn-game px-4">
                                            <Send className="w-4 h-4" />
                                        </Button>
                                    </div>
                                </motion.div>
                            )}

                            {/* GUESSER WAITING FOR CLUE */}
                            {room.phase === "clue" && isGuesser && (
                                <motion.div
                                    key="guesser-wait"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="text-center text-muted-foreground"
                                >
                                    Waiting for Psychic to give a clue...
                                </motion.div>
                            )}

                            {/* GUESSING PHASE */}
                            {room.phase === "guessing" && (
                                <motion.div
                                    key="guessing"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="game-card text-center"
                                >
                                    <h3 className="font-display text-2xl font-bold text-primary mb-4">
                                        &quot;{room.clue}&quot;
                                    </h3>

                                    {isGuesser && !currentPlayer?.locked_in && (
                                        <Button
                                            onClick={() => onLockInGuess(currentPlayer?.guess_angle ?? 90)}
                                            className="btn-game-accent w-full"
                                        >
                                            <Lock className="w-4 h-4 mr-2" /> Lock In Guess
                                        </Button>
                                    )}
                                    {isGuesser && currentPlayer?.locked_in && (
                                        <div className="text-wedge-teal font-medium flex items-center justify-center gap-2">
                                            <Check className="w-5 h-5" /> Guess Locked In!
                                        </div>
                                    )}
                                    {isPsychic && (
                                        <div className="text-muted-foreground">
                                            Wait for guessers to lock in...
                                        </div>
                                    )}
                                </motion.div>
                            )}

                            {/* MINI DIALS FOR PSYCHIC (or Everyone when revealed) */}
                            {(isPsychic || room.phase === "revealed") && (
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6 w-full">
                                    {players.filter(p => p.role === "guesser").map(p => {
                                        // Mini Dial Calculations
                                        const segmentWidths = [6, 8, 10, 8, 6];
                                        const wedgeWidth = 38;
                                        const segmentColors = ["#fde047", "#fb923c", "#2dd4bf", "#fb923c", "#fde047"];
                                        const segmentPoints = [2, 3, 4, 3, 2];
                                        const targetAngle = room.target_angle;

                                        return (
                                            <div key={p.id} className="flex flex-col items-center">
                                                <div className="relative w-24 h-12 mb-1">
                                                    <svg viewBox="0 0 200 100" className="w-full h-full">
                                                        {/* Background */}
                                                        <path d="M 0 100 A 100 100 0 0 1 200 100 Z" fill="hsl(217, 33%, 17%)" />
                                                        <path d="M 5 100 A 95 95 0 0 1 195 100 Z" fill="hsl(40, 33%, 93%)" />

                                                        {/* Target Wedges + Numbers */}
                                                        {segmentWidths.map((width, index) => {
                                                            let startOffset = -wedgeWidth / 2;
                                                            for (let i = 0; i < index; i++) startOffset += segmentWidths[i];

                                                            const startAngle = targetAngle + startOffset;
                                                            const innerRadius = 10;
                                                            const outerRadius = 95;
                                                            const startRad = startAngle * (Math.PI / 180);
                                                            const endRad = (startAngle + width) * (Math.PI / 180);

                                                            const x1 = 100 - outerRadius * Math.cos(startRad);
                                                            const y1 = 100 - outerRadius * Math.sin(startRad);
                                                            const x2 = 100 - outerRadius * Math.cos(endRad);
                                                            const y2 = 100 - outerRadius * Math.sin(endRad);
                                                            const x3 = 100 - innerRadius * Math.cos(endRad);
                                                            const y3 = 100 - innerRadius * Math.sin(endRad);
                                                            const x4 = 100 - innerRadius * Math.cos(startRad);
                                                            const y4 = 100 - innerRadius * Math.sin(startRad);

                                                            // Text Pos
                                                            const midAngle = startAngle + width / 2;
                                                            const midRad = midAngle * (Math.PI / 180);
                                                            const tx = 100 - 65 * Math.cos(midRad);
                                                            const ty = 100 - 65 * Math.sin(midRad);

                                                            return (
                                                                <g key={index}>
                                                                    <path
                                                                        d={`M ${x1} ${y1} A ${outerRadius} ${outerRadius} 0 0 1 ${x2} ${y2} L ${x3} ${y3} A ${innerRadius} ${innerRadius} 0 0 0 ${x4} ${y4} Z`}
                                                                        fill={segmentColors[index]}
                                                                        stroke="#1e293b"
                                                                        strokeWidth="0.5"
                                                                    />
                                                                    <text x={tx} y={ty} textAnchor="middle" dominantBaseline="middle" fontSize="10" fontWeight="bold" fill="#1e293b">
                                                                        {segmentPoints[index]}
                                                                    </text>
                                                                </g>
                                                            );
                                                        })}

                                                        {/* Needle */}
                                                        {p.guess_angle !== null && (
                                                            <g transform={`rotate(${p.guess_angle - 90}, 100, 100)`}>
                                                                <rect x="99" y="5" width="2" height="95" fill="hsl(12, 76%, 61%)" rx="1" />
                                                                <circle cx="100" cy="5" r="3" fill="hsl(12, 76%, 61%)" />
                                                            </g>
                                                        )}
                                                    </svg>

                                                    {/* Locked Status Dot - Overlay */}
                                                    <div className={`absolute bottom-1 right-2 w-3 h-3 rounded-full border-2 border-white ${p.locked_in ? "bg-green-500" : "bg-gray-300"}`} title={p.locked_in ? "Locked In" : "Thinking"} />
                                                </div>
                                                <div className="text-[10px] font-bold text-center truncate max-w-full px-1">
                                                    {p.name}
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            )}

                            {/* REVEALED PHASE - SCORING & NEXT ROUND */}
                            {room.phase === "revealed" && (
                                <motion.div
                                    key="revealed"
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="game-card text-center"
                                >
                                    <h3 className="font-display text-2xl font-bold text-primary mb-6">
                                        Round Over!
                                    </h3>

                                    {/* Score Summary (Optional, but useful) */}
                                    <div className="mb-6 grid grid-cols-2 gap-2 text-sm">
                                        {players.filter(p => p.role === "guesser").map(p => {
                                            const pts = calculatePoints(room.target_angle, p.guess_angle ?? 90);
                                            return (
                                                <div key={p.id} className="flex justify-between bg-primary/10 p-2 rounded">
                                                    <span>{p.name}</span>
                                                    <span className={`font-bold ${pts === 4 ? "text-wedge-teal" : pts >= 2 ? "text-wedge-orange" : "text-muted-foreground"}`}>+{pts} pts</span>
                                                </div>
                                            )
                                        })}
                                    </div>

                                    {/* Action Buttons - Only for NEXT Psychic */}
                                    {(() => {
                                        // LOGIC FOR NEXT PSYCHIC DISPLAY (must match nextRound logic loop)
                                        // We should sort by joined_at to match logic, but here we depend on 'players' array.
                                        // Ideally 'players' comes sorted from the hook?
                                        // Let's rely on the hook sort: 
                                        const sortedForLogic = [...players].sort((a, b) => a.joined_at.localeCompare(b.joined_at));
                                        const currentPsychicIndex = sortedForLogic.findIndex(p => p.role === "psychic");
                                        const nextPsychicIndex = (currentPsychicIndex + 1) % sortedForLogic.length;
                                        const nextPsychic = sortedForLogic[nextPsychicIndex];
                                        const isNextPsychic = currentPlayer?.player_id === nextPsychic?.player_id;

                                        if (isNextPsychic) {
                                            return (
                                                <div className="flex flex-col gap-4 items-center animate-in fade-in slide-in-from-bottom-4">
                                                    <p className="text-sm font-bold text-accent animate-pulse">You are the next Psychic!</p>
                                                    <Button onClick={() => onNextRound()} className="btn-game gap-2">
                                                        <ArrowRight className="w-4 h-4" /> Next Round
                                                    </Button>
                                                </div>
                                            );
                                        } else {
                                            return (
                                                <div className="text-muted-foreground italic flex flex-col items-center gap-2">
                                                    <Loader2 className="w-4 h-4 animate-spin" />
                                                    Waiting for {nextPsychic?.name} to start the next round...
                                                </div>
                                            );
                                        }
                                    })()}
                                </motion.div>
                            )}

                            {/* GAME OVER PHASE */}
                            {room.phase === "ended" && (
                                <motion.div
                                    key="ended"
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="game-card text-center"
                                >
                                    <h3 className="font-display text-3xl font-bold text-destructive mb-6">
                                        Game Ended
                                    </h3>

                                    <div className="space-y-4 mb-8">
                                        <p className="text-muted-foreground">
                                            The lobby has been closed. Here are the final scores:
                                        </p>

                                        <div className="bg-card/50 rounded-xl border border-border overflow-hidden">
                                            {sortedPlayers.map((p, i) => (
                                                <div key={p.id} className="flex items-center justify-between p-3 border-b border-border/50 last:border-0 hover:bg-white/5">
                                                    <div className="flex items-center gap-3">
                                                        <span className="font-display font-bold text-muted-foreground w-6 text-center">
                                                            #{i + 1}
                                                        </span>
                                                        <div className="text-2xl">{p.avatar}</div>
                                                        <div className="font-bold text-sm">
                                                            {p.name}
                                                            {p.player_id === currentPlayer?.player_id && <span className="ml-2 text-xs text-muted-foreground">(You)</span>}
                                                        </div>
                                                    </div>
                                                    <div className="font-display font-bold text-xl text-primary">
                                                        {p.score} pts
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <Button onClick={onLeave} size="lg" className="w-full btn-game">
                                        <ArrowRight className="w-4 h-4 mr-2" /> Return to Home
                                    </Button>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>

                {/* RIGHT/BOTTOM: Player Board */}
                <div className="lg:col-span-1">
                    <div className="bg-card/50 backdrop-blur-sm border border-border rounded-2xl p-4 sticky top-32">
                        <h3 className="font-display text-lg font-bold mb-4 flex items-center gap-2">
                            <Users className="w-5 h-5" /> Players ({players.length})
                        </h3>

                        <div className="space-y-3">
                            {sortedPlayers.map((p) => {
                                const isMe = p.player_id === currentPlayer?.player_id;
                                const isP = p.role === "psychic";
                                const status = isP
                                    ? (room.phase === "clue" ? "Thinking..." : "Clue Given")
                                    : (p.locked_in ? "Locked In" : "Thinking...");

                                // Show Total Score from DB
                                const totalScore = p.score || 0;

                                // Calculate Round Score for display during reveal
                                const roundScore = room.phase === "revealed" && p.role === "guesser" && p.guess_angle !== null
                                    ? calculatePoints(room.target_angle, p.guess_angle)
                                    : null;

                                return (
                                    <div
                                        key={p.id}
                                        className={`p-3 rounded-xl border flex items-center justify-between ${isMe ? "bg-secondary/50 border-primary/30" : "bg-card border-border/50"
                                            }`}
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className="text-2xl">{p.avatar}</div>
                                            <div>
                                                <div className="font-bold text-sm flex items-center gap-1">
                                                    {p.name}
                                                    {isP && <Eye className="w-3 h-3 text-wedge-teal" />}
                                                </div>
                                                <div className="text-xs text-muted-foreground">
                                                    {status}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="text-right flex flex-col items-end">
                                            <span className="font-display font-bold text-lg">{totalScore}</span>
                                            {room.phase === "revealed" && roundScore !== null && (
                                                <span className={`text-[10px] font-bold ${roundScore === 4 ? "text-wedge-teal" :
                                                    roundScore >= 2 ? "text-wedge-orange" : "text-muted-foreground"
                                                    }`}>
                                                    +{roundScore}
                                                </span>
                                            )}
                                            {p.role === "guesser" && p.locked_in && room.phase === "guessing" && (
                                                <Lock className="w-3 h-3 text-green-500" />
                                            )}
                                        </div>
                                    </div>

                                );
                            })}
                        </div>

                        <div className="mt-6 pt-4 border-t border-border flex flex-col gap-2">
                            <Button variant="ghost" size="sm" onClick={onLeave} className="w-full text-muted-foreground">
                                Leave Game
                            </Button>

                            <Button
                                variant="destructive"
                                size="sm"
                                onClick={() => {
                                    if (confirm("Are you sure you want to end the game for everyone?")) {
                                        onEndGame();
                                    }
                                }}
                                className="w-full bg-red-900/20 text-red-500 hover:bg-red-900/40 hover:text-red-400"
                            >
                                Dump Lobby
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
