import { Metadata } from 'next'
import Link from 'next/link'
import { INDIAN_STATES, getAllStates } from '@/components/seo/StateSchema'
import { MapPin, Users, GraduationCap, ArrowRight, Stethoscope } from 'lucide-react'

export const metadata: Metadata = {
  title: 'NEET Biology Coaching by State | All India Coverage | Cerebrum Academy',
  description:
    'Find the best NEET Biology coaching for your state. Online classes available for Uttar Pradesh, Bihar, Rajasthan, Haryana, Madhya Pradesh, Punjab and all other states. 98% success rate.',
  keywords: [
    'NEET coaching India',
    'state-wise NEET coaching',
    'online NEET classes',
    'NEET biology all states',
    'best NEET coaching India',
  ],
  openGraph: {
    title: 'NEET Biology Coaching by State | Cerebrum Academy',
    description: 'Find NEET Biology coaching for your state. Online classes for all Indian states.',
    type: 'website',
    url: 'https://cerebrumbiologyacademy.com/states',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/states',
  },
}

export default function StatesIndexPage() {
  const states = getAllStates()

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-green-600 via-green-700 to-emerald-800 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
              <MapPin className="w-4 h-4" />
              <span className="text-sm font-medium">Pan-India Coverage</span>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              NEET Biology Coaching for Every State
            </h1>

            <p className="text-xl text-green-100 mb-8 max-w-2xl mx-auto">
              Find specialized NEET coaching for your state. Online classes available everywhere,
              offline centers in Delhi NCR.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                <div className="text-3xl font-bold text-yellow-300">28+</div>
                <div className="text-sm text-green-100">States Served</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                <div className="text-3xl font-bold text-yellow-300">2000+</div>
                <div className="text-sm text-green-100">Students Nationwide</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                <div className="text-3xl font-bold text-yellow-300">98%</div>
                <div className="text-sm text-green-100">Success Rate</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                <div className="text-3xl font-bold text-yellow-300">50+</div>
                <div className="text-sm text-green-100">Countries Reached</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* States Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Select Your State
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Click on your state to see customized information, local medical colleges, and student testimonials.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {states.map((state) => (
              <Link
                key={state.slug}
                href={`/states/${state.slug}`}
                className="group bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all border border-gray-100 overflow-hidden"
              >
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 group-hover:text-green-600 transition-colors">
                        {state.name}
                      </h3>
                      <p className="text-sm text-gray-500 flex items-center gap-1 mt-1">
                        <MapPin className="w-3 h-3" />
                        Capital: {state.capital}
                      </p>
                    </div>
                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center group-hover:bg-green-600 transition-colors">
                      <ArrowRight className="w-5 h-5 text-green-600 group-hover:text-white transition-colors" />
                    </div>
                  </div>

                  {/* Stats Row */}
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="bg-gray-50 rounded-lg p-3">
                      <div className="flex items-center gap-2 text-sm text-gray-500 mb-1">
                        <Stethoscope className="w-4 h-4" />
                        MBBS Seats
                      </div>
                      <div className="font-bold text-gray-900">{state.neetSeats.toLocaleString()}+</div>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-3">
                      <div className="flex items-center gap-2 text-sm text-gray-500 mb-1">
                        <GraduationCap className="w-4 h-4" />
                        Med Colleges
                      </div>
                      <div className="font-bold text-gray-900">{state.medicalColleges.length}+</div>
                    </div>
                  </div>

                  {/* Cities */}
                  <div className="flex flex-wrap gap-2">
                    {state.majorCities.slice(0, 4).map((city) => (
                      <span
                        key={city}
                        className="text-xs bg-green-50 text-green-700 px-2 py-1 rounded-full"
                      >
                        {city}
                      </span>
                    ))}
                    {state.majorCities.length > 4 && (
                      <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                        +{state.majorCities.length - 4} more
                      </span>
                    )}
                  </div>
                </div>

                {/* Footer */}
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 px-6 py-3 border-t border-green-100">
                  <span className="text-sm text-green-700 font-medium group-hover:text-green-800">
                    View {state.name} coaching details →
                  </span>
                </div>
              </Link>
            ))}
          </div>

          {/* Coming Soon States */}
          <div className="mt-12 text-center">
            <p className="text-gray-600 mb-4">
              More states coming soon: Tamil Nadu, Karnataka, Maharashtra, West Bengal, Gujarat, Kerala
            </p>
            <p className="text-sm text-gray-500">
              Our online classes are available for students in ALL states. Contact us for any location.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 bg-green-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Don't See Your State?
          </h2>
          <p className="text-green-100 mb-6 max-w-xl mx-auto">
            Our online NEET Biology classes are available for students from ALL Indian states.
            Contact us to learn more!
          </p>
          <Link
            href="/demo"
            className="inline-flex items-center gap-2 bg-white text-green-600 font-bold px-8 py-4 rounded-xl hover:bg-green-50 transition-colors"
          >
            Book FREE Demo Class
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  )
}
