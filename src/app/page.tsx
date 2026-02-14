import type { Metadata } from 'next'
import dynamic from 'next/dynamic'
import { generatePageMetadata } from '@/lib/seo/metadata'
import { HeroSection } from '@/components/layout/HeroSection'
import { realTestimonials } from '@/data/realTestimonials'
import { HomePageClient } from '@/components/home/HomePageClient'
import { SpeakableSchema } from '@/components/seo/SpeakableSchema'
import { VideoObjectSchema } from '@/components/seo/VideoObjectSchema'

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

      {/* Speakable Schema for Voice Search Optimization */}
      <SpeakableSchema
        headline="Best NEET Biology Coaching Delhi NCR | Cerebrum Academy"
        description="Top NEET Biology coaching in Delhi NCR with AIIMS Trained faculty, 98% success rate, 500+ student selections. Get expert guidance for NEET preparation with personalized coaching."
        cssSelectors={[
          '[data-speakable="title"]',
          '[data-speakable="summary"]',
          '.faq-answer',
        ]}
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

      {/* Client-side components (Exit Intent) - AFTER hero for better LCP */}
      <HomePageClient />

      {/* 2. Trust Signals Banner - Compact Version */}
      <section className="content-visibility-auto-sm">
        <TrustSignalsBanner variant="compact" />
      </section>

      {/* 3. Courses Section - Below fold, deferred rendering */}
      <section className="content-visibility-auto">
        <CoursesSection />
      </section>

      {/* 4. Faculty Section */}
      <section className="content-visibility-auto">
        <FacultySection />
      </section>

      {/* 5. E-E-A-T Signals for AI Recommendations */}
      <section className="content-visibility-auto-sm">
        <EEATSignals variant="compact" className="bg-gray-50" />
      </section>

      {/* 6. Student Testimonials - Unified Section */}
      <section className="content-visibility-auto-lg">
        <RealStudentTestimonials
          testimonials={realTestimonials}
          title="Real Student Success Stories"
          subtitle="Hear directly from our NEET toppers who achieved their dreams"
        />
      </section>

      {/* 7. Google Reviews Widget */}
      <section className="content-visibility-auto">
        <GoogleReviewsWidget variant="full" maxReviews={3} />
      </section>

      {/* 8. FAQ Section */}
      <section className="content-visibility-auto-lg">
        <HomeFAQSection />
      </section>

      {/* 8.5 MCQ Practice Tool Promotion */}
      <section className="content-visibility-auto-sm">
        <MCQPromoBanner />
      </section>

      {/* 9. Locations Section */}
      <section className="content-visibility-auto-sm">
        <LocationsSection />
      </section>

      {/* 10. Booking Section */}
      <section className="content-visibility-auto">
        <BookingSection />
      </section>

      {/* Footer is rendered in layout.tsx - no need to duplicate here */}
    </div>
  )
}
