// 🚨 EMERGENCY HOMEPAGE - Simplified, Clean, Usable Interface
'use client'

import { useState, useEffect } from 'react'
import { HeroSection } from '@/components/layout/HeroSection'
import { TrustBadgesSection } from '@/components/layout/TrustBadgesSection'
import { ValuePropositionSection } from '@/components/layout/ValuePropositionSection'
import { CoursesSection } from '@/components/layout/CoursesSection'
import { TestimonialsSection } from '@/components/layout/TestimonialsSection'
import { FacultySection } from '@/components/layout/FacultySection'
import { BookingSection } from '@/components/layout/BookingSection'
import { ExitIntentPopup, useExitIntent } from '@/components/ui/ExitIntentPopup'
import { usePopupCoordinator } from '@/lib/ui/popupCoordinator'

export default function EmergencyHomePage() {
  const { showExitIntent, hideExitIntent } = useExitIntent()
  const popupCoordinator = usePopupCoordinator()
  const [coordinatedExitIntent, setCoordinatedExitIntent] = useState(false)

  // Coordinate exit intent popup with other popups
  useEffect(() => {
    if (showExitIntent && popupCoordinator.canShowPopup('exit_intent')) {
      if (popupCoordinator.showPopup('exit_intent')) {
        setCoordinatedExitIntent(true)
      }
    }
  }, [showExitIntent, popupCoordinator])

  const handleExitIntentClose = () => {
    popupCoordinator.hidePopup('exit_intent')
    setCoordinatedExitIntent(false)
    hideExitIntent()
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
      {/* 🎯 CLEAN, FOCUSED HOMEPAGE - NO POPUP CONFLICTS */}

      {/* Core sections only - removed all conflicting elements */}
      <HeroSection />
      <TrustBadgesSection />
      <ValuePropositionSection />
      <CoursesSection />
      <TestimonialsSection />
      <FacultySection />
      <BookingSection />

      {/* ONLY Exit Intent Popup - Coordinated through popup system */}
      {coordinatedExitIntent && (
        <ExitIntentPopup
          isVisible={true}
          onClose={handleExitIntentClose}
          onDownload={handleCatalogDownload}
        />
      )}

      {/* REMOVED ALL COMPETING ELEMENTS:
          - SuccessNotifications (was causing right-side spam)
          - LiveEnrollmentNotifications (was causing left-side spam)
          - SuccessTicker (was blocking mobile bottom)
          - ProgressiveProfilingWidget (was conflicting with exit intent)
          - LocationDetector (was causing immediate popup)
          - Multiple PersonalizedContent sections (was adding clutter)
          - All video sections (was slowing page performance)
          - ParentTestimonialsSection (was duplicating testimonials)
          - PhotoGallerySection (was adding visual noise)
          - UrgencySection (was adding pressure without purpose)
      */}
    </div>
  )
}
