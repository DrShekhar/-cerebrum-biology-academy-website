import { Metadata } from 'next'
import Link from 'next/link'
import { Phone, MapPin, Clock, CheckCircle, Car, ArrowRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'NEET Coaching Nirvana Country Gurugram | 10 Min Drive | Cerebrum Academy',
  description:
    'Best NEET coaching near Nirvana Country Gurugram. Just 10 min drive to M2K Sector 51. AIIMS faculty, 98% success rate. Perfect for Nirvana Country residents. Call 88264-44334!',
  keywords: [
    'neet coaching nirvana country gurugram',
    'neet classes nirvana country gurgaon',
    'biology coaching nirvana country',
    'neet coaching near nirvana country',
    'neet preparation sector 50 gurugram',
    'biology tuition nirvana country',
    'neet classes south gurugram',
  ],
  openGraph: {
    title: 'NEET Coaching Nirvana Country Gurugram | Cerebrum Biology Academy',
    description: 'Best NEET coaching near Nirvana Country. Just 10 min from your home.',
    url: 'https://cerebrumbiologyacademy.com/neet-coaching-nirvana-country-gurugram',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/neet-coaching-nirvana-country-gurugram',
  },
}

const nearbyAreas = [
  { name: 'Nirvana Country', distance: '10 min drive' },
  { name: 'The Close South', distance: '8 min drive' },
  { name: 'Sector 50', distance: '5 min drive' },
  { name: 'Central Park 2', distance: '12 min drive' },
  { name: 'Uppal Southend', distance: '10 min drive' },
  { name: 'Sector 49', distance: '7 min drive' },
]

const faqs = [
  {
    question: 'How far is Cerebrum from Nirvana Country?',
    answer: 'Our center at M2K Corporate Park, Sector 51 is just 3-4 km from Nirvana Country. It takes only 8-10 minutes by car. We are literally the nearest quality NEET coaching for Nirvana Country residents.',
  },
  {
    question: 'What makes Cerebrum ideal for Nirvana Country students?',
    answer: 'Proximity (10 min), premium infrastructure matching Nirvana Country standards, small batches (25 students), AIIMS faculty, and convenient evening timings for school students.',
  },
  {
    question: 'Are there other Nirvana Country students at Cerebrum?',
    answer: 'Yes! We have 30+ students from Nirvana Country and nearby premium societies like The Close South, Central Park, and Uppal Southend. Many form study groups.',
  },
  {
    question: 'What are the best batch timings for Nirvana Country students?',
    answer: 'Evening batch (5-8 PM) is most popular - students reach in 10 min after school. Weekend batch (Sat-Sun 9 AM - 1 PM) is also convenient given the short distance.',
  },
]

export default function NEETCoachingNirvanaCountryGurugram() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-emerald-800 to-emerald-600 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <span className="inline-block bg-yellow-500 text-emerald-900 px-4 py-1 rounded-full text-sm font-semibold mb-4">
              For Nirvana Country Residents
            </span>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              NEET Coaching for Nirvana Country
            </h1>
            <p className="text-xl text-emerald-100 mb-4">
              Just 10 minutes from your home! Premium NEET biology coaching at M2K Sector 51.
            </p>
            <div className="flex items-center justify-center gap-2 text-yellow-300 mb-8">
              <Car className="w-5 h-5" />
              <span>8-10 min drive | 3-4 km only</span>
            </div>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="tel:+918826444334"
                className="bg-yellow-500 text-emerald-900 px-8 py-3 rounded-lg font-semibold flex items-center gap-2 hover:bg-yellow-400 transition"
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
          <h2 className="text-2xl font-bold text-center mb-8">Nearby Premium Societies We Serve</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-3xl mx-auto">
            {nearbyAreas.map((area, index) => (
              <div key={index} className="bg-emerald-50 rounded-lg p-4 text-center">
                <p className="font-semibold">{area.name}</p>
                <p className="text-emerald-600">{area.distance}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Why Nirvana Country Students Choose Us</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <Car className="w-12 h-12 text-emerald-600 mb-4" />
              <h3 className="text-xl font-bold mb-3">Nearest Quality Coaching</h3>
              <p className="text-gray-600">
                Just 10 min away. Sector 14 coaching hubs are 20+ min with traffic. We save you time daily.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <CheckCircle className="w-12 h-12 text-emerald-600 mb-4" />
              <h3 className="text-xl font-bold mb-3">Premium Standards</h3>
              <p className="text-gray-600">
                Nirvana Country residents expect quality. AC classrooms, modern infra, AIIMS faculty.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <Clock className="w-12 h-12 text-emerald-600 mb-4" />
              <h3 className="text-xl font-bold mb-3">Flexible Timing</h3>
              <p className="text-gray-600">
                Evening (5-8 PM) and weekend batches. Short commute means more study time at home.
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
                  <MapPin className="w-5 h-5 text-emerald-600 mt-1" />
                  <div>
                    <p className="font-semibold">M2K Corporate Park</p>
                    <p className="text-gray-600">Sector 51, Gurugram 122018</p>
                    <p className="text-sm text-emerald-600 mt-1">Just 3-4 km from Nirvana Country</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 mb-4">
                  <Clock className="w-5 h-5 text-emerald-600 mt-1" />
                  <div>
                    <p className="font-semibold">Batch Timings</p>
                    <p className="text-gray-600">Evening: 5 PM - 8 PM (Mon-Fri)</p>
                    <p className="text-gray-600">Weekend: Sat-Sun 9 AM - 1 PM</p>
                  </div>
                </div>
                <div className="bg-emerald-50 p-4 rounded-lg mb-4">
                  <p className="text-sm text-emerald-800">
                    <strong>Route:</strong> Nirvana Country Gate → Sector 50 → Sector 51 → M2K Corporate Park
                  </p>
                </div>
                <a
                  href="tel:+918826444334"
                  className="inline-flex items-center gap-2 bg-emerald-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-emerald-700 transition"
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
          <h2 className="text-3xl font-bold text-center mb-12">FAQs for Nirvana Country Students</h2>
          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq, index) => (
              <details key={index} className="bg-white rounded-lg shadow-md group">
                <summary className="px-6 py-4 cursor-pointer font-semibold flex items-center justify-between hover:bg-gray-50">
                  {faq.question}
                  <span className="text-emerald-600 group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <p className="px-6 pb-4 text-gray-600">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-emerald-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Join 30+ Nirvana Country Students</h2>
          <p className="text-xl text-emerald-100 mb-8">
            Book a free demo class. Your neighbors already trust us.
          </p>
          <a
            href="tel:+918826444334"
            className="inline-flex items-center gap-2 bg-yellow-500 text-emerald-900 px-8 py-3 rounded-lg font-semibold hover:bg-yellow-400 transition"
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
