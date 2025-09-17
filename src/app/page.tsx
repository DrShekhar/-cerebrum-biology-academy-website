// Optimized homepage flow for maximum conversion - Phase 1.4 Implementation
'use client'

import { HeroSection } from '@/components/layout/HeroSection'
import { TrustBadgesSection } from '@/components/layout/TrustBadgesSection'
import { ValuePropositionSection } from '@/components/layout/ValuePropositionSection'
import { CoursesSection } from '@/components/layout/CoursesSection'
import { UrgencySection } from '@/components/layout/UrgencySection'
import { TestimonialsSection } from '@/components/layout/TestimonialsSection'
import { FacultySection } from '@/components/layout/FacultySection'
import { BookingSection } from '@/components/layout/BookingSection'
import { ExitIntentPopup, useExitIntent } from '@/components/ui/ExitIntentPopup'

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
      {/* Optimized Flow: Hero → Social Proof → Value Proposition → Courses → Urgency → Booking */}
      <HeroSection />
      <TrustBadgesSection />
      <ValuePropositionSection />
      <CoursesSection />
      <UrgencySection />
      <TestimonialsSection />
      <FacultySection />
      <BookingSection />

      {/* Exit Intent Popup for Lead Capture */}
      <ExitIntentPopup
        isVisible={showExitIntent}
        onClose={hideExitIntent}
        onDownload={handleCatalogDownload}
      />
    </div>
  )
}
