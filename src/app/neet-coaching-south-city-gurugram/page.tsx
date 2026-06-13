import { Metadata } from 'next'
import Link from 'next/link'
import { Phone, MapPin, Clock, CheckCircle, Car, ArrowRight } from 'lucide-react'
import { GurgaonGurugramAreaSchema } from '@/components/seo/GurgaonGurugramAreaSchema'
import { CerebrumPersonSchema } from '@/components/seo/CerebrumPersonSchema'

export const metadata: Metadata = {
  title: 'NEET Coaching South City Gurugram | 12 Min Drive',
  description:
    'Best NEET coaching near South City Gurugram (Gurgaon). Just 12 min drive to M2K Sector 51. AIIMS faculty, 98% success rate. Perfect for South City 1 & 2 residents. Call 88264-44334!',
  keywords: [
    'neet coaching south city gurugram',
    'neet classes south city gurgaon',
    'biology coaching south city 1',
    'neet coaching south city 2',
    'neet preparation south gurugram',
    'biology tuition south city gurgaon',
    'neet classes sector 41 gurugram',
  ],
  openGraph: {
    locale: 'en_IN',
    title: 'NEET Coaching South City Gurugram',
    description: 'Best NEET coaching near South City. Just 12 min from your home.',
    url: 'https://cerebrumbiologyacademy.com/neet-coaching-south-city-gurugram',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/neet-coaching-south-city-gurugram',
  },

  twitter: {
    card: 'summary_large_image' as const,
    title: 'NEET Coaching South City Gurugram | 12 Min Drive',
    description:
      'Best NEET coaching near South City Gurugram (Gurgaon). Just 12 min drive to M2K Sector 51. AIIMS faculty, 98% success rate. Perfect for South City 1 & 2 residents. Call 88264-44334!',
  },
}

const nearbyAreas = [
  { name: 'South City 1', distance: '12 min drive' },
  { name: 'South City 2', distance: '14 min drive' },
  { name: 'Sector 41', distance: '10 min drive' },
  { name: 'Sector 43', distance: '12 min drive' },
  { name: 'Sushant Lok 1', distance: '15 min drive' },
  { name: 'Sector 45', distance: '14 min drive' },
]

const faqs = [
  {
    question:
      'Should South City 1 students target M2K Sector 51, or are MG Road metro commute options better?',
    answer:
      'For Class 11-12 daily classes, the M2K Sector 51 centre is the more practical choice for South City 1 (Sector 41) families. The drive is 6-7 km via Sohna Road and takes 12-15 minutes. MG Road Metro is closer to your colony, but Sector 51 is not on a metro line, so the metro route ends up being a longer combined commute than just driving via Sector 49 to 50.',
  },
  {
    question:
      'How does the commute differ for South City 2 (Sector 49) versus South City 1 (Sector 41) students?',
    answer:
      'South City 2 sits in Sector 49, directly adjacent to Sector 50 and 51, so the drive to M2K is barely 4-5 km and 8-10 minutes off Sohna Road. South City 1 in Sector 41 is older and slightly further at 6-7 km via Subhash Chowk. South City 2 students can comfortably make our 5 PM evening batch even on a school day finishing at 3:30 PM.',
  },
  {
    question:
      'South City Phase 1 has been around since the 1980s — do you teach the older NCERT pattern many parents grew up with?',
    answer:
      'Our curriculum is built on the latest NCERT Class 11 and 12 Biology aligned to the current NMC NEET syllabus, but we explain concepts in the same first-principles way many South City parents remember from their own school years. Long-time Sector 41 residents in South City 1 often appreciate that we teach human physiology and genetics with proper diagrams and derivations, not just MCQ shortcuts.',
  },
  {
    question:
      'Do South City families and Sushant Lok 1 students share batches and carpools at Cerebrum?',
    answer:
      'Yes. South City 1, South City 2, Sushant Lok 1 and Sector 43-45 students often end up in the same evening or Saturday morning batch because they share the Sohna Road and Golf Course Extension corridor. Several parents have organised informal carpool rotations, especially for the 5-8 PM weekday slot, so the per-family drive load drops to two days a week.',
  },
]

export default function NEETCoachingSouthCityGurugram() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white">
      <CerebrumPersonSchema
        knowsAbout={[
          'NEET Gurugram',
          'NEET Biology Gurugram',
          'Medical entrance coaching Gurugram',
        ]}
      />
      <GurgaonGurugramAreaSchema
        spelling="gurugram"
        pageSlug="neet-coaching-south-city-gurugram"
        subArea="South City"
      />
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-orange-700 to-orange-600 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <span className="inline-block bg-white text-orange-700 px-4 py-1 rounded-full text-sm font-semibold mb-4">
              For South City Residents
            </span>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              NEET Preparation Tailored to South City Gurugram — Phase 1, Phase 2 and Sector 41-49
              Students
            </h1>
            <p className="text-xl text-orange-100 mb-4">
              South City is really two neighbourhoods: South City Phase 1 in Sector 41, an
              established old Gurgaon (now Gurugram) township close to the MG Road Metro corridor,
              and the newer South City Phase 2 in Sector 49 sharing a wall with Sector 50. Our M2K
              Corporate Park centre in Sector 51 is 4-7 km away depending on which phase you live
              in, an easy 8-15 minute drive via Sohna Road for serious Class 11-12 Biology prep.
            </p>
            <div className="flex items-center justify-center gap-2 text-yellow-300 mb-8">
              <Car className="w-5 h-5" />
              <span>12-15 min via Sohna Road</span>
            </div>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="tel:+918826444334"
                className="bg-white text-orange-700 px-8 py-3 rounded-lg font-semibold flex items-center gap-2 hover:bg-orange-50 transition"
              >
                <Phone className="w-5 h-5" />
                Call 88264-44334
              </a>
              <Link
                href="/neet-coaching-gurugram"
                className="bg-orange-800 text-white px-8 py-3 rounded-lg font-semibold flex items-center gap-2 hover:bg-orange-900 transition"
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
          <h2 className="text-2xl font-bold text-center mb-8">Areas We Serve Near South City</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-3xl mx-auto">
            {nearbyAreas.map((area, index) => (
              <div key={index} className="bg-orange-50 rounded-lg p-4 text-center">
                <p className="font-semibold">{area.name}</p>
                <p className="text-orange-600">{area.distance}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Why South City Students Choose Us
          </h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <Car className="w-12 h-12 text-orange-600 mb-4" />
              <h3 className="text-xl font-bold mb-3">Easy Commute</h3>
              <p className="text-gray-600">
                12 min via Sohna Road. Closer than Sector 14 coaching hubs with less traffic.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <CheckCircle className="w-12 h-12 text-orange-600 mb-4" />
              <h3 className="text-xl font-bold mb-3">Quality Assured</h3>
              <p className="text-gray-600">
                South City families value quality. AIIMS faculty, 25-student batches, 98% success.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <Clock className="w-12 h-12 text-orange-600 mb-4" />
              <h3 className="text-xl font-bold mb-3">Convenient Timings</h3>
              <p className="text-gray-600">
                Evening (5-8 PM) perfect for school students. Weekend batches avoid traffic.
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
                  <MapPin className="w-5 h-5 text-orange-600 mt-1" />
                  <div>
                    <p className="font-semibold">M2K Corporate Park</p>
                    <p className="text-gray-600">Sector 51, Gurugram 122018</p>
                    <p className="text-sm text-orange-600 mt-1">6-7 km from South City</p>
                  </div>
                </div>
                <div className="bg-orange-50 p-4 rounded-lg mb-4">
                  <p className="text-sm text-orange-800">
                    <strong>Best Route:</strong> South City → Sohna Road → Sector 49 → Sector 51 →
                    M2K
                  </p>
                </div>
                <a
                  href="tel:+918826444334"
                  className="inline-flex items-center gap-2 bg-orange-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-orange-700 transition"
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
          <h2 className="text-3xl font-bold text-center mb-12">FAQs for South City Students</h2>
          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq, index) => (
              <details key={index} className="bg-white rounded-lg shadow-md group">
                <summary className="px-6 py-4 cursor-pointer font-semibold flex items-center justify-between hover:bg-gray-50">
                  {faq.question}
                  <span className="text-orange-600 group-open:rotate-180 transition-transform">
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
      <section className="py-16 bg-orange-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Join 40+ South City Students</h2>
          <p className="text-xl text-orange-100 mb-8">
            Book a free demo class. Your neighbors already trust us.
          </p>
          <a
            href="tel:+918826444334"
            className="inline-flex items-center gap-2 bg-white text-orange-700 px-8 py-3 rounded-lg font-semibold hover:bg-orange-50 transition"
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
