import { NextResponse } from 'next/server'
import { realTestimonials } from '@/data/realTestimonials'

export const dynamic = 'force-static'

const BASE_URL = 'https://cerebrumbiologyacademy.com'

interface VideoSitemapEntry {
  loc: string
  videos: {
    thumbnailLoc: string
    title: string
    description: string
    contentLoc: string
    playerLoc: string
    familyFriendly: 'yes' | 'no'
    category: string
  }[]
}

function generateVideoSitemapXML(entries: VideoSitemapEntry[]): string {
  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
`

  for (const entry of entries) {
    xml += `  <url>
    <loc>${escapeXML(entry.loc)}</loc>
`
    for (const video of entry.videos) {
      xml += `    <video:video>
      <video:thumbnail_loc>${escapeXML(video.thumbnailLoc)}</video:thumbnail_loc>
      <video:title>${escapeXML(video.title)}</video:title>
      <video:description>${escapeXML(video.description)}</video:description>
      <video:content_loc>${escapeXML(video.contentLoc)}</video:content_loc>
      <video:player_loc>${escapeXML(video.playerLoc)}</video:player_loc>
      <video:family_friendly>${video.familyFriendly}</video:family_friendly>
      <video:category>${escapeXML(video.category)}</video:category>
    </video:video>
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
  // Filter testimonials that have YouTube IDs
  const videosWithYoutubeId = realTestimonials.filter(
    (testimonial) => testimonial.youtubeId && testimonial.youtubeId.trim() !== ''
  )

  // Build video sitemap entries
  const videoEntries: VideoSitemapEntry[] = [
    {
      loc: `${BASE_URL}/testimonials`,
      videos: videosWithYoutubeId.map((testimonial) => ({
        thumbnailLoc: `https://i.ytimg.com/vi/${testimonial.youtubeId}/hqdefault.jpg`,
        title: `${testimonial.studentName} - ${testimonial.achievement} | Cerebrum Biology Academy`,
        description: testimonial.quote,
        contentLoc: `https://www.youtube.com/watch?v=${testimonial.youtubeId}`,
        playerLoc: `https://www.youtube.com/embed/${testimonial.youtubeId}`,
        familyFriendly: 'yes' as const,
        category: 'Education',
      })),
    },
  ]

  const xml = generateVideoSitemapXML(videoEntries)

  return new NextResponse(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
    },
  })
}
