import { MetadataRoute } from 'next'
import { getAllPosts } from '@/lib/blog/mdx'
import { getAllSEOSlugs } from '@/data/seo-landing/slugs-static'
import { getAllAreaSlugs } from '@/data/localAreas'

export default function sitemap(): MetadataRoute.Sitemap {
  // Use non-www URL to match middleware redirect behavior
  const baseUrl = 'https://cerebrumbiologyacademy.com'
  // Use a stable date for static pages so Google can distinguish actual content updates
  // from mere redeployments. Update this date when site content meaningfully changes.
  const lastUpdated = new Date('2026-02-06')

  // Dynamically generate blog post URLs from MDX files
  const blogPosts = getAllPosts()
  const blogRoutes: MetadataRoute.Sitemap = blogPosts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.updatedAt || post.publishedAt),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  // Dynamically generate SEO landing page URLs
  const seoSlugs = getAllSEOSlugs()
  const seoLandingRoutes: MetadataRoute.Sitemap = seoSlugs.map((slug) => ({
    url: `${baseUrl}/${slug}`,
    lastModified: lastUpdated,
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }))

  // Dynamically generate local area page URLs (e.g., /best-biology-coaching-gurgaon)
  const localAreaSlugs = getAllAreaSlugs()
  const localAreaRoutes: MetadataRoute.Sitemap = localAreaSlugs.map((slug) => ({
    url: `${baseUrl}/${slug}`,
    lastModified: lastUpdated,
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }))

  const routes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: lastUpdated,
      changeFrequency: 'daily' as const,
      priority: 1.0,
    },
    {
      url: `${baseUrl}/ai-education-demo`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/courses`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/enrollment`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/best-neet-biology-coaching`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.92,
    },
    {
      url: `${baseUrl}/neet-coaching-fees`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/online-neet-biology-coaching`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.91,
    },
    {
      url: `${baseUrl}/pricing`,
      lastModified: lastUpdated,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/mock-tests`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: lastUpdated,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: lastUpdated,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/resources`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/free-resources`,
      lastModified: lastUpdated,
      changeFrequency: 'daily' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/school-career-seminar`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/testimonials`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/faculty`,
      lastModified: lastUpdated,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: lastUpdated,
      changeFrequency: 'daily' as const,
      priority: 0.8,
    },
    // Blog posts are dynamically generated above
    ...blogRoutes,
    // SEO landing pages for keyword targeting
    ...seoLandingRoutes,
    // Local area pages for [localSlug] route (e.g., /best-biology-coaching-gurgaon)
    ...localAreaRoutes,
    {
      url: `${baseUrl}/gallery`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.6,
    },
    {
      url: `${baseUrl}/results`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.6,
    },
    {
      url: `${baseUrl}/success-stories`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.6,
    },
    // Trust & Social Proof Pages - HIGH CONVERSION
    {
      url: `${baseUrl}/neet-success-stories`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/wall-of-achievers`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/neet-repeater-success-stories`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    // Free Resources & Lead Gen Pages
    {
      url: `${baseUrl}/free-neet-biology-lectures`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.88,
    },
    {
      url: `${baseUrl}/biology-definitions`,
      lastModified: lastUpdated,
      changeFrequency: 'monthly' as const,
      priority: 0.75,
    },
    {
      url: `${baseUrl}/online-neet-test-series`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.88,
    },
    {
      url: `${baseUrl}/neet-tips-strategy`,
      lastModified: lastUpdated,
      changeFrequency: 'monthly' as const,
      priority: 0.75,
    },
    {
      url: `${baseUrl}/neet-preparation-timetable`,
      lastModified: lastUpdated,
      changeFrequency: 'monthly' as const,
      priority: 0.75,
    },
    // Class-wise Tuition & NEET Landing Pages - HIGH PRIORITY
    {
      url: `${baseUrl}/class-11-biology-tuition`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/class-12-biology-tuition`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/neet-biology-class-11`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/neet-biology-class-12`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/neet-biology-coaching-delhi-ncr`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.92,
    },
    {
      url: `${baseUrl}/locations`,
      lastModified: lastUpdated,
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    },
    {
      url: `${baseUrl}/neet-coaching-west-india`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/neet-coaching-south-india`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    // Delhi NCR Physical Centers - High Priority Local SEO
    {
      url: `${baseUrl}/locations/south-extension`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.95,
    },
    {
      url: `${baseUrl}/locations/rohini`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.95,
    },
    {
      url: `${baseUrl}/locations/green-park`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.95,
    },
    {
      url: `${baseUrl}/locations/gurugram`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.95,
    },
    {
      url: `${baseUrl}/locations/faridabad`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.95,
    },
    {
      url: `${baseUrl}/locations/noida`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.95,
    },
    // Areas We Serve - Secondary pages
    {
      url: `${baseUrl}/locations/delhi`,
      lastModified: lastUpdated,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/locations/south-delhi`,
      lastModified: lastUpdated,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    // Premium Areas - High ROI Location Pages
    {
      url: `${baseUrl}/locations/greater-kailash`,
      lastModified: lastUpdated,
      changeFrequency: 'monthly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/locations/defence-colony`,
      lastModified: lastUpdated,
      changeFrequency: 'monthly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/locations/gulmohar-park`,
      lastModified: lastUpdated,
      changeFrequency: 'monthly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/locations/new-friends-colony`,
      lastModified: lastUpdated,
      changeFrequency: 'monthly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/locations/panchsheel`,
      lastModified: lastUpdated,
      changeFrequency: 'monthly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/locations/vasant-vihar`,
      lastModified: lastUpdated,
      changeFrequency: 'monthly' as const,
      priority: 0.85,
    },
    // Phase 2 Premium Areas
    {
      url: `${baseUrl}/locations/saket`,
      lastModified: lastUpdated,
      changeFrequency: 'monthly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/locations/cr-park`,
      lastModified: lastUpdated,
      changeFrequency: 'monthly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/locations/jor-bagh`,
      lastModified: lastUpdated,
      changeFrequency: 'monthly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/locations/sundar-nagar`,
      lastModified: lastUpdated,
      changeFrequency: 'monthly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/locations/kalkaji`,
      lastModified: lastUpdated,
      changeFrequency: 'monthly' as const,
      priority: 0.85,
    },
    // Phase 3 Premium Areas - Ultra-Premium & High Volume
    {
      url: `${baseUrl}/locations/golf-links`,
      lastModified: lastUpdated,
      changeFrequency: 'monthly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/locations/malviya-nagar`,
      lastModified: lastUpdated,
      changeFrequency: 'monthly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/locations/lajpat-nagar`,
      lastModified: lastUpdated,
      changeFrequency: 'monthly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/locations/shanti-niketan`,
      lastModified: lastUpdated,
      changeFrequency: 'monthly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/locations/anand-niketan`,
      lastModified: lastUpdated,
      changeFrequency: 'monthly' as const,
      priority: 0.85,
    },
    // Phase 4 Premium Areas - P2 Expansion
    {
      url: `${baseUrl}/locations/maharani-bagh`,
      lastModified: lastUpdated,
      changeFrequency: 'monthly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/locations/neeti-bagh`,
      lastModified: lastUpdated,
      changeFrequency: 'monthly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/locations/westend`,
      lastModified: lastUpdated,
      changeFrequency: 'monthly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/locations/safdarjung-enclave`,
      lastModified: lastUpdated,
      changeFrequency: 'monthly' as const,
      priority: 0.85,
    },
    // Comparison Pages - AEO/GEO Optimized
    {
      url: `${baseUrl}/compare/neet-coaching-comparison`,
      lastModified: lastUpdated,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/demo-booking`,
      lastModified: lastUpdated,
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    },
    {
      url: `${baseUrl}/class-11`,
      lastModified: lastUpdated,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/class-12`,
      lastModified: lastUpdated,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/class-9-foundation`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/class-10-foundation`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/early-neet-preparation`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/neet-foundation-course`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/dropper`,
      lastModified: lastUpdated,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/neet-repeaters`,
      lastModified: lastUpdated,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/study-materials`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/video-lectures`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/services`,
      lastModified: lastUpdated,
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    },
    {
      url: `${baseUrl}/admissions`,
      lastModified: lastUpdated,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/compare`,
      lastModified: lastUpdated,
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    },
    {
      url: `${baseUrl}/compare/kota-vs-online`,
      lastModified: lastUpdated,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/compare/class-9-vs-class-10-foundation`,
      lastModified: lastUpdated,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    // NEET Year-specific Landing Pages - HIGH PRIORITY
    {
      url: `${baseUrl}/neet-2026-preparation`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.98,
    },
    // NEET 2026 SEO Pages - HIGH TRAFFIC KEYWORDS
    {
      url: `${baseUrl}/neet-2026-exam-date`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.98,
    },
    {
      url: `${baseUrl}/neet-2026-cutoff`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.97,
    },
    {
      url: `${baseUrl}/neet-biology-syllabus-2026`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.96,
    },
    // NEET Free Tools - HIGH ENGAGEMENT
    {
      url: `${baseUrl}/neet-rank-predictor`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.97,
    },
    {
      url: `${baseUrl}/neet-college-predictor`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.97,
    },
    {
      url: `${baseUrl}/neet-biology-mcq`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.96,
    },
    // NEET Biology MCQ Topic Pages - HIGH ENGAGEMENT
    {
      url: `${baseUrl}/neet-biology-mcq/ecology`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.92,
    },
    {
      url: `${baseUrl}/neet-biology-mcq/genetics-evolution`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.92,
    },
    {
      url: `${baseUrl}/neet-biology-mcq/human-physiology`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.92,
    },
    {
      url: `${baseUrl}/neet-biology-mcq/reproduction`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.92,
    },
    {
      url: `${baseUrl}/neet-biology-mcq/daily-challenge`,
      lastModified: lastUpdated,
      changeFrequency: 'daily' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/neet-biology-mcq/leaderboard`,
      lastModified: lastUpdated,
      changeFrequency: 'daily' as const,
      priority: 0.85,
    },
    // Regional Online Service Pages - HIGH PRIORITY
    {
      url: `${baseUrl}/neet-coaching-north-india`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.95,
    },
    {
      url: `${baseUrl}/neet-coaching-south-india`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.95,
    },
    {
      url: `${baseUrl}/neet-coaching-east-india`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.95,
    },
    {
      url: `${baseUrl}/neet-coaching-west-india`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.95,
    },
    {
      url: `${baseUrl}/neet-coaching-overseas`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.95,
    },
    // NEET Coaching SEO Pages - High Traffic Keywords
    {
      url: `${baseUrl}/best-neet-coaching`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.95,
    },
    {
      url: `${baseUrl}/neet-coaching-centre`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.95,
    },
    {
      url: `${baseUrl}/neet-coaching-institute`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.95,
    },
    {
      url: `${baseUrl}/neet-classes`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.95,
    },
    {
      url: `${baseUrl}/neet-preparation`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.95,
    },
    {
      url: `${baseUrl}/neet-biology-classes`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.95,
    },
    // Pan-India SEO Landing Pages - High Priority
    {
      url: `${baseUrl}/online-neet-coaching-india`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.95,
    },
    {
      url: `${baseUrl}/best-neet-coaching-india`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.95,
    },
    {
      url: `${baseUrl}/neet-biology-coaching-india`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.95,
    },
    {
      url: `${baseUrl}/online-medical-coaching-india`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.95,
    },
    // Delhi NCR Key Localities - High Priority
    {
      url: `${baseUrl}/laxmi-nagar`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/locations/delhi/dwarka`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/locations/delhi/rohini`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/locations/delhi/south-delhi`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/locations/noida/sector-18`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/locations/noida/sector-62`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    },
    // Gurugram/Gurgaon Key Localities - HIGH PRIORITY for Gurugram Domination
    {
      url: `${baseUrl}/neet-coaching-gurugram`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.95,
    },
    // Gurugram Featured Snippet / AEO Pages
    {
      url: `${baseUrl}/neet-coaching-fee-gurugram`,
      lastModified: lastUpdated,
      changeFrequency: 'monthly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/neet-success-rate-gurugram`,
      lastModified: lastUpdated,
      changeFrequency: 'monthly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/top-5-neet-coaching-gurugram`,
      lastModified: lastUpdated,
      changeFrequency: 'monthly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/neet-biology-chapter-weightage-gurugram`,
      lastModified: lastUpdated,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    // E-E-A-T Authority Pages
    {
      url: `${baseUrl}/dr-shekhar-singh-neet-biology-faculty`,
      lastModified: lastUpdated,
      changeFrequency: 'monthly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/media-mentions-press-coverage`,
      lastModified: lastUpdated,
      changeFrequency: 'monthly' as const,
      priority: 0.85,
    },
    // Gurugram Results & Authority Pages
    {
      url: `${baseUrl}/neet-result-2025-gurugram`,
      lastModified: lastUpdated,
      changeFrequency: 'monthly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/neet-result-2024-gurugram`,
      lastModified: lastUpdated,
      changeFrequency: 'monthly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/neet-topper-interview-gurugram`,
      lastModified: lastUpdated,
      changeFrequency: 'monthly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/neet-biology-faculty-gurugram`,
      lastModified: lastUpdated,
      changeFrequency: 'monthly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/free-neet-demo-class-gurugram`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    // Gurugram Course Pages
    {
      url: `${baseUrl}/6-month-neet-coaching-gurugram`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    },
    // Gurugram Metro/Sector Pages
    {
      url: `${baseUrl}/neet-coaching-cyber-city-gurugram`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/neet-coaching-mg-road-gurugram`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/neet-coaching-iffco-chowk-gurugram`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/neet-coaching-huda-city-centre-gurugram`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/neet-coaching-pataudi-road-gurugram`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/neet-coaching-gurgaon-sector-69`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/neet-coaching-gurgaon-sector-70`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    // Gurugram AEO Question Pages
    {
      url: `${baseUrl}/is-coaching-necessary-for-neet-gurugram`,
      lastModified: lastUpdated,
      changeFrequency: 'monthly' as const,
      priority: 0.75,
    },
    {
      url: `${baseUrl}/how-much-fees-for-neet-coaching-gurugram`,
      lastModified: lastUpdated,
      changeFrequency: 'monthly' as const,
      priority: 0.75,
    },
    {
      url: `${baseUrl}/can-i-crack-neet-without-coaching-gurugram`,
      lastModified: lastUpdated,
      changeFrequency: 'monthly' as const,
      priority: 0.75,
    },
    {
      url: `${baseUrl}/when-to-start-neet-preparation-gurugram`,
      lastModified: lastUpdated,
      changeFrequency: 'monthly' as const,
      priority: 0.75,
    },
    {
      url: `${baseUrl}/which-is-better-aakash-or-allen-gurugram`,
      lastModified: lastUpdated,
      changeFrequency: 'monthly' as const,
      priority: 0.75,
    },
    {
      url: `${baseUrl}/neet-coaching-vs-self-study-gurugram`,
      lastModified: lastUpdated,
      changeFrequency: 'monthly' as const,
      priority: 0.75,
    },
    {
      url: `${baseUrl}/best-time-to-join-neet-coaching-gurugram`,
      lastModified: lastUpdated,
      changeFrequency: 'monthly' as const,
      priority: 0.75,
    },
    {
      url: `${baseUrl}/parents-guide-neet-coaching-gurugram`,
      lastModified: lastUpdated,
      changeFrequency: 'monthly' as const,
      priority: 0.75,
    },
    // Gurugram School-Specific Pages
    {
      url: `${baseUrl}/neet-coaching-pathways-world-school-gurugram`,
      lastModified: lastUpdated,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/neet-coaching-kr-mangalam-world-school-gurugram`,
      lastModified: lastUpdated,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/neet-coaching-bal-bharati-school-gurugram`,
      lastModified: lastUpdated,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/neet-coaching-presidium-school-gurugram`,
      lastModified: lastUpdated,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/neet-coaching-apeejay-school-gurugram`,
      lastModified: lastUpdated,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/neet-coaching-dps-international-gurugram`,
      lastModified: lastUpdated,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/neet-coaching-vega-school-gurugram`,
      lastModified: lastUpdated,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/neet-coaching-hillwoods-academy-gurugram`,
      lastModified: lastUpdated,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/neet-coaching-paras-world-school-gurugram`,
      lastModified: lastUpdated,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/locations/gurugram/dlf-phase-1`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/locations/gurugram/golf-course-road`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/locations/gurugram/sushant-lok`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/locations/gurugram/sector-56`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/locations/gurugram/sector-14`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/locations/gurugram/sector-43`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/locations/gurugram/sector-51`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/locations/gurugram/sector-57`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/locations/gurugram/south-city-1`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/locations/gurugram/new-gurugram`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/locations/gurugram/dlf-phase-4`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    },
    // NEW Premium Gurugram Localities (Based on Market Research)
    {
      url: `${baseUrl}/locations/gurugram/nirvana-country`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/locations/gurugram/sector-49`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/locations/gurugram/sohna-road`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/locations/gurugram/sector-84`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/locations/gurugram/dlf-phase-2`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/locations/gurugram/dlf-phase-3`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/locations/gurugram/dlf-phase-5`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    // Phase 3 Gurugram Localities - Ultra Premium & Dwarka Expressway
    {
      url: `${baseUrl}/locations/gurugram/mg-road`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/locations/gurugram/sector-54`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/locations/gurugram/sector-58`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/locations/gurugram/sector-53`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/locations/gurugram/ambience-island`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/locations/gurugram/sector-45`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/locations/gurugram/sector-48`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/locations/gurugram/sector-62`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/locations/gurugram/sector-63`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/locations/gurugram/sector-41`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/locations/gurugram/sector-102`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/locations/gurugram/sector-106`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/locations/gurugram/sector-109`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/locations/gurugram/sector-111`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/locations/gurugram/sector-113`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/course-finder`,
      lastModified: lastUpdated,
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    },
    // Noida SEO Landing Pages - HIGH PRIORITY
    {
      url: `${baseUrl}/neet-coaching-noida`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.95,
    },
    {
      url: `${baseUrl}/neet-coaching-noida/sector-18`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/neet-coaching-noida/sector-62`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/neet-coaching-noida/sector-137`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/neet-coaching-noida/sector-150`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/neet-coaching-noida/sector-44`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/neet-coaching-noida/sector-50`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/neet-coaching-noida/sector-37`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/neet-coaching-noida/sector-93`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/neet-coaching-noida/sector-104`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/neet-coaching-noida/sector-128`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/neet-coaching-noida/sector-15a`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/neet-coaching-noida/sector-168`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/neet-coaching-noida/greater-noida-west`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/neet-coaching-greater-noida-west`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.95,
    },
    // Noida Society Pages
    {
      url: `${baseUrl}/neet-coaching-noida-society/godrej-woods`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/neet-coaching-noida-society/mahagun-moderne`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/neet-coaching-noida-society/supertech-eco-village`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/neet-coaching-noida-society/logix-blossom-county`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/neet-coaching-noida-society/ace-city`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/neet-coaching-noida-society/gulshan-dynasty`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/neet-coaching-noida-society/eldeco-utopia`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/neet-coaching-noida-society/paras-tierea`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/neet-coaching-noida-society/prateek-grand-city`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    // Noida Metro Station Pages
    {
      url: `${baseUrl}/neet-coaching-near-metro/botanical-garden`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/neet-coaching-near-metro/noida-city-centre`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/neet-coaching-near-metro/sector-18-metro`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/neet-coaching-near-metro/sector-137-metro`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/neet-coaching-near-metro/pari-chowk-metro`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    // Noida HowTo Guide Page
    {
      url: `${baseUrl}/how-to-prepare-neet-noida`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    // Noida vs Kota Comparison
    {
      url: `${baseUrl}/neet-coaching-noida-vs-kota`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    // Noida Toppers/Results
    {
      url: `${baseUrl}/neet-toppers-noida`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/privacy-policy`,
      lastModified: lastUpdated,
      changeFrequency: 'yearly' as const,
      priority: 0.3,
    },
    {
      url: `${baseUrl}/terms-of-service`,
      lastModified: lastUpdated,
      changeFrequency: 'yearly' as const,
      priority: 0.3,
    },
    {
      url: `${baseUrl}/refund-policy`,
      lastModified: lastUpdated,
      changeFrequency: 'yearly' as const,
      priority: 0.3,
    },
    {
      url: `${baseUrl}/disclaimer`,
      lastModified: lastUpdated,
      changeFrequency: 'yearly' as const,
      priority: 0.3,
    },
    // Biology Topics Pages - High SEO value
    {
      url: `${baseUrl}/biology-topics`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/biology-topics/cell-biology`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/biology-topics/genetics-evolution`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/biology-topics/human-physiology`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/biology-topics/plant-physiology`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/biology-topics/ecology-environment`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/biology-topics/biotechnology`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    // Ghaziabad SEO Landing Pages - HIGH PRIORITY
    {
      url: `${baseUrl}/neet-coaching-ghaziabad`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.95,
    },
    {
      url: `${baseUrl}/neet-coaching-ghaziabad/indirapuram`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/neet-coaching-ghaziabad/vaishali`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/neet-coaching-ghaziabad/vasundhara`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/neet-coaching-ghaziabad/crossing-republik`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/neet-coaching-ghaziabad/raj-nagar-extension`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/neet-coaching-ghaziabad/kaushambi`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/neet-coaching-ghaziabad/mohan-nagar`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/neet-coaching-ghaziabad/sahibabad`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    },
    // Faridabad SEO Landing Pages - HIGH PRIORITY
    {
      url: `${baseUrl}/neet-coaching-faridabad`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.95,
    },
    {
      url: `${baseUrl}/neet-coaching-faridabad/greater-faridabad`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/neet-coaching-faridabad/sector-21`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/neet-coaching-faridabad/nit-faridabad`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/neet-coaching-faridabad/ballabgarh`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/neet-coaching-faridabad/sector-15`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/neet-coaching-faridabad/neharpar`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/neet-coaching-faridabad/sector-86`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/neet-coaching-faridabad/old-faridabad`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    },
    // Biology Tuition & Coaching Pages - HIGH PRIORITY
    {
      url: `${baseUrl}/biology-tuition-ghaziabad`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.95,
    },
    {
      url: `${baseUrl}/biology-tuition-faridabad`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.95,
    },
    {
      url: `${baseUrl}/biology-coaching-class-11`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/biology-coaching-class-12`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/biology-coaching-droppers`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/biology-tuition-class-9-10`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    // Delhi NCR Standalone Location Pages - HIGH PRIORITY
    {
      url: `${baseUrl}/neet-coaching-rohini`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/neet-coaching-cr-park-delhi`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.88,
    },
    {
      url: `${baseUrl}/neet-coaching-defence-colony-delhi`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.88,
    },
    {
      url: `${baseUrl}/neet-coaching-green-park-delhi`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.88,
    },
    {
      url: `${baseUrl}/neet-coaching-saket-delhi`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.88,
    },
    {
      url: `${baseUrl}/neet-coaching-vasant-kunj-delhi`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.88,
    },
    {
      url: `${baseUrl}/biology-coaching-vasant-vihar-delhi`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.88,
    },
    // South Delhi SEO Landing Pages - HIGH PRIORITY
    {
      url: `${baseUrl}/neet-coaching-south-delhi`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.95,
    },
    {
      url: `${baseUrl}/neet-coaching-south-delhi/hauz-khas`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/neet-coaching-south-delhi/kalu-sarai`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/neet-coaching-south-delhi/greater-kailash`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/neet-coaching-south-delhi/defence-colony`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/neet-coaching-south-delhi/vasant-vihar`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/neet-coaching-south-delhi/saket`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/neet-coaching-south-delhi/malviya-nagar`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/neet-coaching-south-delhi/green-park`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/neet-coaching-south-delhi/panchsheel-park`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/neet-coaching-south-delhi/new-friends-colony`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/neet-coaching-south-delhi/cr-park`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/neet-coaching-south-delhi/vasant-kunj`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    },
    // Government Officer Colonies - South Delhi
    {
      url: `${baseUrl}/neet-coaching-south-delhi/rk-puram`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/neet-coaching-south-delhi/sarojini-nagar`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/neet-coaching-south-delhi/lodhi-colony`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/neet-coaching-south-delhi/andrews-ganj`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/neet-coaching-south-delhi/kidwai-nagar`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/neet-coaching-south-delhi/netaji-nagar`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/neet-coaching-south-delhi/moti-bagh`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    },
    // Ultra-Premium Lutyens Delhi
    {
      url: `${baseUrl}/neet-coaching-south-delhi/golf-links`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/neet-coaching-south-delhi/jor-bagh`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/neet-coaching-south-delhi/sunder-nagar`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    // Student Hub Areas
    {
      url: `${baseUrl}/neet-coaching-south-delhi/munirka`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/neet-coaching-south-delhi/ber-sarai`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/neet-coaching-south-delhi/katwaria-sarai`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/neet-coaching-south-delhi/lajpat-nagar`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/neet-coaching-south-delhi/kalkaji`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    },
    // Premium Residential Areas
    {
      url: `${baseUrl}/neet-coaching-south-delhi/safdarjung-enclave`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/neet-coaching-south-delhi/gulmohar-park`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/neet-coaching-south-delhi/east-of-kailash`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/neet-coaching-south-delhi/alaknanda`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/neet-coaching-south-delhi/sukhdev-vihar`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/neet-coaching-south-delhi/okhla`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    // Central Delhi Coaching Hubs
    {
      url: `${baseUrl}/neet-coaching-south-delhi/rajendra-nagar`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/neet-coaching-south-delhi/karol-bagh`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/neet-coaching-south-delhi/civil-lines`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    },
    // Near School SEO Pages - HIGH INTENT
    {
      url: `${baseUrl}/neet-coaching-near`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/neet-coaching-near/dps-rk-puram`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/neet-coaching-near/dps-vasant-vihar`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/neet-coaching-near/vasant-valley-school`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/neet-coaching-near/modern-school-vasant-vihar`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/neet-coaching-near/sanskriti-school`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/neet-coaching-near/shri-ram-school`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/neet-coaching-near/springdales-pusa-road`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/neet-coaching-near/dps-east-of-kailash`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    },
    // Biology Tuition South Delhi - Hub Page
    {
      url: `${baseUrl}/biology-tuition-south-delhi`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.95,
    },
    // Biology Tuition Area Pages
    {
      url: `${baseUrl}/biology-tuition-south-delhi/hauz-khas`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/biology-tuition-south-delhi/kalu-sarai`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/biology-tuition-south-delhi/greater-kailash`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/biology-tuition-south-delhi/defence-colony`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/biology-tuition-south-delhi/vasant-vihar`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/biology-tuition-south-delhi/rk-puram`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/biology-tuition-south-delhi/sarojini-nagar`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/biology-tuition-south-delhi/lodhi-colony`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/biology-tuition-south-delhi/saket`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/biology-tuition-south-delhi/malviya-nagar`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/biology-tuition-south-delhi/green-park`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/biology-tuition-south-delhi/cr-park`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/biology-tuition-south-delhi/munirka`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/biology-tuition-south-delhi/lajpat-nagar`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/biology-tuition-south-delhi/kalkaji`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/biology-tuition-south-delhi/east-of-kailash`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    },
    // Biology Tutor SEO Pages - High Traffic Keywords
    {
      url: `${baseUrl}/biology-tutor`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.94,
    },
    {
      url: `${baseUrl}/biology-tutors-near-me`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.94,
    },
    {
      url: `${baseUrl}/biology-home-tutor`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.94,
    },
    {
      url: `${baseUrl}/biology-tutor-class-11-cbse`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.94,
    },
    {
      url: `${baseUrl}/biology-tutor-class-12-cbse`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.94,
    },
    {
      url: `${baseUrl}/biology-tutor-class-11-icse`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.94,
    },
    {
      url: `${baseUrl}/biology-tutor-class-12-icse`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.94,
    },
    {
      url: `${baseUrl}/biology-tutor-state-boards`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.94,
    },
    // Biology Teacher SEO Pages - High Traffic Keywords
    {
      url: `${baseUrl}/biology-teacher`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.94,
    },
    {
      url: `${baseUrl}/biology-teacher-near-me`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.94,
    },
    {
      url: `${baseUrl}/best-biology-teacher-for-neet`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.94,
    },
    {
      url: `${baseUrl}/best-biology-teacher-class-11-cbse`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.94,
    },
    {
      url: `${baseUrl}/best-biology-teacher-class-12-cbse`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.94,
    },
    {
      url: `${baseUrl}/best-biology-teacher-class-11-icse`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.94,
    },
    {
      url: `${baseUrl}/best-biology-teacher-class-12-icse`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.94,
    },
    // Biology Classes SEO Pages - High Traffic Keywords
    {
      url: `${baseUrl}/biology-classes`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.94,
    },
    {
      url: `${baseUrl}/biology-classes-near-me`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.94,
    },
    {
      url: `${baseUrl}/biology-coaching`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.94,
    },
    {
      url: `${baseUrl}/home-tuition-for-biology`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.94,
    },
    {
      url: `${baseUrl}/biology-tuition-class-11`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.94,
    },
    {
      url: `${baseUrl}/biology-tuition-class-12`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.94,
    },
    {
      url: `${baseUrl}/biology-neet-preparation`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.94,
    },
    {
      url: `${baseUrl}/pcb-tuition-near-me`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.94,
    },
    {
      url: `${baseUrl}/biology-tuition-near-me`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.94,
    },
    // Zoology Teacher SEO Pages
    {
      url: `${baseUrl}/zoology-teacher`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.94,
    },
    {
      url: `${baseUrl}/zoology-teacher-near-me`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.94,
    },
    {
      url: `${baseUrl}/best-zoology-teacher-for-neet`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.94,
    },
    {
      url: `${baseUrl}/zoology-classes`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.94,
    },
    // Botany Teacher SEO Pages
    {
      url: `${baseUrl}/botany-teacher`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.94,
    },
    {
      url: `${baseUrl}/botany-teacher-near-me`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.94,
    },
    {
      url: `${baseUrl}/best-botany-teacher-for-neet`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.94,
    },
    {
      url: `${baseUrl}/botany-classes`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.94,
    },
    // Online NEET Coaching SEO Pages
    {
      url: `${baseUrl}/online-neet-coaching`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.95,
    },
    {
      url: `${baseUrl}/neet-online-classes`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.95,
    },
    {
      url: `${baseUrl}/neet-online-course`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.95,
    },
    {
      url: `${baseUrl}/neet-online`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.95,
    },
    // Online Biology SEO Pages - High Traffic Keywords
    {
      url: `${baseUrl}/online-biology-classes`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.95,
    },
    {
      url: `${baseUrl}/best-biology-teacher-online`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.95,
    },
    {
      url: `${baseUrl}/best-online-biology-teacher-for-neet`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.95,
    },
    {
      url: `${baseUrl}/biology-tutor-online`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.95,
    },
    // Online Biology Tutor Pages - Phase 1 SEO Enhancement
    {
      url: `${baseUrl}/online-biology-tutor`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.95,
    },
    {
      url: `${baseUrl}/online-biology-tutor-class-9`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.93,
    },
    {
      url: `${baseUrl}/online-biology-tutor-class-10`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.93,
    },
    {
      url: `${baseUrl}/online-biology-tutor-class-11`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.94,
    },
    {
      url: `${baseUrl}/online-biology-tutor-class-12`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.94,
    },
    {
      url: `${baseUrl}/online-biology-tutor-neet`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.95,
    },
    {
      url: `${baseUrl}/online-biology-tutor-droppers`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.94,
    },
    {
      url: `${baseUrl}/neet-biology-tutor-online`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.95,
    },
    // NEET Biology Tutor Pages - Phase 1 SEO Enhancement
    {
      url: `${baseUrl}/neet-biology-tutor`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.95,
    },
    {
      url: `${baseUrl}/neet-biology-tutor-class-11`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.94,
    },
    {
      url: `${baseUrl}/neet-biology-tutor-class-12`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.94,
    },
    {
      url: `${baseUrl}/neet-biology-tutor-droppers`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.94,
    },
    // Delhi NCR Biology Tutor Locality Pages - Phase 2 SEO Enhancement
    {
      url: `${baseUrl}/biology-tutor-delhi`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.94,
    },
    {
      url: `${baseUrl}/biology-tutor-east-delhi`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.92,
    },
    {
      url: `${baseUrl}/biology-tutor-west-delhi`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.92,
    },
    {
      url: `${baseUrl}/biology-tutor-north-delhi`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.92,
    },
    {
      url: `${baseUrl}/biology-tutor-south-delhi`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.92,
    },
    {
      url: `${baseUrl}/biology-tutor-dwarka`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.91,
    },
    {
      url: `${baseUrl}/biology-tutor-rohini`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.91,
    },
    {
      url: `${baseUrl}/biology-tutor-janakpuri`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.91,
    },
    {
      url: `${baseUrl}/biology-tutor-laxmi-nagar`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.91,
    },
    {
      url: `${baseUrl}/biology-tutor-pitampura`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.91,
    },
    // Noida Biology Tutor Locality Pages - Phase 2 SEO Enhancement
    {
      url: `${baseUrl}/biology-tutor-noida`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.94,
    },
    {
      url: `${baseUrl}/biology-tutor-noida-sector-18`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.92,
    },
    {
      url: `${baseUrl}/biology-tutor-noida-sector-62`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.92,
    },
    {
      url: `${baseUrl}/biology-tutor-noida-sector-137`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.92,
    },
    {
      url: `${baseUrl}/biology-tutor-greater-noida`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.94,
    },
    // Ghaziabad Biology Tutor Locality Pages - Phase 2 SEO Enhancement
    {
      url: `${baseUrl}/biology-tutor-ghaziabad`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.94,
    },
    {
      url: `${baseUrl}/biology-tutor-indirapuram`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.93,
    },
    {
      url: `${baseUrl}/biology-tutor-vaishali`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.93,
    },
    // Faridabad & Haryana Biology Tutor Locality Pages - Phase 2 SEO Enhancement
    {
      url: `${baseUrl}/biology-tutor-faridabad`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.94,
    },
    {
      url: `${baseUrl}/biology-tutor-ballabhgarh`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.93,
    },
    {
      url: `${baseUrl}/biology-tutor-gurugram`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.94,
    },
    // Class 9 Biology SEO Pages
    {
      url: `${baseUrl}/biology-tutor-class-9-cbse`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.93,
    },
    {
      url: `${baseUrl}/biology-tutor-class-9-icse`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.93,
    },
    {
      url: `${baseUrl}/class-9-science-tuition`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.93,
    },
    // NEET Foundation SEO Pages
    {
      url: `${baseUrl}/neet-foundation-class-9`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.94,
    },
    {
      url: `${baseUrl}/neet-foundation-class-10`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.94,
    },
    {
      url: `${baseUrl}/pre-neet-coaching`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.94,
    },
    // NTSE Preparation SEO Pages
    {
      url: `${baseUrl}/ntse-biology-preparation`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.93,
    },
    {
      url: `${baseUrl}/ntse-online-classes`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.93,
    },
    // Olympiad Preparation SEO Pages
    {
      url: `${baseUrl}/biology-olympiad-coaching`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.93,
    },
    {
      url: `${baseUrl}/olympiad-preparation`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.93,
    },
    {
      url: `${baseUrl}/usabo-coaching`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.93,
    },
    {
      url: `${baseUrl}/bbo-preparation`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.93,
    },
    {
      url: `${baseUrl}/inbo-coaching`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.93,
    },
    {
      url: `${baseUrl}/ibo-preparation`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.93,
    },
    {
      url: `${baseUrl}/cbo-coaching`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.92,
    },
    {
      url: `${baseUrl}/asob-coaching`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.92,
    },
    {
      url: `${baseUrl}/sbo-coaching`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.92,
    },
    {
      url: `${baseUrl}/cnbo-coaching`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.92,
    },
    {
      url: `${baseUrl}/kbo-coaching`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.92,
    },
    {
      url: `${baseUrl}/jbo-coaching`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.92,
    },
    // NCERT Biology Books SEO Pages - High Traffic Keywords
    {
      url: `${baseUrl}/ncert-biology-class-11`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.95,
    },
    {
      url: `${baseUrl}/ncert-biology-class-12`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.95,
    },
    {
      url: `${baseUrl}/ncert-fingertips-biology`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.94,
    },
    {
      url: `${baseUrl}/trueman-biology-for-neet`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.94,
    },
    {
      url: `${baseUrl}/best-biology-books-for-neet`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.95,
    },
    // International Curriculum Biology SEO Pages
    {
      url: `${baseUrl}/igcse-biology-tutor`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.94,
    },
    {
      url: `${baseUrl}/ap-biology-tutor`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.94,
    },
    {
      url: `${baseUrl}/a-level-biology-tutor`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.94,
    },
    {
      url: `${baseUrl}/ib-biology-online-classes`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.94,
    },
    {
      url: `${baseUrl}/international-biology-tutor`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.95,
    },
    // International Country Landing Pages - Hub & Country Pages
    {
      url: `${baseUrl}/international`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/international/us`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/international/uk`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/international/ca`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/international/au`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/international/sg`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/international/ae`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/international/ie`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/international/hk`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/international/nz`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/international/za`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/biology-major-courses`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.94,
    },
    // Critical Conversion & Feature Pages
    {
      url: `${baseUrl}/demo`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.95,
    },
    {
      url: `${baseUrl}/help`,
      lastModified: lastUpdated,
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    },
    {
      url: `${baseUrl}/ai-features`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/interactive-learning`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/mobile-app`,
      lastModified: lastUpdated,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/scholarship`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/dr-shekhar-singh`,
      lastModified: lastUpdated,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/referral`,
      lastModified: lastUpdated,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/community`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/adaptive-testing`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/learning-path`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/curriculum`,
      lastModified: lastUpdated,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/offline`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/explore-courses`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    },
    // About Sub-Pages
    {
      url: `${baseUrl}/about/careers`,
      lastModified: lastUpdated,
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    },
    {
      url: `${baseUrl}/about/faculty`,
      lastModified: lastUpdated,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/about/media`,
      lastModified: lastUpdated,
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    },
    {
      url: `${baseUrl}/about/results`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    // Boards Hub and Pages
    {
      url: `${baseUrl}/boards`,
      lastModified: lastUpdated,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/boards/cbse`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/boards/icse`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/boards/ib`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/boards/igcse`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/boards/state-boards`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    },
    // Major City NEET Coaching Pages
    {
      url: `${baseUrl}/neet-coaching-bangalore`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.95,
    },
    {
      url: `${baseUrl}/neet-coaching-chennai`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.95,
    },
    {
      url: `${baseUrl}/neet-coaching-mumbai`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.95,
    },
    {
      url: `${baseUrl}/neet-coaching-pune`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.95,
    },
    {
      url: `${baseUrl}/neet-coaching-hyderabad`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.95,
    },
    // Metro & Coaching Hub City Pages - NEW EXPANSION
    {
      url: `${baseUrl}/neet-coaching-kota`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.96, // India's coaching capital - highest priority
    },
    {
      url: `${baseUrl}/neet-coaching-kolkata`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.95, // 15M population metro
    },
    {
      url: `${baseUrl}/neet-coaching-ahmedabad`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.95, // 8M population metro
    },
    {
      url: `${baseUrl}/neet-coaching-patna`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.93, // Major coaching hub with high aspirant density
    },
    {
      url: `${baseUrl}/neet-coaching-lucknow`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.93, // UP capital, major coaching center
    },
    {
      url: `${baseUrl}/neet-coaching-jaipur`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.93, // Rajasthan capital, Kota alternative
    },
    {
      url: `${baseUrl}/best-neet-coaching-delhi-ncr`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.96,
    },
    {
      url: `${baseUrl}/neet-coaching-gurgaon`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.95,
    },
    // Delhi Area NEET Coaching Pages
    {
      url: `${baseUrl}/neet-coaching-north-delhi`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/neet-coaching-east-delhi`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/neet-coaching-west-delhi`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/neet-coaching-gtb-nagar`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/neet-coaching-kalu-sarai`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/neet-coaching-mukherjee-nagar`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/neet-coaching-rajinder-nagar`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/neet-coaching-janakpuri`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/neet-coaching-lajpat-nagar`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    },
    // NEET Content Hub Pages
    {
      url: `${baseUrl}/neet-biology`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/neet-2025-preparation`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.95,
    },
    {
      url: `${baseUrl}/ncert-biology-solutions`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/second-chance-neet`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/biology-notes`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/biology-coaching-near-me`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    // NEET Biology Coaching Hub Page - CRITICAL
    {
      url: `${baseUrl}/neet-biology-coaching`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.95,
    },
    // Course Sub-Pages
    {
      url: `${baseUrl}/courses/class-9-foundation`,
      lastModified: lastUpdated,
      changeFrequency: 'monthly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/courses/class-10-foundation`,
      lastModified: lastUpdated,
      changeFrequency: 'monthly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/courses/class-11`,
      lastModified: lastUpdated,
      changeFrequency: 'monthly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/courses/class-12`,
      lastModified: lastUpdated,
      changeFrequency: 'monthly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/courses/dropper`,
      lastModified: lastUpdated,
      changeFrequency: 'monthly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/courses/foundation`,
      lastModified: lastUpdated,
      changeFrequency: 'monthly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/courses/intensive-neet-biology`,
      lastModified: lastUpdated,
      changeFrequency: 'monthly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/courses/neet-complete`,
      lastModified: lastUpdated,
      changeFrequency: 'monthly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/courses/neet-dropper`,
      lastModified: lastUpdated,
      changeFrequency: 'monthly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/courses/neet-crash-course`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/courses/compare`,
      lastModified: lastUpdated,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/courses/finder`,
      lastModified: lastUpdated,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    // Board-Specific Course Pages
    {
      url: `${baseUrl}/courses/class-9-10-biology-foundation`,
      lastModified: lastUpdated,
      changeFrequency: 'monthly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/courses/cbse-biology-class-11-12`,
      lastModified: lastUpdated,
      changeFrequency: 'monthly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/courses/icse-isc-biology`,
      lastModified: lastUpdated,
      changeFrequency: 'monthly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/courses/ib-igcse-biology`,
      lastModified: lastUpdated,
      changeFrequency: 'monthly' as const,
      priority: 0.9,
    },
    // International & Competitive Exam Courses
    {
      url: `${baseUrl}/courses/ap-biology`,
      lastModified: lastUpdated,
      changeFrequency: 'monthly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/courses/ntse-biology`,
      lastModified: lastUpdated,
      changeFrequency: 'monthly' as const,
      priority: 0.85,
    },
    // Company Pages
    {
      url: `${baseUrl}/company/careers`,
      lastModified: lastUpdated,
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    },
    {
      url: `${baseUrl}/company/results`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    // Services Sub-Pages
    {
      url: `${baseUrl}/services/classroom`,
      lastModified: lastUpdated,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/services/doubt-resolution`,
      lastModified: lastUpdated,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/services/international`,
      lastModified: lastUpdated,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/services/online-classes`,
      lastModified: lastUpdated,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    // Support Pages
    {
      url: `${baseUrl}/support/admission`,
      lastModified: lastUpdated,
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    },
    {
      url: `${baseUrl}/support/brochure`,
      lastModified: lastUpdated,
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    },
    {
      url: `${baseUrl}/support/demo`,
      lastModified: lastUpdated,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/support/fees`,
      lastModified: lastUpdated,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    // Test Platform
    {
      url: `${baseUrl}/tests`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    // Thank You Page
    {
      url: `${baseUrl}/thank-you`,
      lastModified: lastUpdated,
      changeFrequency: 'yearly' as const,
      priority: 0.3,
    },
    // ========================================
    // Additional SEO Pages (326 missing pages)
    // ========================================
    // 1-on-1 & Premium Coaching
    {
      url: `${baseUrl}/1-on-1-biology-tuition-neet`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/a-level-biology-tuition`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/affordable-neet-coaching-delhi`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    // NEET Notes Pages
    {
      url: `${baseUrl}/anatomy-flowering-plants-notes-neet`,
      lastModified: lastUpdated,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/animal-kingdom-class-11`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/animal-kingdom-notes-neet`,
      lastModified: lastUpdated,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/animal-tissues-class-9`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/ap-biology-online-tutor`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    },
    // Best Biology Teacher/Tuition Pages
    {
      url: `${baseUrl}/best-biology-teacher-neet`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/best-biology-tuition-cr-park`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/best-biology-tuition-greater-kailash`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/best-biology-tuition-hauz-khas`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/best-biology-tuition-kalkaji`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/best-biology-tuition-lajpat-nagar`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/best-biology-tuition-malviya-nagar`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/best-biology-tuition-rk-puram`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/best-biology-tuition-vasant-vihar`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/best-biology-tutor-class-11`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/best-biology-tutor-class-12`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/best-coaching-neet-droppers`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/best-neet-biology-coaching-india`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/best-neet-biology-tutor-delhi-ncr`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/best-online-biology-tutor-india`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    },
    // Class & Topic Pages
    {
      url: `${baseUrl}/biodiversity-conservation-class-12`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/biodiversity-notes-neet`,
      lastModified: lastUpdated,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/biological-classification-notes-neet`,
      lastModified: lastUpdated,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/biology-12th-boards-gurgaon`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/biology-class-11-gurgaon`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/biology-class-12-gurgaon`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/biology-class-9-10-gurgaon`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    // Biology Classes Location Pages
    {
      url: `${baseUrl}/biology-classes-alaknanda`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/biology-classes-amity-gurgaon`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/biology-classes-ashok-vihar`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/biology-classes-bal-bharati-students`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/biology-classes-blue-bells-gurgaon`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/biology-classes-cr-park`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/biology-classes-crossings-republik`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/biology-classes-cyber-city-gurgaon`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/biology-classes-dav-gurgaon`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/biology-classes-defence-colony`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/biology-classes-delhi`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/biology-classes-dlf-gurgaon`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/biology-classes-dps-gurgaon`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/biology-classes-dwarka`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/biology-classes-east-of-kailash`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/biology-classes-euro-international-gurgaon`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/biology-classes-faridabad`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/biology-classes-gd-goenka-gurgaon`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/biology-classes-ghaziabad`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/biology-classes-golf-course-road-gurgaon`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/biology-classes-golf-links`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/biology-classes-greater-kailash`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/biology-classes-green-park`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/biology-classes-gulmohar-park`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/biology-classes-gurgaon`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/biology-classes-gurgaon-sector-49`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/biology-classes-gurgaon-sector-51`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/biology-classes-gurgaon-sector-55`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/biology-classes-gurgaon-sector-56`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/biology-classes-gurgaon-sector-57`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/biology-classes-gurgaon-sector-60`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/biology-classes-gurgaon-sector-73`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/biology-classes-hauz-khas`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/biology-classes-heritage-school-gurgaon`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/biology-classes-indirapuram`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/biology-classes-jor-bagh`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/biology-classes-kalkaji`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/biology-classes-karol-bagh`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/biology-classes-lajpat-nagar`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/biology-classes-laxmi-nagar`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/biology-classes-lodhi-colony`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/biology-classes-lotus-valley-gurgaon`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/biology-classes-mahendragarh`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/biology-classes-malviya-nagar`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/biology-classes-manav-rachna-gurgaon`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/biology-classes-manesar`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/biology-classes-mayur-vihar`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/biology-classes-mg-road-gurgaon`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/biology-classes-model-town`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/biology-classes-moti-bagh`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/biology-classes-munirka`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/biology-classes-nehru-place`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/biology-classes-new-gurgaon`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/biology-classes-nirvana-country-gurgaon`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/biology-classes-noida`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/biology-classes-noida-sector-137`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/biology-classes-palam-vihar-gurgaon`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/biology-classes-panchsheel-park`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/biology-classes-patel-nagar`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/biology-classes-pathways-world-school`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/biology-classes-pitampura`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/biology-classes-preet-vihar`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/biology-classes-punjabi-bagh`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/biology-classes-rewari`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/biology-classes-rk-puram`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/biology-classes-rohini`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/biology-classes-rohini-sector-11`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/biology-classes-rohini-sector-13`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/biology-classes-rohini-sector-16`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/biology-classes-rohini-sector-24`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/biology-classes-rps-gurgaon`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/biology-classes-ryan-gurgaon`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/biology-classes-safdarjung-enclave`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/biology-classes-saket`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/biology-classes-sanskriti-school`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/biology-classes-sarojini-nagar`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/biology-classes-scottish-high-gurgaon`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/biology-classes-shalimar-bagh`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/biology-classes-shikshanter-gurgaon`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/biology-classes-shri-ram-school-gurgaon`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/biology-classes-sohna-road-gurgaon`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/biology-classes-south-city-gurgaon`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/biology-classes-south-delhi`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/biology-classes-suncity-school-gurgaon`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/biology-classes-tilak-nagar`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/biology-classes-uttam-nagar`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/biology-classes-vasant-kunj`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/biology-classes-vasant-vihar`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    },
    // Biology Coaching School-Specific Pages
    {
      url: `${baseUrl}/biology-coaching-cbse-students`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/biology-coaching-dps-rk-puram`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/biology-coaching-dps-vasant-kunj`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/biology-coaching-modern-school`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/biology-coaching-mothers-international-school`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/biology-coaching-sanskriti-school`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/biology-coaching-sardar-patel-vidyalaya`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/biology-coaching-springdales-school`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/biology-coaching-vasant-valley-school`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    // Biology Tuition & Tutor Pages
    {
      url: `${baseUrl}/biology-home-tuition-gurgaon`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/biology-olympiad-preparation`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/biology-tuition`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/biology-tuition-gurgaon`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/biology-tuition-rohini-west`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/biology-tuition-ryan-international`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/biology-tutor-central-delhi`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/biology-tutor-gurgaon`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/biology-tutor-noida-extension`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/biology-tutor-saket`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/biology-tutor-vasant-kunj`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    },
    // Topic-Specific Notes & Class Pages
    {
      url: `${baseUrl}/biomolecules-class-11`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/biomolecules-notes-neet`,
      lastModified: lastUpdated,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/biotechnology-notes-neet`,
      lastModified: lastUpdated,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/board-neet-biology-class-12`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/botany-zoology-tuition`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/campbell-biology`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/cell-biology-notes-neet`,
      lastModified: lastUpdated,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/cell-biology-tuition`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    },
    // Online Class Pages
    {
      url: `${baseUrl}/class-10-biology-tuition-online`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/class-10-board-neet-coaching`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/class-11-biology-tuition-online`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/class-11-neet-preparation-online`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/class-12-biology-tuition-online`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/class-9-biology-tuition-online`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/class-9-science-tuition-neet`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/dna-biology-tuition`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/ecology-biology-tuition`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/ecology-notes-neet`,
      lastModified: lastUpdated,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/evolution-class-12`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/evolution-notes-neet`,
      lastModified: lastUpdated,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/faq`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    // International/Board Specific Pages
    {
      url: `${baseUrl}/gcse-biology-tuition`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/gcse-biology-tutor-online`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/genetics-biology-tuition`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/genetics-notes-neet`,
      lastModified: lastUpdated,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/how-to-score-360-neet-biology`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/how-to-prepare-for-neet-in-gurugram`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/how-to-prepare-for-neet-online`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/human-physiology-notes-neet`,
      lastModified: lastUpdated,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/human-physiology-tuition`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/ib-biology-tuition`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/ib-biology-tutor`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/ib-biology-tutor-online`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/igcse-biology-tuition`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/is-coaching-necessary-for-neet`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/live-biology-classes-neet`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/living-world-ncert`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/mcat-biology-preparation`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/molecular-biology-tuition`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/morphology-flowering-plants-notes-neet`,
      lastModified: lastUpdated,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    // NCERT Pages
    {
      url: `${baseUrl}/ncert-based-neet-questions`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/ncert-biology-class-11-tuition`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/ncert-biology-notes-class-11`,
      lastModified: lastUpdated,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/ncert-biology-notes-class-12`,
      lastModified: lastUpdated,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/ncert-exemplar-biology`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/ncert-punch-biology`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    // NEET Coaching & Course Pages
    {
      url: `${baseUrl}/neet-2025-biology-coaching`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/neet-application-form-2026`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/neet-biology-1-year-course`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/neet-biology-45-day-course`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/neet-biology-6-month-course`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/neet-biology-90-day-course`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/neet-biology-chapter-weightage`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/neet-biology-coaching-class-11`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/neet-biology-coaching-class-12`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/neet-biology-crash-course`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/neet-biology-diagrams`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/neet-biology-formulas`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/neet-biology-important-questions`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/neet-biology-mcq-practice`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/neet-biology-notes-pdf`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/neet-biology-online-coaching`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/neet-biology-pyq-chapter-wise`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/neet-biology-revision-notes`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/neet-biology-syllabus-2025`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/neet-biology-tutor-for-droppers`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/neet-biology-weekend-batch`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/neet-botany-syllabus`,
      lastModified: lastUpdated,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    // NEET Coaching Location Pages
    {
      url: `${baseUrl}/neet-coaching-amity-gurgaon-students`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/neet-coaching-bal-bharati-rohini-students`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/neet-coaching-cr-park`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/neet-coaching-dc-chowk-rohini`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/neet-coaching-dlf-gurgaon`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/neet-coaching-dps-gurgaon-students`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/neet-coaching-dps-rk-puram-students`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/neet-coaching-dps-rohini-students`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/neet-coaching-dps-vasant-kunj-students`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/neet-coaching-fees-comparison`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/neet-coaching-golf-course-road-gurgaon`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/neet-coaching-greater-kailash`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/neet-coaching-gurgaon-sector-43`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/neet-coaching-gurgaon-sector-45`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/neet-coaching-gurgaon-sector-49`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/neet-coaching-gurgaon-sector-51`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/neet-coaching-gurgaon-sector-56`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/neet-coaching-gurgaon-sector-61`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/neet-coaching-gurgaon-sector-82`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/neet-coaching-hauz-khas`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/neet-coaching-kalkaji`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/neet-coaching-kaushambi`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/neet-coaching-malviya-nagar`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/neet-coaching-modern-school-students`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/neet-coaching-nirman-vihar`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/neet-coaching-nirvana-country-gurgaon`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/neet-coaching-noida-sector-62`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/neet-coaching-paschim-vihar`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/neet-coaching-pathways-school`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/neet-coaching-pitampura`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/neet-coaching-model-town`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/neet-coaching-punjabi-bagh`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/neet-coaching-ashok-vihar`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/neet-coaching-prashant-vihar`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/neet-crash-course-rohini-2026`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/12th-board-biology-coaching-rohini`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/class-9-biology-tuition-rohini`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/class-10-biology-tuition-rohini`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/neet-foundation-class-9-rohini`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/neet-coaching-presidium-school`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/neet-coaching-rajouri-garden`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/neet-coaching-rk-puram`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/neet-coaching-rohini-sector-14`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/neet-coaching-rohini-sector-15`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/neet-coaching-rohini-sector-22`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/neet-coaching-rohini-sector-3`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/neet-coaching-rohini-sector-5`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/neet-coaching-rohini-sector-7`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/neet-coaching-rohini-sector-8`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/neet-coaching-sanskriti-school-students`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/neet-coaching-shri-ram-school-students`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/neet-coaching-sohna-road-gurgaon`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/neet-coaching-south-city-gurgaon`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/neet-coaching-success-rate-comparison`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/neet-coaching-udyog-vihar-gurgaon`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/neet-coaching-vaishali-ghaziabad`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/neet-coaching-vasant-vihar`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/neet-coaching-vasundhara-ghaziabad`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/neet-coaching-venkateshwar-rohini-students`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/neet-coaching-with-hostel-delhi`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/neet-coaching-with-school`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/neet-coaching-working-students`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    // NEET Info & Guide Pages
    {
      url: `${baseUrl}/neet-counselling-guide`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/neet-crash-course`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/neet-dropper-batch-online`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/neet-dropper-biology-coaching`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/neet-dropper-crash-course-2025`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/neet-droppers-batch-gurgaon`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/neet-eligibility-2026`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/neet-eligibility-criteria`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/neet-exam-countdown`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/neet-exam-date-2026`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/neet-exam-details`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/neet-exam-pattern-2025`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/neet-guidance-seminar`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/neet-mock-test-free`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/neet-official-resources`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/neet-preparation-guide`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/neet-readiness-quiz`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/neet-registration-guide`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/neet-repeater-course-2025`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/neet-repeaters-2026`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/neet-result-2026`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/neet-result-analysis`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/neet-study-plan-generator`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/neet-syllabus-2025`,
      lastModified: lastUpdated,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/neet-syllabus-2026`,
      lastModified: lastUpdated,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/neet-tools`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/neet-zoology-syllabus`,
      lastModified: lastUpdated,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/nri-students`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    // NRI Country-Specific Pages
    {
      url: `${baseUrl}/nri-students/uae`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/nri-students/saudi-arabia`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/nri-students/kuwait`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/nri-students/qatar`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/nri-students/oman`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/nri-students/bahrain`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/nri-students/singapore`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/nri-students/malaysia`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/nri-students/nepal`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/nri-students/nigeria`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/nri-students/kenya`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/nri-students/thailand`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/nri-students/indonesia`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/nri-students/tanzania`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    },
    // New NRI Country Pages (Western & Additional Countries)
    {
      url: `${baseUrl}/nri-students/sri-lanka`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/nri-students/mauritius`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/nri-students/philippines`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/nri-students/hong-kong`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/nri-students/vietnam`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/nri-students/usa`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/nri-students/uk`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/nri-students/canada`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/nri-students/australia`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    },
    // West Delhi Location Pages (Critical Gap Coverage)
    {
      url: `${baseUrl}/neet-coaching-dwarka-delhi`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/neet-coaching-dwarka-sector-6`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/neet-coaching-dwarka-sector-7`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/neet-coaching-dwarka-sector-10`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/neet-coaching-dwarka-sector-12`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/neet-coaching-dwarka-sector-19`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/neet-coaching-dwarka-sector-22`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/neet-coaching-uttam-nagar`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/neet-coaching-vikaspuri`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/neet-coaching-paschim-vihar`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/neet-coaching-tilak-nagar`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    },
    // Ghaziabad Expansion Pages
    {
      url: `${baseUrl}/neet-coaching-raj-nagar-extension`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/neet-coaching-crossings-republik`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/neet-coaching-kaushambi`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/neet-coaching-mohan-nagar`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/neet-coaching-wave-city`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/neet-coaching-indirapuram`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    // Noida Expansion Pages
    {
      url: `${baseUrl}/neet-coaching-noida-sector-15`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/neet-coaching-noida-sector-50`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/neet-coaching-noida-sector-76`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/neet-coaching-gaur-city-noida`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/neet-coaching-ats-pristine-noida`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/neet-coaching-jaypee-greens-noida`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/online-neet-classes-noida`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/neet-coaching-fee-noida`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    // Noida Class 11/12, Tuition, Board, CBSE Pages
    {
      url: `${baseUrl}/biology-class-11-noida`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/biology-class-12-noida`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/class-12-board-biology-noida`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/biology-tuition-noida`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/best-biology-tutor-noida`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/home-biology-tutor-noida`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/cbse-biology-coaching-noida`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    },
    // Noida P1 Pages - Tuition variants, NCERT, Teacher near me
    {
      url: `${baseUrl}/online-biology-tuition-noida`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/biology-tuition-class-11-noida`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/biology-tuition-class-12-noida`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/ncert-biology-coaching-noida`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/biology-teacher-near-me-noida`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    },
    // East Delhi Expansion Pages
    {
      url: `${baseUrl}/neet-coaching-mayur-vihar`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/neet-coaching-preet-vihar`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/neet-coaching-laxmi-nagar`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/neet-coaching-shahdara`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    },
    // Premium Coaching Pages
    {
      url: `${baseUrl}/one-to-one-biology-coaching`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/one-year-neet-dropper-course`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    // Online Biology Classes
    {
      url: `${baseUrl}/online-biology-classes-cbse`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/online-biology-classes-class-10`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/online-biology-classes-class-11`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/online-biology-classes-class-12`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/online-biology-classes-class-9`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/online-biology-classes-icse`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/online-biology-classes-international`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/online-biology-classes-nri`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/online-biology-tuition-india`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/online-vs-offline-neet-coaching`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    // Plant & Topic Pages
    {
      url: `${baseUrl}/plant-kingdom-class-11`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/plant-kingdom-notes-neet`,
      lastModified: lastUpdated,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/plant-physiology-class-11`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/plant-physiology-notes-neet`,
      lastModified: lastUpdated,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/quick-enroll`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/reproduction-notes-neet`,
      lastModified: lastUpdated,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/should-i-join-neet-coaching`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/structural-organisation-animals-notes-neet`,
      lastModified: lastUpdated,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/teacher`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/timetable`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/why-choose-cerebrum-academy`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    // Premium Metro Area Pages - HIGH PRIORITY (₹24,000+ Fee Demographics)
    // Mumbai Premium Areas
    {
      url: `${baseUrl}/neet-coaching-bandra-mumbai`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.94, // Ultra-premium international school area
    },
    {
      url: `${baseUrl}/neet-coaching-powai-mumbai`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.93, // IT/Tech hub with Hiranandani
    },
    {
      url: `${baseUrl}/neet-coaching-andheri-mumbai`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.93, // Commercial hub, large population
    },
    {
      url: `${baseUrl}/neet-coaching-south-mumbai`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.94, // SoBo ultra-premium - Colaba, Malabar Hill
    },
    // Hyderabad Premium Areas
    {
      url: `${baseUrl}/neet-coaching-jubilee-hills-hyderabad`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.93, // Premium residential & school hub
    },
    {
      url: `${baseUrl}/neet-coaching-gachibowli-hyderabad`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.93, // IT Financial District
    },
    {
      url: `${baseUrl}/neet-coaching-hitech-city-hyderabad`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.93, // IT corridor - Madhapur, Kukatpally
    },
    // Bangalore Premium Areas
    {
      url: `${baseUrl}/neet-coaching-koramangala-bangalore`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.93, // Startup hub, premium schools
    },
    {
      url: `${baseUrl}/neet-coaching-indiranagar-bangalore`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.93, // East Bangalore premium
    },
    {
      url: `${baseUrl}/neet-coaching-hsr-layout-bangalore`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.92, // South Bangalore IT hub
    },
    // Chennai Premium Areas
    {
      url: `${baseUrl}/neet-coaching-adyar-chennai`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.93, // Educational hub - IIT Madras adjacent
    },
    {
      url: `${baseUrl}/neet-coaching-anna-nagar-chennai`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.93, // North Chennai premium
    },
    {
      url: `${baseUrl}/neet-coaching-omr-chennai`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.92, // IT corridor
    },
    // Pune Premium Areas
    {
      url: `${baseUrl}/neet-coaching-koregaon-park-pune`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.92, // East Pune premium - international schools
    },
    {
      url: `${baseUrl}/neet-coaching-baner-pune`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.92, // West Pune IT corridor
    },
    {
      url: `${baseUrl}/neet-coaching-viman-nagar-pune`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.92, // IT corridor - international schools
    },
    // Additional Metro Premium Areas
    {
      url: `${baseUrl}/neet-coaching-whitefield-bangalore`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.93, // IT hub - ITPL, international schools
    },
    {
      url: `${baseUrl}/neet-coaching-thane-mumbai`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.93, // Mumbai suburban premium - Hiranandani
    },
    {
      url: `${baseUrl}/neet-coaching-secunderabad-hyderabad`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.92, // Twin city - Begumpet, defence area
    },
    {
      url: `${baseUrl}/neet-coaching-t-nagar-chennai`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.93, // Central Chennai premium - PSBB hub
    },
    // State Board Pages - English Medium NEET Preparation
    {
      url: `${baseUrl}/maharashtra-hsc-biology-tuition`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.93, // High population state
    },
    {
      url: `${baseUrl}/karnataka-puc-biology-coaching`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.93, // IT hub state
    },
    {
      url: `${baseUrl}/tamil-nadu-biology-tuition`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.93, // Strong NEET aspirant base
    },
    {
      url: `${baseUrl}/telangana-inter-biology-coaching`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.93, // Hyderabad hub
    },
    {
      url: `${baseUrl}/kerala-biology-tuition-coaching`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.93, // Best NCERT alignment
    },
    // Tier-2 City Pages - Emerging Markets
    {
      url: `${baseUrl}/neet-coaching-chandigarh`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.92, // Union Territory - high income
    },
    // ===== CHANDIGARH TRICITY & PUNJAB EXPANSION (Jan 2026) =====
    {
      url: `${baseUrl}/neet-coaching-chandigarh-sector-34`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.93, // Main coaching hub of Chandigarh
    },
    {
      url: `${baseUrl}/neet-coaching-punjab`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.92, // Punjab state hub page
    },
    {
      url: `${baseUrl}/neet-coaching-mohali-punjab`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.91, // IT City, near Chandigarh
    },
    {
      url: `${baseUrl}/neet-coaching-panchkula-haryana`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.91, // Haryana extension of Tricity
    },
    {
      url: `${baseUrl}/neet-coaching-ludhiana-punjab`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.91, // Largest Punjab city
    },
    {
      url: `${baseUrl}/neet-coaching-jalandhar-punjab`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.90, // Punjab education hub
    },
    {
      url: `${baseUrl}/neet-coaching-amritsar-punjab`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.90, // Holy city, GMC Amritsar
    },
    {
      url: `${baseUrl}/neet-coaching-zirakpur-punjab`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.89, // Growing Chandigarh suburb
    },
    {
      url: `${baseUrl}/cerebrum-vs-allen-chandigarh`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.88, // Comparison page - Allen
    },
    {
      url: `${baseUrl}/cerebrum-vs-aakash-chandigarh`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.88, // Comparison page - Aakash
    },
    // ===== CHANDIGARH TRICITY EXPANSION PHASE 2 (Jan 2026) =====
    {
      url: `${baseUrl}/neet-coaching-mohali`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.92, // Mohali dedicated page - IT City, Phases
    },
    {
      url: `${baseUrl}/neet-coaching-panchkula`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.91, // Panchkula dedicated page - Haryana
    },
    {
      url: `${baseUrl}/neet-coaching-zirakpur`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.90, // Zirakpur dedicated page - VIP Road
    },
    {
      url: `${baseUrl}/neet-coaching-chandigarh-sector-17`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.89, // Sector 17 - City Center
    },
    {
      url: `${baseUrl}/neet-coaching-chandigarh-sector-22`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.88, // Sector 22 - Commercial Hub
    },
    {
      url: `${baseUrl}/neet-coaching-manimajra`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.87, // Manimajra - Growing area
    },
    {
      url: `${baseUrl}/neet-coaching-kharar`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.87, // Kharar - Untapped market near Mohali
    },
    // ===== PUNJAB-HARYANA REGIONAL EXPANSION PHASE 3 (Jan 2026) =====
    {
      url: `${baseUrl}/neet-coaching-ambala`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.91, // Ambala - Haryana gateway, Cantonment area
    },
    {
      url: `${baseUrl}/neet-coaching-ludhiana`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.93, // Ludhiana - Punjab largest city, industrial hub
    },
    {
      url: `${baseUrl}/neet-coaching-jalandhar`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.91, // Jalandhar - Doaba region education center
    },
    {
      url: `${baseUrl}/neet-coaching-patiala`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.90, // Patiala - Royal city, GMC Patiala hometown
    },
    {
      url: `${baseUrl}/neet-coaching-karnal`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.90, // Karnal - KCGMC hometown, Haryana education hub
    },
    // ===== HIMACHAL PRADESH EXPANSION (Jan 2026) =====
    {
      url: `${baseUrl}/neet-coaching-shimla`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.91, // Shimla - HP capital, IGMC Shimla, hill station
    },
    {
      url: `${baseUrl}/neet-coaching-dharamshala`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.90, // Dharamshala - Kangra district, RPGMC Tanda nearby, tourist hub
    },
    {
      url: `${baseUrl}/neet-coaching-mandi`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.90, // Mandi - SLBSGMC Nerchowk in district, Sadar region
    },
    {
      url: `${baseUrl}/neet-coaching-hamirpur`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.90, // Hamirpur - HP education hub, 59+ coaching institutes, AIIMS Bilaspur nearby
    },
    {
      url: `${baseUrl}/neet-coaching-solan`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.90, // Solan - MMMC 150 seats, gateway to HP, near Chandigarh
    },
    // ===== MAHARASHTRA EXPANSION (Jan 2026) =====
    {
      url: `${baseUrl}/neet-coaching-mumbai`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.92, // Mumbai - Financial capital, Seth GS/KEM, Grant Medical, 5125 MH MBBS seats
    },
    {
      url: `${baseUrl}/neet-coaching-bhopal`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.91, // MP capital - AIIMS Bhopal
    },
    {
      url: `${baseUrl}/neet-coaching-indore`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.91, // MP coaching hub
    },
    {
      url: `${baseUrl}/biology-tuition-surat`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.91, // Gujarat diamond city
    },
    {
      url: `${baseUrl}/biology-coaching-nagpur`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.91, // AIIMS Nagpur - Central India
    },
    // Rohini Area SEO Pages - Gated Societies & Premium Localities (Jan 2026)
    {
      url: `${baseUrl}/neet-coaching-saraswati-vihar`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.94, // Largest colony in Pitampura
    },
    {
      url: `${baseUrl}/neet-coaching-pushpanjali-enclave`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.93, // Co-op Housing Society Pitampura
    },
    {
      url: `${baseUrl}/neet-coaching-meera-bagh`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.94, // Ultra-premium Paschim Vihar
    },
    {
      url: `${baseUrl}/neet-coaching-civil-lines-delhi`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.95, // Ultra-premium Delhi
    },
    {
      url: `${baseUrl}/neet-coaching-vikas-puri`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.92, // West Delhi hub
    },
    {
      url: `${baseUrl}/neet-coaching-tagore-garden`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.92, // West Delhi
    },
    {
      url: `${baseUrl}/neet-coaching-dwarka-sector-10`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.91, // Dwarka premium sector
    },
    {
      url: `${baseUrl}/neet-coaching-wazirpur`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.92, // Near Rohini
    },
    {
      url: `${baseUrl}/neet-coaching-netaji-subhash-place`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.92, // NSP Metro area
    },
    // School-Specific SEO Pages - Rohini Area (Jan 2026)
    {
      url: `${baseUrl}/neet-coaching-mount-abu-school-students`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.93, // Top Rohini school
    },
    {
      url: `${baseUrl}/neet-coaching-gd-goenka-rohini-students`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.93, // #1 Elite School North Zone
    },
    {
      url: `${baseUrl}/neet-coaching-heritage-school-rohini-students`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.92, // Premium school
    },
    // Comparison Pages - AEO/GEO Optimized (Jan 2026)
    {
      url: `${baseUrl}/cerebrum-vs-allen-neet-coaching`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.90, // High-intent comparison
    },
    {
      url: `${baseUrl}/cerebrum-vs-aakash-neet-coaching`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.90, // High-intent comparison
    },
    // MCQ Chapter Pages (Jan 2026 - Week 1 Priority)
    {
      url: `${baseUrl}/neet-biology-mcq/cell-unit-of-life`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.92,
    },
    {
      url: `${baseUrl}/neet-biology-mcq/biomolecules`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.92,
    },
    {
      url: `${baseUrl}/neet-biology-mcq/principles-inheritance`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.92,
    },
    {
      url: `${baseUrl}/neet-biology-mcq/molecular-inheritance`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.92,
    },
    {
      url: `${baseUrl}/neet-biology-mcq/plant-kingdom`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.92,
    },
    {
      url: `${baseUrl}/neet-biology-mcq/animal-kingdom`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.92,
    },
    {
      url: `${baseUrl}/neet-biology-mcq/biological-classification`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.92,
    },
    {
      url: `${baseUrl}/neet-biology-mcq/human-health-disease`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.92,
    },
    {
      url: `${baseUrl}/neet-biology-mcq/biotechnology-principles`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.92,
    },
    {
      url: `${baseUrl}/neet-biology-mcq/human-reproduction`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.92,
    },
    // NEET Score Calculator Tool
    {
      url: `${baseUrl}/neet-score-calculator`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.95,
    },
    // Dwarka Coaching Hub + Sector Pages
    {
      url: `${baseUrl}/neet-coaching-dwarka`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.94,
    },
    {
      url: `${baseUrl}/neet-coaching-dwarka-sector-4`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.91,
    },
    {
      url: `${baseUrl}/neet-coaching-dwarka-sector-6`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.91,
    },
    {
      url: `${baseUrl}/neet-coaching-dwarka-sector-12`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.91,
    },
    {
      url: `${baseUrl}/neet-coaching-dwarka-sector-21`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.91,
    },
    {
      url: `${baseUrl}/neet-coaching-dwarka-sector-22`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.91,
    },
    // University Area Page
    {
      url: `${baseUrl}/neet-coaching-du-north-campus`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.93,
    },
    // Metro Station Pages
    {
      url: `${baseUrl}/neet-coaching-rajiv-chowk-metro`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.90,
    },
    {
      url: `${baseUrl}/neet-coaching-hauz-khas-metro`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.90,
    },
    {
      url: `${baseUrl}/neet-coaching-kashmere-gate-metro`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.90,
    },
    {
      url: `${baseUrl}/neet-coaching-botanical-garden-metro`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.90,
    },
    {
      url: `${baseUrl}/neet-coaching-huda-city-centre-metro`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.90,
    },
  ]

  return routes
}
