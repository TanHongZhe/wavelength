"use client";

import { useState } from "react";
import { Lock } from "lucide-react";
import { useQuery } from "convex/react";
import { api } from "convex/_generated/api";
import { DeckType, DECKS } from "./cards";
import { MiniGameSetup, MiniGameWaitingRoom } from "../shared";
import { WhosMostLikelyGameScreen } from "./WhosMostLikelyGameScreen";
import { useWhosMostLikelyRoom } from "./useWhosMostLikelyRoom";

import { GameConfig } from "./types";

interface WhosMostLikelyGameEngineProps {
    onClose: () => void;
    initialMode?: "initial" | "create" | "join";
}

export function WhosMostLikelyGameEngine({ onClose, initialMode = "initial" }: WhosMostLikelyGameEngineProps) {
    const [gameConfig, setGameConfig] = useState<GameConfig | null>(null);
    const [selectedDeck, setSelectedDeck] = useState<DeckType>("normal");
    const [selectedCardCount, setSelectedCardCount] = useState(5);

    const user = useQuery(api.rooms.getMyUser);
    const isPro = user?.isPro ?? false;

    const {
        room,
        roomId,
        convexRoom,
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
    } = useWhosMostLikelyRoom();

    // Handle game creation
    const handleCreateGame = async (playerName: string, avatar: string) => {
        setGameConfig({ playerName, playerAvatar: avatar, deckType: selectedDeck, cardCount: selectedCardCount });
        await createRoom(playerName, avatar, selectedDeck, selectedCardCount);
    };

    // Handle joining a game
    const handleJoinGame = async (playerName: string, avatar: string, roomCode: string) => {
        setGameConfig({ playerName, playerAvatar: avatar, deckType: "normal", cardCount: 20, roomCode });
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

    // Game-specific options for the setup screen (deck picker)
    const DeckPickerOptions = (
        <div className="space-y-4 mb-4">
            {/* Deck Selection */}
            <div>
                <label className="text-sm font-medium text-muted-foreground mb-2 block">
                    Choose a Deck
                </label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                    {(Object.keys(DECKS) as DeckType[])
                        .map((deckKey) => {
                            const isLocked = !isPro && deckKey !== "normal";
                            return (
                                <button
                                    key={deckKey}
                                    onClick={() => !isLocked && setSelectedDeck(deckKey)}
                                    disabled={isLocked}
                                    className={`p-3 rounded-lg border-2 transition-all relative overflow-hidden text-left h-full min-h-[120px] flex flex-col ${selectedDeck === deckKey
                                        ? "border-primary bg-primary/20"
                                        : isLocked
                                            ? "border-border/50 bg-muted/20 opacity-60 cursor-not-allowed"
                                            : "border-border hover:border-primary/50 bg-card hover:bg-secondary cursor-pointer"
                                        }`}
                                >
                                    <div className="flex justify-between items-start mb-2 w-full">
                                        <div className="text-2xl">{DECKS[deckKey].emoji}</div>
                                        {isLocked && <Lock className="w-4 h-4 text-orange-500" />}
                                    </div>
                                    <div className="text-sm font-medium mb-1">
                                        {DECKS[deckKey].name.replace(DECKS[deckKey].emoji, '').trim()}
                                    </div>
                                    <div className="text-xs text-muted-foreground line-clamp-2">
                                        {DECKS[deckKey].description}
                                    </div>
                                </button>
                            );
                        })}
                </div>
            </div>

            {/* Card Count Selection */}
            <div>
                <label className="text-sm font-medium text-muted-foreground mb-2 block">
                    Number of Rounds
                </label>
                <div className="space-y-2">
                    {[[5, 10, 20], [50, 100]].map((counts, i) => (
                        <div key={i} className={`grid gap-2 ${i === 0 ? "grid-cols-3" : "grid-cols-2"}`}>
                            {counts.map((count) => {
                                const isLocked = !isPro && count > 5;
                                return (
                                    <button
                                        key={count}
                                        disabled={isLocked}
                                        onClick={() => !isLocked && setSelectedCardCount(count)}
                                        className={`p-3 rounded-lg border-2 transition-all cursor-pointer relative ${selectedCardCount === count
                                            ? "border-primary bg-primary/20"
                                            : isLocked
                                                ? "border-border/50 bg-muted/20 opacity-60 cursor-not-allowed"
                                                : "border-border hover:border-primary/50 bg-card hover:bg-secondary"
                                            }`}
                                    >
                                        <div className="text-lg font-bold flex items-center justify-center gap-1">
                                            {count}
                                            {isLocked && <Lock className="w-3 h-3 text-orange-400" />}
                                        </div>
                                        <div className="text-xs text-muted-foreground">rounds</div>
                                    </button>
                                );
                            })}
                        </div>
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
                    <div className="text-2xl mb-2">⚡</div>
                    <p className="text-muted-foreground">Loading...</p>
                </div>
            </div>
        );
    }

    // No room yet - show setup
    if (!room) {
        return (
            <MiniGameSetup
                title="Rapid Fire: Who's Most Likely?"
                onCreateGame={handleCreateGame}
                onJoinGame={handleJoinGame}
                onClose={onClose}
                createGameOptions={DeckPickerOptions}
                isLoading={isLoading}
                error={error}
                initialMode={initialMode}
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

    // Playing - show game screen (including ended state so we can show leaderboard)
    if (room.phase === "playing" || room.phase === "reveal" || room.phase === "results" || room.phase === "ended") {
        return (
            <WhosMostLikelyGameScreen
                config={{
                    playerName: gameConfig?.playerName || "Player",
                    playerAvatar: gameConfig?.playerAvatar || "🐼",
                    deckType: room.deck_type,
                    cardCount: room.card_count,
                    roomCode: room.room_code,
                }}
                roomId={roomId || room.id}
                isPlayer1={isPlayer1}
                opponentName={isPlayer1 ? room.player2_name : room.player1_name}
                opponentAvatar={isPlayer1 ? room.player2_avatar : room.player1_avatar}
                onLeave={handleLeave}
                convexRoom={convexRoom as Record<string, unknown> | null | undefined}
            />
        );
    }

    // Game ended - default fallback
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
