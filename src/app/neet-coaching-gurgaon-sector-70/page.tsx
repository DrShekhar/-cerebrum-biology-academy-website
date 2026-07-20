import { Metadata } from 'next'
import Link from 'next/link'
import { Phone, MapPin, Car, ArrowRight, Building, Users, CheckCircle } from 'lucide-react'
import { GurgaonGurugramAreaSchema } from '@/components/seo/GurgaonGurugramAreaSchema'
import { CerebrumPersonSchema } from '@/components/seo/CerebrumPersonSchema'

export const metadata: Metadata = {
  title: 'NEET Coaching Sector 70 Gurgaon | 17 Min Drive',
  description:
    'Best NEET coaching near Sector 70 Gurgaon (Gurugram). Just 17 min drive to M2K Sector 51. Premium SPR area with new developments. AIIMS faculty, 98% success rate. Call 88264-44334!',
  keywords: [
    'neet coaching sector 70 gurgaon',
    'neet classes sector 70 gurugram',
    'biology coaching sector 70',
    'neet preparation sector 70 gurgaon',
    'biology tuition sector 70',
    'neet coaching spr gurugram',
  ],
  openGraph: {
    locale: 'en_IN',
    title: 'NEET Coaching Sector 70 Gurgaon',
    description: 'Best NEET coaching near Sector 70. SPR area.',
    url: 'https://cerebrumbiologyacademy.com/neet-coaching-gurgaon-sector-70',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/neet-coaching-gurgaon-sector-70',
  },

  twitter: {
    card: 'summary_large_image' as const,
    title: 'NEET Coaching Sector 70 Gurgaon | 17 Min Drive',
    description:
      'Best NEET coaching near Sector 70 Gurgaon (Gurugram). Just 17 min drive to M2K Sector 51. Premium SPR area with new developments. AIIMS faculty, 98% success rate. Call 88264-44334!',
  },
}

const nearbyAreas = [
  { name: 'Sector 69', distance: '18 min drive' },
  { name: 'Sector 70A', distance: '20 min drive' },
  { name: 'Sector 71', distance: '21 min drive' },
  { name: 'Sohna Road', distance: '13 min drive' },
  { name: 'Subhash Chowk', distance: '15 min drive' },
  { name: 'Sector 51 (Our Location)', distance: '22 min drive' },
]

const faqs = [
  {
    question:
      'Sector 70 is mostly plotted-development — how do families typically arrange transport to Sector 51?',
    answer:
      'Sector 70 plotted-colony density is lower than the Sohna Road high-rise belt, so society-level shuttles and shared cabs do not pre-exist the way they do in Adani or Tata projects. In practice, our Sector 70 families self-drive in pairs — two households alternate weekday evenings — or use a dedicated school-cab operator that already runs the Sector 70 → Sector 51 corridor. We help connect new families with existing Sector 70 carpools when slots are open.',
  },
  {
    question:
      'Is the longer commute (around 22 minutes) actually workable for daily Class 12 NEET coaching?',
    answer:
      'For Class 12 it is, with one important caveat: weekday batches that run 5–8 PM put Sector 70 students back home around 8:35 PM, which only works if school dispersal is by 3 PM and the child has a 90-minute rest window. Families with longer school days (Pathways World, certain DPS branches) usually keep Class 11 on the weekend Intensive (Sat-Sun 9 AM–1 PM) and switch to weekday offline only in Class 12.',
  },
  {
    question: 'What is the realistic best-case route from Sector 70 to M2K Corporate Park?',
    answer:
      'Sector 70 → Sohna Road via the Sector 71 link → Subhash Chowk → Golf Course Extension Road → Sector 51. Off-peak that is 18–20 minutes, peak weekday evening it stretches to 24–26 minutes. The SPR (Southern Peripheral Road) variant via Sector 71 is slightly longer in distance but more predictable around 7 PM, which is when our weekday batch ends and parents start their pickup drive.',
  },
  {
    question:
      'How often do Sector 70 families switch to fully online if the commute becomes a problem?',
    answer:
      'In practice, very rarely past Class 11. Sector 70 students who try fully-online find the discipline harder to maintain through Class 12 NEET prep, and most return to offline at M2K Sector 51 by the second quarter. The compromise that works best is hybrid through Class 11 (live online Mon/Wed/Fri, offline Tue/Thu/Sat) and full offline once the Class 12 mock-test cycle starts in October.',
  },
]

export default function NEETCoachingSector70Gurgaon() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-50 to-white">
      <CerebrumPersonSchema
        knowsAbout={[
          'NEET Gurugram',
          'NEET Biology Gurugram',
          'Medical entrance coaching Gurugram',
        ]}
      />
      <GurgaonGurugramAreaSchema
        spelling="gurgaon"
        pageSlug="neet-coaching-gurgaon-sector-70"
        subArea="Sector 70"
      />
      <section className="bg-gradient-to-r from-rose-700 to-rose-600 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <span className="inline-block bg-yellow-500 text-rose-900 px-4 py-1 rounded-full text-sm font-semibold mb-4">
              For Sector 70 & SPR Residents
            </span>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Sector 70 NEET Biology Coaching for Plotted-Colony Families
            </h1>
            <p className="text-xl text-rose-100 mb-4">
              Sector 70 is part of the South Gurgaon plotted-development belt (the city is
              officially Gurugram since 2016) — a lower-density residential pocket of independent
              homes and small builder floors, distinct from the Sohna Road high-rise corridor next
              door. Our M2K Corporate Park, Sector 51 center is roughly a 22-minute drive via Sohna
              Road and Subhash Chowk; longer than most of new Gurgaon, but still very doable for
              daily weekday or weekend batches.
            </p>
            <div className="flex items-center justify-center gap-2 text-yellow-300 mb-8">
              <Car className="w-5 h-5" />
              <span>15-17 min via SPR / Golf Course Ext</span>
            </div>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="tel:+918826444334"
                className="bg-yellow-500 text-rose-900 px-8 py-3 rounded-lg font-semibold flex items-center gap-2 hover:bg-yellow-400 transition"
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
          <h2 className="text-2xl font-bold text-center mb-8">SPR & Nearby Areas</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-3xl mx-auto">
            {nearbyAreas.map((area, index) => (
              <div key={index} className="bg-rose-50 rounded-lg p-4 text-center">
                <p className="font-semibold">{area.name}</p>
                <p className="text-rose-600">{area.distance}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Why Sector 70 Students Choose Us</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <Building className="w-12 h-12 text-rose-600 mb-4" />
              <h3 className="text-xl font-bold mb-3">Weekend Intensive</h3>
              <p className="text-gray-600">
                Sat-Sun full batches minimize weekday travel. Complete syllabus in 2 days.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <CheckCircle className="w-12 h-12 text-rose-600 mb-4" />
              <h3 className="text-xl font-bold mb-3">Hybrid Learning</h3>
              <p className="text-gray-600">
                Mix of online and offline. Best for managing SPR traffic.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <Users className="w-12 h-12 text-rose-600 mb-4" />
              <h3 className="text-xl font-bold mb-3">Quality Teaching</h3>
              <p className="text-gray-600">
                AIIMS faculty worth the 17-min drive. No compromise on education.
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
                  <MapPin className="w-5 h-5 text-rose-600 mt-1" />
                  <div>
                    <p className="font-semibold">M2K Corporate Park</p>
                    <p className="text-gray-600">Sector 51, Gurugram 122018</p>
                    <p className="text-sm text-rose-600 mt-1">8-9 km from Sector 70</p>
                  </div>
                </div>
                <div className="bg-rose-50 p-4 rounded-lg mb-4">
                  <p className="text-sm text-rose-800">
                    <strong>Route:</strong> Sector 70 → SPR → Golf Course Ext → Sector 56 → Sector
                    51
                  </p>
                </div>
                <a
                  href="tel:+918826444334"
                  className="inline-flex items-center gap-2 bg-rose-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-rose-700 transition"
                >
                  <Phone className="w-5 h-5" />
                  Book Free Demo
                </a>
              </div>
              <div className="md:w-1/2">
                <iframe
                  src="https://www.google.com/maps?q=M2K+Corporate+Park,+Mayfield+Garden,+Sector+51,+Gurugram,+Haryana+122018&output=embed"
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
          <h2 className="text-3xl font-bold text-center mb-12">FAQs for Sector 70 Students</h2>
          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq, index) => (
              <details key={index} className="bg-white rounded-lg shadow-md group">
                <summary className="px-6 py-4 cursor-pointer font-semibold flex items-center justify-between hover:bg-gray-50">
                  {faq.question}
                  <span className="text-rose-600 group-open:rotate-180 transition-transform">
                    ▼
                  </span>
                </summary>
                <p className="px-6 pb-4 text-gray-600">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-rose-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Join SPR Area Students</h2>
          <p className="text-xl text-rose-100 mb-8">
            Book a free demo class. Weekend batches available.
          </p>
          <a
            href="tel:+918826444334"
            className="inline-flex items-center gap-2 bg-yellow-500 text-rose-900 px-8 py-3 rounded-lg font-semibold hover:bg-yellow-400 transition"
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
