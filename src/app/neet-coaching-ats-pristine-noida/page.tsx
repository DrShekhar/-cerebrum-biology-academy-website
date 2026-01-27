import { Metadata } from 'next'
import Link from 'next/link'
import { Phone, MapPin, Monitor, Users, Trophy, Star, CheckCircle, ArrowRight, Building2, Clock, Train } from 'lucide-react'

export const metadata: Metadata = {
  title: 'NEET Coaching for ATS Pristine Sector 150 Noida | Online Classes',
  description:
    'NEET Biology coaching for ATS Pristine, Sector 150 Noida students. Online classes from home + hybrid mode available. 45+ students enrolled. AIIMS faculty. Call 88264-44334!',
  keywords: [
    'neet coaching ats pristine',
    'neet coaching sector 150 noida',
    'biology coaching sector 150',
    'neet classes ats pristine noida',
    'online neet coaching sector 150',
  ],
  openGraph: {
    title: 'NEET Coaching for ATS Pristine Sector 150 | Cerebrum Academy',
    description: 'Online NEET Biology classes for ATS Pristine residents. 45+ students enrolled.',
    url: 'https://cerebrumbiologyacademy.com/neet-coaching-ats-pristine-noida',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/neet-coaching-ats-pristine-noida',
  },
}

const faqs = [
  {
    question: 'Is there NEET coaching near ATS Pristine Sector 150?',
    answer: 'We offer online NEET Biology classes for ATS Pristine students. Live interactive sessions from home with instant doubt resolution. For offline preference, our South Extension center is 50 minutes away via expressway.',
  },
  {
    question: 'What is the fee for online NEET coaching for Sector 150 students?',
    answer: 'Online Biology classes: Rs 45,000/year. Hybrid mode (online + weekend offline at South Extension): Rs 55,000/year. Full offline: Rs 65,000/year.',
  },
  {
    question: 'How many ATS Pristine students are enrolled?',
    answer: '45+ students from ATS Pristine and nearby Sector 150 societies are currently enrolled in our online NEET Biology program.',
  },
]

export default function NEETCoachingATSPristinePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Hero */}
      <section className="bg-gradient-to-br from-blue-800 to-blue-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <span className="inline-flex items-center gap-2 bg-yellow-500 text-blue-900 px-4 py-1 rounded-full text-sm font-semibold mb-4">
            <Building2 className="w-4 h-4" />
            Sector 150 Noida
          </span>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">NEET Coaching for ATS Pristine Students</h1>
          <p className="text-xl text-blue-100 mb-6 max-w-2xl mx-auto">
            Online Biology classes from your Sector 150 home. 45+ students enrolled. Hybrid mode with South Extension available.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="tel:+918826444334" className="inline-flex items-center gap-2 bg-yellow-500 text-blue-900 px-6 py-3 rounded-lg font-semibold hover:bg-yellow-400 transition">
              <Phone className="w-5 h-5" />Call 88264-44334
            </a>
            <Link href="/free-neet-demo-class-gurugram" className="inline-flex items-center gap-2 bg-white/10 text-white px-6 py-3 rounded-lg font-semibold hover:bg-white/20 transition">
              Book Free Demo
            </Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-8 bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            <div className="text-center p-4 bg-blue-50 rounded-xl">
              <Users className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <p className="text-2xl font-bold">45+</p>
              <p className="text-sm text-gray-600">ATS Pristine Students</p>
            </div>
            <div className="text-center p-4 bg-blue-50 rounded-xl">
              <Trophy className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <p className="text-2xl font-bold">98%</p>
              <p className="text-sm text-gray-600">Success Rate</p>
            </div>
            <div className="text-center p-4 bg-blue-50 rounded-xl">
              <Star className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <p className="text-2xl font-bold">4.9/5</p>
              <p className="text-sm text-gray-600">Rating</p>
            </div>
            <div className="text-center p-4 bg-blue-50 rounded-xl">
              <Monitor className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <p className="text-2xl font-bold">Live</p>
              <p className="text-sm text-gray-600">Online Classes</p>
            </div>
          </div>
        </div>
      </section>

      {/* Learning Modes */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Choose Your Learning Mode</h2>
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <div className="bg-blue-50 rounded-2xl p-6 border-2 border-blue-200">
              <Monitor className="w-10 h-10 text-blue-600 mb-4" />
              <h3 className="text-xl font-bold mb-2">100% Online</h3>
              <p className="text-gray-600 mb-4">Live classes from home. Most popular.</p>
              <p className="text-2xl font-bold text-blue-700">Rs 45,000/year</p>
            </div>
            <div className="bg-yellow-400 rounded-2xl p-6 relative">
              <span className="absolute top-0 right-0 bg-blue-800 text-white text-xs font-bold px-3 py-1 rounded-bl-lg">RECOMMENDED</span>
              <Building2 className="w-10 h-10 text-blue-900 mb-4" />
              <h3 className="text-xl font-bold mb-2">Hybrid Mode</h3>
              <p className="text-blue-900 mb-4">Online + Weekend offline at South Extension.</p>
              <p className="text-2xl font-bold text-blue-900">Rs 55,000/year</p>
            </div>
            <div className="bg-gray-50 rounded-2xl p-6 border-2 border-gray-200">
              <MapPin className="w-10 h-10 text-gray-600 mb-4" />
              <h3 className="text-xl font-bold mb-2">Full Offline</h3>
              <p className="text-gray-600 mb-4">Daily at South Extension (50 min drive).</p>
              <p className="text-2xl font-bold text-gray-700">Rs 65,000/year</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq, index) => (
              <details key={index} className="bg-white rounded-lg shadow-md group">
                <summary className="px-6 py-4 cursor-pointer font-semibold">{faq.question}</summary>
                <p className="px-6 pb-4 text-gray-600">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-blue-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Join ATS Pristine NEET Toppers</h2>
          <p className="text-xl text-blue-100 mb-8">Start your medical journey with expert guidance</p>
          <a href="tel:+918826444334" className="inline-flex items-center gap-2 bg-yellow-500 text-blue-900 px-8 py-3 rounded-lg font-semibold hover:bg-yellow-400 transition">
            <Phone className="w-5 h-5" />Call 88264-44334
          </a>
        </div>
      </section>

      {/* Schema */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'LocalBusiness',
        name: 'Cerebrum Biology Academy - ATS Pristine Noida',
        description: 'NEET Biology coaching for ATS Pristine, Sector 150 Noida students.',
        url: 'https://cerebrumbiologyacademy.com/neet-coaching-ats-pristine-noida',
        telephone: '+918826444334',
        areaServed: { '@type': 'Place', name: 'ATS Pristine, Sector 150, Noida' },
      }) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faqs.map((faq) => ({ '@type': 'Question', name: faq.question, acceptedAnswer: { '@type': 'Answer', text: faq.answer } })),
      }) }} />
    </div>
  )
}
