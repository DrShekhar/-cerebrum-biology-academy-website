import Link from 'next/link'

interface FooterLinkCategory {
  heading: string
  links: Array<{
    label: string
    href: string
  }>
}

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
    heading: 'Best NEET Coaching',
    links: [
      { label: 'Best in Faridabad', href: '/best-neet-coaching-faridabad' },
      { label: 'Best in Gurugram', href: '/best-neet-coaching-gurugram' },
      { label: 'Best in Noida', href: '/best-neet-coaching-noida' },
      { label: 'Best in Ghaziabad', href: '/best-neet-coaching-ghaziabad' },
      { label: 'Best in Greater Noida', href: '/best-neet-coaching-greater-noida' },
      { label: 'Best Biology Coaching', href: '/best-neet-biology-coaching' },
    ],
  },
  {
    heading: 'Top Coaching Guides',
    links: [
      { label: 'Top 10 Faridabad', href: '/top-10-neet-coaching-faridabad' },
      { label: 'Top 10 Gurugram', href: '/top-10-neet-coaching-gurugram' },
      { label: 'Top 10 Noida', href: '/top-10-neet-coaching-noida' },
      { label: 'Top 10 Ghaziabad', href: '/top-10-neet-coaching-ghaziabad' },
      { label: 'Top 10 Greater Noida', href: '/top-10-neet-coaching-greater-noida' },
      { label: 'Coaching Comparison', href: '/neet-coaching-comparison' },
    ],
  },
  {
    heading: 'Which Coaching Is Best',
    links: [
      { label: 'Best in Faridabad?', href: '/which-neet-coaching-is-best-in-faridabad' },
      { label: 'Best in Gurugram?', href: '/which-neet-coaching-is-best-in-gurugram' },
      { label: 'Best in Noida?', href: '/which-neet-coaching-is-best-in-noida' },
      { label: 'Best in Ghaziabad?', href: '/which-neet-coaching-is-best-in-ghaziabad' },
      { label: 'Best in Greater Noida?', href: '/which-neet-coaching-is-best-in-greater-noida' },
    ],
  },
  {
    heading: 'Biology Classes',
    links: [
      { label: 'Delhi', href: '/biology-classes-delhi' },
      { label: 'East Delhi', href: '/biology-classes-east-delhi' },
      { label: 'South Delhi', href: '/biology-classes-south-delhi' },
      { label: 'Gurgaon', href: '/biology-classes-gurgaon' },
      { label: 'Noida', href: '/biology-classes-noida' },
      { label: 'Faridabad', href: '/biology-classes-faridabad' },
      { label: 'Ghaziabad', href: '/biology-classes-ghaziabad' },
      { label: 'Greater Noida', href: '/biology-classes-greater-noida' },
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
      { label: 'Board Exam Prep', href: '/board-exam-preparation' },
    ],
  },
  {
    heading: 'Study Material',
    links: [
      { label: 'Biology Notes', href: '/biology-notes-for-neet' },
      { label: 'NEET MCQ Practice', href: '/neet-biology-mcq' },
      { label: 'Campbell Biology', href: '/campbell-biology' },
      { label: 'Biology Definitions', href: '/biology-definitions' },
      { label: 'Previous Year Qs', href: '/neet-previous-year-questions' },
      { label: 'Online Test Series', href: '/online-neet-test-series' },
      { label: 'Mock Tests', href: '/mock-tests' },
    ],
  },
  {
    heading: 'NEET Guides',
    links: [
      { label: 'Preparation Guide', href: '/neet-preparation-guide' },
      { label: 'Eligibility 2026', href: '/neet-eligibility-2026' },
      { label: 'Syllabus 2026', href: '/neet-syllabus-2026' },
      { label: 'Exam Countdown', href: '/neet-exam-countdown' },
      { label: 'College Predictor', href: '/neet-college-predictor' },
      { label: 'Coaching Fees', href: '/neet-coaching-fees' },
    ],
  },
  {
    heading: 'Resources & Guides',
    links: [
      { label: 'Biology Resources', href: '/neet-biology-resources' },
      { label: 'NEET Study Guide', href: '/blog/ultimate-neet-biology-guide-2026' },
      { label: 'Scoring Strategies', href: '/blog/how-to-score-360-in-neet-biology' },
      { label: 'Genetics Guide', href: '/blog/genetics-for-neet-mendel-to-molecular-biology' },
      {
        label: 'Chapter Weightage',
        href: '/blog/neet-biology-chapter-wise-weightage-2026-advanced',
      },
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
      { label: 'All States', href: '/states' },
      { label: 'All Locations', href: '/all-locations' },
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
    heading: 'IB Biology',
    links: [
      { label: 'IB Biology Hub', href: '/ib-biology' },
      { label: 'IB Biology Coaching', href: '/boards/ib' },
      { label: 'IB Biology Tuition', href: '/ib-biology-tuition' },
      { label: 'IB Biology Tutor Online', href: '/ib-biology-tutor-online' },
      { label: 'IB Biology Online Classes', href: '/ib-biology-online-classes' },
      { label: 'IB + IGCSE Biology', href: '/courses/ib-igcse-biology' },
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
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-5 gap-8 md:gap-6">
          {FOOTER_CATEGORIES.map((category, categoryIndex) => (
            <div key={categoryIndex}>
              <h3 className="text-green-400 font-semibold text-sm mb-4 truncate">
                {category.heading}
              </h3>
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
        <div className="border-t border-slate-700 mt-10 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between text-xs text-gray-400">
            <p>&copy; 2026 Cerebrum Biology Academy. All rights reserved.</p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <Link href="/privacy-policy">
                <span className="hover:text-green-400 transition-colors">Privacy Policy</span>
              </Link>
              <Link href="/terms-of-service">
                <span className="hover:text-green-400 transition-colors">Terms of Service</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
