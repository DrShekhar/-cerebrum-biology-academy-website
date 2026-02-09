import { Metadata } from 'next'
import { CityHubPage } from '@/components/seo/CityHubPage'
import { getCityData } from '@/data/city-seo/cities'

const cityData = getCityData('south-delhi')!

export const metadata: Metadata = {
  title: cityData.metaTitle,
  description: cityData.metaDescription,
  keywords: [
    'neet coaching south extension',
    'NEET coaching south extension delhi',
    'biology coaching south extension',
    'best NEET tuition south ext',
    'NEET classes near south extension market',
    'medical coaching south delhi',
    'NEET preparation south extension part 2',
  ],
  openGraph: {
    title: cityData.metaTitle,
    description: cityData.metaDescription,
    url: 'https://cerebrumbiologyacademy.com/neet-coaching-south-extension',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/neet-coaching-south-extension',
  },
}

export default function NEETCoachingSouthExtensionPage() {
  return <CityHubPage data={cityData} />
}
