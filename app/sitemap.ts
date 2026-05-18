import { MetadataRoute } from 'next'
import { siteMetadata } from '@/lib/seo'

export default function sitemap(): MetadataRoute.Sitemap {
  const routes: Array<{ path: string; changeFrequency: MetadataRoute.Sitemap[0]['changeFrequency']; priority: number }> = [
    { path: '/', changeFrequency: 'weekly', priority: 1 },
    { path: '/about', changeFrequency: 'monthly', priority: 0.9 },
    { path: '/news', changeFrequency: 'daily', priority: 0.9 },
    { path: '/championships', changeFrequency: 'weekly', priority: 0.9 },
    { path: '/rankings', changeFrequency: 'weekly', priority: 0.8 },
    { path: '/players', changeFrequency: 'daily', priority: 0.8 },
    { path: '/players/apply', changeFrequency: 'monthly', priority: 0.6 },
    { path: '/promotion', changeFrequency: 'monthly', priority: 0.8 },
    { path: '/countries', changeFrequency: 'monthly', priority: 0.7 },
    { path: '/media', changeFrequency: 'weekly', priority: 0.8 },
    { path: '/membership', changeFrequency: 'monthly', priority: 0.8 },
    { path: '/contact', changeFrequency: 'monthly', priority: 0.7 },
  ]

  return routes.map(({ path, changeFrequency, priority }) => ({
    url: `${siteMetadata.url}${path}`,
    lastModified: new Date(),
    changeFrequency,
    priority,
  }))
}
