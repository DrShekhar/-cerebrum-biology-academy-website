import { Metadata } from 'next'
import { CityHubPage } from '@/components/seo/CityHubPage'
import { getCityData } from '@/data/city-seo/city-hub-data'

const cityData = getCityData('malviya-nagar')!

export const metadata: Metadata = {
  title: 'NEET Coaching in Malviya Nagar | Affordable Biology Classes Delhi',
  description:
    'Affordable NEET coaching in Malviya Nagar, South Delhi. Quality biology preparation at reasonable fees. Shivalik & Panchsheel area students welcome. Call 88264-44334.',
  keywords: [
    'neet coaching in malviya nagar',
    'neet biology classes malviya nagar',
    'affordable neet coaching south delhi',
    'neet preparation malviya nagar',
    'neet classes shivalik',
    'budget neet coaching delhi',
    'neet biology tutor malviya nagar',
    'neet coaching panchsheel park',
  ],
  openGraph: {
    title: 'NEET Coaching in Malviya Nagar | Affordable Biology Classes Delhi',
    description:
      'Affordable NEET coaching in Malviya Nagar, South Delhi. Quality biology preparation at reasonable fees. Shivalik & Panchsheel area students welcome.',
    url: 'https://cerebrumbiologyacademy.com/neet-coaching-malviya-nagar',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/neet-coaching-malviya-nagar',
  },
}

export default function NEETCoachingMalviyaNagarPage() {
  return <CityHubPage data={cityData} />
}
