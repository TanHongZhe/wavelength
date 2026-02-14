import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
    // Main rooms table - supports all game modes
    rooms: defineTable({
        room_code: v.string(),
        psychic_id: v.optional(v.string()),
        guesser_id: v.optional(v.string()),
        target_angle: v.optional(v.number()),
        guess_angle: v.optional(v.number()),
        phase: v.string(), // "waiting" | "clue" | "guessing" | "revealed" | "ended" | "rules" | "playing" | "results"
        current_card: v.optional(v.object({
            left: v.string(),
            right: v.string(),
        })),
        psychic_score: v.optional(v.number()),
        guesser_score: v.optional(v.number()),
        round_number: v.optional(v.number()),
        clue: v.optional(v.string()),
        player1_name: v.optional(v.string()),
        player2_name: v.optional(v.string()),
        player1_avatar: v.optional(v.string()),
        player2_avatar: v.optional(v.string()),
        game_mode: v.optional(v.string()), // "classic" | "party" | "mini_flag_game" | "mini_rapid_fire"
        player1_choice: v.optional(v.string()),
        player2_choice: v.optional(v.string()),
        deck_type: v.optional(v.string()),
        card_count: v.optional(v.number()),
        updated_at: v.optional(v.number()), // timestamp (ms) — set on create & every update
    })
        .index("by_room_code", ["room_code"])
        .index("by_game_mode", ["game_mode"])
        .index("by_phase", ["phase"]),

    // Party mode players table
    party_players: defineTable({
        room_id: v.id("rooms"),
        player_id: v.string(),
        name: v.string(),
        avatar: v.string(),
        role: v.string(), // "psychic" | "guesser"
        score: v.number(),
        guess_angle: v.optional(v.number()),
        locked_in: v.boolean(),
    })
        .index("by_room", ["room_id"])
        .index("by_player", ["player_id"])
        .index("by_room_and_player", ["room_id", "player_id"]),

    // Feedback table (keeping this in Convex too for consistency)
    feedback: defineTable({
        name: v.optional(v.string()),
        email: v.optional(v.string()),
        category: v.string(),
        message: v.string(),
        rating: v.optional(v.number()),
        ip_hash: v.optional(v.string()),
    }),
});
