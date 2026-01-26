import { Metadata } from 'next'
import { CityHubPage } from '@/components/seo/CityHubPage'
import { getCityData } from '@/data/city-seo/city-hub-data'

const cityData = getCityData('narayana-alternative-gurugram')!

export const metadata: Metadata = {
  title: cityData.metaTitle,
  description: cityData.metaDescription,
  keywords: [
    'narayana alternative gurugram',
    'narayana vs cerebrum neet',
    'better than narayana for neet',
    'narayana neet coaching review',
    'narayana gurgaon alternative',
    'neet coaching instead of narayana',
    'narayana competitor gurugram',
    'small batch alternative to narayana',
    'personal attention neet coaching',
    'narayana alternative for medical',
  ],
  openGraph: {
    title: cityData.metaTitle,
    description: cityData.metaDescription,
    url: 'https://cerebrumbiologyacademy.com/narayana-alternative-gurugram',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/narayana-alternative-gurugram',
  },
}

export default function NarayanaAlternativeGurugramPage() {
  return <CityHubPage data={cityData} />
}
