import type { Metadata } from 'next'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { generatePageMetadata } from '@/lib/seo/metadata'
import { HeroSection } from '@/components/layout/HeroSection'
import { realTestimonials } from '@/data/realTestimonials'
// PERFORMANCE: Dynamic import — HomePageClient (exit intent) loads after all content renders
const HomePageClient = dynamic(
  () => import('@/components/home/HomePageClient').then((mod) => mod.HomePageClient),
  { loading: () => null }
)
import { SpeakableSchema } from '@/components/seo/SpeakableSchema'
import { VideoObjectSchema } from '@/components/seo/VideoObjectSchema'
import { ContentFreshness } from '@/components/seo/ContentFreshness'

// Loading skeleton component for consistent loading states
const LoadingSkeleton = ({ height = 'h-96' }: { height?: string }) => (
  <div className={`${height} bg-gray-100 animate-pulse`} style={{ minHeight: '384px' }} />
)

// PERFORMANCE: Lazy load ALL below-fold components to reduce initial bundle
// TrustSignalsBanner now uses CSS animations instead of framer-motion

const CoursesSection = dynamic(
  () => import('@/components/layout/CoursesSection').then((mod) => mod.CoursesSection),
  { loading: () => <LoadingSkeleton /> }
)

// TrustSignalsBanner - uses CSS animations (no framer-motion dependency)
const TrustSignalsBanner = dynamic(
  () => import('@/components/trust/TrustSignalsBanner').then((mod) => mod.TrustSignalsBanner),
  { loading: () => <LoadingSkeleton height="h-32" /> }
)

const FacultySection = dynamic(
  () => import('@/components/layout/FacultySection').then((mod) => mod.FacultySection),
  { loading: () => <LoadingSkeleton /> }
)

const RealStudentTestimonials = dynamic(
  () =>
    import('@/components/testimonials/RealStudentTestimonials').then(
      (mod) => mod.RealStudentTestimonials
    ),
  { loading: () => <LoadingSkeleton /> }
)

const LocationsSection = dynamic(
  () => import('@/components/locations/LocationsSection').then((mod) => mod.LocationsSection),
  { loading: () => <LoadingSkeleton height="h-64" /> }
)

const BookingSection = dynamic(
  () => import('@/components/layout/BookingSection').then((mod) => mod.BookingSection),
  { loading: () => <LoadingSkeleton /> }
)

const GoogleReviewsWidget = dynamic(
  () =>
    import('@/components/social-proof/GoogleReviewsWidget').then((mod) => mod.GoogleReviewsWidget),
  { loading: () => <LoadingSkeleton height="h-64" /> }
)

const HomeFAQSection = dynamic(
  () => import('@/components/home/HomeFAQSection').then((mod) => mod.HomeFAQSection),
  { loading: () => <LoadingSkeleton height="h-96" /> }
)

const MCQPromoBanner = dynamic(
  () => import('@/components/home/MCQPromoBanner').then((mod) => mod.MCQPromoBanner),
  { loading: () => <LoadingSkeleton height="h-64" /> }
)

const EEATSignals = dynamic(
  () => import('@/components/seo/EEATSignals').then((mod) => mod.EEATSignals),
  { loading: () => <LoadingSkeleton height="h-48" /> }
)

export const metadata: Metadata = generatePageMetadata('home')

// ISR: Revalidate every 1 hour for edge caching
export const revalidate = 3600

export default function Home() {
  const homePageSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': 'https://cerebrumbiologyacademy.com/#webpage',
    name: 'Best NEET Biology Coaching in Delhi NCR | Cerebrum Biology Academy',
    description:
      'Top NEET Biology coaching in Delhi NCR with AIIMS Trained faculty, 98% success rate, 500+ student selections. 4 centers: South Extension Delhi, Rohini Delhi, Gurugram, Faridabad. Online + offline classes.',
    url: 'https://cerebrumbiologyacademy.com',
    isPartOf: {
      '@type': 'WebSite',
      '@id': 'https://cerebrumbiologyacademy.com/#website',
      name: 'Cerebrum Biology Academy',
      url: 'https://cerebrumbiologyacademy.com',
    },
    about: {
      '@type': 'EducationalOrganization',
      '@id': 'https://cerebrumbiologyacademy.com/#organization',
      name: 'Cerebrum Biology Academy',
    },
    mainEntity: {
      '@type': 'EducationalOrganization',
      '@id': 'https://cerebrumbiologyacademy.com/#organization',
    },
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: 'https://cerebrumbiologyacademy.com',
        },
      ],
    },
    speakable: {
      '@type': 'SpeakableSpecification',
      cssSelector: ['[data-speakable="title"]', '[data-speakable="summary"]'],
    },
    significantLink: [
      'https://cerebrumbiologyacademy.com/courses',
      'https://cerebrumbiologyacademy.com/all-locations',
      'https://cerebrumbiologyacademy.com/book-free-demo',
      'https://cerebrumbiologyacademy.com/results',
    ],
  }

  return (
    <div className="min-h-screen overflow-x-hidden">
      {/* Video Schema for Sadhna Sirin Topper Testimonial */}
      <VideoObjectSchema
        name="Sadhna Sirin - Delhi NCR Topper NEET 2023 | Cerebrum Biology Academy"
        description="Sadhna Sirin shares her NEET 2023 success story, scoring 695 out of 720 marks with guidance from Dr. Shekhar C Singh at Cerebrum Biology Academy. Watch her journey from preparation strategy to becoming Delhi-NCR's top NEET scorer."
        thumbnailUrl="https://i.ytimg.com/vi/bk6wQCh6b9w/hqdefault.jpg"
        uploadDate="2023-07-15"
        duration="PT5M30S"
        contentUrl="https://www.youtube.com/watch?v=bk6wQCh6b9w"
        embedUrl="https://www.youtube.com/embed/bk6wQCh6b9w"
        interactionStatistic={{ watchCount: 5000 }}
      />

      {/* Video Schema for Student Success Story */}
      <VideoObjectSchema
        name="Student Success Story | NEET Biology Coaching at Cerebrum Biology Academy"
        description="Watch how students at Cerebrum Biology Academy achieve outstanding NEET results through focused biology coaching by Dr. Shekhar C Singh. Proven methodology with small batch sizes of 15-20 students."
        thumbnailUrl="https://i.ytimg.com/vi/t5F8RBuHITM/hqdefault.jpg"
        uploadDate="2024-01-15"
        duration="PT4M45S"
        contentUrl="https://www.youtube.com/watch?v=t5F8RBuHITM"
        embedUrl="https://www.youtube.com/embed/t5F8RBuHITM"
        interactionStatistic={{ watchCount: 3000 }}
      />

      {/* Speakable Schema for Voice Search Optimization */}
      <SpeakableSchema
        headline="Best NEET Biology Coaching Delhi NCR | Cerebrum Academy"
        description="Top NEET Biology coaching in Delhi NCR with AIIMS Trained faculty, 98% success rate, 500+ student selections. Get expert guidance for NEET preparation with personalized coaching."
        cssSelectors={['[data-speakable="title"]', '[data-speakable="summary"]', '.faq-answer']}
        url="https://cerebrumbiologyacademy.com"
      />

      {/* 1. Hero Section - Server rendered for instant LCP */}
      {/* LCP Critical: No content-visibility, inline styles for immediate paint */}
      <section
        className="lcp-critical"
        style={{ contentVisibility: 'visible', containIntrinsicSize: 'auto 100vh' }}
      >
        <HeroSection />
      </section>

      {/* 2. Trust Signals Banner - Compact Version */}
      <section className="content-visibility-auto-sm">
        <TrustSignalsBanner variant="compact" />
      </section>

      {/* 3. Student Testimonials - Social proof early for conversion */}
      <section className="content-visibility-auto-lg">
        <RealStudentTestimonials
          testimonials={realTestimonials}
          title="Real Student Success Stories"
          subtitle="Hear directly from our NEET toppers who achieved their dreams"
        />
      </section>

      {/* 4. Courses Section - Below fold, deferred rendering */}
      <section className="content-visibility-auto">
        <CoursesSection />
      </section>

      {/* 5. Faculty Section */}
      <section className="content-visibility-auto">
        <FacultySection />
      </section>

      {/* 6. E-E-A-T Signals for AI Recommendations */}
      <section className="content-visibility-auto-sm">
        <EEATSignals variant="compact" className="bg-gray-50" />
      </section>

      {/* 7. Google Reviews Widget */}
      <section className="content-visibility-auto">
        <GoogleReviewsWidget variant="full" />
      </section>

      {/* 8. FAQ Section */}
      <section className="content-visibility-auto-lg">
        <HomeFAQSection />
      </section>

      {/* 8.5 MCQ Practice Tool Promotion */}
      <section className="content-visibility-auto-sm">
        <MCQPromoBanner />
      </section>

      {/* 8.6 International Programs — for NRI/A-Level/IB/IGCSE/AP students */}
      <section className="content-visibility-auto-sm">
        <div className="bg-gradient-to-br from-indigo-50 via-purple-50 to-violet-50 py-16">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-10">
              <span className="inline-flex items-center gap-2 bg-indigo-100 text-indigo-700 px-4 py-2 rounded-full text-sm font-semibold mb-4">
                Serving Students in 14+ Countries
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
                International & NRI Students
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Expert Biology coaching for A-Level, IB, IGCSE, AP curricula and NRI students
                worldwide
              </p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                {
                  title: 'A-Level Biology',
                  desc: 'Cambridge, Edexcel, AQA',
                  href: '/a-level-biology-tutor',
                  badge: '92% A*/A Rate',
                },
                {
                  title: 'IB Biology',
                  desc: '2025 Syllabus · HL/SL · IA · 15 Cities',
                  href: '/ib-biology',
                  badge: 'IB Hub',
                },
                {
                  title: 'IGCSE Biology',
                  desc: 'Cambridge 0610/0970',
                  href: '/igcse-biology-tuition',
                  badge: 'IGCSE Specialist',
                },
                {
                  title: 'AP Biology',
                  desc: 'College Board Prep',
                  href: '/ap-biology-to-neet-preparation',
                  badge: 'Score 5',
                },
              ].map((program) => (
                <Link
                  key={program.href}
                  href={program.href}
                  className="group bg-white rounded-xl p-5 shadow-sm border border-gray-200 hover:border-indigo-400 hover:shadow-lg transition-all"
                >
                  <span className="inline-block bg-indigo-100 text-indigo-700 text-xs font-semibold px-2.5 py-1 rounded-full mb-3">
                    {program.badge}
                  </span>
                  <h3 className="font-bold text-gray-900 text-lg mb-1 group-hover:text-indigo-600 transition-colors">
                    {program.title}
                  </h3>
                  <p className="text-sm text-gray-600">{program.desc}</p>
                </Link>
              ))}
            </div>
            <div className="flex flex-wrap justify-center gap-3 mt-8">
              <Link
                href="/online-biology-classes-international"
                className="inline-flex items-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors"
              >
                Explore International Programs
              </Link>
              <Link
                href="https://wa.me/918826444334?text=Hi!%20I'm%20an%20international%20student.%20Please%20share%20details%20about%20your%20programs."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
              >
                WhatsApp for NRI Students
              </Link>
            </div>

            {/* IB Biology deep links — surface rich 2025-syllabus resources */}
            <div className="mt-10 rounded-2xl border border-indigo-100 bg-white/70 p-6">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h3 className="text-base font-semibold text-gray-900">
                  Popular IB Biology resources (2025 syllabus)
                </h3>
                <Link
                  href="/ib-biology"
                  className="text-sm font-semibold text-indigo-700 hover:text-indigo-900"
                >
                  View IB hub →
                </Link>
              </div>
              <div className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
                {[
                  { label: 'IA Guide (4 criteria)', href: '/ib-biology-ia-guide' },
                  { label: '2025 Syllabus Map', href: '/ib-biology-2025-syllabus' },
                  { label: 'Past Papers Strategy', href: '/ib-biology-past-papers' },
                  { label: 'IB Biology Tutors', href: '/ib-biology-tutors' },
                ].map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="group flex items-center justify-between rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-700 hover:border-indigo-400 hover:text-indigo-700"
                  >
                    <span>{link.label}</span>
                    <span className="text-indigo-500 group-hover:translate-x-0.5 transition-transform">
                      →
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 9. Locations Section */}
      <section className="content-visibility-auto-sm">
        <LocationsSection />
      </section>

      {/* 10. Booking Section */}
      <section className="content-visibility-auto">
        <BookingSection />
      </section>

      {/* Client-side components (Exit Intent) - moved below fold for better LCP (~150ms improvement) */}
      <HomePageClient />

      {/* Content Freshness Schema for E-E-A-T signals */}
      <ContentFreshness
        datePublished="2024-01-15"
        dateModified="2026-02-25"
        author={{
          name: 'Dr. Shekhar C Singh',
          url: 'https://cerebrumbiologyacademy.com/faculty',
          jobTitle: 'Founder & Head Faculty, AIIMS Graduate',
        }}
        reviewedBy={{
          name: 'Dr. Shekhar C Singh',
          credentials: 'MBBS, AIIMS Delhi',
        }}
        showVisual={false}
      />

      {/* Footer is rendered in layout.tsx - no need to duplicate here */}
    </div>
  )
}
