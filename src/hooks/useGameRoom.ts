"use client";

import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/lib/supabase/client";
import { generateRoomCode, generateRandomTarget, getRandomCard, Card } from "@/lib/gameData";
import { Json } from "@/lib/supabase/types";

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
}

function parseCard(json: Json | null): Card | null {
    if (!json || typeof json !== "object" || Array.isArray(json)) return null;
    const obj = json as Record<string, unknown>;
    if (typeof obj.left === "string" && typeof obj.right === "string") {
        return { left: obj.left, right: obj.right };
    }
    return null;
}

function cardToJson(card: Card): Json {
    return { left: card.left, right: card.right };
}

function parseRoomData(data: Record<string, unknown>): Room {
    return {
        id: data.id as string,
        room_code: data.room_code as string,
        psychic_id: data.psychic_id as string | null,
        guesser_id: data.guesser_id as string | null,
        target_angle: (data.target_angle as number) ?? 90,
        guess_angle: (data.guess_angle as number) ?? 90,
        phase: data.phase as Room["phase"],
        current_card: parseCard(data.current_card as Json | null),
        psychic_score: (data.psychic_score as number) ?? 0,
        guesser_score: (data.guesser_score as number) ?? 0,
        round_number: (data.round_number as number) ?? 1,
        clue: data.clue as string | null,
        player1_name: (data.player1_name as string) || "Player 1",
        player2_name: (data.player2_name as string) || "Player 2",
        player1_avatar: (data.player1_avatar as string) || "🐼",
        player2_avatar: (data.player2_avatar as string) || "🐯",
    };
}

export function useGameRoom() {
    const [room, setRoom] = useState<Room | null>(null);
    const [roomId, setRoomId] = useState<string | null>(null);
    const [playerId, setPlayerId] = useState<string>("");
    const [playerName, setPlayerName] = useState<string>("");

    const [player1Id, setPlayer1Id] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [authInitialized, setAuthInitialized] = useState(false);
    const [isGameFinished, setIsGameFinished] = useState(false);

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

    // Sync game finished state from room phase
    useEffect(() => {
        if (room?.phase === "ended" && !isGameFinished) {
            setIsGameFinished(true);
        }
    }, [room?.phase, isGameFinished]);

    // Polling
    useEffect(() => {
        if (!roomId) return;

        const poll = async () => {
            const { data } = await supabase.from("rooms").select("*").eq("id", roomId).single();
            if (data) {
                setRoom(parseRoomData(data as Record<string, unknown>));
            }
        };

        poll();
        const interval = setInterval(poll, 1000);
        return () => clearInterval(interval);
    }, [roomId]);

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

        const { data, error: err } = await supabase
            .from("rooms")
            .insert({
                room_code: roomCode,
                psychic_id: playerId,
                target_angle: targetAngle,
                current_card: cardToJson(card),
                phase: "waiting",
                player1_name: trimmedName,
                player1_avatar: avatar,
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
            } as any)
            .select()
            .single();

        setIsLoading(false);

        if (err) {
            // Fallback for missing columns
            if (err.code === "PGRST204" || err.message.includes("player1_name") || err.message.includes("player1_avatar")) {
                // Try simple insert
                const { data: data2, error: err2 } = await supabase
                    .from("rooms")
                    .insert({
                        room_code: roomCode,
                        psychic_id: playerId,
                        target_angle: targetAngle,
                        current_card: cardToJson(card),
                        phase: "waiting",
                    })
                    .select()
                    .single();

                if (err2) {
                    console.error("Create error:", err2);
                    setError("Failed to create room");
                    return;
                }

                if (data2) {
                    const newRoom = parseRoomData(data2 as Record<string, unknown>);
                    newRoom.player1_name = trimmedName;
                    newRoom.player1_avatar = avatar;
                    setRoom(newRoom);
                    setRoomId(newRoom.id);
                }
                return;
            }

            console.error("Create error:", err);
            setError("Failed to create room");
            return;
        }

        if (data) {
            const newRoom = parseRoomData(data as Record<string, unknown>);
            setRoom(newRoom);
            setRoomId(newRoom.id);
        }
    }, [playerId]);

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

        const { data: roomData, error: findErr } = await supabase
            .from("rooms")
            .select("*")
            .eq("room_code", roomCode.toUpperCase())
            .single();

        if (findErr || !roomData) {
            setIsLoading(false);
            setError("Room not found");
            return;
        }

        // Check if already in room as creator
        if (roomData.psychic_id === playerId && !roomData.guesser_id) {

            setPlayer1Id(playerId);
            const existingRoom = parseRoomData(roomData as Record<string, unknown>);
            setRoom(existingRoom);
            setRoomId(existingRoom.id);
            setIsLoading(false);
            return;
        }

        // Already in room as guesser or room full
        if (roomData.guesser_id) {
            if (roomData.guesser_id === playerId) {

                setPlayer1Id(roomData.psychic_id);
                const existingRoom = parseRoomData(roomData as Record<string, unknown>);
                setRoom(existingRoom);
                setRoomId(existingRoom.id);
                setIsLoading(false);
                return;
            }
            setIsLoading(false);
            setError("Room is full");
            return;
        }

        // Join as Player 2

        setPlayer1Id(roomData.psychic_id);

        await supabase
            .from("rooms")
            .update({
                guesser_id: playerId,
                player2_name: trimmedName,
                player2_avatar: avatar,
            } as Record<string, unknown>)
            .eq("id", roomData.id);

        const joinedRoom = parseRoomData(roomData as Record<string, unknown>);
        joinedRoom.guesser_id = playerId;
        joinedRoom.player2_name = trimmedName;
        joinedRoom.player2_avatar = avatar;
        setRoom(joinedRoom);
        setRoomId(joinedRoom.id);
        setIsLoading(false);
    }, [playerId]);

    // Game actions
    const updateGuessAngle = useCallback(async (angle: number) => {
        if (!roomId) return;
        await supabase.from("rooms").update({ guess_angle: Math.round(angle) }).eq("id", roomId);
    }, [roomId]);

    const submitClue = useCallback(async (clue: string) => {
        if (!roomId) return;
        await supabase.from("rooms").update({ clue: clue.trim(), phase: "guessing" }).eq("id", roomId);
        setRoom(prev => prev ? { ...prev, clue: clue.trim(), phase: "guessing" } : null);
    }, [roomId]);

    const skipClue = useCallback(async () => {
        if (!roomId) return;
        await supabase.from("rooms").update({ clue: "(verbal clue)", phase: "guessing" }).eq("id", roomId);
        setRoom(prev => prev ? { ...prev, clue: "(verbal clue)", phase: "guessing" } : null);
    }, [roomId]);

    const finalizeGuess = useCallback(async (finalAngle: number) => {
        if (!roomId) return;
        await supabase.from("rooms").update({
            phase: "revealed",
            guess_angle: Math.round(finalAngle)
        }).eq("id", roomId);
        setRoom(prev => prev ? {
            ...prev,
            phase: "revealed",
            guess_angle: Math.round(finalAngle)
        } : null);
    }, [roomId]);

    const nextRound = useCallback(async (deck: "fun" | "spicy" | "random") => {
        if (!roomId || !room) return;

        const targetAngle = generateRandomTarget();
        const card = getRandomCard(deck);

        await supabase.from("rooms").update({
            psychic_id: room.guesser_id,
            guesser_id: room.psychic_id,
            target_angle: targetAngle,
            guess_angle: 90,
            current_card: cardToJson(card),
            phase: "clue",
            clue: null,
            round_number: room.round_number + 1,
        }).eq("id", roomId);

        setRoom(prev => prev ? {
            ...prev,
            psychic_id: room.guesser_id,
            guesser_id: room.psychic_id,
            target_angle: targetAngle,
            guess_angle: 90,
            current_card: card,
            phase: "clue",
            clue: null,
            round_number: room.round_number + 1,
        } : null);
    }, [room, roomId]);

    const updateScore = useCallback(async (points: number) => {
        if (!roomId || !room) return;

        const currentGuesserId = room.guesser_id;
        const guesserIsPlayer1 = currentGuesserId === player1Id;

        if (guesserIsPlayer1) {
            await supabase.from("rooms").update({
                psychic_score: room.psychic_score + points
            }).eq("id", roomId);
        } else {
            await supabase.from("rooms").update({
                guesser_score: room.guesser_score + points
            }).eq("id", roomId);
        }
    }, [room, roomId, player1Id]);

    const endGame = useCallback(async () => {
        if (!roomId) return;
        setIsGameFinished(true);
        await supabase.from("rooms").update({ phase: "ended" }).eq("id", roomId);
    }, [roomId]);

    const setCustomCard = useCallback(async (left: string, right: string) => {
        if (!roomId) return;
        await supabase.from("rooms").update({
            current_card: cardToJson({ left: left.trim(), right: right.trim() })
        }).eq("id", roomId);
    }, [roomId]);

    const startGame = useCallback(async () => {
        if (!roomId) return;
        await supabase.from("rooms").update({ phase: "clue" }).eq("id", roomId);
        setRoom(prev => prev ? { ...prev, phase: "clue" } : null);
    }, [roomId]);

    const leaveRoom = useCallback(async () => {
        if (roomId) {
            await supabase.from("rooms").update({ phase: "ended" }).eq("id", roomId);
        }
        setRoomId(null);
        setRoom(null);
        setPlayer1Id(null);

        setPlayerName("");
        setIsGameFinished(false);
    }, [roomId]);

    return {
        room,
        playerId,
        playerName,
        isPsychic: room?.psychic_id === playerId,
        isGuesser: room?.guesser_id === playerId,
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
    };
}
