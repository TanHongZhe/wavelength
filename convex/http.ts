import { httpRouter } from "convex/server";
import { httpAction } from "./_generated/server";
import { internal } from "./_generated/api";

const http = httpRouter();

http.route({
    path: "/payments/webhook",
    method: "POST",
    handler: httpAction(async (ctx, request) => {
        // 1. Get Stripe Signature & Webhook Secret
        const signature = request.headers.get("stripe-signature");
        if (!signature) {
            return new Response("Missing stripe-signature header", { status: 401 });
        }

        const secret = process.env.STRIPE_WEBHOOK_SECRET;
        if (!secret) {
            console.error("Missing STRIPE_WEBHOOK_SECRET env variable");
            return new Response("Server config error", { status: 500 });
        }

        // 2. Parse the signature header
        // Stripe signature format: t=timestamp,v1=signature
        const payload = await request.text();
        const parts: Record<string, string> = {};
        for (const part of signature.split(",")) {
            const [key, value] = part.split("=");
            parts[key] = value;
        }

        const timestamp = parts["t"];
        const expectedSig = parts["v1"];

        if (!timestamp || !expectedSig) {
            return new Response("Malformed stripe-signature", { status: 401 });
        }

        // 3. Verify Signature using Web Crypto API
        // Stripe signs: timestamp + "." + payload
        const signedPayload = `${timestamp}.${payload}`;
        const encoder = new TextEncoder();

        const key = await crypto.subtle.importKey(
            "raw",
            encoder.encode(secret),
            { name: "HMAC", hash: "SHA-256" },
            false,
            ["sign"]
        );

        const signatureBytes = await crypto.subtle.sign(
            "HMAC",
            key,
            encoder.encode(signedPayload)
        );

        // Convert to hex string for comparison
        const computedSig = Array.from(new Uint8Array(signatureBytes))
            .map((b) => b.toString(16).padStart(2, "0"))
            .join("");

        if (computedSig !== expectedSig) {
            console.error("Stripe webhook signature verification failed");
            return new Response("Invalid signature", { status: 401 });
        }

        // 4. Optional: Check timestamp tolerance (5 min)
        const now = Math.floor(Date.now() / 1000);
        if (Math.abs(now - parseInt(timestamp)) > 300) {
            return new Response("Timestamp too old", { status: 401 });
        }

        // 5. Handle Event
        const event = JSON.parse(payload);
        const eventType = event.type;

        console.log(`Stripe webhook received: ${eventType}`);

        // Handle one-time payment (Lifetime Access)
        if (eventType === "checkout.session.completed") {
            const session = event.data.object;
            const customerEmail = session.customer_details?.email || session.customer_email;
            const customerId = session.customer;
            const mode = session.mode; // "payment" for one-time, "subscription" for recurring

            if (mode === "payment") {
                // One-time payment = Lifetime Access
                await ctx.runMutation(internal.payments.updateSubscription, {
                    stripeCustomerId: customerId || "",
                    email: customerEmail || "",
                    subscriptionId: session.id,
                    status: "lifetime",
                    endsOn: 4102444800000, // Far future (Jan 1, 2100)
                });
            } else if (mode === "subscription") {
                // Subscription created - mark as active
                await ctx.runMutation(internal.payments.updateSubscription, {
                    stripeCustomerId: customerId || "",
                    email: customerEmail || "",
                    subscriptionId: session.subscription || session.id,
                    status: "active",
                    endsOn: 0, // Will be updated by subscription events
                });
            }
        }

        // Handle subscription updates (renewals, cancellations, etc.)
        if (eventType === "customer.subscription.updated" || eventType === "customer.subscription.deleted") {
            const subscription = event.data.object;
            const customerId = subscription.customer;
            const status = subscription.status; // "active", "canceled", "past_due", "unpaid"
            const currentPeriodEnd = subscription.current_period_end;
            const endsOn = currentPeriodEnd ? currentPeriodEnd * 1000 : 0; // Convert to ms

            await ctx.runMutation(internal.payments.updateSubscription, {
                stripeCustomerId: customerId || "",
                email: "", // Not available in subscription events, we match by stripeCustomerId
                subscriptionId: subscription.id,
                status: status,
                endsOn: endsOn,
            });
        }

        return new Response("Webhook processed", { status: 200 });
    }),
});

export default http;
