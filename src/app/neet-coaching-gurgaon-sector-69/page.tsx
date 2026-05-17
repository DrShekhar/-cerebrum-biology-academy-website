import { Metadata } from 'next'
import Link from 'next/link'
import { Phone, MapPin, Car, ArrowRight, Building, Users, CheckCircle } from 'lucide-react'
import { GurgaonGurugramAreaSchema } from '@/components/seo/GurgaonGurugramAreaSchema'
import { CerebrumPersonSchema } from '@/components/seo/CerebrumPersonSchema'

export const metadata: Metadata = {
  title: 'NEET Coaching Sector 69 Gurgaon | 18 Min Drive',
  description:
    'Best NEET coaching near Sector 69 Gurgaon (Gurugram). Just 18 min drive to M2K Sector 51. New development area near Sohna Road. AIIMS faculty, 98% success rate. Call 88264-44334!',
  keywords: [
    'neet coaching sector 69 gurgaon',
    'neet classes sector 69 gurugram',
    'biology coaching sector 69',
    'neet preparation sector 69 gurgaon',
    'biology tuition sector 69',
    'neet coaching new gurugram sohna',
  ],
  openGraph: {
    locale: 'en_IN',
    title: 'NEET Coaching Sector 69 Gurgaon',
    description: 'Best NEET coaching near Sector 69. New Gurugram area.',
    url: 'https://cerebrumbiologyacademy.com/neet-coaching-gurgaon-sector-69',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/neet-coaching-gurgaon-sector-69',
  },
}

const nearbyAreas = [
  { name: 'Sector 68', distance: '16 min drive' },
  { name: 'Sector 70', distance: '17 min drive' },
  { name: 'Sector 71', distance: '20 min drive' },
  { name: 'Sohna Road', distance: '10 min drive' },
  { name: 'Subhash Chowk', distance: '13 min drive' },
  { name: 'Sector 51 (Our Location)', distance: '18 min drive' },
]

const faqs = [
  {
    question:
      'We live near M3M Sky City or Tata Primanti — what is the realistic morning drive to Sector 51?',
    answer:
      'From M3M Sky City and Tata Primanti, the 9 AM weekend batch drive to M2K Corporate Park, Sector 51 is around 17–20 minutes via Sohna Road and the Sector 56 service road. On weekdays for the 5 PM batch, plan 20–22 minutes because the Subhash Chowk merge slows down after 4:45 PM. Leaving by 4:30 PM keeps things stress-free.',
  },
  {
    question:
      'Sector 69 is close to KMP Expressway and IMT Manesar — does that affect Cerebrum logistics?',
    answer:
      'For families commuting in from IMT Manesar offices, the KMP–Sohna Road link makes the school-pickup-then-Cerebrum loop viable: parents can leave IMT by 4:15 PM, pick up the child near the Sector 69 society, and reach Sector 51 by 5 PM. We have a few Tata Primanti and M3M Sky City families running exactly this route, and our weekday batch holds attendance for up to 10 minutes for the IMT loop.',
  },
  {
    question:
      'Is the Sohna Road elevated stretch actually faster from Sector 69 than Golf Course Extension Road?',
    answer:
      'Yes, marginally. The Sohna Road elevated section, post-completion, gets you to Subhash Chowk in roughly 11 minutes from Sector 69, after which you cut left to Sector 51 in another 6–7 minutes. Golf Course Extension Road via Sector 67 is scenic but adds two signal-heavy junctions and tends to run 3–4 minutes longer on weekday evenings.',
  },
  {
    question:
      'Given the longer commute, should Sector 69 students consider hybrid (online + offline) attendance?',
    answer:
      'It is a sensible call for Class 11 students still building stamina. Our hybrid Sector 69 plan typically has students attend offline at M2K Sector 51 on Tuesday, Thursday and Saturday (anchor days for live problem-solving), with Monday/Wednesday/Friday switched to live online. By Class 12 most Sector 69 students move to fully offline once the syllabus weight makes the in-person sessions worth the 18-minute drive each way.',
  },
]

export default function NEETCoachingSector69Gurgaon() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-cyan-50 to-white">
      <CerebrumPersonSchema
        knowsAbout={['NEET Gurugram', 'NEET Biology Gurugram', 'Medical entrance coaching Gurugram']}
      />
      <GurgaonGurugramAreaSchema
        spelling="gurgaon"
        pageSlug="neet-coaching-gurgaon-sector-69"
        subArea="Sector 69"
      />
      <section className="bg-gradient-to-r from-cyan-700 to-cyan-600 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <span className="inline-block bg-yellow-500 text-cyan-900 px-4 py-1 rounded-full text-sm font-semibold mb-4">
              For Sector 69 Residents
            </span>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Sector 69 Sohna Road — AIIMS-Faculty NEET Coaching
            </h1>
            <p className="text-xl text-cyan-100 mb-4">
              Sector 69 sits further south on the Sohna Road corridor of new Gurgaon (officially
              Gurugram since 2016), anchored by M3M Sky City, Tata Primanti and the surrounding
              low-rise plotted pockets, with quick access to KMP Expressway and IMT Manesar. Our M2K
              Corporate Park, Sector 51 center is roughly a 17–20 minute drive via the Sohna Road
              elevated stretch and the Subhash Chowk left turn — long enough to plan around traffic,
              short enough to do daily.
            </p>
            <div className="flex items-center justify-center gap-2 text-yellow-300 mb-8">
              <Car className="w-5 h-5" />
              <span>15-18 min via Sohna Road / Golf Course Ext</span>
            </div>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="tel:+918826444334"
                className="bg-yellow-500 text-cyan-900 px-8 py-3 rounded-lg font-semibold flex items-center gap-2 hover:bg-yellow-400 transition"
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
          <h2 className="text-2xl font-bold text-center mb-8">Areas We Serve</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-3xl mx-auto">
            {nearbyAreas.map((area, index) => (
              <div key={index} className="bg-cyan-50 rounded-lg p-4 text-center">
                <p className="font-semibold">{area.name}</p>
                <p className="text-cyan-600">{area.distance}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Why Sector 69 Students Choose Us</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <Building className="w-12 h-12 text-cyan-600 mb-4" />
              <h3 className="text-xl font-bold mb-3">Quality Over Distance</h3>
              <p className="text-gray-600">
                18 min for AIIMS faculty is better than 5 min for average coaching.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <CheckCircle className="w-12 h-12 text-cyan-600 mb-4" />
              <h3 className="text-xl font-bold mb-3">Hybrid Option</h3>
              <p className="text-gray-600">
                Attend online when needed, offline for important classes. Best of both worlds.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <Users className="w-12 h-12 text-cyan-600 mb-4" />
              <h3 className="text-xl font-bold mb-3">Carpool Groups</h3>
              <p className="text-gray-600">
                Connect with students from Sector 68-72. Share rides and study together.
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
                  <MapPin className="w-5 h-5 text-cyan-600 mt-1" />
                  <div>
                    <p className="font-semibold">M2K Corporate Park</p>
                    <p className="text-gray-600">Sector 51, Gurugram 122018</p>
                    <p className="text-sm text-cyan-600 mt-1">8-9 km from Sector 69</p>
                  </div>
                </div>
                <div className="bg-cyan-50 p-4 rounded-lg mb-4">
                  <p className="text-sm text-cyan-800">
                    <strong>Best Route:</strong> Sector 69 → Sohna Road → Sector 49 → Sector 51
                  </p>
                </div>
                <a
                  href="tel:+918826444334"
                  className="inline-flex items-center gap-2 bg-cyan-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-cyan-700 transition"
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
          <h2 className="text-3xl font-bold text-center mb-12">FAQs for Sector 69 Students</h2>
          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq, index) => (
              <details key={index} className="bg-white rounded-lg shadow-md group">
                <summary className="px-6 py-4 cursor-pointer font-semibold flex items-center justify-between hover:bg-gray-50">
                  {faq.question}
                  <span className="text-cyan-600 group-open:rotate-180 transition-transform">
                    ▼
                  </span>
                </summary>
                <p className="px-6 pb-4 text-gray-600">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-cyan-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Join New Gurgaon Students</h2>
          <p className="text-xl text-cyan-100 mb-8">
            Book a free demo class. Quality matters more than distance.
          </p>
          <a
            href="tel:+918826444334"
            className="inline-flex items-center gap-2 bg-yellow-500 text-cyan-900 px-8 py-3 rounded-lg font-semibold hover:bg-yellow-400 transition"
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
