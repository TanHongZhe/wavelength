import { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const runtime = 'edge';

export const metadata: Metadata = {
    title: "Refund Policy | Wavelength Game Online",
    description: "Refund Policy for Wavelength Game Online.",
};

export default function RefundPolicyPage() {
    return (
        <main className="container mx-auto px-4 py-32 max-w-4xl">
            <h1 className="text-3xl font-bold mb-6 text-foreground">Refund Policy</h1>
            <div className="prose prose-invert max-w-none text-muted-foreground">
                <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">No Refunds</h2>
                <p className="mb-4">We do not offer refunds for any service purchased. All sales are final.</p>

                <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">Cancellations</h2>
                <p className="mb-4">You may cancel your subscription at any time. Cancellation will be effective for future months, meaning you will not be charged for the subsequent billing cycle.</p>
                <p className="mb-4">You will continue to have access to your subscription benefits until the end of your current billing period.</p>
            </div>

            <div className="mt-16 pt-8 border-t border-border/40 text-center">
                <p className="mb-4 text-muted-foreground">Need help with a billing issue?</p>
                <Link href="/feedback">
                    <Button variant="outline">Contact Us</Button>
                </Link>
            </div>
        </main>
    );
}
