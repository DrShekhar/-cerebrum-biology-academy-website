import { Metadata } from 'next'
import Link from 'next/link'
import { Phone, MapPin, Monitor, Users, Trophy, Star, CheckCircle, ArrowRight, Building2, Clock, Train } from 'lucide-react'
import { NoidaPageSchemas } from '@/components/seo/NoidaSchemas'

export const metadata: Metadata = {
  title: 'NEET Coaching for Gaur City Noida | Online & Hybrid Classes | Cerebrum',
  description:
    'Best NEET Biology coaching for Gaur City, Greater Noida West students. Online classes from home + optional offline at South Extension. 180+ Gaur City students enrolled. Call 88264-44334!',
  keywords: [
    'neet coaching gaur city',
    'neet coaching greater noida west',
    'biology coaching gaur city noida',
    'neet classes gaur city',
    'online neet coaching noida extension',
    'neet coaching near gaur city',
  ],
  openGraph: {
    title: 'NEET Coaching for Gaur City Noida Students | Cerebrum Academy',
    description: 'Online NEET Biology classes for Gaur City residents. 180+ students enrolled. Hybrid mode available.',
    url: 'https://cerebrumbiologyacademy.com/neet-coaching-gaur-city-noida',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/neet-coaching-gaur-city-noida',
  },
}

const gaurCityTowers = [
  'Gaur City 1 (14th Avenue, 16th Avenue)',
  'Gaur City 2 (5th Avenue, 7th Avenue, 10th Avenue)',
  'Gaur Saundaryam',
  'Gaur Atulyam',
  'Gaur City Mall Area',
  'Gaur Yamuna City',
]

const nearbyAreas = [
  { name: 'Noida Extension', distance: '0 km', students: '180+' },
  { name: 'Sector 150', distance: '5 km', students: '45+' },
  { name: 'Sector 137', distance: '8 km', students: '85+' },
  { name: 'Pari Chowk', distance: '10 km', students: '55+' },
  { name: 'Greater Noida', distance: '12 km', students: '120+' },
]

const testimonials = [
  {
    name: 'Ananya Gupta',
    tower: 'Gaur City 2, 7th Avenue',
    score: '678/720',
    quote: 'Online classes were perfect for me. No travel hassle, and I could revise recorded lectures anytime.',
  },
  {
    name: 'Rohit Sharma',
    tower: 'Gaur Saundaryam',
    score: '662/720',
    quote: 'The hybrid mode worked great - online weekdays and weekend tests at South Extension gave me the best of both worlds.',
  },
  {
    name: 'Priya Singh',
    tower: 'Gaur City 1, 16th Avenue',
    score: '645/720',
    quote: 'Dr. Shekhar teaching style is amazing. Biology became my strongest subject after joining Cerebrum.',
  },
]

const faqs = [
  {
    question: 'Is there a NEET coaching center in Gaur City?',
    answer: 'While we dont have a physical center in Gaur City, we offer live online NEET Biology classes that 180+ Gaur City students attend. For those wanting offline interaction, our South Extension center offers weekend hybrid classes (45 min drive from Gaur City).',
  },
  {
    question: 'How do Gaur City students attend classes?',
    answer: 'Most Gaur City students prefer our 100% online mode - live interactive classes from home with instant doubt resolution. Some opt for hybrid mode with weekend visits to our South Extension center for tests and face-to-face sessions.',
  },
  {
    question: 'What is the fee for NEET coaching for Gaur City students?',
    answer: 'Online Biology classes: Rs 45,000/year. Hybrid mode (online + weekend offline): Rs 55,000/year. Full offline at South Extension: Rs 65,000/year. EMI options available.',
  },
  {
    question: 'How far is South Extension from Gaur City?',
    answer: 'South Extension is approximately 35-40 km from Gaur City, taking about 45-60 minutes via Noida-Greater Noida Expressway. Weekend hybrid students typically visit once a week for tests and doubt sessions.',
  },
]

export default function NEETCoachingGaurCityPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-green-800 to-teal-700 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <span className="inline-flex items-center gap-2 bg-yellow-500 text-green-900 px-4 py-1 rounded-full text-sm font-semibold mb-4">
              <Building2 className="w-4 h-4" />
              Gaur City Noida Extension
            </span>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              NEET Coaching for Gaur City Students
            </h1>
            <p className="text-xl text-green-100 mb-6">
              Online Biology classes from your Gaur City home. 180+ students already enrolled.
              Optional hybrid mode with weekend classes at South Extension.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="tel:+918826444334"
                className="inline-flex items-center gap-2 bg-yellow-500 text-green-900 px-6 py-3 rounded-lg font-semibold hover:bg-yellow-400 transition"
              >
                <Phone className="w-5 h-5" />
                Call 88264-44334
              </a>
              <Link
                href="/free-neet-demo-class-gurugram"
                className="inline-flex items-center gap-2 bg-white/10 text-white px-6 py-3 rounded-lg font-semibold hover:bg-white/20 transition"
              >
                Book Free Demo Class
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="py-8 bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            <div className="text-center p-4 bg-green-50 rounded-xl">
              <Users className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-green-800">180+</p>
              <p className="text-sm text-gray-600">Gaur City Students</p>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-xl">
              <Trophy className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-green-800">98%</p>
              <p className="text-sm text-gray-600">Success Rate</p>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-xl">
              <Star className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-green-800">4.9/5</p>
              <p className="text-sm text-gray-600">Student Rating</p>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-xl">
              <Monitor className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-green-800">Live</p>
              <p className="text-sm text-gray-600">Interactive Classes</p>
            </div>
          </div>
        </div>
      </section>

      {/* Learning Modes */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4">Choose Your Learning Mode</h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            Study from your Gaur City apartment or combine online learning with weekend visits to our South Extension center
          </p>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {/* Online Mode */}
            <div className="bg-green-50 rounded-2xl p-6 border-2 border-green-200">
              <div className="w-12 h-12 bg-green-600 rounded-xl flex items-center justify-center mb-4">
                <Monitor className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2">100% Online</h3>
              <p className="text-gray-600 mb-4">Live classes from your Gaur City home. Most popular among our students.</p>
              <ul className="space-y-2 text-sm mb-4">
                <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-green-600" />Live interactive sessions</li>
                <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-green-600" />Recorded lectures</li>
                <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-green-600" />WhatsApp doubt support</li>
              </ul>
              <p className="text-2xl font-bold text-green-700">Rs 45,000<span className="text-sm font-normal text-gray-500">/year</span></p>
            </div>

            {/* Hybrid Mode - Recommended */}
            <div className="bg-yellow-400 rounded-2xl p-6 relative">
              <span className="absolute top-0 right-0 bg-green-800 text-yellow-400 text-xs font-bold px-3 py-1 rounded-bl-lg rounded-tr-xl">RECOMMENDED</span>
              <div className="w-12 h-12 bg-green-800 rounded-xl flex items-center justify-center mb-4">
                <Building2 className="w-6 h-6 text-yellow-400" />
              </div>
              <h3 className="text-xl font-bold mb-2">Hybrid Mode</h3>
              <p className="text-green-900 mb-4">Online + Weekend offline at South Extension. Best of both worlds.</p>
              <ul className="space-y-2 text-sm mb-4">
                <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-green-800" />All online benefits</li>
                <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-green-800" />Weekend tests at center</li>
                <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-green-800" />Face-to-face doubt sessions</li>
              </ul>
              <p className="text-2xl font-bold text-green-900">Rs 55,000<span className="text-sm font-normal text-green-800">/year</span></p>
            </div>

            {/* Full Offline */}
            <div className="bg-blue-50 rounded-2xl p-6 border-2 border-blue-200">
              <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center mb-4">
                <MapPin className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2">Full Offline</h3>
              <p className="text-gray-600 mb-4">Daily classes at South Extension. For dedicated commuters.</p>
              <ul className="space-y-2 text-sm mb-4">
                <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-blue-600" />Classroom environment</li>
                <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-blue-600" />Small batch (15 students)</li>
                <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-blue-600" />Library access</li>
              </ul>
              <p className="text-2xl font-bold text-blue-700">Rs 65,000<span className="text-sm font-normal text-gray-500">/year</span></p>
            </div>
          </div>
        </div>
      </section>

      {/* Towers Covered */}
      <section className="py-16 bg-green-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Students from All Gaur City Towers</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
            {gaurCityTowers.map((tower, index) => (
              <div key={index} className="bg-white rounded-xl p-4 shadow-sm">
                <Building2 className="w-5 h-5 text-green-600 mb-2" />
                <p className="font-medium text-gray-800">{tower}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Gaur City Success Stories</h2>
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {testimonials.map((t, index) => (
              <div key={index} className="bg-gray-50 rounded-xl p-6">
                <div className="flex gap-1 mb-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                  ))}
                </div>
                <p className="text-gray-700 italic mb-4">"{t.quote}"</p>
                <div className="border-t pt-4">
                  <p className="font-bold">{t.name}</p>
                  <p className="text-sm text-gray-500">{t.tower}</p>
                  <p className="text-green-600 font-semibold">{t.score} in NEET</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* South Extension Info */}
      <section className="py-16 bg-slate-900 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-8">South Extension Offline Center</h2>
            <div className="bg-white/10 rounded-2xl p-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-xl font-bold mb-4">Travel from Gaur City</h3>
                  <ul className="space-y-3">
                    <li className="flex items-center gap-3">
                      <Clock className="w-5 h-5 text-yellow-400" />
                      <span>45-60 minutes via Noida-Greater Noida Expressway</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <Train className="w-5 h-5 text-yellow-400" />
                      <span>Aqua Line to Blue Line + Auto (90 min)</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <MapPin className="w-5 h-5 text-yellow-400" />
                      <span>M-Block, South Extension Part 1, Delhi</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-4">Why Visit?</h3>
                  <ul className="space-y-2 text-slate-300">
                    <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-green-400" />Weekly mock tests in exam-like environment</li>
                    <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-green-400" />Face-to-face doubt clearing sessions</li>
                    <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-green-400" />Meet Dr. Shekhar Singh personally</li>
                    <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-green-400" />Study with other serious aspirants</li>
                  </ul>
                </div>
              </div>
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
                <summary className="px-6 py-4 cursor-pointer font-semibold flex items-center justify-between hover:bg-gray-50">
                  {faq.question}
                  <span className="text-gray-600 group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <p className="px-6 pb-4 text-gray-600">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-green-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Start Your NEET Journey from Gaur City</h2>
          <p className="text-xl text-green-100 mb-8">Join 180+ Gaur City students already preparing with us</p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="tel:+918826444334"
              className="inline-flex items-center gap-2 bg-yellow-500 text-green-900 px-8 py-3 rounded-lg font-semibold hover:bg-yellow-400 transition"
            >
              <Phone className="w-5 h-5" />
              Call 88264-44334
            </a>
            <Link
              href="/neet-coaching-noida"
              className="inline-flex items-center gap-2 bg-white/10 text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/20 transition"
            >
              Explore Noida Programs <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Comprehensive Schema Markup */}
      <NoidaPageSchemas
        area="Greater Noida West"
        society="Gaur City"
        pageName="NEET Coaching for Gaur City Noida"
        pageDescription="NEET Biology coaching for Gaur City, Greater Noida West students. Online classes + hybrid mode available."
        pageUrl="https://cerebrumbiologyacademy.com/neet-coaching-gaur-city-noida"
        breadcrumbs={[
          { name: 'Home', url: 'https://cerebrumbiologyacademy.com' },
          { name: 'NEET Coaching Noida', url: 'https://cerebrumbiologyacademy.com/neet-coaching-noida' },
          { name: 'Gaur City', url: 'https://cerebrumbiologyacademy.com/neet-coaching-gaur-city-noida' },
        ]}
        customFAQs={faqs}
        coordinates={{ lat: '28.5708', lng: '77.4522' }}
      />
    </div>
  )
}
