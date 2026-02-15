"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Check, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import confetti from "canvas-confetti";

export default function PaymentSuccessPage() {
    const searchParams = useSearchParams();
    // Stripe can pass ?session_id={CHECKOUT_SESSION_ID} if configured, usually we just assume success if they land here

    useEffect(() => {
        // Fire confetti on load
        const duration = 3 * 1000;
        const animationEnd = Date.now() + duration;
        const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

        const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

        const interval: any = setInterval(function () {
            const timeLeft = animationEnd - Date.now();

            if (timeLeft <= 0) {
                return clearInterval(interval);
            }

            const particleCount = 50 * (timeLeft / duration);
            confetti({
                ...defaults,
                particleCount,
                origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
                colors: ["#2dd4bf", "#fb923c"]
            });
            confetti({
                ...defaults,
                particleCount,
                origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
                colors: ["#2dd4bf", "#fb923c"]
            });
        }, 250);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">

            {/* Success Icon */}
            <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-6 animate-in zoom-in duration-500">
                <Check className="w-8 h-8 text-green-600" strokeWidth={3} />
            </div>

            <div className="text-center max-w-md w-full">
                <h1 className="font-display text-3xl font-bold mb-3 text-primary">
                    Thanks for your payment
                </h1>

                <p className="text-muted-foreground mb-8">
                    Your Pro access to <span className="font-semibold text-primary">Wavelength.lol</span> is now active.
                </p>

                {/* Receipt Card */}
                <div className="bg-card border border-border rounded-xl p-6 shadow-sm mb-8 relative overflow-hidden">
                    {/* Zig-zag bottom border effect (simulated with CSS or keep simple) */}
                    <div className="absolute top-0 left-0 w-full h-1 bg-primary/10"></div>

                    <div className="flex justify-between items-center py-4 border-b border-dashed border-border mb-4">
                        <span className="font-display font-semibold text-muted-foreground uppercase text-xs tracking-wider">Plan</span>
                        <span className="font-display font-bold">Pro Upgrade</span>
                    </div>

                    <div className="flex justify-between items-center">
                        <span className="font-display font-bold text-lg">Total Paid</span>
                        <span className="font-display font-bold text-2xl text-green-600">$4.99</span>
                    </div>
                </div>

                <Link href="/">
                    <Button className="w-full h-12 text-lg font-bold rounded-xl shadow-lg hover:shadow-xl transition-all">
                        Return to Game <ArrowRight className="ml-2 w-5 h-5" />
                    </Button>
                </Link>

                <p className="text-xs text-muted-foreground mt-6">
                    A receipt has been sent to your email.
                </p>
            </div>
        </div>
    );
}
