"use client";

import { useState, useEffect, useCallback } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "convex/_generated/api";
import { Id } from "convex/_generated/dataModel";
import { generateRoomCode, generateRandomTarget, getRandomCard, Card, DeckType } from "@/lib/gameData";

export interface Room {
    _id: Id<"rooms">;
    room_code: string;
    psychic_id: string | undefined;
    guesser_id: string | undefined;
    target_angle: number | undefined;
    guess_angle: number | undefined;
    phase: "waiting" | "clue" | "guessing" | "revealed" | "ended";
    current_card: Card | null | undefined;
    psychic_score: number | undefined;
    guesser_score: number | undefined;
    round_number: number | undefined;
    clue: string | null | undefined;
    player1_name: string | undefined;
    player2_name: string | undefined;
    player1_avatar: string | undefined;
    player2_avatar: string | undefined;
}

export function useConvexGameRoom() {
    const [roomId, setRoomId] = useState<Id<"rooms"> | null>(null);
    const [playerId, setPlayerId] = useState<string>("");
    const [playerName, setPlayerName] = useState<string>("");
    const [player1Id, setPlayer1Id] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [authInitialized, setAuthInitialized] = useState(false);
    const [isGameFinished, setIsGameFinished] = useState(false);
    const [currentDeck, setCurrentDeck] = useState<DeckType>("fun");

    // Reactive query - automatically updates!
    const room = useQuery(api.rooms.getRoom, roomId ? { roomId } : "skip") as Room | null | undefined;

    // Mutations
    const createRoomMutation = useMutation(api.rooms.createRoom);
    const updateRoomMutation = useMutation(api.rooms.updateRoom);

    // Initialize player ID (stored in localStorage)
    useEffect(() => {
        const storedId = localStorage.getItem("wavelength_player_id");
        if (storedId) {
            setPlayerId(storedId);
            setAuthInitialized(true);
        } else {
            const newId = `player_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
            localStorage.setItem("wavelength_player_id", newId);
            setPlayerId(newId);
            setAuthInitialized(true);
        }
    }, []);

    // Sync game finished state
    useEffect(() => {
        if (room?.phase === "ended" && !isGameFinished) {
            setIsGameFinished(true);
        }
    }, [room?.phase, isGameFinished]);

    // CREATE ROOM
    const createRoom = useCallback(async (name: string, avatar: string) => {
        if (!playerId) {
            setError("Please wait...");
            return;
        }

        if (!name.trim()) {
            setError("Please enter your name");
            return;
        }

        setIsLoading(true);
        setError(null);
        const trimmedName = name.trim();
        setPlayerName(trimmedName);
        setPlayer1Id(playerId);
        setIsGameFinished(false);

        const roomCode = generateRoomCode();
        const targetAngle = generateRandomTarget();
        const card = getRandomCard("random");

        try {
            const newRoomId = await createRoomMutation({
                room_code: roomCode,
                psychic_id: playerId,
                target_angle: targetAngle,
                current_card: card,
                phase: "waiting",
                player1_name: trimmedName,
                player1_avatar: avatar,
                game_mode: "classic",
            });

            setRoomId(newRoomId);
            setIsLoading(false);
        } catch (err) {
            console.error("Create error:", err);
            setError("Failed to create room");
            setIsLoading(false);
        }
    }, [playerId, createRoomMutation]);

    // JOIN ROOM
    const joinRoom = useCallback(async (roomCode: string, name: string, avatar: string) => {
        if (!playerId) {
            setError("Please wait...");
            return;
        }

        if (!name.trim()) {
            setError("Please enter your name");
            return;
        }

        setIsLoading(true);
        setError(null);
        const trimmedName = name.trim();
        setPlayerName(trimmedName);
        setIsGameFinished(false);

        try {
            // This will be handled differently - we'll need to fetch first, then join
            // For now, showing the pattern
            setError("Join functionality being implemented");
            setIsLoading(false);
        } catch (err) {
            console.error("Join error:", err);
            setError("Failed to join room");
            setIsLoading(false);
        }
    }, [playerId]);

    // Game actions using mutations
    const updateGuessAngle = useCallback(async (angle: number) => {
        if (!roomId) return;
        await updateRoomMutation({
            roomId,
            updates: { guess_angle: Math.round(angle) },
        });
    }, [roomId, updateRoomMutation]);

    const submitClue = useCallback(async (clue: string) => {
        if (!roomId) return;
        await updateRoomMutation({
            roomId,
            updates: { clue: clue.trim(), phase: "guessing" },
        });
    }, [roomId, updateRoomMutation]);

    const skipClue = useCallback(async () => {
        if (!roomId) return;
        await updateRoomMutation({
            roomId,
            updates: { clue: "(verbal clue)", phase: "guessing" },
        });
    }, [roomId, updateRoomMutation]);

    const finalizeGuess = useCallback(async (finalAngle: number) => {
        if (!roomId) return;
        await updateRoomMutation({
            roomId,
            updates: {
                phase: "revealed",
                guess_angle: Math.round(finalAngle),
            },
        });
    }, [roomId, updateRoomMutation]);

    const nextRound = useCallback(async () => {
        if (!roomId || !room) return;

        const targetAngle = generateRandomTarget();
        const card = getRandomCard(currentDeck);

        await updateRoomMutation({
            roomId,
            updates: {
                psychic_id: room.guesser_id,
                guesser_id: room.psychic_id,
                target_angle: targetAngle,
                guess_angle: 90,
                current_card: card,
                phase: "clue",
                clue: null,
                round_number: (room.round_number ?? 1) + 1,
            },
        });
    }, [room, roomId, currentDeck, updateRoomMutation]);

    const updateScore = useCallback(async (points: number) => {
        if (!roomId || !room) return;

        const currentGuesserId = room.guesser_id;
        const guesserIsPlayer1 = currentGuesserId === player1Id;

        if (guesserIsPlayer1) {
            await updateRoomMutation({
                roomId,
                updates: {
                    psychic_score: (room.psychic_score ?? 0) + points,
                },
            });
        } else {
            await updateRoomMutation({
                roomId,
                updates: {
                    guesser_score: (room.guesser_score ?? 0) + points,
                },
            });
        }
    }, [room, roomId, player1Id, updateRoomMutation]);

    const endGame = useCallback(async () => {
        if (!roomId) return;
        setIsGameFinished(true);
        await updateRoomMutation({
            roomId,
            updates: { phase: "ended" },
        });
    }, [roomId, updateRoomMutation]);

    const setCustomCard = useCallback(async (left: string, right: string) => {
        if (!roomId) return;
        await updateRoomMutation({
            roomId,
            updates: {
                current_card: { left: left.trim(), right: right.trim() },
            },
        });
    }, [roomId, updateRoomMutation]);

    const changeCard = useCallback(async () => {
        if (!roomId) return;
        const newCard = getRandomCard(currentDeck);
        await updateRoomMutation({
            roomId,
            updates: {
                current_card: newCard,
            },
        });
    }, [roomId, currentDeck, updateRoomMutation]);

    const switchDeck = useCallback(async (deck: DeckType) => {
        setCurrentDeck(deck);
        if (!roomId) return;
        const newCard = getRandomCard(deck);
        await updateRoomMutation({
            roomId,
            updates: {
                current_card: newCard,
            },
        });
    }, [roomId, updateRoomMutation]);

    const startGame = useCallback(async () => {
        if (!roomId) return;
        await updateRoomMutation({
            roomId,
            updates: { phase: "clue" },
        });
    }, [roomId, updateRoomMutation]);

    const leaveRoom = useCallback(async () => {
        if (roomId) {
            await updateRoomMutation({
                roomId,
                updates: { phase: "ended" },
            });
        }
        setRoomId(null);
        setPlayer1Id(null);
        setPlayerName("");
        setIsGameFinished(false);
    }, [roomId, updateRoomMutation]);

    // Convert Convex room to expected format
    const convertedRoom = room ? {
        id: room._id,
        room_code: room.room_code,
        psychic_id: room.psychic_id ?? null,
        guesser_id: room.guesser_id ?? null,
        target_angle: room.target_angle ?? 90,
        guess_angle: room.guess_angle ?? 90,
        phase: room.phase,
        current_card: room.current_card ?? null,
        psychic_score: room.psychic_score ?? 0,
        guesser_score: room.guesser_score ?? 0,
        round_number: room.round_number ?? 1,
        clue: room.clue ?? null,
        player1_name: room.player1_name ?? "Player 1",
        player2_name: room.player2_name ?? "Player 2",
        player1_avatar: room.player1_avatar ?? "🐼",
        player2_avatar: room.player2_avatar ?? "🐯",
    } : null;

    return {
        room: convertedRoom,
        playerId,
        playerName,
        isPsychic: convertedRoom?.psychic_id === playerId,
        isGuesser: convertedRoom?.guesser_id === playerId,
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
    };
}
