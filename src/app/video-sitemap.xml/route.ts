import { NextResponse } from 'next/server'
import { realTestimonials } from '@/data/realTestimonials'

export const dynamic = 'force-static'

const BASE_URL = 'https://cerebrumbiologyacademy.com'

interface VideoInfo {
  youtubeId: string
  title: string
  description: string
  duration: string
  uploadDate: string
}

interface VideoSitemapEntry {
  loc: string
  videos: VideoInfo[]
}

// Canonical video definitions (3 unique videos used across the site)
const VIDEOS: Record<string, VideoInfo> = {
  bk6wQCh6b9w: {
    youtubeId: 'bk6wQCh6b9w',
    title: 'Sadhna Sirin - Delhi NCR Topper NEET 2023 | Cerebrum Biology Academy',
    description:
      'Sadhna Sirin shares her NEET 2023 success story, scoring 695 out of 720 marks with guidance from Dr. Shekhar C Singh at Cerebrum Biology Academy.',
    duration: '330',
    uploadDate: '2023-07-15',
  },
  NfhkGqOQXzk: {
    youtubeId: 'NfhkGqOQXzk',
    title: 'Abhisek - AFMC Selection | Cerebrum Biology Academy',
    description:
      'Abhisek shares how Cerebrum Biology Academy helped him secure admission to Armed Forces Medical College (AFMC) through focused NEET biology preparation.',
    duration: '255',
    uploadDate: '2024-02-10',
  },
  t5F8RBuHITM: {
    youtubeId: 't5F8RBuHITM',
    title: 'Student Success Story | NEET Biology Coaching at Cerebrum Biology Academy',
    description:
      'Watch how students at Cerebrum Biology Academy achieve outstanding NEET results through focused biology coaching by Dr. Shekhar C Singh with small batch sizes of 15-20 students.',
    duration: '285',
    uploadDate: '2024-01-15',
  },
}

const ALL_THREE = [VIDEOS.bk6wQCh6b9w, VIDEOS.NfhkGqOQXzk, VIDEOS.t5F8RBuHITM]

// Static video sitemap entries for dedicated + location pages
const STATIC_ENTRIES: VideoSitemapEntry[] = [
  // Dedicated testimonial pages
  {
    loc: '/testimonials/sadhna-sirin-neet-2023-topper',
    videos: [VIDEOS.bk6wQCh6b9w],
  },
  {
    loc: '/testimonials/neet-success-story',
    videos: [VIDEOS.t5F8RBuHITM],
  },
  // Location pages with embedded videos
  { loc: '/neet-coaching-gurgaon', videos: ALL_THREE },
  { loc: '/neet-coaching-civil-lines-delhi', videos: ALL_THREE },
  { loc: '/neet-coaching-noida', videos: ALL_THREE },
  { loc: '/neet-crash-course-rohini-2026', videos: ALL_THREE },
  { loc: '/neet-coaching-dwarka', videos: ALL_THREE },
  { loc: '/neet-coaching-gurugram', videos: ALL_THREE },
  { loc: '/neet-coaching-faridabad', videos: ALL_THREE },
]

function escapeXML(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

function buildVideoXML(video: VideoInfo): string {
  return `    <video:video>
      <video:thumbnail_loc>https://i.ytimg.com/vi/${video.youtubeId}/hqdefault.jpg</video:thumbnail_loc>
      <video:title>${escapeXML(video.title)}</video:title>
      <video:description>${escapeXML(video.description)}</video:description>
      <video:player_loc>https://www.youtube.com/embed/${video.youtubeId}</video:player_loc>
      <video:duration>${video.duration}</video:duration>
      <video:publication_date>${video.uploadDate}</video:publication_date>
      <video:family_friendly>yes</video:family_friendly>
      <video:category>Education</video:category>
    </video:video>`
}

export async function GET() {
  // Build entries from realTestimonials (dynamic)
  const videosWithYoutubeId = realTestimonials.filter(
    (t) => t.youtubeId && t.youtubeId.trim() !== ''
  )

  const testimonialEntry: VideoSitemapEntry = {
    loc: '/testimonials',
    videos: videosWithYoutubeId.map((t) => ({
      youtubeId: t.youtubeId!,
      title: `${t.studentName} - ${t.achievement} | Cerebrum Biology Academy`,
      description: t.quote,
      duration: '300',
      uploadDate: '2024-01-01',
    })),
  }

  const allEntries = [testimonialEntry, ...STATIC_ENTRIES]

  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
`

  for (const entry of allEntries) {
    xml += `  <url>
    <loc>${escapeXML(`${BASE_URL}${entry.loc}`)}</loc>
`
    for (const video of entry.videos) {
      xml += buildVideoXML(video) + '\n'
    }
    xml += `  </url>
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
