import { internalAction, mutation } from "./_generated/server";
import { internal } from "./_generated/api";
import { Resend } from "resend";
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
        const feedbackId = await ctx.db.insert("feedback", {
            name: args.name,
            email: args.email,
            category: args.category,
            message: args.message,
            rating: args.rating,
            ip_hash: args.ip_hash,
        });

        // Trigger email notification asynchronously
        await ctx.scheduler.runAfter(0, internal.feedback.sendFeedbackEmail, {
            name: args.name,
            email: args.email,
            category: args.category,
            message: args.message,
            rating: args.rating,
        });

        return feedbackId;
    },
});

export const sendFeedbackEmail = internalAction({
    args: {
        name: v.optional(v.string()),
        email: v.optional(v.string()),
        category: v.string(),
        message: v.string(),
        rating: v.optional(v.number()),
    },
    handler: async (ctx, args) => {
        const resendApiKey = process.env.RESEND_API_KEY;
        if (!resendApiKey) {
            console.error("Missing RESEND_API_KEY environment variable. Feedback email not sent.");
            return;
        }

        const resend = new Resend(resendApiKey);

        const emailContent = `
            <h2>New Feedback Received</h2>
            <p><strong>Category:</strong> ${args.category}</p>
            <p><strong>Message:</strong></p>
            <blockquote>${args.message}</blockquote>
            <hr />
            <p><strong>User Info:</strong></p>
            <ul>
                <li><strong>Name:</strong> ${args.name || "Anonymous"}</li>
                <li><strong>Email:</strong> ${args.email || "Not provided"}</li>
                <li><strong>Rating:</strong> ${args.rating ? args.rating + "/5" : "Not rated"}</li>
            </ul>
        `;

        try {
            await resend.emails.send({
                from: "Wavelength Feedback <onboarding@resend.dev>",
                to: "hongzhetan7@gmail.com",
                subject: `New Feedback: ${args.category.toUpperCase()}`,
                html: emailContent,
            });
            console.log("Feedback email sent successfully.");
        } catch (error) {
            console.error("Failed to send feedback email:", error);
        }
    },
});
