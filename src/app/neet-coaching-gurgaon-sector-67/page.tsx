import { Metadata } from 'next'
import Link from 'next/link'
import { Phone, MapPin, CheckCircle, Car, ArrowRight, Users, Home } from 'lucide-react'
import { GurgaonGurugramAreaSchema } from '@/components/seo/GurgaonGurugramAreaSchema'
import { CerebrumPersonSchema } from '@/components/seo/CerebrumPersonSchema'

export const metadata: Metadata = {
  title: 'NEET Coaching Sector 67 Gurgaon | 15 Min Drive',
  description:
    'Best NEET coaching near Sector 67 Gurgaon (Gurugram). Just 15 min drive to M2K Sector 51. Premium residential area on Golf Course Extension. AIIMS faculty, 98% success. Call 88264-44334!',
  keywords: [
    'neet coaching sector 67 gurgaon',
    'neet classes sector 67 gurugram',
    'biology coaching sector 67',
    'neet preparation sector 67 gurgaon',
    'biology tuition sector 67',
    'neet coaching golf course extension',
  ],
  openGraph: {
    locale: 'en_IN',
    title: 'NEET Coaching Sector 67 Gurgaon',
    description: 'Best NEET coaching near Sector 67. Premium Golf Course Extension area.',
    url: 'https://cerebrumbiologyacademy.com/neet-coaching-gurgaon-sector-67',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/neet-coaching-gurgaon-sector-67',
  },

  twitter: {
    card: 'summary_large_image' as const,
    title: 'NEET Coaching Sector 67 Gurgaon | 15 Min Drive',
    description:
      'Best NEET coaching near Sector 67 Gurgaon (Gurugram). Just 15 min drive to M2K Sector 51. Premium residential area on Golf Course Extension. AIIMS faculty, 98% success. Call 88264-44334!',
  },
}

const nearbyAreas = [
  { name: 'Sector 66', distance: '14 min drive' },
  { name: 'Sector 68', distance: '16 min drive' },
  { name: 'Sector 70', distance: '17 min drive' },
  { name: 'Sohna Road', distance: '8 min drive' },
  { name: 'Subhash Chowk', distance: '11 min drive' },
  { name: 'Sector 51 (Our Location)', distance: '15 min drive' },
]

const faqs = [
  {
    question:
      'The Sohna elevated road and metro extension are coming — does that change the Sector 67 commute?',
    answer:
      'The Sohna elevated corridor already cuts the Subhash Chowk bottleneck on the Sector 67 side, which has shaved roughly 4–6 minutes off the drive to our M2K Sector 51 center. The proposed Gurgaon Metro extension along Sohna Road would matter more for parents than students, since our weekday batches end at 8 PM and Sector 67 families today rely on private cabs or self-drive rather than transit.',
  },
  {
    question:
      'Which Sector 67 schools send students to Cerebrum, and do batch timings clash with their dispersal?',
    answer:
      'Most of our Sector 67 NEET students come from Heritage Xperiential Sector 62, GD Goenka Sector 48, and Pathways World School (bus route from Sector 67). Heritage and GD Goenka disperse at 3:15 PM and 3:30 PM respectively, so the 5–8 PM weekday batch lands cleanly with a 90-minute home buffer for snacks and a quick recap before our 5 PM start.',
  },
  {
    question:
      'We live in Adani Samsara or M3M Sky City — is parking inside the gated community an issue for Cerebrum cab pickup?',
    answer:
      'Adani Samsara has a controlled visitor lane near Tower 1 where our shared evening cab does drop-offs without entering the resident parking. M3M Sky City is similar — drop-off happens at the boom barrier on the Sohna Road side rather than the inner clubhouse loop. Tulip Violet families typically use the Tulip side gate, which avoids the longer internal road.',
  },
  {
    question:
      'South Gurgaon is still developing — is there a meaningful Cerebrum peer group from Sector 67 specifically?',
    answer:
      'Yes — even though Sector 67 is younger than core Gurgaon, we have around 14 active students from Adani Samsara, M3M Sky City, Tulip Violet and the surrounding plotted pockets. Density is high enough that two of these families now share a weekday evening cab to Sector 51, and weekend Intensive students from Sector 67 typically know one or two batchmates already.',
  },
]

const premiumSocieties = [
  'M3M Golf Estate',
  'Ireo Grand Arch',
  'Emaar Palm Gardens',
  'Vatika Inxt',
  'BPTP Park Grandeura',
]

export default function NEETCoachingSector67Gurgaon() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white">
      <CerebrumPersonSchema
        knowsAbout={[
          'NEET Gurugram',
          'NEET Biology Gurugram',
          'Medical entrance coaching Gurugram',
        ]}
      />
      <GurgaonGurugramAreaSchema
        spelling="gurgaon"
        pageSlug="neet-coaching-gurgaon-sector-67"
        subArea="Sector 67"
      />
      <section className="bg-gradient-to-r from-amber-700 to-amber-600 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <span className="inline-block bg-white text-amber-700 px-4 py-1 rounded-full text-sm font-semibold mb-4">
              For Golf Course Extension Residents
            </span>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              South Gurgaon NEET Coaching — Sector 67
            </h1>
            <p className="text-xl text-amber-100 mb-4">
              Sector 67 is part of the South Gurgaon Sohna Road belt (the city is officially
              Gurugram since 2016) and is still maturing as a residential pocket, anchored by Adani
              Samsara, M3M Sky City and Tulip Violet alongside newer family-friendly projects. Our
              M2K Corporate Park, Sector 51 center is about a 15-minute drive via Sohna Road and the
              Golf Course Extension Road link, comfortable for both weekday evening and weekend
              Intensive batches.
            </p>
            <div className="flex items-center justify-center gap-2 text-yellow-300 mb-8">
              <Car className="w-5 h-5" />
              <span>12-15 min via Golf Course Extension Road</span>
            </div>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="tel:+918826444334"
                className="bg-white text-amber-700 px-8 py-3 rounded-lg font-semibold flex items-center gap-2 hover:bg-amber-50 transition"
              >
                <Phone className="w-5 h-5" />
                Call 88264-44334
              </a>
              <Link
                href="/neet-coaching-gurugram"
                className="bg-amber-800 text-white px-8 py-3 rounded-lg font-semibold flex items-center gap-2 hover:bg-amber-900 transition"
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
          <h2 className="text-xl font-bold text-center mb-6 text-gray-700">
            Students From Premium Societies
          </h2>
          <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
            {premiumSocieties.map((society) => (
              <span
                key={society}
                className="bg-amber-100 text-amber-700 px-4 py-2 rounded-lg text-sm font-medium"
              >
                {society}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-center mb-8">Golf Course Extension Areas</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-3xl mx-auto">
            {nearbyAreas.map((area, index) => (
              <div key={index} className="bg-white rounded-lg p-4 text-center shadow-sm">
                <p className="font-semibold">{area.name}</p>
                <p className="text-amber-600">{area.distance}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Why Premium Families Choose Us</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="bg-amber-50 p-6 rounded-xl">
              <Home className="w-12 h-12 text-amber-600 mb-4" />
              <h3 className="text-xl font-bold mb-3">Premium Standards</h3>
              <p className="text-gray-600">
                AC classrooms, modern infra, AIIMS faculty - matching Golf Course Extension
                lifestyle.
              </p>
            </div>
            <div className="bg-amber-50 p-6 rounded-xl">
              <Users className="w-12 h-12 text-amber-600 mb-4" />
              <h3 className="text-xl font-bold mb-3">Elite Peer Group</h3>
              <p className="text-gray-600">
                Study with kids from similar backgrounds - M3M, Ireo, Emaar residents.
              </p>
            </div>
            <div className="bg-amber-50 p-6 rounded-xl">
              <CheckCircle className="w-12 h-12 text-amber-600 mb-4" />
              <h3 className="text-xl font-bold mb-3">Proven Results</h3>
              <p className="text-gray-600">
                98% success rate. Multiple AIIMS/top medical college selections every year.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="md:flex">
              <div className="md:w-1/2 p-8">
                <h2 className="text-2xl font-bold mb-4">Our Location</h2>
                <div className="flex items-start gap-3 mb-4">
                  <MapPin className="w-5 h-5 text-amber-600 mt-1" />
                  <div>
                    <p className="font-semibold">M2K Corporate Park</p>
                    <p className="text-gray-600">Sector 51, Gurugram 122018</p>
                    <p className="text-sm text-amber-600 mt-1">7-8 km from Sector 67</p>
                  </div>
                </div>
                <div className="bg-amber-50 p-4 rounded-lg mb-4">
                  <p className="text-sm text-amber-800">
                    <strong>Route:</strong> Sector 67 → Golf Course Ext → Sector 56 → Sector 51
                  </p>
                </div>
                <a
                  href="tel:+918826444334"
                  className="inline-flex items-center gap-2 bg-amber-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-amber-700 transition"
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

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">FAQs for Sector 67 Students</h2>
          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq, index) => (
              <details key={index} className="bg-gray-50 rounded-lg shadow-md group">
                <summary className="px-6 py-4 cursor-pointer font-semibold flex items-center justify-between hover:bg-gray-100">
                  {faq.question}
                  <span className="text-amber-600 group-open:rotate-180 transition-transform">
                    ▼
                  </span>
                </summary>
                <p className="px-6 pb-4 text-gray-600">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-amber-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Join Golf Course Extension Students</h2>
          <p className="text-xl text-amber-100 mb-8">
            Book a free demo class. Experience premium NEET coaching.
          </p>
          <a
            href="tel:+918826444334"
            className="inline-flex items-center gap-2 bg-white text-amber-700 px-8 py-3 rounded-lg font-semibold hover:bg-amber-50 transition"
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
