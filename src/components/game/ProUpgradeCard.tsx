"use client";

import { useUser, SignInButton } from "@clerk/nextjs";
import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { Button } from "@/components/ui/button";
import { Sparkles, Infinity as InfinityIcon, Layers, Gamepad2, LogIn } from "lucide-react";
import { motion } from "framer-motion";
import { STRIPE_MONTHLY_LINK, STRIPE_LIFETIME_LINK, buildStripeUrl } from "@/lib/stripe";

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

    const handleUpgrade = () => {
        const url = buildStripeUrl(STRIPE_MONTHLY_LINK, {
            email: user?.primaryEmailAddress?.emailAddress,
            userId: user?.id,
        });
        window.open(url, "_blank");
    };

    const handleLifetime = () => {
        const url = buildStripeUrl(STRIPE_LIFETIME_LINK, {
            email: user?.primaryEmailAddress?.emailAddress,
            userId: user?.id,
        });
        window.open(url, "_blank");
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`w-full max-w-2xl mx-auto p-1 rounded-2xl bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 ${className || "mt-8"}`}
        >
            <div className="bg-slate-950 rounded-xl p-5 text-center">
                <div className="flex justify-center mb-3">
                    <div className="p-2 bg-pink-500/10 rounded-full">
                        <Sparkles className="w-6 h-6 text-pink-500" />
                    </div>
                </div>

                <h3 className="text-xl md:text-2xl font-display font-bold text-white mb-2">
                    Take Your Game Night to the Next Level
                </h3>

                <p className="text-slate-400 max-w-lg mx-auto mb-5 text-xs md:text-base px-2">
                    Unlock unlimited access for your entire party. Only one person needs to be Pro!
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-3 mb-4 md:mb-5 text-left">
                    <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex flex-row md:flex-col items-center md:items-start gap-3 md:gap-0">
                        <InfinityIcon className="w-5 h-5 text-pink-400 md:mb-2 shrink-0" />
                        <div>
                            <h4 className="font-bold text-white text-sm mb-0.5 md:mb-1">Unlimited Mini Games</h4>
                            <p className="text-xs text-slate-400">Create unlimited game rooms.</p>
                        </div>
                    </div>
                    <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex flex-row md:flex-col items-center md:items-start gap-3 md:gap-0">
                        <Layers className="w-5 h-5 text-violet-400 md:mb-2 shrink-0" />
                        <div>
                            <h4 className="font-bold text-white text-sm mb-0.5 md:mb-1">All Decks Unlocked</h4>
                            <p className="text-xs text-slate-400">Access 2000+ cards.</p>
                        </div>
                    </div>
                    <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex flex-row md:flex-col items-center md:items-start gap-3 md:gap-0">
                        <Gamepad2 className="w-5 h-5 text-blue-400 md:mb-2 shrink-0" />
                        <div>
                            <h4 className="font-bold text-white text-sm mb-0.5 md:mb-1">5+ Mini Games</h4>
                            <p className="text-xs text-slate-400">All games included.</p>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 justify-center max-w-lg mx-auto w-full">
                    {isSignedIn ? (
                        <>
                            <Button
                                onClick={handleUpgrade}
                                className="w-full flex-1 bg-gradient-to-r from-pink-600 to-violet-600 hover:from-pink-500 hover:to-violet-500 text-white border-0 shadow-lg shadow-pink-500/20 py-5 text-sm transition-all hover:scale-[1.02]"
                            >
                                <div className="flex flex-col items-center">
                                    <span className="font-bold">Upgrade to Pro</span>
                                    <span className="text-[10px] opacity-90">$0.99 for 1 month</span>
                                </div>
                            </Button>
                            <Button
                                onClick={handleLifetime}
                                variant="outline"
                                className="w-full flex-1 border-pink-500/30 hover:bg-pink-900/20 hover:text-pink-200 hover:border-pink-500/60 py-5 text-sm bg-transparent text-pink-300 transition-all hover:scale-[1.02] relative overflow-visible group"
                            >
                                <div className="absolute -top-2 -right-2 bg-gradient-to-r from-red-600 to-rose-600 px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider text-white shadow-lg z-10 animate-pulse border border-white/10">Limited Time</div>
                                <div className="flex flex-col items-center relative z-0">
                                    <span className="font-bold">Lifetime Access</span>
                                    <div className="flex items-center gap-1.5">
                                        <span className="text-[10px] opacity-60 line-through text-slate-400">$9.99</span>
                                        <span className="text-[10px] font-bold text-pink-200">$2.99 one-time</span>
                                    </div>
                                </div>
                            </Button>
                        </>
                    ) : (
                        <SignInButton mode="modal">
                            <Button className="w-full max-w-sm mx-auto bg-gradient-to-r from-pink-600 to-violet-600 hover:from-pink-500 hover:to-violet-500 text-white border-0 shadow-lg shadow-pink-500/20 py-4 text-base transition-all hover:scale-[1.02]">
                                <LogIn className="w-4 h-4 mr-2" />
                                Log In to Upgrade
                            </Button>
                        </SignInButton>
                    )}
                </div>

                <p className="mt-3 text-[10px] text-slate-500">
                    Secure payment via Stripe. One-time payment.
                </p>
            </div>
        </motion.div>
    );
}
