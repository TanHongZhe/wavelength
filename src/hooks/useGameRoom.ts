"use client";

import { useUser } from "@clerk/nextjs";
import { useState, useEffect, useCallback } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "convex/_generated/api";
import { Id } from "convex/_generated/dataModel";
import { generateRoomCode, generateRandomTarget, getRandomCard, Card, DeckType } from "@/lib/gameData";

export interface Room {
    id: string;
    room_code: string;
    psychic_id: string | null;
    guesser_id: string | null;
    target_angle: number;
    guess_angle: number;
    phase: "waiting" | "clue" | "guessing" | "revealed" | "ended";
    current_card: Card | null;
    psychic_score: number;
    guesser_score: number;
    round_number: number;
    clue: string | null;
    player1_name: string;
    player2_name: string;
    player1_avatar: string;
    player2_avatar: string;
    creator_id?: string;
    deck_type?: DeckType;
    max_rounds?: number;
}

export function useGameRoom() {
    const { user, isLoaded, isSignedIn } = useUser();
    const [roomId, setRoomId] = useState<Id<"rooms"> | null>(null);
    const [playerId, setPlayerId] = useState<string>("");
    const [playerName, setPlayerName] = useState<string>("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [authInitialized, setAuthInitialized] = useState(false);
    const [isGameFinished, setIsGameFinished] = useState(false);
    const [currentDeck, setCurrentDeck] = useState<DeckType>("fun");

    // Reactive Convex query - auto-updates via WebSocket!
    const convexRoom = useQuery(api.rooms.getRoom, roomId ? { roomId } : "skip");

    // Mutations
    const createRoomMutation = useMutation(api.rooms.createRoom);
    const updateRoomMutation = useMutation(api.rooms.updateRoom);
    const joinRoomMutation = useMutation(api.rooms.joinRoomByCode);

    // Convert Convex room to expected format
    const room: Room | null = convexRoom ? {
        id: convexRoom._id,
        room_code: convexRoom.room_code,
        psychic_id: convexRoom.psychic_id ?? null,
        guesser_id: convexRoom.guesser_id ?? null,
        target_angle: convexRoom.target_angle ?? 90,
        guess_angle: convexRoom.guess_angle ?? 90,
        phase: convexRoom.phase as Room["phase"],
        current_card: convexRoom.current_card ?? null,
        psychic_score: convexRoom.psychic_score ?? 0,
        guesser_score: convexRoom.guesser_score ?? 0,
        round_number: convexRoom.round_number ?? 1,
        clue: convexRoom.clue ?? null,
        player1_name: convexRoom.player1_name ?? "Player 1",
        player2_name: convexRoom.player2_name ?? "Player 2",
        player1_avatar: convexRoom.player1_avatar ?? "🐼",
        player2_avatar: convexRoom.player2_avatar ?? "🐯",
        creator_id: convexRoom.creator_id as string | undefined,
        deck_type: convexRoom.deck_type as DeckType | undefined,
        max_rounds: convexRoom.max_rounds,
    } : null;

    // Initialize player ID (Clerk or localStorage)
    useEffect(() => {
        if (!isLoaded) return;

        if (isSignedIn && user) {
            setPlayerId(user.id);
            setAuthInitialized(true);
        } else {
            const storedId = localStorage.getItem("wavelength_player_id");
            if (storedId) {
                setPlayerId(storedId);
            } else {
                const newId = `player_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
                localStorage.setItem("wavelength_player_id", newId);
                setPlayerId(newId);
            }
            setAuthInitialized(true);
        }
    }, [isLoaded, isSignedIn, user]);

    // Sync game finished state
    useEffect(() => {
        if (room?.phase === "ended" && !isGameFinished) {
            setIsGameFinished(true);
        }
    }, [room?.phase, isGameFinished]);

    // Sync local deck with room deck from backend
    useEffect(() => {
        if (room?.deck_type && room.deck_type !== currentDeck) {
            setCurrentDeck(room.deck_type);
        }
    }, [room?.deck_type, currentDeck]);

    // CREATE ROOM
    const createRoom = useCallback(async (name: string, avatar: string, deckType: DeckType = "fun", maxRounds?: number) => {
        if (!playerId) { setError("Please wait..."); return; }
        if (!name.trim()) { setError("Please enter your name"); return; }



        setIsLoading(true);
        setError(null);
        const trimmedName = name.trim();
        setPlayerName(trimmedName);
        setIsGameFinished(false);

        const roomCode = generateRoomCode();
        const targetAngle = generateRandomTarget();
        const card = getRandomCard(deckType);
        setCurrentDeck(deckType);

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
                deck_type: deckType,
                max_rounds: maxRounds,
                ip_hash: playerId,
            });
            setRoomId(newRoomId);
        } catch (err: any) {
            console.error("Create error:", err);
            // Handle specific ConvexError codes
            const errorData = err?.data;
            if (errorData === "DAILY_LIMIT_REACHED") {
                setError("You've reached your daily room limit (3/day). Upgrade to Pro for unlimited!");
            } else if (errorData === "GUEST_CANNOT_CREATE") {
                setError("Please sign in to create a room.");
            } else {
                const msg = err.data?.message || err.message || "Failed to create room";
                setError(msg);
            }
        }
        setIsLoading(false);
    }, [playerId, createRoomMutation]);

    // JOIN ROOM - uses Convex mutation (atomic: find + join)
    const joinRoom = useCallback(async (roomCode: string, name: string, avatar: string) => {
        if (!playerId) { setError("Please wait..."); return; }
        if (!name.trim()) { setError("Please enter your name"); return; }

        setIsLoading(true);
        setError(null);
        const trimmedName = name.trim();
        setPlayerName(trimmedName);
        setIsGameFinished(false);

        try {
            const result = await joinRoomMutation({
                roomCode: roomCode.toUpperCase(),
                playerId,
                playerName: trimmedName,
                playerAvatar: avatar,
                expectedGameMode: "classic",
            });

            if (result.error) {
                setError(result.error);
            } else if (result.roomId) {
                setRoomId(result.roomId);
            }
        } catch (err) {
            console.error("Join error:", err);
            setError("Room not found");
        }
        setIsLoading(false);
    }, [playerId, joinRoomMutation]);

    // Game actions
    const updateGuessAngle = useCallback(async (angle: number) => {
        if (!roomId) return;
        await updateRoomMutation({ roomId, updates: { guess_angle: Math.round(angle) } });
    }, [roomId, updateRoomMutation]);

    const submitClue = useCallback(async (clue: string) => {
        if (!roomId) return;
        await updateRoomMutation({ roomId, updates: { clue: clue.trim(), phase: "guessing" } });
    }, [roomId, updateRoomMutation]);

    const skipClue = useCallback(async () => {
        if (!roomId) return;
        await updateRoomMutation({ roomId, updates: { clue: "(verbal clue)", phase: "guessing" } });
    }, [roomId, updateRoomMutation]);

    const finalizeGuess = useCallback(async (finalAngle: number) => {
        if (!roomId) return;
        await updateRoomMutation({ roomId, updates: { phase: "revealed", guess_angle: Math.round(finalAngle) } });
    }, [roomId, updateRoomMutation]);

    const nextRound = useCallback(async () => {
        if (!roomId || !room) return;

        try {
            const targetAngle = generateRandomTarget();
            const deckToUse = room.deck_type || currentDeck;
            const card = getRandomCard(deckToUse);

            console.log("Calling nextRound, ID:", playerId);
            await updateRoomMutation({
                roomId,
                updates: {
                    psychic_id: room.guesser_id ?? undefined,
                    guesser_id: room.psychic_id ?? undefined,
                    target_angle: targetAngle,
                    guess_angle: 90,
                    current_card: card,
                    phase: "clue",
                    clue: null,
                    round_number: room.round_number + 1,
                },
                ip_hash: playerId,
            });
        } catch (err: any) {
            // Check for ConvexError data or message
            const msg = err.data?.message || err.message || "Failed to start next round";
            setError(msg);
        }
    }, [room, roomId, currentDeck, updateRoomMutation, playerId]);

    const updateScore = useCallback(async (points: number) => {
        if (!roomId || !room || !room.creator_id) return;

        // determine if the current guesser is player 1 (creator)
        const currentGuesserId = room.guesser_id ?? "";
        const guesserIsPlayer1 = currentGuesserId === room.creator_id || room.creator_id.includes(currentGuesserId) || currentGuesserId.includes(room.creator_id);

        if (guesserIsPlayer1) {
            await updateRoomMutation({ roomId, updates: { psychic_score: room.psychic_score + points } });
        } else {
            await updateRoomMutation({ roomId, updates: { guesser_score: room.guesser_score + points } });
        }
    }, [room, roomId, updateRoomMutation]);

    const endGame = useCallback(async () => {
        if (!roomId) return;
        setIsGameFinished(true);
        await updateRoomMutation({ roomId, updates: { phase: "ended" } });
    }, [roomId, updateRoomMutation]);

    const setCustomCard = useCallback(async (left: string, right: string) => {
        if (!roomId) return;
        await updateRoomMutation({ roomId, updates: { current_card: { left: left.trim(), right: right.trim() } } });
    }, [roomId, updateRoomMutation]);

    const changeCard = useCallback(async () => {
        if (!roomId) return;
        const deckToUse = room?.deck_type || currentDeck;
        const newCard = getRandomCard(deckToUse);
        await updateRoomMutation({ roomId, updates: { current_card: newCard } });
    }, [roomId, currentDeck, updateRoomMutation]);

    const switchDeck = useCallback(async (deck: DeckType) => {
        setCurrentDeck(deck);
        if (!roomId) return;
        const newCard = getRandomCard(deck);
        await updateRoomMutation({ roomId, updates: { current_card: newCard } });
    }, [roomId, updateRoomMutation]);

    const startGame = useCallback(async () => {
        if (!roomId) return;
        await updateRoomMutation({ roomId, updates: { phase: "clue" } });
    }, [roomId, updateRoomMutation]);

    const leaveRoom = useCallback(async () => {
        if (roomId) {
            await updateRoomMutation({ roomId, updates: { phase: "ended" } });
        }
        setRoomId(null);
        setPlayerName("");
        setIsGameFinished(false);
    }, [roomId, updateRoomMutation]);

    const clearError = useCallback(() => setError(null), []);

    const isPlayer1 = room?.creator_id ? (playerId === room.creator_id || room.creator_id.includes(playerId) || playerId.includes(room.creator_id)) : false;

    return {
        room,
        playerId,
        playerName,
        isPlayer1,
        isPsychic: room?.psychic_id === playerId,
        isGuesser: room?.guesser_id === playerId,
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
    };
}
