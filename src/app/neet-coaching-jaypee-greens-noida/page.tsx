import { Metadata } from 'next'
import Link from 'next/link'
import { Phone, MapPin, Monitor, Users, Trophy, Star, Building2 } from 'lucide-react'
import { NoidaPageSchemas } from '@/components/seo/NoidaSchemas'

export const metadata: Metadata = {
  title: 'NEET Coaching for Jaypee Greens Noida | Online & Hybrid Classes',
  description:
    'NEET Biology coaching for Jaypee Greens, Sector 128 Noida students. Online classes from home + hybrid mode. 55+ students enrolled. AIIMS faculty. Call 88264-44334!',
  keywords: [
    'neet coaching jaypee greens',
    'neet coaching sector 128 noida',
    'biology coaching jaypee greens noida',
    'neet classes sector 128',
    'online neet coaching jaypee greens',
  ],
  openGraph: {
    title: 'NEET Coaching for Jaypee Greens Sector 128 | Cerebrum Academy',
    description: 'Online NEET Biology classes for Jaypee Greens residents. 55+ students enrolled.',
    url: 'https://cerebrumbiologyacademy.com/neet-coaching-jaypee-greens-noida',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/neet-coaching-jaypee-greens-noida',
  },
}

const faqs = [
  {
    question: 'Is there NEET coaching in Jaypee Greens area?',
    answer: 'We offer online NEET Biology classes for Jaypee Greens students. Live interactive sessions from your home. For offline classes, our South Extension center is accessible via Noida Expressway (45-50 min).',
  },
  {
    question: 'What is the fee for NEET coaching for Jaypee Greens students?',
    answer: 'Online Biology: Rs 45,000/year. Hybrid (online + weekend offline): Rs 55,000/year. Full offline at South Extension: Rs 65,000/year.',
  },
  {
    question: 'How do Jaypee Greens students attend classes?',
    answer: 'Most Jaypee Greens students choose 100% online mode for convenience. Some opt for hybrid mode with weekend visits to South Extension for tests and doubt sessions.',
  },
]

export default function NEETCoachingJaypeeGreensPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-white">
      {/* Hero */}
      <section className="bg-gradient-to-br from-emerald-800 to-emerald-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <span className="inline-flex items-center gap-2 bg-yellow-500 text-emerald-900 px-4 py-1 rounded-full text-sm font-semibold mb-4">
            <Building2 className="w-4 h-4" />
            Sector 128 Noida
          </span>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">NEET Coaching for Jaypee Greens Students</h1>
          <p className="text-xl text-emerald-100 mb-6 max-w-2xl mx-auto">
            Online Biology classes from your home. 55+ Jaypee Greens students enrolled. Hybrid mode available.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="tel:+918826444334" className="inline-flex items-center gap-2 bg-yellow-500 text-emerald-900 px-6 py-3 rounded-lg font-semibold hover:bg-yellow-400 transition">
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
            <div className="text-center p-4 bg-emerald-50 rounded-xl">
              <Users className="w-8 h-8 text-emerald-600 mx-auto mb-2" />
              <p className="text-2xl font-bold">55+</p>
              <p className="text-sm text-gray-600">Jaypee Greens Students</p>
            </div>
            <div className="text-center p-4 bg-emerald-50 rounded-xl">
              <Trophy className="w-8 h-8 text-emerald-600 mx-auto mb-2" />
              <p className="text-2xl font-bold">98%</p>
              <p className="text-sm text-gray-600">Success Rate</p>
            </div>
            <div className="text-center p-4 bg-emerald-50 rounded-xl">
              <Star className="w-8 h-8 text-emerald-600 mx-auto mb-2" />
              <p className="text-2xl font-bold">4.9/5</p>
              <p className="text-sm text-gray-600">Rating</p>
            </div>
            <div className="text-center p-4 bg-emerald-50 rounded-xl">
              <Monitor className="w-8 h-8 text-emerald-600 mx-auto mb-2" />
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
            <div className="bg-emerald-50 rounded-2xl p-6 border-2 border-emerald-200">
              <Monitor className="w-10 h-10 text-emerald-600 mb-4" />
              <h3 className="text-xl font-bold mb-2">100% Online</h3>
              <p className="text-gray-600 mb-4">Live classes from home. Most popular.</p>
              <p className="text-2xl font-bold text-emerald-700">Rs 45,000/year</p>
            </div>
            <div className="bg-yellow-400 rounded-2xl p-6 relative">
              <span className="absolute top-0 right-0 bg-emerald-800 text-white text-xs font-bold px-3 py-1 rounded-bl-lg">RECOMMENDED</span>
              <Building2 className="w-10 h-10 text-emerald-900 mb-4" />
              <h3 className="text-xl font-bold mb-2">Hybrid Mode</h3>
              <p className="text-emerald-900 mb-4">Online + Weekend offline at South Extension.</p>
              <p className="text-2xl font-bold text-emerald-900">Rs 55,000/year</p>
            </div>
            <div className="bg-gray-50 rounded-2xl p-6 border-2 border-gray-200">
              <MapPin className="w-10 h-10 text-gray-600 mb-4" />
              <h3 className="text-xl font-bold mb-2">Full Offline</h3>
              <p className="text-gray-600 mb-4">Daily at South Extension (45 min drive).</p>
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
      <section className="py-16 bg-emerald-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Join Jaypee Greens NEET Toppers</h2>
          <p className="text-xl text-emerald-100 mb-8">Start your medical journey today</p>
          <a href="tel:+918826444334" className="inline-flex items-center gap-2 bg-yellow-500 text-emerald-900 px-8 py-3 rounded-lg font-semibold hover:bg-yellow-400 transition">
            <Phone className="w-5 h-5" />Call 88264-44334
          </a>
        </div>
      </section>

      {/* Comprehensive Schema Markup */}
      <NoidaPageSchemas
        area="Noida"
        sector="128"
        society="Jaypee Greens"
        pageName="NEET Coaching for Jaypee Greens Noida"
        pageDescription="NEET Biology coaching for Jaypee Greens, Sector 128 Noida students. Online + hybrid mode available."
        pageUrl="https://cerebrumbiologyacademy.com/neet-coaching-jaypee-greens-noida"
        breadcrumbs={[
          { name: 'Home', url: 'https://cerebrumbiologyacademy.com' },
          { name: 'Noida', url: 'https://cerebrumbiologyacademy.com/locations/noida' },
          { name: 'Jaypee Greens', url: 'https://cerebrumbiologyacademy.com/neet-coaching-jaypee-greens-noida' },
        ]}
        customFAQs={faqs}
      />
    </div>
  )
}
