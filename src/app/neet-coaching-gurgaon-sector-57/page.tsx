import { Metadata } from 'next'
import Link from 'next/link'
import { Phone, MapPin, Clock, CheckCircle, Car, ArrowRight, Building, Users } from 'lucide-react'

export const metadata: Metadata = {
  title: 'NEET Coaching Sector 57 Gurgaon | 5 Min Drive | Cerebrum Academy',
  description:
    'Best NEET coaching near Sector 57 Gurgaon. Just 5 min drive to M2K Sector 51. Premium residential area with easy access. AIIMS faculty, 98% success. Call 88264-44334!',
  keywords: [
    'neet coaching sector 57 gurgaon',
    'neet classes sector 57 gurugram',
    'biology coaching sector 57',
    'neet preparation sector 57 gurgaon',
    'biology tuition sector 57',
    'neet coaching near sector 57',
  ],
  openGraph: {
    title: 'NEET Coaching Sector 57 Gurgaon | Cerebrum Biology Academy',
    description: 'Best NEET coaching near Sector 57. Just 5 min from your home.',
    url: 'https://cerebrumbiologyacademy.com/neet-coaching-gurgaon-sector-57',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/neet-coaching-gurgaon-sector-57',
  },
}

const nearbyAreas = [
  { name: 'Sector 57', distance: '5 min drive' },
  { name: 'Sector 56', distance: '4 min drive' },
  { name: 'Sector 55', distance: '6 min drive' },
  { name: 'Sector 54', distance: '7 min drive' },
  { name: 'Golf Course Extension', distance: '8 min drive' },
  { name: 'Sector 51 (Our Location)', distance: '0 min' },
]

const faqs = [
  {
    question: 'How far is Cerebrum from Sector 57?',
    answer: 'Our center at M2K Corporate Park, Sector 51 is just 2-3 km from Sector 57. By car, it takes only 5-7 minutes. We are literally neighbors!',
  },
  {
    question: 'What makes Sector 57 students choose Cerebrum?',
    answer: 'Proximity (5 min), premium facilities matching Sector 57 standards, small batches of 20 students, AIIMS faculty, and convenient evening timings.',
  },
  {
    question: 'Are there other Sector 57 students at Cerebrum?',
    answer: 'Yes! We have 25+ students from Sector 57 and nearby sectors (54-58). Many walk or cycle to our center given the short distance.',
  },
  {
    question: 'What batch timings work for Sector 57 students?',
    answer: 'All batches work well given the proximity! Evening (5-8 PM) and weekend (Sat-Sun 9 AM-1 PM) are most popular.',
  },
]

export default function NEETCoachingSector57Gurgaon() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-teal-50 to-white">
      <section className="bg-gradient-to-r from-teal-700 to-teal-600 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <span className="inline-block bg-yellow-500 text-teal-900 px-4 py-1 rounded-full text-sm font-semibold mb-4">
              For Sector 57 Residents
            </span>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">NEET Coaching for Sector 57 Gurgaon</h1>
            <p className="text-xl text-teal-100 mb-4">Just 5 minutes from your home! Premium NEET biology coaching at M2K Sector 51.</p>
            <div className="flex items-center justify-center gap-2 text-yellow-300 mb-8">
              <Car className="w-5 h-5" />
              <span>5-7 min drive | Walking distance</span>
            </div>
            <div className="flex flex-wrap justify-center gap-4">
              <a href="tel:+918826444334" className="bg-yellow-500 text-teal-900 px-8 py-3 rounded-lg font-semibold flex items-center gap-2 hover:bg-yellow-400 transition">
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
          <h2 className="text-2xl font-bold text-center mb-8">Nearby Sectors We Serve</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-3xl mx-auto">
            {nearbyAreas.map((area, index) => (
              <div key={index} className="bg-teal-50 rounded-lg p-4 text-center">
                <p className="font-semibold">{area.name}</p>
                <p className="text-teal-600">{area.distance}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Why Sector 57 Students Choose Us</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <Car className="w-12 h-12 text-teal-600 mb-4" />
              <h3 className="text-xl font-bold mb-3">Walking Distance</h3>
              <p className="text-gray-600">Just 5 min away. Many students walk or cycle. No traffic hassle.</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <CheckCircle className="w-12 h-12 text-teal-600 mb-4" />
              <h3 className="text-xl font-bold mb-3">Premium Standards</h3>
              <p className="text-gray-600">AC classrooms, modern infra matching Sector 57 lifestyle expectations.</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <Users className="w-12 h-12 text-teal-600 mb-4" />
              <h3 className="text-xl font-bold mb-3">Community Feel</h3>
              <p className="text-gray-600">25+ students from nearby sectors. Form study groups with neighbors.</p>
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
                  <MapPin className="w-5 h-5 text-teal-600 mt-1" />
                  <div>
                    <p className="font-semibold">M2K Corporate Park</p>
                    <p className="text-gray-600">Sector 51, Gurugram 122018</p>
                    <p className="text-sm text-teal-600 mt-1">Just 2-3 km from Sector 57</p>
                  </div>
                </div>
                <div className="bg-teal-50 p-4 rounded-lg mb-4">
                  <p className="text-sm text-teal-800"><strong>Route:</strong> Sector 57 → Sector 56 → Sector 51</p>
                </div>
                <a href="tel:+918826444334" className="inline-flex items-center gap-2 bg-teal-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-teal-700 transition">
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
          <h2 className="text-3xl font-bold text-center mb-12">FAQs for Sector 57 Students</h2>
          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq, index) => (
              <details key={index} className="bg-white rounded-lg shadow-md group">
                <summary className="px-6 py-4 cursor-pointer font-semibold flex items-center justify-between hover:bg-gray-50">
                  {faq.question}
                  <span className="text-teal-600 group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <p className="px-6 pb-4 text-gray-600">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-teal-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Join 25+ Sector 57 Students</h2>
          <p className="text-xl text-teal-100 mb-8">Book a free demo class. Your neighbors already trust us.</p>
          <a href="tel:+918826444334" className="inline-flex items-center gap-2 bg-yellow-500 text-teal-900 px-8 py-3 rounded-lg font-semibold hover:bg-yellow-400 transition">
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
