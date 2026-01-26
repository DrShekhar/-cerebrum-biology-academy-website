import { Metadata } from 'next'
import Link from 'next/link'
import { CityHubPage } from '@/components/seo/CityHubPage'
import { getCityData } from '@/data/city-seo/city-hub-data'
import { MapPin, Users, CheckCircle, GraduationCap, Star } from 'lucide-react'

const cityData = getCityData('gurgaon-sector-57')!

export const metadata: Metadata = {
  title: cityData.metaTitle,
  description: cityData.metaDescription,
  keywords: [
    'biology classes sector 57 gurgaon',
    'neet coaching sector 57 gurugram',
    'biology tuition sector 57',
    'best biology teacher sector 57 gurgaon',
    'class 11 biology coaching sector 57',
    'class 12 biology tuition sector 57 gurgaon',
    'neet biology classes near sector 57',
    'scottish high neet coaching',
    'ireo grand arch biology classes',
    'emaar mgf palm terraces tuition',
  ],
  openGraph: {
    title: cityData.metaTitle,
    description: cityData.metaDescription,
    url: 'https://cerebrumbiologyacademy.com/biology-classes-gurgaon-sector-57',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/biology-classes-gurgaon-sector-57',
  },
}

const nearbyLocations = [
  { name: 'Ireo Grand Arch', distance: '6 min', students: '30+' },
  { name: 'Emaar MGF Palm Terraces', distance: '5 min', students: '25+' },
  { name: 'Raheja Atharva', distance: '7 min', students: '18+' },
  { name: 'Bestech Park View Ananda', distance: '8 min', students: '15+' },
  { name: 'Paras Irene', distance: '6 min', students: '12+' },
  { name: 'M3M Merlin', distance: '9 min', students: '10+' },
]

const popularSchools = [
  { name: 'Scottish High International', board: 'CBSE/IB', students: '40+', highlight: true },
  { name: 'Presidium School Sec 57', board: 'CBSE', students: '25+', highlight: false },
  { name: 'Euro International School', board: 'CBSE', students: '20+', highlight: false },
  { name: 'The Shri Ram School', board: 'CBSE', students: '15+', highlight: false },
]

export default function BiologyClassesSector57GurgaonPage() {
  return (
    <>
      <CityHubPage data={cityData} />

      {/* Sector 57 Specific Content */}
      <section className="py-16 bg-gradient-to-br from-purple-50 to-indigo-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Premium NEET Coaching for Sector 57
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Sector 57 is home to Scottish High International and premium residential societies.
              Our Sector 51 center offers specialized coaching for students from this elite neighborhood.
            </p>
          </div>

          {/* Scottish High Highlight */}
          <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl p-8 mb-12 text-white">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <GraduationCap className="w-8 h-8" />
                  <span className="text-lg font-semibold">Scottish High Students</span>
                </div>
                <h3 className="text-2xl font-bold mb-4">40+ Students from Scottish High Trust Us</h3>
                <p className="opacity-90 mb-6">
                  We have a dedicated batch aligned with Scottish High&apos;s schedule. Our faculty understands
                  both CBSE and IB curriculum, helping students excel in NEET while managing school workload.
                </p>
                <div className="flex flex-wrap gap-3">
                  <span className="bg-white/20 px-3 py-1 rounded-full text-sm">IB Biology Support</span>
                  <span className="bg-white/20 px-3 py-1 rounded-full text-sm">CBSE Alignment</span>
                  <span className="bg-white/20 px-3 py-1 rounded-full text-sm">After-School Batch</span>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/10 rounded-xl p-4 text-center">
                  <div className="text-3xl font-bold">320+</div>
                  <div className="text-sm opacity-90">Avg Biology Score</div>
                </div>
                <div className="bg-white/10 rounded-xl p-4 text-center">
                  <div className="text-3xl font-bold">95%</div>
                  <div className="text-sm opacity-90">NEET Qualified</div>
                </div>
                <div className="bg-white/10 rounded-xl p-4 text-center">
                  <div className="text-3xl font-bold">40+</div>
                  <div className="text-sm opacity-90">Scottish High Students</div>
                </div>
                <div className="bg-white/10 rounded-xl p-4 text-center">
                  <div className="text-3xl font-bold">6 min</div>
                  <div className="text-sm opacity-90">From School</div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {/* Distance from Societies */}
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                <MapPin className="w-6 h-6 text-purple-600 mr-2" />
                Sector 57 Societies We Serve
              </h3>
              <div className="space-y-4">
                {nearbyLocations.map((loc) => (
                  <div key={loc.name} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                    <div>
                      <span className="font-medium text-gray-900">{loc.name}</span>
                      <span className="text-sm text-gray-500 ml-2">({loc.students} students)</span>
                    </div>
                    <span className="text-purple-600 font-semibold">{loc.distance}</span>
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
                  <div key={school.name} className={`flex items-center justify-between py-2 border-b border-gray-100 last:border-0 ${school.highlight ? 'bg-purple-50 -mx-2 px-2 rounded-lg' : ''}`}>
                    <div className="flex items-center">
                      <span className="font-medium text-gray-900">{school.name}</span>
                      {school.highlight && <Star className="w-4 h-4 text-yellow-500 ml-2" />}
                      <span className="ml-2 px-2 py-0.5 bg-indigo-100 text-indigo-700 text-xs rounded-full">{school.board}</span>
                    </div>
                    <span className="text-indigo-600 font-semibold">{school.students}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Advantages */}
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Why Sector 57 Families Choose Us</h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-gray-900">IB + NEET Expertise</h4>
                  <p className="text-sm text-gray-600">Special support for IB Biology students preparing for NEET.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-gray-900">After-School Batch</h4>
                  <p className="text-sm text-gray-600">5:30 PM batch perfect for Scottish High students.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-gray-900">Peer Network</h4>
                  <p className="text-sm text-gray-600">Study with 100+ students from your neighborhood.</p>
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
            <Link href="/biology-classes-scottish-high-gurgaon" className="bg-white p-4 rounded-xl hover:shadow-md transition-shadow">
              <h3 className="font-semibold text-teal-600">Scottish High Coaching</h3>
              <p className="text-sm text-gray-600">School-specific page</p>
            </Link>
            <Link href="/biology-classes-gurgaon-sector-56" className="bg-white p-4 rounded-xl hover:shadow-md transition-shadow">
              <h3 className="font-semibold text-teal-600">Sector 56</h3>
              <p className="text-sm text-gray-600">Nearby sector</p>
            </Link>
            <Link href="/icse-neet-coaching-gurugram" className="bg-white p-4 rounded-xl hover:shadow-md transition-shadow">
              <h3 className="font-semibold text-teal-600">ICSE/IB Coaching</h3>
              <p className="text-sm text-gray-600">Board bridge program</p>
            </Link>
            <Link href="/neet-coaching-gurugram" className="bg-white p-4 rounded-xl hover:shadow-md transition-shadow">
              <h3 className="font-semibold text-teal-600">NEET Coaching Hub</h3>
              <p className="text-sm text-gray-600">All programs</p>
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
