
import { Metadata } from "next";
import Link from "next/link";
import { BLOG_POSTS } from "@/lib/blogData";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
    title: "Relationship Blog | Wavelength Online",
    description: "Expert advice on long distance relationships, virtual date ideas, and communication games for couples.",
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

                <div className="grid md:grid-cols-2 gap-8">
                    {BLOG_POSTS.map((post) => (
                        <Link
                            key={post.slug}
                            href={`/blog/${post.slug}`}
                            className="group block bg-card border border-border/50 rounded-2xl overflow-hidden hover:border-pink-500/50 hover:shadow-lg hover:shadow-pink-500/10 transition-all duration-300"
                        >
                            <div className="p-6 md:p-8 h-full flex flex-col">
                                <div className="flex items-center gap-3 text-sm text-muted-foreground mb-4">
                                    <span className="px-2 py-1 rounded-full bg-secondary text-secondary-foreground text-xs font-medium">
                                        {post.category}
                                    </span>
                                    <span>•</span>
                                    <span>{post.readTime}</span>
                                </div>
                                <h2 className="text-2xl font-display font-bold mb-3 group-hover:text-primary transition-colors">
                                    {post.title}
                                </h2>
                                <p className="text-muted-foreground leading-relaxed mb-6 flex-1">
                                    {post.excerpt}
                                </p>
                                <div className="flex items-center text-primary font-medium text-sm group-hover:translate-x-1 transition-transform">
                                    Read Article →
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </main>
            <Footer />
        </div>
    );
}
