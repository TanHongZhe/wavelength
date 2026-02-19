"use client";

import { useState, useEffect } from "react";
import { usePartyRoom } from "@/hooks/usePartyRoom";
import { PartyWaitingRoom } from "./PartyWaitingRoom";
import { PartyGameScreen } from "./PartyGameScreen";
import { GameErrorScreen } from "../GameErrorScreen";
import { Loader2 } from "lucide-react";
import { PaywallModal } from "../../PaywallModal";

export function PartyGameEngine({
    initialPlayerName,
    initialAvatar,
    initialRoomCode,
    initialDeckType,
    initialMaxRounds,
    isCreating,
    onLeave
}: {
    initialPlayerName: string,
    initialAvatar: string,
    initialRoomCode?: string,
    initialDeckType?: any,
    initialMaxRounds?: number,
    isCreating: boolean,
    onLeave: () => void
}) {
    // ...
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
        leavePartyRoom,
        clearError,
    } = usePartyRoom();

    const [hasInitialized, setHasInitialized] = useState(false);

    useEffect(() => {
        if (hasInitialized || !authInitialized) return;
        setHasInitialized(true);

        if (isCreating) {
            createPartyRoom(initialPlayerName, initialAvatar, initialDeckType || "fun", initialMaxRounds);
        } else if (initialRoomCode) {
            joinPartyRoom(initialRoomCode, initialPlayerName, initialAvatar);
        }
    }, [authInitialized, isCreating, initialRoomCode, initialPlayerName, initialAvatar, createPartyRoom, joinPartyRoom, hasInitialized]);

    const handleLeave = async () => {
        await leavePartyRoom();
        onLeave();
    }

    const isPaywallError = error && (error.toLowerCase().includes("subscribe") || error.toLowerCase().includes("limit") || error.toLowerCase().includes("locked"));

    if (error && !isPaywallError) {
        return <GameErrorScreen error={error} onLeave={handleLeave} playerId={currentPlayer?.player_id || ""} />;
    }

    if (isLoading || !room) {
        // Handle paywall error shown when no room exists, but handled by GameErrorScreen usually
        // But if isPaywallError is true, we want to show PaywallModal.
        if (isPaywallError) {
            return (
                <div className="flex flex-col items-center justify-center min-h-[50vh] gap-4">
                    <PaywallModal isOpen={true} onClose={clearError} message={error ?? undefined} />
                    <div className="text-muted-foreground font-medium">Please upgrade to continue.</div>
                    <button onClick={handleLeave} className="btn-game">Go Back</button>
                </div>
            )
        }

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
            <>
                <PaywallModal isOpen={!!isPaywallError} onClose={clearError} message={error ?? undefined} />
                <PartyWaitingRoom
                    roomCode={room.room_code}
                    players={players}
                    playerId={currentPlayer?.player_id || ""}
                    isHost={isPsychic} // First player (psychic) is host effectively
                    onStartGame={startPartyGame}
                    onLeave={handleLeave}
                />
            </>
        );
    }

    // GAME
    return (
        <>
            <PaywallModal isOpen={!!isPaywallError} onClose={clearError} message={error ?? undefined} />
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
        </>
    );
}
