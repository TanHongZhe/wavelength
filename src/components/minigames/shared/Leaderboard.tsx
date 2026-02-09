"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/client";
import { Loader2 } from "lucide-react";

interface LeaderboardEntry {
    id: string;
    player1_name: string;
    player2_name: string;
    player1_avatar: string;
    player2_avatar: string;
    psychic_score: number; // Team score
    card_count: number;
    created_at: string;
}

interface LeaderboardProps {
    gameMode: string;
    currentRoomId?: string;
}

export function Leaderboard({ gameMode, currentRoomId }: LeaderboardProps) {
    const [entries, setEntries] = useState<LeaderboardEntry[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchLeaderboard = async () => {
            const { data } = await supabase
                .from("rooms")
                .select("id, player1_name, player2_name, player1_avatar, player2_avatar, psychic_score, card_count, created_at")
                .eq("game_mode", gameMode)
                .order("psychic_score", { ascending: false })
                .limit(10);

            if (data) {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                setEntries(data as any[]);
            }
            setLoading(false);
        };

        fetchLeaderboard();
    }, [gameMode]);

    if (loading) {
        return <div className="flex justify-center p-4"><Loader2 className="animate-spin text-muted-foreground w-4 h-4" /></div>;
    }

    if (entries.length === 0) {
        return (
            <div className="text-center p-4 text-muted-foreground text-sm">
                No games played yet.
            </div>
        );
    }

    return (
        <div className="w-full mt-6 text-left">
            <h3 className="font-display font-bold text-lg mb-2 text-primary text-center">
                Leaderboard
            </h3>

            <div className="space-y-2 max-h-[200px] overflow-y-auto pr-1 custom-scrollbar">
                {entries.map((entry) => (
                    <div
                        key={entry.id}
                        className={`flex items-center justify-between p-2 rounded-lg text-sm ${entry.id === currentRoomId
                                ? "bg-primary/10 border border-primary/30 font-medium"
                                : "bg-card/50 border border-border/50"
                            }`}
                    >
                        <div className="flex items-center gap-2 truncate">
                            <span className="flex items-center gap-1 shrink-0">
                                <span>{entry.player1_avatar}</span>
                                <span className="max-w-[80px] truncate">{entry.player1_name}</span>
                            </span>
                            <span className="text-muted-foreground font-bold text-xs mx-1">X</span>
                            <span className="flex items-center gap-1 shrink-0">
                                <span>{entry.player2_avatar}</span>
                                <span className="max-w-[80px] truncate">{entry.player2_name}</span>
                            </span>
                        </div>
                        <div className="font-mono font-bold text-primary shrink-0 ml-2">
                            {entry.psychic_score}/{entry.card_count || 20}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
