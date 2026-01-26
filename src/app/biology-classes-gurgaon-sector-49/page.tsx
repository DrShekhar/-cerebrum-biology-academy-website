import { Metadata } from 'next'
import Link from 'next/link'
import { CityHubPage } from '@/components/seo/CityHubPage'
import { getCityData } from '@/data/city-seo/city-hub-data'
import { MapPin, Clock, Users, Star, CheckCircle, ArrowRight } from 'lucide-react'

const cityData = getCityData('gurgaon-sector-49')!

export const metadata: Metadata = {
  title: cityData.metaTitle,
  description: cityData.metaDescription,
  keywords: [
    'biology classes sector 49 gurgaon',
    'neet coaching sector 49 gurugram',
    'biology tuition sector 49',
    'best biology teacher sector 49 gurgaon',
    'class 11 biology coaching sector 49',
    'class 12 biology tuition sector 49 gurgaon',
    'neet biology classes near sector 49',
    'south city 2 neet coaching',
    'eldeco acacia biology classes',
    'uppal southend biology tuition',
  ],
  openGraph: {
    title: cityData.metaTitle,
    description: cityData.metaDescription,
    url: 'https://cerebrumbiologyacademy.com/biology-classes-gurgaon-sector-49',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/biology-classes-gurgaon-sector-49',
  },
}

const nearbyLocations = [
  { name: 'Eldeco Acacia', distance: '3 min', students: '25+' },
  { name: 'Uppal Southend', distance: '4 min', students: '20+' },
  { name: 'South City 2', distance: '5 min', students: '35+' },
  { name: 'Suncity', distance: '6 min', students: '15+' },
  { name: 'Bestech Park View', distance: '7 min', students: '18+' },
  { name: 'Uniworld Gardens', distance: '8 min', students: '12+' },
]

const popularSchools = [
  { name: 'DAV Public School Sec 49', board: 'CBSE', students: '30+' },
  { name: 'Ryan International', board: 'CBSE', students: '25+' },
  { name: 'Presidium School', board: 'CBSE', students: '20+' },
  { name: 'Amity International', board: 'CBSE', students: '15+' },
]

export default function BiologyClassesSector49GurgaonPage() {
  return (
    <>
      <CityHubPage data={cityData} />

      {/* Sector 49 Specific Content */}
      <section className="py-16 bg-gradient-to-br from-green-50 to-teal-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Sector 49 Students Choose Us
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Sector 49 is one of Gurugram&apos;s most prominent residential hubs with premium societies
              and excellent schools. Our center at M2K Corporate Park, Sector 51 is just 5 minutes away.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {/* Distance from Societies */}
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                <MapPin className="w-6 h-6 text-green-600 mr-2" />
                Distance from Sector 49 Societies
              </h3>
              <div className="space-y-4">
                {nearbyLocations.map((loc) => (
                  <div key={loc.name} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                    <div>
                      <span className="font-medium text-gray-900">{loc.name}</span>
                      <span className="text-sm text-gray-500 ml-2">({loc.students} students)</span>
                    </div>
                    <span className="text-green-600 font-semibold">{loc.distance}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Schools Served */}
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                <Users className="w-6 h-6 text-blue-600 mr-2" />
                Students from Sector 49 Schools
              </h3>
              <div className="space-y-4">
                {popularSchools.map((school) => (
                  <div key={school.name} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                    <div>
                      <span className="font-medium text-gray-900">{school.name}</span>
                      <span className="ml-2 px-2 py-0.5 bg-blue-100 text-blue-700 text-xs rounded-full">{school.board}</span>
                    </div>
                    <span className="text-blue-600 font-semibold">{school.students}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sector 49 Advantages */}
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Advantages for Sector 49 Residents</h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-gray-900">Quick Commute</h4>
                  <p className="text-sm text-gray-600">Just 5 minutes via Golf Course Extension Road. No traffic hassles.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-gray-900">Evening Batches</h4>
                  <p className="text-sm text-gray-600">Perfect timing for school students - 6-8 PM after school ends.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-gray-900">Sector 49 Study Group</h4>
                  <p className="text-sm text-gray-600">Connect with 100+ students from your neighborhood for group study.</p>
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
            <Link href="/cbse-neet-coaching-gurugram" className="bg-white p-4 rounded-xl hover:shadow-md transition-shadow">
              <h3 className="font-semibold text-teal-600">CBSE NEET Coaching</h3>
              <p className="text-sm text-gray-600">Board-aligned program</p>
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
