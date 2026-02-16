"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Sparkles, LogIn, Infinity as InfinityIcon, Layers, Gamepad2, Heart } from "lucide-react";
import { useUser, SignInButton } from "@clerk/nextjs";

// ============================================================
// STRIPE PAYMENT LINKS (PRODUCTION)
const STRIPE_MONTHLY_LINK = "https://buy.stripe.com/5kQ4gBeej9Nla9g0yrfQI02";
const STRIPE_LIFETIME_LINK = "https://buy.stripe.com/4gMeVf2vB7Fda9g0yrfQI03";

interface PaywallModalProps {
    isOpen: boolean;
    onClose: () => void;
    message?: string;
}

export function PaywallModal({ isOpen, onClose, message }: PaywallModalProps) {
    const { isSignedIn, user } = useUser();

    const handleUpgrade = () => {
        // Append email to prefill checkout if user is signed in
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
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-4xl bg-slate-950 border-slate-800 text-slate-100 p-0 overflow-hidden">
                <div className="p-6 md:p-8 max-h-[90vh] overflow-y-auto">
                    <DialogHeader className="mb-8 text-center">
                        <DialogTitle className="flex items-center justify-center gap-2 text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-400 to-violet-400">
                            <Sparkles className="w-8 h-8 text-pink-400" />
                            Unlock the Full Experience
                        </DialogTitle>
                        <DialogDescription className="text-slate-400 text-lg mt-2">
                            {message || "You've reached the limit. Upgrade to play without boundaries."}
                        </DialogDescription>
                        <div className="mt-4">
                            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-pink-500/10 to-violet-500/10 border border-pink-500/20 text-pink-200 text-sm font-medium">
                                <Sparkles className="w-3.5 h-3.5 text-pink-400" />
                                <span>Only the host needs Pro to unlock for the whole party!</span>
                            </span>
                        </div>
                    </DialogHeader>

                    {/* Bento Grid Benefits */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                        {/* Box 1: Unlimited */}
                        <div className="group relative p-6 rounded-2xl bg-slate-900/50 border border-slate-800 hover:border-pink-500/50 transition-all duration-300 hover:shadow-[0_0_20px_rgba(236,72,153,0.15)] flex flex-col justify-between">
                            <div className="absolute inset-0 bg-gradient-to-br from-pink-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl" />
                            <div className="relative">
                                <div className="w-10 h-10 rounded-full bg-pink-500/20 flex items-center justify-center mb-4 text-pink-400">
                                    <InfinityIcon className="w-5 h-5" />
                                </div>
                                <h3 className="text-xl font-bold mb-2">Unlimited Access</h3>
                                <div className="text-slate-400">
                                    <p className="mb-1">Create unlimited games. <span className="text-pink-200 font-medium">Your pro status<br />unlocks unlimited rounds for everyone in<br />your party.</span></p>
                                </div>
                            </div>
                        </div>

                        {/* Box 2: Wavelength Content */}
                        <div className="group relative p-6 rounded-2xl bg-slate-900/50 border border-slate-800 hover:border-violet-500/50 transition-all duration-300 hover:shadow-[0_0_20px_rgba(139,92,246,0.15)] flex flex-col justify-between">
                            <div className="absolute inset-0 bg-gradient-to-br from-violet-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl" />
                            <div className="relative">
                                <div className="w-10 h-10 rounded-full bg-violet-500/20 flex items-center justify-center mb-4 text-violet-400">
                                    <Layers className="w-5 h-5" />
                                </div>
                                <h3 className="text-xl font-bold mb-2">Wavelength Decks</h3>
                                <div className="text-slate-400">
                                    <p className="mb-1"><span className="text-white font-semibold">6 Exclusive Decks</span> included</p>
                                    <p>Unlock <span className="text-white font-semibold">200+ new cards</span> for your entire group to play.</p>
                                </div>
                            </div>
                        </div>

                        {/* Box 3: Minigames Content */}
                        <div className="group relative p-6 rounded-2xl bg-slate-900/50 border border-slate-800 hover:border-blue-500/50 transition-all duration-300 hover:shadow-[0_0_20px_rgba(59,130,246,0.15)] flex flex-col justify-between">
                            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl" />
                            <div className="relative">
                                <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center mb-4 text-blue-400">
                                    <Gamepad2 className="w-5 h-5" />
                                </div>
                                <h3 className="text-xl font-bold mb-2">Mini Game Content</h3>
                                <div className="text-slate-400">
                                    <p className="mb-1"><span className="text-white font-semibold">5 mini games</span> included</p>
                                    <p>Unlock <span className="text-white font-semibold">2000+ cards</span> for never ending fun.</p>
                                </div>
                            </div>
                        </div>

                        {/* Box 4: Support */}
                        <div className="group relative p-6 rounded-2xl bg-slate-900/50 border border-slate-800 hover:border-green-500/50 transition-all duration-300 hover:shadow-[0_0_20px_rgba(34,197,94,0.15)] flex flex-col justify-between">
                            <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl" />
                            <div className="relative">
                                <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center mb-4 text-green-400">
                                    <Heart className="w-5 h-5" />
                                </div>
                                <h3 className="text-xl font-bold mb-2">Support Indie</h3>
                                <div className="text-slate-400">
                                    <p>Your support directly helps us keep the servers running and build new features.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Comparison Table */}
                    <div className="bg-slate-900/30 rounded-xl p-4 mb-8">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b border-slate-800">
                                    <th className="py-3 px-4 font-medium text-slate-400">Feature</th>
                                    <th className="py-3 px-4 font-medium text-slate-400 text-center">Free</th>
                                    <th className="py-3 px-4 font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-violet-400 text-center">Pro</th>
                                </tr>
                            </thead>
                            <tbody className="text-sm">
                                <tr className="border-b border-slate-800/50">
                                    <td className="py-3 px-4 text-slate-300">
                                        <div>Daily Games</div>
                                        <div className="text-xs text-slate-500 font-normal">Per person</div>
                                    </td>
                                    <td className="py-3 px-4 text-center text-slate-500">3 / day</td>
                                    <td className="py-3 px-4 text-center text-green-400 font-bold">Unlimited</td>
                                </tr>
                                <tr className="border-b border-slate-800/50">
                                    <td className="py-3 px-4 text-slate-300">
                                        <div>Party Access</div>
                                        <div className="text-xs text-slate-500 font-normal">Unlock for friends</div>
                                    </td>
                                    <td className="py-3 px-4 text-center text-slate-500">-</td>
                                    <td className="py-3 px-4 text-center text-white">✅ Host Unlocks All</td>
                                </tr>
                                <tr className="border-b border-slate-800/50">
                                    <td className="py-3 px-4 text-slate-300">Wavelength Decks</td>
                                    <td className="py-3 px-4 text-center text-slate-500">1 (Fun)</td>
                                    <td className="py-3 px-4 text-center text-white">All 7 Decks</td>
                                </tr>
                                <tr className="border-b border-slate-800/50">
                                    <td className="py-3 px-4 text-slate-300">
                                        <div>Mini Games</div>
                                        <div className="text-xs text-slate-500 font-normal">Over 14 Decks Included</div>
                                    </td>
                                    <td className="py-3 px-4 text-center text-slate-500">Normal Decks</td>
                                    <td className="py-3 px-4 text-center text-white">Unlock All Decks</td>
                                </tr>
                                <tr>
                                    <td className="py-3 px-4 text-slate-300">Total Cards</td>
                                    <td className="py-3 px-4 text-center text-slate-500">100+ Cards</td>
                                    <td className="py-3 px-4 text-center text-white font-bold">2000+ Cards Available</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div className="flex flex-col gap-3 sm:flex-col">
                        {isSignedIn ? (
                            <>
                                <Button onClick={handleUpgrade} className="w-full bg-gradient-to-r from-pink-600 to-violet-600 hover:from-pink-500 hover:to-violet-500 text-white border-0 shadow-lg shadow-pink-500/20 py-6 text-lg transition-all hover:scale-[1.02]">
                                    <div className="flex flex-col items-center">
                                        <span className="font-bold">Upgrade Monthly</span>
                                        <span className="text-xs opacity-90">$0.99 / month</span>
                                    </div>
                                </Button>
                                <Button onClick={handleLifetime} variant="outline" className="w-full border-pink-500/30 hover:bg-pink-900/20 hover:text-pink-200 hover:border-pink-500/60 py-6 text-lg bg-transparent text-pink-300 transition-all hover:scale-[1.02] relative overflow-hidden group">
                                    <div className="absolute top-0 right-0 bg-gradient-to-l from-red-600 to-transparent px-8 py-1 text-[9px] font-bold uppercase tracking-wider text-white rotate-45 translate-x-[18px] -translate-y-0.5 shadow-md">Limited Time</div>
                                    <div className="flex flex-col items-center">
                                        <span className="font-bold">Lifetime Access</span>
                                        <div className="flex items-center gap-2">
                                            <span className="text-xs opacity-60 line-through text-slate-400">$9.99</span>
                                            <span className="text-xs font-bold text-pink-200">$2.99 one-time</span>
                                        </div>
                                    </div>
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
                        <Button variant="ghost" onClick={onClose} className="hover:bg-slate-800 text-slate-500 hover:text-slate-300 text-sm mt-2">
                            Maybe Later
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
