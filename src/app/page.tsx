import type { Metadata } from 'next'
import { generatePageMetadata } from '@/lib/seo/metadata'
import { OptimizedHeroSection } from '@/components/layout/OptimizedHeroSection'
import { CoursesSection } from '@/components/layout/CoursesSection'
import { FacultySection } from '@/components/layout/FacultySection'
import { RealStudentTestimonials } from '@/components/testimonials/RealStudentTestimonials'
import { LocationsSection } from '@/components/locations/LocationsSection'
import { BookingSection } from '@/components/layout/BookingSection'
import { Footer } from '@/components/layout/Footer'
import { TrustSignalsBanner } from '@/components/trust/TrustSignalsBanner'
import { GoogleReviewsWidget } from '@/components/social-proof/GoogleReviewsWidget'
import { LiveActivityFeed } from '@/components/social-proof/LiveActivityFeed'
import { SuccessNotifications } from '@/components/ui/SuccessNotifications'
import { LiveEnrollmentNotifications } from '@/components/ui/LiveEnrollmentNotifications'
import { realTestimonials } from '@/data/realTestimonials'
import Link from 'next/link'

export const metadata: Metadata = generatePageMetadata('home')

export default function Home() {
  return (
    <div className="min-h-screen">
      <OptimizedHeroSection />

      {/* Trust Signals Banner - Compact Version */}
      <TrustSignalsBanner variant="compact" />

      {/* Live Activity Feed - Floating */}
      <LiveActivityFeed variant="floating" />

      {/* Success Notifications - Top Right with Coordination */}
      <SuccessNotifications
        maxNotifications={5}
        displayDuration={3}
        notificationInterval={10}
        useCoordination={true}
      />

      {/* Live Enrollment Notifications - Top Left with Coordination */}
      <LiveEnrollmentNotifications
        showDuration={5}
        notificationInterval={15}
        maxVisible={3}
        useCoordination={true}
      />

      <CoursesSection />
      <FacultySection />

      {/* Trust Signals Full Section */}
      <TrustSignalsBanner variant="full" showVerificationBadges={true} />

      <RealStudentTestimonials
        testimonials={realTestimonials}
        title="Real Student Success Stories"
        subtitle="Hear directly from our NEET toppers who achieved their dreams"
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
