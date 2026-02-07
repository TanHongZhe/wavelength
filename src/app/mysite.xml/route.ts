import { getSitemapItems } from '../sitemap/items'

export const dynamic = 'force-static'

export function GET() {
    const items = getSitemapItems()

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${items.map((item) => {
        return `<url>
        <loc>${item.url}</loc>
        <lastmod>${typeof item.lastModified === 'string' ? item.lastModified : item.lastModified?.toISOString()}</lastmod>
        <changefreq>${item.changeFrequency}</changefreq>
        <priority>${item.priority}</priority>
    </url>`
    }).join('')}
</urlset>`

    return new Response(xml, {
        headers: {
            'Content-Type': 'application/xml',
        },
    })
}
