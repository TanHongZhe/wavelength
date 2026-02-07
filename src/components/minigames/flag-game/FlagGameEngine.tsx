"use client";

import { useState } from "react";
import { MiniGameSetup, MiniGameWaitingRoom } from "../shared";
import { FlagGameScreen } from "./FlagGameScreen";
import { useFlagRoom } from "./useFlagRoom";

export interface FlagGameConfig {
    playerName: string;
    playerAvatar: string;
    cardCount: number;
    roomCode?: string;
}

interface FlagGameEngineProps {
    onClose: () => void;
}

export function FlagGameEngine({ onClose }: FlagGameEngineProps) {
    const [gameConfig, setGameConfig] = useState<FlagGameConfig | null>(null);
    const [selectedCardCount, setSelectedCardCount] = useState(20);

    const {
        room,
        roomId,
        playerId,
        isPlayer1,
        hasOpponent,
        isLoading,
        error,
        authInitialized,
        createRoom,
        joinRoom,
        startGame,
        leaveRoom,
    } = useFlagRoom();

    // Handle game creation
    const handleCreateGame = async (playerName: string, avatar: string) => {
        setGameConfig({ playerName, playerAvatar: avatar, cardCount: selectedCardCount });
        await createRoom(playerName, avatar, selectedCardCount);
    };

    // Handle joining a game
    const handleJoinGame = async (playerName: string, avatar: string, roomCode: string) => {
        setGameConfig({ playerName, playerAvatar: avatar, cardCount: 20, roomCode });
        await joinRoom(playerName, avatar, roomCode);
    };

    // Handle leaving
    const handleLeave = () => {
        leaveRoom();
        setGameConfig(null);
        onClose();
    };

    // Handle start game
    const handleStartGame = async () => {
        await startGame();
    };

    // Game-specific options for the setup screen (card count picker)
    const CardCountPickerOptions = (
        <div className="space-y-4 mb-4">
            <div>
                <label className="text-sm font-medium text-muted-foreground mb-2 block">
                    Number of Scenarios
                </label>
                <div className="grid grid-cols-3 gap-2">
                    {[20, 50, 100].map((count) => (
                        <button
                            key={count}
                            onClick={() => setSelectedCardCount(count)}
                            className={`p-3 rounded-lg border-2 transition-all cursor-pointer ${selectedCardCount === count
                                ? "border-primary bg-primary/10"
                                : "border-primary/20 hover:border-primary/40 bg-secondary"
                                }`}
                        >
                            <div className="text-lg font-bold">{count}</div>
                            <div className="text-xs text-muted-foreground">
                                {count === 20 ? "Quick" : count === 50 ? "Standard" : "Marathon"}
                            </div>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );

    // Still loading auth
    if (!authInitialized) {
        return (
            <div className="fixed inset-0 bg-background z-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="text-2xl mb-2">🚩</div>
                    <p className="text-muted-foreground">Loading...</p>
                </div>
            </div>
        );
    }

    // No room yet - show setup
    if (!room) {
        return (
            <MiniGameSetup
                title="Red, Green, Beige Flag"
                onCreateGame={handleCreateGame}
                onJoinGame={handleJoinGame}
                onClose={onClose}
                createGameOptions={CardCountPickerOptions}
                isLoading={isLoading}
                error={error}
            />
        );
    }

    // In waiting phase - show waiting room
    if (room.phase === "waiting") {
        return (
            <MiniGameWaitingRoom
                roomCode={room.room_code}
                playerName={gameConfig?.playerName || "Player"}
                playerAvatar={gameConfig?.playerAvatar || "🐼"}
                isHost={isPlayer1}
                hasOpponent={hasOpponent}
                opponentName={isPlayer1 ? room.player2_name : room.player1_name}
                opponentAvatar={isPlayer1 ? room.player2_avatar : room.player1_avatar}
                onLeave={handleLeave}
                onStartGame={handleStartGame}
            />
        );
    }

    // Playing - show game screen
    if (room.phase === "playing" || room.phase === "reveal" || room.phase === "results") {
        return (
            <FlagGameScreen
                config={{
                    playerName: gameConfig?.playerName || "Player",
                    playerAvatar: gameConfig?.playerAvatar || "🐼",
                    cardCount: room.card_count,
                    roomCode: room.room_code,
                }}
                roomId={roomId || room.id}
                isPlayer1={isPlayer1}
                opponentName={isPlayer1 ? room.player2_name : room.player1_name}
                opponentAvatar={isPlayer1 ? room.player2_avatar : room.player1_avatar}
                onLeave={handleLeave}
            />
        );
    }

    // Game ended
    return (
        <div className="fixed inset-0 bg-background z-50 flex items-center justify-center p-6">
            <div className="game-card max-w-md w-full text-center">
                <h2 className="text-2xl font-display font-bold mb-4">Game Ended</h2>
                <p className="text-muted-foreground mb-6">Thanks for playing!</p>
                <button
                    onClick={handleLeave}
                    className="btn-game w-full"
                >
                    Back to Home
                </button>
            </div>
        </div>
    );
}
