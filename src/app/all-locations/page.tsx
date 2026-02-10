import { Metadata } from 'next'
import Link from 'next/link'
import { MapPin, GraduationCap, Globe, Building, Download, Phone } from 'lucide-react'

export const metadata: Metadata = {
  title: 'All NEET Coaching Locations | Cerebrum Biology Academy',
  description:
    'Find Cerebrum Biology Academy NEET coaching in your city. 100+ locations across India and international centers. Expert biology coaching for NEET, boards, and international curricula.',
  keywords:
    'NEET coaching near me, NEET centers India, biology tuition, coaching locations',
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/all-locations',
  },
  openGraph: {
    title: 'All NEET Coaching Locations | Cerebrum Biology Academy',
    description: 'Find NEET coaching in 100+ locations across India and internationally',
    type: 'website',
    url: 'https://cerebrumbiologyacademy.com/all-locations',
  },
}

interface LocationLink {
  name: string
  slug: string
}

interface LocationSection {
  title: string
  icon: React.ReactNode
  links: LocationLink[]
}

const locations: LocationSection[] = [
  {
    title: 'Delhi NCR',
    icon: <MapPin className="w-5 h-5" />,
    links: [
      { name: 'Defence Colony', slug: '/neet-coaching-defence-colony-delhi' },
      { name: 'Shahdara', slug: '/neet-coaching-shahdara-east-delhi' },
      { name: 'Connaught Place', slug: '/neet-coaching-connaught-place-delhi' },
      { name: 'Chandni Chowk', slug: '/neet-coaching-chandni-chowk-delhi' },
      { name: 'Karol Bagh', slug: '/neet-coaching-karol-bagh-delhi' },
      { name: 'Dwarka', slug: '/neet-coaching-dwarka-delhi' },
      { name: 'South Delhi', slug: '/neet-coaching-south-delhi' },
      { name: 'East Delhi', slug: '/neet-coaching-east-delhi' },
      { name: 'North Delhi', slug: '/neet-coaching-north-delhi' },
      { name: 'Gurugram', slug: '/neet-coaching-gurugram' },
      { name: 'Noida', slug: '/neet-coaching-noida' },
    ],
  },
  {
    title: 'Mumbai & Pune',
    icon: <MapPin className="w-5 h-5" />,
    links: [
      { name: 'Juhu', slug: '/neet-coaching-juhu-mumbai' },
      { name: 'Colaba', slug: '/neet-coaching-colaba-mumbai' },
      { name: 'Hiranandani', slug: '/neet-coaching-hiranandani-mumbai' },
      { name: 'Thane', slug: '/neet-coaching-thane-mumbai' },
      { name: 'Bandra', slug: '/neet-coaching-bandra-mumbai' },
      { name: 'Andheri', slug: '/neet-coaching-andheri-mumbai' },
      { name: 'Powai', slug: '/neet-coaching-powai-mumbai' },
      { name: 'Navi Mumbai', slug: '/neet-coaching-navi-mumbai' },
      { name: 'Pune', slug: '/neet-coaching-pune' },
    ],
  },
  {
    title: 'Bangalore',
    icon: <MapPin className="w-5 h-5" />,
    links: [
      { name: 'Sarjapur Road', slug: '/neet-coaching-sarjapur-road-bangalore' },
      { name: 'Electronic City', slug: '/neet-coaching-electronic-city-bangalore' },
      { name: 'HSR Layout', slug: '/neet-coaching-hsr-layout-bangalore' },
      { name: 'Indiranagar', slug: '/neet-coaching-indiranagar-bangalore' },
      { name: 'Koramangala', slug: '/neet-coaching-koramangala-bangalore' },
      { name: 'Whitefield', slug: '/neet-coaching-whitefield-bangalore' },
      { name: 'Marathahalli', slug: '/neet-coaching-marathahalli-bangalore' },
      { name: 'MG Road', slug: '/neet-coaching-mg-road-bangalore' },
    ],
  },
  {
    title: 'Other Metro Cities',
    icon: <MapPin className="w-5 h-5" />,
    links: [
      { name: 'Hyderabad', slug: '/neet-coaching-hyderabad' },
      { name: 'Chennai', slug: '/neet-coaching-chennai' },
      { name: 'Kolkata', slug: '/neet-coaching-kolkata' },
      { name: 'Ahmedabad', slug: '/neet-coaching-ahmedabad' },
    ],
  },
  {
    title: 'Tier-2 Cities',
    icon: <MapPin className="w-5 h-5" />,
    links: [
      { name: 'Coimbatore', slug: '/neet-coaching-coimbatore' },
      { name: 'Kochi', slug: '/neet-coaching-kochi' },
      { name: 'Patna', slug: '/neet-coaching-patna' },
      { name: 'Ranchi', slug: '/neet-coaching-ranchi' },
      { name: 'Guwahati', slug: '/neet-coaching-guwahati' },
      { name: 'Nagpur', slug: '/neet-coaching-nagpur' },
      { name: 'Varanasi', slug: '/neet-coaching-varanasi' },
      { name: 'Surat', slug: '/neet-coaching-surat' },
      { name: 'Chandigarh', slug: '/neet-coaching-chandigarh' },
      { name: 'Lucknow', slug: '/neet-coaching-lucknow' },
      { name: 'Jaipur', slug: '/neet-coaching-jaipur' },
    ],
  },
  {
    title: 'International',
    icon: <Globe className="w-5 h-5" />,
    links: [
      { name: 'Riyadh, Saudi Arabia', slug: '/neet-coaching-riyadh-saudi-arabia' },
      { name: 'Jeddah, Saudi Arabia', slug: '/neet-coaching-jeddah-saudi-arabia' },
      { name: 'Doha, Qatar', slug: '/neet-coaching-doha-qatar' },
      { name: 'Dubai, UAE', slug: '/international/ae' },
      { name: 'Dhaka, Bangladesh', slug: '/neet-coaching-dhaka-bangladesh' },
      { name: 'Colombo, Sri Lanka', slug: '/neet-coaching-colombo-sri-lanka' },
    ],
  },
  {
    title: 'Board Preparation',
    icon: <GraduationCap className="w-5 h-5" />,
    links: [
      { name: 'CBSE', slug: '/boards/cbse' },
      { name: 'IB', slug: '/boards/ib' },
      { name: 'ICSE', slug: '/boards/icse' },
      { name: 'IGCSE', slug: '/boards/igcse' },
      { name: 'Karnataka PUC', slug: '/boards/karnataka-puc' },
      { name: 'Tamil Nadu HSC', slug: '/boards/tamil-nadu-hsc' },
      { name: 'Maharashtra HSC', slug: '/boards/maharashtra-hsc' },
      { name: 'Kerala HSE', slug: '/boards/kerala-hse' },
    ],
  },
  {
    title: 'School-Specific Programs',
    icon: <Building className="w-5 h-5" />,
    links: [
      { name: 'Vasant Valley', slug: '/neet-coaching-vasant-valley-school' },
      { name: 'DPS Chandigarh', slug: '/neet-coaching-dps-chandigarh' },
      { name: 'Cathedral Mumbai', slug: '/neet-coaching-cathedral-school-mumbai' },
      { name: 'Oakridge Hyderabad', slug: '/neet-coaching-oakridge-hyderabad' },
      { name: 'Modern School Delhi', slug: '/neet-coaching-modern-school-delhi' },
      { name: 'Amity International', slug: '/neet-coaching-amity-international' },
    ],
  },
  {
    title: 'Bridge Programs',
    icon: <GraduationCap className="w-5 h-5" />,
    links: [
      { name: 'IB to NEET', slug: '/ib-to-neet-biology-preparation' },
      { name: 'IGCSE to NEET', slug: '/igcse-to-neet-biology-preparation' },
      { name: 'A-Level to NEET', slug: '/a-level-to-neet-biology-preparation' },
      { name: 'CBSE Abroad', slug: '/cbse-abroad-neet-preparation' },
    ],
  },
  {
    title: 'Lead Magnets & Free Resources',
    icon: <Download className="w-5 h-5" />,
    links: [
      { name: 'Free Resources Hub', slug: '/free-resources' },
      { name: 'NEET Biology Syllabus', slug: '/neet-biology-syllabus' },
      { name: 'NEET Study Planner', slug: '/neet-study-planner-2026' },
      { name: 'NEET Biology Notes', slug: '/neet-biology-notes' },
    ],
  },
]

export default function AllLocationsPage() {
  const totalLocations = locations.reduce((sum, section) => sum + section.links.length, 0)

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="pt-20">
        {/* Hero Section */}
        <div className="bg-gradient-to-br from-green-600 to-green-800 text-white py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
                <MapPin className="w-5 h-5" />
                <span className="text-sm font-medium">All Locations</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Find NEET Coaching Near You
              </h1>
              <p className="text-lg text-green-100 mb-8">
                Cerebrum Biology Academy is present in {totalLocations}+ locations across
                India and internationally. Find your nearest center and join thousands of
                successful NEET aspirants.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <a
                  href="https://wa.me/918826444334"
                  className="inline-flex items-center gap-2 bg-white text-green-700 px-6 py-3 rounded-xl font-semibold hover:bg-green-50 transition-colors shadow-lg"
                >
                  <Phone className="w-5 h-5" />
                  Contact Us on WhatsApp
                </a>
                <Link
                  href="/free-resources"
                  className="inline-flex items-center gap-2 bg-green-600/20 backdrop-blur-sm text-white px-6 py-3 rounded-xl font-semibold hover:bg-green-600/30 transition-colors border border-white/20"
                >
                  <Download className="w-5 h-5" />
                  Free Resources
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Locations Grid */}
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-6xl mx-auto">
            {locations.map((section, idx) => (
              <div key={idx} className="mb-16">
                <div className="flex items-center gap-3 mb-8">
                  <div className="text-green-600">{section.icon}</div>
                  <h2 className="text-3xl font-bold text-gray-900">{section.title}</h2>
                  <span className="ml-auto text-sm font-medium text-gray-600 bg-gray-200 px-3 py-1 rounded-full">
                    {section.links.length} location{section.links.length !== 1 ? 's' : ''}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {section.links.map((link) => (
                    <Link
                      key={link.slug}
                      href={link.slug}
                      className="group bg-white rounded-lg p-4 border border-gray-200 hover:border-green-500 hover:shadow-md hover:bg-green-50 transition-all duration-300 hover:scale-[1.02]"
                    >
                      <h3 className="font-semibold text-gray-900 group-hover:text-green-600 transition-colors line-clamp-2">
                        {link.name}
                      </h3>
                      <p className="text-sm text-gray-500 mt-2 group-hover:text-gray-700">
                        View coaching details
                      </p>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-white border-t border-gray-200">
          <div className="container mx-auto px-4 py-16">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Can't Find Your Location?
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                We're expanding to new cities every month. Contact us to inquire about
                opening a center in your area or for online NEET coaching options.
              </p>
              <a
                href="https://wa.me/918826444334"
                className="inline-flex items-center gap-2 bg-green-600 text-white px-8 py-4 rounded-xl font-semibold hover:bg-green-700 transition-colors shadow-lg hover:shadow-xl"
              >
                <Phone className="w-5 h-5" />
                Connect with Us
              </a>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
