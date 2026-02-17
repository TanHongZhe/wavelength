
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getBlogPost, BLOG_POSTS } from "@/lib/blogData";
import { Footer } from "@/components/Footer";
import Link from "next/link";
import ReactMarkdown from "react-markdown";

interface BlogPostProps {
    params: {
        slug: string;
    };
}

export async function generateStaticParams() {
    return BLOG_POSTS.map((post) => ({
        slug: post.slug,
    }));
}

export async function generateMetadata({ params }: BlogPostProps): Promise<Metadata> {
    const post = getBlogPost(params.slug);
    if (!post) return {};

    return {
        title: `${post.title} | Wavelength Blog`,
        description: post.excerpt,
    };
}

export default function BlogPost({ params }: BlogPostProps) {
    const post = getBlogPost(params.slug);

    if (!post) {
        notFound();
    }

    return (
        <div className="flex flex-col min-h-screen">
            <main className="flex-1 container mx-auto px-4 pt-36 pb-20 max-w-3xl">
                <Link href="/blog" className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-primary mb-8 transition-colors">
                    ← Back to Blog
                </Link>

                <article className="prose prose-invert prose-lg max-w-none prose-headings:font-display prose-headings:font-bold prose-headings:text-foreground prose-p:text-muted-foreground prose-a:text-pink-500 prose-a:no-underline hover:prose-a:underline prose-strong:text-foreground prose-blockquote:border-l-pink-500 prose-blockquote:bg-secondary/20 prose-blockquote:px-6 prose-blockquote:py-2 prose-blockquote:rounded-r-lg">
                    <header className="mb-10 text-center">
                        <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground mb-4">
                            <span className="uppercase tracking-wider font-semibold text-primary">{post.category}</span>
                            <span>•</span>
                            <time dateTime={post.date}>{new Date(post.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</time>
                            <span>•</span>
                            <span>{post.readTime}</span>
                        </div>
                        <h1 className="text-4xl md:text-5xl mb-6 bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-indigo-500 leading-tight">
                            {post.title}
                        </h1>
                        <p className="text-xl text-muted-foreground italic max-w-2xl mx-auto">
                            {post.excerpt}
                        </p>
                    </header>

                    <div className="bg-card border border-border/40 rounded-3xl p-8 md:p-10 shadow-xl shadow-pink-500/5">
                        <ReactMarkdown
                            components={{
                                a: ({ node, ...props }) => (
                                    <Link {...props as any} className="text-pink-500 hover:text-pink-400 font-medium transition-colors" />
                                ),
                            }}
                        >
                            {post.content}
                        </ReactMarkdown>
                    </div>

                    <div className="mt-12 p-8 rounded-2xl bg-gradient-to-br from-pink-500/10 via-purple-500/10 to-indigo-500/10 border border-pink-500/20 text-center">
                        <h3 className="text-2xl font-bold mb-3 font-display">Put Theory Into Practice</h3>
                        <p className="text-muted-foreground mb-6">
                            Reading about connection is great, but experiencing it is better.
                            Challenge your partner to a round of Wavelength right now.
                        </p>
                        <Link
                            href="/"
                            className="inline-flex items-center justify-center px-8 py-3 rounded-full bg-primary text-primary-foreground font-bold shadow-lg shadow-primary/25 hover:shadow-primary/40 hover:scale-105 transition-all duration-300"
                        >
                            Play Wavelength Free
                        </Link>
                    </div>
                </article>
            </main>
            <Footer />
        </div>
    );
}
