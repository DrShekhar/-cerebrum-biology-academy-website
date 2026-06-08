import { Metadata } from 'next'
import Link from 'next/link'
import { Phone, MapPin, Clock, CheckCircle, Car, ArrowRight } from 'lucide-react'
import { GurgaonGurugramAreaSchema } from '@/components/seo/GurgaonGurugramAreaSchema'
import { CerebrumPersonSchema } from '@/components/seo/CerebrumPersonSchema'

export const metadata: Metadata = {
  title: 'NEET Coaching Sushant Lok Gurugram | 15 Min Drive',
  description:
    'Best NEET coaching near Sushant Lok Gurugram (Gurgaon). Just 15 min drive to M2K Sector 51. AIIMS faculty, 98% success rate. Perfect for Sushant Lok 1, 2, 3 residents. Call 88264-44334!',
  keywords: [
    'neet coaching sushant lok gurugram',
    'neet classes sushant lok gurgaon',
    'biology coaching sushant lok 1',
    'neet coaching sushant lok 2',
    'neet coaching sushant lok 3',
    'neet preparation sushant lok',
    'biology tuition sushant lok gurgaon',
  ],
  openGraph: {
    locale: 'en_IN',
    title: 'NEET Coaching Sushant Lok Gurugram',
    description: 'Best NEET coaching near Sushant Lok. Just 15 min from your home.',
    url: 'https://cerebrumbiologyacademy.com/neet-coaching-sushant-lok-gurugram',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/neet-coaching-sushant-lok-gurugram',
  },

  twitter: {
    card: 'summary_large_image' as const,
    title: 'NEET Coaching Sushant Lok Gurugram | 15 Min Drive',
    description: 'Best NEET coaching near Sushant Lok Gurugram (Gurgaon). Just 15 min drive to M2K Sector 51. AIIMS faculty, 98% success rate. Perfect for Sushant Lok 1, 2, 3 residents. Call 88264-44334!',
  },
}

const nearbyAreas = [
  { name: 'Sushant Lok 1', distance: '15 min drive' },
  { name: 'Sushant Lok 2', distance: '14 min drive' },
  { name: 'Sushant Lok 3', distance: '13 min drive' },
  { name: 'DLF Phase 4', distance: '16 min drive' },
  { name: 'Sector 43', distance: '12 min drive' },
  { name: 'Sector 56', distance: '10 min drive' },
]

const faqs = [
  {
    question:
      'My son studies at GD Goenka Sushant Lok or DPS Sushant Lok - can he reach Cerebrum directly after school?',
    answer:
      'Yes - this is one of our most common patterns. School ends around 2:30-3 PM at GD Goenka Sushant Lok and DPS Sushant Lok 1; students reach Sector 51 in 12-15 minutes by school bus drop or chauffeur. They have time for snacks and revision before the 5 PM evening batch begins. Several families have set up direct school-to-Cerebrum routing through their school transport.',
  },
  {
    question: 'How does the route differ from Sushant Lok 1, 2, and 3?',
    answer:
      'From Sushant Lok 1 (next to Sector 27/28): take Golf Course Road past Sector 42 to Sector 54 cloverleaf, then to Sector 51 - about 15 minutes. From Sushant Lok 2: cut via Sector 43 internal road to Sector 49, then to 51 - 13 minutes. From Sushant Lok 3 (closest to Sector 56): a quick run via Sector 56 to Sector 51 in 10-12 minutes. Phase 3 has the shortest commute by 5 minutes.',
  },
  {
    question: 'Are there families from my Sushant Lok block already enrolled?',
    answer:
      'Likely yes - the Sushant Lok cohort runs across all three phases plus the bordering Sectors 27, 28 and 43. Most Gurgaon families register their address as "Gurugram Sector 51, near M2K Corporate Park" on Google Maps for clean cab routing. We can share batch composition (number of students from each phase, schools represented) on a counselling call without revealing names.',
  },
  {
    question:
      'Sushant Lok internal roads have limited parking - can my driver wait near your center for pickup?',
    answer:
      'Yes - M2K Corporate Park has open parking on the Sector 51 side and a wider service lane than the cramped Sushant Lok internal lanes. Drivers wait comfortably for 5-10 minutes around 8 PM pickup without traffic-warden hassles. Many Sushant Lok 1 families specifically cite this as a relief versus their previous coaching center near Sector 14, where parking was a nightly problem.',
  },
]

export default function NEETCoachingSushantLokGurugram() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white">
      <CerebrumPersonSchema
        knowsAbout={['NEET Sushant Lok', 'NEET Biology Sushant Lok', 'Medical entrance coaching Sushant Lok']}
      />
      <GurgaonGurugramAreaSchema
        spelling="gurugram"
        pageSlug="neet-coaching-sushant-lok-gurugram"
        subArea="Sushant Lok"
      />
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-purple-800 to-purple-600 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <span className="inline-block bg-yellow-500 text-purple-900 px-4 py-1 rounded-full text-sm font-semibold mb-4">
              For Sushant Lok Residents
            </span>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              NEET Biology Coaching for Sushant Lok 1, 2 and 3 Residents
            </h1>
            <p className="text-lg md:text-xl text-purple-100 mb-4 leading-relaxed">
              Sushant Lok is a premium villa and high-rise community spanning three distinct phases
              and bordering Sectors 27, 28 and 43 - home to GD Goenka Sushant Lok and DPS Sushant
              Lok students. Cerebrum sits 7-9 km east at M2K Corporate Park, Sector 51, reachable in
              10-15 minutes depending on which phase you live in. Phase 3 is closest at 10 minutes;
              Phase 1 takes 15 via Golf Course Road past Sector 42.
            </p>
            <div className="flex items-center justify-center gap-2 text-yellow-300 mb-8">
              <Car className="w-5 h-5" />
              <span>13-18 min depending on phase</span>
            </div>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="tel:+918826444334"
                className="bg-yellow-500 text-purple-900 px-8 py-3 rounded-lg font-semibold flex items-center gap-2 hover:bg-yellow-400 transition"
              >
                <Phone className="w-5 h-5" />
                Call 88264-44334
              </a>
              <Link
                href="/neet-coaching-gurugram"
                className="bg-white/20 text-white px-8 py-3 rounded-lg font-semibold flex items-center gap-2 hover:bg-white/30 transition"
              >
                View All Locations
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Distance Info */}
      <section className="py-12 bg-white border-b">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-center mb-8">
            All Sushant Lok Phases & Nearby Areas
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-3xl mx-auto">
            {nearbyAreas.map((area, index) => (
              <div key={index} className="bg-purple-50 rounded-lg p-4 text-center">
                <p className="font-semibold">{area.name}</p>
                <p className="text-purple-600">{area.distance}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Why Sushant Lok Families Choose Us
          </h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <Car className="w-12 h-12 text-purple-600 mb-4" />
              <h3 className="text-xl font-bold mb-3">Convenient Location</h3>
              <p className="text-gray-600">
                15 min via Golf Course Road. Easier than going to crowded Sector 14 coaching
                centers.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <CheckCircle className="w-12 h-12 text-purple-600 mb-4" />
              <h3 className="text-xl font-bold mb-3">Premium Quality</h3>
              <p className="text-gray-600">
                Sushant Lok residents expect the best. AIIMS faculty, 25-student batches, modern
                facilities.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <Clock className="w-12 h-12 text-purple-600 mb-4" />
              <h3 className="text-xl font-bold mb-3">Flexible Timing</h3>
              <p className="text-gray-600">
                Evening and weekend batches designed for school-going students. Multiple timing
                options.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Center Location */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="md:flex">
              <div className="md:w-1/2 p-8">
                <h2 className="text-2xl font-bold mb-4">Our Location</h2>
                <div className="flex items-start gap-3 mb-4">
                  <MapPin className="w-5 h-5 text-purple-600 mt-1" />
                  <div>
                    <p className="font-semibold">M2K Corporate Park</p>
                    <p className="text-gray-600">Sector 51, Gurugram 122018</p>
                    <p className="text-sm text-purple-600 mt-1">7-9 km from Sushant Lok</p>
                  </div>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg mb-4">
                  <p className="text-sm text-purple-800">
                    <strong>Route:</strong> Sushant Lok → Golf Course Road → Sector 54/56 → Sector
                    51
                  </p>
                </div>
                <a
                  href="tel:+918826444334"
                  className="inline-flex items-center gap-2 bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-700 transition"
                >
                  <Phone className="w-5 h-5" />
                  Book Free Demo
                </a>
              </div>
              <div className="md:w-1/2">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3509.1234567890123!2d77.0712345!3d28.4123456!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sM2K%20Corporate%20Park%2C%20Sector%2051%2C%20Gurugram!5e0!3m2!1sen!2sin!4v1234567890"
                  width="100%"
                  height="300"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">FAQs for Sushant Lok Students</h2>
          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq, index) => (
              <details key={index} className="bg-white rounded-lg shadow-md group">
                <summary className="px-6 py-4 cursor-pointer font-semibold flex items-center justify-between hover:bg-gray-50">
                  {faq.question}
                  <span className="text-purple-600 group-open:rotate-180 transition-transform">
                    ▼
                  </span>
                </summary>
                <p className="px-6 pb-4 text-gray-600">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-purple-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Join 35+ Sushant Lok Students</h2>
          <p className="text-xl text-purple-100 mb-8">
            Book a free demo class. Your neighbors already trust us.
          </p>
          <a
            href="tel:+918826444334"
            className="inline-flex items-center gap-2 bg-yellow-500 text-purple-900 px-8 py-3 rounded-lg font-semibold hover:bg-yellow-400 transition"
          >
            <Phone className="w-5 h-5" />
            Call Now: 88264-44334
          </a>
        </div>
      </section>

      {/* Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: faqs.map((faq) => ({
              '@type': 'Question',
              name: faq.question,
              acceptedAnswer: { '@type': 'Answer', text: faq.answer },
            })),
          }),
        }}
      />
    </div>
  )
}
