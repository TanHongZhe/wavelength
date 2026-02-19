import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
    // Main rooms table - supports all game modes
    rooms: defineTable({
        room_code: v.string(),
        creator_id: v.optional(v.string()), // Tracks who owns the room (for Pro features)
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
        max_rounds: v.optional(v.number()), // Selected max rounds for the game (4 free, 10/20/50/unlimited for Pro)
        updated_at: v.optional(v.number()), // timestamp (ms) — set on create & every update
        current_question: v.optional(v.object({
            question: v.string(),
            options: v.array(v.string()),
            answer: v.number(),
        })),
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
        role: v.string(), // "psychic" | "guesser" | "host" | "player"
        score: v.number(),
        guess_angle: v.optional(v.number()), // Reused for generic numeric data if needed
        locked_in: v.boolean(),
        answer: v.optional(v.object({ round: v.number(), choice: v.number() })), // round-specific answer
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

    // 1. Users Table (Synced with Clerk)
    users: defineTable({
        tokenIdentifier: v.string(),     // Clerk User ID (subject)
        name: v.optional(v.string()),
        email: v.optional(v.string()),
        isPro: v.boolean(),              // The "Golden Ticket"
        stripeCustomerId: v.optional(v.string()), // Stripe Customer ID
        subscriptionId: v.optional(v.string()), // active subscription or checkout session ID
        endsOn: v.optional(v.number()),  // Expiration timestamp
    })
        .index("by_token", ["tokenIdentifier"])
        .index("by_email", ["email"])
        .index("by_stripe_id", ["stripeCustomerId"]),

    // 2. Usage Limits Table (Tracks daily room creation per user)
    daily_usage: defineTable({
        ip_hash: v.optional(v.string()),             // SHA-256 of IP (legacy)
        user_token: v.optional(v.string()),           // Clerk tokenIdentifier
        date: v.string(),                // YYYY-MM-DD
        games_created: v.number(),       // Track room creations (limit: 3/day for free)
        rounds_played: v.number(),       // Legacy field
    })
        .index("by_ip_date", ["ip_hash", "date"])
        .index("by_user_date", ["user_token", "date"]),

    // 3. Daily Stats Archive (for preserving history after room deletion)
    daily_stats: defineTable({
        date: v.string(), // YYYY-MM-DD
        games_played: v.number(),
        rooms_created: v.number(),
        total_rounds: v.number(),
        classic_rounds: v.number(),
        party_rounds: v.number(),
        green_flag_rounds: v.number(),
        this_or_that_rounds: v.number(),
    }).index("by_date", ["date"]),
});
