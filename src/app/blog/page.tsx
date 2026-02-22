
import { Metadata } from "next";
import Link from "next/link";
import { BLOG_POSTS } from "@/lib/blogData";
import { BlogList } from "@/components/blog/BlogList";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
    title: "Relationship Blog | Wavelength Game",
    description: "Expert advice on long distance relationships, virtual date ideas, and communication games for couples.",
    openGraph: {
        url: "https://wavelength.lol/blog/",
    },
};

export default function BlogIndex() {
    return (
        <div className="flex flex-col min-h-screen">
            <main className="flex-1 container mx-auto px-4 pt-32 pb-16 max-w-4xl">
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-display font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500">
                        The Wavelength Blog
                    </h1>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                        Tips, tricks, and deep dives into modern relationships, long distance love, and the psychology of connection.
                    </p>
                </div>

                <BlogList initialPosts={BLOG_POSTS} />
            </main>
            <Footer />
        </div>
    );
}
