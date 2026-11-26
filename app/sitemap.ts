import { MetadataRoute } from 'next'
import { siteMetadata } from '@/lib/seo'
import { AR_PATHS, toArPath } from '@/lib/localePath'

export default function sitemap(): MetadataRoute.Sitemap {
  const routes: Array<{ path: string; changeFrequency: MetadataRoute.Sitemap[0]['changeFrequency']; priority: number }> = [
    { path: '/', changeFrequency: 'weekly', priority: 1 },
    { path: '/about', changeFrequency: 'monthly', priority: 0.9 },
    { path: '/news', changeFrequency: 'daily', priority: 0.9 },
    { path: '/championships', changeFrequency: 'weekly', priority: 0.9 },
    { path: '/rankings', changeFrequency: 'weekly', priority: 0.8 },
    { path: '/players', changeFrequency: 'daily', priority: 0.8 },
    { path: '/players/apply', changeFrequency: 'monthly', priority: 0.6 },
    { path: '/players/coaches', changeFrequency: 'weekly', priority: 0.6 },
    { path: '/promotion', changeFrequency: 'monthly', priority: 0.8 },
    { path: '/countries', changeFrequency: 'monthly', priority: 0.7 },
    { path: '/media', changeFrequency: 'weekly', priority: 0.8 },
    { path: '/gallery', changeFrequency: 'weekly', priority: 0.6 },
    { path: '/membership', changeFrequency: 'monthly', priority: 0.8 },
    { path: '/contact', changeFrequency: 'monthly', priority: 0.7 },
    { path: '/partners', changeFrequency: 'monthly', priority: 0.6 },
  ]

  const entries: MetadataRoute.Sitemap = []

  for (const { path, changeFrequency, priority } of routes) {
    const url = `${siteMetadata.url}${path}`
    if (AR_PATHS.includes(path)) {
      const arUrl = `${siteMetadata.url}${toArPath(path)}`
      const alternates = { languages: { en: url, ar: arUrl } }
      entries.push({ url, lastModified: new Date(), changeFrequency, priority, alternates })
      entries.push({ url: arUrl, lastModified: new Date(), changeFrequency, priority: priority * 0.9, alternates })
    } else {
      entries.push({ url, lastModified: new Date(), changeFrequency, priority })
    }
  }

  return entries
}
