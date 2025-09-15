// Force deployment rebuild - 2025-09-16 15:30
import { HeroSection } from '@/components/layout/HeroSection'
import { CoursesSection } from '@/components/layout/CoursesSection'
import { FacultySection } from '@/components/layout/FacultySection'
import { TestimonialsSection } from '@/components/layout/TestimonialsSection'
import { TrustBadgesSection } from '@/components/layout/TrustBadgesSection'
import { BookingSection } from '@/components/layout/BookingSection'
import { Footer } from '@/components/layout/Footer'

export default function Home() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <TrustBadgesSection />
      <CoursesSection />
      <FacultySection />
      <TestimonialsSection />
      <BookingSection />
      <Footer />
    </div>
  )
}
