"use client";

import { useGameRoom } from "@/hooks/useGameRoom";
import { WaitingRoom } from "./WaitingRoom";
import { GameScreen } from "./GameScreen";
import { GameErrorScreen } from "./GameErrorScreen";
import { GameOverScreen } from "./GameOverScreen";
import { useEffect, useState } from "react";
import { Loader2, LogIn } from "lucide-react";
import { PaywallModal } from "../PaywallModal";
import { SignInButton } from "@clerk/nextjs";

export function ClassicGameEngine({
    initialPlayerName,
    initialAvatar,
    initialRoomCode,
    initialDeckType,
    isCreating,
    onLeave
}: {
    initialPlayerName: string,
    initialAvatar: string,
    initialRoomCode?: string,
    initialDeckType?: any, // Using any to avoid circular dependency issues if DeckType isn't exported here, but better to import it
    isCreating: boolean,
    onLeave: () => void
}) {
    // ...
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
        clearError,
    } = useGameRoom();

    const [hasInitialized, setHasInitialized] = useState(false);

    useEffect(() => {
        if (hasInitialized || !authInitialized) return;
        setHasInitialized(true);

        if (isCreating) {
            createRoom(initialPlayerName, initialAvatar, initialDeckType || "fun");
        } else if (initialRoomCode) {
            joinRoom(initialRoomCode, initialPlayerName, initialAvatar);
        }
    }, [authInitialized, isCreating, initialRoomCode, initialPlayerName, initialAvatar, createRoom, joinRoom, hasInitialized]);

    const handleLeave = async () => {
        await leaveRoom();
        onLeave();
    }

    const isPaywallError = error && (error.toLowerCase().includes("subscribe") || error.toLowerCase().includes("limit"));

    if (error && !isPaywallError) {
        return <GameErrorScreen error={error} onLeave={onLeave} playerId={playerId} />;
    }

    // Logic for loading state: 
    // If loading, OR if we are supposed to be creating/joining but haven't got a room yet, show loader.
    if ((isLoading || isCreating || initialRoomCode) && !room && !error && !isPaywallError) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
                <span className="ml-2 font-medium text-muted-foreground">Connecting to Classic Game...</span>
            </div>
        );
    }

    return (
        <>
            <PaywallModal isOpen={!!isPaywallError} onClose={clearError} message={error ?? undefined} />

            {!room ? (
                <div className="flex flex-col items-center justify-center min-h-[50vh] gap-4">
                    <div className="text-muted-foreground font-medium">Please upgrade to continue or try again.</div>
                    <button onClick={() => window.location.reload()} className="btn-game">
                        Reload
                    </button>
                </div>
            ) : isGameFinished ? (
                <GameOverScreen
                    room={room}
                    playerId={playerId}
                    onLeave={handleLeave}
                />
            ) : room.phase === "waiting" ? (
                <WaitingRoom
                    roomCode={room.room_code}
                    isPsychic={isPsychic}
                    hasOpponent={!!room.guesser_id}
                    onLeave={handleLeave}
                    onStartGame={startGame}
                />
            ) : (
                <GameScreen
                    room={room}
                    playerId={playerId} // Added this prop likely needed in GameScreen
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
                    onEndGame={endGame}
                    onLeave={handleLeave}
                />
            )}
        </>
    );
}
