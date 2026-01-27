import { Metadata } from 'next'
import Link from 'next/link'
import { CityHubPage } from '@/components/seo/CityHubPage'
import { getCityData } from '@/data/city-seo/city-hub-data'
import { MapPin, Users, Building, Star, Phone, Clock, Award } from 'lucide-react'
import { CONTACT_INFO } from '@/lib/constants/contactInfo'

const cityData = getCityData('gurgaon-sector-51')!

export const metadata: Metadata = {
  title: cityData.metaTitle,
  description: cityData.metaDescription,
  keywords: [
    'biology classes sector 51 gurgaon',
    'neet coaching sector 51 gurugram',
    'biology tuition m2k corporate park',
    'best biology teacher sector 51',
    'class 11 biology coaching sector 51 gurgaon',
    'class 12 biology tuition sector 51',
    'neet biology classes golf course extension road',
    'cerebrum biology academy sector 51',
    'dr shekhar singh biology classes',
    'aiims faculty neet coaching gurgaon',
  ],
  openGraph: {
    title: cityData.metaTitle,
    description: cityData.metaDescription,
    url: 'https://cerebrumbiologyacademy.com/biology-classes-gurgaon-sector-51',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/biology-classes-gurgaon-sector-51',
  },
}

const centerFeatures = [
  { name: 'AC Classrooms', description: 'Modern air-conditioned classrooms with projectors' },
  { name: 'Free Parking', description: 'Ample parking space for 2-wheelers and cars' },
  { name: 'Study Area', description: 'Self-study area available before/after classes' },
  { name: 'Cafeteria', description: 'Refreshments available in the building' },
]

const nearbySocieties = [
  { name: 'Nirvana Country', distance: '3 min', students: '45+' },
  { name: 'The Close South', distance: '4 min', students: '35+' },
  { name: 'Central Park 1 & 2', distance: '6 min', students: '50+' },
  { name: 'Eldeco Acacia', distance: '5 min', students: '25+' },
  { name: 'Uppal Southend', distance: '5 min', students: '20+' },
  { name: 'Palm Springs', distance: '7 min', students: '15+' },
]

const batchTimings = [
  { name: 'Early Morning', time: '6:30 - 8:30 AM', target: 'Before school students' },
  { name: 'Morning', time: '8:30 - 10:30 AM', target: 'Homeschool/Droppers' },
  { name: 'Afternoon', time: '2:00 - 4:00 PM', target: 'After school' },
  { name: 'Evening', time: '6:00 - 8:00 PM', target: 'After school' },
  { name: 'Weekend', time: 'Sat-Sun Full Day', target: 'Working parents' },
]

export default function BiologyClassesSector51GurgaonPage() {
  return (
    <>
      <CityHubPage data={cityData} />

      {/* Flagship Center Section */}
      <section className="py-16 bg-gradient-to-br from-green-600 to-teal-700 text-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full text-sm font-medium mb-6">
                <Star className="w-4 h-4" />
                Flagship Gurugram Center
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Visit Our Sector 51 Center
              </h2>
              <p className="text-lg opacity-90 mb-8">
                M2K Corporate Park, Sector 51 is our flagship center serving all of Gurugram.
                Experience premium NEET Biology coaching with AIIMS-trained Dr. Shekhar Singh.
              </p>
              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-3">
                  <MapPin className="w-5 h-5" />
                  <span>{CONTACT_INFO.location.gurugram.streetAddress}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5" />
                  <span>{CONTACT_INFO.phone.primary}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5" />
                  <span>Open 6:30 AM - 8:30 PM (Mon-Sat)</span>
                </div>
              </div>
              <div className="flex flex-wrap gap-4">
                <Link href="/demo-booking" className="bg-white text-green-700 px-6 py-3 rounded-lg font-semibold hover:bg-green-50 transition-colors">
                  Book Free Demo
                </Link>
                <a href={CONTACT_INFO.location.gurugram.mapUrl} target="_blank" rel="noopener" className="bg-white/20 text-white px-6 py-3 rounded-lg font-semibold hover:bg-white/30 transition-colors">
                  Get Directions
                </a>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {centerFeatures.map((feature) => (
                <div key={feature.name} className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                  <h3 className="font-bold text-lg mb-2">{feature.name}</h3>
                  <p className="text-sm opacity-90">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-4xl font-bold text-green-600">300+</div>
              <div className="text-sm text-gray-600 mt-1">Sector 51 Students</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-green-600">98%</div>
              <div className="text-sm text-gray-600 mt-1">Success Rate</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-green-600">4.9</div>
              <div className="text-sm text-gray-600 mt-1">Google Rating</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-green-600">15+</div>
              <div className="text-sm text-gray-600 mt-1">Years Experience</div>
            </div>
          </div>
        </div>
      </section>

      {/* Nearby Societies & Batch Timings */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Nearby Societies */}
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                <Building className="w-6 h-6 text-green-600 mr-2" />
                Nearby Societies
              </h3>
              <div className="space-y-4">
                {nearbySocieties.map((society) => (
                  <div key={society.name} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                    <div>
                      <span className="font-medium text-gray-900">{society.name}</span>
                      <span className="text-sm text-gray-500 ml-2">({society.students} students)</span>
                    </div>
                    <span className="text-green-600 font-semibold">{society.distance}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Batch Timings */}
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                <Clock className="w-6 h-6 text-blue-600 mr-2" />
                Available Batches
              </h3>
              <div className="space-y-4">
                {batchTimings.map((batch) => (
                  <div key={batch.name} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                    <div>
                      <span className="font-medium text-gray-900">{batch.name}</span>
                      <span className="text-sm text-gray-500 ml-2">({batch.target})</span>
                    </div>
                    <span className="text-blue-600 font-semibold">{batch.time}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Sector 51 */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Why Choose Sector 51 Center?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="font-bold text-lg mb-2">AIIMS Faculty</h3>
              <p className="text-gray-600">Learn directly from Dr. Shekhar Singh, AIIMS alumnus with 15+ years experience.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="font-bold text-lg mb-2">Small Batches</h3>
              <p className="text-gray-600">Maximum 15-20 students per batch ensuring personalized attention.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="font-bold text-lg mb-2">Central Location</h3>
              <p className="text-gray-600">Easy access from Sectors 49-60, Nirvana Country, Sohna Road, and Golf Course.</p>
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
            <Link href="/biology-classes-gurgaon-sector-49" className="bg-white p-4 rounded-xl hover:shadow-md transition-shadow">
              <h3 className="font-semibold text-teal-600">Sector 49</h3>
              <p className="text-sm text-gray-600">South City 2 area</p>
            </Link>
            <Link href="/biology-classes-nirvana-country-gurgaon" className="bg-white p-4 rounded-xl hover:shadow-md transition-shadow">
              <h3 className="font-semibold text-teal-600">Nirvana Country</h3>
              <p className="text-sm text-gray-600">Premium villas area</p>
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
