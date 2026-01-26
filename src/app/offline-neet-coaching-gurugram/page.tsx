import { Metadata } from 'next'
import { CityHubPage } from '@/components/seo/CityHubPage'
import { getCityData } from '@/data/city-seo/city-hub-data'

const cityData = getCityData('offline-neet-coaching-gurugram')!

export const metadata: Metadata = {
  title: cityData.metaTitle,
  description: cityData.metaDescription,
  keywords: [
    'offline neet coaching gurugram',
    'classroom neet coaching gurgaon',
    'in person neet classes gurugram',
    'physical neet coaching gurgaon',
    'offline medical coaching gurugram',
    'face to face neet classes',
    'neet classroom program gurugram',
    'offline biology coaching gurgaon',
    'neet coaching center gurugram',
    'physical classes neet gurgaon',
  ],
  openGraph: {
    title: cityData.metaTitle,
    description: cityData.metaDescription,
    url: 'https://cerebrumbiologyacademy.com/offline-neet-coaching-gurugram',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/offline-neet-coaching-gurugram',
  },
}

export default function OfflineNEETCoachingGurugramPage() {
  return <CityHubPage data={cityData} />
}
