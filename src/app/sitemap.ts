import { MetadataRoute } from 'next'
import { blogPosts } from '@/data/blog'
import { detailedCourses } from '@/data/detailedCourses'
import { delhiNCRAreas } from '@/data/localAreas'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://cerebrumbiologyacademy.com'

  // Blog post URLs
  const blogUrls = blogPosts
    .filter((post) => post.isPublished)
    .map((post) => ({
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified: new Date(post.updatedAt),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    }))

  // Course URLs
  const courseUrls = detailedCourses.map((course) => ({
    url: `${baseUrl}/courses/${course.slug}`,
    lastModified: new Date(course.startDate),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  // Local Area URLs
  const localAreaUrls = delhiNCRAreas.map((area) => ({
    url: `${baseUrl}/${area.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.9, // High priority for local SEO
  }))

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/courses`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/faculty`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/testimonials`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    ...localAreaUrls,
    ...courseUrls,
    ...blogUrls,
  ]
}
