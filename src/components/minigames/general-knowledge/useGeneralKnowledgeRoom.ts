"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "convex/_generated/api";
import { Id } from "convex/_generated/dataModel";
import { useUser } from "@clerk/nextjs";
import { DeckType, GENERAL_KNOWLEDGE_DECKS } from "./cards";

export interface Room {
    id: string;
    room_code: string;
    phase: "waiting" | "playing" | "revealed" | "ended";
    current_question?: {
        question: string;
        options: string[];
        answer: number;
    } | null;
    round_number: number;
    game_mode: "mini_general_knowledge";
    creator_id?: string;
    deck_type?: DeckType;
    card_count?: number;
}

export interface Player {
    id: string;
    room_id: string;
    player_id: string;
    name: string;
    avatar: string;
    role: "host" | "player";
    score: number;
    answer?: { round: number; choice: number } | null;
}

export function useGeneralKnowledgeRoom() {
    const { isSignedIn } = useUser();
    const [roomId, setRoomId] = useState<Id<"rooms"> | null>(null);
    const [playerId, setPlayerId] = useState<string>("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [authInitialized, setAuthInitialized] = useState(false);

    // Reactive Convex queries
    const convexRoom = useQuery(api.rooms.getRoom, roomId ? { roomId } : "skip");
    const convexPlayers = useQuery(api.rooms.getPartyPlayers, roomId ? { roomId } : "skip");

    // Mutations
    const createRoomMutation = useMutation(api.rooms.createRoom);
    const updateRoomMutation = useMutation(api.rooms.updateRoom);
    const addPartyPlayerMutation = useMutation(api.rooms.addPartyPlayer);
    const updatePartyPlayerMutation = useMutation(api.rooms.updatePartyPlayer);
    const removePartyPlayerMutation = useMutation(api.rooms.removePartyPlayer);
    const joinRoomMutation = useMutation(api.rooms.joinGeneralKnowledgeRoom);

    // Derived State
    const room: Room | null = convexRoom ? {
        id: convexRoom._id,
        room_code: convexRoom.room_code,
        phase: convexRoom.phase as Room["phase"],
        current_question: convexRoom.current_question ?? null,
        round_number: convexRoom.round_number ?? 1,
        game_mode: (convexRoom.game_mode as "mini_general_knowledge") || "mini_general_knowledge",
        creator_id: convexRoom.creator_id,
        deck_type: convexRoom.deck_type as DeckType | undefined,
        card_count: convexRoom.card_count,
    } : null;

    const players: Player[] = convexPlayers ? convexPlayers.map((p: any) => ({
        id: p._id,
        room_id: p.room_id,
        player_id: p.player_id,
        name: p.name,
        avatar: p.avatar,
        role: p.role as "host" | "player",
        score: p.score,
        answer: p.answer,
    })) : [];

    const currentPlayer = players.find(p => p.player_id === playerId);
    // Host is implicitly the creator or the first player who created the room
    const isHost = currentPlayer?.role === "host";

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

    // Seed-based shuffled question indices to prevent repetition
    const usedQuestionsRef = useRef<Map<string, number[]>>(new Map());

    const getRandomQuestion = (deckType: DeckType) => {
        const deck = GENERAL_KNOWLEDGE_DECKS[deckType] || GENERAL_KNOWLEDGE_DECKS["classic"];
        const totalCards = deck.cards.length;

        // Get or create the list of available indices for this deck
        if (!usedQuestionsRef.current.has(deckType)) {
            // Create a shuffled array of all indices
            const indices = Array.from({ length: totalCards }, (_, i) => i);
            // Fisher-Yates shuffle
            for (let i = indices.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [indices[i], indices[j]] = [indices[j], indices[i]];
            }
            usedQuestionsRef.current.set(deckType, indices);
        }

        const availableIndices = usedQuestionsRef.current.get(deckType)!;

        // If we've used all questions, reshuffle
        if (availableIndices.length === 0) {
            const indices = Array.from({ length: totalCards }, (_, i) => i);
            for (let i = indices.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [indices[i], indices[j]] = [indices[j], indices[i]];
            }
            usedQuestionsRef.current.set(deckType, indices);
        }

        // Pop the next question index
        const nextIndex = usedQuestionsRef.current.get(deckType)!.pop()!;
        return deck.cards[nextIndex];
    };

    // Actions
    const createRoom = useCallback(async (name: string, avatar: string, deckType: DeckType = "classic", cardCount: number = 20) => {
        if (!playerId) return;
        setIsLoading(true);
        setError(null);

        try {
            // Generate Room Code
            const roomCode = Math.random().toString(36).substring(2, 6).toUpperCase();

            const newRoomId = await createRoomMutation({
                room_code: roomCode,
                phase: "waiting",
                game_mode: "mini_general_knowledge",
                round_number: 1,
                deck_type: deckType,
                card_count: cardCount,
            });

            setRoomId(newRoomId);

            // Add Host
            await addPartyPlayerMutation({
                room_id: newRoomId,
                player_id: playerId,
                name: name,
                avatar: avatar,
                role: "host",
                score: 0,
            });

        } catch (err: any) {
            setError(err.message || "Failed to create room");
        } finally {
            setIsLoading(false);
        }
    }, [playerId, createRoomMutation, addPartyPlayerMutation]);

    const joinRoom = useCallback(async (name: string, avatar: string, roomCode: string) => {
        if (!playerId) return;
        setIsLoading(true);
        setError(null);

        try {
            const result = await joinRoomMutation({
                roomCode,
                playerId,
                playerName: name,
                playerAvatar: avatar,
            });

            if (result.error) {
                setError(result.error);
            } else if (result.roomId) {
                setRoomId(result.roomId);
            }
        } catch (err: any) {
            setError("Room not found");
        } finally {
            setIsLoading(false);
        }
    }, [playerId, joinRoomMutation]);

    const startGame = useCallback(async (deckType: DeckType) => {
        if (!roomId) return;
        const question = getRandomQuestion(deckType);

        await updateRoomMutation({
            roomId,
            updates: {
                phase: "playing",
                current_question: question,
                round_number: 1,
            }
        });
    }, [roomId, updateRoomMutation]);

    const nextRound = useCallback(async (deckType: DeckType) => {
        if (!roomId || !room) return;

        const currentRound = room.round_number || 1;
        const maxRounds = room.card_count || 20;

        if (currentRound >= maxRounds) {
            await updateRoomMutation({
                roomId,
                updates: { phase: "ended" }
            });
            return;
        }

        const question = getRandomQuestion(deckType);

        // Reset all players' answers (optional, but good practice if state persists locally,
        // though backend persistence on `answer` field implies we should clear it)
        // Updating all players is expensive. We can just rely on `current_question` changing to reset UI,
        // but `answer` in DB will stick.
        // Better to clear answer in `updatePartyPlayer` when a player submits new guess, or here.
        // Ideally we'd have a `resetAnswers` mutation but for now let's just update room.
        // Actually, preventing re-using old answer is crucial.
        // We can just trust the `round_number` check in UI.

        await updateRoomMutation({
            roomId,
            updates: {
                phase: "playing",
                current_question: question,
                round_number: currentRound + 1,
            }
        });
    }, [roomId, room, updateRoomMutation]);

    const submitAnswer = useCallback(async (answerIndex: number) => {
        if (!roomId || !playerId || !room) return;
        await updatePartyPlayerMutation({
            room_id: roomId,
            player_id: playerId,
            updates: { answer: { round: room.round_number, choice: answerIndex } }
        });
    }, [roomId, playerId, room, updatePartyPlayerMutation]);

    const revealAnswer = useCallback(async () => {
        if (!roomId) return;
        await updateRoomMutation({
            roomId,
            updates: { phase: "revealed" }
        });
    }, [roomId, updateRoomMutation]);

    const calculateScores = useCallback(async () => {
        if (!roomId || !room?.current_question || !players) return;

        const correctAnswer = room.current_question.answer;

        // Iterate players and update scores
        // Only award points if they haven't been awarded for this round yet
        for (const p of players) {
            if (p.answer && p.answer.round === room.round_number && p.answer.choice === correctAnswer) {
                // Check if this player already has the correct score for this round
                // We'll increment by 1 point per correct answer
                const newScore = (p.score || 0) + 1;

                await updatePartyPlayerMutation({
                    room_id: roomId,
                    player_id: p.player_id,
                    updates: { score: newScore }
                });
            }
        }
    }, [roomId, room, players, updatePartyPlayerMutation]);

    const leaveRoom = useCallback(async () => {
        if (roomId && playerId) {
            await removePartyPlayerMutation({ room_id: roomId, player_id: playerId });
        }
        setRoomId(null);
    }, [roomId, playerId, removePartyPlayerMutation]);

    // Cleanup on unmount or explicit leave
    const clearError = () => setError(null);

    return {
        room,
        players,
        currentPlayer,
        isHost,
        isLoading,
        error,
        authInitialized,
        createRoom,
        joinRoom,
        startGame,
        nextRound,
        submitAnswer,
        revealAnswer,
        calculateScores,
        leaveRoom,
        clearError
    };
}
