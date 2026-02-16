"use client";

import { useUser, SignInButton } from "@clerk/nextjs";
import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { Button } from "@/components/ui/button";
import { Sparkles, Infinity as InfinityIcon, Layers, Gamepad2, LogIn } from "lucide-react";
import { motion } from "framer-motion";

interface ProUpgradeCardProps {
    className?: string;
}

export function ProUpgradeCard({ className }: ProUpgradeCardProps) {
    const { isSignedIn, user } = useUser();

    // Check Pro status from Convex if user is signed in
    const userProfile = useQuery(api.users.current);
    const isPro = userProfile?.isPro;

    // Don't show if user is already Pro
    if (isPro) return null;

    // Payment Links
    const STRIPE_MONTHLY_LINK = "https://buy.stripe.com/5kQ4gBeej9Nla9g0yrfQI02";
    const STRIPE_LIFETIME_LINK = "https://buy.stripe.com/4gMeVf2vB7Fda9g0yrfQI03";

    const handleUpgrade = () => {
        const email = user?.primaryEmailAddress?.emailAddress;
        const url = email
            ? `${STRIPE_MONTHLY_LINK}?prefilled_email=${encodeURIComponent(email)}`
            : STRIPE_MONTHLY_LINK;
        window.open(url, "_blank");
    };

    const handleLifetime = () => {
        const email = user?.primaryEmailAddress?.emailAddress;
        const url = email
            ? `${STRIPE_LIFETIME_LINK}?prefilled_email=${encodeURIComponent(email)}`
            : STRIPE_LIFETIME_LINK;
        window.open(url, "_blank");
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`w-full max-w-4xl mx-auto p-1 rounded-2xl bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 ${className || "mt-12"}`}
        >
            <div className="bg-slate-950 rounded-xl p-6 md:p-8 text-center">
                <div className="flex justify-center mb-6">
                    <div className="p-3 bg-pink-500/10 rounded-full">
                        <Sparkles className="w-8 h-8 text-pink-500" />
                    </div>
                </div>

                <h3 className="text-2xl md:text-3xl font-display font-bold text-white mb-4">
                    Take Your Game Night to the Next Level
                </h3>

                <p className="text-slate-400 max-w-2xl mx-auto mb-8 text-lg">
                    Unlock unlimited access for your entire party. Only one person needs to be Pro!
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 text-left">
                    <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
                        <InfinityIcon className="w-6 h-6 text-pink-400 mb-3" />
                        <h4 className="font-bold text-white mb-1">Unlimited Rounds</h4>
                        <p className="text-sm text-slate-400">Play as long as you want without interruptions.</p>
                    </div>
                    <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
                        <Layers className="w-6 h-6 text-violet-400 mb-3" />
                        <h4 className="font-bold text-white mb-1">All Decks Unlocked</h4>
                        <p className="text-sm text-slate-400">Access over 2000+ cards across all game modes.</p>
                    </div>
                    <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
                        <Gamepad2 className="w-6 h-6 text-blue-400 mb-3" />
                        <h4 className="font-bold text-white mb-1">5+ Mini Games</h4>
                        <p className="text-sm text-slate-400">Full access to all Rapid Fire mini games.</p>
                    </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
                    {isSignedIn ? (
                        <>
                            <Button
                                onClick={handleUpgrade}
                                className="w-full bg-gradient-to-r from-pink-600 to-violet-600 hover:from-pink-500 hover:to-violet-500 text-white border-0 shadow-lg shadow-pink-500/20 py-6 text-lg transition-all hover:scale-[1.02]"
                            >
                                <span className="font-bold mr-2">Upgrade Monthly</span>
                                <span className="text-xs opacity-90">($0.99/mo)</span>
                            </Button>
                            <Button
                                onClick={handleLifetime}
                                variant="outline"
                                className="w-full border-slate-700 hover:bg-slate-800 hover:text-white py-6 text-lg bg-transparent text-slate-400 transition-all hover:scale-[1.02]"
                            >
                                <span className="font-bold mr-2">Lifetime</span>
                                <span className="text-xs opacity-90">($2.99)</span>
                            </Button>
                        </>
                    ) : (
                        <SignInButton mode="modal">
                            <Button className="w-full bg-gradient-to-r from-pink-600 to-violet-600 hover:from-pink-500 hover:to-violet-500 text-white border-0 shadow-lg shadow-pink-500/20 py-6 text-lg transition-all hover:scale-[1.02]">
                                <LogIn className="w-5 h-5 mr-2" />
                                Log In to Upgrade
                            </Button>
                        </SignInButton>
                    )}
                </div>

                <p className="mt-4 text-xs text-slate-500">
                    Secure payment via Stripe. Cancel anytime.
                </p>
            </div>
        </motion.div>
    );
}
