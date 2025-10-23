import { OptimizedHeroSection } from '@/components/layout/OptimizedHeroSection'
import { CoursesSection } from '@/components/layout/CoursesSection'
import { FacultySection } from '@/components/layout/FacultySection'
import { RealStudentTestimonials } from '@/components/testimonials/RealStudentTestimonials'
import { LocationsSection } from '@/components/locations/LocationsSection'
import { BookingSection } from '@/components/layout/BookingSection'
import { Footer } from '@/components/layout/Footer'
import { realTestimonials } from '@/data/realTestimonials'
import Link from 'next/link'

export default function Home() {
  return (
    <div className="min-h-screen">
      <OptimizedHeroSection />
      <CoursesSection />
      <FacultySection />
      <RealStudentTestimonials
        testimonials={realTestimonials}
        title="Real Student Success Stories"
        subtitle="Hear directly from our NEET toppers who achieved their dreams"
      />
      <LocationsSection />

      {/* Photo Gallery CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">See Our Academy in Action</h2>
          <p className="text-xl mb-8 opacity-90">
            Explore our facilities, events, and achievements through our photo gallery
          </p>
          <Link
            href="/gallery"
            className="inline-block bg-white text-blue-600 px-8 py-4 rounded-full font-bold hover:bg-gray-100 transition-all duration-300 shadow-lg"
          >
            View Photo Gallery
          </Link>
        </div>
      </section>

      <BookingSection />
      <Footer />
    </div>
  )
}
