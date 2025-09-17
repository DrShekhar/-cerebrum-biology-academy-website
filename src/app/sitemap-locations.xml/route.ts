import { NextResponse } from 'next/server'
import { locationDatabase } from '@/data/locationData'

export async function GET() {
  const baseUrl = 'https://cerebrumbiologyacademy.com'
  const currentDate = new Date().toISOString()

  // Generate sitemap XML for all location pages
  const locationUrls = locationDatabase
    .map((location) => {
      return `
    <url>
      <loc>${baseUrl}/locations/${location.slug}</loc>
      <lastmod>${currentDate}</lastmod>
      <changefreq>weekly</changefreq>
      <priority>0.8</priority>
      <image:image>
        <image:loc>${baseUrl}/images/locations/${location.slug}-hero.jpg</image:loc>
        <image:title>NEET Biology Coaching in ${location.city}</image:title>
        <image:caption>Best NEET Biology coaching for ${location.city} students</image:caption>
      </image:image>
    </url>`
    })
    .join('')

  // Add locations index page
  const locationsIndexUrl = `
    <url>
      <loc>${baseUrl}/locations</loc>
      <lastmod>${currentDate}</lastmod>
      <changefreq>weekly</changefreq>
      <priority>0.9</priority>
    </url>`

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
  ${locationsIndexUrl}
  ${locationUrls}
</urlset>`

  return new NextResponse(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
    },
  })
}
