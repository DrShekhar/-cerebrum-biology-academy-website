import { Metadata } from 'next'
import { CityHubPage } from '@/components/seo/CityHubPage'
import { getCityData } from '@/data/city-seo/city-hub-data'

const cityData = getCityData('cr-park')!

export const metadata: Metadata = {
  title: 'NEET Coaching in CR Park | Biology Classes Chittaranjan Park Delhi',
  description:
    'Best NEET coaching in CR Park (Chittaranjan Park), South Delhi. Expert biology faculty for medical entrance preparation. Call 88264-44334 for demo class.',
  keywords: [
    'neet coaching in cr park',
    'neet biology classes chittaranjan park',
    'neet coaching cr park delhi',
    'neet preparation cr park',
    'neet classes near cr park',
    'medical entrance coaching cr park',
    'neet biology tutor chittaranjan park',
    'neet coaching east of kailash',
  ],
  openGraph: {
    title: 'NEET Coaching in CR Park | Biology Classes Chittaranjan Park Delhi',
    description:
      'Best NEET coaching in CR Park (Chittaranjan Park), South Delhi. Expert biology faculty for medical entrance preparation.',
    url: 'https://cerebrumbiologyacademy.com/neet-coaching-cr-park',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/neet-coaching-cr-park',
  },
}

export default function NEETCoachingCRParkPage() {
  return <CityHubPage data={cityData} />
}
