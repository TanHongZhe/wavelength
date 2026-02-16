"use client";

import { useState } from "react";
import { Lock } from "lucide-react";
import { useQuery } from "convex/react";
import { api } from "convex/_generated/api";
import { DeckType, GENERAL_KNOWLEDGE_DECKS } from "./cards";
import { MiniGameSetup } from "../shared";
import { GeneralKnowledgeWaitingRoom } from "./GeneralKnowledgeWaitingRoom";
import { GeneralKnowledgeGameScreen } from "./GeneralKnowledgeGameScreen";
import { useGeneralKnowledgeRoom } from "./useGeneralKnowledgeRoom";

export interface GameConfig {
    playerName: string;
    playerAvatar: string;
    deckType: DeckType;
    cardCount: number;
    roomCode?: string;
}

interface GeneralKnowledgeGameEngineProps {
    onClose: () => void;
    initialMode?: "initial" | "create" | "join";
}

export function GeneralKnowledgeGameEngine({ onClose, initialMode = "initial" }: GeneralKnowledgeGameEngineProps) {
    const [gameConfig, setGameConfig] = useState<GameConfig | null>(null);
    const [selectedDeck, setSelectedDeck] = useState<DeckType>("classic");
    const [selectedCardCount, setSelectedCardCount] = useState(20);

    const user = useQuery(api.rooms.getMyUser);
    const isPro = user?.isPro ?? false;

    const {
        room,
        players,
        currentPlayer,
        isHost,
        isLoading,
        error,
        authInitialized,
        createRoom,
        joinRoom,
        startGame,
        nextRound,
        submitAnswer,
        revealAnswer,
        calculateScores,
        leaveRoom,
    } = useGeneralKnowledgeRoom();

    // Handle game creation
    const handleCreateGame = async (playerName: string, avatar: string) => {
        setGameConfig({ playerName, playerAvatar: avatar, deckType: selectedDeck, cardCount: selectedCardCount });
        await createRoom(playerName, avatar, selectedDeck, selectedCardCount);
    };

    // Handle joining a game
    const handleJoinGame = async (playerName: string, avatar: string, roomCode: string) => {
        setGameConfig({ playerName, playerAvatar: avatar, deckType: "classic", cardCount: 20, roomCode });
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
        await startGame(room?.deck_type || selectedDeck);
    };

    // Game-specific options for the setup screen (deck picker)
    const DeckPickerOptions = (
        <div className="space-y-4 mb-4">
            {/* Deck Selection */}
            <div>
                <label className="text-sm font-medium text-muted-foreground mb-2 block">
                    Choose a Deck
                </label>
                <div className="grid grid-cols-2 gap-2">
                    {(Object.keys(GENERAL_KNOWLEDGE_DECKS) as DeckType[])
                        // Sort so 'classic' is first? iterating object keys is not guaranteed order, but typically insertion order.
                        // Let's rely on map order being mostly okay or sort manually if needed.
                        .map((deckKey) => {
                            const isLocked = !isPro && deckKey !== "classic";
                            return (
                                <button
                                    key={deckKey}
                                    onClick={() => !isLocked && setSelectedDeck(deckKey)}
                                    disabled={isLocked}
                                    className={`p-3 rounded-lg border-2 transition-all relative overflow-hidden text-left ${selectedDeck === deckKey
                                        ? "border-primary bg-primary/20"
                                        : isLocked
                                            ? "border-border/50 bg-muted/20 opacity-60 cursor-not-allowed"
                                            : "border-border hover:border-primary/50 bg-card hover:bg-secondary cursor-pointer"
                                        }`}
                                >
                                    <div className="flex justify-between items-start mb-1">
                                        <div className="text-2xl">{GENERAL_KNOWLEDGE_DECKS[deckKey].emoji}</div>
                                        {isLocked && <Lock className="w-4 h-4 text-orange-500" />}
                                    </div>
                                    <div className="text-sm font-medium">
                                        {GENERAL_KNOWLEDGE_DECKS[deckKey].name}
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
                <div className="grid grid-cols-3 gap-2">
                    {[20, 50, 100].map((count) => {
                        const isLocked = !isPro && count > 20;
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

    // No room yet - show setup (skip initial screen, go directly to create/join)
    if (!room) {
        return (
            <MiniGameSetup
                title="Rapid Fire: General Knowledge"
                onCreateGame={handleCreateGame}
                onJoinGame={handleJoinGame}
                onClose={onClose}
                createGameOptions={DeckPickerOptions}
                isLoading={isLoading}
                error={error}
                initialMode={initialMode === "initial" ? "create" : initialMode}
            />
        );
    }

    // In waiting phase - show waiting room
    if (room.phase === "waiting") {
        return (
            <GeneralKnowledgeWaitingRoom
                roomCode={room.room_code}
                players={players}
                playerId={currentPlayer?.player_id || ""}
                isHost={isHost}
                onStartGame={handleStartGame}
                onLeave={handleLeave}
            />
        );
    }

    // Playing - show game screen
    // Note: ended phase also handled by GameScreen
    if (room.phase === "playing" || room.phase === "revealed" || room.phase === "ended") {
        return (
            <GeneralKnowledgeGameScreen
                room={room}
                players={players}
                currentPlayer={currentPlayer}
                isHost={isHost}
                deckType={room.deck_type || selectedDeck}
                onSubmitAnswer={submitAnswer}
                onReveal={revealAnswer}
                onNextRound={() => nextRound(room.deck_type || selectedDeck)}
                onCalculateScores={calculateScores}
                onLeave={handleLeave}
            />
        );
    }

    return null;
}
