import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/dashboard/',
          '/api/',
          '/auth/',
          '/_next/data/',
          '/admin/',
          '/student/',
          '/analytics/',
          '/settings/',
          '/portal/',
          '/counselor/',
          '/enrollments/',
          '/test-platform/',
          '/manifest.json',
        ],
      },
      {
        userAgent: 'Googlebot',
        allow: ['/', '/testimonials/', '/video-sitemap.xml'],
        disallow: [
          '/dashboard/',
          '/api/',
          '/auth/',
          '/_next/data/',
          '/admin/',
          '/student/',
          '/analytics/',
          '/settings/',
          '/portal/',
          '/counselor/',
          '/enrollments/',
          '/test-platform/',
          '/manifest.json',
        ],
      },
      {
        userAgent: 'Bingbot',
        allow: '/',
        disallow: [
          '/dashboard/',
          '/api/',
          '/auth/',
          '/_next/data/',
          '/admin/',
          '/student/',
          '/analytics/',
          '/settings/',
          '/portal/',
          '/counselor/',
          '/enrollments/',
          '/test-platform/',
          '/manifest.json',
        ],
      },
      // AI Search Engine Crawlers - Allow for GEO (Generative Engine Optimization)
      {
        userAgent: 'GPTBot',
        allow: ['/', '/llms.txt', '/humans.txt', '/ai.txt'],
        disallow: ['/dashboard/', '/api/', '/auth/', '/admin/', '/student/', '/analytics/'],
      },
      {
        userAgent: 'ChatGPT-User',
        allow: ['/', '/llms.txt', '/humans.txt', '/ai.txt'],
        disallow: ['/dashboard/', '/api/', '/auth/', '/admin/', '/student/'],
      },
      {
        userAgent: 'Claude-Web',
        allow: ['/', '/llms.txt', '/humans.txt', '/ai.txt'],
        disallow: ['/dashboard/', '/api/', '/auth/', '/admin/', '/student/'],
      },
      {
        userAgent: 'PerplexityBot',
        allow: ['/', '/llms.txt', '/humans.txt', '/ai.txt'],
        disallow: ['/dashboard/', '/api/', '/auth/', '/admin/', '/student/'],
      },
      {
        userAgent: 'Anthropic-AI',
        allow: ['/', '/llms.txt', '/humans.txt', '/ai.txt'],
        disallow: ['/dashboard/', '/api/', '/auth/', '/admin/', '/student/'],
      },
      {
        userAgent: 'Google-Extended',
        allow: ['/', '/llms.txt', '/humans.txt', '/ai.txt'],
        disallow: ['/dashboard/', '/api/', '/auth/', '/admin/', '/student/'],
      },
      {
        userAgent: 'CCBot',
        allow: ['/', '/llms.txt', '/humans.txt', '/ai.txt'],
        disallow: ['/dashboard/', '/api/', '/auth/', '/admin/', '/student/'],
      },
    ],
    sitemap: [
      'https://cerebrumbiologyacademy.com/sitemap.xml',
      'https://cerebrumbiologyacademy.com/image-sitemap.xml',
      'https://cerebrumbiologyacademy.com/video-sitemap.xml',
      'https://cerebrumbiologyacademy.com/priority-pages-sitemap.xml',
    ],
  }
}
