import { query, mutation } from "./_generated/server";
import { v } from "convex/values";
import { ConvexError } from "convex/values";

// Helper to get today's date in YYYY-MM-DD
function getTodayDate() {
    return new Date().toISOString().split("T")[0];
}

// ... queries ...

// Daily room creation limit for free users
const DAILY_ROOM_LIMIT = 3;

// Get current user's daily room creation usage
export const getDailyRoomCreations = query({
    args: {},
    handler: async (ctx) => {
        const identity = await ctx.auth.getUserIdentity();
        if (!identity) {
            return { roomsCreated: 0, limit: DAILY_ROOM_LIMIT, isPro: false, isSignedIn: false };
        }

        const user = await ctx.db
            .query("users")
            .withIndex("by_token", (q) => q.eq("tokenIdentifier", identity.tokenIdentifier))
            .unique();

        const isPro = user?.isPro ?? false;

        if (isPro) {
            return { roomsCreated: 0, limit: Infinity, isPro: true, isSignedIn: true };
        }

        const today = getTodayDate();
        const usage = await ctx.db
            .query("daily_usage")
            .withIndex("by_user_date", (q) => q.eq("user_token", identity.tokenIdentifier).eq("date", today))
            .unique();

        return {
            roomsCreated: usage?.games_created ?? 0,
            limit: DAILY_ROOM_LIMIT,
            isPro: false,
            isSignedIn: true,
        };
    },
});

// ============================================
// MUTATIONS (Write Operations)
// ============================================

// Create a new room
export const createRoom = mutation({
    args: {
        room_code: v.string(),
        psychic_id: v.optional(v.string()),
        guesser_id: v.optional(v.string()),
        target_angle: v.optional(v.number()),
        phase: v.string(),
        current_card: v.optional(v.object({
            left: v.string(),
            right: v.string(),
        })),
        game_mode: v.optional(v.string()),
        player1_name: v.optional(v.string()),
        player1_avatar: v.optional(v.string()),
        player2_name: v.optional(v.string()),
        player2_avatar: v.optional(v.string()),
        round_number: v.optional(v.number()),
        psychic_score: v.optional(v.number()),
        guesser_score: v.optional(v.number()),
        card_count: v.optional(v.number()),
        max_rounds: v.optional(v.number()),
        deck_type: v.optional(v.string()),
        ip_hash: v.optional(v.string()), // Added for guest limits
    },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();

        // 1. Guest users cannot create rooms
        if (!identity) {
            throw new ConvexError("GUEST_CANNOT_CREATE");
        }

        const creatorId = identity.tokenIdentifier;

        // 2. Check/create user record
        let user = await ctx.db
            .query("users")
            .withIndex("by_token", (q) => q.eq("tokenIdentifier", creatorId))
            .unique();

        if (!user) {
            // Create user if not exists (sync on the fly)
            const userId = await ctx.db.insert("users", {
                tokenIdentifier: creatorId,
                name: identity.name,
                email: identity.email,
                isPro: false,
            });
            user = await ctx.db.get(userId);
        }

        const isPro = user?.isPro ?? false;

        // 3. Enforce daily room creation limit for free users
        if (!isPro) {
            const today = getTodayDate();
            const usage = await ctx.db
                .query("daily_usage")
                .withIndex("by_user_date", (q) => q.eq("user_token", creatorId).eq("date", today))
                .unique();

            const currentCount = usage?.games_created ?? 0;

            if (currentCount >= DAILY_ROOM_LIMIT) {
                throw new ConvexError("DAILY_LIMIT_REACHED");
            }

            // Increment the counter
            if (usage) {
                await ctx.db.patch(usage._id, { games_created: currentCount + 1 });
            } else {
                await ctx.db.insert("daily_usage", {
                    user_token: creatorId,
                    date: today,
                    games_created: 1,
                    rounds_played: 0,
                });
            }
        }

        // 4. Create the room
        return await ctx.db.insert("rooms", {
            room_code: args.room_code.toUpperCase(),
            creator_id: creatorId,
            psychic_id: args.psychic_id,
            guesser_id: args.guesser_id,
            target_angle: args.target_angle ?? 90,
            guess_angle: 90,
            phase: args.phase,
            current_card: args.current_card,
            psychic_score: args.psychic_score ?? 0,
            guesser_score: args.guesser_score ?? 0,
            round_number: args.round_number ?? 1,
            clue: undefined,
            game_mode: args.game_mode,
            player1_name: args.player1_name,
            player1_avatar: args.player1_avatar,
            player2_name: args.player2_name,
            player2_avatar: args.player2_avatar,
            card_count: args.card_count,
            max_rounds: args.max_rounds,
            deck_type: args.deck_type,
            updated_at: Date.now(),
        });
    },
});

// Get a single room by ID
export const getRoom = query({
    args: { roomId: v.id("rooms") },
    handler: async (ctx, args) => {
        return await ctx.db.get(args.roomId);
    },
});

// Get room by room code
export const getRoomByCode = query({
    args: { roomCode: v.string() },
    handler: async (ctx, args) => {
        const rooms = await ctx.db
            .query("rooms")
            .withIndex("by_room_code", (q) => q.eq("room_code", args.roomCode.toUpperCase()))
            .collect();
        // Return newest room first
        return rooms.sort((a, b) => b._creationTime - a._creationTime)[0] || null;
    },
});

// Get all party players for a room
export const getPartyPlayers = query({
    args: { roomId: v.id("rooms") },
    handler: async (ctx, args) => {
        return await ctx.db
            .query("party_players")
            .withIndex("by_room", (q) => q.eq("room_id", args.roomId))
            .collect();
    },
});

// Get a specific player in a room
export const getPartyPlayer = query({
    args: {
        roomId: v.id("rooms"),
        playerId: v.string(),
    },
    handler: async (ctx, args) => {
        return await ctx.db
            .query("party_players")
            .withIndex("by_room_and_player", (q) =>
                q.eq("room_id", args.roomId).eq("player_id", args.playerId)
            )
            .first();
    },
});

// Leaderboard query - get top scores for a game mode
export const getLeaderboard = query({
    args: { gameMode: v.string() },
    handler: async (ctx, args) => {
        const rooms = await ctx.db
            .query("rooms")
            .withIndex("by_game_mode", (q) => q.eq("game_mode", args.gameMode))
            .collect();

        // Sort by psychic_score descending, take top 10
        return rooms
            .filter((r) => (r.psychic_score ?? 0) > 0)
            .sort((a, b) => (b.psychic_score ?? 0) - (a.psychic_score ?? 0))
            .slice(0, 10);
    },
});

// ============================================
// MUTATIONS (Write Operations)
// ============================================



// Join a room by code (atomic: find + join in one mutation)
export const joinRoomByCode = mutation({
    args: {
        roomCode: v.string(),
        playerId: v.string(),
        playerName: v.string(),
        playerAvatar: v.string(),
        expectedGameMode: v.optional(v.string()),
    },
    handler: async (ctx, args) => {
        const rooms = await ctx.db
            .query("rooms")
            .withIndex("by_room_code", (q) => q.eq("room_code", args.roomCode.toUpperCase()))
            .filter((q) => q.neq(q.field("phase"), "ended"))
            .collect();

        // Pick newest room
        const room = rooms.sort((a, b) => b._creationTime - a._creationTime)[0];

        if (!room) {
            return { error: "Room not found", roomId: null, room: null };
        }

        // Check game mode if specified
        if (args.expectedGameMode && room.game_mode && room.game_mode !== args.expectedGameMode) {
            const modeNames: Record<string, string> = {
                classic: "Classic",
                party: "Party",
                mini_flag_game: "Flags",
                mini_rapid_fire: "Rapid Fire",
                mini_whos_most_likely: "Who's Most Likely",
                mini_fantasy_slider: "Fantasy Slider",
            };
            const actualMode = modeNames[room.game_mode] || room.game_mode;
            return { error: `This room is for ${actualMode}`, roomId: null, room: null };
        }

        // Already in room as creator
        if (room.psychic_id === args.playerId) {
            return { error: null, roomId: room._id, room, isCreator: true };
        }

        // Already in room as joiner
        if (room.guesser_id === args.playerId) {
            return { error: null, roomId: room._id, room, isCreator: false };
        }

        // Bypass strict 2-player limit for Party Mode ONLY
        // Minigames (Fantasy, Rapid Fire, etc) are 2-player and require guesser_id update
        if (room.game_mode === "party") {
            return { error: null, roomId: room._id, room, isCreator: false };
        }

        // Check if the caller is actually the guesser via Auth (handling ID mismatch/reloads)
        const identity = await ctx.auth.getUserIdentity();
        let isActuallyGuesser = false;
        if (identity && room.guesser_id) {
            // Check against tokenIdentifier
            if (room.guesser_id === identity.tokenIdentifier) isActuallyGuesser = true;
            // Check against subject (User ID) - typically the part after |
            const userId = identity.tokenIdentifier.split('|')[1];
            if (room.guesser_id === userId) isActuallyGuesser = true;
        }

        // Room is full
        // RELAXED RULE: If the game is still in "waiting" phase, allow new player to overwrite/claim the seat.
        // This fixes 'stale' ghost players blocking the room. 
        // If phase is NOT waiting (game in progress), strictly enforce ID match to prevent disrupting active game.
        const isWaiting = room.phase === "waiting";

        if (room.guesser_id && room.guesser_id !== args.playerId && !isActuallyGuesser && !isWaiting) {
            console.log(`Join Failed: Full. Guesser=${room.guesser_id}, Req=${args.playerId}, AuthUser=${identity?.tokenIdentifier}`);
            return { error: `Room is full (G: ${room.guesser_id.slice(-4)}, You: ${args.playerId.slice(-4)})`, roomId: null, room: null };
        }

        // If verified via Auth but ID mismatch, we update ID to match args? 
        // OR we just proceed. If we proceed without updating, client might be confused if it expects playerId to match.
        // But client state 'playerId' is args.playerId.
        // If we let them in, they become Player 2.

        // Join as Player 2 (Upsert/Update)
        await ctx.db.patch(room._id, {
            guesser_id: args.playerId, // Always update to current session ID to fix mismatches
            player2_name: args.playerName,
            player2_avatar: args.playerAvatar,
            updated_at: Date.now(),
        });

        return { error: null, roomId: room._id, room, isCreator: false };
    },
});

// Update room (generic patch)
export const updateRoom = mutation({
    args: {
        roomId: v.id("rooms"),
        updates: v.object({
            psychic_id: v.optional(v.string()),
            guesser_id: v.optional(v.string()),
            target_angle: v.optional(v.number()),
            guess_angle: v.optional(v.number()),
            phase: v.optional(v.string()),
            current_card: v.optional(v.object({
                left: v.string(),
                right: v.string(),
            })),
            psychic_score: v.optional(v.number()),
            guesser_score: v.optional(v.number()),
            round_number: v.optional(v.number()),
            clue: v.optional(v.union(v.string(), v.null())),
            player1_name: v.optional(v.string()),
            player2_name: v.optional(v.string()),
            player1_avatar: v.optional(v.string()),
            player2_avatar: v.optional(v.string()),
            player1_choice: v.optional(v.union(v.string(), v.null())),
            player2_choice: v.optional(v.union(v.string(), v.null())),
            deck_type: v.optional(v.string()),
            current_question: v.optional(v.object({
                question: v.string(),
                options: v.array(v.string()),
                answer: v.number(),
            })),
        }),
        ip_hash: v.optional(v.string()),
    },
    handler: async (ctx, args) => {
        // Enforce Round Limits for Free Users
        if (args.updates.round_number !== undefined) {
            const room = await ctx.db.get(args.roomId);
            const gameMode = room?.game_mode || "classic";
            const currentRound = room?.round_number ?? 1;

            // Determine the round limit for this game mode
            // For classic/party: 4 free rounds, or room's max_rounds if set
            // For mini games: 20 free rounds
            let roundLimit = 4; // Free tier limit for Wavelength classic/party
            if (gameMode === "mini_rapid_fire" || gameMode === "mini_flag_game" || gameMode === "mini_whos_most_likely" || gameMode === "mini_fantasy_slider" || gameMode === "mini_general_knowledge") {
                roundLimit = 20;
            }

            // Check if ANYONE in this room is Pro (creator or current user)
            let isPro = false;

            // Check room creator
            if (room?.creator_id) {
                const creator = await ctx.db
                    .query("users")
                    .withIndex("by_token", (q) => q.eq("tokenIdentifier", room.creator_id!))
                    .unique();
                if (creator?.isPro) isPro = true;
            }

            // Check current user
            if (!isPro) {
                const identity = await ctx.auth.getUserIdentity();
                if (identity) {
                    const user = await ctx.db
                        .query("users")
                        .withIndex("by_token", (q) => q.eq("tokenIdentifier", identity.tokenIdentifier))
                        .unique();
                    if (user?.isPro) isPro = true;
                }
            }

            // Limit Enforcement Logic
            // Trust the limits set at creation time (guarded by UI)
            let roundLimit = 4; // Default fallback

            // 1. Check max_rounds (Classic/Party)
            if (room?.max_rounds !== undefined && room.max_rounds !== null) {
                if (room.max_rounds === 0) {
                    // Unlimited - skip check
                    return;
                }
                roundLimit = room.max_rounds;
            }
            // 2. Check card_count (Mini Games)
            else if (room?.card_count !== undefined) {
                roundLimit = room.card_count;
            }

            // Start checking limits
            const newRoundNumber = args.updates.round_number;

            if (typeof newRoundNumber === "number" && newRoundNumber > roundLimit) {
                console.log("LIMIT REACHED! New Round:", newRoundNumber, "> Limit:", roundLimit, "- ENDING GAME");
                await ctx.db.patch(args.roomId, {
                    phase: "ended",
                    clue: "Game Over! Thanks for playing.",
                    updated_at: Date.now()
                });
                return; // Game over
            }
        }

        // Convex db.patch uses undefined to unset fields, not null
        // Transform null values to undefined for proper field clearing
        const patchData: Record<string, unknown> = {};
        for (const [key, value] of Object.entries(args.updates)) {
            if (value !== undefined) {
                patchData[key] = value === null ? undefined : value;
            }
        }
        if (Object.keys(patchData).length > 0) {
            patchData.updated_at = Date.now();
            await ctx.db.patch(args.roomId, patchData);
        }
    },
});

// Reveal Party Round & Score (Atomic)
export const revealPartyRound = mutation({
    args: {
        roomId: v.id("rooms"),
        targetAngle: v.number(),
    },
    handler: async (ctx, args) => {
        const room = await ctx.db.get(args.roomId);
        if (!room || room.phase === "revealed") return;

        // 1. Get all players
        const players = await ctx.db
            .query("party_players")
            .withIndex("by_room", (q) => q.eq("room_id", args.roomId))
            .collect();

        const updates: Promise<any>[] = [];
        const guessers = players.filter(p => p.role === "guesser" && p.guess_angle != null);

        // 2. Score Guessers
        let totalGuesserPoints = 0;

        // Helper for points
        const getPoints = (target: number, guess: number) => {
            const diff = Math.abs(target - guess);
            if (diff <= 5) return 4;
            if (diff <= 13) return 3;
            if (diff <= 19) return 2;
            return 0;
        };

        for (const player of guessers) {
            const points = getPoints(args.targetAngle, player.guess_angle!);
            totalGuesserPoints += points;

            updates.push(ctx.db.patch(player._id, {
                score: (player.score ?? 0) + points
            }));
        }

        // 3. Score Psychic (Combined Average)
        const psychics = players.filter(p => p.role === "psychic");
        const avgPoints = guessers.length > 0
            ? Math.round(totalGuesserPoints / guessers.length)
            : 0;

        for (const psychic of psychics) {
            updates.push(ctx.db.patch(psychic._id, {
                score: (psychic.score ?? 0) + avgPoints
            }));
        }

        // 4. Update Room Phase
        updates.push(ctx.db.patch(args.roomId, {
            phase: "revealed",
            updated_at: Date.now()
        }));

    }
});

// Delete room
export const deleteRoom = mutation({
    args: { roomId: v.id("rooms") },
    handler: async (ctx, args) => {
        await ctx.db.delete(args.roomId);
    },
});

// ============================================
// PARTY PLAYERS MUTATIONS
// ============================================

// Add a party player
export const addPartyPlayer = mutation({
    args: {
        room_id: v.id("rooms"),
        player_id: v.string(),
        name: v.string(),
        avatar: v.string(),
        role: v.string(),
        score: v.optional(v.number()),
        guess_angle: v.optional(v.number()),
        locked_in: v.optional(v.boolean()),
        answer: v.optional(v.object({ round: v.number(), choice: v.number() })),
    },
    handler: async (ctx, args) => {
        return await ctx.db.insert("party_players", {
            room_id: args.room_id,
            player_id: args.player_id,
            name: args.name,
            avatar: args.avatar,
            role: args.role,
            score: args.score ?? 0,
            guess_angle: args.guess_angle,
            locked_in: args.locked_in ?? false,
            answer: args.answer,
        });
    },
});

// Update party player
export const updatePartyPlayer = mutation({
    args: {
        room_id: v.id("rooms"),
        player_id: v.string(),
        updates: v.object({
            role: v.optional(v.string()),
            score: v.optional(v.number()),
            guess_angle: v.optional(v.union(v.number(), v.null())),
            locked_in: v.optional(v.boolean()),
            answer: v.optional(v.object({ round: v.number(), choice: v.number() })),
        }),
    },
    handler: async (ctx, args) => {
        const player = await ctx.db
            .query("party_players")
            .withIndex("by_room_and_player", (q) =>
                q.eq("room_id", args.room_id).eq("player_id", args.player_id)
            )
            .first();

        if (player) {
            const patchData: Record<string, unknown> = {};
            for (const [key, value] of Object.entries(args.updates)) {
                if (value !== undefined) {
                    patchData[key] = value === null ? undefined : value;
                }
            }
            await ctx.db.patch(player._id, patchData);

            // Auto-reveal: when a player locks in, check if ALL guessers are now locked
            if (args.updates.locked_in === true) {
                const room = await ctx.db.get(args.room_id);
                if (room && room.phase === "guessing") {
                    // Re-read all players (sees our just-patched update)
                    const allPlayers = await ctx.db
                        .query("party_players")
                        .withIndex("by_room", (q) => q.eq("room_id", args.room_id))
                        .collect();

                    const guessers = allPlayers.filter(p => p.role === "guesser");
                    const allLocked = guessers.length > 0 && guessers.every(p => p.locked_in);

                    if (allLocked) {
                        // Score and reveal (same logic as revealPartyRound)
                        const targetAngle = room.target_angle ?? 90;
                        const getPoints = (target: number, guess: number) => {
                            const diff = Math.abs(target - guess);
                            if (diff <= 5) return 4;
                            if (diff <= 13) return 3;
                            if (diff <= 19) return 2;
                            return 0;
                        };

                        let totalGuesserPoints = 0;
                        const guessersWithAngles = guessers.filter(p => p.guess_angle != null);

                        for (const guesser of guessersWithAngles) {
                            const points = getPoints(targetAngle, guesser.guess_angle!);
                            totalGuesserPoints += points;
                            await ctx.db.patch(guesser._id, {
                                score: (guesser.score ?? 0) + points,
                            });
                        }

                        const psychics = allPlayers.filter(p => p.role === "psychic");
                        const avgPoints = guessersWithAngles.length > 0
                            ? Math.round(totalGuesserPoints / guessersWithAngles.length)
                            : 0;

                        for (const psychic of psychics) {
                            await ctx.db.patch(psychic._id, {
                                score: (psychic.score ?? 0) + avgPoints,
                            });
                        }

                        await ctx.db.patch(args.room_id, {
                            phase: "revealed",
                            updated_at: Date.now(),
                        });
                    }
                }
            }
        }
    },
});

// Remove party player
export const removePartyPlayer = mutation({
    args: {
        room_id: v.id("rooms"),
        player_id: v.string(),
    },
    handler: async (ctx, args) => {
        const player = await ctx.db
            .query("party_players")
            .withIndex("by_room_and_player", (q) =>
                q.eq("room_id", args.room_id).eq("player_id", args.player_id)
            )
            .first();

        if (player) {
            await ctx.db.delete(player._id);
        }
    },
});

// Join party room (atomic: find + check + add player)
export const joinPartyRoomByCode = mutation({
    args: {
        roomCode: v.string(),
        playerId: v.string(),
        playerName: v.string(),
        playerAvatar: v.string(),
    },
    handler: async (ctx, args) => {
        const rooms = await ctx.db
            .query("rooms")
            .withIndex("by_room_code", (q) => q.eq("room_code", args.roomCode.toUpperCase()))
            .filter((q) => q.neq(q.field("phase"), "ended")) // Filter out ended rooms
            .collect();

        // Pick newest room
        const room = rooms.sort((a, b) => b._creationTime - a._creationTime)[0];

        if (!room) {
            return { error: "Room not found", roomId: null, roundNumber: null };
        }

        if (room.game_mode !== "party") {
            return { error: "This looks like a valid room, but it's not a Party Mode room!", roomId: null, roundNumber: null };
        }

        // Pro restriction removed for joiners

        // Check if already in the room
        const existingPlayer = await ctx.db
            .query("party_players")
            .withIndex("by_room_and_player", (q) =>
                q.eq("room_id", room._id).eq("player_id", args.playerId)
            )
            .first();

        if (existingPlayer) {
            return { error: null, roomId: room._id, roundNumber: room.round_number };
        }

        // Add as new guesser
        await ctx.db.insert("party_players", {
            room_id: room._id,
            player_id: args.playerId,
            name: args.playerName,
            avatar: args.playerAvatar,
            role: "guesser",
            score: 0,
            locked_in: false,
        });

        return { error: null, roomId: room._id, roundNumber: room.round_number };
    },
});

// Reveal + Score a General Knowledge round atomically (combines reveal + calculateScores)
export const revealGeneralKnowledgeRound = mutation({
    args: {
        roomId: v.id("rooms"),
    },
    handler: async (ctx, args) => {
        const room = await ctx.db.get(args.roomId);
        if (!room || room.phase !== "playing") return;

        const correctAnswer = room.current_question?.answer;
        if (correctAnswer === undefined || correctAnswer === null) {
            // No question or no answer — just reveal without scoring
            await ctx.db.patch(args.roomId, { phase: "revealed", updated_at: Date.now() });
            return;
        }

        // Read all players and score correct answers
        const allPlayers = await ctx.db
            .query("party_players")
            .withIndex("by_room", (q) => q.eq("room_id", args.roomId))
            .collect();

        const roundNumber = room.round_number ?? 1;

        for (const player of allPlayers) {
            if (
                player.answer &&
                player.answer.round === roundNumber &&
                player.answer.choice === correctAnswer
            ) {
                await ctx.db.patch(player._id, {
                    score: (player.score ?? 0) + 1,
                });
            }
        }

        // Set phase to revealed
        await ctx.db.patch(args.roomId, { phase: "revealed", updated_at: Date.now() });
    },
});
// Join General Knowledge room 
export const joinGeneralKnowledgeRoom = mutation({
    args: {
        roomCode: v.string(),
        playerId: v.string(),
        playerName: v.string(),
        playerAvatar: v.string(),
    },
    handler: async (ctx, args) => {
        const rooms = await ctx.db
            .query("rooms")
            .withIndex("by_room_code", (q) => q.eq("room_code", args.roomCode.toUpperCase()))
            .collect();

        // Pick newest room
        const room = rooms.sort((a, b) => b._creationTime - a._creationTime)[0];

        if (!room) {
            return { error: "Room not found", roomId: null };
        }

        if (room.game_mode !== "mini_general_knowledge") {
            return { error: "This room is for General Knowledge!", roomId: null };
        }

        // No Pro check on join, as 20 round game is free.

        // Check if already in the room
        const existingPlayer = await ctx.db
            .query("party_players")
            .withIndex("by_room_and_player", (q) =>
                q.eq("room_id", room._id).eq("player_id", args.playerId)
            )
            .first();

        if (existingPlayer) {
            return { error: null, roomId: room._id };
        }

        // Add as new player
        await ctx.db.insert("party_players", {
            room_id: room._id,
            player_id: args.playerId,
            name: args.playerName,
            avatar: args.playerAvatar,
            role: "player",
            score: 0,
            locked_in: false,
        });

        return { error: null, roomId: room._id };
    },
});

export const getMyUser = query({
    args: {},
    handler: async (ctx) => {
        const identity = await ctx.auth.getUserIdentity();
        if (!identity) return null;
        return await ctx.db
            .query("users")
            .withIndex("by_token", (q) => q.eq("tokenIdentifier", identity.tokenIdentifier))
            .unique();
    },
});
