import { Metadata } from 'next'
import Link from 'next/link'
import { Phone, MapPin, Car, ArrowRight, Train, Building, Users } from 'lucide-react'

export const metadata: Metadata = {
  title: 'NEET Coaching IFFCO Chowk Gurugram | 12 Min Drive',
  description:
    'Best NEET coaching near IFFCO Chowk Gurugram. Just 12 min drive to M2K Sector 51. Metro connected via Yellow Line. AIIMS faculty, 98% success rate. Call 88264-44334!',
  keywords: [
    'neet coaching iffco chowk gurugram',
    'neet classes iffco chowk gurgaon',
    'biology coaching near iffco chowk',
    'neet preparation iffco chowk',
    'neet coaching near iffco chowk metro',
    'biology tuition iffco chowk',
  ],
  openGraph: {
    title: 'NEET Coaching IFFCO Chowk Gurugram',
    description: 'Best NEET coaching near IFFCO Chowk. Metro connected.',
    url: 'https://cerebrumbiologyacademy.com/neet-coaching-iffco-chowk-gurugram',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/neet-coaching-iffco-chowk-gurugram',
  },
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
    question: 'How far is Cerebrum from IFFCO Chowk?',
    answer: 'Our center at M2K Corporate Park, Sector 51 is approximately 6-7 km from IFFCO Chowk. By car via NH-48 or Golf Course Road, it takes 10-12 minutes.',
  },
  {
    question: 'Is IFFCO Chowk Metro connected to your center?',
    answer: 'IFFCO Chowk Metro (Yellow Line) is well connected. Take Metro to Sector 53-54, then 10 min auto/cab to our center. Total: 25-30 min by public transport.',
  },
  {
    question: 'What batch timings work for IFFCO Chowk students?',
    answer: 'Evening batch (5-8 PM) is popular - avoid NH-48 peak hours. Weekend batches (Sat-Sun) are ideal for avoiding weekday traffic.',
  },
  {
    question: 'Are there students from Leisure Valley at Cerebrum?',
    answer: 'Yes! We have 30+ students from IFFCO Chowk area including Leisure Valley, Sector 29, and nearby residential areas.',
  },
]

export default function NEETCoachingIFFCOChowkGurugram() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <section className="bg-gradient-to-r from-blue-800 to-blue-600 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <span className="inline-flex items-center gap-2 bg-yellow-500 text-blue-900 px-4 py-1 rounded-full text-sm font-semibold mb-4">
              <Train className="w-4 h-4" />
              Metro Connected
            </span>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">NEET Coaching for IFFCO Chowk Gurugram</h1>
            <p className="text-xl text-blue-100 mb-4">Just 12 minutes from IFFCO Chowk! Premium NEET biology coaching at M2K Sector 51.</p>
            <div className="flex items-center justify-center gap-2 text-yellow-300 mb-8">
              <Car className="w-5 h-5" />
              <span>10-12 min drive | Yellow Line Metro</span>
            </div>
            <div className="flex flex-wrap justify-center gap-4">
              <a href="tel:+918826444334" className="bg-yellow-500 text-blue-900 px-8 py-3 rounded-lg font-semibold flex items-center gap-2 hover:bg-yellow-400 transition">
                <Phone className="w-5 h-5" />Call 88264-44334
              </a>
              <Link href="/neet-coaching-gurugram" className="bg-white/20 text-white px-8 py-3 rounded-lg font-semibold flex items-center gap-2 hover:bg-white/30 transition">
                View All Locations<ArrowRight className="w-5 h-5" />
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
          <h2 className="text-3xl font-bold text-center mb-12">Why IFFCO Chowk Students Choose Us</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <Train className="w-12 h-12 text-blue-600 mb-4" />
              <h3 className="text-xl font-bold mb-3">Metro Access</h3>
              <p className="text-gray-600">Yellow Line to Sector 53-54 + short auto ride. Beat NH-48 traffic.</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <Building className="w-12 h-12 text-blue-600 mb-4" />
              <h3 className="text-xl font-bold mb-3">Central Location</h3>
              <p className="text-gray-600">Closer than Sector 14 coaching hubs. Better infrastructure, less crowd.</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <Users className="w-12 h-12 text-blue-600 mb-4" />
              <h3 className="text-xl font-bold mb-3">30+ IFFCO Students</h3>
              <p className="text-gray-600">Active community from Leisure Valley, Sector 29, and nearby areas.</p>
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
                  <p className="text-sm text-blue-800"><strong>By Car:</strong> IFFCO Chowk → Golf Course Road → Sector 51</p>
                </div>
                <a href="tel:+918826444334" className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition">
                  <Phone className="w-5 h-5" />Book Free Demo
                </a>
              </div>
              <div className="md:w-1/2">
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3509.1!2d77.07!3d28.41!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sM2K%20Corporate%20Park!5e0!3m2!1sen!2sin!4v1" width="100%" height="300" style={{ border: 0 }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
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
                  <span className="text-blue-600 group-open:rotate-180 transition-transform">▼</span>
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
          <p className="text-xl text-blue-100 mb-8">Book a free demo class. Metro connected, convenient timing.</p>
          <a href="tel:+918826444334" className="inline-flex items-center gap-2 bg-yellow-500 text-blue-900 px-8 py-3 rounded-lg font-semibold hover:bg-yellow-400 transition">
            <Phone className="w-5 h-5" />Call Now: 88264-44334
          </a>
        </div>
      </section>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faqs.map((faq) => ({ '@type': 'Question', name: faq.question, acceptedAnswer: { '@type': 'Answer', text: faq.answer } })),
      }) }} />
    </div>
  )
}
