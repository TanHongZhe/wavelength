
import { MetadataRoute } from 'next'
import { BLOG_POSTS } from '@/lib/blogData'

export function getSitemapItems(): MetadataRoute.Sitemap {
    const baseUrl = (process.env.NEXT_PUBLIC_APP_URL || 'https://wavelength.lol').replace(/\/$/, '')
    const currentDate = new Date().toISOString()

    const staticRoutes: MetadataRoute.Sitemap = [
        {
            url: `${baseUrl}/`,
            lastModified: currentDate,
            changeFrequency: 'daily',
            priority: 1.0,
        },
        // {
        //     url: `${baseUrl}/blog/`,
        //     lastModified: currentDate,
        //     changeFrequency: 'daily',
        //     priority: 0.95,
        // },
        {
            url: `${baseUrl}/rules/`,
            lastModified: currentDate,
            changeFrequency: 'monthly',
            priority: 0.9,
        },
        {
            url: `${baseUrl}/faq/`,
            lastModified: currentDate,
            changeFrequency: 'monthly',
            priority: 0.9,
        },
        {
            url: `${baseUrl}/about/`,
            lastModified: currentDate,
            changeFrequency: 'monthly',
            priority: 0.8,
        },
        // {
        //     url: `${baseUrl}/long-distance-games/`,
        //     lastModified: currentDate,
        //     changeFrequency: 'weekly',
        //     priority: 0.9,
        // },
        // {
        //     url: `${baseUrl}/valentines-games/`,
        //     lastModified: currentDate,
        //     changeFrequency: 'weekly',
        //     priority: 0.95,
        // },
        // {
        //     url: `${baseUrl}/relationship-games/`,
        //     lastModified: currentDate,
        //     changeFrequency: 'weekly',
        //     priority: 0.9,
        // },
        {
            url: `${baseUrl}/feedback/`,
            lastModified: currentDate,
            changeFrequency: 'monthly',
            priority: 0.7,
        },
        // {
        //     url: `${baseUrl}/couple-games/`,
        //     lastModified: currentDate,
        //     changeFrequency: 'weekly',
        //     priority: 0.95,
        // },
        {
            url: `${baseUrl}/games/fantasy-slider/`,
            lastModified: currentDate,
            changeFrequency: 'weekly',
            priority: 0.9,
        },
        {
            url: `${baseUrl}/games/whos-most-likely/`,
            lastModified: currentDate,
            changeFrequency: 'weekly',
            priority: 0.9,
        },
        {
            url: `${baseUrl}/games/flag-game/`,
            lastModified: currentDate,
            changeFrequency: 'weekly',
            priority: 0.9,
        },
        {
            url: `${baseUrl}/games/this-or-that/`,
            lastModified: currentDate,
            changeFrequency: 'weekly',
            priority: 0.9,
        },
        {
            url: `${baseUrl}/games/general-knowledge/`,
            lastModified: currentDate,
            changeFrequency: 'weekly',
            priority: 0.9,
        },
        {
            url: `${baseUrl}/terms/`,
            lastModified: currentDate,
            changeFrequency: 'monthly',
            priority: 0.6,
        },
        {
            url: `${baseUrl}/refund-policy/`,
            lastModified: currentDate,
            changeFrequency: 'monthly',
            priority: 0.6,
        },
    ]

    // const blogRoutes: MetadataRoute.Sitemap = BLOG_POSTS.map((post) => ({
    //     url: `${baseUrl}/blog/${post.slug}/`,
    //     lastModified: new Date(post.date).toISOString(),
    //     changeFrequency: 'monthly',
    //     priority: 0.8,
    // }))

    return [...staticRoutes] //, ...blogRoutes]
}
