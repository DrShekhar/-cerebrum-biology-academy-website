import { Metadata } from 'next'
import { CityHubPage } from '@/components/seo/CityHubPage'
import { getCityData } from '@/data/city-seo/city-hub-data'

const cityData = getCityData('weekend-neet-batch-gurugram')!

export const metadata: Metadata = {
  title: cityData.metaTitle,
  description: cityData.metaDescription,
  keywords: [
    'weekend neet batch gurugram',
    'saturday sunday neet coaching',
    'weekend neet classes gurgaon',
    'neet coaching for school students',
    'weekend medical coaching gurugram',
    'part time neet coaching gurgaon',
    'neet classes saturday sunday',
    'weekend biology coaching gurugram',
    'neet batch for working students',
    'flexible neet coaching gurugram',
  ],
  openGraph: {
    title: cityData.metaTitle,
    description: cityData.metaDescription,
    url: 'https://cerebrumbiologyacademy.com/weekend-neet-batch-gurugram',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/weekend-neet-batch-gurugram',
  },
}

export default function WeekendNEETBatchGurugramPage() {
  return <CityHubPage data={cityData} />
}
