import type { Metadata } from 'next'
import dynamic from 'next/dynamic'
import { generatePageMetadata } from '@/lib/seo/metadata'
import { HeroSection } from '@/components/layout/HeroSection'
import { realTestimonials } from '@/data/realTestimonials'
import { HomePageClient } from '@/components/home/HomePageClient'

// Loading skeleton component for consistent loading states
const LoadingSkeleton = ({ height = 'h-96' }: { height?: string }) => (
  <div className={`${height} bg-gradient-to-r from-blue-50/50 to-purple-50/50 animate-pulse`} />
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

const HomeFAQSection = dynamic(
  () => import('@/components/home/HomeFAQSection').then((mod) => mod.HomeFAQSection),
  { loading: () => <LoadingSkeleton height="h-96" />, ssr: true }
)

const EEATSignals = dynamic(
  () => import('@/components/seo/EEATSignals').then((mod) => mod.EEATSignals),
  { loading: () => <LoadingSkeleton height="h-48" />, ssr: true }
)

export const metadata: Metadata = generatePageMetadata('home')

// ISR: Revalidate every 1 hour for edge caching
export const revalidate = 3600

export default function Home() {
  return (
    <div className="min-h-screen overflow-x-hidden">
      {/* Client-side components (Exit Intent disabled on homepage) */}
      <HomePageClient />

      {/* 1. Hero Section - Server rendered for instant LCP */}
      <HeroSection />

      {/* 2. Trust Signals Banner - Compact Version */}
      <TrustSignalsBanner variant="compact" />

      {/* 3. Courses Section */}
      <CoursesSection />

      {/* 4. Faculty Section */}
      <FacultySection />

      {/* 5. E-E-A-T Signals for AI Recommendations */}
      <EEATSignals variant="compact" className="bg-gray-50" />

      {/* 6. Trust Signals Full Section */}
      <TrustSignalsBanner variant="full" showVerificationBadges={true} />

      {/* 7. Student Testimonials - Unified Section */}
      <RealStudentTestimonials
        testimonials={realTestimonials}
        title="Real Student Success Stories"
        subtitle="Hear directly from our NEET toppers who achieved their dreams"
      />

      {/* 7. Google Reviews Widget */}
      <GoogleReviewsWidget variant="full" maxReviews={4} />

      {/* 8. FAQ Section */}
      <HomeFAQSection />

      {/* 9. Locations Section */}
      <LocationsSection />

      {/* 10. Booking Section */}
      <BookingSection />

      {/* Footer is rendered in layout.tsx - no need to duplicate here */}
    </div>
  )
}
