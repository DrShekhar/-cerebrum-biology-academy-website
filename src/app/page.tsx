// 🚨 EMERGENCY CLEAN HOMEPAGE - ZERO POPUP CHAOS
'use client'

import { HeroSection } from '@/components/layout/HeroSection'
import { TrustBadgesSection } from '@/components/layout/TrustBadgesSection'
import { ValuePropositionSection } from '@/components/layout/ValuePropositionSection'
import { CoursesSection } from '@/components/layout/CoursesSection'
import { TestimonialsSection } from '@/components/layout/TestimonialsSection'
import { FacultySection } from '@/components/layout/FacultySection'
import { BookingSection } from '@/components/layout/BookingSection'
import {
  PersonalizedCourseRecommendations,
  UserPreferenceModal,
} from '@/components/providers/PersonalizationProvider'
import { IntelligentChatbot } from '@/components/chat/IntelligentChatbot'

export default function OptimizedHomePage() {
  return (
    <div className="min-h-screen">
      {/* 🎯 OPTIMIZED HOMEPAGE - CLEAR HIERARCHY & SPACING */}

      {/* Hero Section - Primary focal point */}
      <HeroSection />

      {/* Trust & Social Proof - Build credibility immediately */}
      <TrustBadgesSection />

      {/* Value Proposition - Clear differentiation */}
      <div className="py-8">
        <ValuePropositionSection />
      </div>

      {/* Personalized Recommendations */}
      <div className="py-8 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <PersonalizedCourseRecommendations />
        </div>
      </div>

      {/* Courses - Core offering with enhanced presentation */}
      <div className="py-12 bg-gray-50">
        <CoursesSection />
      </div>

      {/* Social Proof - Student success stories */}
      <div className="py-8">
        <TestimonialsSection />
      </div>

      {/* Faculty - Expertise showcase */}
      <div className="py-12 bg-blue-50">
        <FacultySection />
      </div>

      {/* Conversion - Clear call-to-action */}
      <BookingSection />

      {/* Personalization Components */}
      <IntelligentChatbot />
      <UserPreferenceModal />

      {/* ✅ COMPLETELY REMOVED ALL POPUP SYSTEMS:
          ❌ ExitIntentPopup - removed completely
          ❌ SuccessNotifications - removed completely
          ❌ LiveEnrollmentNotifications - removed completely
          ❌ SuccessTicker - removed completely
          ❌ ProgressiveProfilingWidget - removed completely
          ❌ LocationDetector - removed completely
          ❌ PopupCoordinator logic - removed completely
          ❌ All useState/useEffect popup logic - removed completely

          ✅ PRESERVED CONVERSION ELEMENTS:
          ✅ 94.2% success rate in TrustBadges
          ✅ Demo booking CTAs in Booking section
          ✅ Phone number CTAs throughout
          ✅ All essential conversion sections
      */}
    </div>
  )
}
