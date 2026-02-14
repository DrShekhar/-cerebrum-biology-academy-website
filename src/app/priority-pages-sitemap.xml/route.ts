import { NextResponse } from 'next/server'

export const dynamic = 'force-static'

const BASE_URL = 'https://cerebrumbiologyacademy.com'
const NOW = '2026-02-14'

// High-priority pages that need crawling/indexing focus
// Submit this sitemap separately in GSC > Sitemaps
const PRIORITY_PAGES = [
  // Money pages (priority 1.0 - 0.9)
  { loc: '/', priority: '1.0', changefreq: 'daily' },
  { loc: '/courses', priority: '0.95', changefreq: 'weekly' },
  { loc: '/enrollment', priority: '0.95', changefreq: 'weekly' },
  { loc: '/best-neet-biology-coaching', priority: '0.95', changefreq: 'weekly' },
  { loc: '/neet-coaching-fees', priority: '0.95', changefreq: 'weekly' },
  { loc: '/online-neet-biology-coaching', priority: '0.95', changefreq: 'weekly' },
  { loc: '/book-free-demo', priority: '0.9', changefreq: 'weekly' },
  { loc: '/demo-booking', priority: '0.9', changefreq: 'weekly' },

  // Course pages
  { loc: '/courses/class-12', priority: '0.9', changefreq: 'weekly' },
  { loc: '/courses/class-11', priority: '0.9', changefreq: 'weekly' },
  { loc: '/courses/foundation', priority: '0.9', changefreq: 'weekly' },
  { loc: '/courses/neet-dropper', priority: '0.9', changefreq: 'weekly' },
  { loc: '/courses/neet-complete', priority: '0.9', changefreq: 'weekly' },
  { loc: '/courses/class-9-foundation', priority: '0.85', changefreq: 'weekly' },

  // Content & tools
  { loc: '/biology-notes-for-neet', priority: '0.95', changefreq: 'weekly' },
  { loc: '/neet-biology-mcq', priority: '0.9', changefreq: 'weekly' },
  { loc: '/neet-previous-year-questions', priority: '0.9', changefreq: 'weekly' },
  { loc: '/blog', priority: '0.85', changefreq: 'daily' },
  { loc: '/biology-notes', priority: '0.85', changefreq: 'weekly' },
  { loc: '/free-resources', priority: '0.85', changefreq: 'daily' },

  // Trust & conversion pages
  { loc: '/testimonials', priority: '0.85', changefreq: 'weekly' },
  { loc: '/testimonials/sadhna-sirin-neet-2023-topper', priority: '0.8', changefreq: 'monthly' },
  { loc: '/testimonials/neet-success-story', priority: '0.8', changefreq: 'monthly' },
  { loc: '/about', priority: '0.8', changefreq: 'monthly' },
  { loc: '/faculty', priority: '0.8', changefreq: 'monthly' },
  { loc: '/wall-of-achievers', priority: '0.8', changefreq: 'monthly' },
  { loc: '/results', priority: '0.8', changefreq: 'monthly' },

  // Key location pages
  { loc: '/neet-coaching-centre', priority: '0.9', changefreq: 'weekly' },
  { loc: '/neet-coaching-gurgaon', priority: '0.9', changefreq: 'weekly' },
  { loc: '/neet-coaching-noida', priority: '0.85', changefreq: 'weekly' },
  { loc: '/neet-coaching-dwarka', priority: '0.85', changefreq: 'weekly' },
  { loc: '/neet-coaching-civil-lines-delhi', priority: '0.85', changefreq: 'weekly' },
  { loc: '/neet-coaching-gurugram', priority: '0.85', changefreq: 'weekly' },
  { loc: '/neet-coaching-faridabad', priority: '0.85', changefreq: 'weekly' },
  { loc: '/neet-coaching-rohini', priority: '0.85', changefreq: 'weekly' },
  { loc: '/neet-crash-course-rohini-2026', priority: '0.85', changefreq: 'weekly' },

  // Utility
  { loc: '/contact', priority: '0.7', changefreq: 'monthly' },
  { loc: '/scholarship', priority: '0.8', changefreq: 'monthly' },
  { loc: '/admissions', priority: '0.8', changefreq: 'monthly' },
]

function escapeXML(str: string): string {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}

export async function GET() {
  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
`

  for (const page of PRIORITY_PAGES) {
    xml += `  <url>
    <loc>${escapeXML(`${BASE_URL}${page.loc}`)}</loc>
    <lastmod>${NOW}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>
`
  }

  xml += `</urlset>`

  return new NextResponse(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
    },
  })
}
