"use client";

import { useState } from "react";
import { Lock, SlidersVertical } from "lucide-react";
import { useQuery } from "convex/react";
import { api } from "convex/_generated/api";
import { DeckType, DECKS } from "./cards";
import { GameConfig } from "./types";
import { useFantasySliderRoom } from "./useFantasySliderRoom";
import { MiniGameSetup, MiniGameWaitingRoom } from "../shared";
import { FantasySliderGameScreen } from "./FantasySliderGameScreen";

interface FantasySliderGameEngineProps {
    onClose: () => void;
    initialMode?: "initial" | "create" | "join";
}

export function FantasySliderGameEngine({ onClose, initialMode = "initial" }: FantasySliderGameEngineProps) {
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
    } = useFantasySliderRoom();

    const handleCreateGame = async (playerName: string, avatar: string) => {
        setGameConfig({ playerName, playerAvatar: avatar, deckType: selectedDeck, cardCount: selectedCardCount });
        await createRoom(playerName, avatar, selectedDeck, selectedCardCount);
    };

    const handleJoinGame = async (playerName: string, avatar: string, roomCode: string) => {
        setGameConfig({ playerName, playerAvatar: avatar, deckType: "normal", cardCount: 5, roomCode });
        await joinRoom(playerName, avatar, roomCode);
    };

    const handleStartGame = async () => {
        await startGame();
    };

    const handleLeave = () => {
        leaveRoom();
        setGameConfig(null);
        onClose();
    };

    const DeckPickerOptions = (
        <div className="space-y-4 mb-4">
            <div>
                <label className="text-sm font-medium text-muted-foreground mb-2 block">
                    Choose a Deck
                </label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {(Object.keys(DECKS) as DeckType[]).map((deckKey) => {
                        const isLocked = !isPro && deckKey === "lust";
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

            <div>
                <label className="text-sm font-medium text-muted-foreground mb-2 block">
                    Number of Rounds
                </label>
                <div className="grid grid-cols-3 gap-2">
                    {[5, 10, 20].map((count) => {
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
            </div>
        </div>
    );

    if (!authInitialized) {
        return (
            <div className="fixed inset-0 bg-background z-50 flex items-center justify-center">
                <div className="text-center animate-pulse">
                    <SlidersVertical className="w-8 h-8 mx-auto mb-2 text-primary" />
                    <p className="text-muted-foreground">Loading...</p>
                </div>
            </div>
        );
    }

    if (!room) {
        return (
            <MiniGameSetup
                title="Fantasy Slider"
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

    if (room.phase === "waiting") {
        return (
            <MiniGameWaitingRoom
                roomCode={room.room_code}
                isHost={isPlayer1}
                hasOpponent={hasOpponent}
                playerName={gameConfig?.playerName || "Player"}
                onLeave={handleLeave}
                onStartGame={handleStartGame}
            />
        );
    }

    return (
        <FantasySliderGameScreen
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
