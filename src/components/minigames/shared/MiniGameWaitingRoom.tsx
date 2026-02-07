"use client";

import { motion } from "framer-motion";
import { Copy, Check, Users } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

interface MiniGameWaitingRoomProps {
    /** 4-letter room code */
    roomCode: string;
    /** Current player's name */
    playerName: string;
    /** Current player's avatar */
    playerAvatar: string;
    /** Whether this player is the host (player 1) */
    isHost: boolean;
    /** Whether an opponent has joined */
    hasOpponent: boolean;
    /** Opponent's name (if joined) */
    opponentName?: string;
    /** Opponent's avatar (if joined) */
    opponentAvatar?: string;
    /** Called when user clicks leave */
    onLeave: () => void;
    /** Called when host clicks start game */
    onStartGame?: () => void;
}

export function MiniGameWaitingRoom({
    roomCode,
    playerName,
    playerAvatar,
    isHost,
    hasOpponent,
    opponentName,
    opponentAvatar,
    onLeave,
    onStartGame
}: MiniGameWaitingRoomProps) {
    const [copied, setCopied] = useState(false);

    const copyCode = () => {
        navigator.clipboard.writeText(roomCode);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="fixed inset-0 bg-background z-50 flex flex-col items-center justify-center p-6">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="game-card max-w-md w-full text-center"
            >
                {/* Room Code Display */}
                <h2 className="font-display text-lg text-muted-foreground mb-2">
                    Room Code
                </h2>

                <motion.button
                    className="inline-flex items-center gap-3 px-6 py-3 rounded-xl bg-primary text-primary-foreground mb-6 hover:scale-105 transition-transform"
                    onClick={copyCode}
                    whileTap={{ scale: 0.95 }}
                >
                    <span className="font-display text-3xl font-bold tracking-[0.3em]">
                        {roomCode}
                    </span>
                    {copied ? (
                        <Check className="w-5 h-5" />
                    ) : (
                        <Copy className="w-5 h-5" />
                    )}
                </motion.button>

                {/* Status */}
                <div className="space-y-4">
                    <div className="flex items-center justify-center gap-2 text-muted-foreground">
                        <Users className="w-5 h-5" />
                        <span>
                            {hasOpponent
                                ? `${opponentName} ${opponentAvatar} joined!`
                                : "Waiting for opponent to join..."}
                        </span>
                    </div>

                    {!hasOpponent && (
                        <motion.div
                            className="flex justify-center gap-1"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                        >
                            {[0, 1, 2].map((i) => (
                                <motion.div
                                    key={i}
                                    className="w-3 h-3 rounded-full bg-wedge-teal"
                                    animate={{
                                        scale: [1, 1.2, 1],
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
                    )}

                    <p className="text-sm text-muted-foreground">
                        You are <strong className="text-primary">{playerName} {playerAvatar}</strong>
                    </p>
                </div>

                {/* Start Game Button - only visible to host when opponent has joined */}
                {hasOpponent && isHost && onStartGame && (
                    <Button
                        className="mt-6 btn-game w-full"
                        onClick={onStartGame}
                    >
                        Start Game
                    </Button>
                )}

                {/* Waiting message for non-host */}
                {hasOpponent && !isHost && (
                    <p className="mt-6 text-muted-foreground text-sm">
                        Waiting for host to start the game...
                    </p>
                )}

                <Button
                    variant="outline"
                    className="mt-6"
                    onClick={onLeave}
                >
                    Leave Room
                </Button>
            </motion.div>
        </div>
    );
}
