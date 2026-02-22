"use client";

import { useEffect } from "react";


export default function LogoutPage() {
    useEffect(() => {
        // Force a hard refresh of the home page to clear the Next.js client-side router cache
        window.location.href = "/";
    }, []);

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-background text-foreground">
            <div className="w-8 h-8 rounded-full border-4 border-primary border-t-transparent animate-spin mb-4"></div>
            <p className="text-muted-foreground text-sm font-medium">Signing out...</p>
        </div>
    );
}
