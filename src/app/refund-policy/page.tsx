import { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";


export const metadata: Metadata = {
    title: "Refund Policy | Wavelength Game Online",
    description: "Review the Refund Policy for Wavelength Game Online. Learn about our no-refund policy, subscription cancellations, and billing inquiries for Pro Access.",
    openGraph: {
        url: "https://wavelength.lol/refund-policy/",
    },
};

export default function RefundPolicyPage() {
    return (
        <main className="container mx-auto px-4 py-32 max-w-4xl">
            <h1 className="text-3xl font-bold mb-6 text-white drop-shadow-sm">Refund Policy</h1>
            <div className="prose prose-invert max-w-none text-slate-400">
                <h2 className="text-xl font-bold text-white mt-8 mb-4">No Refunds</h2>
                <p className="mb-4">We do not offer refunds for any service purchased. All sales are final.</p>

                <h2 className="text-xl font-bold text-white mt-8 mb-4">Cancellations</h2>
                <p className="mb-4">You may cancel your subscription at any time. Cancellation will be effective for future months, meaning you will not be charged for the subsequent billing cycle.</p>
                <p className="mb-4">You will continue to have access to your subscription benefits until the end of your current billing period.</p>
            </div>

            <div className="mt-16 pt-8 border-t border-white/10 text-center">
                <p className="mb-4 text-slate-400">Need help with a billing issue?</p>
                <Link href="/feedback">
                    <Button variant="outline">Contact Us</Button>
                </Link>
            </div>
        </main>
    );
}
