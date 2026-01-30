"use client";

import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/lib/supabase/client";
import { generateRoomCode, generateRandomTarget, getRandomCard, calculatePoints, Card } from "@/lib/gameData";
import { Json } from "@/lib/supabase/types";

// Re-using Room interface but we mainly care about common fields
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
    joined_at: string;
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
        target_angle: (data.target_angle as number) ?? 90,
        phase: data.phase as Room["phase"],
        current_card: parseCard(data.current_card as Json | null),
        round_number: (data.round_number as number) ?? 1,
        clue: data.clue as string | null,
        game_mode: (data.game_mode as "classic" | "party") || "classic",
        psychic_id: data.psychic_id as string | undefined, // Added psychic_id
    };
}

export function usePartyRoom() {
    const [room, setRoom] = useState<Room | null>(null);
    const [players, setPlayers] = useState<PartyPlayer[]>([]);
    const [roomId, setRoomId] = useState<string | null>(null);
    const [playerId, setPlayerId] = useState<string>("");

    // Status
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [authInitialized, setAuthInitialized] = useState(false);
    const [isGameFinished, setIsGameFinished] = useState(false);

    // Internal state to track round changes for self-reset
    const [lastProcessedRound, setLastProcessedRound] = useState<number>(0);

    // Derived state
    const currentPlayer = players.find(p => p.player_id === playerId);
    // Prefer room.psychic_id for truth, fallback to player role if not set
    const isPsychic = room?.psychic_id ? room.psychic_id === playerId : currentPlayer?.role === "psychic";
    const isGuesser = !isPsychic;

    // Initialize Auth
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

    // Polling Room & Players
    useEffect(() => {
        if (!roomId || isGameFinished) return;

        const poll = async () => {
            // Fetch Room
            const { data: roomData } = await supabase.from("rooms").select("*").eq("id", roomId).single();
            if (roomData) {
                setRoom(parseRoomData(roomData as Record<string, unknown>));
            }

            // Fetch Players
            const { data: playersData } = await supabase
                .from("party_players")
                .select("*")
                .eq("room_id", roomId)
                .order("joined_at", { ascending: true });

            if (playersData) {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                setPlayers(playersData as any as PartyPlayer[]);
            }
        };

        poll();
        const interval = setInterval(poll, 1000);
        return () => clearInterval(interval);
    }, [roomId, isGameFinished]);

    // Check for game end
    useEffect(() => {
        if (room?.phase === "ended" && !isGameFinished) {
            setIsGameFinished(true);
        }
    }, [room?.phase, isGameFinished]);

    // *** SELF-RESET LOGIC ***
    // When round number increases, each client resets THEIR OWN state.
    // This bypasses RLS issues where one user can't update others.
    useEffect(() => {
        if (!room || !roomId || !playerId) return;

        // If we see a new round number that is higher than what we last processed...
        if (room.round_number > lastProcessedRound) {
            // Update local tracker immediately to prevent double-firing
            setLastProcessedRound(room.round_number);

            // Only perform DB reset if we are actually in the room (have a player record)
            const myPlayer = players.find(p => p.player_id === playerId);
            if (myPlayer) {
                const newRole = (room.psychic_id === playerId) ? "psychic" : "guesser";

                // Reset my own state
                supabase.from("party_players").update({
                    role: newRole,
                    locked_in: false,
                    guess_angle: null
                }).eq("player_id", playerId).eq("room_id", roomId).then(({ error }) => {
                    if (error) console.error("Error resetting player state:", error);
                });
            }
        } else if (lastProcessedRound === 0 && room.round_number > 0) {
            // Initial sync on join
            setLastProcessedRound(room.round_number);
        }
    }, [room?.round_number, room?.psychic_id, roomId, playerId, players, lastProcessedRound]);


    // CREATE PARTY ROOM
    const createPartyRoom = useCallback(async (name: string, avatar: string) => {
        if (!playerId) { setError("Please wait..."); return; }
        setIsLoading(true);
        setError(null);
        setIsGameFinished(false);

        const roomCode = generateRoomCode();
        const targetAngle = generateRandomTarget();
        const card = getRandomCard("random");

        // 1. Create Room
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const { data: roomData, error: roomErr } = await supabase.from("rooms").insert({
            room_code: roomCode,
            target_angle: targetAngle,
            current_card: cardToJson(card),
            phase: "waiting",
            game_mode: "party",
            psychic_id: playerId,
            round_number: 1
        } as any).select().single();

        if (roomErr || !roomData) {
            console.error(roomErr);
            setError("Failed to create party room");
            setIsLoading(false);
            return;
        }

        const newRoom = parseRoomData(roomData as Record<string, unknown>);
        setRoomId(newRoom.id);
        setRoom(newRoom);
        setLastProcessedRound(1); // Set initial round

        // 2. Add Host as Player (Psychic)
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const { data: playerData, error: playerErr } = await supabase.from("party_players").insert({
            room_id: newRoom.id,
            player_id: playerId,
            name: name,
            avatar: avatar,
            role: "psychic",
            score: 0,
            locked_in: false,
            guess_angle: null
        } as any).select().single();

        if (playerErr) {
            console.error(playerErr);
            setError("Failed to join as host");
        } else if (playerData) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            setPlayers([playerData as any as PartyPlayer]);
        }

        setIsLoading(false);
    }, [playerId]);


    // JOIN PARTY ROOM
    const joinPartyRoom = useCallback(async (roomCode: string, name: string, avatar: string) => {
        if (!playerId) { setError("Please wait..."); return; }
        setIsLoading(true);
        setError(null);
        setIsGameFinished(false);

        // 1. Find Room
        const { data: roomData, error: findErr } = await supabase
            .from("rooms")
            .select("*")
            .eq("room_code", roomCode.toUpperCase())
            .single();

        if (findErr || !roomData) {
            setError("Room not found");
            setIsLoading(false);
            return;
        }

        // Check compatibility
        if (roomData.game_mode !== "party") {
            setError("This looks like a valid room, but it's not a Party Mode room!");
            setIsLoading(false);
            return;
        }

        const roomId = roomData.id;
        const currentRound = roomData.round_number || 1;
        setLastProcessedRound(currentRound); // Sync round number

        // 2. Check if already in
        const { data: existingPlayer } = await supabase
            .from("party_players")
            .select("*")
            .eq("room_id", roomId)
            .eq("player_id", playerId)
            .single();

        if (existingPlayer) {
            // Rejoining
            setRoomId(roomId);
            setRoom(parseRoomData(roomData as Record<string, unknown>));
            setIsLoading(false);
            return;
        }

        // 3. Join as Guesser
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        await supabase.from("party_players").insert({
            room_id: roomId,
            player_id: playerId,
            name: name,
            avatar: avatar,
            role: "guesser",
            score: 0,
            locked_in: false,
            guess_angle: null
        } as any);

        setRoomId(roomId);
        setRoom(parseRoomData(roomData as Record<string, unknown>));
        setIsLoading(false);
    }, [playerId]);


    // GAME ACTIONS

    const startPartyGame = useCallback(async () => {
        if (!roomId) return;
        await supabase.from("rooms").update({ phase: "clue" }).eq("id", roomId);
    }, [roomId]);

    const submitClue = useCallback(async (clue: string) => {
        if (!roomId) return;
        await supabase.from("rooms").update({ clue: clue.trim(), phase: "guessing" }).eq("id", roomId);
    }, [roomId]);

    const updateMyGuess = useCallback(async (angle: number) => {
        if (!roomId || !currentPlayer) return;
        // Don't update locked guesses
        if (currentPlayer.locked_in) return;

        // Optimistic update
        setPlayers(prev => prev.map(p =>
            p.player_id === playerId ? { ...p, guess_angle: angle } : p
        ));

        // DB Update
        await supabase.from("party_players").update({
            guess_angle: Math.round(angle)
        }).eq("player_id", playerId).eq("room_id", roomId);
    }, [roomId, currentPlayer, playerId]);

    // SCORING EFFECT
    // Each client calculates and updates their OWN score when phase updates to 'revealed'.
    // This bypasses RLS restrictions (users can only update themselves) and handles multi-tab testing via sessionStorage.
    useEffect(() => {
        if (!roomId || !currentPlayer || !room) return;

        // Only run if we are in the 'revealed' phase and I am a guesser who needs to score
        if (room.phase === "revealed" && currentPlayer.role === "guesser" && currentPlayer.guess_angle !== null) {
            const sessionKey = `wavelength_scored_${roomId}_${room.round_number}`;

            // Check if we already scored this round in this session
            if (sessionStorage.getItem(sessionKey)) return;

            // Mark as scored immediately to prevent double-fire
            sessionStorage.setItem(sessionKey, "true");

            // Calculate points
            const points = calculatePoints(room.target_angle, currentPlayer.guess_angle);

            // Update DB
            const newScore = (currentPlayer.score || 0) + points;

            supabase.from("party_players").update({
                score: newScore
            }).eq("player_id", playerId).eq("room_id", roomId).then(({ error }) => {
                if (error) {
                    console.error("Failed to update own score:", error);
                    // If failed, maybe clear session key to retry? 
                    // For now, let's leave it to prevent infinite loops.
                }
            });
        }
    }, [room?.phase, room?.round_number, roomId, playerId, currentPlayer?.guess_angle, room?.target_angle, currentPlayer?.role, currentPlayer?.score]);

    const lockInGuess = useCallback(async (angle: number) => {
        if (!roomId || !currentPlayer) return;

        // 1. Lock in for THIS player
        await supabase.from("party_players").update({
            guess_angle: Math.round(angle),
            locked_in: true
        }).eq("player_id", playerId).eq("room_id", roomId);

        // 2. Refresh state to check if everyone is done
        const { data: allPlayers } = await supabase
            .from("party_players")
            .select("player_id, role, locked_in")
            .eq("room_id", roomId);

        if (allPlayers) {
            const guessingPlayers = allPlayers.filter((p: any) => p.role === "guesser");

            const isEveryoneLocked = guessingPlayers.every((p: any) => {
                if (p.player_id === playerId) return true;
                return p.locked_in === true;
            });

            if (isEveryoneLocked && guessingPlayers.length > 0) {
                // ALL PLAYERS LOCKED
                // We simply update the phase. Each client will see 'revealed' and calculate their own score.
                await supabase.from("rooms").update({ phase: "revealed" }).eq("id", roomId);
            }
        }
    }, [roomId, currentPlayer, playerId]);

    const nextRound = useCallback(async (deck: "fun" | "spicy" | "random") => {
        if (!roomId || !players.length) return;

        // Determine next psychic
        const sortedPlayers = [...players].sort((a, b) => a.joined_at.localeCompare(b.joined_at));
        const currentPsychicIndex = sortedPlayers.findIndex(p => p.role === "psychic");
        // Safe check if index is -1
        const safeIndex = currentPsychicIndex === -1 ? 0 : currentPsychicIndex;
        const nextPsychicIndex = (safeIndex + 1) % sortedPlayers.length;
        const nextPsychicId = sortedPlayers[nextPsychicIndex].player_id;

        const targetAngle = generateRandomTarget();
        const card = getRandomCard(deck);

        // Only update ROOM. Each player will see 'round_number' increase and reset THEMSELVES.
        await supabase.from("rooms").update({
            target_angle: targetAngle,
            current_card: cardToJson(card),
            phase: "clue",
            clue: null,
            round_number: (room?.round_number ?? 0) + 1,
            psychic_id: nextPsychicId // Set the source of truth for psychic
        }).eq("id", roomId);

    }, [roomId, players, room?.round_number]);

    const setCustomCard = useCallback(async (left: string, right: string) => {
        if (!roomId) return;
        await supabase.from("rooms").update({
            current_card: cardToJson({ left: left.trim(), right: right.trim() })
        }).eq("id", roomId);
    }, [roomId]);

    const changeCard = useCallback(async (deck: "fun" | "spicy" | "random" = "random") => {
        if (!roomId) return;
        const newCard = getRandomCard(deck);
        await supabase.from("rooms").update({
            current_card: cardToJson(newCard)
        }).eq("id", roomId);
    }, [roomId]);

    const endGame = useCallback(async () => {
        if (!roomId) return;
        await supabase.from("rooms").update({ phase: "ended" }).eq("id", roomId);
    }, [roomId]);

    const leavePartyRoom = useCallback(async () => {
        if (roomId && currentPlayer) {
            // Maybe remove player from DB? Or just mark inactive?
            // For now, let's keep it simple: just clear local state.
            // Ideally we delete the record so they disappear from the list.
            await supabase.from("party_players").delete().eq("player_id", playerId).eq("room_id", roomId);

            // If no players left, maybe delete room? Supabase generic cleanup usually handles this.
        }
        setRoomId(null);
        setRoom(null);
        setPlayers([]);
        setIsGameFinished(false);
    }, [roomId, currentPlayer, playerId]);

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
        createPartyRoom,
        joinPartyRoom,
        startPartyGame,
        submitClue,
        updateMyGuess,
        lockInGuess,
        nextRound,
        setCustomCard,
        changeCard,
        endGame,
        leavePartyRoom
    };
}
