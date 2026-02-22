import Link from 'next/link'
import { ExternalLink, MapPin } from 'lucide-react'

interface InternalLinkingWidgetProps {
  currentPage: string // slug of current page
  category: 'location' | 'course' | 'blog' | 'resource'
  maxLinks?: number // default 12 (increased from 8 for better link equity)
}

/**
 * InternalLinkingWidget v2 — Delhi NCR Dominance Edition
 *
 * Key changes:
 * - Delhi NCR locations weighted at 60%+ of displayed links
 * - Increased from 8 to 12 default links for better PageRank distribution
 * - Hub pages (district-level) always included for link hierarchy
 * - "Near me" anchor text variations for SEO
 * - International pages moved to separate optional section
 */

// TIER 1: Hub pages — ALWAYS included (these concentrate authority)
const DELHI_NCR_HUBS = [
  { title: 'Best NEET Coaching Delhi NCR 2026', slug: '/best-neet-biology-coaching-delhi-ncr', priority: 10 },
  { title: 'NEET Coaching South Delhi', slug: '/neet-coaching-south-delhi', priority: 9 },
  { title: 'NEET Coaching North Delhi', slug: '/neet-coaching-north-delhi', priority: 9 },
  { title: 'NEET Coaching East Delhi', slug: '/neet-coaching-east-delhi', priority: 9 },
  { title: 'NEET Coaching West Delhi', slug: '/neet-coaching-west-delhi', priority: 9 },
  { title: 'NEET Coaching Gurugram', slug: '/neet-coaching-gurgaon', priority: 9 },
  { title: 'NEET Coaching Noida', slug: '/neet-coaching-noida', priority: 9 },
  { title: 'NEET Coaching Faridabad', slug: '/neet-coaching-faridabad', priority: 8 },
  { title: 'NEET Coaching Ghaziabad', slug: '/neet-coaching-ghaziabad', priority: 8 },
]

// TIER 2: Sub-locality pages with "near me" anchor text
const DELHI_NCR_LOCALITIES = [
  { title: 'NEET Coaching near South Extension', slug: '/neet-coaching-south-extension', priority: 7 },
  { title: 'Biology Coaching near Greater Kailash', slug: '/biology-coaching-greater-kailash', priority: 7 },
  { title: 'NEET Coaching near Dwarka', slug: '/biology-coaching-dwarka', priority: 7 },
  { title: 'Biology Classes near Rohini', slug: '/biology-classes-rohini', priority: 7 },
  { title: 'NEET Coaching near Saket', slug: '/neet-coaching-saket', priority: 6 },
  { title: 'Biology Coaching near Hauz Khas', slug: '/biology-coaching-hauz-khas', priority: 6 },
  { title: 'NEET Coaching near Vasant Kunj', slug: '/biology-coaching-vasant-kunj', priority: 6 },
  { title: 'Biology Classes near Lajpat Nagar', slug: '/biology-coaching-lajpat-nagar', priority: 6 },
  { title: 'NEET Coaching near Defence Colony', slug: '/biology-coaching-defence-colony', priority: 6 },
  { title: 'Biology Coaching near Pitampura', slug: '/biology-coaching-pitampura', priority: 6 },
  { title: 'NEET Coaching near Shalimar Bagh', slug: '/biology-coaching-shalimar-bagh', priority: 6 },
  { title: 'Biology Coaching near Malviya Nagar', slug: '/biology-coaching-malviya-nagar', priority: 6 },
  { title: 'NEET Coaching near New Friends Colony', slug: '/neet-coaching-new-friends-colony', priority: 5 },
  { title: 'Biology Coaching near Panchsheel Park', slug: '/biology-coaching-panchsheel-park', priority: 5 },
  { title: 'NEET Coaching near Model Town', slug: '/biology-coaching-model-town', priority: 5 },
  { title: 'Biology Classes near Mayur Vihar', slug: '/neet-coaching-mayur-vihar', priority: 5 },
  { title: 'NEET Coaching near Indirapuram', slug: '/biology-coaching-indirapuram', priority: 5 },
  { title: 'Biology Classes near Sector 62 Noida', slug: '/biology-coaching-sector-62-noida', priority: 5 },
  { title: 'NEET Coaching near DLF Gurgaon', slug: '/neet-coaching-dlf-gurgaon', priority: 5 },
  { title: 'NEET Coaching near Sohna Road', slug: '/neet-coaching-sohna-road-gurgaon', priority: 5 },
  { title: 'Biology Classes near Green Park', slug: '/biology-coaching-green-park', priority: 5 },
  { title: 'NEET Coaching near Janakpuri', slug: '/neet-coaching-janakpuri', priority: 5 },
  { title: 'Biology Coaching near Kalkaji', slug: '/biology-coaching-kalkaji', priority: 5 },
  { title: 'NEET Coaching near Moti Bagh', slug: '/neet-coaching-moti-bagh', priority: 5 },
  { title: 'Biology Classes South Delhi', slug: '/biology-classes-south-delhi', priority: 5 },
]

// Hardcoded link data organized by category
const INTERNAL_LINKS = {
  location: [...DELHI_NCR_HUBS, ...DELHI_NCR_LOCALITIES],
  course: [
    { title: 'All Courses', slug: '/courses', priority: 8 },
    { title: 'Intensive NEET Biology', slug: '/courses/intensive-neet-biology', priority: 8 },
    { title: 'NEET Dropper Batch', slug: '/neet-dropper-batch', priority: 7 },
    { title: 'Book Free Demo', slug: '/book-free-demo', priority: 9 },
    { title: 'NEET Coaching Fees', slug: '/neet-coaching-fees', priority: 8 },
    { title: 'NEET Preparation Roadmap', slug: '/neet-preparation-roadmap', priority: 6 },
    { title: 'NEET Coaching Comparison', slug: '/neet-coaching-comparison', priority: 7 },
    { title: 'FAQ', slug: '/faq', priority: 5 },
    { title: 'Class 11 Foundation', slug: '/courses/foundation', priority: 6 },
    { title: 'Class 12 Intensive', slug: '/courses/class-12', priority: 6 },
    { title: 'NEET Crash Course', slug: '/neet-crash-course', priority: 7 },
    { title: 'Weekend NEET Batch', slug: '/neet-biology-weekend-batch', priority: 5 },
    { title: 'Online NEET Classes', slug: '/online-neet-coaching', priority: 7 },
    { title: 'Scholarship Program', slug: '/scholarship', priority: 5 },
    { title: 'Biology Notes', slug: '/biology-notes', priority: 6 },
    { title: 'NRI NEET Dropper Program', slug: '/nri-neet-dropper-program', priority: 4 },
    { title: 'NRI NEET Crash Course', slug: '/nri-neet-crash-course', priority: 4 },
    { title: 'IB to NEET Preparation', slug: '/ib-to-neet-biology-preparation', priority: 4 },
    { title: 'IGCSE to NEET Preparation', slug: '/igcse-to-neet-biology-preparation', priority: 4 },
    { title: 'A-Level to NEET Preparation', slug: '/a-level-to-neet-biology-preparation', priority: 4 },
  ],
  blog: [
    { title: 'Blog Home', slug: '/blog', priority: 7 },
    { title: 'NEET Biology Resources', slug: '/neet-biology-resources', priority: 7 },
    { title: 'Ultimate NEET Biology Guide 2026', slug: '/blog/ultimate-neet-biology-guide-2026', priority: 8 },
    { title: 'How to Score 360 in NEET Biology', slug: '/blog/how-to-score-360-in-neet-biology', priority: 8 },
    { title: 'Genetics for NEET: Mendel to Molecular', slug: '/blog/genetics-for-neet-mendel-to-molecular-biology', priority: 6 },
    { title: 'Photosynthesis: Complete NEET Guide', slug: '/blog/photosynthesis-complete-neet-guide', priority: 6 },
    { title: 'NEET Biology Weightage 2026', slug: '/blog/neet-biology-chapter-wise-weightage-2026-advanced', priority: 7 },
    { title: 'Best NEET Coaching Delhi NCR 2026', slug: '/blog/best-neet-coaching-delhi-ncr-2026-comparison', priority: 9 },
    { title: 'NEET 2026 Biology Strategy', slug: '/blog/neet-2026-biology-strategy', priority: 7 },
    { title: 'Ecology Complete Guide', slug: '/blog/ecology-complete-neet-guide', priority: 5 },
    { title: 'Human Physiology Notes', slug: '/blog/human-physiology-neet-notes', priority: 6 },
    { title: 'Cell Biology Masterclass', slug: '/blog/cell-biology-neet-masterclass', priority: 6 },
  ],
  resource: [
    { title: 'NEET Biology Resources', slug: '/neet-biology-resources', priority: 7 },
    { title: 'NEET Preparation Roadmap', slug: '/neet-preparation-roadmap', priority: 6 },
    { title: 'Blog', slug: '/blog', priority: 6 },
    { title: 'Success Stories', slug: '/success-stories', priority: 7 },
    { title: 'Testimonials', slug: '/testimonials', priority: 5 },
    { title: 'Find Center', slug: '/find-center', priority: 8 },
    { title: 'NEET Biology MCQ Practice', slug: '/neet-biology-mcq', priority: 7 },
    { title: 'Wall of Achievers', slug: '/wall-of-achievers', priority: 5 },
    { title: 'Gallery', slug: '/gallery', priority: 4 },
    { title: 'Compare NEET Coaching', slug: '/compare/neet-coaching-comparison', priority: 7 },
    { title: 'Help Center', slug: '/help-center', priority: 4 },
    { title: 'Results', slug: '/results', priority: 7 },
  ],
}

export function InternalLinkingWidget({
  currentPage,
  category,
  maxLinks = 12,
}: InternalLinkingWidgetProps) {
  const categoryLinks = INTERNAL_LINKS[category] || []
  const filtered = categoryLinks.filter((link) => link.slug !== currentPage)

  // Sort by priority (highest first), then deterministic shuffle within same priority
  const hash = currentPage.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0)
  const sorted = [...filtered].sort((a, b) => {
    if (a.priority !== b.priority) return b.priority - a.priority
    const hashA = (hash + a.slug.length) % 100
    const hashB = (hash + b.slug.length) % 100
    return hashA - hashB
  })

  const displayLinks = sorted.slice(0, maxLinks)

  // For location category, also show top hub links in a separate section
  const isLocationPage = category === 'location'
  const hubLinks = isLocationPage
    ? DELHI_NCR_HUBS.filter((h) => h.slug !== currentPage).slice(0, 5)
    : []

  if (displayLinks.length === 0) return null

  return (
    <section className="py-8 px-4 md:px-6" aria-label="Related pages">
      <div className="max-w-6xl mx-auto">
        {/* Hub links for location pages — critical for link hierarchy */}
        {hubLinks.length > 0 && (
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <MapPin className="w-5 h-5 text-blue-600" />
              <h2 className="text-lg md:text-xl font-semibold text-gray-900">
                NEET Coaching Centers Near You
              </h2>
            </div>
            <div className="flex flex-wrap gap-2">
              {hubLinks.map((link, i) => (
                <Link
                  key={`hub-${i}`}
                  href={link.slug}
                  className="inline-flex items-center gap-1.5 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-full hover:bg-blue-700 transition-colors shadow-sm"
                >
                  <MapPin className="w-3.5 h-3.5" />
                  {link.title}
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Main links grid */}
        <div className="mb-4">
          <h2 className="text-lg md:text-xl font-semibold text-gray-900">
            {isLocationPage ? 'Explore NEET Coaching Near You' : 'Explore More'}
          </h2>
          <p className="text-sm text-gray-600 mt-1">
            {isLocationPage
              ? 'Find the best NEET biology coaching center near your location in Delhi NCR'
              : 'Discover more resources and centers related to your interests'}
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {displayLinks.map((link, index) => (
            <Link key={index} href={link.slug}>
              <div className="h-full bg-slate-50 hover:bg-blue-50 rounded-lg p-3 transition-colors duration-200 border border-slate-200 hover:border-blue-300 group cursor-pointer">
                <div className="flex items-start justify-between gap-2">
                  <span className="text-sm font-medium text-blue-600 group-hover:text-blue-700 transition-colors line-clamp-2">
                    {link.title}
                  </span>
                  <ExternalLink className="w-3.5 h-3.5 text-blue-600 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-4 text-center">
          <p className="text-xs text-gray-500">
            Showing {displayLinks.length} relevant pages &bull; Cerebrum Biology Academy serves all Delhi NCR
          </p>
        </div>
      </div>
    </section>
  )
}
