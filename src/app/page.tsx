import { HeroSection } from '@/components/layout/HeroSection'
import { CoursesSection } from '@/components/layout/CoursesSection'
import { BookingSection } from '@/components/layout/BookingSection'
import { Footer } from '@/components/layout/Footer'

export default function Home() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <CoursesSection />
      <BookingSection />
      <Footer />
    </div>
  )
}
