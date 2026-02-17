"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Copy, Users, Play } from "lucide-react";
import { toast } from "sonner";
import { PartyPlayer } from "@/hooks/usePartyRoom";

interface PartyWaitingRoomProps {
    roomCode: string;
    players: PartyPlayer[];
    playerId: string;
    isHost: boolean;
    onStartGame: () => void;
    onLeave: () => void;
}

export function PartyWaitingRoom({
    roomCode,
    players,
    playerId,
    isHost,
    onStartGame,
    onLeave,
}: PartyWaitingRoomProps) {

    const copyCode = () => {
        navigator.clipboard.writeText(roomCode);
        toast.success("Room code copied!");
    };

    const copyLink = () => {
        const url = `${window.location.origin}/?code=${roomCode}`;
        navigator.clipboard.writeText(url);
        toast.success("Invite link copied!");
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="max-w-md w-full game-card text-center"
            >
                <div className="mb-4">
                    <h2 className="text-xl font-bold font-display mb-1 text-primary">Party Lobby</h2>
                    <p className="text-sm text-muted-foreground">Waiting for players...</p>
                </div>

                <div className="bg-secondary/30 rounded-xl p-4 mb-5 border border-border/50 flex flex-col items-center">
                    <p className="text-xs text-muted-foreground mb-2 font-display uppercase tracking-wider">Room Code</p>
                    <button
                        onClick={copyCode}
                        className="text-5xl font-black font-display tracking-widest text-primary hover:scale-105 transition-transform cursor-pointer active:scale-95 mb-3"
                    >
                        {roomCode}
                    </button>
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={copyCode}
                        className="text-muted-foreground hover:text-foreground"
                    >
                        <Copy className="w-4 h-4 mr-2" /> Copy Code
                    </Button>
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={copyLink}
                        className="text-muted-foreground hover:text-foreground mt-1"
                    >
                        <Copy className="w-4 h-4 mr-2" /> Copy Invite Link
                    </Button>
                </div>

                <div className="mb-5">
                    <h3 className="font-display font-bold text-base mb-3 flex items-center justify-center gap-2">
                        <Users className="w-4 h-4" /> Players ({players.length})
                    </h3>
                    <div className="grid grid-cols-2 gap-2">
                        {players.map((p) => (
                            <motion.div
                                key={p.id}
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className={`p-2 rounded-lg border flex items-center gap-2 ${p.player_id === playerId ? "bg-primary/10 border-primary/50" : "bg-card border-border"
                                    }`}
                            >
                                <span className="text-xl">{p.avatar}</span>
                                <span className="font-medium truncate text-xs">{p.name} {p.role === 'psychic' && '👑'}</span>
                            </motion.div>
                        ))}
                    </div>
                </div>

                <div className="space-y-3">
                    {isHost ? (
                        <Button
                            size="lg"
                            className="w-full btn-game-accent h-12 text-base"
                            onClick={onStartGame}
                            disabled={players.length < 2}
                        >
                            <Play className="w-5 h-5 mr-2" /> Start Game
                        </Button>
                    ) : (
                        <div className="p-4 bg-muted/50 rounded-lg text-sm text-muted-foreground animate-pulse">
                            Waiting for host to start...
                        </div>
                    )}

                    <Button variant="ghost" className="w-full" onClick={onLeave}>
                        Leave Room
                    </Button>
                </div>
            </motion.div>
        </div>
    );
}
