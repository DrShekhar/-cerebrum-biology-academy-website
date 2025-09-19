import { NextResponse } from 'next/server'

interface SitemapEntry {
  url: string
  lastModified: string
  changeFrequency: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never'
  priority: number
}

export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://cerebrumbiologyacademy.com'

  // Static pages with their priorities and update frequencies
  const staticPages: SitemapEntry[] = [
    // High priority pages
    {
      url: `${baseUrl}/`,
      lastModified: new Date().toISOString(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/courses`,
      lastModified: new Date().toISOString(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/neet-repeaters`,
      lastModified: new Date().toISOString(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },

    // Core pages
    {
      url: `${baseUrl}/about`,
      lastModified: new Date().toISOString(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date().toISOString(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/enrollment`,
      lastModified: new Date().toISOString(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },

    // Blog and resources
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date().toISOString(),
      changeFrequency: 'daily',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/resources`,
      lastModified: new Date().toISOString(),
      changeFrequency: 'weekly',
      priority: 0.7,
    },

    // Location-specific pages for SEO
    {
      url: `${baseUrl}/centers/south-delhi`,
      lastModified: new Date().toISOString(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/centers/rohini`,
      lastModified: new Date().toISOString(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/centers/gurugram`,
      lastModified: new Date().toISOString(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },

    // Course-specific pages
    {
      url: `${baseUrl}/courses/neet-dropper`,
      lastModified: new Date().toISOString(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/courses/neet-repeater`,
      lastModified: new Date().toISOString(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/courses/crash-course`,
      lastModified: new Date().toISOString(),
      changeFrequency: 'weekly',
      priority: 0.7,
    },

    // Success stories and testimonials
    {
      url: `${baseUrl}/success-stories`,
      lastModified: new Date().toISOString(),
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/testimonials`,
      lastModified: new Date().toISOString(),
      changeFrequency: 'weekly',
      priority: 0.6,
    },

    // Support and information
    {
      url: `${baseUrl}/demo`,
      lastModified: new Date().toISOString(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/faculty`,
      lastModified: new Date().toISOString(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/fees`,
      lastModified: new Date().toISOString(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },

    // Legal and policy pages
    {
      url: `${baseUrl}/privacy-policy`,
      lastModified: new Date().toISOString(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/terms-conditions`,
      lastModified: new Date().toISOString(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/refund-policy`,
      lastModified: new Date().toISOString(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ]

  // Add dynamic blog posts (this would come from your CMS/database)
  const blogPosts = await getBlogPosts()
  const blogSitemapEntries: SitemapEntry[] = blogPosts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: post.updatedAt || post.createdAt,
    changeFrequency: 'monthly',
    priority: 0.6,
  }))

  // Add city-specific landing pages for SEO
  const cities = [
    'delhi',
    'mumbai',
    'bangalore',
    'hyderabad',
    'chennai',
    'kolkata',
    'pune',
    'ahmedabad',
    'jaipur',
    'lucknow',
    'kanpur',
    'nagpur',
    'indore',
    'thane',
    'bhopal',
    'visakhapatnam',
    'pimpri-chinchwad',
    'patna',
    'vadodara',
    'ghaziabad',
    'ludhiana',
    'agra',
    'nashik',
    'faridabad',
    'meerut',
    'rajkot',
    'kalyan-dombivali',
    'vasai-virar',
    'varanasi',
    'srinagar',
    'aurangabad',
    'dhanbad',
    'amritsar',
    'navi-mumbai',
    'allahabad',
    'ranchi',
    'howrah',
    'coimbatore',
    'jabalpur',
    'gwalior',
    'vijayawada',
    'jodhpur',
    'madurai',
    'raipur',
    'kota',
    'guwahati',
    'chandigarh',
    'solapur',
  ]

  const citySitemapEntries: SitemapEntry[] = cities.map((city) => ({
    url: `${baseUrl}/neet-coaching-${city}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'monthly',
    priority: 0.5,
  }))

  // Combine all sitemap entries
  const allEntries = [...staticPages, ...blogSitemapEntries, ...citySitemapEntries]

  // Generate XML sitemap
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml"
        xmlns:mobile="http://www.google.com/schemas/sitemap-mobile/1.0"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
        xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
${allEntries
  .map(
    (entry) => `  <url>
    <loc>${entry.url}</loc>
    <lastmod>${entry.lastModified}</lastmod>
    <changefreq>${entry.changeFrequency}</changefreq>
    <priority>${entry.priority}</priority>
  </url>`
  )
  .join('\n')}
</urlset>`

  return new NextResponse(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=86400', // Cache for 24 hours
    },
  })
}

// Mock function to get blog posts - replace with actual database query
async function getBlogPosts() {
  // This would be replaced with actual database queries
  return [
    {
      slug: 'neet-biology-preparation-tips',
      createdAt: '2024-01-15T00:00:00Z',
      updatedAt: '2024-01-20T00:00:00Z',
    },
    {
      slug: 'how-to-overcome-neet-failure',
      createdAt: '2024-01-10T00:00:00Z',
      updatedAt: '2024-01-18T00:00:00Z',
    },
    {
      slug: 'neet-repeater-success-stories',
      createdAt: '2024-01-05T00:00:00Z',
      updatedAt: '2024-01-16T00:00:00Z',
    },
    {
      slug: 'biology-memory-techniques-neet',
      createdAt: '2024-01-01T00:00:00Z',
      updatedAt: '2024-01-14T00:00:00Z',
    },
    {
      slug: 'neet-2024-cutoff-analysis',
      createdAt: '2023-12-28T00:00:00Z',
      updatedAt: '2024-01-12T00:00:00Z',
    },
  ]
}
