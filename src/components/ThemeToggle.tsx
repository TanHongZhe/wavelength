"use client";

import { useEffect } from "react";

export function ThemeToggle({ className = "" }: { className?: string }) {
    // Force dark mode permanently for now
    useEffect(() => {
        document.documentElement.classList.add("dark");
        document.documentElement.classList.remove("light");
        localStorage.setItem("wavelength-theme", "dark");
    }, []);

    // Return null since there's no light mode option to toggle to anymore
    return null;
}