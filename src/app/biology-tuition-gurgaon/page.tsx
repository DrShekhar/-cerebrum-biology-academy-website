import { Metadata } from 'next'
import { CityHubPage } from '@/components/seo/CityHubPage'
import { getCityData } from '@/data/city-seo/city-hub-data'

const cityData = getCityData('biology-tuition-gurgaon')!

export const metadata: Metadata = {
  title: cityData.metaTitle,
  description: cityData.metaDescription,
  keywords: [
    'biology tuition gurgaon',
    'biology tutor gurugram',
    'biology coaching sector 51',
    'neet biology tuition gurgaon',
    'class 11 12 biology tuition',
    'best biology tuition near me',
  ],
  openGraph: {
    title: cityData.metaTitle,
    description: cityData.metaDescription,
    url: 'https://cerebrumbiologyacademy.com/biology-tuition-gurgaon',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/biology-tuition-gurgaon',
  },
}

export default function BiologyTuitionGurgaonPage() {
  return <CityHubPage data={cityData} />
}
