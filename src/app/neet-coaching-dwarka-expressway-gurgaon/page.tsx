import { Metadata } from 'next'
import { CityHubPage } from '@/components/seo/CityHubPage'
import { getCityData } from '@/data/city-seo/city-hub-data'

const cityData = getCityData('neet-coaching-dwarka-expressway-gurgaon')!

export const metadata: Metadata = {
  title: cityData.metaTitle,
  description: cityData.metaDescription,
  keywords: [
    'neet coaching dwarka expressway',
    'neet coaching sector 99 gurgaon',
    'biology classes dwarka expressway',
    'medical coaching dwarka expressway',
    'neet tuition dwarka expressway gurgaon',
    'dwarka expressway coaching',
    'neet preparation sector 102-115',
    'pcb coaching dwarka expressway',
  ],
  openGraph: {
    title: cityData.metaTitle,
    description: cityData.metaDescription,
    url: 'https://cerebrumbiologyacademy.com/neet-coaching-dwarka-expressway-gurgaon',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/neet-coaching-dwarka-expressway-gurgaon',
  },
}

export default function NEETCoachingDwarkaExpresswayGurgaonPage() {
  return <CityHubPage data={cityData} />
}
