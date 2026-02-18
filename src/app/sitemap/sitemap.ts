import { MetadataRoute } from 'next'
import { getSitemapItems } from './items'

export const dynamic = 'force-static'

export default function sitemap(): MetadataRoute.Sitemap {
    return getSitemapItems()
}
