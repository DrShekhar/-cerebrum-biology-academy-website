import { Metadata } from 'next'
import Link from 'next/link'
import { CityHubPage } from '@/components/seo/CityHubPage'
import { getCityData } from '@/data/city-seo/city-hub-data'
import { MapPin, Users, CheckCircle, Building, Train } from 'lucide-react'

const cityData = getCityData('gurgaon-sector-55')!

export const metadata: Metadata = {
  title: 'Biology Classes in Sector 55 Gurgaon | NEET Coaching Near You | Cerebrum Academy',
  description:
    'Best biology classes for Sector 55 Gurgaon students. Center in Sector 51 (4 min). AIIMS faculty, 15+ years exp, 98% success. Book demo: 88264-44334!',
  keywords: [
    'biology classes Sector 55 Gurgaon',
    'NEET coaching Sector 55',
    'best biology coaching Gurgaon',
    'AIIMS faculty',
    'Dr. Shekhar Singh',
    'Rapid Metro Gurgaon coaching',
    'sector 55 neet classes',
    'golf course extension biology tuition',
    'emaar palm hills biology classes',
    'bestech park view sector 55 coaching',
  ],
  openGraph: {
    title: 'Biology Classes in Sector 55 Gurgaon | NEET Coaching Near You | Cerebrum Academy',
    description:
      'Best biology classes for Sector 55 Gurgaon students. Center in Sector 51 (4 min). AIIMS faculty, 15+ years exp, 98% success. Book demo: 88264-44334!',
    url: 'https://cerebrumbiologyacademy.com/biology-classes-gurgaon-sector-55',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/biology-classes-gurgaon-sector-55',
  },
}

const nearbyLocations = [
  { name: 'Emaar Palm Hills', distance: '4 min', students: '20+' },
  { name: 'Bestech Park View City', distance: '5 min', students: '25+' },
  { name: 'Orchid Island', distance: '6 min', students: '15+' },
  { name: 'Vipul Lavanya', distance: '5 min', students: '12+' },
  { name: 'Raheja Navodaya', distance: '7 min', students: '10+' },
  { name: 'SS The Leaf', distance: '8 min', students: '8+' },
]

const popularSchools = [
  { name: 'The Millennium School', board: 'CBSE', students: '22+' },
  { name: 'Euro International School', board: 'CBSE', students: '18+' },
  { name: 'KR Mangalam World School', board: 'CBSE', students: '15+' },
  { name: 'Apeejay School', board: 'CBSE', students: '12+' },
]

export default function Sector55GurgaonPage() {
  return (
    <>
      <CityHubPage data={cityData} />

      {/* Sector 55 Specific Content */}
      <section className="py-16 bg-gradient-to-br from-teal-50 to-green-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              NEET Coaching for Sector 55 Students
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Sector 55 is a rapidly developing residential hub on Golf Course Extension Road.
              Our Sector 51 center is just 4 minutes away, making it the most convenient coaching option.
            </p>
          </div>

          {/* Metro Connectivity Highlight */}
          <div className="bg-gradient-to-r from-teal-600 to-green-600 rounded-2xl p-8 mb-12 text-white">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <Train className="w-8 h-8" />
                  <span className="text-lg font-semibold">Excellent Connectivity</span>
                </div>
                <h3 className="text-2xl font-bold mb-4">Just 4 Minutes from Sector 55</h3>
                <p className="opacity-90 mb-6">
                  Our Sector 51 center is easily accessible via Golf Course Extension Road.
                  Students from Sector 55 societies can reach us quickly without any traffic hassles.
                </p>
                <div className="flex flex-wrap gap-3">
                  <span className="bg-white/20 px-3 py-1 rounded-full text-sm">4 min by car</span>
                  <span className="bg-white/20 px-3 py-1 rounded-full text-sm">Free parking</span>
                  <span className="bg-white/20 px-3 py-1 rounded-full text-sm">Carpool available</span>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/10 rounded-xl p-4 text-center">
                  <div className="text-3xl font-bold">90+</div>
                  <div className="text-sm opacity-90">Sector 55 Students</div>
                </div>
                <div className="bg-white/10 rounded-xl p-4 text-center">
                  <div className="text-3xl font-bold">98%</div>
                  <div className="text-sm opacity-90">Success Rate</div>
                </div>
                <div className="bg-white/10 rounded-xl p-4 text-center">
                  <div className="text-3xl font-bold">4 min</div>
                  <div className="text-sm opacity-90">Distance</div>
                </div>
                <div className="bg-white/10 rounded-xl p-4 text-center">
                  <div className="text-3xl font-bold">5</div>
                  <div className="text-sm opacity-90">Batch Options</div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {/* Distance from Societies */}
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                <Building className="w-6 h-6 text-teal-600 mr-2" />
                Sector 55 Societies We Serve
              </h3>
              <div className="space-y-4">
                {nearbyLocations.map((loc) => (
                  <div key={loc.name} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                    <div>
                      <span className="font-medium text-gray-900">{loc.name}</span>
                      <span className="text-sm text-gray-500 ml-2">({loc.students} students)</span>
                    </div>
                    <span className="text-teal-600 font-semibold">{loc.distance}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Schools Served */}
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                <Users className="w-6 h-6 text-green-600 mr-2" />
                Students from Nearby Schools
              </h3>
              <div className="space-y-4">
                {popularSchools.map((school) => (
                  <div key={school.name} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                    <div>
                      <span className="font-medium text-gray-900">{school.name}</span>
                      <span className="ml-2 px-2 py-0.5 bg-green-100 text-green-700 text-xs rounded-full">{school.board}</span>
                    </div>
                    <span className="text-green-600 font-semibold">{school.students}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Advantages */}
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Why Sector 55 Families Choose Us</h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-gray-900">Shortest Commute</h4>
                  <p className="text-sm text-gray-600">Just 4 minutes to our Sector 51 center via Golf Course Extension.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-gray-900">Evening Batches</h4>
                  <p className="text-sm text-gray-600">Perfect 6-8 PM timing for students after school hours.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-gray-900">Sector 55 Study Group</h4>
                  <p className="text-sm text-gray-600">Connect with 90+ students from your neighborhood.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Pages */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Explore More</h2>
          <div className="grid md:grid-cols-4 gap-4">
            <Link href="/neet-coaching-gurugram" className="bg-white p-4 rounded-xl hover:shadow-md transition-shadow">
              <h3 className="font-semibold text-teal-600">NEET Coaching Hub</h3>
              <p className="text-sm text-gray-600">All Gurugram programs</p>
            </Link>
            <Link href="/biology-classes-gurgaon-sector-51" className="bg-white p-4 rounded-xl hover:shadow-md transition-shadow">
              <h3 className="font-semibold text-teal-600">Sector 51 Center</h3>
              <p className="text-sm text-gray-600">Our flagship location</p>
            </Link>
            <Link href="/biology-classes-gurgaon-sector-56" className="bg-white p-4 rounded-xl hover:shadow-md transition-shadow">
              <h3 className="font-semibold text-teal-600">Sector 56</h3>
              <p className="text-sm text-gray-600">Nearby sector</p>
            </Link>
            <Link href="/online-neet-classes-gurugram" className="bg-white p-4 rounded-xl hover:shadow-md transition-shadow">
              <h3 className="font-semibold text-teal-600">Online Classes</h3>
              <p className="text-sm text-gray-600">Learn from home</p>
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
