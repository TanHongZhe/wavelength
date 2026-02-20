
// ... existing imports
import { internalMutation, mutation, query } from "./_generated/server";

// ... existing code ...

/**
 * upsertUser: Create or update a user (Called by Clerk Webhook)
 */
export const upsertUser = internalMutation({
    args: {
        tokenIdentifier: v.string(),
        name: v.optional(v.string()),
        email: v.optional(v.string()),
        image: v.optional(v.string()),
    },
    handler: async (ctx, args) => {
        const user = await ctx.db
            .query("users")
            .withIndex("by_token", (q) => q.eq("tokenIdentifier", args.tokenIdentifier))
            .unique();

        if (user) {
            // Update existing user
            await ctx.db.patch(user._id, {
                name: args.name,
                email: args.email,
                // We could update image here if we stored it
            });
            return user._id;
        }

        // Create new user
        return await ctx.db.insert("users", {
            tokenIdentifier: args.tokenIdentifier,
            name: args.name,
            email: args.email,
            isPro: false,
        });
    },
});

import { v } from "convex/values";

/**
 * Stores or updates the current user in the database.
 * call this after login to ensure the user record exists.
 */
export const store = mutation({
    args: {},
    handler: async (ctx) => {
        const identity = await ctx.auth.getUserIdentity();
        if (!identity) {
            return null;
        }

        // Check if user exists
        const user = await ctx.db
            .query("users")
            .withIndex("by_token", (q) => q.eq("tokenIdentifier", identity.tokenIdentifier))
            .unique();

        if (user !== null) {
            // User exists, update fields if needed (e.g. name/email changed)
            if (user.name !== identity.name || user.email !== identity.email) {
                await ctx.db.patch(user._id, {
                    name: identity.name,
                    email: identity.email,
                });
            }
            return user._id;
        }

        // Create new user
        const newUserId = await ctx.db.insert("users", {
            tokenIdentifier: identity.tokenIdentifier,
            name: identity.name,
            email: identity.email,
            isPro: false, // Default to free
        });

        return newUserId;
    },
});

/**
 * Get current user data (with time-aware isPro check)
 */
export const current = query({
    args: {},
    handler: async (ctx) => {
        const identity = await ctx.auth.getUserIdentity();
        if (!identity) return null;

        const user = await ctx.db
            .query("users")
            .withIndex("by_token", (q) => q.eq("tokenIdentifier", identity.tokenIdentifier))
            .unique();

        if (!user) return null;

        // Compute time-aware isPro:
        // If isPro is true but endsOn has passed, the monthly plan has expired
        let effectiveIsPro = user.isPro;
        if (user.isPro && user.endsOn && user.endsOn > 0 && user.endsOn < Date.now()) {
            effectiveIsPro = false;
        }

        return {
            ...user,
            isPro: effectiveIsPro,
        };
    },
});
