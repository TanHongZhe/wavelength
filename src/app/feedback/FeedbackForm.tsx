"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Send, MessageSquare, Star, Sparkles, CheckCircle, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabase/client";

type FeedbackCategory = "bug" | "feature" | "general" | "praise";

interface FormData {
    name: string;
    email: string;
    category: FeedbackCategory;
    message: string;
    rating: number;
    honeypot: string; // Spam prevention
}

const RATE_LIMIT_KEY = "wavelength_feedback_submissions";
const RATE_LIMIT_WINDOW = 60 * 60 * 1000; // 1 hour in ms
const MAX_SUBMISSIONS = 3;

function getRateLimitData(): { submissions: number[]; } {
    if (typeof window === "undefined") return { submissions: [] };
    const data = localStorage.getItem(RATE_LIMIT_KEY);
    if (!data) return { submissions: [] };
    try {
        return JSON.parse(data);
    } catch {
        return { submissions: [] };
    }
}

function isRateLimited(): boolean {
    const data = getRateLimitData();
    const now = Date.now();
    const recentSubmissions = data.submissions.filter(
        (timestamp) => now - timestamp < RATE_LIMIT_WINDOW
    );
    return recentSubmissions.length >= MAX_SUBMISSIONS;
}

function recordSubmission(): void {
    const data = getRateLimitData();
    const now = Date.now();
    const recentSubmissions = data.submissions.filter(
        (timestamp) => now - timestamp < RATE_LIMIT_WINDOW
    );
    recentSubmissions.push(now);
    localStorage.setItem(RATE_LIMIT_KEY, JSON.stringify({ submissions: recentSubmissions }));
}

const categoryOptions: { value: FeedbackCategory; label: string; emoji: string; description: string }[] = [
    { value: "bug", label: "Bug Report", emoji: "🐛", description: "Something isn't working" },
    { value: "feature", label: "Feature Request", emoji: "✨", description: "I have an idea!" },
    { value: "general", label: "General Feedback", emoji: "💬", description: "Thoughts & suggestions" },
    { value: "praise", label: "Praise", emoji: "🎉", description: "I love this game!" },
];

export default function FeedbackForm() {
    const [formData, setFormData] = useState<FormData>({
        name: "",
        email: "",
        category: "general",
        message: "",
        rating: 0,
        honeypot: "",
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error" | "ratelimited">("idle");
    const [hoveredRating, setHoveredRating] = useState(0);

    useEffect(() => {
        // Check rate limit on mount
        if (isRateLimited()) {
            setSubmitStatus("ratelimited");
        }
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Honeypot check - if filled, it's likely a bot
        if (formData.honeypot) {
            // Silently fail for bots
            setSubmitStatus("success");
            return;
        }

        // Rate limit check
        if (isRateLimited()) {
            setSubmitStatus("ratelimited");
            return;
        }

        setIsSubmitting(true);

        try {
            const { error } = await supabase.from("feedback").insert({
                name: formData.name || null,
                email: formData.email || null,
                category: formData.category,
                message: formData.message,
                rating: formData.rating || null,
            });

            if (error) {
                console.error("Feedback submission error:", error);
                setSubmitStatus("error");
            } else {
                recordSubmission();
                setSubmitStatus("success");
                setFormData({
                    name: "",
                    email: "",
                    category: "general",
                    message: "",
                    rating: 0,
                    honeypot: "",
                });
            }
        } catch (error) {
            console.error("Feedback submission error:", error);
            setSubmitStatus("error");
        } finally {
            setIsSubmitting(false);
        }
    };

    const selectedCategory = categoryOptions.find((c) => c.value === formData.category);

    return (
        <article className="min-h-screen pt-24 pb-12 px-6 bg-background">
            <div className="max-w-2xl mx-auto">
                {/* Header */}
                <motion.header
                    className="text-center mb-12"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-wedge-teal/20 text-wedge-teal rounded-3xl mb-6">
                        <MessageSquare className="w-10 h-10" />
                    </div>
                    <h1 className="font-display text-4xl md:text-5xl font-bold text-primary mb-4">
                        Send Feedback
                    </h1>
                    <p className="text-xl text-muted-foreground max-w-xl mx-auto">
                        We&apos;d love to hear from you! Help us make Wavelength even better.
                    </p>
                </motion.header>

                {/* Success State */}
                <AnimatePresence mode="wait">
                    {submitStatus === "success" ? (
                        <motion.div
                            key="success"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            className="game-card text-center py-16"
                        >
                            <div className="inline-flex items-center justify-center w-20 h-20 bg-wedge-teal/20 text-wedge-teal rounded-full mb-6">
                                <CheckCircle className="w-10 h-10" />
                            </div>
                            <h2 className="font-display text-3xl font-bold text-primary mb-4">
                                Thank You! 🎉
                            </h2>
                            <p className="text-lg text-muted-foreground mb-8 max-w-md mx-auto">
                                Your feedback has been received. We truly appreciate you taking the time to help us improve!
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <Button
                                    onClick={() => setSubmitStatus("idle")}
                                    variant="outline"
                                    className="px-6"
                                >
                                    Send More Feedback
                                </Button>
                                <Link href="/">
                                    <Button className="btn-game px-6">
                                        Play Wavelength <ArrowRight className="ml-2 w-4 h-4" />
                                    </Button>
                                </Link>
                            </div>
                        </motion.div>
                    ) : submitStatus === "ratelimited" ? (
                        <motion.div
                            key="ratelimited"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            className="game-card text-center py-16"
                        >
                            <div className="inline-flex items-center justify-center w-20 h-20 bg-wedge-orange/20 text-wedge-orange rounded-full mb-6">
                                <AlertCircle className="w-10 h-10" />
                            </div>
                            <h2 className="font-display text-3xl font-bold text-primary mb-4">
                                Slow Down! ⏰
                            </h2>
                            <p className="text-lg text-muted-foreground mb-8 max-w-md mx-auto">
                                You&apos;ve submitted a lot of feedback recently. Please wait a bit before sending more. We appreciate your enthusiasm!
                            </p>
                            <Link href="/">
                                <Button className="btn-game px-8">
                                    Play Wavelength <ArrowRight className="ml-2 w-4 h-4" />
                                </Button>
                            </Link>
                        </motion.div>
                    ) : (
                        <motion.form
                            key="form"
                            onSubmit={handleSubmit}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                            className="space-y-8"
                        >
                            {/* Error State */}
                            {submitStatus === "error" && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: "auto" }}
                                    className="bg-destructive/10 border border-destructive/30 rounded-xl p-4 flex items-center gap-3"
                                >
                                    <AlertCircle className="w-5 h-5 text-destructive flex-shrink-0" />
                                    <p className="text-sm text-destructive">
                                        Something went wrong. Please try again later.
                                    </p>
                                </motion.div>
                            )}

                            {/* Category Selection */}
                            <div className="game-card">
                                <label className="block font-display font-semibold text-lg mb-4">
                                    What type of feedback? <span className="text-destructive">*</span>
                                </label>
                                <div className="grid grid-cols-2 gap-3">
                                    {categoryOptions.map((option) => (
                                        <button
                                            key={option.value}
                                            type="button"
                                            onClick={() => setFormData({ ...formData, category: option.value })}
                                            className={`
                                                p-4 rounded-xl border-2 text-left transition-all duration-200
                                                hover:scale-[1.02] cursor-pointer
                                                ${formData.category === option.value
                                                    ? "border-primary bg-primary/5 shadow-md"
                                                    : "border-border/50 hover:border-primary/50"
                                                }
                                            `}
                                        >
                                            <span className="text-2xl mb-2 block">{option.emoji}</span>
                                            <span className="font-semibold block">{option.label}</span>
                                            <span className="text-sm text-muted-foreground">{option.description}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Message */}
                            <div className="game-card">
                                <label htmlFor="message" className="block font-display font-semibold text-lg mb-4">
                                    Your Message <span className="text-destructive">*</span>
                                </label>
                                <div className="relative">
                                    <textarea
                                        id="message"
                                        value={formData.message}
                                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                        placeholder={
                                            selectedCategory?.value === "bug"
                                                ? "Describe what happened and what you expected to happen..."
                                                : selectedCategory?.value === "feature"
                                                    ? "Tell us about your idea..."
                                                    : selectedCategory?.value === "praise"
                                                        ? "We'd love to hear what you enjoyed!"
                                                        : "Share your thoughts..."
                                        }
                                        required
                                        rows={5}
                                        className="w-full px-4 py-3 bg-background border-2 border-border/50 rounded-xl 
                                            focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20
                                            resize-none transition-all duration-200 placeholder:text-muted-foreground/60"
                                    />
                                    <Sparkles className="absolute right-3 bottom-3 w-5 h-5 text-muted-foreground/30" />
                                </div>
                            </div>

                            {/* Optional: Rating */}
                            <div className="game-card">
                                <label className="block font-display font-semibold text-lg mb-4">
                                    How would you rate Wavelength? <span className="text-muted-foreground text-sm font-normal">(optional)</span>
                                </label>
                                <div className="flex gap-2 justify-center">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <button
                                            key={star}
                                            type="button"
                                            onClick={() => setFormData({ ...formData, rating: star })}
                                            onMouseEnter={() => setHoveredRating(star)}
                                            onMouseLeave={() => setHoveredRating(0)}
                                            className="p-2 transition-transform duration-200 hover:scale-110 cursor-pointer"
                                        >
                                            <Star
                                                className={`w-10 h-10 transition-colors duration-200 ${(hoveredRating || formData.rating) >= star
                                                    ? "fill-wedge-yellow text-wedge-yellow"
                                                    : "text-border"
                                                    }`}
                                            />
                                        </button>
                                    ))}
                                </div>
                                {formData.rating > 0 && (
                                    <motion.p
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="text-center text-sm text-muted-foreground mt-2"
                                    >
                                        {formData.rating === 5 && "Amazing! 🎉"}
                                        {formData.rating === 4 && "Great! 😊"}
                                        {formData.rating === 3 && "Good 👍"}
                                        {formData.rating === 2 && "Could be better 🤔"}
                                        {formData.rating === 1 && "We'll work on it! 💪"}
                                    </motion.p>
                                )}
                            </div>

                            {/* Optional: Contact Info */}
                            <div className="game-card">
                                <label className="block font-display font-semibold text-lg mb-4">
                                    Contact Info <span className="text-muted-foreground text-sm font-normal">(optional)</span>
                                </label>
                                <p className="text-sm text-muted-foreground mb-4">
                                    Leave your info if you&apos;d like us to follow up!
                                </p>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <label htmlFor="name" className="block text-sm font-medium mb-2">Name</label>
                                        <input
                                            type="text"
                                            id="name"
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            placeholder="Your name"
                                            className="w-full px-4 py-3 bg-background border-2 border-border/50 rounded-xl 
                                                focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20
                                                transition-all duration-200 placeholder:text-muted-foreground/60"
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="email" className="block text-sm font-medium mb-2">Email</label>
                                        <input
                                            type="email"
                                            id="email"
                                            value={formData.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                            placeholder="your@email.com"
                                            className="w-full px-4 py-3 bg-background border-2 border-border/50 rounded-xl 
                                                focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20
                                                transition-all duration-200 placeholder:text-muted-foreground/60"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Honeypot - Hidden from real users */}
                            <input
                                type="text"
                                name="website"
                                value={formData.honeypot}
                                onChange={(e) => setFormData({ ...formData, honeypot: e.target.value })}
                                autoComplete="off"
                                tabIndex={-1}
                                aria-hidden="true"
                                style={{
                                    position: "absolute",
                                    left: "-9999px",
                                    height: 0,
                                    width: 0,
                                    overflow: "hidden",
                                }}
                            />

                            {/* Submit Button */}
                            <div className="flex justify-center pt-4">
                                <Button
                                    type="submit"
                                    disabled={isSubmitting || !formData.message.trim()}
                                    className="btn-game px-12 py-6 text-xl relative overflow-hidden group"
                                >
                                    {isSubmitting ? (
                                        <>
                                            <motion.div
                                                animate={{ rotate: 360 }}
                                                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                                className="w-6 h-6 border-2 border-primary-foreground border-t-transparent rounded-full mr-2"
                                            />
                                            Sending...
                                        </>
                                    ) : (
                                        <>
                                            Send Feedback
                                            <Send className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                        </>
                                    )}
                                </Button>
                            </div>
                        </motion.form>
                    )}
                </AnimatePresence>

                {/* Back to game link */}
                {submitStatus !== "success" && submitStatus !== "ratelimited" && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="text-center mt-8"
                    >
                        <Link
                            href="/"
                            className="text-muted-foreground hover:text-primary transition-colors inline-flex items-center gap-2"
                        >
                            ← Back to game
                        </Link>
                    </motion.div>
                )}
            </div>
        </article>
    );
}
