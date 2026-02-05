"use client";

import { useState, useEffect } from "react";
import { usePartyRoom } from "@/hooks/usePartyRoom";
import { PartyWaitingRoom } from "./PartyWaitingRoom";
import { PartyGameScreen } from "./PartyGameScreen";
import { Loader2 } from "lucide-react";

export function PartyGameEngine({
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
        players,
        currentPlayer,
        isPsychic,
        isGuesser,
        isLoading,
        error,
        authInitialized,
        currentDeck,
        createPartyRoom,
        joinPartyRoom,
        startPartyGame,
        submitClue,
        updateMyGuess,
        lockInGuess,
        nextRound,
        setCustomCard,
        changeCard,
        switchDeck,
        endGame,
        leavePartyRoom
    } = usePartyRoom();

    const [hasInitialized, setHasInitialized] = useState(false);

    useEffect(() => {
        if (hasInitialized || !authInitialized) return;
        setHasInitialized(true);

        if (isCreating) {
            createPartyRoom(initialPlayerName, initialAvatar);
        } else if (initialRoomCode) {
            joinPartyRoom(initialRoomCode, initialPlayerName, initialAvatar);
        }
    }, [authInitialized, isCreating, initialRoomCode, initialPlayerName, initialAvatar, createPartyRoom, joinPartyRoom, hasInitialized]);

    const handleLeave = async () => {
        await leavePartyRoom();
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
                <span className="ml-2 font-medium text-muted-foreground">Connecting to Party...</span>
            </div>
        );
    }

    // WAITING
    if (room.phase === "waiting") {
        return (
            <PartyWaitingRoom
                roomCode={room.room_code}
                players={players}
                playerId={currentPlayer?.player_id || ""}
                isHost={isPsychic} // First player (psychic) is host effectively
                onStartGame={startPartyGame}
                onLeave={handleLeave}
            />
        );
    }

    // GAME
    return (
        <PartyGameScreen
            room={room}
            players={players}
            currentPlayer={currentPlayer}
            isPsychic={isPsychic}
            isGuesser={isGuesser}
            currentDeck={currentDeck}
            onUpdateMyGuess={updateMyGuess}
            onLockInGuess={lockInGuess}
            onSubmitClue={submitClue}
            onNextRound={nextRound}
            onSetCustomCard={setCustomCard}
            onChangeCard={changeCard}
            onSwitchDeck={switchDeck}
            onEndGame={endGame}
            onLeave={handleLeave}
        />
    );
}
