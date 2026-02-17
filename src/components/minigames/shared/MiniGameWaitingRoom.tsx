"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Copy, Users } from "lucide-react";
import { toast } from "sonner";

interface MiniGameWaitingRoomProps {
    roomCode: string;
    playerName: string;
    playerAvatar: string;
    isHost: boolean;
    hasOpponent: boolean;
    opponentName?: string;
    opponentAvatar?: string;
    onLeave: () => void;
    onStartGame?: () => void;
}

export function MiniGameWaitingRoom({
    roomCode,
    isHost,
    hasOpponent,
    onLeave,
    onStartGame
}: MiniGameWaitingRoomProps) {
    const [copied, setCopied] = useState(false);

    const copyCode = () => {
        navigator.clipboard.writeText(roomCode);
        setCopied(true);
        toast.success("Room code copied!");
        setTimeout(() => setCopied(false), 2000);
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
        <div className="fixed inset-0 z-50 bg-background flex items-center justify-center p-4">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="max-w-md w-full game-card text-center"
            >
                <div className="mb-6">
                    <h2 className="text-2xl font-bold font-display mb-2 text-primary">Waiting Room</h2>
                    <p className="text-muted-foreground">Share the code to invite your opponent</p>
                </div>

                <div className="bg-secondary/30 rounded-xl p-6 mb-8 border border-border/50">
                    <div
                        onClick={copyCode}
                        className="text-6xl font-black font-display tracking-widest text-primary hover:scale-105 transition-transform cursor-pointer active:scale-95 mb-4 select-all"
                    >
                        {roomCode}
                    </div>

                    <div className="flex flex-col gap-2">
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={copyCode}
                            className="text-muted-foreground hover:text-foreground"
                        >
                            {copied ? <span className="text-green-500 font-bold">Copied!</span> : <><Copy className="w-4 h-4 mr-2" /> Copy Code</>}
                        </Button>
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={copyLink}
                            className="text-muted-foreground hover:text-foreground"
                        >
                            <Copy className="w-4 h-4 mr-2" /> Copy Invite Link
                        </Button>
                    </div>
                </div>

                {/* Status */}
                <div className="space-y-4">
                    <div className="flex items-center justify-center gap-2 text-muted-foreground">
                        <Users className="w-5 h-5" />
                        <span>
                            {hasOpponent
                                ? `Opponent joined! ${onStartGame ? "Ready to start." : "Waiting for host..."}`
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
                        You are <strong className="text-primary">{isHost ? "Player 1 (Host)" : "Player 2"}</strong>
                    </p>
                </div>

                {/* Waiting message for non-host */}
                {hasOpponent && !isHost && (
                    <div className="mt-6 p-4 bg-secondary/50 rounded-lg animate-pulse">
                        <p className="text-muted-foreground font-medium">
                            Waiting for host to start the game...
                        </p>
                    </div>
                )}

                {hasOpponent && onStartGame && (
                    <Button
                        className="mt-6 btn-game w-full"
                        onClick={onStartGame}
                    >
                        Start Game
                    </Button>
                )}

                <Button
                    variant="outline"
                    className="mt-6 w-full"
                    onClick={onLeave}
                >
                    Leave Room
                </Button>
            </motion.div>
        </div>
    );
}
