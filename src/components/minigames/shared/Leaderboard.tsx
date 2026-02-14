"use client";

import { useConvex } from "convex/react";
import { api } from "convex/_generated/api";
import { useState, useEffect } from "react";
import { Loader2 } from "lucide-react";

interface LeaderboardProps {
    gameMode: string;
    currentRoomId?: string;
}

export function Leaderboard({ gameMode, currentRoomId }: LeaderboardProps) {
    const convex = useConvex();
    const [entries, setEntries] = useState<any[] | undefined>(undefined);

    // Fetch once on mount instead of using a reactive subscription
    useEffect(() => {
        let cancelled = false;
        convex.query(api.rooms.getLeaderboard, { gameMode }).then((data) => {
            if (!cancelled) setEntries(data);
        });
        return () => { cancelled = true; };
    }, [gameMode, convex]);

    if (entries === undefined) {
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
                        key={entry._id}
                        className={`flex items-center justify-between p-2 rounded-lg text-sm ${entry._id === currentRoomId
                            ? "bg-primary/10 border border-primary/30 font-medium"
                            : "bg-card/50 border border-border/50"
                            }`}
                    >
                        <div className="flex items-center gap-2 truncate">
                            <span className="flex items-center gap-1 shrink-0">
                                <span>{entry.player1_avatar || "🐼"}</span>
                                <span className="max-w-[80px] truncate">{entry.player1_name || "Player 1"}</span>
                            </span>
                            <span className="text-muted-foreground font-bold text-xs mx-1">X</span>
                            <span className="flex items-center gap-1 shrink-0">
                                <span>{entry.player2_avatar || "🐯"}</span>
                                <span className="max-w-[80px] truncate">{entry.player2_name || "Player 2"}</span>
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
