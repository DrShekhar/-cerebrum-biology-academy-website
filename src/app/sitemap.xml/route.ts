import { NextResponse } from 'next/server'
import { globalSEOService } from '@/lib/seo/globalSEO'
import { citySpecificSEOService } from '@/lib/seo/citySpecificSEO'

export async function GET() {
  const baseUrl = 'https://cerebrumbiologyacademy.com'
  const currentDate = new Date().toISOString()

  // Core pages from globalSEOService
  const corePages = globalSEOService.generateSitemap()

  // City-specific pages
  const cityPages = citySpecificSEOService.generateCitySpecificSitemap()

  // Biology topics for each class
  const biologyTopics = [
    // Class 11 Topics
    'Cell Biology',
    'Biomolecules',
    'Cell Cycle and Division',
    'Transport in Plants',
    'Mineral Nutrition',
    'Photosynthesis',
    'Respiration in Plants',
    'Plant Growth',
    'Digestion and Absorption',
    'Breathing and Respiration',
    'Body Fluids and Circulation',
    'Excretory Products',
    'Locomotion and Movement',
    'Neural Control',
    'Chemical Coordination',

    // Class 12 Topics
    'Reproduction in Organisms',
    'Sexual Reproduction in Plants',
    'Human Reproduction',
    'Reproductive Health',
    'Heredity and Variation',
    'Molecular Basis of Inheritance',
    'Evolution',
    'Human Health and Disease',
    'Strategies for Enhancement',
    'Microbes in Human Welfare',
    'Biotechnology Principles',
    'Biotechnology Applications',
    'Organisms and Populations',
    'Ecosystem',
    'Biodiversity and Conservation',
    'Environmental Issues',
  ]

  // Generate topic pages for each class
  const topicPages: any[] = []
  biologyTopics.forEach((topic) => {
    ;['class-11', 'class-12', 'neet-dropper', 'foundation'].forEach((className) => {
      topicPages.push({
        url: `/topics/${topic.toLowerCase().replace(/\s+/g, '-')}/${className}`,
        priority: '0.7',
        changefreq: 'weekly',
        lastmod: currentDate,
      })
    })
  })

  // Course-specific pages
  const coursePages = [
    { url: '/courses/class-11-biology', priority: '0.9', changefreq: 'weekly' },
    { url: '/courses/class-12-biology', priority: '0.9', changefreq: 'weekly' },
    { url: '/courses/neet-dropper-biology', priority: '0.9', changefreq: 'weekly' },
    { url: '/courses/foundation-biology', priority: '0.9', changefreq: 'weekly' },
    { url: '/courses/online-neet-coaching', priority: '0.9', changefreq: 'weekly' },
    { url: '/courses/offline-neet-coaching', priority: '0.8', changefreq: 'weekly' },
    { url: '/courses/hybrid-neet-coaching', priority: '0.8', changefreq: 'weekly' },
  ]

  // International pages
  const internationalPages = [
    { url: '/international/india', priority: '0.8', changefreq: 'monthly' },
    { url: '/international/usa', priority: '0.7', changefreq: 'monthly' },
    { url: '/international/uk', priority: '0.7', changefreq: 'monthly' },
    { url: '/international/canada', priority: '0.7', changefreq: 'monthly' },
    { url: '/international/australia', priority: '0.7', changefreq: 'monthly' },
    { url: '/international/uae', priority: '0.7', changefreq: 'monthly' },
    { url: '/international/singapore', priority: '0.7', changefreq: 'monthly' },
  ]

  // Exam-specific pages
  const examPages = [
    { url: '/exams/neet', priority: '0.9', changefreq: 'weekly' },
    { url: '/exams/aiims', priority: '0.8', changefreq: 'weekly' },
    { url: '/exams/jipmer', priority: '0.8', changefreq: 'weekly' },
    { url: '/exams/cbse', priority: '0.8', changefreq: 'weekly' },
    { url: '/exams/icse', priority: '0.7', changefreq: 'weekly' },
    { url: '/exams/ib-biology', priority: '0.7', changefreq: 'weekly' },
    { url: '/exams/ap-biology', priority: '0.7', changefreq: 'weekly' },
    { url: '/exams/a-level-biology', priority: '0.7', changefreq: 'weekly' },
  ]

  // Blog and resource pages
  const resourcePages = [
    { url: '/blog', priority: '0.8', changefreq: 'daily' },
    { url: '/resources/notes', priority: '0.8', changefreq: 'weekly' },
    { url: '/resources/mock-tests', priority: '0.8', changefreq: 'weekly' },
    { url: '/resources/previous-papers', priority: '0.8', changefreq: 'weekly' },
    { url: '/resources/video-lectures', priority: '0.8', changefreq: 'weekly' },
    { url: '/resources/ncert-solutions', priority: '0.8', changefreq: 'weekly' },
    { url: '/resources/biology-diagrams', priority: '0.7', changefreq: 'monthly' },
    { url: '/resources/formulas', priority: '0.7', changefreq: 'monthly' },
  ]

  // Success stories and testimonials
  const successPages = [
    { url: '/success-stories', priority: '0.8', changefreq: 'weekly' },
    { url: '/testimonials', priority: '0.7', changefreq: 'weekly' },
    { url: '/results/neet-2024', priority: '0.8', changefreq: 'monthly' },
    { url: '/results/neet-2023', priority: '0.7', changefreq: 'monthly' },
    { url: '/results/aiims-2024', priority: '0.7', changefreq: 'monthly' },
  ]

  // Combine all pages
  const allPages = [
    ...corePages,
    ...cityPages,
    ...topicPages,
    ...coursePages,
    ...internationalPages,
    ...examPages,
    ...resourcePages,
    ...successPages,
  ]

  // Generate XML sitemap
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" 
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 
        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
${allPages
  .map(
    (page) => `  <url>
    <loc>${baseUrl}${page.url}</loc>
    <lastmod>${page.lastmod || currentDate}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`
  )
  .join('\n')}
</urlset>`

  return new NextResponse(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600, stale-while-revalidate=86400',
    },
  })
}
