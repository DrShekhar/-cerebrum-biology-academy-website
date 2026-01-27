import { Metadata } from 'next'
import Link from 'next/link'
import { Phone, MapPin, Car, ArrowRight, Train, Building, Users, ShoppingBag } from 'lucide-react'

export const metadata: Metadata = {
  title: 'NEET Coaching HUDA City Centre Gurugram | 15 Min | Cerebrum Academy',
  description:
    'Best NEET coaching near HUDA City Centre Gurugram. Just 15 min drive to M2K Sector 51. Yellow Line terminus, major commercial hub. AIIMS faculty, 98% success. Call 88264-44334!',
  keywords: [
    'neet coaching huda city centre gurugram',
    'neet classes huda city centre gurgaon',
    'biology coaching near huda city centre',
    'neet preparation huda city centre',
    'neet coaching near huda city centre metro',
    'biology tuition huda city centre',
  ],
  openGraph: {
    title: 'NEET Coaching HUDA City Centre Gurugram | Cerebrum Biology Academy',
    description: 'Best NEET coaching near HUDA City Centre. Yellow Line terminus.',
    url: 'https://cerebrumbiologyacademy.com/neet-coaching-huda-city-centre-gurugram',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/neet-coaching-huda-city-centre-gurugram',
  },
}

const nearbyAreas = [
  { name: 'HUDA City Centre', distance: '15 min drive' },
  { name: 'Sector 44', distance: '12 min drive' },
  { name: 'Sector 43', distance: '14 min drive' },
  { name: 'Sector 45', distance: '13 min drive' },
  { name: 'DLF Phase 5', distance: '10 min drive' },
  { name: 'Sector 29', distance: '16 min drive' },
]

const faqs = [
  {
    question: 'How far is Cerebrum from HUDA City Centre?',
    answer: 'Our center at M2K Corporate Park, Sector 51 is approximately 7-8 km from HUDA City Centre. By car via Golf Course Road or Sector 44, it takes 12-15 minutes.',
  },
  {
    question: 'Can I reach via Metro from HUDA City Centre?',
    answer: 'Yes! HUDA City Centre is Yellow Line terminus. Take Metro towards Samaypur Badli, get off at Sector 53-54, then 10 min auto. Total: 25-30 min.',
  },
  {
    question: 'Is HUDA City Centre a good location for coaching?',
    answer: 'HUDA City Centre area has many coaching centers but most are crowded. Our Sector 51 center offers smaller batches (20 students) with AIIMS faculty - worth the 15 min drive.',
  },
  {
    question: 'What about parking at your center?',
    answer: 'M2K Corporate Park has ample parking - free for students. Unlike crowded HUDA area coaching centers, parking is never an issue here.',
  },
]

export default function NEETCoachingHUDACityCentreGurugram() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-violet-50 to-white">
      <section className="bg-gradient-to-r from-violet-800 to-violet-600 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <span className="inline-flex items-center gap-2 bg-yellow-500 text-violet-900 px-4 py-1 rounded-full text-sm font-semibold mb-4">
              <Train className="w-4 h-4" />
              Yellow Line Terminus
            </span>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">NEET Coaching for HUDA City Centre</h1>
            <p className="text-xl text-violet-100 mb-4">Just 15 minutes from HUDA City Centre! Premium NEET biology coaching at M2K Sector 51.</p>
            <div className="flex items-center justify-center gap-2 text-yellow-300 mb-8">
              <Car className="w-5 h-5" />
              <span>12-15 min drive | Metro + Auto option</span>
            </div>
            <div className="flex flex-wrap justify-center gap-4">
              <a href="tel:+918826444334" className="bg-yellow-500 text-violet-900 px-8 py-3 rounded-lg font-semibold flex items-center gap-2 hover:bg-yellow-400 transition">
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
          <h2 className="text-2xl font-bold text-center mb-8">HUDA City Centre Area Coverage</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-3xl mx-auto">
            {nearbyAreas.map((area, index) => (
              <div key={index} className="bg-violet-50 rounded-lg p-4 text-center">
                <p className="font-semibold">{area.name}</p>
                <p className="text-violet-600">{area.distance}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose Us Over HUDA Coaching Centers</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <Users className="w-12 h-12 text-violet-600 mb-4" />
              <h3 className="text-xl font-bold mb-3">Smaller Batches</h3>
              <p className="text-gray-600">20 students vs 100+ at HUDA coaching centers. Personal attention matters.</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <Building className="w-12 h-12 text-violet-600 mb-4" />
              <h3 className="text-xl font-bold mb-3">Better Infrastructure</h3>
              <p className="text-gray-600">Modern AC classrooms, free parking, professional environment.</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <ShoppingBag className="w-12 h-12 text-violet-600 mb-4" />
              <h3 className="text-xl font-bold mb-3">Less Crowded</h3>
              <p className="text-gray-600">Peaceful learning vs chaotic HUDA coaching market environment.</p>
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
                  <MapPin className="w-5 h-5 text-violet-600 mt-1" />
                  <div>
                    <p className="font-semibold">M2K Corporate Park</p>
                    <p className="text-gray-600">Sector 51, Gurugram 122018</p>
                    <p className="text-sm text-violet-600 mt-1">7-8 km from HUDA City Centre</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 mb-4">
                  <Train className="w-5 h-5 text-violet-600 mt-1" />
                  <div>
                    <p className="font-semibold">Metro Route</p>
                    <p className="text-gray-600">HUDA City Centre → Sector 53-54 Metro + 10 min Auto</p>
                  </div>
                </div>
                <div className="bg-violet-50 p-4 rounded-lg mb-4">
                  <p className="text-sm text-violet-800"><strong>By Car:</strong> HUDA City Centre → Sector 44 → Golf Course Road → Sector 51</p>
                </div>
                <a href="tel:+918826444334" className="inline-flex items-center gap-2 bg-violet-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-violet-700 transition">
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
          <h2 className="text-3xl font-bold text-center mb-12">FAQs for HUDA City Centre Students</h2>
          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq, index) => (
              <details key={index} className="bg-white rounded-lg shadow-md group">
                <summary className="px-6 py-4 cursor-pointer font-semibold flex items-center justify-between hover:bg-gray-50">
                  {faq.question}
                  <span className="text-violet-600 group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <p className="px-6 pb-4 text-gray-600">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-violet-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Escape HUDA Crowd, Get Quality Education</h2>
          <p className="text-xl text-violet-100 mb-8">Book a free demo class. 15 min for AIIMS faculty is worth it.</p>
          <a href="tel:+918826444334" className="inline-flex items-center gap-2 bg-yellow-500 text-violet-900 px-8 py-3 rounded-lg font-semibold hover:bg-yellow-400 transition">
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
