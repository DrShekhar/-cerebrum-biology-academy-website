import Link from 'next/link'
import { ExternalLink } from 'lucide-react'

interface InternalLinkingWidgetProps {
  currentPage: string // slug of current page
  category: 'location' | 'course' | 'blog' | 'resource'
  maxLinks?: number // default 8
}

// Hardcoded link data organized by category for internal link distribution
const INTERNAL_LINKS = {
  location: [
    { title: 'NEET Coaching South Extension', slug: '/neet-coaching-south-extension' },
    { title: 'Biology Coaching Greater Kailash', slug: '/biology-coaching-greater-kailash' },
    { title: 'NEET Coaching Saket', slug: '/neet-coaching-saket' },
    { title: 'Biology Coaching Dwarka', slug: '/biology-coaching-dwarka' },
    { title: 'NEET Coaching DLF Gurgaon', slug: '/neet-coaching-dlf-gurgaon' },
    { title: 'Biology Coaching Hauz Khas', slug: '/biology-coaching-hauz-khas' },
    { title: 'NEET Coaching Surajkund', slug: '/neet-coaching-surajkund' },
    { title: 'Biology Coaching Vasant Kunj', slug: '/biology-coaching-vasant-kunj' },
    { title: 'Find Center', slug: '/find-center' },
    { title: 'Biology Coaching Defence Colony', slug: '/biology-coaching-defence-colony' },
    { title: 'NEET Coaching New Friends Colony', slug: '/neet-coaching-new-friends-colony' },
    { title: 'Biology Coaching Model Town', slug: '/biology-coaching-model-town' },
  ],
  course: [
    { title: 'All Courses', slug: '/courses' },
    { title: 'Intensive NEET Biology', slug: '/courses/intensive-neet-biology' },
    { title: 'NEET Dropper Batch', slug: '/neet-dropper-batch' },
    { title: 'Book Free Demo', slug: '/book-free-demo' },
    { title: 'NEET Coaching Fees', slug: '/neet-coaching-fees' },
    { title: 'NEET Preparation Roadmap', slug: '/neet-preparation-roadmap' },
    { title: 'NEET Coaching Comparison', slug: '/neet-coaching-comparison' },
    { title: 'FAQ', slug: '/faq' },
  ],
  blog: [
    { title: 'Blog Home', slug: '/blog' },
    { title: 'NEET Biology Resources', slug: '/neet-biology-resources' },
    { title: 'Ultimate NEET Biology Guide 2026', slug: '/blog/ultimate-neet-biology-guide-2026' },
    { title: 'How to Score 360 in NEET Biology', slug: '/blog/how-to-score-360-in-neet-biology' },
    { title: 'Genetics for NEET: Mendel to Molecular Biology', slug: '/blog/genetics-for-neet-mendel-to-molecular-biology' },
    { title: 'Photosynthesis: Complete NEET Guide', slug: '/blog/photosynthesis-complete-neet-guide' },
    { title: 'NEET Biology Chapter-Wise Weightage 2026', slug: '/blog/neet-biology-chapter-wise-weightage-2026-advanced' },
    { title: 'Best NEET Coaching Delhi NCR 2026', slug: '/blog/best-neet-coaching-delhi-ncr-2026-comparison' },
  ],
  resource: [
    { title: 'NEET Biology Resources', slug: '/neet-biology-resources' },
    { title: 'NEET Preparation Roadmap', slug: '/neet-preparation-roadmap' },
    { title: 'Blog', slug: '/blog' },
    { title: 'Success Stories', slug: '/success-stories' },
    { title: 'Testimonials', slug: '/testimonials' },
    { title: 'Find Center', slug: '/find-center' },
  ],
}

export function InternalLinkingWidget({
  currentPage,
  category,
  maxLinks = 8,
}: InternalLinkingWidgetProps) {
  // Get links for the selected category
  const categoryLinks = INTERNAL_LINKS[category] || []

  // Filter out current page and limit results
  const displayLinks = categoryLinks
    .filter((link) => link.slug !== currentPage)
    .slice(0, maxLinks)

  if (displayLinks.length === 0) {
    return null
  }

  return (
    <section className="py-8 px-4 md:px-6">
      <div className="max-w-6xl mx-auto">
        {/* Section heading */}
        <div className="mb-6">
          <h2 className="text-lg md:text-xl font-semibold text-gray-900">Explore More</h2>
          <p className="text-sm text-gray-600 mt-1">
            Discover more resources and centers related to your interests
          </p>
        </div>

        {/* Links grid - responsive pills/tags */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {displayLinks.map((link, index) => (
            <Link key={index} href={link.slug}>
              <div className="h-full bg-slate-100 hover:bg-blue-50 rounded-lg p-3 transition-colors duration-200 border border-slate-200 hover:border-blue-200 group cursor-pointer">
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

        {/* Additional context message */}
        <div className="mt-6 text-center">
          <p className="text-xs text-gray-500">
            {displayLinks.length} relevant pages to help you explore our platform
          </p>
        </div>
      </div>
    </section>
  )
}
