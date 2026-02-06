import { Metadata } from 'next'
import { CityHubPage } from '@/components/seo/CityHubPage'
import { getCityData } from '@/data/city-seo/cities'

const cityData = getCityData('neet-coaching-fees-in-gurugram')!

export const metadata: Metadata = {
  title: cityData.metaTitle,
  description: cityData.metaDescription,
  keywords: [
    'neet coaching fees in gurugram',
    'what is neet coaching fee gurugram',
    'neet coaching cost gurgaon',
    'cheapest neet coaching gurugram',
    'neet coaching price gurugram',
    'affordable neet coaching gurgaon',
  ],
  openGraph: {
    title: cityData.metaTitle,
    description: cityData.metaDescription,
    url: 'https://cerebrumbiologyacademy.com/neet-coaching-fees-in-gurugram',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/neet-coaching-fees-in-gurugram',
  },
}

export default function NEETCoachingFeesInGurugramPage() {
  return <CityHubPage data={cityData} />
}
