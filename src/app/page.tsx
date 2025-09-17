// Phase 1 Implementation: Popup Coordination Integration
'use client'

import { useState, useEffect } from 'react'
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
import { usePopupCoordinator } from '@/lib/ui/popupCoordinator'

export default function Home() {
  const { showExitIntent, hideExitIntent } = useExitIntent()
  const popupCoordinator = usePopupCoordinator()
  const [coordinatedExitIntent, setCoordinatedExitIntent] = useState(false)
  const [coordinatedProgressive, setCoordinatedProgressive] = useState(false)

  // Coordinate exit intent popup with other popups
  useEffect(() => {
    if (showExitIntent && popupCoordinator.canShowPopup('exit_intent')) {
      if (popupCoordinator.showPopup('exit_intent')) {
        setCoordinatedExitIntent(true)
      }
    }
  }, [showExitIntent, popupCoordinator])

  // Handle progressive profiling coordination
  useEffect(() => {
    const timer = setTimeout(() => {
      if (popupCoordinator.canShowPopup('progressive_profiling')) {
        if (popupCoordinator.showPopup('progressive_profiling')) {
          setCoordinatedProgressive(true)
        }
      }
    }, 15000) // 15 second delay

    return () => clearTimeout(timer)
  }, [popupCoordinator])

  const handleExitIntentClose = () => {
    popupCoordinator.hidePopup('exit_intent')
    setCoordinatedExitIntent(false)
    hideExitIntent()
  }

  const handleProgressiveClose = () => {
    popupCoordinator.hidePopup('progressive_profiling')
    setCoordinatedProgressive(false)
  }

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
      {/* Phase 1: Coordinated location detection */}
      <LocationDetector showBanner={true} useCoordination={true} />

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

      {/* Phase 1: Coordinated Exit Intent Popup */}
      {coordinatedExitIntent && (
        <ExitIntentPopup
          isVisible={true}
          onClose={handleExitIntentClose}
          onDownload={handleCatalogDownload}
        />
      )}

      {/* Phase 1: Reduced density notifications with coordination */}
      <SuccessNotifications
        maxNotifications={3}
        displayDuration={5}
        notificationInterval={15}
        useCoordination={true}
      />

      {/* Phase 1: Reduced live enrollment notifications */}
      <LiveEnrollmentNotifications
        showDuration={8}
        notificationInterval={18}
        maxVisible={2}
        useCoordination={true}
      />

      {/* Phase 1: Coordinated mobile success ticker */}
      <SuccessTicker useCoordination={true} />

      {/* Phase 1: Coordinated progressive profiling */}
      {coordinatedProgressive && (
        <ProgressiveProfilingWidget position="bottom-right" onClose={handleProgressiveClose} />
      )}
    </div>
  )
}
