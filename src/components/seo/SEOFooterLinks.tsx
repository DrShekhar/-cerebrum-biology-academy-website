import Link from 'next/link'

interface FooterLinkCategory {
  heading: string
  links: Array<{
    label: string
    href: string
  }>
}

// Comprehensive footer links organized by category for site-wide crawlability
const FOOTER_CATEGORIES: FooterLinkCategory[] = [
  {
    heading: 'NEET Coaching Centers',
    links: [
      { label: 'South Extension', href: '/neet-coaching-south-extension' },
      { label: 'Gurugram', href: '/neet-coaching-dlf-gurgaon' },
      { label: 'Rohini', href: '/neet-coaching-rohini' },
      { label: 'Green Park', href: '/neet-coaching-green-park' },
      { label: 'Faridabad', href: '/neet-coaching-faridabad' },
      { label: 'Noida Area', href: '/neet-coaching-noida' },
    ],
  },
  {
    heading: 'Popular Localities',
    links: [
      { label: 'Greater Kailash', href: '/biology-coaching-greater-kailash' },
      { label: 'Saket', href: '/neet-coaching-saket' },
      { label: 'Dwarka', href: '/biology-coaching-dwarka' },
      { label: 'Hauz Khas', href: '/biology-coaching-hauz-khas' },
      { label: 'Vasant Kunj', href: '/biology-coaching-vasant-kunj' },
      { label: 'Defence Colony', href: '/biology-coaching-defence-colony' },
      { label: 'Model Town', href: '/biology-coaching-model-town' },
      { label: 'Surajkund', href: '/neet-coaching-surajkund' },
    ],
  },
  {
    heading: 'Courses & Programs',
    links: [
      { label: 'All Courses', href: '/courses' },
      { label: 'Intensive Biology', href: '/courses/intensive-neet-biology' },
      { label: 'Dropper Batch', href: '/neet-dropper-batch' },
      { label: 'JEE Coaching', href: '/jee-coaching' },
      { label: 'NEET Preparation', href: '/neet-preparation-roadmap' },
      { label: 'Course Comparison', href: '/neet-coaching-comparison' },
    ],
  },
  {
    heading: 'Resources & Guides',
    links: [
      { label: 'Biology Resources', href: '/neet-biology-resources' },
      { label: 'NEET Study Guide', href: '/blog/ultimate-neet-biology-guide-2026' },
      { label: 'Scoring Strategies', href: '/blog/how-to-score-360-in-neet-biology' },
      { label: 'Genetics Guide', href: '/blog/genetics-for-neet-mendel-to-molecular-biology' },
      { label: 'Photosynthesis Guide', href: '/blog/photosynthesis-complete-neet-guide' },
      { label: 'Chapter Weightage', href: '/blog/neet-biology-chapter-wise-weightage-2026-advanced' },
      { label: 'Coaching Comparison', href: '/blog/best-neet-coaching-delhi-ncr-2026-comparison' },
      { label: 'Blog & Articles', href: '/blog' },
    ],
  },
  {
    heading: 'Quick Links',
    links: [
      { label: 'About Us', href: '/about' },
      { label: 'Contact Us', href: '/contact' },
      { label: 'FAQ', href: '/faq' },
      { label: 'Testimonials', href: '/testimonials' },
      { label: 'Success Stories', href: '/success-stories' },
      { label: 'Book Free Demo', href: '/book-free-demo' },
    ],
  },
  {
    heading: 'NRI — Gulf & Middle East',
    links: [
      { label: 'Dubai', href: '/neet-coaching-dubai-uae' },
      { label: 'Riyadh', href: '/neet-coaching-riyadh-saudi-arabia' },
      { label: 'Doha', href: '/neet-coaching-doha-qatar' },
      { label: 'Muscat', href: '/neet-coaching-muscat-oman' },
      { label: 'Kuwait City', href: '/neet-coaching-kuwait-city' },
      { label: 'Bahrain', href: '/neet-coaching-bahrain' },
    ],
  },
  {
    heading: 'NRI — Americas & UK',
    links: [
      { label: 'New York', href: '/neet-coaching-new-york-usa' },
      { label: 'Houston', href: '/neet-coaching-houston-usa' },
      { label: 'Toronto', href: '/neet-coaching-toronto-canada' },
      { label: 'London', href: '/neet-coaching-london-uk' },
      { label: 'Sydney', href: '/neet-coaching-sydney-australia' },
      { label: 'NRI USA Hub', href: '/neet-coaching-nri-usa' },
    ],
  },
  {
    heading: 'NRI — Asia & Africa',
    links: [
      { label: 'Singapore', href: '/neet-coaching-singapore-city' },
      { label: 'Kuala Lumpur', href: '/neet-coaching-kuala-lumpur-malaysia' },
      { label: 'Kathmandu', href: '/neet-coaching-kathmandu-nepal' },
      { label: 'Lagos', href: '/neet-coaching-lagos-nigeria' },
      { label: 'Nairobi', href: '/neet-coaching-nairobi-kenya' },
      { label: 'NRI Dropper', href: '/nri-neet-dropper-program' },
    ],
  },
  {
    heading: 'Board to NEET',
    links: [
      { label: 'IB → NEET', href: '/ib-to-neet-biology-preparation' },
      { label: 'IGCSE → NEET', href: '/igcse-to-neet-biology-preparation' },
      { label: 'A-Level → NEET', href: '/a-level-to-neet-biology-preparation' },
      { label: 'AP Bio → NEET', href: '/ap-biology-to-neet-preparation' },
      { label: 'Edexcel → NEET', href: '/edexcel-to-neet-biology-preparation' },
      { label: 'NRI Foundation', href: '/nri-neet-foundation-program' },
    ],
  },
]

export function SEOFooterLinks() {
  return (
    <section className="bg-slate-900 text-white py-12 px-4 md:px-6">
      <div className="max-w-7xl mx-auto">
        {/* Grid layout: responsive columns */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-5 gap-8 md:gap-6">
          {FOOTER_CATEGORIES.map((category, categoryIndex) => (
            <div key={categoryIndex}>
              {/* Category heading */}
              <h3 className="text-green-400 font-semibold text-sm mb-4 truncate">
                {category.heading}
              </h3>

              {/* Links list */}
              <ul className="space-y-2.5">
                {category.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <Link href={link.href}>
                      <span className="text-sm text-gray-300 hover:text-green-400 transition-colors duration-200 inline-block">
                        {link.label}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="border-t border-slate-700 mt-10 pt-8">
          {/* Footer meta info */}
          <div className="flex flex-col md:flex-row items-center justify-between text-xs text-gray-400">
            <p>&copy; 2026 Cerebrum Biology Academy. All rights reserved.</p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <Link href="/privacy">
                <span className="hover:text-green-400 transition-colors">Privacy Policy</span>
              </Link>
              <Link href="/terms">
                <span className="hover:text-green-400 transition-colors">Terms of Service</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
