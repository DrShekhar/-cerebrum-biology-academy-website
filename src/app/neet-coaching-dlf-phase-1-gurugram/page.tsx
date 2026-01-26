import { Metadata } from 'next'
import Link from 'next/link'
import { Phone, MapPin, Clock, CheckCircle, Car, ArrowRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'NEET Coaching for DLF Phase 1 Gurugram | 15 Min from Your Home | Cerebrum',
  description:
    'Best NEET coaching near DLF Phase 1 Gurugram. Just 15 min drive to M2K Sector 51. AIIMS faculty, 98% success rate. Evening & weekend batches for DLF residents. Call 88264-44334!',
  keywords: [
    'neet coaching dlf phase 1 gurugram',
    'neet classes dlf gurgaon',
    'biology coaching dlf gurugram',
    'neet coaching near dlf',
    'dlf phase 1 neet preparation',
    'neet coaching cyber city gurugram',
    'neet classes near dlf galleria',
    'biology tuition dlf gurgaon',
  ],
  openGraph: {
    title: 'NEET Coaching for DLF Phase 1 Gurugram | Cerebrum Biology Academy',
    description: 'Best NEET coaching near DLF Phase 1. Just 15 min from your home.',
    url: 'https://cerebrumbiologyacademy.com/neet-coaching-dlf-phase-1-gurugram',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/neet-coaching-dlf-phase-1-gurugram',
  },
}

const nearbyLandmarks = [
  { name: 'DLF Galleria Market', distance: '12 min drive' },
  { name: 'Cyber Hub', distance: '15 min drive' },
  { name: 'MG Road Metro', distance: '18 min drive' },
  { name: 'DLF Phase 2', distance: '14 min drive' },
  { name: 'DLF Phase 3', distance: '16 min drive' },
  { name: 'Sikanderpur Metro', distance: '15 min drive' },
]

const faqs = [
  {
    question: 'How far is Cerebrum from DLF Phase 1?',
    answer: 'Our center at M2K Corporate Park, Sector 51 is approximately 8-10 km from DLF Phase 1. By car, it takes 15-20 minutes via Golf Course Road. Many DLF residents attend our evening batch (5-8 PM) after school.',
  },
  {
    question: 'Is there parking available at the center?',
    answer: 'Yes, M2K Corporate Park has ample parking. Students can be dropped off at the gate. For self-driving students, free parking is available in the building basement.',
  },
  {
    question: 'What batch timings suit DLF Phase 1 students?',
    answer: 'Most DLF students prefer: Evening batch (5-8 PM) - reach by 4:45 PM, return by 8:15 PM. Weekend batch (Sat-Sun 9 AM - 1 PM) is also popular. We can adjust timing based on school schedules.',
  },
  {
    question: 'Are there other DLF students at Cerebrum?',
    answer: 'Yes! We have 50+ students from various DLF phases (1-5), Cyber City, and nearby areas. Many form study groups and carpool together.',
  },
]

export default function NEETCoachingDLFPhase1Gurugram() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-900 to-blue-700 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <span className="inline-block bg-yellow-500 text-blue-900 px-4 py-1 rounded-full text-sm font-semibold mb-4">
              For DLF Phase 1 Residents
            </span>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              NEET Coaching for DLF Phase 1 Gurugram
            </h1>
            <p className="text-xl text-blue-100 mb-4">
              Just 15 minutes from your home! Premium NEET biology coaching at M2K Sector 51.
            </p>
            <div className="flex items-center justify-center gap-2 text-yellow-300 mb-8">
              <Car className="w-5 h-5" />
              <span>15-20 min via Golf Course Road</span>
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

      {/* Distance Info */}
      <section className="py-12 bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-center mb-8">Distance from DLF Landmarks</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {nearbyLandmarks.map((landmark, index) => (
                <div key={index} className="bg-blue-50 rounded-lg p-4 text-center">
                  <p className="font-semibold">{landmark.name}</p>
                  <p className="text-blue-600">{landmark.distance}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Why DLF Students Choose Cerebrum</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <Car className="w-12 h-12 text-blue-600 mb-4" />
              <h3 className="text-xl font-bold mb-3">Easy Commute</h3>
              <p className="text-gray-600">
                15-20 min via Golf Course Road. No traffic hassles like going to Sector 14 coaching hubs.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <Clock className="w-12 h-12 text-blue-600 mb-4" />
              <h3 className="text-xl font-bold mb-3">Flexible Timings</h3>
              <p className="text-gray-600">
                Evening batch (5-8 PM) and weekend batches designed for school-going students from DLF.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <CheckCircle className="w-12 h-12 text-blue-600 mb-4" />
              <h3 className="text-xl font-bold mb-3">Premium Quality</h3>
              <p className="text-gray-600">
                DLF residents expect quality. AIIMS faculty, 25-student batches, 98% success rate.
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
                  <MapPin className="w-5 h-5 text-blue-600 mt-1" />
                  <div>
                    <p className="font-semibold">M2K Corporate Park</p>
                    <p className="text-gray-600">Sector 51, Gurugram 122018</p>
                    <p className="text-sm text-blue-600 mt-1">8-10 km from DLF Phase 1</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 mb-4">
                  <Clock className="w-5 h-5 text-blue-600 mt-1" />
                  <div>
                    <p className="font-semibold">Best Timings for DLF Students</p>
                    <p className="text-gray-600">Evening: 5 PM - 8 PM (Mon-Fri)</p>
                    <p className="text-gray-600">Weekend: Sat-Sun 9 AM - 1 PM</p>
                  </div>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg mb-4">
                  <p className="text-sm text-blue-800">
                    <strong>Route:</strong> DLF Phase 1 → Golf Course Road → Sector 51 → M2K Corporate Park
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
          <h2 className="text-3xl font-bold text-center mb-12">FAQs for DLF Students</h2>
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

      {/* Other DLF Phases */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Also Serving Other DLF Areas</h2>
          <div className="flex flex-wrap justify-center gap-4 max-w-3xl mx-auto">
            {['DLF Phase 2', 'DLF Phase 3', 'DLF Phase 4', 'DLF Phase 5', 'DLF Cyber City', 'DLF Golf Links'].map((area) => (
              <span key={area} className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full">
                {area}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-blue-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Join 50+ DLF Students at Cerebrum</h2>
          <p className="text-xl text-blue-100 mb-8">
            Book a free demo class. We&apos;ll show you why the 15-min drive is worth it.
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
