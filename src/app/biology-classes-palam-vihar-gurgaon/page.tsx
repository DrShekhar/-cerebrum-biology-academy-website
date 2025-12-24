import { Metadata } from 'next'
import { CityHubPage } from '@/components/seo/CityHubPage'
import { getCityData } from '@/data/city-seo/city-hub-data'

const cityData = getCityData('palam-vihar-gurgaon')!

export const metadata: Metadata = {
  title: cityData.metaTitle,
  description: cityData.metaDescription,
  keywords: [
    'biology classes palam vihar gurgaon',
    'neet coaching palam vihar gurugram',
    'biology tuition sector 110 gurgaon',
    'best biology teacher palam vihar',
    'class 11 biology coaching dwarka expressway gurgaon',
    'class 12 biology tuition palam vihar extension',
    'neet biology classes sector 23 gurgaon',
  ],
  openGraph: {
    title: cityData.metaTitle,
    description: cityData.metaDescription,
    url: 'https://cerebrumbiologyacademy.com/biology-classes-palam-vihar-gurgaon',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/biology-classes-palam-vihar-gurgaon',
  },
}

export default function BiologyClassesPalamViharGurgaonPage() {
  return <CityHubPage data={cityData} />
}
