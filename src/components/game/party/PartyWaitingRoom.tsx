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

    return (
        <div className="min-h-screen flex items-center justify-center p-4">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="max-w-md w-full game-card text-center"
            >
                <div className="mb-6">
                    <h2 className="text-2xl font-bold font-display mb-2 text-primary">Party Lobby</h2>
                    <p className="text-muted-foreground">Waiting for players...</p>
                </div>

                <div className="bg-secondary/30 rounded-xl p-6 mb-8 border border-border/50 flex flex-col items-center">
                    <p className="text-sm text-muted-foreground mb-4 font-display uppercase tracking-wider">Room Code</p>
                    <button
                        onClick={copyCode}
                        className="text-6xl font-black font-display tracking-widest text-primary hover:scale-105 transition-transform cursor-pointer active:scale-95 mb-4"
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
                </div>

                <div className="mb-8">
                    <h3 className="font-display font-bold text-lg mb-4 flex items-center justify-center gap-2">
                        <Users className="w-5 h-5" /> Players ({players.length})
                    </h3>
                    <div className="grid grid-cols-2 gap-3">
                        {players.map((p) => (
                            <motion.div
                                key={p.id}
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className={`p-3 rounded-lg border flex items-center gap-3 ${p.player_id === playerId ? "bg-primary/10 border-primary/50" : "bg-card border-border"
                                    }`}
                            >
                                <span className="text-2xl">{p.avatar}</span>
                                <span className="font-medium truncate">{p.name} {p.role === 'psychic' && '👑'}</span>
                            </motion.div>
                        ))}
                    </div>
                </div>

                <div className="space-y-3">
                    {isHost ? (
                        <Button
                            size="lg"
                            className="w-full btn-game-accent text-lg py-6"
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
