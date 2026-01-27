import { Metadata } from 'next'
import Link from 'next/link'
import { Phone, MapPin, Car, ArrowRight, Building, Users, CheckCircle, Home } from 'lucide-react'

export const metadata: Metadata = {
  title: 'NEET Coaching Pataudi Road Gurugram | 20 Min Drive | Cerebrum Academy',
  description:
    'Best NEET coaching near Pataudi Road Gurugram. Just 20 min drive to M2K Sector 51. Emerging residential area with affordable housing. AIIMS faculty, 98% success. Call 88264-44334!',
  keywords: [
    'neet coaching pataudi road gurugram',
    'neet classes pataudi road gurgaon',
    'biology coaching pataudi road',
    'neet preparation pataudi road gurugram',
    'neet coaching sector 110 gurgaon',
    'biology tuition pataudi road',
  ],
  openGraph: {
    title: 'NEET Coaching Pataudi Road Gurugram | Cerebrum Biology Academy',
    description: 'Best NEET coaching near Pataudi Road. Emerging area.',
    url: 'https://cerebrumbiologyacademy.com/neet-coaching-pataudi-road-gurugram',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/neet-coaching-pataudi-road-gurugram',
  },
}

const nearbyAreas = [
  { name: 'Pataudi Road', distance: '20 min drive' },
  { name: 'Sector 110', distance: '18 min drive' },
  { name: 'Sector 111', distance: '19 min drive' },
  { name: 'Sector 108', distance: '17 min drive' },
  { name: 'Dwarka Expressway', distance: '15 min drive' },
  { name: 'Sector 99', distance: '16 min drive' },
]

const faqs = [
  {
    question: 'How far is Cerebrum from Pataudi Road?',
    answer: 'Our center at M2K Corporate Park, Sector 51 is approximately 12-14 km from Pataudi Road area. Via NH-48 or Dwarka Expressway, it takes 18-22 minutes.',
  },
  {
    question: 'Is Pataudi Road area emerging for residential?',
    answer: 'Yes, Pataudi Road (Sectors 99-112) is an emerging affordable housing zone with many new projects. We serve families moving to this developing area.',
  },
  {
    question: 'What options are available for students from Pataudi Road?',
    answer: 'Three options: 1) Weekend-only batch (minimize travel), 2) Hybrid (2 days offline + online), 3) Full offline with evening timing to avoid peak traffic.',
  },
  {
    question: 'Is the drive worth it from Pataudi Road?',
    answer: 'Yes! Local coaching options are limited in this emerging area. 20 min for AIIMS faculty, small batches, and 98% success rate is a smart investment.',
  },
]

const developments = ['Signature Global', 'Supertech', 'ROF Amaltas', 'GLS Avenue', 'Pivotal Devaan']

export default function NEETCoachingPataudiRoadGurugram() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-lime-50 to-white">
      <section className="bg-gradient-to-r from-lime-700 to-green-600 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <span className="inline-flex items-center gap-2 bg-yellow-500 text-lime-900 px-4 py-1 rounded-full text-sm font-semibold mb-4">
              <Home className="w-4 h-4" />
              For Emerging Gurugram Residents
            </span>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">NEET Coaching for Pataudi Road Gurugram</h1>
            <p className="text-xl text-lime-100 mb-4">Just 20 minutes from Pataudi Road! Premium NEET biology coaching at M2K Sector 51.</p>
            <div className="flex items-center justify-center gap-2 text-yellow-300 mb-8">
              <Car className="w-5 h-5" />
              <span>18-22 min via NH-48 / Dwarka Expressway</span>
            </div>
            <div className="flex flex-wrap justify-center gap-4">
              <a href="tel:+918826444334" className="bg-yellow-500 text-lime-900 px-8 py-3 rounded-lg font-semibold flex items-center gap-2 hover:bg-yellow-400 transition">
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
          <h2 className="text-xl font-bold text-center mb-6 text-gray-700">Students From New Developments</h2>
          <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
            {developments.map((dev) => (
              <span key={dev} className="bg-lime-100 text-lime-700 px-4 py-2 rounded-lg text-sm font-medium">{dev}</span>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-center mb-8">Pataudi Road Area Coverage</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-3xl mx-auto">
            {nearbyAreas.map((area, index) => (
              <div key={index} className="bg-white rounded-lg p-4 text-center shadow-sm">
                <p className="font-semibold">{area.name}</p>
                <p className="text-lime-600">{area.distance}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Why Pataudi Road Families Choose Us</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="bg-lime-50 p-6 rounded-xl">
              <Building className="w-12 h-12 text-lime-600 mb-4" />
              <h3 className="text-xl font-bold mb-3">No Local Options</h3>
              <p className="text-gray-600">Quality NEET coaching is limited in emerging areas. We fill that gap with AIIMS faculty.</p>
            </div>
            <div className="bg-lime-50 p-6 rounded-xl">
              <CheckCircle className="w-12 h-12 text-lime-600 mb-4" />
              <h3 className="text-xl font-bold mb-3">Weekend Intensive</h3>
              <p className="text-gray-600">Sat-Sun full batches - travel just 2 days/week. Complete syllabus covered.</p>
            </div>
            <div className="bg-lime-50 p-6 rounded-xl">
              <Users className="w-12 h-12 text-lime-600 mb-4" />
              <h3 className="text-xl font-bold mb-3">Carpool Network</h3>
              <p className="text-gray-600">Connect with students from Sector 99-112. Share rides and costs.</p>
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
                  <MapPin className="w-5 h-5 text-lime-600 mt-1" />
                  <div>
                    <p className="font-semibold">M2K Corporate Park</p>
                    <p className="text-gray-600">Sector 51, Gurugram 122018</p>
                    <p className="text-sm text-lime-600 mt-1">12-14 km from Pataudi Road</p>
                  </div>
                </div>
                <div className="bg-lime-50 p-4 rounded-lg mb-4">
                  <p className="text-sm text-lime-800"><strong>Best Route:</strong> Pataudi Road → NH-48 → Rajiv Chowk → Sector 51</p>
                </div>
                <a href="tel:+918826444334" className="inline-flex items-center gap-2 bg-lime-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-lime-700 transition">
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

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">FAQs for Pataudi Road Students</h2>
          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq, index) => (
              <details key={index} className="bg-gray-50 rounded-lg shadow-md group">
                <summary className="px-6 py-4 cursor-pointer font-semibold flex items-center justify-between hover:bg-gray-100">
                  {faq.question}
                  <span className="text-lime-600 group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <p className="px-6 pb-4 text-gray-600">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-lime-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Quality Education for Emerging Gurugram</h2>
          <p className="text-xl text-lime-100 mb-8">Book a free demo class. Weekend batches available.</p>
          <a href="tel:+918826444334" className="inline-flex items-center gap-2 bg-yellow-500 text-lime-900 px-8 py-3 rounded-lg font-semibold hover:bg-yellow-400 transition">
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
