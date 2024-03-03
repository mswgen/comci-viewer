import { MetadataRoute } from 'next'
 
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/add', '/manage'],
    },
    sitemap: 'https://comci.eastus.cloudapp.azure.com/sitemap.xml',
  }
}