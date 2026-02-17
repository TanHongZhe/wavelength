
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getBlogPost, BLOG_POSTS } from "@/lib/blogData";
import { Footer } from "@/components/Footer";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import Script from "next/script";

interface BlogPostProps {
    params: Promise<{
        slug: string;
    }>;
}

export async function generateStaticParams() {
    return BLOG_POSTS.map((post) => ({
        slug: post.slug,
    }));
}

export async function generateMetadata({ params }: BlogPostProps): Promise<Metadata> {
    const { slug } = await params;
    const post = getBlogPost(slug);
    if (!post) return {};

    const publishedTime = new Date(post.date).toISOString();

    return {
        title: `${post.title} | Wavelength Blog`,
        description: post.excerpt,
        openGraph: {
            title: post.title,
            description: post.excerpt,
            type: "article",
            publishedTime,
            authors: ["Wavelength Online"],
            url: `https://wavelength.lol/blog/${post.slug}`,
            images: [
                {
                    url: "https://wavelength.lol/og-image.png", // Default OG image for now
                    width: 1200,
                    height: 630,
                    alt: post.title,
                },
            ],
        },
        twitter: {
            card: "summary_large_image",
            title: post.title,
            description: post.excerpt,
            images: ["https://wavelength.lol/og-image.png"],
        },
    };
}

export default async function BlogPost({ params }: BlogPostProps) {
    const { slug } = await params;
    const post = getBlogPost(slug);

    if (!post) {
        notFound();
    }

    const structuredData = {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        "headline": post.title,
        "description": post.excerpt,
        "author": {
            "@type": "Organization",
            "name": "Wavelength Online",
            "url": "https://wavelength.lol"
        },
        "publisher": {
            "@type": "Organization",
            "name": "Wavelength Online",
            "logo": {
                "@type": "ImageObject",
                "url": "https://wavelength.lol/logo.png"
            }
        },
        "datePublished": new Date(post.date).toISOString(),
        "dateModified": new Date(post.date).toISOString(), // Assuming no separate modified date for now
        "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": `https://wavelength.lol/blog/${post.slug}`
        },
        "image": "https://wavelength.lol/og-image.png" // Default image
    };

    return (
        <div className="flex flex-col min-h-screen bg-background text-foreground selection:bg-pink-500/30">
            <Script
                id="blog-post-schema"
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
            />

            <main className="flex-1 container mx-auto px-4 py-24 max-w-4xl">
                <Link
                    href="/blog"
                    className="group inline-flex items-center text-sm font-medium text-muted-foreground hover:text-primary mb-12 transition-colors duration-200"
                >
                    <span className="group-hover:-translate-x-1 transition-transform duration-200 mr-2">←</span>
                    Back to Blog
                </Link>

                <article className="max-w-3xl mx-auto">
                    <header className="mb-12 text-center">
                        <div className="flex flex-wrap items-center justify-center gap-3 text-sm font-medium text-muted-foreground mb-6">
                            <span className="px-3 py-1 rounded-full bg-primary/10 text-primary uppercase tracking-wider text-xs font-bold">
                                {post.category}
                            </span>
                            <span className="w-1 h-1 rounded-full bg-border"></span>
                            <time dateTime={post.date}>
                                {new Date(post.date).toLocaleDateString('en-US', {
                                    month: 'long',
                                    day: 'numeric',
                                    year: 'numeric'
                                })}
                            </time>
                            <span className="w-1 h-1 rounded-full bg-border"></span>
                            <span>{post.readTime}</span>
                        </div>

                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-8 leading-tight text-foreground text-pretty">
                            {post.title}
                        </h1>

                        <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed max-w-2xl mx-auto font-light text-pretty">
                            {post.excerpt}
                        </p>
                    </header>

                    <hr className="border-border/40 my-12" />

                    <div className="blog-content">
                        <ReactMarkdown
                            components={{
                                h1: ({ node, ...props }) => (
                                    <h1 className="text-3xl md:text-4xl font-display font-bold mt-16 mb-6 text-foreground leading-tight" {...props} />
                                ),
                                h2: ({ node, ...props }) => (
                                    <h2 className="text-2xl md:text-3xl font-display font-bold mt-12 mb-5 text-foreground leading-snug group flex items-center" {...props} />
                                ),
                                h3: ({ node, ...props }) => (
                                    <h3 className="text-xl md:text-2xl font-display font-bold mt-10 mb-4 text-foreground leading-snug" {...props} />
                                ),
                                p: ({ node, ...props }) => (
                                    <p className="text-lg text-muted-foreground/90 leading-8 mb-6 font-sans" {...props} />
                                ),
                                ul: ({ node, ...props }) => (
                                    <ul className="list-disc pl-6 mb-8 sapce-y-2 text-muted-foreground/90 text-lg leading-8 marker:text-pink-500" {...props} />
                                ),
                                ol: ({ node, ...props }) => (
                                    <ol className="list-decimal pl-6 mb-8 space-y-2 text-muted-foreground/90 text-lg leading-8 marker:text-pink-500 font-medium" {...props} />
                                ),
                                li: ({ node, ...props }) => (
                                    <li className="pl-2 mb-2" {...props} />
                                ),
                                blockquote: ({ node, ...props }) => (
                                    <blockquote className="border-l-4 border-pink-500 pl-6 py-2 my-8 italic text-xl text-foreground font-medium bg-gradient-to-r from-pink-500/5 to-transparent rounded-r-lg" {...props} />
                                ),
                                code: ({ node, ...props }) => (
                                    <code className="bg-muted px-1.5 py-0.5 rounded text-sm font-mono text-pink-500" {...props} />
                                ),
                                pre: ({ node, ...props }) => (
                                    <pre className="bg-muted p-4 rounded-lg overflow-x-auto mb-8 border border-border" {...props} />
                                ),
                                strong: ({ node, ...props }) => (
                                    <strong className="font-bold text-foreground" {...props} />
                                ),
                                em: ({ node, ...props }) => (
                                    <em className="italic text-foreground/80" {...props} />
                                ),
                                a: ({ node, ...props }) => (
                                    <Link {...props as any} className="text-pink-500 hover:text-pink-400 font-medium transition-colors underline decoration-pink-500/30 hover:decoration-pink-500 underline-offset-4" />
                                ),
                                img: ({ node, ...props }) => (
                                    // eslint-disable-next-line @next/next/no-img-element
                                    <img {...props} className="rounded-xl my-8 border border-border/50 shadow-lg" alt={props.alt || ''} />
                                ),
                                hr: ({ node, ...props }) => (
                                    <hr className="border-border/40 my-10" {...props} />
                                ),
                            }}
                        >
                            {post.content}
                        </ReactMarkdown>
                    </div>

                    <div className="mt-16 p-8 md:p-10 rounded-3xl bg-card border border-border text-center shadow-xl shadow-pink-500/5 relative overflow-hidden group">
                        <div className="absolute inset-0 bg-gradient-to-br from-pink-500/5 via-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        <div className="relative z-10">
                            <h3 className="text-2xl md:text-3xl font-bold mb-4 font-display">Put Theory Into Practice</h3>
                            <p className="text-lg text-muted-foreground mb-8 max-w-lg mx-auto">
                                Reading about connection is great, but experiencing it is better.
                                Challenge your partner to a round of Wavelength right now.
                            </p>
                            <Link
                                href="/"
                                className="inline-flex items-center justify-center px-8 py-4 text-lg rounded-full bg-primary text-primary-foreground font-bold shadow-lg shadow-primary/25 hover:shadow-primary/40 hover:-translate-y-1 transition-all duration-300 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                            >
                                <span className="mr-2">🎮</span> Play Wavelength Free
                            </Link>
                        </div>
                    </div>
                </article>
            </main>
            <Footer />
        </div>
    );
}
