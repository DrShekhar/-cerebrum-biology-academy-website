import { Metadata } from 'next'
import Link from 'next/link'
import { MapPin, Users, Trophy, ArrowRight, Phone, MessageCircle } from 'lucide-react'
import { CONTACT_INFO } from '@/lib/constants/contactInfo'

export const metadata: Metadata = {
  title: 'NEET Coaching by State | Best Biology Coaching in Your State | Cerebrum',
  description:
    'Find the best NEET Biology coaching in your state. Cerebrum Biology Academy offers specialized coaching for students from UP, Bihar, Rajasthan, Haryana, MP, Punjab with state-board aligned preparation.',
  keywords: [
    'neet coaching by state',
    'neet coaching uttar pradesh',
    'neet coaching bihar',
    'neet coaching rajasthan',
    'neet coaching haryana',
    'neet coaching madhya pradesh',
    'neet coaching punjab',
    'best neet biology coaching india',
  ],
  openGraph: {
    title: 'NEET Coaching by State | Cerebrum Biology Academy',
    description: 'State-specific NEET Biology coaching with 98% success rate.',
    url: 'https://cerebrumbiologyacademy.com/states',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/states',
  },
}

const states = [
  {
    name: 'Uttar Pradesh',
    slug: 'uttar-pradesh',
    shortName: 'UP',
    students: '2,500+',
    successRate: '97%',
    toppers: 45,
    cities: ['Lucknow', 'Kanpur', 'Varanasi', 'Agra', 'Noida', 'Ghaziabad'],
    highlights: ['UP Board aligned study material', 'Hindi medium support', 'Highest student count from single state'],
  },
  {
    name: 'Bihar',
    slug: 'bihar',
    shortName: 'Bihar',
    students: '1,800+',
    successRate: '96%',
    toppers: 38,
    cities: ['Patna', 'Gaya', 'Muzaffarpur', 'Bhagalpur', 'Darbhanga'],
    highlights: ['Bihar Board preparation', 'Special hostel facilities', 'Scholarship for meritorious students'],
  },
  {
    name: 'Rajasthan',
    slug: 'rajasthan',
    shortName: 'Rajasthan',
    students: '1,200+',
    successRate: '98%',
    toppers: 32,
    cities: ['Jaipur', 'Jodhpur', 'Kota', 'Udaipur', 'Ajmer'],
    highlights: ['Competition with Kota standards', 'RBSE aligned content', 'Weekend batches available'],
  },
  {
    name: 'Haryana',
    slug: 'haryana',
    shortName: 'Haryana',
    students: '900+',
    successRate: '98%',
    toppers: 28,
    cities: ['Gurugram', 'Faridabad', 'Rohtak', 'Hisar', 'Panipat'],
    highlights: ['Local center in Gurugram', 'HBSE board support', 'Direct faculty access'],
  },
  {
    name: 'Madhya Pradesh',
    slug: 'madhya-pradesh',
    shortName: 'MP',
    students: '800+',
    successRate: '97%',
    toppers: 22,
    cities: ['Bhopal', 'Indore', 'Gwalior', 'Jabalpur', 'Ujjain'],
    highlights: ['MP Board syllabus coverage', 'Online live classes', 'Regional language support'],
  },
  {
    name: 'Punjab',
    slug: 'punjab',
    shortName: 'Punjab',
    students: '600+',
    successRate: '96%',
    toppers: 18,
    cities: ['Chandigarh', 'Ludhiana', 'Amritsar', 'Jalandhar', 'Patiala'],
    highlights: ['PSEB board alignment', 'Punjabi medium notes', 'Special medical college guidance'],
  },
]

export default function StatesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-700 to-indigo-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full text-sm mb-6">
              <MapPin className="w-4 h-4" />
              Pan-India Presence
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              NEET Biology Coaching by State
            </h1>
            <p className="text-lg md:text-xl text-blue-100 max-w-3xl mx-auto mb-6">
              Specialized NEET preparation tailored to your state board. Join 8,000+ students from across India
              who chose Cerebrum for their medical dreams.
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <span className="bg-white/20 px-4 py-2 rounded-full flex items-center gap-2">
                <Users className="w-4 h-4" />
                8,000+ Students Pan-India
              </span>
              <span className="bg-white/20 px-4 py-2 rounded-full flex items-center gap-2">
                <Trophy className="w-4 h-4" />
                98% Average Success Rate
              </span>
              <span className="bg-white/20 px-4 py-2 rounded-full flex items-center gap-2">
                <MapPin className="w-4 h-4" />6 States Covered
              </span>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* State Cards Grid */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            Select Your State
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {states.map((state) => (
              <Link
                key={state.slug}
                href={`/states/${state.slug}`}
                className="group bg-white rounded-2xl border border-gray-200 p-6 hover:shadow-xl hover:border-blue-300 transition-all duration-300"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                      {state.name}
                    </h3>
                    <p className="text-sm text-gray-500">{state.cities.slice(0, 3).join(', ')}...</p>
                  </div>
                  <div className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-semibold">
                    {state.shortName}
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4 mb-4">
                  <div className="text-center">
                    <div className="text-lg font-bold text-blue-600">{state.students}</div>
                    <div className="text-xs text-gray-500">Students</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-green-600">{state.successRate}</div>
                    <div className="text-xs text-gray-500">Success</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-amber-600">{state.toppers}</div>
                    <div className="text-xs text-gray-500">Toppers</div>
                  </div>
                </div>

                <ul className="space-y-2 mb-4">
                  {state.highlights.map((highlight, idx) => (
                    <li key={idx} className="text-sm text-gray-600 flex items-start gap-2">
                      <span className="text-green-500 mt-0.5">✓</span>
                      {highlight}
                    </li>
                  ))}
                </ul>

                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <span className="text-sm text-blue-600 font-medium group-hover:underline">
                    View Details
                  </span>
                  <ArrowRight className="w-4 h-4 text-blue-600 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Why Choose State-Specific Section */}
        <section className="bg-blue-50 rounded-2xl p-8 mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Why State-Specific NEET Preparation Matters
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-xl">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <span className="text-2xl">📚</span>
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Board-Aligned Content</h3>
              <p className="text-gray-600 text-sm">
                Study materials that bridge your state board syllabus with NEET requirements,
                making transition seamless.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <span className="text-2xl">🗣️</span>
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Regional Language Support</h3>
              <p className="text-gray-600 text-sm">
                Doubt sessions and study notes available in Hindi and regional languages
                for better concept clarity.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl">
              <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mb-4">
                <span className="text-2xl">🎯</span>
              </div>
              <h3 className="font-bold text-gray-900 mb-2">State Quota Guidance</h3>
              <p className="text-gray-600 text-sm">
                Expert counseling for state quota seats, domicile requirements, and
                medical college preferences.
              </p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-gradient-to-r from-green-600 to-blue-600 rounded-2xl p-8 text-white text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Can&apos;t Find Your State?
          </h2>
          <p className="text-green-100 mb-6 max-w-2xl mx-auto">
            We accept students from all states across India. Contact us for customized preparation
            plans based on your state board and requirements.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={`https://wa.me/${CONTACT_INFO.whatsapp.number}?text=${encodeURIComponent('Hi, I want to know about NEET coaching for my state')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-white text-green-600 hover:bg-green-50 font-semibold px-8 py-4 rounded-xl transition-colors"
            >
              <MessageCircle className="w-5 h-5" />
              WhatsApp Us
            </a>
            <a
              href={`tel:${CONTACT_INFO.phone.primary}`}
              className="inline-flex items-center justify-center gap-2 bg-green-500 hover:bg-green-400 text-white font-semibold px-8 py-4 rounded-xl transition-colors"
            >
              <Phone className="w-5 h-5" />
              Call {CONTACT_INFO.phone.display.primary}
            </a>
          </div>
        </section>
      </div>
    </div>
  )
}
