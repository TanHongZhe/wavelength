"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
    Crown, Sparkles, Check, X, Infinity as InfinityIcon,
    Layers, Gamepad2, Heart, Users, LogIn, ArrowLeft
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useUser, SignInButton } from "@clerk/nextjs";
import { useQuery } from "convex/react";
import { api } from "convex/_generated/api";
import { STRIPE_MONTHLY_LINK, STRIPE_LIFETIME_LINK } from "@/lib/stripe";
import { Footer } from "@/components/Footer";

export default function PricingPage() {
    const { isSignedIn, user } = useUser();
    const myUser = useQuery(api.rooms.getMyUser);
    const isPro = myUser?.isPro ?? false;

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

    const features = [
        {
            name: "Wavelength Classic & Party",
            desc: "Create rooms",
            guest: "Unlimited",
            free: "Unlimited",
            pro: "Unlimited",
            guestCheck: true,
            freeCheck: true,
            proCheck: true,
        },
        {
            name: "Wavelength Rounds",
            desc: "Per game",
            guest: "5 rounds",
            free: "5 rounds",
            pro: "Unlimited",
            guestCheck: true,
            freeCheck: true,
            proCheck: true,
        },
        {
            name: "Wavelength Decks",
            desc: "Card variety",
            guest: "1 (Fun)",
            free: "1 (Fun)",
            pro: "All 7 Decks",
            guestCheck: true,
            freeCheck: true,
            proCheck: true,
        },
        {
            name: "Join Mini Games",
            desc: "Join rooms others create",
            guest: "✅ Yes",
            free: "✅ Yes",
            pro: "✅ Yes",
            guestCheck: true,
            freeCheck: true,
            proCheck: true,
        },
        {
            name: "Create Mini Games",
            desc: "Host your own mini game rooms",
            guest: "—",
            free: "3 / day",
            pro: "Unlimited",
            guestCheck: false,
            freeCheck: true,
            proCheck: true,
        },
        {
            name: "Mini Game Rounds",
            desc: "Per game",
            guest: "5 rounds",
            free: "5 rounds",
            pro: "Up to 100",
            guestCheck: true,
            freeCheck: true,
            proCheck: true,
        },
        {
            name: "Mini Game Decks",
            desc: "Exclusive card packs",
            guest: "Normal",
            free: "Normal",
            pro: "All Decks Unlocked",
            guestCheck: true,
            freeCheck: true,
            proCheck: true,
        },
        {
            name: "Party Pro Access",
            desc: "Host unlocks for everyone",
            guest: "—",
            free: "—",
            pro: "✅ Host Unlocks All",
            guestCheck: false,
            freeCheck: false,
            proCheck: true,
        },
        {
            name: "Total Cards Available",
            desc: "Across all games",
            guest: "100+",
            free: "300+",
            pro: "2000+",
            guestCheck: true,
            freeCheck: true,
            proCheck: true,
        },
    ];

    return (
        <div className="min-h-screen bg-background">
            {/* Hero Section */}
            <div className="relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-pink-500/5 via-violet-500/5 to-transparent" />
                <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />

                <div className="relative z-10 container max-w-6xl mx-auto px-4 pt-28 pb-16 text-center">
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back to Home
                    </Link>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-pink-500/10 to-violet-500/10 border border-pink-500/20 text-pink-300 text-sm font-medium mb-6">
                            <Sparkles className="w-3.5 h-3.5 text-pink-400" />
                            Only the host needs Pro to unlock for the whole party!
                        </div>

                        <h1 className="font-display text-4xl md:text-6xl font-bold mb-4">
                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-400 via-violet-400 to-indigo-400">
                                Simple Pricing
                            </span>
                        </h1>
                        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
                            Play for free or upgrade to Pro for the full experience. No hidden fees.
                        </p>
                    </motion.div>
                </div>
            </div>

            {/* Pricing Cards */}
            <div className="container max-w-6xl mx-auto px-4 -mt-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
                    {/* Guest Tier */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="relative rounded-2xl border border-border/60 bg-card/50 backdrop-blur-sm p-6 flex flex-col"
                    >
                        <div className="mb-6">
                            <div className="w-12 h-12 rounded-xl bg-slate-500/10 flex items-center justify-center mb-4">
                                <Users className="w-6 h-6 text-slate-400" />
                            </div>
                            <h3 className="font-display text-2xl font-bold mb-1">Guest</h3>
                            <p className="text-sm text-muted-foreground">No account needed</p>
                        </div>

                        <div className="text-3xl font-bold mb-1">Free</div>
                        <p className="text-sm text-muted-foreground mb-6">No login required</p>

                        <div className="space-y-3 mb-8 flex-1">
                            <div className="flex items-start gap-2.5">
                                <Check className="w-4 h-4 text-green-400 mt-0.5 shrink-0" />
                                <span className="text-sm">Unlimited Classic & Party games</span>
                            </div>
                            <div className="flex items-start gap-2.5">
                                <Check className="w-4 h-4 text-green-400 mt-0.5 shrink-0" />
                                <span className="text-sm">Join any mini game room</span>
                            </div>
                            <div className="flex items-start gap-2.5">
                                <X className="w-4 h-4 text-red-400/60 mt-0.5 shrink-0" />
                                <span className="text-sm text-muted-foreground">Limited to 5 rounds per game</span>
                            </div>
                            <div className="flex items-start gap-2.5">
                                <X className="w-4 h-4 text-red-400/60 mt-0.5 shrink-0" />
                                <span className="text-sm text-muted-foreground">Cannot create mini game rooms</span>
                            </div>
                            <div className="flex items-start gap-2.5">
                                <X className="w-4 h-4 text-red-400/60 mt-0.5 shrink-0" />
                                <span className="text-sm text-muted-foreground">Limited to 1 deck (Fun)</span>
                            </div>
                        </div>

                        <Link href="/">
                            <Button variant="outline" className="w-full py-5">
                                Play Now
                            </Button>
                        </Link>
                    </motion.div>

                    {/* Free (Logged In) Tier */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="relative rounded-2xl border border-border/60 bg-card/50 backdrop-blur-sm p-6 flex flex-col"
                    >
                        <div className="mb-6">
                            <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center mb-4">
                                <LogIn className="w-6 h-6 text-blue-400" />
                            </div>
                            <h3 className="font-display text-2xl font-bold mb-1">Free</h3>
                            <p className="text-sm text-muted-foreground">Create an account</p>
                        </div>

                        <div className="text-3xl font-bold mb-1">Free</div>
                        <p className="text-sm text-muted-foreground mb-6">Just sign up</p>

                        <div className="space-y-3 mb-8 flex-1">
                            <div className="flex items-start gap-2.5">
                                <Check className="w-4 h-4 text-green-400 mt-0.5 shrink-0" />
                                <span className="text-sm">Unlimited Classic & Party games</span>
                            </div>
                            <div className="flex items-start gap-2.5">
                                <Check className="w-4 h-4 text-green-400 mt-0.5 shrink-0" />
                                <span className="text-sm">Join any mini game room</span>
                            </div>
                            <div className="flex items-start gap-2.5">
                                <X className="w-4 h-4 text-red-400/60 mt-0.5 shrink-0" />
                                <span className="text-sm text-muted-foreground">Limited to 5 rounds per game</span>
                            </div>
                            <div className="flex items-start gap-2.5">
                                <Check className="w-4 h-4 text-green-400 mt-0.5 shrink-0" />
                                <span className="text-sm">Create mini game rooms (3/day)</span>
                            </div>
                            <div className="flex items-start gap-2.5">
                                <Check className="w-4 h-4 text-green-400 mt-0.5 shrink-0" />
                                <span className="text-sm">5 rounds per mini game</span>
                            </div>
                            <div className="flex items-start gap-2.5">
                                <X className="w-4 h-4 text-red-400/60 mt-0.5 shrink-0" />
                                <span className="text-sm text-muted-foreground">Limited to 1 deck (Fun)</span>
                            </div>

                        </div>

                        {isSignedIn ? (
                            <Button variant="outline" className="w-full py-5" disabled>
                                Current Plan
                            </Button>
                        ) : (
                            <SignInButton mode="modal">
                                <Button variant="outline" className="w-full py-5">
                                    <LogIn className="w-4 h-4 mr-2" />
                                    Sign Up Free
                                </Button>
                            </SignInButton>
                        )}
                    </motion.div>

                    {/* Pro Tier */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className="relative rounded-2xl border-2 border-pink-500/40 bg-gradient-to-b from-pink-500/5 via-card/80 to-card/50 backdrop-blur-sm p-6 flex flex-col shadow-[0_0_30px_rgba(236,72,153,0.1)]"
                    >
                        {/* Popular badge */}
                        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                            <span className="inline-flex items-center gap-1.5 px-4 py-1 rounded-full bg-gradient-to-r from-pink-600 to-violet-600 text-white text-xs font-bold shadow-lg">
                                <Sparkles className="w-3 h-3" />
                                MOST POPULAR
                            </span>
                        </div>

                        <div className="mb-6 mt-2">
                            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-pink-500/20 to-violet-500/20 flex items-center justify-center mb-4">
                                <Crown className="w-6 h-6 text-pink-400" />
                            </div>
                            <h3 className="font-display text-2xl font-bold mb-1">Pro</h3>
                            <p className="text-sm text-muted-foreground">The full experience</p>
                        </div>

                        <div className="mb-6">
                            <div className="flex items-baseline gap-2 mb-1">
                                <span className="text-3xl font-bold">$0.99</span>
                                <span className="text-muted-foreground text-sm">/ 1 month</span>
                            </div>
                            <p className="text-sm text-muted-foreground">One-time payment</p>
                            <div className="mt-2 flex items-center gap-2">
                                <span className="text-xs text-muted-foreground line-through">$9.99</span>
                                <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-gradient-to-r from-red-600 to-rose-600 text-white text-[10px] font-bold animate-pulse">
                                    LIMITED: $2.99 lifetime
                                </span>
                            </div>
                        </div>

                        <div className="space-y-3 mb-8 flex-1">
                            <div className="flex items-start gap-2.5">
                                <Check className="w-4 h-4 text-green-400 mt-0.5 shrink-0" />
                                <span className="text-sm font-medium">Everything in Free</span>
                            </div>
                            <div className="flex items-start gap-2.5">
                                <Check className="w-4 h-4 text-green-400 mt-0.5 shrink-0" />
                                <span className="text-sm"><strong>Unlimited</strong> game creation</span>
                            </div>
                            <div className="flex items-start gap-2.5">
                                <Check className="w-4 h-4 text-green-400 mt-0.5 shrink-0" />
                                <span className="text-sm"><strong>All 7</strong> Wavelength decks (200+ cards)</span>
                            </div>
                            <div className="flex items-start gap-2.5">
                                <Check className="w-4 h-4 text-green-400 mt-0.5 shrink-0" />
                                <span className="text-sm"><strong>Unlimited</strong> mini game rooms</span>
                            </div>
                            <div className="flex items-start gap-2.5">
                                <Check className="w-4 h-4 text-green-400 mt-0.5 shrink-0" />
                                <span className="text-sm">Up to <strong>100</strong> mini game rounds</span>
                            </div>
                            <div className="flex items-start gap-2.5">
                                <Check className="w-4 h-4 text-green-400 mt-0.5 shrink-0" />
                                <span className="text-sm">All mini game decks (2000+ cards)</span>
                            </div>
                            <div className="flex items-start gap-2.5">
                                <Check className="w-4 h-4 text-pink-400 mt-0.5 shrink-0" />
                                <span className="text-sm text-pink-200 font-medium">Host unlocks Pro for your entire party!</span>
                            </div>
                        </div>

                        {isPro ? (
                            <div className="flex items-center justify-center gap-2 py-3 rounded-lg bg-gradient-to-r from-amber-400/20 to-orange-500/20 border border-amber-500/30 text-amber-300 font-bold">
                                <Crown className="w-4 h-4" fill="currentColor" />
                                You{"'"}re a Pro!
                            </div>
                        ) : isSignedIn ? (
                            <div className="space-y-2">
                                <Button
                                    onClick={handleLifetime}
                                    className="w-full bg-gradient-to-r from-pink-600 to-violet-600 hover:from-pink-500 hover:to-violet-500 text-white border-0 shadow-lg shadow-pink-500/20 py-5 transition-all hover:scale-[1.02]"
                                >
                                    <Sparkles className="w-4 h-4 mr-2" />
                                    Lifetime Pro — $2.99
                                    <span className="text-xs ml-2 line-through opacity-60">$9.99</span>
                                </Button>
                                <Button
                                    onClick={handleUpgrade}
                                    variant="outline"
                                    className="w-full border-pink-500/30 hover:bg-pink-900/20 hover:text-pink-200 hover:border-pink-500/60 py-5 bg-transparent text-pink-300 transition-all hover:scale-[1.02]"
                                >
                                    <span className="font-bold">Monthly $0.99</span>
                                    <span className="text-xs ml-1 text-muted-foreground">/ 1 month</span>
                                </Button>
                            </div>
                        ) : (
                            <SignInButton mode="modal">
                                <Button className="w-full bg-gradient-to-r from-pink-600 to-violet-600 hover:from-pink-500 hover:to-violet-500 text-white border-0 shadow-lg shadow-pink-500/20 py-5 transition-all hover:scale-[1.02]">
                                    <LogIn className="w-4 h-4 mr-2" />
                                    Sign In to Upgrade
                                </Button>
                            </SignInButton>
                        )}
                    </motion.div>
                </div>

                {/* Detailed Comparison Table */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="max-w-4xl mx-auto mb-20"
                >
                    <h2 className="font-display text-2xl md:text-3xl font-bold text-center mb-8">
                        Full Feature Comparison
                    </h2>

                    <div className="rounded-2xl border border-border/60 overflow-hidden bg-card/30 backdrop-blur-sm">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="border-b border-border/60 bg-muted/30">
                                        <th className="py-4 px-5 font-medium text-muted-foreground text-sm">Feature</th>
                                        <th className="py-4 px-5 font-medium text-muted-foreground text-sm text-center">
                                            <div className="flex flex-col items-center gap-1">
                                                <Users className="w-4 h-4" />
                                                <span>Guest</span>
                                            </div>
                                        </th>
                                        <th className="py-4 px-5 font-medium text-muted-foreground text-sm text-center">
                                            <div className="flex flex-col items-center gap-1">
                                                <LogIn className="w-4 h-4" />
                                                <span>Free</span>
                                            </div>
                                        </th>
                                        <th className="py-4 px-5 font-bold text-sm text-center">
                                            <div className="flex flex-col items-center gap-1 text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-violet-400">
                                                <Crown className="w-4 h-4 text-pink-400" />
                                                <span>Pro</span>
                                            </div>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="text-sm">
                                    {features.map((feature, i) => (
                                        <tr key={i} className="border-b border-border/30 last:border-0 hover:bg-muted/20 transition-colors">
                                            <td className="py-3.5 px-5">
                                                <div className="font-medium">{feature.name}</div>
                                                <div className="text-xs text-muted-foreground">{feature.desc}</div>
                                            </td>
                                            <td className="py-3.5 px-5 text-center">
                                                {feature.guestCheck ? (
                                                    <span className="text-muted-foreground">{feature.guest}</span>
                                                ) : (
                                                    <span className="text-red-400/60">—</span>
                                                )}
                                            </td>
                                            <td className="py-3.5 px-5 text-center">
                                                {feature.freeCheck ? (
                                                    <span className="text-muted-foreground">{feature.free}</span>
                                                ) : (
                                                    <span className="text-red-400/60">—</span>
                                                )}
                                            </td>
                                            <td className="py-3.5 px-5 text-center">
                                                <span className={feature.proCheck ? "text-green-400 font-semibold" : "text-red-400/60"}>
                                                    {feature.pro}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </motion.div>
            </div>
            <div className="container mx-auto px-4 max-w-4xl">
                <Footer />
            </div>
        </div>
    );
}
