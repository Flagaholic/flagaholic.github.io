import { MetadataRoute } from 'next'

export const dynamic = 'force-static'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/admin', '/private', '/thereisnoflaghere'],
      crawlDelay: 1,
    },
    sitemap: 'https://www.flagaholic.xyz/sitemap.xml',
  }
}
