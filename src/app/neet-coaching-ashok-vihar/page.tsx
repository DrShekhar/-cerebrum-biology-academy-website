import { Metadata } from 'next'
import { CityHubPage } from '@/components/seo/CityHubPage'
import { getCityData } from '@/data/city-seo/city-hub-data'

const cityData = getCityData('ashok-vihar')!

export const metadata: Metadata = {
  title: 'NEET Coaching Ashok Vihar | Biology Classes North Delhi | Cerebrum Academy',
  description:
    'Best NEET coaching near Ashok Vihar. Rohini DC Chauk center 6-8km away. AIIMS faculty, 98% success. WhatsApp 88264-44334',
  keywords: [
    'NEET coaching Ashok Vihar',
    'biology classes Ashok Vihar',
    'biology tuition North Delhi',
  ],
  openGraph: {
    title: 'NEET Coaching Ashok Vihar | Biology Classes North Delhi | Cerebrum Academy',
    description:
      'Best NEET coaching near Ashok Vihar. Rohini DC Chauk center 6-8km away. AIIMS faculty, 98% success. WhatsApp 88264-44334',
    url: 'https://cerebrumbiologyacademy.com/neet-coaching-ashok-vihar',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/neet-coaching-ashok-vihar',
  },
}

export default function AshokViharPage() {
  return <CityHubPage data={cityData} />
}
