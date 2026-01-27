import { Metadata } from 'next'
import Link from 'next/link'
import { CityHubPage } from '@/components/seo/CityHubPage'
import { getCityData } from '@/data/city-seo/city-hub-data'
import { Users, CheckCircle, Building, Clock } from 'lucide-react'

const cityData = getCityData('gurgaon-sector-56')!

export const metadata: Metadata = {
  title: cityData.metaTitle,
  description: cityData.metaDescription,
  keywords: [
    'biology classes sector 56 gurgaon',
    'neet coaching sector 56 gurugram',
    'biology tuition sector 56',
    'best biology teacher sector 56 gurgaon',
    'class 11 biology coaching sector 56',
    'class 12 biology tuition sector 56 gurgaon',
    'neet biology classes near sector 56',
    'golf course extension road neet coaching',
    'tulip violet biology classes',
    'bestech park view sector 56 tuition',
  ],
  openGraph: {
    title: cityData.metaTitle,
    description: cityData.metaDescription,
    url: 'https://cerebrumbiologyacademy.com/biology-classes-gurgaon-sector-56',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/biology-classes-gurgaon-sector-56',
  },
}

const nearbyLocations = [
  { name: 'Tulip Violet', distance: '4 min', students: '22+' },
  { name: 'Bestech Park View Spa', distance: '5 min', students: '28+' },
  { name: 'Emerald Hills', distance: '6 min', students: '18+' },
  { name: 'Orchid Petals', distance: '5 min', students: '15+' },
  { name: 'Vipul Greens', distance: '7 min', students: '12+' },
  { name: 'Emaar Palm Gardens', distance: '8 min', students: '10+' },
]

const popularSchools = [
  { name: 'Lotus Valley International', board: 'CBSE', students: '25+' },
  { name: 'Scottish High International', board: 'CBSE/IB', students: '30+' },
  { name: 'Euro International School', board: 'CBSE', students: '18+' },
  { name: 'DPS Gurugram', board: 'CBSE', students: '20+' },
]

export default function BiologyClassesSector56GurgaonPage() {
  return (
    <>
      <CityHubPage data={cityData} />

      {/* Sector 56 Specific Content */}
      <section className="py-16 bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              NEET Coaching for Sector 56 Students
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Sector 56 is a premium residential area on Golf Course Extension Road with excellent connectivity.
              Our Sector 51 center is just 5 minutes away, making it convenient for all Sector 56 residents.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {/* Distance from Societies */}
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                <Building className="w-6 h-6 text-blue-600 mr-2" />
                Sector 56 Societies We Serve
              </h3>
              <div className="space-y-4">
                {nearbyLocations.map((loc) => (
                  <div key={loc.name} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                    <div>
                      <span className="font-medium text-gray-900">{loc.name}</span>
                      <span className="text-sm text-gray-500 ml-2">({loc.students} students)</span>
                    </div>
                    <span className="text-blue-600 font-semibold">{loc.distance}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Schools Served */}
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                <Users className="w-6 h-6 text-indigo-600 mr-2" />
                Students from Nearby Schools
              </h3>
              <div className="space-y-4">
                {popularSchools.map((school) => (
                  <div key={school.name} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                    <div>
                      <span className="font-medium text-gray-900">{school.name}</span>
                      <span className="ml-2 px-2 py-0.5 bg-indigo-100 text-indigo-700 text-xs rounded-full">{school.board}</span>
                    </div>
                    <span className="text-indigo-600 font-semibold">{school.students}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Why Choose Us */}
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Why Sector 56 Families Trust Us</h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-gray-900">Prime Location</h4>
                  <p className="text-sm text-gray-600">M2K Corporate Park on Golf Course Extension - easy access from Sector 56.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-gray-900">Flexible Timings</h4>
                  <p className="text-sm text-gray-600">Morning, evening, and weekend batches to suit your schedule.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-gray-900">Carpool Community</h4>
                  <p className="text-sm text-gray-600">Join other Sector 56 students for convenient carpooling to classes.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Batch Timings */}
          <div className="mt-8 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 text-white">
            <h3 className="text-xl font-bold mb-6 flex items-center">
              <Clock className="w-6 h-6 mr-2" />
              Available Batches for Sector 56 Students
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white/10 rounded-lg p-4 text-center">
                <div className="font-bold text-lg">Morning</div>
                <div className="text-sm opacity-90">6:30 - 8:30 AM</div>
              </div>
              <div className="bg-white/10 rounded-lg p-4 text-center">
                <div className="font-bold text-lg">Afternoon</div>
                <div className="text-sm opacity-90">2:00 - 4:00 PM</div>
              </div>
              <div className="bg-white/10 rounded-lg p-4 text-center">
                <div className="font-bold text-lg">Evening</div>
                <div className="text-sm opacity-90">6:00 - 8:00 PM</div>
              </div>
              <div className="bg-white/10 rounded-lg p-4 text-center">
                <div className="font-bold text-lg">Weekend</div>
                <div className="text-sm opacity-90">Full Day</div>
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
            <Link href="/biology-classes-gurgaon-sector-57" className="bg-white p-4 rounded-xl hover:shadow-md transition-shadow">
              <h3 className="font-semibold text-teal-600">Sector 57</h3>
              <p className="text-sm text-gray-600">Nearby sector page</p>
            </Link>
            <Link href="/biology-classes-golf-course-road-gurgaon" className="bg-white p-4 rounded-xl hover:shadow-md transition-shadow">
              <h3 className="font-semibold text-teal-600">Golf Course Road</h3>
              <p className="text-sm text-gray-600">Premium locality</p>
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
