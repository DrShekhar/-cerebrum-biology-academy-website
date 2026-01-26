import { Metadata } from 'next'
import { CityHubPage } from '@/components/seo/CityHubPage'
import { getCityData } from '@/data/city-seo/city-hub-data'

const cityData = getCityData('english-medium-neet-coaching-gurugram')!

export const metadata: Metadata = {
  title: cityData.metaTitle,
  description: cityData.metaDescription,
  keywords: [
    'english medium neet coaching gurugram',
    'neet coaching in english gurgaon',
    'cbse neet coaching gurugram',
    'icse neet coaching gurugram',
    'ib neet coaching gurgaon',
    'international school neet gurugram',
  ],
  openGraph: {
    title: cityData.metaTitle,
    description: cityData.metaDescription,
    url: 'https://cerebrumbiologyacademy.com/english-medium-neet-coaching-gurugram',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/english-medium-neet-coaching-gurugram',
  },
}

export default function EnglishMediumNEETCoachingGurugramPage() {
  return <CityHubPage data={cityData} />
}
