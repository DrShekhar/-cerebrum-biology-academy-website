import { Metadata } from 'next'
import { CityHubPage } from '@/components/seo/CityHubPage'
import { getCityData } from '@/data/city-seo/cities'

const cityData = getCityData('biology-tutor-gurgaon')!

export const metadata: Metadata = {
  title: cityData.metaTitle,
  description: cityData.metaDescription,
  keywords: [
    'biology tutor gurgaon',
    'best biology tutor gurugram',
    'neet biology tutor sector 51',
    'aiims biology teacher gurgaon',
    'biology expert gurgaon',
    'private biology tutor near me',
  ],
  openGraph: {
    title: cityData.metaTitle,
    description: cityData.metaDescription,
    url: 'https://cerebrumbiologyacademy.com/biology-tutor-gurgaon',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/biology-tutor-gurgaon',
  },
}

export default function BiologyTutorGurgaonPage() {
  return <CityHubPage data={cityData} />
}
