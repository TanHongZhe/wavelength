"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Moon, Sun } from "lucide-react";

export function ThemeToggle({ className = "" }: { className?: string }) {
    const [isDark, setIsDark] = useState(false);
    const [mounted, setMounted] = useState(false);

    // Initialize from localStorage or system preference
    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setMounted(true);
        const stored = localStorage.getItem("wavelength-theme");
        if (stored) {
            setIsDark(stored === "dark");
        } else {
            // Check system preference
            setIsDark(window.matchMedia("(prefers-color-scheme: dark)").matches);
        }
    }, []);

    // Apply theme changes
    useEffect(() => {
        if (!mounted) return;
        if (isDark) {
            document.documentElement.classList.add("dark");
            localStorage.setItem("wavelength-theme", "dark");
        } else {
            document.documentElement.classList.remove("dark");
            localStorage.setItem("wavelength-theme", "light");
        }
    }, [isDark, mounted]);

    // Prevent hydration mismatch
    if (!mounted) {
        return (
            <div className={`p-3 rounded-full bg-secondary/80 backdrop-blur-sm border border-border shadow-lg ${className}`}>
                <div className="w-5 h-5" />
            </div>
        );
    }

    return (
        <motion.button
            onClick={() => setIsDark(!isDark)}
            className={`p-3 rounded-full bg-secondary/80 backdrop-blur-sm border border-border shadow-lg hover:bg-secondary transition-colors ${className}`}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
        >
            <motion.div
                initial={false}
                animate={{ rotate: isDark ? 180 : 0 }}
                transition={{ duration: 0.3 }}
            >
                {isDark ? (
                    <Moon className="w-5 h-5 text-primary" />
                ) : (
                    <Sun className="w-5 h-5 text-primary" />
                )}
            </motion.div>
        </motion.button>
    );
}
