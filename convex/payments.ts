import { internalMutation } from "./_generated/server";
import { v } from "convex/values";

export const updateSubscription = internalMutation({
    args: {
        stripeCustomerId: v.string(),
        email: v.string(),
        subscriptionId: v.string(),
        endsOn: v.number(),
        status: v.string(), // "active", "canceled", "past_due", "lifetime", "monthly", etc.
    },
    handler: async (ctx, args) => {
        // 1. Try to find user by Stripe Customer ID
        let user = args.stripeCustomerId
            ? await ctx.db
                .query("users")
                .withIndex("by_stripe_id", (q) => q.eq("stripeCustomerId", args.stripeCustomerId))
                .unique()
            : null;

        // 2. Fallback: find by email
        if (!user && args.email) {
            user = await ctx.db
                .query("users")
                .withIndex("by_email", (q) => q.eq("email", args.email))
                .unique();
        }

        if (user) {
            // Compute isPro based on status and expiration
            // - "lifetime": always Pro
            // - "active" / "trialing": always Pro (subscription managed by Stripe)
            // - "monthly": Pro only if endsOn is in the future
            // - "canceled" / "past_due" / other: not Pro
            let isPro = false;
            if (args.status === "lifetime") {
                isPro = true;
            } else if (args.status === "active" || args.status === "trialing") {
                isPro = true;
            } else if (args.status === "monthly") {
                isPro = args.endsOn > Date.now();
            }

            await ctx.db.patch(user._id, {
                stripeCustomerId: args.stripeCustomerId || user.stripeCustomerId,
                subscriptionId: args.subscriptionId,
                endsOn: args.endsOn,
                isPro: isPro,
            });
            console.log(`Updated user ${user.email}: isPro=${isPro}, status=${args.status}, endsOn=${new Date(args.endsOn).toISOString()}`);
        } else {
            console.warn(`No user found for stripeCustomerId=${args.stripeCustomerId}, email=${args.email}`);
        }
    },
});
