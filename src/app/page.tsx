// Optimized homepage flow for maximum conversion - Phase 1.4 Implementation
import { HeroSection } from '@/components/layout/HeroSection'
import { TrustBadgesSection } from '@/components/layout/TrustBadgesSection'
import { ValuePropositionSection } from '@/components/layout/ValuePropositionSection'
import { CoursesSection } from '@/components/layout/CoursesSection'
import { UrgencySection } from '@/components/layout/UrgencySection'
import { TestimonialsSection } from '@/components/layout/TestimonialsSection'
import { FacultySection } from '@/components/layout/FacultySection'
import { BookingSection } from '@/components/layout/BookingSection'

export default function Home() {
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
    </div>
  )
}
