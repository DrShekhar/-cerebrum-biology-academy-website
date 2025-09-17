import { NextResponse } from 'next/server'

export async function GET() {
  const baseUrl = 'https://cerebrumbiologyacademy.com'

  const robots = `User-agent: *
Allow: /

# Priority crawling for important sections
Allow: /courses/
Allow: /locations/
Allow: /topics/
Allow: /exams/
Allow: /blog/
Allow: /resources/
Allow: /compare/
Allow: /international/

# Block admin and API routes
Disallow: /admin/
Disallow: /api/
Disallow: /auth/
Disallow: /_next/
Disallow: /.well-known/
Disallow: /private/
Disallow: /temp/

# Allow specific crawlers for Indian market
User-agent: Googlebot
Allow: /
Crawl-delay: 1

User-agent: Bingbot
Allow: /
Crawl-delay: 1

# Indian search engines
User-agent: JustDial
Allow: /
Allow: /locations/
Crawl-delay: 2

User-agent: Sulekha
Allow: /
Allow: /locations/
Crawl-delay: 2

# Educational crawlers
User-agent: EduCrawler
Allow: /courses/
Allow: /resources/
Crawl-delay: 1

# Social media crawlers
User-agent: facebookexternalhit
Allow: /

User-agent: Twitterbot
Allow: /

User-agent: LinkedInBot
Allow: /

User-agent: WhatsApp
Allow: /

# Optimize for mobile crawlers
User-agent: Googlebot-Mobile
Allow: /
Crawl-delay: 1

# City-specific optimization
Allow: /locations/kota/
Allow: /locations/delhi/
Allow: /locations/hyderabad/
Allow: /locations/bangalore/
Allow: /locations/mumbai/
Allow: /locations/pune/
Allow: /locations/chennai/
Allow: /locations/jaipur/
Allow: /locations/indore/
Allow: /locations/lucknow/
Allow: /locations/patna/
Allow: /locations/bhubaneswar/

# Course-specific optimization
Allow: /courses/class-11-biology/
Allow: /courses/class-12-biology/
Allow: /courses/neet-dropper-biology/
Allow: /courses/foundation-biology/

# Exam-specific optimization
Allow: /exams/neet/
Allow: /exams/aiims/
Allow: /exams/jipmer/
Allow: /exams/cbse/
Allow: /exams/icse/

# International market optimization
Allow: /international/
Allow: /exams/ib-biology/
Allow: /exams/ap-biology/
Allow: /exams/a-level-biology/

# Sitemap references
Sitemap: ${baseUrl}/sitemap.xml
Sitemap: ${baseUrl}/sitemap-courses.xml
Sitemap: ${baseUrl}/sitemap-locations.xml
Sitemap: ${baseUrl}/sitemap-topics.xml
Sitemap: ${baseUrl}/sitemap-blog.xml

# Crawl optimization for better server performance
Crawl-delay: 1
Request-rate: 1/1s

# Cache directive
# Cache-Control: public, max-age=86400`

  return new NextResponse(robots, {
    headers: {
      'Content-Type': 'text/plain',
      'Cache-Control': 'public, max-age=86400',
    },
  })
}
