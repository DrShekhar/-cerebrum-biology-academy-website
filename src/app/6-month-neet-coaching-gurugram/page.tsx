import { Metadata } from 'next'
import { CityHubPage } from '@/components/seo/CityHubPage'
import { getCityData } from '@/data/city-seo/city-hub-data'

const cityData = getCityData('6-month-neet-coaching-gurugram')!

export const metadata: Metadata = {
  title: cityData.metaTitle,
  description: cityData.metaDescription,
  keywords: [
    '6 month neet coaching gurugram',
    'six month neet course gurgaon',
    'neet crash course gurugram',
    'short term neet coaching gurgaon',
    'neet revision course gurugram',
    'fast track neet preparation',
    'neet 6 month batch gurugram',
    'intensive neet revision course',
    'late joiner neet course gurugram',
    'neet dropper short course',
  ],
  openGraph: {
    title: cityData.metaTitle,
    description: cityData.metaDescription,
    url: 'https://cerebrumbiologyacademy.com/6-month-neet-coaching-gurugram',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/6-month-neet-coaching-gurugram',
  },
}

export default function SixMonthNEETCoachingGurugramPage() {
  return <CityHubPage data={cityData} />
}
