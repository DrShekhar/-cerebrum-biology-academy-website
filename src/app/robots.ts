import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: ['/', '/_next/static/', '/ai-features/', '/ai-education-demo/'],
        disallow: [
          '/dashboard/',
          '/api/',
          '/auth/',
          '/_next/image',
          '/admin/',
          '/student/',
          '/analytics/',
          '/settings/',
          '/test-platform/',
          '/simple-test-gen/',
          '/test-learning/',
          '/enrollments/',
          '/boards/',
          '/portal/',
          '/counselor/',
          // Block CSS deployment files with ?dpl= hashes (150+ crawl waste URLs)
          '/_next/static/css/',
          // Block query parameter crawl waste (search, filters, etc.)
          '/blog?',
          '/courses?',
          '/tools/',
          // Block phantom locale paths that have no real pages (only /hi and /ta exist)
          '/de/',
          '/es/',
          '/fr/',
          '/ja/',
          '/kn/',
          '/bn/',
          '/ml/',
          '/it/',
          '/mr/',
          '/nl/',
          '/pl/',
          '/pt/',
          '/ru/',
          '/te/',
        ],
      },
      {
        userAgent: 'Googlebot',
        allow: ['/', '/ai-features/', '/ai-education-demo/', '/adaptive-testing/'],
        disallow: ['/dashboard/', '/api/', '/auth/', '/admin/', '/student/', '/analytics/', '/_next/static/css/', '/blog?', '/courses?'],
      },
      {
        userAgent: 'Bingbot',
        allow: ['/', '/ai-features/', '/ai-education-demo/', '/adaptive-testing/'],
        disallow: ['/dashboard/', '/api/', '/auth/', '/admin/', '/student/', '/analytics/', '/_next/static/css/', '/blog?', '/courses?'],
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
    ],
  }
}
