import { Metadata } from 'next'
import { CityHubPage } from '@/components/seo/CityHubPage'
import { getCityData } from '@/data/city-seo/city-hub-data'

const cityData = getCityData('physics-wallah-alternative-gurugram')!

export const metadata: Metadata = {
  title: cityData.metaTitle,
  description: cityData.metaDescription,
  keywords: [
    'physics wallah alternative gurugram',
    'pw alternative neet gurgaon',
    'better than physics wallah',
    'pw vidyapeeth alternative',
    'offline coaching vs pw',
    'physics wallah vs classroom',
    'pw neet coaching review',
    'physics wallah competitor gurugram',
    'classroom alternative to pw',
    'alakh pandey alternative gurgaon',
  ],
  openGraph: {
    title: cityData.metaTitle,
    description: cityData.metaDescription,
    url: 'https://cerebrumbiologyacademy.com/physics-wallah-alternative-gurugram',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/physics-wallah-alternative-gurugram',
  },
}

export default function PhysicsWallahAlternativeGurugramPage() {
  return <CityHubPage data={cityData} />
}
