import { Metadata } from 'next'
import { CityHubPage } from '@/components/seo/CityHubPage'
import { getCityData } from '@/data/city-seo/city-hub-data'

const cityData = getCityData('fiitjee-alternative-gurugram')!

export const metadata: Metadata = {
  title: cityData.metaTitle,
  description: cityData.metaDescription,
  keywords: [
    'fiitjee alternative gurugram',
    'fiitjee vs cerebrum neet',
    'better than fiitjee for neet',
    'fiitjee neet coaching review',
    'fiitjee gurgaon alternative',
    'neet coaching instead of fiitjee',
    'fiitjee competitor gurugram',
    'fiitjee neet biology gurugram',
    'cheaper than fiitjee gurgaon',
    'fiitjee alternative for medical',
  ],
  openGraph: {
    title: cityData.metaTitle,
    description: cityData.metaDescription,
    url: 'https://cerebrumbiologyacademy.com/fiitjee-alternative-gurugram',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/fiitjee-alternative-gurugram',
  },
}

export default function FIITJEEAlternativeGurugramPage() {
  return <CityHubPage data={cityData} />
}
