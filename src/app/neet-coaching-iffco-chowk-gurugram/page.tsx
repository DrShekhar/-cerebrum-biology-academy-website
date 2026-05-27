import { Metadata } from 'next'
import Link from 'next/link'
import { Phone, MapPin, Car, ArrowRight, Train, Building, Users } from 'lucide-react'
import { GurgaonGurugramAreaSchema } from '@/components/seo/GurgaonGurugramAreaSchema'
import { CerebrumPersonSchema } from '@/components/seo/CerebrumPersonSchema'

export const metadata: Metadata = {
  title: 'NEET Coaching IFFCO Chowk Gurugram | 12 Min Drive',
  description:
    'Best NEET coaching near IFFCO Chowk Gurugram (Gurgaon). Just 12 min drive to M2K Sector 51. Metro connected via Yellow Line. AIIMS faculty, 98% success rate. Call 88264-44334!',
  keywords: [
    'neet coaching iffco chowk gurugram',
    'neet classes iffco chowk gurgaon',
    'biology coaching near iffco chowk',
    'neet preparation iffco chowk',
    'neet coaching near iffco chowk metro',
    'biology tuition iffco chowk',
  ],
  openGraph: {
    locale: 'en_IN',
    title: 'NEET Coaching IFFCO Chowk Gurugram',
    description: 'Best NEET coaching near IFFCO Chowk. Metro connected.',
    url: 'https://cerebrumbiologyacademy.com/neet-coaching-iffco-chowk-gurugram',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/neet-coaching-iffco-chowk-gurugram',
  },

  twitter: { card: 'summary_large_image' as const },
}

const nearbyAreas = [
  { name: 'IFFCO Chowk', distance: '12 min drive' },
  { name: 'Sector 29', distance: '10 min drive' },
  { name: 'Sector 28', distance: '11 min drive' },
  { name: 'Signature Tower', distance: '13 min drive' },
  { name: 'Leisure Valley', distance: '14 min drive' },
  { name: 'Sector 31', distance: '15 min drive' },
]

const faqs = [
  {
    question:
      'I live in Sadar Bazar / Civil Lines side of old Gurugram - is the IFFCO Chowk route easier than going through DLF?',
    answer:
      'Yes, by a clear margin. Old Gurugram families typically reach IFFCO Chowk in 10-12 minutes via Hero Honda Chowk, then take Golf Course Road extension or the Sector 53-54 link to Sector 51. Total door-to-door is 22-25 minutes, versus 35+ minutes if you cut through DLF Phase 2-3 internal roads. We see this pattern from Civil Lines, Sector 4-7, and Jacobpura families weekly.',
  },
  {
    question:
      'Is the Yellow Line metro from IFFCO Chowk a viable daily commute for a NEET student?',
    answer:
      'It is. Board at IFFCO Chowk, exit at Sector 53-54 metro after 4 stops (~9 minutes), then a 10-minute shared auto to M2K Corporate Park. The full trip is 25-30 minutes and avoids NH-48 traffic entirely. Several DLF Phase 2 and Phase 3 students take this route specifically because it is rain-proof and predictable - critical when board exam mocks run on tight evening schedules.',
  },
  {
    question:
      'IFFCO Chowk sits between Old Gurugram and DLF - which feeder neighborhoods do most of your students come from?',
    answer:
      'Our IFFCO Chowk cohort draws from a mixed catchment: DLF Phase 1, 2 and 3 (the largest share), Sector 28-29 around Leisure Valley, Signature Tower side, and Sector 14-15 from old Gurgaon. Most Gurgaon families call our area "Gurugram Sector 51" on Google Maps when their drivers ask for directions. Several students carpool from Phase 2 weekly.',
  },
  {
    question: 'How do you handle the IFFCO Chowk bypass/NH-48 chaos for evening batches?',
    answer:
      'Our 5-8 PM batch starts after the worst NH-48 outflow window and we deliberately encourage Golf Course Road extension (not NH-48 service road) for IFFCO Chowk parents. For students who get caught in unexpected jams during monsoon or VIP movement closures, we offer same-day switch to the live online stream and recordings stay available for 7 days.',
  },
]

export default function NEETCoachingIFFCOChowkGurugram() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <CerebrumPersonSchema
        knowsAbout={['NEET Gurugram', 'NEET Biology Gurugram', 'Medical entrance coaching Gurugram']}
      />
      <GurgaonGurugramAreaSchema
        spelling="gurugram"
        pageSlug="neet-coaching-iffco-chowk-gurugram"
        subArea="Iffco Chowk"
      />
      <section className="bg-gradient-to-r from-blue-800 to-blue-600 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <span className="inline-flex items-center gap-2 bg-yellow-500 text-blue-900 px-4 py-1 rounded-full text-sm font-semibold mb-4">
              <Train className="w-4 h-4" />
              Metro Connected
            </span>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              IFFCO Chowk NEET Coaching - The Old Gurugram to DLF Bridge
            </h1>
            <p className="text-lg md:text-xl text-blue-100 mb-4 leading-relaxed">
              IFFCO Chowk is the gateway between old Gurugram (Sadar Bazar, Civil Lines, Sector 4-7)
              and the DLF Phase 1, 2 and 3 belt - and it is a Yellow Line metro stop on the NH-48
              bypass. Cerebrum sits 6-7 km east at M2K Corporate Park, Sector 51, reachable in 10-12
              minutes by car or 25-30 minutes via Yellow Line + auto from Sector 53-54 metro. The
              route works equally well from old Gurugram lanes or DLF towers.
            </p>
            <div className="flex items-center justify-center gap-2 text-yellow-300 mb-8">
              <Car className="w-5 h-5" />
              <span>10-12 min drive | Yellow Line Metro</span>
            </div>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="tel:+918826444334"
                className="bg-yellow-500 text-blue-900 px-8 py-3 rounded-lg font-semibold flex items-center gap-2 hover:bg-yellow-400 transition"
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

      <section className="py-12 bg-white border-b">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-center mb-8">IFFCO Chowk Area Coverage</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-3xl mx-auto">
            {nearbyAreas.map((area, index) => (
              <div key={index} className="bg-blue-50 rounded-lg p-4 text-center">
                <p className="font-semibold">{area.name}</p>
                <p className="text-blue-600">{area.distance}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Why IFFCO Chowk Students Choose Us
          </h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <Train className="w-12 h-12 text-blue-600 mb-4" />
              <h3 className="text-xl font-bold mb-3">Metro Access</h3>
              <p className="text-gray-600">
                Yellow Line to Sector 53-54 + short auto ride. Beat NH-48 traffic.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <Building className="w-12 h-12 text-blue-600 mb-4" />
              <h3 className="text-xl font-bold mb-3">Central Location</h3>
              <p className="text-gray-600">
                Closer than Sector 14 coaching hubs. Better infrastructure, less crowd.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <Users className="w-12 h-12 text-blue-600 mb-4" />
              <h3 className="text-xl font-bold mb-3">30+ IFFCO Students</h3>
              <p className="text-gray-600">
                Active community from Leisure Valley, Sector 29, and nearby areas.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="md:flex">
              <div className="md:w-1/2 p-8">
                <h2 className="text-2xl font-bold mb-4">Our Location</h2>
                <div className="flex items-start gap-3 mb-4">
                  <MapPin className="w-5 h-5 text-blue-600 mt-1" />
                  <div>
                    <p className="font-semibold">M2K Corporate Park</p>
                    <p className="text-gray-600">Sector 51, Gurugram 122018</p>
                    <p className="text-sm text-blue-600 mt-1">6-7 km from IFFCO Chowk</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 mb-4">
                  <Train className="w-5 h-5 text-blue-600 mt-1" />
                  <div>
                    <p className="font-semibold">Metro Route</p>
                    <p className="text-gray-600">IFFCO Chowk → Sector 53-54 Metro + Auto</p>
                  </div>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg mb-4">
                  <p className="text-sm text-blue-800">
                    <strong>By Car:</strong> IFFCO Chowk → Golf Course Road → Sector 51
                  </p>
                </div>
                <a
                  href="tel:+918826444334"
                  className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
                >
                  <Phone className="w-5 h-5" />
                  Book Free Demo
                </a>
              </div>
              <div className="md:w-1/2">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3509.1!2d77.07!3d28.41!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sM2K%20Corporate%20Park!5e0!3m2!1sen!2sin!4v1"
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

      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">FAQs for IFFCO Chowk Students</h2>
          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq, index) => (
              <details key={index} className="bg-white rounded-lg shadow-md group">
                <summary className="px-6 py-4 cursor-pointer font-semibold flex items-center justify-between hover:bg-gray-50">
                  {faq.question}
                  <span className="text-blue-600 group-open:rotate-180 transition-transform">
                    ▼
                  </span>
                </summary>
                <p className="px-6 pb-4 text-gray-600">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-blue-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Join 30+ IFFCO Chowk Students</h2>
          <p className="text-xl text-blue-100 mb-8">
            Book a free demo class. Metro connected, convenient timing.
          </p>
          <a
            href="tel:+918826444334"
            className="inline-flex items-center gap-2 bg-yellow-500 text-blue-900 px-8 py-3 rounded-lg font-semibold hover:bg-yellow-400 transition"
          >
            <Phone className="w-5 h-5" />
            Call Now: 88264-44334
          </a>
        </div>
      </section>

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
