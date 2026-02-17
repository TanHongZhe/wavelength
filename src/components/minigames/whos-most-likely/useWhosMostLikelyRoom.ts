"use client";

import { useState, useEffect, useCallback } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "convex/_generated/api";
import { Id } from "convex/_generated/dataModel";
import { DeckType } from "./cards";

// Generate 4-letter room code
function generateRoomCode(): string {
    const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ";
    let code = "";
    for (let i = 0; i < 4; i++) {
        code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return code;
}

export interface WhosMostLikelyRoom {
    id: string;
    room_code: string;
    player1_id: string | null;
    player2_id: string | null;
    player1_name: string;
    player2_name: string;
    player1_avatar: string;
    player2_avatar: string;
    deck_type: DeckType;
    card_count: number;
    current_round: number;
    player1_score: number;
    player2_score: number;
    phase: "waiting" | "playing" | "reveal" | "results" | "ended";
}

export function useWhosMostLikelyRoom() {
    const [roomId, setRoomId] = useState<Id<"rooms"> | null>(null);
    const [playerId, setPlayerId] = useState<string>("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [authInitialized, setAuthInitialized] = useState(false);

    // Reactive Convex query
    const convexRoom = useQuery(api.rooms.getRoom, roomId ? { roomId } : "skip");

    // Mutations
    const createRoomMutation = useMutation(api.rooms.createRoom);
    const updateRoomMutation = useMutation(api.rooms.updateRoom);
    const joinRoomMutation = useMutation(api.rooms.joinRoomByCode);

    // Convert to expected format
    const room: WhosMostLikelyRoom | null = convexRoom ? {
        id: convexRoom._id,
        room_code: convexRoom.room_code,
        player1_id: convexRoom.psychic_id ?? null,
        player2_id: convexRoom.guesser_id ?? null,
        player1_name: convexRoom.player1_name || "Player 1",
        player2_name: convexRoom.player2_name || "Player 2",
        player1_avatar: convexRoom.player1_avatar || "🐼",
        player2_avatar: convexRoom.player2_avatar || "🐯",
        deck_type: (convexRoom.deck_type as DeckType) || "normal",
        card_count: convexRoom.card_count || 20,
        current_round: convexRoom.round_number || 1,
        player1_score: convexRoom.psychic_score || 0,
        player2_score: convexRoom.guesser_score || 0,
        phase: (convexRoom.phase === "waiting" ? "waiting" :
            convexRoom.phase === "clue" ? "playing" :
                convexRoom.phase === "ended" ? "ended" : "waiting") as WhosMostLikelyRoom["phase"],
    } : null;

    // Initialize player ID
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

    // CREATE ROOM
    const createRoom = useCallback(async (
        playerName: string,
        avatar: string,
        deckType: DeckType,
        cardCount: number
    ) => {
        if (!playerId) { setError("Please wait..."); return; }
        if (!playerName.trim()) { setError("Please enter your name"); return; }

        setIsLoading(true);
        setError(null);

        const roomCode = generateRoomCode();

        try {
            const newRoomId = await createRoomMutation({
                room_code: roomCode,
                psychic_id: playerId,
                player1_name: playerName.trim(),
                player1_avatar: avatar,
                phase: "waiting",
                target_angle: 90,
                game_mode: "mini_whos_most_likely",
                card_count: cardCount,
                deck_type: deckType,
            });

            setRoomId(newRoomId);
            setIsLoading(false);
        } catch (e) {
            console.error("Create error:", e);
            setError("Failed to create room");
            setIsLoading(false);
        }
    }, [playerId, createRoomMutation]);

    // JOIN ROOM - uses Convex mutation (atomic)
    const joinRoom = useCallback(async (
        playerName: string,
        avatar: string,
        roomCode: string
    ) => {
        if (!playerId) { setError("Please wait..."); return; }
        if (!playerName.trim()) { setError("Please enter your name"); return; }
        if (!roomCode.trim() || roomCode.trim().length !== 4) {
            setError("Please enter a valid 4-letter code");
            return;
        }

        setIsLoading(true);
        setError(null);

        try {
            const result = await joinRoomMutation({
                roomCode: roomCode.toUpperCase(),
                playerId,
                playerName: playerName.trim(),
                playerAvatar: avatar,
                expectedGameMode: "mini_whos_most_likely",
            });

            if (result.error) {
                setError(result.error);
            } else if (result.roomId) {
                setRoomId(result.roomId);
            }
        } catch (e) {
            console.error("Join error:", e);
            setError("Failed to join room");
        }
        setIsLoading(false);
    }, [playerId, joinRoomMutation]);

    // START GAME
    const startGame = useCallback(async () => {
        if (!roomId) return;
        await updateRoomMutation({
            roomId,
            updates: { phase: "clue" },
        });
    }, [roomId, updateRoomMutation]);

    // LEAVE ROOM
    const leaveRoom = useCallback(async () => {
        if (roomId) {
            await updateRoomMutation({
                roomId,
                updates: { phase: "ended" },
            });
        }
        setRoomId(null);
    }, [roomId, updateRoomMutation]);

    return {
        room,
        roomId,
        convexRoom,
        playerId,
        isPlayer1: room?.player1_id === playerId,
        isPlayer2: room?.player2_id === playerId,
        hasOpponent: Boolean(room?.player2_id) || Boolean(convexRoom?.guesser_id),
        isLoading,
        error,
        authInitialized,
        createRoom,
        joinRoom,
        startGame,
        leaveRoom,
    };
}
