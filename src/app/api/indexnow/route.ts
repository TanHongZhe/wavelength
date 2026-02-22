import { NextResponse } from 'next/server'
import { getSitemapItems } from '@/app/sitemap/items'
import { BLOG_POSTS } from '@/lib/blogData'

export const runtime = 'edge';

export async function GET() {
    const host = 'wavelength.lol' // Ensure this matches your live domain
    const key = '4c07156266644b1b9cd3993878f96ff1'
    const keyLocation = `https://${host}/${key}.txt`

    // 1. Get static routes from your sitemap items. 
    // This will naturally respect your commented-out discovery pages.
    const staticItems = getSitemapItems()
    let urlList = staticItems.map((item) => item.url)

    // Blog pages are temporarily excluded per user request. 
    // So we just use exactly what items.ts returns.

    try {
        // Send POST request to IndexNow API (which notifies Bing, Yandex, Seznam, etc.)
        const response = await fetch('https://api.indexnow.org/indexnow', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
            },
            body: JSON.stringify({
                host: host,
                key: key,
                keyLocation: keyLocation,
                urlList: urlList,
            }),
        })

        if (response.ok) {
            return NextResponse.json({
                success: true,
                message: `Successfully submitted ${urlList.length} URLs to IndexNow (Bing/Yandex/Seznam).`,
                urlsSubmitted: urlList,
            })
        } else {
            const errorText = await response.text()
            return NextResponse.json(
                { success: false, status: response.status, message: 'IndexNow API rejected the request.', error: errorText, payload: { host, key, keyLocation, urlList } },
                { status: response.status }
            )
        }
    } catch (error) {
        return NextResponse.json(
            { success: false, error: String(error) },
            { status: 500 }
        )
    }
}
