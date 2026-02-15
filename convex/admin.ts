import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

// Reset daily usage for a specific player ID (which acts as IP hash)
export const resetDailyLimit = mutation({
    args: { ip_hash: v.string() },
    handler: async (ctx, args) => {
        const today = new Date().toISOString().split("T")[0];
        const record = await ctx.db
            .query("daily_usage")
            .withIndex("by_ip_date", (q) => q.eq("ip_hash", args.ip_hash).eq("date", today))
            .unique();

        if (record) {
            await ctx.db.delete(record._id);
            return "Limit reset successfully.";
        }
        return "No usage record found for today.";
    },
});

export const resetAllLimits = mutation({
    args: {},
    handler: async (ctx) => {
        const records = await ctx.db.query("daily_usage").collect();
        for (const record of records) {
            await ctx.db.delete(record._id);
        }
        return `Deleted ${records.length} usage records.`;
    }
});

// Debug: List all users and their Pro status
export const listAllUsers = query({
    args: {},
    handler: async (ctx) => {
        const users = await ctx.db.query("users").collect();
        return users.map(u => ({
            id: u._id,
            token: u.tokenIdentifier,
            email: u.email,
            name: u.name,
            isPro: u.isPro,
        }));
    }
});

// Debug: List all daily usage records
export const listDailyUsage = query({
    args: {},
    handler: async (ctx) => {
        return await ctx.db.query("daily_usage").collect();
    }
});

// Admin: Manually upgrade a user to Pro
export const upgradeUserByEmail = mutation({
    args: { email: v.string() },
    handler: async (ctx, args) => {
        const user = await ctx.db
            .query("users")
            .filter((q) => q.eq(q.field("email"), args.email))
            .first();

        if (!user) {
            return `User with email ${args.email} not found. Make sure they have logged in at least once.`;
        }

        await ctx.db.patch(user._id, { isPro: true });
        return `Success! Upgraded ${user.email} (ID: ${user._id}) to Pro.`;
    },
});
