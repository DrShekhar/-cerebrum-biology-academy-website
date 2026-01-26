import { Metadata } from 'next'
import { CityHubPage } from '@/components/seo/CityHubPage'
import { getCityData } from '@/data/city-seo/city-hub-data'

const cityData = getCityData('evening-batch-neet-gurugram')!

export const metadata: Metadata = {
  title: cityData.metaTitle,
  description: cityData.metaDescription,
  keywords: [
    'evening batch neet gurugram',
    'evening neet coaching gurgaon',
    'after school neet classes',
    'neet coaching 4pm to 8pm',
    'evening medical coaching gurugram',
    'part time neet classes gurgaon',
    'neet evening batch timing',
    'after school biology coaching',
    'evening pcb coaching gurugram',
    'neet classes after school hours',
  ],
  openGraph: {
    title: cityData.metaTitle,
    description: cityData.metaDescription,
    url: 'https://cerebrumbiologyacademy.com/evening-batch-neet-gurugram',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/evening-batch-neet-gurugram',
  },
}

export default function EveningBatchNEETGurugramPage() {
  return <CityHubPage data={cityData} />
}
