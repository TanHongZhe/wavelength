"use client";

import { useGameRoom } from "@/hooks/useGameRoom";
import { WaitingRoom } from "./WaitingRoom";
import { GameScreen } from "./GameScreen";
import { GameOverScreen } from "./GameOverScreen";
import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";

export function ClassicGameEngine({
    initialPlayerName,
    initialAvatar,
    initialRoomCode,
    isCreating,
    onLeave
}: {
    initialPlayerName: string,
    initialAvatar: string,
    initialRoomCode?: string,
    isCreating: boolean,
    onLeave: () => void
}) {
    const {
        room,
        playerId,
        isPsychic,
        isGuesser,
        isGameFinished,
        isLoading,
        error,
        authInitialized,
        currentDeck,
        createRoom,
        joinRoom,
        updateGuessAngle,
        submitClue,
        skipClue,
        finalizeGuess,
        nextRound,
        updateScore,
        endGame,
        setCustomCard,
        changeCard,
        switchDeck,
        startGame,
        leaveRoom,
    } = useGameRoom();

    const [hasInitialized, setHasInitialized] = useState(false);

    useEffect(() => {
        if (hasInitialized || !authInitialized) return;
        setHasInitialized(true);

        if (isCreating) {
            createRoom(initialPlayerName, initialAvatar);
        } else if (initialRoomCode) {
            joinRoom(initialRoomCode, initialPlayerName, initialAvatar);
        }
    }, [authInitialized, isCreating, initialRoomCode, initialPlayerName, initialAvatar, createRoom, joinRoom, hasInitialized]);

    const handleLeave = async () => {
        await leaveRoom();
        onLeave();
    }

    if (error) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[50vh] gap-4">
                <div className="text-destructive font-bold text-lg">{error}</div>
                <button onClick={() => window.location.reload()} className="btn-game">
                    Go Back
                </button>
            </div>
        );
    }

    if (isLoading || !room) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
                <span className="ml-2 font-medium text-muted-foreground">Connecting to Classic Game...</span>
            </div>
        );
    }

    // Game finished - show leaderboard
    if (isGameFinished) {
        return (
            <GameOverScreen
                room={room}
                playerId={playerId}
                onLeave={handleLeave}
            />
        );
    }

    // Waiting for opponent
    if (room.phase === "waiting") {
        return (
            <WaitingRoom
                roomCode={room.room_code}
                isPsychic={isPsychic}
                hasOpponent={!!room.guesser_id}
                onLeave={handleLeave}
                onStartGame={startGame}
            />
        );
    }

    // Game in progress
    return (
        <GameScreen
            room={room}
            isPsychic={isPsychic}
            isGuesser={isGuesser}
            currentDeck={currentDeck}
            onAngleChange={updateGuessAngle}
            onSubmitClue={submitClue}
            onSkipClue={skipClue}
            onFinalizeGuess={finalizeGuess}
            onNextRound={nextRound}
            onUpdateScore={updateScore}
            onSetCustomCard={setCustomCard}
            onChangeCard={changeCard}
            onSwitchDeck={switchDeck}
            onEndGame={endGame}
            onLeave={handleLeave}
        />
    );
}
