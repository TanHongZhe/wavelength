"use client";

import Link from "next/link";
import { AudioWaveform, Menu, X } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import { motion, AnimatePresence } from "framer-motion";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { useState, useEffect } from "react";
import { PaywallModal } from "./PaywallModal";
import { Crown } from "lucide-react";
import { useQuery } from "convex/react";
import { api } from "convex/_generated/api";
import { usePathname } from "next/navigation";

const NAV_LINKS = [
    { href: "/pricing/", label: "Pricing" },
    { href: "/rules/", label: "Rules" },
    { href: "/about/", label: "About" },
    { href: "/feedback/", label: "Feedback" },
];

export function Navbar() {
    const [showPaywall, setShowPaywall] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const myUser = useQuery(api.rooms.getMyUser);
    const isPro = myUser?.isPro ?? false;
    const pathname = usePathname();


    // Close mobile menu on route change
    useEffect(() => {
        setMobileOpen(false);
    }, [pathname]);

    // Prevent body scroll when mobile menu is open
    useEffect(() => {
        if (mobileOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => { document.body.style.overflow = ""; };
    }, [mobileOpen]);

    return (
        <>
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
                        <Link
                            href="/pricing/"
                            className="ml-2 flex items-center gap-1.5 px-3 py-1 bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-500 hover:to-orange-600 text-white rounded-full text-[10px] font-bold shadow-sm transition-all hover:scale-105"
                        >
                            <Crown className="w-3 h-3" fill="currentColor" />
                            <span>GET PRO</span>
                        </Link>
                    )}
                </motion.div>

                <motion.div
                    className="pointer-events-auto flex items-center gap-3"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                >
                    {/* Desktop nav links */}
                    {NAV_LINKS.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={`hidden md:block text-sm font-medium transition-all px-3 py-2 rounded-full ${link.label === "Pricing"
                                ? "text-yellow-400 hover:text-yellow-300 font-bold drop-shadow-[0_0_8px_rgba(250,204,21,0.6)]"
                                : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                                }`}
                        >
                            {link.label}
                        </Link>
                    ))}

                    {/* Desktop auth */}
                    <div className="hidden md:block">
                        <SignedOut>
                            <SignInButton mode="modal">
                                <button className="text-sm font-medium bg-primary text-primary-foreground px-4 py-2 rounded-full hover:bg-primary/90 transition-all shadow-md hover:shadow-lg">
                                    Login
                                </button>
                            </SignInButton>
                        </SignedOut>
                    </div>

                    <div className="hidden md:block">
                        <SignedIn>
                            <UserButton />
                        </SignedIn>
                    </div>

                    <div className="hidden md:block">
                        <ThemeToggle />
                    </div>

                    {/* Mobile hamburger button */}
                    <button
                        onClick={() => setMobileOpen(!mobileOpen)}
                        className="md:hidden p-2 rounded-full bg-background/80 backdrop-blur-md border border-border/50 hover:bg-secondary/50 transition-colors"
                        aria-label="Toggle navigation menu"
                    >
                        {mobileOpen ? (
                            <X className="w-5 h-5" />
                        ) : (
                            <Menu className="w-5 h-5" />
                        )}
                    </button>
                </motion.div>
            </nav>

            {/* Mobile menu overlay */}
            <AnimatePresence>
                {mobileOpen && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[55] md:hidden"
                            onClick={() => setMobileOpen(false)}
                        />

                        {/* Slide-in panel */}
                        <motion.div
                            initial={{ x: "100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "100%" }}
                            transition={{ type: "spring", damping: 25, stiffness: 300 }}
                            className="fixed top-0 right-0 bottom-0 w-72 bg-background/95 backdrop-blur-xl border-l border-border/50 z-[56] md:hidden flex flex-col"
                        >
                            {/* Close button */}
                            <div className="flex items-center justify-between p-5 border-b border-border/30">
                                <span className="font-display font-bold text-lg">Menu</span>
                                <button
                                    onClick={() => setMobileOpen(false)}
                                    className="p-2 rounded-full hover:bg-secondary/50 transition-colors"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            {/* Nav links */}
                            <div className="flex-1 overflow-y-auto p-5 space-y-1">
                                {NAV_LINKS.map((link, i) => (
                                    <motion.div
                                        key={link.href}
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ duration: 0.3, delay: 0.05 * i }}
                                    >
                                        <Link
                                            href={link.href}
                                            className={`block px-4 py-3 rounded-xl text-base font-medium transition-colors ${link.label === "Pricing"
                                                ? "text-yellow-400 font-bold drop-shadow-[0_0_6px_rgba(250,204,21,0.5)] hover:bg-secondary/50"
                                                : pathname === link.href || pathname === link.href.slice(0, -1)
                                                    ? "bg-primary/10 text-primary"
                                                    : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                                                }`}
                                            onClick={() => setMobileOpen(false)}
                                        >
                                            {link.label}
                                        </Link>
                                    </motion.div>
                                ))}

                                <motion.div
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.3, delay: 0.25 }}
                                >
                                    <Link
                                        href="/faq/"
                                        className={`block px-4 py-3 rounded-xl text-base font-medium transition-colors ${pathname === "/faq" || pathname === "/faq/"
                                            ? "bg-primary/10 text-primary"
                                            : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                                            }`}
                                        onClick={() => setMobileOpen(false)}
                                    >
                                        FAQ
                                    </Link>
                                </motion.div>
                            </div>

                            {/* Bottom section: auth + theme */}
                            <div className="p-5 border-t border-border/30 space-y-3">
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-muted-foreground">Theme</span>
                                    <ThemeToggle />
                                </div>

                                <SignedOut>
                                    <SignInButton mode="modal">
                                        <button className="w-full text-sm font-medium bg-primary text-primary-foreground px-4 py-3 rounded-xl hover:bg-primary/90 transition-all shadow-md">
                                            Login / Sign Up
                                        </button>
                                    </SignInButton>
                                </SignedOut>

                                <SignedIn>
                                    <div className="flex items-center gap-3 px-2">
                                        <UserButton />
                                        <span className="text-sm text-muted-foreground">Account</span>
                                    </div>
                                </SignedIn>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
}
