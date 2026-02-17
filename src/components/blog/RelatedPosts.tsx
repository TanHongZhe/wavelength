import Link from "next/link";
import { BlogPost } from "@/lib/blogData";

interface RelatedPostsProps {
    currentSlug: string;
    currentCategory: string;
    allPosts: BlogPost[];
}

export function RelatedPosts({ currentSlug, currentCategory, allPosts }: RelatedPostsProps) {
    const related = allPosts
        .filter((post) => post.category === currentCategory && post.slug !== currentSlug)
        .slice(0, 3);

    if (related.length === 0) {
        // Fallback: just take recent posts if no category match
        const recent = allPosts
            .filter((post) => post.slug !== currentSlug)
            .slice(0, 3);
        if (recent.length === 0) return null;
        related.push(...recent);
    }

    return (
        <section className="mt-24 border-t border-border/40 pt-16">
            <h3 className="text-3xl font-display font-bold mb-8">Related Articles</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {related.map((post) => (
                    <Link key={post.slug} href={`/blog/${post.slug}`} className="group block h-full">
                        <article className="h-full flex flex-col bg-card/50 border border-border/50 rounded-2xl p-6 transition-all hover:border-pink-500/30 hover:shadow-lg hover:shadow-pink-500/5">
                            <div className="text-xs font-bold text-pink-500 mb-3 uppercase tracking-wider">
                                {post.category}
                            </div>
                            <h4 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors line-clamp-2">
                                {post.title}
                            </h4>
                            <p className="text-muted-foreground text-sm line-clamp-3 mb-4 flex-1">
                                {post.excerpt}
                            </p>
                            <div className="text-xs text-muted-foreground/60 font-medium pt-4 border-t border-border/30 flex items-center justify-between">
                                <time dateTime={post.date}>
                                    {new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                </time>
                                <span>{post.readTime}</span>
                            </div>
                        </article>
                    </Link>
                ))}
            </div>
        </section>
    );
}
