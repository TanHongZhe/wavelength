"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Sparkles, Clock, Crown } from "lucide-react";
import { useQuery } from "convex/react";
import { api } from "convex/_generated/api";
import { STRIPE_MONTHLY_LINK, STRIPE_LIFETIME_LINK } from "@/lib/stripe";
import { useUser } from "@clerk/nextjs";

function getTimeUntilMidnightUTC(): { hours: number; minutes: number; seconds: number } {
    const now = new Date();
    const tomorrow = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate() + 1));
    const diff = tomorrow.getTime() - now.getTime();
    return {
        hours: Math.floor(diff / (1000 * 60 * 60)),
        minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((diff % (1000 * 60)) / 1000),
    };
}

export function DailyLimitBanner() {
    const { user } = useUser();
    const usage = useQuery(api.rooms.getDailyRoomCreations);
    const [timeLeft, setTimeLeft] = useState(getTimeUntilMidnightUTC());

    useEffect(() => {
        const interval = setInterval(() => {
            setTimeLeft(getTimeUntilMidnightUTC());
        }, 60_000); // Update every minute
        return () => clearInterval(interval);
    }, []);

    // Still loading
    if (!usage) return null;

    // Not signed in — don't show (the auth gate handles this)
    if (!usage.isSignedIn) return null;

    const { roomsCreated, isPro } = usage;
    const roomsLeft = Math.max(0, 3 - roomsCreated);
    const atLimit = roomsLeft === 0;

    // Pro users
    if (isPro) {
        return (
            <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-pink-500/10 to-violet-500/10 border border-pink-500/20 mb-4"
            >
                <Crown className="w-4 h-4 text-pink-400" />
                <span className="text-sm font-medium text-pink-200">
                    Unlimited room creation
                </span>
            </motion.div>
        );
    }

    // Free user at limit
    if (atLimit) {
        const handleUpgrade = () => {
            const email = user?.primaryEmailAddress?.emailAddress;
            const url = email
                ? `${STRIPE_MONTHLY_LINK}?prefilled_email=${encodeURIComponent(email)}`
                : STRIPE_MONTHLY_LINK;
            window.open(url, "_blank");
        };

        return (
            <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col items-center gap-2 px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/20 mb-4"
            >
                <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-red-400" />
                    <span className="text-sm font-medium text-red-300">
                        No rooms left today
                    </span>
                </div>
                <span className="text-xs text-muted-foreground">
                    Resets in {timeLeft.hours}h {timeLeft.minutes}m
                </span>
                <button
                    onClick={handleUpgrade}
                    className="flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-gradient-to-r from-pink-600 to-violet-600 hover:from-pink-500 hover:to-violet-500 text-white text-xs font-bold transition-all hover:scale-[1.03] shadow-lg shadow-pink-500/20"
                >
                    <Sparkles className="w-3 h-3" />
                    Get Pro — Unlimited Rooms
                </button>
            </motion.div>
        );
    }

    // Free user with rooms left
    return (
        <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-secondary/50 border border-border/50 mb-4"
        >
            <span className="text-sm text-muted-foreground">
                🎮 <span className="font-semibold text-primary">{roomsLeft}</span> room{roomsLeft !== 1 ? "s" : ""} left today
            </span>
            {roomsLeft <= 1 && (
                <span className="text-xs text-muted-foreground/70">
                    · resets in {timeLeft.hours}h {timeLeft.minutes}m
                </span>
            )}
        </motion.div>
    );
}
