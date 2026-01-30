"use client";

import { useState } from "react";
import { LandingScreen } from "./LandingScreen";
import { ClassicGameEngine } from "./ClassicGameEngine";
import { PartyGameEngine } from "./party/PartyGameEngine";
import { supabase } from "@/lib/supabase/client";

export function GameEngine() {
    const [gameState, setGameState] = useState<{
        mode: "classic" | "party";
        isCreating: boolean;
        name: string;
        avatar: string;
        roomCode?: string;
    } | null>(null);

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleCreateGame = (mode: "classic" | "party", name: string, avatar: string) => {
        setGameState({
            mode,
            isCreating: true,
            name,
            avatar
        });
    };

    const handleJoinGame = async (code: string, name: string, avatar: string) => {
        setIsLoading(true);
        setError(null);

        // 1. Check Room Mode
        const { data, error } = await supabase
            .from("rooms")
            .select("game_mode")
            .eq("room_code", code.toUpperCase())
            .single();

        if (error || !data) {
            setError("Room not found");
            setIsLoading(false);
            return;
        }

        const mode = (data.game_mode as "classic" | "party") || "classic";

        setGameState({
            mode,
            isCreating: false,
            name,
            avatar,
            roomCode: code
        });
        setIsLoading(false);
    };

    if (gameState) {
        if (gameState.mode === "party") {
            return (
                <PartyGameEngine
                    initialPlayerName={gameState.name}
                    initialAvatar={gameState.avatar}
                    initialRoomCode={gameState.roomCode}
                    isCreating={gameState.isCreating}
                    onLeave={() => setGameState(null)}
                />
            );
        } else {
            return (
                <ClassicGameEngine
                    initialPlayerName={gameState.name}
                    initialAvatar={gameState.avatar}
                    initialRoomCode={gameState.roomCode}
                    isCreating={gameState.isCreating}
                    onLeave={() => setGameState(null)}
                />
            );
        }
    }

    return (
        <LandingScreen
            onCreateGame={handleCreateGame}
            onJoinGame={handleJoinGame}
            isLoading={isLoading}
            error={error}
        />
    );
}
