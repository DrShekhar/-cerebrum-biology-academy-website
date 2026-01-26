import { Metadata } from 'next'
import { CityHubPage } from '@/components/seo/CityHubPage'
import { getCityData } from '@/data/city-seo/city-hub-data'

const cityData = getCityData('top-10-neet-coaching-gurugram')!

export const metadata: Metadata = {
  title: cityData.metaTitle,
  description: cityData.metaDescription,
  keywords: [
    'top 10 neet coaching gurugram',
    'best 10 neet coaching gurgaon',
    'neet coaching ranking gurugram',
    'neet coaching list gurugram',
    'top neet institutes gurugram',
    'neet coaching comparison gurugram',
  ],
  openGraph: {
    title: cityData.metaTitle,
    description: cityData.metaDescription,
    url: 'https://cerebrumbiologyacademy.com/top-10-neet-coaching-gurugram',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/top-10-neet-coaching-gurugram',
  },
}

export default function Top10NEETCoachingGurugramPage() {
  return <CityHubPage data={cityData} />
}
