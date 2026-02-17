"use client";

import { useState } from "react";
import Link from "next/link";
import { BlogPost } from "@/lib/blogData";
import { cn } from "@/lib/utils";

interface BlogListProps {
    initialPosts: BlogPost[];
}

export function BlogList({ initialPosts }: BlogListProps) {
    const [filter, setFilter] = useState("All");

    // Extract categories safely
    const categories = ["All", ...Array.from(new Set(initialPosts.map((post) => post.category)))];

    // Filter logic
    const displayedPosts = filter === "All"
        ? initialPosts
        : initialPosts.filter((post) => post.category === filter);

    return (
        <div className="space-y-12">
            {/* Category Filter */}
            <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
                {categories.map((category) => (
                    <button
                        key={category}
                        onClick={() => setFilter(category)}
                        className={cn(
                            "px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 border",
                            filter === category
                                ? "bg-primary text-primary-foreground border-primary shadow-lg shadow-pink-500/25"
                                : "bg-card hover:bg-muted text-muted-foreground border-border hover:border-pink-500/30"
                        )}
                    >
                        {category}
                    </button>
                ))}
            </div>

            {/* Posts Grid */}
            <div className="grid md:grid-cols-2 gap-8">
                {displayedPosts.map((post) => (
                    <Link
                        key={post.slug}
                        href={`/blog/${post.slug}`}
                        className="group flex flex-col h-full bg-card border border-border/50 rounded-2xl overflow-hidden hover:border-pink-500/50 hover:shadow-lg hover:shadow-pink-500/10 transition-all duration-300"
                    >
                        <div className="p-6 md:p-8 flex-1 flex flex-col">
                            <div className="flex items-center gap-3 text-sm text-muted-foreground mb-4">
                                <span className="px-2.5 py-1 rounded-full bg-secondary/50 text-secondary-foreground text-xs font-semibold uppercase tracking-wide">
                                    {post.category}
                                </span>
                                <span className="w-1 h-1 rounded-full bg-border"></span>
                                <span>{post.readTime}</span>
                            </div>

                            <h2 className="text-2xl font-display font-bold mb-3 group-hover:text-primary transition-colors line-clamp-2">
                                {post.title}
                            </h2>

                            <p className="text-muted-foreground leading-relaxed mb-6 line-clamp-3">
                                {post.excerpt}
                            </p>

                            <div className="mt-auto pt-6 border-t border-border/30 flex items-center text-primary font-medium text-sm group-hover:translate-x-1 transition-transform">
                                Read Article <span className="ml-1">→</span>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>

            {displayedPosts.length === 0 && (
                <div className="text-center py-20 text-muted-foreground">
                    No posts found in this category.
                </div>
            )}
        </div>
    );
}
