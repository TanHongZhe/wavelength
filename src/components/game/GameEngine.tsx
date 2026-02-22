"use client";

import { useState } from "react";
import { useMutation } from "convex/react";
import { api } from "convex/_generated/api";
import { LandingScreen } from "./LandingScreen";
import { DeckType } from "@/lib/gameData";
import dynamic from "next/dynamic";

const ClassicGameEngine = dynamic(() => import("./ClassicGameEngine").then(mod => mod.ClassicGameEngine));
const PartyGameEngine = dynamic(() => import("./party/PartyGameEngine").then(mod => mod.PartyGameEngine));

export function GameEngine() {
    const [gameState, setGameState] = useState<{
        mode: "classic" | "party";
        isCreating: boolean;
        name: string;
        avatar: string;
        roomCode?: string;
        deckType?: DeckType;
        maxRounds?: number;
    } | null>(null);

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Use Convex mutation to check room mode during join
    const joinRoomByCode = useMutation(api.rooms.joinRoomByCode);

    const handleCreateGame = (mode: "classic" | "party", name: string, avatar: string, deckType: DeckType = "fun", maxRounds: number = 4) => {
        setGameState({
            mode,
            isCreating: true,
            name,
            avatar,
            deckType,
            maxRounds
        });
    };

    const handleJoinGame = async (code: string, name: string, avatar: string) => {
        setIsLoading(true);
        setError(null);

        try {
            // Use Convex mutation to atomically find the room
            const result = await joinRoomByCode({
                roomCode: code.toUpperCase(),
                playerId: localStorage.getItem("wavelength_player_id") || "temp",
                playerName: name,
                playerAvatar: avatar,
            });

            if (result.error) {
                setError(result.error);
                setIsLoading(false);
                return;
            }

            if (!result.room) {
                setError("Room not found");
                setIsLoading(false);
                return;
            }

            const mode = (result.room.game_mode as "classic" | "party") || "classic";

            setGameState({
                mode,
                isCreating: false,
                name,
                avatar,
                roomCode: code
            });
            setIsLoading(false);
        } catch (err) {
            console.error("Join error:", err);
            setError("Room not found");
            setIsLoading(false);
        }
    };

    if (gameState) {
        if (gameState.mode === "party") {
            return (
                <PartyGameEngine
                    initialPlayerName={gameState.name}
                    initialAvatar={gameState.avatar}
                    initialRoomCode={gameState.roomCode}
                    initialDeckType={gameState.deckType}
                    initialMaxRounds={gameState.maxRounds}
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
                    initialDeckType={gameState.deckType}
                    initialMaxRounds={gameState.maxRounds}
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
