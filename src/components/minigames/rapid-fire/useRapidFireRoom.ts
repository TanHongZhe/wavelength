"use client";

import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/lib/supabase/client";
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

export interface RapidFireRoom {
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

// Map room data from Supabase using the existing rooms table structure
// We reuse psychic_id as player1_id, guesser_id as player2_id
function parseRoomData(data: Record<string, unknown>): RapidFireRoom {
    return {
        id: data.id as string,
        room_code: data.room_code as string,
        player1_id: data.psychic_id as string | null,
        player2_id: data.guesser_id as string | null,
        player1_name: (data.player1_name as string) || "Player 1",
        player2_name: (data.player2_name as string) || "Player 2",
        player1_avatar: (data.player1_avatar as string) || "🐼",
        player2_avatar: (data.player2_avatar as string) || "🐯",
        deck_type: "couples" as DeckType, // Default for now
        card_count: 20, // Default for now
        current_round: (data.round_number as number) || 1,
        player1_score: (data.psychic_score as number) || 0,
        player2_score: (data.guesser_score as number) || 0,
        phase: (data.phase as string) === "waiting" ? "waiting" :
            (data.phase as string) === "clue" ? "playing" :
                (data.phase as string) === "ended" ? "ended" : "waiting",
    };
}

export function useRapidFireRoom() {
    const [room, setRoom] = useState<RapidFireRoom | null>(null);
    const [roomId, setRoomId] = useState<string | null>(null);
    const [playerId, setPlayerId] = useState<string>("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [authInitialized, setAuthInitialized] = useState(false);

    // Store local config since we can't store in DB without migration
    const [localConfig, setLocalConfig] = useState<{ deckType: DeckType; cardCount: number } | null>(null);

    // Initialize authentication
    useEffect(() => {
        const init = async () => {
            const { data: { session } } = await supabase.auth.getSession();

            if (session?.user) {
                setPlayerId(session.user.id);
                setAuthInitialized(true);
                return;
            }

            const { data } = await supabase.auth.signInAnonymously();
            if (data?.user) {
                setPlayerId(data.user.id);
            }
            setAuthInitialized(true);
        };
        init();
    }, []);

    // Polling for room updates (same as main game)
    useEffect(() => {
        if (!roomId) return;

        const poll = async () => {
            const { data } = await supabase
                .from("rooms")
                .select("*")
                .eq("id", roomId)
                .single();
            if (data) {
                const parsedRoom = parseRoomData(data as Record<string, unknown>);
                // Merge local config
                if (localConfig) {
                    parsedRoom.deck_type = localConfig.deckType;
                    parsedRoom.card_count = localConfig.cardCount;
                }
                setRoom(parsedRoom);
            }
        };

        poll();
        const interval = setInterval(poll, 1000);
        return () => clearInterval(interval);
    }, [roomId, localConfig]);

    // CREATE ROOM - uses existing rooms table
    const createRoom = useCallback(async (
        playerName: string,
        avatar: string,
        deckType: DeckType,
        cardCount: number
    ) => {
        if (!playerId) {
            setError("Please wait...");
            return;
        }

        if (!playerName.trim()) {
            setError("Please enter your name");
            return;
        }

        setIsLoading(true);
        setError(null);

        const roomCode = generateRoomCode();

        try {
            // Use existing rooms table structure
            const { data, error: err } = await supabase
                .from("rooms")
                .insert({
                    room_code: roomCode,
                    psychic_id: playerId, // reuse as player1_id
                    player1_name: playerName.trim(),
                    player1_avatar: avatar,
                    phase: "waiting",
                    target_angle: 90, // Required field
                    current_card: { left: "A", right: "B" }, // Required field
                    game_mode: "mini_rapid_fire", // Mark as mini game
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                } as any)
                .select()
                .single();

            setIsLoading(false);

            if (err) {
                console.error("Create error:", err);
                setError("Failed to create room");
                return;
            }

            if (data) {
                const newRoom = parseRoomData(data as Record<string, unknown>);
                newRoom.deck_type = deckType;
                newRoom.card_count = cardCount;
                setLocalConfig({ deckType, cardCount });
                setRoom(newRoom);
                setRoomId(newRoom.id);
            }
        } catch (e) {
            console.error("Create error:", e);
            setError("Failed to create room");
            setIsLoading(false);
        }
    }, [playerId]);

    // JOIN ROOM
    const joinRoom = useCallback(async (
        playerName: string,
        avatar: string,
        roomCode: string
    ) => {
        if (!playerId) {
            setError("Please wait...");
            return;
        }

        if (!playerName.trim()) {
            setError("Please enter your name");
            return;
        }

        if (!roomCode.trim() || roomCode.trim().length !== 4) {
            setError("Please enter a valid 4-letter code");
            return;
        }

        setIsLoading(true);
        setError(null);

        try {
            // Find the room
            const { data: roomData, error: findErr } = await supabase
                .from("rooms")
                .select("*")
                .eq("room_code", roomCode.toUpperCase())
                .eq("phase", "waiting")
                .single();

            if (findErr || !roomData) {
                setIsLoading(false);
                setError("Room not found or game already started");
                return;
            }

            const typedRoomData = roomData as Record<string, unknown>;

            // Check if already the creator
            if (typedRoomData.psychic_id === playerId) {
                const existingRoom = parseRoomData(typedRoomData);
                setRoom(existingRoom);
                setRoomId(existingRoom.id);
                setIsLoading(false);
                return;
            }

            // Check if room is full
            if (typedRoomData.guesser_id) {
                if (typedRoomData.guesser_id === playerId) {
                    const existingRoom = parseRoomData(typedRoomData);
                    setRoom(existingRoom);
                    setRoomId(existingRoom.id);
                    setIsLoading(false);
                    return;
                }
                setIsLoading(false);
                setError("Room is full");
                return;
            }

            // Join as player 2
            const { error: updateErr } = await supabase
                .from("rooms")
                .update({
                    guesser_id: playerId,
                    player2_name: playerName.trim(),
                    player2_avatar: avatar,
                } as Record<string, unknown>)
                .eq("id", typedRoomData.id as string);

            if (updateErr) {
                setIsLoading(false);
                setError("Failed to join room");
                return;
            }

            const joinedRoom = parseRoomData(typedRoomData);
            joinedRoom.player2_id = playerId;
            joinedRoom.player2_name = playerName.trim();
            joinedRoom.player2_avatar = avatar;
            setRoom(joinedRoom);
            setRoomId(joinedRoom.id as string);
            setIsLoading(false);
        } catch (e) {
            console.error("Join error:", e);
            setError("Failed to join room");
            setIsLoading(false);
        }
    }, [playerId]);

    // START GAME
    const startGame = useCallback(async () => {
        if (!roomId) return;
        await supabase
            .from("rooms")
            .update({ phase: "clue" }) // Use "clue" to represent "playing"
            .eq("id", roomId);
        setRoom(prev => prev ? { ...prev, phase: "playing" } : null);
    }, [roomId]);

    // LEAVE ROOM
    const leaveRoom = useCallback(async () => {
        if (roomId) {
            await supabase
                .from("rooms")
                .update({ phase: "ended" })
                .eq("id", roomId);
        }
        setRoomId(null);
        setRoom(null);
        setLocalConfig(null);
    }, [roomId]);

    return {
        room,
        roomId,
        playerId,
        isPlayer1: room?.player1_id === playerId,
        isPlayer2: room?.player2_id === playerId,
        hasOpponent: !!(room?.player1_id && room?.player2_id),
        isLoading,
        error,
        authInitialized,
        createRoom,
        joinRoom,
        startGame,
        leaveRoom,
    };
}
