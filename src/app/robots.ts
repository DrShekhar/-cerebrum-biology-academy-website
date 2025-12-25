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
          '/_next/',
          '/admin/',
          '/student/',
          '/analytics/',
          '/settings/',
          '/test-platform/',
          '/simple-test-gen/',
          '/test-learning/',
          '/ai-features/',
          '/enrollments/',
          '/boards/',
        ],
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: ['/dashboard/', '/api/', '/auth/', '/admin/', '/student/', '/analytics/'],
      },
      {
        userAgent: 'Bingbot',
        allow: '/',
        disallow: ['/dashboard/', '/api/', '/auth/', '/admin/', '/student/', '/analytics/'],
      },
      // AI Search Engine Crawlers - Allow for GEO (Generative Engine Optimization)
      {
        userAgent: 'GPTBot',
        allow: ['/', '/llms.txt'],
        disallow: ['/dashboard/', '/api/', '/auth/', '/admin/', '/student/', '/analytics/'],
      },
      {
        userAgent: 'ChatGPT-User',
        allow: ['/', '/llms.txt'],
        disallow: ['/dashboard/', '/api/', '/auth/', '/admin/', '/student/'],
      },
      {
        userAgent: 'Claude-Web',
        allow: ['/', '/llms.txt'],
        disallow: ['/dashboard/', '/api/', '/auth/', '/admin/', '/student/'],
      },
      {
        userAgent: 'PerplexityBot',
        allow: ['/', '/llms.txt'],
        disallow: ['/dashboard/', '/api/', '/auth/', '/admin/', '/student/'],
      },
      {
        userAgent: 'Anthropic-AI',
        allow: ['/', '/llms.txt'],
        disallow: ['/dashboard/', '/api/', '/auth/', '/admin/', '/student/'],
      },
      {
        userAgent: 'Google-Extended',
        allow: ['/', '/llms.txt'],
        disallow: ['/dashboard/', '/api/', '/auth/', '/admin/', '/student/'],
      },
      {
        userAgent: 'CCBot',
        allow: ['/', '/llms.txt'],
        disallow: ['/dashboard/', '/api/', '/auth/', '/admin/', '/student/'],
      },
    ],
    sitemap: 'https://cerebrumbiologyacademy.com/sitemap.xml',
  }
}
