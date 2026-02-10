'use client'

import Link from 'next/link'
import { MapPin, GraduationCap, Globe, Building } from 'lucide-react'

interface Page {
  name: string
  slug: string
}

interface RelatedPagesProps {
  currentSlug: string
  category: 'city' | 'premium' | 'board' | 'school' | 'international' | 'bridge'
  city?: string
}

const PAGES = {
  delhi: [
    { name: 'Defence Colony', slug: '/neet-coaching-defence-colony-delhi' },
    { name: 'Shahdara', slug: '/neet-coaching-shahdara-east-delhi' },
    { name: 'Connaught Place', slug: '/neet-coaching-connaught-place-delhi' },
    { name: 'Chandni Chowk', slug: '/neet-coaching-chandni-chowk-delhi' },
    { name: 'Karol Bagh', slug: '/neet-coaching-karol-bagh-delhi' },
    { name: 'Dwarka', slug: '/neet-coaching-dwarka-delhi' },
    { name: 'South Delhi', slug: '/neet-coaching-south-delhi' },
    { name: 'East Delhi', slug: '/neet-coaching-east-delhi' },
    { name: 'North Delhi', slug: '/neet-coaching-north-delhi' },
  ],
  mumbai: [
    { name: 'Juhu', slug: '/neet-coaching-juhu-mumbai' },
    { name: 'Colaba', slug: '/neet-coaching-colaba-mumbai' },
    { name: 'Hiranandani', slug: '/neet-coaching-hiranandani-mumbai' },
    { name: 'Thane', slug: '/neet-coaching-thane-mumbai' },
    { name: 'Bandra', slug: '/neet-coaching-bandra-mumbai' },
    { name: 'Andheri', slug: '/neet-coaching-andheri-mumbai' },
    { name: 'Powai', slug: '/neet-coaching-powai-mumbai' },
    { name: 'Navi Mumbai', slug: '/neet-coaching-navi-mumbai' },
  ],
  bangalore: [
    { name: 'Sarjapur Road', slug: '/neet-coaching-sarjapur-road-bangalore' },
    { name: 'Electronic City', slug: '/neet-coaching-electronic-city-bangalore' },
    { name: 'HSR Layout', slug: '/neet-coaching-hsr-layout-bangalore' },
    { name: 'Indiranagar', slug: '/neet-coaching-indiranagar-bangalore' },
    { name: 'Koramangala', slug: '/neet-coaching-koramangala-bangalore' },
    { name: 'Whitefield', slug: '/neet-coaching-whitefield-bangalore' },
    { name: 'Marathahalli', slug: '/neet-coaching-marathahalli-bangalore' },
    { name: 'MG Road', slug: '/neet-coaching-mg-road-bangalore' },
  ],
  tier2: [
    { name: 'Coimbatore', slug: '/neet-coaching-coimbatore' },
    { name: 'Kochi', slug: '/neet-coaching-kochi' },
    { name: 'Patna', slug: '/neet-coaching-patna' },
    { name: 'Ranchi', slug: '/neet-coaching-ranchi' },
    { name: 'Guwahati', slug: '/neet-coaching-guwahati' },
    { name: 'Nagpur', slug: '/neet-coaching-nagpur' },
    { name: 'Varanasi', slug: '/neet-coaching-varanasi' },
    { name: 'Surat', slug: '/neet-coaching-surat' },
    { name: 'Pune', slug: '/neet-coaching-pune' },
    { name: 'Chandigarh', slug: '/neet-coaching-chandigarh' },
    { name: 'Lucknow', slug: '/neet-coaching-lucknow' },
    { name: 'Jaipur', slug: '/neet-coaching-jaipur' },
  ],
  boards: [
    { name: 'CBSE', slug: '/boards/cbse' },
    { name: 'IB', slug: '/boards/ib' },
    { name: 'ICSE', slug: '/boards/icse' },
    { name: 'IGCSE', slug: '/boards/igcse' },
    { name: 'Karnataka PUC', slug: '/boards/karnataka-puc' },
    { name: 'Tamil Nadu HSC', slug: '/boards/tamil-nadu-hsc' },
    { name: 'Maharashtra HSC', slug: '/boards/maharashtra-hsc' },
    { name: 'Kerala HSE', slug: '/boards/kerala-hse' },
  ],
  international: [
    { name: 'Riyadh', slug: '/neet-coaching-riyadh-saudi-arabia' },
    { name: 'Jeddah', slug: '/neet-coaching-jeddah-saudi-arabia' },
    { name: 'Doha', slug: '/neet-coaching-doha-qatar' },
    { name: 'Dubai', slug: '/international/ae' },
    { name: 'Dhaka', slug: '/neet-coaching-dhaka-bangladesh' },
    { name: 'Colombo', slug: '/neet-coaching-colombo-sri-lanka' },
  ],
  schools: [
    { name: 'Vasant Valley', slug: '/neet-coaching-vasant-valley-school' },
    { name: 'DPS Chandigarh', slug: '/neet-coaching-dps-chandigarh' },
    { name: 'Cathedral Mumbai', slug: '/neet-coaching-cathedral-school-mumbai' },
    { name: 'Oakridge Hyderabad', slug: '/neet-coaching-oakridge-hyderabad' },
    { name: 'Modern School', slug: '/neet-coaching-modern-school-delhi' },
    { name: 'Amity International', slug: '/neet-coaching-amity-international' },
  ],
  bridge: [
    { name: 'IB to NEET', slug: '/ib-to-neet-biology-preparation' },
    { name: 'IGCSE to NEET', slug: '/igcse-to-neet-biology-preparation' },
    { name: 'A-Level to NEET', slug: '/a-level-to-neet-biology-preparation' },
    { name: 'CBSE Abroad', slug: '/cbse-abroad-neet-preparation' },
  ],
}

const getIconForCategory = (category: string) => {
  switch (category) {
    case 'city':
      return <MapPin className="w-5 h-5" />
    case 'board':
      return <GraduationCap className="w-5 h-5" />
    case 'international':
      return <Globe className="w-5 h-5" />
    case 'school':
      return <Building className="w-5 h-5" />
    case 'bridge':
      return <GraduationCap className="w-5 h-5" />
    default:
      return <MapPin className="w-5 h-5" />
  }
}

const getRelatedPages = (
  category: string,
  currentSlug: string,
  city?: string
): Page[] => {
  let pagesToShow: Page[] = []

  if (category === 'city' && city) {
    const cityKey = city.toLowerCase() as keyof typeof PAGES
    const cityPages = PAGES[cityKey] || []
    pagesToShow = cityPages.filter((page) => page.slug !== currentSlug)
  } else if (category === 'board') {
    pagesToShow = PAGES.boards.filter((page) => page.slug !== currentSlug)
  } else if (category === 'international') {
    pagesToShow = PAGES.international.filter((page) => page.slug !== currentSlug)
  } else if (category === 'school') {
    pagesToShow = PAGES.schools.filter((page) => page.slug !== currentSlug)
  } else if (category === 'bridge') {
    pagesToShow = PAGES.bridge.filter((page) => page.slug !== currentSlug)
  }

  return pagesToShow.slice(0, 8)
}

export default function RelatedPages({
  currentSlug,
  category,
  city,
}: RelatedPagesProps) {
  const relatedPages = getRelatedPages(category, currentSlug, city)

  if (relatedPages.length === 0) {
    return null
  }

  const getTitleForCategory = () => {
    if (category === 'city' && city) {
      return `Other ${city} Locations`
    }
    switch (category) {
      case 'board':
        return 'Board Preparation'
      case 'international':
        return 'International Locations'
      case 'school':
        return 'School-Specific Programs'
      case 'bridge':
        return 'Bridge Programs'
      default:
        return 'Explore More'
    }
  }

  return (
    <section className="bg-gray-50 py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <div className="mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
              Explore More NEET Coaching
            </h2>
            <p className="text-lg text-gray-600">
              {getTitleForCategory()}
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {relatedPages.map((page) => (
              <Link
                key={page.slug}
                href={page.slug}
                className="group bg-white rounded-lg p-4 border border-gray-200 hover:border-green-500 hover:shadow-md transition-all duration-300 hover:scale-[1.02]"
              >
                <div className="flex items-start gap-3">
                  <div className="text-green-600 mt-1 group-hover:text-green-700 transition-colors">
                    {getIconForCategory(category)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-900 text-sm leading-snug group-hover:text-green-600 transition-colors break-words">
                      {page.name}
                    </h3>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
