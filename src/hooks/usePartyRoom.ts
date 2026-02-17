"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "convex/_generated/api";
import { Id } from "convex/_generated/dataModel";
import { generateRoomCode, generateRandomTarget, getRandomCard, calculatePoints, Card, DeckType } from "@/lib/gameData";
import { useUser } from "@clerk/nextjs";

export interface Room {
    id: string;
    room_code: string;
    target_angle: number;
    phase: "waiting" | "clue" | "guessing" | "revealed" | "ended";
    current_card: Card | null;
    round_number: number;
    clue: string | null;
    game_mode: "classic" | "party";
    psychic_id?: string;
}

export interface PartyPlayer {
    id: string;
    room_id: string;
    player_id: string;
    name: string;
    avatar: string;
    role: "psychic" | "guesser";
    score: number;
    guess_angle: number | null;
    locked_in: boolean;
}

export function usePartyRoom() {
    const { isSignedIn } = useUser();
    const [roomId, setRoomId] = useState<Id<"rooms"> | null>(null);
    const [playerId, setPlayerId] = useState<string>("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [authInitialized, setAuthInitialized] = useState(false);
    const [isGameFinished, setIsGameFinished] = useState(false);
    const [currentDeck, setCurrentDeck] = useState<DeckType>("fun");
    const [lastProcessedRound, setLastProcessedRound] = useState<number>(0);
    const resetInFlightRef = useRef(false);
    const scoredRoundsRef = useRef<Set<number>>(new Set());

    // Reactive Convex queries
    const convexRoom = useQuery(api.rooms.getRoom, roomId ? { roomId } : "skip");
    const convexPlayers = useQuery(api.rooms.getPartyPlayers, roomId ? { roomId } : "skip");

    // Mutations
    const createRoomMutation = useMutation(api.rooms.createRoom);
    const updateRoomMutation = useMutation(api.rooms.updateRoom);
    const addPartyPlayerMutation = useMutation(api.rooms.addPartyPlayer);
    const updatePartyPlayerMutation = useMutation(api.rooms.updatePartyPlayer);
    const removePartyPlayerMutation = useMutation(api.rooms.removePartyPlayer);
    const joinPartyRoomMutation = useMutation(api.rooms.joinPartyRoomByCode);

    // Convert to expected format
    const room: Room | null = convexRoom ? {
        id: convexRoom._id,
        room_code: convexRoom.room_code,
        target_angle: convexRoom.target_angle ?? 90,
        phase: convexRoom.phase as Room["phase"],
        current_card: convexRoom.current_card ?? null,
        round_number: convexRoom.round_number ?? 1,
        clue: convexRoom.clue ?? null,
        game_mode: (convexRoom.game_mode as "classic" | "party") || "classic",
        psychic_id: convexRoom.psychic_id,
    } : null;

    const players: PartyPlayer[] = convexPlayers ? convexPlayers.map((p: any) => ({
        id: p._id,
        room_id: p.room_id,
        player_id: p.player_id,
        name: p.name,
        avatar: p.avatar,
        role: p.role as "psychic" | "guesser",
        score: p.score,
        guess_angle: p.guess_angle ?? null,
        locked_in: p.locked_in,
    })) : [];

    const currentPlayer = players.find(p => p.player_id === playerId);
    const isPsychic = room?.psychic_id ? room.psychic_id === playerId : currentPlayer?.role === "psychic";
    const isGuesser = !isPsychic;

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

    // Check for game end
    useEffect(() => {
        if (room?.phase === "ended" && !isGameFinished) {
            setIsGameFinished(true);
        }
    }, [room?.phase, isGameFinished]);

    // SELF-RESET LOGIC — only runs when round_number actually changes
    // IMPORTANT: `players` is NOT in the dependency array to prevent feedback loops.
    // Every updatePartyPlayer triggers getPartyPlayers → new players array → re-trigger.
    useEffect(() => {
        if (!room || !roomId || !playerId) return;

        if (room.round_number > lastProcessedRound) {
            // Guard against duplicate calls while mutation is in-flight
            if (resetInFlightRef.current) return;
            resetInFlightRef.current = true;

            setLastProcessedRound(room.round_number);

            const newRole = (room.psychic_id === playerId) ? "psychic" : "guesser";

            updatePartyPlayerMutation({
                room_id: roomId,
                player_id: playerId,
                updates: {
                    role: newRole,
                    locked_in: false,
                    guess_angle: null,
                },
            })
                .catch(err => console.error("Error resetting player state:", err))
                .finally(() => { resetInFlightRef.current = false; });
        } else if (lastProcessedRound === 0 && room.round_number > 0) {
            setLastProcessedRound(room.round_number);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [room?.round_number, room?.psychic_id, roomId, playerId, lastProcessedRound, updatePartyPlayerMutation]);

    // CREATE PARTY ROOM
    const createPartyRoom = useCallback(async (name: string, avatar: string, deckType: DeckType = "fun") => {
        if (!playerId) { setError("Please wait..."); return; }

        if (!isSignedIn) {
            setError("Please log in to create a party game.");
            return;
        }

        setIsLoading(true);
        setError(null);
        setIsGameFinished(false);

        const roomCode = generateRoomCode();
        const targetAngle = generateRandomTarget();
        const card = getRandomCard(deckType);
        setCurrentDeck(deckType);

        try {
            const newRoomId = await createRoomMutation({
                room_code: roomCode,
                target_angle: targetAngle,
                current_card: card,
                phase: "waiting",
                game_mode: "party",
                deck_type: deckType,
                psychic_id: playerId,
                round_number: 1,
                ip_hash: playerId,
            });

            setRoomId(newRoomId);
            setLastProcessedRound(1);

            await addPartyPlayerMutation({
                room_id: newRoomId,
                player_id: playerId,
                name: name.trim(),
                avatar: avatar,
                role: "psychic",
                score: 0,
                locked_in: false,
            });

            setIsLoading(false);
        } catch (err: any) {
            console.error("Create error:", err);
            const msg = err.data?.message || err.message || "Failed to create party room";
            setError(msg);
            setIsLoading(false);
        }
    }, [playerId, createRoomMutation, addPartyPlayerMutation]);

    // JOIN PARTY ROOM - uses Convex mutation (atomic)
    const joinPartyRoom = useCallback(async (roomCode: string, name: string, avatar: string) => {
        if (!playerId) { setError("Please wait..."); return; }
        setIsLoading(true);
        setError(null);
        setIsGameFinished(false);

        try {
            const result = await joinPartyRoomMutation({
                roomCode: roomCode.toUpperCase(),
                playerId,
                playerName: name.trim(),
                playerAvatar: avatar,
            });

            if (result.error) {
                setError(result.error);
            } else if (result.roomId) {
                setRoomId(result.roomId);
                setLastProcessedRound(result.roundNumber || 1);
            }
        } catch (err) {
            console.error("Join error:", err);
            setError("Room not found");
        }
        setIsLoading(false);
    }, [playerId, joinPartyRoomMutation]);

    // GAME ACTIONS
    const startPartyGame = useCallback(async () => {
        if (!roomId) return;
        await updateRoomMutation({ roomId, updates: { phase: "clue" } });
    }, [roomId, updateRoomMutation]);

    const submitClue = useCallback(async (clue: string) => {
        if (!roomId) return;
        await updateRoomMutation({ roomId, updates: { clue: clue.trim(), phase: "guessing" } });
    }, [roomId, updateRoomMutation]);

    // Throttling for updateMyGuess (same pattern as Dial throttle)
    const guessLastUpdateRef = useRef(0);
    const guessTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    const updateMyGuess = useCallback(async (angle: number) => {
        if (!roomId || !currentPlayer || currentPlayer.locked_in) return;

        const now = Date.now();
        const timeSinceLast = now - guessLastUpdateRef.current;

        if (timeSinceLast >= 1000) {
            if (guessTimeoutRef.current) {
                clearTimeout(guessTimeoutRef.current);
                guessTimeoutRef.current = null;
            }
            updatePartyPlayerMutation({
                room_id: roomId,
                player_id: playerId,
                updates: { guess_angle: Math.round(angle) },
            }).catch(err => console.error("Error updating guess:", err));
            guessLastUpdateRef.current = now;
        } else {
            if (guessTimeoutRef.current) {
                clearTimeout(guessTimeoutRef.current);
            }
            const wait = 1000 - timeSinceLast;
            guessTimeoutRef.current = setTimeout(() => {
                updatePartyPlayerMutation({
                    room_id: roomId,
                    player_id: playerId,
                    updates: { guess_angle: Math.round(angle) },
                }).catch(err => console.error("Error updating guess:", err));
                guessLastUpdateRef.current = Date.now();
                guessTimeoutRef.current = null;
            }, wait);
        }
    }, [roomId, currentPlayer, playerId, updatePartyPlayerMutation]);

    // SCORING EFFECT — only runs when phase transitions to "revealed"
    // Uses a ref-based guard rather than depending on `currentPlayer` (which changes on every player update)
    useEffect(() => {
        if (!roomId || !room || !playerId) return;
        if (room.phase !== "revealed") return;

        // Guard: only score once per round
        const roundKey = room.round_number;
        if (scoredRoundsRef.current.has(roundKey)) return;

        // Need to read current player data from the latest convexPlayers snapshot
        const myPlayer = convexPlayers?.find((p: any) => p.player_id === playerId);
        if (!myPlayer || myPlayer.role !== "guesser" || myPlayer.guess_angle == null) return;

        scoredRoundsRef.current.add(roundKey);

        const points = calculatePoints(room.target_angle, myPlayer.guess_angle);
        const newScore = (myPlayer.score ?? 0) + points;

        updatePartyPlayerMutation({
            room_id: roomId,
            player_id: playerId,
            updates: { score: newScore },
        }).catch(err => console.error("Failed to update own score:", err));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [room?.phase, room?.round_number, room?.target_angle, roomId, playerId, updatePartyPlayerMutation]);

    const lockInGuess = useCallback(async (angle: number) => {
        if (!roomId || !currentPlayer) return;

        await updatePartyPlayerMutation({
            room_id: roomId,
            player_id: playerId,
            updates: {
                guess_angle: Math.round(angle),
                locked_in: true,
            },
        });

        // Check if everyone is locked in
        const guessingPlayers = players.filter(p => p.role === "guesser");
        const allLocked = guessingPlayers.every(p => p.player_id === playerId || p.locked_in);

        if (allLocked && guessingPlayers.length > 0) {
            await updateRoomMutation({ roomId, updates: { phase: "revealed" } });
        }
    }, [roomId, currentPlayer, playerId, players, updateRoomMutation, updatePartyPlayerMutation]);

    const nextRound = useCallback(async () => {
        if (!roomId || !players.length) return;

        try {
            // Find next psychic
            const sortedPlayers = [...players].sort((a, b) => a.id.localeCompare(b.id)); // Using unique DB ID for deterministic sort

            // Find current psychic index
            // We use 'room.psychic_id' if available, otherwise just use roles
            // Actually, we store psychic_id in room now

            // Wait, previous implementation logic:
            const currentPsychicId = room?.psychic_id;
            const currentPsychicIndex = sortedPlayers.findIndex(p => p.player_id === currentPsychicId);

            // Fallback if not found
            const safeIndex = currentPsychicIndex === -1 ? 0 : currentPsychicIndex;
            const nextPsychicIndex = (safeIndex + 1) % sortedPlayers.length;
            const nextPsychicId = sortedPlayers[nextPsychicIndex].player_id;

            const targetAngle = generateRandomTarget();
            const card = getRandomCard(currentDeck);

            await updateRoomMutation({
                roomId,
                updates: {
                    target_angle: targetAngle,
                    current_card: card,
                    phase: "clue",
                    clue: null,
                    round_number: (room?.round_number ?? 0) + 1,
                    psychic_id: nextPsychicId,
                },
                ip_hash: playerId,
            });
        } catch (err: any) {
            const msg = err.data?.message || err.message || "Failed to start next round";
            setError(msg);
        }
    }, [roomId, players, room?.round_number, room?.psychic_id, currentDeck, updateRoomMutation]);

    const setCustomCard = useCallback(async (left: string, right: string) => {
        if (!roomId) return;
        await updateRoomMutation({
            roomId,
            updates: { current_card: { left: left.trim(), right: right.trim() } },
        });
    }, [roomId, updateRoomMutation]);

    const changeCard = useCallback(async () => {
        if (!roomId) return;
        const newCard = getRandomCard(currentDeck);
        await updateRoomMutation({ roomId, updates: { current_card: newCard } });
    }, [roomId, currentDeck, updateRoomMutation]);

    const switchDeck = useCallback(async (deck: DeckType) => {
        setCurrentDeck(deck);
        if (!roomId) return;
        const newCard = getRandomCard(deck);
        await updateRoomMutation({ roomId, updates: { current_card: newCard } });
    }, [roomId, updateRoomMutation]);

    const endGame = useCallback(async () => {
        if (!roomId) return;
        await updateRoomMutation({ roomId, updates: { phase: "ended" } });
    }, [roomId, updateRoomMutation]);

    const leavePartyRoom = useCallback(async () => {
        if (roomId && currentPlayer) {
            await removePartyPlayerMutation({ room_id: roomId, player_id: playerId });
        }
        setRoomId(null);
        setIsGameFinished(false);
    }, [roomId, currentPlayer, playerId, removePartyPlayerMutation]);

    const clearError = useCallback(() => setError(null), []);

    return {
        room,
        players,
        currentPlayer,
        playerId,
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
    };
}
