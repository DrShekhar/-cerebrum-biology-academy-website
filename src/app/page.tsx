// Optimized homepage flow for maximum conversion - Phase 1.4 Implementation
'use client'

import { HeroSection } from '@/components/layout/HeroSection'
import { TrustBadgesSection } from '@/components/layout/TrustBadgesSection'
import { ValuePropositionSection } from '@/components/layout/ValuePropositionSection'
import { CoursesSection } from '@/components/layout/CoursesSection'
import { UrgencySection } from '@/components/layout/UrgencySection'
import { TestimonialsSection } from '@/components/layout/TestimonialsSection'
import { ParentTestimonialsSection } from '@/components/layout/ParentTestimonialsSection'
import { PhotoGallerySection } from '@/components/layout/PhotoGallerySection'
import { NEETToppersShowcase } from '@/components/layout/NEETToppersShowcase'
import { FacultySection } from '@/components/layout/FacultySection'
import { FacultyVideoSection } from '@/components/layout/FacultyVideoSection'
import { CompactVideoLectures } from '@/components/layout/CompactVideoLectures'
import { BookingSection } from '@/components/layout/BookingSection'
import { ExitIntentPopup, useExitIntent } from '@/components/ui/ExitIntentPopup'
import { SuccessNotifications, SuccessTicker } from '@/components/ui/SuccessNotifications'
import { LiveEnrollmentNotifications } from '@/components/ui/LiveEnrollmentNotifications'
import { LocationDetector } from '@/components/location/LocationDetector'
import { ProgressiveProfilingWidget } from '@/components/profiling/ProgressiveProfilingWidget'
import { PersonalizedContent } from '@/components/profiling/PersonalizedContent'

export default function Home() {
  const { showExitIntent, hideExitIntent } = useExitIntent()

  const handleCatalogDownload = async (email: string, phone: string) => {
    try {
      const response = await fetch('/api/catalog/download', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          phone,
          source: 'exit_intent_popup',
          utm_source: 'website',
          utm_medium: 'popup',
          utm_campaign: 'exit_intent_catalog',
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to request catalog')
      }

      const result = await response.json()
      console.log('Catalog download successful:', result)

      // Track successful conversion
      if (window.gtag) {
        window.gtag('event', 'catalog_download', {
          method: 'exit_intent_popup',
          value: 1,
        })
      }
    } catch (error) {
      console.error('Catalog download error:', error)
      throw error
    }
  }

  return (
    <div className="min-h-screen">
      {/* Location-based targeting banner */}
      <LocationDetector showBanner={true} />

      {/* Optimized Flow: Hero → Social Proof → Value Proposition → Courses → Urgency → Booking */}
      <HeroSection />
      <PersonalizedContent section="hero" className="py-8" />
      <TrustBadgesSection />
      <ValuePropositionSection />
      <PersonalizedContent section="courses" className="py-16 px-4 bg-gray-50" />
      <CoursesSection />
      <PersonalizedContent section="recommendations" className="py-16 px-4" />
      <UrgencySection />
      <PersonalizedContent section="urgency" className="py-8 px-4" />
      <TestimonialsSection />
      <PersonalizedContent section="testimonials" className="py-16 px-4 bg-gray-50" />
      <NEETToppersShowcase maxToppers={6} showVideos={true} />
      <ParentTestimonialsSection />
      <PhotoGallerySection showFeaturedOnly={true} maxPhotos={8} />
      <FacultyVideoSection />
      <CompactVideoLectures />
      <FacultySection />
      <BookingSection />

      {/* Exit Intent Popup for Lead Capture */}
      <ExitIntentPopup
        isVisible={showExitIntent}
        onClose={hideExitIntent}
        onDownload={handleCatalogDownload}
      />

      {/* Real-time Success Notifications - Shows only during initial loading */}
      <SuccessNotifications maxNotifications={10} displayDuration={5} notificationInterval={8} />

      {/* Live Enrollment Notifications - Shows enrollment activity */}
      <LiveEnrollmentNotifications showDuration={8} notificationInterval={12} maxVisible={5} />

      {/* Mobile Success Ticker */}
      <SuccessTicker />

      {/* Progressive Profiling Widget */}
      <ProgressiveProfilingWidget showDelay={15000} position="bottom-right" />
    </div>
  )
}
