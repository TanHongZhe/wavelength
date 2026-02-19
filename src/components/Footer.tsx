
import React from 'react';
import Link from 'next/link';

export function Footer() {
    return (
        <footer className="text-center pt-12 pb-8 border-t border-border/40">
            <div className="flex flex-wrap items-center justify-center gap-6 mb-8">
                <Link href="/faq" className="text-sm text-muted-foreground hover:text-foreground transition-colors">FAQ</Link>
                <Link href="/terms" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Terms of Service</Link>
                <Link href="/refund-policy" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Refund Policy</Link>

                {/* Blog Link */}
                <Link href="/blog" className="text-sm font-semibold text-primary hover:text-primary/80 transition-colors">
                    Relationship Blog
                </Link>

                <a
                    href="https://billing.stripe.com/p/login/bJe3cxgmr2kT8183KDfQI00"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative inline-flex items-center justify-center px-5 py-2 rounded-full bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-white text-sm font-medium shadow-lg shadow-pink-500/25 hover:shadow-pink-500/40 hover:scale-105 transition-all duration-300"
                >
                    <span className="relative z-10">Manage Subscription</span>
                    <div className="absolute inset-0 rounded-full bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </a>
            </div>

            <p className="text-muted-foreground/60 text-sm">
                The best way to connect with friends and partners from miles away. 💜
            </p>
        </footer>
    );
}
