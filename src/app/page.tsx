// ✨ CLEAN HOMEPAGE with TV-Style Notification Center
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
import { NotificationCenter } from '@/components/ui/NotificationCenter'
import { usePopupCoordinator } from '@/lib/ui/popupCoordinator'

export default function Home() {
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
      {/* 🎯 CLEAN, FOCUSED HOMEPAGE - TV-Style Notification System */}

      {/* Core sections only - clean experience */}
      <HeroSection />
      <TrustBadgesSection />
      <ValuePropositionSection />
      <CoursesSection />
      <TestimonialsSection />
      <FacultySection />
      <BookingSection />

      {/* 📺 TV-Style Notification Center - Single Point of Social Proof */}
      <NotificationCenter position="top-right" autoPlay={true} interval={8} maxWidth="340px" />

      {/* Exit Intent Popup - Coordinated through popup system */}
      {coordinatedExitIntent && (
        <ExitIntentPopup
          isVisible={true}
          onClose={handleExitIntentClose}
          onDownload={handleCatalogDownload}
        />
      )}

      {/* ELIMINATED ALL COMPETING ELEMENTS:
          ✅ Replaced SuccessNotifications spam with TV-style center
          ✅ Replaced LiveEnrollmentNotifications with TV-style center
          ✅ Replaced SuccessTicker with TV-style center
          ✅ Removed LocationDetector banner conflicts
          ✅ Removed ProgressiveProfilingWidget conflicts
          ✅ Removed Multiple PersonalizedContent sections
          ✅ Removed all video sections for performance
          ✅ Single clean notification experience
      */}
    </div>
  )
}
