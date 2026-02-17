"use client";

import { AlertTriangle, Home, LogIn, Lock, Crown } from "lucide-react";
import { SignInButton, useUser } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";

// Stripe Payment Link for monthly upgrade (same as PaywallModal)
// Stripe Payment Link for monthly upgrade (PRODUCTION)
// Stripe Payment Link for monthly upgrade (PRODUCTION)
import { STRIPE_MONTHLY_LINK } from "@/lib/stripe";

interface GameErrorScreenProps {
    error: string;
    onLeave: () => void;
    playerId: string;
}

export function GameErrorScreen({ error, onLeave, playerId }: GameErrorScreenProps) {
    const { isSignedIn, user } = useUser();

    const isLoginError = error.toLowerCase().includes("log in") || error.toLowerCase().includes("account");
    const isPaywallError = error.toLowerCase().includes("subscribe") || error.toLowerCase().includes("limit") || error.toLowerCase().includes("locked");

    const handleUpgrade = () => {
        const email = user?.primaryEmailAddress?.emailAddress;
        const url = email
            ? `${STRIPE_MONTHLY_LINK}?prefilled_email=${encodeURIComponent(email)}`
            : STRIPE_MONTHLY_LINK;
        window.open(url, "_blank");
    };

    if (isLoginError) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] gap-6 p-6 text-center max-w-md mx-auto">
                <div className="bg-primary/10 p-4 rounded-full ring-4 ring-primary/5 shadow-xl animate-pulse-subtle">
                    <LogIn className="w-10 h-10 text-primary" />
                </div>
                <div className="space-y-3">
                    <h2 className="text-3xl font-bold font-display text-foreground">
                        Account Required
                    </h2>
                    <p className="text-muted-foreground text-lg leading-relaxed">
                        You need to be logged in to create a game. This helps us prevent spam and keep the game fun for everyone!
                    </p>
                    <p className="text-sm text-muted-foreground italic">
                        (Guests can still join existing games with a code!)
                    </p>
                </div>

                <div className="flex flex-col gap-3 w-full max-w-xs mt-4">
                    <SignInButton mode="modal">
                        <Button className="w-full h-12 text-lg font-bold shadow-lg hover:shadow-primary/25 transition-all">
                            <LogIn className="w-5 h-5 mr-2" />
                            Log In / Sign Up
                        </Button>
                    </SignInButton>
                    <Button variant="ghost" onClick={onLeave} className="text-muted-foreground hover:text-foreground">
                        Go Back to Menu
                    </Button>
                </div>
            </div>
        );
    }

    if (isPaywallError) {
        // This screen is a fallback if the Modal doesn't catch it for some reason, 
        // or just a nice error state.
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] gap-6 p-6 text-center max-w-md mx-auto">
                <div className="bg-gradient-to-br from-amber-400 to-orange-500 p-4 rounded-full ring-4 ring-orange-500/20 shadow-xl">
                    <Crown className="w-10 h-10 text-white" />
                </div>
                <div className="space-y-3">
                    <h2 className="text-3xl font-bold font-display text-foreground">
                        Pro Feature Locked
                    </h2>
                    <p className="text-muted-foreground text-lg leading-relaxed">
                        {error}
                    </p>
                </div>

                <div className="flex flex-col gap-3 w-full max-w-xs mt-4">
                    {isSignedIn ? (
                        <Button
                            onClick={handleUpgrade}
                            className="w-full h-12 text-lg font-bold bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-500 hover:to-orange-600 text-white border-0 shadow-lg hover:shadow-orange-500/25 transition-all"
                        >
                            <Crown className="w-5 h-5 mr-2" />
                            Get Pro Access
                        </Button>
                    ) : (
                        <SignInButton mode="modal">
                            <Button
                                className="w-full h-12 text-lg font-bold bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-500 hover:to-orange-600 text-white border-0 shadow-lg hover:shadow-orange-500/25 transition-all"
                            >
                                <LogIn className="w-5 h-5 mr-2" />
                                Log In to Upgrade
                            </Button>
                        </SignInButton>
                    )}
                    <Button variant="ghost" onClick={onLeave} className="text-muted-foreground hover:text-foreground">
                        Go Back
                    </Button>
                </div>
            </div>
        );
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] gap-6 p-6 text-center max-w-md mx-auto">
            <div className="bg-destructive/10 p-4 rounded-full ring-4 ring-destructive/5 shadow-xl">
                <AlertTriangle className="w-10 h-10 text-destructive" />
            </div>
            <div className="space-y-3">
                <h2 className="text-2xl font-bold font-display text-foreground">
                    Something went wrong
                </h2>
                <p className="text-destructive font-medium text-lg border border-destructive/20 bg-destructive/5 p-3 rounded-lg">
                    {error}
                </p>
            </div>
            <Button onClick={onLeave} className="btn-game min-w-[150px] shadow-lg">
                <Home className="w-4 h-4 mr-2" />
                Return Home
            </Button>
        </div>
    );
}
