import { Metadata } from 'next'
import { CityHubPage } from '@/components/seo/CityHubPage'
import { getCityData } from '@/data/city-seo/city-hub-data'

const cityData = getCityData('greater-kailash')!

export const metadata: Metadata = {
  title: 'NEET Coaching in Greater Kailash | Top Biology Classes GK Delhi',
  description:
    'Best NEET coaching in Greater Kailash, Delhi. Expert biology faculty for NEET-UG preparation. Join students from GK-1, GK-2 & nearby areas. Call 88264-44334 for demo class.',
  keywords: [
    'neet coaching in greater kailash',
    'neet biology classes gk delhi',
    'best neet coaching gk-1',
    'neet preparation greater kailash',
    'neet coaching gk-2 delhi',
    'neet biology tutor greater kailash',
    'neet classes near archana complex',
    'medical entrance coaching gk',
  ],
  openGraph: {
    title: 'NEET Coaching in Greater Kailash | Top Biology Classes GK Delhi',
    description:
      'Best NEET coaching in Greater Kailash, Delhi. Expert biology faculty for NEET-UG preparation. Join students from GK-1, GK-2 & nearby areas.',
    url: 'https://cerebrumbiologyacademy.com/neet-coaching-greater-kailash',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/neet-coaching-greater-kailash',
  },
}

export default function NEETCoachingGreaterKailashPage() {
  return <CityHubPage data={cityData} />
}
