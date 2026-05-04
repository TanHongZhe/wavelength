import { internalMutation } from "./_generated/server";
import { v } from "convex/values";

export const updateSubscription = internalMutation({
    args: {
        stripeCustomerId: v.string(),
        email: v.string(),
        clerkUserId: v.string(),
        subscriptionId: v.string(),
        endsOn: v.number(),
        status: v.string(), // "active", "canceled", "past_due", "lifetime", etc.
    },
    handler: async (ctx, args) => {
        // Lookup priority: client_reference_id (Clerk userId) → Stripe customer ID → email.
        // The first is robust to Stripe Link / Apple Pay overriding the prefilled email.
        let user = null;

        if (args.clerkUserId) {
            const issuer = process.env.CLERK_ISSUER_URL || "https://clerk.wavelength.lol";
            const tokenIdentifier = `${issuer}|${args.clerkUserId}`;
            user = await ctx.db
                .query("users")
                .withIndex("by_token", (q) => q.eq("tokenIdentifier", tokenIdentifier))
                .unique();
        }

        if (!user && args.stripeCustomerId) {
            user = await ctx.db
                .query("users")
                .withIndex("by_stripe_id", (q) => q.eq("stripeCustomerId", args.stripeCustomerId))
                .unique();
        }

        if (!user && args.email) {
            user = await ctx.db
                .query("users")
                .withIndex("by_email", (q) => q.eq("email", args.email))
                .unique();
        }

        if (user) {
            const isPro = args.status === "active" || args.status === "trialing" || args.status === "lifetime";
            await ctx.db.patch(user._id, {
                stripeCustomerId: args.stripeCustomerId || user.stripeCustomerId,
                subscriptionId: args.subscriptionId,
                endsOn: args.endsOn,
                isPro: isPro,
            });
            console.log(`Updated user ${user.email}: isPro=${isPro}, status=${args.status}`);
        } else {
            console.warn(
                `No user found. clerkUserId=${args.clerkUserId}, stripeCustomerId=${args.stripeCustomerId}, email=${args.email}, status=${args.status}, subscriptionId=${args.subscriptionId}`
            );
        }
    },
});
