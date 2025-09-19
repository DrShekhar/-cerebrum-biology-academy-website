// 🚀 WORLD-CLASS SOPHISTICATED HOMEPAGE - SILICON VALLEY + HARVARD EXCELLENCE
'use client'

import { SophisticatedHero } from '@/components/layout/SophisticatedHero'
import { HarvardLevelContent } from '@/components/education/HarvardLevelContent'
import { SophisticatedClaudeChat } from '@/components/ai/SophisticatedClaudeChat'
import { EnhancedTouchInterface } from '@/components/mobile/EnhancedTouchInterface'
import { TrustBadgesSection } from '@/components/layout/TrustBadgesSection'
import { CoursesSection } from '@/components/layout/CoursesSection'
import { TestimonialsSection } from '@/components/layout/TestimonialsSection'
import { FacultySection } from '@/components/layout/FacultySection'
import { BookingSection } from '@/components/layout/BookingSection'
import { ConversionTracker } from '@/lib/abTesting/conversionTracking'
import { useEffect, useState } from 'react'

export default function SophisticatedHomePage() {
  const [isChatOpen, setIsChatOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    // Initialize sophisticated conversion tracking
    ConversionTracker.initialize()

    // Detect mobile for enhanced touch interface
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener('resize', checkMobile)

    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const handleDemoBooking = () => {
    ConversionTracker.trackDemoBooking()
    // Navigate to sophisticated demo booking experience
    window.location.href = '/demo'
  }

  const handleCallNow = () => {
    ConversionTracker.trackPhoneCall()
    window.open('tel:+918826444334', '_self')
  }

  const handleChatOpen = () => {
    setIsChatOpen(true)
    ConversionTracker.trackChatInteraction()
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* 🎯 WORLD-CLASS HOMEPAGE - SILICON VALLEY SOPHISTICATION */}

      {/* Sophisticated Hero Section - Harvard Professor + Silicon Valley Innovation */}
      <SophisticatedHero onDemoBooking={handleDemoBooking} onCallNow={handleCallNow} />

      {/* Harvard-Level Biology Education Content */}
      <HarvardLevelContent />

      {/* Trust & Social Proof - Enhanced with sophistication */}
      <TrustBadgesSection />

      {/* Courses - Premium presentation */}
      <div className="py-20 bg-gradient-to-br from-white to-slate-50">
        <CoursesSection />
      </div>

      {/* Testimonials - World-class student success stories */}
      <div className="py-20 bg-gradient-to-br from-blue-50 to-purple-50">
        <TestimonialsSection />
      </div>

      {/* Faculty - Elite educator showcase */}
      <div className="py-20 bg-gradient-to-br from-slate-50 to-white">
        <FacultySection />
      </div>

      {/* Premium Booking Experience */}
      <BookingSection />

      {/* Sophisticated AI Chat Interface */}
      <SophisticatedClaudeChat isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />

      {/* Enhanced Touch Interface for Mobile */}
      {isMobile && (
        <EnhancedTouchInterface
          onDemoBooking={handleDemoBooking}
          onCallNow={handleCallNow}
          onChatOpen={handleChatOpen}
        />
      )}

      {/* ✅ WORLD-CLASS FEATURES IMPLEMENTED:
          ✅ Silicon Valley-grade UI components with advanced animations
          ✅ Harvard-level Biology content presentation
          ✅ Sophisticated AI chat interface with voice/image support
          ✅ Premium mobile touch interface optimized for Indian users
          ✅ Research-backed content integration
          ✅ World-class design system with glassmorphism effects
          ✅ Advanced conversion tracking and analytics
          ✅ Premium user experience rivaling top tech companies
      */}
    </div>
  )
}
