"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "convex/_generated/api";
import { Id } from "convex/_generated/dataModel";
import { generateRoomCode, generateRandomTarget, getRandomCard, calculatePoints, Card, DeckType } from "@/lib/gameData";

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
    deck_type?: DeckType;
    max_rounds?: number;
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

    // Conditional player subscriptions to reduce function calls:
    // - During guessing phase, guessers only subscribe to their OWN player (1 document)
    //   instead of ALL players (N documents). This prevents N query re-executions
    //   every time any guesser moves their dial.
    // - Psychic always gets full player list (needs to see mini-dials).
    // - Non-guessing phases: everyone gets full list (for scores, sidebar, etc.)
    const isActivePsychic = convexRoom?.psychic_id === playerId;
    const isGuessingPhase = convexRoom?.phase === "guessing";
    const shouldSkipFullList = isGuessingPhase && !isActivePsychic;

    const convexPlayers = useQuery(
        api.rooms.getPartyPlayers,
        roomId && !shouldSkipFullList ? { roomId } : "skip"
    );
    const myConvexPlayer = useQuery(
        api.rooms.getPartyPlayer,
        roomId && playerId && shouldSkipFullList ? { roomId, playerId } : "skip"
    );

    // Cache last known full player list for when we skip
    const cachedPlayersRef = useRef<any[]>([]);
    useEffect(() => {
        if (convexPlayers && convexPlayers.length > 0) {
            cachedPlayersRef.current = convexPlayers;
        }
    }, [convexPlayers]);

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
        deck_type: convexRoom.deck_type as DeckType,
        max_rounds: convexRoom.max_rounds,
    } : null;

    // Build player array from full list or cached list + own fresh data
    const basePlayers = convexPlayers ?? cachedPlayersRef.current;
    const players: PartyPlayer[] = basePlayers.map((p: any) => {
        const mapped: PartyPlayer = {
            id: p._id,
            room_id: p.room_id,
            player_id: p.player_id,
            name: p.name,
            avatar: p.avatar,
            role: p.role as "psychic" | "guesser",
            score: p.score,
            guess_angle: p.guess_angle ?? null,
            locked_in: p.locked_in,
        };
        // During guessing phase, overlay own fresh data from single-doc query
        if (myConvexPlayer && p.player_id === playerId) {
            mapped.guess_angle = myConvexPlayer.guess_angle ?? null;
            mapped.locked_in = myConvexPlayer.locked_in;
            mapped.score = myConvexPlayer.score;
            mapped.role = myConvexPlayer.role as "psychic" | "guesser";
        }
        return mapped;
    });

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
    const createPartyRoom = useCallback(async (name: string, avatar: string, deckType: DeckType = "fun", maxRounds?: number) => {
        if (!playerId) { setError("Please wait..."); return; }

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
                max_rounds: maxRounds,
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
            // Handle specific ConvexError codes
            const errorData = err?.data;
            if (errorData === "DAILY_LIMIT_REACHED") {
                setError("You've reached your daily room limit (3/day). Upgrade to Pro for unlimited!");
            } else if (errorData === "GUEST_CANNOT_CREATE") {
                setError("Please sign in to create a room.");
            } else {
                const msg = err.data?.message || err.message || "Failed to create party room";
                setError(msg);
            }
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

    // updateMyGuess — simple pass-through, throttling is handled by the Dial component
    const updateMyGuess = useCallback(async (angle: number) => {
        if (!roomId || !currentPlayer || currentPlayer.locked_in) return;
        updatePartyPlayerMutation({
            room_id: roomId,
            player_id: playerId,
            updates: { guess_angle: Math.round(angle) },
        }).catch(err => console.error("Error updating guess:", err));
    }, [roomId, currentPlayer, playerId, updatePartyPlayerMutation]);

    // SCORING REMOVED - Handled by atomic mutation revealPartyRound

    // lockInGuess — server-side auto-reveal handles the "all locked in" check atomically
    const lockInGuess = useCallback(async (angle: number) => {
        if (!roomId || !currentPlayer || !room) return;

        await updatePartyPlayerMutation({
            room_id: roomId,
            player_id: playerId,
            updates: {
                guess_angle: Math.round(angle),
                locked_in: true,
            },
        });
        // Server automatically checks if all guessers are locked and triggers reveal + scoring
    }, [roomId, currentPlayer, playerId, room, updatePartyPlayerMutation]);

    const nextRound = useCallback(async () => {
        if (!roomId || !players.length) return;

        try {
            // Find next psychic
            const sortedPlayers = [...players].sort((a, b) => a.id.localeCompare(b.id)); // Using unique DB ID for deterministic sort

            // ... (psychic selection logic) ...
            const currentPsychicId = room?.psychic_id;
            const currentPsychicIndex = sortedPlayers.findIndex(p => p.player_id === currentPsychicId);

            // Fallback if not found
            const safeIndex = currentPsychicIndex === -1 ? 0 : currentPsychicIndex;
            const nextPsychicIndex = (safeIndex + 1) % sortedPlayers.length;
            const nextPsychicId = sortedPlayers[nextPsychicIndex].player_id;

            const targetAngle = generateRandomTarget();

            // Use Deck from ROOM STATE if available, otherwise currentDeck
            // This ensures all players use the deck set by the host
            // (Note: convexRoom from usePartyRoom isn't typed with deck_type exposed in hook currently,
            // but we can assume it might be there or fallback)
            const activeDeck = (room as any)?.deck_type || currentDeck;
            const card = getRandomCard(activeDeck);

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
    }, [roomId, players, room?.round_number, room?.psychic_id, room, currentDeck, updateRoomMutation]);

    // Sync currentDeck with room.deck_type from backend
    // This ensures that when the host changes the deck, all other players see the update
    useEffect(() => {
        if (room?.deck_type && room.deck_type !== currentDeck) {
            setCurrentDeck(room.deck_type);
        }
    }, [room?.deck_type, currentDeck]);

    const setCustomCard = useCallback(async (left: string, right: string) => {
        if (!roomId) return;
        await updateRoomMutation({
            roomId,
            updates: { current_card: { left: left.trim(), right: right.trim() } },
        });
    }, [roomId, updateRoomMutation]);

    const changeCard = useCallback(async () => {
        if (!roomId) return;
        // Use the deck stored in room state if available to ensure consistency
        const deckToUse = room?.deck_type || currentDeck;
        const newCard = getRandomCard(deckToUse);
        await updateRoomMutation({ roomId, updates: { current_card: newCard } });
    }, [roomId, currentDeck, room?.deck_type, updateRoomMutation]);

    const switchDeck = useCallback(async (deck: DeckType) => {
        setCurrentDeck(deck);
        if (!roomId) return;
        const newCard = getRandomCard(deck);
        await updateRoomMutation({
            roomId,
            updates: {
                current_card: newCard,
                deck_type: deck
            }
        });
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
