import { NextResponse } from 'next/server'

export const dynamic = 'force-static'

const BASE_URL = 'https://cerebrumbiologyacademy.com'
const IMAGES_BASE_URL = `${BASE_URL}/images`

interface ImageSitemapEntry {
  loc: string
  images: {
    loc: string
    title: string
    caption: string
  }[]
}

const imageEntries: ImageSitemapEntry[] = [
  {
    loc: `${BASE_URL}/`,
    images: [
      {
        loc: `${IMAGES_BASE_URL}/logo.png`,
        title: 'Cerebrum Biology Academy Logo',
        caption: 'Official logo of Cerebrum Biology Academy',
      },
      {
        loc: `${IMAGES_BASE_URL}/og-image.jpg`,
        title: 'Cerebrum Biology Academy',
        caption: 'Premium NEET Biology coaching with expert faculty',
      },
    ],
  },
  {
    loc: `${BASE_URL}/locations/south-extension`,
    images: [
      {
        loc: `${IMAGES_BASE_URL}/centers/center-south-extension.jpg`,
        title: 'South Extension Center - Cerebrum Biology Academy',
        caption: 'State-of-the-art biology coaching center in South Extension, Delhi',
      },
    ],
  },
  {
    loc: `${BASE_URL}/locations/rohini`,
    images: [
      {
        loc: `${IMAGES_BASE_URL}/centers/center-rohini.jpg`,
        title: 'Rohini Center - Cerebrum Biology Academy',
        caption: 'Premium NEET biology coaching facility in Rohini, Delhi',
      },
    ],
  },
  {
    loc: `${BASE_URL}/locations/green-park`,
    images: [
      {
        loc: `${IMAGES_BASE_URL}/centers/center-green-park.jpg`,
        title: 'Green Park Center - Cerebrum Biology Academy',
        caption: 'Modern biology coaching center in Green Park, Delhi',
      },
    ],
  },
  {
    loc: `${BASE_URL}/locations/gurugram`,
    images: [
      {
        loc: `${IMAGES_BASE_URL}/centers/center-gurugram.jpg`,
        title: 'Gurugram Center - Cerebrum Biology Academy',
        caption: 'Advanced NEET biology coaching facility in Gurugram',
      },
      {
        loc: `${IMAGES_BASE_URL}/centers/classroom-gurugram.jpg`,
        title: 'Gurugram Classroom - Cerebrum Biology Academy',
        caption: 'Interactive classroom setup at our Gurugram center',
      },
    ],
  },
  {
    loc: `${BASE_URL}/locations/faridabad`,
    images: [
      {
        loc: `${IMAGES_BASE_URL}/centers/center-faridabad.jpg`,
        title: 'Faridabad Center - Cerebrum Biology Academy',
        caption: 'Expert NEET biology coaching in Faridabad',
      },
    ],
  },
  {
    loc: `${BASE_URL}/locations/noida`,
    images: [
      {
        loc: `${IMAGES_BASE_URL}/centers/center-noida.jpg`,
        title: 'Noida Center - Cerebrum Biology Academy',
        caption: 'Comprehensive biology coaching center in Noida',
      },
    ],
  },
  {
    loc: `${BASE_URL}/testimonials`,
    images: [
      {
        loc: 'https://i.ytimg.com/vi/bk6wQCh6b9w/hqdefault.jpg',
        title: 'Sadhna Sirin - NEET Topper Testimonial',
        caption: 'Delhi-NCR Topper with 100 Percentile Biology score',
      },
      {
        loc: 'https://i.ytimg.com/vi/NfhkGqOQXzk/hqdefault.jpg',
        title: 'Abhisek - AFMC Selection Testimonial',
        caption: 'Armed Forces Medical College selection success story',
      },
      {
        loc: 'https://i.ytimg.com/vi/t5F8RBuHITM/hqdefault.jpg',
        title: 'Nishita - Medical College Success Testimonial',
        caption: '6-month intensive program success story',
      },
    ],
  },
  {
    loc: `${BASE_URL}/dr-shekhar-singh-neet-biology-faculty`,
    images: [
      {
        loc: `${IMAGES_BASE_URL}/faculty/dr-shekhar-singh.jpg`,
        title: 'Dr. Shekhar Singh - NEET Biology Faculty',
        caption: 'Expert biology faculty and founder of Cerebrum Biology Academy',
      },
    ],
  },
]

function generateImageSitemapXML(entries: ImageSitemapEntry[]): string {
  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
`

  for (const entry of entries) {
    xml += `  <url>
    <loc>${escapeXML(entry.loc)}</loc>
`
    for (const image of entry.images) {
      xml += `    <image:image>
      <image:loc>${escapeXML(image.loc)}</image:loc>
      <image:title>${escapeXML(image.title)}</image:title>
      <image:caption>${escapeXML(image.caption)}</image:caption>
    </image:image>
`
    }
    xml += `  </url>
`
  }

  xml += `</urlset>`

  return xml
}

function escapeXML(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

export async function GET() {
  const xml = generateImageSitemapXML(imageEntries)

  return new NextResponse(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
    },
  })
}
