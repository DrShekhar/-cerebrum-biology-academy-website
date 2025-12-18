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
    ],
    sitemap: 'https://cerebrumbiologyacademy.com/sitemap.xml',
  }
}
