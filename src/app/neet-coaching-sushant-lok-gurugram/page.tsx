import { Metadata } from 'next'
import Link from 'next/link'
import { Phone, MapPin, Clock, CheckCircle, Car, ArrowRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'NEET Coaching Sushant Lok Gurugram | 15 Min Drive | Cerebrum Academy',
  description:
    'Best NEET coaching near Sushant Lok Gurugram. Just 15 min drive to M2K Sector 51. AIIMS faculty, 98% success rate. Perfect for Sushant Lok 1, 2, 3 residents. Call 88264-44334!',
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
    title: 'NEET Coaching Sushant Lok Gurugram | Cerebrum Biology Academy',
    description: 'Best NEET coaching near Sushant Lok. Just 15 min from your home.',
    url: 'https://cerebrumbiologyacademy.com/neet-coaching-sushant-lok-gurugram',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/neet-coaching-sushant-lok-gurugram',
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
    question: 'How far is Cerebrum from Sushant Lok?',
    answer: 'Our center at M2K Corporate Park, Sector 51 is approximately 7-9 km from Sushant Lok. By car, it takes 13-18 minutes depending on which phase you are in and traffic.',
  },
  {
    question: 'Which route is best from Sushant Lok?',
    answer: 'From Sushant Lok 1/2: Via Golf Course Road → Sector 54/56 → Sector 51 (15 min). From Sushant Lok 3: Via Sector 43 → Sector 49 → Sector 51 (13 min).',
  },
  {
    question: 'Are there Sushant Lok students at Cerebrum?',
    answer: 'Yes! We have 35+ students from all three phases of Sushant Lok. Many families from the same society send their children together.',
  },
  {
    question: 'What batch timings work for Sushant Lok students?',
    answer: 'Evening batch (5-8 PM) works well - leave by 4:40 PM to reach by 5 PM. Weekend batch (Sat-Sun 9 AM - 1 PM) is popular as mornings have less traffic.',
  },
]

export default function NEETCoachingSushantLokGurugram() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-purple-800 to-purple-600 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <span className="inline-block bg-yellow-500 text-purple-900 px-4 py-1 rounded-full text-sm font-semibold mb-4">
              For Sushant Lok Residents
            </span>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              NEET Coaching for Sushant Lok Gurugram
            </h1>
            <p className="text-xl text-purple-100 mb-4">
              Just 15 minutes from your home! Premium NEET biology coaching at M2K Sector 51.
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
          <h2 className="text-2xl font-bold text-center mb-8">All Sushant Lok Phases & Nearby Areas</h2>
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
          <h2 className="text-3xl font-bold text-center mb-12">Why Sushant Lok Families Choose Us</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <Car className="w-12 h-12 text-purple-600 mb-4" />
              <h3 className="text-xl font-bold mb-3">Convenient Location</h3>
              <p className="text-gray-600">
                15 min via Golf Course Road. Easier than going to crowded Sector 14 coaching centers.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <CheckCircle className="w-12 h-12 text-purple-600 mb-4" />
              <h3 className="text-xl font-bold mb-3">Premium Quality</h3>
              <p className="text-gray-600">
                Sushant Lok residents expect the best. AIIMS faculty, 25-student batches, modern facilities.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <Clock className="w-12 h-12 text-purple-600 mb-4" />
              <h3 className="text-xl font-bold mb-3">Flexible Timing</h3>
              <p className="text-gray-600">
                Evening and weekend batches designed for school-going students. Multiple timing options.
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
                    <strong>Route:</strong> Sushant Lok → Golf Course Road → Sector 54/56 → Sector 51
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
                  <span className="text-purple-600 group-open:rotate-180 transition-transform">▼</span>
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
