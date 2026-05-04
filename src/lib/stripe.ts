export const STRIPE_MONTHLY_LINK = "https://buy.stripe.com/fZu8wR3zF8Jh0yG4OHfQI05";
export const STRIPE_LIFETIME_LINK = "https://buy.stripe.com/4gMeVf2vB7Fda9g0yrfQI03";

// client_reference_id survives Stripe Link / Apple Pay overriding the email at checkout —
// the webhook uses it to look up the Clerk user even when the paid email differs.
export function buildStripeUrl(
    baseUrl: string,
    options: { email?: string | null; userId?: string | null }
): string {
    const params = new URLSearchParams();
    if (options.email) params.set("prefilled_email", options.email);
    if (options.userId) params.set("client_reference_id", options.userId);
    const qs = params.toString();
    return qs ? `${baseUrl}?${qs}` : baseUrl;
}
