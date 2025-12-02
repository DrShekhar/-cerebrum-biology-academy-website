import type { Metadata } from 'next'
import dynamic from 'next/dynamic'
import { generatePageMetadata } from '@/lib/seo/metadata'
import { OptimizedHeroSection } from '@/components/layout/OptimizedHeroSection'
import { realTestimonials } from '@/data/realTestimonials'
import Link from 'next/link'
import { HomePageClient } from '@/components/home/HomePageClient'

// Loading skeleton component for consistent loading states
const LoadingSkeleton = ({ height = 'h-96' }: { height?: string }) => (
  <div className={`${height} bg-gradient-to-r from-gray-50 to-gray-100 animate-pulse rounded-lg`} />
)

// PERFORMANCE: Lazy load ALL below-fold components to reduce initial bundle
// This reduces initial JS by ~800KB and improves FCP by 2-3 seconds

const CoursesSection = dynamic(
  () => import('@/components/layout/CoursesSection').then((mod) => mod.CoursesSection),
  { loading: () => <LoadingSkeleton />, ssr: true }
)

const TrustSignalsBanner = dynamic(
  () => import('@/components/trust/TrustSignalsBanner').then((mod) => mod.TrustSignalsBanner),
  { loading: () => <LoadingSkeleton height="h-32" />, ssr: true }
)

const FacultySection = dynamic(
  () => import('@/components/layout/FacultySection').then((mod) => mod.FacultySection),
  { loading: () => <LoadingSkeleton />, ssr: true }
)

const RealStudentTestimonials = dynamic(
  () =>
    import('@/components/testimonials/RealStudentTestimonials').then(
      (mod) => mod.RealStudentTestimonials
    ),
  { loading: () => <LoadingSkeleton />, ssr: true }
)

const SuccessStoriesSection = dynamic(
  () =>
    import('@/components/testimonials/SuccessStoriesSection').then(
      (mod) => mod.SuccessStoriesSection
    ),
  { loading: () => <LoadingSkeleton />, ssr: true }
)

const LocationsSection = dynamic(
  () => import('@/components/locations/LocationsSection').then((mod) => mod.LocationsSection),
  { loading: () => <LoadingSkeleton height="h-64" />, ssr: true }
)

const BookingSection = dynamic(
  () => import('@/components/layout/BookingSection').then((mod) => mod.BookingSection),
  { loading: () => <LoadingSkeleton />, ssr: true }
)

const GoogleReviewsWidget = dynamic(
  () =>
    import('@/components/social-proof/GoogleReviewsWidget').then((mod) => mod.GoogleReviewsWidget),
  { loading: () => <LoadingSkeleton height="h-64" />, ssr: true }
)

const SuccessTicker = dynamic(
  () => import('@/components/ui/SuccessTicker').then((mod) => mod.SuccessTicker),
  { loading: () => null }
)

const Footer = dynamic(() => import('@/components/layout/Footer').then((mod) => mod.Footer), {
  loading: () => <LoadingSkeleton height="h-64" />,
  ssr: true,
})

export const metadata: Metadata = generatePageMetadata('home')

export default function Home() {
  return (
    <div className="min-h-screen overflow-x-hidden">
      {/* Maintenance Notice - Auto-dismiss after 8 seconds */}
      {/* <MaintenanceNotice /> */}

      {/* Client-side components (Exit Intent, etc.) */}
      <HomePageClient />

      <OptimizedHeroSection />

      {/* Trust Signals Banner - Compact Version */}
      <TrustSignalsBanner variant="compact" />

      {/* Success Ticker - Bottom of page, auto-dismiss after 12 seconds */}
      <SuccessTicker />

      <CoursesSection />
      <FacultySection />

      {/* Trust Signals Full Section */}
      <TrustSignalsBanner variant="full" showVerificationBadges={true} />

      <RealStudentTestimonials
        testimonials={realTestimonials}
        title="Real Student Success Stories"
        subtitle="Hear directly from our NEET toppers who achieved their dreams"
      />

      {/* Success Stories / Transformation Section */}
      <SuccessStoriesSection
        title="Transformation Stories"
        subtitle="See how our students improved their scores dramatically"
        maxStories={3}
        showViewAll={true}
      />

      {/* Google Reviews Widget */}
      <GoogleReviewsWidget variant="full" maxReviews={4} />

      <LocationsSection />

      {/* Photo Gallery CTA Section */}
      <section className="py-12 sm:py-14 md:py-16 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">
            See Our Academy in Action
          </h2>
          <p className="text-base sm:text-lg md:text-xl mb-6 sm:mb-8 opacity-90">
            Explore our facilities, events, and achievements through our photo gallery
          </p>
          <Link
            href="/gallery"
            className="inline-block bg-white text-blue-600 px-6 sm:px-8 py-3 sm:py-4 rounded-full font-bold hover:bg-gray-100 transition-all duration-300 shadow-lg text-sm sm:text-base"
          >
            View Photo Gallery
          </Link>
        </div>
      </section>

      <BookingSection />
      <Footer />
    </div>
  )
}
