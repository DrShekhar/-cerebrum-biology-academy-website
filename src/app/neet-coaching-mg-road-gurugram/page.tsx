import { Metadata } from 'next'
import Link from 'next/link'
import { Phone, MapPin, Clock, Car, ArrowRight, Train, ShoppingBag } from 'lucide-react'

export const metadata: Metadata = {
  title: 'NEET Coaching MG Road Gurugram | 15 Min Drive',
  description:
    'Best NEET coaching near MG Road Gurugram. Just 15 min drive to M2K Sector 51. Metro accessible via Yellow Line. AIIMS faculty, 98% success rate. Call 88264-44334!',
  keywords: [
    'neet coaching mg road gurugram',
    'neet classes mg road gurgaon',
    'biology coaching mg road gurugram',
    'neet coaching near mg road metro',
    'neet preparation mg road',
    'biology tuition mg road gurgaon',
    'neet classes near mgf mall',
    'medical coaching mg road gurugram',
  ],
  openGraph: {
    title: 'NEET Coaching MG Road Gurugram',
    description: 'Best NEET coaching near MG Road. Just 15 min from MG Road Metro.',
    url: 'https://cerebrumbiologyacademy.com/neet-coaching-mg-road-gurugram',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/neet-coaching-mg-road-gurugram',
  },
}

const nearbyAreas = [
  { name: 'MG Road Metro', distance: '15 min drive' },
  { name: 'MGF Metropolitan', distance: '15 min drive' },
  { name: 'Sahara Mall', distance: '14 min drive' },
  { name: 'Sikanderpur', distance: '12 min drive' },
  { name: 'DLF Phase 1', distance: '10 min drive' },
  { name: 'Sector 28', distance: '14 min drive' },
]

const faqs = [
  {
    question: 'How far is Cerebrum from MG Road?',
    answer:
      'Our center at M2K Corporate Park, Sector 51 is approximately 8-10 km from MG Road. By car, it takes 15-18 minutes via Golf Course Road. Metro + cab option also available for students.',
  },
  {
    question: 'Is MG Road Metro station connected to your center?',
    answer:
      'MG Road Metro (Yellow Line) is well-connected. From MG Road station, take Rapid Metro to Sector 54-55, then 10 min auto to our center. Total journey: 25-30 min by public transport.',
  },
  {
    question: 'What are the best timings for MG Road area students?',
    answer:
      'Evening batch (5-8 PM) is popular - less traffic after 4 PM. Weekend batch (Sat-Sun 9 AM - 1 PM) avoids weekday congestion. We also offer online classes for ultimate flexibility.',
  },
  {
    question: 'Are there students from MG Road area at Cerebrum?',
    answer:
      'Yes! We have 45+ students from MG Road, Sikanderpur, DLF Phase 1, and nearby sectors. Many travel together via Metro + shared cab.',
  },
]

const landmarks = [
  'MGF Metropolitan Mall',
  'Sahara Mall',
  'MG Road Metro Station',
  'Sikanderpur Metro',
  'IFFCO Chowk',
  'Ambience Mall',
]

export default function NEETCoachingMGRoadGurugram() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-purple-800 to-purple-600 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <span className="inline-flex items-center gap-2 bg-yellow-500 text-purple-900 px-4 py-1 rounded-full text-sm font-semibold mb-4">
              <Train className="w-4 h-4" />
              Metro Accessible
            </span>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              NEET Coaching for MG Road Gurugram
            </h1>
            <p className="text-xl text-purple-100 mb-4">
              Just 15 minutes from MG Road! Premium NEET biology coaching at M2K Sector 51.
            </p>
            <div className="flex items-center justify-center gap-2 text-yellow-300 mb-8">
              <Car className="w-5 h-5" />
              <span>15-18 min via Golf Course Road | Metro Connected</span>
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

      {/* Landmarks */}
      <section className="py-12 bg-white border-b">
        <div className="container mx-auto px-4">
          <h2 className="text-xl font-bold text-center mb-6 text-gray-700">Near These Landmarks</h2>
          <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
            {landmarks.map((landmark) => (
              <span
                key={landmark}
                className="bg-purple-100 text-purple-700 px-4 py-2 rounded-lg text-sm font-medium"
              >
                {landmark}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Distance Info */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-center mb-8">MG Road Area Coverage</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-3xl mx-auto">
            {nearbyAreas.map((area, index) => (
              <div key={index} className="bg-white rounded-lg p-4 text-center shadow-sm">
                <p className="font-semibold">{area.name}</p>
                <p className="text-purple-600">{area.distance}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Why MG Road Students Choose Us</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="bg-purple-50 p-6 rounded-xl">
              <Train className="w-12 h-12 text-purple-600 mb-4" />
              <h3 className="text-xl font-bold mb-3">Metro + Drive Options</h3>
              <p className="text-gray-600">
                Reach us via Yellow Line + Rapid Metro or drive via Golf Course Road. Multiple
                transport options.
              </p>
            </div>
            <div className="bg-purple-50 p-6 rounded-xl">
              <ShoppingBag className="w-12 h-12 text-purple-600 mb-4" />
              <h3 className="text-xl font-bold mb-3">Commercial Hub Access</h3>
              <p className="text-gray-600">
                Parents can shop at Ambience/MGF while kids attend class. Productive use of waiting
                time.
              </p>
            </div>
            <div className="bg-purple-50 p-6 rounded-xl">
              <Clock className="w-12 h-12 text-purple-600 mb-4" />
              <h3 className="text-xl font-bold mb-3">Traffic-Smart Timings</h3>
              <p className="text-gray-600">
                Evening and weekend batches designed to avoid MG Road rush hours. Smart scheduling.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Center Location */}
      <section className="py-16 bg-gray-50">
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
                    <p className="text-sm text-purple-600 mt-1">8-10 km from MG Road</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 mb-4">
                  <Train className="w-5 h-5 text-purple-600 mt-1" />
                  <div>
                    <p className="font-semibold">Metro Route</p>
                    <p className="text-gray-600">MG Road → Rapid Metro → Sector 54 → Auto</p>
                  </div>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg mb-4">
                  <p className="text-sm text-purple-800">
                    <strong>By Car:</strong> MG Road → Golf Course Road → Sector 54 → Sector 51
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
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">FAQs for MG Road Students</h2>
          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq, index) => (
              <details key={index} className="bg-gray-50 rounded-lg shadow-md group">
                <summary className="px-6 py-4 cursor-pointer font-semibold flex items-center justify-between hover:bg-gray-100">
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
          <h2 className="text-3xl font-bold mb-4">Join 45+ MG Road Area Students</h2>
          <p className="text-xl text-purple-100 mb-8">
            Book a free demo class. Metro-connected, traffic-smart timings.
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
