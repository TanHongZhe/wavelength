"use client";

import Link from "next/link";
import { AudioWaveform } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import { motion } from "framer-motion";
import { SignedIn, SignedOut, SignInButton, UserButton, SignOutButton } from "@clerk/nextjs";
import { useState } from "react";
import { PaywallModal } from "./PaywallModal";
import { Crown } from "lucide-react";
import { useQuery } from "convex/react";
import { api } from "convex/_generated/api";

export function Navbar() {
    const [showPaywall, setShowPaywall] = useState(false);
    const myUser = useQuery(api.rooms.getMyUser);
    const isPro = myUser?.isPro ?? false;

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 px-4 md:px-6 py-4 flex items-center justify-between pointer-events-none">
            <PaywallModal isOpen={showPaywall} onClose={() => setShowPaywall(false)} />
            <motion.div
                className="flex items-center gap-2 pointer-events-auto bg-background/80 backdrop-blur-md p-2 pl-3 pr-4 rounded-full border border-border/50 shadow-sm"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <Link href="/" className="flex items-center gap-2">
                    <div className="bg-primary text-primary-foreground p-1.5 rounded-full">
                        <AudioWaveform className="w-5 h-5" />
                    </div>
                    <span className="font-display font-bold text-lg tracking-tight">
                        Wavelength
                    </span>
                </Link>
                {isPro ? (
                    <div className="ml-2 flex items-center gap-1.5 px-3 py-1 bg-gradient-to-r from-amber-400 to-orange-500 text-white rounded-full text-[10px] font-bold shadow-lg shadow-orange-500/30 cursor-default animate-pulse">
                        <Crown className="w-3 h-3" fill="currentColor" />
                        <span>PRO USER</span>
                    </div>
                ) : (
                    <button
                        onClick={() => setShowPaywall(true)}
                        className="ml-2 flex items-center gap-1.5 px-3 py-1 bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-500 hover:to-orange-600 text-white rounded-full text-[10px] font-bold shadow-sm transition-all hover:scale-105"
                    >
                        <Crown className="w-3 h-3" fill="currentColor" />
                        <span>GET PRO</span>
                    </button>
                )}
            </motion.div>

            <motion.div
                className="pointer-events-auto flex items-center gap-3"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
            >
                <Link
                    href="/rules/"
                    className="hidden sm:block text-sm font-medium text-muted-foreground hover:text-foreground transition-colors px-3 py-2 rounded-full hover:bg-secondary/50"
                >
                    Rules
                </Link>
                <Link
                    href="/faq/"
                    className="hidden sm:block text-sm font-medium text-muted-foreground hover:text-foreground transition-colors px-3 py-2 rounded-full hover:bg-secondary/50"
                >
                    FAQ
                </Link>
                <Link
                    href="/about/"
                    className="hidden sm:block text-sm font-medium text-muted-foreground hover:text-foreground transition-colors px-3 py-2 rounded-full hover:bg-secondary/50"
                >
                    About
                </Link>
                <Link
                    href="/feedback/"
                    className="hidden sm:block text-sm font-medium text-muted-foreground hover:text-foreground transition-colors px-3 py-2 rounded-full hover:bg-secondary/50"
                >
                    Feedback
                </Link>

                <SignedOut>
                    <SignInButton mode="modal">
                        <button className="text-sm font-medium bg-primary text-primary-foreground px-4 py-2 rounded-full hover:bg-primary/90 transition-all shadow-md hover:shadow-lg">
                            Login
                        </button>
                    </SignInButton>
                </SignedOut>

                <SignedIn>
                    <div className="flex items-center gap-3">
                        <UserButton afterSignOutUrl="/" />
                        <div className="hidden sm:block">
                            <SignOutButton redirectUrl="/">
                                <button className="text-xs font-medium text-muted-foreground hover:text-red-400 transition-colors border border-border/50 px-2 py-1 rounded-md">
                                    Sign Out
                                </button>
                            </SignOutButton>
                        </div>
                    </div>
                </SignedIn>

                <ThemeToggle />
            </motion.div>
        </nav>
    );
}
