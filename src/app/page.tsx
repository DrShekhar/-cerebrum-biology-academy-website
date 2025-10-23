import { OptimizedHeroSection } from '@/components/layout/OptimizedHeroSection'
import { CoursesSection } from '@/components/layout/CoursesSection'
import { FacultySection } from '@/components/layout/FacultySection'
import { TestimonialsSection } from '@/components/layout/TestimonialsSection'
import { BookingSection } from '@/components/layout/BookingSection'
import { Footer } from '@/components/layout/Footer'

export default function Home() {
  return (
    <div className="min-h-screen">
      <OptimizedHeroSection />
      <CoursesSection />
      <FacultySection />
      <TestimonialsSection />
      <BookingSection />
      <Footer />
    </div>
  )
}
