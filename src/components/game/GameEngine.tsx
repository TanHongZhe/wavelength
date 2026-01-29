"use client";

import { useGameRoom } from "@/hooks/useGameRoom";
import { LandingScreen } from "./LandingScreen";
import { WaitingRoom } from "./WaitingRoom";
import { GameScreen } from "./GameScreen";
import { GameOverScreen } from "./GameOverScreen";

/**
 * GameEngine - Client Component
 * 
 * This component encapsulates all the interactive game logic including:
 * - Real-time Supabase connection
 * - Room creation and joining
 * - Game state management
 * - Player synchronization
 * 
 * It is lazy-loaded into the SSG page to enable a hybrid architecture
 * where the landing page content is statically generated for SEO,
 * but the game itself runs client-side.
 */
export function GameEngine() {
    const {
        room,
        playerId,
        isPsychic,
        isGuesser,
        isGameFinished,
        isLoading,
        error,
        authInitialized,
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
        startGame,
        leaveRoom,
    } = useGameRoom();

    // No room - show landing
    if (!room) {
        return (
            <LandingScreen
                onCreateRoom={createRoom}
                onJoinRoom={joinRoom}
                isLoading={isLoading || !authInitialized}
                error={error}
            />
        );
    }

    // Game finished - show leaderboard
    if (isGameFinished) {
        return (
            <GameOverScreen
                room={room}
                playerId={playerId}
                onLeave={leaveRoom}
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
                onLeave={leaveRoom}
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
            onAngleChange={updateGuessAngle}
            onSubmitClue={submitClue}
            onSkipClue={skipClue}
            onFinalizeGuess={finalizeGuess}
            onNextRound={nextRound}
            onUpdateScore={updateScore}
            onSetCustomCard={setCustomCard}
            onEndGame={endGame}
            onLeave={leaveRoom}
        />
    );
}
