import { mutation } from "./_generated/server";
import { v } from "convex/values";

// Submit feedback
export const submitFeedback = mutation({
    args: {
        name: v.optional(v.string()),
        email: v.optional(v.string()),
        category: v.string(),
        message: v.string(),
        rating: v.optional(v.number()),
        ip_hash: v.optional(v.string()),
    },
    handler: async (ctx, args) => {
        return await ctx.db.insert("feedback", {
            name: args.name,
            email: args.email,
            category: args.category,
            message: args.message,
            rating: args.rating,
            ip_hash: args.ip_hash,
        });
    },
});
