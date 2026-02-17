"use client";

import { motion } from "framer-motion";
import { Copy, Check, Users } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface MiniGameWaitingRoomProps {
    roomCode: string;
    isHost: boolean;
    hasOpponent: boolean;
    playerName: string;
    onLeave: () => void;
    onStartGame?: () => void;
}

export function MiniGameWaitingRoom({
    roomCode,
    isHost,
    hasOpponent,
    playerName,
    onLeave,
    onStartGame
}: MiniGameWaitingRoomProps) {
    const [copied, setCopied] = useState(false);

    const copyCode = () => {
        navigator.clipboard.writeText(roomCode);
        setCopied(true); // Re-use copied state for simplicity
        setTimeout(() => setCopied(false), 2000);
        toast.success("Room code copied!");
    };

    // URL copy logic
    const copyLink = () => {
        const baseUrl = window.location.href.split('?')[0];
        const url = `${baseUrl}?code=${roomCode}`;
        navigator.clipboard.writeText(url);
        setCopied(true); // Re-use copied state for simplicity
        setTimeout(() => setCopied(false), 2000);
        toast.success("Invite link copied!");
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-6">
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

                {/* Copy Link Button */}
                <div className="mb-6">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={copyLink}
                        className="text-muted-foreground hover:text-foreground gap-2 border-primary/20 hover:bg-primary/5"
                    >
                        <Copy className="w-4 h-4" /> Copy Direct Invite Link
                    </Button>
                </div>

                {/* Status */}
                <div className="space-y-4">
                    <div className="flex items-center justify-center gap-2 text-muted-foreground">
                        <Users className="w-5 h-5" />
                        <span>
                            {hasOpponent
                                ? (isHost ? "Player 2 joined! Ready to start." : "Connected! Waiting for host to start...")
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
                        You are <strong className="text-primary">{playerName}</strong>
                    </p>
                </div>

                {hasOpponent && onStartGame && isHost && (
                    <Button
                        className="mt-6 btn-game w-full"
                        onClick={onStartGame}
                    >
                        Start Game
                    </Button>
                )}

                {/* Waiting message for non-host */}
                {hasOpponent && !isHost && (
                    <div className="mt-6 p-4 bg-secondary/50 rounded-lg animate-pulse">
                        <p className="text-muted-foreground font-medium">
                            Waiting for host to start the game...
                        </p>
                    </div>
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
