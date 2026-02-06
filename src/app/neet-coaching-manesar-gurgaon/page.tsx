import { Metadata } from 'next'
import { CityHubPage } from '@/components/seo/CityHubPage'
import { getCityData } from '@/data/city-seo/cities'

const cityData = getCityData('neet-coaching-manesar-gurgaon')!

export const metadata: Metadata = {
  title: cityData.metaTitle,
  description: cityData.metaDescription,
  keywords: [
    'neet coaching manesar',
    'neet coaching imt manesar',
    'biology classes manesar gurgaon',
    'medical coaching manesar',
    'neet tuition manesar',
    'manesar gurgaon coaching',
    'neet preparation manesar',
    'pcb coaching manesar',
  ],
  openGraph: {
    title: cityData.metaTitle,
    description: cityData.metaDescription,
    url: 'https://cerebrumbiologyacademy.com/neet-coaching-manesar-gurgaon',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/neet-coaching-manesar-gurgaon',
  },
}

export default function NEETCoachingManesarGurgaonPage() {
  return <CityHubPage data={cityData} />
}
