"use client";

import Link from "next/link";
import { AudioWaveform } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import { motion } from "framer-motion";

export function Navbar() {
    return (
        <nav className="fixed top-0 left-0 right-0 z-50 px-4 md:px-6 py-4 flex items-center justify-between pointer-events-none">
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
            </motion.div>

            <motion.div
                className="pointer-events-auto flex items-center gap-3"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
            >
                <Link
                    href="/rules"
                    className="hidden sm:block text-sm font-medium text-muted-foreground hover:text-foreground transition-colors px-3 py-2 rounded-full hover:bg-secondary/50"
                >
                    Rules
                </Link>
                <Link
                    href="/faq"
                    className="hidden sm:block text-sm font-medium text-muted-foreground hover:text-foreground transition-colors px-3 py-2 rounded-full hover:bg-secondary/50"
                >
                    FAQ
                </Link>
                <Link
                    href="/about"
                    className="hidden sm:block text-sm font-medium text-muted-foreground hover:text-foreground transition-colors px-3 py-2 rounded-full hover:bg-secondary/50"
                >
                    About
                </Link>
                <ThemeToggle />
            </motion.div>
        </nav>
    );
}
