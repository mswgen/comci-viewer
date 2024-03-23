import { MetadataRoute } from 'next'
 
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://comci.koreacentral.cloudapp.azure.com',
      lastModified: new Date(),
      changeFrequency: 'always',
      priority: 1,
    }
  ]
}