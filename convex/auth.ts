import { mutation } from "./_generated/server";
import { v } from "convex/values";

// Generate anonymous user ID
export const getOrCreateAnonymousUser = mutation({
    args: { existingId: v.optional(v.string()) },
    handler: async (ctx, args) => {
        // If user already has an ID, return it
        if (args.existingId) {
            return args.existingId;
        }

        // Generate a new anonymous user ID
        const userId = `anon_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        return userId;
    },
});
