import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

// ============================================
// QUERIES (Read Operations)
// ============================================

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
        return await ctx.db
            .query("rooms")
            .withIndex("by_room_code", (q) => q.eq("room_code", args.roomCode.toUpperCase()))
            .first();
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
        deck_type: v.optional(v.string()),
    },
    handler: async (ctx, args) => {
        return await ctx.db.insert("rooms", {
            room_code: args.room_code.toUpperCase(),
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
            deck_type: args.deck_type,
            updated_at: Date.now(),
        });
    },
});

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
        const room = await ctx.db
            .query("rooms")
            .withIndex("by_room_code", (q) => q.eq("room_code", args.roomCode.toUpperCase()))
            .first();

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

        // Room is full
        if (room.guesser_id) {
            return { error: "Room is full", roomId: null, room: null };
        }

        // Join as Player 2
        await ctx.db.patch(room._id, {
            guesser_id: args.playerId,
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
        }),
    },
    handler: async (ctx, args) => {
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
        const room = await ctx.db
            .query("rooms")
            .withIndex("by_room_code", (q) => q.eq("room_code", args.roomCode.toUpperCase()))
            .first();

        if (!room) {
            return { error: "Room not found", roomId: null };
        }

        if (room.game_mode !== "party") {
            return { error: "This looks like a valid room, but it's not a Party Mode room!", roomId: null };
        }

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
