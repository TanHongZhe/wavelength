import { Metadata } from "next";
import FeedbackForm from "./FeedbackForm";

export const metadata: Metadata = {
    title: "Send Feedback | Wavelength Online",
    description: "Help us improve Wavelength Online! Report bugs, suggest features, or share your thoughts about the game.",
    alternates: {
        canonical: "https://wavelength.lol/feedback/",
    },
    openGraph: {
        title: "Send Feedback | Wavelength Online",
        description: "Help us improve Wavelength Online! Report bugs, suggest features, or share your thoughts about the game.",
        url: "https://wavelength.lol/feedback/",
    },
};

export default function FeedbackPage() {
    return <FeedbackForm />;
}
